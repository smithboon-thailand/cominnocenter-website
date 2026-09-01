import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import PaperSummaryBody from "@/components/research/PaperSummaryBody";
import CitationTool from "@/components/research/CitationTool";
import { breadcrumbSchema, scholarlyArticleSchema } from "@/lib/schema";
import {
  paperSummaries,
  paperSummaryBySlug,
  publicationForSummary,
  CC_LICENSES,
} from "@/data/paperSummaries";
import { leadership } from "@/data/leadership";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return paperSummaries.map((s) => ({ slug: s.slug }));
}

const authorName = (slug: string) => leadership.find((l) => l.slug === slug)?.nameEn ?? slug;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryBySlug(slug);
  if (!summary) return { title: "Summary not found" };
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
  if (!summary) notFound();
  const paper = publicationForSummary(summary);

  // No licence means the journal reserves copyright, not that it is unchecked —
  // so the page must not claim a Creative Commons licence it does not have
  const license = summary.license ? CC_LICENSES[summary.license] : null;
  // Many Thai journals register no DOI; link to the journal's article page instead
  const sourceHref = summary.doi ? `https://doi.org/${summary.doi}` : summary.indexUrl;
  // Points at the publisher's own repository, not a copy we serve, so readers
  // always get the current version even after an erratum
  const pdfUrl = summary.pdfUrl;

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
            indexUrl: summary.indexUrl,
            inLanguage: summary.articleLanguage,
            authors: paper.authors,
            authorName,
            path: `/en/research/${slug}`,
            licenseHref: license?.href,
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
                href={sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
              >
                {summary.doi
                  ? "Open the original article (DOI)"
                  : "Open the original article at the journal"}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {summary.pdfUrl ? (
                <a
                  href={summary.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
                >
                  Open the PDF at the journal
                  {/* Tell screen-reader users the link opens a new tab, per WCAG practice */}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>

          <PaperSummaryBody copy={summary.en} locale="en" />

          {/* มีเฉพาะงานที่ยืนยันผ่าน DOI — ไม่มีข้อมูลทะเบียนก็ไม่สร้างการอ้างอิงให้เดา */}
          {paper.citation ? (
            <CitationTool publication={paper} citation={paper.citation} locale="en" />
          ) : null}

          {/* CC requires naming the licence and giving credit — not just "free to read".
              Where the journal reserves copyright, say so rather than implying CC. */}
          <div className="mt-12 border-t border-ink-100 pt-6 text-[13px] leading-[1.6] text-ink-500">
            <p>
              {license ? (
                <>
                  The original article is published under the{" "}
                  <a
                    href={license.href}
                    target="_blank"
                    rel="license noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 hover:underline"
                  >
                    {license.label}
                  </a>{" "}
                  licence; copyright remains with the authors and the publishing journal.{" "}
                </>
              ) : (
                <>Copyright in the original article rests with the authors and the publishing journal. </>
              )}
              The centre does not host a copy of the file; every link goes to the journal&rsquo;s own
              repository, so readers always get the current version even if an erratum is issued later.
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
