import { Kanit } from "next/font/google";

/**
 * ฟอนต์เดียวทั้งเว็บตาม BRAND.md PART C (v1.2) — น้ำหนัก 400/500 เท่านั้น
 * ห้าม 300 และ 600/700
 *
 * อยู่ในไฟล์แยกเพราะ root layout มีสามตัว (ไทย อังกฤษ จีน ดู src/app/(th)
 * (en) และ (zh)) ทุกตัวต้องใช้ instance เดียวกัน ไม่งั้น next/font จะสร้าง
 * ชุดไฟล์ฟอนต์ซ้ำหลายชุด
 *
 * ฟอนต์จีน (Noto Sans SC) **จงใจไม่อยู่ในไฟล์นี้** — ดู `fontsZh.ts` และเหตุผลที่นั่น
 */
export const kanit = Kanit({
  weight: ["400", "500"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});
