#!/usr/bin/env node
/**
 * แจ้ง Bing (และเสิร์ชเอนจินอื่นที่ร่วมมาตรฐาน IndexNow) ว่ามีหน้าใหม่หรือหน้าที่แก้ไข
 *
 * ทำไมต้องมี: ปกติต้องรอให้บอทมาคลานเจอเอง ซึ่งกินเวลาเป็นสัปดาห์ IndexNow ย่นเหลือ
 * ระดับนาที และเพราะ **ChatGPT search ดึงจากดัชนีของ Bing** ผลงานใหม่ของศูนย์ฯ จึงไป
 * โผล่ในคำตอบของ AI ได้เร็วขึ้นด้วย (Yandex, Naver, Seznam ใช้มาตรฐานเดียวกัน
 * ส่วน **Google ไม่ร่วม** — ฝั่ง Google ใช้ sitemap กับ Search Console เหมือนเดิม)
 *
 * วิธีใช้
 *   node scripts/indexnow.mjs https://www.cominnocenter.com/impact/ชื่อโครงการ ...
 *   node scripts/indexnow.mjs --all       ส่งทุก URL ใน sitemap (ใช้ตอนเปลี่ยนครั้งใหญ่)
 *   node scripts/indexnow.mjs --all --dry-run   ดูว่าจะส่งอะไรโดยไม่ส่งจริง
 *
 * **อย่าใส่ใน build หรือรันทุก deploy** — แนวปฏิบัติของ IndexNow คือแจ้งเฉพาะ URL
 * ที่เนื้อหาเปลี่ยนจริง การยิงทั้งเว็บซ้ำๆ ทุกครั้งที่ deploy เข้าข่ายสแปมและอาจถูก
 * จำกัดสิทธิ์ ปกติหลังเพิ่มโครงการหรือข่าวใหม่ ให้ส่งเฉพาะ URL ของหน้านั้นก็พอ
 *
 * ในเซสชัน remote ต้องรันด้วย NODE_USE_ENV_PROXY=1 ไม่งั้น fetch ออกเน็ตไม่ได้
 */

const HOST = "www.cominnocenter.com";
const ORIGIN = `https://${HOST}`;

/**
 * กุญแจนี้ต้องตรงกับชื่อไฟล์ใน public/ เป๊ะ — IndexNow จะไปดึง
 * https://www.cominnocenter.com/<key>.txt มาเทียบว่าข้างในเป็นกุญแจเดียวกันไหม
 * ถ้าไม่ตรงจะได้ 403 ทั้งหมด · เปลี่ยนกุญแจต้องเปลี่ยนทั้งสองที่พร้อมกัน
 * ไม่ใช่ความลับ (ไฟล์เปิดสาธารณะอยู่แล้ว) หน้าที่มันคือพิสูจน์ว่าเราคุมโดเมนนี้จริง
 */
const KEY = "ee6ae63fb66c9b6454fe483c44883c4d";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

/** endpoint กลาง — ส่งครั้งเดียวแล้วกระจายต่อให้ทุกเจ้าที่ร่วมมาตรฐาน */
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** IndexNow รับได้สูงสุด 10,000 URL ต่อคำขอ แบ่งก้อนเผื่อไว้ */
const BATCH = 1000;

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`ดึง sitemap ไม่ได้: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urls) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  const body = await res.text();
  return { status: res.status, body: body.trim() };
}

/** ความหมายของรหัสตอบกลับ — เขียนไว้เพราะ IndexNow ตอบมาเป็นตัวเลขเปล่าๆ ไม่มีคำอธิบาย */
const MEANING = {
  200: "รับแล้ว เรียบร้อย",
  202: "รับแล้ว กำลังตรวจกุญแจอยู่ (ปกติสำหรับการส่งครั้งแรก)",
  400: "รูปแบบคำขอไม่ถูกต้อง",
  403: "กุญแจไม่ผ่าน — ตรวจว่าไฟล์ public/<key>.txt ขึ้นเว็บแล้วและข้างในตรงกับ KEY",
  422: "URL ไม่ได้อยู่ในโดเมนนี้ หรือกุญแจไม่ตรงกับโฮสต์",
  429: "ส่งถี่เกินไป — เว้นระยะแล้วลองใหม่",
};

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const all = args.includes("--all");
  const explicit = args.filter((a) => !a.startsWith("--"));

  if (!all && explicit.length === 0) {
    console.error(
      "ต้องระบุ URL อย่างน้อยหนึ่งรายการ หรือใช้ --all\n" +
        "  node scripts/indexnow.mjs https://www.cominnocenter.com/impact/talk-thai-today\n" +
        "  node scripts/indexnow.mjs --all",
    );
    process.exit(1);
  }

  const urls = all ? await urlsFromSitemap() : explicit;

  // กัน 422 ตั้งแต่ต้นทาง: IndexNow ปฏิเสธทั้งก้อนถ้ามี URL นอกโดเมนปนมาแค่รายการเดียว
  const foreign = urls.filter((u) => !u.startsWith(`${ORIGIN}/`) && u !== ORIGIN);
  if (foreign.length) {
    console.error(`URL เหล่านี้ไม่ได้อยู่บน ${HOST} จึงส่งไม่ได้:`);
    for (const u of foreign) console.error(`  ${u}`);
    process.exit(1);
  }

  console.log(`เตรียมส่ง ${urls.length} URL ไปยัง IndexNow`);
  if (urls.length <= 12) for (const u of urls) console.log(`  ${u}`);
  else console.log(`  ${urls.slice(0, 5).join("\n  ")}\n  ... และอีก ${urls.length - 5} รายการ`);

  if (dryRun) {
    console.log("\n--dry-run: ไม่ได้ส่งจริง");
    return;
  }

  let failed = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH);
    const { status, body } = await submit(chunk);
    const note = MEANING[status] ?? "ไม่รู้จักรหัสนี้";
    const ok = status === 200 || status === 202;
    if (!ok) failed++;
    console.log(`\n${ok ? "สำเร็จ" : "ล้มเหลว"} — HTTP ${status}: ${note}`);
    if (body) console.log(`ข้อความจากเซิร์ฟเวอร์: ${body}`);
  }

  if (failed) process.exit(1);
  console.log(
    "\nส่งเรียบร้อย · ดูผลได้ที่ Bing Webmaster Tools → IndexNow" +
      "\n(Bing รับไว้ทันทีแต่ยังต้องใช้เวลาไปเก็บดัชนีจริงอีกระยะ)",
  );
}

main().catch((err) => {
  console.error("ผิดพลาด:", err.message);
  process.exit(1);
});
