import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { SDG, sdgAria } from "@/data/sdg";

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

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
        <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
          ความเชี่ยวชาญ
        </p>
        <h1 className="text-h1-m md:text-h1 text-ink-900">
          เก้าบริการ ครบทั้งกระบวนการสื่อสาร
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
          จากงานวิจัยถึงการลงมือทำ เราเปลี่ยนนวัตกรรมการสื่อสารให้เกิดผลจริงต่อคุณภาพชีวิต
          จุดสีใต้แต่ละบริการคือเป้าหมาย SDG ที่บริการนั้นเคยสร้างผลงานมาแล้ว
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.key} className="rounded-lg border border-ink-300 bg-white p-6">
              <h2 className="text-h3-m md:text-h3 text-ink-900">{service.titleTh}</h2>
              {/* จุดสี 8px map ไป SDG ที่เกี่ยว (PART H) — มีเลขกำกับเสมอ (B3) */}
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                {service.sdg.map((id) => (
                  <span
                    key={id}
                    aria-label={sdgAria(id)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500"
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: SDG[id].pure }}
                    />
                    {id}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-700">{service.descTh}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
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
