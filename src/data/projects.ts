import { projectMedia } from "./projectMedia";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  outcome: string;
  sdg: string;
  sdgLabel: string;
  image: string;
  alt: string;
  gallery: ProjectImage[];
  challenge: string;
  approach: string;
  impact: string;
  sourceUrl: string;
};

/** Full-size image URL from Wix media id */
function media(id: string, ext: string = "jpg"): string {
  return `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_1920,h_1280,al_c,q_90,enc_auto/${id}~mv2.${ext}`;
}

function expandGallery(slug: string, title: string): ProjectImage[] {
  const refs = projectMedia[slug] || [];
  return refs.map((r) => ({
    src: media(r.id, r.ext),
    alt: `${title} — ภาพจริงจากเว็บเดิม ComInnoCenter`,
  }));
}

function cover(slug: string, fallbackId: string, fallbackExt: string = "jpg"): string {
  const refs = projectMedia[slug];
  if (refs && refs.length > 0) return media(refs[0].id, refs[0].ext);
  return media(fallbackId, fallbackExt);
}

export const projects: Project[] = [
  {
    slug: "chula-zero-waste",
    title: "Chula Zero Waste",
    titleEn: "Chula Zero Waste",
    outcome: "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality.",
    sdg: "SDG 12",
    sdgLabel: "Responsible Consumption",
    image: cover("chula-zero-waste", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Chula Zero Waste — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("chula-zero-waste", "Chula Zero Waste"),
    challenge: "The Action Plan for Sustainable Management of Solid and Hazardous Waste at Chulalongkorn University (Chula Zero Waste) (2017-2021) aims to reduce waste within the university by at least 30% by 2021. The plan includes 6 programs and 18 projects.",
    approach: "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality. Collaboration of the Environmental Research Institute, the Office of Physical System Management, and various networks within Chulalongkorn University.",
    impact: "Prototype campaign that communicates waste reduction in a fun, simple and practical way for university communities.",
    sourceUrl: "https://www.cominnocenter.com/post/chula-zero-waste",
  },
  {
    slug: "nbtc-encyclopedia",
    title: "สารานุกรม กสทช.",
    titleEn: "NBTC Encyclopedia",
    outcome: "This encyclopedia compiles important topics, creates connections, explains in language that the younger generation can easily understand, and uses engaging illustrations.",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: cover("nbtc-encyclopedia", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "สารานุกรม กสทช. — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nbtc-encyclopedia", "สารานุกรม กสทช."),
    challenge: "Important telecommunications topics are often complex and hard for younger audiences to understand.",
    approach: "Gathered feedback from younger and older generations, then created a modern encyclopedia with connections, clear language, engaging illustrations, and videos.",
    impact: "A widely readable encyclopedia for the younger generation with illustrations and video support.",
    sourceUrl: "https://www.cominnocenter.com/post/nbtc-encyclopedia",
  },
  {
    slug: "nia-100-faces",
    title: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    outcome: "We gathered 100 innovators (3 Years) who inspire creativity, presenting them through a website, Instagram, a book, and AR images.",
    sdg: "SDG 9",
    sdgLabel: "Industry & Innovation",
    image: cover("nia-100-faces", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA 100 FACES — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-100-faces", "NIA 100 FACES"),
    challenge: "Need to present innovator stories across multiple channels to inspire creativity.",
    approach: "Collected 100 innovators over 3 years and presented them via website, Instagram, book, and AR images — https://www.nia100faces.com/",
    impact: "Multi-platform storytelling of Thailand's innovation inspirers.",
    sourceUrl: "https://www.cominnocenter.com/post/nia-100-faces",
  },
  {
    slug: "nia-media-innovation",
    title: "NIA Media Innovation",
    titleEn: "NIA Media Innovation",
    outcome: "Research on the meaning of media innovation and a small projection mapping display event for NIA.",
    sdg: "SDG 9",
    sdgLabel: "Industry & Innovation",
    image: cover("nia-media-innovation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Media Innovation — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-media-innovation", "NIA Media Innovation"),
    challenge: "Need to define and communicate the meaning of media innovation through research and an immersive event.",
    approach: "Compiled research, produced the event including lighting and sound, created a small projection mapping display, and invited experts for interviews.",
    impact: "Research report and an engaging media innovation event experience.",
    sourceUrl: "https://www.cominnocenter.com/post/nia-media-innovation",
  },
  {
    slug: "nia-satisfaction-survey-2020",
    title: "NIA Satisfaction Survey 2020",
    titleEn: "NIA Satisfaction Survey 2020",
    outcome: "Customer satisfaction survey using mixed methods for the National Innovation Agency (Public Organization).",
    sdg: "SDG 9",
    sdgLabel: "Industry & Innovation",
    image: cover("nia-satisfaction-survey-2020", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Satisfaction Survey 2020 — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-satisfaction-survey-2020", "NIA Satisfaction Survey 2020"),
    challenge: "Support service development for NIA through rigorous customer satisfaction measurement.",
    approach: "Conducted a customer satisfaction survey using mixed methods.",
    impact: "Evidence base for improving NIA services.",
    sourceUrl: "https://www.cominnocenter.com/post/nia-satisfaction-survey-2020",
  },
  {
    slug: "pid-thong-lang-phra-foundation",
    title: "มูลนิธิปิดทองหลังพระ",
    titleEn: "Pid Thong Lang Phra Foundation",
    outcome: "Training on online media production, persuasion techniques, and personality development for foundation trainees.",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: cover("pid-thong-lang-phra-foundation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "มูลนิธิปิดทองหลังพระ — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("pid-thong-lang-phra-foundation", "มูลนิธิปิดทองหลังพระ"),
    challenge: "Foundation staff need practical skills in online media, persuasion, and personality development.",
    approach: "Expert-led training covering simple online media production with PowerPoint, persuasion techniques, and personality development.",
    impact: "Stronger communication capacity for foundation trainees.",
    sourceUrl: "https://www.cominnocenter.com/post/pid-thong-lang-phra-foundation",
  },
  {
    slug: "seeds-for-cu-sustainability",
    title: "Seeds for CU Sustainability",
    titleEn: "Seeds for CU Sustainability",
    outcome: "Project presentation videos in Bangkok and other provinces, from pre-production to post-production, with aerial footage and stakeholder interviews.",
    sdg: "SDG 11",
    sdgLabel: "Sustainable Cities",
    image: cover("seeds-for-cu-sustainability", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Seeds for CU Sustainability — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("seeds-for-cu-sustainability", "Seeds for CU Sustainability"),
    challenge: "Need high-quality presentation videos to communicate sustainability projects across locations.",
    approach: "Full production pipeline with weekly client feedback meetings, aerial footage, and stakeholder interviews.",
    impact: "Videos that showcase commitment to societal sustainability.",
    sourceUrl: "https://www.cominnocenter.com/post/seeds-for-cu-sustainability",
  },
  {
    slug: "department-of-disease-control",
    title: "กรมควบคุมโรค",
    titleEn: "Department of Disease Control",
    outcome: "Workshop on service process design focusing on targeted communication and modern media production techniques.",
    sdg: "SDG 3",
    sdgLabel: "Good Health",
    image: cover("department-of-disease-control", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กรมควบคุมโรค — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("department-of-disease-control", "กรมควบคุมโรค"),
    challenge: "Organization needs stronger targeted communication and modern media production skills.",
    approach: "Workshop on service process design, targeted communication principles, and modern media production techniques.",
    impact: "Improved internal communication and organizational image capabilities.",
    sourceUrl: "https://www.cominnocenter.com/post/department-of-disease-control",
  },
  {
    slug: "creative-tourism-development-project-in-nan-province",
    title: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน",
    titleEn: "Creative Tourism Development Project in Nan Province",
    outcome: "Workshop in Nan to enhance communication skills with photography and video practice for local residents.",
    sdg: "SDG 8",
    sdgLabel: "Decent Work",
    image: cover("creative-tourism-development-project-in-nan-province", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("creative-tourism-development-project-in-nan-province", "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน"),
    challenge: "Local communities in Nan need stronger communication skills for creative tourism.",
    approach: "Open workshop at Namthong Nan Hotel with photography and video equipment, props, lighting, theory and practice sessions.",
    impact: "Participants gained practical knowledge to create more engaging images and stories.",
    sourceUrl: "https://www.cominnocenter.com/post/creative-tourism-development-project-in-nan-province",
  },
  {
    slug: "ministry-of-natural-resources-and-environment",
    title: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    titleEn: "Ministry of Natural Resources and Environment",
    outcome: "Personnel development training on impactful writing and photography for the Department of Environmental Quality Promotion.",
    sdg: "SDG 13",
    sdgLabel: "Climate Action",
    image: cover("ministry-of-natural-resources-and-environment", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("ministry-of-natural-resources-and-environment", "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม"),
    challenge: "Staff need higher efficiency in impactful writing and professional photography.",
    approach: "Training program covering writing techniques, photography, and equipment recommendations.",
    impact: "Elevated professionalism of environmental communication work.",
    sourceUrl: "https://www.cominnocenter.com/post/ministry-of-natural-resources-and-environment",
  },
  {
    slug: "international-labour-organization",
    title: "องค์การแรงงานระหว่างประเทศ (ILO)",
    titleEn: "International Labour Organization",
    outcome: "United Nations workshop on text, photography, videography, and TikTok for sustainable development communication.",
    sdg: "SDG 8",
    sdgLabel: "Decent Work",
    image: cover("international-labour-organization", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "องค์การแรงงานระหว่างประเทศ (ILO) — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("international-labour-organization", "องค์การแรงงานระหว่างประเทศ (ILO)"),
    challenge: "Need practical media skills for presenting individual and group projects in a UN sustainability context.",
    approach: "Workshop teaching text usage, photography, videography, and TikTok production techniques.",
    impact: "Participants equipped to produce higher-quality project communication.",
    sourceUrl: "https://www.cominnocenter.com/post/international-labour-organization",
  },
  {
    slug: "asean-university-network",
    title: "ASEAN University Network",
    titleEn: "ASEAN University Network",
    outcome: "Annual Report design for ASEAN University Network (2016–2019) with print-ready and digital versions.",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: cover("asean-university-network", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ASEAN University Network — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("asean-university-network", "ASEAN University Network"),
    challenge: "Need a creative modern annual report aligned with AUN's identity for print and digital channels.",
    approach: "Designed graphics and layout, delivered print-ready files, and smaller digital files for web viewing.",
    impact: "High-quality print and digital annual reports for 2016–2019.",
    sourceUrl: "https://www.cominnocenter.com/post/asean-university-network",
  },
  {
    slug: "itd",
    title: "ITD",
    titleEn: "ITD",
    outcome: "Meeting to gather opinions and analyze trends on digital commerce for Thai SMEs and global trade adaptation.",
    sdg: "SDG 8",
    sdgLabel: "Decent Work",
    image: cover("itd", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ITD — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("itd", "ITD"),
    challenge: "Need structured dialogue on digital commerce opportunities for Thai SMEs and global trade adaptation.",
    approach: "Organized meetings to gather opinions and analyze trends on key economic topics.",
    impact: "Insights to support policy and SME adaptation discussions.",
    sourceUrl: "https://www.cominnocenter.com/post/__itd",
  },
  {
    slug: "sri-trang-agro-industry",
    title: "ศรีตรังแอโกรอินดัสทรี",
    titleEn: "Sri Trang Agro-Industry",
    outcome: "อบรมสร้างคอนเทนต์ออนไลน์และวิดีโอเพื่อการเรียนรู้ในองค์กร ให้พนักงานบริษัท ศรีตรังแอโกรอินดัสทรี จำกัด (มหาชน)",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: cover("sri-trang-agro-industry", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ศรีตรังแอโกรอินดัสทรี — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("sri-trang-agro-industry", "ศรีตรังแอโกรอินดัสทรี"),
    challenge: "องค์กรต้องการพัฒนาศักยภาพพนักงานให้สร้างสื่อวิดีโอและบันทึกหน้าจอ เพื่อใช้ในการเรียนรู้ภายในองค์กรอย่างต่อเนื่อง",
    approach: "ศูนย์ฯ ร่วมกับสถาบันภาษาไทยสิรินธร จุฬาฯ จัดอบรม Online Content Creation ระหว่าง 20–21 ก.ค. 2565 ณ ศูนย์ประชุมบุรีศรีภู อ.หาดใหญ่",
    impact: "พนักงานสามารถผลิตสื่อวิดีโอและสื่อการเรียนรู้ด้วยตนเอง รองรับการเรียนรู้ภายในองค์กรอย่างยั่งยืน",
    sourceUrl: "https://www.cominnocenter.com/post/sri-trang-agro-industry",
  },
  {
    slug: "empowering-youth-leaders",
    title: "เสริมพลังผู้นำเยาวชน",
    titleEn: "Empowering Youth Leaders",
    outcome: "อบรมผู้นำเยาวชนและพี่เลี้ยง 3 จังหวัดชายแดนใต้ ให้วางแผน ดำเนิน และประเมินกิจกรรมด้านสุขภาวะทางเพศ กาย และใจ",
    sdg: "SDG 3",
    sdgLabel: "Good Health",
    image: cover("empowering-youth-leaders", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "เสริมพลังผู้นำเยาวชน — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("empowering-youth-leaders", "เสริมพลังผู้นำเยาวชน"),
    challenge: "เยาวชนและพี่เลี้ยงในพื้นที่ภาคใต้ต้องการทักษะการออกแบบกิจกรรมที่ส่งเสริมสุขภาวะทางเพศ กาย และใจอย่างมีส่วนร่วม",
    approach: "จัดเวิร์กช็อปโดย รศ.ดร.สมิทธิ์ ร่วมกับ Look South Peace ระหว่าง 10–13 พ.ย. 2566 ที่พัทลุง ถ่ายทอดประสบการณ์จาก Impulse Bangkok",
    impact: "ผู้เข้าร่วมสามารถวางแผนกิจกรรมอย่างสร้างสรรค์ และมีศักยภาพเป็นพี่เลี้ยง สร้างพื้นที่ปลอดภัยให้เยาวชนรุ่นใหม่",
    sourceUrl: "https://www.cominnocenter.com/post/empowering-youth-leaders",
  },
  {
    slug: "care-d-plus",
    title: "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ",
    titleEn: "Care D Plus Public & Social Communication Training",
    outcome: "อบรมบุคลากรสาธารณสุขทั่วประเทศกว่า 10,000 คน ด้านทักษะการสื่อสารด้วยความเข้าใจและเห็นอกเห็นใจ",
    sdg: "SDG 3",
    sdgLabel: "Good Health",
    image: cover("care-d-plus", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("care-d-plus", "Care D Plus — การสื่อสารสาธารณะและสังคมในระบบสุขภาพ"),
    challenge: "กว่า 90% ของความขัดแย้งและร้องเรียนในสถานพยาบาลเกิดจากการสื่อสารที่ล้มเหลวหรือการจัดการวิกฤตไม่เพียงพอ",
    approach: "จุฬาฯ ร่วมกับ สธ. พัฒนาหลักสูตร Care D+ (ทีมหัวใจ) 7 หน่วยหลัก อบรมผู้บริหาร เจ้าหน้าที่ และอาสาสมัครสื่อสารสุขภาพทั่วประเทศ (10 พ.ย. 2566 – 30 มิ.ย. 2567)",
    impact: "ยกระดับการสื่อสารด้วยความเมตตา เข้าใจ และเคารพซึ่งกันและกัน ระหว่างผู้ป่วย ญาติ และบุคลากรสาธารณสุข",
    sourceUrl: "https://www.cominnocenter.com/post/the-training-program-for-driving-public-and-social-communication-care-d-plus",
  },
  {
    slug: "media-communication-transnational-citizens",
    title: "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens",
    titleEn: "Online Course: Media & Communication for Transnational Citizens",
    outcome: "เปิดหลักสูตรออนไลน์ 12 เดือน สำหรับ digital nomads และ global talents ในไทย บนแพลตฟอร์ม The Sharpener School",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image: cover("media-communication-transnational-citizens", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("media-communication-transnational-citizens", "หลักสูตรออนไลน์ Media & Communication for Transnational Citizens"),
    challenge: "กลุ่ม digital nomads และผู้มีความสามารถจากต่างประเทศในไทยต้องการทักษะการสื่อสารและความเข้าใจวัฒนธรรมเพื่อใช้ชีวิตและทำงานในไทย",
    approach: "ศูนย์ฯ โดย รศ.ดร.สมิทธิ์ พัฒนาหลักสูตร 12 เดือน ร่วมกับ The Sharpener School และ Chula Unisearch เริ่ม 1 ส.ค. 2567",
    impact: "ผู้เรียนได้รับหนังสือยืนยันและประกาศนียบัตรจากคณะนิเทศศาสตร์ พร้อมทักษะสื่อสารข้ามวัฒนธรรมที่ใช้ได้จริง",
    sourceUrl: "https://www.cominnocenter.com/post/center-of-excellence-in-communication-innovation-launches-groundbreaking-online-course-for-digital-n",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
