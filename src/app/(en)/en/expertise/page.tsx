import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ExpertiseExplorer from "@/components/expertise/ExpertiseExplorer";
import SectionIcon from "@/components/ui/SectionIcon";

export const metadata = {
  alternates: {
    canonical: "/en/expertise",
    languages: { th: "/expertise", en: "/en/expertise", "x-default": "/expertise" },
  },
  title: "Expertise",
  description:
    "Nine services from research and training to print, video, and campaigns — each connected to the Sustainable Development Goals",
};

export default function EnglishExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" locale="en" />
      <main>

      <PageHero
        page="expertise"
        locale="en"
        kicker="Expertise"
        title="Nine services covering the whole communication process"
        lede="From research to delivery, we cover all four stages of the communication process — understand and design, produce, drive, and empower. Every service is backed by real delivered work: open a card to see its projects, or click a colored dot to browse work by SDG."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ExpertiseExplorer locale="en" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">
            Interested in a particular service?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Tell us what you need and we will design an approach that fits your organization.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Contact us</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="en" />
    </div>
  );
}
