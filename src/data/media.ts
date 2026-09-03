/**
 * สื่อถึงเรา (Media Mentions) — sync จาก Notion "Media Mentions Database"
 * Sync ล่าสุด: 16 ส.ค. 2569 (22 รายการหลังรวมรายการซ้ำ 2 คู่ตามที่ผู้ใช้อนุมัติ)
 * กติกา: ดึงเฉพาะ Ready for Web = Yes · เรียง Priority (High→Low) แล้ววันที่ใหม่→เก่า
 * field `code` ตรงกับรหัสภาพ thumbnail ใน grok-visual-brief (C-01…C-22)
 * อัปเดตข้อมูล: ผู้ใช้แก้ใน Notion แล้วสั่ง Claude sync เป็นครั้งๆ (static)
 */

export type MediaType = "Interview" | "News" | "Academic" | "Podcast" | "Project PR" | "Social";
export type MediaPriority = "High" | "Medium" | "Low";

export type MediaProfessorKey =
  | "smith"
  | "teerada"
  | "pavel"
  | "watsayut"
  | "center";

export type MediaMention = {
  /** รหัสภาพ thumbnail (ตรงกับ grok-visual-brief) และใช้เป็น key */
  code: string;
  nameTh: string;
  nameEn: string;
  summaryTh: string;
  summaryEn: string;
  /** ISO date จาก Notion */
  date: string;
  /** ความละเอียดของวันที่จริง — Notion ใช้ 1 ม.ค. เป็น placeholder หลายรายการ */
  datePrecision: "day" | "month" | "year";
  professors: MediaProfessorKey[];
  type: MediaType;
  source: string;
  /** ชื่อสื่อภาษาอังกฤษ — ใส่เฉพาะรายการที่ `source` มีภาษาไทย */
  sourceEn?: string;
  url: string;
  /** true = เปิดแท็บใหม่ (ลิงก์ภายนอก) · false = ลิงก์ภายในเว็บ */
  external: boolean;
  priority: MediaPriority;
  /** ภาษาต้นฉบับใน Notion */
  langOrig: "TH" | "EN";
  /** path ภาพ thumbnail — เติมเมื่อได้ไฟล์จาก Grok (ชุด C) */
  image?: string;
};

export const MEDIA_TYPE_LABEL: Record<MediaType, { th: string; en: string }> = {
  Interview: { th: "สัมภาษณ์", en: "Interview" },
  News: { th: "ข่าว", en: "News" },
  Academic: { th: "ผลงานวิชาการ", en: "Academic" },
  Podcast: { th: "พอดแคสต์", en: "Podcast" },
  "Project PR": { th: "ข่าวโครงการ", en: "Project PR" },
  Social: { th: "โซเชียลมีเดีย", en: "Social" },
};

export const MEDIA_PROFESSOR_LABEL: Record<MediaProfessorKey, { th: string; en: string }> = {
  smith: { th: "รศ.ดร.สมิทธิ์ บุญชุติมา", en: "Assoc. Prof. Dr. Smith Boonchutima" },
  teerada: { th: "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์", en: "Asst. Prof. Dr. Teerada Chongkolrattanaporn" },
  pavel: { th: "รศ.ดร. Pavel Slutskiy", en: "Assoc. Prof. Dr. Pavel Slutskiy" },
  // ยืนยันโดยผู้ช่วยของผู้ใช้ 3 ก.ย. 2569 — เดิมเว็บเขียน "Dr. Watsayut Kongchan"
  // ซึ่งเป็นการถอดเสียงคนละแบบกับที่เจ้าตัวใช้ · ค่านี้ต้องตรงกับ researchers.ts
  // **หมายเหตุ: บทความที่ตีพิมพ์แล้วยังลงชื่อว่า Watsayut Kongchan** รายการอ้างอิง
  // บนหน้า /research จึงคงตามที่วารสารพิมพ์ไว้ ไม่แก้ตาม (ดู CLAUDE.md กฎข้อ 8)
  watsayut: { th: "อ.ดร.วรรษยุต คงจันทร์", en: "Dr. Wassayut Kongjan" },
  center: { th: "ศูนย์ฯ", en: "The Center" },
};

export const mediaMentions: MediaMention[] = [
  // ---------- Priority: High ----------
  {
    code: "C-02",
    image: "/images/media/C-02.webp",
    nameTh: "แรงงานเมียนมาร่วมออกแบบงานวิจัยสุขภาพว่าด้วยอาการปวดจากการทำงาน",
    nameEn: "Myanmar migrant workers co-designed a health study for their workplace pain",
    summaryTh:
      "งานวิจัยที่แรงงานเมียนมาร่วมออกแบบการศึกษาด้านสุขภาพเกี่ยวกับอาการปวดจากการทำงานในโรงงานอาหารทะเลไทย",
    summaryEn:
      "Participatory research in which Myanmar migrant workers co-designed a health study on workplace pain in Thai seafood factories",
    date: "2026-04-28",
    datePrecision: "day",
    professors: ["smith"],
    type: "Academic",
    source: "Research Involvement and Engagement (Springer)",
    url: "https://researchinvolvement.biomedcentral.com/articles/10.1186/s40900-026-00891-8",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-06",
    image: "/images/media/C-06.webp",
    nameTh: "AI ความจริงยุค post-truth และพฤติกรรมการหาข้อมูลของนักศึกษาไทย",
    nameEn: "AI, post-truth realities, and Thai students' information-seeking behavior",
    summaryTh:
      "งานวิจัยของ รศ.ดร. Pavel เกี่ยวกับผลกระทบของ AI ต่อความจริงและการแสวงหาข้อมูลของนักศึกษาไทยในยุค post-truth",
    summaryEn:
      "Research by Assoc. Prof. Dr. Pavel Slutskiy on how AI reshapes truth and the information-seeking behavior of Thai students in the post-truth era",
    date: "2025-11-01",
    datePrecision: "month",
    professors: ["pavel"],
    type: "Academic",
    source: "Manusya: Journal of Humanities",
    url: "https://digital.car.chula.ac.th/manusya/vol28/iss1/9/",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-08",
    image: "/images/media/C-08.webp",
    nameTh: "พอดแคสต์สัมภาษณ์ รศ.ดร. Pavel — Communication and Libertarianism",
    nameEn: "Communication and Libertarianism — Interview with Pavel Slutskiy",
    summaryTh:
      "สัมภาษณ์เชิงลึกความยาวราว 59 นาที เกี่ยวกับหนังสือ Communication and Libertarianism (2021) และ Philosophical Foundations of Communication Studies (2024) รวมถึงแนวคิด libertarian กับการสื่อสาร",
    summaryEn:
      "An in-depth ~59-minute interview on the books Communication and Libertarianism (2021) and Philosophical Foundations of Communication Studies (2024), and libertarian ideas in communication",
    date: "2025-11-25",
    datePrecision: "day",
    professors: ["pavel"],
    type: "Podcast",
    source: "The White PillBox (YouTube + Spotify)",
    url: "https://www.youtube.com/watch?v=gNSOkB-0LdI",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-07",
    image: "/images/media/C-07.webp",
    nameTh: "ผศ.ดร.ธีรดา บรรยาย Workshop เตรียมความพร้อมนักศึกษาไทยในตุรกีสู่โลกการทำงาน",
    nameEn: "Dr. Teerada leads a workshop preparing Thai students in Türkiye for the world of work",
    summaryTh:
      "ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ หัวหน้าภาควิชาการประชาสัมพันธ์ เป็นวิทยากรหลักในโครงการ “Preparing Thai Students in Türkiye to the World of Work” ณ อิสตันบูล 4–5 ก.ค. 2025 จัดโดยสถานทูตไทย ณ อังการา ครอบคลุมทักษะการสื่อสาร การเจรจา การเขียนเรซูเม่ และการสัมภาษณ์งาน",
    summaryEn:
      "Asst. Prof. Dr. Teerada Chongkolrattanaporn, Head of the PR Department, led the “Preparing Thai Students in Türkiye to the World of Work” program in Istanbul on 4–5 July 2025, hosted by the Royal Thai Embassy in Ankara — covering communication, negotiation, résumé writing, and job interviews",
    date: "2025-07-04",
    datePrecision: "day",
    professors: ["teerada", "center"],
    type: "Project PR",
    source: "cominnocenter.com + Royal Thai Embassy Ankara",
    url: "/news/turkiye-students-workshop",
    external: false,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-03",
    image: "/images/media/C-03.webp",
    nameTh: "วิเคราะห์ภาพลักษณ์ประเทศไทยบน YouTube หลังกัญชาถูกกฎหมาย (PLOS One)",
    nameEn: "From tradition to progressiveness: Analyzing Thailand's image on YouTube amid post-cannabis legalization",
    summaryTh:
      "วิเคราะห์ภาพลักษณ์ประเทศไทยบน YouTube หลังการถูกกฎหมายกัญชา โดย รศ.ดร.สมิทธิ์ ร่วมเขียนกับ รศ.ดร. Pavel Slutskiy",
    summaryEn:
      "An analysis of Thailand's national image on YouTube following cannabis legalization, co-authored by Smith Boonchutima and Pavel Slutskiy",
    date: "2025-02-07",
    datePrecision: "day",
    professors: ["smith", "pavel"],
    type: "Academic",
    source: "PLOS One",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0317506",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-05",
    image: "/images/media/C-05.webp",
    nameTh: "หนังสือ Global Communication: Planning Global PR Campaigns (Springer 2025)",
    nameEn: "Global Communication: Planning Global PR Campaigns (Springer, 2025)",
    summaryTh:
      "หนังสือเล่มใหม่ของ รศ.ดร. Pavel ที่ตีพิมพ์กับ Springer เกี่ยวกับการวางแผนแคมเปญประชาสัมพันธ์ระดับโลก",
    summaryEn:
      "Assoc. Prof. Dr. Pavel Slutskiy's new book with Springer on planning global public relations campaigns",
    date: "2025-01-01",
    datePrecision: "year",
    professors: ["pavel"],
    type: "Academic",
    source: "Springer Nature",
    // Notion ใส่ DOI ของหนังสือปี 2024 มาผิดเล่ม — แก้เป็น DOI จริงของเล่มนี้ (ตรวจกับ Springer แล้ว 16 ส.ค. 2569)
    url: "https://link.springer.com/book/10.1007/978-981-96-7583-8",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-04",
    image: "/images/media/C-04.webp",
    nameTh: "เปิดตัวหลักสูตร Media & Communication for Transnational Citizens",
    nameEn: "Launch of the Media & Communication for Transnational Citizens course",
    summaryTh:
      "รศ.ดร.สมิทธิ์ บุญชุติมา นำทีมเปิดหลักสูตรออนไลน์ 12 เดือนสำหรับ digital nomads และผู้มีพรสวรรค์ระดับโลกในไทย เริ่ม 1 ส.ค. 2024",
    summaryEn:
      "Assoc. Prof. Dr. Smith Boonchutima led the launch of a 12-month online course for digital nomads and global talents in Thailand, starting 1 August 2024",
    date: "2024-06-19",
    datePrecision: "day",
    professors: ["smith", "center"],
    type: "Project PR",
    source: "cominnocenter.com + The Sharpener School",
    url: "/news/media-communication-transnational-citizens",
    external: false,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-09",
    image: "/images/media/C-09.webp",
    nameTh: "หนังสือ Philosophical Foundations of Communication Studies (2024)",
    nameEn: "Philosophical Foundations of Communication Studies (2024)",
    summaryTh:
      "หนังสือ Philosophical Foundations of Communication Studies: a Praxeological Approach ของ รศ.ดร. Pavel ที่พัฒนาแนวทาง epistemological ทางเลือกสำหรับการศึกษาการสื่อสาร",
    summaryEn:
      "Pavel Slutskiy's book Philosophical Foundations of Communication Studies: a Praxeological Approach, developing an alternative epistemological approach to communication studies",
    date: "2024-01-01",
    datePrecision: "year",
    professors: ["pavel"],
    type: "Academic",
    source: "Springer / Academic publisher",
    url: "https://link.springer.com/book/10.1007/978-981-97-1013-3",
    external: true,
    priority: "High",
    langOrig: "EN",
  },
  {
    code: "C-01",
    image: "/images/media/C-01.webp",
    nameTh: "สสส. จัดอบรม “Simple Drug Communication as Daily Routine” โดย ผศ.ดร.ธีรดา",
    nameEn: "ThaiHealth's “Simple Drug Communication as Daily Routine” training, led by Dr. Teerada",
    summaryTh:
      "สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.) จัดอบรม “Simple Drug Communication as Daily Routine” โดยมี ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ เป็นวิทยากร",
    summaryEn:
      "The Thai Health Promotion Foundation (ThaiHealth) held the “Simple Drug Communication as Daily Routine” training, with Asst. Prof. Dr. Teerada Chongkolrattanaporn as speaker",
    date: "2024-01-01",
    datePrecision: "year",
    professors: ["teerada", "center"],
    type: "Project PR",
    source: "สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)",
    sourceEn: "Thai Health Promotion Foundation (ThaiHealth)",
    url: "/news/thai-health-drug-communication",
    external: false,
    priority: "High",
    langOrig: "TH",
  },
  // ---------- Priority: Medium ----------
  {
    code: "C-20",
    image: "/images/media/C-20.webp",
    nameTh: "ผลการวิจัยแนวโน้มการประชาสัมพันธ์ของไทย 2026",
    nameEn: "Research findings on Thailand's public relations trends 2026",
    summaryTh:
      "รศ.ดร.สมิทธิ์ เผยแพร่ผลการวิจัยแนวโน้มการประชาสัมพันธ์ของไทยปี 2026 โดยอ้างอิงจาก Positioning Magazine",
    summaryEn:
      "Assoc. Prof. Dr. Smith Boonchutima shared research findings on Thailand's 2026 public relations trends, as reported by Positioning Magazine",
    date: "2026-06-16",
    datePrecision: "day",
    professors: ["smith"],
    type: "Social",
    source: "Positioning Magazine",
    url: "https://positioningmag.com/pr-news/113649",
    external: true,
    priority: "Medium",
    langOrig: "TH",
  },
  {
    code: "C-15",
    image: "/images/media/C-15.webp",
    nameTh: "ทำไมแฟนเพลงผูกพันกับแอปสตรีมมิงมากกว่าตัวศิลปิน",
    nameEn: "Why fans get attached to music streaming apps, not just the artists",
    summaryTh:
      "งานวิจัยศึกษาความผูกพันของผู้ฟังกับแพลตฟอร์มสตรีมมิงเพลง (เช่น JOOX Rooms) ที่ลึกกว่าความผูกพันกับศิลปินเอง",
    summaryEn:
      "A study of listeners' attachment to music streaming platforms (such as JOOX Rooms) that runs deeper than attachment to the artists themselves",
    date: "2026-05-01",
    datePrecision: "month",
    professors: ["smith"],
    type: "Academic",
    source: "Cogent Arts & Humanities",
    url: "https://www.tandfonline.com/doi/full/10.1080/23311983.2026.2675861",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-14",
    image: "/images/media/C-14.webp",
    nameTh: "10 ปี Impulse Bangkok — สุขภาพทางเพศและชุมชน",
    nameEn: "Ten years of Impulse Bangkok — sexual health and community",
    summaryTh:
      "สรุปผลงาน 10 ปีของ Impulse Bangkok: 35 กิจกรรม การตรวจ HIV ฟรี 1,544 ครั้ง ผู้เข้าร่วม 5,210 คน สะท้อนบทบาทด้านการสื่อสารสุขภาพ",
    summaryEn:
      "A recap of Impulse Bangkok's first decade: 35 events, 1,544 free HIV tests, and 5,210 participants — reflecting the center's role in health communication",
    date: "2026-04-22",
    datePrecision: "day",
    professors: ["smith"],
    type: "Social",
    source: "Impulse Bangkok + The People",
    url: "https://www.thepeople.co/event/information/57163",
    external: true,
    priority: "Medium",
    langOrig: "TH",
  },
  {
    code: "C-19",
    image: "/images/media/C-19.webp",
    nameTh: "เมื่อ Gen Z ไทยเปลี่ยนอนิเมะจาก stigma เป็นตัวตนกระแสหลัก",
    nameEn: "How Thai Gen Z turned anime from a stigma into a mainstream identity",
    summaryTh:
      "วิเคราะห์การที่ Gen Z ไทยเปลี่ยนสถานะของอนิเมะจากความอายกลายเป็นตัวตนและพลังทางวัฒนธรรมหลัก",
    summaryEn:
      "An analysis of how Thai Gen Z transformed anime from a stigma into a mainstream identity and cultural force",
    date: "2026-03-01",
    datePrecision: "month",
    professors: ["smith"],
    type: "Academic",
    source: "Cogent Arts & Humanities",
    url: "https://www.tandfonline.com/doi/full/10.1080/23311983.2026.2647143",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-13",
    image: "/images/media/C-13.webp",
    nameTh: "การวัด stigma ของโรคในกลุ่ม MSM และแรงงานเมียนมาในประเทศไทย",
    nameEn: "Measuring disease stigma in Thailand (MSM and Myanmar migrant communities)",
    summaryTh:
      "งานวิจัยเกี่ยวกับการวัด stigma ของโรคในกลุ่มชายที่มีเพศสัมพันธ์กับชาย (MSM) และแรงงานข้ามชาติเมียนมาในประเทศไทย",
    summaryEn:
      "Research on measuring disease stigma among MSM and Myanmar migrant communities in Thailand",
    date: "2026-02-01",
    datePrecision: "month",
    professors: ["smith"],
    type: "Academic",
    source: "Wellcome Open Research",
    url: "https://wellcomeopenresearch.org/articles/11-151",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-21",
    image: "/images/media/C-21.webp",
    nameTh: "โฆษณาช่วยรับมือรีวิวเชิงลบออนไลน์ได้อย่างไร",
    nameEn: "How advertising can fight back against negative online reviews",
    summaryTh:
      "งานวิจัยเรื่องผลกระทบของ negative word-of-mouth และบทบาทของการโฆษณาในการบรรเทาผลกระทบ โดย รศ.ดร.สมิทธิ์ ร่วมกับ Safeena Yaseen และ Ibtesam Mazahir",
    summaryEn:
      "Research on the impact of negative word-of-mouth and advertising's role in mitigating it, by Smith Boonchutima with Safeena Yaseen and Ibtesam Mazahir",
    date: "2025-07-01",
    datePrecision: "month",
    professors: ["smith"],
    type: "Academic",
    source: "Cogent Social Sciences (Taylor & Francis)",
    url: "https://www.tandfonline.com/doi/full/10.1080/23311886.2025.2526800",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-16",
    image: "/images/media/C-16.webp",
    nameTh: "การรับรู้ของผู้ใช้โซเชียลมีเดียต่อการลงทุนคริปโตเคอร์เรนซี (Reddit study)",
    nameEn: "Perception of social media users regarding cryptocurrency investment adoption (Reddit study)",
    summaryTh:
      "งานวิจัยร่วมกับ Athit Rodpangtiam และ Ibtesam Mazahir ศึกษาการรับรู้ของผู้ใช้ Reddit ต่อการลงทุนคริปโตเคอร์เรนซี",
    summaryEn:
      "A study with Athit Rodpangtiam and Ibtesam Mazahir on Reddit users' perception of cryptocurrency investment adoption",
    date: "2024-09-14",
    datePrecision: "day",
    professors: ["smith"],
    type: "Academic",
    source: "Cogent Business & Management (Taylor & Francis)",
    url: "https://www.tandfonline.com/doi/full/10.1080/23311975.2024.2402513",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-18",
    image: "/images/media/C-18.webp",
    nameTh: "โปรแกรมสุขภาพแบบเกมป้องกันการบาดเจ็บจากการทำงานของแรงงานเมียนมา",
    nameEn: "Gamified health intervention to prevent work injuries in Myanmar migrants",
    summaryTh:
      "โปรโตคอลการศึกษาการใช้ gamification เพื่อป้องกันอาการบาดเจ็บจากการทำงานของแรงงานเมียนมาในโรงงานอาหารทะเลไทย",
    summaryEn:
      "A study protocol using gamification to prevent workplace injuries among Myanmar migrant workers in Thai seafood factories",
    date: "2024-06-28",
    datePrecision: "day",
    professors: ["smith"],
    type: "Academic",
    source: "Wellcome Open Research",
    url: "https://wellcomeopenresearch.org/articles/9-345",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-10",
    image: "/images/media/C-10.webp",
    nameTh: "Cognitive Load Theory ในการศึกษาออนไลน์ (IEEE TENCON 2023)",
    nameEn: "Cognitive Load Theory in Online Education (IEEE TENCON 2023)",
    summaryTh:
      "งานวิจัยร่วมระหว่าง รศ.ดร.สมิทธิ์, ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ และ อ.ดร.วรรษยุต คงจันทร์ เรื่อง Cognitive Load Theory ในการศึกษาออนไลน์ ตีพิมพ์ปี 2023 และยังถูกอ้างอิงต่อเนื่อง",
    summaryEn:
      "Joint research by Smith Boonchutima, Teerada Chongkolrattanaporn, and Wassayut Kongjan on Cognitive Load Theory in online education — published in 2023 and still being cited",
    date: "2023-10-31",
    datePrecision: "day",
    professors: ["smith", "teerada", "watsayut"],
    type: "Academic",
    source: "IEEE TENCON 2023",
    url: "https://ieeexplore.ieee.org/document/10322455",
    external: true,
    priority: "Medium",
    langOrig: "EN",
  },
  {
    code: "C-11",
    image: "/images/media/C-11.webp",
    nameTh: "ช่อง YouTube ของศูนย์ Communication Innovation",
    nameEn: "The Communication Innovation center's YouTube channel",
    summaryTh:
      "ช่อง YouTube ของศูนย์ Communication Innovation รวมคลิปวิจัยและกิจกรรมต่างๆ ใช้เป็นแหล่งสื่อของศูนย์เอง",
    summaryEn:
      "The center's own YouTube channel, collecting research clips and activities as a first-party media outlet",
    date: "2024-01-01",
    datePrecision: "year",
    professors: ["center"],
    type: "Social",
    source: "YouTube",
    url: "https://www.youtube.com/channel/UCHSgYLtnzQSsy3CZh8beDow",
    external: true,
    priority: "Medium",
    langOrig: "TH",
  },
  {
    code: "C-17",
    image: "/images/media/C-17.webp",
    nameTh: "อ.ดร.วรรษยุต คงจันทร์ — ช่อง YouTube สอน SPSS และเครื่องมือวิจัย",
    nameEn: "Dr. Wassayut Kongjan's YouTube channel teaching SPSS and research tools",
    summaryTh:
      "ช่อง YouTube ของ อ.ดร.วรรษยุต คงจันทร์ มีคลิปสอน SPSS ขั้นพื้นฐานและการวิเคราะห์ข้อมูลสำหรับการวิจัย มีผู้ชมสูงในกลุ่มนักศึกษา ใช้เป็นแหล่งความรู้สาธารณะ",
    summaryEn:
      "Dr. Wassayut Kongjan's YouTube channel with tutorials on SPSS basics and research data analysis — popular among students as a public learning resource",
    date: "2024-01-01",
    datePrecision: "year",
    professors: ["watsayut"],
    type: "Social",
    source: "YouTube",
    url: "https://www.youtube.com/channel/UC6Bqg8a_jZFUr2__YxmaXjw",
    external: true,
    priority: "Medium",
    langOrig: "TH",
  },
  {
    code: "C-12",
    image: "/images/media/C-12.webp",
    nameTh: "ความร่วมมือและโครงการอบรมกับพันธมิตร (ThaiHealth, FDA, Keio ฯลฯ)",
    nameEn: "Training collaborations with partners (ThaiHealth, FDA, Keio, and more)",
    summaryTh:
      "ศูนย์ฯ มีกิจกรรมอบรมและโครงการร่วมกับ สสส. (ThaiHealth), อย. (FDA), Keio University, กรมบัญชีกลาง, กรุงไทย และพันธมิตรอื่นๆ",
    summaryEn:
      "The center runs training programs and projects with ThaiHealth, the Thai FDA, Keio University, the Comptroller General's Department, Krungthai Bank, and other partners",
    date: "2024-01-01",
    datePrecision: "year",
    professors: ["center", "smith"],
    type: "Project PR",
    source: "cominnocenter.com",
    url: "/news",
    external: false,
    priority: "Medium",
    langOrig: "TH",
  },
  // ---------- Priority: Low ----------
  {
    code: "C-22",
    image: "/images/media/C-22.webp",
    nameTh: "ความน่าเชื่อถือของการสื่อสารอย่างเป็นทางการช่วงโควิดในประเทศไทย",
    nameEn: "Credibility of the official COVID communication in Thailand",
    summaryTh:
      "งานวิจัยร่วมระหว่าง รศ.ดร. Pavel และ รศ.ดร.สมิทธิ์ เกี่ยวกับความน่าเชื่อถือของการสื่อสารอย่างเป็นทางการของรัฐบาลไทยในช่วงโควิด",
    summaryEn:
      "Joint research by Pavel Slutskiy and Smith Boonchutima on the credibility of the Thai government's official communication during COVID",
    date: "2022-01-01",
    datePrecision: "year",
    professors: ["pavel", "smith"],
    type: "Academic",
    source: "American Behavioral Scientist",
    url: "https://journals.sagepub.com/doi/10.1177/00027642221118297",
    external: true,
    priority: "Low",
    langOrig: "EN",
  },
];

const PRIORITY_ORDER: Record<MediaPriority, number> = { High: 0, Medium: 1, Low: 2 };

/** เรียงตามกติกา Notion: Priority (High→Low) แล้ววันที่ใหม่→เก่า */
export const mediaSorted: MediaMention[] = [...mediaMentions].sort((a, b) => {
  const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  if (p !== 0) return p;
  return b.date.localeCompare(a.date);
});

/** อาจารย์ที่มีผลงานจริงในชุดข้อมูล (ใช้สร้างชิป filter) */
export const mediaProfessors: MediaProfessorKey[] = ["smith", "teerada", "pavel", "watsayut", "center"];

/** ประเภทที่มีจริงในชุดข้อมูล (ใช้สร้างชิป filter) */
export const mediaTypes: MediaType[] = Array.from(new Set(mediaSorted.map((m) => m.type)));
