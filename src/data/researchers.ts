/**
 * อาจารย์นักวิจัยประจำศูนย์ (Researchers)
 * แหล่งอ้างอิง:
 * - https://www.commarts.chula.ac.th/th/department-pr/
 * - Google Scholar Watsayut: wyldatkAAAAJ
 * - Google Scholar Wattana: RKI-mqcAAAAJ
 * - https://ee.eng.chula.ac.th/lunchakorn-wuttisittikulkij/
 * รูป Watsayut / Wattana ใช้ proxy ผ่าน images.weserv.nl เพราะ
 *   scholar.googleusercontent.com มักถูกบล็อกตอน next/image optimize บน Vercel
 */

export type Researcher = {
  name: string;
  nameEn: string;
  roleTh: string;
  role: string;
  faculty: string;
  focus: string;
  image?: string;
  alt: string;
  email?: string;
  links: { label: string; href: string }[];
};

/** Proxy Google Scholar portrait so Next/Image can load it on Vercel */
const scholarPhoto = (userId: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(
    `https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${userId}&citpid=1`
  )}&w=800&h=1000&fit=cover&output=jpg`;

export const researchers: Researcher[] = [
  {
    name: "ดร.วรรษยุต คงจันทร์",
    nameEn: "Dr. Watsayut Kongchan",
    roleTh: "นักวิจัยประจำศูนย์",
    role: "Center Researcher",
    faculty:
      "อาจารย์ ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    focus:
      "การสื่อสารประเด็นสังคม นวัตกรรมการสื่อสาร และการเชื่อมโยงสังคม — รองคณบดีคณะนิเทศศาสตร์ ด้านบริการวิชาการและเชื่อมโยงสังคม",
    image: scholarPhoto("wyldatkAAAAJ"),
    alt: "ดร.วรรษยุต คงจันทร์ นักวิจัยประจำศูนย์ — ภาพจาก Google Scholar (user=wyldatkAAAAJ) / คณะนิเทศศาสตร์ จุฬาฯ",
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
    focus:
      "Blockchain, Internet of Things, Business Process Management, Service Workflows, Cyber-Physical Systems",
    image: scholarPhoto("RKI-mqcAAAAJ"),
    alt: "ศ.ดร.วธนน์ วิริยสิทธาวัฒน์ นักวิจัยประจำศูนย์ — ภาพจาก Google Scholar (user=RKI-mqcAAAAJ) / คณะพาณิชยศาสตร์และการบัญชี จุฬาฯ",
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=RKI-mqcAAAAJ&hl=en",
      },
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/profile/Wattana-Viriyasitavat",
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
    focus:
      "Metaverse, Wireless Communications, 5G and beyond, AI for communications, VR for smart factory and healthcare (Chulaverse / MANGOs)",
    image: "https://ee.eng.chula.ac.th/wp-content/uploads/2025/09/LWK2.jpg",
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
