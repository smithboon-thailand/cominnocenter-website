/**
 * ตรวจว่ามี "มาร์กอัปดิบ" หลุดขึ้นเป็นข้อความที่ผู้อ่านเห็นหรือไม่
 *
 * ทำไมต้องมี: บั๊กชนิดนี้หลุดขึ้นโปรดักชันมาแล้วสองครั้ง และทั้งสองครั้ง
 * **ผู้ใช้เป็นคนพบ ไม่ใช่เราตรวจเจอเอง**
 *   1. `&amp;` โผล่ในชื่อวารสารบนหน้า /research (แก้ด้วย decodeEntities ใน
 *      fetch-publications.mjs) — 30 ส.ค. 2569
 *   2. `**` แบบ markdown โผล่ในบทสรุปงานวิจัย 22 หน้า 61 คู่ เพราะไฟล์ข้อมูล
 *      เขียนเน้นด้วยเครื่องหมาย markdown แต่ component render เป็นข้อความธรรมดา
 *      — 1 ก.ย. 2569
 *
 * รากปัญหาเดียวกันทั้งสองครั้ง: เราตรวจ **โครงสร้าง** (JSON-LD, metadata,
 * สัญญาอนุญาต, ลิงก์) อย่างละเอียด แต่ไม่เคยอ่าน **ตัวข้อความ** ที่ render ออกมา
 * สคริปต์นี้จึงอ่านเฉพาะข้อความที่ผู้อ่านเห็นจริง แล้วมองหาร่องรอยของมาร์กอัป
 * ที่ควรถูกแปลงไปแล้วแต่ยังเหลืออยู่
 *
 * ขอบเขตที่ตั้งใจไม่ทำ: ไม่ตรวจไวยากรณ์ ไม่ตรวจการสะกด ไม่ตรวจโทนภาษา
 * ตรวจแค่ "สัญลักษณ์ที่ไม่ควรถึงตาผู้อ่าน" ซึ่งเป็นบั๊กที่ชี้ชัดได้เสมอ
 * ไม่ต้องตีความ จึงไม่มี false positive ที่ต้องมานั่งเถียงกัน
 *
 * ใช้: `npm run verify` (build แล้วตรวจ) หรือ `node scripts/check-rendered-text.mjs`
 * หลัง build ไว้แล้ว · ออกด้วยรหัส 1 ถ้าเจอ เพื่อให้ CI หรือคนที่รันสังเกตเห็น
 *
 * **จงใจไม่ผูกเข้ากับ `npm run build`** เพราะ Vercel รัน build ตอน deploy
 * ถ้าสคริปต์นี้พลาดจะทำให้เว็บโปรดักชัน deploy ไม่ได้ ซึ่งร้ายแรงกว่าบั๊กที่มันกัน
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BUILD_DIR = ".next/server/app";

/**
 * รูปแบบที่ถือว่าเป็นบั๊กเสมอเมื่อโผล่ในข้อความที่ผู้อ่านเห็น
 * เพิ่มรูปแบบใหม่ได้ แต่ต้องเป็นสิ่งที่ "ไม่มีทางตั้งใจเขียน" เท่านั้น
 */
const PATTERNS = [
  {
    name: "มาร์กดาวน์ตัวหนา **...**",
    re: /\*\*/g,
    why: "ไฟล์ข้อมูลเขียนเน้นด้วย ** แต่ตัว render ไม่ได้แปลง",
  },
  {
    name: "ลิงก์แบบมาร์กดาวน์ [ข้อความ](url)",
    re: /\[[^\]\n]{1,80}\]\((https?:\/\/|\/)[^)\s]{1,200}\)/g,
    why: "ต้องใช้ <a> หรือ <Link> ไม่ใช่ไวยากรณ์มาร์กดาวน์",
  },
  {
    name: "HTML entity ถูกเข้ารหัสซ้ำสองชั้น",
    re: /&amp;(amp|lt|gt|quot|apos|nbsp|#\d+);/g,
    why: "ข้อมูลต้นทางเก็บ entity ไว้แล้วถูกเข้ารหัสอีกรอบตอน render",
  },
  {
    name: "แท็ก HTML ที่กลายเป็นข้อความ",
    re: /&lt;\/?(p|br|strong|em|b|i|a|div|span|ul|li)\b[^&]{0,60}&gt;/gi,
    why: "ข้อมูลต้นทางมี HTML ปนมาแต่ถูก escape ทั้งก้อน",
  },
];

/** ข้อความที่ผู้อ่านเห็นจริง — ตัด script/style ทิ้งก่อน แล้วค่อยลอกแท็กออก */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(BUILD_DIR);
} catch {
  console.error(`หา ${BUILD_DIR} ไม่เจอ — ต้องรัน npm run build ก่อน`);
  process.exit(1);
}

const problems = [];
for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"));
  for (const { name, re, why } of PATTERNS) {
    for (const m of text.matchAll(re)) {
      const at = m.index ?? 0;
      problems.push({
        file,
        name,
        why,
        // ตัดช่องว่างซ้ำเพื่อให้บริบทอ่านง่ายในเทอร์มินัล
        context: text.slice(Math.max(0, at - 60), at + 70).replace(/\s+/g, " ").trim(),
      });
    }
  }
}

console.log(`ตรวจข้อความที่ผู้อ่านเห็นใน ${files.length} หน้า`);

if (!problems.length) {
  console.log("ไม่พบมาร์กอัปดิบหลุดขึ้นหน้าเว็บ");
  process.exit(0);
}

// จัดกลุ่มตามชนิดปัญหา เพื่อให้เห็นว่าเป็นบั๊กเดียวที่กระจายหลายหน้า ไม่ใช่หลายบั๊ก
const byName = new Map();
for (const p of problems) {
  if (!byName.has(p.name)) byName.set(p.name, []);
  byName.get(p.name).push(p);
}

console.error(`\nพบ ${problems.length} จุดใน ${new Set(problems.map((p) => p.file)).size} หน้า\n`);
for (const [name, list] of byName) {
  console.error(`■ ${name} — ${list.length} จุด`);
  console.error(`  เหตุ: ${list[0].why}`);
  for (const p of list.slice(0, 3)) {
    console.error(`  ${p.file.replace(BUILD_DIR + "/", "")}`);
    console.error(`      … ${p.context} …`);
  }
  if (list.length > 3) console.error(`  (และอีก ${list.length - 3} จุด)`);
  console.error("");
}
process.exit(1);
