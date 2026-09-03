import type { ReactNode } from "react";
import SectionIcon, { type SectionIconRole } from "@/components/ui/SectionIcon";

type SectionHeaderProps = {
  /** ป้ายเหนือหัวเรื่อง — pink-500, tracking .12em, uppercase เฉพาะอังกฤษ (PART C) */
  eyebrow?: string;
  title: ReactNode;
  /** คำอธิบายหนึ่งย่อหน้า — body, ink-700, กว้าง ≤ 65ch */
  description?: ReactNode;
  locale?: "th" | "en";
  /**
   * ไอคอนประจำ**บทบาท**ของหัวข้อนี้ — ดูรายชื่อและเหตุผลใน `SectionIcon.tsx`
   *
   * เป็นการตกแต่งล้วน (`aria-hidden`) ความหมายอยู่ที่ `title` เสมอ
   * ไม่ใส่ก็ได้ — หัวข้อที่เป็น *ชื่อรายการ* (ชื่อข่าว ชื่อสื่อ ปีที่ตีพิมพ์)
   * **ต้องไม่ใส่** เพราะเป็นเนื้อหา ไม่ใช่โครงสร้าง
   */
  icon?: SectionIconRole;
};

/**
 * Section header pattern ตาม BRAND.md G4 (v1.2)
 * EYEBROW → หัวเรื่อง (Kanit 400 h2: 28/1.35 desktop · 24/1.35 mobile — ต้องเป็น 400 ไม่แย่งน้ำหนัก h1) → คำอธิบาย
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  locale = "th",
  icon,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p
          className={`text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500 ${
            locale === "en" ? "uppercase" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      {/*
        ไอคอนอยู่บรรทัดเดียวกับหัวเรื่อง จัดชิดบนแทนกึ่งกลาง เพราะหัวเรื่องที่ยาว
        จนขึ้นบรรทัดที่สองจะดันไอคอนลงไปลอยกลางข้อความถ้าใช้ items-center
      */}
      <div className={icon ? "flex items-start gap-3" : undefined}>
        {icon && <SectionIcon role={icon} className="mt-0.5 h-8 w-8 shrink-0" />}
        <h2 className="text-h2-m text-ink-900 md:text-h2">{title}</h2>
      </div>
      {description && (
        <p className="max-w-prose text-[17px] leading-[1.7] text-ink-700">{description}</p>
      )}
    </div>
  );
}
