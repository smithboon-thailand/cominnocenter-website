import Button from "@/components/ui/Button";

type ContextCTAProps = {
  heading: string;
  sub?: string;
  href: string;
  /** ข้อความบนปุ่ม */
  cta: string;
  /**
   * สีเน้นตามบริบท เช่น deep ของเป้าหมาย SDG
   * ใช้กับเส้นคั่นเท่านั้น — ปุ่มยังเป็นชมพูเสมอ เพราะ BRAND.md PART A2
   * ห้ามปุ่มเป็นสี SDG เด็ดขาด
   */
  accent?: string;
  /** แบบแทรกในพื้นที่แคบ เช่น ในแผง accordion ของหน้า /sdg */
  compact?: boolean;
};

/**
 * ชวนคุยตามบริบทของสิ่งที่เพิ่งอ่านจบ (Phase 6.3)
 *
 * ตัวเดียวใช้ได้ทุกจุด ไม่แตก variant ของปุ่มใหม่ —
 * คนที่อ่านโครงการจบแล้วสนใจ ควรกดต่อได้ทันทีตรงนั้น
 * ไม่ต้องเลื่อนกลับขึ้นไปหาเมนู
 */
export default function ContextCTA({
  heading,
  sub,
  href,
  cta,
  accent,
  compact = false,
}: ContextCTAProps) {
  if (compact) {
    return (
      <div
        className="mt-3 border-t pt-3"
        style={accent ? { borderColor: accent } : undefined}
      >
        <p className="text-[13px] leading-[1.5] text-ink-700">{heading}</p>
        <a
          href={href}
          className="mt-1 inline-block text-[13px] font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
        >
          {cta} →
        </a>
      </div>
    );
  }

  return (
    <div
      className="border-t-2 pt-8"
      style={{ borderColor: accent ?? "var(--ink-300)" }}
    >
      <h2 className="text-h2-m md:text-h2 text-ink-900">{heading}</h2>
      {sub && (
        <p className="mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-700">{sub}</p>
      )}
      <div className="mt-6">
        <Button href={href}>{cta}</Button>
      </div>
    </div>
  );
}
