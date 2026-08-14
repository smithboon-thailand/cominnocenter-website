import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import { getProjectBySlug, projects } from "@/data/projects";

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
  return {
    title: project.titleEn,
    description: project.outcome,
  };
}

export default async function EnglishCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const gallery =
    project.gallery?.length > 0
      ? project.gallery
      : [{ src: project.image, alt: project.alt }];

  return (
    <div className="min-h-screen">
      <Header active="impact" locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
        <Link
          href="/en/impact"
          className="text-sm text-pink-500 font-medium hover:text-pink-600"
        >
          ← Back to impact
        </Link>
        <div className="mt-6 max-w-3xl">
          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700 mb-4">
            {project.sdg} · {project.sdgLabel}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
            {project.titleEn}
          </h1>
          {project.title !== project.titleEn && (
            <p className="mt-2 text-neutral-500">{project.title}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="relative aspect-[21/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden">
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

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Challenge</h2>
            <p className="text-neutral-700 leading-relaxed text-lg">{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Approach</h2>
            <p className="text-neutral-700 leading-relaxed text-lg">{project.approach}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Impact</h2>
            <p className="text-neutral-700 leading-relaxed text-lg">{project.impact}</p>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
          <p className="text-neutral-700 font-medium">{project.outcome}</p>
        </div>

        {project.sourceUrl && (
          <p className="mt-6 text-sm text-neutral-500">
            Source:{" "}
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
            >
              View original post
            </a>
          </p>
        )}
      </section>

      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Gallery</h2>
          <p className="text-sm text-neutral-500 mb-6">Click an image to view larger</p>
          <ProjectGallery images={gallery} />
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-white border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-semibold text-blue-700 mb-8">Related projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/en/impact/${item.slug}`}
                  className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">
                      {item.titleEn}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.outcome}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Want to create impact like this together?
          </h2>
          <Link
            href="/en/collaborate"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            Collaborate with us
          </Link>
        </div>
      </section>

      <Footer locale="en" />
    </div>
  );
}
