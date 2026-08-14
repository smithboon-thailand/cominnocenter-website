import { projectMedia } from "./projectMedia";
import type { SdgId } from "./sdg";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  outcome: string;
  /**
   * เป้าหมาย SDG ของโครงการ — ตัวแรกคือสีหลักของการ์ด (BRAND.md I2)
   * เกณฑ์การ map: อิงผลลัพธ์ปลายทางของโครงการ ไม่ใช่รูปแบบกิจกรรม
   * ใส่เป้าหมายรองเฉพาะที่เนื้องานรองรับจริง (ดู CLAUDE.md)
   */
  sdg: SdgId[];
  image: string;
  alt: string;
  gallery: ProjectImage[];
  challenge: string;
  approach: string;
  impact: string;
  sourceUrl: string;
};

/** Self-hosted gallery image — ดาวน์โหลดจาก Wix มาไว้ที่ public/images/projects/ (Phase 0, ดู scripts/wix-image-manifest.json) */
function media(slug: string, id: string): string {
  return `/images/projects/${slug}/${id}.webp`;
}

function expandGallery(slug: string, title: string): ProjectImage[] {
  const refs = projectMedia[slug] || [];
  return refs.map((r) => ({
    src: media(slug, r.id),
    alt: `${title} — ภาพจริงจากเว็บเดิม ComInnoCenter`,
  }));
}

function cover(slug: string, fallbackId: string, fallbackSlug: string = "chula-zero-waste"): string {
  const refs = projectMedia[slug];
  if (refs && refs.length > 0) return media(slug, refs[0].id);
  return media(fallbackSlug, fallbackId);
}

export const projects: Project[] = [
  {
    slug: "chula-zero-waste",
    title: "Chula Zero Waste",
    titleEn: "Chula Zero Waste",
    outcome: "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality.",
    sdg: [12, 11, 13],
    image: cover("chula-zero-waste", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Chula Zero Waste — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("chula-zero-waste", "Chula Zero Waste"),
    challenge: "The Action Plan for Sustainable Management of Solid and Hazardous Waste at Chulalongkorn University (Chula Zero Waste) (2017-2021) aims to reduce waste within the university by at least 30% by 2021. The plan includes 6 programs and 18 projects.",
    approach: "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality. Collaboration of the Environmental Research Institute, the Office of Physical System Management, and various networks within Chulalongkorn University.",
    impact: "Prototype campaign that communicates waste reduction in a fun, simple and practical way for university communities.",
    sourceUrl: "/news/chula-zero-waste",
  },
  {
    slug: "nbtc-encyclopedia",
    title: "สารานุกรม กสทช.",
    titleEn: "NBTC Encyclopedia",
    outcome: "This encyclopedia compiles important topics, creates connections, explains in language that the younger generation can easily understand, and uses engaging illustrations.",
    sdg: [4, 9],
    image: cover("nbtc-encyclopedia", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "สารานุกรม กสทช. — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nbtc-encyclopedia", "สารานุกรม กสทช."),
    challenge: "Important telecommunications topics are often complex and hard for younger audiences to understand.",
    approach: "Gathered feedback from younger and older generations, then created a modern encyclopedia with connections, clear language, engaging illustrations, and videos.",
    impact: "A widely readable encyclopedia for the younger generation with illustrations and video support.",
    sourceUrl: "/news/nbtc-encyclopedia",
  },
  {
    slug: "nia-100-faces",
    title: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    outcome: "We gathered 100 innovators (3 Years) who inspire creativity, presenting them through a website, Instagram, a book, and AR images.",
    sdg: [9],
    image: cover("nia-100-faces", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA 100 FACES — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-100-faces", "NIA 100 FACES"),
    challenge: "Need to present innovator stories across multiple channels to inspire creativity.",
    approach: "Collected 100 innovators over 3 years and presented them via website, Instagram, book, and AR images — https://www.nia100faces.com/",
    impact: "Multi-platform storytelling of Thailand's innovation inspirers.",
    sourceUrl: "/news/nia-100-faces",
  },
  {
    slug: "nia-media-innovation",
    title: "NIA Media Innovation",
    titleEn: "NIA Media Innovation",
    outcome: "Research on the meaning of media innovation and a small projection mapping display event for NIA.",
    sdg: [9],
    image: cover("nia-media-innovation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Media Innovation — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-media-innovation", "NIA Media Innovation"),
    challenge: "Need to define and communicate the meaning of media innovation through research and an immersive event.",
    approach: "Compiled research, produced the event including lighting and sound, created a small projection mapping display, and invited experts for interviews.",
    impact: "Research report and an engaging media innovation event experience.",
    sourceUrl: "/news/nia-media-innovation",
  },
  {
    slug: "nia-satisfaction-survey-2020",
    title: "NIA Satisfaction Survey 2020",
    titleEn: "NIA Satisfaction Survey 2020",
    outcome: "Customer satisfaction survey using mixed methods for the National Innovation Agency (Public Organization).",
    sdg: [9, 16],
    image: cover("nia-satisfaction-survey-2020", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Satisfaction Survey 2020 — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-satisfaction-survey-2020", "NIA Satisfaction Survey 2020"),
    challenge: "Support service development for NIA through rigorous customer satisfaction measurement.",
    approach: "Conducted a customer satisfaction survey using mixed methods.",
    impact: "Evidence base for improving NIA services.",
    sourceUrl: "/news/nia-satisfaction-survey-2020",
  },
  {
    slug: "pid-thong-lang-phra-foundation",
    title: "มูลนิธิปิดทองหลังพระ",
    titleEn: "Pid Thong Lang Phra Foundation",
    outcome: "Training on online media production, persuasion techniques, and personality development for foundation trainees.",
    sdg: [4, 1],
    image: cover("pid-thong-lang-phra-foundation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "มูลนิธิปิดทองหลังพระ — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("pid-thong-lang-phra-foundation", "มูลนิธิปิดทองหลังพระ"),
    challenge: "Foundation staff need practical skills in online media, persuasion, and personality development.",
    approach: "Expert-led training covering simple online media production with PowerPoint, persuasion techniques, and personality development.",
    impact: "Stronger communication capacity for foundation trainees.",
    sourceUrl: "/news/pid-thong-lang-phra-foundation",
  },
  {
    slug: "seeds-for-cu-sustainability",
    title: "Seeds for CU Sustainability",
    titleEn: "Seeds for CU Sustainability",
    outcome: "Project presentation videos in Bangkok and other provinces, from pre-production to post-production, with aerial footage and stakeholder interviews.",
    sdg: [11, 13],
    image: cover("seeds-for-cu-sustainability", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Seeds for CU Sustainability — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("seeds-for-cu-sustainability", "Seeds for CU Sustainability"),
    challenge: "Need high-quality presentation videos to communicate sustainability projects across locations.",
    approach: "Full production pipeline with weekly client feedback meetings, aerial footage, and stakeholder interviews.",
    impact: "Videos that showcase commitment to societal sustainability.",
    sourceUrl: "/news/seeds-for-cu-sustainability",
  },
  {
    slug: "department-of-disease-control",
    title: "กรมควบคุมโรค",
    titleEn: "Department of Disease Control",
    outcome: "Workshop on service process design focusing on targeted communication and modern media production techniques.",
    sdg: [3],
    image: cover("department-of-disease-control", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กรมควบคุมโรค — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("department-of-disease-control", "กรมควบคุมโรค"),
    challenge: "Organization needs stronger targeted communication and modern media production skills.",
    approach: "Workshop on service process design, targeted communication principles, and modern media production techniques.",
    impact: "Improved internal communication and organizational image capabilities.",
    sourceUrl: "/news/department-of-disease-control",
  },
  {
    slug: "creative-tourism-development-project-in-nan-province",
    title: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน",
    titleEn: "Creative Tourism Development Project in Nan Province",
    outcome: "Workshop in Nan to enhance communication skills with photography and video practice for local residents.",
    sdg: [8, 11],
    image: cover("creative-tourism-development-project-in-nan-province", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("creative-tourism-development-project-in-nan-province", "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน"),
    challenge: "Local communities in Nan need stronger communication skills for creative tourism.",
    approach: "Open workshop at Namthong Nan Hotel with photography and video equipment, props, lighting, theory and practice sessions.",
    impact: "Participants gained practical knowledge to create more engaging images and stories.",
    sourceUrl: "/news/creative-tourism-development-project-in-nan-province",
  },
  {
    slug: "ministry-of-natural-resources-and-environment",
    title: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    titleEn: "Ministry of Natural Resources and Environment",
    outcome: "Personnel development training on impactful writing and photography for the Department of Environmental Quality Promotion.",
    sdg: [13, 15],
    image: cover("ministry-of-natural-resources-and-environment", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("ministry-of-natural-resources-and-environment", "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม"),
    challenge: "Staff need higher efficiency in impactful writing and professional photography.",
    approach: "Training program covering writing techniques, photography, and equipment recommendations.",
    impact: "Elevated professionalism of environmental communication work.",
    sourceUrl: "/news/ministry-of-natural-resources-and-environment",
  },
  {
    slug: "international-labour-organization",
    title: "องค์การแรงงานระหว่างประเทศ (ILO)",
    titleEn: "International Labour Organization",
    outcome: "United Nations workshop on text, photography, videography, and TikTok for sustainable development communication.",
    sdg: [8, 17],
    image: cover("international-labour-organization", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "องค์การแรงงานระหว่างประเทศ (ILO) — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("international-labour-organization", "องค์การแรงงานระหว่างประเทศ (ILO)"),
    challenge: "Need practical media skills for presenting individual and group projects in a UN sustainability context.",
    approach: "Workshop teaching text usage, photography, videography, and TikTok production techniques.",
    impact: "Participants equipped to produce higher-quality project communication.",
    sourceUrl: "/news/international-labour-organization",
  },
  {
    slug: "asean-university-network",
    title: "ASEAN University Network",
    titleEn: "ASEAN University Network",
    outcome: "Annual Report design for ASEAN University Network (2016–2019) with print-ready and digital versions.",
    sdg: [4, 17],
    image: cover("asean-university-network", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ASEAN University Network — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("asean-university-network", "ASEAN University Network"),
    challenge: "Need a creative modern annual report aligned with AUN's identity for print and digital channels.",
    approach: "Designed graphics and layout, delivered print-ready files, and smaller digital files for web viewing.",
    impact: "High-quality print and digital annual reports for 2016–2019.",
    sourceUrl: "/news/asean-university-network",
  },
  {
    slug: "itd",
    title: "ITD",
    titleEn: "ITD",
    outcome: "Meeting to gather opinions and analyze trends on digital commerce for Thai SMEs and global trade adaptation.",
    sdg: [8, 9],
    image: cover("itd", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ITD — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("itd", "ITD"),
    challenge: "Need structured dialogue on digital commerce opportunities for Thai SMEs and global trade adaptation.",
    approach: "Organized meetings to gather opinions and analyze trends on key economic topics.",
    impact: "Insights to support policy and SME adaptation discussions.",
    sourceUrl: "/news/itd",
  },
  {
    slug: "sri-trang-agro-industry",
    title: "ศรีตรังแอโกรอินดัสทรี",
    titleEn: "Sri Trang Agro-Industry",
    outcome: "อบรมสร้างคอนเทนต์ออนไลน์และวิดีโอเพื่อการเรียนรู้ในองค์กร ให้พนักงานบริษัท ศรีตรังแอโกรอินดัสทรี จำกัด (มหาชน)",
    sdg: [4, 8],
    image: cover("sri-trang-agro-industry", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ศรีตรังแอโกรอินดัสทรี — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("sri-trang-agro-industry", "ศรีตรังแอโกรอินดัสทรี"),
    challenge: "องค์กรต้องการพัฒนาศักยภาพพนักงานให้สร้างสื่อวิดีโอและบันทึกหน้าจอ เพื่อใช้ในการเรียนรู้ภายในองค์กรอย่างต่อเนื่อง",
    approach: "ศูนย์ฯ ร่วมกับสถาบันภาษาไทยสิรินธร จุฬาฯ จัดอบรม Online Content Creation ระหว่าง 20–21 ก.ค. 2565 ณ ศูนย์ประชุมบุรีศรีภู อ.หาดใหญ่",
    impact: "พนักงานสามารถผลิตสื่อวิดีโอและสื่อการเรียนรู้ด้วยตนเอง รองรับการเรียนรู้ภายในองค์กรอย่างยั่งยืน",
    sourceUrl: "/news/sri-trang-agro-industry",
  },
  {
    slug: "empowering-youth-leaders",
    title: "เสริมพลังผู้นำเยาวชน",
    titleEn: "Empowering Youth Leaders",
    outcome: "อบรมผู้นำเยาวชนและพี่เลี้ยง 3 จังหวัดชายแดนใต้ ให้วางแผน ดำเนิน และประเมินกิจกรรมด้านสุขภาวะทางเพศ กาย และใจ",
    sdg: [3, 16, 5],
    image: cover("empowering-youth-leaders", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "เสริมพลังผู้นำเยาวชน — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("empowering-youth-leaders", "เสริมพลังผู้นำเยาวชน"),
    challenge: "เยาวชนและพี่เลี้ยงในพื้นที่ภาคใต้ต้องการทักษะการออกแบบกิจกรรมที่ส่งเสริมสุขภาวะทางเพศ กาย และใจอย่างมีส่วนร่วม",
    approach: "จัดเวิร์กช็อปโดย รศ.ดร.สมิทธิ์ ร่วมกับ Look South Peace ระหว่าง 10–13 พ.ย. 2566 ที่พัทลุง ถ่ายทอดประสบการณ์จาก Impulse Bangkok",
    impact: "ผู้เข้าร่วมสามารถวางแผนกิจกรรมอย่างสร้างสรรค์ และมีศักยภาพเป็นพี่เลี้ยง สร้างพื้นที่ปลอดภัยให้เยาวชนรุ่นใหม่",
    sourceUrl: "/news/empowering-youth-leaders",
  },
  {
    slug: "care-d-plus",
    title: "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ",
    titleEn: "Care D Plus Public & Social Communication Training",
    outcome: "อบรมบุคลากรสาธารณสุขทั่วประเทศกว่า 10,000 คน ด้านทักษะการสื่อสารด้วยความเข้าใจและเห็นอกเห็นใจ",
    sdg: [3, 4],
    image: cover("care-d-plus", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("care-d-plus", "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ"),
    challenge: "กว่า 90% ของความขัดแย้งและร้องเรียนในสถานพยาบาลเกิดจากการสื่อสารที่ล้มเหลวหรือการจัดการวิกฤตไม่เพียงพอ",
    approach: "จุฬาฯ ร่วมกับ สธ. พัฒนาหลักสูตร Care D+ (ทีมหัวใจ) 7 หน่วยหลัก อบรมผู้บริหาร เจ้าหน้าที่ และอาสาสมัครสื่อสารสุขภาพทั่วประเทศ (10 พ.ย. 2566 – 30 มิ.ย. 2567)",
    impact: "ยกระดับการสื่อสารด้วยความเมตตา เข้าใจ และเคารพซึ่งกันและกัน ระหว่างผู้ป่วย ญาติ และบุคลากรสาธารณสุข",
    sourceUrl: "/news/care-d-plus",
  },
  {
    slug: "media-communication-transnational-citizens",
    title: "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens",
    titleEn: "Online Course: Media & Communication for Transnational Citizens",
    outcome: "เปิดหลักสูตรออนไลน์ 12 เดือน สำหรับ digital nomads และ global talents ในไทย บนแพลตฟอร์ม The Sharpener School",
    sdg: [4, 10],
    image: cover("media-communication-transnational-citizens", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("media-communication-transnational-citizens", "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens"),
    challenge: "กลุ่ม digital nomads และผู้มีความสามารถจากต่างประเทศในไทยต้องการทักษะการสื่อสารและความเข้าใจวัฒนธรรมเพื่อใช้ชีวิตและทำงานในไทย",
    approach: "ศูนย์ฯ โดย รศ.ดร.สมิทธิ์ พัฒนาหลักสูตร 12 เดือน ร่วมกับ The Sharpener School และ Chula Unisearch เริ่ม 1 ส.ค. 2567",
    impact: "ผู้เรียนได้รับหนังสือยืนยันและประกาศนียบัตรจากคณะนิเทศศาสตร์ พร้อมทักษะสื่อสารข้ามวัฒนธรรมที่ใช้ได้จริง",
    sourceUrl: "/news/media-communication-transnational-citizens",
  },
  {
    slug: "cultural-communication-program",
    title: "หลักสูตรสื่อสารเชิงวัฒนธรรม จุฬาฯ",
    titleEn: "Cultural Communication Training & Field Study Program",
    outcome: "หลักสูตรอบรมและทัศนศึกษาด้านประวัติศาสตร์ศิลปะและการสื่อสารเชิงวัฒนธรรม รุ่นละ 10 คน โดยศาสตราจารย์เกียรติคุณ ดร.หม่อมราชวงศ์สุริยวุฒิ สุขสวัสดิ์",
    sdg: [4, 11],
    image: "https://cuculturecom-static.vercel.app/course-ayutthaya.jpg",
    alt: "หลักสูตรสื่อสารเชิงวัฒนธรรม จุฬาฯ — ภาพปกหลักสูตรจากเว็บ cuculturecom.com",
    gallery: [
      { src: "https://cuculturecom-static.vercel.app/course-ayutthaya.jpg", alt: "ทัศนศึกษาอยุธยา — หลักสูตรสื่อสารเชิงวัฒนธรรม" },
      { src: "https://cuculturecom-static.vercel.app/course-watwang.jpg", alt: "วัดวัง — หลักสูตรสื่อสารเชิงวัฒนธรรม" },
      { src: "https://cuculturecom-static.vercel.app/course-angkor.jpg", alt: "นครวัด — หลักสูตรสื่อสารเชิงวัฒนธรรม" },
      { src: "https://cuculturecom-static.vercel.app/course-museum.jpg", alt: "พิพิธภัณฑ์ — หลักสูตรสื่อสารเชิงวัฒนธรรม" },
      { src: "https://cuculturecom-static.vercel.app/course-thaiart.jpg", alt: "ศิลปะไทย — หลักสูตรสื่อสารเชิงวัฒนธรรม" },
      { src: "https://cuculturecom-static.vercel.app/expert-suriyawut.jpg", alt: "ศาสตราจารย์เกียรติคุณ ดร.หม่อมราชวงศ์สุริยวุฒิ สุขสวัสดิ์ วิทยากรประจำหลักสูตร" },
    ],
    challenge: "ประชาชนทั่วไปและผู้สนใจมรดกวัฒนธรรมไทยต้องการแหล่งเรียนรู้ที่ถูกต้องจากผู้เชี่ยวชาญระดับประเทศ พร้อมการลงพื้นที่จริง",
    approach: "ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ จัดหลักสูตรอบรมและทัศนศึกษารุ่นละ 10 คน โดยศาสตราจารย์เกียรติคุณ ดร.หม่อมราชวงศ์สุริยวุฒิ สุขสวัสดิ์ พร้อมพัฒนาระบบรับสมัครและเว็บไซต์ใหม่",
    impact: "ผู้เรียนได้รับความรู้ด้านประวัติศาสตร์ศิลปะและการสื่อสารเชิงวัฒนธรรมอย่างถูกต้องจากผู้เชี่ยวชาญ และสามารถนำไปถ่ายทอดต่อได้",
    sourceUrl: "https://www.cuculturecom.com/",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
