"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/effects/Reveal";
import { services, serviceStages, getServiceByKey } from "@/data/services";
import { getProjectBySlug } from "@/data/projects";
import { SDG, sdgAria } from "@/data/sdg";

type ExpertiseExplorerProps = {
  locale?: "th" | "en";
};

const COPY = {
  th: {
    stage: (n: number) => `ช่วงที่ ${n}`,
    servicesCount: (n: number) => `${n} บริการ`,
    evidence: (n: number) => `ผลงานจริง ${n} โครงการ`,
    railLabel: "ข้ามไปยังช่วงของกระบวนการสื่อสาร",
    chipAria: (id: number, name: string) => `${name} — ดูผลงานเป้าหมายที่ ${id}`,
    impactPath: "/impact",
  },
  en: {
    stage: (n: number) => `Stage ${n}`,
    servicesCount: (n: number) => `${n} ${n === 1 ? "service" : "services"}`,
    evidence: (n: number) => `${n} delivered ${n === 1 ? "project" : "projects"}`,
    railLabel: "Jump to a stage of the communication process",
    chipAria: (id: number, name: string) => `${name} — see goal ${id} work`,
    impactPath: "/en/impact",
  },
} as const;

/**
 * หน้า Expertise แบบเล่าเรื่อง — 9 บริการจัดเป็น 4 ช่วงของกระบวนการสื่อสาร
 * การ์ดแต่ละใบ: เลข 01–09 · SDG chips กดไป /impact?sdg=N · ปุ่มกางรายชื่อโครงการจริง
 * (mapping อยู่ใน services.ts — เกณฑ์อิงเนื้องานจริงของโครงการ)
 * มุมกระดาษพับโทน Ink ล้อชุดภาพ paper-craft · สีหน้ารวมยังอยู่ในเพดาน 6 สีตาม PART J
 */
export default function ExpertiseExplorer({ locale = "th" }: ExpertiseExplorerProps) {
  const t = COPY[locale];
  const [open, setOpen] = useState<string | null>(null);

  // เลข 01–09 ต่อเนื่องข้ามช่วง ตามลำดับใน serviceStages
  const orderedKeys = serviceStages.flatMap((s) => s.serviceKeys);
  const numberOf = (key: string) =>
    String(orderedKeys.indexOf(key) + 1).padStart(2, "0");

  return (
    <div>
      {/* แถบ 4 ช่วง — anchor เลื่อนลงไปช่วงนั้น */}
      <nav aria-label={t.railLabel} className="flex flex-wrap gap-2">
        {serviceStages.map((stage, i) => (
          <a
            key={stage.key}
            href={`#stage-${stage.key}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2
              text-[13px] font-medium leading-[1.4] text-ink-700
              transition-colors duration-150 ease-brand hover:border-ink-500 hover:text-ink-900
              focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
          >
            <span aria-hidden className="text-ink-500">{i + 1}</span>
            {locale === "th" ? stage.titleTh : stage.titleEn}
          </a>
        ))}
      </nav>

      <div className="mt-12 flex flex-col gap-16">
        {serviceStages.map((stage, stageIndex) => {
          const stageServices = stage.serviceKeys
            .map(getServiceByKey)
            .filter((s): s is (typeof services)[number] => Boolean(s));

          return (
            <section key={stage.key} id={`stage-${stage.key}`} className="scroll-mt-28">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
                  {t.stage(stageIndex + 1)}
                </p>
                <p className="text-[13px] leading-[1.4] text-ink-500">
                  {t.servicesCount(stageServices.length)}
                </p>
              </div>
              <h2 className="mt-1 text-h2-m md:text-h2 text-ink-900">
                {locale === "th" ? stage.titleTh : stage.titleEn}
              </h2>
              <p className="mt-1 text-[15px] leading-[1.6] text-ink-500">
                {locale === "th" ? stage.taglineTh : stage.taglineEn}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stageServices.map((service, i) => {
                  const projectList = service.projectSlugs
                    .map(getProjectBySlug)
                    .filter((p): p is NonNullable<ReturnType<typeof getProjectBySlug>> =>
                      Boolean(p)
                    );
                  const isOpen = open === service.key;

                  return (
                    <Reveal key={service.key} delay={i * 60}>
                      <div
                        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-ink-300 bg-white
                          transition-transform duration-150 ease-brand hover:-translate-y-0.5
                          has-[:focus-visible]:shadow-[0_0_0_3px_var(--pink-100)]
                          motion-reduce:hover:translate-y-0"
                      >
                        {/* มุมกระดาษพับโทน Ink — ล้อภาษา paper-craft ของชุดภาพ Phase 2 */}
                        <span
                          aria-hidden
                          className="absolute right-0 top-0 h-0 w-0"
                          style={{
                            borderStyle: "solid",
                            borderWidth: "0 14px 14px 0",
                            borderColor:
                              "var(--ink-0) var(--ink-0) var(--ink-300) var(--ink-300)",
                          }}
                        />
                        <div className="flex flex-1 flex-col p-6">
                          <span
                            aria-hidden
                            className="block text-3xl font-medium leading-none text-ink-300"
                          >
                            {numberOf(service.key)}
                          </span>
                          <h3 className="mt-3 text-h3-m md:text-h3 text-ink-900">
                            {locale === "th" ? service.titleTh : service.title}
                          </h3>
                          {/* จุดสี 8px map ไป SDG ที่เกี่ยว (PART H) — มีเลขกำกับเสมอ (B3) กดไปหน้าผลงาน */}
                          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {service.sdg.map((id) => (
                              <Link
                                key={id}
                                href={`${t.impactPath}?sdg=${id}`}
                                aria-label={t.chipAria(id, sdgAria(id, locale))}
                                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500
                                  transition-colors duration-150 ease-brand hover:text-pink-700
                                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                              >
                                <span
                                  aria-hidden
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: SDG[id].pure }}
                                />
                                {id}
                              </Link>
                            ))}
                          </p>
                          <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">
                            {locale === "th" ? service.descTh : service.descEn}
                          </p>

                          <div className="mt-auto pt-4">
                            <button
                              type="button"
                              onClick={() => setOpen(isOpen ? null : service.key)}
                              aria-expanded={isOpen}
                              aria-controls={`service-${service.key}-projects`}
                              className="flex w-full items-center justify-between gap-2 text-[13px] font-medium leading-[1.4] text-pink-500
                                transition-colors duration-150 ease-brand hover:text-pink-700
                                focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                            >
                              {t.evidence(projectList.length)}
                              <svg
                                aria-hidden
                                viewBox="0 0 16 16"
                                className={`h-4 w-4 shrink-0 transition-transform duration-150 ease-brand motion-reduce:transition-none ${
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
                            </button>
                            <div
                              id={`service-${service.key}-projects`}
                              hidden={!isOpen}
                              className="mt-2 border-t border-ink-100 pt-2"
                            >
                            <ul className="flex flex-col">
                              {projectList.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`${t.impactPath}/${p.slug}`}
                                    className="block py-1.5 text-[13px] leading-[1.5] text-ink-700
                                      transition-colors duration-150 ease-brand hover:text-pink-700
                                      focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                                  >
                                    {locale === "th" ? p.title : p.titleEn}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
