import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import MediaExplorer from "@/components/media/MediaExplorer";
import { mediaSorted } from "@/data/media";

export const metadata = {
  alternates: {
    canonical: "/media",
    languages: { th: "/media", en: "/en/media", "x-default": "/media" },
  },
  title: "สื่อถึงเรา",
  description:
    "ข่าว งานวิจัย พอดแคสต์ และสื่อภายนอกที่อาจารย์และศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ ไปปรากฏ",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <Header active="media" />
      <main>

      <PageHero
        page="media"
        locale="th"
        kicker="สื่อถึงเรา"
        title="เมื่อผลงานของเราไปปรากฏบนสื่อ"
        lede={
          <>
            รวมข่าว งานวิจัย หนังสือ พอดแคสต์ และสื่อภายนอกที่อาจารย์ของศูนย์และผลงานของเราไปปรากฏ
            — ทั้งหมด {mediaSorted.length} รายการ เลือกดูตามอาจารย์หรือประเภทได้
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <MediaExplorer />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            อยากชวนอาจารย์ของเราไปร่วมงานของคุณ
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            ติดต่อเราเพื่อเชิญบรรยาย ให้สัมภาษณ์ หรือร่วมโครงการวิจัย
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ติดต่อเรา</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
