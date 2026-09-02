import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/ui/PageBanner";
import ResearchExplorer from "@/components/research/ResearchExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { publicationListSchema } from "@/lib/schema";
import { publications, publicationStats } from "@/data/publications";
import { leadership } from "@/data/leadership";

const authorName = (slug: string) => leadership.find((l) => l.slug === slug)?.nameEn ?? slug;

export const metadata = {
  alternates: {
    canonical: "/en/research",
    languages: { th: "/research", en: "/en/research", "x-default": "/research" },
  },
  title: "Research & Publications",
  description: `${publicationStats.total} publications from the center — ${publicationStats.books} books, ${publicationStats.articles} journal articles, across ${publicationStats.venues} journals and academic venues since ${publicationStats.since}`,
  openGraph: {
    title: "Research & Publications | ComInnoCenter",
    description: `${publicationStats.total} publications across ${publicationStats.venues} journals and academic venues`,
    // openGraph ของหน้าลูกทับของ layout ทั้งก้อน ไม่ได้ merge ทีละ field
    // ถ้าไม่ใส่ images ตรงนี้ หน้านี้จะไม่มีภาพตอนแชร์เลย
    images: ["/images/og/og-default.jpg"],
  },
};

export default function ResearchPageEn() {
  return (
    <div className="min-h-screen">
      <Header active="research" locale="en" />
      <JsonLd data={publicationListSchema(publications, authorName, "en")} />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
          Research
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">Publications from the center</h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          Every service we deliver rests on a research base. This page collects the published work
          of the center&apos;s faculty — books, international journal articles, and conference
          papers. Select a title to open the original publication.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={publicationStats.total} unit="publications" label="Published works" />
          <Stat
            value={publicationStats.verifiable}
            unit="publications"
            label="Openable online"
            delay={120}
          />
          <Stat value={publicationStats.books} unit="books" label="Academic books (Springer)" delay={240} />
          <Stat value={publicationStats.since} label="Publishing continuously since" animate={false} />
        </div>
        <PageBanner page="research" locale="en" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ResearchExplorer locale="en" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">Want to research with us?</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            We welcome collaboration on research, project evaluation, and co-authored publications
            with partners in Thailand and abroad.
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
