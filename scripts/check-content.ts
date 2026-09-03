/**
 * ตรวจ "เนื้อหา" ที่ขึ้นเว็บจริง — ค่าที่เลิกใช้แล้ว · ตัวตนของโดเมน · ที่เว้นว่าง · การอ้างถึงกันเอง
 *
 * ที่มา (3 ก.ย. 2569)
 *
 * สคริปต์นี้ย้ายมาจาก `check-content.portable.mjs` ของคลัง `comminno-web`
 * ซึ่งเขียนขึ้นหลังการตรวจเว็บนั้นในเดือนกันยายน 2569 ข้อสังเกตที่สำคัญที่สุด
 * ของรายงานฉบับนั้นคือ **ข้อบกพร่องระดับเนื้อหาทุกข้อที่พบ ตรวจด้วยเครื่องได้ทั้งหมด
 * และไม่มีข้อไหนถูกตรวจพบเลย** เพราะ CI ที่มีแต่ type-check กับ build คือ
 * ประตูตรวจ*โค้ด* ไม่ใช่ประตูตรวจ*เนื้อหา* — อีเมลผิดในสิบจุด · โฮสต์ชั่วคราว
 * ถูกประกาศเป็น canonical ทุกหน้า · ประกาศทางกฎหมายที่ขึ้นเว็บทั้งที่ยังมีที่เว้นว่าง
 *
 * คลังนี้เจอปัญหาตระกูลเดียวกันมาแล้วสามครั้ง (ดูกฎการทำงานข้อ 6 ใน CLAUDE.md)
 * และครั้งล่าสุดคืออีเมลของศูนย์ฯ ที่พิมพ์ผิดพร้อมกันเก้าจุด — **ผู้ใช้เป็นคนพบ
 * ไม่ใช่เราตรวจเจอเอง** ทุกครั้ง
 *
 * แนวคิดร่วมกับตัวตรวจอื่นในโฟลเดอร์นี้: **อ่านผลลัพธ์ที่ build ออกมาจริง
 * ไม่ใช่อ่านซอร์ส** เพราะค่าที่ถูกในซอร์สแล้วผิดตอน render มีอยู่จริง และเป็น
 * ชนิดที่อ่านโค้ดแล้วไม่มีทางเห็น
 *
 * ตรวจสี่เรื่อง
 *   1. **ค่าที่เลิกใช้แล้ว** — เบอร์เก่า อีเมลแบบไม่มีจุด โฮสต์เก่าที่เลิกใช้
 *      ใส่ค่าเก่าเข้าลิสต์ทันทีที่แก้ค่านั้น นั่นคือสิ่งที่กันไม่ให้บั๊กที่แก้แล้ว
 *      กลับมาอีกหกเดือนถัดไปในไฟล์ที่ไม่มีใครเปิดอ่าน
 *   2. **ตัวตนของโดเมน** — canonical · hreflang · og:image · `@id` ใน JSON-LD ·
 *      `<loc>` ใน sitemap · บรรทัด `Sitemap:` ใน robots.txt ต้องชี้โดเมนจริงทั้งหมด
 *      (ข้อ 3.1 ของรายงาน: เว็บนั้นประกาศโฮสต์ชั่วคราวไว้ทั้งเจ็ดที่ เท่ากับบอก
 *      เสิร์ชเอนจินว่า URL ชั่วคราวคือฉบับจริงของทุกหน้า)
 *   3. **ที่เว้นว่างในหน้าที่มีผลทางกฎหมาย** — ประกาศที่ยังมีวงเล็บว่างอยู่
 *      แย่กว่าไม่มีประกาศเลย เพราะมันเชิญให้คนส่งคำขอมาที่ที่ไม่มีใครรับ
 *   4. **การอ้างถึงกันเองของข้อมูล** — คีย์ที่เป็น `string` ธรรมดา TypeScript
 *      ตรวจให้ไม่ได้ ถ้าพิมพ์ผิดจะ**เงียบ**: แกลเลอรีว่าง · หน้าอังกฤษไม่มีคำแปล ·
 *      การ์ดหลักฐานบนหน้า Expertise หายไปโดยไม่มีอะไรพัง
 *
 * ใช้: `npm run check:content` (ต้อง `npm run build` ก่อน) · รวมอยู่ใน `npm run verify`
 * ออกด้วยรหัส 1 ถ้าเจอข้อผิดพลาด · คำเตือนไม่ทำให้ล้มเหลว
 *
 * **จงใจไม่ผูกเข้ากับ `npm run build`** ด้วยเหตุผลเดียวกับตัวตรวจอื่น — Vercel
 * รัน build ตอน deploy ถ้าสคริปต์พลาดจะทำให้เว็บจริง deploy ไม่ได้
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

/**
 * โดเมนจริงของเว็บ — **ต้องตรงกับ `SITE_URL` ใน `src/lib/schema.ts`**
 *
 * ตั้งใจไม่ `import` มา เพราะไฟล์ข้อมูลในคลังนี้อ้างกันด้วยพาธแบบไม่มีนามสกุล
 * และนามแฝง `@/` ซึ่งเป็นของ TypeScript/Next ไม่ใช่ของ Node — ตัวโหลด ESM
 * ของ Node จึงตามไม่ได้ (เหตุผลเดียวกับที่ `check-citations.ts` อ่าน
 * `publications.ts` เป็นข้อความแทนการ import) มีการตรวจว่าสองค่านี้ยังตรงกัน
 * อยู่ในสคริปต์นี้เอง ถ้าวันหนึ่งย้ายโดเมนแล้วแก้ที่เดียว สคริปต์จะฟ้อง
 */
const SITE_URL = "https://www.cominnocenter.com";

const BUILD_DIR = ".next/server/app";
const STATIC_DIR = ".next/static";
const ROBOTS = "public/robots.txt";

const SITE_HOST = new URL(SITE_URL).host;

/**
 * โฮสต์ภายนอกที่ยอมให้ปรากฏในช่องที่ประกาศ "ตัวตน" ของเว็บได้
 *
 * มีตัวเดียวคือโฮสต์รูปหลักสูตรวัฒนธรรม ซึ่งเป็น dependency ภายนอกตัวสุดท้าย
 * ที่เหลือจาก Phase 0 (ประกาศไว้ทั้งใน `next.config.ts` และ `data/privacy.ts`)
 * — ยอมให้ผ่านแต่**รายงานเป็นคำเตือนทุกครั้ง** เพราะภาพการ์ดแชร์ที่ฝากไว้กับ
 * โฮสต์ของโครงการอื่นจะพังเงียบๆ ในวันที่โครงการนั้นถูกปิด
 */
const EXTERNAL_IDENTITY_HOSTS = new Map<string, string>([
  ["cuculturecom-static.vercel.app", "โฮสต์รูปหลักสูตรวัฒนธรรม — dependency ภายนอกตัวสุดท้ายที่เหลือ"],
]);

/**
 * ค่าที่ต้องไม่โผล่ในผลลัพธ์ที่ขึ้นเว็บอีก
 *
 * ทุกแถวคือค่าที่**เคยผิดจริงบนเว็บนี้** หรือค่าของสำเนาเว็บที่เลิกใช้แล้ว
 * เพิ่มแถวใหม่ทุกครั้งที่แก้ค่าใดค่าหนึ่ง — ราคาของการเพิ่มคือหนึ่งบรรทัด
 * ราคาของการไม่เพิ่มคือค่าเก่ากลับมาโดยไม่มีใครสังเกต
 */
const FORBIDDEN: { name: string; re: RegExp; why: string }[] = [
  {
    name: "อีเมลแบบไม่มีจุด",
    // (?<!\.) กันไม่ให้ `comm.inno@chula.ac.th` ที่ถูกต้องถูกจับผิด
    re: /(?<!\.)comminno@chula\.ac\.th/g,
    why: "อีเมลศูนย์ฯ คือ comm.inno@chula.ac.th (มีจุดคั่น) — แบบไม่มีจุดเคยขึ้นเว็บพร้อมกันเก้าจุด เมลที่ส่งมาเด้งกลับโดยศูนย์ฯ ไม่รู้ตัว",
  },
  {
    name: "เบอร์โทรศัพท์เก่า",
    re: /0?2[\s-]?218[\s-]?2262/g,
    why: "เบอร์เก่าก่อน 31 ส.ค. 2569 — เบอร์ปัจจุบันอยู่ที่ src/data/contact.ts ที่เดียว",
  },
  {
    name: "เบอร์โทรศัพท์ของสำเนาเว็บที่เลิกใช้",
    re: /0?2[\s-]?218[\s-]?2215/g,
    why: "เบอร์ที่ผิดบนเว็บ comminno-web — ใส่ไว้กันการลอกค่ามาจากคลังนั้น",
  },
  {
    name: "โฮสต์ของสำเนาเว็บที่เลิกใช้",
    re: /comminno-go6lmsuy\.manus\.space|comminno-web\.vercel\.app/g,
    why: "สำเนาเว็บที่ปิดไปแล้ว (3 ก.ย. 2569) — ลิงก์ไปหาจะพาผู้อ่านไปเนื้อหาที่ไม่มีใครดูแลแล้ว",
  },
  {
    name: "โฮสต์ภาพของ Wix",
    re: /wixstatic\.com|wixmp\.com/g,
    why: "Phase 0-B ย้ายภาพมา self-host หมดแล้ว · บัญชี Wix จะถูกยกเลิกราวกลางเดือนกันยายน 2569 ภาพที่ยังชี้ไปที่นั่นจะหายทันที",
  },
  {
    name: "ชื่อคนที่สะกดผิด",
    // ชื่อคนเป็นค่าที่ผิดแล้ว "คนตรวจด้วยตาไม่มีทางรู้" เพราะไม่มีอะไรพัง
    // และคนที่รู้ว่าผิดที่สุดคือเจ้าของชื่อ ซึ่งมักไม่ใช่คนที่เปิดเว็บตรวจ
    re: /Chaemchaeng|ธวินท์|Wai\s?Phan|Ekasit\s?Sumana|เอกสิทธิ์ สุมนา/g,
    why: "ผู้ใช้ยืนยัน 3 ก.ย. 2569 — ที่ถูกคือ ธาวิน แจ่มแจ้ง / Thavin Jamjang · รศ.ดร.ไวพจน์ จันทร์เสม / Wipoj Chansem · เอกะสิทธิ์ สุมะนะ / Akasit Sumana",
  },
  // **ไม่ใส่ "Watsayut Kongchan" ไว้ในลิสต์นี้โดยตั้งใจ** — ชื่อที่เจ้าตัวใช้คือ
  // Wassayut Kongjan และเนื้อหาที่ศูนย์ฯ เขียนเองแก้ครบแล้ว (researchers.ts,
  // media.ts) แต่ **บทความที่ตีพิมพ์ไปแล้วลงชื่อว่า Watsayut Kongchan** ทั้งใน
  // Crossref และในตัววารสาร รายการอ้างอิงบนหน้า /research จึงต้องคงตามที่พิมพ์จริง
  // ถ้าใส่ไว้ ตัวตรวจจะฟ้องรายการอ้างอิงที่ถูกต้องอยู่แล้วทุกครั้งที่รัน
  {
    name: "ที่อยู่เซิร์ฟเวอร์ตอนพัฒนา",
    re: /https?:\/\/localhost(:\d+)?/g,
    why: "ค่าที่หลุดมาจากเครื่องพัฒนา — ผู้อ่านกดแล้วไปไม่ถึงไหน",
  },
];

/**
 * ที่เว้นว่างที่ต้องไม่ถูกเผยแพร่ — ตรวจใน**ซอร์ส** เพราะบางแบบถูกลบตอน build
 * แล้วเหลือเป็นช่องว่างเปล่าที่มองไม่ออกจาก HTML
 */
const PLACEHOLDER_PATTERNS: RegExp[] = [
  /\[DATE\]/,
  /\[วันที่\]/,
  /\[TBD\]/,
  /\[ระบุ[^\]]*\]/,
  /\bTODO\b/,
  /Lorem ipsum/i,
  /formspree\.io\/f\/(PLACEHOLDER|xxx)/i,
];

/** ไฟล์ที่ผู้อ่านถือเป็นคำประกาศของศูนย์ฯ — ที่เว้นว่างในนี้คือข้อผิดพลาดเสมอ */
const PLACEHOLDER_FILES = [
  "src/app/(th)/privacy-policy/page.tsx",
  "src/app/(en)/en/privacy-policy/page.tsx",
  "src/data/privacy.ts",
  "src/data/contact.ts",
  "src/app/llms.txt/route.ts",
];

const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string, keep: (name: string) => boolean): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, keep));
    else if (keep(name)) out.push(p);
  }
  return out;
}

/** อ่านเป็นข้อความ คืน null ถ้าเป็นไฟล์ไบนารี (เช่น icon.png.body) */
function readText(file: string): string | null {
  const buf = readFileSync(file);
  if (buf.includes(0)) return null;
  return buf.toString("utf8");
}

// ─── รวมไฟล์ที่ "ขึ้นเว็บจริง" ────────────────────────────────────────────────
//
// HTML และผลของ route handler (.body) คือสิ่งที่บอตและผู้อ่านได้รับ
// ส่วน .js/.css ใน static คือสิ่งที่เบราว์เซอร์รัน — อีเมลในฟอร์มติดต่อเป็น
// client component ค่าจึงอยู่ในกองนั้น ไม่ได้อยู่ใน HTML
//
// **ข้าม .map เสมอ** — source map ฝังคอมเมนต์ต้นฉบับไว้ ซึ่งในคลังนี้มีคอมเมนต์
// ที่เขียนถึงบั๊กเหล่านี้ตรงๆ (contact.ts อธิบายว่าอีเมลที่ถูกต้องต่างจากแบบเก่า
// อย่างไร) การสแกน .map จึงจับคอมเมนต์ที่*อธิบาย*บั๊กว่าเป็นตัวบั๊กเอง
const shipped = [
  ...walk(BUILD_DIR, (n) => n.endsWith(".html") || n.endsWith(".body")),
  ...walk(STATIC_DIR, (n) => (n.endsWith(".js") || n.endsWith(".css")) && !n.endsWith(".map")),
  ...(existsSync(ROBOTS) ? [ROBOTS] : []),
].filter((f) => extname(f) !== ".map");

if (!shipped.length) {
  console.error(`หา ${BUILD_DIR} ไม่เจอ — ต้องรัน npm run build ก่อน`);
  process.exit(1);
}

// ─── 1. ค่าที่เลิกใช้แล้ว ──────────────────────────────────────────────────────
const forbiddenHits = new Map<string, Set<string>>();
for (const file of shipped) {
  const body = readText(file);
  if (body === null) continue;
  for (const { name, re } of FORBIDDEN) {
    if (new RegExp(re.source, re.flags.replace("g", "")).test(body)) {
      if (!forbiddenHits.has(name)) forbiddenHits.set(name, new Set());
      forbiddenHits.get(name)!.add(file);
    }
  }
}
for (const { name, why } of FORBIDDEN) {
  const files = forbiddenHits.get(name);
  if (!files) continue;
  const list = [...files].slice(0, 3).join(" · ");
  const more = files.size > 3 ? ` (และอีก ${files.size - 3} ไฟล์)` : "";
  errors.push(`${name} — พบใน ${files.size} ไฟล์: ${list}${more}\n     เหตุ: ${why}`);
}

// ─── 2. ตัวตนของโดเมน ────────────────────────────────────────────────────────
//
// ตรวจเฉพาะช่องที่ **ประกาศว่าอะไรคือฉบับจริงของหน้านี้** ไม่ตรวจลิงก์ออกทั่วไป
// เพราะลิงก์ไป YouTube · DOI · เว็บหน่วยงานพันธมิตร เป็นของถูกต้องอยู่แล้ว
const IDENTITY_FIELDS: { name: string; re: RegExp }[] = [
  { name: "canonical", re: /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g },
  { name: "hreflang", re: /<link[^>]+rel="alternate"[^>]+href="([^"]+)"/g },
  { name: "og:url", re: /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/g },
  { name: "og:image", re: /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/g },
  { name: "twitter:image", re: /<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/g },
  { name: "JSON-LD @id", re: /"@id":\s*"(https?:\/\/[^"]+)"/g },
  { name: "sitemap <loc>", re: /<loc>([^<]+)<\/loc>/g },
  { name: "sitemap hreflang", re: /<xhtml:link[^>]+href="([^"]+)"/g },
  { name: "robots.txt Sitemap:", re: /^Sitemap:\s*(\S+)/gm },
];

const identityBadHosts = new Map<string, { field: string; files: Set<string> }>();
const identityExternal = new Map<string, { field: string; files: Set<string> }>();

for (const file of shipped) {
  // static bundle ไม่ได้ประกาศตัวตน — ข้ามเพื่อไม่ให้ regex ไปโดนสตริงใน JS
  if (file.startsWith(STATIC_DIR)) continue;
  const body = readText(file);
  if (body === null) continue;
  for (const { name, re } of IDENTITY_FIELDS) {
    for (const m of body.matchAll(re)) {
      const raw = m[1];
      if (!/^https?:\/\//.test(raw)) continue; // path สัมพัทธ์ — ไม่ได้ประกาศโฮสต์
      let host: string;
      try {
        host = new URL(raw).host;
      } catch {
        continue;
      }
      if (host === SITE_HOST) continue;
      const bucket = EXTERNAL_IDENTITY_HOSTS.has(host) ? identityExternal : identityBadHosts;
      const key = `${name} → ${host}`;
      if (!bucket.has(key)) bucket.set(key, { field: name, files: new Set() });
      bucket.get(key)!.files.add(file);
    }
  }
}

for (const [key, { files }] of identityBadHosts) {
  errors.push(
    `ตัวตนของโดเมนผิด: ${key} — ${files.size} หน้า (เช่น ${[...files][0]})\n` +
      `     เหตุ: ช่องนี้บอกเสิร์ชเอนจินว่าอะไรคือฉบับจริงของหน้า ต้องเป็น ${SITE_HOST} เสมอ`,
  );
}
for (const [key, { files }] of identityExternal) {
  const host = key.split(" → ")[1];
  warnings.push(`${key} — ${files.size} หน้า · ${EXTERNAL_IDENTITY_HOSTS.get(host)}`);
}

// ─── 2ข. คำบรรยายที่ถูกตัดกลางคำ ─────────────────────────────────────────────
//
// `description` ไม่ได้อยู่บนหน้าเว็บ จึงไม่มีใครเห็นตอนเปิดดู — มันไปโผล่ใน
// **ผลการค้นหาและการ์ดตอนแชร์ลิงก์** ซึ่งเป็นจุดที่คนเห็นเว็บนี้ครั้งแรก
//
// เคยพลาดจริง (3 ก.ย. 2569): หน้าบทสรุปงานวิจัยตัดด้วย `.slice(0, 160)` ตรงๆ
// ทำให้ **56 จาก 70 หน้าถูกตัดกลางคำ** — ภาษาอังกฤษเห็นชัด ("…checked against
// the") ภาษาไทยเห็นยากกว่าเพราะไม่มีช่องว่างระหว่างคำ ("การเปิดร" แทน "การเปิดรับ")
// แก้ด้วย `truncate()` ใน `src/lib/text.ts` ซึ่งตัดตามขอบเขตคำจริงด้วย Intl.Segmenter
//
// **ตรวจที่ซอร์ส ไม่ใช่ที่ผลลัพธ์** — ครั้งแรกเขียนตัวตรวจให้อ่านคำบรรยายที่
// build ออกมาแล้วเดาว่าถูกตัดหรือไม่จากเครื่องหมายวรรคตอนท้ายข้อความ ซึ่ง
// **ผิดสำหรับภาษาไทย**: ไทยไม่ใช้จุดจบประโยค และคำไทยจำนวนมากลงท้ายด้วย
// วรรณยุกต์ตามปกติ ("ที่" "ได้" "ไม่") เกณฑ์นั้นจึงฟ้อง 26 หน้าที่ไม่ได้มีปัญหาเลย
// ตัวการที่แท้จริงคือการเรียก `.slice()` กับข้อความ ซึ่งชี้ชัดได้ที่ซอร์สโดยตรง
// และไม่มีผลบวกลวง
const metadataFiles = walk("src/app", (n) => n.endsWith(".tsx") || n.endsWith(".ts"));
for (const file of [...metadataFiles, "src/app/llms.txt/route.ts"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    // จับเฉพาะบรรทัดที่ประกอบ description แล้วตัดด้วย .slice() — การ slice
    // อาร์เรย์ (เช่น จำกัดจำนวนผลการค้นหา) ไม่เข้าเงื่อนไขนี้
    if (/description:.*\.slice\(/.test(line)) {
      errors.push(
        `${file}: ตัด description ด้วย .slice() — "${line.trim().slice(0, 70)}"\n` +
          `     เหตุ: ตัดตามจำนวนอักขระจะขาดกลางคำ (ไทยไม่มีช่องว่างระหว่างคำ) ให้ใช้ truncate() ใน src/lib/text.ts`,
      );
    }
  }
}

// ─── 3. ที่เว้นว่างในหน้าที่มีผลทางกฎหมาย ────────────────────────────────────
for (const rel of PLACEHOLDER_FILES) {
  if (!existsSync(rel)) {
    warnings.push(`${rel}: ไม่พบไฟล์ — ถ้าย้ายที่แล้วให้แก้ PLACEHOLDER_FILES ด้วย`);
    continue;
  }
  const body = readFileSync(rel, "utf8");
  for (const re of PLACEHOLDER_PATTERNS) {
    const m = body.match(re);
    if (m) errors.push(`${rel}: ยังมีที่เว้นว่าง "${m[0]}" — ประกาศที่มีช่องว่างแย่กว่าไม่มีประกาศ`);
  }
}

// ─── 4. การอ้างถึงกันเองของข้อมูล ─────────────────────────────────────────────
//
// สี่ความสัมพันธ์นี้เป็น `Record<string, …>` หรือ `string[]` ที่ TypeScript
// ตรวจให้ไม่ได้ ถ้าคีย์พิมพ์ผิดจะไม่มีอะไรพัง — แค่เนื้อหาหายไปเงียบๆ:
// แกลเลอรีว่าง · หน้าอังกฤษไม่มีคำแปล · การ์ดหลักฐานบนหน้า Expertise หายไป
//
// อ่านจาก**ข้อความในไฟล์ข้อมูล** ด้วยเหตุผลเดียวกับที่อธิบายไว้ที่ `SITE_URL`
// ข้างบน · วิธีนี้เปราะกว่าการ import ตรงๆ ถ้าโครงไฟล์เปลี่ยนไปจะหาไม่เจอแล้ว
// **ผ่านเงียบๆ** ซึ่งอันตรายกว่าไม่ตรวจเลย จึงบังคับให้ทุกการดึงข้อมูลประกาศ
// จำนวนขั้นต่ำที่คาดไว้ และถือว่าดึงได้น้อยกว่านั้นคือสคริปต์เสีย ไม่ใช่ข้อมูลว่าง
function extract(file: string, re: RegExp, atLeast: number, what: string): string[] {
  if (!existsSync(file)) {
    console.error(`check:content — หา ${file} ไม่เจอ`);
    process.exit(1);
  }
  const found = [...readFileSync(file, "utf8").matchAll(re)].map((m) => m[1]);
  if (found.length < atLeast) {
    console.error(
      `check:content — ดึง${what}จาก ${file} ได้ ${found.length} รายการ (คาดไว้อย่างน้อย ${atLeast})\n` +
        `โครงไฟล์น่าจะเปลี่ยนไป — ต้องแก้ตัวดึงในสคริปต์นี้ ไม่ใช่ปล่อยให้ตรวจผ่านโดยไม่ได้ตรวจอะไร`,
    );
    process.exit(1);
  }
  return found;
}

const PROJECTS = "src/data/projects.ts";
const NEWS = "src/data/news.ts";
const MEDIA = "src/data/projectMedia.ts";
const COPY_EN = "src/data/projectCopyEn.ts";
const SERVICES = "src/data/services.ts";

const projectSlugs = new Set(extract(PROJECTS, /^ {4}slug: "([^"]+)"/gm, 18, "slug โครงการ"));
const newsSlugs = new Set(extract(NEWS, /^ {4}slug: "([^"]+)"/gm, 24, "slug ข่าว"));

for (const slug of extract(MEDIA, /^ {2}"([^"]+)":/gm, 17, "คีย์แกลเลอรี")) {
  if (!projectSlugs.has(slug)) {
    errors.push(`projectMedia["${slug}"]: ไม่มีโครงการ slug นี้ — แกลเลอรีชุดนี้จะไม่ถูกใช้`);
  }
}
for (const slug of extract(COPY_EN, /^ {2}"([^"]+)":/gm, 18, "คีย์คำแปลอังกฤษ")) {
  if (!projectSlugs.has(slug)) {
    errors.push(`projectCopyEn["${slug}"]: ไม่มีโครงการ slug นี้ — คำแปลชุดนี้จะไม่ถูกใช้`);
  }
}
// projectSlugs เขียนเป็นอาร์เรย์บรรทัดเดียวก็ได้ หลายบรรทัดก็ได้ — จับทั้งก้อนก่อน
// แล้วค่อยแยกสตริงข้างใน จะได้ไม่ต้องผูกกับการจัดบรรทัดของ prettier
for (const block of extract(SERVICES, /projectSlugs: (\[[^\]]*\])/gs, 9, "กลุ่ม projectSlugs")) {
  for (const m of block.matchAll(/"([^"]+)"/g)) {
    if (!projectSlugs.has(m[1])) {
      errors.push(
        `services … projectSlugs: "${m[1]}" ไม่ตรงกับโครงการใด — การ์ดหลักฐานบนหน้า Expertise จะหายไปเงียบๆ`,
      );
    }
  }
}
// sourceUrl 17 รายการชี้ /news/<slug> ภายใน (Phase 0-C) — ปลายทางต้องมีจริง
for (const src of extract(PROJECTS, /sourceUrl: "(\/news\/[^"]+)"/g, 15, "sourceUrl ภายใน")) {
  const slug = src.slice("/news/".length);
  if (!newsSlugs.has(slug)) {
    errors.push(`projects … sourceUrl → ${src}: ไม่มีข่าว slug นี้`);
  }
}

// SITE_URL ในสคริปต์นี้ต้องตรงกับของจริงใน schema.ts เสมอ (ดูเหตุผลที่ค่านั้น)
const schemaSrc = readFileSync("src/lib/schema.ts", "utf8");
const schemaUrl = schemaSrc.match(/export const SITE_URL = "([^"]+)"/)?.[1];
if (schemaUrl !== SITE_URL) {
  errors.push(
    `SITE_URL ไม่ตรงกัน — schema.ts = ${schemaUrl ?? "(หาไม่เจอ)"} · สคริปต์นี้ = ${SITE_URL}\n` +
      `     เหตุ: ถ้าไม่ตรง การตรวจตัวตนของโดเมนข้างบนจะตรวจกับโดเมนที่เลิกใช้แล้ว`,
  );
}

// ─── รายงาน ──────────────────────────────────────────────────────────────────
console.log(
  `ตรวจเนื้อหาใน ${shipped.length} ไฟล์ที่ขึ้นเว็บ · โครงการ ${projectSlugs.size} · ข่าว ${newsSlugs.size}`,
);

if (warnings.length) {
  console.log(`\n⚠ คำเตือน ${warnings.length} ข้อ (ไม่ทำให้ล้มเหลว):`);
  for (const w of warnings) console.log(`   • ${w}`);
}

if (errors.length) {
  console.error(`\n✖ พบ ${errors.length} ข้อผิดพลาด:`);
  for (const e of errors) console.error(`   • ${e}`);
  console.error("");
  process.exit(1);
}

console.log("\nเนื้อหาผ่าน — ไม่มีค่าที่เลิกใช้ · ตัวตนของโดเมนตรงกันทั้งเว็บ · ไม่มีที่เว้นว่าง · การอ้างถึงกันเองครบ");
