/**
 * บริการทั้ง 9 ด้านของศูนย์ (จากหมวดงานเว็บเดิม) — ใช้ร่วมกันทั้งหน้า TH/EN
 *
 * sdg: เป้าหมายที่บริการนี้เคยสร้างผลงานจริง (อ้างโครงการใน projects.ts)
 * ชุดสีรวมทั้งหน้า Expertise คุมไว้ 6 สี {4, 8, 9, 11, 12, 16} ตามเพดาน PART J
 */
import type { SdgId } from "./sdg";

export type Service = {
  key: string;
  title: string; // อังกฤษ
  titleTh: string;
  descTh: string;
  descEn: string;
  sdg: SdgId[];
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
  },
  {
    key: "motion-ar",
    title: "Motion Effect & AR",
    titleTh: "โมชันและความจริงเสริม (AR)",
    descTh: "สร้างประสบการณ์สื่อแบบโต้ตอบด้วยโมชันกราฟิกและเทคโนโลยีความจริงเสริม",
    descEn:
      "Create interactive media experiences with motion graphics and augmented reality technology.",
    sdg: [9],
  },
  {
    key: "video-production",
    title: "Video Production",
    titleTh: "การผลิตวิดีโอ",
    descTh: "ผลิตวิดีโอคุณภาพสูงสำหรับงานสื่อสาร แคมเปญ การเรียนรู้ และองค์กร",
    descEn:
      "Produce high-quality video for communication, campaigns, learning, and organizational storytelling.",
    sdg: [11],
  },
  {
    key: "training",
    title: "Training",
    titleTh: "การอบรม",
    descTh: "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากรและองค์กรอย่างตรงจุด",
    descEn: "Design and deliver communication innovation training tailored to staff and organizations.",
    sdg: [4],
  },
  {
    key: "research-evaluation",
    title: "Research & Evaluation",
    titleTh: "วิจัยและประเมินผล",
    descTh: "วิจัยเชิงลึกและประเมินผลโครงการสื่อสารอย่างเป็นระบบ เพื่อนำไปสู่การพัฒนาต่อเนื่อง",
    descEn:
      "Conduct in-depth research and systematic evaluation of communication projects for continuous improvement.",
    sdg: [9, 16],
  },
  {
    key: "communication-design",
    title: "Communication Design",
    titleTh: "การออกแบบการสื่อสาร",
    descTh: "ออกแบบกลยุทธ์และสื่อสารให้สอดคล้องกับเป้าหมายขององค์กรและผู้มีส่วนได้ส่วนเสีย",
    descEn: "Design strategies and messages aligned with organizational goals and stakeholder needs.",
    sdg: [4, 9],
  },
  {
    key: "campaign-management",
    title: "Campaign Management",
    titleTh: "การบริหารแคมเปญ",
    descTh: "วางแผนและบริหารแคมเปญเพื่อสร้างการเปลี่ยนแปลงเชิงพฤติกรรมและทัศนคติ",
    descEn: "Plan and manage campaigns that drive meaningful changes in behavior and attitudes.",
    sdg: [12],
  },
  {
    key: "seminar",
    title: "Seminar",
    titleTh: "สัมมนา",
    descTh: "จัดสัมมนาและเวทีแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารอย่างมีคุณภาพ",
    descEn: "Host seminars and knowledge-exchange forums on communication innovation.",
    sdg: [8],
  },
  {
    key: "marketing-event",
    title: "Marketing Event",
    titleTh: "กิจกรรมทางการตลาด",
    descTh: "ออกแบบและดำเนินกิจกรรมที่เชื่อมโยงแบรนด์กับผู้คนอย่างมีประสิทธิภาพและมีความหมาย",
    descEn: "Design and run events that connect brands with people effectively and meaningfully.",
    sdg: [9],
  },
];
