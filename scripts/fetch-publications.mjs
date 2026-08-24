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
import { writeFileSync } from "node:fs";

const UA = {
  "User-Agent": "cominnocenter-website/1.0 (mailto:comminno@chula.ac.th)",
  Accept: "application/json",
};
const getJson = async (url) => {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ผู้เขียนของศูนย์ฯ — surname ใช้ตรวจว่า DOI/ดัชนีที่เจอเป็นของคนนี้จริง */
const AUTHORS = {
  "smith-boonchutima": { orcid: "0000-0001-7412-4506", surname: "boonchutima" },
  "teerada-chongkolrattanaporn": { orcid: "0000-0003-2785-8595", surname: "chongkolrattanaporn" },
  "pavel-slutskiy": { crossref: { family: "slutskiy", givenPattern: /pavel/i }, surname: "slutskiy" },
};

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

async function fromCrossref() {
  const out = [];
  for (const [slug, cfg] of Object.entries(AUTHORS)) {
    if (!cfg.crossref) continue;
    const { family, givenPattern } = cfg.crossref;
    const res = await getJson(
      `https://api.crossref.org/works?query.author=${family}&rows=80` +
        `&select=title,container-title,publisher,issued,type,DOI,author,is-referenced-by-count`
    );
    for (const item of res.message.items || []) {
      // Crossref มีผู้เขียนนามสกุลเดียวกันหลายคน — บังคับตรวจชื่อต้น
      const mine = (item.author || []).some(
        (a) => (a.family || "").toLowerCase() === family && givenPattern.test(a.given || "")
      );
      if (!mine) continue;
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
async function resolveDoi(doi) {
  try {
    const meta = (await getJson(`https://api.crossref.org/works/${doi}`)).message;
    return {
      title: (meta.title || [""])[0] || "",
      authors: meta.author || [],
      venue: (meta["container-title"] || [""])[0] || meta.publisher || "",
      year: meta.issued?.["date-parts"]?.[0]?.[0] || 0,
      type: meta.type || "",
      citations: meta["is-referenced-by-count"],
    };
  } catch {
    /* ไม่มีใน Crossref — ลองต่อด้านล่าง */
  }
  try {
    const res = await fetch(`https://doi.org/${doi}`, {
      headers: { ...UA, Accept: "application/vnd.citationstyles.csl+json" },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      title: typeof d.title === "string" ? d.title : (d.title || [""])[0] || "",
      authors: d.author || [],
      venue: d["container-title"] || d.publisher || "",
      year: d.issued?.["date-parts"]?.[0]?.[0] || 0,
      type: d.type || "",
      citations: undefined,
    };
  } catch {
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
    verified: matched ? "doi" : "link",
    venue: meta.venue || row.venue,
    year: meta.year || row.year,
    type: meta.type || row.type,
    citations: meta.citations ?? row.citations,
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

const clean = (s) =>
  s.replace(/\s+/g, " ").replace(/\[version \d.*$/i, "").replace(/[“”]/g, '"').trim();
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
  /** slug ของผู้เขียนใน leadership.ts */
  authors: string[];
  /** จำนวนบทในเล่ม (เฉพาะ type: book) */
  chapters?: number;
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
for (const row of merged) {
  const result = row.doi ? await verifyDoi(row) : await findInIndexes(row);
  if (result === null) {
    rejected.push(row);
    console.warn(`  REJECTED (DOI belongs to someone else): ${row.doi} — ${row.title.slice(0, 60)}`);
  } else {
    checked.push(result);
  }
  await sleep(350);
}

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

const entries = kept
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
  }))
  .sort((a, b) => b.year - a.year || (b.citations || 0) - (a.citations || 0) || a.title.localeCompare(b.title));

const stats = {
  rejected: rejected.length,
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
