/**
 * ทีมผู้ช่วยวิจัย / นักออกแบบ / นักวิจัยร่วม / Postdoc / PhD
 * ดึงจากหน้า About ของเว็บเดิม + ข้อมูลจากศูนย์ (C2F / EDS)
 */

const media = (id: string, ext: string = "jpg") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_600,h_750,al_c,q_85,enc_auto/${id}~mv2.${ext}`;

export type TeamMember = {
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  affiliation?: string;
  focus?: string;
  funding?: string;
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
      "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    focus:
      "Health communication, ethical gamified interventions, migrant worker occupational health (WMSDs), public engagement",
    funding: "C2F High-Potential Postdoctoral Fellowship, Chulalongkorn University",
    // ยังไม่พบรูปสาธารณะคุณภาพดีออนไลน์ — แสดงอักษรย่อจนกว่าจะได้รับรูปจากศูนย์
    alt: "ดร.พยู ฮนิน ไหล่ (Phyu Hnin Hlaing) นักวิจัยหลังปริญญาเอกทุน C2F",
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
    funding: "C2F High-Potential Postdoctoral Fellowship, Chulalongkorn University",
    image:
      "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=gfq4xogAAAAJ&citpid=2",
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
    funding: "PhD scholarship (C2F / related funding) · co-research with the Center",
    // ยังไม่พบรูปสาธารณะออนไลน์ — แสดงอักษรย่อจนกว่าจะได้รับรูปจากศูนย์
    alt: "Thinley Lhendup นักศึกษาปริญญาเอกหลักสูตร EDS จุฬาฯ ที่ร่วมงานกับศูนย์",
    links: [
      {
        label: "Co-authored preprint",
        href: "https://www.biorxiv.org/content/10.1101/2025.08.10.669562v1",
      },
    ],
  },
];

/** นักวิจัยร่วม (จากเว็บเดิม — นอกเหนือจากอาจารย์ประจำศูนย์ 3 ท่าน) */
export const affiliatedResearchers: TeamMember[] = [
  {
    name: "ดร.อัจฉรา บุญชุ่ม",
    nameEn: "Dr. Atchara Boonchum",
    roleTh: "นักวิจัย",
    role: "Researcher",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_41e6a251793c40019370309bce59a0d3"),
    alt: "ดร.อัจฉรา บุญชุ่ม นักวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "รศ.ดร.ไวพจน์ จันทร์เสม",
    nameEn: "Assoc. Prof. Dr. Wai Phan Chansem",
    roleTh: "นักวิจัย",
    role: "Researcher",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_1c1c8fde9c5c4013892804a6d82da63e"),
    alt: "รศ.ดร.ไวพจน์ จันทร์เสม นักวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/** ผู้ช่วยวิจัย */
export const researchAssistants: TeamMember[] = [
  {
    name: "วรรณวิสา เวชประสิทธิ์",
    nameEn: "Wanwisa Wetchprasit",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_de18afe153e9498ba2f6886f70a2ef35"),
    alt: "วรรณวิสา เวชประสิทธิ์ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "ชนาภา อิทธิอมรกุลชัย",
    nameEn: "Chanapa Itthiamornkulchai",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_31a4089134c7492b9152bb547c2e358c", "png"),
    alt: "ชนาภา อิทธิอมรกุลชัย ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "สุพัตรา เพ็ชรี",
    nameEn: "Supatra Petchree",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_1e13d671d6524c9e8a3e394adc2a3bcc"),
    alt: "สุพัตรา เพ็ชรี ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "เอกสิทธิ์ สุมนา",
    nameEn: "Ekasit Sumana",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_17484343fc0b423e86bf30bc9954242b"),
    alt: "เอกสิทธิ์ สุมนา ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "หฤทัย สิทธิภูวบุณย์",
    nameEn: "Hrut Sitthipuwabun",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_21fc5f3f51484ff8ab3f7beea2d2f93a", "png"),
    alt: "หฤทัย สิทธิภูวบุณย์ ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
  {
    name: "ธวินท์ แจ่มแจ้ง",
    nameEn: "Thavin Chaemchaeng",
    roleTh: "ผู้ช่วยวิจัย",
    role: "Research Assistant",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_7fd4bdf8ae7b48efac5cf79fc4fdd215"),
    alt: "ธวินท์ แจ่มแจ้ง ผู้ช่วยวิจัย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];

/** นักออกแบบมัลติมีเดีย */
export const designers: TeamMember[] = [
  {
    name: "พรปวีณ์ ทิวทิพย์สกุล",
    nameEn: "Pornpavee Thiuthipsakul",
    roleTh: "นักออกแบบมัลติมีเดีย",
    role: "Multimedia Designer",
    affiliation: "ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    image: media("8e0d14_583440d112834e438b0d6b8215b45858"),
    alt: "พรปวีณ์ ทิวทิพย์สกุล นักออกแบบมัลติมีเดีย — ภาพจากเว็บเดิม ComInnoCenter",
  },
];
