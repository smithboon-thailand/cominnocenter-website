/**
 * ตรวจ Content-Security-Policy ด้วยเบราว์เซอร์จริง
 *
 * **ทำไมต้องมีตัวตรวจแยกสำหรับ CSP โดยเฉพาะ**
 *
 * CSP พังแบบเงียบที่สุดในบรรดา header ทั้งหมด — เบราว์เซอร์บล็อกทรัพยากรที่ไม่อยู่
 * ในนโยบายโดยไม่ขึ้นอะไรให้ผู้อ่านเห็นเลย ผลคือ iframe ของ YouTube เป็นกรอบเปล่า
 * ฟอร์มติดต่อกดส่งแล้วไม่มีอะไรเกิดขึ้น หรือ GA ไม่เก็บอะไรเลย โดยหน้าเว็บยัง
 * "ดูปกติ" ทุกประการ · การไล่อ่านซอร์สหาโดเมนไม่พอ เพราะบางโดเมนถูกเรียกโดย
 * ไลบรารีที่เราไม่ได้เขียนเอง (Vercel Analytics) และบางตัวถูกเรียกตอนรันไทม์เท่านั้น
 *
 * ตัวตรวจนี้จึงยกเซิร์ฟเวอร์จริงขึ้นมา เปิดหน้าที่มี embed/ฟอร์มด้วยเบราว์เซอร์จริง
 * แล้วดัก `securitypolicyviolation` ที่เบราว์เซอร์ยิงออกมา ซึ่งเป็นตัวชี้ขาด
 * ไม่ใช่การเดาจากรายการโดเมน
 *
 * **จงใจไม่ผูกเข้า `npm run verify`** — ต้องยก `next start` และเปิด Chromium
 * ซึ่งช้ากว่าตัวตรวจอื่นมากและต้องมีเบราว์เซอร์ติดตั้งอยู่ · verify ต้องเร็วพอที่
 * จะรันก่อน push ทุกครั้ง · ตัวนี้ให้รันมือเมื่อ **แก้ CSP หรือเพิ่มบริการภายนอกใหม่**
 * ซึ่งเป็นสองกรณีเดียวที่ผลจะเปลี่ยน
 *
 * ใช้: `npm run build && npm run check:csp`
 *
 * **วิธีอ่านผล**: "ไม่มี CSP violation" คือผ่าน · ส่วนคำขอที่ล้มเหลวเพราะเน็ต
 * (เช่นในแซนด์บ็อกซ์ที่ต่อออกนอกไม่ได้) **ไม่ใช่ CSP** — ถ้าเป็น CSP จะมี
 * violation ขึ้นมาคู่กันเสมอ ตอนเขียนได้ทดสอบเชิงลบไว้แล้วโดยตัดสามโดเมนออก
 * จากนโยบายแล้วดูว่า violation โผล่ตรงตำแหน่งที่ควรจริง
 */
import { spawn } from "node:child_process";

/**
 * โหลด playwright แบบ dynamic — **จงใจไม่ใส่เป็น dependency ของโปรเจ็ค**
 *
 * ตัวนี้รันมือปีละไม่กี่ครั้ง (เฉพาะตอนแก้ CSP หรือเพิ่มบริการภายนอก) แต่ถ้าใส่ไว้
 * ใน devDependencies ทุก `npm ci` ของ CI และของ Vercel จะต้องโหลดมันทุกครั้ง
 * ซึ่งเป็นการจ่ายค่าเวลาทุก deploy เพื่อของที่แทบไม่ได้ใช้
 */
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "ต้องติดตั้ง playwright ก่อน (ไม่ได้เป็น dependency ของโปรเจ็คโดยตั้งใจ):\n" +
      "  npm i --no-save playwright\n" +
      "แล้วรันใหม่ · ถ้าเบราว์เซอร์อยู่คนละที่ ตั้ง CHROMIUM_PATH ด้วย",
  );
  process.exit(1);
}

const PORT = process.env.CSP_PORT || 4500;
const BASE = `http://localhost:${PORT}`;

/** หน้าที่เรียกของนอกจริง — ไม่ต้องไล่ทุกหน้า เพราะนโยบายเป็นตัวเดียวกันทั้งเว็บ */
const PAGES = [
  ["/", "หน้าแรก — hero video · YouTube facade · Vercel Analytics"],
  ["/en", "หน้าแรกอังกฤษ"],
  ["/collaborate", "ฟอร์มติดต่อ (Formspree)"],
  ["/en/collaborate", "ฟอร์มติดต่ออังกฤษ"],
  ["/impact/cultural-communication-program", "รูปจากโฮสต์ภายนอก (cuculturecom)"],
  ["/privacy-policy", "หน้านโยบาย"],
];

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: "ignore",
  detached: false,
});
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return r;
    } catch {
      /* ยังไม่ขึ้น */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`เซิร์ฟเวอร์ไม่ขึ้นภายใน 60 วินาที — build ก่อนหรือยัง`);
}

const first = await waitForServer();
const header = first.headers.get("content-security-policy");
if (!header) {
  console.error("✖ ไม่มี header Content-Security-Policy เลย — ตรวจ headers() ใน next.config.ts");
  stop();
  process.exit(1);
}
console.log(`นโยบายที่เสิร์ฟออกมา ${header.split(";").length} directive\n`);

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
let violations = 0;

for (const [path, label] of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const hosts = new Set();

  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      window.__csp.push(`${e.violatedDirective} ⟶ ${e.blockedURI}`);
    });
  });
  page.on("request", (r) => {
    try {
      const h = new URL(r.url()).host;
      if (h && !h.startsWith("localhost")) hosts.add(h);
    } catch {
      /* ข้าม data: / blob: */
    }
  });

  await page.goto(BASE + path, { waitUntil: "networkidle" });
  // เลื่อนสุดหน้าเพื่อให้ของที่โหลดเมื่อเห็นจอทำงานด้วย (คลิปพื้นหลัง CTA · รูป lazy)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2500);

  // กดเล่นวิดีโอถ้ามี — facade สร้าง iframe ตอนนี้เท่านั้น ไม่กดก็ไม่ได้ทดสอบ frame-src
  const play = page.locator('button[aria-label*="เล่น"], button[aria-label*="Play"]');
  if (await play.count()) {
    await play.first().click().catch(() => {});
    await page.waitForTimeout(2500);
  }

  // แตะปลายทางของฟอร์มโดยไม่ส่งข้อมูลจริง — ทดสอบ connect-src อย่างเดียว
  await page.evaluate(() =>
    fetch("https://formspree.io/", { mode: "no-cors" }).catch(() => {}),
  );
  await page.waitForTimeout(500);

  const found = await page.evaluate(() => window.__csp);
  const frames = await page.locator("iframe").count();

  console.log(`■ ${path} — ${label}`);
  console.log(`   โดเมนภายนอกที่ถูกเรียก: ${[...hosts].join(", ") || "(ไม่มี)"} · iframe ${frames}`);
  if (found.length) {
    violations += found.length;
    for (const v of found) console.log(`   ✖ ${v}`);
  } else {
    console.log("   ✓ ไม่มี CSP violation");
  }
  await ctx.close();
}

await browser.close();
stop();

if (violations) {
  console.error(`\n✖ พบ CSP violation รวม ${violations} รายการ — เพิ่มโดเมนใน CSP ที่ next.config.ts`);
  process.exit(1);
}
console.log("\n✅ CSP ผ่าน — ไม่มีทรัพยากรใดถูกบล็อกในหน้าที่ตรวจ");
