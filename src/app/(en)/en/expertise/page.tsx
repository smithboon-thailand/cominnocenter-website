import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/ui/PageBanner";
import ExpertiseExplorer from "@/components/expertise/ExpertiseExplorer";

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

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Expertise
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          Nine services covering the whole communication process
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          From research to delivery, we cover all four stages of the communication process —
          understand and design, produce, drive, and empower. Every service is backed by real
          delivered work: open a card to see its projects, or click a colored dot to browse
          work by SDG.
        </p>
        <PageBanner page="expertise" locale="en" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ExpertiseExplorer locale="en" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
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
