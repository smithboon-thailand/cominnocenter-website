import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SdgBadge from "@/components/ui/SdgBadge";
import SdgFilterChips from "@/components/ui/SdgFilterChips";
import Button from "@/components/ui/Button";
import { projects, type Project } from "@/data/projects";
import { SDG, SDG_IDS, type SdgId } from "@/data/sdg";

export const metadata = {
  title: "Our impact",
  description:
    "Projects that turn communication innovation into real quality-of-life and sustainability outcomes, grouped by Sustainable Development Goal",
};

type Props = {
  searchParams: Promise<{ sdg?: string }>;
};

function parseSdg(value?: string): SdgId | undefined {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 17 ? (n as SdgId) : undefined;
}

export default async function ImpactPageEn({ searchParams }: Props) {
  const { sdg } = await searchParams;
  const active = parseSdg(sdg);

  const filtered = active ? projects.filter((p) => p.sdg.includes(active)) : [];

  const groups: { id: SdgId; items: Project[] }[] = [];
  if (!active) {
    for (const id of SDG_IDS) {
      const items = projects.filter((p) => p.sdg[0] === id);
      if (items.length > 0) groups.push({ id, items });
    }
  }

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="en" />

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Impact
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          Communication innovation with real outcomes
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          Every project connects to the Sustainable Development Goals. Pick a goal to see our
          work in that area.
        </p>
        <div className="mt-8">
          <SdgFilterChips basePath="/en/impact" active={active} locale="en" />
        </div>
      </section>

      {active ? (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <SdgBadge id={active} locale="en" />
            <p className="text-[15px] leading-[1.6] text-ink-500">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.slug}
                  href={`/en/impact/${p.slug}`}
                  title={p.titleEn}
                  description={p.outcome}
                  image={p.image}
                  alt={`${p.titleEn} — project photo from the center's archive`}
                  sdgIds={p.sdg}
                  locale="en"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-ink-300 bg-white p-8">
              <p className="max-w-prose text-[17px] leading-[1.7] text-ink-700">
                No projects yet for SDG {active} — {SDG[active].en}. We welcome collaboration in
                this goal.
              </p>
              <div className="mt-6">
                <Button variant="secondary" href="/en/collaborate">
                  Start the first project with us
                </Button>
              </div>
            </div>
          )}
        </section>
      ) : (
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
                    description={p.outcome}
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
      )}

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

      <Footer locale="en" />
    </div>
  );
}
