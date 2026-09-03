import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ExpertiseExplorer from "@/components/expertise/ExpertiseExplorer";
import SectionIcon from "@/components/ui/SectionIcon";

export const metadata = {
  alternates: {
    canonical: "/expertise",
    languages: { th: "/expertise", en: "/en/expertise", "x-default": "/expertise" },
  },
  title: "ความเชี่ยวชาญ",
  description:
    "บริการทั้ง 9 ด้านของศูนย์ฯ ตั้งแต่งานวิจัย การอบรม สื่อสิ่งพิมพ์ วิดีโอ ไปจนถึงแคมเปญ — ทุกบริการเชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืน",
};

export default function ExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" />
      <main>

      <PageHero
        page="expertise"
        locale="th"
        kicker="ความเชี่ยวชาญ"
        title="เก้าบริการ ครบทั้งกระบวนการสื่อสาร"
        lede="จากงานวิจัยถึงการลงมือทำ เราดูแลครบทั้ง 4 ช่วงของกระบวนการสื่อสาร — เข้าใจและออกแบบ ผลิตสื่อ ขับเคลื่อน และส่งต่อความรู้ ทุกบริการมีผลงานจริงรองรับ กดที่การ์ดเพื่อกางรายชื่อโครงการ หรือกดจุดสีเพื่อดูผลงานตามเป้าหมาย SDG"
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ExpertiseExplorer />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">สนใจบริการด้านใดเป็นพิเศษ</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            บอกเราได้เลย เราพร้อมออกแบบแนวทางที่เหมาะสมกับองค์กรของคุณ
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
