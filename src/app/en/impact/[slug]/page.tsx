import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import SdgBadge from "@/components/ui/SdgBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { getProjectBySlug, projects } from "@/data/projects";
import { getLocalizedProjectCopy } from "@/data/projectCopyEn";
import { SDG } from "@/data/sdg";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const copy = getLocalizedProjectCopy(project);
  return {
    title: project.titleEn,
    description: copy.outcome,
  };
}

/**
 * Impact detail — BRAND.md PART H: one page, one color
 * 6px pure hero bar + tint impact section · everything else pure Ink
 */
export default async function EnglishCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const copy = getLocalizedProjectCopy(project);
  const primary = project.sdg[0];
  const goal = SDG[primary];
  const gallery = (
    project.gallery?.length > 0
      ? project.gallery
      : [{ src: project.image, alt: project.alt }]
  ).map((img, i) => ({ src: img.src, alt: `${project.titleEn} — project photo ${i + 1}` }));

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="en" />

      <div aria-hidden className="h-1.5 w-full" style={{ backgroundColor: goal.pure }} />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-24">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]" aria-label="breadcrumb">
          <Link
            href="/en"
            className="inline-flex items-center font-medium text-pink-500 hover:text-pink-700"
          >
            ← Back to home
          </Link>
          <span className="text-ink-300" aria-hidden>
            |
          </span>
          <Link
            href="/en/impact"
            className="inline-flex items-center font-medium text-ink-700 hover:text-pink-500"
          >
            Back to impact
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-1.5">
            <SdgBadge id={primary} locale="en" />
            {project.sdg.slice(1).map((id) => (
              <SdgBadge key={id} id={id} variant="compact" locale="en" />
            ))}
          </div>
          <h1 className="text-h1-m md:text-h1 text-ink-900">{project.titleEn}</h1>
          {project.title !== project.titleEn && (
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-500">{project.title}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg border border-ink-300 md:aspect-[2.4/1]">
          <Image
            src={project.image}
            alt={`${project.titleEn} — project cover photo`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-12 px-6 pb-16">
        <SectionHeader locale="en" title="Challenge" description={copy.challenge} />
        <SectionHeader locale="en" title="Our approach" description={copy.approach} />
      </section>

      <section style={{ backgroundColor: goal.tint }}>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <SectionHeader locale="en" title="Impact" description={copy.impact} />
          <div className="mt-8 rounded-lg border border-ink-300 bg-white p-6">
            <p className="text-[17px] font-medium leading-[1.7] text-ink-900">{copy.outcome}</p>
          </div>
          {project.sourceUrl && (
            <p className="mt-6 text-[15px] leading-[1.6]">
              {project.sourceUrl.startsWith("/") ? (
                <Link
                  href={`/en${project.sourceUrl}`}
                  className="font-medium text-pink-500 hover:text-pink-700"
                >
                  Read the news post for this project →
                </Link>
              ) : (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-500 hover:text-pink-700"
                >
                  View project website ↗
                </a>
              )}
            </p>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-6">
            <SectionHeader
              locale="en"
              title="Project photos"
              description="Click an image to view full size"
            />
          </div>
          <ProjectGallery images={gallery} locale="en" />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Button variant="secondary" href={`/en/impact?sdg=${primary}`}>
          View all SDG {primary} projects
        </Button>
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-h2-m md:text-h2 text-white">
            Want to create impact like this together?
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
            Tell us about your organization and design measurable communication together.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/en/collaborate">Collaborate with us</Button>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
