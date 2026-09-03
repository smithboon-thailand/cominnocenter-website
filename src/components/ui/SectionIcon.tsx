/**
 * ไอคอนประจำ "บทบาทของหัวข้อ" — ชุดเดียวใช้ทั้งเว็บ
 *
 * ทำไมต้องผูกกับบทบาท ไม่ใช่กับถ้อยคำ (3 ก.ย. 2569)
 *
 * นับหัวข้อระดับ section จาก HTML ที่ build ออกมาทั้ง 89 หน้าภาษาไทย ได้ **504 จุด**
 * เขียนเป็นถ้อยคำต่างกัน **128 แบบ** แต่เกือบทั้งหมด**ทำหน้าที่ซ้ำกัน** — "พบอะไร"
 * บนหน้างานวิจัยเชิงประจักษ์ · "เสนออะไร" บนบทความเชิงแนวคิด · "จะทำอะไร" บนหน้าแผนวิจัย
 * ทั้งสามคือช่องเดียวกันในโครงเรื่องเดียวกัน ถ้าวาดตามถ้อยคำจะได้ไอคอน 128 ตัวที่ดูแลไม่ไหว
 * และผู้อ่านจำไม่ได้ · จัดตามบทบาทแล้วเหลือ **20 บทบาท** ไฟล์นี้ทำรอบแรก **14 ตัว**
 * ซึ่งครอบคลุม 93% ของจุดที่ต้องใช้
 *
 * ภาษาภาพเดียวกับ `expertise/ServiceIcon.tsx` เป๊ะ (BRAND.md E1)
 *   - SVG 48×48 · รูปทรงแบนระบายสีทึบ ไม่ใช่ line icon
 *   - **สองสีต่อไอคอน** · facet เงาพับกระดาษเป็นโทน Ink ลด opacity ไม่ใช่สีเทาตัวใหม่
 *   - stroke ใช้เฉพาะรายละเอียดที่วาดเป็นรูปทึบไม่ได้ ปลายมน
 *   - **ตกแต่งล้วน** (`aria-hidden`) ความหมายต้องอยู่ในข้อความหัวข้อข้างๆ เสมอ
 *
 * **คู่สีบอกกลุ่ม ไม่ได้บอกอารมณ์** — ใช้คู่สีชุดเดียวกับสี่ช่วงกระบวนการใน
 * `ExpertiseExplorer` ชุดนี้จึงไม่เพิ่มสีใหม่เข้าระบบแม้แต่สีเดียว และผู้อ่านที่เห็น
 * คู่ฟ้า-เขียวจะรู้โดยไม่ต้องบอกว่ากำลังอ่านโครงเรื่องงานวิจัย
 *
 * **ที่ตั้งใจไม่ทำ**: ชื่อข่าว 24 · ชื่อรายการสื่อ 23 · ปีที่ตีพิมพ์ 18 รวม 65 จุด
 * เป็น *เนื้อหา* ไม่ใช่ *โครงสร้าง* ถ้าใส่ไอคอนจะต้องวาดใหม่ทุกครั้งที่เพิ่มข่าวหนึ่งชิ้น
 */

const INK = "#1A1613";

/** คู่สีประจำกลุ่ม — ค่าเดียวกับ STAGE_COLORS ใน ExpertiseExplorer */
const BLUE = "#30A8D8";
const GREEN = "#90C048";
const PINK = "#E0218A";
const YELLOW = "#FFC018";
const ORANGE = "#F0A818";

export type SectionIconRole =
  // โครงเรื่องงานวิจัย — ฟ้า/เขียว
  | "question"
  | "method"
  | "findings"
  | "soWhat"
  | "caveat"
  | "citation"
  // โครงเรื่องโครงการ — ชมพู/เหลือง
  | "challenge"
  | "approach"
  | "outcome"
  | "gallery"
  // การเชื่อมโยงไปหน้าอื่น — ส้ม/ฟ้า
  | "relatedProjects"
  | "relatedNews"
  // ติดต่อ — ชมพู/ฟ้า
  | "invite"
  | "highlight";

export default function SectionIcon({
  role,
  className = "h-7 w-7 shrink-0",
  onDark = false,
}: {
  role: SectionIconRole;
  className?: string;
  /**
   * เปิดเมื่อไอคอนอยู่บนพื้นเข้ม (แถบ CTA `bg-ink-900`)
   *
   * facet เงาพับกระดาษปกติเป็นโทน Ink ลด opacity ซึ่งบนพื้นเข้มจะกลืนหายไปหมด
   * เหลือแค่รูปทรงแบนไม่มีมิติ · BRAND E1 บอกว่า "เงาต้องเป็นสีของกระดาษแผ่นนั้นเอง"
   * บนพื้นเข้มรอยพับจึงต้องอ่านเป็นด้าน*สว่าง* ไม่ใช่ด้านมืด — สลับเป็นสีครีมของเว็บ
   */
  onDark?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      {glyph(role, onDark ? "#F7F6F2" : INK)}
    </svg>
  );
}

function glyph(role: SectionIconRole, facet: string) {
  switch (role) {
    // ── โครงเรื่องงานวิจัย ────────────────────────────────────────────────
    case "question":
      // แว่นขยายที่มีเป้าอยู่ข้างใน — "งานนี้ถามอะไร"
      return (
        <>
          <circle cx="21" cy="21" r="13" fill="none" stroke={BLUE} strokeWidth="4.5" />
          <line x1="30.5" y1="30.5" x2="41" y2="41" stroke={BLUE} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="21" cy="21" r="6" fill={GREEN} />
          <path d="M21 15a6 6 0 0 1 6 6h-6Z" fill={facet} opacity="0.2" />
        </>
      );
    case "method":
      // แถบสามชั้นลดหลั่น — ขั้นตอนการทำงาน
      return (
        <>
          <rect x="7" y="9" width="34" height="8" rx="2" fill={BLUE} />
          <rect x="7" y="20" width="26" height="8" rx="2" fill={GREEN} />
          <rect x="7" y="31" width="18" height="8" rx="2" fill={BLUE} opacity="0.55" />
          <path d="M33 20h-4v8h4Z" fill={facet} opacity="0.18" />
        </>
      );
    case "findings":
      // แผ่นกระดาษพับมุม + ประกาย — สิ่งที่พบ/ข้อเสนอ
      return (
        <>
          <path d="M8 8h24l8 8v24H8Z" fill={GREEN} />
          <path d="M32 8v8h8Z" fill={facet} opacity="0.28" />
          <path d="m24 21 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2-4.5-4.4 6.2-.9Z" fill={BLUE} />
        </>
      );
    case "soWhat":
      // เส้นทางโค้งขึ้นสู่ธง — นัยยะต่อจากนี้
      return (
        <>
          <path d="M7 33c0-12 9-19 22-19" fill="none" stroke={BLUE} strokeWidth="5" strokeLinecap="round" />
          <path d="M25 6 41 14 25 22Z" fill={GREEN} />
          <path d="M25 14v8l16-8Z" fill={facet} opacity="0.22" />
          <circle cx="7" cy="35" r="5" fill={BLUE} />
        </>
      );
    case "caveat":
      // สามเหลี่ยมเตือน — ข้อจำกัดที่ควรรู้
      return (
        <>
          <path d="M24 7 44 40H4Z" fill={GREEN} />
          <path d="M24 7 34 23.5H14Z" fill={facet} opacity="0.15" />
          <rect x="21.5" y="18" width="5" height="12" rx="2.5" fill={BLUE} />
          <circle cx="24" cy="34" r="2.8" fill={BLUE} />
        </>
      );
    case "citation":
      // อัญประกาศคู่ — การอ้างอิง
      return (
        <>
          <path d="M6 10h15v15c0 7-5 12-11 13v-6c3-1 5-3.5 5-7H6Z" fill={BLUE} />
          <path d="M27 10h15v15c0 7-5 12-11 13v-6c3-1 5-3.5 5-7H27Z" fill={GREEN} />
          <path d="M27 10h15v6H27Z" fill={facet} opacity="0.16" />
        </>
      );

    // ── โครงเรื่องโครงการ ─────────────────────────────────────────────────
    case "challenge":
      // ยอดเขา — โจทย์ที่ต้องข้าม
      return (
        <>
          <path d="M4 40 18 14l10 18 6-9 10 17Z" fill={PINK} />
          <path d="M18 14 28 32h-8Z" fill={facet} opacity="0.2" />
          <circle cx="37" cy="11" r="5" fill={YELLOW} />
        </>
      );
    case "approach":
      // เส้นทางประ + ป้ายปลายทาง — แนวทางการทำงาน
      return (
        <>
          <path
            d="M9 40c0-9 8-9 8-16S9 16 9 8"
            fill="none"
            stroke={YELLOW}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />
          <path d="M28 12h14v12H32l-4 5Z" fill={PINK} />
          <path d="M28 12h14v5H28Z" fill={facet} opacity="0.18" />
          <circle cx="9" cy="41" r="4.5" fill={PINK} />
        </>
      );
    case "outcome":
      // วงคลื่นแผ่ออก — ภาษาเดียวกับภาพแบนเนอร์หน้าผลงาน
      return (
        <>
          <circle cx="24" cy="24" r="19" fill="none" stroke={PINK} strokeWidth="4" />
          <circle cx="24" cy="24" r="11" fill="none" stroke={YELLOW} strokeWidth="4" />
          <circle cx="24" cy="24" r="4.5" fill={PINK} />
          <path d="M24 5a19 19 0 0 1 19 19H24Z" fill={facet} opacity="0.09" />
        </>
      );
    case "gallery":
      // กรอบรูปซ้อนสองใบ — แกลเลอรีภาพ
      return (
        <>
          <rect x="11" y="7" width="30" height="24" rx="3" fill={YELLOW} />
          <rect x="5" y="16" width="30" height="24" rx="3" fill={PINK} />
          <path d="M5 34l9-9 6 6 5-5 10 10v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z" fill={facet} opacity="0.25" />
          <circle cx="14" cy="24" r="3" fill={YELLOW} />
        </>
      );

    // ── การเชื่อมโยงไปหน้าอื่น ────────────────────────────────────────────
    case "relatedProjects":
      // การ์ดสองใบเชื่อมกัน
      return (
        <>
          <rect x="4" y="12" width="19" height="24" rx="3" fill={ORANGE} />
          <rect x="25" y="12" width="19" height="24" rx="3" fill={BLUE} />
          <path d="M25 12h19v6H25Z" fill={facet} opacity="0.18" />
          <rect x="20" y="21" width="8" height="6" rx="3" fill={ORANGE} />
        </>
      );
    case "relatedNews":
      // แถวธง — ภาษาเดียวกับภาพแบนเนอร์หน้าข่าว
      return (
        <>
          <path d="M6 12c12-4 24 4 36 0v6c-12 4-24-4-36 0Z" fill={BLUE} />
          <path d="M8 18 12 30l4-11ZM18 19l4 12 4-11ZM28 19l4 12 4-12Z" fill={ORANGE} />
          <path d="M6 12c12-4 24 4 36 0v3c-12 4-24-4-36 0Z" fill={facet} opacity="0.16" />
        </>
      );

    // ── ติดต่อ ────────────────────────────────────────────────────────────
    case "invite":
      // ซองจดหมายเปิดฝา — คำเชิญร่วมงาน (65 จุดทั่วเว็บ)
      return (
        <>
          <path d="M4 14h40v24a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" fill={PINK} />
          <path d="M4 14 24 29 44 14v5L24 34 4 19Z" fill={facet} opacity="0.26" />
          <path d="M24 4 44 14 24 29 4 14Z" fill={BLUE} />
        </>
      );
    case "highlight":
      // บับเบิลข้อความ + เครื่องหมายบวก — บล็อกแนะนำบนหน้าแรก
      return (
        <>
          <path
            d="M6 11h22a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H15l-7 6v-6H6a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3Z"
            fill={BLUE}
          />
          <path d="M6 11h22a3 3 0 0 1 3 3v3H3v-3a3 3 0 0 1 3-3Z" fill={facet} opacity="0.15" />
          <circle cx="38" cy="33" r="8" fill={PINK} />
          <path d="M38 29v8M34 33h8" stroke="#F7F6F2" strokeWidth="3" strokeLinecap="round" />
        </>
      );
  }
}
