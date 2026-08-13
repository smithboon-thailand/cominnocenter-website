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
  // ——— ข่าวเด่นล่าสุด ———
  {
    id: "smith-impulse-lgbtq-10y",
    titleTh: "เปิดข้อมูลสุขภาพ LGBTQ+ รอบ 10 ปี — Impulse Bangkok",
    titleEn: "10-year LGBTQ+ urban health data — Impulse Bangkok",
    summaryTh:
      "รศ.ดร.สมิทธิ์ ในฐานะประธาน Impulse Bangkok เปิดเผยข้อมูล 10 ปี (2016–2025) พบอัตราซิฟิลิสสูงกว่าเอชไอวี คนเมืองยัง ‘รู้แต่ไม่ตรวจ’ เพราะตีตรา ผลักดัน Dual Testing และระบบสุขภาพเมืองแบบองค์รวม",
    summaryEn:
      "As President of Impulse Bangkok, Assoc. Prof. Dr. Smith released 10-year data (2016–2025): syphilis positivity exceeded HIV; stigma still blocks testing. Advocates Dual Testing and a holistic urban health system.",
    date: "2026-07-22",
    type: "media",
    person: ["smith", "center"],
    href: "https://www.matichon.co.th/local/quality-life/news_5817075",
    source: "มติชน",
    featuredOnHome: true,
  },
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
    id: "smith-thai-media-trends-2024",
    titleTh: "วิเคราะห์ Thai Media Trends 2024 — นิเทศจุฬาฯ × DataXet",
    titleEn: "Thai Media Trends 2024 analysis — Comm Arts Chula × DataXet",
    summaryTh:
      "รศ.ดร.สมิทธิ์ วิเคราะห์แนวโน้มสื่อไทย 2024–2025: สตรีมมิงโตเร็ว AR/VR ในแคมเปญ นิชคอนเทนต์แทนมวลชน ความจริงใจของอินฟลูเอนเซอร์ และบทบาท AI ในการสร้างคอนเทนต์",
    summaryEn:
      "Assoc. Prof. Dr. Smith analyzed Thai media trends for 2024–2025: faster streaming, AR/VR in campaigns, niche over mass content, authenticity of influencers, and AI in content creation.",
    date: "2023-12-12",
    type: "media",
    person: ["smith"],
    href: "https://www.dataxet.co/media-landscape/2024-th/thai-media-trends/nitade-chula",
    source: "DataXet",
    featuredOnHome: false,
  },
  {
    id: "smith-ha-public-communication",
    titleTh: "รศ.ดร.สมิทธิ์ ในคณะอนุกรรมการขับเคลื่อนการสื่อสารสาธารณะ — HA Forum",
    titleEn: "Assoc. Prof. Dr. Smith on the Public Communication Subcommittee — HA Forum",
    summaryTh:
      "ร่วมเป็นคณะอนุกรรมการขับเคลื่อนการสื่อสารสาธารณะ ในเวที HA National Forum สะท้อนบทบาทด้านสื่อสารสุขภาพระดับชาติ",
    summaryEn:
      "Serves on the Public Communication Subcommittee at the HA National Forum, reflecting a national role in health communication.",
    date: "2024-01-01",
    type: "leadership",
    person: ["smith"],
    href: "https://www.youtube.com/watch?v=cR7j0njbOVI",
    source: "HA Thailand",
    featuredOnHome: false,
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

  // ——— ธีรดา: บทบาท / งานวิจัยเพิ่มเติม ———
  {
    id: "teerada-pr-dept-head",
    titleTh: "ผศ.ดร.ธีรดา หัวหน้าภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาฯ",
    titleEn: "Asst. Prof. Dr. Teerada — Head of Department of Public Relations",
    summaryTh:
      "ดำรงตำแหน่งหัวหน้าภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย เคยเป็นรองคณบดีฝ่ายวิจัยและกิจการต่างประเทศ",
    summaryEn:
      "Serves as Head of the Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University; formerly Deputy Dean for Research and International Affairs.",
    date: "2022-01-01",
    type: "leadership",
    person: ["teerada", "center"],
    href: "https://www.commarts.chula.ac.th/en/department-pr/",
    source: "คณะนิเทศศาสตร์ จุฬาฯ",
    featuredOnHome: false,
  },
  {
    id: "teerada-chatgpt-journalists",
    titleTh: "งานวิจัยผลกระทบ ChatGPT ต่อห้องข่าวไทย",
    titleEn: "Survey on journalists’ use and impact of ChatGPT on Thai newsrooms",
    summaryTh:
      "ศึกษาการใช้และการรับรู้ผลกระทบของ ChatGPT ในห้องข่าวไทย — งานวิจัยล่าสุดด้านสื่อสารมวลชนและเทคโนโลยี AI",
    summaryEn:
      "Research on how Thai journalists use ChatGPT and perceive its impact on newsroom practice — recent work on AI and journalism.",
    date: "2025-01-01",
    type: "research",
    person: ["teerada"],
    href: "https://scholar.google.com/citations?user=9xkSA7sAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },
  {
    id: "teerada-env-comm-universities",
    titleTh: "บทบาทมหาวิทยาลัยกับการสื่อสารสิ่งแวดล้อมในไทย",
    titleEn: "Roles of universities in environmental communication in Thailand",
    summaryTh:
      "งานวิจัยบทบาทของมหาวิทยาลัยและนักวิชาการในการสื่อสารสิ่งแวดล้อมในประเทศไทย เชื่อมโยงกับความเชี่ยวชาญด้าน green / environmental communication",
    summaryEn:
      "Research on the roles of universities and academic researchers in environmental communication in Thailand.",
    date: "2024-01-01",
    type: "research",
    person: ["teerada"],
    href: "https://scholar.google.com/citations?user=9xkSA7sAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },
  {
    id: "teerada-cognitive-load-technostress",
    titleTh: "งานวิจัย Cognitive Load และ Technostress ในการเรียนออนไลน์",
    titleEn: "Cognitive Load Theory and technostress in online education",
    summaryTh:
      "งานวิจัยเรื่อง Cognitive Load Theory และการรับรู้ technostress ของนิสิตในช่วงโควิด — ตีพิมพ์ปี 2023",
    summaryEn:
      "Published research (2023) on Cognitive Load Theory in online education and technostress among first-year university students during COVID-19.",
    date: "2023-01-01",
    type: "research",
    person: ["teerada"],
    href: "https://scholar.google.com/citations?user=9xkSA7sAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },

  // ——— Pavel: งานวิจัยเพิ่มเติม ———
  {
    id: "pavel-sdg-sustainability",
    titleTh: "วิเคราะห์ความรับผิดชอบด้าน SDGs ขององค์กร 5 ประเทศ",
    titleEn: "Companies’ accountability in sustainability: SDGs in five countries",
    summaryTh:
      "งานวิจัยเปรียบเทียบการสื่อสารความรับผิดชอบด้าน SDGs ของบริษัทใน 5 ประเทศ — เป็นหนึ่งในผลงานที่ถูกอ้างอิงสูงของ รศ.ดร.Pavel",
    summaryEn:
      "Comparative analysis of companies’ SDG accountability communication across five countries — among Assoc. Prof. Dr. Pavel’s most cited works.",
    date: "2016-01-01",
    type: "research",
    person: ["pavel"],
    href: "https://scholar.google.com/citations?user=1v6dmxQAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },
  {
    id: "pavel-freedom-expression",
    titleTh: "เสรีภาพในการแสดงออก การเซ็นเซอร์โซเชียลมีเดีย และสิทธิในทรัพย์สิน",
    titleEn: "Freedom of expression, social media censorship, and property rights",
    summaryTh:
      "งานวิจัยด้านเสรีภาพสื่อ การเซ็นเซอร์บนโซเชียลมีเดีย และแนวคิด libertarian ในบริบทการสื่อสาร",
    summaryEn:
      "Research on freedom of expression, social media censorship, and property rights — core themes in his libertarian communication scholarship.",
    date: "2020-01-01",
    type: "research",
    person: ["pavel"],
    href: "https://scholar.google.com/citations?user=1v6dmxQAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },
  {
    id: "pavel-sustainability-comm-eval",
    titleTh: "กรอบประเมินการสื่อสารความยั่งยืนตามเป้าหมายที่ตั้งไว้",
    titleEn: "Evaluating sustainability communication based on intended goals",
    summaryTh:
      "งานวิจัยปี 2024 เสนอแนวทางประเมินการสื่อสารความยั่งยืนโดยยึดเป้าหมายที่องค์กรตั้งไว้",
    summaryEn:
      "2024 research proposing approaches to evaluate sustainability communication against organizations’ intended goals.",
    date: "2024-01-01",
    type: "research",
    person: ["pavel"],
    href: "https://scholar.google.com/citations?user=1v6dmxQAAAAJ&hl=en",
    source: "Google Scholar",
    featuredOnHome: false,
  },

  // ——— วธนน์: งานวิจัย / บทบาท ———
  {
    id: "wattana-blockchain-iot",
    titleTh: "วิจัย Blockchain และ IoT เพื่อ Digital Transformation กระบวนการธุรกิจ",
    titleEn: "Blockchain and IoT for business process Digital Transformation",
    summaryTh:
      "ผลงานวิจัยหลักที่นำไปสู่รางวัลนักวิจัยดีเด่นแห่งชาติ — ประยุกต์ Blockchain ร่วมกับ IoT เพื่อความปลอดภัยของข้อมูล ประสิทธิภาพ และ Smart City",
    summaryEn:
      "Core research applying Blockchain with IoT for secure data, process automation, Digital Transformation, and Smart City applications — foundation of the national research award.",
    date: "2022-01-06",
    type: "research",
    person: ["wattana", "center"],
    href: "https://www.chula.ac.th/news/58581/",
    source: "จุฬาลงกรณ์มหาวิทยาลัย",
    featuredOnHome: false,
  },

  // ——— ข่าว/อบรมจากเว็บเดิม ComInnoCenter ———
  {
    id: "keio-bunkyo-collaboration",
    titleTh: "คณะนิเทศศาสตร์ จุฬาฯ เสริมความร่วมมือวิชาการกับ Keio และ Bunkyo University",
    titleEn: "Chula Communication Arts strengthens collaboration with Keio and Bunkyo University",
    summaryTh:
      "คณาจารย์และนิสิตภาควิชาการประชาสัมพันธ์ เยือน Keio University (KMD) และ Bunkyo University จัดเวิร์กช็อป Peace Playground โดย ผศ.ดร.ธีรดา และหารือแลกเปลี่ยนนักศึกษา หลักสูตร และวิจัยร่วม",
    summaryEn:
      "Faculty and students from the Department of Public Relations visited Keio University’s KMD and Bunkyo University for a Peace Playground workshop led by Asst. Prof. Dr. Teerada and discussions on exchanges, curriculum, and joint research.",
    date: "2026-03-15",
    type: "event",
    person: ["teerada", "center"],
    href: "https://www.cominnocenter.com/post/chula-communication-arts-strengthens-academic-collaboration-with-keio-university-and-bunkyo-universi",
    source: "ComInnoCenter",
    featuredOnHome: true,
  },
  {
    id: "smith-treasury-officer-lecture",
    titleTh: "รศ.ดร.สมิทธิ์ บรรยายพิเศษหลักสูตรนายคลังมืออาชีพ รุ่นที่ 15",
    titleEn: "Assoc. Prof. Dr. Smith delivers special lecture at Professional Treasury Officer Program",
    summaryTh:
      "บรรยาย “เทคนิคการสื่อสารเพื่อการบริหารและการประชาสัมพันธ์” ให้ผู้บริหารภาครัฐ 60 คน ครอบคลุมกลยุทธ์สื่อสารองค์กร การจัดการสารสนเทศดิจิทัล และการสื่อสารวิกฤต จัดโดยมูลนิธิสถาบันวิจัยนโยบายเศรษฐกิจการคลัง",
    summaryEn:
      "Special lecture on communication techniques for administration and public relations for 60 government executives, covering strategy, digital information management, and crisis communication — organized by the Fiscal Policy Research Institute Foundation.",
    date: "2025-08-06",
    type: "event",
    person: ["smith", "center"],
    href: "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchutima-delivers-special-lecture-at-professional-treasury-officer",
    source: "ComInnoCenter",
    featuredOnHome: false,
  },
  {
    id: "smith-krungthai-leadership",
    titleTh: "รศ.ดร.สมิทธิ์ วิทยากร Leadership Acceleration Program ธนาคารกรุงไทย",
    titleEn: "Assoc. Prof. Dr. Smith leads Leadership training at Krungthai Bank",
    summaryTh:
      "บรรยาย “The Art of Communication & Influencing” ให้ผู้บริหารระดับกลาง ครอบคลุมการสื่อสารองค์กร การจัดการความขัดแย้ง การสื่อสารวิกฤต และการใช้ AI ในการประชาสัมพันธ์ จัดโดยศศินทร์",
    summaryEn:
      "Keynote on “The Art of Communication & Influencing” for Krungthai Bank middle managers — organizational communication, conflict and crisis communication, and AI tools for PR — organized by Sasin.",
    date: "2025-07-23",
    type: "event",
    person: ["smith", "center"],
    href: "https://www.cominnocenter.com/post/associate-professor-dr-smith-boonchotima-delivers-leadership-training-at-krungthai-bank",
    source: "ComInnoCenter / Sasin",
    featuredOnHome: true,
  },
  {
    id: "teerada-thaihealth-drug-communication",
    titleTh: "ผศ.ดร.ธีรดา วิทยากรอบรม สสส. “พูดเรื่อง(ยา)ง่ายๆ ให้เป็น Routine”",
    titleEn: "Asst. Prof. Dr. Teerada leads ThaiHealth workshop on simple drug communication",
    summaryTh:
      "อบรมเชิงปฏิบัติการที่อยุธยา เรื่องการสื่อสารเรื่องยาให้เข้าใจง่าย สร้างเครือข่ายผู้ถ่ายทอดความรู้การใช้ยาอย่างสมเหตุผลในครอบครัวและชุมชน",
    summaryEn:
      "Hands-on workshop in Ayutthaya on communicating about medicines simply, building a network of facilitators for rational drug use in families and communities — organized by ThaiHealth.",
    date: "2025-07-21",
    type: "event",
    person: ["teerada", "center"],
    href: "https://www.cominnocenter.com/post/thai-health-promotion-foundation-organises-simple-drug-communication-as-daily-routine-training-by",
    source: "ComInnoCenter / สสส.",
    featuredOnHome: false,
  },
  {
    id: "teerada-fda-rational-drug-summit",
    titleTh: "ศูนย์ฯ ร่วม อย. และ สสส. ขับเคลื่อนความตระหนักใช้ยาอย่างสมเหตุผล",
    titleEn: "Comm Art Chula & CE drives national drug safety awareness at FDA Summit",
    summaryTh:
      "ผศ.ดร.ธีรดา และทีม จัดนิทรรศการเชิงโต้ตอบ “กินยาสมเหตุ หายโรคสมผล ทุกคนสมใจ” ในงานประชุมระดับชาติครั้งที่ 1 ด้านการส่งเสริมการใช้ยาอย่างสมเหตุผล จากโครงการวิจัยทุน สสส.",
    summaryEn:
      "Asst. Prof. Dr. Teerada and team presented the interactive exhibition on rational drug use at Thailand’s First National Forum, as part of a ThaiHealth-funded research project on communication to reduce kidney disease risk.",
    date: "2025-07-09",
    type: "event",
    person: ["teerada", "center"],
    href: "https://www.cominnocenter.com/post/comm-art-chula-ce-drives-national-drug-safety-awareness-at-fda-summit",
    source: "ComInnoCenter / อย. / สสส.",
    featuredOnHome: false,
  },
  {
    id: "teerada-turkiye-workforce-workshop",
    titleTh: "ผศ.ดร.ธีรดา นำเวิร์กช็อปเตรียมนักศึกษาไทยในตุรกีเข้าสู่โลกการทำงาน",
    titleEn: "Asst. Prof. Dr. Teerada leads workshop for Thai students in Türkiye",
    summaryTh:
      "วิทยากรหลักโครงการ Preparing Thai Students in Türkiye to the World of Work ที่อิสตันบูล จัดโดยสถานเอกอัครราชทูต ณ อังการา ครอบคลุมการสื่อสาร การเจรจา เรซูเม่ และการสัมภาษณ์งาน",
    summaryEn:
      "Key speaker in Istanbul for the Royal Thai Embassy’s project preparing Thai students in Türkiye for work — communication, negotiation, résumés, and interview skills.",
    date: "2025-07-05",
    type: "event",
    person: ["teerada", "center"],
    href: "https://www.cominnocenter.com/post/dr-teerada-of-chulalongkorn-university-leads-workshop-preparing-thai-students-in-t%C3%BCrkiye-for-the-wo",
    source: "ComInnoCenter / Royal Thai Embassy Ankara",
    featuredOnHome: false,
  },
  {
    id: "smith-crisis-communication-executives",
    titleTh: "รศ.ดร.สมิทธิ์ ได้รับเชิญนำอบรม Strategic Crisis Communication สำหรับ C-Level",
    titleEn: "Center Head invited to lead executive crisis communication training",
    summaryTh:
      "นำหลักสูตรเข้มข้นหนึ่งวัน Strategic Crisis Communication: Empowering C-Level Executives จัดโดย The Sharpener ครอบคลุมการจัดการภาพลักษณ์ การตอบสื่อ และการเปลี่ยนวิกฤตเป็นโอกาส",
    summaryEn:
      "Led a one-day intensive course for C-suite executives on strategic crisis communication, media response, and turning crises into opportunities — hosted by The Sharpener.",
    date: "2024-06-22",
    type: "event",
    person: ["smith", "center"],
    href: "https://www.cominnocenter.com/post/center-of-excellence-head-invited-to-lead-executive-crisis-communication-training",
    source: "ComInnoCenter / The Sharpener",
    featuredOnHome: false,
  },

  // ——— หนังสือ / งานวิจัยของ สมิทธิ์ และทีม ———
  {
    id: "smith-risk-communication-book",
    titleTh: "หนังสือ “การสื่อสารความเสี่ยง” โดย รศ.ดร.สมิทธิ์ และ เกริดา โคตรชาลี",
    titleEn: "Book: Risk Communication by Assoc. Prof. Dr. Smith & Kreda Kotchasalee",
    summaryTh:
      "ตำราด้านการสื่อสารความเสี่ยง จัดพิมพ์โดย 21 เซ็นจูรี่ เป็นองค์ความรู้พื้นฐานด้าน risk communication ในบริบทไทย",
    summaryEn:
      "A foundational Thai textbook on risk communication, published by 21 Century.",
    date: "2017-01-01",
    type: "book",
    person: ["smith"],
    href: "https://www.car.chula.ac.th/display7.php?bib=2123974",
    source: "จุฬาลงกรณ์มหาวิทยาลัย / 21 Century",
    featuredOnHome: false,
  },
  {
    id: "smith-strategic-comm-plan-book",
    titleTh: "Strategic Communication Plan: Writing and Planning",
    titleEn: "Strategic Communication Plan: Writing and Planning",
    summaryTh:
      "ตำราเขียนและวางแผนการสื่อสารเชิงกลยุทธ์ โดย รศ.ดร.สมิทธิ์ บุญชุติมา เผยแพร่ผ่านคณะนิเทศศาสตร์ จุฬาฯ",
    summaryEn:
      "Textbook on writing and planning strategic communication by Assoc. Prof. Dr. Smith Boonchutima, published via the Faculty of Communication Arts, Chula.",
    date: "2020-01-01",
    type: "book",
    person: ["smith"],
    href: "https://www.commarts.chula.ac.th/th/research/textbooks-publications/",
    source: "คณะนิเทศศาสตร์ จุฬาฯ",
    featuredOnHome: false,
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

/** รายการที่แสดงบนหน้า Home (featuredOnHome: true) */
export const homeHighlights = highlights.filter((h) => h.featuredOnHome);

/** รายการตามบุคคล (ใช้ใต้โปรไฟล์ในหน้า About) */
export function highlightsFor(person: HighlightPerson): Highlight[] {
  return highlights.filter((h) => h.person.includes(person));
}
