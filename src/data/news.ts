/**
 * ข่าว/บทความที่เก็บรักษาจากเว็บเดิม cominnocenter.com (Wix) — Phase 0-C
 *
 * ที่มา: 24 โพสต์จาก /post/... (17 โพสต์โครงการ + 7 โพสต์ข่าวกิจกรรม)
 * ภาพในโพสต์ self-host แล้ว — ดู src/data/newsMedia.ts + scripts/wix-posts-manifest.json
 * เนื้อหาไทย/อังกฤษแยกภาษาตามกติกา i18n (โพสต์ต้นฉบับภาษาเดียวถูกแปลอย่างเป็นธรรมชาติ)
 */
import { newsMedia } from "./newsMedia";

export type NewsPost = {
  slug: string;
  titleTh: string;
  titleEn: string;
  date: string; // YYYY-MM-DD (วันที่เผยแพร่บนเว็บเดิม)
  sourceUrl: string; // URL เดิมบน Wix — เก็บไว้ทำ 301 redirect ใน Phase 0-D
  bodyTh: string[];
  bodyEn: string[];
  relatedProjectSlug?: string;
};

export const newsPosts: NewsPost[] = [
  // ——— โพสต์โครงการ (17) ———
  {
    slug: "chula-zero-waste",
    titleTh: "Chula Zero Waste",
    titleEn: "Chula Zero Waste",
    date: "2024-07-05",
    sourceUrl: "https://www.cominnocenter.com/post/chula-zero-waste",
    relatedProjectSlug: "chula-zero-waste",
    bodyTh: [
      "สร้างต้นแบบแคมเปญลดขยะในมหาวิทยาลัยที่นำโดยนิสิต เน้นความสนุก สดใส เรียบง่าย และนำไปปฏิบัติได้จริง",
      "แผนปฏิบัติการการจัดการขยะมูลฝอยและขยะอันตรายอย่างยั่งยืนในจุฬาลงกรณ์มหาวิทยาลัย (Chula Zero Waste) (พ.ศ. 2560–2564) ตั้งเป้าลดปริมาณขยะภายในมหาวิทยาลัยลงอย่างน้อย 30% ภายในปี 2564 ประกอบด้วย 6 แผนงาน 18 โครงการ ดำเนินงานผ่านความร่วมมือของสถาบันวิจัยสภาวะแวดล้อม สำนักบริหารระบบกายภาพ และเครือข่ายต่างๆ ภายในจุฬาลงกรณ์มหาวิทยาลัย",
    ],
    bodyEn: [
      "Create a campaign prototype for reducing waste in the university led by students, emphasizing fun, brightness, simplicity, and practicality.",
      "The Action Plan for Sustainable Management of Solid and Hazardous Waste at Chulalongkorn University (Chula Zero Waste) (2017–2021) aims to reduce waste within the university by at least 30% by 2021. The plan includes 6 programs and 18 projects, implemented through the collaboration of the Environmental Research Institute, the Office of Physical System Management, and various networks within Chulalongkorn University.",
    ],
  },
  {
    slug: "nbtc-encyclopedia",
    titleTh: "สารานุกรม กสทช.",
    titleEn: "NBTC Encyclopedia",
    date: "2024-07-05",
    sourceUrl: "https://www.cominnocenter.com/post/nbtc-encyclopedia",
    relatedProjectSlug: "nbtc-encyclopedia",
    bodyTh: [
      "สารานุกรมเล่มนี้รวบรวมหัวข้อสำคัญ สร้างความเชื่อมโยง อธิบายด้วยภาษาที่คนรุ่นใหม่เข้าใจง่าย และใช้ภาพประกอบที่น่าสนใจ",
      "เราเริ่มจากการรับฟังความคิดเห็นจากทั้งคนรุ่นใหม่และรุ่นใหญ่ เพื่อให้สารานุกรมเล่มนี้เป็นที่อ่านอย่างแพร่หลาย จากนั้นจึงจัดทำสารานุกรมสมัยใหม่ที่เชื่อมโยงเนื้อหา อธิบายหัวข้อต่างๆ ให้คนรุ่นใหม่เข้าใจได้ง่าย พร้อมภาพประกอบที่น่าสนใจ และมีวิดีโอสำหรับผู้ที่ชอบรับฟังอีกด้วย",
    ],
    bodyEn: [
      "This encyclopedia compiles important topics, creates connections, explains in language that the younger generation can easily understand, and uses engaging illustrations.",
      "We started by gathering feedback from both the younger and older generations to ensure that this encyclopedia would be widely read. With the feedback in hand, we created a modern encyclopedia that makes connections, explains topics in an easily understandable way for the younger generation, and uses interesting illustrations. Additionally, it includes videos for those who prefer to listen.",
    ],
  },
  {
    slug: "nia-100-faces",
    titleTh: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/nia-100-faces",
    relatedProjectSlug: "nia-100-faces",
    bodyTh: [
      "เรารวบรวมนวัตกร 100 คน (ตลอด 3 ปี) ผู้สร้างแรงบันดาลใจด้านความคิดสร้างสรรค์ นำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR",
      "ชมผลงานได้ที่ www.nia100faces.com",
    ],
    bodyEn: [
      "We gathered 100 innovators (over 3 years) who inspire creativity, presenting them through a website, Instagram, a book, and AR images.",
      "See the showcase at www.nia100faces.com",
    ],
  },
  {
    slug: "nia-media-innovation",
    titleTh: "NIA Media Innovation",
    titleEn: "NIA Media Innovation",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/nia-media-innovation",
    relatedProjectSlug: "nia-media-innovation",
    bodyTh: [
      "รายงานการวิจัยความหมายของ “นวัตกรรมสื่อ” และการจัดแสดง Projection Mapping ขนาดเล็ก",
      "เรารวบรวมงานวิจัยเกี่ยวกับความหมายของ “นวัตกรรมสื่อ” และดำเนินการจัดงาน ดูแลการเตรียมงานทั้งหมดทั้งแสงและเสียง พร้อมสร้างการจัดแสดง Projection Mapping ขนาดเล็ก นอกจากนี้ยังเชิญผู้เชี่ยวชาญมาให้มุมมองเกี่ยวกับนวัตกรรมสื่อผ่านการสัมภาษณ์ภายในงาน",
    ],
    bodyEn: [
      "Report on the research of the meaning of “Media Innovation” and a small projection mapping display.",
      "We compiled research on the meaning of “media innovation” and launched the event, handling all preparations, including lighting and sound, and creating a small projection mapping display. Additionally, we invited experts to provide insights on media innovation through interviews during the event.",
    ],
  },
  {
    slug: "nia-satisfaction-survey-2020",
    titleTh: "NIA Satisfaction Survey 2020",
    titleEn: "NIA Satisfaction Survey 2020",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/nia-satisfaction-survey-2020",
    relatedProjectSlug: "nia-satisfaction-survey-2020",
    bodyTh: [
      "สำรวจความพึงพอใจของผู้รับบริการด้วยระเบียบวิธีวิจัยแบบผสมผสาน",
      "เราสนับสนุนการพัฒนางานบริการของสำนักงานนวัตกรรมแห่งชาติ (องค์การมหาชน) ด้วยการสำรวจความพึงพอใจของผู้รับบริการโดยใช้ระเบียบวิธีวิจัยแบบผสมผสาน",
    ],
    bodyEn: [
      "Customer satisfaction survey using mixed methods.",
      "We supported the development of services for the National Innovation Agency (Public Organization) by conducting a customer satisfaction survey using mixed methods.",
    ],
  },
  {
    slug: "pid-thong-lang-phra-foundation",
    titleTh: "มูลนิธิปิดทองหลังพระ",
    titleEn: "Pid Thong Lang Phra Foundation",
    date: "2024-07-05",
    sourceUrl: "https://www.cominnocenter.com/post/pid-thong-lang-phra-foundation",
    relatedProjectSlug: "pid-thong-lang-phra-foundation",
    bodyTh: [
      "สืบสานแนวพระราชดำริ — อบรมการผลิตสื่อออนไลน์ เทคนิคการโน้มน้าวใจ และการพัฒนาบุคลิกภาพ",
      "การอบรมจัดขึ้นโดยวิทยากรผู้เชี่ยวชาญครบทั้ง 3 ด้าน ได้แก่",
      "1. การผลิตสื่อออนไลน์อย่างง่ายด้วย PowerPoint เพื่อนำเสนอความคืบหน้าของงานให้ทุกคนรับทราบ และสร้างพลังขับเคลื่อนสังคม",
      "2. เทคนิคการโน้มน้าวใจผู้ฟัง",
      "3. การพัฒนาบุคลิกภาพ ให้แก่ผู้เข้ารับการอบรมจากมูลนิธิปิดทองหลังพระ",
    ],
    bodyEn: [
      "Continuing the royal initiative — online media production training, persuasion techniques, and personality development.",
      "Training was organized by expert instructors in all 3 areas:",
      "1. Simple online media production using PowerPoint to present work in progress to everyone, creating power to drive society",
      "2. Techniques for persuading listeners",
      "3. Personality development for trainees from the Pid Thong Lang Phra Foundation",
    ],
  },
  {
    slug: "seeds-for-cu-sustainability",
    titleTh: "Seeds for CU Sustainability",
    titleEn: "Seeds for CU Sustainability",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/seeds-for-cu-sustainability",
    relatedProjectSlug: "seeds-for-cu-sustainability",
    bodyTh: [
      "ผลิตวิดีโอนำเสนอโครงการทั้งในกรุงเทพฯ และต่างจังหวัด",
      "เราผลิตวิดีโอนำเสนอตั้งแต่ขั้นตอน Pre-production จนถึง Post-production เพื่อคุณภาพที่ดีที่สุด มีการประชุมรับฟังความคิดเห็นจากผู้ว่าจ้างทุกสัปดาห์ ผลงานสุดท้ายสะท้อนความมุ่งมั่นต่อความยั่งยืนของสังคม พร้อมภาพมุมสูงและบทสัมภาษณ์ผู้มีส่วนเกี่ยวข้องในโครงการ",
    ],
    bodyEn: [
      "Creating project presentation videos in Bangkok and other provinces.",
      "We produced presentation videos from pre-production to post-production to ensure the best quality. Weekly meetings were held to gather feedback from the clients. Ultimately, the project showcased a commitment to societal sustainability, featuring aerial footage and interviews with stakeholders involved in the project.",
    ],
  },
  {
    slug: "department-of-disease-control",
    titleTh: "กรมควบคุมโรค",
    titleEn: "Department of Disease Control",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/department-of-disease-control",
    relatedProjectSlug: "department-of-disease-control",
    bodyTh: [
      "เวิร์กช็อปการออกแบบกระบวนการให้บริการ",
      "การอบรมมุ่งเน้นหลักการสื่อสารแบบเจาะจงกลุ่มเป้าหมายและเทคนิคการผลิตสื่อสมัยใหม่ เพื่อช่วยให้ผู้เข้าร่วมสร้างความสัมพันธ์และความเข้าใจภายในองค์กร สื่อสารได้คล่องตัวขึ้น และยกระดับภาพลักษณ์ขององค์กร",
    ],
    bodyEn: [
      "Workshop on Service Process Design.",
      "The discussion focused on principles of targeted communication and modern media production techniques. These topics aimed to help participants build relationships and understanding within the organization, facilitate communication, and enhance the organization’s image.",
    ],
  },
  {
    slug: "creative-tourism-development-project-in-nan-province",
    titleTh: "โครงการพัฒนาการท่องเที่ยวเชิงสร้างสรรค์ จังหวัดน่าน",
    titleEn: "Creative Tourism Development Project in Nan Province",
    date: "2024-06-29",
    sourceUrl: "https://www.cominnocenter.com/post/creative-tourism-development-project-in-nan-province",
    relatedProjectSlug: "creative-tourism-development-project-in-nan-province",
    bodyTh: [
      "เราจัดเวิร์กช็อปเสริมทักษะการสื่อสาร เปิดรับสมัครชาวน่านทุกคนที่สนใจ ณ โรงแรมน้ำทองน่าน โดยเตรียมอุปกรณ์ถ่ายภาพและวิดีโอ พร็อพตกแต่ง และไฟส่องสว่าง เพื่อช่วยให้ผู้เข้าร่วมสร้างสรรค์ภาพที่น่าสนใจยิ่งขึ้น การอบรมมีทั้งภาคทฤษฎีและภาคปฏิบัติ เพื่อให้ผู้เข้าร่วมทุกคนได้รับความรู้ที่นำไปใช้ได้จริง",
    ],
    bodyEn: [
      "We organized a workshop to enhance communication skills, starting with registration open to all interested residents of Nan. The event took place at the Namthong Nan Hotel, where we prepared photography and video equipment, decorative props, and lighting to help participants create more engaging images. The training included both theoretical and practical sessions, ensuring that all attendees gained valuable knowledge.",
    ],
  },
  {
    slug: "ministry-of-natural-resources-and-environment",
    titleTh: "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
    titleEn: "Ministry of Natural Resources and Environment",
    date: "2024-06-21",
    sourceUrl: "https://www.cominnocenter.com/post/ministry-of-natural-resources-and-environment",
    relatedProjectSlug: "ministry-of-natural-resources-and-environment",
    bodyTh: [
      "โครงการอบรมพัฒนาบุคลากร",
      "ทีมของเราจัดอบรมให้แก่บุคลากรกรมส่งเสริมคุณภาพสิ่งแวดล้อม กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม เพื่อเพิ่มประสิทธิภาพการทำงาน ครอบคลุมเทคนิคการเขียนให้ทรงพลังและการถ่ายภาพให้สมบูรณ์แบบ พร้อมแนะนำอุปกรณ์ที่ช่วยยกระดับความเป็นมืออาชีพของผลงาน",
    ],
    bodyEn: [
      "Personnel Development Training Program.",
      "Our team conducted a training program for the staff of the Department of Environmental Quality Promotion, Ministry of Natural Resources and Environment. The training aimed to enhance their work efficiency by covering techniques for impactful writing and perfect photography. We also recommended equipment that would help elevate the professionalism of their work.",
    ],
  },
  {
    slug: "international-labour-organization",
    titleTh: "องค์การแรงงานระหว่างประเทศ (ILO)",
    titleEn: "International Labour Organization",
    date: "2024-06-21",
    sourceUrl: "https://www.cominnocenter.com/post/international-labour-organization",
    relatedProjectSlug: "international-labour-organization",
    bodyTh: [
      "เวิร์กช็อปร่วมกับสหประชาชาติ",
      "ทีมของเราร่วมจัดเวิร์กช็อปส่งเสริมความร่วมมือเพื่อการพัฒนาที่ยั่งยืนกับสหประชาชาติและวาระสำคัญในประเทศไทย โดยสอนเทคนิคหลากหลายด้าน ทั้งการใช้ข้อความ การถ่ายภาพ การถ่ายวิดีโอ และการใช้แอปพลิเคชัน TikTok เพื่อผลิตผลงานคุณภาพสูงสำหรับนำเสนอโครงการทั้งแบบเดี่ยวและแบบกลุ่ม",
    ],
    bodyEn: [
      "United Nations Workshop.",
      "Our team participated in the workshop to promote cooperation for sustainable development with the United Nations and its valuable agenda in Thailand. We taught various techniques related to text usage, photography, videography, and the use of the TikTok application. These skills were aimed at producing high-quality work for presenting individual and group projects.",
    ],
  },
  {
    slug: "asean-university-network",
    titleTh: "ASEAN University Network",
    titleEn: "ASEAN University Network",
    date: "2024-06-21",
    sourceUrl: "https://www.cominnocenter.com/post/asean-university-network",
    relatedProjectSlug: "asean-university-network",
    bodyTh: [
      "เราจัดทำรายงานประจำปีให้แก่ ASEAN University Network สำหรับปี 2016–2019",
      "เราออกแบบกราฟิกและจัดวางเลย์เอาต์ของรายงานประจำปีด้วยแนวคิดสร้างสรรค์ทันสมัยที่สอดคล้องกับบุคลิกขององค์กร ส่งมอบไฟล์พร้อมพิมพ์ให้โรงพิมพ์เพื่อคุณภาพงานพิมพ์สูงสุด พร้อมจัดทำไฟล์ขนาดเล็กสำหรับเผยแพร่บนเว็บไซต์ของ AUN ให้เปิดอ่านแบบดิจิทัลได้อีกช่องทาง (ตัวอย่างฉบับดิจิทัล: anyflip.com/wyzmm/tiog)",
    ],
    bodyEn: [
      "We created the Annual Report for ASEAN University Network for the years 2016–2019.",
      "We designed the graphics and layout of the annual report with a creative and modern concept that aligns with the organization’s personality. We provided print-ready files to the printing house, ensuring high-quality printouts. Additionally, we provided smaller file sizes for AUN to upload on their website, allowing for digital viewing of the report as another accessible option (digital edition: anyflip.com/wyzmm/tiog).",
    ],
  },
  {
    slug: "itd",
    titleTh: "ITD",
    titleEn: "ITD",
    date: "2024-07-05",
    sourceUrl: "https://www.cominnocenter.com/post/__itd",
    relatedProjectSlug: "itd",
    bodyTh: [
      "จัดประชุมรับฟังความคิดเห็นและวิเคราะห์แนวโน้มในหัวข้อต่างๆ ได้แก่ การค้าดิจิทัลกับโอกาสของ SMEs ไทย สงครามการค้าโลกกับการปรับตัวของภาคการค้าระหว่างประเทศของไทย แนวโน้มธุรกิจกับสิทธิมนุษยชน และทิศทางการค้าภาคบริการของไทยเพื่อสร้างมูลค่าเพิ่มท่ามกลางความเปลี่ยนแปลง พร้อมออกแบบและจัดพิมพ์หนังสือเป็นผลลัพธ์ที่จับต้องได้ของการประชุม",
    ],
    bodyEn: [
      "Organize a meeting to gather opinions and analyze trends on various topics: digital commerce and opportunities for Thai SMEs, the global trade war and the adaptation of Thailand's international trade sector, business and human rights trends, and the direction of Thailand's service sector trade to create added value amidst changes. Additionally, design and print a book to serve as a tangible outcome of the discussions.",
    ],
  },
  {
    slug: "sri-trang-agro-industry",
    titleTh: "ศรีตรังแอโกรอินดัสทรี",
    titleEn: "Sri Trang Agro-Industry",
    date: "2024-04-28",
    sourceUrl: "https://www.cominnocenter.com/post/sri-trang-agro-industry",
    relatedProjectSlug: "sri-trang-agro-industry",
    bodyTh: [
      "หลักสูตรอบรม: การสร้างคอนเทนต์ออนไลน์ (Creating Online Content)",
      "ทีมงานได้รับเชิญเป็นวิทยากรอบรมการสร้างคอนเทนต์ออนไลน์ให้แก่พนักงานบริษัท ศรีตรังแอโกรอินดัสทรี จำกัด (มหาชน) เพื่อให้สามารถผลิตสื่อวิดีโอและบันทึกหน้าจอ สำหรับการเรียนรู้ภายในองค์กรอย่างต่อเนื่อง จัดโดยสถาบันภาษาไทยสิรินธร จุฬาลงกรณ์มหาวิทยาลัย ระหว่างวันที่ 20–21 กรกฎาคม 2565 ณ ศูนย์ประชุมนานาชาติฉลองสิริราชสมบัติครบ 60 ปี (บุรีศรีภู) อำเภอหาดใหญ่",
    ],
    bodyEn: [
      "Training course: Creating Online Content.",
      "The team was invited to lead a training course on online content creation for the employees of Sri Trang Agro-Industry Public Company Limited, enabling them to create video media and screen recordings for ongoing organizational learning. The training was organized by the Sirindhorn Thai Language Institute, Chulalongkorn University, on July 20–21, 2022, at the Burisriphu Convention Center, Hat Yai.",
    ],
  },
  {
    slug: "empowering-youth-leaders",
    titleTh: "เสริมพลังผู้นำเยาวชน",
    titleEn: "Empowering Youth Leaders",
    date: "2024-04-28",
    sourceUrl: "https://www.cominnocenter.com/post/empowering-youth-leaders",
    relatedProjectSlug: "empowering-youth-leaders",
    bodyTh: [
      "เสริมพลังผู้นำเยาวชน: มองย้อนเวิร์กช็อปครั้งล่าสุดของเรา",
      "ในฐานะหัวหน้าหน่วยปฏิบัติการวิจัยและรองประธาน Impulse Bangkok ผมได้รับเกียรติเป็นวิทยากรอบรมผู้นำเยาวชนและพี่เลี้ยงจาก 3 จังหวัดชายแดนภาคใต้ จัดโดย Look South Peace ระหว่างวันที่ 10–13 พฤศจิกายน 2566 ณ จังหวัดพัทลุง",
      "เวิร์กช็อปครั้งนี้มุ่งพัฒนาศักยภาพผู้นำเยาวชนและพี่เลี้ยง ให้มีส่วนร่วมและสร้างสรรค์กิจกรรมที่ส่งเสริมสุขภาวะทางเพศ กาย และใจของเยาวชน โดยเน้นการวางแผน การดำเนินงาน การประเมินผลกิจกรรม และการทำงานร่วมกับองค์กรอื่นๆ",
      "ผมได้นำประสบการณ์จาก Impulse Bangkok มาแบ่งปันตัวอย่างงานและกิจกรรมต่างๆ เพื่อจุดประกายให้ผู้เข้าร่วม เป้าหมายคือการมอบความรู้และทักษะที่จำเป็นต่อการสร้างกิจกรรมใหม่ๆ ที่สร้างสรรค์สำหรับพื้นที่ของตนเอง",
      "ผู้เข้าร่วมแสดงความกระตือรือร้นและความคิดสร้างสรรค์อย่างมากในการวางแผนกิจกรรม ผมมั่นใจว่าความรู้และทักษะที่ได้รับจะเป็นประโยชน์ต่อการจัดกิจกรรมแบบมีส่วนร่วมและสร้างสรรค์ เพิ่มการเข้าถึงบริการ และสนับสนุนการให้ความรู้และคำปรึกษาแบบเพื่อนช่วยเพื่อน",
      "ในระยะถัดไป Look South Peace คาดหวังว่าผู้เข้าร่วมจะเติบโตเป็นพี่เลี้ยงและสร้างพื้นที่ปลอดภัยให้สมาชิกรุ่นใหม่ ขอเชิญทุกท่านติดตามกิจกรรมและร่วมเสริมพลังเยาวชนของเราไปด้วยกัน",
    ],
    bodyEn: [
      "Empowering Youth Leaders: a look back at our recent workshop.",
      "As the head of our research unit and Vice President of Impulse Bangkok, I had the privilege of facilitating a training workshop for youth leaders and mentors from three provinces in southern Thailand. The event, organized by Look South Peace, took place from November 10 to 13, 2023, in Phatthalung province.",
      "The workshop aimed to develop the potential of youth leaders and mentors to participate in and create activities that promote sexual, physical, and mental well-being for young people. We focused on teaching them how to plan, implement, and evaluate their activities, and how to collaborate with other organizations.",
      "Drawing from my experiences with Impulse Bangkok, I shared examples of our events and activities to inspire the participants. The goal was to equip them with the knowledge and skills they need to create innovative and new activities for their areas.",
      "The participants showed great enthusiasm and creativity in planning for the success of their activities. I am confident that the knowledge and skills they gained from the workshop will benefit them in conducting participatory and creative activities, enhancing their access to services, and supporting peer-to-peer education and counseling.",
      "Looking ahead, we at Look South Peace expect that the participants will become mentors and create safe spaces for the new generation of Look South Peace members. We invite everyone to follow their activities and join us in our efforts to empower our youth.",
    ],
  },
  {
    slug: "care-d-plus",
    titleTh: "เปิดตัวโครงการอบรมขับเคลื่อนการสื่อสารสาธารณะและสังคม (Care D+)",
    titleEn: "Launch of the Public & Social Communication Training Program (Care D+)",
    date: "2024-04-28",
    sourceUrl:
      "https://www.cominnocenter.com/post/the-training-program-for-driving-public-and-social-communication-care-d-plus",
    relatedProjectSlug: "care-d-plus",
    bodyTh: [
      "จุฬาลงกรณ์มหาวิทยาลัย ร่วมกับกระทรวงสาธารณสุข จัดงานเปิดตัวโครงการอบรมขับเคลื่อนการสื่อสารสาธารณะและสังคม (Care D+)",
      "ตามนโยบายรัฐบาลที่มุ่งให้คนไทยทุกคนเข้าถึงบริการสุขภาพที่มีคุณภาพอย่างเท่าเทียม กระทรวงสาธารณสุขได้กำหนดประเด็นการดำเนินงานสำคัญ 13 ด้าน เพื่อพัฒนาระบบสาธารณสุขที่แก้ปัญหา เสริมความเข้มแข็งของระบบพื้นฐาน และใช้สุขภาพขับเคลื่อนเศรษฐกิจของประเทศ โดยการสื่อสารที่มีประสิทธิภาพระหว่างผู้ป่วย ญาติ และบุคลากรสาธารณสุข ถูกยกให้เป็นประเด็นสำคัญและเป็นหนึ่งใน Quick Wins ที่ต้องเร่งให้เห็นผลภายใน 100 วัน เนื่องจากกว่า 90% ของความขัดแย้งและข้อร้องเรียนเกิดจากการสื่อสารที่ล้มเหลว คลาดเคลื่อน หรือการจัดการการสื่อสารในภาวะวิกฤตที่ไม่เพียงพอ นำไปสู่ความไม่พอใจ การฟ้องร้อง และผลกระทบต่อขวัญกำลังใจของบุคลากร",
      "ผ่านทีม Care D Plus หรือ “ทีมหัวใจ” ที่ปฏิบัติงานในทุกหน่วยบริการสุขภาพ เพื่อส่งเสริมการสื่อสารด้วยความเมตตา ความเข้าใจ และความเคารพซึ่งกันและกัน ระหว่างผู้ป่วย ญาติ และบุคลากรสาธารณสุข โดยจุฬาลงกรณ์มหาวิทยาลัยร่วมจัดการอบรมเสริมทักษะการสื่อสารด้านสุขภาพด้วยเทคนิคการสื่อสารสมัยใหม่ผ่านหลากหลายแพลตฟอร์ม หลักสูตรประกอบด้วย 7 หน่วยการเรียนรู้หลักและหน่วยการเรียนรู้เสริม สำหรับผู้บริหาร เจ้าหน้าที่ และอาสาสมัครที่ทำงานด้านการสื่อสาร การเผยแพร่ข้อมูล และสุขศึกษาในสถานพยาบาลสังกัดกระทรวงสาธารณสุขทั่วประเทศ รวม 10,000 คน เริ่มอบรมวันที่ 10 พฤศจิกายน 2566 ถึง 30 มิถุนายน 2567",
    ],
    bodyEn: [
      "Chulalongkorn University, in collaboration with the Ministry of Public Health, organized the launch event for the training program for driving public and social communication (Care D+).",
      "Based on the government's policy aiming to provide all Thai people with equitable access to quality healthcare services, the Ministry of Public Health has established 13 operational priorities. These priorities are designed to develop a healthcare system that addresses problem-solving, strengthens foundational systems, and utilizes health to drive the country's economy. Effective communication among patients, relatives, and healthcare personnel is emphasized as a key focus area and designated as one of the Quick Wins to be expedited for visible results within 100 days. This urgency stems from the fact that over 90% of conflicts and complaints arise due to communication breakdowns, discrepancies, or inadequate crisis communication management, leading to grievances, lawsuits, and significant impacts on the morale and motivation of healthcare personnel.",
      "Through the Care D Plus team, also known as the 'Heartfelt Team,' operations are facilitated in every healthcare unit to promote compassionate communication among patients, relatives, and healthcare personnel. This is achieved through empathy, understanding, and mutual respect, with collaboration from Chulalongkorn University in providing training to enhance communication skills in healthcare using modern communication techniques through various platforms. The training program comprises 7 core learning units and supplementary learning units targeting managers, staff, officers, and volunteers engaged in communication, information dissemination, and health education in healthcare facilities under the Ministry of Public Health nationwide, totaling 10,000 individuals. The training commenced on November 10, 2023, and concluded on June 30, 2024.",
    ],
  },
  {
    slug: "media-communication-transnational-citizens",
    titleTh: "เปิดตัวหลักสูตรออนไลน์ Media & Communication for Transnational Citizens",
    titleEn: "Center Launches Groundbreaking Online Course for Digital Nomads",
    date: "2024-06-19",
    sourceUrl:
      "https://www.cominnocenter.com/post/center-of-excellence-in-communication-innovation-launches-groundbreaking-online-course-for-digital-n",
    relatedProjectSlug: "media-communication-transnational-citizens",
    bodyTh: [
      "ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ภูมิใจเปิดตัว “Media & Communication for Transnational Citizens” หลักสูตรออนไลน์รูปแบบใหม่สำหรับ digital nomads และผู้มีความสามารถระดับโลกที่พำนักในประเทศไทย",
      "รศ.ดร.สมิทธิ์ บุญชุติมา ผู้ได้รับมอบหมายจากคณะนิเทศศาสตร์ให้เป็นหัวหน้าโครงการ พัฒนาหลักสูตรระยะ 12 เดือนนี้ขึ้น เพื่อเสริมทักษะที่จำเป็นด้านการสื่อสารอย่างมีประสิทธิภาพและความเข้าใจวัฒนธรรมไทย",
      "คณะนิเทศศาสตร์จะออกหนังสือรับรองแก่ผู้เข้าเรียน และมอบประกาศนียบัตรแก่ผู้สำเร็จหลักสูตร",
      "หลักสูตรเปิดสอนบน The Sharpener School แพลตฟอร์มการเรียนรู้ออนไลน์ที่เป็นพันธมิตรตลอดเส้นทางการเรียน พร้อมบริการสนับสนุนผู้เรียนอย่างครบวงจร เพื่อประสบการณ์การเรียนที่ราบรื่น น่าติดตาม และอบอุ่นใจ",
      "โดยมี Chula Unisearch หน่วยงานเชิงพาณิชย์ของจุฬาลงกรณ์มหาวิทยาลัย ดูแลด้านการบริหารจัดการโครงการ เพื่อให้การพัฒนาและส่งมอบหลักสูตรสำเร็จลุล่วง",
      "“เรารู้สึกตื่นเต้นที่ได้เปิดหลักสูตรบุกเบิกนี้ให้แก่ digital nomads และผู้มีความสามารถระดับโลกในประเทศไทย ผู้เรียนจะได้รับทักษะและความเข้าใจวัฒนธรรมที่จำเป็นต่อการใช้ชีวิตและการทำงานในเมืองไทยอย่างมั่นใจ” รศ.ดร.สมิทธิ์กล่าว",
      "หลักสูตร “Media & Communication for Transnational Citizens” เริ่มเรียนวันที่ 1 สิงหาคม 2567 เปิดรับสมัครแล้ววันนี้ ผู้สนใจดูรายละเอียดได้ที่ www.thesharpener.school",
    ],
    bodyEn: [
      "The Center of Excellence in Communication Innovation for Quality of Life and Sustainability, Faculty of Communication Arts, Chulalongkorn University, is proud to announce the launch of “Media & Communication for Transnational Citizens,” an innovative online course designed for digital nomads and global talents in Thailand.",
      "Assoc. Prof. Smith Boonchutima, Ph.D., who was assigned by the Faculty of Communication Arts to head the project, developed the 12-month program to equip participants with essential skills for effective communication and cultural understanding in Thailand.",
      "The Faculty of Communication Arts will issue letters of confirmation to participants in the course and certificates for those who complete the course.",
      "The course will be hosted on The Sharpener School, an online learning platform that acts as a partner in the learning journey. It provides comprehensive learner support services to ensure a seamless and engaging learning experience for participants, creating a reassuring and comfortable learning environment.",
      "Chula Unisearch, the commercial arm of Chulalongkorn University, will facilitate the administrative aspects of this project, ensuring the successful development and delivery of the course.",
      "“We are excited to offer this groundbreaking course to digital nomads and global talents in Thailand,” said Assoc. Prof. Smith Boonchutima, Ph.D., Head of the Center of Excellence in Communication Innovation. “Through this program, participants will gain the necessary skills and cultural understanding to thrive in their personal and professional lives in Thailand.”",
      "“Media & Communication for Transnational Citizens” is set to begin on 1 August 2024, and applications are now open. Interested individuals can visit www.thesharpener.school to learn more and apply.",
    ],
  },
  // ——— โพสต์ข่าวกิจกรรม (7) ———
  {
    slug: "keio-bunkyo-collaboration",
    titleTh: "นิเทศ จุฬาฯ กระชับความร่วมมือทางวิชาการกับมหาวิทยาลัยเคโอและมหาวิทยาลัยบุงเกียว",
    titleEn: "Chula Communication Arts Strengthens Academic Collaboration with Keio and Bunkyo Universities",
    date: "2026-03-15",
    sourceUrl:
      "https://www.cominnocenter.com/post/chula-communication-arts-strengthens-academic-collaboration-with-keio-university-and-bunkyo-universi",
    bodyTh: [
      "โตเกียว — คณาจารย์และนิสิตภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย เดินทางเยือนสถาบันชั้นนำของญี่ปุ่น เพื่อกระชับความสัมพันธ์ทางวิชาการระหว่างประเทศและส่งเสริมแนวปฏิบัติการสื่อสารเชิงนวัตกรรม",
      "มหาวิทยาลัยเคโอ: เวิร์กช็อป Peace Playground",
      "วันที่ 11 มีนาคม 2569 คณะเดินทางเยือน Graduate School of Media Design (KMD) มหาวิทยาลัยเคโอ โดยมีคณบดี Masa Inakage ให้การต้อนรับ และร่วมจัดเวิร์กช็อป “Peace Playground: A Workshop on Metaphor & Art” นำโดย ผศ.ดร.ธีรดา จงกลรัตนาภรณ์",
      "กิจกรรมครั้งนี้มีการบรรยายโดย รศ.Shutaro Takeda ส่งเสริมบทสนทนาเชิงสร้างสรรค์ว่าด้วยสันติภาพระหว่างนิสิตนักศึกษาของทั้งสองสถาบัน ปิดท้ายด้วยการเยี่ยมชมมหาวิทยาลัยและการหารือเบื้องต้นเรื่องความร่วมมือทางวิชาการในอนาคต",
      "มหาวิทยาลัยบุงเกียว: การหารือเชิงยุทธศาสตร์ทางวิชาการ",
      "วันที่ 13 มีนาคม 2569 คณาจารย์ร่วมหารือทางวิชาการกับศาสตราจารย์ Masato Koizumi และผู้แทนจากมหาวิทยาลัยบุงเกียว",
      "การประชุมครอบคลุมความร่วมมือในอนาคตด้านการแลกเปลี่ยนนิสิต การพัฒนาหลักสูตร และการวิจัยร่วมระดับนานาชาติ เพื่อขยายโอกาสทางการศึกษาและการเติบโตทางวิชาการระยะยาวของนิสิตนักศึกษาทั้งสองมหาวิทยาลัย",
    ],
    bodyEn: [
      "TOKYO — Faculty members and students from Chulalongkorn University’s Department of Public Relations visited leading institutions in Japan to strengthen international academic ties and foster innovative communication practices.",
      "Keio University: Peace Playground Workshop",
      "On March 11, 2026, the delegation visited Keio University’s Graduate School of Media Design (KMD). Welcomed by Dean Masa Inakage, the group hosted the “Peace Playground: A Workshop on Metaphor & Art” led by Asst. Prof. Dr. Teerada Chongkolrattanaporn.",
      "The session, featuring a lecture by Assoc. Prof. Shutaro Takeda, encouraged creative dialogue on peace among students from both institutions. The visit concluded with a campus tour and initial discussions on future academic collaboration.",
      "Bunkyo University: Strategic Academic Dialogue",
      "On March 13, 2026, faculty members held an academic discussion with Professor Masato Koizumi and representatives from Bunkyo University.",
      "The meeting explored future partnerships in student exchanges, curriculum development, and joint international research to enhance educational opportunities and ensure long-term academic growth for students at both universities.",
    ],
  },
  {
    slug: "treasury-officer-lecture",
    titleTh: "รศ.ดร.สมิทธิ์ บุญชุติมา บรรยายพิเศษหลักสูตรนักการคลังมืออาชีพ รุ่นที่ 15",
    titleEn: "Assoc. Prof. Dr. Smith Boonchutima Delivers Special Lecture at Professional Treasury Officer Program",
    date: "2025-08-05",
    sourceUrl:
      "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchutima-delivers-special-lecture-at-professional-treasury-officer",
    bodyTh: [
      "วันที่ 6 สิงหาคม 2568 รองศาสตราจารย์ ดร.สมิทธิ์ บุญชุติมา อาจารย์ประจำภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ได้รับเกียรติเป็นวิทยากรบรรยายในหลักสูตรนักการคลังมืออาชีพ (นคอ.) รุ่นที่ 15 จัดโดยมูลนิธิสถาบันวิจัยนโยบายเศรษฐกิจการคลัง ภายใต้หัวข้อ “เทคนิคการสื่อสารเพื่อการบริหารและประชาสัมพันธ์”",
      "การบรรยายครอบคลุมเนื้อหาสำคัญ ได้แก่ การวางกลยุทธ์การสื่อสารในองค์กรภาครัฐ การจัดการข้อมูลข่าวสารในยุคดิจิทัล การสื่อสารในภาวะวิกฤต และการประยุกต์ใช้เทคโนโลยีสมัยใหม่ในการประชาสัมพันธ์ โดยมีผู้บริหารภาคราชการจากหน่วยงานต่างๆ เข้าร่วมอบรม 60 ท่าน",
      "หลักสูตรนี้จัดขึ้นระหว่างวันที่ 22 กรกฎาคม – 8 สิงหาคม 2568 เพื่อพัฒนาศักยภาพผู้บริหารภาครัฐให้สามารถกำหนดนโยบายและเข้าใจระบบเศรษฐกิจการคลังของประเทศได้อย่างมีประสิทธิภาพ",
    ],
    bodyEn: [
      "On August 6, 2025, Associate Professor Dr. Smith Boonchutima from the Faculty of Communication Arts, Chulalongkorn University, delivered a special lecture on “Communication Techniques for Administration and Public Relations” at the 15th Professional Treasury Officer Program, organized by the Fiscal Policy Research Institute Foundation.",
      "The lecture covered key topics including communication strategy in government organizations, information management in the digital age, crisis communication, and the application of modern technology in public relations. The session was attended by 60 government executives from various agencies.",
      "The program, running from July 22 to August 8, 2025, aims to enhance the capabilities of government executives in policy-making and understanding the country's economic and fiscal systems.",
    ],
  },
  {
    slug: "krungthai-leadership-training",
    titleTh: "รศ.ดร.สมิทธิ์ บุญชุติมา บรรยายหลักสูตร Leadership Acceleration Program ธนาคารกรุงไทย",
    titleEn: "Assoc. Prof. Dr. Smith Boonchutima Delivers Leadership Training at Krungthai Bank",
    date: "2025-07-22",
    sourceUrl:
      "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchotima-delivers-leadership-training-at-krungthai-bank",
    bodyTh: [
      "วันที่ 23 กรกฎาคม 2568 รองศาสตราจารย์ ดร.สมิทธิ์ บุญชุติมา ได้รับเกียรติเป็นวิทยากรบรรยายพิเศษในโครงการ Leadership Acceleration Program ซึ่งจัดขึ้นเพื่อเสริมสร้างความรู้และทักษะทางการบริหารจัดการองค์กรให้แก่ผู้บริหารระดับกลางของธนาคารกรุงไทย จำกัด (มหาชน) โดยการอบรมจัดขึ้นภายใต้หัวข้อ “The Art of Communication & Influencing”",
      "ตลอดทั้งวันของการอบรมมีการบรรยายและกิจกรรมที่หลากหลาย เริ่มต้นด้วยหัวข้อ “การสื่อสารองค์กร” ครอบคลุมการจัดการข่าวสารจำนวนมาก การสื่อสารแบบไม่เป็นทางการ เช่น Word of Mouth และข่าวลือ รวมถึงการสื่อสารเพื่อการนำเสนอ ช่วงบ่ายผู้เข้าอบรมได้เรียนรู้ “การจัดการความขัดแย้ง” และ “การสื่อสารในภาวะวิกฤต” ปิดท้ายด้วย “การประชาสัมพันธ์ยุคดิจิทัล” ที่เน้นการเขียนข่าวประชาสัมพันธ์ ความเข้าใจคุณค่าและองค์ประกอบของข่าว และการใช้เครื่องมือ AI เช่น Claude, ChatGPT, Bing, Gemini และ Gamma.app ช่วยเขียนข่าว พร้อมฝึกปฏิบัติจริง",
      "โครงการนี้จัดโดยสถาบันบัณฑิตบริหารธุรกิจ ศศินทร์ แห่งจุฬาลงกรณ์มหาวิทยาลัย เพื่อพัฒนาศักยภาพผู้บริหารระดับกลางของธนาคารกรุงไทย โดยความเชี่ยวชาญที่เป็นที่ยอมรับอย่างกว้างขวางทั้งในแวดวงวิชาการและวิชาชีพของ รศ.ดร.สมิทธิ์ ทำให้การอบรมครั้งนี้เป็นประโยชน์อย่างยิ่งต่อผู้เข้าร่วมโครงการ",
    ],
    bodyEn: [
      "On July 23, 2025, Associate Professor Dr. Smith Boonchutima served as a keynote speaker for the Leadership Acceleration Program, designed to enhance management skills for middle-level executives at Krungthai Bank Public Company Limited. The training focused on “The Art of Communication & Influencing.”",
      "The comprehensive program covered organizational communication, information management, informal communication channels (word-of-mouth and rumors), presentation skills, conflict management, and crisis communication. The afternoon session emphasized digital public relations, including news writing techniques, understanding news value and components, and practical application of AI tools such as Claude, ChatGPT, Bing, Gemini, and Gamma.app for content creation, culminating in hands-on exercises.",
      "Organized by Sasin Graduate Institute of Business Administration, this program aims to develop the capabilities of Krungthai Bank's middle management. Dr. Smith Boonchutima's recognized expertise in both academic and professional circles made this training particularly valuable for participants seeking to enhance their leadership and communication competencies.",
    ],
  },
  {
    slug: "thai-health-drug-communication",
    titleTh: "สสส. จัดอบรม “พูดเรื่อง(ยา)ง่ายๆ ให้เป็น Routine” โดย ผศ.ดร.ธีรดา จงกลรัตนาภรณ์",
    titleEn: "ThaiHealth Organises “Simple Drug Communication as Daily Routine” Training by Dr. Teerada",
    date: "2025-07-20",
    sourceUrl:
      "https://www.cominnocenter.com/post/thai-health-promotion-foundation-organises-simple-drug-communication-as-daily-routine-training-by",
    bodyTh: [
      "วันที่ 21 กรกฎาคม พ.ศ. 2568 สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.) จัดกิจกรรมอบรมเชิงปฏิบัติการหัวข้อ “พูดเรื่อง(ยา)ง่ายๆ ให้เป็น Routine” ณ ห้องเปรมปรีดา ชั้น 2 โรงแรมเซ็นทารา อยุธยา จังหวัดพระนครศรีอยุธยา โดยได้รับเกียรติจาก ผู้ช่วยศาสตราจารย์ ดร.ธีรดา จงกลรัตนาภรณ์ ภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย เป็นวิทยากรหลัก",
      "การอบรมครอบคลุมเนื้อหาสำคัญหลายประเด็น ได้แก่ เทคนิคการสื่อสารเรื่องยาให้เข้าใจง่าย การพัฒนาทักษะการพูดคุยเรื่องการใช้ยาอย่างเหมาะสม การสร้างความตระหนักรู้เกี่ยวกับความปลอดภัยในการใช้ยา และการนำความรู้ไปประยุกต์ใช้ในการสื่อสารกับชุมชน ผู้เข้าร่วมได้ฝึกปฏิบัติผ่านกิจกรรมต่างๆ รวมถึงการจำลองสถานการณ์การให้คำแนะนำเรื่องยาในบริบทต่างๆ",
      "วัตถุประสงค์หลักของการอบรมคือการสร้างเครือข่ายผู้ถ่ายทอดความรู้ที่สามารถสื่อสารเรื่องการใช้ยาอย่างสมเหตุสมผลได้อย่างมีประสิทธิภาพ ทั้งในระดับครอบครัว ชุมชน และหน่วยงาน เพื่อลดความเสี่ยงจากการใช้ยาไม่ถูกต้อง และส่งเสริมให้ประชาชนมีความรอบรู้ด้านสุขภาพมากยิ่งขึ้น โดยเฉพาะการทำให้การพูดคุยเรื่องยากลายเป็นกิจวัตรธรรมดาที่ทุกคนทำได้",
      "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ เป็นผู้เชี่ยวชาญด้านการสื่อสารเพื่อสุขภาพและสิ่งแวดล้อม มีประสบการณ์วิจัยและงานบริการวิชาการหลากหลาย โดยเฉพาะการสื่อสารเพื่อลดความเสี่ยงทางสุขภาพ รวมถึงโครงการวิจัย “การสื่อสารเรื่องการใช้ยาเพื่อลดความเสี่ยงโรคไต” และ “การสื่อสารเพื่อลดความเสี่ยงการใช้กัญชาในเยาวชนกลุ่มเสี่ยง” ทำให้การถ่ายทอดความรู้ครั้งนี้น่าเชื่อถือและเป็นประโยชน์อย่างยิ่งต่อผู้เข้าร่วม",
      "บรรยากาศภายในงานเต็มไปด้วยความอบอุ่นและการมีส่วนร่วมอย่างกระตือรือร้น ผู้เข้าร่วมสนใจเนื้อหาและกิจกรรมอย่างต่อเนื่อง พร้อมแลกเปลี่ยนประสบการณ์และความท้าทายในการสื่อสารเรื่องยาในชุมชนของตนเอง สร้างบรรยากาศการเรียนรู้ที่เอื้อต่อการพัฒนาทักษะและความมั่นใจในการนำความรู้ไปใช้จริง",
    ],
    bodyEn: [
      "On July 21, 2025, the Thai Health Promotion Foundation (ThaiHealth) organized a workshop on “Simple Drug Communication as Daily Routine” at Preampreeda Room, 2nd Floor, Centara Ayutthaya Hotel, Ayutthaya Province, featuring Assistant Professor Dr. Teerada Chongkolrattanaporn from the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University, as the keynote speaker.",
      "The comprehensive training covered effective techniques for communicating about medications in simple terms, developing conversation skills about appropriate drug use, and building awareness about medication safety. Participants engaged in practical exercises through real-world scenario simulations.",
      "The program aims to create a network of knowledge facilitators capable of effectively communicating rational drug use within families and communities. Dr. Teerada, a health communication expert with extensive research experience in health risk communication, brought valuable expertise that made this training particularly beneficial for all participants.",
      "The session maintained an engaging atmosphere with active participation and meaningful exchanges of experiences among attendees.",
    ],
  },
  {
    slug: "fda-drug-safety-summit",
    titleTh: "ร่วมขับเคลื่อนการใช้ยาอย่างสมเหตุสมผล ในงานประชุมระดับชาติ อย.",
    titleEn: "Communication Innovation Center Drives National Drug Safety Awareness at FDA Summit",
    date: "2025-07-09",
    sourceUrl:
      "https://www.cominnocenter.com/post/comm-art-chula-ce-drives-national-drug-safety-awareness-at-fda-summit",
    bodyTh: [
      "ผู้ช่วยศาสตราจารย์ ดร.ธีรดา จงกลรัตนาภรณ์ และ ดร.กมลรัตน์ กิจรุ่งไพศาล จากภาควิชาการประชาสัมพันธ์ ร่วมมือกับสำนักงานคณะกรรมการอาหารและยา (อย.) และสำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.) จัดแสดงนิทรรศการเชิงโต้ตอบ “กินยาสมเหตุ หายโรคสมผล ทุกคนสมใจ” ในงานประชุมสัมมนาระดับชาติด้านการส่งเสริมการใช้ยาอย่างสมเหตุผล ครั้งที่ 1",
      "กิจกรรมจัดขึ้นเมื่อวันที่ 8–9 กรกฎาคม 2568 ณ โรงแรมเซ็นทารา ไลฟ์ ศูนย์ราชการและคอนเวนชันเซ็นเตอร์ แจ้งวัฒนะ กรุงเทพฯ โดยมีบุคลากรด้านสุขภาพและประชาชนทั่วไปเข้าร่วมเล่นเกมและพูดคุยแลกเปลี่ยนเรื่องการใช้ยาที่ถูกต้อง",
      "นิทรรศการนี้เป็นส่วนหนึ่งของโครงการวิจัย “การสื่อสารเรื่องการใช้ยาเพื่อลดความเสี่ยงโรคไต” ที่ได้รับทุนสนับสนุนจาก สสส. สะท้อนความมุ่งมั่นของศูนย์ฯ ในการพัฒนากลยุทธ์การสื่อสารด้านสุขภาพที่มีประสิทธิภาพสำหรับชุมชนไทย",
    ],
    bodyEn: [
      "Assistant Professor Dr. Teerada Chongkolrattanaporn and Dr. Kamonrat Kijrungpaisarn from our Public Relations Department collaborated with the Food and Drug Administration (FDA) and Thai Health Promotion Foundation to present an interactive exhibition on rational medication use at Thailand's First National Forum on Rational Drug Use.",
      "The event took place July 8–9, 2025 at Centara Life Government Complex, Bangkok, engaging healthcare professionals and the public through educational games and discussions about proper medication use.",
      "This initiative is part of our research project “Communication for Medication Use to Reduce Kidney Disease Risk,” funded by ThaiHealth, showcasing our center's commitment to developing effective health communication strategies for Thai communities.",
    ],
  },
  {
    slug: "turkiye-students-workshop",
    titleTh: "ผศ.ดร.ธีรดา นำเวิร์กช็อปเตรียมความพร้อมนักศึกษาไทยในตุรกีสู่โลกการทำงาน",
    titleEn: "Dr. Teerada Leads Workshop Preparing Thai Students in Türkiye for the World of Work",
    date: "2025-07-05",
    sourceUrl:
      "https://www.cominnocenter.com/post/dr-teerada-of-chulalongkorn-university-leads-workshop-preparing-thai-students-in-t%C3%BCrkiye-for-the-wo",
    bodyTh: [
      "วันที่ 4–5 กรกฎาคม 2568 ผู้ช่วยศาสตราจารย์ ดร.ธีรดา จงกลรัตนาภรณ์ หัวหน้าภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ได้รับเกียรติเป็นวิทยากรหลักในโครงการ “เตรียมความพร้อมนักศึกษาไทยในตุรกีสู่โลกการทำงาน” ณ นครอิสตันบูล",
      "ผศ.ดร.ธีรดา ถ่ายทอดความเชี่ยวชาญและทักษะที่จำเป็น เพื่อเสริมพลังให้นักศึกษาไทยที่ใกล้สำเร็จการศึกษาก้าวเข้าสู่โลกวิชาชีพอย่างมั่นใจ การบรรยายครอบคลุมหัวข้อสำคัญ อาทิ เทคนิคการสื่อสารและการเจรจาต่อรองเบื้องต้น การเขียนเรซูเม่ การแนะนำตัว และทักษะที่ใช้ได้จริงในการสัมภาษณ์งาน",
      "โครงการจัดโดยสถานเอกอัครราชทูตไทย ณ กรุงอังการา โดยมี ฯพณฯ นายอภิรัตน์ สุคนธาภิรมย์ ณ พัทลุง เอกอัครราชทูตไทยประจำสาธารณรัฐตุรกี กล่าวเปิดงานและเน้นย้ำความสำคัญของทักษะนอกหลักสูตรเหล่านี้ ภายในงานยังมีวิทยากรชาวตุรกีบรรยายกฎหมายพื้นฐานที่จำเป็นสำหรับชาวต่างชาติที่พำนักและทำงานในตุรกีอีกด้วย",
    ],
    bodyEn: [
      "On 4–5 July 2025, Assistant Professor Dr. Teerada Chongkolrattanaporn, Head of the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University, honored an event in Istanbul as the key speaker for the project “Preparing Thai Students in Türkiye to the World of Work.”",
      "Dr. Teerada shared her expertise and essential skills to empower Thai students nearing graduation for a confident transition into the professional world. Her lecture covered crucial topics such as basic communication and negotiation techniques, resumé writing, self-introduction, and practical skills for job interviews.",
      "The project was organized by the Royal Thai Embassy in Ankara, with an opening remark by H.E. Mr. Apirat Sugondhabhirom, Ambassador of Thailand to the Republic of Türkiye, who stressed the importance of these extracurricular skills. The program also included a session by a Turkish guest speaker on the basic laws necessary for foreigners living and working in Türkiye.",
    ],
  },
  {
    slug: "executive-crisis-communication-training",
    titleTh: "หัวหน้าศูนย์ฯ ได้รับเชิญนำหลักสูตรอบรมผู้บริหารระดับสูงด้านการสื่อสารภาวะวิกฤต",
    titleEn: "Center of Excellence Head Invited to Lead Executive Crisis Communication Training",
    date: "2024-06-22",
    sourceUrl:
      "https://www.cominnocenter.com/post/center-of-excellence-head-invited-to-lead-executive-crisis-communication-training",
    bodyTh: [
      "ศูนย์ฯ ยินดีที่จะประกาศว่า รองศาสตราจารย์ ดร.สมิทธิ์ บุญชุติมา หัวหน้าศูนย์เชี่ยวชาญเฉพาะทางของเรา ได้รับเชิญเป็นผู้นำหลักสูตรอบรมผู้บริหารด้านการสื่อสารเชิงกลยุทธ์ในภาวะวิกฤต คำเชิญครั้งนี้สะท้อนความเชี่ยวชาญของ รศ.ดร.สมิทธิ์ และบทบาทที่เติบโตขึ้นของศูนย์ฯ ในการพัฒนาผู้บริหารระดับสูง",
      "หลักสูตรเข้มข้น 1 วัน ในชื่อ “Strategic Crisis Communication: Empowering C-Level Executives” จัดโดยบริษัท The Sharpener จำกัด มุ่งเสริมทักษะที่จำเป็นแก่ผู้บริหารระดับ C-suite ในการบริหารภาพลักษณ์องค์กรและการวางตัวในภาวะวิกฤต เทคนิคการตอบสื่ออย่างมืออาชีพ และการพลิกวิกฤตให้เป็นโอกาสด้วยการสื่อสารที่มีประสิทธิภาพ",
      "รูปแบบกิจกรรมสำคัญของหลักสูตร ได้แก่ Four-Eye Meetings (การโค้ชแบบตัวต่อตัว) การแสดงบทบาทสมมติจำลองสถานการณ์วิกฤตจริง การอภิปรายกลุ่มแลกเปลี่ยนประสบการณ์และแนวปฏิบัติที่ดี และการเรียนรู้โดยใช้ AI ช่วยพัฒนากลยุทธ์การสื่อสาร",
      "รศ.ดร.สมิทธิ์ จะนำผู้เข้าอบรมผ่านหัวข้อสำคัญ อาทิ การบริหารภาพลักษณ์องค์กรและการวางตัวในภาวะวิกฤต เทคนิคการตอบสื่ออย่างมืออาชีพ การพัฒนาถ้อยแถลงในสถานการณ์ฉุกเฉิน และการเปลี่ยนวิกฤตเป็นโอกาสด้วยการสื่อสารเชิงบวก",
      "คำเชิญครั้งนี้ไม่เพียงตอกย้ำชื่อเสียงของ รศ.ดร.สมิทธิ์ ในวงการ แต่ยังยืนยันความมุ่งมั่นของศูนย์ฯ ในการส่งต่อองค์ความรู้และแนวปฏิบัติที่ดีด้านการสื่อสารภาวะวิกฤตแก่ผู้บริหารระดับสูงในหลากหลายอุตสาหกรรม",
      "หลักสูตรจัดตามความต้องการขององค์กรและจำกัดจำนวนเฉพาะผู้บริหารระดับ C-Level สอบถามรายละเอียดเพิ่มเติมได้ที่ 08 1991 7673 หรือ info@thesharpener.school",
    ],
    bodyEn: [
      "We are pleased to announce that Associate Professor Smith Boonchutima, Ph.D., the Head of our Center of Excellence, has been invited to lead a prestigious executive training program on strategic crisis communication. This invitation recognizes Dr. Boonchutima's expertise in the field and highlights our center's growing influence in professional development for high-level executives.",
      "The one-day intensive course, titled “Strategic Crisis Communication: Empowering C-Level Executives,” will be hosted by The Sharpener Co. Ltd. It aims to equip C-suite leaders with essential skills for managing corporate image and personal conduct during crises, professional media response techniques, and transforming challenges into opportunities through effective communication.",
      "Key aspects of the program include Four-Eye Meetings (personalized coaching sessions), role-playing exercises simulating real-world crisis scenarios, group discussions sharing experiences and best practices, and AI-assisted learning utilizing cutting-edge technology for communication strategy development.",
      "Dr. Boonchutima will guide participants through crucial topics such as managing corporate image and personal conduct during crises, professional media response techniques, developing effective statements in emergency situations, and transforming crises into opportunities through positive communication.",
      "This invitation not only showcases Dr. Boonchutima's reputation in the field but also reinforces our Center of Excellence's commitment to advancing knowledge and best practices in crisis communication. We are proud to see our expertise being shared with top executives across industries.",
      "The training program is scheduled to suit the company's needs and is limited to a select group of C-Level executives. For more information about the course or to inquire about future training opportunities, please contact our center at +66 81 991 7673 or info@thesharpener.school.",
    ],
  },
];

/** ข่าวเรียงใหม่ → เก่า */
export const newsSorted = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));

export function getNewsBySlug(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

/** ภาพทั้งหมดของโพสต์ (local paths — รูปแรกคือปก) */
export function newsImages(slug: string): string[] {
  return newsMedia[slug] || [];
}

export function newsCover(slug: string): string {
  return newsImages(slug)[0] || "/images/logo/logo-communication-innovation.png";
}
