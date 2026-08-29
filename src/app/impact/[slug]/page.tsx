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
import { servicesForProject } from "@/data/services";
import { SDG } from "@/data/sdg";
import ProjectFooterNav from "@/components/impact/ProjectFooterNav";
import ProjectTestimonial from "@/components/impact/ProjectTestimonial";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "ไม่พบโครงการ" };
  return {
    title: project.title,
    description: project.outcome,
    alternates: {
      canonical: `/impact/${slug}`,
      languages: { th: `/impact/${slug}`, en: `/en/impact/${slug}`, "x-default": `/impact/${slug}` },
    },
    openGraph: { title: project.title, description: project.outcome, images: [project.image] },
  };
}

/**
 * Impact detail — BRAND.md PART H: หนึ่งหน้า หนึ่งสี
 * แถบ hero 6px สี pure ของ SDG หลัก + ส่วนผลลัพธ์พื้น tint · ที่เหลือเป็น Ink ล้วน
 * (badge เป้าหมายรองแสดงได้เฉพาะตรง header)
 */
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const primary = project.sdg[0];
  const goal = SDG[primary];
  const results = project.results ?? [];
  const usedServices = servicesForProject(slug);
  const gallery =
    project.gallery?.length > 0
      ? project.gallery
      : [{ src: project.image, alt: project.alt }];

  return (
    <div className="min-h-screen">
      <Header active="impact" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "หน้าแรก", path: "/" },
          { name: "ผลงาน", path: "/impact" },
          { name: project.title, path: `/impact/${slug}` },
        ])}
      />
      <main>

      {/* แถบ hero 6px สี pure ของ SDG หลัก เต็มความกว้าง */}
      <div aria-hidden className="h-1.5 w-full" style={{ backgroundColor: goal.pure }} />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-24">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]" aria-label="breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-pink-500 hover:text-pink-700"
          >
            ← กลับหน้าหลัก
          </Link>
          <span className="text-ink-300" aria-hidden>
            |
          </span>
          <Link
            href="/impact"
            className="inline-flex items-center font-medium text-ink-700 hover:text-pink-500"
          >
            กลับไปหน้าผลงาน
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-1.5">
            <SdgBadge id={primary} />
            {project.sdg.slice(1).map((id) => (
              <SdgBadge key={id} id={id} variant="compact" />
            ))}
          </div>
          <h1 className="text-h1-m md:text-h1 text-ink-900">{project.title}</h1>
          {project.title !== project.titleEn && (
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-500">{project.titleEn}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg border border-ink-300 md:aspect-[2.4/1]">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-12 px-6 pb-16">
        <SectionHeader title="ความท้าทาย" description={project.challenge} />
        <div className="space-y-5">
          <SectionHeader title="แนวทางของเรา" description={project.approach} />
          {usedServices.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] leading-[1.6]">
              <span className="text-ink-500">บริการที่ใช้ในโครงการนี้:</span>
              {usedServices.map(({ service, stage }) => (
                <Link
                  key={service.key}
                  href={`/expertise#stage-${stage.key}`}
                  className="rounded-full border border-ink-300 px-3 py-1 text-[13px] font-medium text-ink-700 transition-colors duration-150 ease-brand hover:border-pink-500 hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
                >
                  {service.titleTh}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ส่วนผลลัพธ์ — พื้น tint ของ SDG หลัก (จุดสีเดียวของหน้านอกจากแถบบน) */}
      <section style={{ backgroundColor: goal.tint }}>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <SectionHeader title="ผลลัพธ์" description={project.impact} />
          {results.length > 0 && (
            <div
              className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-8 ${
                results.length > 2 ? "md:grid-cols-4" : "md:grid-cols-2"
              }`}
            >
              {results.map((r, i) => (
                <Stat
                  key={r.label}
                  value={r.value}
                  unit={r.unit}
                  label={r.label}
                  delay={i * 120}
                />
              ))}
            </div>
          )}
          <div className="mt-8 rounded-lg border border-ink-300 bg-white p-6">
            <p className="text-[17px] font-medium leading-[1.7] text-ink-900">{project.outcome}</p>
          </div>
          {project.sourceUrl && (
            <p className="mt-6 text-[15px] leading-[1.6]">
              {project.sourceUrl.startsWith("/") ? (
                <Link
                  href={project.sourceUrl}
                  className="font-medium text-pink-500 hover:text-pink-700"
                >
                  อ่านข่าวของโครงการนี้ →
                </Link>
              ) : (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-500 hover:text-pink-700"
                >
                  ดูเว็บไซต์โครงการ ↗
                </a>
              )}
            </p>
          )}
        </div>
      </section>

      {/* เสียงจากพันธมิตร — ซ่อนทั้งก้อนเมื่อยังไม่มีข้อมูล ไม่ขึ้น placeholder */}
      {project.testimonial && (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <ProjectTestimonial testimonial={project.testimonial} accent={goal.deep} />
        </section>
      )}

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-6">
            <SectionHeader title="ภาพจากโครงการ" description="คลิกที่ภาพเพื่อดูขนาดใหญ่" />
          </div>
          <ProjectGallery images={gallery} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Button variant="secondary" href={`/impact?sdg=${primary}`}>
          ดูผลงานทั้งหมดใน SDG {primary}
        </Button>
      </section>

      {/* ทางไปต่อ — โครงการที่เกี่ยวข้อง ข่าว และก่อนหน้า/ถัดไป */}
      <ProjectFooterNav slug={slug} />

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">อยากสร้างผลลัพธ์แบบนี้ไปด้วยกัน</h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            เล่าโจทย์ขององค์กรให้เราฟัง แล้วออกแบบการสื่อสารที่วัดผลได้ไปด้วยกัน
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/collaborate">ร่วมงานกับเรา</Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
