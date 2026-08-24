import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { relatedProjects, projectNeighbours } from "@/lib/related";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { newsPosts } from "@/data/news";

type ProjectFooterNavProps = {
  slug: string;
  locale?: "th" | "en";
};

const COPY = {
  th: {
    relatedTitle: "โครงการที่เกี่ยวข้อง",
    relatedDesc: "งานที่ใช้บริการเดียวกันหรือตอบเป้าหมายเดียวกัน",
    newsTitle: "ข่าวที่เกี่ยวข้อง",
    prev: "โครงการก่อนหน้า",
    next: "โครงการถัดไป",
    impactPath: "/impact",
    newsPath: "/news",
  },
  en: {
    relatedTitle: "Related projects",
    relatedDesc: "Work that shares a service or answers the same goal",
    newsTitle: "Related news",
    prev: "Previous project",
    next: "Next project",
    impactPath: "/en/impact",
    newsPath: "/en/news",
  },
} as const;

/**
 * ท้ายหน้าโครงการ — กันไม่ให้เป็นทางตัน
 * โครงการที่เกี่ยวข้อง (คิดคะแนนจากบริการร่วม + SDG ร่วม) · ข่าวที่อ้างถึงโครงการนี้ ·
 * ปุ่มก่อนหน้า/ถัดไปตามลำดับหน้า /impact
 * ใช้สี Ink ล้วน ยกเว้นแถบสีบนการ์ดซึ่งเป็นของ ProjectCard เดิม
 */
export default function ProjectFooterNav({ slug, locale = "th" }: ProjectFooterNavProps) {
  const t = COPY[locale];
  const related = relatedProjects(slug, 3);
  const neighbours = projectNeighbours(slug);
  const news = newsPosts.filter((post) => post.relatedProjectSlug === slug).slice(0, 3);

  return (
    <>
      {related.length > 0 && (
        <section className="border-t border-ink-300 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionHeader
              locale={locale}
              title={t.relatedTitle}
              description={t.relatedDesc}
            />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard
                  key={p.slug}
                  href={`${t.impactPath}/${p.slug}`}
                  title={locale === "th" ? p.title : p.titleEn}
                  description={
                    locale === "th" ? p.outcome : getLocalizedProjectCopy(p).outcome
                  }
                  image={p.image}
                  alt={p.alt}
                  sdgIds={p.sdg}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <SectionHeader locale={locale} title={t.newsTitle} />
          <ul className="mt-6 flex flex-col divide-y divide-ink-100 border-t border-ink-100">
            {news.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`${t.newsPath}/${post.slug}`}
                  className="block py-4 text-[17px] leading-[1.6] text-ink-900
                    transition-colors duration-150 ease-brand hover:text-pink-700
                    focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                >
                  {locale === "th" ? post.titleTh : post.titleEn}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {neighbours && (
        <nav
          aria-label={t.relatedTitle}
          className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pb-16 sm:flex-row sm:justify-between"
        >
          {(
            [
              { key: "prev", project: neighbours.prev, label: t.prev, arrow: "←" },
              { key: "next", project: neighbours.next, label: t.next, arrow: "→" },
            ] as const
          ).map(({ key, project, label, arrow }) => (
            <Link
              key={key}
              href={`${t.impactPath}/${project.slug}`}
              className={`group flex max-w-sm flex-col gap-1 rounded-lg border border-ink-300 bg-white p-4
                transition-colors duration-150 ease-brand hover:border-ink-500
                focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]
                ${key === "next" ? "sm:items-end sm:text-right" : ""}`}
            >
              <span className="text-[13px] leading-[1.4] text-ink-500">
                {key === "prev" ? `${arrow} ${label}` : `${label} ${arrow}`}
              </span>
              <span className="text-[15px] font-medium leading-[1.6] text-ink-900 group-hover:text-pink-700">
                {locale === "th" ? project.title : project.titleEn}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
