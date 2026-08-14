import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import SdgPosterGrid from "@/components/ui/SdgPosterGrid";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { partners } from "@/data/partners";
import { SDG_IDS } from "@/data/sdg";

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

export const metadata = {
  title: "เป้าหมายการพัฒนาที่ยั่งยืน (SDG)",
  description: `งานของศูนย์ฯ เชื่อมโยงกับเป้าหมายการพัฒนาที่ยั่งยืนแล้ว ${coveredGoals} จาก 17 เป้าหมาย — สำรวจผลงานตามเป้าหมาย หรือชวนเราเปิดเป้าหมายใหม่ไปด้วยกัน`,
  openGraph: {
    title: "เป้าหมายการพัฒนาที่ยั่งยืน (SDG) | ComInnoCenter",
    description: `นวัตกรรมการสื่อสารของเราครอบคลุม ${coveredGoals} จาก 17 เป้าหมาย SDG`,
  },
};

export default function SdgPage() {
  return (
    <div className="min-h-screen">
      <Header active="sdg" />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          เป้าหมายการพัฒนาที่ยั่งยืน
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">ทุกโครงการของเราตอบเป้าหมายโลก</h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          เราเชื่อว่าการสื่อสารที่ดีเปลี่ยนคุณภาพชีวิตได้จริง ทุกโครงการจึงถูกออกแบบให้ตอบเป้าหมายการพัฒนาที่ยั่งยืนอย่างน้อยหนึ่งข้อ และวัดผลลัพธ์ได้เสมอ เลือกเป้าหมายด้านล่างเพื่อดูผลงานในเรื่องนั้น
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Stat value={projects.length} unit="โครงการ" label="ผลงานที่ส่งมอบแล้ว" />
          <Stat value={`${coveredGoals}/17`} unit="เป้าหมาย" label="SDG ที่งานของเราครอบคลุม" />
          <Stat value={partners.length} unit="องค์กร" label="พันธมิตรที่ร่วมงานกับเรา" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SdgPosterGrid />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            เป้าหมายไหนที่องค์กรของคุณกำลังขับเคลื่อน
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            ไม่ว่าจะเป็นเป้าหมายที่เรามีผลงานแล้ว หรือเป้าหมายที่ยังว่างอยู่
            เราพร้อมออกแบบการสื่อสารที่วัดผลได้ไปด้วยกัน
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ร่วมงานกับเรา</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
