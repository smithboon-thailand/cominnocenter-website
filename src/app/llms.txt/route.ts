import { projects } from "@/data/projects";
import { projectCopyEn } from "@/data/projectCopyEn";
import { newsSorted } from "@/data/news";
import { mediaSorted } from "@/data/media";
import { publications } from "@/data/publications";
import { services } from "@/data/services";
import { leadership } from "@/data/leadership";
import { EMAIL, PHONE_SCHEMA } from "@/data/contact";
import { orgChannels } from "@/data/social";
import { SITE_URL } from "@/lib/schema";

/**
 * /llms.txt — แผนผังเว็บฉบับย่อสำหรับโมเดลภาษา
 *
 * **ข้อจำกัดที่ต้องรู้ก่อนคาดหวังผล:** llms.txt เป็น*ข้อเสนอ* ยังไม่ใช่มาตรฐาน
 * ที่ OpenAI / Anthropic / Google ประกาศรองรับอย่างเป็นทางการ ไฟล์นี้จึงมีค่า
 * เท่ากับ "ถ้าเครื่องมือไหนอ่าน ก็ได้ภาพรวมที่เราคัดมาให้แล้ว" ไม่ใช่ช่องทาง
 * ส่งเว็บเข้าระบบ AI (ซึ่งไม่มีอยู่จริง) ต้นทุนแทบเป็นศูนย์จึงคุ้มที่จะมี
 * แต่อย่านับเป็นตัวขับเคลื่อนหลัก — ตัวหลักคือถูกจัดทำดัชนีและถูกอ้างอิงจริง
 *
 * ทำไมสร้างจากข้อมูล ไม่เขียนมือ: ไฟล์ที่พิมพ์มือจะค้างทันทีที่เพิ่มโครงการ
 * แล้วจะกลายเป็นข้อมูลผิดที่เราเอาไปยื่นให้ AI อ่านเอง — แย่กว่าไม่มีเสียอีก
 * วิธีนี้ตัวเลขและรายการขยับตามข้อมูลจริงทุกครั้งที่ build เหมือน sitemap.ts
 *
 * เขียนเป็นภาษาอังกฤษเพราะเป็นเมทาดาทาสำหรับเครื่องอ่าน ไม่ใช่หน้าเว็บ
 * จึงไม่อยู่ใต้กติกา "หน้าไทยต้องไทยล้วน" — แต่กำกับชื่อทางการภาษาไทยไว้ด้วย
 */
export const dynamic = "force-static";

const th = (path: string) => `${SITE_URL}${path}`;

function section(heading: string, lines: string[]) {
  return lines.length ? `## ${heading}\n\n${lines.join("\n")}\n` : "";
}

function body() {
  const verifiedPubs = publications.filter((p) => p.verified !== "self").length;

  const corePages = [
    ["About", "/about", "The centre's mission, leadership and partners"],
    ["Expertise", "/expertise", `${services.length} services arranged across four stages of the communication process`],
    ["Impact", "/impact", `${projects.length} projects, filterable by UN Sustainable Development Goal`],
    ["Research", "/research", `${publications.length} academic publications, each labelled with how it was verified`],
    ["SDG", "/sdg", "How the centre's work maps onto the 17 Sustainable Development Goals"],
    ["News", "/news", `${newsSorted.length} announcements and activity reports`],
    ["Media coverage", "/media", `${mediaSorted.length} appearances of the centre in external media`],
    ["Collaborate", "/collaborate", "How organisations can commission or partner with the centre"],
  ].map(([name, path, note]) => `- [${name}](${th(path)}): ${note}`);

  const projectLines = projects.map((p) => {
    const outcome = projectCopyEn[p.slug]?.outcome ?? p.outcome;
    const short = outcome.length > 180 ? `${outcome.slice(0, 177).trimEnd()}...` : outcome;
    return `- [${p.titleEn}](${th(`/impact/${p.slug}`)}): ${short} (SDG ${p.sdg.join(", ")})`;
  });

  const peopleLines = leadership.map(
    (l) => `- [${l.nameEn}](${th("/about")}#${l.slug}): ${l.role}`,
  );

  return `# ComInnoCenter — Center of Excellence in Communication Innovation

> A research centre at the Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand. It turns communication research into tools that measurably improve quality of life, and ties every project to the UN Sustainable Development Goals.

Official Thai name: ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน

## How this site is organised

- Thai is the primary language and lives at the root (\`/about\`, \`/impact/...\`). English is a complete parallel tree under \`/en\` (\`/en/about\`, \`/en/impact/...\`). Every page exists in both languages and declares hreflang.
- The full URL list is at ${SITE_URL}/sitemap.xml
- Structured data (schema.org JSON-LD) is embedded on every page: ResearchOrganization, Person with ORCID/Scopus identifiers, ScholarlyArticle, and BreadcrumbList.

${section("Core pages", corePages)}
${section(`Projects (${projects.length})`, projectLines)}
${section("People", peopleLines)}## Citing the centre's research

The ${publications.length} publications listed at ${th("/research")} each carry an explicit verification level, shown to readers on the page: confirmed by DOI, by a publisher link, by an independent index, or reported by the author without an online record. ${verifiedPubs} of them have external evidence. Only those ${verifiedPubs} are asserted in structured data — entries that could not be verified online are shown to readers with their provenance stated, but are deliberately not declared to machines as established records.

When citing the centre's work, prefer the DOI where one is given rather than this website.

## Contact

- Email: ${EMAIL}
- Telephone: ${PHONE_SCHEMA}
- Location: Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand
${orgChannels.map((c) => `- ${c.label}: ${c.href}`).join("\n")}
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
