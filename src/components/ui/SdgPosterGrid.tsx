import Link from "next/link";
import { SDG, SDG_IDS, sdgAria, type SdgId } from "@/data/sdg";
import { projects } from "@/data/projects";

type SdgPosterGridProps = {
  locale?: "th" | "en";
};

/** จำนวนโครงการต่อเป้าหมาย (นับทั้งเป้าหมายหลักและรอง) */
function projectCount(id: SdgId): number {
  return projects.filter((p) => p.sdg.includes(id)).length;
}

const COPY = {
  th: {
    projects: (n: number) => `${n} โครงการ`,
    open: "เปิดรับความร่วมมือ",
    impactPath: "/impact",
    collaboratePath: "/collaborate",
  },
  en: {
    projects: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    open: "Open for collaboration",
    impactPath: "/en/impact",
    collaboratePath: "/en/collaborate",
  },
} as const;

/**
 * Grid 17 สีแบบโปสเตอร์ UN — ใช้เฉพาะหน้า /sdg (หน้าเดียวที่ได้รับยกเว้นกฎ ≤6 สี ตาม PART H)
 * ทุกช่องโครงสร้างเดียวกัน: บล็อกสีบน + แถบขาวล่าง (เลข/ชื่อเป็น deep — AA เสมอ)
 * ความสูงเท่ากันทั้งแถวโดย grid stretch — เนื้อหายาวสุดเป็นตัวกำหนด ไม่มีการตัดข้อความ
 * หมายเหตุ: หน้านี้ไม่ใช้ตัวขาวบนพื้น pure โดยตั้งใจ (เอกภาพของ grid) —
 * SDG_WHITE_TEXT_OK ยังใช้ที่อื่น เช่น filter chips
 * ช่องที่ยังไม่มีโครงการ: บล็อกสีใช้ tint + ป้าย pill "เปิดรับความร่วมมือ" ลิงก์ไป Collaborate
 */
export default function SdgPosterGrid({ locale = "th" }: SdgPosterGridProps) {
  const t = COPY[locale];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {SDG_IDS.map((id) => {
        const goal = SDG[id];
        const count = projectCount(id);
        const has = count > 0;
        const status = has ? t.projects(count) : t.open;

        return (
          <Link
            key={id}
            href={has ? `${t.impactPath}?sdg=${id}` : t.collaboratePath}
            aria-label={`${sdgAria(id, locale)} — ${status}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-ink-300 bg-white
              transition-transform duration-150 ease-brand hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
              motion-reduce:hover:translate-y-0"
          >
            {/* บล็อกสีบน — ช่องว่างใช้ tint ให้จางชัดเจน ช่องมีงานใช้ pure เต็ม */}
            <span
              aria-hidden
              className="h-20 shrink-0 sm:h-24"
              style={{ backgroundColor: has ? goal.pure : goal.tint }}
            />
            <span className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
              <span>
                <span
                  className="block text-3xl font-medium leading-none"
                  style={{ color: goal.deep }}
                >
                  {id}
                </span>
                <span
                  className="mt-1.5 block text-[13px] font-medium leading-[1.4]"
                  style={{ color: goal.deep }}
                >
                  {goal[locale]}
                </span>
              </span>
              {has ? (
                <span className="block text-[13px] leading-[1.4] text-ink-500">{status}</span>
              ) : (
                <span className="inline-flex w-fit items-center rounded-full bg-pink-100 px-2.5 py-1 text-[13px] font-medium leading-[1.4] text-pink-700">
                  {status}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
