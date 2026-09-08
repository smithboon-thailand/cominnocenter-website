/**
 * ตัวชี้วัดงานวิจัยระดับวารสารและระดับศูนย์ฯ (Scopus CiteScore 2025)
 *
 * ที่มา: ผู้ใช้เก็บจาก Scopus Sources ผ่านบัญชีจุฬาฯ เมื่อ 8 ก.ย. 2569
 * แล้วส่งมาเป็นชุดข้อมูลพร้อม README — บันทึกฉบับเต็มอยู่ในหน้า Notion
 * "Research Metrics — URL & Embed Registry"
 *
 * ─── ทำไมเรนเดอร์เอง ไม่ใช้ widget ของ Scopus ───────────────────────────────
 * หน้า Source ของ Scopus มีปุ่มขอโค้ด widget ให้ฟรี แต่ทดสอบแล้วพบว่า
 * **โค้ดที่ได้ฝังค่าตัวเลขไว้ตายตัว ไม่อัปเดตเอง** (เหตุผลที่ Scopus ขออีเมล
 * คือไว้แจ้งเตือนให้มาคัดลอกโค้ดใหม่ทุกปี) เมื่อทั้งสองทางเป็น static เท่ากัน
 * การเรนเดอร์เองจึงดีกว่าทุกด้าน — คุมสไตล์ตาม BRAND.md ได้ ไม่มีคำขอออกไป
 * โดเมนภายนอก ไม่ต้องแก้ CSP และแก้ที่เดียวจบ
 * ชดเชยเรื่องตราสัญลักษณ์ด้วยการกำกับที่มาและลิงก์ไปหน้า Source ที่เปิดได้สาธารณะ
 *
 * ─── กติกาการนำเสนอ (มาจาก README ของชุดข้อมูล — ห้ามละเมิด) ────────────────
 * 1. **ตัวหารไม่เท่ากัน** ผลงานทั้งหมด 48 ชิ้น แต่ตรวจ CiteScore ได้ 32 ชิ้น
 *    เขียนได้: "24 จาก 32 ผลงานที่ตรวจสอบได้ อยู่ในวารสารกลุ่มบนสุด 25% ของสาขา"
 *    เขียนไม่ได้: "ผลงาน 75% ของศูนย์ฯ อยู่ใน Q1"
 * 2. **ต้องระบุสาขาทุกครั้งที่อ้าง percentile** วารสารเล่มเดียวถูกจัดอันดับหลายสาขา
 *    American Behavioral Scientist อยู่ 97th ในสาขา Cultural Studies แต่ 75th
 *    ในสาขา Social Psychology — ไม่บอกสาขาเท่ากับหยิบตัวเลขที่ดีที่สุดมาโชว์
 *    `check:content` ตรวจข้อนี้ให้แล้ว
 * 3. **ไม่ใช้ FWCI** ตัดสินใจร่วมกับผู้ใช้แล้ว ใช้ percentile ของวารสาร
 *    ความเป็น Open Access และความร่วมมือระหว่างประเทศแทน
 * 4. **แสดงครบทุกเล่ม เรียงตามปี** (ผู้ใช้เลือก 8 ก.ย. 2569) วารสารที่ percentile
 *    ต่ำกว่าค่ากลางสาขาจึงปรากฏตามปกติ ไม่ถูกซ่อนและไม่ถูกดันไปท้ายตาราง
 *
 * ─── รอบอัปเดต ─────────────────────────────────────────────────────────────
 * CiteScore ออกปีละครั้งราวเดือนพฤษภาคม · จำนวน citation เปลี่ยนตลอดเวลา
 * ควรอัปเดตอย่างน้อยปีละครั้ง โดยเปิด https://www.scopus.com/sources.uri
 * แล้วสะสม filter ทีละเล่มเพื่ออ่านตารางรวมทีเดียว
 */

export type JournalMetric = {
  /** ต้องตรงกับ field `venue` ใน publications.ts (เทียบแบบไม่สนตัวพิมพ์) */
  venue: string;
  /** ชื่ออื่นของวารสารเล่มเดียวกันที่ปรากฏใน publications.ts */
  venueAliases?: string[];
  /** เปิดได้สาธารณะที่ https://www.scopus.com/sourceid/{sourceId} */
  sourceId: string;
  citeScore: number;
  /** เปอร์เซ็นไทล์ในสาขาที่ระบุใน `subject` เท่านั้น ห้ามแสดงลอยๆ */
  percentile: number;
  /** สาขาที่ใช้อ้าง percentile — ต้องแสดงคู่กับตัวเลขเสมอ (กติกาข้อ 2) */
  subject: string;
  /** อันดับในสาขานั้น เช่น "40/1434" */
  rank: string;
  snip?: number;
  sjr?: number;
  /** ไม่มีค่า = ยังไม่ได้ตรวจ ไม่ใช่ "ไม่เป็น OA" — ห้ามเดาใส่ */
  openAccess?: boolean;
};

/**
 * 19 วารสารที่ตรวจ CiteScore ได้ เรียงตาม CiteScore จากมากไปน้อย
 * (ลำดับในไฟล์ไม่ใช่ลำดับบนหน้าเว็บ — หน้าเว็บเรียงตามปีของผลงาน)
 */
export const journalMetrics: JournalMetric[] = [
  {
    venue: "Thinking Skills and Creativity",
    sourceId: "5000154503",
    citeScore: 9.2,
    percentile: 94,
    subject: "Education",
    rank: "93/1698",
  },
  {
    venue: "Heliyon",
    sourceId: "21100411756",
    citeScore: 7.8,
    percentile: 89,
    // ตารางต้นทางลงอันดับไว้ว่า 23/223 โดยไม่ระบุชื่อสาขา — ตัวหาร 223 ตรงกับ
    // สาขา Multidisciplinary ที่ระบุชัดในแถวตัวอย่างของชุดข้อมูลเดียวกัน
    // (Scientific Reports 29/223 Multidisciplinary) จึงลงสาขาไว้ตามนั้น
    // ควรยืนยันซ้ำจากหน้า Source ในรอบอัปเดตถัดไป
    subject: "Multidisciplinary",
    rank: "23/223",
    snip: 1.173,
    sjr: 0.739,
    openAccess: true,
  },
  {
    venue: "Journal of Infection and Public Health",
    sourceId: "16800154711",
    citeScore: 7.7,
    percentile: 91,
    subject: "Public Health, Environmental and Occupational Health",
    rank: "64/725",
    snip: 1.253,
    sjr: 1.149,
    openAccess: true,
  },
  {
    venue: "Psychology Research and Behavior Management",
    sourceId: "19700175787",
    citeScore: 7.2,
    percentile: 87,
    subject: "General Psychology",
    rank: "28/220",
    snip: 1.313,
    sjr: 1.132,
    openAccess: true,
  },
  {
    venue: "Cogent Business and Management",
    sourceId: "21100855822",
    citeScore: 6.5,
    percentile: 83,
    subject: "Business, Management and Accounting (miscellaneous)",
    rank: "39/235",
    snip: 1.173,
    sjr: 0.647,
    openAccess: true,
  },
  {
    venue: "Frontiers in Public Health",
    sourceId: "21100798718",
    citeScore: 6.4,
    percentile: 85,
    subject: "Public Health, Environmental and Occupational Health",
    rank: "105/725",
  },
  {
    venue: "Research Involvement and Engagement",
    sourceId: "21100901580",
    citeScore: 5.3,
    percentile: 86,
    subject: "General Medicine",
    rank: "90/669",
    snip: 1.602,
    sjr: 1.06,
    openAccess: true,
  },
  {
    venue: "BMC Medical Education",
    sourceId: "28099",
    citeScore: 5.3,
    percentile: 86,
    subject: "General Medicine",
    rank: "89/669",
  },
  {
    venue: "American Behavioral Scientist",
    sourceId: "24733",
    citeScore: 5.2,
    // เล่มนี้ถูกจัดอันดับถึงห้าสาขา — Cultural Studies 97th · Sociology and
    // Political Science 86th · General Social Sciences 85th · Education 81st ·
    // Social Psychology 75th — เลือกสาขาที่ Scopus แสดงเป็นสาขาหลักของเล่ม
    // และแสดงชื่อสาขาคู่กับตัวเลขเสมอ เพื่อไม่ให้เป็นการหยิบค่าที่ดีที่สุดมาโชว์
    percentile: 97,
    subject: "Cultural Studies",
    rank: "40/1434",
    snip: 1.054,
    sjr: 0.635,
    openAccess: false,
  },
  {
    venue: "PLOS ONE",
    venueAliases: ["PLoS ONE", "PLoS One"],
    sourceId: "10600153309",
    citeScore: 4.8,
    percentile: 83,
    // ตัวหาร 223 เท่ากับ Heliyon — ดูหมายเหตุที่แถวนั้น
    subject: "Multidisciplinary",
    rank: "38/223",
    snip: 1.081,
    sjr: 0.726,
    openAccess: true,
  },
  {
    venue: "Cogent Education",
    sourceId: "21100843893",
    citeScore: 4.4,
    percentile: 77,
    subject: "Education",
    rank: "381/1698",
  },
  {
    venue: "Cogent Social Sciences",
    sourceId: "21100872366",
    citeScore: 4.2,
    percentile: 78,
    subject: "General Social Sciences",
    rank: "62/286",
    snip: 1.145,
    sjr: 0.486,
    openAccess: true,
  },
  {
    venue: "Journal for the Theory of Social Behaviour",
    sourceId: "15367",
    citeScore: 4.2,
    percentile: 95,
    subject: "Philosophy",
    rank: "39/891",
  },
  {
    venue: "Cogent Arts and Humanities",
    sourceId: "21100775648",
    citeScore: 2.1,
    percentile: 92,
    subject: "General Arts and Humanities",
    rank: "14/175",
    snip: 1.223,
    sjr: 0.372,
    openAccess: true,
  },
  {
    venue: "Basic and Applied Social Psychology",
    sourceId: "12088",
    citeScore: 1.7,
    percentile: 28,
    subject: "Social Psychology",
    rank: "225/315",
    snip: 0.55,
    sjr: 0.392,
    openAccess: false,
  },
  {
    venue: "Tripodos",
    sourceId: "21100882128",
    citeScore: 1.5,
    percentile: 49,
    subject: "Communication",
    rank: "274/541",
  },
  {
    venue: "Fashion, Style and Popular Culture",
    sourceId: "21100858350",
    citeScore: 1.4,
    percentile: 91,
    subject: "Visual Arts and Performing Arts",
    rank: "60/697",
    snip: 0.487,
    sjr: 0.26,
    openAccess: false,
  },
  {
    venue: "Journal of Public Health and Development",
    sourceId: "21101020138",
    citeScore: 1.0,
    percentile: 25,
    subject: "Health (social science)",
    rank: "287/387",
  },
  {
    venue: "HIV and AIDS Review",
    sourceId: "145445",
    citeScore: 0.9,
    percentile: 21,
    subject: "Epidemiology",
    rank: "136/173",
  },
];

/**
 * เทียบชื่อวารสารแบบไม่สนตัวพิมพ์ เครื่องหมายวรรคตอน และรูป "&" กับ "and"
 *
 * ทะเบียน Crossref กับหน้า Sources ของ Scopus สะกดชื่อเล่มเดียวกันไม่ตรงกัน
 * เป็นประจำ — วัดจากข้อมูลจริงในคลังนี้ การไม่แปลง "&" เป็น "and" ทำให้
 * ผลงานแปดชิ้นจับคู่ไม่ติดทั้งที่เป็นวารสารเล่มเดียวกัน
 * ("HIV & AIDS Review" · "Cogent Arts & Humanities" ·
 *  "Fashion, Style & Popular Culture" · "Cogent Business & Management")
 */
const normaliseVenue = (v: string) =>
  v
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[.,:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const METRIC_BY_VENUE = new Map<string, JournalMetric>();
for (const m of journalMetrics) {
  for (const name of [m.venue, ...(m.venueAliases ?? [])]) {
    METRIC_BY_VENUE.set(normaliseVenue(name), m);
  }
}

/**
 * หาตัวชี้วัดของวารสารจากชื่อ venue ของผลงาน
 *
 * **จงใจจับคู่ด้วยชื่อวารสาร ไม่ใช่ DOI** — ชุดข้อมูลที่ส่งมามี DOI ผิดสามรายการ
 * (หนึ่งในนั้นชี้ไปประกาศแก้ไขของบทความแทนตัวบทความ อีกสองรายการชี้ไปวิทยานิพนธ์
 * ของนิสิตแทนบทความวารสาร) ตรวจกับ Crossref แล้วเมื่อ 8 ก.ย. 2569
 * DOI ที่ถูกต้องอยู่ใน `publications.ts` ซึ่งผ่านการตรวจของ
 * `fetch-publications.mjs` มาแล้ว ไฟล์นี้จึงไม่ประกาศ DOI ซ้ำอีกชุด
 */
export function journalMetricFor(venue: string): JournalMetric | undefined {
  return METRIC_BY_VENUE.get(normaliseVenue(venue));
}

export type CentreSummary = {
  /** วันที่เก็บข้อมูลจาก Scopus — ต้องแสดงคู่กับตัวเลขเสมอ */
  asOf: string;
  scopusDocuments: number;
  totalCitations: number;
  firstYear: number;
  latestYear: number;
  withDoi: number;
  journalsWithCiteScore: number;
  /** ตัวหารของสองค่าถัดไป — ไม่ใช่ `scopusDocuments` (กติกาข้อ 1) */
  publicationsWithCiteScore: number;
  inTopQuartileJournals: number;
  inOpenAccessJournals: number;
};

/**
 * ตัวเลขรวมของศูนย์ฯ นับจาก Scopus Author ID ของนักวิจัยสายนิเทศศาสตร์ 6 ท่าน
 *
 * **ไม่รวม** ศ.ดร.วธนน์ วิริยสิทธาวัฒน์ และ ศ.ดร.ลัญฉกร วุฒิสิทธิกุลกิจ
 * เพราะผลงานอยู่คนละสาขา (Blockchain/IoT และ 5G/Wireless) ถ้ารวมเข้ามา
 * ภาพงานวิจัยของศูนย์ฯ จะไม่ตรงกับความเป็นจริง — ทั้งสองท่านแสดงเป็นโปรไฟล์
 * รายบุคคลบนหน้า /about ตามเดิม
 */
export const centreSummary: CentreSummary = {
  asOf: "2026-09-08",
  scopusDocuments: 48,
  totalCitations: 267,
  firstYear: 2014,
  latestYear: 2026,
  withDoi: 40,
  journalsWithCiteScore: 19,
  publicationsWithCiteScore: 32,
  inTopQuartileJournals: 24,
  inOpenAccessJournals: 19,
};

export type ScopusAuthor = {
  /** ตรงกับ slug ใน leadership.ts / researchers.ts / team.ts */
  slug: string;
  scopusAuthorId: string;
  documents: number;
  hIndex: number;
};

/** เปิดได้สาธารณะ ไม่ต้องล็อกอิน */
export const scopusAuthorHref = (id: string) =>
  `https://www.scopus.com/authid/detail.uri?authorId=${id}`;

export const scopusAuthors: ScopusAuthor[] = [
  { slug: "smith-boonchutima", scopusAuthorId: "56167805200", documents: 24, hIndex: 6 },
  { slug: "teerada-chongkolrattanaporn", scopusAuthorId: "58602899900", documents: 3, hIndex: 2 },
  { slug: "pavel-slutskiy", scopusAuthorId: "57192941020", documents: 19, hIndex: 5 },
  { slug: "watsayut-kongchan", scopusAuthorId: "57193136397", documents: 2, hIndex: 2 },
  { slug: "phyu-hnin-hlaing", scopusAuthorId: "57209200344", documents: 5, hIndex: 4 },
  { slug: "robbie-buelo", scopusAuthorId: "59163732800", documents: 2, hIndex: 1 },
];
