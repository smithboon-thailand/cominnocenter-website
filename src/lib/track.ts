import { track as vercelTrack } from "@vercel/analytics";

/**
 * อีเวนต์ที่เว็บส่งให้ระบบสถิติ — จุดเดียวสำหรับทั้ง Vercel Analytics และ GA4
 *
 * ทำไมต้องมี (24 ก.ย. 2569): รายงาน GA 28 วันแรกมีแต่ page_view กับอีเวนต์อัตโนมัติ
 * ตั้ง Key event ไม่ได้เลยเพราะโค้ดไม่เคยส่งอีเวนต์ใดๆ — ฟอร์มส่งเข้า Formspree ตรงๆ
 * ปุ่มคัดลอกการอ้างอิงและปุ่มเล่นวิดีโอก็เงียบ ทั้งที่สามอย่างนี้คือหลักฐานว่า
 * ผู้อ่านใช้หน้า /research และ /collaborate จริง ไม่ใช่แค่เปิดผ่าน
 *
 * ส่งสองทางโดยตั้งใจ และเคารพความยินยอมคนละแบบตามธรรมชาติของแต่ละระบบ:
 * - **Vercel** ส่งเสมอ — ไม่ใช้คุกกี้ ไม่ระบุตัวบุคคล จึงอยู่นอกแถบความยินยอม
 *   (หน้านโยบายความเป็นส่วนตัวประกาศไว้แล้วว่าเก็บ "ภาพรวมการใช้งาน" ผ่าน Vercel)
 * - **GA4** ส่งเฉพาะเมื่อ `window.gtag` มีอยู่ ซึ่งเกิดขึ้นก็ต่อเมื่อผู้ใช้กดยอมรับ
 *   และ `analyticsEnabled` เป็นจริง (ดู AnalyticsConsent.tsx) — ไม่ต้องเช็ค
 *   localStorage ซ้ำที่นี่ เพราะการมีอยู่ของ gtag *คือ* ผลของการตัดสินใจนั้นแล้ว
 *   บน preview และเครื่องพัฒนา gtag ไม่ถูกโหลด อีเวนต์จึงไม่รั่วไปปนสถิติจริง
 *
 * ชื่ออีเวนต์เป็น union type เพื่อให้พิมพ์ผิดแล้ว build พัง ไม่ใช่ได้อีเวนต์ชื่อใหม่
 * โผล่ในรายงานเงียบๆ · **ห้ามส่งข้อมูลที่ระบุตัวบุคคลใน `data`** (ชื่อ อีเมล ข้อความ)
 * ส่งได้แค่หมวด/ภาษา/รูปแบบ ซึ่งเป็นค่าจากรายการตายตัวของเราเอง
 */
export type SiteEvent =
  /** ฟอร์มติดต่อส่งถึง Formspree สำเร็จ (ไม่นับตอนกดปุ่ม) */
  | "contact_submit"
  /** ฟอร์มจดหมายข่าวส่งสำเร็จ */
  | "newsletter_submit"
  /** กดคัดลอกหรือดาวน์โหลดรายการอ้างอิง */
  | "citation_copy"
  /** กดเล่นวิดีโอเล่าสาระหลักของบทความ (facade สร้าง iframe ตอนนี้เท่านั้น) */
  | "video_play";

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    /** ประกาศโดยสคริปต์ ga-init ใน AnalyticsConsent.tsx — มีเฉพาะเมื่อผู้ใช้ยอมรับคุกกี้ */
    gtag?: (command: "event", name: string, params?: EventData) => void;
  }
}

export function trackEvent(name: SiteEvent, data?: EventData): void {
  if (typeof window === "undefined") return;

  // Vercel: ตัว SDK เองไม่ throw ในสภาพปกติ แต่ตัวเก็บสถิติต้องไม่มีทางทำให้
  // การกระทำจริงของผู้ใช้ (ส่งฟอร์ม กดเล่น) ล้มเหลวตามได้เลย จึงกันไว้อีกชั้น
  try {
    vercelTrack(name, data);
  } catch {
    /* เก็บสถิติไม่ได้ก็ปล่อยผ่าน */
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", name, data);
    } catch {
      /* เช่นเดียวกัน */
    }
  }
}
