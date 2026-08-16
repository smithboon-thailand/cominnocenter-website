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
    outcome: "สร้างต้นแบบแคมเปญลดขยะในมหาวิทยาลัยที่นำโดยนิสิต เน้นความสนุก สดใส เรียบง่าย และปฏิบัติได้จริง",
    sdg: [12, 11, 13],
    image: cover("chula-zero-waste", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Chula Zero Waste — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("chula-zero-waste", "Chula Zero Waste"),
    challenge: "แผนปฏิบัติการการจัดการขยะมูลฝอยและขยะอันตรายอย่างยั่งยืนในจุฬาลงกรณ์มหาวิทยาลัย (Chula Zero Waste) (พ.ศ. 2560–2564) ตั้งเป้าลดขยะในมหาวิทยาลัยอย่างน้อย 30% ภายในปี 2564 ประกอบด้วย 6 แผนงาน 18 โครงการ",
    approach: "สร้างต้นแบบแคมเปญลดขยะที่นำโดยนิสิต เน้นความสนุก สดใส เรียบง่าย และปฏิบัติได้จริง โดยความร่วมมือของสถาบันวิจัยสภาวะแวดล้อม สำนักบริหารระบบกายภาพ และเครือข่ายต่างๆ ภายในจุฬาฯ",
    impact: "ต้นแบบแคมเปญที่สื่อสารเรื่องการลดขยะอย่างสนุก เรียบง่าย และใช้ได้จริงสำหรับชุมชนมหาวิทยาลัย",
    sourceUrl: "/news/chula-zero-waste",
  },
  {
    slug: "nbtc-encyclopedia",
    title: "สารานุกรม กสทช.",
    titleEn: "NBTC Encyclopedia",
    outcome: "สารานุกรมที่รวบรวมหัวข้อสำคัญ สร้างความเชื่อมโยง อธิบายด้วยภาษาที่คนรุ่นใหม่เข้าใจง่าย พร้อมภาพประกอบที่น่าสนใจ",
    sdg: [4, 9],
    image: cover("nbtc-encyclopedia", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "สารานุกรม กสทช. — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nbtc-encyclopedia", "สารานุกรม กสทช."),
    challenge: "หัวข้อโทรคมนาคมที่สำคัญมักซับซ้อนและเข้าใจยากสำหรับผู้อ่านรุ่นใหม่",
    approach: "รับฟังความคิดเห็นจากทั้งคนรุ่นใหม่และรุ่นใหญ่ แล้วจัดทำสารานุกรมสมัยใหม่ที่เชื่อมโยงเนื้อหา ใช้ภาษาเข้าใจง่าย มีภาพประกอบที่น่าสนใจและวิดีโอ",
    impact: "สารานุกรมที่คนรุ่นใหม่อ่านได้อย่างแพร่หลาย พร้อมภาพประกอบและวิดีโอสนับสนุน",
    sourceUrl: "/news/nbtc-encyclopedia",
  },
  {
    slug: "nia-100-faces",
    title: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    outcome: "รวบรวมนวัตกร 100 คน (ตลอด 3 ปี) ผู้สร้างแรงบันดาลใจด้านความคิดสร้างสรรค์ นำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR",
    sdg: [9],
    image: cover("nia-100-faces", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA 100 FACES — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-100-faces", "NIA 100 FACES"),
    challenge: "ต้องนำเสนอเรื่องราวของนวัตกรผ่านหลายช่องทาง เพื่อจุดประกายความคิดสร้างสรรค์",
    approach: "รวบรวมนวัตกร 100 คนตลอด 3 ปี นำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR — www.nia100faces.com",
    impact: "การเล่าเรื่องผู้สร้างแรงบันดาลใจด้านนวัตกรรมของไทยแบบหลายแพลตฟอร์ม",
    sourceUrl: "/news/nia-100-faces",
  },
  {
    slug: "nia-media-innovation",
    title: "NIA Media Innovation",
    titleEn: "NIA Media Innovation",
    outcome: "งานวิจัยความหมายของนวัตกรรมสื่อ และการจัดแสดง Projection Mapping ขนาดเล็กให้สำนักงานนวัตกรรมแห่งชาติ",
    sdg: [9],
    image: cover("nia-media-innovation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Media Innovation — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-media-innovation", "NIA Media Innovation"),
    challenge: "ต้องนิยามและสื่อสารความหมายของนวัตกรรมสื่อ ผ่านงานวิจัยและงานแสดงที่สร้างประสบการณ์ร่วม",
    approach: "รวบรวมงานวิจัย ดำเนินการจัดงานพร้อมดูแลแสงและเสียง สร้างการแสดง Projection Mapping ขนาดเล็ก และเชิญผู้เชี่ยวชาญให้สัมภาษณ์ภายในงาน",
    impact: "รายงานวิจัยและประสบการณ์งานนวัตกรรมสื่อที่น่าประทับใจ",
    sourceUrl: "/news/nia-media-innovation",
  },
  {
    slug: "nia-satisfaction-survey-2020",
    title: "NIA Satisfaction Survey 2020",
    titleEn: "NIA Satisfaction Survey 2020",
    outcome: "สำรวจความพึงพอใจของผู้รับบริการด้วยระเบียบวิธีวิจัยแบบผสมผสาน ให้สำนักงานนวัตกรรมแห่งชาติ (องค์การมหาชน)",
    sdg: [9, 16],
    image: cover("nia-satisfaction-survey-2020", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "NIA Satisfaction Survey 2020 — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("nia-satisfaction-survey-2020", "NIA Satisfaction Survey 2020"),
    challenge: "สนับสนุนการพัฒนางานบริการของสำนักงานนวัตกรรมแห่งชาติ ด้วยการวัดความพึงพอใจอย่างเป็นระบบ",
    approach: "สำรวจความพึงพอใจของผู้รับบริการโดยใช้ระเบียบวิธีวิจัยแบบผสมผสาน",
    impact: "ฐานข้อมูลเชิงหลักฐานสำหรับพัฒนางานบริการของสำนักงานนวัตกรรมแห่งชาติ",
    sourceUrl: "/news/nia-satisfaction-survey-2020",
  },
  {
    slug: "pid-thong-lang-phra-foundation",
    title: "มูลนิธิปิดทองหลังพระ",
    titleEn: "Pid Thong Lang Phra Foundation",
    outcome: "อบรมการผลิตสื่อออนไลน์ เทคนิคการโน้มน้าวใจ และการพัฒนาบุคลิกภาพ ให้ผู้เข้าอบรมของมูลนิธิปิดทองหลังพระ",
    sdg: [4, 1],
    image: cover("pid-thong-lang-phra-foundation", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "มูลนิธิปิดทองหลังพระ — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("pid-thong-lang-phra-foundation", "มูลนิธิปิดทองหลังพระ"),
    challenge: "บุคลากรของมูลนิธิต้องการทักษะภาคปฏิบัติด้านสื่อออนไลน์ การโน้มน้าวใจ และการพัฒนาบุคลิกภาพ",
    approach: "อบรมโดยวิทยากรผู้เชี่ยวชาญ ครอบคลุมการผลิตสื่อออนไลน์อย่างง่ายด้วย PowerPoint เทคนิคการโน้มน้าวใจ และการพัฒนาบุคลิกภาพ",
    impact: "ศักยภาพการสื่อสารที่เข้มแข็งขึ้นของผู้เข้าอบรมจากมูลนิธิ",
    sourceUrl: "/news/pid-thong-lang-phra-foundation",
  },
  {
    slug: "seeds-for-cu-sustainability",
    title: "Seeds for CU Sustainability",
    titleEn: "Seeds for CU Sustainability",
    outcome: "วิดีโอนำเสนอโครงการทั้งในกรุงเทพฯ และต่างจังหวัด ครบตั้งแต่ก่อนถ่ายทำจนถึงตัดต่อ พร้อมภาพมุมสูงและบทสัมภาษณ์ผู้เกี่ยวข้อง",
    sdg: [11, 13],
    image: cover("seeds-for-cu-sustainability", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "Seeds for CU Sustainability — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("seeds-for-cu-sustainability", "Seeds for CU Sustainability"),
    challenge: "ต้องการวิดีโอนำเสนอคุณภาพสูง เพื่อสื่อสารโครงการความยั่งยืนในหลายพื้นที่",
    approach: "ผลิตครบทั้งกระบวนการ พร้อมประชุมรับความคิดเห็นจากผู้ว่าจ้างทุกสัปดาห์ ถ่ายภาพมุมสูง และสัมภาษณ์ผู้มีส่วนเกี่ยวข้อง",
    impact: "วิดีโอที่สะท้อนความมุ่งมั่นต่อความยั่งยืนของสังคม",
    sourceUrl: "/news/seeds-for-cu-sustainability",
  },
  {
    slug: "department-of-disease-control",
    title: "กรมควบคุมโรค",
    titleEn: "Department of Disease Control",
    outcome: "เวิร์กช็อปการออกแบบกระบวนการให้บริการ เน้นการสื่อสารเจาะกลุ่มเป้าหมายและเทคนิคการผลิตสื่อสมัยใหม่",
    sdg: [3],
    image: cover("department-of-disease-control", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กรมควบคุมโรค — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("department-of-disease-control", "กรมควบคุมโรค"),
    challenge: "องค์กรต้องการเสริมทักษะการสื่อสารแบบเจาะจงกลุ่มเป้าหมายและการผลิตสื่อสมัยใหม่",
    approach: "เวิร์กช็อปการออกแบบกระบวนการบริการ หลักการสื่อสารเจาะกลุ่มเป้าหมาย และเทคนิคการผลิตสื่อสมัยใหม่",
    impact: "การสื่อสารภายในองค์กรและภาพลักษณ์องค์กรที่ดีขึ้น",
    sourceUrl: "/news/department-of-disease-control",
  },
  {
    slug: "creative-tourism-development-project-in-nan-province",
    title: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน",
    titleEn: "Creative Tourism Development Project in Nan Province",
    outcome: "เวิร์กช็อปที่จังหวัดน่าน เสริมทักษะการสื่อสาร พร้อมฝึกปฏิบัติถ่ายภาพและวิดีโอให้คนในพื้นที่",
    sdg: [8, 11],
    image: cover("creative-tourism-development-project-in-nan-province", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("creative-tourism-development-project-in-nan-province", "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน"),
    challenge: "ชุมชนท้องถิ่นในน่านต้องการทักษะการสื่อสารที่เข้มแข็งขึ้นเพื่อการท่องเที่ยวเชิงสร้างสรรค์",
    approach: "เวิร์กช็อปเปิดรับผู้สนใจ ณ โรงแรมน้ำทองน่าน พร้อมอุปกรณ์ถ่ายภาพและวิดีโอ พร็อพ และแสง มีทั้งภาคทฤษฎีและภาคปฏิบัติ",
    impact: "ผู้เข้าร่วมได้ความรู้ที่ใช้ได้จริง สร้างภาพและเรื่องเล่าที่น่าสนใจยิ่งขึ้น",
    sourceUrl: "/news/creative-tourism-development-project-in-nan-province",
  },
  {
    slug: "ministry-of-natural-resources-and-environment",
    title: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    titleEn: "Ministry of Natural Resources and Environment",
    outcome: "อบรมพัฒนาบุคลากรด้านการเขียนให้ทรงพลังและการถ่ายภาพ ให้กรมส่งเสริมคุณภาพสิ่งแวดล้อม",
    sdg: [13, 15],
    image: cover("ministry-of-natural-resources-and-environment", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("ministry-of-natural-resources-and-environment", "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม"),
    challenge: "บุคลากรต้องการเพิ่มประสิทธิภาพด้านการเขียนที่ทรงพลังและการถ่ายภาพระดับมืออาชีพ",
    approach: "หลักสูตรอบรมครอบคลุมเทคนิคการเขียน การถ่ายภาพ และการแนะนำอุปกรณ์ที่เหมาะสม",
    impact: "ยกระดับความเป็นมืออาชีพของงานสื่อสารด้านสิ่งแวดล้อม",
    sourceUrl: "/news/ministry-of-natural-resources-and-environment",
  },
  {
    slug: "international-labour-organization",
    title: "องค์การแรงงานระหว่างประเทศ (ILO)",
    titleEn: "International Labour Organization",
    outcome: "เวิร์กช็อปร่วมกับสหประชาชาติ สอนการใช้ข้อความ การถ่ายภาพ วิดีโอ และ TikTok เพื่อการสื่อสารการพัฒนาที่ยั่งยืน",
    sdg: [8, 17],
    image: cover("international-labour-organization", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "องค์การแรงงานระหว่างประเทศ (ILO) — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("international-labour-organization", "องค์การแรงงานระหว่างประเทศ (ILO)"),
    challenge: "ต้องการทักษะสื่อภาคปฏิบัติสำหรับนำเสนอโครงการเดี่ยวและกลุ่ม ในบริบทความยั่งยืนของสหประชาชาติ",
    approach: "เวิร์กช็อปสอนการใช้ข้อความ การถ่ายภาพ การถ่ายวิดีโอ และเทคนิคการผลิต TikTok",
    impact: "ผู้เข้าร่วมพร้อมผลิตงานสื่อสารโครงการที่มีคุณภาพสูงขึ้น",
    sourceUrl: "/news/international-labour-organization",
  },
  {
    slug: "asean-university-network",
    title: "ASEAN University Network",
    titleEn: "ASEAN University Network",
    outcome: "ออกแบบรายงานประจำปีให้ ASEAN University Network (2016–2019) ทั้งฉบับพร้อมพิมพ์และฉบับดิจิทัล",
    sdg: [4, 17],
    image: cover("asean-university-network", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ASEAN University Network — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("asean-university-network", "ASEAN University Network"),
    challenge: "ต้องการรายงานประจำปีที่สร้างสรรค์ทันสมัย สอดคล้องกับอัตลักษณ์ของ AUN ทั้งช่องทางสิ่งพิมพ์และดิจิทัล",
    approach: "ออกแบบกราฟิกและเลย์เอาต์ ส่งมอบไฟล์พร้อมพิมพ์ให้โรงพิมพ์ และไฟล์ขนาดเล็กสำหรับเปิดอ่านบนเว็บ",
    impact: "รายงานประจำปีคุณภาพสูงทั้งฉบับพิมพ์และดิจิทัล ปี 2016–2019",
    sourceUrl: "/news/asean-university-network",
  },
  {
    slug: "itd",
    title: "ITD",
    titleEn: "ITD",
    outcome: "ประชุมรับฟังความคิดเห็นและวิเคราะห์แนวโน้ม การค้าดิจิทัลกับโอกาสของ SMEs ไทย และการปรับตัวของการค้าระหว่างประเทศ",
    sdg: [8, 9],
    image: cover("itd", "25218b_f6216a7ef06f4409af9b7767ede4ae4e"),
    alt: "ITD — ภาพจริงจากเว็บเดิม ComInnoCenter",
    gallery: expandGallery("itd", "ITD"),
    challenge: "ต้องการเวทีหารืออย่างเป็นระบบ เรื่องโอกาสการค้าดิจิทัลของ SMEs ไทยและการปรับตัวต่อการค้าโลก",
    approach: "จัดประชุมรับฟังความคิดเห็นและวิเคราะห์แนวโน้มประเด็นเศรษฐกิจสำคัญ",
    impact: "ข้อมูลเชิงลึกสนับสนุนการหารือเชิงนโยบายและการปรับตัวของ SMEs",
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
