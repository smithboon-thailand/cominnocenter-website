import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** ป้ายเหนือหัวเรื่อง — pink-500, tracking .12em, uppercase เฉพาะอังกฤษ (PART C) */
  eyebrow?: string;
  title: ReactNode;
  /** คำอธิบายหนึ่งย่อหน้า — body, ink-700, กว้าง ≤ 65ch */
  description?: ReactNode;
  locale?: "th" | "en";
};

/**
 * Section header pattern ตาม BRAND.md G4
 * EYEBROW → หัวเรื่อง (Kanit 500 h2: 28/1.3 desktop · 24/1.3 mobile) → คำอธิบาย
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  locale = "th",
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
      <h2 className="text-2xl font-medium leading-[1.3] text-ink-900 md:text-[28px]">{title}</h2>
      {description && (
        <p className="max-w-prose text-[17px] leading-[1.7] text-ink-700">{description}</p>
      )}
    </div>
  );
}
