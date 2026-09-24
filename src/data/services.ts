/**
 * บริการทั้ง 9 ด้านของศูนย์ (จากหมวดงานเว็บเดิม) — ใช้ร่วมกันทั้งหน้า TH/EN/ZH
 *
 * sdg: เป้าหมายที่บริการนี้เคยสร้างผลงานจริง (อ้างโครงการใน projects.ts)
 * ชุดสีรวมทั้งหน้า Expertise คุมไว้ 6 สี {4, 8, 9, 11, 12, 16} ตามเพดาน PART J
 *
 * projectSlugs: โครงการจริงที่เคยใช้บริการนี้ (slug ใน projects.ts) —
 * เกณฑ์: เนื้องานใน challenge/approach/outcome ของโครงการระบุงานประเภทนี้ชัดเจน
 * โครงการหนึ่งปรากฏได้หลายบริการถ้าเนื้องานครอบคลุมจริง (เช่น NIA 100 FACES = หนังสือ + AR)
 */
import type { SdgId } from "./sdg";

export type Service = {
  key: string;
  title: string; // อังกฤษ
  titleTh: string;
  /** จีนตัวย่อ — เพิ่ม 24 ก.ย. 2569 พร้อมหน้า /zh/expertise */
  titleZh: string;
  descTh: string;
  descEn: string;
  descZh: string;
  sdg: SdgId[];
  projectSlugs: string[];
};

/** 4 ช่วงของกระบวนการสื่อสาร — ใช้จัดเรียง 9 บริการบนหน้า Expertise */
export type ServiceStage = {
  key: string;
  titleTh: string;
  titleEn: string;
  titleZh: string;
  taglineTh: string;
  taglineEn: string;
  taglineZh: string;
  serviceKeys: string[];
};

export const services: Service[] = [
  {
    key: "book-printing",
    titleZh: "图书与印刷",
    descZh: "为学术与机构需求设计并制作高品质的印刷品、图书与文件。",
    title: "Book & Printing",
    titleTh: "หนังสือและการพิมพ์",
    descTh: "ออกแบบและผลิตสื่อสิ่งพิมพ์ หนังสือ และเอกสารคุณภาพสูง สำหรับงานวิชาการและองค์กร",
    descEn:
      "Design and produce high-quality print media, books, and documents for academic and organizational use.",
    sdg: [4, 8],
    projectSlugs: ["nbtc-encyclopedia", "nia-100-faces", "asean-university-network"],
  },
  {
    key: "motion-ar",
    titleZh: "动态图形与增强现实（AR）",
    descZh: "运用动态图形与增强现实技术，打造互动式媒体体验。",
    title: "Motion Effect & AR",
    titleTh: "โมชันและความจริงเสริม (AR)",
    descTh: "สร้างประสบการณ์สื่อแบบโต้ตอบด้วยโมชันกราฟิกและเทคโนโลยีความจริงเสริม",
    descEn:
      "Create interactive media experiences with motion graphics and augmented reality technology.",
    sdg: [9],
    projectSlugs: ["nia-100-faces", "nia-media-innovation"],
  },
  {
    key: "video-production",
    titleZh: "视频制作",
    descZh: "为传播、宣传活动、学习和机构叙事制作高品质视频。",
    title: "Video Production",
    titleTh: "การผลิตวิดีโอ",
    descTh: "ผลิตวิดีโอคุณภาพสูงสำหรับงานสื่อสาร แคมเปญ การเรียนรู้ และองค์กร",
    descEn:
      "Produce high-quality video for communication, campaigns, learning, and organizational storytelling.",
    sdg: [11],
    projectSlugs: ["seeds-for-cu-sustainability", "nbtc-encyclopedia"],
  },
  {
    key: "training",
    titleZh: "培训",
    descZh: "面向人员与机构，量身设计并开展传播创新培训。",
    title: "Training",
    titleTh: "การอบรม",
    descTh: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากรและองค์กรอย่างตรงจุด",
    descEn: "Design and deliver communication innovation training tailored to staff and organizations.",
    sdg: [4],
    projectSlugs: [
      "care-d-plus",
      "empowering-youth-leaders",
      "sri-trang-agro-industry",
      "pid-thong-lang-phra-foundation",
      "department-of-disease-control",
      "creative-tourism-development-project-in-nan-province",
      "ministry-of-natural-resources-and-environment",
      "international-labour-organization",
      "media-communication-transnational-citizens",
      "talk-thai-today",
      "cultural-communication-program",
    ],
  },
  {
    key: "research-evaluation",
    titleZh: "研究与评估",
    descZh: "对传播项目开展深入研究与系统评估，推动持续改进。",
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    descTh: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ เพื่อนำไปสู่การพัฒนาต่อเนื่อง",
    descEn:
      "Conduct in-depth research and systematic evaluation of communication projects for continuous improvement.",
    sdg: [9, 16],
    projectSlugs: [
      "nia-satisfaction-survey-2020",
      "nia-media-innovation",
      "itd",
      "public-relationshift",
    ],
  },
  {
    key: "communication-design",
    titleZh: "传播设计",
    descZh: "依据机构目标与利益相关方的需求，设计传播策略与信息。",
    title: "Communication Design",
    titleTh: "การออกแบบการสื่อสาร",
    descTh: "ออกแบบกลยุทธ์และสื่อสารให้สอดคล้องกับเป้าหมายขององค์กรและผู้มีส่วนได้ส่วนเสีย",
    descEn: "Design strategies and messages aligned with organizational goals and stakeholder needs.",
    sdg: [4, 9],
    projectSlugs: ["chula-zero-waste", "nbtc-encyclopedia"],
  },
  {
    key: "campaign-management",
    titleZh: "宣传活动管理",
    descZh: "策划并管理宣传活动，推动行为与态度发生切实改变。",
    title: "Campaign Management",
    titleTh: "การบริหารแคมเปญ",
    descTh: "วางแผนและบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลงเชิงพฤติกรรมและทัศนคติ",
    descEn: "Plan and manage campaigns that drive meaningful changes in behavior and attitudes.",
    sdg: [12],
    projectSlugs: ["chula-zero-waste"],
  },
  {
    key: "seminar",
    titleZh: "研讨会",
    descZh: "举办高质量的传播创新研讨会与知识交流平台。",
    title: "Seminar",
    titleTh: "สัมมนา",
    descTh: "จัดสัมมนาและเวทีแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารอย่างมีคุณภาพ",
    descEn: "Host seminars and knowledge-exchange forums on communication innovation.",
    sdg: [8],
    projectSlugs: ["itd"],
  },
  {
    key: "marketing-event",
    titleZh: "营销活动",
    descZh: "设计并执行有效且有意义地连接品牌与人的活动。",
    title: "Marketing Event",
    titleTh: "กิจกรรมทางการตลาด",
    descTh: "ออกแบบและดำเนินกิจกรรมที่เชื่อมโยงแบรนด์กับผู้คนอย่างมีประสิทธิภาพและมีความหมาย",
    descEn: "Design and run events that connect brands with people effectively and meaningfully.",
    sdg: [9],
    projectSlugs: ["nia-media-innovation"],
  },
];

/** ลำดับช่วงกำหนดเลขบริการ 01–09 บนหน้า Expertise (นับต่อเนื่องข้ามช่วง) */
export const serviceStages: ServiceStage[] = [
  {
    key: "understand",
    titleZh: "理解与设计",
    taglineZh: "从真实数据出发，制定精准策略",
    titleTh: "เข้าใจและออกแบบ",
    titleEn: "Understand & design",
    taglineTh: "เริ่มจากข้อมูลจริง สู่กลยุทธ์ที่แม่นยำ",
    taglineEn: "Start from evidence and shape a precise strategy",
    serviceKeys: ["research-evaluation", "communication-design"],
  },
  {
    key: "produce",
    titleZh: "内容制作",
    taglineZh: "把策略转化为高品质作品",
    titleTh: "ผลิตสื่อ",
    titleEn: "Produce",
    taglineTh: "เปลี่ยนกลยุทธ์เป็นชิ้นงานคุณภาพสูง",
    taglineEn: "Turn strategy into high-quality media",
    serviceKeys: ["book-printing", "video-production", "motion-ar"],
  },
  {
    key: "drive",
    titleZh: "推动传播",
    taglineZh: "把信息送达人们并促成改变",
    titleTh: "ขับเคลื่อน",
    titleEn: "Drive",
    taglineTh: "พาสารไปถึงผู้คนและสร้างการเปลี่ยนแปลง",
    taglineEn: "Carry the message to people and create change",
    serviceKeys: ["campaign-management", "marketing-event"],
  },
  {
    key: "empower",
    titleZh: "知识传承",
    taglineZh: "让您的团队能够独立延续这项工作",
    titleTh: "ส่งต่อความรู้",
    titleEn: "Empower",
    taglineTh: "ให้ทีมของคุณทำต่อได้ด้วยตัวเอง",
    taglineEn: "Leave your team able to carry the work forward",
    serviceKeys: ["training", "seminar"],
  },
];

export function getServiceByKey(key: string) {
  return services.find((s) => s.key === key);
}

/**
 * บริการที่โครงการนี้เคยใช้ พร้อมช่วงกระบวนการของบริการนั้น
 * ใช้ลิงก์จากหน้ารายละเอียดโครงการกลับไปยังช่วงที่ตรงกันบนหน้า Expertise
 * (อ่านจาก projectSlugs ที่มีอยู่แล้ว ไม่ได้ผูกความสัมพันธ์ขึ้นใหม่)
 */
export function servicesForProject(slug: string) {
  return services
    .filter((s) => s.projectSlugs.includes(slug))
    .map((service) => ({
      service,
      stage: serviceStages.find((st) => st.serviceKeys.includes(service.key)),
    }))
    .filter((x): x is { service: Service; stage: ServiceStage } => Boolean(x.stage));
}
