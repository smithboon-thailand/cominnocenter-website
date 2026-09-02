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
 * ---
 *
 * **รอบตรวจใหญ่ 2 ก.ย. 2569** — ผู้ใช้เอาผลลัพธ์ไปให้ผู้ตรวจอิสระดูแล้วพบข้อผิดพลาด
 * ห้าเรื่อง ทั้งหมดแก้ในไฟล์นี้ (สองเรื่องแรกต้องแก้ที่ `fetch-publications.mjs` ด้วย):
 *
 * 1. **เลขบทความถูกใช้เป็นเลขหน้า** ได้ `pp. e0317506` ซึ่งผิดทั้ง APA และ MLA
 *    → APA ต้องเป็น `20(2), Article e0317506.` · MLA ต้องไม่มี `pp.` นำหน้า
 * 2. **ชื่อหน่วยงานปนอยู่ในรายชื่อผู้เขียน** (ทะเบียนของวารสารหนึ่งลงผิดช่อง)
 * 3. **ชื่อวารสาร/ชื่อหนังสือไม่เป็นตัวเอน** — ทั้งสองมาตรฐานบังคับ ไฟล์นี้จึงคืนค่า
 *    เป็น "ส่วน" (`CitationSegment[]`) ที่บอกว่าชิ้นไหนต้องเอน แล้วให้หน้าเว็บ render
 *    เป็น `<em>` ส่วนปุ่มคัดลอกยังคัดลอกข้อความล้วนเหมือนเดิม
 * 4. **ตัวพิมพ์ใหญ่-เล็กของชื่อเรื่องไม่ตรงมาตรฐาน** APA ใช้ sentence case
 *    ส่วน MLA ใช้ title case แต่ทะเบียนเก็บมาตามที่สำนักพิมพ์ฝากไว้ ซึ่งปนกันทั้งสองแบบ
 * 5. **หนังสือถูกจัดรูปเหมือนบทความ** MLA เอาชื่อหนังสือใส่เครื่องหมายคำพูด
 *    ทั้งที่ต้องเป็นตัวเอนและไม่มีเครื่องหมายคำพูด
 *
 * **ขอบเขตที่ยอมรับ:** จัดตาม APA 7 และ MLA 9 สำหรับบทความวารสาร หนังสือ บทในหนังสือ
 * และบทความประชุมวิชาการ ซึ่งครอบคลุมผลงานของศูนย์ฯ ทั้งหมด ไม่ได้ทำครบทุกกรณีขอบ
 * ของคู่มือฉบับเต็ม (เช่น บทในหนังสือที่ต้องระบุบรรณาธิการ ซึ่งทะเบียนไม่ได้ให้มา)
 * — หน้าเว็บจึงต้องบอกผู้ใช้ให้ตรวจก่อนส่งงานเสมอ
 */
import type { CitationMeta, PublicationEntry } from "@/data/publications";

export type CitationStyle = "apa" | "mla" | "bibtex" | "ris";

export const CITATION_STYLES: { id: CitationStyle; label: string; kind: "text" | "file" }[] = [
  { id: "apa", label: "APA 7", kind: "text" },
  { id: "mla", label: "MLA 9", kind: "text" },
  { id: "bibtex", label: "BibTeX", kind: "file" },
  { id: "ris", label: "RIS", kind: "file" },
];

/**
 * ชิ้นส่วนของรายการอ้างอิง — `italic` คือส่วนที่มาตรฐานบังคับให้เป็นตัวเอน
 *
 * ตัวเอนไม่ใช่การตกแต่ง แต่เป็น**ส่วนหนึ่งของรูปแบบ** ทั้ง APA และ MLA ใช้ตัวเอน
 * แยกว่าอะไรคือ "ชื่องานที่ตีพิมพ์เป็นเล่ม/เป็นวารสาร" ออกจากชื่อบทความ ข้อความล้วน
 * จึงบอกไม่ครบ — แต่ข้อความล้วนก็ยังต้องมี เพราะปุ่มคัดลอกส่งเข้าคลิปบอร์ดเป็น
 * ข้อความธรรมดา และไฟล์ BibTeX/RIS ไม่มีแนวคิดเรื่องตัวเอนเลย
 */
export type CitationSegment = { text: string; italic?: boolean };

const seg = (text: string, italic = false): CitationSegment => ({ text, italic });
/** ต่อชิ้นส่วนกลับเป็นข้อความล้วน — ใช้กับคลิปบอร์ดและไฟล์ */
export const plainCitation = (parts: CitationSegment[]) => parts.map((p) => p.text).join("");

/**
 * นามสกุลของผู้เขียน — ถ้าทะเบียนเก็บเป็นชื่อเดียว (`literal`) ให้ใช้ทั้งชื่อตามนั้น
 *
 * **ไม่แยกชื่อ-นามสกุลให้เอง** แม้ผลลัพธ์จะดูไม่เข้ารูป APA เท่าคนอื่นในรายการเดียวกัน
 * เพราะมาตรฐาน CSL ใช้ `literal` สื่อว่า "ชื่อนี้ห้ามแยกส่วน" และการเดาว่าคำไหนคือ
 * นามสกุลทำให้เรียกชื่อคนผิดได้จริง เช่น "Ornjaree Na Taguatung" ถ้าตัดคำท้ายจะเหลือ
 * นามสกุล "Taguatung" ทั้งที่จริงคือ "Na Taguatung" — การอ้างอิงที่ดูสวยแต่เรียกชื่อ
 * เจ้าของผลงานผิด แย่กว่าการอ้างอิงที่รูปแบบไม่สม่ำเสมอ
 */
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

/** MLA 9: คนแรกกลับเป็น "Family, Given" ที่เหลือเรียงปกติ · เกินสองคนใช้ et al. */
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

/**
 * ปิดท้ายประโยคด้วยจุด — **เว้นไว้เมื่อจบด้วย ? หรือ !** ซึ่งเป็นเครื่องหมายจบอยู่แล้ว
 *
 * ของจริงในคลัง: ชื่อบทความ "Is Video-art Becoming a Form of Popular Art? ..." และ
 * "'Right to Clean Air' but What Went Wrong?" ถ้าเติมจุดทับจะได้ "?." ซึ่งผิดทั้งสองมาตรฐาน
 */
const terminate = (s: string) => {
  const t = s.trim();
  return /[.?!]$/.test(t) ? t : `${t}.`;
};

/**
 * คำที่ต้องคงตัวพิมพ์ตามนี้เสมอ ไม่ว่าจะแปลงเป็น sentence case หรือ title case
 *
 * จำเป็นเพราะ**ทั้งสองมาตรฐานบังคับให้วิสามานยนามคงตัวพิมพ์ใหญ่** (APA 7 §6.17)
 * ถ้าแปลงแบบกลไกล้วน "Thailand" จะกลายเป็น "thailand" ซึ่งแย่กว่าไม่แปลงเลย
 *
 * ตารางนี้ยังใช้**แก้ตัวพิมพ์ที่ทะเบียนลงมาผิด**ด้วย เช่น PLOS ฝากชื่อเรื่องไว้ว่า
 * "...image on youtube..." และ Brill ฝากว่า "ai, Post-Truth..." (สำนักพิมพ์ใช้
 * small caps แล้วส่งออกเป็นตัวเล็ก) — สองคำนี้เป็นวิสามานยนาม การคืนตัวพิมพ์ให้ถูก
 * ไม่ใช่การแก้เนื้อความ · คำที่มีตัวพิมพ์ใหญ่อยู่กลางคำอยู่แล้ว (JOOX, HIV, VTubers,
 * COVID, U.S., ENGAGE-A3) ไม่ต้องใส่ในตาราง เพราะตัวแปลงไม่แตะคำพวกนั้นอยู่แล้ว
 */
const PROTECTED_WORDS: Record<string, string> = {
  ai: "AI",
  youtube: "YouTube",
  facebook: "Facebook",
  weibo: "Weibo",
  reddit: "Reddit",
  bitcoin: "Bitcoin",
  joox: "JOOX",
  thailand: "Thailand",
  thai: "Thai",
  thais: "Thais",
  myanmar: "Myanmar",
  burmese: "Burmese",
  chinese: "Chinese",
  russian: "Russian",
  russia: "Russia",
  bangkok: "Bangkok",
  samut: "Samut",
  sakhon: "Sakhon",
  trump: "Trump",
  mueller: "Mueller",
  capitol: "Capitol",
  bayesian: "Bayesian",
  english: "English",
  elephant: "Elephant",
  z: "Z",
};

/**
 * วลีที่ต้องคงตัวพิมพ์ทั้งวลี — ใช้กับชื่อเฉพาะที่กินหลายคำ
 *
 * แยกจากตารางคำเดี่ยวเพราะคำอย่าง "Department" "Control" "Elephant" เป็นคำสามัญ
 * ถ้าใส่เป็นคำเดี่ยวจะไปคงตัวพิมพ์ใหญ่ให้ชื่อเรื่องอื่นที่ใช้คำเดียวกันในความหมายสามัญ
 */
const PROTECTED_PHRASES = [
  "Department of Disease Control",
  "Generation Z",
  "Apple TV",
  "Samut Sakhon",
  "JOOX Rooms",
  // ตัวพิมพ์ใหญ่ในวลีนี้เป็นที่มาของอักษรย่อชื่อแบบวัด (RAPID) จึงเป็นความหมาย ไม่ใช่สไตล์
  "(Re)-emerging and ePidemic Infectious Diseases",
];

/** ตัดเครื่องหมายหน้า-หลังออกก่อนเทียบคำ เช่น "(Re)-emerging" · "Thailand’s" */
const coreWord = (w: string) => w.replace(/^[^\p{L}\p{N}]+/u, "").replace(/[^\p{L}\p{N}]+$/u, "");
/** คำที่มีตัวพิมพ์ใหญ่กลางคำหรือมีตัวเลข = อักษรย่อ/ชื่อทางการค้า → ห้ามแตะ */
const isAcronymLike = (w: string) => {
  const c = coreWord(w);
  return c.length > 1 && (/[A-Z]/.test(c.slice(1)) || /\d/.test(c));
};

/** แทนคำเดี่ยวด้วยรูปมาตรฐานถ้าอยู่ในตาราง (คงส่วนท้ายอย่าง ’s ไว้) */
function applyProtected(word: string): string | null {
  const m = word.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}]+)(.*)$/u);
  if (!m) return null;
  const [, lead, core, rest] = m;
  const canonical = PROTECTED_WORDS[core.toLowerCase()];
  return canonical ? `${lead}${canonical}${rest}` : null;
}

/** ทำเครื่องหมายช่วงตัวอักษรของวลีสงวน เพื่อให้ตัวแปลงข้ามไป */
function frozenRanges(title: string): [number, number][] {
  const ranges: [number, number][] = [];
  for (const phrase of PROTECTED_PHRASES) {
    const at = title.toLowerCase().indexOf(phrase.toLowerCase());
    if (at >= 0) ranges.push([at, at + phrase.length]);
  }
  return ranges;
}

/**
 * คำเล็กที่ MLA ให้เขียนตัวเล็กเมื่ออยู่กลางชื่อเรื่อง
 *
 * MLA 9 ไม่ได้ดูความยาวคำ แต่ดู**ชนิดของคำ** — คำนำหน้านาม บุพบท**ทุกคำไม่ว่าจะยาวแค่ไหน**
 * สันธานเชื่อมความ และ "to" ที่นำหน้ากริยา จึงต้องมี amongst · regarding · throughout
 * อยู่ในรายการด้วย ไม่ใช่แค่คำสั้นๆ
 */
const MLA_MINOR = new Set([
  "a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet",
  "about", "above", "across", "after", "against", "along", "amid", "among", "amongst",
  "around", "as", "at", "before", "behind", "below", "beneath", "beside", "between",
  "beyond", "by", "despite", "down", "during", "except", "from", "in", "inside", "into",
  "near", "of", "off", "on", "onto", "out", "outside", "over", "past", "per", "regarding",
  "since", "through", "throughout", "to", "toward", "towards", "under", "underneath",
  "until", "up", "upon", "via", "with", "within", "without",
]);

type Token = { text: string; start: number };

/** แยกชื่อเรื่องเป็นคำพร้อมตำแหน่ง เพื่อเทียบกับช่วงวลีสงวนได้ */
function tokenise(title: string): Token[] {
  const out: Token[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(title))) out.push({ text: m[0], start: m.index });
  return out;
}

const upperFirst = (w: string) =>
  w.replace(/^([^\p{L}]*)(\p{L})/u, (_, lead: string, ch: string) => lead + ch.toUpperCase());

/**
 * เขียนคำให้เป็นตัวเล็ก **เฉพาะคำที่หน้าตาเป็นคำธรรมดาที่ขึ้นต้นด้วยตัวใหญ่**
 *
 * ไม่แตะคำที่มีตัวใหญ่กลางคำหรือมีตัวเลข เพราะการเดาว่าอะไรเป็นอักษรย่อผิดพลาดได้ง่าย
 * และการทำ "HIV" เป็น "hiv" เสียหายกว่าการปล่อยตัวพิมพ์ไม่สม่ำเสมอไว้
 */
const lowerIfPlain = (w: string) => (/^[^\p{L}]*\p{Lu}[\p{Ll}’'-]*[^\p{L}]*$/u.test(w) ? w.toLowerCase() : w);

/**
 * คำนี้อยู่ต้นประโยคย่อยไหม (คำแรก หรือคำแรกหลัง : ? ! .)
 *
 * **จุดของอักษรย่อไม่นับเป็นจุดจบประโยค** — เดิมนับ ทำให้ "in 2024 U.S. Presidential
 * election coverage" เขียนเป็น sentence case แล้วได้ "U.S. Presidential" ค้างตัวใหญ่
 * เพราะระบบคิดว่า "U.S." จบประโยค · อักษรย่อสังเกตได้จากการมีจุดคั่นกลางคำ
 */
function startsClause(tokens: Token[], i: number): boolean {
  if (i === 0) return true;
  const prev = tokens[i - 1].text;
  if (/[:?!]["'’”]?$/.test(prev)) return true;
  const abbreviation = /\.\w+\.$/.test(prev) || coreWord(prev).length < 3;
  return /[^.]\.["'’”]?$/.test(prev) && !abbreviation;
}

function convertTitle(title: string, mode: "sentence" | "title"): string {
  const frozen = frozenRanges(title);
  // เทียบด้วย**ตำแหน่งเริ่ม**ของคำเท่านั้น เพราะคำท้ายวลีมักมีเครื่องหมายวรรคตอนพ่วง
  // (เช่น "Control:") ซึ่งยื่นเลยขอบวลีไป ถ้าเทียบทั้งคำจะหลุดการคุ้มครองไปทั้งคำ
  const isFrozen = (t: Token) => frozen.some(([a, b]) => t.start >= a && t.start < b);
  const tokens = tokenise(title);

  const words = tokens.map((tok, i) => {
    if (isFrozen(tok)) return tok.text;
    const protectedForm = applyProtected(tok.text);
    if (protectedForm) return protectedForm;

    // **ตรวจอักษรย่อทีละส่วนของคำที่มีขีดกลาง ไม่ใช่ทั้งคำ** ไม่งั้น "Cross-Cultural"
    // จะถูกนับเป็นอักษรย่อ (เพราะมีตัวใหญ่กลางคำ) แล้วไม่ถูกแปลงเลย ได้ผลผิดทั้งสองมาตรฐาน
    if (!tok.text.includes("-") && isAcronymLike(tok.text)) return tok.text;

    // คำที่มีขีดกลางต้องแปลงทีละส่วน "Cross-Cultural" → "cross-cultural" / "Cross-Cultural"
    const parts = tok.text.split("-");
    const convert = (w: string, first: boolean) => {
      if (isAcronymLike(w)) return w;
      const prot = applyProtected(w);
      if (prot) return prot;
      if (mode === "sentence") {
        return first && startsClause(tokens, i) ? upperFirst(lowerIfPlain(w)) : lowerIfPlain(w);
      }
      const core = coreWord(w).toLowerCase();
      const minor = MLA_MINOR.has(core);
      const keepLower =
        minor && !startsClause(tokens, i) && i !== tokens.length - 1 && (first || parts.length === 1);
      return keepLower ? lowerIfPlain(w) : upperFirst(w);
    };
    return parts.map((w, k) => convert(w, k === 0)).join("-");
  });

  return words.join(" ");
}

/** APA 7 §6.17 — ชื่อบทความและชื่อหนังสือใช้ sentence case */
export const sentenceCase = (title: string) => convertTitle(title, "sentence");
/** MLA 9 §2.90 — ชื่อเรื่องใช้ title case */
export const titleCase = (title: string) => convertTitle(title, "title");

/**
 * ชื่อวารสารที่จะใช้ในการอ้างอิง
 *
 * ปกติใช้ค่าจากทะเบียน แต่ทะเบียนบางแห่งลงข้อมูลผิดช่องจนสคริปต์ตัดทิ้งไป
 * (เช่น 10.14456/jhr.2016.32 ที่ container-title มาเป็นเลขฉบับ) กรณีนั้นถอยไปใช้
 * `p.venue` ซึ่งเป็นชื่อวารสารที่ผ่านการตรวจแล้วและเป็นค่าเดียวกับที่แสดงบนหน้าเว็บ
 * — ไม่ใช่การเดา แต่เป็นการใช้ค่าที่เรายืนยันแล้วจากอีกแหล่ง (โปรไฟล์ ORCID ของผู้เขียน)
 */
const container = (p: PublicationEntry, c: CitationMeta) => c.containerTitle || p.venue || "";

/** รูปแบบเลขบทความที่แยกจากเลขหน้าได้ เช่น e0317506 — ใช้เป็นตาข่ายรับกรณีข้อมูลเก่า */
const looksLikeArticleNumber = (v: string) => /^[A-Za-z]+\d[\w.-]*$/.test(v.trim());

/**
 * แยก "เลขหน้า" ออกจาก "เลขบทความ" ให้ชัดก่อนจัดรูป
 *
 * ทะเบียนรุ่นใหม่ของเราแยกช่องมาให้แล้ว (`articleNumber`) แต่ยังเผื่อกรณีที่เลข
 * บทความหลงมาอยู่ในช่อง `page` ไว้ด้วย เพื่อให้ผลลัพธ์ถูกไม่ว่าข้อมูลจะรุ่นไหน
 */
function locator(c: CitationMeta) {
  const meta = c as CitationMeta & { articleNumber?: string };
  const page = looksLikeArticleNumber(c.page) ? "" : c.page;
  // **เลขหน้ามาก่อนเสมอเมื่อมีทั้งคู่** — คำว่า "Article" ใน APA มีไว้สำหรับวารสารที่
  // ใช้เลขบทความ *แทน* เลขหน้า ไม่ใช่เพิ่มจากเลขหน้า · ของจริงที่เจอ: Inderscience
  // ฝากทั้ง page = "111" และ article-number = "60300" (เลขภายในของสำนักพิมพ์)
  // ถ้าเลือกเลขบทความก่อน ผู้อ่านจะได้ตัวเลขที่เปิดหาในเล่มไม่เจอ
  const article = page ? "" : meta.articleNumber || (looksLikeArticleNumber(c.page) ? c.page : "");
  return { article, page };
}

/** MLA 9 ใช้ "p." กับหน้าเดียว และ "pp." กับช่วงหน้า */
const mlaPages = (page: string) => (/[-–]/.test(page) ? `pp. ${page}` : `p. ${page}`);

const isBook = (p: PublicationEntry) => p.type === "book";
const isChapter = (p: PublicationEntry) => p.type === "book-chapter";

/**
 * APA 7 — คืนเป็นชิ้นส่วนเพื่อให้หน้าเว็บทำตัวเอนได้
 *
 * บทความวารสาร: Author. (Year). Sentence-case title. *Journal*, *vol*(issue), pages.
 * หนังสือ:      Author. (Year). *Sentence-case title*. Publisher. DOI
 * บทในหนังสือ:  Author. (Year). Chapter title. In *Book title* (pp. x-y). Publisher. DOI
 */
export function apaParts(p: PublicationEntry, c: CitationMeta): CitationSegment[] {
  const { article, page } = locator(c);
  const out: CitationSegment[] = [
    seg(`${terminate(apaAuthors(c.authors))} `),
    seg(`(${c.year || p.year}). `),
  ];

  const title = sentenceCase(p.title);
  out.push(seg(terminate(title), isBook(p)));
  out.push(seg(" "));

  const journal = container(p, c);
  if (isBook(p)) {
    if (c.publisher) out.push(seg(`${terminate(c.publisher)} `));
  } else if (isChapter(p) && journal) {
    out.push(seg("In "), seg(journal, true));
    if (page) out.push(seg(` (pp. ${page})`));
    out.push(seg(". "));
    if (c.publisher) out.push(seg(`${terminate(c.publisher)} `));
  } else if (journal) {
    out.push(seg(journal, true));
    if (c.volume) {
      out.push(seg(", "), seg(c.volume, true));
      if (c.issue) out.push(seg(`(${c.issue})`));
    }
    // APA 7 §9.27 — วารสารที่ใช้เลขบทความแทนเลขหน้า ต้องมีคำว่า Article นำหน้า
    if (article) out.push(seg(`, Article ${article}`));
    else if (page) out.push(seg(`, ${page}`));
    out.push(seg(". "));
  } else if (c.publisher) {
    out.push(seg(`${terminate(c.publisher)} `));
  }

  const url = p.doi ? `https://doi.org/${p.doi}` : p.indexUrl || "";
  if (url) out.push(seg(url));
  return trimTail(out);
}

/**
 * MLA 9 — คืนเป็นชิ้นส่วนเช่นเดียวกัน
 *
 * บทความวารสาร: Author. "Title-Case Title." *Journal*, vol. X, no. Y, Year, pp. A-B. DOI.
 * หนังสือ:      Author. *Title-Case Title*. Publisher, Year. DOI.
 */
export function mlaParts(p: PublicationEntry, c: CitationMeta): CitationSegment[] {
  const { article, page } = locator(c);
  const out: CitationSegment[] = [seg(`${terminate(mlaAuthors(c.authors))} `)];

  const title = titleCase(p.title);
  if (isBook(p)) {
    // ชื่อหนังสือเป็นตัวเอน **ไม่ใส่เครื่องหมายคำพูด** — เดิมทำผิดเป็นแบบบทความ
    out.push(seg(terminate(title), true), seg(" "));
  } else {
    // MLA วางจุดไว้ในเครื่องหมายคำพูด ยกเว้นชื่อที่จบด้วย ? หรือ ! ซึ่งจบในตัวเองแล้ว
    out.push(seg(`“${terminate(title)}” `));
  }

  const journal = container(p, c);
  if (!isBook(p) && journal) out.push(seg(journal, true), seg(", "));

  const bits = [
    !isBook(p) && c.volume ? `vol. ${c.volume}` : "",
    !isBook(p) && c.issue ? `no. ${c.issue}` : "",
    // หนังสือและบทในหนังสือใช้สำนักพิมพ์แทนเลขเล่ม/ฉบับ ซึ่งวารสารไม่มี
    (isBook(p) || isChapter(p)) && c.publisher ? c.publisher : "",
    String(c.year || p.year),
    // เลขบทความไม่ใช่หน้า จึงห้ามมี pp. นำหน้า (MLA 9 §5.87)
    article || (page ? mlaPages(page) : ""),
  ].filter(Boolean);
  if (bits.length) out.push(seg(`${bits.join(", ")}. `));

  const url = p.doi ? `https://doi.org/${p.doi}.` : p.indexUrl ? `${p.indexUrl}.` : "";
  if (url) out.push(seg(url));
  return trimTail(out);
}

/** ตัดช่องว่างท้ายชิ้นสุดท้ายทิ้ง เพื่อไม่ให้ข้อความที่คัดลอกมีช่องว่างห้อย */
function trimTail(parts: CitationSegment[]): CitationSegment[] {
  const out = parts.filter((s) => s.text);
  if (out.length) out[out.length - 1] = { ...out[out.length - 1], text: out[out.length - 1].text.trimEnd() };
  return out;
}

export const apa = (p: PublicationEntry, c: CitationMeta) => plainCitation(apaParts(p, c));
export const mla = (p: PublicationEntry, c: CitationMeta) => plainCitation(mlaParts(p, c));

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

/** ชื่อเรื่องที่แก้ตัวพิมพ์วิสามานยนามให้ถูกแล้ว แต่ยังคงรูปแบบเดิมของสำนักพิมพ์ไว้ */
const canonicalTitle = (title: string) =>
  tokenise(title)
    .map((t) => applyProtected(t.text) ?? t.text)
    .join(" ");

export function bibtex(p: PublicationEntry, c: CitationMeta): string {
  const { article, page } = locator(c);
  const authors = c.authors
    .map((a) => (a.given ? `${family(a)}, ${a.given}` : family(a)))
    .join(" and ");
  const fields: [string, string][] = [
    ["author", authors],
    ["title", canonicalTitle(p.title)],
    [p.type === "journal-article" ? "journal" : "booktitle", container(p, c)],
    ["publisher", c.publisher],
    ["year", String(c.year || p.year)],
    ["volume", c.volume],
    ["number", c.issue],
    // BibTeX ไม่มีช่องเลขบทความ สำนักพิมพ์ที่ใช้เลขบทความ (PLOS, Heliyon)
    // ส่งออกไว้ในช่อง pages เหมือนกัน จึงทำตามนั้นเพื่อไม่ให้ข้อมูลหาย
    ["pages", article || page.replace("-", "--")],
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
  const { article, page } = locator(c);
  const lines: string[] = [`TY  - ${RIS_TYPE[p.type]}`];
  for (const a of c.authors) {
    lines.push(`AU  - ${a.given ? `${family(a)}, ${a.given}` : family(a)}`);
  }
  lines.push(`TI  - ${canonicalTitle(p.title)}`);
  const jo = container(p, c);
  if (jo) lines.push(`${p.type === "journal-article" ? "JO" : "T2"}  - ${jo}`);
  if (c.publisher) lines.push(`PB  - ${c.publisher}`);
  lines.push(`PY  - ${c.year || p.year}`);
  if (c.month) {
    // RIS ใช้ปี/เดือน/วัน คั่นด้วย / และเว้นช่องที่ไม่รู้ไว้ว่าง
    lines.push(`DA  - ${c.year}/${String(c.month).padStart(2, "0")}/${c.day ? String(c.day).padStart(2, "0") : ""}/`);
  }
  if (c.volume) lines.push(`VL  - ${c.volume}`);
  if (c.issue) lines.push(`IS  - ${c.issue}`);
  if (page) {
    const [sp, ep] = page.split("-");
    if (sp) lines.push(`SP  - ${sp.trim()}`);
    if (ep) lines.push(`EP  - ${ep.trim()}`);
  }
  // C7 คือช่อง "เลขบทความ" ของ RIS · ใส่ SP ควบไว้ด้วยเพราะโปรแกรมเก่าหลายตัว
  // อ่านเฉพาะ SP ถ้าไม่ใส่ ผู้ใช้จะเสียตัวระบุตำแหน่งไปทั้งที่ทะเบียนมีให้
  if (article) {
    lines.push(`C7  - ${article}`);
    lines.push(`SP  - ${article}`);
  }
  if (p.doi) lines.push(`DO  - ${p.doi}`);
  const url = p.doi ? `https://doi.org/${p.doi}` : p.indexUrl;
  if (url) lines.push(`UR  - ${url}`);
  lines.push("ER  - ");
  return lines.join("\n");
}

/** ชิ้นส่วนพร้อมตัวเอน — มีเฉพาะ APA/MLA ส่วน BibTeX/RIS เป็นไฟล์ข้อความล้วน */
export function citationSegments(
  style: CitationStyle,
  p: PublicationEntry,
  c: CitationMeta,
): CitationSegment[] {
  switch (style) {
    case "apa":
      return apaParts(p, c);
    case "mla":
      return mlaParts(p, c);
    case "bibtex":
      return [seg(bibtex(p, c))];
    case "ris":
      return [seg(ris(p, c))];
  }
}

export function formatCitation(
  style: CitationStyle,
  p: PublicationEntry,
  c: CitationMeta,
): string {
  return plainCitation(citationSegments(style, p, c));
}

/** ชื่อไฟล์ตอนดาวน์โหลด — ใช้คีย์ BibTeX ให้ผู้ใช้เดาได้ว่าไฟล์ไหนของงานไหน */
export function citationFilename(style: CitationStyle, p: PublicationEntry, c: CitationMeta) {
  return `${bibKey(p, c)}.${style === "bibtex" ? "bib" : "ris"}`;
}
