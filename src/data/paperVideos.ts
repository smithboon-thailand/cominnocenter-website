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
    th: { youtubeId: "wgLmy0R1tKc", seconds: 104, uploadDate: "2026-09-04" },
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
