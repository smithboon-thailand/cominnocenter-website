/**
 * ช่องทางทางการของศูนย์ฯ — แหล่งความจริงเดียวที่ทั้ง Footer และ JSON-LD อ่าน
 *
 * ทำไมต้องมีไฟล์นี้ (30 ส.ค. 2569)
 *
 * เดิมลิงก์ชุดนี้ถูกพิมพ์ไว้สองที่แยกกัน แล้วมัน**หลุดตรงกัน**: Footer ชี้
 * facebook.com/comm.inno21 (ของจริง ตอบ 200) แต่ sameAs ใน JSON-LD ที่ส่งให้
 * Google ชี้ facebook.com/cominnocenter ซึ่ง **ไม่มีอยู่จริง** (ตอบ 400)
 * ตรวจพบตอนทำงาน SEO/AI visibility
 *
 * ทำไมถึงเป็นเรื่องใหญ่กว่าลิงก์เสียธรรมดา: `sameAs` คือสิ่งที่บอกเครื่องมือ
 * ค้นหาและระบบ AI ว่า "องค์กรบนเว็บนี้กับเพจนั้นคือรายเดียวกัน" ถ้าลิงก์ชี้ไป
 * เพจที่ไม่มีอยู่ การยืนยันตัวตนก็ล้มเหลว — คือได้ผลตรงข้ามกับที่ตั้งใจ
 *
 * รวมไว้ที่เดียวเพื่อไม่ให้ผิดซ้ำ: แก้ที่นี่ที่เดียว ทั้งหน้าเว็บและ structured
 * data ขยับตามพร้อมกันเสมอ **ยืนยันว่าลิงก์เปิดได้จริงก่อนเพิ่มทุกครั้ง**
 */
import { YOUTUBE_CHANNEL_URL } from "./videos";

export type OrgChannel = {
  label: string;
  href: string;
};

/**
 * ตรวจแล้ว 30 ส.ค. 2569:
 * - Facebook ตอบ 200 · YouTube ตอบ 200 (ชื่อช่อง "Communication Innovation")
 * - Instagram ตอบ 429 ทั้งสองชื่อ (บล็อกบอต) ยืนยันด้วยเครื่องมือไม่ได้
 *   ใช้ชื่อ comm.inno21 ตาม Footer เดิม ซึ่งเป็นชุดเดียวกับ Facebook ที่ยืนยันแล้ว
 */
export const orgChannels: OrgChannel[] = [
  { label: "Instagram", href: "https://www.instagram.com/comm.inno21/" },
  { label: "Facebook", href: "https://www.facebook.com/comm.inno21" },
  { label: "YouTube", href: YOUTUBE_CHANNEL_URL },
];
