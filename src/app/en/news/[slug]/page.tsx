import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import { newsPosts, getNewsBySlug, newsImages, newsCover } from "@/data/news";
import { getProjectBySlug } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: "News not found" };
  return {
    title: post.titleEn,
    description: post.bodyEn[0],
  };
}

function enDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default async function NewsDetailPageEn({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const cover = newsCover(slug);
  const gallery = newsImages(slug)
    .slice(1)
    .map((src) => ({ src, alt: `${post.titleEn} — photo from the center's news archive` }));
  const relatedProject = post.relatedProjectSlug
    ? getProjectBySlug(post.relatedProjectSlug)
    : undefined;

  return (
    <div className="min-h-screen">
      <Header locale="en" />

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="breadcrumb">
          <Link
            href="/en"
            className="inline-flex items-center font-medium text-pink-500 hover:text-pink-600"
          >
            ← Back to home
          </Link>
          <span className="text-neutral-300" aria-hidden>
            |
          </span>
          <Link
            href="/en/news"
            className="inline-flex items-center font-medium text-neutral-600 hover:text-pink-500"
          >
            All news
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-medium text-neutral-500 mb-3">{enDate(post.date)}</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
            {post.titleEn}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="relative aspect-[21/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden">
          <Image
            src={cover}
            alt={`${post.titleEn} — photo from the center's news archive`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="space-y-6">
          {post.bodyEn.map((paragraph, i) => (
            <p key={i} className="text-neutral-700 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedProject && (
          <div className="mt-12 p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-1">Related project</p>
            <Link
              href={`/en/impact/${relatedProject.slug}`}
              className="font-medium text-blue-700 hover:text-pink-500 transition-colors"
            >
              {relatedProject.titleEn} →
            </Link>
          </div>
        )}
      </section>

      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Gallery</h2>
          <p className="text-sm text-neutral-500 mb-6">Click an image to view full size</p>
          <ProjectGallery images={gallery} />
        </section>
      )}

      <Footer locale="en" />
    </div>
  );
}
