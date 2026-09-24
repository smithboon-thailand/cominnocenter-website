import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import SdgBadge from "@/components/ui/SdgBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Stat from "@/components/ui/Stat";
import { getProjectBySlug, projects } from "@/data/projects";
import { getProjectCopyZh } from "@/data/projectCopyZh";
import { servicesForProject } from "@/data/services";
import { SDG } from "@/data/sdg";
import ContextCTA from "@/components/ui/ContextCTA";
import ProjectFooterNav from "@/components/impact/ProjectFooterNav";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "找不到该项目" };
  const copy = getProjectCopyZh(project);
  return {
    title: copy.title,
    description: copy.outcome,
    alternates: {
      canonical: `/zh/impact/${slug}`,
      languages: {
        th: `/impact/${slug}`,
        en: `/en/impact/${slug}`,
        "zh-Hans": `/zh/impact/${slug}`,
        "x-default": `/impact/${slug}`,
      },
    },
    openGraph: { title: copy.title, description: copy.outcome, images: [project.image] },
  };
}

/**
 * หน้ารายละเอียดโครงการภาษาจีน — BRAND.md PART H: หนึ่งหน้าหนึ่งสี
 * แถบ 6px สี pure + ส่วนผลลัพธ์พื้น tint · ที่เหลือเป็น Ink ล้วน
 *
 * ต่างจากหน้าอังกฤษตรงที่**ไม่แสดงชื่อไทยใต้หัวเรื่อง** — ผู้อ่านจีนอ่านอักษรไทย
 * ไม่ออก และ `check:content` ตรวจว่าหน้าจีนไม่มีอักษรไทยหลุดมา · ไม่มีเสียงจาก
 * พันธมิตร (testimonial) เพราะยังไม่มีโครงการใดมีข้อมูลนี้ในภาษาใดเลย
 */
export default async function ChineseCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const copy = getProjectCopyZh(project);
  const primary = project.sdg[0];
  const goal = SDG[primary];
  const results = copy.results ?? [];
  const usedServices = servicesForProject(slug);
  const gallery = (
    project.gallery?.length > 0
      ? project.gallery
      : [{ src: project.image, alt: project.alt }]
  ).map((img, i) => ({ src: img.src, alt: `${copy.title}——项目照片 ${i + 1}` }));

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="zh" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "首页", path: "/zh" },
          { name: "项目成果", path: "/zh/impact" },
          { name: copy.title, path: `/zh/impact/${slug}` },
        ])}
      />
      <main>

      <div aria-hidden className="h-1.5 w-full" style={{ backgroundColor: goal.pure }} />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-24">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]" aria-label="面包屑导航">
          <Link
            href="/zh"
            className="inline-flex items-center font-medium text-pink-500 hover:text-pink-700"
          >
            ← 返回首页
          </Link>
          <span className="text-ink-300" aria-hidden>
            |
          </span>
          <Link
            href="/zh/impact"
            className="inline-flex items-center font-medium text-ink-700 hover:text-pink-500"
          >
            返回项目成果
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-1.5">
            <SdgBadge id={primary} locale="zh" />
            {project.sdg.slice(1).map((id) => (
              <SdgBadge key={id} id={id} variant="compact" locale="zh" />
            ))}
          </div>
          <h1 className="text-h1-m md:text-h1 text-ink-900">{copy.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg border border-ink-300 md:aspect-[2.4/1]">
          <Image
            src={project.image}
            alt={`${copy.title}——项目封面照片`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-12 px-6 pb-16">
        <SectionHeader locale="zh" title="挑战" icon="challenge" description={copy.challenge} />
        <div className="space-y-5">
          <SectionHeader locale="zh" title="我们的做法" icon="approach" description={copy.approach} />
          {usedServices.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] leading-[1.6]">
              <span className="text-ink-500">本项目使用的服务：</span>
              {usedServices.map(({ service, stage }) => (
                <Link
                  key={service.key}
                  href={`/zh/expertise#stage-${stage.key}`}
                  className="rounded-full border border-ink-300 px-3 py-1 text-[13px] font-medium text-ink-700 transition-colors duration-150 ease-brand hover:border-pink-500 hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                >
                  {service.titleZh}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: goal.tint }}>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <SectionHeader locale="zh" title="成效" icon="outcome" description={copy.impact} />
          {results.length > 0 && (
            <div
              className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-8 ${
                results.length > 2 ? "md:grid-cols-4" : "md:grid-cols-2"
              }`}
            >
              {results.map((r, i) => (
                <Stat key={r.label} value={r.value} unit={r.unit} label={r.label} delay={i * 120} />
              ))}
            </div>
          )}
          <div className="mt-8 rounded-lg border border-ink-300 bg-white p-6">
            <p className="text-[17px] font-medium leading-[1.7] text-ink-900">{copy.outcome}</p>
          </div>
          {/* ข่าวภายในยังไม่มีฉบับจีน — ลิงก์ที่มาจึงมีเฉพาะเว็บโครงการภายนอก */}
          {project.sourceUrl && !project.sourceUrl.startsWith("/") && (
            <p className="mt-6 text-[15px] leading-[1.6]">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-pink-500 hover:text-pink-700"
              >
                访问项目网站 ↗
              </a>
            </p>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-6">
            <SectionHeader
              locale="zh"
              icon="gallery"
              title="项目照片"
              description="点击图片查看大图"
            />
          </div>
          <ProjectGallery images={gallery} locale="zh" />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Button variant="secondary" href={`/zh/impact?sdg=${primary}`}>
          查看目标 {primary} 的全部项目
        </Button>
      </section>

      <ProjectFooterNav slug={slug} locale="zh" />

      {/* Context CTA — ref บันทึกว่าคำถามมาจากโครงการไหน */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ContextCTA
          heading="面临类似的挑战？"
          sub="告诉我们贵机构的情况，一起设计可衡量的传播方案。"
          href={`/zh/collaborate?ref=impact-${slug}`}
          cta="与我们合作"
          accent={goal.deep}
        />
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
