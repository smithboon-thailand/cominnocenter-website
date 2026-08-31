import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import PaperSummaryBody from "@/components/research/PaperSummaryBody";
import { breadcrumbSchema, scholarlyArticleSchema, SITE_URL } from "@/lib/schema";
import { paperSummaries, paperSummaryBySlug, CC_LICENSES } from "@/data/paperSummaries";
import { publications } from "@/data/publications";
import { leadership } from "@/data/leadership";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return paperSummaries.map((s) => ({ slug: s.slug }));
}

const authorName = (slug: string) => leadership.find((l) => l.slug === slug)?.nameEn ?? slug;
const paperFor = (doi: string) => publications.find((p) => p.doi === doi);

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryBySlug(slug);
  const paper = summary && paperFor(summary.doi);
  if (!summary || !paper) return { title: "Summary not found" };
  return {
    title: summary.en.headline,
    description: summary.en.question.slice(0, 160),
    alternates: {
      canonical: `/en/research/${slug}`,
      languages: {
        th: `/research/${slug}`,
        en: `/en/research/${slug}`,
        "x-default": `/research/${slug}`,
      },
    },
    openGraph: {
      title: summary.en.headline,
      description: summary.en.question.slice(0, 200),
      // A child page's openGraph replaces the layout's wholesale — images must be repeated
      images: ["/images/og/og-default.jpg"],
    },
  };
}

export default async function PaperSummaryPageEn({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryBySlug(slug);
  const paper = summary && paperFor(summary.doi);
  if (!summary || !paper) notFound();

  const license = CC_LICENSES[summary.license];
  const pdfUrl = summary.pdf ? `${SITE_URL}/papers/${summary.pdf}` : undefined;

  return (
    <div className="min-h-screen">
      <Header locale="en" active="research" switchHref={`/research/${slug}`} />
      <JsonLd
        data={[
          scholarlyArticleSchema({
            title: paper.title,
            venue: paper.venue,
            year: paper.year,
            doi: summary.doi,
            authors: paper.authors,
            authorName,
            path: `/en/research/${slug}`,
            licenseHref: license.href,
            pdfUrl,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Research", path: "/en/research" },
            { name: summary.en.headline, path: `/en/research/${slug}` },
          ]),
        ]}
      />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 md:pt-24">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="breadcrumb">
            <Link href="/en" className="font-medium text-pink-500 hover:text-pink-700">
              Home
            </Link>
            <span className="text-ink-300">/</span>
            <Link href="/en/research" className="font-medium text-pink-500 hover:text-pink-700">
              Research
            </Link>
          </nav>

          <p className="mt-8 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            Research summary
          </p>
          <h1 className="mt-2 text-h1-m md:text-h1 text-ink-900">{summary.en.headline}</h1>

          {/* Keep the source article visibly separate from our summary of it */}
          <div className="mt-8 rounded-lg border border-ink-300 bg-ink-0 p-6">
            <p className="text-[13px] leading-[1.4] text-ink-500">Summarising the article</p>
            <p className="mt-2 text-[17px] font-medium leading-[1.6] text-ink-900">{paper.title}</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
              {paper.authors.map(authorName).join(", ")} · {paper.venue} · {paper.year}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
              <a
                href={`https://doi.org/${summary.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
              >
                Open the original article (DOI)
              </a>
              {summary.pdf ? (
                <a
                  href={`/papers/${summary.pdf}`}
                  className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
                >
                  Download the PDF
                </a>
              ) : null}
            </div>
          </div>

          <PaperSummaryBody copy={summary.en} locale="en" />

          {/* CC requires naming the licence and giving credit — not just "free to read" */}
          <div className="mt-12 border-t border-ink-100 pt-6 text-[13px] leading-[1.6] text-ink-500">
            <p>
              The original article is published under the{" "}
              <a
                href={license.href}
                target="_blank"
                rel="license noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 hover:underline"
              >
                {license.label}
              </a>{" "}
              licence; copyright remains with the authors and the publishing journal.
              {summary.pdfSource ? (
                <>
                  {" "}
                  The centre keeps a copy here for readers&rsquo; convenience, downloaded from the{" "}
                  <a
                    href={summary.pdfSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 hover:underline"
                  >
                    journal&rsquo;s own source
                  </a>
                  .
                </>
              ) : null}
            </p>
            <p className="mt-2">
              The summary on this page is written by the centre and is not text from the original
              article. For academic citation, cite the original article through its DOI.
            </p>
          </div>
        </section>

        <section className="bg-ink-900">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <h2 className="text-h2-m md:text-h2 text-white">Research with us</h2>
            <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
              We welcome collaboration on research, programme evaluation, and joint publication.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/en/collaborate">Collaborate with us</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </div>
  );
}
