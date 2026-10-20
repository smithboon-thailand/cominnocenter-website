/**
 * บทความ (Insights) — งานเขียนของศูนย์ฯ ที่เล่าข้อค้นพบจากงานวิจัยให้คนทำงานสื่อสารอ่าน
 *
 * ต่างจาก `news.ts` (ข่าวกิจกรรมที่เก็บจากเว็บเดิม) และ `paperSummaries.ts` (บทสรุปทีละบทความ)
 * ตรงที่หนึ่งบทความเรียบเรียงหลักฐานจากหลายงานเข้าด้วยกันเพื่อตอบคำถามเดียวของผู้อ่าน
 * กลุ่มเป้าหมายคือหน่วยงานที่อาจมาร่วมงานกับศูนย์ฯ (หน่วยงานรัฐ องค์กรระหว่างประเทศ เอเจนซี)
 *
 * กติกาที่ใช้กับทุกบทความ (ตกลงกับผู้ใช้ 20 ต.ค. 2569 · คู่มือเสียงอยู่ในชุดไฟล์ ComInno Content Studio)
 * 1. **ตัวเลขทุกตัวต้องมาจากงานที่ตรวจแล้วและมีหน้าบทสรุปบนเว็บ** ใส่ slug ของบทสรุปไว้ใน
 *    `evidence` ให้ผู้อ่านตามไปดูต้นทางได้ · `check:content` ตรวจว่า slug มีอยู่จริง
 * 2. ตัวละครในย่อหน้าเปิดเป็นตัวละครสมมติ และต้องเขียนกำกับว่าสมมติ
 * 3. ศูนย์ฯ เป็นผู้เล่า ประธานของกริยาวิจัยคือทีมวิจัย · งานที่ทำก่อนตั้งศูนย์ฯ ห้ามเขียนว่าศูนย์ฯ ทำ
 * 4. ชื่อหน่วยงานที่เคยร่วมงานใช้ได้เฉพาะที่อยู่บนหน้า Impact แล้ว
 * 5. ไม่มีฉบับจีน (แนวเดียวกับข่าวและสื่อ) · ไม่ใช้ `**` เพราะหน้านี้ไม่แปลงมาร์กดาวน์
 */

export type InsightBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "note"; text: string };

export type InsightCopy = {
  title: string;
  dek: string;
  body: InsightBlock[];
  coverAlt: string;
};

export type InsightPost = {
  slug: string;
  /** YYYY-MM-DD วันที่เผยแพร่บนเว็บ */
  date: string;
  /** path ภาพปกไม่มีนามสกุล — ต้องมีสามขนาดตามกติกาของ ResponsiveArtwork */
  cover: string;
  /** slug ของหน้าบทสรุปงานวิจัยที่เป็นหลักฐานของบทความนี้ เรียงตามลำดับที่เล่า */
  evidence: string[];
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
];

export const insightsSorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));

export const getInsightBySlug = (slug: string) => insights.find((p) => p.slug === slug);
