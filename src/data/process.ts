/**
 * ขั้นตอนหลังผู้ติดต่อกดส่งฟอร์ม (Phase 6.1)
 *
 * เก็บไว้ที่เดียวเพราะใช้สองที่และต้องตรงกันเสมอ:
 *   - section "หลังจากส่งข้อความ" ใต้ฟอร์มบนหน้า /collaborate
 *   - ข้อความยืนยันหลังส่งสำเร็จใน ContactForm ที่ทวนขั้นที่ 1 อีกครั้ง
 *
 * ระยะเวลา "2 วันทำการ" เป็นคำมั่นที่ผู้ใช้ยืนยันแล้ว (24 ส.ค. 2569)
 * ถ้าทีมศูนย์ฯ ตอบไม่ทันตามนี้ ต้องแก้ที่ไฟล์นี้ไฟล์เดียว
 */

export type ProcessStep = {
  /** เลขลำดับที่แสดงเป็นกราฟิก — ความหมายจริงมาจาก <ol> */
  number: string;
  title: string;
  description: string;
};

export const processSteps: Record<"th" | "en", ProcessStep[]> = {
  th: [
    {
      number: "01",
      title: "ติดต่อกลับภายใน 2 วันทำการ",
      description: "ทีมศูนย์ฯ ตอบกลับทางอีเมลหรือโทรศัพท์",
    },
    {
      number: "02",
      title: "นัดคุยโจทย์ 30 นาที",
      description: "ทำความเข้าใจเป้าหมายและบริบทองค์กร (ออนไลน์หรือที่คณะ)",
    },
    {
      number: "03",
      title: "เสนอแนวทางเบื้องต้น",
      description: "สรุปกรอบความร่วมมือที่เป็นไปได้ โดยไม่มีข้อผูกมัด",
    },
  ],
  en: [
    {
      number: "01",
      title: "We reply within 2 business days",
      description: "The centre's team responds by email or phone",
    },
    {
      number: "02",
      title: "A 30-minute scoping call",
      description: "We get to know your goals and your organisation's context, online or at the faculty",
    },
    {
      number: "03",
      title: "An initial proposal",
      description: "A summary of how we could work together, with no obligation",
    },
  ],
};

/** หัวเรื่องของ section และข้อความยืนยันหลังส่ง — ล้อกับ processSteps ด้านบน */
export const processCopy = {
  th: {
    eyebrow: "หลังจากส่งข้อความ",
    title: "สิ่งที่จะเกิดขึ้นต่อจากนี้",
    description: "เราไม่ปล่อยให้ข้อความของคุณเงียบหาย นี่คือสามขั้นตอนที่เกิดขึ้นทุกครั้ง",
    listLabel: "ขั้นตอนหลังจากส่งข้อความ",
  },
  en: {
    eyebrow: "After you press send",
    title: "What happens next",
    description: "Your message will not disappear into a void. These three steps happen every time.",
    listLabel: "What happens after you send a message",
  },
} as const;
