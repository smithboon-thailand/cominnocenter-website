import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ResearchExplorer from "@/components/research/ResearchExplorer";
import JsonLd from "@/components/seo/JsonLd";
import SectionIcon from "@/components/ui/SectionIcon";
import { publicationListSchema } from "@/lib/schema";
import { publications, publicationStats } from "@/data/publications";
import { personName } from "@/lib/people";

const authorName = (slug: string) => personName(slug, "zh");

export const metadata = {
  alternates: {
    canonical: "/zh/research",
    languages: {
      th: "/research",
      en: "/en/research",
      "zh-Hans": "/zh/research",
      "x-default": "/research",
    },
  },
  title: "研究成果",
  description: `中心的 ${publicationStats.total} 项学术成果——${publicationStats.books} 部著作、${publicationStats.articles} 篇期刊论文，自 ${publicationStats.since} 年起发表于 ${publicationStats.venues} 种期刊与学术平台`,
  openGraph: {
    title: "研究成果 | ComInnoCenter",
    description: `发表于 ${publicationStats.venues} 种期刊与学术平台的 ${publicationStats.total} 项学术成果`,
    // openGraph ของหน้าลูกทับของ layout ทั้งก้อน — ต้องใส่ images เองทุกครั้ง
    images: ["/images/og/og-default.jpg"],
  },
};

/**
 * หน้ารายการงานวิจัยภาษาจีน — ชื่อบทความและรายการอ้างอิงคงภาษาต้นฉบับตามหลัก
 * บรรณานุกรม มีแต่ป้ายกำกับรอบๆ ที่เป็นจีน · ยังไม่มีหน้าบทสรุปฉบับจีน รายการจึง
 * ไม่มีลิงก์ "อ่านบทสรุป" (ดู ResearchExplorer)
 */
export default function ResearchPageZh() {
  return (
    <div className="min-h-screen">
      <Header active="research" locale="zh" />
      <JsonLd data={publicationListSchema(publications, authorName, "zh")} />
      <main>

      <PageHero
        page="research"
        locale="zh"
        kicker="研究成果"
        title="中心的学术出版物"
        lede="我们提供的每一项服务都建立在研究基础之上。本页汇集了中心教师已发表的成果——著作、国际期刊论文与会议论文。点击标题即可打开原始出版物。"
      />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <Stat value={publicationStats.total} unit="项" label="已发表成果" />
          <Stat value={publicationStats.verifiable} unit="项" label="可在线打开" delay={120} />
          <Stat value={publicationStats.books} unit="部" label="学术著作（Springer）" delay={240} />
          <Stat value={publicationStats.since} label="持续发表自" animate={false} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ResearchExplorer locale="zh" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">想与我们一起做研究吗？</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            我们欢迎泰国国内外的合作伙伴，在研究、项目评估与合著发表方面开展合作。
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
