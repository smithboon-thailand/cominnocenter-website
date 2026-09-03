import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectGallery from "@/components/ProjectGallery";
import { newsPosts, getNewsBySlug, newsImages, newsCover } from "@/data/news";
import { getProjectBySlug } from "@/data/projects";
import JsonLd from "@/components/seo/JsonLd";
import { newsArticleSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: "ไม่พบข่าว" };
  return {
    title: post.titleTh,
    description: post.bodyTh[0],
    alternates: {
      canonical: `/news/${slug}`,
      languages: { th: `/news/${slug}`, en: `/en/news/${slug}`, "x-default": `/news/${slug}` },
    },
    openGraph: { title: post.titleTh, description: post.bodyTh[0], images: [newsCover(slug)] },
  };
}

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

function thaiDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const cover = newsCover(slug);
  const gallery = newsImages(slug)
    .slice(1)
    .map((src) => ({ src, alt: `${post.titleTh} — ภาพจากข่าวของศูนย์` }));
  const relatedProject = post.relatedProjectSlug
    ? getProjectBySlug(post.relatedProjectSlug)
    : undefined;

  return (
    <div className="min-h-screen">
      <Header />
      <JsonLd data={newsArticleSchema(post, "th", newsCover(post.slug))} />
      <main>

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-pink-500 hover:text-pink-600"
          >
            ← กลับหน้าหลัก
          </Link>
          <span className="text-neutral-300" aria-hidden>
            |
          </span>
          <Link
            href="/news"
            className="inline-flex items-center font-medium text-neutral-600 hover:text-pink-500"
          >
            ข่าวทั้งหมด
          </Link>
        </nav>
        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-medium text-neutral-500 mb-3">{thaiDate(post.date)}</p>
          <h1 className="text-h1-m md:text-h1 text-ink-900">
            {post.titleTh}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="relative aspect-[21/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden">
          <Image
            src={cover}
            alt={`${post.titleTh} — ภาพจากข่าวของศูนย์`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="space-y-6">
          {post.bodyTh.map((paragraph, i) => (
            <p key={i} className="text-neutral-700 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedProject && (
          <div className="mt-12 p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-1">โครงการที่เกี่ยวข้อง</p>
            <Link
              href={`/impact/${relatedProject.slug}`}
              className="font-medium text-blue-700 hover:text-pink-500 transition-colors"
            >
              {relatedProject.title} →
            </Link>
          </div>
        )}
      </section>

      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="mb-6">
            <SectionHeader icon="gallery" title="ภาพบรรยากาศ" description="คลิกที่ภาพเพื่อดูขนาดใหญ่" />
          </div>
          <ProjectGallery images={gallery} />
        </section>
      )}

      </main>
      <Footer />
    </div>
  );
}
