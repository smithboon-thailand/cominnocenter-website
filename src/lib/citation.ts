/**
 * สร้างรายการอ้างอิงจากข้อมูลทะเบียน — APA 7 · MLA 9 · BibTeX · RIS
 *
 * **ใช้ `entry.citation.authors` เท่านั้น ห้ามใช้ `entry.authors`**
 *
 * `entry.authors` เก็บ slug เฉพาะคนของศูนย์ฯ ไว้ใช้กรองในหน้า /research ไม่ใช่
 * รายชื่อผู้เขียนครบทุกคน ถ้าเผลอเอามาสร้างการอ้างอิง ผู้ร่วมวิจัยจากที่อื่นจะ
 * หายไปจากเครดิตทุกครั้งที่มีคนคัดลอกไปแปะ — เช่นบทความ Cogent 2024 ที่มีผู้เขียน
 * สามคนจะเหลือคนเดียว นักศึกษาที่เอาไปใส่วิทยานิพนธ์ก็จะอ้างผิดโดยไม่รู้ตัว
 * ฟังก์ชันในไฟล์นี้จึงรับ `CitationMeta` ตรงๆ ซึ่งมีแต่ข้อมูลจากทะเบียน
 *
 * ทำไมสร้างเองแทนที่จะเรียก API ตอนผู้ใช้กด: ทุกหน้าของเว็บนี้เป็น static
 * การอ้างอิงจึงถูกสร้างตอน build เสร็จแล้วฝังไปกับหน้า กดปุ่มแล้วได้ทันที
 * ไม่ต้องรอเน็ต ไม่พังเวลา doi.org ล่ม และไม่ส่งข้อมูลผู้อ่านออกไปไหน
 *
 * **ขอบเขตที่ยอมรับ:** สองรูปแบบแรกจัดตามหลัก APA 7 และ MLA 9 สำหรับ*บทความ
 * วารสาร* ซึ่งเป็นเกือบทั้งหมดของผลงานศูนย์ฯ หนังสือและบทในหนังสือใช้โครงเดียวกัน
 * โดยละส่วนที่ไม่มี ไม่ได้ทำครบทุกกรณีขอบของคู่มือฉบับเต็ม — หน้าเว็บจึงต้องบอก
 * ผู้ใช้ให้ตรวจก่อนส่งงานเสมอ
 */
import type { CitationMeta, PublicationEntry } from "@/data/publications";

export type CitationStyle = "apa" | "mla" | "bibtex" | "ris";

export const CITATION_STYLES: { id: CitationStyle; label: string; kind: "text" | "file" }[] = [
  { id: "apa", label: "APA 7", kind: "text" },
  { id: "mla", label: "MLA 9", kind: "text" },
  { id: "bibtex", label: "BibTeX", kind: "file" },
  { id: "ris", label: "RIS", kind: "file" },
];

/** นามสกุลของผู้เขียน เผื่อกรณีทะเบียนเก็บเป็นชื่อเดียวไม่แยกส่วน */
const family = (a: CitationMeta["authors"][number]) => a.family || a.literal;

/** อักษรย่อชื่อต้น: "Smith" → "S." · "Mary Jane" → "M. J." */
const initials = (given: string) =>
  given
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => `${w[0].toUpperCase()}.`)
    .join(" ");

/** APA 7: Family, A. A., Family, B. B., & Family, C. C. */
function apaAuthors(authors: CitationMeta["authors"]): string {
  const names = authors.map((a) => {
    const init = initials(a.given);
    return init ? `${family(a)}, ${init}` : family(a);
  });
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]}, & ${names[1]}`;
  // APA 7 ลิสต์ได้ถึง 20 คน เกินกว่านั้นใช้ ... แล้วตามด้วยคนสุดท้าย
  if (names.length <= 20) return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
  return `${names.slice(0, 19).join(", ")}, ... ${names[names.length - 1]}`;
}

/** MLA 9: คนแรกกลับเป็น "Family, Given" ที่เหลือเรียงปกติ · เกินสามคนใช้ et al. */
function mlaAuthors(authors: CitationMeta["authors"]): string {
  if (!authors.length) return "";
  const first = authors[0].given
    ? `${family(authors[0])}, ${authors[0].given}`
    : family(authors[0]);
  if (authors.length === 1) return first;
  if (authors.length > 2) return `${first}, et al.`;
  const second = authors[1].given ? `${authors[1].given} ${family(authors[1])}` : family(authors[1]);
  return `${first}, and ${second}`;
}

/** ตัดจุดซ้อนท้ายประโยค เช่น "Reddit.." → "Reddit." */
const endPeriod = (s: string) => (s.trim().endsWith(".") ? s.trim() : `${s.trim()}.`);
const join = (parts: (string | false | undefined)[], sep = " ") =>
  parts.filter(Boolean).join(sep);

export function apa(p: PublicationEntry, c: CitationMeta): string {
  const vol = c.volume ? (c.issue ? `${c.volume}(${c.issue})` : c.volume) : "";
  const tail = join(
    [c.containerTitle && endPeriod(c.containerTitle).slice(0, -1), vol, c.page].filter(Boolean),
    ", ",
  );
  return join([
    `${endPeriod(apaAuthors(c.authors))}`,
    `(${c.year || p.year}).`,
    endPeriod(p.title),
    tail ? `${tail}.` : c.publisher ? `${c.publisher}.` : "",
    p.doi ? `https://doi.org/${p.doi}` : p.indexUrl || "",
  ]).trim();
}

export function mla(p: PublicationEntry, c: CitationMeta): string {
  const bits = [
    c.volume && `vol. ${c.volume}`,
    c.issue && `no. ${c.issue}`,
    String(c.year || p.year),
    c.page && `pp. ${c.page}`,
  ].filter(Boolean);
  return join([
    endPeriod(mlaAuthors(c.authors)),
    `"${endPeriod(p.title)}"`,
    c.containerTitle ? `${c.containerTitle},` : c.publisher ? `${c.publisher},` : "",
    bits.length ? `${bits.join(", ")}.` : "",
    p.doi ? `https://doi.org/${p.doi}.` : p.indexUrl ? `${p.indexUrl}.` : "",
  ]).trim();
}

/** คีย์อ้างอิงใน BibTeX — นามสกุลคนแรก + ปี + คำแรกของชื่อเรื่อง */
function bibKey(p: PublicationEntry, c: CitationMeta): string {
  const last = (family(c.authors[0]) || "anon").toLowerCase().replace(/[^a-z]/g, "");
  const word =
    p.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .find((w) => w.length > 3) || "work";
  return `${last}${c.year || p.year}${word}`;
}

const BIB_TYPE: Record<PublicationEntry["type"], string> = {
  "journal-article": "article",
  "conference-paper": "inproceedings",
  "book-chapter": "incollection",
  book: "book",
};

/**
 * หนีอักขระพิเศษของ LaTeX ก่อนใส่ลง BibTeX
 *
 * จำเป็นจริง ไม่ใช่ความละเอียดเกินเหตุ: ชื่อวารสารของศูนย์ฯ หลายฉบับมี & อยู่ใน
 * ชื่อ ("HIV & AIDS Review", "Cogent Business & Management") ซึ่ง LaTeX ถือเป็น
 * ตัวคั่นคอลัมน์ **ไฟล์ .bib ที่มี & ดิบจะทำให้เอกสารคอมไพล์ไม่ผ่าน** คนที่โหลด
 * ไปใช้จะเจอ error โดยไม่รู้ว่ามาจากไหน
 *
 * ไม่แตะเครื่องหมายอื่นที่ LaTeX ใช้ในโหมดคณิตศาสตร์ (~ ^ \\) เพราะไม่เคยพบใน
 * ข้อมูลบรรณานุกรมของเรา และการหนีมันต้องใช้คำสั่งพิเศษที่อ่านยากกว่าเดิม
 */
const latexEscape = (v: string) => v.replace(/([&%$#_{}])/g, "\\$1");

export function bibtex(p: PublicationEntry, c: CitationMeta): string {
  const authors = c.authors
    .map((a) => (a.given ? `${family(a)}, ${a.given}` : family(a)))
    .join(" and ");
  const fields: [string, string][] = [
    ["author", authors],
    ["title", p.title],
    [p.type === "journal-article" ? "journal" : "booktitle", c.containerTitle],
    ["publisher", c.publisher],
    ["year", String(c.year || p.year)],
    ["volume", c.volume],
    ["number", c.issue],
    ["pages", c.page.replace("-", "--")],
    ["doi", p.doi || ""],
    ["url", p.doi ? `https://doi.org/${p.doi}` : p.indexUrl || ""],
  ];
  const body = fields
    .filter(([, v]) => v)
    // ครอบชื่อเรื่องด้วยปีกกาชั้นในเพื่อรักษาตัวพิมพ์ใหญ่ ไม่ให้ BibTeX จัดใหม่
    // หนีอักขระพิเศษก่อนเสมอ ยกเว้น doi/url ที่ต้องคงรูปเดิมไว้ให้กดได้
    .map(([k, v]) => {
      const safe = k === "doi" || k === "url" ? v : latexEscape(v);
      return `  ${k} = {${k === "title" ? `{${safe}}` : safe}}`;
    })
    .join(",\n");
  return `@${BIB_TYPE[p.type]}{${bibKey(p, c)},\n${body}\n}`;
}

const RIS_TYPE: Record<PublicationEntry["type"], string> = {
  "journal-article": "JOUR",
  "conference-paper": "CPAPER",
  "book-chapter": "CHAP",
  book: "BOOK",
};

export function ris(p: PublicationEntry, c: CitationMeta): string {
  const lines: string[] = [`TY  - ${RIS_TYPE[p.type]}`];
  for (const a of c.authors) {
    lines.push(`AU  - ${a.given ? `${family(a)}, ${a.given}` : family(a)}`);
  }
  lines.push(`TI  - ${p.title}`);
  if (c.containerTitle) lines.push(`${p.type === "journal-article" ? "JO" : "T2"}  - ${c.containerTitle}`);
  if (c.publisher) lines.push(`PB  - ${c.publisher}`);
  lines.push(`PY  - ${c.year || p.year}`);
  if (c.month) {
    // RIS ใช้ปี/เดือน/วัน คั่นด้วย / และเว้นช่องที่ไม่รู้ไว้ว่าง
    lines.push(`DA  - ${c.year}/${String(c.month).padStart(2, "0")}/${c.day ? String(c.day).padStart(2, "0") : ""}/`);
  }
  if (c.volume) lines.push(`VL  - ${c.volume}`);
  if (c.issue) lines.push(`IS  - ${c.issue}`);
  if (c.page) {
    const [sp, ep] = c.page.split("-");
    if (sp) lines.push(`SP  - ${sp.trim()}`);
    if (ep) lines.push(`EP  - ${ep.trim()}`);
  }
  if (p.doi) lines.push(`DO  - ${p.doi}`);
  const url = p.doi ? `https://doi.org/${p.doi}` : p.indexUrl;
  if (url) lines.push(`UR  - ${url}`);
  lines.push("ER  - ");
  return lines.join("\n");
}

export function formatCitation(
  style: CitationStyle,
  p: PublicationEntry,
  c: CitationMeta,
): string {
  switch (style) {
    case "apa":
      return apa(p, c);
    case "mla":
      return mla(p, c);
    case "bibtex":
      return bibtex(p, c);
    case "ris":
      return ris(p, c);
  }
}

/** ชื่อไฟล์ตอนดาวน์โหลด — ใช้คีย์ BibTeX ให้ผู้ใช้เดาได้ว่าไฟล์ไหนของงานไหน */
export function citationFilename(style: CitationStyle, p: PublicationEntry, c: CitationMeta) {
  return `${bibKey(p, c)}.${style === "bibtex" ? "bib" : "ris"}`;
}
