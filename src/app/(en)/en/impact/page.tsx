import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SdgBadge from "@/components/ui/SdgBadge";
import SdgFilterChips from "@/components/ui/SdgFilterChips";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ImpactExplorer, { type ImpactCardData } from "@/components/impact/ImpactExplorer";
import { projects, type Project } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { SDG_IDS, type SdgId } from "@/data/sdg";

export const metadata = {
  alternates: {
    canonical: "/en/impact",
    languages: { th: "/impact", en: "/en/impact", "x-default": "/impact" },
  },
  title: "Our impact",
  description:
    "Projects that turn communication innovation into real quality-of-life and sustainability outcomes, grouped by Sustainable Development Goal",
};

export default function ImpactPageEn() {
  // Card data for the client-side ?sdg=N filter — keeps the page static with metadata in <head>
  const cards: ImpactCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.titleEn,
    description: getLocalizedProjectCopy(p).outcome,
    image: p.image,
    alt: `${p.titleEn} — project photo from the center's archive`,
    sdg: p.sdg,
  }));

  const groups: { id: SdgId; items: Project[] }[] = [];
  for (const id of SDG_IDS) {
    const items = projects.filter((p) => p.sdg[0] === id);
    if (items.length > 0) groups.push({ id, items });
  }

  const grouped = (
    <section className="mx-auto max-w-7xl space-y-16 px-6 pb-24">
      {groups.map((group) => (
        <div key={group.id}>
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-ink-300 pb-4">
            <SdgBadge id={group.id} locale="en" />
            <p className="text-[15px] leading-[1.6] text-ink-500">
              {group.items.length} {group.items.length === 1 ? "project" : "projects"}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <ProjectCard
                key={p.slug}
                href={`/en/impact/${p.slug}`}
                title={p.titleEn}
                description={getLocalizedProjectCopy(p).outcome}
                image={p.image}
                alt={`${p.titleEn} — project photo from the center's archive`}
                sdgIds={p.sdg}
                locale="en"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="en" />
      <main>

      <PageHero
        page="impact"
        locale="en"
        kicker="Impact"
        title="Communication innovation with real outcomes"
        lede="Every project connects to the Sustainable Development Goals. Pick a goal to see our work in that area."
      />

      <Suspense
        fallback={
          <>
            <section className="mx-auto max-w-7xl px-6 pt-8 pb-8">
              <SdgFilterChips basePath="/en/impact" locale="en" />
            </section>
            {grouped}
          </>
        }
      >
        <ImpactExplorer basePath="/en/impact" locale="en" projects={cards}>
          {grouped}
        </ImpactExplorer>
      </Suspense>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            Want results like these for your goals?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Tell us about your organization and design measurable communication together.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Collaborate with us</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="en" />
    </div>
  );
}
