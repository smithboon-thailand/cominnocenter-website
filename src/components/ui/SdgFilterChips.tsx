import Link from "next/link";
import { SDG, SDG_IDS, SDG_WHITE_TEXT_OK, sdgAria, type SdgId } from "@/data/sdg";

type SdgFilterChipsProps = {
  /** path ของหน้ารายการ เช่น "/impact" หรือ "/en/impact" */
  basePath: string;
  active?: SdgId;
  locale?: "th" | "en";
};

/**
 * Filter chips 17 อันของหน้า Impact list (BRAND.md PART H)
 * ปกติ: พื้น tint ตัวอักษร deep จุด pure — เมื่อเลือก:
 * SDG 4/8/16/17 พื้น pure ตัวอักษรขาว (กลุ่มเดียวที่ขาวบน pure ผ่าน AA ตาม B3)
 * เป้าหมายอื่น border 2px pure บนพื้น tint
 * กดชิปที่เลือกอยู่ = ล้าง filter · ลิงก์รูปแบบ ?sdg=N (หน้า /sdg ลิงก์มาแบบเดียวกัน)
 */
export default function SdgFilterChips({ basePath, active, locale = "th" }: SdgFilterChipsProps) {
  const allLabel = locale === "th" ? "ทั้งหมด" : "All";
  const base =
    "inline-flex h-8 items-center gap-1.5 rounded border-2 px-2.5 text-[13px] font-medium " +
    "leading-none transition-colors duration-150 ease-brand " +
    "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]";

  return (
    <nav
      aria-label={locale === "th" ? "กรองผลงานตามเป้าหมาย SDG" : "Filter projects by SDG"}
      className="flex flex-wrap gap-2"
    >
      <Link
        href={basePath}
        aria-current={active === undefined ? "true" : undefined}
        className={`${base} ${
          active === undefined
            ? "border-ink-900 bg-ink-900 text-white"
            : "border-ink-300 bg-white text-ink-700 hover:bg-ink-100"
        }`}
      >
        {allLabel}
      </Link>
      {SDG_IDS.map((id) => {
        const goal = SDG[id];
        const selected = active === id;
        const whiteOk = SDG_WHITE_TEXT_OK.includes(id);
        const style = selected
          ? whiteOk
            ? { backgroundColor: goal.pure, borderColor: goal.pure, color: "#FFFFFF" }
            : { backgroundColor: goal.tint, borderColor: goal.pure, color: goal.deep }
          : { backgroundColor: goal.tint, borderColor: "transparent", color: goal.deep };
        return (
          <Link
            key={id}
            href={selected ? basePath : `${basePath}?sdg=${id}`}
            aria-label={sdgAria(id, locale)}
            aria-current={selected ? "true" : undefined}
            className={base}
            style={style}
          >
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: selected && whiteOk ? "#FFFFFF" : goal.pure }}
            />
            {id}
          </Link>
        );
      })}
    </nav>
  );
}
