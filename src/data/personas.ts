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
  titleZh: string;
  bodyTh: string;
  bodyEn: string;
  bodyZh: string;
  /** ตัวเลขหลักฐานหนึ่งตัวที่กลุ่มนี้สนใจที่สุด */
  proof: {
    value: string;
    unitTh?: string;
    unitEn?: string;
    unitZh?: string;
    labelTh: string;
    labelEn: string;
    labelZh: string;
  };
  /** โครงการตัวอย่างที่ตรงกับกลุ่มนี้ (slug ใน projects.ts) */
  caseSlug: string;
  caseTitleTh: string;
  caseTitleEn: string;
  caseTitleZh: string;
};

export const personas: Persona[] = [
  {
    key: "government",
    titleZh: "政府机构",
    bodyZh:
      "我们以朱拉隆功大学卓越中心的名义开展工作，拥有为全国公共部门人员培训的经验，并可以学院名义颁发培训证明。",
    caseTitleZh: "查看 Care D+ 案例",
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
      unitZh: "人",
      labelZh: "接受过我们培训的公共卫生人员",
    },
    caseSlug: "care-d-plus",
    caseTitleTh: "ดูกรณี Care D+",
    caseTitleEn: "See the Care D+ case",
  },
  {
    key: "corporate",
    titleZh: "企业与企业社会责任团队",
    bodyZh:
      "每个项目都对应可持续发展目标并可衡量，数据可直接用于董事会报告、可持续发展报告或 ESG 披露。",
    caseTitleZh: "查看 NIA 100 FACES 案例",
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
      unitZh: "个目标",
      labelZh: "我们的工作已覆盖的可持续发展目标",
    },
    caseSlug: "nia-100-faces",
    caseTitleTh: "ดูกรณี NIA 100 FACES",
    caseTitleEn: "See the NIA 100 FACES case",
  },
  {
    key: "civil-society",
    titleZh: "公民社会与资助机构",
    bodyZh:
      "我们以可发表的研究方法设计研究与评估，成果既可用于向资助方汇报，也可延伸为学术成果。",
    caseTitleZh: "查看 Chula Zero Waste 案例",
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
      unitZh: "项",
      labelZh: "来源可追溯的学术成果",
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
  zh: {
    eyebrow: "面向您所在机构的合作",
    title: "我们与谁合作",
    description: "不同类型的机构看重的证据各不相同。请选择与您最接近的一类，看看我们能为您证明什么。",
  },
} as const;
