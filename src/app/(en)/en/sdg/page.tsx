import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import SdgPosterGrid from "@/components/ui/SdgPosterGrid";
import SdgWheel from "@/components/sdg/SdgWheel";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { partners } from "@/data/partners";
import { SDG_IDS } from "@/data/sdg";

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

export const metadata = {
  alternates: {
    canonical: "/en/sdg",
    languages: { th: "/sdg", en: "/en/sdg", "x-default": "/sdg" },
  },
  title: "Sustainable Development Goals",
  // Written for what ESG/CSR teams actually search: SDG communication and sustainability reporting
  description: `SDG communication strategy and evaluation research your sustainability report can cite — our work already covers ${coveredGoals} of the 17 Sustainable Development Goals`,
  openGraph: {
    title: "Sustainable Development Goals | ComInnoCenter",
    description: `Our communication innovation covers ${coveredGoals} of the 17 SDGs`,
  },
};

export default function SdgPageEn() {
  return (
    <div className="min-h-screen">
      <Header active="sdg" locale="en" />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,440px)]">
          <div>
            <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
              Sustainable Development Goals
            </p>
            <h1 className="text-h1-m md:text-h1 text-ink-900">Every project answers a global goal</h1>
            <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
              We believe good communication changes quality of life. Every project is designed to serve at least one Sustainable Development Goal with measurable outcomes. Hover over a segment of the wheel to preview each goal, or click one to open its project list below.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              <Stat value={projects.length} unit="projects" label="Delivered work" />
              <Stat value={`${coveredGoals}/17`} unit="goals" label="SDGs our work covers" />
              <Stat value={partners.length} unit="organizations" label="Partners we work with" />
            </div>
          </div>
          <SdgWheel locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SdgPosterGrid locale="en" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            Which goal is your organization driving?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Whether it is a goal we already work in or one still waiting for its first project,
            we are ready to design measurable communication together.
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
