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
 * **ทุกใบต้องมีคู่ย่อสามขนาด** เพราะ unoptimized แปลว่า Next ไม่สร้าง srcset
 * ให้ ถ้ามีแต่ไฟล์ 1600px มือถือที่ช่องภาพกว้าง 340px จะโหลดไฟล์เต็มเปล่าๆ
 * ทั้งที่ภาพนี้เป็น LCP element ของหน้า — เลือกสามขนาดนี้เพราะวัดมาแล้วว่า
 * ตรงกับความต้องการจริงของเครื่องแต่ละกลุ่ม
 *   800×343  → มือถือ DPR2 (ต้องการ ~780px)
 *   1200×515 → มือถือ DPR3 (ต้องการ ~1170px) — ถ้าไม่มีขั้นนี้จะหล่นไปใช้ 1600
 *   1600×686 → แท็บเล็ตขึ้นไป และเดสก์ท็อป (กรอบกว้าง 1232px)
 * สร้างคู่ย่อด้วย (ต้องมี Pillow):
 *   python3 -c "from PIL import Image; Image.open(SRC).resize((W,H),
 *   Image.LANCZOS).save(OUT,'WEBP',quality=82,method=6)"
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
  /** ไฟล์เต็ม 1600×686 ใน public/images/<key>/banner.webp */
  src: string;
  /** คู่ย่อ 800×343 สำหรับมือถือ DPR2 — ต้องมีคู่กับ src เสมอ */
  srcSmall: string;
  /** คู่ย่อ 1200×515 สำหรับมือถือ DPR3 — ต้องมีคู่กับ src เสมอ */
  srcMedium: string;
  /** อธิบาย "ภาพนี้เป็นรูปอะไร" ไม่ใช่ทวนชื่อหน้าซ้ำกับ h1 ที่อยู่เหนือมัน */
  altTh: string;
  altEn: string;
};

export const pageBanners: Record<PageBannerKey, Banner> = {
  about: {
    src: "/images/about/banner.webp",
    srcSmall: "/images/about/banner-800.webp",
    srcMedium: "/images/about/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นหลายเส้นถักรวมกันเป็นปมเดียว",
    altEn: "Paper-craft illustration of several ribbons braided into a single knot",
  },
  expertise: {
    src: "/images/expertise/banner.webp",
    srcSmall: "/images/expertise/banner-800.webp",
    srcMedium: "/images/expertise/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ ฟันเฟืองสามตัวขบกันเป็นชุดเดียว",
    altEn: "Paper-craft illustration of three gears meshing as one mechanism",
  },
  impact: {
    src: "/images/impact/banner.webp",
    srcSmall: "/images/impact/banner-800.webp",
    srcMedium: "/images/impact/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ คลื่นวงกลมแผ่ออกจากจุดกึ่งกลางจุดเดียว",
    altEn: "Paper-craft illustration of concentric ripples spreading from a single point",
  },
  research: {
    src: "/images/research/banner.webp",
    srcSmall: "/images/research/banner-800.webp",
    srcMedium: "/images/research/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ แผ่นกระดาษซ้อนกันหลายชั้นเปิดมุมให้เห็นชั้นข้างใต้",
    altEn: "Paper-craft illustration of layered sheets with a corner lifted to reveal what lies beneath",
  },
  news: {
    src: "/images/news/banner.webp",
    srcSmall: "/images/news/banner-800.webp",
    srcMedium: "/images/news/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ ธงเล็กหลายผืนห้อยเรียงบนเส้นโค้ง",
    altEn: "Paper-craft illustration of small flags strung along a curved line",
  },
  media: {
    src: "/images/media/banner.webp",
    srcSmall: "/images/media/banner-800.webp",
    srcMedium: "/images/media/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ กรอบคำพูดสามใบซ้อนเหลื่อมกัน",
    altEn: "Paper-craft illustration of three overlapping speech bubbles",
  },
  collaborate: {
    src: "/images/collaborate/banner.webp",
    srcSmall: "/images/collaborate/banner-800.webp",
    srcMedium: "/images/collaborate/banner-1200.webp",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นสองสีถักเข้าด้วยกัน",
    altEn: "Paper-craft illustration of two coloured ribbons woven together",
  },
};
