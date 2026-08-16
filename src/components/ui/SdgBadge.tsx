import { SDG, type SdgId, sdgAria } from "@/data/sdg";

type SdgBadgeProps = {
  id: SdgId;
  /** full: [● SDG 12 ชื่อเป้าหมาย] · compact: [● 12] สำหรับที่แคบ */
  variant?: "full" | "compact";
  locale?: "th" | "en";
};

/**
 * SDG Badge ตาม BRAND.md G2 — พื้น tint · จุด 8px pure · ตัวอักษร 13px/500 deep
 * ทุก badge มีเลขกำกับเสมอ (B3: สีเดี่ยวสื่อความหมายไม่ได้)
 */
export default function SdgBadge({ id, variant = "full", locale = "th" }: SdgBadgeProps) {
  const goal = SDG[id];
  return (
    <span
      aria-label={sdgAria(id, locale)}
      className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[13px] font-medium leading-[1.4]"
      style={{ backgroundColor: goal.tint, color: goal.deep }}
    >
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: goal.pure }}
      />
      {variant === "full" ? `SDG ${id} ${goal[locale]}` : id}
    </span>
  );
}
