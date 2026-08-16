import type { ReactNode } from "react";

type DisplayHeadingProps = {
  /** ท่อนหลัก — ink-900 (ขาวบนพื้นเข้ม) */
  primary: string;
  /** ท่อนรอง — ink-500 (ink-300 บนพื้นเข้ม) · type บังคับให้มีสองท่อนเสมอ */
  secondary: string;
  /** คำเดียวที่สำคัญจริง จะถูกไฮไลต์ pink-500 — ใช้เท่าที่จำเป็น (BRAND C: "เฉพาะคำเดียว") */
  accentWord?: string;
  /** วางบนพื้นเข้ม (ink-900): ท่อนหลักขาว ท่อนรอง ink-300 */
  onDark?: boolean;
  /** ระดับ heading จริงใน DOM (ค่าเริ่มต้น h1) */
  as?: "h1" | "h2" | "p";
};

/** ไฮไลต์ accentWord ครั้งแรกที่พบในท่อนข้อความ */
function withAccent(text: string, accentWord?: string): ReactNode {
  if (!accentWord || !text.includes(accentWord)) return text;
  const i = text.indexOf(accentWord);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-pink-500">{accentWord}</span>
      {text.slice(i + accentWord.length)}
    </>
  );
}

/**
 * Two-tone display heading ตาม BRAND.md v1.2 PART C — ลายเซ็นของแบรนด์
 * Kanit 500 · 52/1.25 desktop · 34/1.3 mobile · ใช้ใน hero เท่านั้น
 *
 * กฎ copywriting: ข้อความรวมสองท่อนต้องยาวไม่เกิน 2 บรรทัด ณ ความกว้างที่แสดงจริง —
 * ตัว 500 ขนาดใหญ่เกิน 2 บรรทัดจะเป็นกำแพงดำ (ตรวจด้วยตาทุกครั้งที่เขียน copy ใหม่)
 * ระยะว่างเหนือ-ใต้ hero ≥ sp-12 (96px)
 */
export default function DisplayHeading({
  primary,
  secondary,
  accentWord,
  onDark = false,
  as: Tag = "h1",
}: DisplayHeadingProps) {
  return (
    // แต่ละท่อนเป็นบรรทัดของตัวเอง ไม่แตกกลางวลี — ถ้าจอแคบจนท่อนต้องพับ
    // text-wrap:balance จะแบ่งครึ่งอย่างสมดุล ไม่ทิ้งคำโดดท้ายบรรทัด
    <Tag className="text-display-m md:text-display max-w-[24ch]">
      <span className={`block [text-wrap:balance] ${onDark ? "text-white" : "text-ink-900"}`}>
        {withAccent(primary, accentWord)}
      </span>
      <span className={`block [text-wrap:balance] ${onDark ? "text-ink-300" : "text-ink-500"}`}>
        {withAccent(secondary, accentWord)}
      </span>
    </Tag>
  );
}
