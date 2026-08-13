/**
 * ข่าวและผลงานเด่นของผู้นำ / ศูนย์
 * ใช้ร่วมกันระหว่างหน้า About (ใต้โปรไฟล์) และหน้า Home (แถบ Highlights)
 * อัปเดตล่าสุด: 2026-08-14
 */

export type HighlightType = "research" | "award" | "media" | "event" | "book" | "leadership";

export type HighlightPerson =
  | "smith"
  | "teerada"
  | "pavel"
  | "wattana"
  | "watsayut"
  | "lunchakorn"
  | "center";

export type Highlight = {
  id: string;
  titleTh: string;
  titleEn: string;
  summaryTh: string;
  summaryEn: string;
  date: string; // YYYY-MM-DD
  type: HighlightType;
  person: HighlightPerson[];
  href?: string;
  source?: string;
  featuredOnHome?: boolean;
};

export const highlights: Highlight[] = [
  {
    id: "teerada-rueang-khong-rao",
    titleTh: "ภาพยนตร์ ‘เรื่องของเรา’ จากงานวิจัยสู่สันติภาพชายแดนใต้",
    titleEn: "Film ‘Rueang Khong Rao’ — from research to peace in the Deep South",
    summaryTh:
      "ผศ.ดร.ธีรดา หัวหน้าโครงการวิจัยทุน วช. ใช้กระบวนทัศน์การเล่าเรื่องที่ข้ามพ้นตัวตน สร้างภาพยนตร์สั้นเพื่อเปิดพื้นที่ความเข้าใจและขับเคลื่อนสันติภาพ",
    summaryEn:
      "Asst. Prof. Dr. Teerada led an NRCT-funded project using self-transcendental narrative to create a short film that opens space for understanding and peacebuilding in Thailand’s Deep South.",
    date: "2025-05-06",
    type: "media",
    person: ["teerada", "center"],
    href: "https://www.ryt9.com/s/prg/12708109",
    source: "RYT9 / คณะนิเทศศาสตร์ จุฬาฯ",
    featuredOnHome: true,
  },
  {
    id: "smith-acmc-president",
    titleTh: "รศ.ดร.สมิทธิ์ ดำรงตำแหน่งประธาน Asian Congress for Media and Communication",
    titleEn: "Assoc. Prof. Dr. Smith Boonchutima elected President of ACMC",
    summaryTh:
      "เป็นประธาน Asian Congress for Media and Communication (ACMC) ตั้งแต่ปี 2024 เชื่อมเครือข่ายสื่อและวิชาการระดับเอเชีย",
    summaryEn:
      "Serving as President of the Asian Congress for Media and Communication (ACMC) since 2024, strengthening Asia-wide media and academic networks.",
    date: "2024-06-01",
    type: "leadership",
    person: ["smith", "center"],
    href: "https://www.asianmediacongress.org/",
    source: "ACMC / ORCID",
    featuredOnHome: true,
  },
  {
    id: "wattana-nrct-award",
    titleTh: "ศ.ดร.วธนน์ รับรางวัลนักวิจัยดีเด่นแห่งชาติ 2565",
    titleEn: "Prof. Dr. Wattana named National Outstanding Researcher 2022",
    summaryTh:
      "รางวัลนักวิจัยดีเด่นแห่งชาติ ประจำปี 2565 สาขาเทคโนโลยีสารสนเทศและนิเทศศาสตร์ จาก วช. จากงานวิจัย Blockchain และ IoT เพื่อประสิทธิภาพกระบวนการธุรกิจ",
    summaryEn:
      "National Outstanding Researcher Award 2022 (Information Technology & Communication Arts) from NRCT for research on Blockchain and IoT in business processes.",
    date: "2022-01-06",
    type: "award",
    person: ["wattana", "center"],
    href: "https://www.chula.ac.th/news/58581/",
    source: "จุฬาลงกรณ์มหาวิทยาลัย",
    featuredOnHome: true,
  },
  {
    id: "pavel-springer-books",
    titleTh: "หนังสือระดับ Springer ของ รศ.ดร. Pavel Slutskiy",
    titleEn: "Springer books by Assoc. Prof. Dr. Pavel Slutskiy",
    summaryTh:
      "ผู้เขียน Communication and Libertarianism (2021), Philosophical Foundations of Communication Studies (2024) และ Global Communication: Planning Global PR Campaigns (2025)",
    summaryEn:
      "Author of Communication and Libertarianism (2021), Philosophical Foundations of Communication Studies (2024), and Global Communication: Planning Global PR Campaigns (2025).",
    date: "2025-07-05",
    type: "book",
    person: ["pavel"],
    href: "https://link.springer.com/book/10.1007/978-981-97-1013-3",
    source: "Springer Nature",
    featuredOnHome: true,
  },
  {
    id: "smith-dengue-study",
    titleTh: "งานวิจัยระยะยาวเรื่องสื่อกับการป้องกันไข้เลือดออกในไทย",
    titleEn: "Longitudinal study on media and dengue prevention in Thailand",
    summaryTh:
      "ศึกษา 25 จังหวัด (2013–2015) เรื่องการเปิดรับสื่อ ความรู้ และพฤติกรรมการป้องกันไข้เลือดออก ตีพิมพ์ใน Journal of Infection and Public Health",
    summaryEn:
      "A 25-province longitudinal study (2013–2015) on media exposure, knowledge, and dengue prevention behavior, published in the Journal of Infection and Public Health.",
    date: "2017-11-01",
    type: "research",
    person: ["smith"],
    href: "https://www.sciencedirect.com/science/article/pii/S1876034117300515",
    source: "Journal of Infection and Public Health",
    featuredOnHome: false,
  },
  {
    id: "smith-pavel-covid",
    titleTh: "ความน่าเชื่อถือของการสื่อสารโควิดของภาครัฐไทย",
    titleEn: "Credibility of official COVID communication in Thailand",
    summaryTh:
      "งานวิจัยร่วม รศ.ดร.สมิทธิ์ และ รศ.ดร.Pavel วิเคราะห์เมื่อประชาชนหยุดเชื่อถือการสื่อสารทางการ ตีพิมพ์ใน American Behavioral Scientist",
    summaryEn:
      "Joint research by Assoc. Prof. Dr. Smith and Assoc. Prof. Dr. Pavel on when the public stopped trusting official messaging, published in American Behavioral Scientist.",
    date: "2022-08-01",
    type: "research",
    person: ["smith", "pavel"],
    href: "https://journals.sagepub.com/doi/abs/10.1177/00027642221118297",
    source: "American Behavioral Scientist",
    featuredOnHome: false,
  },
  {
    id: "lunchakorn-metaverse",
    titleTh: "ศ.ดร.ลัญฉกร ขับเคลื่อน Metaverse และแพลตฟอร์ม MANGOs",
    titleEn: "Prof. Dr. Lunchakorn leads Metaverse and MANGOs platform",
    summaryTh:
      "ผู้นำด้านเมตาเวิร์สการศึกษา หอประวัติจุฬาฯ บนโลกเสมือน และ Thailand Metaverse Hackathon เชื่อมเครือข่ายกว่า 10 ประเทศ",
    summaryEn:
      "Leader in educational metaverse — Chula virtual history hall, Thailand Metaverse Hackathon, and the MANGOs academic nexus spanning 10+ countries.",
    date: "2026-03-21",
    type: "event",
    person: ["lunchakorn", "center"],
    href: "https://www.eng.chula.ac.th/th/60251",
    source: "คณะวิศวกรรมศาสตร์ จุฬาฯ",
    featuredOnHome: false,
  },
  {
    id: "smith-hiv-engage",
    titleTh: "โมเดล ENGAGE-A3 สื่อสารความเสี่ยง HIV ในแรงงานข้ามชาติ",
    titleEn: "ENGAGE-A3 model for HIV risk communication among migrant workers",
    summaryTh:
      "พัฒนารูปแบบการสื่อสารความเสี่ยงเอดส์สำหรับแรงงานข้ามชาติพม่าในไทย จากงานวิจัยระดับปริญญาเอกและตีพิมพ์ต่อเนื่อง",
    summaryEn:
      "Developed the ENGAGE-A3 AIDS risk communication model for Myanmar migrant workers in Thailand, grounded in doctoral research and follow-up publications.",
    date: "2019-01-01",
    type: "research",
    person: ["smith"],
    href: "https://hivaids.termedia.pl/Author-Smith-Boonchutima/69112",
    source: "HIV & AIDS Review",
    featuredOnHome: false,
  },
];

/** รายการที่แสดงบนหน้า Home */
export const homeHighlights = highlights.filter((h) => h.featuredOnHome);

/** รายการตามบุคคล (ใช้ใต้โปรไฟล์ในหน้า About) */
export function highlightsFor(person: HighlightPerson): Highlight[] {
  return highlights.filter((h) => h.person.includes(person));
}
