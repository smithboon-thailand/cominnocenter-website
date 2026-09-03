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
import { EMAIL, PHONE_SCHEMA } from "@/data/contact";
import { orgChannels } from "@/data/social";

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
    email: EMAIL,
    telephone: PHONE_SCHEMA,
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
    /**
     * ช่องทางของศูนย์ฯ เอง อ่านจาก data/social.ts ที่ Footer ใช้ชุดเดียวกัน
     * (เดิมพิมพ์ซ้ำไว้ที่นี่แล้วหลุดตรงกัน — Facebook ที่เคยส่งให้ Google
     * เป็นเพจที่ไม่มีอยู่จริง ดูรายละเอียดในไฟล์นั้น)
     *
     * ไม่ใส่หน้าคณะ/มหาวิทยาลัยตรงนี้ เพราะ sameAs หมายถึง "องค์กรเดียวกัน
     * ที่อยู่บนแพลตฟอร์มอื่น" ไม่ใช่องค์กรที่เกี่ยวข้อง — ความสัมพันธ์นั้น
     * ประกาศไว้แล้วอย่างถูกต้องผ่าน parentOrganization ด้านบน
     */
    sameAs: orgChannels.map((c) => c.href),
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

/**
 * บทความวิชาการหนึ่งชิ้นบนหน้าบทสรุป /research/[slug]
 *
 * ต่างจาก `publicationListSchema` ตรงที่นั่นบอก Google ว่า "ศูนย์ฯ มีผลงานอะไรบ้าง"
 * ส่วนอันนี้บอกว่า "หน้านี้พูดถึงงานชิ้นนี้ชิ้นเดียว" ซึ่งจำเป็นเมื่อมีหน้าเฉพาะของมัน
 *
 * **`url` ชี้ไป DOI ไม่ใช่หน้าเรา** โดยตั้งใจ — ที่อยู่ทางการของบทความคือ DOI
 * เราเป็นแค่ผู้สรุป การประกาศว่าหน้าเราคือตัวบทความจะเป็นการอ้างสิทธิ์ที่ไม่จริง
 * ความสัมพันธ์ที่ถูกต้องประกาศผ่าน `mainEntityOfPage` แทน
 *
 * ใส่ `license` และ `encoding` เฉพาะเมื่อเราเก็บไฟล์ไว้จริง เพื่อให้เครื่องอ่านรู้ว่า
 * สำเนาที่เราให้ดาวน์โหลดอยู่ภายใต้สัญญาอนุญาตใด
 */
export function scholarlyArticleSchema(args: {
  title: string;
  venue: string;
  year: number;
  /** มีเฉพาะงานที่สำนักพิมพ์จด DOI ไว้ วารสารไทยหลายเล่มไม่จด */
  doi?: string;
  /** URL หน้าบทความที่วารสาร — ใช้เป็นที่อยู่ถาวรแทน DOI เมื่อไม่มี DOI */
  indexUrl?: string;
  /**
   * ภาษาที่ตัวบทความเขียน ไม่ใช่ภาษาของหน้าเว็บที่สรุป
   * (เพิ่ม "ru" เมื่อ 3 ก.ย. 2569 — ผลงานร่วมกับมหาวิทยาลัยรัฐเซนต์ปีเตอร์สเบิร์ก
   *  ตีพิมพ์เป็นภาษารัสเซีย ดูเหตุผลเต็มที่ `articleLanguage` ใน paperSummaries.ts)
   */
  inLanguage: "th" | "en" | "ru";
  authors: string[];
  authorName: (slug: string) => string;
  path: string;
  /** ใส่เฉพาะบทความที่มีสัญญาอนุญาต CC จริง — ไม่มีก็ไม่ต้องอ้างว่ามี */
  licenseHref?: string;
  pdfUrl?: string;
}) {
  // ที่อยู่ถาวรของ "ตัวงาน" — ไม่ใช่หน้าสรุปของเรา ซึ่งไปอยู่ใน mainEntityOfPage
  const canonical = args.doi ? `https://doi.org/${args.doi}` : args.indexUrl;
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: args.title,
    headline: args.title,
    datePublished: String(args.year),
    inLanguage: args.inLanguage,
    ...(args.venue ? { isPartOf: { "@type": "Periodical", name: args.venue } } : {}),
    ...(canonical ? { identifier: canonical, url: canonical, sameAs: canonical } : {}),
    mainEntityOfPage: `${SITE_URL}${args.path}`,
    ...(args.licenseHref ? { license: args.licenseHref } : {}),
    author: args.authors.map((slug) => ({
      "@type": "Person",
      name: args.authorName(slug),
      "@id": `${SITE_URL}/about#${slug}`,
    })),
    ...(args.pdfUrl
      ? {
          encoding: {
            "@type": "MediaObject",
            contentUrl: args.pdfUrl,
            encodingFormat: "application/pdf",
          },
        }
      : {}),
  };
}

/**
 * เส้นทางนำทางของหน้าย่อย — ช่วยให้ผลค้นหาแสดงลำดับชั้นแทน URL ดิบ
 * ส่ง path ที่ขึ้นต้นด้วย / เท่านั้น (ต่อ SITE_URL ให้เอง)
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
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
