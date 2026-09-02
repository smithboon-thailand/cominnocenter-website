import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/ui/PageBanner";
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

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          สื่อถึงเรา
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          เมื่อผลงานของเราไปปรากฏบนสื่อ
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          รวมข่าว งานวิจัย หนังสือ พอดแคสต์ และสื่อภายนอกที่อาจารย์ของศูนย์และผลงานของเราไปปรากฏ
          — ทั้งหมด {mediaSorted.length} รายการ เลือกดูตามอาจารย์หรือประเภทได้
        </p>
        <PageBanner page="media" locale="th" />
      </section>

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
