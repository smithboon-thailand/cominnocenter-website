/**
 * ตรวจรายการอ้างอิงทุกรูปแบบของผลงานทุกชิ้น — `npm run check:citations`
 *
 * **มีเพราะรายการอ้างอิงที่ผิดหลุดขึ้นเว็บจริงมาแล้ว** (2 ก.ย. 2569 ผู้ใช้เอาผลลัพธ์ไป
 * ให้ผู้ตรวจอิสระดู แล้วพบว่า APA ไม่ใส่คำว่า Article หน้าเลขบทความ · MLA ใส่ pp.
 * นำหน้าเลขบทความซึ่งไม่ใช่เลขหน้า · ชื่อวารสารไม่เป็นตัวเอน · ชื่อเรื่องผิดแบบตัวพิมพ์
 * · หนังสือถูกจัดรูปเหมือนบทความ) และก่อนหน้านั้นยังเคยมีชื่อหน่วยงานหลุดไปอยู่ใน
 * ช่องผู้เขียนถึงห้ารายการในงานชิ้นเดียว
 *
 * ปัญหาชนิดนี้ **ไม่มีทางเห็นจาก build ที่ผ่าน** เพราะเป็นข้อความที่ถูกต้องทางไวยากรณ์
 * ทุกประการ ผิดแต่ตามมาตรฐานการอ้างอิง คนตรวจต้องอ่านทีละบรรทัด 46 รายการ × 4 รูปแบบ
 * = 184 ข้อความ ซึ่งไม่มีใครทำทุกครั้งที่แก้โค้ด สคริปต์นี้จึงทำแทน
 *
 * **ตรวจสิ่งที่ระบุเป็นกฎได้เท่านั้น** ไม่ได้แทนการอ่านด้วยตา — เรื่องที่ต้องใช้
 * วิจารณญาณ (เช่นชื่อเฉพาะควรขึ้นต้นตัวใหญ่ไหม) ยังต้องดูจาก `--print` เอง
 *
 * รันด้วย node --experimental-strip-types เพราะต้องเรียกฟังก์ชันจริงใน citation.ts
 * ไม่ใช่เขียนตรรกะซ้ำ — ถ้าเขียนซ้ำ ตัวตรวจกับตัวจริงจะเพี้ยนออกจากกันวันใดวันหนึ่ง
 */
import { readFileSync } from "node:fs";
import { apa, bibtex, mla, plainCitation, ris, apaParts, mlaParts } from "../src/lib/citation.ts";

type Pub = {
  title: string;
  venue: string;
  year: number;
  type: "journal-article" | "conference-paper" | "book" | "book-chapter";
  doi?: string;
  indexUrl?: string;
  citation?: {
    authors: { family: string; given: string; literal: string }[];
    containerTitle: string;
    volume: string;
    issue: string;
    page: string;
    articleNumber: string;
    publisher: string;
    year: number;
    month: number;
    day: number;
  };
};

const src = readFileSync(new URL("../src/data/publications.ts", import.meta.url), "utf8");
const match = src.match(/export const publications: PublicationEntry\[\] = (\[[\s\S]*?\n\]);\n/);
if (!match) {
  console.error("check:citations — อ่าน publications.ts ไม่ออก (โครงไฟล์เปลี่ยนไป?)");
  process.exit(1);
}
const publications: Pub[] = JSON.parse(match[1]);
const citable = publications.filter((p) => p.citation);

const problems: string[] = [];
const flag = (p: Pub, style: string, why: string, text: string) =>
  problems.push(`${style} · ${why}\n    ${p.title.slice(0, 70)}\n    ${text}`);

/**
 * ตรวจชื่อหน่วยงานที่ตัวข้อมูลผู้เขียนโดยตรง ไม่ใช่ที่ข้อความที่ประกอบเสร็จแล้ว
 *
 * เคยตรวจจากข้อความ แล้วติดผลบวกลวงทันที เพราะชื่อวารสารกับชื่อเรื่องก็มีคำว่า
 * University และ Department ได้ตามปกติ ("Vestnik of Saint Petersburg University",
 * "Thailand's Department of Disease Control") — ตัวตรวจที่ร้องผิดบ่อยจะถูกเมิน
 */
const ORG_WORDS = /\b(Universit|Facult|Department|College|Institute|Ministry)/i;

for (const p of citable) {
  const c = p.citation!;
  for (const a of c.authors) {
    const name = `${a.family} ${a.given} ${a.literal}`.trim();
    if (ORG_WORDS.test(name)) flag(p, "ข้อมูล", "ชื่อหน่วยงานอยู่ในช่องผู้เขียน", name);
  }
  if (c.articleNumber && c.page === c.articleNumber)
    flag(p, "ข้อมูล", "เลขบทความซ้ำอยู่ในช่องเลขหน้าด้วย", c.page);
  const A = apa(p as never, c as never);
  const M = mla(p as never, c as never);
  const B = bibtex(p as never, c as never);
  const R = ris(p as never, c as never);

  for (const [style, text] of [
    ["APA", A],
    ["MLA", M],
  ] as const) {
    // เครื่องหมายวรรคตอนซ้อน — อาการของการต่อสตริงผิด ไม่ใช่ของที่ทะเบียนส่งมา
    if (/\.\.|,,|\?\.|!\.|\s,|\s\.(?!\s*$)/.test(text)) flag(p, style, "เครื่องหมายวรรคตอนซ้อน", text);
    if (/\s{2,}/.test(text)) flag(p, style, "ช่องว่างซ้อน", text);
    if (text !== text.trim()) flag(p, style, "มีช่องว่างหัวหรือท้าย", text);
    if (/vol\.\s*Volume|,\s*Volume\s/i.test(text)) flag(p, style, "เลขเล่มมีคำว่า Volume ซ้ำ", text);
    if (!String(c.year || p.year).match(/^\d{4}$/)) flag(p, style, "ไม่มีปีที่ตีพิมพ์", text);
  }

  // เลขบทความ: APA ต้องมีคำว่า Article นำหน้า · MLA ต้องไม่มี pp./p.
  // ใช้เฉพาะเมื่อ**ไม่มีเลขหน้า** เพราะเลขบทความมีไว้แทนเลขหน้า ไม่ใช่เพิ่มจากเลขหน้า
  // (ทะเบียนของบางสำนักพิมพ์ฝากทั้งสองค่า โดยเลขบทความเป็นรหัสภายในของเขาเอง)
  if (c.articleNumber && !c.page) {
    if (!A.includes(`Article ${c.articleNumber}`))
      flag(p, "APA", "เลขบทความไม่มีคำว่า Article นำหน้า (APA 7 §9.27)", A);
    if (new RegExp(`pp?\\.\\s*${c.articleNumber.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(M))
      flag(p, "MLA", "ใส่ pp. นำหน้าเลขบทความ ทั้งที่ไม่ใช่เลขหน้า", M);
  }
  // เลขหน้าจริง: MLA ใช้ p. กับหน้าเดียว และ pp. กับช่วงหน้า
  if (c.page) {
    const range = /[-–]/.test(c.page);
    if (range && !M.includes(`pp. ${c.page}`)) flag(p, "MLA", "ช่วงหน้าไม่ได้ขึ้นต้นด้วย pp.", M);
    if (!range && !M.includes(`p. ${c.page}`)) flag(p, "MLA", "หน้าเดียวต้องใช้ p. ไม่ใช่ pp.", M);
  }

  // ตัวเอนเป็นส่วนหนึ่งของรูปแบบ ไม่ใช่การตกแต่ง — ทุกรายการที่มีชื่อวารสาร/สำนักพิมพ์ต้องมี
  const italicOf = (parts: { text: string; italic?: boolean }[]) =>
    parts.filter((s) => s.italic).map((s) => s.text).join("|");
  const source = c.containerTitle || p.venue;
  if (source) {
    if (!italicOf(apaParts(p as never, c as never))) flag(p, "APA", "ไม่มีส่วนที่เป็นตัวเอนเลย", A);
    if (!italicOf(mlaParts(p as never, c as never))) flag(p, "MLA", "ไม่มีส่วนที่เป็นตัวเอนเลย", M);
  }

  // หนังสือ: MLA ใช้ตัวเอน ห้ามใส่เครื่องหมายคำพูด
  if (p.type === "book" && /[“"]/.test(M)) flag(p, "MLA", "ชื่อหนังสือไม่ควรอยู่ในเครื่องหมายคำพูด", M);
  if (p.type !== "book" && !/[“"]/.test(M)) flag(p, "MLA", "ชื่อบทความต้องอยู่ในเครื่องหมายคำพูด", M);

  // BibTeX: ปีกกาต้องสมดุล และ & ดิบทำให้ LaTeX คอมไพล์ไม่ผ่าน
  const opens = (B.match(/(?<!\\)\{/g) || []).length;
  const closes = (B.match(/(?<!\\)\}/g) || []).length;
  if (opens !== closes) flag(p, "BibTeX", "ปีกกาไม่สมดุล", B.slice(0, 120));
  for (const line of B.split("\n")) {
    if (/^\s*(doi|url)\s*=/.test(line)) continue;
    if (/(?<!\\)&/.test(line)) flag(p, "BibTeX", "มี & ที่ยังไม่ได้หนีอักขระ", line.trim());
  }
  if (!/^@\w+\{[a-z0-9]+,$/m.test(B.split("\n")[0])) flag(p, "BibTeX", "บรรทัดหัวผิดรูป", B.split("\n")[0]);

  // RIS: ต้องเปิดด้วย TY และปิดด้วย ER เสมอ ไม่งั้นโปรแกรมจัดการอ้างอิงอ่านไม่ขึ้น
  const lines = R.split("\n");
  if (!lines[0].startsWith("TY  - ")) flag(p, "RIS", "ไม่ได้เริ่มด้วย TY", lines[0]);
  if (lines[lines.length - 1] !== "ER  - ") flag(p, "RIS", "ไม่ได้ปิดด้วย ER", lines[lines.length - 1]);
  if (!lines.some((l) => l.startsWith("AU  - "))) flag(p, "RIS", "ไม่มีบรรทัดผู้เขียน", R.slice(0, 80));
  for (const l of lines) {
    if (l && !/^[A-Z][A-Z0-9]  - /.test(l)) flag(p, "RIS", "รูปแบบแท็กผิด", l);
  }

  // ข้อความล้วนกับชิ้นส่วนต้องตรงกันเสมอ ไม่งั้นปุ่มคัดลอกจะได้คนละอย่างกับที่เห็นบนหน้า
  if (plainCitation(apaParts(p as never, c as never)) !== A)
    flag(p, "APA", "ข้อความล้วนไม่ตรงกับชิ้นส่วนที่ render", A);
  if (plainCitation(mlaParts(p as never, c as never)) !== M)
    flag(p, "MLA", "ข้อความล้วนไม่ตรงกับชิ้นส่วนที่ render", M);
}

/**
 * ไฟล์สำเนาบทความที่ `paperSummaries.ts` อ้างถึงต้องมีอยู่จริง
 *
 * `localCopy` ไม่ได้ถูกใช้ตอน build เลย มันมีไว้ให้ AI ที่ทำงานในคลังนี้เปิดอ่านตอน
 * เขียนบทสรุปรอบถัดไป — **ถ้าชื่อไฟล์เพี้ยนไปจะไม่มีอะไรพัง จนกว่าจะมีคนหาไฟล์ไม่เจอ**
 * แล้วเข้าใจว่าไม่เคยมี ซึ่งอาจนำไปสู่การไปโหลดซ้ำหรือเขียนสรุปจากบทคัดย่อแทน
 */
const summaries = readFileSync(new URL("../src/data/paperSummaries.ts", import.meta.url), "utf8");

/**
 * ผลงานที่มี DOI ควรมีข้อมูลบรรณานุกรมด้วย — **ถ้าไม่มี ปุ่มอ้างอิงจะหายไปเงียบๆ**
 *
 * เจอของจริงเมื่อ 2 ก.ย. 2569: งานที่จับคู่ DOI ได้จากการค้นดัชนี ถูกบันทึกแต่เลข
 * DOI โดยไม่ได้ดึงระเบียนเต็ม ผลคือหน้าบทสรุปของงานนั้นไม่มีปุ่มอ้างอิงเลย ทั้งที่
 * ทะเบียนมีข้อมูลครบ · **ทำให้พังเฉพาะรายการที่มีหน้าบทสรุป** เพราะเป็นจุดที่ผู้อ่าน
 * เห็นความขาดจริงๆ ส่วนรายการอื่นแค่แจ้งไว้ให้รู้ ไม่ถึงกับหยุดงาน
 */
const summarised = new Set(
  [...summaries.matchAll(/doi:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()),
);
const missing = publications.filter((p) => p.doi && !p.citation);
for (const p of missing) {
  const line = `${p.doi} — ${p.title.slice(0, 60)}`;
  if (summarised.has(p.doi!.toLowerCase()))
    problems.push(
      `ข้อมูล · ผลงานมีหน้าบทสรุปแต่ไม่มีข้อมูลบรรณานุกรม ปุ่มอ้างอิงจะหาย\n    ${line}\n` +
        "    แก้ที่ตาราง CITATION_FIXES ใน scripts/fetch-publications.mjs โดยอ้างจากตัวไฟล์บทความ",
    );
  else console.warn(`  หมายเหตุ: ${line} ไม่มีข้อมูลบรรณานุกรม จึงไม่มีปุ่มอ้างอิง`);
}

for (const m of summaries.matchAll(/localCopy:\s*"([^"]+)"/g)) {
  const file = new URL(`../research-sources/papers/${m[1]}`, import.meta.url);
  try {
    readFileSync(file);
  } catch {
    problems.push(`สำเนาบทความ · ไม่พบไฟล์ที่ localCopy อ้างถึง\n    research-sources/papers/${m[1]}`);
  }
}

if (process.argv.includes("--print")) {
  for (const p of citable) {
    const c = p.citation!;
    console.log(`\n### ${p.type} · ${p.year} · ${p.title}`);
    console.log(`APA : ${apa(p as never, c as never)}`);
    console.log(`MLA : ${mla(p as never, c as never)}`);
  }
}

if (problems.length) {
  console.error(`\ncheck:citations — พบปัญหา ${problems.length} จุด\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}
console.log(`check:citations — ตรวจ ${citable.length} รายการ × 4 รูปแบบ ผ่านทั้งหมด`);
