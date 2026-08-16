import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-11 items-center justify-center rounded px-6 text-[15px] font-medium " +
  "transition-colors duration-150 ease-brand focus-visible:outline-none " +
  "focus-visible:shadow-[0_0_0_3px_var(--pink-100)] disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-pink-500 text-white hover:bg-pink-700",
  secondary: "border border-ink-300 text-ink-900 hover:bg-ink-100",
  ghost: "text-pink-700 hover:underline",
};

type ButtonProps = {
  variant?: Variant;
  /** ถ้าระบุ href จะ render เป็นลิงก์ (Next Link) หน้าตาเดียวกับปุ่ม */
  href?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

/**
 * Button ตาม BRAND.md G1 — สูง 44px · padding x 24px · radius 4px · focus ring 3px pink-100
 * ปุ่มไม่เป็นสี SDG เด็ดขาด (A2)
 */
export default function Button({ variant = "primary", href, children, ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]}`;
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
