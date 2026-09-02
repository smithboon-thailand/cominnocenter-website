/**
 * สร้าง src/data/publications.ts จาก API สาธารณะ — ไม่มีการกรอกข้อมูลเอง
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/fetch-publications.mjs     (ต้องใส่ตัวแปรนี้ในเซสชัน remote)
 *
 * ── หลักการตรวจสอบ (สำคัญ อย่าตัดออก) ─────────────────────────────────────
 * ผลงานจะขึ้นเว็บได้ต่อเมื่อ "มีจริง" และ "เป็นของคนนั้นจริง" เท่านั้น จึงตรวจ 2 ชั้น:
 *
 *  1. ทุกรายการที่มี DOI ต้องผ่าน verifyDoi() — ดึง metadata จริงจาก Crossref
 *     แล้วเทียบนามสกุลผู้เขียน ถ้าไม่ตรง = DOI ผิดคน ตัดทิ้งทันที
 *     (เคยเจอจริง: ชื่อเรื่องคล้ายกันแต่เป็นงานของคนละคนสนิท 3 รายการ)
 *
 *  2. รายการที่ไม่มี DOI จะถูกค้นในดัชนีอิสระ (Crossref + Semantic Scholar)
 *     โดยบังคับว่านามสกุลผู้เขียนต้องตรงด้วย ไม่ใช่แค่ชื่อเรื่องคล้าย
 *
 * ผลลัพธ์บันทึกเป็นฟิลด์ verified 3 ระดับ:
 *   "doi"   — มี DOI และยืนยันผู้เขียนแล้ว (น่าเชื่อถือสูงสุด)
 *   "index" — ไม่มี DOI แต่พบในดัชนีอิสระพร้อมชื่อผู้เขียนตรงกัน
 *   "self"  — พบเฉพาะในระเบียน ORCID ที่เจ้าตัวแจ้งเอง ยังไม่มีดัชนีอิสระยืนยัน
 *
 * หมายเหตุ: "self" ไม่ได้แปลว่างานไม่มีจริง — วารสารไทยจำนวนมาก (TCI/ThaiJO)
 * และเวทีประชุมวิชาการไม่จด DOI และไม่อยู่ใน Crossref/Semantic Scholar
 * แต่เว็บต้องแสดงให้ผู้อ่านรู้ว่ารายการไหนตรวจสอบออนไลน์ได้ รายการไหนยังไม่ได้
 *
 * ── แหล่งข้อมูล ────────────────────────────────────────────────────────────
 * - ORCID public API — ผลงานในโปรไฟล์ ORCID (ดู source ของแต่ละรายการประกอบ)
 * - Crossref API — ผู้เขียนที่ยังไม่มี ORCID และใช้ตรวจสอบ/เติมข้อมูลทุกรายการ
 * - Semantic Scholar API — ดัชนีสำรองสำหรับรายการที่ไม่มี DOI
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const UA = {
  "User-Agent": "cominnocenter-website/1.0 (mailto:comminno@chula.ac.th)",
  Accept: "application/json",
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * แคชคำตอบของทะเบียนไว้บนดิสก์ — **เพื่อให้รันซ้ำได้เมื่อโดนจำกัดอัตรา**
 *
 * ทำไมต้องมี (2 ก.ย. 2569): รอบที่ต้องแก้ข้อมูลการอ้างอิง Crossref ตอบ 429 กับ
 * **ทุก DOI ติดกันทั้ง 125 รายการ** หลังจบช่วงค้นรายชื่อผลงาน (ช่วงนั้นยิงไปหลาย
 * ร้อยครั้งเพื่อไล่หน้าแบบ cursor) การถอยเป็นเท่าตัวไม่ช่วย เพราะไม่ใช่การติดขัด
 * ชั่วขณะแต่เป็นการถูกปัดต่อเนื่อง — และกติกาข้อ 8 ห้ามแก้ publications.ts ด้วยมือ
 * **พอสคริปต์รันไม่จบ ข้อมูลผลงานก็แก้ไม่ได้เลยทั้งชุด**
 *
 * แคชทำให้รอบถัดไปข้ามสิ่งที่ได้มาแล้ว ยิงเฉพาะที่ยังขาด รันซ้ำไม่กี่รอบก็ครบ
 * **ไม่ได้ทำให้การตรวจสอบอ่อนลง** เพราะคำตอบที่เก็บคือคำตอบจริงของทะเบียน และ
 * หมดอายุใน 7 วัน · ไฟล์อยู่ใน .cache/ ซึ่งไม่ขึ้นคลัง · สั่ง --no-cache เพื่อยิงสดทั้งหมด
 */
const CACHE_URL = new URL("../.cache/registry-responses.json", import.meta.url);
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const useCache = !process.argv.includes("--no-cache");
let cache = {};
if (useCache) {
  try {
    cache = JSON.parse(readFileSync(CACHE_URL, "utf8"));
  } catch {
    /* ยังไม่มีแคช — เริ่มจากว่าง */
  }
}
let cacheDirty = false;
const cacheGet = (url) => {
  const hit = cache[url];
  if (!useCache || !hit) return undefined;
  return Date.now() - hit.at < CACHE_TTL_MS ? hit.body : undefined;
};
const cachePut = (url, body) => {
  cache[url] = { at: Date.now(), body };
  cacheDirty = true;
};
const flushCache = () => {
  if (!cacheDirty) return;
  mkdirSync(new URL("../.cache/", import.meta.url), { recursive: true });
  writeFileSync(CACHE_URL, JSON.stringify(cache));
  cacheDirty = false;
};

/**
 * เรียก API แบบทนการถูกจำกัดอัตรา
 *
 * ทำไมต้องมี (31 ส.ค. 2569): เดิมเจอ 429 แล้วโยน error ทันที ทั้งสคริปต์ล้มตั้งแต่
 * ผู้เขียนคนแรก ทำให้**รันสคริปต์ใหม่ไม่ได้เลย**ในวันที่เคยยิง ORCID/Crossref ไปมาก
 * ซึ่งร้ายกว่าที่คิด เพราะกติกาข้อ 8 ห้ามแก้ publications.ts ด้วยมือ — พอสคริปต์
 * รันไม่ได้ ข้อมูลผลงานวิชาการก็แก้ไม่ได้เลยทั้งชุด
 *
 * 429 กับ 503 คือ "ช้าลงหน่อย" ไม่ใช่ "ผิดพลาด" จึงรอแล้วลองใหม่ เคารพ Retry-After
 * ที่เซิร์ฟเวอร์บอกมาก่อน ถ้าไม่บอกก็ถอยเป็นเท่าตัว ส่วนรหัสอื่น (404, 500) โยนทันที
 * เพราะรอไปก็ไม่หาย
 */
/**
 * ข้อผิดพลาดที่แปลว่า "ติดต่อทะเบียนไม่ได้" ไม่ใช่ "ทะเบียนตอบว่าไม่มี"
 * ต้องแยกให้ออก เพราะสองอย่างนี้นำไปสู่การตัดสินใจคนละทางโดยสิ้นเชิง (ดู resolveDoi)
 */
class RegistryUnavailable extends Error {}

/**
 * เว้นจังหวะระหว่างการเรียกทะเบียน — **กันไม่ให้ถูกจำกัดอัตราตั้งแต่แรก**
 *
 * ทำไมต้องมี (2 ก.ย. 2569): การถอยเป็นเท่าตัวข้างล่างแก้ปัญหา*หลัง*โดน 429 แล้ว
 * แต่รอบที่รันจริงกลับโดน 429 **ทุกรายการติดกัน** หลังจบช่วงค้นรายชื่อผลงาน
 * (Crossref ยอมให้ยิงรัว ๆ ได้ช่วงสั้น ๆ แล้วเริ่มปัด) ผลคือแต่ละ DOI เสียเวลา
 * 30 วินาทีไปกับการรอเปล่า ๆ และสุดท้ายก็ไม่ได้ข้อมูล
 *
 * ยิงห่างกันประมาณหนึ่งในสามวินาทีช้ากว่าเดิมไม่ถึงหนึ่งนาทีตลอดทั้งรอบ
 * แต่ทำให้รันจบได้จริง — และเป็นมารยาทที่ Crossref ขอไว้ในเอกสารของเขาเอง
 */
let nextCallAt = 0;
const PACE_MS = 350;
const pace = async () => {
  const wait = nextCallAt - Date.now();
  if (wait > 0) await sleep(wait);
  nextCallAt = Date.now() + PACE_MS;
};

const getJson = async (url, tries = 5) => {
  const cached = cacheGet(url);
  if (cached !== undefined) return cached;
  for (let attempt = 1; ; attempt++) {
    await pace();
    const res = await fetch(url, { headers: UA });
    if (res.ok) {
      const body = await res.json();
      cachePut(url, body);
      flushCache();
      return body;
    }
    const retryable = res.status === 429 || res.status === 503;
    if (!retryable) throw new Error(`HTTP ${res.status}`);
    if (attempt >= tries) throw new RegistryUnavailable(`HTTP ${res.status} หลังลอง ${tries} ครั้ง`);
    const after = Number(res.headers.get("retry-after"));
    const waitMs = Number.isFinite(after) && after > 0 ? after * 1000 : 2000 * 2 ** (attempt - 1);
    console.warn(`  HTTP ${res.status} — รอ ${Math.round(waitMs / 1000)} วิแล้วลองใหม่ (${attempt}/${tries - 1})`);
    await sleep(waitMs);
  }
};

/** ผู้เขียนของศูนย์ฯ — surname ใช้ตรวจว่า DOI/ดัชนีที่เจอเป็นของคนนี้จริง */
const AUTHORS = {
  "smith-boonchutima": { orcid: "0000-0001-7412-4506", surname: "boonchutima" },
  "teerada-chongkolrattanaporn": { orcid: "0000-0003-2785-8595", surname: "chongkolrattanaporn" },
  "pavel-slutskiy": { crossref: { family: "slutskiy", givenPattern: /pavel/i }, surname: "slutskiy" },
};

/**
 * วารสารไทยบน ThaiJO/TCI ไม่จด DOI และไม่อยู่ใน Crossref/Semantic Scholar
 * แต่หน้าบทความของ OJS ปล่อย meta tag มาตรฐาน (citation_author, citation_date)
 * ซึ่งเป็น "ระเบียนทางการของวารสาร" — ใช้ยืนยันผู้เขียนได้จริง
 *
 * ตารางนี้เก็บเฉพาะ URL ส่วนที่เหลือดึงสดจากหน้าเว็บทุกครั้งที่รัน และ
 * ถ้า meta ไม่มีชื่อผู้เขียนที่อ้าง สคริปต์จะไม่ใส่ลิงก์ให้ (กันลิงก์ผิดคน)
 *
 *   match   = รายการที่มีอยู่แล้วจาก ORCID — เติมลิงก์และแก้ปีให้ตรงระเบียนทางการ
 *   (ไม่มี match) = ผลงานที่ยังไม่ได้ลงใน ORCID — เพิ่มเป็นรายการใหม่
 */
const THAIJO_SOURCES = [
  {
    match: /health belief model of the retirees/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/253798",
  },
  {
    match: /crisis communication of digital television channels/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/251243",
  },
  {
    match: /factors predicting consumer.{0,3}s loyalty/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/247870",
  },
  {
    match: /requirement and concern towards health form/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/230947",
    // ระเบียนวารสารระบุ Smith Boonchutima ร่วมด้วย แต่ ORCID ของ อ.ธีรดา ลงชื่อเดียว
    addAuthors: ["smith-boonchutima"],
  },
  {
    match: /#nodam in #maewong/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/148722",
  },
  {
    match: /role of social media in political advertising/i,
    url: "https://so03.tci-thaijo.org/index.php/jprad/article/view/132679",
  },
  {
    match: /inappropriate content of sexual harassment/i,
    url: "https://so02.tci-thaijo.org/index.php/jcomm/article/view/259563",
  },
  {
    // ยังไม่มีใน ORCID — ใช้ชื่ออังกฤษทางการจาก DC.Title.Alternative ของวารสาร
    title: "Reframing Thailand's Southern Border Conflict through a Self-transcendental Narrative Paradigm",
    venue: "Journal of Communication Arts",
    type: "journal-article",
    authors: ["teerada-chongkolrattanaporn"],
    url: "https://so02.tci-thaijo.org/index.php/jcomm/article/view/275202",
  },
  {
    title: "Relationship Marketing Communication of Horror Storytelling Programs",
    venue: "Journal of Communication and Management NIDA",
    type: "journal-article",
    authors: ["teerada-chongkolrattanaporn"],
    url: "https://so12.tci-thaijo.org/index.php/jcmn/article/view/5690",
  },
];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
/** สัดส่วนคำสำคัญของ a ที่ปรากฏใน b */
function titleOverlap(a, b) {
  const A = new Set(norm(a).split(" ").filter((w) => w.length > 3));
  const B = new Set(norm(b).split(" ").filter((w) => w.length > 3));
  if (!A.size) return 0;
  let hit = 0;
  for (const w of A) if (B.has(w)) hit++;
  return hit / A.size;
}
/**
 * ทะเบียนแต่ละแห่งเก็บชื่อผู้เขียนคนละรูปแบบ:
 *   Crossref  → { family, given }
 *   CSL/doi.org ของวารสารไทยหลายฉบับ → { literal: "Smith Boonchutima" }
 *   Semantic Scholar → { name }
 * ต้องอ่านให้ครบทุกแบบ ไม่งั้นจะตัดงานจริงทิ้ง (เคยเกิดกับ 10.14456/jhr.2015.30)
 */
const surnameIn = (authorList, surname) =>
  (authorList || []).some((a) =>
    norm(`${a.family || ""} ${a.literal || ""} ${a.name || ""}`).includes(surname)
  );

async function fromOrcid() {
  const out = [];
  for (const [slug, cfg] of Object.entries(AUTHORS)) {
    if (!cfg.orcid) continue;
    const data = await getJson(`https://pub.orcid.org/v3.0/${cfg.orcid}/works`);
    for (const group of data.group) {
      const work = group["work-summary"][0];
      const doi = (group["external-ids"]?.["external-id"] || []).find(
        (e) => e["external-id-type"] === "doi"
      );
      out.push({
        person: slug,
        title: (work.title?.title?.value || "").trim(),
        venue: (work["journal-title"]?.value || "").trim(),
        year: Number(work["publication-date"]?.year?.value) || 0,
        type: work.type,
        doi: doi ? doi["external-id-value"].toLowerCase() : "",
        /** ใครใส่รายการนี้ใน ORCID — ระบบภายนอกหรือเจ้าตัว */
        orcidSource: work.source?.["source-name"]?.value || "",
      });
    }
    await sleep(300);
  }
  return out;
}

/**
 * ค้นผลงานจาก Crossref ตามนามสกุลผู้เขียน — **อ่านให้ครบทุกหน้า**
 *
 * ทำไมต้องวนหน้า (แก้ 31 ส.ค. 2569): เดิมขอมา `rows=80` หน้าเดียวจบ แต่คำค้น
 * `query.author=slutskiy` มีผลลัพธ์ 133 รายการ ส่วนที่เกิน 80 จึงไม่เคยถูกอ่านเลย
 * และเพราะ Crossref เรียงตาม*ความเกี่ยวข้อง* ซึ่งขยับได้เรื่อยๆ ผลงานชิ้นเดียวกัน
 * จึง**หลุดเข้าหลุดออกจากเว็บได้เองโดยไม่มีใครแตะโค้ด**
 *
 * เจอของจริง: "In Defense of Advertising Value Equivalency" (2026) เคยอยู่บนเว็บ
 * แล้วหายไปเฉยๆ ในการรันรอบถัดมา เพราะตกไปอยู่นอก 80 อันดับแรก
 *
 * ใช้ cursor ของ Crossref (deep paging) วนจนกว่าจะไม่มีรายการเหลือ — ไม่ใช่เพิ่ม
 * rows ให้ใหญ่ขึ้นเฉยๆ เพราะนั่นแค่เลื่อนเพดานออกไป ไม่ได้แก้ต้นเหตุ
 */
async function fromCrossref() {
  const out = [];
  for (const [slug, cfg] of Object.entries(AUTHORS)) {
    if (!cfg.crossref) continue;
    const { family, givenPattern } = cfg.crossref;
    let cursor = "*";
    let seen = 0;
    let mineCount = 0;
    for (;;) {
      const res = await getJson(
        `https://api.crossref.org/works?query.author=${family}&rows=200` +
          `&cursor=${encodeURIComponent(cursor)}` +
          `&select=title,container-title,publisher,issued,type,DOI,author,is-referenced-by-count`
      );
      const items = res.message.items || [];
      if (!items.length) break;
      seen += items.length;
      for (const item of items) {
        // Crossref มีผู้เขียนนามสกุลเดียวกันหลายคน — บังคับตรวจชื่อต้น
        const mine = (item.author || []).some(
          (a) => (a.family || "").toLowerCase() === family && givenPattern.test(a.given || "")
        );
        if (!mine) continue;
        mineCount++;
        out.push({
          person: slug,
          title: (item.title || [""])[0].trim(),
          venue: (item["container-title"] || [""])[0] || item.publisher || "",
          year: item.issued?.["date-parts"]?.[0]?.[0] || 0,
          type: item.type,
          doi: (item.DOI || "").toLowerCase(),
          citations: item["is-referenced-by-count"],
          orcidSource: "",
        });
      }
      const next = res.message["next-cursor"];
      if (!next || next === cursor) break;
      cursor = next;
      await sleep(300);
    }
    console.log(`  Crossref ${family}: อ่าน ${seen} รายการ เป็นของผู้เขียนคนนี้ ${mineCount}`);
    await sleep(300);
  }
  return out;
}

function dedupe(all) {
  const map = new Map();
  for (const p of all) {
    const key = p.doi || `${p.person}::${norm(p.title)}`;
    const prev = map.get(key);
    if (prev) {
      prev.people = [...new Set([...prev.people, p.person])];
      prev.venue = prev.venue || p.venue;
      prev.citations = prev.citations ?? p.citations;
      prev.orcidSource = prev.orcidSource || p.orcidSource;
    } else {
      map.set(key, { ...p, people: [p.person] });
    }
  }
  return [...map.values()];
}

/** ดึง metadata ของ DOI — ลอง Crossref ก่อน แล้วค่อย doi.org content negotiation (รองรับ DOI ไทย/DataCite) */
/**
 * ดึง metadata ของ DOI
 *
 * **คืน null = ทะเบียนบอกว่าไม่มี DOI นี้ · โยน RegistryUnavailable = เราติดต่อไม่ได้**
 *
 * ความต่างนี้สำคัญมาก (แก้ 31 ส.ค. 2569): เดิม catch กลืนทุกข้อผิดพลาดแล้วคืน null
 * ซึ่งผู้เรียกตีความว่า "DOI เปิดไม่ได้" แล้ว**ลดระดับรายการเป็น self เงียบๆ**
 * ผลคือถ้ารันสคริปต์ในวันที่ Crossref จำกัดอัตรา (429) ผลงานที่ยืนยันแล้วหลายสิบชิ้น
 * จะถูกเขียนทับให้กลายเป็น "ข้อมูลจากโปรไฟล์ ORCID ของผู้เขียน" ทั้งที่ตรวจสอบได้จริง
 * DOI หายจาก JSON-LD ไปด้วย และไม่มีอะไรเตือนเลย — เจอกับตัวจริงตอนรันรอบนี้
 *
 * ตอนนี้ผู้เรียกจะรู้ว่าเป็นคนละกรณี และหยุดทั้งการรันแทนที่จะเขียนข้อมูลที่ด้อยลง
 */
/**
 * เก็บ metadata ที่ "การอ้างอิง" ต้องใช้ — ผู้เขียนครบทุกคน ปีที่ ฉบับที่ เลขหน้า
 *
 * ทำไมต้องเก็บเพิ่ม (1 ก.ย. 2569): field `authors` ของเราเก็บแต่ **คนของศูนย์ฯ**
 * เพราะออกแบบไว้ใช้กรองผลงานตามผู้เขียนในหน้า /research ไม่ได้ตั้งใจให้ครบทุกคน
 * ตัวอย่างจริง: บทความ Cogent 2024 มีผู้เขียนสามคน (Rodpangtiam, Boonchutima,
 * Mazahir) แต่เราเก็บไว้คนเดียว ถ้าเอาข้อมูลชุดนั้นไปสร้างการอ้างอิง **ผู้ร่วมวิจัย
 * จะหายไปจากเครดิตทุกครั้งที่มีคนคัดลอกไปใช้** ซึ่งเป็นความผิดพลาดทางวิชาการที่
 * ร้ายแรงกว่าข้อมูลไม่ครบธรรมดา — คนที่เอาไปแปะในวิทยานิพนธ์จะอ้างผิดโดยไม่รู้ตัว
 *
 * จึงเก็บรายชื่อผู้เขียนตามที่ทะเบียนบันทึกไว้แยกอีกชุด พร้อมข้อมูลที่ APA/MLA
 * บังคับต้องมี (ปีที่ ฉบับที่ เลขหน้า สำนักพิมพ์) — ทั้งหมดมาจาก Crossref ที่เรา
 * เรียกอยู่แล้ว เดิมโยนทิ้งไปเปล่าๆ
 */
/**
 * ตรวจว่าค่าที่ทะเบียนส่งมา "เข้าเค้า" ก่อนเชื่อ
 *
 * ทำไมต้องมี (1 ก.ย. 2569): ทะเบียนบางแห่งลงข้อมูลสลับช่อง เจอของจริงกับ
 * 10.14456/jhr.2016.32 และ 10.14456/jhr.2015.30 ที่ doi.org ส่งมาว่า
 *   container-title = "4"                       ← ที่จริงคือเลขฉบับ
 *   page            = "Journal of Health Research" ← ที่จริงคือชื่อวารสาร
 *
 * เรารับมาทั้งดุ้น ผลคือหน้า /research แสดงชื่อวารสารเป็น "4" กับ "5" อยู่บน
 * production จริง และค่านั้นถูกส่งเข้า JSON-LD ให้ Google ด้วย
 *
 * **ไม่สลับค่าคืนให้เอง** แม้จะเดาได้ว่าอันไหนควรอยู่ช่องไหน เพราะการเดาแทน
 * ทะเบียนคือสิ่งที่กติกาข้อ 8 ห้าม — ทิ้งค่าที่ไม่เข้าเค้าไป แล้วให้ระบบถอยไปใช้
 * ค่าจาก ORCID ที่ผู้เขียนกรอกเอง (ซึ่งกรณีนี้ถูกต้อง: "Journal of Health Research")
 */
const looksLikeJournal = (v) => Boolean(v) && !/^\d+$/.test(v.trim());
/** เลขหน้าจริงมีหน้าตาแบบ "144-154" · "151" · "e0317506" — ไม่ใช่วลีที่มีเว้นวรรค */
const looksLikePages = (v) => Boolean(v) && /^[A-Za-z]?\d/.test(v.trim()) && !/\s/.test(v.trim());

/**
 * เลขบทความ (article number / eLocator) ไม่ใช่เลขหน้า — ต้องแยกช่องกัน
 *
 * APA 7 สั่งให้ใส่คำว่า "Article" นำหน้าเลขบทความ (เช่น `20(2), Article e0317506.`)
 * ส่วน MLA 9 ห้ามใส่ `pp.` นำหน้า เพราะมันไม่ใช่หน้า ถ้าเก็บรวมช่องเดียวกับเลขหน้า
 * เราจะแยกไม่ออกตอนสร้างการอ้างอิง และได้ `pp. e0317506` ซึ่งผิดทั้งสองมาตรฐาน
 * (Grok ตรวจเจอ ผู้ใช้แจ้งเมื่อ 2 ก.ย. 2569)
 *
 * รูปแบบที่ถือว่าเป็นเลขบทความ: ขึ้นต้นด้วยตัวอักษรแล้วตามด้วยตัวเลข เช่น
 * `e0317506` (PLOS) · `e15478` (Heliyon) — วารสารที่ใช้ตัวเลขล้วนเป็นเลขบทความ
 * (เช่น Wellcome Open Research `11:151`) **แยกจากเลขหน้าไม่ได้จากรูปแบบ**
 * จึงปล่อยไว้เป็นเลขหน้าตามที่ทะเบียนส่งมา ไม่เดาแทน
 */
const looksLikeArticleNumber = (v) => /^[A-Za-z]+\d[\w.-]*$/.test(v.trim());

/**
 * เลขหน้าปลอมของบทความ "ตีพิมพ์ออนไลน์ก่อน" — ตัวเลขยาวที่เป็นรหัสภายในของสำนักพิมพ์
 *
 * ของจริงที่เจอ: 10.1177/00027642221118297 ทะเบียนส่ง page = "000276422211182"
 * ซึ่งคือเลข DOI ตัดท้าย ไม่ใช่เลขหน้า ถ้าปล่อยไว้จะได้ `American Behavioral
 * Scientist, 000276422211182.` บนหน้าเว็บจริง
 */
const looksLikeOnlineFirstStub = (v) => /^\d{8,}$/.test(v.trim());

/**
 * ทะเบียนบางแห่งลง "ชื่อหน่วยงาน" ไว้ในช่องผู้เขียน — ต้องคัดออกก่อนสร้างการอ้างอิง
 *
 * ของจริงที่เจอ: 10.55131/jphd/2022/200118 ลงชื่อ "Faculty of Communication Arts,
 * Chulalongkorn University, Bangkok, Thailand" ไว้เป็นผู้เขียนถึง 5 รายการสลับกับคนจริง
 * ผลคือรายการอ้างอิงบนเว็บจริงขึ้นว่า "Faculty of Communication Arts, Chulalongkorn
 * University, Bangkok, Thailand, Boonchutima, S., ..." ซึ่งอ่านไม่รู้เรื่องและผิด
 *
 * **คัดออกอย่างเดียว ไม่แปลงเป็นชื่อคน** ตามหลักเดียวกับ `looksLikeJournal`:
 * ทิ้งค่าที่ไม่เข้าเค้าดีกว่าเดาแทนทะเบียน
 */
const ORG_WORDS =
  /\b(universit|facult|department|college|institute|school|hospital|ministry|centre|center|laborator|foundation|academy|society|association)\w*/i;
const looksLikeOrganisation = (name) => ORG_WORDS.test(name) || (name.match(/,/g) || []).length >= 2;

/**
 * แก้ข้อมูลบรรณานุกรมที่ทะเบียน **ลงไว้ไม่ครบหรือผิด** — ตรวจจากตัวบทความเอง
 *
 * ต่างจากการกรอกผลงานเองด้วยมือซึ่งกติกาข้อ 8 ห้าม: รายการที่อยู่ในตารางนี้ต้อง
 * **มีอยู่ในทะเบียนแล้ว** และผ่านการตรวจว่าเป็นผลงานของผู้เขียนจริงมาก่อน ตารางนี้
 * เติมเฉพาะช่องที่ทะเบียนเว้นว่างหรือลงผิด โดยอ้างหลักฐานจากตัวไฟล์บทความ
 * ทุกแถวต้องมีคอมเมนต์บอกว่าดูจากอะไร เพื่อให้คนถัดไปตรวจซ้ำได้
 */
/**
 * ชื่อเรื่องที่ **ทะเบียนลงไว้ไม่ครบ** — เทียบกับหน้าแรกของไฟล์บทความแล้วเท่านั้น
 *
 * ต่างจากการแก้ตัวพิมพ์ใหญ่-เล็กซึ่งทำตอนจัดรูปการอ้างอิง (ดู `src/lib/citation.ts`)
 * ตารางนี้แก้ **ตัวอักษรที่หายไปจากทะเบียนจริง ๆ** ซึ่งจัดรูปอย่างไรก็ไม่คืนมา
 */
const TITLE_FIXES = {
  // Crossref เก็บชื่อเรื่องไว้ว่า "s Video-art Becoming..." — ตัว I หายไปตั้งแต่ตอน
  // สำนักพิมพ์ฝากข้อมูล ตรวจกับหน้าแรกของไฟล์บทความ (IAFOR Journal of Cultural
  // Studies 3(1), 2018) ซึ่งพิมพ์ว่า "Is Video-art Becoming a Form of Popular Art?
  // The case of Apple TV's Aerial Screen Savers"
  "10.22492/ijcs.3.1.05":
    "Is Video-art Becoming a Form of Popular Art? The case of Apple TV’s Aerial Screen Savers",
};

const CITATION_FIXES = {
  // CMAP เป็นวารสารไทยที่จด DOI กับ TCI ไม่ใช่ Crossref ทะเบียนจึงมีชื่อผู้เขียน
  // คนแรกคนเดียวแบบ literal และไม่มีเลขฉบับ — ตรวจจากหน้าแรกของบทความ (CMAP
  // 2023, vol. 6, no. 1, pp. 52-62) ซึ่งระบุผู้เขียนสองคนและเลขฉบับไว้ครบ
  "10.14456/cmap.2023.5": {
    authors: [
      { family: "Lounporn", given: "Emmika", literal: "" },
      { family: "Chongkolrattanaporn", given: "Teerada", literal: "" },
    ],
    issue: "1",
  },
};

function citationFrom(meta, doi = "") {
  const authors = (meta.author || [])
    .map((a) => ({
      family: clean(a.family || ""),
      given: clean(a.given || ""),
      literal: clean(a.literal || a.name || ""),
    }))
    .filter((a) => a.family || a.literal)
    // ชื่อที่มีแต่ literal และอ่านแล้วเป็นหน่วยงาน ไม่ใช่คน — ตัดทิ้ง
    .filter((a) => a.family || !looksLikeOrganisation(a.literal));
  if (!authors.length) return undefined;
  const parts = meta.issued?.["date-parts"]?.[0] || [];
  const container = clean((meta["container-title"] || [""])[0] || "");
  const rawPages = clean(meta.page || "");
  const pages = looksLikePages(rawPages) && !looksLikeOnlineFirstStub(rawPages) ? rawPages : "";
  const rawArticleNumber = clean(meta["article-number"] || "");
  // เลขยาวที่สำนักพิมพ์ใช้ตอนตีพิมพ์ออนไลน์ก่อนไม่ใช่เลขบทความจริง ตัดทิ้งเหมือนกับเลขหน้า
  const depositedArticleNumber = looksLikeOnlineFirstStub(rawArticleNumber) ? "" : rawArticleNumber;
  return {
    authors,
    containerTitle: looksLikeJournal(container) ? container : "",
    // ทะเบียนบางแห่งลงว่า "Volume 10" ทั้งคำ ซึ่งจะกลายเป็น "vol. Volume 10" ใน MLA
    volume: clean(meta.volume || "").replace(/^vol(?:ume)?\.?\s+/i, ""),
    issue: clean(meta.issue || ""),
    // ทะเบียนบางแห่งลงเลขบทความไว้ทั้งช่อง page และช่อง article-number (เช่น Elsevier)
    // ถ้าเก็บทั้งคู่ การอ้างอิงจะมีตัวเลขเดียวกันโผล่สองที่ จึงเก็บไว้ช่องเดียว
    page:
      looksLikeArticleNumber(pages) || pages === depositedArticleNumber ? "" : pages,
    articleNumber:
      depositedArticleNumber || (looksLikeArticleNumber(pages) ? pages : ""),
    publisher: clean(meta.publisher || ""),
    year: parts[0] || 0,
    month: parts[1] || 0,
    day: parts[2] || 0,
    ...(CITATION_FIXES[doi] || {}),
  };
}

async function resolveDoi(doi) {
  try {
    const meta = (await getJson(`https://api.crossref.org/works/${doi}`)).message;
    return {
      title: TITLE_FIXES[doi] || (meta.title || [""])[0] || "",
      authors: meta.author || [],
      venue: looksLikeJournal((meta["container-title"] || [""])[0]) ? meta["container-title"][0] : "",
      publisher: meta.publisher || "",
      year: meta.issued?.["date-parts"]?.[0]?.[0] || 0,
      type: meta.type || "",
      citations: meta["is-referenced-by-count"],
      citation: citationFrom(meta, doi),
    };
  } catch (err) {
    // ติดต่อ Crossref ไม่ได้ ≠ Crossref บอกว่าไม่มี — อย่ากลืน
    if (err instanceof RegistryUnavailable) throw err;
    /* ไม่มีใน Crossref — ลองต่อด้านล่าง */
  }
  try {
    const cslUrl = `csl:https://doi.org/${doi}`;
    let d = cacheGet(cslUrl);
    if (d === undefined) {
      await pace();
      const res = await fetch(`https://doi.org/${doi}`, {
        headers: { ...UA, Accept: "application/vnd.citationstyles.csl+json" },
        redirect: "follow",
      });
      if (res.status === 429 || res.status === 503) {
        throw new RegistryUnavailable(`doi.org ตอบ HTTP ${res.status}`);
      }
      if (!res.ok) return null;
      d = await res.json();
      cachePut(cslUrl, d);
      flushCache();
    }
    return {
      title: TITLE_FIXES[doi] || (typeof d.title === "string" ? d.title : (d.title || [""])[0] || ""),
      authors: d.author || [],
      venue: looksLikeJournal(d["container-title"]) ? d["container-title"] : "",
      publisher: d.publisher || "",
      year: d.issued?.["date-parts"]?.[0]?.[0] || 0,
      type: d.type || "",
      citations: undefined,
      // CSL ใช้ชื่อ field ชุดเดียวกับ Crossref จึงส่งเข้า citationFrom ได้ตรงๆ
      citation: citationFrom(
        {
          ...d,
          "container-title": [typeof d["container-title"] === "string" ? d["container-title"] : ""],
        },
        doi,
      ),
    };
  } catch (err) {
    if (err instanceof RegistryUnavailable) throw err;
    // เครือข่ายล้มก็คือติดต่อไม่ได้เหมือนกัน ไม่ใช่หลักฐานว่า DOI ไม่มีจริง
    if (err instanceof TypeError) throw new RegistryUnavailable(`doi.org: ${err.message}`);
    return null;
  }
}

/**
 * ชั้นที่ 1 — ตรวจ DOI
 *
 * ผลลัพธ์ 3 ทาง:
 *   null      = DOI ชี้ไปงานของ "คนอื่น" ชัดเจน (ทะเบียนมีรายชื่อผู้เขียนแต่ไม่มีชื่อเรา) → ตัดทิ้ง
 *   "doi"     = ทะเบียนยืนยันชื่อผู้เขียนตรงกัน
 *   "link"    = DOI เปิดได้และชื่อเรื่องตรง แต่ทะเบียนไม่ได้ลงรายชื่อผู้เขียนไว้เลย
 *               (พบบ่อยในวารสารไทย/วารสารเล็ก — ลิงก์ใช้ได้ แต่ยืนยันผู้เขียนอัตโนมัติไม่ได้)
 */
async function verifyDoi(row) {
  const meta = await resolveDoi(row.doi);
  if (!meta) return { ...row, verified: "self" }; // DOI เปิดไม่ได้เลย ถือว่าไม่มีลิงก์

  const surnames = row.people.map((slug) => AUTHORS[slug].surname);
  const registryHasAuthors = (meta.authors || []).some((a) =>
    `${a.family || ""}${a.literal || ""}${a.name || ""}`.trim()
  );
  const matched = surnames.some((s) => surnameIn(meta.authors, s));

  const sameTitle = !meta.title || titleOverlap(row.title, meta.title) >= 0.8;

  // DOI ชี้ไปงานคนละชิ้นและคนละคน = จับคู่ผิด ตัดทิ้ง
  if (!matched && !sameTitle) return null;

  // ทะเบียนไม่ลงชื่อผู้เขียนเลย แต่ชื่อเรื่องก็ไม่ตรง = เชื่อไม่ได้ ตัดทิ้ง
  if (!registryHasAuthors && !sameTitle) return null;

  // เหลือกรณี: ชื่อเรื่องตรงเป๊ะแต่ทะเบียนไม่มีชื่อเรา
  // วารสารไทยหลายฉบับลงเฉพาะผู้เขียนคนแรก (เช่น 10.14456/cmap.2023.5 ลงแค่ชื่อเดียว)
  // จึงไม่ตัดทิ้ง แต่ลดระดับเป็น "link" — ให้ลิงก์ไปตรวจเอง ไม่อ้างว่ายืนยันผู้เขียนแล้ว

  return {
    ...row,
    /**
     * ใช้ชื่อเรื่องจากทะเบียนเมื่อยืนยันว่าเป็นงานชิ้นเดียวกันแล้ว
     *
     * ทำไม (1 ก.ย. 2569): ORCID เก็บชื่อเรื่องของวารสารไทยหลายรายการมาเป็น
     * ตัวพิมพ์ใหญ่ทั้งบรรทัด ตัว fixCaps() จึงแปลงเป็นตัวเล็กทั้งหมดยกเว้นตัวแรก
     * ซึ่ง**ทำลายคำวิสามานยนาม** — ผู้ใช้ทักมาว่า 10.14456/jhr.2015.30 ขึ้นบนเว็บ
     * ว่า "...in thailand's department..." ทั้งที่ทะเบียนบันทึกไว้ถูกต้องว่า
     * "...in Thailand's Department of Disease Control: a Descriptive Study"
     *
     * ทะเบียนคือบันทึกทางการของฉบับตีพิมพ์ จึงน่าเชื่อกว่าค่าที่ผู้เขียนพิมพ์ลง
     * ORCID เอง · ใช้ต่อเมื่อชื่อเรื่องทับกันพอ (sameTitle) แล้วเท่านั้น ไม่งั้น
     * เสี่ยงหยิบชื่องานคนอื่นมาแทน
     */
    title:
      meta.title && titleOverlap(row.title, meta.title) >= 0.8 ? meta.title : row.title,
    verified: matched ? "doi" : "link",
    // ทะเบียนที่ค่าเข้าเค้า → ค่าที่ผู้เขียนกรอกใน ORCID → ชื่อสำนักพิมพ์ (ทางเลือกสุดท้าย)
    venue: meta.venue || row.venue || meta.publisher || "",
    year: meta.year || row.year,
    type: meta.type || row.type,
    citations: meta.citations ?? row.citations,
    citation: meta.citation,
  };
}

/**
 * ชั้นที่ 2 — ไม่มี DOI: ค้นดัชนีอิสระ โดยชื่อเรื่องต้องใกล้เคียง *และ* นามสกุลผู้เขียนต้องตรง
 */
async function findInIndexes(row) {
  const surnames = row.people.map((slug) => AUTHORS[slug].surname);
  const query = encodeURIComponent(row.title.slice(0, 120));

  try {
    const res = await getJson(
      `https://api.crossref.org/works?query.bibliographic=${query}&rows=3&select=title,DOI,author,container-title,issued,type,is-referenced-by-count`
    );
    for (const item of res.message.items || []) {
      const t = (item.title || [""])[0] || "";
      // ประเภทต้องตรงกันด้วย — ชื่อเรื่องคล้ายกันแต่คนละประเภทมักเป็นคนละงาน
      // (เคยเกิด: วิทยานิพนธ์ ป.เอก ถูกจับคู่กับบทความประชุมที่ตั้งชื่อใกล้เคียงกัน)
      if (normalizeType(item.type) !== normalizeType(row.type)) continue;
      if (titleOverlap(row.title, t) >= 0.75 && surnames.some((s) => surnameIn(item.author, s))) {
        return {
          ...row,
          verified: "doi",
          doi: (item.DOI || "").toLowerCase(),
          venue: (item["container-title"] || [""])[0] || row.venue,
          year: item.issued?.["date-parts"]?.[0]?.[0] || row.year,
          type: item.type || row.type,
          citations: item["is-referenced-by-count"] ?? row.citations,
        };
      }
    }
  } catch {
    /* ค้นไม่สำเร็จ ถือว่าไม่พบ */
  }
  await sleep(400);

  // Semantic Scholar ไม่มี API key = โดน 429 บ่อย ต้อง backoff ไม่งั้นจะได้ผลลัพธ์ว่างทั้งชุด
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await getJson(
        `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&limit=3&fields=title,externalIds,year,authors,url`
      );
      for (const item of res.data || []) {
        if (
          titleOverlap(row.title, item.title || "") >= 0.75 &&
          surnames.some((s) => surnameIn(item.authors, s))
        ) {
          return {
            ...row,
            verified: "index",
            indexUrl: item.url || `https://www.semanticscholar.org/paper/${item.paperId}`,
            year: item.year || row.year,
          };
        }
      }
      break; // ค้นสำเร็จแต่ไม่เจอที่ตรงเงื่อนไข
    } catch (err) {
      if (!String(err.message).includes("429")) break;
      await sleep(3000 * (attempt + 1));
    }
  }

  return { ...row, verified: "self" };
}

/**
 * ทะเบียนใช้ชื่อประเภทหลากหลายกว่าที่เว็บรองรับ (เช่น proceedings-article, monograph)
 * ต้อง map ให้เหลือ 4 ประเภทเสมอ ไม่งั้น TypeScript ฝั่งเว็บจะ build ไม่ผ่าน
 */
const TYPE_MAP = {
  "journal-article": "journal-article",
  "proceedings-article": "conference-paper",
  "conference-paper": "conference-paper",
  book: "book",
  monograph: "book",
  "edited-book": "book",
  "reference-book": "book",
  "book-chapter": "book-chapter",
  "book-part": "book-chapter",
  "book-section": "book-chapter",
  chapter: "book-chapter",
  dissertation: "book",
  "posted-content": "journal-article",
  report: "journal-article",
  other: "journal-article",
};
const normalizeType = (t) => TYPE_MAP[String(t || "").toLowerCase()] || "journal-article";

/**
 * ดึงระเบียนทางการจากหน้าบทความ OJS (ThaiJO) แล้วยืนยันชื่อผู้เขียน
 * คืน null ถ้าเปิดไม่ได้ หรือ meta ไม่มีชื่อผู้เขียนที่อ้าง = ไม่ใส่ลิงก์นั้น
 */
async function verifyThaijo(url, surnames) {
  let html;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; cominnocenter-website)" } });
    if (!res.ok) return null;
    html = await res.text();
  } catch {
    return null;
  }
  const metaValues = (name) =>
    [...html.matchAll(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]*)"`, "gi"))].map((m) => m[1]);
  const authors = [...metaValues("citation_author"), ...metaValues("DC.Creator.PersonalName")];
  if (!surnames.some((s) => authors.some((a) => norm(a).includes(s)))) return null;
  const date = metaValues("citation_date")[0] || metaValues("citation_publication_date")[0] || "";
  return {
    authors,
    year: Number((date.match(/\d{4}/) || [])[0]) || 0,
    venue: metaValues("citation_journal_title")[0] || "",
  };
}

/** เติมลิงก์ ThaiJO ให้รายการเดิม และเพิ่มผลงานที่ยังไม่ได้ลงใน ORCID */
async function applyThaijoSources(rows) {
  for (const source of THAIJO_SOURCES) {
    const targetAuthors = source.match
      ? rows.find((r) => source.match.test(r.title))?.people
      : source.authors;
    if (!targetAuthors) {
      console.warn(`  ThaiJO: ไม่พบรายการที่ตรงกับ ${source.match} — ข้าม`);
      continue;
    }
    const surnames = targetAuthors.map((slug) => AUTHORS[slug].surname);
    const official = await verifyThaijo(source.url, surnames);
    await sleep(500);
    if (!official) {
      console.warn(`  ThaiJO: ระเบียนไม่ยืนยันผู้เขียน ไม่ใส่ลิงก์ — ${source.url}`);
      continue;
    }

    if (source.match) {
      const row = rows.find((r) => source.match.test(r.title));
      row.verified = "index";
      row.indexUrl = source.url;
      if (official.year) row.year = official.year; // ใช้ปีจากระเบียนทางการ
      if (official.venue) row.venue = official.venue;
      if (source.addAuthors) row.people = [...new Set([...row.people, ...source.addAuthors])];
      console.log(`  ThaiJO ✓ ${row.year} ${row.title.slice(0, 55)}`);
    } else {
      rows.push({
        title: source.title,
        venue: official.venue || source.venue,
        year: official.year || source.year || 0,
        type: source.type,
        verified: "index",
        indexUrl: source.url,
        people: source.authors,
      });
      console.log(`  ThaiJO + ${official.year} ${source.title.slice(0, 55)} (ยังไม่มีใน ORCID)`);
    }
  }
}

/**
 * ถอดรหัส HTML entity ที่ติดมากับ metadata ของ Crossref
 *
 * ทำไมต้องมี (31 ส.ค. 2569): Crossref ส่งชื่อวารสารมาเป็น "HIV &amp; AIDS Review"
 * และ "Cogent Business &amp; Management" พอ React เอาไป render มันไม่ตีความ entity
 * ซ้ำ (ซึ่งถูกต้องแล้ว — เป็นเกราะกัน XSS) ผลคือผู้อ่าน**เห็นตัวอักษร `&amp;`
 * โผล่บนหน้าเว็บจริงๆ** และ entity ยังหลุดเข้าไปใน JSON-LD ที่ส่งให้ Google ด้วย
 *
 * แก้ที่ต้นทางคือตรงนี้ ไม่ใช่ที่หน้าเว็บ — เพราะข้อมูลชุดนี้ถูกใช้ทั้งใน UI,
 * JSON-LD, /llms.txt และดัชนีค้นหา ถ้าไปแก้ทีละที่จะพลาดสักที่แน่นอน
 */
const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    // &amp; ต้องแทนหลังสุด ไม่งั้น "&amp;lt;" จะกลายเป็น "<" แทนที่จะเป็น "&lt;"
    .replace(/&amp;/g, "&");

const clean = (s) =>
  decodeEntities(s)
    .replace(/\s+/g, " ")
    .replace(/\[version \d.*$/i, "")
    .replace(/[“”]/g, '"')
    // เว้นวรรคหลังทวิภาคที่ติดกับตัวอักษร — ทะเบียนบางระเบียนพิมพ์ติดกันมา เช่น
    // "...Cruelty-free Products:Their Value..." ซึ่งผิดแบบแผนการพิมพ์และอ่านสะดุด
    // จำกัดเฉพาะกรณีที่ตามด้วยตัวอักษร จึงไม่ไปแตะ "https://" หรือ "DOI:10.x"
    .replace(/:(?=[A-Za-z])/g, ": ")
    .trim();
const fixCaps = (t) => (t === t.toUpperCase() && t.length > 15 ? t.charAt(0) + t.slice(1).toLowerCase() : t);

function render(entries, stats) {
  return `/**
 * ผลงานวิชาการของศูนย์ฯ (generated ${new Date().toISOString().slice(0, 10)})
 *
 * ไฟล์นี้สร้างด้วย scripts/fetch-publications.mjs — อย่าแก้ด้วยมือ ให้รันสคริปต์ใหม่แทน
 *
 * ทุกรายการผ่านการตรวจว่า "มีจริง" และ "เป็นของผู้เขียนคนนั้นจริง":
 * - รายการที่มี DOI ถูกดึง metadata จาก Crossref มาเทียบนามสกุลผู้เขียน
 *   DOI ที่ชี้ไปงานของคนอื่นถูกตัดออกแล้ว (รอบล่าสุดตัดออก ${stats.rejected} รายการ)
 * - รายการที่ไม่มี DOI ถูกค้นในดัชนีอิสระโดยบังคับให้นามสกุลผู้เขียนตรงด้วย
 * - งานชิ้นเดียวที่สำนักพิมพ์จด DOI ซ้ำสองเลขถูกยุบเป็นรายการเดียว
 *   (รอบล่าสุดยุบ ${stats.duplicates} รายการ) เก็บเลขที่มียอดอ้างอิงสูงกว่า
 *
 * ระดับการตรวจสอบ (field verified):
 *   "doi"   ${stats.doi} รายการ — ทะเบียน DOI ยืนยันชื่อผู้เขียนตรงกัน
 *   "link"  ${stats.link} รายการ — DOI เปิดได้และชื่อเรื่องตรง แต่ทะเบียนไม่ลงรายชื่อผู้เขียน
 *   "index" ${stats.index} รายการ — พบในดัชนีอิสระพร้อมชื่อผู้เขียนตรงกัน
 *   "self"  ${stats.self} รายการ — มีเฉพาะที่ผู้เขียนแจ้งไว้ใน ORCID
 *           ส่วนใหญ่เป็นวารสารไทย (TCI/ThaiJO) และเวทีประชุมที่ไม่จด DOI
 *           ไม่ได้แปลว่าไม่มีจริง แต่ยังตรวจสอบออนไลน์อัตโนมัติไม่ได้
 */

export type PublicationType = "book" | "journal-article" | "book-chapter" | "conference-paper";

/**
 * ระดับหลักฐานของแต่ละรายการ — ใช้ทั้งแสดงบนหน้าเว็บและคัดกรองก่อนส่งเข้า JSON-LD
 *   doi   ทะเบียน DOI ยืนยันชื่อผู้เขียนตรงกัน
 *   link  DOI เปิดได้ ชื่อเรื่องตรง แต่ทะเบียนไม่ได้ลงรายชื่อผู้เขียน (วารสารไทยส่วนใหญ่)
 *   index พบในดัชนีอิสระพร้อมชื่อผู้เขียนตรงกัน (ไม่มี DOI)
 *   self  มีเฉพาะที่ผู้เขียนแจ้งไว้ใน ORCID
 */
export type VerificationLevel = "doi" | "link" | "index" | "self";

export type PublicationEntry = {
  title: string;
  venue: string;
  year: number;
  type: PublicationType;
  verified: VerificationLevel;
  /** มีเมื่อ verified เป็น "doi" หรือ "link" */
  doi?: string;
  /** ลิงก์ดัชนีอิสระ มีเมื่อ verified === "index" */
  indexUrl?: string;
  /** จำนวนการอ้างอิงจาก Crossref — แสดงเฉพาะที่มากกว่า 0 */
  citations?: number;
  /**
   * slug ของผู้เขียน **เฉพาะคนของศูนย์ฯ** ใน leadership.ts — ใช้กรองในหน้า /research
   * **ไม่ใช่รายชื่อผู้เขียนครบทุกคน** ห้ามเอาไปสร้างการอ้างอิง ให้ใช้ citation.authors
   */
  authors: string[];
  /** จำนวนบทในเล่ม (เฉพาะ type: book) */
  chapters?: number;
  /**
   * ข้อมูลบรรณานุกรมตามที่ทะเบียนบันทึกไว้ — มีเฉพาะรายการที่ยืนยันผ่าน DOI
   * ฟิลด์ authors ในนี้คือ**ผู้เขียนครบทุกคน** รวมผู้ร่วมวิจัยที่ไม่ได้อยู่ในศูนย์ฯ
   */
  citation?: CitationMeta;
};

/** ข้อมูลที่ APA / MLA / BibTeX / RIS ต้องใช้ ดึงจากทะเบียน ไม่ได้กรอกเอง */
export type CitationMeta = {
  authors: { family: string; given: string; literal: string }[];
  containerTitle: string;
  volume: string;
  issue: string;
  /** ช่วงหน้าจริง เช่น "144-154" — ว่างเมื่อวารสารใช้เลขบทความแทนเลขหน้า */
  page: string;
  /**
   * เลขบทความ (article number / eLocator) เช่น "e0317506" หรือ "77"
   *
   * **คนละช่องกับ page โดยตั้งใจ** APA 7 ต้องใส่คำว่า "Article" นำหน้า
   * ส่วน MLA 9 ต้องไม่ใส่ "pp." ถ้าเก็บรวมกันจะแยกไม่ออกตอนสร้างการอ้างอิง
   */
  articleNumber: string;
  publisher: string;
  year: number;
  month: number;
  day: number;
};

export const publications: PublicationEntry[] = ${JSON.stringify(entries, null, 2)};

/** รายการที่มีลิงก์ให้ผู้อ่านกดตรวจสอบเองได้ */
export const verifiablePublications = publications.filter((p) => p.verified !== "self");

export const publicationYears = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

export const publicationStats = {
  total: publications.length,
  verifiable: verifiablePublications.length,
  selfReported: publications.filter((p) => p.verified === "self").length,
  books: publications.filter((p) => p.type === "book").length,
  articles: publications.filter((p) => p.type === "journal-article").length,
  chapters:
    publications.filter((p) => p.type === "book-chapter").length +
    publications.reduce((sum, p) => sum + (p.chapters || 0), 0),
  conference: publications.filter((p) => p.type === "conference-paper").length,
  venues: new Set(publications.map((p) => p.venue).filter(Boolean)).size,
  since: Math.min(...publications.map((p) => p.year)),
};
`;
}

// ── run ─────────────────────────────────────────────────────────────────────
const merged = dedupe([...(await fromOrcid()), ...(await fromCrossref())]);
console.log(`fetched ${merged.length} unique records`);

const rejected = [];
const checked = [];
/** รายการที่ตรวจไม่ได้เพราะติดต่อทะเบียนไม่ได้ — ไม่ใช่เพราะข้อมูลมีปัญหา */
const unreachable = [];
for (const row of merged) {
  let result;
  try {
    result = row.doi ? await verifyDoi(row) : await findInIndexes(row);
  } catch (err) {
    if (!(err instanceof RegistryUnavailable)) throw err;
    unreachable.push({ row, reason: err.message });
    console.warn(`  ติดต่อทะเบียนไม่ได้: ${row.doi || row.title.slice(0, 50)} — ${err.message}`);
    await sleep(350);
    continue;
  }
  if (result === null) {
    rejected.push(row);
    console.warn(`  REJECTED (DOI belongs to someone else): ${row.doi} — ${row.title.slice(0, 60)}`);
  } else {
    checked.push(result);
  }
  await sleep(350);
}

/**
 * หยุดทั้งการรันถ้าตรวจไม่ครบ — ไม่เขียนไฟล์
 *
 * เหตุผล: ไฟล์ที่สคริปต์นี้เขียนคือ**แหล่งความจริงเดียว**ของผลงานวิชาการบนเว็บ
 * ถ้าเขียนทับตอนที่ยืนยันไม่ครบ ผลงานที่ตรวจสอบได้จริงจะถูกลดระดับหรือหายไป
 * โดยไม่มีใครสังเกต ซึ่งขัดกับกติกาข้อ 8 ของโปรเจ็คโดยตรง
 *
 * ข้อมูลเดิมที่ถูกต้องอยู่แล้วดีกว่าข้อมูลใหม่ที่ด้อยลง — ให้รอแล้วรันใหม่
 */
if (unreachable.length) {
  console.error(
    `\nหยุดการทำงาน: ตรวจสอบไม่ได้ ${unreachable.length} รายการ เพราะติดต่อทะเบียนไม่ได้` +
      `\n(ปกติเกิดจากถูกจำกัดอัตราเรียก — เว้นสัก 30–60 นาทีแล้วรันใหม่)` +
      `\n**ไม่ได้เขียนทับ src/data/publications.ts** ข้อมูลเดิมยังอยู่ครบ`,
  );
  for (const u of unreachable.slice(0, 10)) {
    console.error(`  ${u.row.doi || "(ไม่มี DOI)"} — ${u.row.title.slice(0, 60)}`);
  }
  process.exit(1);
}

// เติมลิงก์ระเบียนทางการของวารสารไทย (ตรวจผู้เขียนสดทุกครั้ง)
console.log("\nchecking ThaiJO records...");
await applyThaijoSources(checked);

// ยุบบทในหนังสือของตัวเองเข้ากับเล่ม + รวมยอดอ้างอิงของบทเข้าที่เล่ม
const books = checked.filter((r) => r.type === "book");
for (const book of books) {
  const chapters = checked.filter(
    (r) => r.type === "book-chapter" && r.doi && r.doi.startsWith(book.doi + "_")
  );
  book.chapters = chapters.length;
  book.citations = (book.citations || 0) + chapters.reduce((s, c) => s + (c.citations || 0), 0);
}
const bookDois = books.map((b) => b.doi);
const kept = checked.filter(
  (r) => !(r.type === "book-chapter" && r.doi && bookDois.some((d) => r.doi.startsWith(d + "_")))
);

/**
 * ยุบงานชิ้นเดียวกันที่ถูกจด DOI ไว้มากกว่าหนึ่งเลข
 *
 * ทำไมต้องมี (31 ส.ค. 2569): dedupe() ด้านบนใช้ DOI เป็นกุญแจ ถ้าสำนักพิมพ์
 * จดเลขให้บทความเดียวซ้ำสองครั้ง จะรอดมาเป็นสองรายการทั้งที่เป็นงานชิ้นเดียว
 * เจอจริงกับ Tripodos 2020 ที่จดไว้ทั้ง ...48p53-68 และ ...48p53-67 — ทั้งคู่
 * resolve ใน Crossref ได้ ชื่อผู้เขียนตรง และชี้ไปหน้าบทความเดียวกัน (view/890)
 * จึงผ่านการตรวจทุกด่านมาได้ทั้งคู่ แล้วไปโป่งยอดรวมผลงานของศูนย์ฯ เกินจริง
 *
 * เลือกเลขที่จะเก็บจาก**ยอดอ้างอิง** เพราะสะท้อนว่าโลกวิชาการใช้เลขไหนจริง
 * (Tripodos: 53-68 ถูกอ้าง 7 ครั้ง · 53-67 ถูกอ้าง 2 ครั้ง)
 *
 * **ไม่รวมยอดอ้างอิงของสองเลขเข้าด้วยกัน** เก็บเฉพาะของเลขที่ชนะ — ตัวเลขที่
 * ต่ำกว่าความจริงเล็กน้อยยอมรับได้ แต่ตัวเลขที่สูงเกินจริงบนเว็บงานวิชาการ
 * ยอมรับไม่ได้ (ยังไม่มีทางพิสูจน์ว่าไม่มีใครอ้างซ้ำทั้งสองเลข)
 *
 * ใส่ type ในกุญแจด้วย กันไม่ให้หนังสือกับบทในหนังสือที่ชื่อเดียวกันถูกยุบรวม
 */
function mergeSameWork(rows) {
  const map = new Map();
  const dropped = [];
  for (const r of rows) {
    const key = `${norm(r.title)}::${r.year}::${normalizeType(r.type)}`;
    const prev = map.get(key);
    if (!prev) {
      map.set(key, r);
      continue;
    }
    const rBetter =
      (r.citations || 0) > (prev.citations || 0) ||
      // เสมอกัน → ตัดสินด้วย DOI เพื่อให้ผลลัพธ์เหมือนเดิมทุกครั้งที่รัน
      ((r.citations || 0) === (prev.citations || 0) && (r.doi || "") < (prev.doi || ""));
    const win = rBetter ? r : prev;
    const lose = rBetter ? prev : r;
    win.people = [...new Set([...win.people, ...lose.people])];
    win.venue = win.venue || lose.venue;
    dropped.push(lose);
    map.set(key, win);
  }
  return { rows: [...map.values()], dropped };
}

const { rows: unique, dropped: duplicateDois } = mergeSameWork(kept);
for (const d of duplicateDois) {
  console.warn(`  DUPLICATE DOI ยุบทิ้ง: ${d.doi} — ${d.title.slice(0, 60)}`);
}

const entries = unique
  .filter((r) => r.year > 0)
  .map((r) => ({
    title: fixCaps(clean(r.title)),
    venue: clean(r.venue),
    year: r.year,
    type: normalizeType(r.type),
    verified: r.verified,
    doi: r.doi || undefined,
    indexUrl: r.indexUrl || undefined,
    citations: r.citations || undefined,
    authors: r.people,
    chapters: r.chapters || undefined,
    citation: r.citation,
  }))
  .sort((a, b) => b.year - a.year || (b.citations || 0) - (a.citations || 0) || a.title.localeCompare(b.title));

/**
 * ด่านสุดท้าย: ห้ามผลงานหายไปเงียบๆ
 *
 * เทียบรายการใหม่กับไฟล์เดิมก่อนเขียนทับ ถ้ามีอะไรหายให้หยุดและบอกว่าหายอะไร
 * ต้องสั่ง --allow-removals ถึงจะเขียนทับได้
 *
 * ทำไมจำเป็น (31 ส.ค. 2569): วันเดียวเจอสามทางที่ผลงานหายหรือด้อยลงได้เงียบๆ —
 * ถูกจำกัดอัตราแล้วลดระดับเป็น self · Crossref อ่านไม่ครบหน้า · DOI ซ้ำถูกยุบ
 * สองอย่างแรกคือบั๊ก อย่างที่สามคือความตั้งใจ ด่านนี้แยกไม่ออกว่าอันไหนเป็นอันไหน
 * จึงให้ "หยุดแล้วให้คนดู" เป็นค่าเริ่มต้น — คนตัดสินได้ในไม่กี่วินาที ส่วนผลงาน
 * ที่หายไปโดยไม่มีใครเห็นอาจอยู่แบบนั้นได้เป็นเดือน
 */
const allowRemovals = process.argv.includes("--allow-removals");
try {
  const existing = readFileSync(new URL("../src/data/publications.ts", import.meta.url), "utf8");
  const marker = "export const publications: PublicationEntry[] = ";
  const from = existing.indexOf(marker);
  if (from !== -1) {
    const start = from + marker.length;
    const old = JSON.parse(existing.slice(start, existing.indexOf("\n];", start) + 2));
    const idOf = (p) => (p.doi ? `doi:${p.doi}` : `title:${norm(p.title)}`);
    const nowIds = new Set(entries.map(idOf));

    /**
     * ห้าม "ลดระดับ" การตรวจสอบเพราะรอบนี้ค้นไม่เจอ
     *
     * `findInIndexes()` ถือว่าค้นไม่สำเร็จ = ไม่พบ แล้วให้ระดับ self ซึ่งผิด:
     * การที่รอบนี้ติดต่อดัชนีไม่ได้ (Semantic Scholar ไม่มี API key จึงโดน 429 บ่อย)
     * **ไม่ใช่หลักฐานว่าผลงานตรวจสอบไม่ได้** มันคือการไม่มีหลักฐานใหม่ ส่วนหลักฐาน
     * เดิมที่เคยพิสูจน์และบันทึกไว้ในไฟล์ยังใช้ได้อยู่
     *
     * เจอของจริง: "Green campaigns in Thailand" (2011) ถูกลดจาก index เป็น self
     * ในรอบที่โดนจำกัดอัตรา ซึ่งจะทำให้หน้าเว็บเปลี่ยนจากลิงก์ดัชนีอิสระไปเป็น
     * ข้อความ "ข้อมูลจากโปรไฟล์ ORCID ของผู้เขียน" ทั้งที่ผลงานนั้นตรวจสอบได้จริง
     *
     * จึงคงระดับเดิมพร้อมลิงก์เดิมไว้ และประกาศออกมาให้เห็นทุกครั้งที่ทำ
     * (การลดระดับที่เป็นความจริง เช่นวารสารถอนบทความ จะถูกกลบไปด้วย — ยอมแลก
     * เพราะกรณีนั้นพบยากมาก ส่วนการโดนจำกัดอัตราเกิดแทบทุกครั้งที่รัน)
     */
    const RANK = { self: 0, link: 1, index: 2, doi: 3 };
    const oldById = new Map(old.map((p) => [idOf(p), p]));
    const carried = [];
    for (const e of entries) {
      const prev = oldById.get(idOf(e));
      if (!prev || RANK[e.verified] >= RANK[prev.verified]) continue;
      carried.push({ title: e.title, from: e.verified, to: prev.verified });
      e.verified = prev.verified;
      if (prev.doi) e.doi = prev.doi;
      if (prev.indexUrl) e.indexUrl = prev.indexUrl;
    }
    if (carried.length) {
      console.warn(
        `\nคงระดับการตรวจสอบเดิมไว้ ${carried.length} รายการ` +
          ` (รอบนี้ค้นดัชนีไม่เจอ ซึ่งมักเกิดจากถูกจำกัดอัตรา ไม่ใช่หลักฐานว่าตรวจสอบไม่ได้):`,
      );
      for (const c of carried) {
        console.warn(`  ${c.from} → คงไว้ที่ ${c.to}  ${c.title.slice(0, 60)}`);
      }
    }

    const gone = old.filter((p) => !nowIds.has(idOf(p)));
    if (gone.length) {
      console.error(`\nหยุดการทำงาน: มีผลงาน ${gone.length} รายการที่เคยอยู่บนเว็บแล้วรอบนี้ไม่มี`);
      for (const p of gone) {
        console.error(`  [${p.verified}] ${p.year} ${p.title.slice(0, 65)}\n      ${p.doi || "(ไม่มี DOI)"}`);
      }
      if (!allowRemovals) {
        console.error(
          `\n**ไม่ได้เขียนทับ src/data/publications.ts** ข้อมูลเดิมยังอยู่ครบ` +
            `\nตรวจก่อนว่าเป็นการยุบรายการซ้ำที่ตั้งใจ หรือเป็นข้อมูลหายจริง` +
            `\nถ้าถูกต้องแล้วให้รันซ้ำด้วย: node scripts/fetch-publications.mjs --allow-removals`,
        );
        process.exit(1);
      }
      console.warn("  (สั่ง --allow-removals มาแล้ว จึงเขียนทับต่อ)");
    }
  }
} catch (err) {
  // ไม่มีไฟล์เดิม (รันครั้งแรก) ถือว่าไม่มีอะไรให้เทียบ
  if (err.code !== "ENOENT") throw err;
}

// นับสถิติ **หลัง** ด่านคงระดับการตรวจสอบ ไม่งั้นตัวเลขในหัวไฟล์จะไม่ตรงกับข้อมูลจริง
const stats = {
  rejected: rejected.length,
  duplicates: duplicateDois.length,
  doi: entries.filter((e) => e.verified === "doi").length,
  link: entries.filter((e) => e.verified === "link").length,
  index: entries.filter((e) => e.verified === "index").length,
  self: entries.filter((e) => e.verified === "self").length,
};

writeFileSync(new URL("../src/data/publications.ts", import.meta.url), render(entries, stats));
console.log(
  `\nwrote src/data/publications.ts — ${entries.length} entries ` +
    `(doi ${stats.doi} · index ${stats.index} · self ${stats.self} · rejected ${stats.rejected})`
);
if (stats.self) {
  console.log("\nself-reported only (ยังไม่มีดัชนีอิสระยืนยัน — ควรขอลิงก์ TCI/ThaiJO จากเจ้าของผลงาน):");
  for (const e of entries.filter((x) => x.verified === "self")) {
    console.log(`  ${e.year} | ${e.authors.join("+")} | ${e.title.slice(0, 70)}`);
  }
}
