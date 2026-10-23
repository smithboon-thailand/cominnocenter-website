import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import ResponsiveArtwork from "@/components/ui/ResponsiveArtwork";
import InsightBody from "@/components/insights/InsightBody";
import { insightsSorted, type InsightPost } from "@/data/insights";
import { paperSummaryBySlug } from "@/data/paperSummaries";
import { getProjectBySlug } from "@/data/projects";
import { projectTitle } from "@/lib/projectCopy";
import { breadcrumbSchema, insightArticleSchema } from "@/lib/schema";
import type { FullLocale } from "@/lib/locale";

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string, locale: FullLocale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return locale === "th" ? `${d} ${THAI_MONTHS[m - 1]} ${y + 543}` : `${d} ${EN_MONTHS[m - 1]} ${y}`;
}

/**
 * รายการอ้างอิงที่แนะนำ — APA 7 สำหรับบทความบนเว็บไซต์ (ผู้เขียน · วันที่ · ชื่อเรื่อง · ผู้เผยแพร่ · URL)
 * ฉบับไทยใช้ชื่อเต็มและปี พ.ศ. ตามธรรมเนียมการอ้างอิงภาษาไทย
 */
function suggestedCitation(post: InsightPost, locale: FullLocale): string {
  const [y, m, d] = post.date.split("-").map(Number);
  const url = `https://www.cominnocenter.com${locale === "th" ? "" : "/en"}/insights/${post.slug}`;
  const t = T[locale];
  return locale === "th"
    ? `${post.author.th}. (${y + 543}, ${d} ${THAI_MONTHS[m - 1]}). ${post.th.title}. ${t.publisher}. ${url}`
    : `${post.author.apa} (${y}, ${EN_MONTHS[m - 1]} ${d}). ${post.en.title}. ${t.publisher}. ${url}`;
}

const T = {
  th: {
    base: "/insights",
    kicker: "บทความ",
    title: "บทความ",
    lede: "ข้อค้นพบจากงานวิจัยของศูนย์ฯ เล่าให้คนทำงานสื่อสารนำไปใช้ได้จริง ตัวเลขทุกตัวมาจากงานที่ตีพิมพ์และมีบทสรุปให้ตามอ่านต่อ",
    read: "อ่านบทความ",
    home: "← กลับหน้าหลัก",
    all: "บทความทั้งหมด",
    evidence: "งานวิจัยที่บทความนี้อ้างถึง",
    by: "โดย",
    about: "เกี่ยวกับบทความนี้",
    opinion: "บทความนี้เป็นความคิดเห็นของผู้เขียน ไม่ได้สะท้อนความคิดเห็นของศูนย์ฯ",
    aiNote: "บทความได้รับการปรับปรุงภาษาและแปลภาษาโดยใช้ AI ช่วย และผู้เขียนได้ตรวจทานแล้ว",
    citeTitle: "หากต้องการอ้างอิงบทความนี้",
    publisher: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    references: "อ้างอิง",
    project: "โครงการที่เกี่ยวข้อง",
    collaborate: "ร่วมงานกับเรา",
    collaborateHref: "/collaborate",
    research: (slug: string) => `/research/${slug}`,
    impact: (slug: string) => `/impact/${slug}`,
  },
  en: {
    base: "/en/insights",
    kicker: "Insights",
    title: "Insights",
    lede: "What our research has found, written for people who do communication work. Every figure comes from a published study with a summary you can follow up.",
    read: "Read the article",
    home: "← Back to home",
    all: "All insights",
    evidence: "Research cited in this article",
    by: "By",
    about: "About this article",
    opinion: "This article reflects the views of the author and does not necessarily reflect those of the Center.",
    aiNote: "The language of this article was refined and translated with the help of AI, and the author has reviewed it.",
    citeTitle: "To cite this article",
    publisher: "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
    references: "References",
    project: "Related project",
    collaborate: "Collaborate with us",
    collaborateHref: "/en/collaborate",
    research: (slug: string) => `/en/research/${slug}`,
    impact: (slug: string) => `/en/impact/${slug}`,
  },
} as const;

export function InsightListPage({ locale }: { locale: FullLocale }) {
  const t = T[locale];
  return (
    <div className="min-h-screen">
      <Header active="insights" locale={locale} />
      <main>
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
          <p className="text-sm font-medium text-pink-500 mb-3">{t.kicker}</p>
          <h1 className="text-h1-m md:text-h1 text-ink-900">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600 leading-relaxed">{t.lede}</p>
        </section>
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insightsSorted.map((post) => {
              const c = post[locale];
              return (
                <Link
                  key={post.slug}
                  href={`${t.base}/${post.slug}`}
                  className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  {post.cover && (
                    <ResponsiveArtwork
                      base={post.cover}
                      alt={c.coverAlt ?? ""}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      aspect="aspect-[16/9]"
                      height={900}
                    />
                  )}
                  <div className="p-6">
                    <p className="text-xs font-medium text-neutral-500 mb-2">{formatDate(post.date, locale)}</p>
                    <h2 className="text-h3-m md:text-h3 text-ink-900 group-hover:text-pink-500 transition-colors">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-neutral-600 leading-relaxed">{c.dek}</p>
                    <p className="mt-4 text-sm font-medium text-pink-500">{t.read} →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

export function InsightArticlePage({ post, locale }: { post: InsightPost; locale: FullLocale }) {
  const t = T[locale];
  const c = post[locale];
  const evidence = (post.evidence ?? []).map((slug) => {
    const s = paperSummaryBySlug(slug);
    if (!s) throw new Error(`insights: บทความ "${post.slug}" อ้างบทสรุป "${slug}" ที่ไม่มีอยู่`);
    return { slug, headline: s[locale].headline };
  });
  const projects = (post.relatedProjects ?? []).map((slug) => {
    const p = getProjectBySlug(slug);
    if (!p) throw new Error(`insights: บทความ "${post.slug}" อ้างโครงการ "${slug}" ที่ไม่มีอยู่`);
    return { slug, title: projectTitle(p, locale) };
  });
  return (
    <div className="min-h-screen">
      <Header active="insights" locale={locale} />
      <JsonLd data={insightArticleSchema(post, locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "th" ? "หน้าแรก" : "Home", path: locale === "th" ? "/" : "/en" },
          { name: t.title, path: t.base },
          { name: c.title, path: `${t.base}/${post.slug}` },
        ])}
      />
      <main>
        <article>
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="breadcrumb">
              <Link href={locale === "th" ? "/" : "/en"} className="font-medium text-pink-500 hover:text-pink-600">
                {t.home}
              </Link>
              <span className="text-neutral-300" aria-hidden>
                |
              </span>
              <Link href={t.base} className="font-medium text-neutral-600 hover:text-pink-500">
                {t.all}
              </Link>
            </nav>
            <div className="mt-6 max-w-3xl">
              <p className="text-sm font-medium text-neutral-500 mb-3">
                {t.by} {post.author[locale]} · {formatDate(post.date, locale)}
              </p>
              <h1 className="text-h1-m md:text-h1 text-ink-900">{c.title}</h1>
              <p className="mt-4 text-lg text-neutral-600 leading-relaxed">{c.dek}</p>
            </div>
          </section>

          {post.cover && (
            <section className="max-w-5xl mx-auto px-6 pb-10">
              <ResponsiveArtwork
                base={post.cover}
                alt={c.coverAlt ?? ""}
                sizes="(max-width: 1024px) 100vw, 1024px"
                aspect="aspect-[16/9]"
                height={900}
                className="rounded-2xl"
                priority
              />
              {c.coverCaption && <p className="mt-2 text-xs text-ink-500">{c.coverCaption}</p>}
            </section>
          )}

          <section className="max-w-3xl mx-auto px-6 pb-12">
            <InsightBody blocks={c.body} locale={locale} />

            {(evidence.length > 0 || projects.length > 0) && (
            <div className="mt-12 p-6 rounded-2xl border border-neutral-200">
              {evidence.length > 0 && <h2 className="text-h3-m md:text-h3 text-ink-900 mb-4">{t.evidence}</h2>}
              <ul className="space-y-3">
                {evidence.map((e) => (
                  <li key={e.slug}>
                    <Link href={t.research(e.slug)} className="text-blue-700 hover:text-pink-500 transition-colors">
                      {e.headline} →
                    </Link>
                  </li>
                ))}
              </ul>
              {projects.length > 0 && (
                <>
                  <p className="mt-6 text-sm text-neutral-500 mb-2">{t.project}</p>
                  {projects.map((p) => (
                    <Link
                      key={p.slug}
                      href={t.impact(p.slug)}
                      className="block font-medium text-blue-700 hover:text-pink-500 transition-colors"
                    >
                      {p.title} →
                    </Link>
                  ))}
                </>
              )}
            </div>
            )}

            <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-100 p-6 text-sm leading-relaxed text-neutral-700">
              <h2 className="text-h3-m md:text-h3 text-ink-900 mb-3">{t.about}</h2>
              <p>{t.opinion}</p>
              <p className="mt-2">{t.aiNote}</p>
              <p className="mt-4 font-medium text-ink-900">{t.citeTitle}</p>
              <p className="mt-1 break-words select-all">{suggestedCitation(post, locale)}</p>
            </div>

            {c.references && c.references.length > 0 && (
              <div className="mt-12">
                <h2 className="text-h3-m md:text-h3 text-ink-900 mb-4">{c.referencesTitle ?? t.references}</h2>
                <ol className="list-decimal pl-6 space-y-3 text-sm text-neutral-700 leading-relaxed">
                  {c.references.map((r) => (
                    <li key={r.url}>
                      {r.text}{" "}
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-700 hover:text-pink-500"
                      >
                        {r.url}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-8">
              <Link
                href={t.collaborateHref}
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-700 text-white text-sm font-medium hover:bg-pink-900 transition-colors"
              >
                {t.collaborate}
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
