import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import PaperSummaryBody, { plainText } from "@/components/research/PaperSummaryBody";
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

const authorName = (slug: string) => leadership.find((l) => l.slug === slug)?.name ?? slug;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryBySlug(slug);
  if (!summary) return { title: "ไม่พบบทสรุป" };
  return {
    title: plainText(summary.th.headline),
    description: plainText(summary.th.question).slice(0, 160),
    alternates: {
      canonical: `/research/${slug}`,
      languages: {
        th: `/research/${slug}`,
        en: `/en/research/${slug}`,
        "x-default": `/research/${slug}`,
      },
    },
    openGraph: {
      title: plainText(summary.th.headline),
      description: plainText(summary.th.question).slice(0, 200),
      // openGraph ของหน้าลูกทับของ layout ทั้งก้อน ต้องใส่ images เองทุกครั้ง
      images: ["/images/og/og-default.jpg"],
    },
  };
}

export default async function PaperSummaryPage({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryBySlug(slug);
  if (!summary) notFound();
  const paper = publicationForSummary(summary);

  // ไม่มี license แปลว่าวารสารสงวนลิขสิทธิ์ ไม่ใช่ว่ายังไม่ได้ตรวจ — จึงต้องไม่อ้าง CC
  const license = summary.license ? CC_LICENSES[summary.license] : null;
  // วารสารไทยหลายเล่มไม่จด DOI ให้ลิงก์ไปหน้าบทความของวารสารแทน
  const sourceHref = summary.doi ? `https://doi.org/${summary.doi}` : summary.indexUrl;
  // ชี้ไปคลังของสำนักพิมพ์ ไม่ใช่ไฟล์ในเว็บเรา — ผู้อ่านจึงได้ฉบับปัจจุบันเสมอ
  const pdfUrl = summary.pdfUrl;

  return (
    <div className="min-h-screen">
      <Header active="research" switchHref={`/en/research/${slug}`} />
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
            path: `/research/${slug}`,
            licenseHref: license?.href,
            pdfUrl,
          }),
          breadcrumbSchema([
            { name: "หน้าแรก", path: "/" },
            { name: "งานวิจัย", path: "/research" },
            { name: plainText(summary.th.headline), path: `/research/${slug}` },
          ]),
        ]}
      />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 md:pt-24">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="breadcrumb">
            <Link href="/" className="font-medium text-pink-500 hover:text-pink-700">
              หน้าแรก
            </Link>
            <span className="text-ink-300">/</span>
            <Link href="/research" className="font-medium text-pink-500 hover:text-pink-700">
              งานวิจัย
            </Link>
          </nav>

          <p className="mt-8 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            บทสรุปงานวิจัย
          </p>
          <h1 className="mt-2 text-h1-m md:text-h1 text-ink-900">{plainText(summary.th.headline)}</h1>

          {/* แยกให้เห็นชัดว่าอะไรคือ "งานต้นฉบับ" อะไรคือ "คำสรุปของเรา" */}
          <div className="mt-8 rounded-lg border border-ink-300 bg-ink-0 p-6">
            <p className="text-[13px] leading-[1.4] text-ink-500">สรุปจากบทความ</p>
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
                {summary.doi ? "เปิดบทความต้นฉบับ (DOI)" : "เปิดบทความต้นฉบับที่วารสาร"}
                <span className="sr-only"> (เปิดในแท็บใหม่)</span>
              </a>
              {summary.pdfUrl ? (
                <a
                  href={summary.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
                >
                  เปิด PDF ที่คลังของวารสาร
                  {/* บอกผู้ใช้เครื่องอ่านหน้าจอว่าลิงก์นี้เปิดแท็บใหม่ ตามแนวปฏิบัติ WCAG */}
                  <span className="sr-only"> (เปิดในแท็บใหม่)</span>
                </a>
              ) : null}
            </div>
          </div>

          <PaperSummaryBody copy={summary.th} locale="th" />

          {/* มีเฉพาะงานที่ยืนยันผ่าน DOI — ไม่มีข้อมูลทะเบียนก็ไม่สร้างการอ้างอิงให้เดา */}
          {paper.citation ? (
            <CitationTool publication={paper} citation={paper.citation} locale="th" />
          ) : null}

          {/* CC บังคับให้ระบุสัญญาอนุญาตและให้เครดิต ไม่ใช่แค่บอกว่า "เปิดฟรี"
              ส่วนบทความที่วารสารสงวนลิขสิทธิ์ ต้องไม่เขียนให้เข้าใจผิดว่าเป็น CC */}
          <div className="mt-12 border-t border-ink-100 pt-6 text-[13px] leading-[1.6] text-ink-500">
            <p>
              {license ? (
                <>
                  บทความต้นฉบับเผยแพร่ภายใต้สัญญาอนุญาต{" "}
                  <a
                    href={license.href}
                    target="_blank"
                    rel="license noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 hover:underline"
                  >
                    {license.label}
                  </a>{" "}
                  ลิขสิทธิ์เป็นของผู้เขียนและวารสารต้นทาง{" "}
                </>
              ) : (
                <>ลิขสิทธิ์ของบทความต้นฉบับเป็นของผู้เขียนและวารสารต้นทาง </>
              )}
              ศูนย์ฯ ไม่ได้เก็บสำเนาไฟล์ไว้บนเว็บนี้ ลิงก์ทั้งหมดพาไปยังคลังของวารสารโดยตรง
              ผู้อ่านจึงได้ฉบับปัจจุบันเสมอแม้วารสารจะออกใบแก้ไขภายหลัง
            </p>
            <p className="mt-2">
              ส่วน &ldquo;บทสรุป&rdquo; บนหน้านี้เป็นงานเขียนของศูนย์ฯ เอง
              ไม่ใช่ข้อความจากบทความต้นฉบับ หากจะอ้างอิงทางวิชาการ ให้อ้างบทความต้นฉบับผ่าน DOI
            </p>
          </div>
        </section>

        <section className="bg-ink-900">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <h2 className="text-h2-m md:text-h2 text-white">อยากทำวิจัยร่วมกับเรา</h2>
            <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
              เราเปิดรับความร่วมมือด้านงานวิจัย การประเมินผลโครงการ และการตีพิมพ์ร่วม
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/collaborate">ร่วมงานกับเรา</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
