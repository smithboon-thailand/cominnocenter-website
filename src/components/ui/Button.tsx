import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-11 items-center justify-center rounded px-6 text-[15px] font-medium " +
  "transition-colors duration-150 ease-brand focus-visible:outline-none " +
  "focus-visible:shadow-[0_0_0_3px_var(--pink-100)] disabled:opacity-40 disabled:pointer-events-none";

/**
 * พื้นปุ่มหลักเป็น pink-700 ไม่ใช่ pink-500 เพราะ contrast (29 ส.ค. 2569)
 * ตัวขาวบน pink-500 ได้ 4.42 ซึ่งต่ำกว่าเกณฑ์ AA (4.5) สำหรับข้อความขนาดปกติ
 * และไม่มีสีตัวอักษรใดช่วยได้ — ตัวเข้มบน pink-500 ยิ่งแย่กว่า (4.07)
 * pink-700 จึงเป็น stop เดียวใน BRAND ที่ผ่าน: ตัวขาวได้ 8.99
 * (pink-500 ยังเป็นสีเน้น/ลิงก์เหมือนเดิม ชมพูสดไม่ได้หายไปจากเว็บ)
 */
const variants: Record<Variant, string> = {
  primary: "bg-pink-700 text-white hover:bg-pink-900",
  secondary: "border border-ink-300 text-ink-900 hover:bg-ink-100",
  ghost: "text-pink-700 hover:underline",
};

type ButtonProps = {
  variant?: Variant;
  /** ถ้าระบุ href จะ render เป็นลิงก์ (Next Link) หน้าตาเดียวกับปุ่ม */
  href?: string;
  /** ลิงก์ออกนอกเว็บ — render เป็น <a> เปิดแท็บใหม่ ไม่ผ่าน Next Link */
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

/**
 * Button ตาม BRAND.md G1 — สูง 44px · padding x 24px · radius 4px · focus ring 3px pink-100
 * ปุ่มไม่เป็นสี SDG เด็ดขาด (A2)
 */
export default function Button({
  variant = "primary",
  href,
  external,
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]}`;
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
