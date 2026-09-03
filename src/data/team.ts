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
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  affiliation?: string;
  affiliationTh?: string;
  affiliationEn?: string;
  focus?: string;
  focusTh?: string;
  funding?: string;
  fundingTh?: string;
  image?: string;
  alt: string;
  links?: { label: string; href: string }[];
};

/** Postdoctoral researchers (C2F) under the center */
export const postdocs: TeamMember[] = [
  {
    name: "ดร.พยู ฮนิน ไหล่ (Rashida)",
    nameEn: "Dr. Phyu Hnin Hlaing",
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
    name: "ดร.ร็อบบี้ แจน วินเซนต์ ที. บูเอโล",
    nameEn: "Dr. Robbie Jan Vincent T. Buelo",
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
    roleTh: "นักวิจัย",
    role: "Researcher",
    image: media("8e0d14_1c1c8fde9c5c4013892804a6d82da63e"),
    alt: "รศ.ดร.ไวพจน์ จันทร์เสม นักวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/** ผู้ช่วยวิจัย — ไม่ใส่สังกัดศูนย์ */
export const researchAssistants: TeamMember[] = [
  {
    name: "วันวิสา เวชประสิทธิ์",
    nameEn: "Wanwisa Wechprasith",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_de18afe153e9498ba2f6886f70a2ef35"),
    alt: "วันวิสา เวชประสิทธิ์ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "ชนาภา อิทธิอมรกุลชัย",
    nameEn: "Chanapa Itdhiamornkulchai",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_31a4089134c7492b9152bb547c2e358c"),
    alt: "ชนาภา อิทธิอมรกุลชัย ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "สุพัตรา เพ็ชรี",
    nameEn: "Supatra Petchree",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_1e13d671d6524c9e8a3e394adc2a3bcc"),
    alt: "สุพัตรา เพ็ชรี ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    // ยืนยันโดยผู้ช่วยของผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "เอกสิทธิ์ สุมนา / Ekasit Sumana"
    name: "เอกะสิทธิ์ สุมะนะ",
    nameEn: "Akasit Sumana",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_17484343fc0b423e86bf30bc9954242b"),
    alt: "เอกะสิทธิ์ สุมะนะ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "หฤทัย สิทธิภูวบุณย์",
    nameEn: "Hrut Sitthipuwabun",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_21fc5f3f51484ff8ab3f7beea2d2f93a"),
    alt: "หฤทัย สิทธิภูวบุณย์ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    // ยืนยันการสะกดโดยผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "ธวินท์ แจ่มแจ้ง /
    // Thavin Chaemchaeng" ผิดทั้งชื่อไทยและการถอดเป็นอังกฤษ ค่าที่ถูกคือ
    // "ธาวิน แจ่มแจ้ง / Thavin Jamjang" · ชื่อเดิมติดมาจากเว็บ Wix
    name: "ธาวิน แจ่มแจ้ง",
    nameEn: "Thavin Jamjang",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    image: media("8e0d14_7fd4bdf8ae7b48efac5cf79fc4fdd215"),
    alt: "ธาวิน แจ่มแจ้ง ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/** นักออกแบบมัลติมีเดีย — ไม่ใส่สังกัดศูนย์ */
export const designers: TeamMember[] = [
  {
    name: "พรปวีณ์ ทิวทิพย์สกุล",
    nameEn: "Pornpavee Thiuthipsakul",
    roleTh: "นักออกแบบมัลติมีเดีย",
    role: "Multimedia Designer",
    image: media("8e0d14_583440d112834e438b0d6b8215b45858"),
    alt: "พรปวีณ์ ทิวทิพย์สกุล นักออกแบบมัลติมีเดีย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];
