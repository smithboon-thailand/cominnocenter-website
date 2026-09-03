/**
 * ตรวจว่า "เส้นทาง" ของเว็บยังต่อกันครบ — ลิงก์ · sitemap · redirect · คู่ไทย-อังกฤษ
 *
 * ทำไมต้องมี (3 ก.ย. 2569)
 *
 * เว็บนี้มี **หน้าที่ build ออกมาเกินร้อยหน้า** และ **กฎ redirect หลายสิบข้อ** ใน
 * `next.config.ts` ที่เขียนไว้ตอนย้ายจาก Wix · ทั้งสองกองนี้โตขึ้นเรื่อยๆ และ
 * ความผิดพลาดของมันเป็นชนิดที่**เปิดดูหน้าเว็บแล้วไม่มีทางเจอ** เพราะมันเกิด
 * ที่ *URL ที่เราไม่ได้เปิด* — ลิงก์ที่พิมพ์ผิดไปหน้าที่ไม่มีอยู่ · หน้าใหม่ที่ลืม
 * ใส่ใน sitemap · กฎ redirect ที่บังหน้าจริงจนหน้านั้นไม่มีวันถูกเรียกถึง
 *
 * ข้อสุดท้าย**เคยเกิดขึ้นจริงในคลังนี้แล้ว** — คอมเมนต์ใน `next.config.ts` บันทึกไว้ว่า
 * `/privacy-policy` เคยมีกฎ redirect ส่งไปหน้าแรกตั้งแต่ตอนที่ยังไม่มีหน้าจริง
 * พอทำหน้าจริงเสร็จ หน้ายังเปิดไม่ได้อยู่หลายวัน เพราะ redirect ทำงาน*ก่อน* routing
 * ตอนนั้นจับได้ด้วยการสังเกตเอา สคริปต์นี้ทำให้ครั้งหน้าจับได้ตั้งแต่ก่อน push
 *
 * แนวคิดเดียวกับ `check-rendered-text.mjs` และ `check-image-files.mjs` คือ
 * **อ่านผลลัพธ์ที่ build ออกมาจริง ไม่ใช่อ่านซอร์ส** และไม่ต้องยกเซิร์ฟเวอร์ขึ้น
 * จึงรันใน CI หรือบนเครื่องไหนก็ได้เท่ากัน
 *
 * ข้อจำกัดที่ต้องรู้: ตัวจับคู่รูปแบบ `source` ของ redirect ในไฟล์นี้รองรับเท่าที่
 * `next.config.ts` ใช้อยู่จริง (`:name` และ `:name*`) ไม่ได้รองรับไวยากรณ์เต็มของ
 * path-to-regexp เช่น `(\\d+)` หรือ `has`/`missing` — ถ้าวันหนึ่งเพิ่มกฎแบบนั้น
 * ต้องมาขยายตัวจับคู่ด้วย ไม่งั้นสคริปต์จะรายงานผิดแบบเงียบๆ
 *
 * ใช้: `npm run check:routes` (ต้อง `npm run build` ก่อน) · รวมอยู่ใน `npm run verify`
 * ออกด้วยรหัส 1 ถ้าเจอปัญหา
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../next.config.ts";

const BUILD_DIR = ".next/server/app";

/**
 * หน้าที่ **ตั้งใจ** ไม่อยู่ใน sitemap — ทุกบรรทัดต้องมีเหตุผลกำกับ
 *
 * ถ้าไม่มีลิสต์นี้ ทางเลือกมีแค่ "ไม่ตรวจเลย" กับ "ตรวจแล้วมีเสียงรบกวนทุกครั้ง"
 * ซึ่งจบลงที่คนอ่านข้ามผลการตรวจไปทั้งหมด การเขียนเหตุผลไว้ทำให้การเพิ่มรายการใหม่
 * เป็นการตัดสินใจที่มีคนเห็น ไม่ใช่การปิดเสียงเตือน
 */
const SITEMAP_EXEMPT = new Map<string, string>([
  ["/_not-found", "หน้า 404 — ไม่ควรอยู่ใน sitemap ตามนิยาม"],
]);

/** ไฟล์นิ่งใน public/ — ลิงก์ไปได้แต่ไม่ใช่ route ที่ Next รู้จัก */
const NON_PAGE_PREFIXES = ["/images/", "/illustrations/", "/_next/"];

/**
 * route ที่ไม่ใช่หน้า HTML แต่มีอยู่จริง — `/llms.txt` `/sitemap.xml` `/icon.png` ฯลฯ
 *
 * **อ่านจากผลลัพธ์ที่ build ออกมา ไม่ได้เขียนรายการไว้ตายตัว** เพราะรายการที่พิมพ์ไว้เอง
 * จะล้าสมัยเงียบๆ ทุกครั้งที่มีคนเพิ่ม route handler ใหม่ · Next วางผลของ route handler
 * ไว้เป็นไฟล์ `<route>.body` การอ่านจากตรงนั้นจึงตามของจริงเสมอ และยังทำให้ลิงก์ที่
 * พิมพ์ผิด เช่น `/llm.txt` ยังถูกจับได้อยู่ ซึ่งลิสต์กว้างๆ แบบ `*.txt` จะปล่อยผ่าน
 */
const ROBOTS_TXT = "/robots.txt"; // ไฟล์นิ่งใน public/ ไม่ได้ผ่าน route handler จึงไม่มี .body

function walk(dir: string, ext: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, ext));
    else if (name.endsWith(ext)) out.push(p);
  }
  return out;
}

let htmlFiles: string[];
let nonPageRoutes: Set<string>;
try {
  htmlFiles = walk(BUILD_DIR, ".html");
  nonPageRoutes = new Set([
    ROBOTS_TXT,
    ...walk(BUILD_DIR, ".body").map((f) => f.slice(BUILD_DIR.length).replace(/\.body$/, "")),
  ]);
} catch {
  console.error(`หา ${BUILD_DIR} ไม่เจอ — ต้องรัน npm run build ก่อน`);
  process.exit(1);
}

/** `.next/server/app/impact/talk-thai-today.html` → `/impact/talk-thai-today` */
const routeOf = (file: string) => {
  const rel = file.slice(BUILD_DIR.length).replace(/\.html$/, "");
  return rel === "/index" ? "/" : rel;
};

const pages = new Map<string, string>(); // route → ไฟล์ที่ build ออกมา
for (const f of htmlFiles) pages.set(routeOf(f), f);

const problems: string[] = [];
const fail = (msg: string) => problems.push(msg);

// ── 1. redirect: source ต้องไม่บังหน้าจริง · destination ต้องมีอยู่และไม่ต่อกันเป็นทอด ──

type Rule = { source: string; destination: string };
const rules = ((await nextConfig.redirects?.()) ?? []) as Rule[];

/** แปลง `source` ของ Next เป็น RegExp — รองรับ `:name` และ `:name*` เท่าที่ใช้จริง */
const sourceMatcher = (source: string) =>
  new RegExp(
    "^" +
      source
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/:[A-Za-z0-9_]+\*/g, ".*")
        .replace(/:[A-Za-z0-9_]+/g, "[^/]+") +
      "$",
  );

const matchers = rules.map((r) => ({ ...r, re: sourceMatcher(r.source) }));
const matchedBy = (path: string) => matchers.filter((m) => m.re.test(path));

for (const rule of rules) {
  // **บั๊กที่เคยเกิดจริง**: กฎที่ source ตรงกับหน้าที่มีอยู่ — หน้านั้นจะไม่มีวันถูกเรียกถึง
  if (pages.has(rule.source)) {
    fail(
      `redirect บังหน้าจริง: "${rule.source}" มีหน้าอยู่แล้ว แต่ถูก redirect ไป "${rule.destination}" — ` +
        "redirect ทำงานก่อน routing หน้านั้นจึงเปิดไม่ได้เลย",
    );
  }
  // ปลายทางต้องเป็นหน้าที่มีจริง ไม่งั้น redirect พาผู้อ่านไป 404
  const destPath = rule.destination.split(/[?#]/)[0];
  if (!pages.has(destPath) && !nonPageRoutes.has(destPath)) {
    fail(`redirect ไปหน้าที่ไม่มี: "${rule.source}" → "${rule.destination}"`);
  }
  // ปลายทางต้องไม่ถูกกฎข้ออื่นจับต่อ — ทั้ง redirect ซ้อนทอดและวนกลับหาตัวเอง
  for (const m of matchedBy(destPath)) {
    fail(
      m.source === rule.source
        ? `redirect วนหาตัวเอง: "${rule.source}" → "${rule.destination}"`
        : `redirect ต่อกันเป็นทอด: "${rule.source}" → "${rule.destination}" แล้วโดนกฎ "${m.source}" จับต่อ`,
    );
  }
}

// ── 2. ลิงก์ภายในทุกเส้นต้องไปถึงหน้าที่มีจริง (หรือมี redirect รองรับ) ──

const linkSources = new Map<string, Set<string>>();
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\shref="(\/[^"]*)"/g)) {
    const path = m[1].split(/[?#]/)[0].replace(/\/$/, "") || "/";
    if (NON_PAGE_PREFIXES.some((p) => path.startsWith(p))) continue;
    if (nonPageRoutes.has(path)) continue;
    if (!linkSources.has(path)) linkSources.set(path, new Set());
    linkSources.get(path)!.add(routeOf(file));
  }
}

for (const [path, from] of [...linkSources].sort()) {
  if (pages.has(path)) continue;
  if (matchedBy(path).length) continue; // redirect รับไว้ ไม่ใช่ 404
  const where = [...from].slice(0, 3).join(", ");
  fail(
    `ลิงก์ไปหน้าที่ไม่มี: "${path}" — ถูกลิงก์จาก ${where}` +
      (from.size > 3 ? ` และอีก ${from.size - 3} หน้า` : ""),
  );
}

// ── 3. sitemap ต้องตรงกับหน้าที่ build ออกมาจริง ทั้งสองทาง ──

let sitemapPaths: Set<string> | undefined;
try {
  const xml = readFileSync(join(BUILD_DIR, "sitemap.xml.body"), "utf8");
  sitemapPaths = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      const path = new URL(m[1]).pathname.replace(/\/$/, "");
      return path || "/";
    }),
  );
} catch {
  fail("อ่าน sitemap ที่ build ออกมาไม่ได้ — ตรวจว่า src/app/sitemap.ts ยังทำงานอยู่");
}

if (sitemapPaths) {
  for (const path of [...sitemapPaths].sort()) {
    if (!pages.has(path)) fail(`sitemap ชี้ไปหน้าที่ไม่มี: "${path}"`);
  }
  for (const path of [...pages.keys()].sort()) {
    if (sitemapPaths.has(path) || SITEMAP_EXEMPT.has(path)) continue;
    fail(`หน้าที่ build ออกมาแต่ไม่อยู่ใน sitemap: "${path}"`);
  }
}

// ── 4. ไทยกับอังกฤษต้องมีครบเป็นคู่ ──

const enOf = (path: string) => (path === "/" ? "/en" : `/en${path}`);
const thOf = (path: string) => (path === "/en" ? "/" : path.slice(3));

for (const path of [...pages.keys()].sort()) {
  if (SITEMAP_EXEMPT.has(path)) continue;
  if (path.startsWith("/en")) {
    const th = thOf(path);
    if (!pages.has(th)) fail(`หน้าอังกฤษไม่มีคู่ไทย: "${path}" แต่ไม่มี "${th}"`);
  } else {
    const en = enOf(path);
    if (!pages.has(en)) fail(`หน้าไทยไม่มีคู่อังกฤษ: "${path}" แต่ไม่มี "${en}"`);
  }
}

// ── สรุป ──

const counts = `หน้า ${pages.size} · ลิงก์ภายใน ${linkSources.size} ปลายทาง · redirect ${rules.length} กฎ`;
if (problems.length) {
  console.error(`\n❌ พบปัญหาเส้นทาง ${problems.length} ข้อ (${counts})\n`);
  for (const p of problems) console.error(`  · ${p}`);
  console.error("");
  process.exit(1);
}
console.log(`✅ เส้นทางครบถ้วน — ${counts}`);
