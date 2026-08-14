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
 */

export type Researcher = {
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  faculty: string;
  facultyEn: string;
  focusEn?: string;
  focus: string;
  image?: string;
  alt: string;
  email?: string;
  links: { label: string; href: string }[];
};

export const researchers: Researcher[] = [
  {
    name: "ดร.วรรษยุต คงจันทร์",
    nameEn: "Dr. Watsayut Kongchan",
    roleTh: "นักวิจัยประจำศูนย์",
    role: "Center Researcher",
    faculty:
      "อาจารย์ ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    facultyEn:
      "Lecturer, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University",
    focusEn:
      "Social-issue communication, communication innovation, and community engagement — Associate Dean for Academic Service and Social Engagement",
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
];
