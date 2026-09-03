import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
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
    // openGraph ของหน้าลูกทับของ layout ทั้งก้อน ไม่ได้ merge ทีละ field
    // ถ้าไม่ใส่ images ตรงนี้ หน้านี้จะไม่มีภาพตอนแชร์เลย
    images: ["/images/og/og-default.jpg"],
  },
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <Header active="research" />
      {/* ผลงานตีพิมพ์ทั้งหมดในรูปแบบที่ Google อ่านเป็นงานวิชาการได้ */}
      <JsonLd data={publicationListSchema(publications, authorName, "th")} />
      <main>

      <PageHero
        page="research"
        locale="th"
        kicker="งานวิจัย"
        title="ผลงานตีพิมพ์ของศูนย์ฯ"
        lede="งานบริการทุกชิ้นของเราตั้งอยู่บนฐานงานวิจัย หน้านี้รวมผลงานตีพิมพ์ของคณาจารย์ประจำศูนย์ฯ ทั้งหนังสือ บทความวารสารนานาชาติ และบทความประชุมวิชาการ กดที่ชื่อเรื่องเพื่อเปิดผลงานต้นทาง"
      />

      {/*
        แถวตัวเลขเคยอยู่ในบล็อกหัวหน้า คั่นระหว่างคำนำกับภาพประกอบ
        ย้ายออกมาเป็นแถบของตัวเองใต้ hero เพราะช่องข้อความของ PageHero กว้าง ~58%
        ใส่ตัวเลขสี่ช่องแล้วแน่นเกินอ่าน — และการได้เต็มความกว้างทำให้ตัวเลข
        อ่านง่ายกว่าเดิมด้วย
      */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={publicationStats.total} unit="รายการ" label="ผลงานตีพิมพ์" />
          <Stat
            value={publicationStats.verifiable}
            unit="รายการ"
            label="เปิดต้นฉบับออนไลน์ได้"
            delay={120}
          />
          <Stat value={publicationStats.books} unit="เล่ม" label="หนังสือวิชาการ (Springer)" delay={240} />
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
