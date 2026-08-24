/**
 * Structured data (JSON-LD ตาม schema.org) — ช่วยให้ Google เข้าใจว่าศูนย์ฯ คือองค์กรวิจัย
 * คณาจารย์คือนักวิจัยที่มี ORCID และผลงานตีพิมพ์คือ ScholarlyArticle
 *
 * กติกา: ใส่เฉพาะข้อมูลที่แสดงบนหน้านั้นจริงเท่านั้น (ตามแนวปฏิบัติ structured data ของ Google)
 * ห้ามใส่ข้อมูลที่ผู้ใช้มองไม่เห็นบนหน้า
 */
import type { Leader } from "@/data/leadership";
import type { PublicationEntry } from "@/data/publications";
import type { NewsPost } from "@/data/news";

export const SITE_URL = "https://www.cominnocenter.com";

const ORG_ID = `${SITE_URL}/#organization`;

/** ศูนย์ฯ ในฐานะหน่วยวิจัยภายใต้จุฬาลงกรณ์มหาวิทยาลัย */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "@id": ORG_ID,
    name: "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน",
    alternateName: [
      "Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability",
      "ComInnoCenter",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo-communication-innovation.png`,
    image: `${SITE_URL}/images/og/og-default.jpg`,
    email: "comminno@chula.ac.th",
    telephone: "+66-2-218-2262",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Chulalongkorn University",
      alternateName: "จุฬาลงกรณ์มหาวิทยาลัย",
      url: "https://www.chula.ac.th",
      department: {
        "@type": "Organization",
        name: "Faculty of Communication Arts",
        alternateName: "คณะนิเทศศาสตร์",
        url: "https://www.commarts.chula.ac.th",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    sameAs: [
      "https://www.instagram.com/cominnocenter/",
      "https://www.facebook.com/cominnocenter",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "ComInnoCenter",
    inLanguage: ["th", "en"],
    publisher: { "@id": ORG_ID },
  };
}

/** ผู้บริหาร/นักวิจัย — sameAs คือกุญแจให้ Google เชื่อมโปรไฟล์ ORCID/Scopus/Scholar เข้าด้วยกัน */
export function personSchema(leader: Leader, locale: "th" | "en" = "th") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#${leader.slug}`,
    name: locale === "th" ? leader.name : leader.nameEn,
    alternateName: locale === "th" ? leader.nameEn : leader.name,
    jobTitle: leader.role,
    ...(leader.email ? { email: leader.email } : {}),
    image: `${SITE_URL}${leader.image}`,
    knowsAbout: leader.focus.split(",").map((s) => s.trim()).filter(Boolean),
    affiliation: { "@id": ORG_ID },
    worksFor: { "@id": ORG_ID },
    sameAs: leader.links.map((l) => l.href),
  };
}

const SCHEMA_TYPE_BY_PUBLICATION: Record<PublicationEntry["type"], string> = {
  book: "Book",
  "journal-article": "ScholarlyArticle",
  "book-chapter": "Chapter",
  "conference-paper": "ScholarlyArticle",
};

/**
 * รายการผลงานตีพิมพ์บนหน้า /research
 *
 * ส่งเฉพาะรายการที่มีหลักฐานภายนอกยืนยัน (verified !== "self") — ไม่ประกาศต่อ Google
 * ในสิ่งที่พิสูจน์ไม่ได้ รายการที่ผู้เขียนแจ้งเองยังแสดงบนหน้าเว็บตามปกติ
 * พร้อมกำกับที่มาให้ผู้อ่านเห็น
 */
export function publicationListSchema(
  items: PublicationEntry[],
  authorName: (slug: string) => string,
  locale: "th" | "en" = "th"
) {
  const evidenced = items.filter((p) => p.verified !== "self");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "th" ? "ผลงานตีพิมพ์ของศูนย์ฯ" : "Publications from the center",
    numberOfItems: evidenced.length,
    itemListElement: evidenced.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": SCHEMA_TYPE_BY_PUBLICATION[p.type],
        name: p.title,
        datePublished: String(p.year),
        ...(p.venue ? { isPartOf: { "@type": "Periodical", name: p.venue } } : {}),
        ...(p.doi
          ? { identifier: `https://doi.org/${p.doi}`, url: `https://doi.org/${p.doi}` }
          : p.indexUrl
            ? { url: p.indexUrl }
            : {}),
        author: p.authors.map((slug) => ({
          "@type": "Person",
          name: authorName(slug),
          "@id": `${SITE_URL}/about#${slug}`,
        })),
      },
    })),
  };
}

/** โพสต์ข่าวที่เก็บจากเว็บเดิม */
export function newsArticleSchema(post: NewsPost, locale: "th" | "en", coverUrl: string) {
  const path = locale === "th" ? `/news/${post.slug}` : `/en/news/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "th" ? post.titleTh : post.titleEn,
    datePublished: post.date,
    inLanguage: locale,
    image: `${SITE_URL}${coverUrl}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
