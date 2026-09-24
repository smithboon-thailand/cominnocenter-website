import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import PaperSummaryBody, { plainText } from "@/components/research/PaperSummaryBody";
import CitationTool from "@/components/research/CitationTool";
import ResponsiveArtwork from "@/components/ui/ResponsiveArtwork";
import SectionIcon from "@/components/ui/SectionIcon";
import { breadcrumbSchema, scholarlyArticleSchema } from "@/lib/schema";
import { truncate } from "@/lib/text";
import {
  paperSummariesZh,
  paperSummaryZhBySlug,
  publicationForSummary,
  CC_LICENSES,
} from "@/data/paperSummaries";
import { personName } from "@/lib/people";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/**
 * หน้าบทสรุปงานวิจัยภาษาจีน — สร้างเฉพาะบทสรุปที่มี field `zh` แล้ว
 * (ทยอยแปลเป็นชุด ดูหมายเหตุที่ `zh` ใน paperSummaries.ts) รายการอื่นไม่มีหน้านี้
 * และไม่มีลิงก์มาถึง: sitemap · hreflang · ResearchExplorer · ดัชนีค้นหา อ่านจาก field
 * เดียวกันจึงเปิดพร้อมกันเสมอ
 *
 * **ไม่มีวิดีโอสรุป** — คลิปมีเสียงพากย์ไทย/อังกฤษเท่านั้น (`paperVideos.ts` ไม่มีแทร็กจีน)
 * หน้าจีนจึงแสดงภาพประกอบเสมอ และไม่ประกาศ VideoObject
 */
export function generateStaticParams() {
  return paperSummariesZh.map((s) => ({ slug: s.slug }));
}

const authorName = (slug: string) => personName(slug, "zh");

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryZhBySlug(slug);
  if (!summary) return { title: "找不到该摘要" };
  return {
    title: plainText(summary.zh.headline),
    description: truncate(plainText(summary.zh.question), 160, "zh"),
    alternates: {
      canonical: `/zh/research/${slug}`,
      languages: {
        th: `/research/${slug}`,
        en: `/en/research/${slug}`,
        "zh-Hans": `/zh/research/${slug}`,
        "x-default": `/research/${slug}`,
      },
    },
    openGraph: {
      title: plainText(summary.zh.headline),
      description: truncate(plainText(summary.zh.question), 200, "zh"),
      // openGraph ของหน้าลูกทับของ layout ทั้งก้อน — ต้องใส่ images เองทุกครั้ง ใช้ภาพประจำเรื่อง
      images: [`/images/research/summaries/${slug}.webp`],
    },
  };
}

/** คำนำหน้าชื่อเรื่อง — ต้องบอกชนิดของงานตั้งแต่บรรทัดแรก (แผนวิจัยไม่ใช่ผลวิจัย) */
const KICKER_ZH = {
  empirical: "研究摘要",
  protocol: "研究方案摘要",
  argument: "理论文章摘要",
} as const;

export default async function PaperSummaryPageZh({ params }: Props) {
  const { slug } = await params;
  const summary = paperSummaryZhBySlug(slug);
  if (!summary) notFound();
  const paper = publicationForSummary(summary);

  // ไม่มี license แปลว่าวารสารสงวนลิขสิทธิ์ ไม่ใช่ว่ายังไม่ได้ตรวจ — จึงต้องไม่อ้าง CC
  const license = summary.license ? CC_LICENSES[summary.license] : null;
  // วารสารไทยหลายเล่มไม่จด DOI ให้ลิงก์ไปหน้าบทความของวารสารแทน
  const sourceHref = summary.doi ? `https://doi.org/${summary.doi}` : summary.indexUrl;
  const pdfUrl = summary.pdfUrl;

  return (
    <div className="min-h-screen">
      <Header
        locale="zh"
        active="research"
        switchHrefs={{ th: `/research/${slug}`, en: `/en/research/${slug}` }}
      />
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
            path: `/zh/research/${slug}`,
            licenseHref: license?.href,
            pdfUrl,
          }),
          breadcrumbSchema([
            { name: "首页", path: "/zh" },
            { name: "研究成果", path: "/zh/research" },
            { name: plainText(summary.zh.headline), path: `/zh/research/${slug}` },
          ]),
        ]}
      />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 md:pt-24">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="面包屑导航">
            <Link href="/zh" className="font-medium text-pink-500 hover:text-pink-700">
              首页
            </Link>
            <span className="text-ink-300">/</span>
            <Link href="/zh/research" className="font-medium text-pink-500 hover:text-pink-700">
              研究成果
            </Link>
          </nav>

          <p className="mt-8 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            {KICKER_ZH[summary.kind ?? "empirical"]}
          </p>
          <h1 className="mt-2 text-h1-m md:text-h1 text-ink-900">{plainText(summary.zh.headline)}</h1>

          {/* ภาพเป็นอุปมาของ "รูปร่างข้อค้นพบ" ไม่ใช่ภาพประกอบตามเนื้อเรื่อง — ดู illustrationAltTh ใน paperSummaries.ts */}
          <ResponsiveArtwork
            base={`/images/research/summaries/${slug}`}
            alt={summary.illustrationAltZh}
            // คอลัมน์เนื้อหา max-w-3xl (768) หัก px-6 สองข้าง = 720px
            sizes="(min-width: 768px) 720px, 100vw"
            aspect="aspect-[16/9]"
            height={900}
            className="mt-8"
            priority
          />

          {/* แยกบทความต้นฉบับออกจากบทสรุปของเราให้เห็นชัด — ชื่อบทความและผู้เขียนคงภาษาต้นฉบับ */}
          <div className="mt-8 rounded-lg border border-ink-300 bg-ink-0 p-6">
            <p className="text-[13px] leading-[1.4] text-ink-500">本页摘要的原文</p>
            <p className="mt-2 text-[17px] font-medium leading-[1.6] text-ink-900" lang="en">
              {paper.title}
            </p>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-700" lang="en">
              {paper.authors.map(authorName).join(", ")} · {paper.venue} · {paper.year}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
              <a
                href={sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
              >
                {summary.doi ? "打开原文（DOI）" : "在期刊网站打开原文"}
                <span className="sr-only">（在新标签页中打开）</span>
              </a>
              {summary.pdfUrl ? (
                <a
                  href={summary.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink-500 hover:text-pink-700 hover:underline"
                >
                  在期刊网站打开 PDF
                  <span className="sr-only">（在新标签页中打开）</span>
                </a>
              ) : null}
            </div>
          </div>

          <PaperSummaryBody copy={summary.zh} locale="zh" kind={summary.kind} />

          {/* มีเฉพาะงานที่ทะเบียนให้ข้อมูลบรรณานุกรมครบ — ไม่สร้างการอ้างอิงให้เดา */}
          {paper.citation ? (
            <CitationTool publication={paper} citation={paper.citation} locale="zh" />
          ) : null}

          {/* CC บังคับให้ระบุสัญญาอนุญาตและให้เครดิต · วารสารที่สงวนลิขสิทธิ์ต้องไม่เขียนให้เข้าใจผิดว่าเป็น CC */}
          <div className="mt-12 border-t border-ink-100 pt-6 text-[13px] leading-[1.6] text-ink-500">
            <p>
              {license ? (
                <>
                  原文以{" "}
                  <a
                    href={license.href}
                    target="_blank"
                    rel="license noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 hover:underline"
                  >
                    {license.label}
                  </a>{" "}
                  许可协议发表；版权归作者及出版期刊所有。
                </>
              ) : (
                <>原文版权归作者及出版期刊所有。</>
              )}
              本中心不在本网站保存文件副本；所有链接均直接指向期刊自身的存储库，因此即使日后发布勘误，读者看到的也始终是最新版本。
            </p>
            <p className="mt-2">
              本页的“摘要”由本中心撰写，并非原文文本。学术引用请通过 DOI 引用原文。
            </p>
          </div>
        </section>

        <section className="bg-ink-900">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <SectionIcon role="invite" onDark className="mx-auto mb-4 h-9 w-9" />
            <h2 className="text-h2-m md:text-h2 text-white">与我们一起做研究</h2>
            <p className="mx-auto mt-3 max-w-prose text-[17px] leading-[1.7] text-ink-300">
              我们欢迎在研究、项目评估与联合发表方面开展合作。
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/zh/collaborate">与我们合作</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="zh" />
    </div>
  );
}
