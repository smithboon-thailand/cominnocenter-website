import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SdgBadge from "@/components/ui/SdgBadge";
import SdgFilterChips from "@/components/ui/SdgFilterChips";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ImpactExplorer, { type ImpactCardData } from "@/components/impact/ImpactExplorer";
import SectionIcon from "@/components/ui/SectionIcon";
import { projects, type Project } from "@/data/projects";
import { SDG_IDS, type SdgId } from "@/data/sdg";
import { projectOutcome, projectTitle } from "@/lib/projectCopy";

export const metadata = {
  alternates: {
    canonical: "/zh/impact",
    languages: { th: "/impact", en: "/en/impact", "zh-Hans": "/zh/impact", "x-default": "/impact" },
  },
  title: "项目成果",
  description: "把传播创新转化为生活质量与可持续发展实际成效的项目，按联合国可持续发展目标分组",
};

export default function ImpactPageZh() {
  // ข้อมูลการ์ดสำหรับ filter ?sdg=N ฝั่ง client — หน้ายังเป็น static และ metadata อยู่ใน <head>
  const cards: ImpactCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: projectTitle(p, "zh"),
    description: projectOutcome(p, "zh"),
    image: p.image,
    alt: `${projectTitle(p, "zh")}——来自中心档案的项目照片`,
    sdg: p.sdg,
  }));

  const groups: { id: SdgId; items: Project[] }[] = [];
  for (const id of SDG_IDS) {
    const items = projects.filter((p) => p.sdg[0] === id);
    if (items.length > 0) groups.push({ id, items });
  }

  const grouped = (
    <section className="mx-auto max-w-7xl space-y-16 px-6 pb-24">
      {groups.map((group) => (
        <div key={group.id}>
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-ink-300 pb-4">
            <SdgBadge id={group.id} locale="zh" />
            <p className="text-[15px] leading-[1.6] text-ink-500">{group.items.length} 个项目</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((p) => (
              <ProjectCard
                key={p.slug}
                href={`/zh/impact/${p.slug}`}
                title={projectTitle(p, "zh")}
                description={projectOutcome(p, "zh")}
                image={p.image}
                alt={`${projectTitle(p, "zh")}——来自中心档案的项目照片`}
                sdgIds={p.sdg}
                locale="zh"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="zh" />
      <main>

      <PageHero
        page="impact"
        locale="zh"
        kicker="项目成果"
        title="带来真实成效的传播创新"
        lede="每个项目都与联合国可持续发展目标相衔接。选择一项目标，查看我们在该领域的工作。"
      />

      <Suspense
        fallback={
          <>
            <section className="mx-auto max-w-7xl px-6 pt-8 pb-8">
              <SdgFilterChips basePath="/zh/impact" locale="zh" />
            </section>
            {grouped}
          </>
        }
      >
        <ImpactExplorer basePath="/zh/impact" locale="zh" projects={cards}>
          {grouped}
        </ImpactExplorer>
      </Suspense>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
          <h2 className="text-h2-m md:text-h2 text-white">
            希望为贵机构的目标取得同样的成效？
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            告诉我们贵机构的情况，一起设计可衡量的传播方案。
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
