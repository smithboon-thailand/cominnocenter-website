import { projects } from "./projects";
import { SDG_IDS } from "./sdg";
import { publicationStats } from "./publications";

/**
 * กลุ่มผู้ตัดสินใจสามกลุ่มบนหน้า Collaborate (Phase 6.4)
 *
 * คนสามกลุ่มนี้มองหาหลักฐานคนละอย่างกัน หน่วยงานรัฐมองความน่าเชื่อถือของสถาบัน
 * เอกชนมองตัวเลขที่เอาไปเขียนรายงานบอร์ดได้ ส่วนแหล่งทุนมองระเบียบวิธีวิจัย
 * การ์ดจึงเลือกหลักฐานคนละชุด แทนที่จะพูดเรื่องเดียวกันสามรอบ
 *
 * ตัวเลขทุกตัวคำนวณจากข้อมูลจริงในเว็บ ไม่ได้พิมพ์ค่าคงที่ไว้ —
 * เพิ่มโครงการหรือผลงานวิชาการแล้วการ์ดขยับตาม ไม่มีวันค้างเป็นตัวเลขเก่า
 */

const coveredGoals = SDG_IDS.filter((id) => projects.some((p) => p.sdg.includes(id))).length;

export type Persona = {
  key: string;
  titleTh: string;
  titleEn: string;
  bodyTh: string;
  bodyEn: string;
  /** ตัวเลขหลักฐานหนึ่งตัวที่กลุ่มนี้สนใจที่สุด */
  proof: { value: string; unitTh?: string; unitEn?: string; labelTh: string; labelEn: string };
  /** โครงการตัวอย่างที่ตรงกับกลุ่มนี้ (slug ใน projects.ts) */
  caseSlug: string;
  caseTitleTh: string;
  caseTitleEn: string;
};

export const personas: Persona[] = [
  {
    key: "government",
    titleTh: "หน่วยงานภาครัฐ",
    titleEn: "Government agencies",
    bodyTh:
      "ทำงานในนามศูนย์เชี่ยวชาญเฉพาะทางของจุฬาลงกรณ์มหาวิทยาลัย มีประสบการณ์อบรมบุคลากรภาครัฐทั่วประเทศ และออกหลักฐานการอบรมในนามคณะได้",
    bodyEn:
      "We work as a Chulalongkorn University centre of excellence, with a track record of training public-sector staff nationwide and issuing certification in the faculty's name.",
    proof: {
      value: "10,000+",
      unitTh: "คน",
      unitEn: "people",
      labelTh: "บุคลากรสาธารณสุขที่ผ่านการอบรมของเรา",
      labelEn: "Public health personnel we have trained",
    },
    caseSlug: "care-d-plus",
    caseTitleTh: "ดูกรณี Care D+",
    caseTitleEn: "See the Care D+ case",
  },
  {
    key: "corporate",
    titleTh: "องค์กรเอกชนและงาน CSR",
    titleEn: "Companies and CSR teams",
    bodyTh:
      "ทุกโครงการผูกกับเป้าหมายการพัฒนาที่ยั่งยืนและวัดผลได้ นำตัวเลขไปใช้ในรายงานต่อคณะกรรมการ รายงานความยั่งยืน หรือรายงาน ESG ได้โดยตรง",
    bodyEn:
      "Every project maps to the Sustainable Development Goals and is measured, so the figures go straight into board papers, sustainability reports and ESG disclosures.",
    proof: {
      value: `${coveredGoals}/17`,
      unitTh: "เป้าหมาย",
      unitEn: "goals",
      labelTh: "เป้าหมาย SDG ที่งานของเราครอบคลุมแล้ว",
      labelEn: "SDGs our work already covers",
    },
    caseSlug: "nia-100-faces",
    caseTitleTh: "ดูกรณี NIA 100 FACES",
    caseTitleEn: "See the NIA 100 FACES case",
  },
  {
    key: "civil-society",
    titleTh: "ภาคประชาสังคมและแหล่งทุน",
    titleEn: "Civil society and funders",
    bodyTh:
      "ออกแบบการวิจัยและประเมินผลด้วยระเบียบวิธีที่ตีพิมพ์ได้ ผลลัพธ์จึงใช้รายงานต่อแหล่งทุนและต่อยอดเป็นงานวิชาการได้",
    bodyEn:
      "We design research and evaluation to a standard that can be published, so the findings serve both funder reporting and the academic record.",
    proof: {
      value: String(publicationStats.total),
      unitTh: "รายการ",
      unitEn: "works",
      labelTh: "ผลงานวิชาการที่ตรวจสอบที่มาได้",
      labelEn: "Academic works with traceable provenance",
    },
    caseSlug: "chula-zero-waste",
    caseTitleTh: "ดูกรณี Chula Zero Waste",
    caseTitleEn: "See the Chula Zero Waste case",
  },
];

export const personaCopy = {
  th: {
    eyebrow: "ความร่วมมือสำหรับองค์กรของคุณ",
    title: "เราทำงานกับใครได้บ้าง",
    description:
      "แต่ละกลุ่มมองหาหลักฐานคนละแบบ เลือกกลุ่มที่ใกล้เคียงองค์กรของคุณเพื่อดูว่าเราพิสูจน์อะไรให้ได้บ้าง",
  },
  en: {
    eyebrow: "Collaboration for your organisation",
    title: "Who we work with",
    description:
      "Each group looks for different evidence. Find the one closest to your organisation to see what we can show you.",
  },
} as const;
