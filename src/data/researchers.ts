/**
 * อาจารย์นักวิจัยประจำศูนย์ (Researchers)
 *
 * รูปภาพ self-host ไว้ที่ public/images/researchers/ (Phase 0) — แหล่งต้นฉบับ:
 * - ดร.วรรษยุต: ช่อง YouTube ทางการของท่าน (channel avatar)
 *   https://www.youtube.com/@WatsayutKongchan / UC6Bqg8a_jZFUr2__YxmaXjw
 * - ศ.ดร.วธนน์: ข่าวจุฬาฯ รางวัลนักวิจัยดีเด่นแห่งชาติ 2565
 *   https://www.chula.ac.th/news/58581/
 * - ศ.ดร.ลัญฉกร: ภาควิชาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์
 *   https://ee.eng.chula.ac.th/lunchakorn-wuttisittikulkij/
 * - ดร.อิบเตซาม: ภาพถ่ายทางการและ CV ที่ รศ.ดร.สมิทธิ์ ส่งมา 27 ก.ย. 2569
 *   (ครอป 4:5 จากภาพครึ่งตัว ซูมให้ขนาดใบหน้าใกล้กับอีกสามท่านในแถวตามที่ผู้ใช้ขอ)
 *   · ตำแหน่ง สังกัด และหัวข้อวิจัยอ่านจาก CV ฉบับนั้น
 */

export type Researcher = {
  /** ผูกกับ field `authors` ของ publications.ts — ดูหมายเหตุใน TeamMember */
  slug?: string;
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  roleZh: string;
  faculty: string;
  facultyEn: string;
  facultyZh: string;
  focusEn?: string;
  focus: string;
  focusZh: string;
  image?: string;
  alt: string;
  email?: string;
  links: { label: string; href: string }[];
};

export const researchers: Researcher[] = [
  {
    // slug เป็นชื่อ**ตามที่ตีพิมพ์** ไม่ใช่ชื่อที่ท่านใช้วันนี้ เพราะต้องตรงกับ
    // กุญแจใน AUTHORS ของสคริปต์ ซึ่งใช้ตรวจว่า DOI เป็นของคนนี้จริง (ดูหมายเหตุใต้ชื่อ)
    slug: "watsayut-kongchan",
    name: "ดร.วรรษยุต คงจันทร์",
    // ยืนยันโดยผู้ช่วยของผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "Dr. Watsayut Kongchan"
    // **บทความที่ตีพิมพ์แล้วยังลงชื่อว่า Watsayut Kongchan** ทั้งใน Crossref
    // และในตัววารสาร รายการอ้างอิงบนหน้า /research จึงคงตามที่พิมพ์จริง ไม่แก้ตาม
    // (CLAUDE.md กฎข้อ 8 — publications.ts เป็นไฟล์ generated ห้ามแก้ด้วยมือ)
    // ชื่อไฟล์ภาพและ URL ช่อง YouTube ก็คงเดิม เพราะเป็นที่อยู่จริงของทรัพยากร
    nameEn: "Dr. Wassayut Kongjan",
    roleZh: "中心研究员",
    facultyZh: "朱拉隆功大学传播艺术学院公共关系系讲师",
    focusZh:
      "社会议题传播、传播创新与社会联结——传播艺术学院负责学术服务与社会联结的副院长",
    roleTh: "นักวิจัยประจำศูนย์",
    role: "Center Researcher",
    faculty:
      "อาจารย์ ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    facultyEn:
      "Lecturer, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University",
    focusEn:
      "Social-issue communication, communication innovation, and community engagement — Deputy Dean for Academic Service and Social Engagement",
    focus:
      "การสื่อสารประเด็นสังคม นวัตกรรมการสื่อสาร และการเชื่อมโยงสังคม — รองคณบดีคณะนิเทศศาสตร์ ด้านบริการวิชาการและเชื่อมโยงสังคม",
    image: "/images/researchers/watsayut-kongchan.webp",
    alt: "ดร.วรรษยุต คงจันทร์ นักวิจัยประจำศูนย์ — ภาพจากช่อง YouTube ทางการของท่าน (คณะนิเทศศาสตร์ จุฬาฯ)",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=wyldatkAAAAJ&hl=th",
      },
      {
        label: "ORCID",
        href: "https://orcid.org/0000-0002-7868-3249",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/@WatsayutKongchan",
      },
      {
        label: "Faculty Profile",
        href: "https://www.commarts.chula.ac.th/th/department-pr/",
      },
    ],
  },
  {
    name: "ศ.ดร.วธนน์ วิริยสิทธาวัฒน์",
    nameEn: "Prof. Dr. Wattana Viriyasitavat",
    roleZh: "中心研究员",
    facultyZh: "朱拉隆功大学商学院统计系（商业信息技术）教授",
    focusZh: "区块链、物联网、业务流程管理、服务工作流、信息物理系统",
    roleTh: "นักวิจัยประจำศูนย์",
    role: "Center Researcher",
    faculty:
      "ศาสตราจารย์ ภาควิชาสถิติ (Business Information Technology) คณะพาณิชยศาสตร์และการบัญชี จุฬาลงกรณ์มหาวิทยาลัย",
    facultyEn:
      "Professor, Department of Statistics (Business Information Technology), Chulalongkorn Business School",
    focus:
      "Blockchain, Internet of Things, Business Process Management, Service Workflows, Cyber-Physical Systems",
    image: "/images/researchers/wattana-viriyasitavat.webp",
    alt: "ศ.ดร.วธนน์ วิริยสิทธาวัฒน์ นักวิจัยประจำศูนย์ — ภาพจากข่าวจุฬาฯ รางวัลนักวิจัยดีเด่นแห่งชาติ 2565",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=RKI-mqcAAAAJ&hl=en",
      },
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/profile/Wattana-Viriyasitavat",
      },
      {
        label: "Chula News",
        href: "https://www.chula.ac.th/news/58581/",
      },
    ],
  },
  {
    name: "ศ.ดร.ลัญฉกร วุฒิสิทธิกุลกิจ",
    nameEn: "Prof. Dr. Lunchakorn Wuttisittikulkij",
    roleZh: "中心研究员",
    facultyZh: "朱拉隆功大学工程学院电气工程系教授",
    focusZh:
      "元宇宙、无线通信、5G 及后续技术、通信中的人工智能、面向智能工厂与医疗的虚拟现实（Chulaverse / MANGOs）",
    roleTh: "นักวิจัยประจำศูนย์",
    role: "Center Researcher",
    faculty:
      "ศาสตราจารย์ ภาควิชาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    facultyEn:
      "Professor, Department of Electrical Engineering, Faculty of Engineering, Chulalongkorn University",
    focus:
      "Metaverse, Wireless Communications, 5G and beyond, AI for communications, VR for smart factory and healthcare (Chulaverse / MANGOs)",
    image: "/images/researchers/lunchakorn-wuttisittikulkij.webp",
    alt: "ศ.ดร.ลัญฉกร วุฒิสิทธิกุลกิจ นักวิจัยประจำศูนย์ — ภาพจากภาควิชาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์ จุฬาฯ",
    email: "wlunchak@chula.ac.th",
    links: [
      {
        label: "Faculty Profile",
        href: "https://www.eng.chula.ac.th/en/staff/prof-lunchakorn-wuttisittikulkij-ph-d",
      },
      {
        label: "EE Department",
        href: "https://ee.eng.chula.ac.th/lunchakorn-wuttisittikulkij/",
      },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=P7aA-6IAAAAJ&hl=en",
      },
    ],
  },
  {
    // อดีตนักวิจัยหลังปริญญาเอกทุน C2F ของศูนย์ฯ (2566–2567) ปัจจุบันเป็นนักวิจัยรับเชิญ
    // (Invited Researcher 2025–2026 ตาม CV) · ผู้ใช้ให้วางเป็นใบที่สี่ของแถว ต่อจาก ศ.ดร.ลัญฉกร
    // **ไม่มี `slug`** เพราะยังไม่อยู่ในทะเบียน AUTHORS ของ fetch-publications.mjs
    // ผลงานที่เขียนร่วมกับ รศ.ดร.สมิทธิ์ ขึ้นหน้า /research อยู่แล้วผ่านชื่อของอาจารย์
    // ถ้าวันหนึ่งเพิ่มเข้าทะเบียน ต้องใส่ slug ตรงนี้ด้วย (ดู src/lib/people.ts)
    // ชื่อไทยเป็นการถอดเสียงจากชื่อใน CV (Muhammad Ibtesam Mazahir) ยังไม่ได้ยืนยันกับเจ้าตัว
    name: "ดร.มุฮัมมัด อิบเตซาม มาซาฮีร์",
    nameEn: "Dr. Muhammad Ibtesam Mazahir",
    roleZh: "特邀研究员",
    facultyZh:
      "巴基斯坦卡拉奇 Mohammad Ali Jinnah University 社会科学系主任 · 印度尼西亚 Universitas Airlangga 兼职教师 · 曾任本中心 C2F 博士后研究员",
    focusZh: "媒介素养与数字媒体、跨文化传播与国家品牌、体育外交与政治传播、广告与消费者行为、新闻框架与数据新闻",
    roleTh: "นักวิจัยรับเชิญ",
    role: "Invited Researcher",
    faculty:
      "หัวหน้าภาควิชาสังคมศาสตร์ Mohammad Ali Jinnah University (การาจี ปากีสถาน) · อาจารย์พิเศษ Universitas Airlangga (อินโดนีเซีย) · อดีตนักวิจัยหลังปริญญาเอกทุน C2F ของศูนย์ฯ",
    facultyEn:
      "Head of Social Sciences, Mohammad Ali Jinnah University, Karachi · Adjunct Faculty, Universitas Airlangga, Indonesia · Former C2F Postdoctoral Fellow at the Center",
    focusEn:
      "Media literacy and digital media, cross-cultural communication and nation branding, sports diplomacy and political communication, advertising and consumer behavior, news framing and data journalism",
    focus:
      "การรู้เท่าทันสื่อและสื่อดิจิทัล การสื่อสารข้ามวัฒนธรรมและการสร้างแบรนด์ประเทศ การทูตผ่านกีฬาและการสื่อสารทางการเมือง การโฆษณาและพฤติกรรมผู้บริโภค การวางกรอบข่าวและวารสารศาสตร์ข้อมูล",
    image: "/images/researchers/ibtesam-mazahir.webp",
    alt: "ดร.มุฮัมมัด อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญของศูนย์ — ภาพถ่ายทางการของท่าน",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=Xf_z7NQAAAAJ&hl=en",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ibtesam-mazahir-ph-d-208082107/",
      },
    ],
  },
];
