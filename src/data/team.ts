/**
 * ทีมผู้ช่วยวิจัย / นักออกแบบ / นักวิจัยร่วม / Postdoc / PhD
 * ดึงจากหน้า About ของเว็บเดิม + ข้อมูลจากศูนย์ (C2F / EDS)
 *
 * หมายเหตุ: นักวิจัยร่วม / ผู้ช่วยวิจัย / นักออกแบบ — ไม่ใส่สังกัดศูนย์
 * เพราะอาจทำงานหลายที่ และไม่ต้องการให้เกิดปัญหาด้านสังกัด
 */

/** Self-hosted — ดาวน์โหลดจาก Wix มาไว้ที่ public/images/team/ (Phase 0) */
const media = (id: string) => `/images/team/${id}.webp`;

export type TeamMember = {
  /**
   * ใช้ผูกกับ field `authors` ของ publications.ts — ต้องตรงกับกุญแจใน `AUTHORS`
   * ของ scripts/fetch-publications.mjs เป๊ะ
   *
   * มีเฉพาะคนที่มีผลงานบนหน้า /research เท่านั้น ถ้าไม่ใส่แล้วสคริปต์ผลิต slug
   * ของคนนั้นออกมา หน้าเว็บจะพิมพ์ slug ดิบแทนชื่อคน (`resolvePersonName` คืน
   * slug เป็นค่าสำรอง) — `check:content` ดักกรณีนี้ไว้แล้ว
   */
  slug?: string;
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  /** จีนตัวย่อ — เพิ่ม 24 ก.ย. 2569 พร้อมหน้า /zh/about · ช่อง optional ที่ไม่มีค่าจะไม่แสดง ไม่ถอยไปภาษาอื่น */
  roleZh: string;
  affiliation?: string;
  affiliationTh?: string;
  affiliationEn?: string;
  affiliationZh?: string;
  focus?: string;
  focusTh?: string;
  focusZh?: string;
  funding?: string;
  fundingTh?: string;
  fundingZh?: string;
  image?: string;
  alt: string;
  links?: { label: string; href: string }[];
};

/** Postdoctoral researchers (C2F) under the center */
export const postdocs: TeamMember[] = [
  {
    slug: "phyu-hnin-hlaing",
    name: "ดร.พยู ฮนิน ไหล่ (Rashida)",
    nameEn: "Dr. Phyu Hnin Hlaing",
    roleZh: "C2F 博士后研究员",
    affiliationZh: "朱拉隆功大学传播艺术学院传播创新卓越中心",
    focusZh: "健康传播、符合伦理的游戏化干预、移民工人职业健康（WMSDs）、公众参与",
    fundingZh: "朱拉隆功大学 C2F 高潜力博士后奖学金",
    roleTh: "นักวิจัยหลังปริญญาเอก (C2F Postdoc)",
    role: "C2F Postdoctoral Fellow",
    affiliation:
      "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    focus:
      "Health communication, ethical gamified interventions, migrant worker occupational health (WMSDs), public engagement",
    focusTh:
      "การสื่อสารสุขภาพ เกมิฟิเคชันเชิงจริยธรรมเพื่อการปรับพฤติกรรม สุขภาพอาชีวอนามัยของแรงงานข้ามชาติ (WMSDs) และการมีส่วนร่วมของสาธารณะ",
    funding: "C2F High-Potential Postdoctoral Fellowship, Chulalongkorn University",
    fundingTh: "ทุน C2F High-Potential Postdoctoral Fellowship จุฬาลงกรณ์มหาวิทยาลัย",
    affiliationEn:
      "Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University",
    image: media("34cff6_29040465434b4a43bab2432065a820ab"),
    alt: "ดร.พยู ฮนิน ไหล่ (Rashida / Phyu Hnin Hlaing) นักวิจัยหลังปริญญาเอกทุน C2F — ภาพจาก thesharpener.school",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=608OCiIAAAAJ&hl=en",
      },
      {
        label: "Co-authored paper",
        href: "https://wellcomeopenresearch.org/articles/9-347",
      },
    ],
  },
  {
    slug: "robbie-buelo",
    name: "ดร.ร็อบบี้ แจน วินเซนต์ ที. บูเอโล",
    nameEn: "Dr. Robbie Jan Vincent T. Buelo",
    roleZh: "C2F 博士后研究员",
    affiliationZh:
      "朱拉隆功大学传播艺术学院 · 菲律宾 National University Dasmariñas 传播学士项目主任",
    focusZh: "原住民传播、灾害公共舆论、SALIGAN 框架、高等教育中的人工智能、东盟媒体与传播",
    fundingZh: "朱拉隆功大学 C2F 高潜力博士后奖学金",
    roleTh: "นักวิจัยหลังปริญญาเอก (C2F Postdoc)",
    role: "C2F Postdoctoral Fellow",
    affiliation:
      "Faculty of Communication Arts, Chulalongkorn University · Program Chair, AB Communication, National University Dasmariñas (Philippines)",
    focus:
      "Indigenous communication, disaster public opinion, SALIGAN framework, AI in higher education, ASEAN media & communication",
    focusTh:
      "การสื่อสารของชนพื้นเมือง ความคิดเห็นสาธารณะต่อภัยพิบัติ กรอบแนวคิด SALIGAN, AI ในอุดมศึกษา และสื่อกับการสื่อสารอาเซียน",
    funding: "C2F High-Potential Postdoctoral Fellowship, Chulalongkorn University",
    fundingTh: "ทุน C2F High-Potential Postdoctoral Fellowship จุฬาลงกรณ์มหาวิทยาลัย",
    affiliationTh:
      "คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย · หัวหน้าหลักสูตร AB Communication, National University Dasmariñas (ฟิลิปปินส์)",
    image: "/images/team/robbie-buelo.webp",
    alt: "ดร.Robbie Jan Vincent T. Buelo นักวิจัยหลังปริญญาเอกทุน C2F — ภาพจาก Google Scholar",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=gfq4xogAAAAJ&hl=en",
      },
    ],
  },
];

/** PhD candidates affiliated with the center */
export const phdCandidates: TeamMember[] = [
  {
    name: "ทินเลย์ เลนดุบ",
    nameEn: "Thinley Lhendup",
    roleZh: "博士生",
    affiliationZh: "朱拉隆功大学研究生院环境、发展与可持续发展（EDS）博士项目",
    focusZh: "数字传播偏好与环境行为；不丹青少年废弃物管理教育",
    fundingZh: "博士奖学金（C2F 及相关资助）· 与中心合作研究",
    roleTh: "นักศึกษาปริญญาเอก",
    role: "PhD Candidate",
    affiliation:
      "Ph.D. Program in Environment, Development and Sustainability (EDS), Graduate School, Chulalongkorn University",
    focus:
      "Digital communication preferences and environmental behavior; youth waste management education in Bhutan",
    focusTh:
      "ความชอบด้านการสื่อสารดิจิทัลกับพฤติกรรมสิ่งแวดล้อม และการศึกษาเรื่องการจัดการขยะของเยาวชนในภูฏาน",
    funding: "PhD scholarship (C2F / related funding) · co-research with the Center",
    fundingTh: "ทุนปริญญาเอก (C2F และทุนที่เกี่ยวข้อง) · วิจัยร่วมกับศูนย์ฯ",
    affiliationTh:
      "หลักสูตรปริญญาเอกสิ่งแวดล้อม การพัฒนา และความยั่งยืน (EDS) บัณฑิตวิทยาลัย จุฬาลงกรณ์มหาวิทยาลัย",
    alt: "Thinley Lhendup นักศึกษาปริญญาเอกหลักสูตร EDS จุฬาฯ ที่ร่วมงานกับศูนย์",
    links: [
      {
        label: "Co-authored preprint",
        href: "https://www.biorxiv.org/content/10.1101/2025.08.10.669562v1",
      },
    ],
  },
];

/** นักวิจัยร่วม — ไม่ใส่สังกัดศูนย์ */
export const affiliatedResearchers: TeamMember[] = [
  {
    name: "ดร.อัจฉรา บุญชุม",
    nameEn: "Dr. Atchara Boonchum",
    roleZh: "研究员",
    roleTh: "นักวิจัย",
    role: "Researcher",
    image: media("8e0d14_41e6a251793c40019370309bce59a0d3"),
    alt: "ดร.อัจฉรา บุญชุม นักวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "รศ.ดร.ไวพจน์ จันทร์เสม",
    // ยืนยันการสะกดโดยผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บถอดเป็น "Wai Phan Chansem"
    // ซึ่งเป็นการถอดเสียงทีละพยางค์ ไม่ใช่ชื่ออังกฤษที่เจ้าตัวใช้จริง
    // ชื่อไทยถูกอยู่แล้ว เปลี่ยนเฉพาะฝั่งอังกฤษ
    nameEn: "Assoc. Prof. Dr. Wipoj Chansem",
    roleZh: "研究员",
    roleTh: "นักวิจัย",
    role: "Researcher",
    image: media("8e0d14_1c1c8fde9c5c4013892804a6d82da63e"),
    alt: "รศ.ดร.ไวพจน์ จันทร์เสม นักวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/**
 * ผู้ช่วยวิจัย — ไม่ใส่สังกัดศูนย์
 *
 * **รายชื่อชุดนี้ตัดจากหกคนเหลือสองคนเมื่อ 3 ก.ย. 2569** ตามที่ผู้ใช้ยืนยัน
 * หลังผู้ช่วยของท่านไปตรวจสอบรายชื่อมา — วันวิสา เวชประสิทธิ์ · ชนาภา
 * อิทธิอมรกุลชัย · หฤทัย สิทธิภูวบุณย์ · ธาวิน แจ่มแจ้ง ไม่ได้อยู่กับศูนย์ฯ แล้ว
 * ลบทั้งการ์ดและ**ไฟล์ภาพของทั้งสี่คนออกจาก public/** ด้วย เพราะภาพบุคคลที่
 * ไม่ได้อยู่กับศูนย์ฯ แล้วไม่ควรถูกเสิร์ฟต่อจากเว็บของศูนย์ฯ แม้จะไม่มีหน้าไหนลิงก์ถึง
 * (ประวัติเดิมยังอยู่ใน git ถ้าวันหนึ่งต้องกู้กลับ)
 */
export const researchAssistants: TeamMember[] = [
  {
    // ยืนยันโดยผู้ช่วยของผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "สุพัตรา เพ็ชรี" (มีไม้ไต่คู้)
    name: "สุพัตรา เพชรี",
    nameEn: "Supatra Petchree",
    roleZh: "研究助理",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_1e13d671d6524c9e8a3e394adc2a3bcc"),
    alt: "สุพัตรา เพชรี ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    // ยืนยันโดยผู้ช่วยของผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "เอกสิทธิ์ สุมนา / Ekasit Sumana"
    name: "เอกะสิทธิ์ สุมะนะ",
    nameEn: "Akasit Sumana",
    roleZh: "研究助理",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_17484343fc0b423e86bf30bc9954242b"),
    alt: "เอกะสิทธิ์ สุมะนะ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/** นักออกแบบมัลติมีเดีย — ไม่ใส่สังกัดศูนย์ */
export const designers: TeamMember[] = [
  {
    name: "พรปวีณ์ ทิวทิพย์สกุล",
    nameEn: "Pornpavee Thiuthipsakul",
    roleZh: "多媒体设计师",
    roleTh: "นักออกแบบมัลติมีเดีย",
    role: "Multimedia Designer",
    image: media("8e0d14_583440d112834e438b0d6b8215b45858"),
    alt: "พรปวีณ์ ทิวทิพย์สกุล นักออกแบบมัลติมีเดีย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];
