import { Kanit } from "next/font/google";

/**
 * ฟอนต์เดียวทั้งเว็บตาม BRAND.md PART C (v1.2) — น้ำหนัก 400/500 เท่านั้น
 * ห้าม 300 และ 600/700
 *
 * อยู่ในไฟล์แยกเพราะ root layout มีสองตัว (ไทยกับอังกฤษ ดู src/app/(th) และ
 * src/app/(en)) ทั้งคู่ต้องใช้ instance เดียวกัน ไม่งั้น next/font จะสร้าง
 * ชุดไฟล์ฟอนต์ซ้ำสองชุด
 */
export const kanit = Kanit({
  weight: ["400", "500"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});
