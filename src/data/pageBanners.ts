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
  /**
   * path ที่ยังไม่มีนามสกุล เช่น "/images/about/banner"
   * `ResponsiveArtwork` จะประกอบเป็น `.webp` / `-1200.webp` / `-800.webp` เอง
   */
  base: string;
  /** อธิบาย "ภาพนี้เป็นรูปอะไร" ไม่ใช่ทวนชื่อหน้าซ้ำกับ h1 ที่อยู่เหนือมัน */
  altTh: string;
  altEn: string;
  /**
   * จุดยึดตอนครอป — ค่า `object-position` ที่ส่งให้ `ResponsiveArtwork`
   *
   * ไฟล์ต้นฉบับเป็น 21:9 แต่ `PageHero` แสดงในกรอบ 4:3 จึงเห็นความกว้างจริง
   * เพียง ~57% ของใบ · **ภาพทั้งเจ็ดใบเจนมาโดยวางวัตถุไว้ค่อนไปทางขวา
   * และเว้นพื้นครีมฝั่งซ้ายไว้ให้ข้อความ** ถ้าปล่อยให้ครอปกึ่งกลางตามค่าเริ่มต้น
   * จะได้พื้นครีมเปล่าครึ่งกรอบและวัตถุถูกตัดขาด
   *
   * ตัวเลขวัดจากตำแหน่งวัตถุจริงของแต่ละใบ ไม่ใช่ค่าเดียวกันทั้งชุด เพราะ
   * องค์ประกอบแต่ละใบไม่เหมือนกัน — ถ้าเปลี่ยนไฟล์ภาพต้องวัดใหม่
   */
  focus: string;
};

export const pageBanners: Record<PageBannerKey, Banner> = {
  about: {
    base: "/images/about/banner",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นหลายเส้นถักรวมกันเป็นปมเดียว",
    altEn: "Paper-craft illustration of several ribbons braided into a single knot",
    // ปมริบบิ้นกินพื้นที่ 36–100% ศูนย์ถ่วงที่ 70%
    focus: "97% 50%",
  },
  expertise: {
    base: "/images/expertise/banner",
    altTh: "ภาพประกอบกระดาษ ฟันเฟืองสามตัวขบกันเป็นชุดเดียว",
    altEn: "Paper-craft illustration of three gears meshing as one mechanism",
    // ฟันเฟืองอยู่ 49–90% ศูนย์ถ่วงที่ 71%
    focus: "98% 50%",
  },
  impact: {
    base: "/images/impact/banner",
    altTh: "ภาพประกอบกระดาษ คลื่นวงกลมแผ่ออกจากจุดกึ่งกลางจุดเดียว",
    altEn: "Paper-craft illustration of concentric ripples spreading from a single point",
    // วงคลื่นกระจาย 26–100% ศูนย์ถ่วงที่ 64%
    focus: "81% 50%",
  },
  research: {
    base: "/images/research/banner",
    altTh: "ภาพประกอบกระดาษ แผ่นกระดาษซ้อนกันหลายชั้นเปิดมุมให้เห็นชั้นข้างใต้",
    altEn: "Paper-craft illustration of layered sheets with a corner lifted to reveal what lies beneath",
    // กองกระดาษอยู่ 40–90% ศูนย์ถ่วงที่ 64%
    focus: "84% 50%",
  },
  news: {
    base: "/images/news/banner",
    altTh: "ภาพประกอบกระดาษ ธงเล็กหลายผืนห้อยเรียงบนเส้นโค้ง",
    altEn: "Paper-craft illustration of small flags strung along a curved line",
    // แถวธงอยู่ 44–96% ศูนย์ถ่วงที่ 68%
    focus: "91% 50%",
  },
  media: {
    base: "/images/media/banner",
    altTh: "ภาพประกอบกระดาษ กรอบคำพูดสามใบซ้อนเหลื่อมกัน",
    altEn: "Paper-craft illustration of three overlapping speech bubbles",
    // กรอบคำพูดอยู่ 47–92% ศูนย์ถ่วงที่ 69%
    focus: "94% 50%",
  },
  collaborate: {
    base: "/images/collaborate/banner",
    altTh: "ภาพประกอบกระดาษ ริบบิ้นสองสีถักเข้าด้วยกัน",
    altEn: "Paper-craft illustration of two coloured ribbons woven together",
    // ริบบิ้นพาดเต็มความกว้าง ศูนย์ถ่วงที่ 51% จึงเกือบกึ่งกลาง
    focus: "53% 50%",
  },
};
