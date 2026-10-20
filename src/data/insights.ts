/**
 * บทความ (Insights) — งานเขียนของศูนย์ฯ ที่เล่าข้อค้นพบจากงานวิจัยให้คนทำงานสื่อสารอ่าน
 *
 * ต่างจาก `news.ts` (ข่าวกิจกรรมที่เก็บจากเว็บเดิม) และ `paperSummaries.ts` (บทสรุปทีละบทความ)
 * ตรงที่หนึ่งบทความเรียบเรียงหลักฐานจากหลายงานเข้าด้วยกันเพื่อตอบคำถามเดียวของผู้อ่าน
 * กลุ่มเป้าหมายคือหน่วยงานที่อาจมาร่วมงานกับศูนย์ฯ (หน่วยงานรัฐ องค์กรระหว่างประเทศ เอเจนซี)
 *
 * กติกาที่ใช้กับทุกบทความ (ตกลงกับผู้ใช้ 20 ต.ค. 2569 · คู่มือเสียงอยู่ในชุดไฟล์ ComInno Content Studio)
 * 1. **ตัวเลขทุกตัวต้องมาจากแหล่งที่ตรวจแล้ว และผู้อ่านตามไปดูต้นทางได้** — งานวิจัยของศูนย์ฯ
 *    ใส่ slug ของบทสรุปไว้ใน `evidence` (หน้าบทความโยน error ถ้า slug ไม่มีอยู่จริง) · สถิติจากภายนอก
 *    ใส่ใน `references` พร้อม URL และวันที่เข้าถึง · ข้อมูลจาก Statista (21 ต.ค. 2569) ผู้ใช้เปิดดูเอง
 *    ผ่านบัญชีที่ล็อกอิน แล้วตรวจตัวเลขกับหน้าต้นทาง — **ห้ามคัดลอกภาพกราฟของ Statista** สร้างกราฟใหม่
 *    จากตัวเลขด้วย block `chart` และเครดิต "<แหล่งต้นทาง> via Statista" ใต้กราฟทุกครั้ง
 * 2. ตัวละครในย่อหน้าเปิดเป็นตัวละครสมมติ และต้องเขียนกำกับว่าสมมติ
 * 3. ศูนย์ฯ เป็นผู้เล่า ประธานของกริยาวิจัยคือทีมวิจัย · งานที่ทำก่อนตั้งศูนย์ฯ ห้ามเขียนว่าศูนย์ฯ ทำ
 * 4. ชื่อหน่วยงานที่เคยร่วมงานใช้ได้เฉพาะที่อยู่บนหน้า Impact แล้ว
 * 5. ไม่มีฉบับจีน (แนวเดียวกับข่าวและสื่อ) · ไม่ใช้ `**` เพราะหน้านี้ไม่แปลงมาร์กดาวน์
 */

export type InsightBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "note"; text: string }
  | { kind: "chart"; chart: InsightChartData }
  /** ข้อแนะนำเป็นข้อๆ ที่มีหัวข้อสั้นนำหน้า แสดงเป็นการ์ดมีเลขกำกับ */
  | { kind: "tips"; items: { title: string; text: string }[] };

/** กราฟที่วาดจากตัวเลขบนหน้าเว็บเอง (ดู `InsightChart`) — ค่าเป็นเปอร์เซ็นต์ */
export type InsightChartData = {
  type: "bar" | "line";
  title: string;
  subtitle: string;
  /** คำบรรยายสำหรับโปรแกรมอ่านหน้าจอ ต้องบอกตัวเลขครบทุกค่า */
  alt: string;
  /** บรรทัดเครดิตใต้กราฟ */
  source: string;
  data: { label: string; value: number; highlight?: boolean }[];
};

export type InsightReference = { text: string; url: string };

export type InsightCopy = {
  title: string;
  dek: string;
  body: InsightBlock[];
  /** ต้องมีเมื่อบทความมี `cover` */
  coverAlt?: string;
  references?: InsightReference[];
  /** ภาพตอนแชร์ (path เต็มพร้อมนามสกุล) — ถ้าไม่มีใช้ภาพปก แล้วค่อยใช้ภาพกลางของเว็บ */
  ogImage?: string;
};

export type InsightPost = {
  slug: string;
  /** YYYY-MM-DD วันที่เผยแพร่บนเว็บ */
  date: string;
  /** path ภาพปกไม่มีนามสกุล — ต้องมีสามขนาดตามกติกาของ ResponsiveArtwork · ไม่มี = หน้าไม่มีภาพหัว */
  cover?: string;
  /** slug ของหน้าบทสรุปงานวิจัยที่เป็นหลักฐานของบทความนี้ เรียงตามลำดับที่เล่า */
  evidence?: string[];
  /** slug ของโครงการบนหน้า Impact ที่บทความอ้างถึง */
  relatedProjects?: string[];
  th: InsightCopy;
  en: InsightCopy;
};

export const insights: InsightPost[] = [
  {
    slug: "co-designed-campaigns-migrant-workers",
    date: "2026-10-20",
    cover: "/images/research/summaries/migrant-worker-exercise-codesign",
    evidence: [
      "migrant-worker-exercise-codesign",
      "hiv-risk-communication-samut-sakhon",
      "engage-a3-model",
    ],
    relatedProjects: ["department-of-disease-control"],
    th: {
      title: "แคมเปญที่ได้ผลที่สุด อาจไม่ได้เขียนโดยเรา",
      dek: "งานวิจัยสามชิ้นกับแรงงานข้ามชาติชาวเมียนมาชี้ไปทางเดียวกัน เมื่อให้ผู้รับสารร่วมออกแบบตั้งแต่ต้น ข้อความจะไปถึงคนที่หน่วยงานเคยเข้าไม่ถึง",
      coverAlt:
        "ภาพประกอบกระดาษ กล่องใบเล็กที่มีรูปทรงพอดีวางอยู่ข้างใน ขณะที่รูปทรงใหญ่กว่าวางค้างอยู่ข้างนอก",
      body: [
        {
          kind: "p",
          text: "มิน (ตัวละครสมมติ) ทำงานแกะกุ้งในโรงงานอาหารทะเลมาสามปี กะละสิบสองชั่วโมง หยุดสัปดาห์ละวัน ทุกเช้ามือของเขาแข็งจนกำแก้วกาแฟแทบไม่ได้ ที่ห้องพักพนักงานมีโปสเตอร์ท่ายืดเหยียดติดอยู่ เขียนเป็นภาษาไทยทั้งแผ่น มินเดินผ่านมันทุกวัน แล้วซื้อยาแก้ปวดที่ร้านหน้าโรงงานแทน",
        },
        {
          kind: "p",
          text: "โปสเตอร์แผ่นนั้นไม่ผิด ข้อมูลอาจถูกต้องทุกบรรทัด แต่มันถูกออกแบบโดยคนที่ไม่เคยถามมินเลยสักคำ",
        },
        { kind: "h2", text: "มินไม่ได้อยู่คนเดียว" },
        {
          kind: "p",
          text: "ในงานวิจัยปี 2569 ที่ทีมวิจัยซึ่งมีนักวิจัยของศูนย์ฯ ร่วมอยู่ด้วย ร่วมออกแบบโปรแกรมบริหารร่างกายกับแรงงานชาวเมียนมาในโรงงานอาหารทะเลแห่งหนึ่ง แรงงานทั้ง 29 คนที่ร่วมวงคุยมีอาการที่มือทุกคน 25 คน (86%) มือแข็งตอนเช้าจนกระทบชีวิตนอกงาน และ 23 คน (79%) ซื้อยาแก้ปวดกินเองอย่างน้อยสัปดาห์ละครั้ง",
        },
        {
          kind: "p",
          text: "ตัวเลขชุดนี้บอกอะไรมากกว่าความเจ็บป่วย มันบอกว่าคนกลุ่มนี้พยายามดูแลตัวเองอยู่แล้ว เพียงแต่ไม่มีใครออกแบบทางเลือกที่เข้ากับชีวิตจริงของเขา",
        },
        { kind: "h2", text: "ข้อจำกัดที่คนหน้างานบอก คือโจทย์ออกแบบ ไม่ใช่อุปสรรค" },
        {
          kind: "p",
          text: "สิ่งที่ทีมวิจัยทำต่างไปจากโปสเตอร์แผ่นนั้น คือคุยกับแรงงานด้วยภาษาเมียนมา นัดเวลาให้เข้ากับกะสิบสองชั่วโมง และแยกการขอความยินยอมออกจากฝ่ายบริหาร แล้วฟังว่าเขาต้องการอะไร",
        },
        {
          kind: "p",
          text: "คำตอบที่ได้ไม่ได้มาในรูปความต้องการลอยๆ แต่มาเป็นเงื่อนไขที่ชัดมาก ท่าบริหารต้องทำได้ในพื้นที่แคบขนาดห้องพัก ไม่ใช้อุปกรณ์ ทำนอกเวลางาน และต้องไม่ทำให้รายได้ลดลง เพราะทุกคนมีเงินที่ต้องส่งกลับบ้าน แรงงาน 26 จาก 29 คนใช้เฟซบุ๊กทุกวัน และอยากได้วิดีโอสาธิตมากกว่าเอกสาร เพราะเปิดดูได้โดยหัวหน้าไม่เห็น พวกเขายังปฏิเสธการอบรมแบบบังคับในวันหยุดวันเดียวของสัปดาห์ด้วย",
        },
        {
          kind: "p",
          text: "เงื่อนไขเหล่านี้กลายเป็นโจทย์ออกแบบชุดท่าบริหาร 12 ท่าใน 4 สัปดาห์ และเมื่อส่งให้นักกายภาพบำบัดต่างประเทศ 4 คนตรวจ ชุดท่าผ่านเกณฑ์ความตรงเชิงเนื้อหาในระดับสูง การฟังคนทำงานจึงไม่ได้แลกมากับคุณภาพทางคลินิก",
        },
        {
          kind: "p",
          text: "สำหรับคนทำงานสื่อสาร บทเรียนข้อนี้ตรงไปตรงมา ช่องทางที่ผู้รับสารใช้อยู่แล้วและใช้ได้อย่างเป็นส่วนตัว สำคัญกว่าช่องทางที่องค์กรถนัด",
        },
        { kind: "h2", text: "ให้คนในกลุ่มเป็นคนพาข้อความไป" },
        {
          kind: "p",
          text: "งานที่เก่ากว่านั้นของ รศ.ดร.สมิทธิ์ บุญชุติมา และคณะ (ตีพิมพ์ปี 2562 เก็บข้อมูลปี 2560 ก่อนตั้งศูนย์ฯ) ทดลองเรื่องนี้กับการสื่อสารความเสี่ยงเอชไอวีในโรงงานแห่งหนึ่งที่สมุทรสาคร ทีมวิจัยออกแบบแคมเปญจากวงสนทนากับแรงงาน 16 คน และการสัมภาษณ์เจ้าหน้าที่รัฐกับองค์กรพัฒนาเอกชน 10 คน แล้วให้อาสาสมัครสาธารณสุขที่คัดจากตัวแรงงานเองเป็นผู้เดินงานกับแรงงาน 400 คนเป็นเวลาสองสัปดาห์",
        },
        {
          kind: "p",
          text: "หลังแคมเปญ ความรู้เรื่องเอชไอวีเพิ่มขึ้นอย่างมีนัยสำคัญ ความมั่นใจว่าตัวเองป้องกันได้ก็เพิ่มขึ้น และขั้นของการเปลี่ยนพฤติกรรมเรื่องการใช้ถุงยางอนามัยกับการไปตรวจเลือดก็ขยับขึ้น สิ่งเดียวที่ไม่ขยับคือความรู้สึกว่าตัวเองเสี่ยง",
        },
        {
          kind: "p",
          text: "ผลข้อสุดท้ายนี้น่าสนใจที่สุด แคมเปญสุขภาพจำนวนมากเริ่มจากการทำให้คนกลัวก่อน แต่ในงานนี้คนเปลี่ยนพฤติกรรมได้โดยไม่ต้องรู้สึกกลัวมากขึ้น ผู้วิจัยสรุปว่าการที่แรงงานได้ร่วมออกแบบเองคือสิ่งที่ทำให้แคมเปญได้ผล",
        },
        { kind: "h2", text: "ลำดับสำคัญ เริ่มที่ความไว้วางใจก่อนผลิตสื่อ" },
        {
          kind: "p",
          text: "งานชิ้นที่สามของคณะผู้วิจัยชุดเดียวกับงานเอชไอวี (ปี 2565) รวบบทเรียนจากภาคสนามเป็นแบบจำลองหกขั้นชื่อ ENGAGE-A3 แล้วให้ผู้เชี่ยวชาญด้านการสื่อสาร สาธารณสุข และแรงงานข้ามชาติ 10 คนให้คะแนน ภาพรวมได้ 4.26 จาก 5 สองขั้นที่ได้คะแนนสูงสุดเท่ากันที่ 4.45 คือการสร้างความไว้วางใจ และการทำให้เป็นเกม ส่วนการหาคนในพื้นที่มาช่วยได้ 4.36",
        },
        {
          kind: "p",
          text: "ข้อสังเกตที่ใช้ได้ทันทีคือลำดับ งานสื่อสารกับกลุ่มเปราะบางมักเริ่มจากการผลิตสื่อ แต่ขั้นที่ผู้เชี่ยวชาญให้น้ำหนักสูงสุดเป็นสิ่งที่ต้องเกิดก่อนจะมีสื่อชิ้นแรก อีกข้อที่ควรบอกตรงๆ คือขั้นประเมินผลได้คะแนนต่ำสุดในหกขั้น (4.18) แปลว่าแม้แต่ผู้เชี่ยวชาญเองก็ยังให้น้ำหนักกับการวัดผลน้อยกว่าขั้นอื่น",
        },
        { kind: "h2", text: "ข้อมูลชุดนี้มีขอบเขตอะไรบ้าง" },
        {
          kind: "p",
          text: "งานทั้งสามชิ้นเป็นงานขนาดเล็ก งานเรื่องท่าบริหารเป็นการออกแบบร่วมกับคนในโรงงานเดียว ยังไม่ได้ทดสอบว่าท่าบริหารช่วยลดอาการได้จริง งานเรื่องเอชไอวีมาจากโรงงานเดียวและวัดพฤติกรรมจากคำบอกเล่าของผู้เข้าร่วม ส่วนแบบจำลองหกขั้นประเมินด้วยความเห็นผู้เชี่ยวชาญ ไม่ใช่ผลลัพธ์สุขภาพ สิ่งที่ทั้งสามชิ้นบอกได้ตรงกันจึงเป็นเรื่องของวิธีออกแบบ มากกว่าจะเป็นคำรับรองผลลัพธ์",
        },
        { kind: "h2", text: "ลองเริ่มจากโครงการถัดไปของคุณ" },
        {
          kind: "ul",
          items: [
            "ก่อนเขียนบรีฟ จัดวงคุยกับผู้รับสารสักหนึ่งรอบ ใช้ภาษาของเขา และนัดเวลาที่เขาว่างจริง ไม่ใช่เวลาที่สำนักงานสะดวก",
            "เขียนเงื่อนไขที่ผู้รับสารบอกลงในบรีฟเป็นข้อกำหนด เช่น ต้องดูได้ในโทรศัพท์ ต้องจบในสามนาที หรือต้องไม่ใช้วันหยุดของเขา",
            "หาคนจากในกลุ่มที่คนอื่นไว้ใจ ให้เขาเป็นคนพาข้อความไป และวางแผนวัดผลไว้ตั้งแต่วันแรก ไม่ใช่หลังแคมเปญจบ",
          ],
        },
        {
          kind: "p",
          text: "ศูนย์ฯ ทำงานแบบนี้กับหน่วยงานด้วย เช่น เวิร์กช็อปการออกแบบกระบวนการให้บริการกับกรมควบคุมโรค ซึ่งเน้นการสื่อสารเจาะกลุ่มเป้าหมาย",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังออกแบบการสื่อสารกับกลุ่มที่เข้าถึงยาก ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "Our best campaigns may not be written by us",
      dek: "Three studies with Myanmar migrant workers point the same way: when the audience helps design the message from the start, it reaches people the organisation could not reach before.",
      coverAlt:
        "Paper-craft illustration of a small box holding the one shape that fits, with a larger shape left outside it",
      body: [
        {
          kind: "p",
          text: "Min (a composite character) has peeled shrimp in a seafood plant for three years. His shifts run twelve hours, with one day off a week. Every morning his hands are so stiff he can barely hold a coffee cup. In the staff room there is a poster of stretching exercises, written entirely in Thai. Min walks past it every day, then buys painkillers from the shop outside the gate.",
        },
        {
          kind: "p",
          text: "Nothing on that poster is wrong. Every line may be accurate. But it was designed by people who never asked Min a single question.",
        },
        { kind: "h2", text: "Min is not alone" },
        {
          kind: "p",
          text: "In a 2026 study in which a research team including researchers from our centre co-designed an exercise programme with Myanmar workers at a seafood plant, all 29 workers in the sessions reported hand symptoms. Twenty-five of them (86%) had morning stiffness that affected life outside work, and 23 (79%) bought painkillers at least once a week.",
        },
        {
          kind: "p",
          text: "Those figures say more than that people are in pain. They say this group is already trying to look after itself. Nobody had designed an option that fits the life they actually live.",
        },
        { kind: "h2", text: "The constraints people name are the design brief, not obstacles" },
        {
          kind: "p",
          text: "What the research team did differently from that poster was simple: they talked with workers in Myanmar language, scheduled sessions around twelve-hour shifts, took consent away from management, and listened to what the workers wanted.",
        },
        {
          kind: "p",
          text: "The answers came back as very specific conditions. The exercises had to fit a dormitory-sized space, need no equipment, happen outside working hours, and never cost earnings, because everyone sends money home. Twenty-six of the 29 used Facebook every day and wanted video demonstrations rather than handouts, because they could watch them without supervisors seeing. They also turned down compulsory workshops on their one day off.",
        },
        {
          kind: "p",
          text: "Those conditions became the brief for a 12-exercise, four-week programme. When four international physical therapists reviewed it, the programme scored highly on content validity. Listening to the workers did not cost clinical quality.",
        },
        {
          kind: "p",
          text: "For communicators the lesson is direct. A channel your audience already uses, and can use privately, matters more than the channel your organisation is comfortable with.",
        },
        { kind: "h2", text: "Let people inside the group carry the message" },
        {
          kind: "p",
          text: "An earlier study by Smith Boonchutima and colleagues (published in 2019, with data collected in 2017, before the centre was founded) tested this with HIV risk communication at a factory in Samut Sakhon. The team designed the campaign from focus groups with 16 workers and interviews with ten government and NGO officers, then had health volunteers recruited from among the workers deliver it to 400 workers over two weeks.",
        },
        {
          kind: "p",
          text: "After the campaign, knowledge of HIV rose significantly, so did workers' confidence that they could protect themselves, and their stage of change for condom use and HIV testing moved forward. The one thing that did not move was their sense of personal risk.",
        },
        {
          kind: "p",
          text: "That last result is the most interesting. Many health campaigns start by making people afraid. Here, behaviour changed without anyone feeling more at risk. The researchers concluded that the workers' part in designing the campaign was what made it work.",
        },
        { kind: "h2", text: "Order matters: trust comes before materials" },
        {
          kind: "p",
          text: "The third study, by the same team as the HIV study (2022), turned these field lessons into a six-step model called ENGAGE-A3 and asked ten experts in communication, public health and migration to rate it. It scored 4.26 out of 5 overall. The two steps tied for the highest score, 4.45, were earning trust and gamification; getting local help scored 4.36.",
        },
        {
          kind: "p",
          text: "The usable point is the order. Communication with vulnerable groups usually starts by producing materials, yet the steps the experts valued most happen before the first material exists. It is also worth saying plainly that evaluation scored lowest of the six steps (4.18), which suggests that even experts weigh measurement less than the other steps.",
        },
        { kind: "h2", text: "What this evidence can and cannot tell you" },
        {
          kind: "p",
          text: "All three studies are small. The exercise study is a co-design with people from one factory; it has not yet tested whether the exercises reduce symptoms. The HIV study comes from one factory and measures behaviour through self-reports. The six-step model was rated by experts rather than tested against health outcomes. What the three agree on is a way of designing, not a guarantee of results.",
        },
        { kind: "h2", text: "Try it on your next project" },
        {
          kind: "ul",
          items: [
            "Before you write the brief, hold one session with your audience, in their language, at a time they are actually free, not when the office finds it convenient.",
            "Write the conditions they give you into the brief as requirements: it must work on a phone, it must finish in three minutes, it must not take their day off.",
            "Find people inside the group whom others trust, let them carry the message, and plan how you will measure results from day one, not after the campaign ends.",
          ],
        },
        {
          kind: "p",
          text: "Our centre works this way with organisations too, for example in a service-design workshop with Thailand's Department of Disease Control that focused on targeted communication.",
        },
        {
          kind: "note",
          text: "If your organisation is designing communication for hard-to-reach groups, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
    },
  },
  {
    slug: "line-news-trust-2026",
    date: "2026-10-21",
    th: {
      title: "ช่องทางมีแล้ว แต่ความเชื่อใจหายไป: บทเรียนจากข้อมูลข่าวสารของคนไทยปี 2026",
      dek: "ข้อมูลปี 2026 ชี้ว่าคนไทยรับข่าวผ่านเฟซบุ๊กและ LINE แต่ความเชื่อมั่นต่อข่าวลดเหลือ 47% หน่วยงานรัฐควรสื่อสารอย่างไรให้คนเชื่อและลงมือทำ",
      ogImage: "/images/insights/line-news-trust-2026-social.png",
      body: [
        {
          kind: "p",
          text: "ทุกครั้งที่มีประกาศสำคัญ หน่วยงานรัฐจำนวนมากทำสิ่งเดียวกัน คือโพสต์ลงเพจเฟซบุ๊กแล้วถือว่าภารกิจจบ ในแง่ช่องทาง นี่ไม่ใช่การตัดสินใจที่ผิดเลย เพราะเฟซบุ๊กคือที่ที่คนไทยรับข่าวมากที่สุดจริงๆ",
        },
        {
          kind: "p",
          text: "แต่ข้อมูลล่าสุดบอกเราอีกเรื่องหนึ่งที่สำคัญกว่า คนไทยอยู่บนช่องทางเหล่านั้นครบ แต่เชื่อสิ่งที่เห็นน้อยลง",
        },
        { kind: "h2", text: "คนไทยอยู่บนโซเชียลครบทุกช่องทาง" },
        {
          kind: "p",
          text: "ผลสำรวจของ Reuters Institute ร่วมกับ YouGov ช่วงมกราคมถึงกุมภาพันธ์ 2026 พบว่า ผู้ใช้อินเทอร์เน็ตไทย 69% ใช้เฟซบุ๊กเป็นช่องทางรับข่าว ตามมาด้วย TikTok 55% และ YouTube 54% ส่วน LINE ซึ่งเราคุ้นเคยในฐานะแอปแชต มีคนใช้รับข่าวถึง 45% [1]",
        },
        {
          kind: "chart",
          chart: {
            type: "bar",
            title: "แพลตฟอร์มที่คนไทยใช้รับข่าว",
            subtitle: "ร้อยละของผู้ตอบที่ใช้แต่ละแพลตฟอร์มรับข่าว ปี 2026",
            alt: "กราฟแท่งแพลตฟอร์มที่คนไทยใช้รับข่าว ปี 2026: Facebook 69% TikTok 55% YouTube 54% LINE 45% Facebook Messenger 27% Instagram 20%",
            source:
              "ที่มา: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · สำรวจออนไลน์ อายุ 18 ปีขึ้นไป n = 2,043",
            data: [
              { label: "Facebook", value: 69 },
              { label: "TikTok", value: 55 },
              { label: "YouTube", value: 54 },
              { label: "LINE", value: 45, highlight: true },
              { label: "Facebook Messenger", value: 27 },
              { label: "Instagram", value: 20 },
            ],
          },
        },
        {
          kind: "p",
          text: "ตัวเลขนี้ยืนยันสิ่งที่นักสื่อสารภาครัฐรู้อยู่แล้ว คือประชาชนไม่ได้รอข่าวจากหน้าเว็บไซต์หน่วยงาน พวกเขารับข่าวในพื้นที่เดียวกับที่คุยกับครอบครัวและดูคลิปบันเทิง",
        },
        { kind: "h2", text: "แต่ความเชื่อมั่นต่อข่าวกำลังลดลง" },
        {
          kind: "p",
          text: "ในการสำรวจชุดเดียวกัน ระดับความเชื่อมั่นต่อข่าวโดยรวมของคนไทยในปี 2026 อยู่ที่ 47% ลดลงจาก 55% ในปีก่อนหน้า และเป็นตัวเลขต่ำสุดในช่วงหกปีที่มีข้อมูล (2021–2026) [2]",
        },
        {
          kind: "chart",
          chart: {
            type: "line",
            title: "ความเชื่อมั่นต่อข่าวของคนไทย 2021–2026",
            subtitle: "ร้อยละของผู้ตอบที่บอกว่าเชื่อถือข่าวส่วนใหญ่ได้เกือบตลอดเวลา",
            alt: "กราฟเส้นความเชื่อมั่นต่อข่าวของคนไทย: 2021 50% 2022 53% 2023 51% 2024 54% 2025 55% 2026 47% ซึ่งต่ำสุดในหกปี",
            source:
              "ที่มา: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · สำรวจออนไลน์ อายุ 18 ปีขึ้นไป n = 2,043 (ปี 2026)",
            data: [
              { label: "2021", value: 50 },
              { label: "2022", value: 53 },
              { label: "2023", value: 51 },
              { label: "2024", value: 54 },
              { label: "2025", value: 55 },
              { label: "2026", value: 47, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "พูดง่ายๆ คือ ในวันที่ข้อมูลไหลถึงมือประชาชนได้เร็วที่สุด กลับมีคนเกินครึ่งที่ไม่ได้บอกว่าตนเชื่อถือข่าวส่วนใหญ่ที่ได้รับ สำหรับหน่วยงานรัฐ นี่หมายความว่า “ได้โพสต์แล้ว” ยังห่างไกลจาก “ประชาชนเชื่อและลงมือทำแล้ว”",
        },
        { kind: "h2", text: "ความเชื่อใจไม่ได้อยู่ที่แพลตฟอร์มอย่างเดียว" },
        {
          kind: "p",
          text: "มีข้อมูลอีกชุดที่ชวนคิด การสำรวจของ Rakuten Insight เมื่อพฤษภาคม 2025 ถามคนไทยว่าเชื่อถือข้อมูลข่าวสารจากแหล่งใด ผลคือโทรทัศน์ได้รับความเชื่อถือ 74% แพลตฟอร์มโซเชียลมีเดีย 64% แต่แพลตฟอร์มส่งข้อความได้เพียง 17% [3]",
        },
        {
          kind: "p",
          text: "ข้อมูลนี้มาจากคนละการสำรวจ จึงเทียบกับตัวเลขข้างต้นโดยตรงไม่ได้ แต่ก็ชี้ให้เห็นภาพที่น่าสนใจ คนจำนวนมากรับข่าวผ่านแอปแชต แต่ไม่ได้เชื่อถือแอปแชตในฐานะแหล่งข่าว",
        },
        {
          kind: "p",
          text: "ในมุมของเรา คำอธิบายที่เป็นไปได้คือ ความเชื่อใจในพื้นที่แบบนี้ไม่ได้ผูกกับแพลตฟอร์ม แต่ผูกกับ “คน” ที่ส่งข้อความมา ข้อความจากผู้ใหญ่บ้านที่ทุกคนรู้จัก กับภาพประกาศที่ถูกส่งต่อมาโดยไม่รู้ที่มา อยู่ในแอปเดียวกัน แต่ได้รับความเชื่อถือไม่เท่ากัน",
        },
        {
          kind: "p",
          text: "เราเคยเห็นข้าราชการที่ทำงานป้องกันน้ำท่วม เมื่อได้รับประกาศทางการจากหน่วยเหนือ ก็นำประกาศฉบับนั้นไปแปะลงเฟซบุ๊กทั้งหน้า แล้วถือว่าได้เผยแพร่ข้อมูลแล้ว ช่องทางถูกต้อง ข้อมูลถูกต้อง แต่ไม่มีใครพูดกับชาวบ้านจริงๆ ว่าคืนนี้ต้องทำอะไร",
        },
        { kind: "h2", text: "สามสิ่งที่หน่วยงานรัฐทำได้ทันที" },
        {
          kind: "tips",
          items: [
            {
              title: "ให้มีผู้พูดที่จับต้องได้",
              text: "ในช่วงที่ความเชื่อมั่นต่อข่าวลดลง เสียงที่เป็นทางการล้วนๆ ยิ่งต้องทำงานหนักขึ้น ให้เจ้าหน้าที่ที่ดูแลเรื่องนั้นจริงเป็นคนพูด มีชื่อ มีหน้า และใช้ภาษาที่คุยกับคนในพื้นที่",
            },
            {
              title: "เตรียมข้อความให้คนกลางส่งต่อได้ง่าย",
              text: "เมื่อเกือบครึ่งของคนไทยรับข่าวผ่าน LINE ข้อความที่ผู้ใหญ่บ้าน อสม. หรือครูคัดลอกไปวางในกลุ่มได้ทันที คือช่องทางที่พาข้อมูลไปพร้อมความเชื่อใจของคนที่ส่ง",
            },
            {
              title: "บอกขั้นต่อไปให้ชัดในประโยคแรก",
              text: "“ต้องทำอะไร ที่ไหน เมื่อไร” ควรอ่านเจอได้ก่อนที่ผู้อ่านจะเลื่อนผ่าน ภาพเอกสารทั้งหน้าไม่ใช่คำตอบ",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "ข้อมูลของ Reuters Institute และ Rakuten Insight มาจากการสำรวจออนไลน์ จึงสะท้อนกลุ่มคนที่ใช้อินเทอร์เน็ตเป็นหลัก และอาจไม่ครอบคลุมผู้สูงอายุหรือคนในพื้นที่ห่างไกลที่เข้าถึงอินเทอร์เน็ตน้อย ซึ่งมักเป็นกลุ่มที่หน่วยงานรัฐต้องการเข้าถึงมากที่สุด การสื่อสารผ่านคนกลางในชุมชนจึงยิ่งสำคัญสำหรับกลุ่มนี้",
        },
        { kind: "h2", text: "ช่องทางพร้อมแล้ว สิ่งที่ขาดคือคน" },
        {
          kind: "p",
          text: "ข้อมูลปี 2026 ไม่ได้บอกให้หน่วยงานรัฐเลิกใช้โซเชียลมีเดีย ตรงกันข้าม ประชาชนอยู่ที่นั่นแล้ว แต่ในวันที่ความเชื่อมั่นต่อข่าวลดลง การปรากฏบนช่องทางที่ถูกต้องไม่พออีกต่อไป ข้อมูลจะเดินทางได้ก็ต่อเมื่อมีคนที่ประชาชนเชื่อใจพามันไป",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังมองหาวิธีให้ข้อความไปถึงประชาชนได้ไกลขึ้นและน่าเชื่อถือยิ่งขึ้น ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
      references: [
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Leading social media platforms for news in Thailand as of February 2026 (online survey, 18+, n = 2,043). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1291398/thailand-leading-social-media-platforms-for-news/",
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026 (online survey, 18+, n = 2,043 in 2026). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/",
        },
        {
          text: "Rakuten Insight via Statista. (2025, October 6). Sources of information and news considered trustworthy in Thailand as of May 2025 (online survey, 16+, n = 9,865, among those who consumed each media type). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1624705/thailand-trusted-information-and-news-sources/",
        },
      ],
    },
    en: {
      title: "The channels are there, the trust is not: what Thailand's 2026 news data tells public communicators",
      dek: "Data from 2026 shows Thais get their news on Facebook and LINE, yet trust in news has fallen to 47%. How should government agencies communicate so that people believe the message and act on it?",
      body: [
        {
          kind: "p",
          text: "Whenever there is an important announcement, many government agencies do the same thing: they post it on their Facebook page and consider the job done. As a choice of channel, that is not wrong. Facebook really is where most Thais get their news.",
        },
        {
          kind: "p",
          text: "But the latest data tells us something more important. Thais are on all of those channels, and they believe less of what they see there.",
        },
        { kind: "h2", text: "Thais are on every social channel" },
        {
          kind: "p",
          text: "A Reuters Institute and YouGov survey from January to February 2026 found that 69% of Thai internet users get news on Facebook, followed by TikTok at 55% and YouTube at 54%. LINE, which most of us think of as a chat app, is used for news by 45% [1].",
        },
        {
          kind: "chart",
          chart: {
            type: "bar",
            title: "Platforms Thais use for news",
            subtitle: "Share of respondents who use each platform for news, 2026",
            alt: "Bar chart of platforms Thais use for news in 2026: Facebook 69%, TikTok 55%, YouTube 54%, LINE 45%, Facebook Messenger 27%, Instagram 20%",
            source:
              "Source: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · online survey, aged 18+, n = 2,043",
            data: [
              { label: "Facebook", value: 69 },
              { label: "TikTok", value: 55 },
              { label: "YouTube", value: 54 },
              { label: "LINE", value: 45, highlight: true },
              { label: "Facebook Messenger", value: 27 },
              { label: "Instagram", value: 20 },
            ],
          },
        },
        {
          kind: "p",
          text: "These figures confirm what public communicators already know. People are not waiting for news on an agency's website. They get it in the same place where they talk to their families and watch entertainment clips.",
        },
        { kind: "h2", text: "But trust in news is falling" },
        {
          kind: "p",
          text: "In the same survey, overall trust in news among Thais stood at 47% in 2026, down from 55% the year before and the lowest figure in the six years of data (2021–2026) [2].",
        },
        {
          kind: "chart",
          chart: {
            type: "line",
            title: "Trust in news in Thailand, 2021–2026",
            subtitle: "Share of respondents who say they can trust most news most of the time",
            alt: "Line chart of trust in news in Thailand: 2021 50%, 2022 53%, 2023 51%, 2024 54%, 2025 55%, 2026 47%, the lowest in six years",
            source:
              "Source: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · online survey, aged 18+, n = 2,043 (2026)",
            data: [
              { label: "2021", value: 50 },
              { label: "2022", value: 53 },
              { label: "2023", value: 51 },
              { label: "2024", value: 54 },
              { label: "2025", value: 55 },
              { label: "2026", value: 47, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "Put simply, at the moment information reaches people faster than ever, more than half of them do not say they trust most of the news they get. For a government agency, that means “we posted it” is still a long way from “people believed it and acted”.",
        },
        { kind: "h2", text: "Trust is not only about the platform" },
        {
          kind: "p",
          text: "Another dataset is worth thinking about. A Rakuten Insight survey in May 2025 asked Thais which sources of information and news they trust. Television was trusted by 74% and social media platforms by 64%, but messaging platforms by only 17% [3].",
        },
        {
          kind: "p",
          text: "This comes from a different survey, so it cannot be compared directly with the figures above. It still points to something interesting: many people get news through chat apps without trusting chat apps as a source of news.",
        },
        {
          kind: "p",
          text: "As we see it, one possible explanation is that trust in these spaces is tied not to the platform but to the person who sends the message. A message from a village head everyone knows and a forwarded image of an announcement with no known origin sit in the same app, yet they are not trusted equally.",
        },
        {
          kind: "p",
          text: "We have seen officials working on flood prevention receive an official notice from a higher office, post an image of the whole page on Facebook, and consider the information published. The channel was right and the information was right, but no one actually told residents what they needed to do that night.",
        },
        { kind: "h2", text: "Three things agencies can do right away" },
        {
          kind: "tips",
          items: [
            {
              title: "Give the message a real speaker",
              text: "When trust in news is falling, a purely official voice has to work even harder. Let the officer who actually handles the issue speak, with a name and a face, in the language people use locally.",
            },
            {
              title: "Prepare messages that intermediaries can pass on easily",
              text: "With nearly half of Thais getting news on LINE, a message that a village head, a village health volunteer or a teacher can copy straight into a group chat is a channel that carries the sender's trust along with the information.",
            },
            {
              title: "State the next step in the first sentence",
              text: "“What to do, where and when” should be readable before people scroll past. An image of a full-page document is not the answer.",
            },
          ],
        },
        { kind: "h2", text: "Reading this data with care" },
        {
          kind: "p",
          text: "The Reuters Institute and Rakuten Insight data both come from online surveys, so they mainly reflect people who use the internet. They may not cover older people or those in remote areas with little internet access, who are often the very groups government agencies most need to reach. For them, communicating through trusted people in the community matters even more.",
        },
        { kind: "h2", text: "The channels are ready. What is missing is people" },
        {
          kind: "p",
          text: "The 2026 data does not tell government agencies to stop using social media. On the contrary, the public is already there. But when trust in news is falling, appearing on the right channel is no longer enough. Information travels only when someone people trust carries it.",
        },
        {
          kind: "note",
          text: "If your organisation is looking for ways to make its messages reach further and be more trusted, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
      references: [
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Leading social media platforms for news in Thailand as of February 2026 (online survey, 18+, n = 2,043). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1291398/thailand-leading-social-media-platforms-for-news/",
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026 (online survey, 18+, n = 2,043 in 2026). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/",
        },
        {
          text: "Rakuten Insight via Statista. (2025, October 6). Sources of information and news considered trustworthy in Thailand as of May 2025 (online survey, 16+, n = 9,865, among those who consumed each media type). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1624705/thailand-trusted-information-and-news-sources/",
        },
      ],
    },
  },
];

export const insightsSorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));

export const getInsightBySlug = (slug: string) => insights.find((p) => p.slug === slug);

/** ภาพตอนแชร์และใน JSON-LD — ภาพเฉพาะของบทความ → ภาพปก → ภาพกลางของเว็บ */
export function insightImage(post: InsightPost, locale: "th" | "en"): string {
  return post[locale].ogImage ?? (post.cover ? `${post.cover}.webp` : "/images/og/og-default.jpg");
}

// ภาพปกที่ไม่มี alt คือภาพที่โปรแกรมอ่านหน้าจออ่านไม่ออก — ให้ build พังดีกว่าขึ้นเว็บเงียบๆ
for (const p of insights) {
  if (p.cover && (!p.th.coverAlt || !p.en.coverAlt))
    throw new Error(`insights: บทความ "${p.slug}" มีภาพปกแต่ไม่มี coverAlt ครบสองภาษา`);
}
