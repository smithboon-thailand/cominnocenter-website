/**
 * ดึงฟอนต์ Noto Sans SC (400/500) จาก Google Fonts มาเก็บในคลังเอง — รันมือเมื่ออยากอัปเดตฟอนต์เท่านั้น
 *
 * ทำไมไม่ใช้ `next/font/google` แล้ว (26 พ.ย. 2569): next/font ดึงฟอนต์จาก Google ทุกครั้งที่ build
 * และตั้งแต่ 4 พ.ย. Google ตอบเครื่อง build ของ GitHub Actions และ Vercel เป็นระยะด้วย URL ที่
 * ตัวโหลดของ next/font อ่านนามสกุลไม่ได้ (`TypeError: Cannot read properties of null (reading '1')`)
 * build จึงพังแบบสุ่มทั้ง CI และ deploy จริง ขณะที่เครื่องเราเองดึงได้ปกติ — เก็บไฟล์ไว้เองตัดปัญหานี้ทิ้ง
 *
 * ยังหั่นตาม unicode-range เหมือนเดิม (~100 ไฟล์ ใช้ร่วมกันทั้งสองน้ำหนัก) เบราว์เซอร์โหลดเฉพาะชิ้นที่หน้านั้นใช้จริง
 * ผลลัพธ์: `public/fonts/noto-sans-sc/*.woff2` + `src/lib/noto-sans-sc.css` (import จาก `fontsZh.ts`)
 *
 * ใช้: NODE_USE_ENV_PROXY=1 node scripts/fetch-noto-sc.mjs
 */
import { mkdir, writeFile, rm } from "node:fs/promises";

const CSS_URL = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap";
// UA ของเบราว์เซอร์รุ่นใหม่ ไม่งั้น Google ตอบเป็น TTF ชิ้นเดียวไม่หั่น
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const OUT = "public/fonts/noto-sans-sc";

const css = await (await fetch(CSS_URL, { headers: { "user-agent": UA } })).text();
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1]))];
// ฟอนต์ตัวนี้เป็น variable font: น้ำหนัก 400 กับ 500 ใช้ไฟล์ชิ้นเดียวกัน จึงได้ไฟล์ราวครึ่งหนึ่งของ @font-face
const faces = (css.match(/@font-face/g) ?? []).length;
const refs = (css.match(/url\(https:[^)]+\.woff2\)/g) ?? []).length;
if (urls.length < 90 || refs !== faces)
  throw new Error(`คาดว่าจะได้ฟอนต์ราว 100 ชิ้น ได้ ${urls.length} ไฟล์ · ${refs} URL จาก ${faces} @font-face — Google เปลี่ยนรูปแบบคำตอบ`);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
let out = css;
for (const [i, url] of urls.entries()) {
  const name = `${String(i).padStart(3, "0")}.woff2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`โหลด ${url} ไม่ได้ (${res.status})`);
  await writeFile(`${OUT}/${name}`, Buffer.from(await res.arrayBuffer()));
  out = out.split(url).join(`/fonts/noto-sans-sc/${name}`);
}

const header = `/* สร้างโดย scripts/fetch-noto-sc.mjs — ห้ามแก้ด้วยมือ · ${urls.length} ชิ้น */\n`;
// คลาสนี้แทน notoSansSC.variable ของ next/font เดิม: ตั้งตัวแปรที่ globals.css อ่าน
const vars = `.font-noto-sc-vars { --font-noto-sc: "Noto Sans SC"; }\n`;
await writeFile("src/lib/noto-sans-sc.css", header + vars + out.replace(/\/\* [^*]+ \*\/\n/g, ""));
console.log(`ฟอนต์ ${urls.length} ชิ้น → ${OUT}`);
