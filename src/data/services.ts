/**
 * บริการทั้ง 9 ด้านของศูนย์ (จากหมวดงานเว็บเดิม) — ใช้ร่วมกันทั้งหน้า TH/EN
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
  descTh: string;
  descEn: string;
  sdg: SdgId[];
  projectSlugs: string[];
};

/** 4 ช่วงของกระบวนการสื่อสาร — ใช้จัดเรียง 9 บริการบนหน้า Expertise */
export type ServiceStage = {
  key: string;
  titleTh: string;
  titleEn: string;
  taglineTh: string;
  taglineEn: string;
  serviceKeys: string[];
};

export const services: Service[] = [
  {
    key: "book-printing",
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
      "cultural-communication-program",
    ],
  },
  {
    key: "research-evaluation",
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    descTh: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ เพื่อนำไปสู่การพัฒนาต่อเนื่อง",
    descEn:
      "Conduct in-depth research and systematic evaluation of communication projects for continuous improvement.",
    sdg: [9, 16],
    projectSlugs: ["nia-satisfaction-survey-2020", "nia-media-innovation", "itd"],
  },
  {
    key: "communication-design",
    title: "Communication Design",
    titleTh: "การออกแบบการสื่อสาร",
    descTh: "ออกแบบกลยุทธ์และสื่อสารให้สอดคล้องกับเป้าหมายขององค์กรและผู้มีส่วนได้ส่วนเสีย",
    descEn: "Design strategies and messages aligned with organizational goals and stakeholder needs.",
    sdg: [4, 9],
    projectSlugs: ["chula-zero-waste", "nbtc-encyclopedia"],
  },
  {
    key: "campaign-management",
    title: "Campaign Management",
    titleTh: "การบริหารแคมเปญ",
    descTh: "วางแผนและบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลงเชิงพฤติกรรมและทัศนคติ",
    descEn: "Plan and manage campaigns that drive meaningful changes in behavior and attitudes.",
    sdg: [12],
    projectSlugs: ["chula-zero-waste"],
  },
  {
    key: "seminar",
    title: "Seminar",
    titleTh: "สัมมนา",
    descTh: "จัดสัมมนาและเวทีแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารอย่างมีคุณภาพ",
    descEn: "Host seminars and knowledge-exchange forums on communication innovation.",
    sdg: [8],
    projectSlugs: ["itd"],
  },
  {
    key: "marketing-event",
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
    titleTh: "เข้าใจและออกแบบ",
    titleEn: "Understand & design",
    taglineTh: "เริ่มจากข้อมูลจริง สู่กลยุทธ์ที่แม่นยำ",
    taglineEn: "Start from evidence and shape a precise strategy",
    serviceKeys: ["research-evaluation", "communication-design"],
  },
  {
    key: "produce",
    titleTh: "ผลิตสื่อ",
    titleEn: "Produce",
    taglineTh: "เปลี่ยนกลยุทธ์เป็นชิ้นงานคุณภาพสูง",
    taglineEn: "Turn strategy into high-quality media",
    serviceKeys: ["book-printing", "video-production", "motion-ar"],
  },
  {
    key: "drive",
    titleTh: "ขับเคลื่อน",
    titleEn: "Drive",
    taglineTh: "พาสารไปถึงผู้คนและสร้างการเปลี่ยนแปลง",
    taglineEn: "Carry the message to people and create change",
    serviceKeys: ["campaign-management", "marketing-event"],
  },
  {
    key: "empower",
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
