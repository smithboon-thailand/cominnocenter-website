import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ExpertiseExplorer from "@/components/expertise/ExpertiseExplorer";
import SectionIcon from "@/components/ui/SectionIcon";

export const metadata = {
  alternates: {
    canonical: "/zh/expertise",
    languages: {
      th: "/expertise",
      en: "/en/expertise",
      "zh-Hans": "/zh/expertise",
      "x-default": "/expertise",
    },
  },
  title: "专业服务",
  description:
    "从研究、培训到印刷、视频与宣传活动的九项服务——每一项都与联合国可持续发展目标相衔接",
};

export default function ChineseExpertisePage() {
  return (
    <div className="min-h-screen">
      <Header active="expertise" locale="zh" />
      <main>

      <PageHero
        page="expertise"
        locale="zh"
        kicker="专业服务"
        title="覆盖传播全流程的九项服务"
        lede="从研究到交付，我们覆盖传播流程的四个阶段——理解与设计、内容制作、推动传播、知识传承。每项服务都有真实交付的项目作为佐证：打开卡片查看相关项目，或点击彩色圆点按可持续发展目标浏览。"
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ExpertiseExplorer locale="zh" />
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">
            对某项服务感兴趣？
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            告诉我们您的需求，我们将为贵机构量身设计方案。
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/zh/collaborate">联系我们</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
