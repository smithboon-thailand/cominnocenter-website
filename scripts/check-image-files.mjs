/**
 * ตรวจว่าไฟล์ภาพทุกไฟล์ที่หน้าเว็บอ้างถึง มีอยู่จริงใน public/
 *
 * ทำไมต้องมี: ตั้งแต่เปลี่ยนมาเขียน `srcset` เอง (เพราะ `unoptimized: true` ทำให้
 * `next/image` ไม่สร้างให้) ภาพหนึ่งใบต้องมีสามไฟล์ — 800 / 1200 / 1600
 * **ถ้าไฟล์ย่อไฟล์ใดหาย ภาพจะพังเฉพาะเครื่องที่ความหนาแน่นพิกเซลตรงกับไฟล์นั้น**
 * เดสก์ท็อปยังเห็นภาพปกติ คนตรวจงานจึงไม่มีทางเจอ แต่ผู้ใช้มือถือเห็นช่องว่าง
 *
 * เป็นบั๊กคนละชนิดกับที่ `check-rendered-text.mjs` กัน (นั่นคือมาร์กอัปดิบหลุด
 * ขึ้นเป็นข้อความ) แต่มีรากเดียวกัน — สิ่งที่ตรวจด้วยการเปิดดูหน้าเดียวไม่เจอ
 *
 * อ่านจาก HTML ที่ build ออกมา ไม่ใช่จากไฟล์ข้อมูล จึงครอบคลุมทุกที่ที่อ้างภาพ
 * ไม่ว่าจะมาจาก data file ไหนหรือเขียน path ตรงๆ ในหน้า
 *
 * ใช้: รวมอยู่ใน `npm run verify` แล้ว · ออกด้วยรหัส 1 ถ้าเจอไฟล์ที่หาย
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BUILD_DIR = ".next/server/app";
const PUBLIC_DIR = "public";

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

/** เก็บเป็น path → หน้าที่อ้างถึง เพื่อรายงานได้ว่าไฟล์ที่หายกระทบหน้าไหน */
const referenced = new Map();
const add = (path, file) => {
  if (!path.startsWith("/images/") && !path.startsWith("/illustrations/")) return;
  if (!referenced.has(path)) referenced.set(path, new Set());
  referenced.get(path).add(file);
};

for (const file of files) {
  const html = readFileSync(file, "utf8");
  // src="..." ปกติ
  for (const m of html.matchAll(/\ssrc="(\/[^"]+\.(?:webp|jpg|jpeg|png|svg))"/gi)) {
    add(m[1], file);
  }
  // srcset="a.webp 800w, b.webp 1200w, ..." — ตรงนี้แหละที่ไฟล์ย่อมักหาย
  for (const m of html.matchAll(/\ssrcSet="([^"]+)"/gi)) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) add(url, file);
    }
  }
}

const missing = [];
for (const [path, pages] of referenced) {
  if (!existsSync(join(PUBLIC_DIR, path))) missing.push({ path, pages });
}

console.log(`ตรวจไฟล์ภาพที่ถูกอ้างถึง ${referenced.size} ไฟล์ ใน ${files.length} หน้า`);

if (!missing.length) {
  console.log("ไฟล์ภาพครบทุกไฟล์");
  process.exit(0);
}

console.error(`\nไฟล์ภาพหาย ${missing.length} ไฟล์\n`);
for (const { path, pages } of missing) {
  const list = [...pages].slice(0, 3).map((p) => p.replace(BUILD_DIR + "/", ""));
  console.error(`■ ${path}`);
  console.error(`  ถูกอ้างใน: ${list.join(", ")}${pages.size > 3 ? ` (และอีก ${pages.size - 3} หน้า)` : ""}`);
}
console.error("");
process.exit(1);
