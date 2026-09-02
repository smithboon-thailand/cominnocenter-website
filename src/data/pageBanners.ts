/**
 * ภาพประกอบหัวหน้าหลัก (paper-craft) — แหล่งความจริงเดียวของทั้งไทยและอังกฤษ
 *
 * ทำไมต้องรวมไว้ที่เดียว: หน้าไทยกับหน้าอังกฤษเป็นคนละไฟล์ ถ้าปล่อยให้แต่ละไฟล์
 * เขียน path เอง วันหนึ่งจะมีฝั่งหนึ่งถูกเปลี่ยนภาพแล้วอีกฝั่งไม่ถูกเปลี่ยน
 * ปัญหาแบบนี้เกิดกับเว็บนี้มาแล้วสองเรื่อง (เบอร์โทรกระจาย 7 จุด · การ์ด EN
 * โชว์ผลลัพธ์ภาษาไทย) จึงกันไว้ตั้งแต่แรกด้วยการให้ทั้งสองภาษาอ่านจากที่นี่
 *
 * ภาพทุกใบทำตาม BRAND.md E3: วัตถุกระดาษชิ้นเดียว สองสีต่อภาพ พื้นครีม
 * เงาจริงนุ่ม ไม่มีตัวอักษร ไม่มีคน · ขนาด 1600×686 (21:9) เพราะ
 * next.config.ts ตั้ง unoptimized: true ไฟล์ที่วางจึงต้องบีบมาพร้อมใช้แล้ว
 *
 * alt เขียนสองภาษาแยกกัน ไม่ใช่คำแปลตรงตัว — ผู้ใช้เครื่องอ่านหน้าจอฝั่งไทย
 * ต้องได้ยินภาษาไทยล้วน ฝั่งอังกฤษต้องได้ยินอังกฤษล้วน (กติกา i18n ข้อ 7)
 */

export type PageBannerKey =
  | "about"
  | "expertise"
  | "impact"
  | "research"
  | "news"
  | "media"
  | "collaborate";

type Banner = {
  /** ไฟล์ใน public/images/<key>/banner.webp */
  src: string;
  /** อธิบาย "ภาพนี้เป็นรูปอะไร" ไม่ใช่ทวนชื่อหน้าซ้ำกับ h1 ที่อยู่เหนือมัน */
  altTh: string;
  altEn: string;
};

export const pageBanners: Record<PageBannerKey, Banner> = {
  about: {
    src: "/images/about/banner.webp",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นหลายเส้นถักรวมกันเป็นปมเดียว",
    altEn: "Paper-craft illustration of several ribbons braided into a single knot",
  },
  expertise: {
    src: "/images/expertise/banner.webp",
    altTh: "ภาพประกอบกระดาษ ฟันเฟืองสามตัวขบกันเป็นชุดเดียว",
    altEn: "Paper-craft illustration of three gears meshing as one mechanism",
  },
  impact: {
    src: "/images/impact/banner.webp",
    altTh: "ภาพประกอบกระดาษ คลื่นวงกลมแผ่ออกจากจุดกึ่งกลางจุดเดียว",
    altEn: "Paper-craft illustration of concentric ripples spreading from a single point",
  },
  research: {
    src: "/images/research/banner.webp",
    altTh: "ภาพประกอบกระดาษ แผ่นกระดาษซ้อนกันหลายชั้นเปิดมุมให้เห็นชั้นข้างใต้",
    altEn: "Paper-craft illustration of layered sheets with a corner lifted to reveal what lies beneath",
  },
  news: {
    src: "/images/news/banner.webp",
    altTh: "ภาพประกอบกระดาษ ธงเล็กหลายผืนห้อยเรียงบนเส้นโค้ง",
    altEn: "Paper-craft illustration of small flags strung along a curved line",
  },
  media: {
    src: "/images/media/banner.webp",
    altTh: "ภาพประกอบกระดาษ กรอบคำพูดสามใบซ้อนเหลื่อมกัน",
    altEn: "Paper-craft illustration of three overlapping speech bubbles",
  },
  collaborate: {
    src: "/images/collaborate/banner.webp",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นสองสีถักเข้าด้วยกัน",
    altEn: "Paper-craft illustration of two coloured ribbons woven together",
  },
};
