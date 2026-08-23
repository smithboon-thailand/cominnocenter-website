import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import ResearchExplorer from "@/components/research/ResearchExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { publicationListSchema } from "@/lib/schema";
import { publications, publicationStats } from "@/data/publications";
import { leadership } from "@/data/leadership";

const authorName = (slug: string) => leadership.find((l) => l.slug === slug)?.name ?? slug;

export const metadata = {
  alternates: {
    canonical: "/research",
    languages: { th: "/research", en: "/en/research", "x-default": "/research" },
  },
  title: "งานวิจัยและผลงานตีพิมพ์",
  description: `ผลงานวิชาการของศูนย์ฯ ${publicationStats.total} รายการ — หนังสือ ${publicationStats.books} เล่ม บทความวารสาร ${publicationStats.articles} ชิ้น ตีพิมพ์ใน ${publicationStats.venues} วารสารและเวทีวิชาการ ตั้งแต่ปี ${publicationStats.since}`,
  openGraph: {
    title: "งานวิจัยและผลงานตีพิมพ์ | ComInnoCenter",
    description: `ผลงานวิชาการ ${publicationStats.total} รายการ ใน ${publicationStats.venues} วารสารและเวทีวิชาการ`,
  },
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <Header active="research" />
      {/* ผลงานตีพิมพ์ทั้งหมดในรูปแบบที่ Google อ่านเป็นงานวิชาการได้ */}
      <JsonLd data={publicationListSchema(publications, authorName, "th")} />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          งานวิจัย
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">ผลงานตีพิมพ์ของศูนย์ฯ</h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          งานบริการทุกชิ้นของเราตั้งอยู่บนฐานงานวิจัย หน้านี้รวมผลงานตีพิมพ์ของคณาจารย์ประจำศูนย์ฯ
          ทั้งหนังสือ บทความวารสารนานาชาติ และบทความประชุมวิชาการ กดที่ชื่อเรื่องเพื่อเปิดผลงานต้นทางผ่าน DOI
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={publicationStats.total} unit="รายการ" label="ผลงานตีพิมพ์" />
          <Stat value={publicationStats.books} unit="เล่ม" label="หนังสือวิชาการ (Springer)" delay={120} />
          <Stat value={publicationStats.venues} unit="แห่ง" label="วารสารและเวทีวิชาการ" delay={240} />
          <Stat value={publicationStats.since} label="ตีพิมพ์ต่อเนื่องตั้งแต่ปี" animate={false} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ResearchExplorer />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">อยากทำวิจัยร่วมกับเรา</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            เราเปิดรับความร่วมมือด้านงานวิจัย การประเมินผลโครงการ และการตีพิมพ์ร่วม
            ทั้งกับหน่วยงานในประเทศและต่างประเทศ
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ร่วมงานกับเรา</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
