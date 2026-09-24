import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import SdgPosterGrid from "@/components/ui/SdgPosterGrid";
import SdgWheel from "@/components/sdg/SdgWheel";
import Button from "@/components/ui/Button";
import SectionIcon from "@/components/ui/SectionIcon";
import { projects } from "@/data/projects";
import { partners } from "@/data/partners";
import { SDG_IDS } from "@/data/sdg";

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

export const metadata = {
  alternates: {
    canonical: "/zh/sdg",
    languages: { th: "/sdg", en: "/en/sdg", "zh-Hans": "/zh/sdg", "x-default": "/sdg" },
  },
  title: "可持续发展目标",
  description: `可供可持续发展报告引用的可持续发展目标传播策略与评估研究——我们的工作已覆盖 17 项目标中的 ${coveredGoals} 项`,
  openGraph: {
    title: "可持续发展目标 | ComInnoCenter",
    description: `我们的传播创新已覆盖 17 项可持续发展目标中的 ${coveredGoals} 项`,
    // openGraph ของหน้าลูกทับของ layout ทั้งก้อน — ต้องใส่ images เองทุกครั้ง
    images: ["/images/og/og-default.jpg"],
  },
};

export default function SdgPageZh() {
  return (
    <div className="min-h-screen">
      <Header active="sdg" locale="zh" />
      <main>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,440px)]">
          <div>
            <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
              可持续发展目标
            </p>
            <h1 className="text-h1-m md:text-h1 text-ink-900">每个项目都回应一项全球目标</h1>
            <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink-700">
              我们相信良好的传播能够改变生活质量。每个项目在设计之初就至少服务于一项可持续发展目标，并带来可衡量的成果。将鼠标悬停在轮盘的某一段上可预览该目标，点击则可打开下方对应的项目列表。
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              <Stat value={projects.length} unit="个项目" label="已完成的项目" />
              <Stat value={`${coveredGoals}/17`} unit="项目标" label="我们的工作已覆盖的目标" />
              <Stat value={partners.length} unit="家机构" label="合作伙伴" />
            </div>
          </div>
          <SdgWheel locale="zh" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SdgPosterGrid locale="zh" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">
            贵机构正在推动哪一项目标？
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            无论是我们已有项目的目标，还是尚待启动第一个项目的目标，我们都准备好与您一起设计可衡量的传播方案。
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/zh/collaborate">与我们合作</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
