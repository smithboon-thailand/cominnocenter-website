"use client";

import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/ui/ProjectCard";
import SdgBadge from "@/components/ui/SdgBadge";
import SdgFilterChips from "@/components/ui/SdgFilterChips";
import Button from "@/components/ui/Button";
import { SDG, type SdgId } from "@/data/sdg";

export type ImpactCardData = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  sdg: SdgId[];
};

type ImpactExplorerProps = {
  basePath: string;
  locale?: "th" | "en";
  projects: ImpactCardData[];
  /** รายการจัดกลุ่มตาม SDG หลัก (server-rendered) — แสดงเมื่อไม่ได้เลือก filter */
  children: React.ReactNode;
};

function parseSdg(value: string | null): SdgId | undefined {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 17 ? (n as SdgId) : undefined;
}

/**
 * ส่วน filter ?sdg=N ของหน้า Impact list — อ่าน query ฝั่ง client
 * เพื่อให้หน้า /impact เป็น static (metadata อยู่ใน <head> และรายการเต็มอยู่ใน HTML)
 */
export default function ImpactExplorer({
  basePath,
  locale = "th",
  projects,
  children,
}: ImpactExplorerProps) {
  const active = parseSdg(useSearchParams().get("sdg"));
  const filtered = active ? projects.filter((p) => p.sdg.includes(active)) : [];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-8">
        <SdgFilterChips basePath={basePath} active={active} locale={locale} />
      </section>

      {active ? (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <SdgBadge id={active} locale={locale} />
            <p className="text-[15px] leading-[1.6] text-ink-500">
              {locale === "th"
                ? `${filtered.length} โครงการ`
                : `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`}
            </p>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  href={`${basePath}/${p.slug}`}
                  title={p.title}
                  description={p.description}
                  image={p.image}
                  alt={p.alt}
                  sdgIds={p.sdg}
                  locale={locale}
                  // สามใบแรกคือแถวบนสุดบนเดสก์ท็อป — ใบแรกมักเป็น LCP ของหน้า
                  priority={i < 3}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-ink-300 bg-white p-8">
              <p className="max-w-prose text-[17px] leading-[1.7] text-ink-700">
                {locale === "th"
                  ? `ยังไม่มีโครงการในเป้าหมาย SDG ${active} — ${SDG[active].th} เราเปิดรับความร่วมมือในเป้าหมายนี้`
                  : `No projects yet for SDG ${active} — ${SDG[active].en}. We welcome collaboration in this goal.`}
              </p>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  href={locale === "th" ? "/collaborate" : "/en/collaborate"}
                >
                  {locale === "th" ? "ชวนเราทำโครงการแรก" : "Start the first project with us"}
                </Button>
              </div>
            </div>
          )}
        </section>
      ) : (
        children
      )}
    </>
  );
}
