/**
 * Leadership profiles — fact-checked 2026-08-13
 */
export type SocialLink = {
  label: string;
  href: string;
};

export type Publication = {
  title: string;
  venue: string;
  year: number;
  citations?: number;
};

export type Leader = {
  name: string;
  nameEn: string;
  role: string;
  roleTh: string;
  image: string;
  alt: string;
  education: string[];
  work: string[];
  focus: string;
  email?: string;
  metrics: { label: string; value: number; suffix?: string }[];
  links: SocialLink[];
  publications: Publication[];
  metricsNote: string;
};

const media = (id: string, ext: string = "jpg") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_800,h_1000,al_c,q_85,enc_auto/${id}~mv2.${ext}`;

export const leadership: Leader[] = [
  {
    name: "รศ.ดร.สมิทธิ์ บุญชุติมา",
    nameEn: "Assoc. Prof. Dr. Smith Boonchutima",
    role: "Head of Research Operations Unit",
    roleTh: "หัวหน้าศูนย์ / Head of Research Operations Unit",
    image: media("8e0d14_ecc50ab1da21439b9bc9043a1e5c9b6b"),
    alt: "รศ.ดร.สมิทธิ์ บุญชุติมา หัวหน้าศูนย์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    education: [
      "Doctor of Philosophy in Health Promotion Sciences (Sports Sciences), Chulalongkorn University, 2018",
      "Transnational Communications & The Global Media, Goldsmiths, University of London, 2005",
      "Master of Arts in Mass Communication (Advertising), Chulalongkorn University, 2000",
      "Bachelor of Communication Arts (Advertising) (First-Class Honors), Chulalongkorn University, 2000",
    ],
    work: [
      "Associate Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (2007–Present)",
      "Head, Center of Excellence in Communication Innovation for Development of Quality of Life and Sustainability (2024–Present)",
      "President, Asian Congress for Media and Communication (2024–Present)",
    ],
    focus:
      "Health Communication, Risk Communication, Digital Media, Transnational Communication, Social Media Research, Public Relations",
    email: "smith.b@chula.ac.th",
    metrics: [
      { label: "Citations (GS)", value: 263 },
      { label: "h-index (GS)", value: 9 },
      { label: "Docs (Scopus)", value: 24 },
    ],
    metricsNote:
      "Google Scholar: Citations 263 · h-index 9 · i10-index 9 | Scopus (ID 56167805200): 24 documents · 97 citations · h-index 6",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=LKEmLP0AAAAJ&hl=en" },
      { label: "Scopus", href: "https://www.scopus.com/authid/detail.uri?authorId=56167805200" },
      { label: "ORCID", href: "https://orcid.org/0000-0001-7412-4506" },
      { label: "ResearchGate", href: "https://www.researchgate.net/profile/Smith-Boonchutima" },
      { label: "Kudos", href: "https://www.growkudos.com/profile/smith_boonchutima" },
      { label: "Faculty Profile", href: "https://www.commarts.chula.ac.th/th/department-pr/" },
    ],
    publications: [
      {
        title: "Longitudinal study of Thai people media exposure, knowledge, and behavior on dengue fever prevention and control",
        venue: "Journal of Infection and Public Health",
        year: 2017,
        citations: 52,
      },
      {
        title: "Utilization of dating apps by men who have sex with men for persuading other men toward substance use",
        venue: "Psychology Research and Behavior Management",
        year: 2017,
        citations: 40,
      },
      {
        title: "The impact of VTubers and streamers on the purchase intention of otaku and non-otaku respondents",
        venue: "Basic and Applied Social Psychology",
        year: 2023,
        citations: 19,
      },
      {
        title: "Evaluation of public health communication performance by Stufflebeam's CIPP model: A case study of Thailand's department of disease control",
        venue: "Journal of Business and Behavioral Sciences",
        year: 2013,
        citations: 15,
      },
    ],
  },
  {
    name: "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์",
    nameEn: "Asst. Prof. Dr. Teerada (Ne) Chongkolrattanaporn",
    role: "Deputy Head of Research Operations Unit",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    image: media("25218b_89b42fbbe4814a6482683b96cc6f59e7"),
    alt: "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ รองหัวหน้าศูนย์ หัวหน้าภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ",
    education: [
      "Ph.D. International Communication, Macquarie University, Australia, 2013",
      "Ph.D. Communication Arts, Chulalongkorn University, Thailand, 2012",
      "M.A. Speech and Communication Studies, San Francisco State University, USA, 2005",
      "B.A. English, Chulalongkorn University, Thailand, 1998",
    ],
    work: [
      "Head of the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (October 2022–Present)",
      "Assistant Professor, Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University (2009–Present)",
    ],
    focus:
      "Crisis Communication, Environmental Communications, Persuasion and Negotiation, International Image and Reputation, Framing Theory and Public Relations Campaigns",
    metrics: [
      { label: "Publications", value: 15, suffix: "+" },
      { label: "Thesis advised", value: 25, suffix: "+" },
      { label: "Years in academia", value: 17, suffix: "+" },
    ],
    metricsNote: "อ้างอิง ORCID 0000-0003-2785-8595 และหน้ารายชื่อภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ",
    links: [
      { label: "LinkedIn", href: "https://th.linkedin.com/in/teerada-chongkolrattanaporn-058588b2" },
      { label: "ORCID", href: "https://orcid.org/0000-0003-2785-8595" },
      { label: "Faculty Profile", href: "https://www.commarts.chula.ac.th/th/department-pr/" },
    ],
    publications: [
      {
        title: "Cognitive Load Theory in Online Education: Leveraging Interactive Media, Testing, Interaction and to Enhance Engagement and Active Learning",
        venue: "IEEE TENCON (with S. Boonchutima & W. Kongchan)",
        year: 2023,
        citations: 7,
      },
      {
        title: "Research on university students and techno-stress during COVID-19 pandemic",
        venue: "Learning Innovation Center / INTI Symposium",
        year: 2021,
      },
      {
        title: "Crisis, environmental & international image communication (selected works)",
        venue: "Faculty of Communication Arts, Chulalongkorn University",
        year: 2022,
      },
    ],
  },
  {
    name: "รศ.ดร. Pavel Slutskiy",
    nameEn: "Assoc. Prof. Dr. Pavel Slutskiy",
    role: "Deputy Head of Research Operations Unit",
    roleTh: "รองหัวหน้าศูนย์ / Deputy Head of Research Operations Unit",
    image: media("8e0d14_bb83dfe119da43c19b9ba2cc2480023f"),
    alt: "Assoc. Prof. Dr. Pavel Slutskiy รองหัวหน้าศูนย์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    education: [
      "Ph.D., Saint-Petersburg State University (2008) — Journalism (Political Science)",
      "M.A./B.A. (cum laude) Public Relations — double degree, Saint-Petersburg State Electrotechnical University and Towson University, USA (1996–2001)",
    ],
    work: [
      "Associate Professor, Faculty of Communication Arts, Chulalongkorn University (October 2014–Present)",
      "Faculty, Faculty of Journalism, PR and Advertising, Saint-Petersburg State University (September 2007–September 2014)",
      "Faculty, PR Department, Saint-Petersburg State Electrotechnical University / LETI (September 2001–September 2009)",
    ],
    focus:
      "Political and legal philosophy of communication, communication theory, cross-cultural communication, strategic communication and public relations",
    email: "pavel.a@chula.ac.th",
    metrics: [
      { label: "Citations (RG)", value: 150 },
      { label: "Publications (RG)", value: 78 },
      { label: "Top paper cites", value: 47 },
    ],
    metricsNote: "อ้างอิง ResearchGate และ Google Scholar (user=1v6dmxQAAAAJ)",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=1v6dmxQAAAAJ&hl=en" },
      { label: "ResearchGate", href: "https://www.researchgate.net/profile/Pavel-Slutskiy" },
      { label: "Faculty Profile", href: "https://www.iscm.commarts.chula.ac.th/faculty-staff/" },
    ],
    publications: [
      {
        title: "Companies’ accountability in sustainability: A comparative analysis of SDGs in five countries",
        venue: "Sustainable Development Goals in the Asian Context",
        year: 2016,
        citations: 47,
      },
      {
        title: "The phenomenon of Trump’s popularity in Russia: Media analysis perspective",
        venue: "American Behavioral Scientist",
        year: 2017,
        citations: 31,
      },
      {
        title: "Communication and Libertarianism",
        venue: "Springer (Book)",
        year: 2021,
        citations: 14,
      },
      {
        title: "Credibility of the official COVID communication in Thailand",
        venue: "American Behavioral Scientist (with S. Boonchutima)",
        year: 2022,
        citations: 6,
      },
    ],
  },
];

export const objectives = [
  {
    number: "01",
    title: "Teaching & Training",
    titleTh: "การเรียนการสอนและการอบรม",
    description:
      "พัฒนาองค์ความรู้และจัดอบรมด้านนวัตกรรมการสื่อสาร ให้กับบุคลากร องค์กร และผู้ที่สนใจนำไปใช้จริง",
  },
  {
    number: "02",
    title: "Community Advocacy",
    titleTh: "การขับเคลื่อนสังคม",
    description:
      "สร้างการรับรู้และขับเคลื่อนประเด็นสำคัญ เพื่อคุณภาพชีวิตและความยั่งยืน ผ่านการสื่อสารที่มีประสิทธิภาพ",
  },
  {
    number: "03",
    title: "Tools & Innovation",
    titleTh: "เครื่องมือและนวัตกรรม",
    description:
      "วิจัยและพัฒนาเครื่องมือ แนวทางปฏิบัติ และนวัตกรรมการสื่อสาร ที่เป็นประโยชน์ต่อสังคมและองค์กร",
  },
];
