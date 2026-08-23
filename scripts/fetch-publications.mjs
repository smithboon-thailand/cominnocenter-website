/**
 * สร้าง src/data/publications.ts จาก API สาธารณะ — ไม่มีการกรอกข้อมูลเอง
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/fetch-publications.mjs     (ต้องใส่ตัวแปรนี้ในเซสชัน remote)
 *
 * แหล่งข้อมูล
 * - ORCID public API — ผลงานที่เจ้าตัวยืนยันเองในโปรไฟล์ ORCID
 * - Crossref API — สำหรับผู้เขียนที่ยังไม่มี ORCID และใช้เติมจำนวนการอ้างอิงให้ทุกรายการที่มี DOI
 *
 * ข้อควรระวัง: Crossref มีผู้เขียนนามสกุล Slutskiy ท่านอื่น (นักคณิตศาสตร์/นักการศึกษา)
 * จึงต้องกรองด้วยชื่อต้นเสมอ
 */
import { writeFileSync } from "node:fs";

const UA = {
  "User-Agent": "cominnocenter-website/1.0 (mailto:comminno@chula.ac.th)",
  Accept: "application/json",
};
const getJson = async (url) => (await fetch(url, { headers: UA })).json();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ผู้เขียนที่ดึงจาก ORCID (slug ต้องตรงกับ leadership.ts) */
const ORCID_AUTHORS = {
  "smith-boonchutima": "0000-0001-7412-4506",
  "teerada-chongkolrattanaporn": "0000-0003-2785-8595",
};

/** ผู้เขียนที่ยังไม่มี ORCID — ดึงจาก Crossref แล้วกรองด้วยชื่อต้น */
const CROSSREF_AUTHORS = [
  { slug: "pavel-slutskiy", family: "slutskiy", givenPattern: /pavel/i },
];

async function fromOrcid() {
  const out = [];
  for (const [slug, orcid] of Object.entries(ORCID_AUTHORS)) {
    const data = await getJson(`https://pub.orcid.org/v3.0/${orcid}/works`);
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
      });
    }
    await sleep(300);
  }
  return out;
}

async function fromCrossref() {
  const out = [];
  for (const { slug, family, givenPattern } of CROSSREF_AUTHORS) {
    const res = await getJson(
      `https://api.crossref.org/works?query.author=${family}&rows=80` +
        `&select=title,container-title,publisher,issued,type,DOI,author,is-referenced-by-count`
    );
    for (const item of res.message.items || []) {
      const mine = (item.author || []).some(
        (a) => (a.family || "").toLowerCase() === family && givenPattern.test(a.given || "")
      );
      if (!mine) continue;
      out.push({
        person: slug,
        title: (item.title || [""])[0].trim(),
        // หนังสือทั้งเล่มไม่มี container-title — ใช้ชื่อสำนักพิมพ์แทน
        venue: (item["container-title"] || [""])[0] || item.publisher || "",
        year: item.issued?.["date-parts"]?.[0]?.[0] || 0,
        type: item.type,
        doi: (item.DOI || "").toLowerCase(),
        citations: item["is-referenced-by-count"],
      });
    }
    await sleep(300);
  }
  return out;
}

/** รวมรายการซ้ำ (DOI เดียวกัน = ผลงานร่วมของคนในศูนย์) */
function dedupe(all) {
  const map = new Map();
  for (const p of all) {
    const key = p.doi || `${p.person}::${p.title.toLowerCase()}`;
    const prev = map.get(key);
    if (prev) {
      prev.people = [...new Set([...prev.people, p.person])];
      prev.venue = prev.venue || p.venue;
      prev.citations = prev.citations ?? p.citations;
    } else {
      map.set(key, { ...p, people: [p.person] });
    }
  }
  return [...map.values()];
}

/** เติมจำนวนการอ้างอิงจาก Crossref ให้รายการที่มี DOI แต่ยังไม่มีตัวเลข */
async function enrichCitations(rows) {
  const need = rows.filter((r) => r.doi && r.citations === undefined);
  for (let i = 0; i < need.length; i += 20) {
    const batch = need.slice(i, i + 20);
    const filter = batch.map((r) => `doi:${r.doi}`).join(",");
    try {
      const res = await getJson(
        `https://api.crossref.org/works?filter=${filter}&rows=20` +
          `&select=DOI,is-referenced-by-count,container-title,type`
      );
      for (const item of res.message.items || []) {
        const hit = batch.find((r) => r.doi === (item.DOI || "").toLowerCase());
        if (!hit) continue;
        hit.citations = item["is-referenced-by-count"];
        if (!hit.venue) hit.venue = (item["container-title"] || [""])[0] || "";
        if (!hit.type || hit.type === "other") hit.type = item.type;
      }
    } catch (err) {
      console.error("citation batch failed:", err.message);
    }
    await sleep(400);
  }
}

const clean = (s) =>
  s.replace(/\s+/g, " ").replace(/\[version \d.*$/i, "").replace(/[“”]/g, '"').trim();
/** ชื่อเรื่องที่ต้นทางพิมพ์เป็นตัวพิมพ์ใหญ่ทั้งหมด อ่านยาก — ลดเหลือตัวแรกตัวใหญ่ */
const fixCaps = (t) => (t === t.toUpperCase() && t.length > 15 ? t.charAt(0) + t.slice(1).toLowerCase() : t);

function render(entries) {
  return `/**
 * ผลงานวิชาการของศูนย์ฯ (generated ${new Date().toISOString().slice(0, 10)})
 *
 * ไฟล์นี้สร้างด้วย scripts/fetch-publications.mjs — อย่าแก้ด้วยมือ ให้รันสคริปต์ใหม่แทน
 *
 * แหล่งข้อมูล — ดึงจาก API สาธารณะทั้งหมด:
 * - ORCID public API: รศ.ดร.สมิทธิ์ (0000-0001-7412-4506), ผศ.ดร.ธีรดา (0000-0003-2785-8595)
 * - Crossref API: รศ.ดร.Pavel Slutskiy (กรองด้วยชื่อต้น "Pavel" — Crossref มี Slutskiy ท่านอื่นปนมา)
 * - citations = จำนวนการอ้างอิงใน Crossref ซึ่งต่ำกว่า Google Scholar/Scopus โดยธรรมชาติ
 *   (ตัวเลข GS/Scopus รายบุคคลยังแสดงในโปรไฟล์หน้า /about ตามเดิม)
 *
 * บทในหนังสือที่ผู้เขียนเป็นเจ้าของเล่มเอง ถูกยุบรวมเป็นรายการเดียวกับเล่ม (field chapters)
 */

export type PublicationType = "book" | "journal-article" | "book-chapter" | "conference-paper";

export type PublicationEntry = {
  title: string;
  venue: string;
  year: number;
  type: PublicationType;
  /** ไม่มีในบางรายการที่ตีพิมพ์ในวารสารไทย/เวทีประชุมที่ไม่จด DOI */
  doi?: string;
  /** จำนวนการอ้างอิงจาก Crossref — แสดงเฉพาะที่มากกว่า 0 */
  citations?: number;
  /** slug ของผู้เขียนใน leadership.ts */
  authors: string[];
  /** จำนวนบทในเล่ม (เฉพาะ type: book) */
  chapters?: number;
};

export const publications: PublicationEntry[] = ${JSON.stringify(entries, null, 2)};

export const publicationYears = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

export const publicationStats = {
  total: publications.length,
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

const merged = dedupe([...(await fromOrcid()), ...(await fromCrossref())]);
await enrichCitations(merged);

// ยุบบทในหนังสือของตัวเองเข้ากับเล่ม + รวมยอดอ้างอิงของบทเข้าที่เล่ม
const books = merged.filter((r) => r.type === "book");
for (const book of books) {
  const chapters = merged.filter(
    (r) => r.type === "book-chapter" && r.doi.startsWith(book.doi + "_")
  );
  book.chapters = chapters.length;
  book.citations = (book.citations || 0) + chapters.reduce((s, c) => s + (c.citations || 0), 0);
}
const bookDois = books.map((b) => b.doi);
const kept = merged.filter(
  (r) => !(r.type === "book-chapter" && bookDois.some((d) => r.doi.startsWith(d + "_")))
);

const entries = kept
  .filter((r) => r.year > 0)
  .map((r) => ({
    title: fixCaps(clean(r.title)),
    venue: clean(r.venue),
    year: r.year,
    type: r.type,
    doi: r.doi || undefined,
    citations: r.citations || undefined,
    authors: r.people,
    chapters: r.chapters || undefined,
  }))
  .sort((a, b) => b.year - a.year || (b.citations || 0) - (a.citations || 0) || a.title.localeCompare(b.title));

writeFileSync(new URL("../src/data/publications.ts", import.meta.url), render(entries));
console.log(`wrote src/data/publications.ts — ${entries.length} entries`);
