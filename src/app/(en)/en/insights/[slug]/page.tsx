import { notFound } from "next/navigation";
import { InsightArticlePage } from "@/components/insights/InsightPages";
import { insights, getInsightBySlug, insightImage } from "@/data/insights";
import { truncate } from "@/lib/text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  const c = post.en;
  const description = truncate(c.dek, 160, "en");
  return {
    title: c.title,
    description,
    alternates: {
      canonical: `/en/insights/${slug}`,
      languages: { th: `/insights/${slug}`, en: `/en/insights/${slug}`, "x-default": `/insights/${slug}` },
    },
    openGraph: { type: "article", title: c.title, description, images: [insightImage(post, "en")] },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();
  return <InsightArticlePage post={post} locale="en" />;
}
