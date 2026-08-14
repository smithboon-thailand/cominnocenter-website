import Link from "next/link";
import { SDG, SDG_IDS, SDG_WHITE_TEXT_OK, sdgAria, type SdgId } from "@/data/sdg";
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
 * พื้น pure ทุกช่อง · ตัวอักษรขาวเฉพาะ SDG 4/8/16/17 (B3) — ช่องอื่นใช้แถบขาวครึ่งล่างตัวอักษร deep
 * เป้าหมายที่ยังไม่มีโครงการ: พื้นจาง 35% + ลิงก์ไปหน้า Collaborate
 */
export default function SdgPosterGrid({ locale = "th" }: SdgPosterGridProps) {
  const t = COPY[locale];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {SDG_IDS.map((id) => {
        const goal = SDG[id];
        const count = projectCount(id);
        const has = count > 0;
        const whiteOk = SDG_WHITE_TEXT_OK.includes(id);
        const status = has ? t.projects(count) : t.open;

        return (
          <Link
            key={id}
            href={has ? `${t.impactPath}?sdg=${id}` : t.collaboratePath}
            aria-label={`${sdgAria(id, locale)} — ${status}`}
            className="group relative flex aspect-square flex-col overflow-hidden rounded-lg border border-ink-300
              transition-transform duration-150 ease-brand hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
              motion-reduce:hover:translate-y-0"
          >
            {/* พื้นสี pure — ช่องที่ยังไม่มีโครงการจางลงให้ช่องที่มีงานเด่นกว่า */}
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundColor: goal.pure, opacity: has ? 1 : 0.35 }}
            />

            {whiteOk ? (
              <span className="relative flex h-full flex-col justify-between p-4 text-white">
                <span className="text-4xl font-medium leading-none">{id}</span>
                <span>
                  <span className="block text-[15px] font-medium leading-[1.4]">
                    {goal[locale]}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.4] text-white/80">
                    {status}
                  </span>
                </span>
              </span>
            ) : (
              <span className="relative flex h-full flex-col">
                <span aria-hidden className="flex-1" />
                {/* แถบขาวครึ่งล่าง — ตัวอักษร deep ผ่าน AA บนขาวเสมอ (B3) */}
                <span className="flex h-1/2 flex-col justify-between bg-white p-3 sm:p-4">
                  <span className="flex items-baseline gap-2">
                    <span className="text-3xl font-medium leading-none" style={{ color: goal.deep }}>
                      {id}
                    </span>
                  </span>
                  <span>
                    <span
                      className="block text-[13px] font-medium leading-[1.4]"
                      style={{ color: goal.deep }}
                    >
                      {goal[locale]}
                    </span>
                    <span
                      className={`mt-1 block text-[13px] leading-[1.4] ${
                        has ? "text-ink-500" : "font-medium text-pink-700"
                      }`}
                    >
                      {status}
                    </span>
                  </span>
                </span>
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
