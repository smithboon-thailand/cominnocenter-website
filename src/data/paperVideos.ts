/**
 * วิดีโอเล่าสาระหลักของบทความ — ฝังบนหน้า /research/[slug] (พากย์ไทย) และ /en/research/[slug] (พากย์อังกฤษ)
 *
 * ไฟล์วิดีโออยู่บนช่อง YouTube ของศูนย์ฯ ไม่ได้อยู่ในคลังนี้ (ดู CLAUDE.md หัวข้อ
 * "วิดีโอเล่าสาระหลักของบทความ") · หน้าเว็บโหลด iframe ของ YouTube เฉพาะเมื่อผู้อ่านกดเล่น
 * ส่วนภาพหน้าปกใช้ภาพประจำบทความในเว็บเราเอง ไม่ดึงจาก i.ytimg.com — คลิปที่ตั้งเป็น
 * "ไม่แสดงในรายการ" ก็ยังมีหน้าปกครบ และหน้าโหลดเร็วเท่าเดิม
 *
 * **คลิปต้องตั้งเป็นสาธารณะหรือไม่แสดงในรายการ (unlisted)** คลิปส่วนตัวฝังไม่ได้ ผู้อ่านจะเห็น
 * แต่กรอบดำที่บอกว่าวิดีโอไม่พร้อมใช้งาน
 *
 * `slug` ต้องตรงกับ paperSummaries.ts — ตรวจตอนโหลดโมดูลด้านล่าง ให้ build พังดีกว่าปล่อย
 * ให้วิดีโอไม่ปรากฏเงียบๆ (`check:content` ตรวจซ้ำอีกชั้นโดยไม่ต้อง build)
 */
import { paperSummaryBySlug } from "./paperSummaries";

export type PaperVideoTrack = {
  /** id ของคลิปบน YouTube — ไม่มีค่าแปลว่ายังไม่ได้อัปโหลดคลิปภาษานี้ หน้าเว็บจะแสดงภาพประกอบตามปกติ */
  youtubeId?: string;
  /** ความยาวเป็นวินาที (ปัดเป็นจำนวนเต็ม) ใช้ทั้งข้อความบนหน้าและ `duration` ใน JSON-LD */
  seconds: number;
  /** วันที่เผยแพร่บน YouTube (YYYY-MM-DD) — ส่งเข้า `uploadDate` ซึ่ง Google บังคับสำหรับ VideoObject */
  uploadDate: string;
};

export type PaperVideo = {
  slug: string;
  th: PaperVideoTrack;
  en: PaperVideoTrack;
};

export const paperVideos: PaperVideo[] = [
  {
    slug: "dengue-media-exposure-longitudinal",
    // 4 ก.ย. ช่วงเย็น: คลิปไทยเคยเป็น wgLmy0R1tKc แต่ถูกลบตอนเก็บคลิปซ้ำ (เหลือ OGv0_iP3mI4 ซึ่งเป็นไฟล์เดียวกัน)
    th: { youtubeId: "OGv0_iP3mI4", seconds: 104, uploadDate: "2026-09-04" },
    en: { youtubeId: "VsV5wT0iHGY", seconds: 106, uploadDate: "2026-09-04" },
  },
  {
    slug: "elephant-tales-sensory-exhibition",
    th: { youtubeId: "Dn1rYvWKNgE", seconds: 101, uploadDate: "2026-09-04" },
    en: { youtubeId: "eNrREKv-954", seconds: 104, uploadDate: "2026-09-04" },
  },
  {
    slug: "anime-thai-gen-z",
    th: { youtubeId: "GfwfzLceguA", seconds: 115, uploadDate: "2026-09-04" },
    en: { youtubeId: "bHSeDYv-EJY", seconds: 117, uploadDate: "2026-09-04" },
  },
  // ── ชุดที่ 2 (อัปโหลด 4 ก.ย. 2569) ──
  {
    slug: "ai-generated-citations-students",
    th: { youtubeId: "cn30oaqcdME", seconds: 140, uploadDate: "2026-09-04" },
    en: { youtubeId: "5Knusvs5Rk0", seconds: 136, uploadDate: "2026-09-04" },
  },
  {
    slug: "vr360-neck-shoulder-pain",
    // คลิปไทยมีอัปโหลดซ้ำสองตัว (LcHP0gAl0h8 · imauooZ2pq4) ใช้ตัวแรกที่ประมวลผลเสร็จก่อน — ถ้าจะลบตัวซ้ำ ลบ imauooZ2pq4
    th: { youtubeId: "LcHP0gAl0h8", seconds: 115, uploadDate: "2026-09-04" },
    en: { youtubeId: "ro86971kJiM", seconds: 104, uploadDate: "2026-09-04" },
  },
  {
    slug: "thailand-image-cannabis-youtube",
    th: { youtubeId: "VvACW_JFizw", seconds: 131, uploadDate: "2026-09-04" },
    en: { youtubeId: "C3b998X7xI4", seconds: 126, uploadDate: "2026-09-04" },
  },
  {
    slug: "negative-wom-advertising-moderation",
    th: { youtubeId: "DPeW8ezD-eM", seconds: 135, uploadDate: "2026-09-04" },
    en: { youtubeId: "lT95OfDekBs", seconds: 130, uploadDate: "2026-09-04" },
  },
  {
    slug: "migrant-worker-exercise-codesign",
    th: { youtubeId: "Si-Gv7JUNmM", seconds: 151, uploadDate: "2026-09-04" },
    en: { youtubeId: "I2l9YJno9hQ", seconds: 147, uploadDate: "2026-09-04" },
  },
  // ── ชุดที่ 3 (เผยแพร่ 5 ก.ย. 2569 ผ่าน Apps Script เช่นกัน · id จาก log ตรวจซ้ำด้วย oEmbed) ──
  {
    slug: "covid-official-communication-credibility",
    th: { youtubeId: "0d0l4hcnZZE", seconds: 204, uploadDate: "2026-09-05" },
    en: { youtubeId: "sccwabmGb50", seconds: 191, uploadDate: "2026-09-05" },
  },
  {
    slug: "genz-cruelty-free-purchase",
    th: { youtubeId: "9F7fMEh8ASc", seconds: 158, uploadDate: "2026-09-05" },
    en: { youtubeId: "fWY3REmTwi4", seconds: 152, uploadDate: "2026-09-05" },
  },
  {
    slug: "first-year-online-learning-technostress",
    th: { youtubeId: "zL8Fdnq3a-4", seconds: 156, uploadDate: "2026-09-05" },
    en: { youtubeId: "tHsVysqyScY", seconds: 146, uploadDate: "2026-09-05" },
  },
  {
    slug: "joox-rooms-relational-bonds",
    th: { youtubeId: "9hUe_LkQjqg", seconds: 167, uploadDate: "2026-09-05" },
    en: { youtubeId: "5VpuPi4IocA", seconds: 157, uploadDate: "2026-09-05" },
  },
  {
    slug: "vtuber-streamer-purchase-intention",
    th: { youtubeId: "EW_TOux749c", seconds: 148, uploadDate: "2026-09-05" },
    en: { youtubeId: "vnIl-uinfPk", seconds: 138, uploadDate: "2026-09-05" },
  },
  // ── ชุดที่ 4 (เผยแพร่ 5 ก.ย. 2569 ผ่าน Apps Script ของผู้ใช้ · id จาก log ของสคริปต์ + ฟีด RSS ของช่อง ตรวจซ้ำด้วย oEmbed ว่าชื่อคลิปตรง) ──
  {
    slug: "chinese-media-thailand-cannabis",
    th: { youtubeId: "P_l-UrkagRI", seconds: 187, uploadDate: "2026-09-05" },
    en: { youtubeId: "nnk30t0bzTE", seconds: 194, uploadDate: "2026-09-05" },
  },
  {
    slug: "fansub-viewers-sponsorship",
    th: { youtubeId: "BzN_PDvFS0w", seconds: 168, uploadDate: "2026-09-05" },
    en: { youtubeId: "h1vzADO6cUU", seconds: 164, uploadDate: "2026-09-05" },
  },
  {
    slug: "brand-attitude-congruence-purchase",
    th: { youtubeId: "pIFWDIIEcp4", seconds: 180, uploadDate: "2026-09-05" },
    en: { youtubeId: "HFadx7hBLQ4", seconds: 182, uploadDate: "2026-09-05" },
  },
  {
    slug: "online-class-cognitive-load-interactive-media",
    th: { youtubeId: "4RxisrnWdxQ", seconds: 199, uploadDate: "2026-09-05" },
    en: { youtubeId: "kOEjsHCL4dY", seconds: 214, uploadDate: "2026-09-05" },
  },
  {
    slug: "health-officers-knowledge-sharing",
    th: { youtubeId: "7LXLXzgBfTs", seconds: 180, uploadDate: "2026-09-05" },
    en: { youtubeId: "bYqDPx9tf3Y", seconds: 185, uploadDate: "2026-09-05" },
  },
  // ── ชุดที่ 5 (เผยแพร่ 5 ก.ย. 2569) ──
  {
    slug: "hiv-knowledge-public-health-officers",
    th: { youtubeId: "8CHsPFucr4g", seconds: 188, uploadDate: "2026-09-05" },
    en: { youtubeId: "Rjq86JIMHHY", seconds: 186, uploadDate: "2026-09-05" },
  },
  {
    slug: "hiv-risk-communication-samut-sakhon",
    th: { youtubeId: "z4jN5RcntPg", seconds: 207, uploadDate: "2026-09-05" },
    en: { youtubeId: "tDE7_GpSRus", seconds: 215, uploadDate: "2026-09-05" },
  },
  {
    slug: "engage-a3-model",
    th: { youtubeId: "SEPZZSvrLqE", seconds: 189, uploadDate: "2026-09-05" },
    en: { youtubeId: "avXaE8HArbE", seconds: 175, uploadDate: "2026-09-05" },
  },
  {
    slug: "game-influencer-credibility",
    th: { youtubeId: "uSHjqGYWqFA", seconds: 208, uploadDate: "2026-09-05" },
    en: { youtubeId: "-pctJ2Ied_s", seconds: 205, uploadDate: "2026-09-05" },
  },
  {
    slug: "cryptocurrency-adoption-reddit",
    th: { youtubeId: "mARMv6j1O2g", seconds: 193, uploadDate: "2026-09-05" },
    en: { youtubeId: "pSAzvKwLCDo", seconds: 201, uploadDate: "2026-09-05" },
  },
];

for (const v of paperVideos) {
  if (!paperSummaryBySlug(v.slug)) {
    throw new Error(`paperVideos: ไม่มีบทสรุป slug "${v.slug}" ใน paperSummaries.ts — วิดีโอชุดนี้จะไม่มีหน้าให้ฝัง`);
  }
}

export const paperVideoBySlug = (slug: string) => paperVideos.find((v) => v.slug === slug);

/** "1:44" — ใช้บนหน้าเว็บทั้งสองภาษา */
export function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** ISO 8601 duration สำหรับ schema.org เช่น "PT1M44S" */
export function isoDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m}M${s}S`;
}
