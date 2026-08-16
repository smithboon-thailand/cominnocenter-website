"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SDG, SDG_IDS, sdgAria, type SdgId } from "@/data/sdg";
import { projects } from "@/data/projects";

type SdgPosterGridProps = {
  locale?: "th" | "en";
};

/** โครงการของเป้าหมายหนึ่งๆ (นับทั้งเป้าหมายหลักและรอง) */
function projectsFor(id: SdgId) {
  return projects.filter((p) => p.sdg.includes(id));
}

const COPY = {
  th: {
    projects: (n: number) => `${n} โครงการ`,
    open: "เปิดรับความร่วมมือ",
    viewAll: "ดูในหน้าผลงาน",
    impactPath: "/impact",
    collaboratePath: "/collaborate",
  },
  en: {
    projects: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    open: "Open for collaboration",
    viewAll: "See on the impact page",
    impactPath: "/en/impact",
    collaboratePath: "/en/collaborate",
  },
} as const;

/**
 * Grid 17 สีแบบโปสเตอร์ UN — ใช้เฉพาะหน้า /sdg (หน้าเดียวที่ได้รับยกเว้นกฎ ≤6 สี ตาม PART H)
 * ทุกช่องโครงสร้างเดียวกัน: บล็อกสีบน (มุมกระดาษพับ) + แถบขาวล่าง (เลข/ชื่อเป็น deep — AA เสมอ)
 * ช่องที่มีโครงการ = ปุ่ม accordion กางรายชื่อโครงการในหน้า (ลิงก์รายละเอียด + ลิงก์หน้าผลงาน)
 * ช่องว่าง = ลิงก์ไป Collaborate เหมือนเดิม (บล็อกสี tint + ป้าย pill)
 * ทุกช่องมี id="sdg-N" รองรับ anchor จากวงล้อ SdgWheel — hash ตรงช่องไหน ช่องนั้นกางอัตโนมัติ
 * หมายเหตุ: หน้านี้ไม่ใช้ตัวขาวบนพื้น pure โดยตั้งใจ (เอกภาพของ grid) —
 * SDG_WHITE_TEXT_OK ยังใช้ที่อื่น เช่น filter chips
 */
export default function SdgPosterGrid({ locale = "th" }: SdgPosterGridProps) {
  const t = COPY[locale];
  const [open, setOpen] = useState<SdgId | null>(null);

  useEffect(() => {
    const applyHash = () => {
      const m = window.location.hash.match(/^#sdg-(\d+)$/);
      if (!m) return;
      const id = Number(m[1]) as SdgId;
      if (SDG_IDS.includes(id) && projectsFor(id).length > 0) setOpen(id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {SDG_IDS.map((id) => {
        const goal = SDG[id];
        const goalProjects = projectsFor(id);
        const count = goalProjects.length;
        const has = count > 0;
        const status = has ? t.projects(count) : t.open;
        const isOpen = open === id;

        const colorBlock = (
          <span
            aria-hidden
            className="relative block h-20 shrink-0 sm:h-24"
            style={{ backgroundColor: has ? goal.pure : goal.tint }}
          >
            {/* มุมกระดาษพับ — ล้อภาษา paper-craft ของชุดภาพ Phase 2 */}
            <span
              className="absolute right-0 top-0 h-0 w-0"
              style={{
                borderStyle: "solid",
                borderWidth: "0 14px 14px 0",
                borderColor: `#FFFFFF #FFFFFF ${has ? goal.deep : goal.pure} ${
                  has ? goal.deep : goal.pure
                }`,
              }}
            />
          </span>
        );

        const numberAndName = (
          <span>
            <span className="block text-3xl font-medium leading-none" style={{ color: goal.deep }}>
              {id}
            </span>
            <span
              className="mt-1.5 block text-[13px] font-medium leading-[1.4]"
              style={{ color: goal.deep }}
            >
              {goal[locale]}
            </span>
          </span>
        );

        if (!has) {
          return (
            <Link
              key={id}
              id={`sdg-${id}`}
              href={t.collaboratePath}
              aria-label={`${sdgAria(id, locale)} — ${status}`}
              className="sdg-tile group flex scroll-mt-28 flex-col overflow-hidden rounded-lg border border-ink-300 bg-white
                transition-transform duration-150 ease-brand hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
                motion-reduce:hover:translate-y-0"
            >
              {colorBlock}
              <span className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
                {numberAndName}
                <span className="inline-flex w-fit items-center rounded-full bg-pink-100 px-2.5 py-1 text-[13px] font-medium leading-[1.4] text-pink-700">
                  {status}
                </span>
              </span>
            </Link>
          );
        }

        return (
          <div
            key={id}
            id={`sdg-${id}`}
            className="sdg-tile flex scroll-mt-28 flex-col overflow-hidden rounded-lg border border-ink-300 bg-white
              transition-transform duration-150 ease-brand hover:-translate-y-0.5
              has-[:focus-visible]:shadow-[0_0_0_3px_var(--pink-100)]
              motion-reduce:hover:translate-y-0"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : id)}
              aria-expanded={isOpen}
              aria-controls={`sdg-${id}-panel`}
              aria-label={`${sdgAria(id, locale)} — ${status}`}
              className="flex flex-col text-left outline-none"
            >
              {colorBlock}
              <span className="flex flex-col gap-3 p-3 sm:p-4">
                {numberAndName}
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[13px] leading-[1.4] text-ink-500">{status}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className={`h-4 w-4 shrink-0 text-ink-500 transition-transform duration-150 ease-brand motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M3.5 6l4.5 4.5L12.5 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>
            <div
              id={`sdg-${id}-panel`}
              hidden={!isOpen}
              className="border-t border-ink-100 px-3 pb-3 pt-2 sm:px-4"
            >
              <ul className="flex flex-col">
                {goalProjects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`${t.impactPath}/${p.slug}`}
                      className="block py-1.5 text-[13px] leading-[1.5] text-ink-700 hover:text-pink-700
                        focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                    >
                      {locale === "th" ? p.title : p.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`${t.impactPath}?sdg=${id}`}
                className="mt-2 inline-block text-[13px] font-medium text-pink-500 hover:text-pink-700
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {t.viewAll} →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
