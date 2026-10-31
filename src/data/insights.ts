import type { SdgId } from "@/data/sdg";

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
  /** `links` = ลิงก์ภายในบนคำในย่อหน้า (`match` ต้องปรากฏใน `text` ตรงตัวอักษร ไม่งั้น build พัง) */
  | { kind: "p"; text: string; links?: { match: string; href: string }[] }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "note"; text: string }
  | { kind: "chart"; chart: InsightChartData }
  /** ข้อแนะนำเป็นข้อๆ ที่มีหัวข้อสั้นนำหน้า แสดงเป็นการ์ดมีเลขกำกับ */
  | { kind: "tips"; items: { title: string; text: string }[] };

/** กราฟที่วาดจากตัวเลขบนหน้าเว็บเอง (ดู `InsightChart`) — ค่าเป็นเปอร์เซ็นต์ */
export type InsightChartData = {
  /** bar · line · dial (แถบเลื่อนทีละขั้น) · pick (ให้ผู้อ่านเลือกก่อนแล้วเทียบ) — ดู InsightChart/InsightChartChoice */
  type: "bar" | "line" | "dial" | "pick" | "waffle" | "coverage" | "race" | "area" | "split";
  title: string;
  subtitle: string;
  /** คำบรรยายสำหรับโปรแกรมอ่านหน้าจอ ต้องบอกตัวเลขครบทุกค่า */
  alt: string;
  /** บรรทัดเครดิตใต้กราฟ */
  source: string;
  /** `detail` = ป้ายเต็มที่ dial แสดงเหนือแถบ · `aiShare` = สัดส่วนบล็อก AI ของขั้นนั้นใน dial (0–1) */
  data: { label: string; value: number; highlight?: boolean; detail?: string; aiShare?: number; total?: number }[];
  /** waffle: ชื่อกลุ่ม (กลุ่มแรก = กลุ่มที่ให้ทาย) และค่าต่อปีเป็นพันคน เรียงตาม `groups` · coverage ใช้ `total` ใน data */
  groups?: string[];
  series?: { label: string; values: number[] }[];
  /** pick: ลำดับที่แสดงตัวเลือก (index ของ data) สลับไว้ไม่ให้ลำดับเผยคำตอบ */
  order?: number[];
  /** กราฟแท่ง: label ของแท่งที่ให้ผู้อ่านทายก่อนเฉลย (ค่าแท่งนั้นซ่อนจนกดเฉลย · ไม่มี JS ก็เห็นครบ) */
  guess?: string;
  /** race/split: คำถามที่ให้ผู้อ่านตอบก่อนเฉลย (race ต้องมีเมื่อมี `guess`) */
  prompt?: string;
  /** race: ค่าสูงสุดของแถบเลื่อนทาย (ไม่ใส่ = 100) */
  guessMax?: number;
  /** race/split: ประโยคสั้นที่ต่อท้ายคำเฉลย */
  answerNote?: string;
  /** race/area/split: หน่วยต่อท้ายตัวเลข (ไม่ใส่ = "%") เช่น " พันล้านบาท" */
  unit?: string;
};

export type InsightReference = { text: string; url: string };

export type InsightCopy = {
  title: string;
  dek: string;
  body: InsightBlock[];
  /** ต้องมีเมื่อบทความมี `cover` */
  coverAlt?: string;
  /** คำบรรยายใต้ภาพปก — ภาพที่เจนด้วย AI ต้องบอกผู้อ่าน (คู่มือภาพของ Content Studio) */
  coverCaption?: string;
  references?: InsightReference[];
  /** หัวข้อของรายการอ้างอิง — ไม่ใส่ = "อ้างอิง" / "References" */
  referencesTitle?: string;
  /** ภาพตอนแชร์ (path เต็มพร้อมนามสกุล) — ถ้าไม่มีใช้ภาพปก แล้วค่อยใช้ภาพกลางของเว็บ */
  ogImage?: string;
};

export type InsightAuthor = {
  th: string;
  en: string;
  /** สำหรับรายการอ้างอิงแบบ APA: นามสกุล, อักษรย่อชื่อ */
  apa: string;
};

/** บทความทุกชิ้นในชุดแรกเขียนโดยคนเดียวกัน — ประกาศครั้งเดียว ไม่พิมพ์ชื่อซ้ำสามที่ */
const SMITH: InsightAuthor = { th: "สมิทธิ์ บุญชุติมา", en: "Smith Boonchutima", apa: "Boonchutima, S." };

export type InsightPost = {
  slug: string;
  /**
   * คู่สี SDG ของบทความ (27 ต.ค. 2569) — ใช้คู่เดียวกับภาพ hero ทั้งกราฟชุดสี (`race` `area` `split`)
   * และเลขกำกับข้อแนะนำ ตาม BRAND.md B3 · บทความที่ไม่มี field นี้แสดงแบบเดิมทุกอย่าง
   * กราฟชุดสีบังคับให้มี palette (build พังถ้าบทความใช้ race/area/split แต่ไม่ได้ประกาศ)
   */
  palette?: [SdgId, SdgId];
  /** YYYY-MM-DD วันที่เผยแพร่บนเว็บ */
  date: string;
  /** path ภาพปกไม่มีนามสกุล — ต้องมีสามขนาดตามกติกาของ ResponsiveArtwork · ไม่มี = หน้าไม่มีภาพหัว */
  cover?: string;
  /** slug ของหน้าบทสรุปงานวิจัยที่เป็นหลักฐานของบทความนี้ เรียงตามลำดับที่เล่า */
  evidence?: string[];
  /** slug ของโครงการบนหน้า Impact ที่บทความอ้างถึง */
  relatedProjects?: string[];
  /** ผู้เขียน — แสดงใต้หัวเรื่อง ในรายการอ้างอิงที่แนะนำ และใน JSON-LD (ผู้ใช้กำหนด 23 ต.ค. 2569) */
  author: InsightAuthor;
  th: InsightCopy;
  en: InsightCopy;
};

export const insights: InsightPost[] = [
  {
    slug: "co-designed-campaigns-migrant-workers",
    date: "2026-10-20",
    author: SMITH,
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
          text: "มินเป็นหนึ่งในแรงงานชาวเมียนมาราว 1.71 ล้านคนที่ทำงานในไทยเมื่อปี 2566 [1] เมื่อเทียบกับแรงงานจากกัมพูชา (ราว 4 แสนคน) ลาว (ราว 2.3 แสนคน) และเวียดนาม (ราว 1,400 คน) ในปีเดียวกัน แรงงานเมียนมาคิดเป็นราวสามในสี่ของแรงงานจากสี่ประเทศนี้รวมกัน [1–4] การออกแบบการสื่อสารที่ไม่ได้คิดถึงคนกลุ่มนี้ จึงเท่ากับมองข้ามแรงงานข้ามชาติส่วนใหญ่ของประเทศ",
        },
        {
          kind: "chart",
          chart: {
            type: "waffle",
            title: "ถ้ามีแรงงานข้ามชาติ 100 คน จะเป็นชาวเมียนมากี่คน",
            subtitle: "นับเฉพาะแรงงานจากเมียนมา กัมพูชา ลาว และเวียดนามในไทย · ปี 2562–2566",
            alt: "กราฟ 100 ช่อง ปี 2566: เมียนมา 73 กัมพูชา 17 ลาว 10 และเวียดนามน้อยกว่า 1 จาก 100 คน (เมียนมา 1.71 ล้านคน กัมพูชา 401,350 คน ลาว 232,640 คน เวียดนาม 1,387 คน)",
            source: "ที่มา: ILO, Thailand: Migration Report 2024 via Statista, 2025 · สัดส่วนคำนวณโดย ComInnoCenter",
            groups: ["เมียนมา", "กัมพูชา", "ลาว", "เวียดนาม"],
            series: [{"label": "2562", "values": [1820, 686.43, 280.96, 0.096]}, {"label": "2563", "values": [1440, 454.38, 207.29, 0.248]}, {"label": "2564", "values": [1460, 455.48, 213.2, 0.137]}, {"label": "2565", "values": [1980, 519.76, 234.99, 1.704]}, {"label": "2566", "values": [1710, 401.35, 232.64, 1.387]}],
            data: [],
          },
        },
        {
          kind: "p",
          text: "ในงานวิจัยปี 2569 ที่ทีมวิจัยซึ่งมีนักวิจัยของศูนย์ฯ ร่วมอยู่ด้วย ร่วมออกแบบโปรแกรมบริหารร่างกายกับแรงงานชาวเมียนมาในโรงงานอาหารทะเลแห่งหนึ่ง แรงงานทั้ง 29 คนที่ร่วมวงคุยมีอาการที่มือทุกคน 25 คน (86%) มือแข็งตอนเช้าจนกระทบชีวิตนอกงาน และ 23 คน (79%) ซื้อยาแก้ปวดกินเองอย่างน้อยสัปดาห์ละครั้ง",
        },
        {
          kind: "p",
          text: "ตัวเลขชุดนี้บอกอะไรมากกว่าความเจ็บป่วย มันบอกว่าคนกลุ่มนี้พยายามดูแลตัวเองอยู่แล้ว เพียงแต่ไม่มีใครออกแบบทางเลือกที่เข้ากับชีวิตจริงของเขา",
        },
        {
          kind: "p",
          text: "ภาพเดียวกันนี้เห็นได้ในระดับประเทศ ข้อมูลจากรายงานการย้ายถิ่นของ ILO ระบุว่า ณ กุมภาพันธ์ 2567 มีแรงงานข้ามชาติราว 2.54 ล้านคนที่มีสิทธิ์เข้ากองทุนประกันสังคม แต่ลงทะเบียนจริงราว 1.30 ล้านคน และในระบบประกันสุขภาพแรงงานต่างด้าว มีผู้มีสิทธิ์ราว 4.8 แสนคน ลงทะเบียนราว 2.5 แสนคน [5] คิดเป็นราวครึ่งเดียวในทั้งสองระบบ ช่องว่างนี้มีหลายสาเหตุ ไม่ใช่เรื่องการสื่อสารเพียงอย่างเดียว แต่ก็สะท้อนว่าสิทธิ์ที่มีอยู่บนกระดาษ ยังเดินทางไปไม่ถึงชีวิตจริงของคนจำนวนมาก",
        },
        {
          kind: "chart",
          chart: {
            type: "coverage",
            title: "มีสิทธิ์ แต่ลงทะเบียนจริงราวครึ่งเดียว",
            subtitle: "แรงงานข้ามชาติที่มีสิทธิ์เทียบกับที่ลงทะเบียนจริง · ก.พ. 2567 · กรอบเส้นประ = ผู้มีสิทธิ์ แถบสี = ลงทะเบียนแล้ว · แต่ละแถบเทียบกับผู้มีสิทธิ์ของระบบนั้น",
            alt: "กองทุนประกันสังคม มีสิทธิ์ 2.54 ล้านคน ลงทะเบียน 1.30 ล้านคน (51%) · ประกันสุขภาพแรงงานต่างด้าว มีสิทธิ์ 476,470 คน ลงทะเบียน 250,880 คน (53%)",
            source: "ที่มา: ILO, Thailand: Migration Report 2024 via Statista, 2025 · ร้อยละคำนวณโดย ComInnoCenter",
            data: [{"label": "กองทุนประกันสังคม (SSF)", "value": 1301.57, "total": 2544.67}, {"label": "ประกันสุขภาพแรงงานต่างด้าว (MHIS)", "value": 250.88, "total": 476.47}],
          },
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
        {
          kind: "p",
          text: "ตัวเลขระดับประเทศที่ใช้ประกอบมาจากรายงานของ ILO ผ่าน Statista ซึ่งเป็นข้อมูลแรงงานที่อยู่ในระบบทางการ จำนวนจริงอาจสูงกว่านี้ และช่องว่างการลงทะเบียนประกันมีหลายสาเหตุ เช่น ประเภทการจ้างงานและภาระค่าใช้จ่าย จึงไม่ควรตีความว่าเป็นผลจากการสื่อสารเพียงอย่างเดียว สัดส่วนที่อ้างถึงคำนวณโดยศูนย์ฯ จากตัวเลขในรายงาน",
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
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "ILO via Statista. (2025, February 5). Number of migrant workers from Myanmar in Thailand from 2019 to 2023 (Thailand: Migration Report 2024, p. 46). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1551849/thailand-number-of-burmese-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Cambodia in Thailand from 2019 to 2023. เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1551843/thailand-number-of-cambodian-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Lao PDR in Thailand from 2019 to 2023. เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1551845/thailand-number-of-lao-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Vietnam in Thailand from 2019 to 2023. เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1551850/thailand-number-of-vietnamese-migrant-workers/",
        },
        {
          text: "ILO via Statista. Eligibility of migrant workers to enroll in the healthcare scheme in Thailand as of February 2024, by status (Thailand: Migration Report 2024, p. 233). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1551893/thailand-eligibility-of-migrant-workers-for-the-healthcare-scheme-by-status/",
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
          text: "Min is one of about 1.71 million workers from Myanmar employed in Thailand in 2023 [1]. Compared with workers from Cambodia (about 400,000), Laos (about 230,000) and Vietnam (about 1,400) in the same year, workers from Myanmar made up roughly three in four of those from the four countries combined [1–4]. Communication designed without this group in mind overlooks most of the country's migrant workforce.",
        },
        {
          kind: "chart",
          chart: {
            type: "waffle",
            title: "If there were 100 migrant workers, how many would be from Myanmar?",
            subtitle: "Counting only workers from Myanmar, Cambodia, Laos and Vietnam in Thailand · 2019–2023",
            alt: "100-square chart for 2023: Myanmar 73, Cambodia 17, Laos 10 and Vietnam fewer than 1 out of 100 (Myanmar 1.71 million, Cambodia 401,350, Laos 232,640, Vietnam 1,387)",
            source: "Source: ILO, Thailand: Migration Report 2024 via Statista, 2025 · shares calculated by ComInnoCenter",
            groups: ["Myanmar", "Cambodia", "Laos", "Vietnam"],
            series: [{"label": "2019", "values": [1820, 686.43, 280.96, 0.096]}, {"label": "2020", "values": [1440, 454.38, 207.29, 0.248]}, {"label": "2021", "values": [1460, 455.48, 213.2, 0.137]}, {"label": "2022", "values": [1980, 519.76, 234.99, 1.704]}, {"label": "2023", "values": [1710, 401.35, 232.64, 1.387]}],
            data: [],
          },
        },
        {
          kind: "p",
          text: "In a 2026 study in which a research team including researchers from our centre co-designed an exercise programme with Myanmar workers at a seafood plant, all 29 workers in the sessions reported hand symptoms. Twenty-five of them (86%) had morning stiffness that affected life outside work, and 23 (79%) bought painkillers at least once a week.",
        },
        {
          kind: "p",
          text: "Those figures say more than that people are in pain. They say this group is already trying to look after itself. Nobody had designed an option that fits the life they actually live.",
        },
        {
          kind: "p",
          text: "The same picture shows up nationally. The ILO's migration report states that in February 2024 about 2.54 million migrant workers were eligible for the Social Security Fund, but only about 1.30 million were enrolled. In the Migrant Health Insurance Scheme, about 480,000 were eligible and about 250,000 enrolled [5]. That is roughly half in both schemes. The gap has many causes, not communication alone, but it shows that rights that exist on paper have yet to reach the daily lives of many people.",
        },
        {
          kind: "chart",
          chart: {
            type: "coverage",
            title: "Eligible, but only about half enrolled",
            subtitle: "Eligible migrant workers compared with those actually enrolled · February 2024 · dashed outline = eligible, coloured bar = enrolled · each bar is scaled to its own scheme",
            alt: "Social Security Fund: 2.54 million eligible, 1.30 million enrolled (51%) · Migrant Health Insurance Scheme: 476,470 eligible, 250,880 enrolled (53%)",
            source: "Source: ILO, Thailand: Migration Report 2024 via Statista, 2025 · percentages calculated by ComInnoCenter",
            data: [{"label": "Social Security Fund (SSF)", "value": 1301.57, "total": 2544.67}, {"label": "Migrant Health Insurance Scheme (MHIS)", "value": 250.88, "total": 476.47}],
          },
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
        {
          kind: "p",
          text: "The national figures come from an ILO report via Statista and cover workers in the official system, so the real numbers may be higher. The enrolment gap has many causes, such as type of employment and cost, and should not be read as the result of communication alone. The shares quoted were calculated by our centre from the figures in the report.",
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
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "ILO via Statista. (2025, February 5). Number of migrant workers from Myanmar in Thailand from 2019 to 2023 (Thailand: Migration Report 2024, p. 46). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1551849/thailand-number-of-burmese-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Cambodia in Thailand from 2019 to 2023. Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1551843/thailand-number-of-cambodian-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Lao PDR in Thailand from 2019 to 2023. Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1551845/thailand-number-of-lao-migrant-workers/",
        },
        {
          text: "ILO via Statista. Number of migrant workers from Vietnam in Thailand from 2019 to 2023. Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1551850/thailand-number-of-vietnamese-migrant-workers/",
        },
        {
          text: "ILO via Statista. Eligibility of migrant workers to enroll in the healthcare scheme in Thailand as of February 2024, by status (Thailand: Migration Report 2024, p. 233). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1551893/thailand-eligibility-of-migrant-workers-for-the-healthcare-scheme-by-status/",
        },
      ],
    },
  },
  {
    slug: "line-news-trust-2026",
    date: "2026-10-21",
    author: SMITH,
    cover: "/images/insights/line-news-trust-2026-hero",
    th: {
      coverAlt:
        "ภาพประกอบกระดาษ โทรโข่งสีน้ำเงินบนพื้นกระดาษสีครีม เสียงที่ออกจากปากโทรโข่งกลายเป็นบับเบิลแชตสีส้มกลมๆ อันเดียว",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
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
          text: "ผลสำรวจของ Reuters Institute ร่วมกับ YouGov ช่วงมกราคมถึงกุมภาพันธ์ 2026 พบว่า ผู้ใช้อินเทอร์เน็ตไทย 69% ใช้เฟซบุ๊กเป็นช่องทางรับข่าว ตามมาด้วย TikTok 55% และ YouTube 54% [1] แล้วแอปแชตที่เราใช้คุยกันทุกวันล่ะ ลองทายดูก่อน",
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
            guess: "LINE",
          },
        },
        {
          kind: "p",
          text: "LINE ซึ่งเราคุ้นเคยในฐานะแอปแชต มีคนใช้รับข่าวถึง 45% ตัวเลขนี้ยืนยันสิ่งที่นักสื่อสารภาครัฐรู้อยู่แล้ว คือประชาชนไม่ได้รอข่าวจากหน้าเว็บไซต์หน่วยงาน พวกเขารับข่าวในพื้นที่เดียวกับที่คุยกับครอบครัวและดูคลิปบันเทิง",
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
      coverAlt:
        "Paper-craft illustration on cream paper: a blue megaphone whose sound turns into a single round orange chat bubble",
      coverCaption: "Illustration generated with AI",
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
          text: "A Reuters Institute and YouGov survey from January to February 2026 found that 69% of Thai internet users get news on Facebook, followed by TikTok at 55% and YouTube at 54%. [1] What about the chat app most of us use every day? Take a guess first.",
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
            guess: "LINE",
          },
        },
        {
          kind: "p",
          text: "LINE, which most of us think of as a chat app, is used for news by 45%. These figures confirm what public communicators already know. People are not waiting for news on an agency's website. They get it in the same place where they talk to their families and watch entertainment clips.",
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
  {
    slug: "ai-news-comfort-2025",
    date: "2026-10-21",
    author: SMITH,
    cover: "/images/insights/ai-news-comfort-2025-hero",
    th: {
      coverAlt:
        "ภาพประกอบกระดาษ ไมโครโฟนตั้งโต๊ะสีส้มบนพื้นกระดาษสีครีม ฐานของไมโครโฟนเป็นเฟืองสีน้ำเงิน",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      title: "ให้ AI ช่วยได้ แต่อย่าให้ AI เป็นคนเล่า",
      dek: "ผลสำรวจ 6 ประเทศพบว่าคนสบายใจกับข่าวที่คนเขียน 62% แต่เหลือ 12% ถ้า AI เขียนทั้งหมด องค์กรไทยควรใช้ AI ในงานสื่อสารอย่างไรให้ไม่เสียความเชื่อใจ",
      body: [
        {
          kind: "p",
          text: "ทุกวันนี้หลายองค์กรเริ่มใช้ AI ร่างข่าวประชาสัมพันธ์ สรุปรายงาน หรือทำภาพประกอบ คำถามที่เราได้ยินบ่อยในห้องอบรมคือ “ใช้ได้ไหม แล้วต้องบอกผู้อ่านหรือเปล่า”"
        },
        {
          kind: "p",
          text: "ข้อมูลล่าสุดไม่ได้ตอบว่าใช้ได้หรือไม่ได้ แต่ชี้ให้เห็นเส้นแบ่งที่ชัดเจนกว่านั้น ผู้คนไม่ได้กังวลว่า AI อยู่ในกระบวนการ พวกเขากังวลว่า AI กำลังจะมาแทน “คน” ที่เล่าเรื่องให้พวกเขาฟัง"
        },
        {
          kind: "h2",
          text: "ยิ่ง AI ทำมาก ความสบายใจยิ่งลด"
        },
        {
          kind: "p",
          text: "รายงาน Generative AI and News 2025 ของ Reuters Institute ร่วมกับ YouGov สำรวจผู้ใช้อินเทอร์เน็ต 12,000 คนใน 6 ประเทศ ได้แก่ สหรัฐอเมริกา สหราชอาณาจักร ญี่ปุ่น ฝรั่งเศส เดนมาร์ก และอาร์เจนตินา ถามว่าสบายใจแค่ไหนกับข่าวที่ผลิตด้วยระดับการใช้ AI ต่างกัน [1]"
        },
        {
          kind: "chart",
          chart: {
            type: "dial",
            title: "ถ้า AI เป็นคนเขียนข่าวมากขึ้น คนจะสบายใจแค่ไหน",
            subtitle: "เลื่อนแถบจาก \"คนเขียน\" ไป \"AI เขียน\" · ร้อยละของผู้ตอบที่สบายใจ",
            alt: "ความสบายใจต่อข่าวตามระดับการใช้ AI: คนเขียนทั้งหมด 62% คนเขียนเป็นหลักมี AI ช่วย 43% AI เขียนเป็นหลักมีคนตรวจ 21% AI เขียนทั้งหมด 12% (สำรวจ 6 ประเทศ ไม่รวมไทย)",
            source: "ที่มา: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · Generative AI and News Report 2025 · สำรวจออนไลน์ n = 12,000 ใน 6 ประเทศ (สหรัฐฯ สหราชอาณาจักร ญี่ปุ่น ฝรั่งเศส เดนมาร์ก อาร์เจนตินา) ไม่รวมไทย",
            data: [
              {
                label: "คนเขียนทั้งหมด",
                detail: "นักข่าวเขียนเองทั้งหมด",
                value: 62,
                aiShare: 0
              },
              {
                label: "คนเป็นหลัก มี AI ช่วย",
                detail: "นักข่าวเขียนเป็นหลัก มี AI ช่วยบ้าง",
                value: 43,
                aiShare: 0.25
              },
              {
                label: "AI เป็นหลัก มีคนตรวจ",
                detail: "AI เขียนเป็นหลัก มีคนตรวจ",
                value: 21,
                aiShare: 0.75
              },
              {
                label: "AI ทั้งหมด",
                detail: "AI เขียนทั้งหมด",
                value: 12,
                aiShare: 1
              }
            ]
          }
        },
        {
          kind: "p",
          text: "ข่าวที่นักข่าวเขียนเองทั้งหมด มีคนสบายใจ 62% เมื่อคนเขียนเป็นหลักแต่มี AI ช่วยบ้าง ตัวเลขลดเหลือ 43% ถ้า AI เขียนเป็นหลักโดยมีคนตรวจ เหลือ 21% และถ้า AI เขียนทั้งหมด เหลือเพียง 12% [1]"
        },
        {
          kind: "p",
          text: "สังเกตว่าแม้มีคนเป็นผู้เขียนหลัก แค่เพิ่ม AI เข้าไปช่วย ความสบายใจก็ลดลงไปเกือบหนึ่งในสามแล้ว"
        },
        {
          kind: "h2",
          text: "งานหลังบ้านโอเค งานที่เป็น “หน้าตา” ไม่โอเค"
        },
        {
          kind: "p",
          text: "เมื่อแยกเป็นงานย่อย ภาพยิ่งชัดขึ้น ก่อนดูคำตอบ ลองเลือกดูว่าคุณโอเคให้ AI ทำงานไหนบ้าง แล้วเทียบกับคนใน 6 ประเทศ [2]"
        },
        {
          kind: "chart",
          chart: {
            type: "pick",
            title: "คุณโอเคให้ AI ทำงานไหนในการทำข่าวบ้าง",
            subtitle: "ร้อยละของผู้ตอบที่สบายใจให้ AI ทำงานแต่ละประเภท",
            alt: "ความสบายใจให้ AI ทำงานข่าว 12 ประเภท: แก้คำผิด 55% แปลภาษา 53% ทำกราฟ 47% วิเคราะห์ข้อมูล 45% เขียนพาดหัว 41% แปลงเป็นเสียง/วิดีโอ 39% ค้นคว้า 38% ภาพประกอบทั่วไป 35% เขียนเนื้อข่าว 33% เขียนใหม่ให้คนต่างกลุ่ม 30% ภาพเสมือนจริงแทนภาพถ่าย 26% ผู้ประกาศหรือผู้เขียนที่เป็น AI 19%",
            source: "ที่มา: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · Generative AI and News Report 2025 · สำรวจออนไลน์ n = 12,000 ใน 6 ประเทศ (สหรัฐฯ สหราชอาณาจักร ญี่ปุ่น ฝรั่งเศส เดนมาร์ก อาร์เจนตินา) ไม่รวมไทย",
            order: [
              3,
              10,
              0,
              8,
              5,
              11,
              1,
              7,
              4,
              9,
              2,
              6
            ],
            data: [
              {
                label: "แก้คำผิดและไวยากรณ์",
                value: 55
              },
              {
                label: "แปลภาษา",
                value: 53
              },
              {
                label: "ทำกราฟและอินโฟกราฟิก",
                value: 47
              },
              {
                label: "วิเคราะห์ข้อมูล",
                value: 45
              },
              {
                label: "เขียนพาดหัว",
                value: 41
              },
              {
                label: "แปลงบทความเป็นเสียง/วิดีโอ",
                value: 39
              },
              {
                label: "ค้นคว้าทำข่าว",
                value: 38
              },
              {
                label: "ภาพประกอบทั่วไป",
                value: 35
              },
              {
                label: "เขียนเนื้อข่าว",
                value: 33
              },
              {
                label: "เขียนข่าวเดิมใหม่ให้คนต่างกลุ่ม",
                value: 30
              },
              {
                label: "ภาพเสมือนจริงแทนภาพถ่าย",
                value: 26
              },
              {
                label: "ผู้ประกาศหรือผู้เขียนที่เป็น AI",
                value: 19
              }
            ]
          }
        },
        {
          kind: "p",
          text: "คนส่วนใหญ่สบายใจที่สุดเมื่อ AI ช่วยแก้คำผิดและไวยากรณ์ (55%) และแปลภาษา (53%) แต่ความสบายใจต่ำที่สุดกับการสร้างภาพเสมือนจริงแทนภาพถ่าย (26%) และการใช้ผู้ประกาศหรือผู้เขียนที่เป็น AI (19%) [2]"
        },
        {
          kind: "p",
          text: "รูปแบบนี้สอดคล้องกับสิ่งที่เราเห็นในบทความก่อนหน้า ผู้คนเชื่อใจ “คน” มากกว่าช่องทาง เมื่อ AI ทำงานที่มองไม่เห็น เช่น ตรวจคำผิดหรือวิเคราะห์ข้อมูล ผู้อ่านไม่ค่อยติดใจ แต่เมื่อ AI กลายเป็นใบหน้าหรือเสียงที่พูดกับเขาโดยตรง ความเชื่อใจหายไปอย่างรวดเร็ว",
          links: [
            {
              match: "บทความก่อนหน้า",
              href: "/insights/line-news-trust-2026"
            }
          ]
        },
        {
          kind: "h2",
          text: "ทำไมเรื่องนี้สำคัญกับองค์กรไทยเป็นพิเศษ"
        },
        {
          kind: "p",
          text: "ข้อมูลชุดนี้ไม่ได้สำรวจคนไทย เราจึงสรุปตรงๆ ไม่ได้ว่าคนไทยจะคิดเหมือนกัน แต่มีเหตุผลที่องค์กรไทยควรระวังเรื่องนี้มากกว่าเดิม"
        },
        {
          kind: "p",
          text: "ปี 2026 ความเชื่อมั่นต่อข่าวโดยรวมของคนไทยลดลงเหลือ 47% ต่ำสุดในช่วงหกปีที่มีข้อมูล [3] เมื่อฐานความเชื่อใจบางอยู่แล้ว การใช้ AI ในจุดที่ผู้อ่านรู้สึกว่าถูกแทนที่ด้วยเครื่อง อาจทำให้ความเชื่อใจที่เหลือน้อยอยู่แล้วลดลงไปอีก"
        },
        {
          kind: "p",
          text: "อีกด้านหนึ่ง ใน 6 ประเทศที่สำรวจ มีคน 37% เชื่อว่าสื่อใช้ AI บ่อยอยู่แล้ว และมีเพียง 4% ที่คิดว่าไม่ใช้เลย [4] ผู้อ่านจึงไม่ได้ไร้เดียงสา หลายคนสันนิษฐานไว้ก่อนแล้วว่ามี AI อยู่เบื้องหลัง การปิดบังจึงมีความเสี่ยงมากกว่าการบอกตรงๆ"
        },
        {
          kind: "h2",
          text: "สามหลักการใช้ AI ในงานสื่อสารโดยไม่เสียความเชื่อใจ"
        },
        {
          kind: "tips",
          items: [
            {
              title: "ใช้ AI หลังบ้านให้เต็มที่",
              text: "ตรวจคำผิด แปลภาษา สรุปเอกสาร วิเคราะห์ข้อมูล ทำร่างแรก งานเหล่านี้ประหยัดเวลาได้มากและผู้อ่านยอมรับได้ค่อนข้างดี"
            },
            {
              title: "ให้หน้าตาและเสียงเป็นของคนจริง",
              text: "ผู้พูด ผู้ลงนาม และภาพที่อ้างว่าเป็นเหตุการณ์จริง ควรเป็นคนจริงและภาพจริง หากจำเป็นต้องใช้ภาพที่สร้างด้วย AI ให้ใช้เป็นภาพประกอบเชิงแนวคิด ไม่ใช่ภาพที่ดูเหมือนภาพถ่ายเหตุการณ์"
            },
            {
              title: "บอกผู้อ่านอย่างตรงไปตรงมา",
              text: "เขียนสั้นๆ ว่า AI ช่วยทำส่วนไหน และใครเป็นผู้ตรวจรับผิดชอบ เช่น “ร่างแรกจัดทำโดยใช้ AI ตรวจทานและรับรองโดยฝ่ายสื่อสารองค์กร” การบอกแบบนี้ทำให้ผู้อ่านรู้ว่ายังมีคนรับผิดชอบอยู่"
            }
          ]
        },
        {
          kind: "h2",
          text: "ข้อควรระวังในการอ่านข้อมูล"
        },
        {
          kind: "p",
          text: "ข้อมูลหลักของบทความนี้มาจากการสำรวจออนไลน์ใน 6 ประเทศเมื่อกลางปี 2025 ซึ่งไม่รวมประเทศไทย ทัศนคติต่อ AI อาจต่างกันตามวัฒนธรรมและความคุ้นเคยกับเทคโนโลยี ตัวเลขจึงควรใช้เป็นสัญญาณทิศทาง ไม่ใช่ค่าที่ใช้แทนคนไทยได้โดยตรง หากองค์กรต้องการตัดสินใจเชิงนโยบาย การสำรวจกลุ่มเป้าหมายของตนเองจะให้คำตอบที่แม่นกว่า"
        },
        {
          kind: "h2",
          text: "AI ช่วยได้ แต่ความเชื่อใจยังต้องมาจากคน"
        },
        {
          kind: "p",
          text: "AI ทำให้งานสื่อสารเร็วขึ้นและทำได้มากขึ้นจริง แต่ข้อมูลบอกเราว่าผู้คนยังอยากรู้ว่ามี “ใคร” อยู่เบื้องหลังเรื่องที่ได้ยิน องค์กรที่ใช้ AI อย่างฉลาดคือองค์กรที่ให้ AI ทำงานหนักอยู่ข้างหลัง และให้คนที่น่าเชื่อถือยืนอยู่ข้างหน้า"
        },
        {
          kind: "note",
          text: "หากองค์กรของคุณกำลังวางแนวทางการใช้ AI ในงานสื่อสาร ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ"
        }
      ],
      references: [
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Public comfort with AI-generated news in selected countries as of July 2025, by level of human input (online survey, n = 12,000, US, UK, Japan, France, Denmark, Argentina; Generative AI and News Report 2025, p. 44). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1662348/comfort-ai-generated-news-worldwide-by-level-human-input/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Share of people comfortable with AI in journalism in selected countries as of July 2025, by task (Generative AI and News Report 2025, p. 46). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1662352/comfortable-ai-use-journalism-worldwide-by-task/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026 (online survey, 18+, n = 2,043). เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Share of people who believe generative AI is frequently used in the news media sector in selected countries as of July 2025. เข้าถึงเมื่อ 21 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1662347/generative-ai-use-in-news-media-sector-perception-worldwide/"
        }
      ]
    },
    en: {
      title: "Let AI help, but don't let AI tell the story",
      coverAlt:
        "Paper-craft illustration on cream paper: an orange desk microphone standing on a blue gear as its base",
      coverCaption: "Illustration generated with AI",
      dek: "A six-country survey finds 62% are comfortable with news written by people, but only 12% when AI writes it all. How should organisations use AI in communication without losing trust?",
      body: [
        {
          kind: "p",
          text: "Many organisations now use AI to draft press releases, summarise reports or make illustrations. The question we hear most often in training sessions is: “Can we use it, and do we have to tell readers?”"
        },
        {
          kind: "p",
          text: "The latest data does not answer yes or no. It points to a clearer line. People are not worried that AI is part of the process. They are worried that AI is about to replace the person who tells them the story."
        },
        {
          kind: "h2",
          text: "The more AI does, the less comfortable people are"
        },
        {
          kind: "p",
          text: "The Reuters Institute's Generative AI and News Report 2025, with YouGov, surveyed 12,000 internet users in six countries: the United States, the United Kingdom, Japan, France, Denmark and Argentina. It asked how comfortable they were with news produced with different levels of AI involvement [1]."
        },
        {
          kind: "chart",
          chart: {
            type: "dial",
            title: "As AI writes more of the news, how comfortable are people?",
            subtitle: "Slide from \"human\" to \"AI\" · share of respondents who are comfortable",
            alt: "Comfort with news by level of AI involvement: entirely human 62%, mostly human with some AI help 43%, mostly AI with human oversight 21%, entirely AI 12% (6 countries, not Thailand)",
            source: "Source: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · Generative AI and News Report 2025 · online survey, n = 12,000 in 6 countries (US, UK, Japan, France, Denmark, Argentina), not including Thailand",
            data: [
              {
                label: "Entirely human",
                detail: "Written entirely by journalists",
                value: 62,
                aiShare: 0
              },
              {
                label: "Mostly human, some AI",
                detail: "Mostly written by journalists, with some AI help",
                value: 43,
                aiShare: 0.25
              },
              {
                label: "Mostly AI, human check",
                detail: "Mostly written by AI, with some human oversight",
                value: 21,
                aiShare: 0.75
              },
              {
                label: "Entirely AI",
                detail: "Written entirely by AI",
                value: 12,
                aiShare: 1
              }
            ]
          }
        },
        {
          kind: "p",
          text: "For news written entirely by journalists, 62% were comfortable. When journalists did most of the writing with some AI help, that fell to 43%. When AI did most of the writing with a human checking, it was 21%, and for news written entirely by AI, only 12% [1]."
        },
        {
          kind: "p",
          text: "Notice that even with a human as the main writer, simply adding AI help cut comfort by nearly a third."
        },
        {
          kind: "h2",
          text: "Backstage work is fine; the public face is not"
        },
        {
          kind: "p",
          text: "Broken down by task, the picture gets sharper. Before you look at the answers, pick the tasks you would be happy for AI to do, then compare with people in the six countries [2]."
        },
        {
          kind: "chart",
          chart: {
            type: "pick",
            title: "Which newsroom tasks would you let AI do?",
            subtitle: "Share of respondents comfortable with AI doing each task",
            alt: "Comfort with AI doing 12 newsroom tasks: spelling and grammar 55%, translation 53%, charts 47%, data analysis 45%, headlines 41%, audio or video versions 39%, research 38%, generic illustrations 35%, article text 33%, rewriting for different audiences 30%, realistic images with no photo 26%, AI presenter or author 19%",
            source: "Source: Reuters Institute for the Study of Journalism / YouGov via Statista, 2026 · Generative AI and News Report 2025 · online survey, n = 12,000 in 6 countries (US, UK, Japan, France, Denmark, Argentina), not including Thailand",
            order: [
              3,
              10,
              0,
              8,
              5,
              11,
              1,
              7,
              4,
              9,
              2,
              6
            ],
            data: [
              {
                label: "Fixing spelling and grammar",
                value: 55
              },
              {
                label: "Translation",
                value: 53
              },
              {
                label: "Charts and infographics",
                value: 47
              },
              {
                label: "Data analysis",
                value: 45
              },
              {
                label: "Writing headlines",
                value: 41
              },
              {
                label: "Turning articles into audio or video",
                value: 39
              },
              {
                label: "Research for stories",
                value: 38
              },
              {
                label: "Generic illustrations",
                value: 35
              },
              {
                label: "Writing the article text",
                value: 33
              },
              {
                label: "Rewriting stories for different audiences",
                value: 30
              },
              {
                label: "Realistic images when there is no photo",
                value: 26
              },
              {
                label: "An AI presenter or author",
                value: 19
              }
            ]
          }
        },
        {
          kind: "p",
          text: "Most people were most comfortable with AI fixing spelling and grammar (55%) and translating (53%), and least comfortable with realistic images used in place of photos (26%) and with AI presenters or authors (19%) [2]."
        },
        {
          kind: "p",
          text: "This fits what we saw in our previous article: people trust people more than channels. When AI does work readers cannot see, such as checking spelling or analysing data, they hardly mind. When AI becomes the face or the voice speaking to them directly, trust drains away quickly.",
          links: [
            {
              match: "our previous article",
              href: "/en/insights/line-news-trust-2026"
            }
          ]
        },
        {
          kind: "h2",
          text: "Why this matters especially for Thai organisations"
        },
        {
          kind: "p",
          text: "This survey did not include Thailand, so we cannot say that Thais think the same way. There are still reasons for Thai organisations to be more careful than before."
        },
        {
          kind: "p",
          text: "In 2026, overall trust in news in Thailand fell to 47%, the lowest in six years of data [3]. When trust is already thin, using AI where readers feel a machine has replaced a person could wear away what little is left."
        },
        {
          kind: "p",
          text: "On the other hand, across the six countries surveyed, 37% believe the news media already use AI often, and only 4% think they never do [4]. Readers are not naive. Many already assume AI is at work behind the scenes, so hiding it is riskier than saying so plainly."
        },
        {
          kind: "h2",
          text: "Three principles for using AI in communication without losing trust"
        },
        {
          kind: "tips",
          items: [
            {
              title: "Use AI fully behind the scenes",
              text: "Checking spelling, translating, summarising documents, analysing data and producing first drafts save a great deal of time, and readers accept them fairly well."
            },
            {
              title: "Keep the face and the voice human",
              text: "Speakers, signatories and images presented as real events should be real people and real photographs. If you need an AI-generated image, use it as a conceptual illustration, not as something that looks like a news photo."
            },
            {
              title: "Tell readers plainly",
              text: "Say briefly which part AI helped with and who checked it and takes responsibility, for example “First draft prepared with AI; reviewed and approved by the corporate communications team.” This tells readers that a person is still accountable."
            }
          ]
        },
        {
          kind: "h2",
          text: "Reading this data with care"
        },
        {
          kind: "p",
          text: "The main data in this article come from an online survey in six countries in mid-2025, which did not include Thailand. Attitudes to AI may differ with culture and familiarity with technology, so treat the figures as a signal of direction, not as a stand-in for Thai audiences. If your organisation needs to make a policy decision, surveying your own audience will give a more accurate answer."
        },
        {
          kind: "h2",
          text: "AI can help, but trust still has to come from people"
        },
        {
          kind: "p",
          text: "AI really does make communication work faster and broader. But the data tells us that people still want to know who is behind the stories they hear. Organisations that use AI wisely let it do the heavy lifting backstage and put trusted people out front."
        },
        {
          kind: "note",
          text: "If your organisation is drawing up guidelines for using AI in communication, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned."
        }
      ],
      references: [
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Public comfort with AI-generated news in selected countries as of July 2025, by level of human input (online survey, n = 12,000, US, UK, Japan, France, Denmark, Argentina; Generative AI and News Report 2025, p. 44). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1662348/comfort-ai-generated-news-worldwide-by-level-human-input/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Share of people comfortable with AI in journalism in selected countries as of July 2025, by task (Generative AI and News Report 2025, p. 46). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1662352/comfortable-ai-use-journalism-worldwide-by-task/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026 (online survey, 18+, n = 2,043). Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/"
        },
        {
          text: "Reuters Institute for the Study of Journalism & YouGov via Statista. (2026, July 2). Share of people who believe generative AI is frequently used in the news media sector in selected countries as of July 2025. Accessed 21 October 2026.",
          url: "https://www.statista.com/statistics/1662347/generative-ai-use-in-news-media-sector-perception-worldwide/"
        }
      ]
    }
  },
  {
    slug: "ageing-digital-gap-2026",
    date: "2026-10-27",
    author: SMITH,
    palette: [3, 7],
    cover: "/images/insights/ageing-digital-gap-2026-hero",
    th: {
      title: "ออนไลน์แล้ว แต่ยังอ่านไม่ออก: สื่อสารสุขภาพกับผู้สูงวัยในวันที่ทุกอย่างย้ายขึ้นมือถือ",
      dek: "ผู้สูงวัยไทยที่ใช้อินเทอร์เน็ตเพิ่มจากราว 4% เป็นเกือบ 58% ในเวลาแปดปี แต่ 69% บอกว่าติดที่หน้าจอภาษาอังกฤษ บทเรียนสำหรับหน่วยงานที่กำลังย้ายบริการสุขภาพขึ้นออนไลน์",
      coverAlt:
        "ภาพประกอบกระดาษ สมาร์ตโฟนสีเขียวบนพื้นกระดาษสีครีม มีแว่นสายตาสีเหลืองวางพาดบนหน้าจอ",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "ป้าจำเนียร (ตัวละครสมมติ) อายุ 67 ปี ลูกสาวลงแอปนัดหมอไว้ให้ในมือถือตั้งแต่ปีที่แล้ว ป้าเปิดดูข่าวและคุยไลน์กับหลานได้คล่อง แต่ทุกครั้งที่ต้องยืนยันนัด ป้าต้องรอหลานกลับจากโรงเรียน เพราะปุ่มที่ต้องกดเขียนว่า Confirm และป้าไม่แน่ใจว่ากดแล้วจะเสียเงินหรือเปล่า",
        },
        {
          kind: "p",
          text: "ปัญหาของป้าไม่ใช่ไม่มีมือถือ ไม่ใช่ไม่มีอินเทอร์เน็ต และไม่ใช่ไม่อยากดูแลตัวเอง ป้าอยู่บนช่องทางเดียวกับคนรุ่นลูกแล้ว แต่ข้อความที่หน่วยงานส่งมายังเขียนสำหรับคนอีกกลุ่มหนึ่ง",
        },
        { kind: "h2", text: "ผู้สูงวัยขึ้นมาออนไลน์เร็วกว่าที่หลายคนคิด" },
        {
          kind: "p",
          text: "ข้อมูลจากสำนักงานสถิติแห่งชาติที่วิจัยกรุงศรีรวบรวมไว้ ชี้ว่าสัดส่วนผู้สูงวัยไทยที่ใช้อินเทอร์เน็ตเพิ่มจาก 3.9% ในปี 2558 เป็น 57.8% ในปี 2566 [1] ช่วงที่โตเร็วที่สุดคือ 2562 ถึง 2564 ซึ่งตัวเลขขยับจาก 18.6% เป็น 48.8% ในเวลาเพียงสองปี",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "ผู้สูงวัยไทยที่ใช้อินเทอร์เน็ต เพิ่มขึ้นเกือบ 15 เท่าในแปดปี",
            subtitle: "ร้อยละของผู้สูงวัยที่ใช้อินเทอร์เน็ต · พ.ศ. 2558–2566",
            alt: "กราฟเส้นแสดงร้อยละของผู้สูงวัยไทยที่ใช้อินเทอร์เน็ต ปี 2558 3.9% 2559 6% 2560 8.6% 2561 10.3% 2562 18.6% 2563 33.3% 2564 48.8% 2565 52.4% และ 2566 57.8%",
            source: "ที่มา: Krungsri Research, National Statistical Office (Thailand), NESDC via Statista, 2024 · Aged Society: Embracing Challenges and Unlocking Opportunities, p. 17",
            data: [
              { label: "2558", value: 3.9 },
              { label: "2559", value: 6 },
              { label: "2560", value: 8.6 },
              { label: "2561", value: 10.3 },
              { label: "2562", value: 18.6 },
              { label: "2563", value: 33.3 },
              { label: "2564", value: 48.8, highlight: true },
              { label: "2565", value: 52.4 },
              { label: "2566", value: 57.8, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "การสำรวจการใช้เทคโนโลยีสารสนเทศในครัวเรือนปี 2568 ให้ภาพที่ใหม่กว่า คนอายุ 60 ปีขึ้นไปใช้อินเทอร์เน็ต 70.1% ขณะที่คนอายุ 15 ถึง 24 ปีใช้ 99.2% [2] ช่องว่างราว 29 จุดนี้คือคนหลายล้านคน และกลุ่มนี้กำลังโตขึ้นเรื่อยๆ ผู้สูงวัยคิดเป็น 20.17% ของประชากรในปี 2566 และคาดว่าจะเป็น 31.37% ในปี 2583 [3] หรือเกือบหนึ่งในสามของคนทั้งประเทศ",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "ทุกช่วงวัยออนไลน์เกือบครบ ยกเว้นวัย 60 ขึ้นไป",
            subtitle: "ร้อยละของคนในแต่ละช่วงอายุที่ใช้อินเทอร์เน็ต · พ.ศ. 2568",
            alt: "กราฟแท่งแสดงร้อยละของคนที่ใช้อินเทอร์เน็ตในปี 2568 อายุ 6–14 ปี 97.2% อายุ 15–24 ปี 99.2% อายุ 25–39 ปี 98.9% อายุ 40–59 ปี 96.4% และอายุ 60 ปีขึ้นไป 70.1%",
            source: "ที่มา: สำนักงานสถิติแห่งชาติ และกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม via Statista, 2026 · การสำรวจการมีการใช้เทคโนโลยีสารสนเทศและการสื่อสารในครัวเรือน 2568, หน้า 22",
            guess: "60 ปีขึ้นไป",
            prompt: "ลองทายก่อน: คนอายุ 60 ปีขึ้นไปใช้อินเทอร์เน็ตกี่เปอร์เซ็นต์?",
            answerNote: "ต่ำกว่าวัยรุ่นราว 29 จุด",
            data: [
              { label: "6–14 ปี", value: 97.2 },
              { label: "15–24 ปี", value: 99.2 },
              { label: "25–39 ปี", value: 98.9 },
              { label: "40–59 ปี", value: 96.4 },
              { label: "60 ปีขึ้นไป", value: 70.1 },
            ],
          },
        },
        { kind: "h2", text: "ติดที่อ่านไม่ออก มากกว่าไม่มีเครื่อง" },
        {
          kind: "p",
          text: "เมื่อถามผู้สูงวัยว่าใช้อุปกรณ์ดิจิทัลแล้วติดขัดตรงไหน คำตอบอันดับหนึ่งคือไม่เข้าใจหน้าจอที่เป็นภาษาอังกฤษ 69% รองลงมาคือไม่รู้วิธีใช้ 55% และไม่มั่นใจเรื่องความปลอดภัยออนไลน์ 47% อีก 29% บอกว่าเวลาสงสัยไม่มีใครให้ถาม มีเพียง 21% ที่บอกว่าไม่มีปัญหาเลย [4]",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "อุปสรรคอันดับหนึ่งของผู้สูงวัย คือหน้าจอภาษาอังกฤษ",
            subtitle: "ร้อยละของผู้สูงวัยที่ระบุปัญหาแต่ละข้อเมื่อใช้อุปกรณ์ดิจิทัล · พ.ศ. 2565 · ตอบได้หลายข้อ",
            alt: "กราฟแท่งแสดงปัญหาของผู้สูงวัยเมื่อใช้อุปกรณ์ดิจิทัลในปี 2565 ไม่เข้าใจหน้าจอภาษาอังกฤษ 69% ไม่รู้วิธีใช้ 55% ไม่มั่นใจความปลอดภัยออนไลน์ 47% ไม่รู้ประโยชน์ 35% ไม่รู้มารยาทออนไลน์ 33% ค่าใช้จ่ายสูง 31% ไม่มีใครให้ถาม 29% ใช้เวลาออนไลน์มากเกินไป 9% และไม่มีปัญหา 21%",
            source: "ที่มา: Krungsri Research, National Statistical Office (Thailand) via Statista, 2024 · Aged Society: Embracing Challenges and Unlocking Opportunities, p. 18",
            data: [
              { label: "อ่านหน้าจอภาษาอังกฤษไม่เข้าใจ", value: 69, highlight: true },
              { label: "ไม่รู้วิธีใช้", value: 55 },
              { label: "กังวลความปลอดภัยออนไลน์", value: 47 },
              { label: "ไม่รู้ว่าใช้แล้วได้อะไร", value: 35 },
              { label: "ไม่รู้มารยาทออนไลน์", value: 33 },
              { label: "ค่าใช้จ่ายสูง", value: 31 },
              { label: "ไม่มีใครให้ถาม", value: 29 },
              { label: "ใช้เวลาออนไลน์มากไป", value: 9 },
              { label: "ไม่มีปัญหา", value: 21 },
            ],
          },
        },
        {
          kind: "p",
          text: "ในมุมของเรา ตัวเลขชุดนี้บอกว่าโจทย์ส่วนใหญ่อยู่ที่ฝั่งผู้ส่งสาร ภาษา ปุ่ม และขั้นตอนเป็นสิ่งที่หน่วยงานออกแบบได้เองทั้งหมด ข้อนี้สอดคล้องกับงานวิจัยที่พบว่าคนวัยเกษียณเห็นแคมเปญลดเค็มบนเฟซบุ๊กมากที่สุด ช่องทางจึงไม่ใช่ปัญหา สิ่งที่ต้องคิดต่อคือข้อความที่อยู่บนช่องทางนั้นอ่านง่ายพอหรือยัง",
          links: [{ match: "คนวัยเกษียณเห็นแคมเปญลดเค็มบนเฟซบุ๊กมากที่สุด", href: "/research/retirees-sodium-campaign" }],
        },
        { kind: "h2", text: "สามสิ่งที่หน่วยงานสุขภาพทำได้ทันที" },
        {
          kind: "tips",
          items: [
            {
              title: "ภาษาไทยก่อนทุกปุ่ม",
              text: "ปุ่ม ข้อความแจ้งเตือน และขั้นตอนยืนยันตัวตนเขียนเป็นภาษาไทยที่คนทั่วไปพูดจริง ก่อนเปิดใช้ให้ผู้สูงวัยตัวจริงสามถึงห้าคนลองกดดู แล้วจดว่าติดตรงไหน",
            },
            {
              title: "ให้มีคนให้ถามเสมอ",
              text: "ผู้สูงวัยเกือบหนึ่งในสามบอกว่าสงสัยแล้วไม่มีใครให้ถาม ทุกหน้าจอสำคัญควรมีทางไปหาคนจริง เช่น เบอร์โทรที่มีคนรับ หรือ อสม. ในพื้นที่ที่ช่วยกดให้ได้",
            },
            {
              title: "บอกให้ชัดว่าปลอดภัยอย่างไร",
              text: "ความกังวลเรื่องมิจฉาชีพทำให้หลายคนไม่กล้ากด บอกตรงๆ ว่าหน่วยงานจะไม่ขอรหัสผ่านหรือเลขบัญชีผ่านแชต และใช้ช่องทางทางการช่องทางเดียวกันทุกครั้ง",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "ตัวเลข 57.8% (ปี 2566) และ 70.1% (ปี 2568) มาจากการรวบรวมคนละชุดและคนละปี จึงไม่ควรนำมาต่อเป็นเส้นแนวโน้มเดียวกัน ข้อมูลปัญหาการใช้อุปกรณ์เป็นของปี 2565 และตอบได้หลายข้อ ส่วนสัดส่วนผู้สูงวัยหลังปี 2566 เป็นค่าคาดการณ์ ไม่ใช่ค่าที่วัดได้จริง",
        },
        { kind: "h2", text: "ผู้สูงวัยมาถึงแล้ว เหลือให้ข้อความไปให้ถึง" },
        {
          kind: "p",
          text: "ผู้สูงวัยไทยข้ามเส้นมาอยู่บนโลกออนไลน์แล้วจำนวนมาก และกำลังจะเป็นเกือบหนึ่งในสามของประเทศ บริการสุขภาพที่ออกแบบโดยนึกถึงพวกเขาตั้งแต่ปุ่มแรก จะไม่ต้องรอให้หลานกลับบ้านก่อนจึงจะใช้ได้",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังออกแบบบริการหรือการสื่อสารสุขภาพสำหรับผู้สูงวัย ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "Krungsri Research, National Statistical Office (Thailand) & NESDC via Statista. (2024, June 21). Share of elderly people who use the internet in Thailand from 2015 to 2023 (Aged Society: Embracing Challenges and Unlocking Opportunities, p. 17). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1472650/thailand-share-of-elderly-people-who-use-the-internet/",
        },
        {
          text: "National Statistical Office (Thailand) & Ministry of Digital Economy and Society via Statista. (2026, October 23). Share of internet users in Thailand by age group, 2025 (Household survey on the use of information and communication technology 2025, p. 22). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1294833/thailand-share-of-internet-users-by-age-group/",
        },
        {
          text: "NESDC via Statista. (2024, July 29). Share of total population older than 60 years old in Thailand between 2022 and 2023, with a forecast to 2040. เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/713667/thailand-forecast-aging-population/",
        },
        {
          text: "Krungsri Research & National Statistical Office (Thailand) via Statista. (2024, June 21). Issues that the elderly encounter when using digital devices in Thailand in 2022 (Aged Society: Embracing Challenges and Unlocking Opportunities, p. 18). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1472625/thailand-digital-device-issues-of-elderly-people/",
        },
      ],
    },
    en: {
      title: "Online, but still locked out: health communication for older Thais as services move to the phone",
      dek: "The share of older Thais using the internet rose from about 4% to nearly 58% in eight years. Yet 69% say English on the screen is what stops them. Lessons for agencies moving health services online.",
      coverAlt:
        "Paper-craft illustration on cream paper: a green smartphone with a pair of yellow reading glasses resting across its screen",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Auntie Chamnian (a fictional character) is 67. Her daughter installed a hospital booking app on her phone last year. She reads the news and chats with her grandchildren on LINE with ease, but every time she has to confirm an appointment she waits for her grandson to come home from school. The button says Confirm, and she is never sure whether pressing it will cost her money.",
        },
        {
          kind: "p",
          text: "Her problem is not a missing phone, a missing connection or a lack of interest in her own health. She is already on the same channels as her children. The messages agencies send there are still written for someone else.",
        },
        { kind: "h2", text: "Older Thais came online faster than many think" },
        {
          kind: "p",
          text: "National Statistical Office data compiled by Krungsri Research show that the share of older Thais using the internet rose from 3.9% in 2015 to 57.8% in 2023 [1]. The fastest growth came between 2019 and 2021, when the figure jumped from 18.6% to 48.8% in just two years.",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "Older Thais online: almost 15 times as many in eight years",
            subtitle: "Share of older people in Thailand who use the internet · 2015–2023",
            alt: "Line chart of the share of older Thais using the internet: 2015 3.9%, 2016 6%, 2017 8.6%, 2018 10.3%, 2019 18.6%, 2020 33.3%, 2021 48.8%, 2022 52.4%, 2023 57.8%",
            source: "Source: Krungsri Research, National Statistical Office (Thailand), NESDC via Statista, 2024 · Aged Society: Embracing Challenges and Unlocking Opportunities, p. 17",
            data: [
              { label: "2015", value: 3.9 },
              { label: "2016", value: 6 },
              { label: "2017", value: 8.6 },
              { label: "2018", value: 10.3 },
              { label: "2019", value: 18.6 },
              { label: "2020", value: 33.3 },
              { label: "2021", value: 48.8, highlight: true },
              { label: "2022", value: 52.4 },
              { label: "2023", value: 57.8, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "The 2025 household ICT survey gives a more recent picture: 70.1% of people aged 60 and over use the internet, compared with 99.2% of those aged 15 to 24 [2]. That gap of about 29 points is millions of people, and the group keeps growing. People aged 60 and over were 20.17% of the population in 2023 and are projected to reach 31.37% by 2040 [3], almost one in three Thais.",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Almost every age group is online, except people aged 60 and over",
            subtitle: "Share of each age group in Thailand that uses the internet · 2025",
            alt: "Bar chart of internet use in Thailand in 2025: aged 6–14 97.2%, 15–24 99.2%, 25–39 98.9%, 40–59 96.4%, 60 and over 70.1%",
            source: "Source: National Statistical Office (Thailand) and Ministry of Digital Economy and Society via Statista, 2026 · Household survey on the use of ICT 2025, p. 22",
            guess: "60 and over",
            prompt: "Guess first: what share of people aged 60 and over use the internet?",
            answerNote: "About 29 points below young people.",
            data: [
              { label: "6–14", value: 97.2 },
              { label: "15–24", value: 99.2 },
              { label: "25–39", value: 98.9 },
              { label: "40–59", value: 96.4 },
              { label: "60 and over", value: 70.1 },
            ],
          },
        },
        { kind: "h2", text: "The barrier is reading the screen, not owning one" },
        {
          kind: "p",
          text: "Asked what gets in the way when they use digital devices, older Thais put English on the screen first, at 69%. Next came not knowing how to use the device (55%) and not feeling safe online (47%). Another 29% said there was no one to ask when they were unsure. Only 21% reported no problems at all [4].",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "The top barrier for older Thais is a screen in English",
            subtitle: "Share of older people citing each problem when using digital devices · 2022 · multiple answers allowed",
            alt: "Bar chart of problems older Thais face with digital devices in 2022: English display 69%, do not know how to use it 55%, not confident in online security 47%, do not know the benefits 35%, do not know online etiquette 33%, high costs 31%, no one to ask 29%, spending too much time online 9%, no problems 21%",
            source: "Source: Krungsri Research, National Statistical Office (Thailand) via Statista, 2024 · Aged Society: Embracing Challenges and Unlocking Opportunities, p. 18",
            data: [
              { label: "Do not understand English on screen", value: 69, highlight: true },
              { label: "Do not know how to use it", value: 55 },
              { label: "Not confident about online security", value: 47 },
              { label: "Do not know the benefits", value: 35 },
              { label: "Do not know online etiquette", value: 33 },
              { label: "High device and service costs", value: 31 },
              { label: "No one to ask when unsure", value: 29 },
              { label: "Spending too much time online", value: 9 },
              { label: "No problems", value: 21 },
            ],
          },
        },
        {
          kind: "p",
          text: "As we read it, most of the work sits with the sender. Language, buttons and steps are all things an agency designs itself. This matches research finding that retirees saw salt-reduction campaigns on Facebook more than anywhere else. The channel is not the problem. The question is whether the message on that channel is easy enough to read.",
          links: [{ match: "retirees saw salt-reduction campaigns on Facebook more than anywhere else", href: "/en/research/retirees-sodium-campaign" }],
        },
        { kind: "h2", text: "Three things health agencies can do now" },
        {
          kind: "tips",
          items: [
            {
              title: "Thai first, on every button",
              text: "Write buttons, notifications and verification steps in the Thai people actually speak. Before launch, ask three to five real older users to try it and note where they get stuck.",
            },
            {
              title: "Always offer someone to ask",
              text: "Almost a third of older users say there is no one to ask when they are unsure. Every important screen should lead to a real person, such as a phone line that someone answers or a local village health volunteer who can help.",
            },
            {
              title: "Say clearly how it stays safe",
              text: "Fear of scams stops many people from pressing anything. State plainly that the agency will never ask for a password or bank details in a chat, and use the same official channel every time.",
            },
          ],
        },
        { kind: "h2", text: "Reading this data with care" },
        {
          kind: "p",
          text: "The 57.8% (2023) and 70.1% (2025) figures come from different compilations and years, so they should not be joined into one trend line. The data on device problems is from 2022 and allowed multiple answers. Population shares after 2023 are projections, not measurements.",
        },
        { kind: "h2", text: "Older Thais have arrived. Now the message has to reach them" },
        {
          kind: "p",
          text: "Many older Thais have already crossed into the online world, and they will soon be almost a third of the country. Health services designed with them in mind from the first button will not need a grandchild at home before they can be used.",
        },
        {
          kind: "note",
          text: "If your organisation is designing health services or communication for older people, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "Krungsri Research, National Statistical Office (Thailand) & NESDC via Statista. (2024, June 21). Share of elderly people who use the internet in Thailand from 2015 to 2023 (Aged Society: Embracing Challenges and Unlocking Opportunities, p. 17). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1472650/thailand-share-of-elderly-people-who-use-the-internet/",
        },
        {
          text: "National Statistical Office (Thailand) & Ministry of Digital Economy and Society via Statista. (2026, October 23). Share of internet users in Thailand by age group, 2025 (Household survey on the use of information and communication technology 2025, p. 22). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1294833/thailand-share-of-internet-users-by-age-group/",
        },
        {
          text: "NESDC via Statista. (2024, July 29). Share of total population older than 60 years old in Thailand between 2022 and 2023, with a forecast to 2040. Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/713667/thailand-forecast-aging-population/",
        },
        {
          text: "Krungsri Research & National Statistical Office (Thailand) via Statista. (2024, June 21). Issues that the elderly encounter when using digital devices in Thailand in 2022 (Aged Society: Embracing Challenges and Unlocking Opportunities, p. 18). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1472625/thailand-digital-device-issues-of-elderly-people/",
        },
      ],
    },
  },
  {
    slug: "beyond-likes-2026",
    date: "2026-10-27",
    author: SMITH,
    palette: [9, 17],
    cover: "/images/insights/beyond-likes-2026-hero",
    th: {
      title: "ยอดไลก์บอกว่าคนเห็น ไม่ได้บอกว่าคนเปลี่ยน",
      dek: "งบโฆษณาออนไลน์ของไทยโตขึ้นกว่า 13 เท่าในสิบสามปี แต่การดูคอนเทนต์ของแบรนด์กลับเป็นเหตุผลอันดับท้ายสุดที่คนไทยเปิดโซเชียลมีเดีย ถึงเวลาวัดผลให้ลึกกว่ายอดไลก์",
      coverAlt:
        "ภาพประกอบกระดาษ หัวใจสีส้มบนพื้นกระดาษสีครีม มีสายวัดสีน้ำเงินเข้มพันรอบกลางหัวใจ",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "คุณธนา (ตัวละครสมมติ) ผู้จัดการฝ่ายสื่อสารของหน่วยงานแห่งหนึ่ง นำรายงานประจำเดือนเข้าที่ประชุม กราฟยอดเข้าถึงพุ่งขึ้น ยอดไลก์และยอดแชร์ทำสถิติใหม่ ผู้บริหารพยักหน้า แล้วถามคำถามเดียวว่า \"แล้วคนมาลงทะเบียนเพิ่มขึ้นไหม\" คุณธนาเปิดรายงานทุกหน้าแล้วก็ไม่พบคำตอบ",
        },
        {
          kind: "p",
          text: "ไม่ใช่เพราะเธอทำงานไม่ดี แต่เพราะตัวเลขที่เก็บมาทั้งหมดตอบคำถามว่า \"มีคนเห็นกี่คน\" ไม่มีตัวไหนตอบว่า \"มีคนทำอะไรต่อกี่คน\"",
        },
        { kind: "h2", text: "เงินไหลไปออนไลน์ไม่หยุด" },
        {
          kind: "p",
          text: "ข้อมูลของ Nielsen และสมาคมมีเดียเอเยนซีแห่งประเทศไทยชี้ว่างบโฆษณาทางอินเทอร์เน็ตของไทยเพิ่มจาก 2.78 พันล้านบาทในปี 2555 เป็น 36.82 พันล้านบาทในปี 2568 [1] หรือราว 13 เท่า ช่วงหลังเริ่มโตช้าลง ปี 2568 เพิ่มจากปีก่อนไม่ถึง 3% เงินก้อนใหญ่นี้จึงไม่ได้ถามแล้วว่าจะไปออนไลน์ไหม แต่ถามว่าไปแล้วได้อะไรกลับมา",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "งบโฆษณาออนไลน์ของไทยโตขึ้นราว 13 เท่าในสิบสามปี",
            subtitle: "งบโฆษณาทางอินเทอร์เน็ตของอุตสาหกรรมสื่อ (พันล้านบาท) · พ.ศ. 2555–2568",
            alt: "กราฟเส้นแสดงงบโฆษณาทางอินเทอร์เน็ตของไทย หน่วยพันล้านบาท ปี 2555 2.78 2556 4.25 2557 6.12 2558 8.08 2559 9.48 2560 12.4 2561 16.93 2562 19.56 2563 21.06 2564 24.77 2565 29.16 2566 32.8 2567 35.77 และ 2568 36.82",
            source: "ที่มา: Nielsen, Media Agency Association of Thailand via Statista, 2026 · 2026 media industry update, p. 5",
            unit: " พันล้านบาท",
            data: [
              { label: "2555", value: 2.78 },
              { label: "2556", value: 4.25 },
              { label: "2557", value: 6.12 },
              { label: "2558", value: 8.08 },
              { label: "2559", value: 9.48 },
              { label: "2560", value: 12.4 },
              { label: "2561", value: 16.93 },
              { label: "2562", value: 19.56 },
              { label: "2563", value: 21.06 },
              { label: "2564", value: 24.77 },
              { label: "2565", value: 29.16 },
              { label: "2566", value: 32.8 },
              { label: "2567", value: 35.77 },
              { label: "2568", value: 36.82, highlight: true },
            ],
          },
        },
        { kind: "h2", text: "แต่คนไม่ได้เปิดโซเชียลมาเพื่อดูแบรนด์" },
        {
          kind: "p",
          text: "ผลสำรวจของ GWI ไตรมาสสองปี 2568 ถามผู้ใช้อินเทอร์เน็ตไทยอายุ 16 ถึง 64 ปีว่าใช้โซเชียลมีเดียเพื่ออะไร เหตุผลอันดับหนึ่งคือติดต่อกับเพื่อนและครอบครัว 58% ตามด้วยอ่านข่าว 41.5% และฆ่าเวลา 39.7% ส่วนการดูคอนเทนต์จากแบรนด์ที่ชอบอยู่อันดับท้ายสุดจาก 15 เหตุผล ที่ 26.6% [2]",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คนไทยเปิดโซเชียลเพื่อคน ไม่ใช่เพื่อแบรนด์",
            subtitle: "ร้อยละของผู้ตอบที่ระบุเหตุผลหลักในการใช้โซเชียลมีเดีย · ไตรมาส 2 ปี 2568 · แสดง 8 จาก 15 เหตุผล ตอบได้หลายข้อ",
            alt: "กราฟแท่งแสดงเหตุผลหลักในการใช้โซเชียลมีเดียของคนไทยในไตรมาส 2 ปี 2568 ติดต่อเพื่อนและครอบครัว 58% อ่านข่าว 41.5% ฆ่าเวลา 39.7% หาแรงบันดาลใจว่าจะทำหรือซื้ออะไร 35.3% หาสินค้า 34.6% ติดตามคนดังหรืออินฟลูเอนเซอร์ 31.6% ดูไลฟ์สด 27.6% และดูคอนเทนต์จากแบรนด์ที่ชอบ 26.6% ซึ่งเป็นอันดับท้ายสุดจาก 15 เหตุผล",
            source: "ที่มา: GWI, DataReportal via Statista, 2025 · Digital 2026: Thailand, p. 85 · ผู้ใช้อินเทอร์เน็ตอายุ 16–64 ปี",
            guess: "ดูคอนเทนต์จากแบรนด์ที่ชอบ",
            prompt: "ลองทายก่อน: คนไทยกี่เปอร์เซ็นต์เปิดโซเชียลเพื่อดูคอนเทนต์จากแบรนด์ที่ชอบ?",
            answerNote: "อันดับท้ายสุดจาก 15 เหตุผล",
            data: [
              { label: "ติดต่อเพื่อนและครอบครัว", value: 58 },
              { label: "อ่านข่าว", value: 41.5 },
              { label: "ฆ่าเวลา", value: 39.7 },
              { label: "หาไอเดียว่าจะทำหรือซื้ออะไร", value: 35.3 },
              { label: "หาสินค้า", value: 34.6 },
              { label: "ติดตามคนดังหรืออินฟลูเอนเซอร์", value: 31.6 },
              { label: "ดูไลฟ์สด", value: 27.6 },
              { label: "ดูคอนเทนต์จากแบรนด์ที่ชอบ", value: 26.6 },
            ],
          },
        },
        {
          kind: "p",
          text: "คนไทยใช้อินเทอร์เน็ตเฉลี่ยวันละ 7 ชั่วโมง 54 นาที และอยู่บนโซเชียลมีเดียวันละ 2 ชั่วโมง 32 นาที [3] ความสนใจมีอยู่จริง แต่ถูกแบ่งไปให้เพื่อน ครอบครัว ข่าว และความบันเทิงก่อน ไลก์หนึ่งครั้งจากคนที่กำลังเลื่อนผ่านจึงบอกได้แค่ว่าเราได้ส่วนแบ่งเล็กๆ ของความสนใจนั้นมาชั่วครู่",
        },
        { kind: "h2", text: "ยอดไลก์วัดอะไร และไม่ได้วัดอะไร" },
        {
          kind: "p",
          text: "ยอดเข้าถึงและยอดไลก์มีประโยชน์ มันบอกว่าข้อความไปถึงคนแล้วและคนมีปฏิกิริยา แต่เป้าหมายของงานสื่อสารส่วนใหญ่อยู่ไกลกว่านั้น คือให้คนเข้าใจ เชื่อ และลงมือทำ งานวิจัยเรื่องการประเมินงานประชาสัมพันธ์ของ รศ.ดร. Pavel Slutskiy และคณะ (ตีพิมพ์ปี 2560 ก่อนตั้งศูนย์ฯ) ชี้ด้วยว่า ผลงานที่ตัวเลขเท่ากันไม่ได้แปลว่าทำงานได้ดีเท่ากัน ต้องดูด้วยว่าเรื่องนั้นยากหรือง่ายแค่ไหนตั้งแต่ต้น",
          links: [{ match: "ผลงานที่ตัวเลขเท่ากันไม่ได้แปลว่าทำงานได้ดีเท่ากัน", href: "/research/pr-evaluation-coefficient" }],
        },
        { kind: "h2", text: "สามขั้นของการวัดผลที่ลึกกว่ายอดไลก์" },
        {
          kind: "tips",
          items: [
            {
              title: "เริ่มจากพฤติกรรมที่อยากเห็น",
              text: "ก่อนเลือกตัวชี้วัด เขียนให้ได้ในประโยคเดียวว่าอยากให้ใครทำอะไรต่อ เช่น ลงทะเบียน มาตรวจ หรือโทรสอบถาม แล้วค่อยถอยกลับมาหาว่าต้องวัดอะไร",
            },
            {
              title: "วัดให้ครบสามชั้น",
              text: "ชั้นแรกคือเห็น (ยอดเข้าถึง) ชั้นที่สองคือเข้าใจและเชื่อ (ถามคำถามสั้นๆ กับกลุ่มเป้าหมาย) ชั้นที่สามคือทำ (จำนวนลงทะเบียน สายโทรเข้า หรือคนที่มาใช้บริการจริง)",
            },
            {
              title: "วางแผนวัดตั้งแต่วันแรก",
              text: "ข้อมูลชั้นที่สามส่วนใหญ่มีอยู่แล้วในระบบของหน่วยงาน แต่ต้องตกลงตั้งแต่ก่อนเริ่มแคมเปญว่าจะดึงตัวเลขไหน จากระบบไหน และเทียบกับช่วงเวลาใด ไม่ใช่มาหาหลังแคมเปญจบ",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งบโฆษณาเป็นค่าประมาณการของอุตสาหกรรมสื่อชุดของ Nielsen และสมาคมมีเดียเอเยนซีแห่งประเทศไทย ไม่ใช่ยอดใช้จ่ายจริงของทุกองค์กร ชุดของสมาคมโฆษณาดิจิทัล (DAAT) วัดด้วยวิธีต่างกันจึงได้ตัวเลขไม่เท่ากัน ข้อมูลเหตุผลการใช้โซเชียลมีเดียมาจากการสำรวจออนไลน์ของผู้ใช้อินเทอร์เน็ตอายุ 16 ถึง 64 ปี ตอบได้หลายข้อ จึงไม่ครอบคลุมผู้สูงวัยและคนที่ไม่ได้ใช้อินเทอร์เน็ต และไม่ได้บอกว่าคอนเทนต์ของแบรนด์ไม่ได้ผล บอกเพียงว่ามันไม่ใช่เหตุผลที่คนเปิดแอปขึ้นมา",
        },
        { kind: "h2", text: "นับสิ่งที่สำคัญ ไม่ใช่นับสิ่งที่นับง่าย" },
        {
          kind: "p",
          text: "ยอดไลก์นับง่ายเพราะแพลตฟอร์มนับให้ แต่สิ่งที่ผู้บริหารถามในห้องประชุมคือสิ่งที่องค์กรต้องนับเอง งานสื่อสารที่วางแผนวัดผลตั้งแต่วันแรก จะตอบคำถามนั้นได้โดยไม่ต้องเปิดรายงานหาทุกหน้า",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังวางกรอบวัดผลงานสื่อสารที่ลึกกว่ายอดไลก์ ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "Nielsen & Media Agency Association of Thailand via Statista. (2026, April 7). Internet advertising spending of media industry in Thailand from 2012 to 2025 (2026 media industry update, p. 5). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/993664/thailand-media-industry-digital-advertising-expenditure/",
        },
        {
          text: "GWI & DataReportal via Statista. (2025, December 8). Main reasons for using social media in Thailand in 2025 (Digital 2026: Thailand, p. 85). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1316931/thailand-main-reasons-to-use-social-media/",
        },
        {
          text: "We Are Social, DataReportal, GWI & Meltwater via Statista. (2025, July 1). Average time spent using online media in Thailand as of 3rd quarter 2024, by activity (Digital 2025: Thailand, p. 24). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/804035/daily-time-spent-using-online-media-by-activity-thailand/",
        },
      ],
    },
    en: {
      title: "Likes show that people saw it, not that they changed",
      dek: "Thailand's online ad spend grew more than 13-fold in thirteen years, yet seeing content from brands is the last of all the reasons Thais open social media. Time to measure deeper than likes.",
      coverAlt:
        "Paper-craft illustration on cream paper: an orange heart with a dark navy tape measure wrapped around its middle",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Tana (a fictional character) manages communication for a public agency. She brings the monthly report to the meeting: reach is climbing, likes and shares have hit new records. The director nods, then asks a single question: \"So are more people signing up?\" Tana leafs through every page and cannot find the answer.",
        },
        {
          kind: "p",
          text: "That is not because she did poor work. Every number she collected answers \"how many people saw it\". None of them answers \"how many people did something next\".",
        },
        { kind: "h2", text: "Money keeps flowing online" },
        {
          kind: "p",
          text: "Nielsen and Media Agency Association of Thailand data show that internet advertising spend in Thailand rose from 2.78 billion baht in 2012 to 36.82 billion baht in 2025 [1], about 13 times as much. Growth has slowed lately: 2025 was up less than 3% on the year before. For all that money, the question is no longer whether to go online, but what comes back once you are there.",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "Thailand's online ad spend grew about 13-fold in thirteen years",
            subtitle: "Internet advertising spend of the media industry (billion baht) · 2012–2025",
            alt: "Line chart of internet advertising spend in Thailand in billion baht: 2012 2.78, 2013 4.25, 2014 6.12, 2015 8.08, 2016 9.48, 2017 12.4, 2018 16.93, 2019 19.56, 2020 21.06, 2021 24.77, 2022 29.16, 2023 32.8, 2024 35.77, 2025 36.82",
            source: "Source: Nielsen, Media Agency Association of Thailand via Statista, 2026 · 2026 media industry update, p. 5",
            unit: " bn baht",
            data: [
              { label: "2012", value: 2.78 },
              { label: "2013", value: 4.25 },
              { label: "2014", value: 6.12 },
              { label: "2015", value: 8.08 },
              { label: "2016", value: 9.48 },
              { label: "2017", value: 12.4 },
              { label: "2018", value: 16.93 },
              { label: "2019", value: 19.56 },
              { label: "2020", value: 21.06 },
              { label: "2021", value: 24.77 },
              { label: "2022", value: 29.16 },
              { label: "2023", value: 32.8 },
              { label: "2024", value: 35.77 },
              { label: "2025", value: 36.82, highlight: true },
            ],
          },
        },
        { kind: "h2", text: "But people do not open social media to see brands" },
        {
          kind: "p",
          text: "A GWI survey in the second quarter of 2025 asked Thai internet users aged 16 to 64 why they use social media. Keeping in touch with friends and family came first at 58%, followed by reading the news (41.5%) and filling spare time (39.7%). Seeing content from favourite brands came last of 15 reasons, at 26.6% [2].",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Thais open social media for people, not for brands",
            subtitle: "Share of respondents citing each main reason for using social media · Q2 2025 · 8 of 15 reasons shown, multiple answers allowed",
            alt: "Bar chart of main reasons Thais use social media in Q2 2025: keeping in touch with friends and family 58%, reading news 41.5%, filling spare time 39.7%, finding inspiration for things to do and buy 35.3%, finding products 34.6%, following celebrities or influencers 31.6%, watching live streams 27.6%, seeing content from favourite brands 26.6%, the last of 15 reasons",
            source: "Source: GWI, DataReportal via Statista, 2025 · Digital 2026: Thailand, p. 85 · internet users aged 16–64",
            guess: "Content from favourite brands",
            prompt: "Guess first: what share of Thais open social media to see content from brands they like?",
            answerNote: "Last of 15 reasons.",
            data: [
              { label: "Keeping in touch with friends and family", value: 58 },
              { label: "Reading news", value: 41.5 },
              { label: "Filling spare time", value: 39.7 },
              { label: "Ideas for things to do or buy", value: 35.3 },
              { label: "Finding products", value: 34.6 },
              { label: "Following celebrities or influencers", value: 31.6 },
              { label: "Watching live streams", value: 27.6 },
              { label: "Content from favourite brands", value: 26.6 },
            ],
          },
        },
        {
          kind: "p",
          text: "Thais spend an average of 7 hours 54 minutes online a day, 2 hours 32 minutes of it on social media [3]. The attention is real, but friends, family, news and entertainment get it first. A like from someone scrolling past tells you only that you held a small slice of that attention for a moment.",
        },
        { kind: "h2", text: "What likes measure, and what they do not" },
        {
          kind: "p",
          text: "Reach and likes are useful. They show that a message reached people and that people reacted. But the goal of most communication lies further on: that people understand, believe and act. Research on PR evaluation by Pavel Slutskiy and colleagues (published in 2017, before the centre was founded) adds that the same results do not mean the same performance; you also have to ask how easy the story was to begin with.",
          links: [{ match: "the same results do not mean the same performance", href: "/en/research/pr-evaluation-coefficient" }],
        },
        { kind: "h2", text: "Three steps to measure deeper than likes" },
        {
          kind: "tips",
          items: [
            {
              title: "Start from the behaviour you want",
              text: "Before choosing metrics, write in one sentence who you want to do what next, such as register, come for a check-up or call for advice. Then work back to what you need to measure.",
            },
            {
              title: "Measure all three layers",
              text: "Layer one is seeing (reach). Layer two is understanding and believing (a few short questions to your audience). Layer three is acting (registrations, incoming calls, or people who actually use the service).",
            },
            {
              title: "Plan the measurement on day one",
              text: "Most layer-three data already sits in the organisation's own systems. Agree before the campaign starts which numbers you will pull, from which system, and against which period, rather than looking for them after it ends.",
            },
          ],
        },
        { kind: "h2", text: "Reading this data with care" },
        {
          kind: "p",
          text: "Ad spend figures are media-industry estimates from Nielsen and the Media Agency Association of Thailand, not every organisation's actual spending. The Digital Advertising Association of Thailand (DAAT) measures differently and reports different figures. The data on reasons for using social media comes from an online survey of internet users aged 16 to 64, with multiple answers allowed, so it does not cover older people or those offline. Nor does it say that brand content does not work; it says only that it is not why people open the app.",
        },
        { kind: "h2", text: "Count what matters, not what is easy to count" },
        {
          kind: "p",
          text: "Likes are easy to count because the platform counts them for you. What the director asks in the meeting is something the organisation has to count for itself. Communication that plans its measurement from day one can answer that question without searching through every page of the report.",
        },
        {
          kind: "note",
          text: "If your organisation is building a way to measure communication beyond likes, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "Nielsen & Media Agency Association of Thailand via Statista. (2026, April 7). Internet advertising spending of media industry in Thailand from 2012 to 2025 (2026 media industry update, p. 5). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/993664/thailand-media-industry-digital-advertising-expenditure/",
        },
        {
          text: "GWI & DataReportal via Statista. (2025, December 8). Main reasons for using social media in Thailand in 2025 (Digital 2026: Thailand, p. 85). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1316931/thailand-main-reasons-to-use-social-media/",
        },
        {
          text: "We Are Social, DataReportal, GWI & Meltwater via Statista. (2025, July 1). Average time spent using online media in Thailand as of 3rd quarter 2024, by activity (Digital 2025: Thailand, p. 24). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/804035/daily-time-spent-using-online-media-by-activity-thailand/",
        },
      ],
    },
  },
  {
    slug: "watch-read-listen-news",
    date: "2026-10-27",
    author: SMITH,
    palette: [4, 6],
    cover: "/images/insights/watch-read-listen-news-hero",
    th: {
      title: "คนไทยดูข่าวมากกว่าอ่านข่าว แต่ห่างกันแค่นิดเดียว",
      dek: "ข่าวคือสิ่งที่คนไทยดูบนแพลตฟอร์มออนไลน์ฟรีมากที่สุด และโทรทัศน์ยังเป็นแหล่งข่าวอันดับหนึ่ง แต่คนที่ชอบอ่านข่าวก็มีเกือบเท่าคนที่ชอบดู หน่วยงานควรเล่าเรื่องในรูปแบบไหน",
      coverAlt:
        "ภาพประกอบกระดาษ โทรทัศน์ทรงเก่าสีแดงบนพื้นกระดาษสีครีม หน้าจอเป็นแผ่นกระดาษสีฟ้าที่มุมบนพับขึ้นเหมือนหน้าหนังสือ",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "เช้าวันหนึ่งในบ้านหลังเดียวกัน (ครอบครัวสมมติ) ลุงเปิดโทรทัศน์ฟังข่าวเช้าระหว่างกินกาแฟ ลูกสาวดูคลิปข่าวสั้นบนมือถือระหว่างรอรถ ส่วนหลานอ่านสรุปข่าวที่เพื่อนส่งมาในกลุ่มไลน์ ทั้งสามคนรู้เรื่องเดียวกัน แต่ไม่มีใครรับข่าวจากที่เดียวกันเลย",
        },
        {
          kind: "p",
          text: "สำหรับหน่วยงานที่ต้องสื่อสารกับประชาชน ภาพนี้ตั้งคำถามที่ตอบยาก ถ้างบมีจำกัด ควรทำคลิป เขียนบทความ หรือทำเสียง",
        },
        { kind: "h2", text: "โทรทัศน์ยังไม่หายไป และข่าวคือสิ่งที่คนดูออนไลน์มากที่สุด" },
        {
          kind: "p",
          text: "การสำรวจของสำนักงานสถิติแห่งชาติกับ กสทช. เมื่อเมษายน 2567 ถามคนไทยอายุ 15 ปีขึ้นไป 9,000 คนว่ารับข่าวจากไหน โทรทัศน์ยังนำที่ 74.7% ตามด้วยเฟซบุ๊ก 57.5% LINE 30.4% เว็บไซต์ 25.8% และ TikTok 20.3% [1]",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "โทรทัศน์ยังเป็นแหล่งข่าวอันดับหนึ่งของคนไทย",
            subtitle: "ร้อยละของผู้ตอบที่รับข่าวจากแต่ละช่องทาง · เมษายน 2567 · อายุ 15 ปีขึ้นไป ตอบได้หลายข้อ",
            alt: "กราฟแท่งแสดงแหล่งข่าวของคนไทยในเดือนเมษายน 2567 โทรทัศน์ 74.7% เฟซบุ๊ก 57.5% LINE 30.4% เว็บไซต์ 25.8% และ TikTok 20.3%",
            source: "ที่มา: สำนักงานสถิติแห่งชาติ และ กสทช. via Statista, 2024 · การสำรวจพฤติกรรมการรับชมรายการ 2567 · สำรวจแบบ omnibus n = 9,000",
            data: [
              { label: "โทรทัศน์", value: 74.7, highlight: true },
              { label: "เฟซบุ๊ก", value: 57.5 },
              { label: "LINE", value: 30.4 },
              { label: "เว็บไซต์", value: 25.8 },
              { label: "TikTok", value: 20.3 },
            ],
          },
        },
        {
          kind: "p",
          text: "อีกการสำรวจหนึ่งเมื่อตุลาคม 2567 ซึ่งถามคนไทยทั่วประเทศ 31,500 คน พบว่าบนแพลตฟอร์มออนไลน์ที่ดูได้ฟรี ข่าวคือสิ่งที่คนดูมากที่สุดที่ 64.2% นำหน้าละครและซีรีส์ 62.4% และรายการวาไรตี้ 57.3% [2]",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "บนออนไลน์ ข่าวแซงละครขึ้นเป็นอันดับหนึ่ง",
            subtitle: "ร้อยละของผู้ตอบที่ดูคอนเทนต์แต่ละประเภทบนแพลตฟอร์มออนไลน์ที่ดูได้ฟรี · ตุลาคม 2567 · ตอบได้หลายข้อ",
            alt: "กราฟแท่งแสดงคอนเทนต์ที่คนไทยดูบนแพลตฟอร์มออนไลน์ฟรีในเดือนตุลาคม 2567 ข่าว 64.2% ละครและซีรีส์ 62.4% รายการวาไรตี้ 57.3% ภาพยนตร์ 28.8% และกีฬา 21.4%",
            source: "ที่มา: กสทช. และสำนักงานสถิติแห่งชาติ via Statista, 2025 · การสำรวจการเข้าถึงสื่อวิทยุและโทรทัศน์ 2567, หน้า 44 · อายุ 18–76 ปี n = 31,500",
            guess: "ข่าว",
            prompt: "ลองทายก่อน: คนไทยกี่เปอร์เซ็นต์ดูข่าวบนแพลตฟอร์มออนไลน์ที่ดูได้ฟรี?",
            answerNote: "มากกว่าละครและซีรีส์",
            data: [
              { label: "ข่าว", value: 64.2 },
              { label: "ละครและซีรีส์", value: 62.4 },
              { label: "รายการวาไรตี้", value: 57.3 },
              { label: "ภาพยนตร์", value: 28.8 },
              { label: "กีฬา", value: 21.4 },
            ],
          },
        },
        { kind: "h2", text: "ดู อ่าน หรือฟัง" },
        {
          kind: "p",
          text: "เมื่อถามเจาะว่าชอบรับข่าวออนไลน์แบบไหน รายงาน Digital News Report ปี 2566 ของ Reuters Institute พบว่าคนไทยชอบดู 40% ชอบอ่าน 38% และชอบฟัง 22% [3] ในปีเดียวกัน 64% บอกว่าช่องทางหลักที่พาไปเจอข่าวออนไลน์คือโซเชียลมีเดีย ขณะที่มีเพียง 7% ที่เข้าเว็บไซต์ข่าวโดยตรง [4]",
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "คนไทยชอบดูข่าวมากที่สุด แต่ชนะการอ่านแค่ 2 จุด",
            subtitle: "ร้อยละของผู้ตอบตามวิธีรับข่าวออนไลน์ที่ชอบ · มกราคม–กุมภาพันธ์ 2566 · ไม่รวมคนที่ตอบว่าไม่ทราบ",
            alt: "แถบแบ่งสัดส่วนวิธีรับข่าวออนไลน์ที่คนไทยชอบในปี 2566 ชอบดู 40% ชอบอ่าน 38% และชอบฟัง 22%",
            source: "ที่มา: Reuters Institute for the Study of Journalism via Statista, 2024 · Digital News Report 2023, p. 27 · สำรวจออนไลน์ n = 2,028",
            prompt: "คิดว่าคนไทยชอบรับข่าวออนไลน์แบบไหนมากที่สุด? เลือกหนึ่งข้อ",
            answerNote: "แต่ห่างจากการอ่านเพียง 2 จุด",
            data: [
              { label: "ดู", value: 40 },
              { label: "อ่าน", value: 38 },
              { label: "ฟัง", value: 22 },
            ],
          },
        },
        {
          kind: "p",
          text: "ในมุมของเรา ตัวเลขที่ใกล้กันมากระหว่างการดูกับการอ่านคือข้อมูลสำคัญที่สุดในชุดนี้ มันบอกว่าการทิ้งข้อความไปทำแต่คลิปเสี่ยงพอๆ กับการทำแต่ข้อความ และเมื่อคนส่วนใหญ่เจอข่าวผ่านโซเชียลมีเดีย สิ่งที่ถูกส่งต่อได้ง่ายที่สุดมักชนะ ข้อความสั้นถูกคัดลอกไปวางในกลุ่มไลน์ได้ คลิปสั้นถูกแชร์ต่อได้ ส่วนเอกสารยาวมักหยุดอยู่ที่หน้าเพจ",
          links: [{ match: "เอกสารยาวมักหยุดอยู่ที่หน้าเพจ", href: "/insights/line-news-trust-2026" }],
        },
        { kind: "h2", text: "สามวิธีเล่าเรื่องเดียวให้ถึงคนหลายแบบ" },
        {
          kind: "tips",
          items: [
            {
              title: "หนึ่งเรื่อง สองรูปแบบ",
              text: "ทุกประกาศสำคัญควรมีคลิปสั้นไม่เกินหนึ่งนาทีสำหรับคนที่ชอบดู และข้อความสั้นไม่เกินสามบรรทัดสำหรับคนที่ชอบอ่านและส่งต่อ ใช้ข้อมูลชุดเดียวกัน",
            },
            {
              title: "คิดเผื่อจอโทรทัศน์",
              text: "โทรทัศน์ยังเป็นแหล่งข่าวของคนสามในสี่ คลิปที่ทำไว้ควรใช้ต่อในรายการข่าวท้องถิ่นหรือช่องของหน่วยงานได้ คือมีภาพนิ่งชัด ตัวอักษรใหญ่ และเล่าจบในตัว",
            },
            {
              title: "ให้เสียงเป็นของคนที่ผู้ชมเชื่อ",
              text: "ไม่ว่าจะเป็นคลิปหรือเสียง ให้คนที่ดูแลเรื่องนั้นจริงเป็นคนพูด ความใกล้ชิดของเสียงคนจริงคือสิ่งที่ทำให้คนดูจนจบและส่งต่อ",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "ข้อมูลในบทความนี้มาจากการสำรวจคนละชุด ข้อมูลของสำนักงานสถิติแห่งชาติกับ กสทช. ปี 2567 เป็นการสำรวจทั่วประเทศที่รวมคนที่ไม่ได้ใช้อินเทอร์เน็ต ส่วนข้อมูลของ Reuters Institute ปี 2566 เป็นการสำรวจออนไลน์ซึ่งสะท้อนผู้ใช้อินเทอร์เน็ตเป็นหลัก และมีอายุมากกว่าสามปีแล้ว (ณ วันที่เขียน Statista ยังไม่มีชุดที่ใหม่กว่าสำหรับคำถามเรื่องวิธีรับข่าว) จึงควรใช้เป็นสัญญาณทิศทาง ทุกชุดตอบได้หลายข้อ ยกเว้นวิธีรับข่าวที่ชอบซึ่งให้เลือกหนึ่งแบบ",
        },
        { kind: "h2", text: "อย่าเลือก ให้เล่าให้ครบ" },
        {
          kind: "p",
          text: "คำตอบของคำถามว่าควรทำคลิป เขียน หรือทำเสียง คือทำเรื่องเดียวให้ส่งต่อได้หลายแบบ คนในบ้านเดียวกันยังรับข่าวต่างกันได้ ผู้ชมของหน่วยงานก็เช่นเดียวกัน",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังวางแผนว่าจะเล่าเรื่องสำคัญผ่านรูปแบบไหนบ้าง ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "National Statistical Office (Thailand) & NBTC via Statista. (2024, June 17). Leading news sources in Thailand as of April 2024 (National Broadcasting Services Thailand: Program Consumption Survey 2024). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1291322/thailand-leading-news-sources/",
        },
        {
          text: "NBTC & National Statistical Office (Thailand) via Statista. (2025, January 16). Leading free online content watched by Thai consumers as of October 2024, by type (Survey of access to radio and television media 2024, p. 44). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1550951/thailand-leading-free-online-content-by-type/",
        },
        {
          text: "Reuters Institute for the Study of Journalism via Statista. (2024, March 22). Preferred ways to consume online news in Thailand in 2023 (Digital News Report 2023, p. 27). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1457108/thailand-preferred-ways-to-consume-online-news/",
        },
        {
          text: "Reuters Institute for the Study of Journalism via Statista. (2024, March 22). Main way of getting news online in Thailand in 2023 (Digital News Report 2023, p. 12). เข้าถึง 27 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/1457100/thailand-main-way-of-getting-news-online/",
        },
      ],
    },
    en: {
      title: "Thais would rather watch the news than read it, but only just",
      dek: "News is what Thais watch most on free online platforms, and television is still the top news source. Yet almost as many prefer to read news as to watch it. Which format should agencies tell their stories in?",
      coverAlt:
        "Paper-craft illustration on cream paper: a red retro television whose screen is a light blue sheet of paper with its top corner curling up like a page",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "One morning in one household (a fictional family), the grandfather listens to the morning news on television over coffee. His daughter watches short news clips on her phone while waiting for the bus. His grandson reads a news summary a friend posted in a LINE group. All three learn the same story, and none of them gets it from the same place.",
        },
        {
          kind: "p",
          text: "For any agency that has to communicate with the public, this picture raises a hard question. With a limited budget, should you make a video, write an article or record audio?",
        },
        { kind: "h2", text: "Television has not gone away, and news is what people watch most online" },
        {
          kind: "p",
          text: "In April 2024 the National Statistical Office and the NBTC asked 9,000 Thais aged 15 and over where they get their news. Television still led at 74.7%, followed by Facebook (57.5%), LINE (30.4%), websites (25.8%) and TikTok (20.3%) [1].",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Television is still Thailand's top news source",
            subtitle: "Share of respondents who get news from each source · April 2024 · aged 15 and over, multiple answers allowed",
            alt: "Bar chart of news sources in Thailand in April 2024: television 74.7%, Facebook 57.5%, LINE 30.4%, websites 25.8%, TikTok 20.3%",
            source: "Source: National Statistical Office (Thailand), NBTC via Statista, 2024 · Program Consumption Survey 2024 · omnibus survey n = 9,000",
            data: [
              { label: "Television", value: 74.7, highlight: true },
              { label: "Facebook", value: 57.5 },
              { label: "LINE", value: 30.4 },
              { label: "Websites", value: 25.8 },
              { label: "TikTok", value: 20.3 },
            ],
          },
        },
        {
          kind: "p",
          text: "A separate nationwide survey of 31,500 people in October 2024 found that on free online platforms, news is what people watch most, at 64.2%, ahead of drama series (62.4%) and variety shows (57.3%) [2].",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Online, news overtakes drama as the most watched",
            subtitle: "Share of respondents who watch each type of content on free online platforms · October 2024 · multiple answers allowed",
            alt: "Bar chart of content watched on free online platforms in Thailand in October 2024: news 64.2%, drama series 62.4%, variety shows 57.3%, movies 28.8%, sport 21.4%",
            source: "Source: NBTC, National Statistical Office (Thailand) via Statista, 2025 · Survey of access to radio and television media 2024, p. 44 · aged 18–76, n = 31,500",
            guess: "News",
            prompt: "Guess first: what share of Thais watch news on free online platforms?",
            answerNote: "Ahead of drama series.",
            data: [
              { label: "News", value: 64.2 },
              { label: "Drama series", value: 62.4 },
              { label: "Variety shows", value: 57.3 },
              { label: "Movies", value: 28.8 },
              { label: "Sport", value: 21.4 },
            ],
          },
        },
        { kind: "h2", text: "Watch, read or listen" },
        {
          kind: "p",
          text: "Asked how they prefer to get news online, Thais in the Reuters Institute's 2023 Digital News Report said watch (40%), read (38%) and listen (22%) [3]. In the same year, 64% said social media was their main gateway to online news, while only 7% went to news websites directly [4].",
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "Thais prefer watching news, but only 2 points ahead of reading",
            subtitle: "Share of respondents by preferred way to get online news · January–February 2023 · excluding \"don't know\"",
            alt: "Stacked bar of how Thais prefer to get online news in 2023: watch 40%, read 38%, listen 22%",
            source: "Source: Reuters Institute for the Study of Journalism via Statista, 2024 · Digital News Report 2023, p. 27 · online survey n = 2,028",
            prompt: "Which way do you think Thais most prefer to get news online? Pick one.",
            answerNote: "Only 2 points ahead of reading.",
            data: [
              { label: "Watch", value: 40 },
              { label: "Read", value: 38 },
              { label: "Listen", value: 22 },
            ],
          },
        },
        {
          kind: "p",
          text: "As we see it, how close watching and reading are is the most important finding here. Dropping text to make only videos is about as risky as making only text. And since most people find news through social media, what is easiest to pass on tends to win: a short message can be pasted into a LINE group, a short clip can be shared, and a long document usually stops at the page where it was posted.",
          links: [{ match: "a long document usually stops at the page where it was posted", href: "/en/insights/line-news-trust-2026" }],
        },
        { kind: "h2", text: "Three ways to tell one story to many kinds of audience" },
        {
          kind: "tips",
          items: [
            {
              title: "One story, two formats",
              text: "Every important announcement should come as a clip of under a minute for people who prefer to watch, and a message of no more than three lines for people who prefer to read and pass it on, both built on the same facts.",
            },
            {
              title: "Plan for the television screen",
              text: "Television is still a news source for three in four people. Make clips that local news programmes or the agency's own channel can reuse: clear stills, large text, and a story that stands on its own.",
            },
            {
              title: "Let a trusted person do the talking",
              text: "Whether video or audio, have the person who actually handles the issue speak. The closeness of a real voice is what makes people watch to the end and share.",
            },
          ],
        },
        { kind: "h2", text: "Reading this data with care" },
        {
          kind: "p",
          text: "The data here come from different surveys. The 2024 National Statistical Office and NBTC surveys are nationwide and include people who are not online. The 2023 Reuters Institute data come from an online survey that mainly reflects internet users and are now more than three years old (at the time of writing Statista had no newer data for the question on preferred format), so treat them as a signal of direction. All sets allowed multiple answers except preferred format, where respondents chose one.",
        },
        { kind: "h2", text: "Do not choose; tell it in full" },
        {
          kind: "p",
          text: "The answer to whether to make a video, write or record audio is to make one story that can travel in several forms. People in the same household take in news differently, and so does an agency's audience.",
        },
        {
          kind: "note",
          text: "If your organisation is deciding which formats to use for an important story, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "National Statistical Office (Thailand) & NBTC via Statista. (2024, June 17). Leading news sources in Thailand as of April 2024 (National Broadcasting Services Thailand: Program Consumption Survey 2024). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1291322/thailand-leading-news-sources/",
        },
        {
          text: "NBTC & National Statistical Office (Thailand) via Statista. (2025, January 16). Leading free online content watched by Thai consumers as of October 2024, by type (Survey of access to radio and television media 2024, p. 44). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1550951/thailand-leading-free-online-content-by-type/",
        },
        {
          text: "Reuters Institute for the Study of Journalism via Statista. (2024, March 22). Preferred ways to consume online news in Thailand in 2023 (Digital News Report 2023, p. 27). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1457108/thailand-preferred-ways-to-consume-online-news/",
        },
        {
          text: "Reuters Institute for the Study of Journalism via Statista. (2024, March 22). Main way of getting news online in Thailand in 2023 (Digital News Report 2023, p. 12). Accessed 27 October 2026.",
          url: "https://www.statista.com/statistics/1457100/thailand-main-way-of-getting-news-online/",
        },
      ],
    },
  },
  {
    slug: "thailand-image-foreign-media",
    date: "2026-10-28",
    author: SMITH,
    palette: [8, 11],
    cover: "/images/insights/thailand-image-foreign-media-hero",
    evidence: ["thailand-image-cannabis-youtube", "chinese-media-thailand-cannabis"],
    th: {
      title: "ข่าวดีเรื่องไทยไปถึงโลกแล้ว แต่คำถามของนักท่องเที่ยวยังไม่มีใครตอบ",
      dek: "งานวิจัยสองชิ้นติดตามว่าสื่อต่างประเทศพูดถึงไทยอย่างไรหลังปลดล็อกกัญชา คลิปบน YouTube ส่วนใหญ่มองไทยในแง่ดี ข่าวในสื่อจีนเขียนแบบกลางๆ แต่คนอ่านกลับสรุปว่า \"ไม่ไปดีกว่า\" ภาพลักษณ์ของประเทศจึงไม่ได้ขึ้นอยู่กับว่าข่าวเขียนถึงเราในทางดีหรือไม่เพียงอย่างเดียว",
      coverAlt:
        "ภาพประกอบกระดาษ กระเป๋าเดินทางใบเล็กสีแดงเลือดหมูบนพื้นกระดาษสีครีม มีป้ายรูปบับเบิลคำพูดสีส้มที่ยังว่างเปล่าติดอยู่ที่หูหิ้ว",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "หลิน (ตัวละครสมมติ) กำลังวางแผนพาพ่อแม่มาเที่ยวกรุงเทพฯ ช่วงตรุษจีน เธอเลื่อนอ่านข่าวบนเวยป๋อว่าไทยปลดล็อกกัญชาแล้ว ข่าวเขียนกลางๆ ไม่ชมไม่ติ แต่ใต้โพสต์มีคนถามซ้ำๆ กันว่า ถ้ากินก๋วยเตี๋ยวข้างทางแล้วมีกัญชาปนโดยไม่รู้ตัวจะทำอย่างไร กลับบ้านแล้วจะมีปัญหาไหม ไม่มีใครตอบ เธอปิดแอปแล้วหันไปดูตั๋วเครื่องบินไปประเทศอื่นแทน",
        },
        {
          kind: "p",
          text: "สำหรับหน่วยงานที่ดูแลภาพลักษณ์ประเทศหรือการท่องเที่ยว เรื่องนี้ชวนให้ถามว่า การสื่อสารกับคนทั้งโลกจะนับว่าสำเร็จเมื่อไร เมื่อมีข่าวออกไปมากๆ เมื่อข่าวพูดถึงเราในทางดี หรือเมื่อคนอ่านตัดสินใจเดินทางมาจริง",
        },
        { kind: "h2", text: "นักท่องเที่ยวยังไม่กลับมาเท่าเดิม" },
        {
          kind: "p",
          text: "เรื่องนี้สำคัญเพราะการท่องเที่ยวยังฟื้นไม่เต็มที่ ข้อมูลของธนาคารแห่งประเทศไทยระบุว่านักท่องเที่ยวต่างชาติลดจาก 39.8 ล้านคนในปี 2562 เหลือเพียง 0.43 ล้านคนในปี 2564 ฟื้นกลับมาเป็น 35.55 ล้านคนในปี 2567 แล้วลดลงเป็น 32.97 ล้านคนในปี 2568 [1]",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "นักท่องเที่ยวต่างชาติยังไม่กลับไปถึงระดับก่อนโควิด",
            subtitle: "จำนวนนักท่องเที่ยวต่างชาติที่เดินทางเข้าไทย (ล้านคน) · 2558–2568",
            alt: "กราฟเส้นแสดงจำนวนนักท่องเที่ยวต่างชาติในไทย ปี 2558 29.9 ล้านคน 2559 32.5 2560 35.59 2561 38.18 2562 39.8 2563 6.7 2564 0.43 2565 11.07 2566 28.15 2567 35.55 และ 2568 32.97 ล้านคน",
            source: "ที่มา: ธนาคารแห่งประเทศไทย via Statista, 2026",
            unit: " ล้านคน",
            data: [
              { label: "2558", value: 29.9 },
              { label: "2559", value: 32.5 },
              { label: "2560", value: 35.59 },
              { label: "2561", value: 38.18 },
              { label: "2562", value: 39.8 },
              { label: "2563", value: 6.7 },
              { label: "2564", value: 0.43 },
              { label: "2565", value: 11.07 },
              { label: "2566", value: 28.15 },
              { label: "2567", value: 35.55 },
              { label: "2568", value: 32.97 },
            ],
          },
        },
        {
          kind: "p",
          text: "นักท่องเที่ยวจีนก็ยังเป็นกลุ่มใหญ่ ข้อมูลรายประเทศล่าสุดที่ Statista มีคือไตรมาสที่ 3 ของปี 2566 ซึ่งมีนักท่องเที่ยวจีน 1.05 ล้านคน มากเป็นอันดับสองรองจากมาเลเซีย [2] คนจีนอ่านข่าวเรื่องไทยแล้วรู้สึกอย่างไรจึงเป็นเรื่องที่เราต้องใส่ใจ",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "จีนเป็นตลาดนักท่องเที่ยวอันดับสองของไทย",
            subtitle: "จำนวนนักท่องเที่ยวในไทยจำแนกตามประเทศ (พันคน) · ไตรมาส 3 ปี 2566 · ห้าอันดับแรก",
            alt: "กราฟแท่งแสดงนักท่องเที่ยวในไทยไตรมาส 3 ปี 2566 มาเลเซีย 1,200 พันคน จีน 1,050 เกาหลีใต้ 430 อินเดีย 401 และเวียดนาม 317 พันคน",
            source: "ที่มา: กระทรวงการท่องเที่ยวและกีฬา via Statista, 2024 · Tourism economic review 2024, หน้า 23",
            unit: " พันคน",
            data: [
              { label: "มาเลเซีย", value: 1200 },
              { label: "จีน", value: 1050, highlight: true },
              { label: "เกาหลีใต้", value: 430 },
              { label: "อินเดีย", value: 401 },
              { label: "เวียดนาม", value: 317 },
            ],
          },
        },
        { kind: "h2", text: "บน YouTube โลกเห็นไทยในแง่ดี แต่เห็นแค่ด้านเดียว" },
        {
          kind: "p",
          text: "ทีมวิจัยของ ดร.มุฮัมมัด อิบเตซาม มาซาฮีร์ รศ.ดร.สมิทธิ์ บุญชุติมา และคณะ (ตีพิมพ์ปี 2568) วิเคราะห์คลิป YouTube 57 คลิปที่เผยแพร่ช่วงสามเดือนก่อนและหลังไทยปลดล็อกกัญชาเมื่อ 9 มิถุนายน 2565 ทั้งข่าวและวล็อก พบว่า 43 คลิป หรือ 75.4% พูดถึงไทยในแง่ดี มีเพียง 7.0% ที่พูดในแง่ลบ",
          links: [{ match: "วิเคราะห์คลิป YouTube 57 คลิป", href: "/research/thailand-image-cannabis-youtube" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "สามในสี่ของคลิปพูดถึงไทยในแง่ดี",
            subtitle: "ร้อยละของคลิป YouTube 57 คลิป แบ่งตามท่าทีที่มีต่อไทย · มีนาคม–กันยายน 2565",
            alt: "กราฟแท่งแสดงท่าทีของคลิป YouTube 57 คลิปที่พูดถึงไทยหลังปลดล็อกกัญชา แง่บวก 75.4% มีทั้งบวกและลบ 15.8% แง่ลบ 7.0% และเป็นกลาง 1.8%",
            source: "ที่มา: Mazahir, Boonchutima และคณะ (2025) PLOS ONE · วิเคราะห์เนื้อหาคลิป YouTube 57 คลิป",
            guess: "แง่บวก",
            prompt: "ลองทายก่อน: คลิปที่พูดถึงไทยในแง่ดีมีกี่เปอร์เซ็นต์?",
            answerNote: "ส่วนคลิปแง่ลบมีเพียง 7%",
            data: [
              { label: "แง่บวก", value: 75.4 },
              { label: "มีทั้งบวกและลบ", value: 15.8 },
              { label: "แง่ลบ", value: 7.0 },
              { label: "เป็นกลาง", value: 1.8 },
            ],
          },
        },
        {
          kind: "p",
          text: "แต่ภาพดีๆ นี้มีสองเรื่องที่ต้องระวัง เรื่องแรก กระแสมาเร็วไปเร็ว 81% ของคลิปออกมาหลังวันประกาศ ส่วนใหญ่อยู่ในเดือนมิถุนายน พอถึงเดือนกันยายนเหลือเพียง 2 คลิป เรื่องที่สอง หลายคลิปฟังความข้างเดียว 28.1% ไม่มีความเห็นของคนที่สองเลย และแทบไม่มีคลิปไหนเตือนนักท่องเที่ยวว่ากฎหมายของประเทศตัวเองว่าอย่างไรเมื่อเดินทางกลับ ทั้งที่เป็นเรื่องที่คนกลุ่มนี้อยากรู้ที่สุด",
        },
        { kind: "h2", text: "สื่อจีนเขียนข่าวกลางๆ แต่คนอ่านไม่ได้คิดกลางๆ ตาม" },
        {
          kind: "p",
          text: "อีกงานหนึ่งของ Deng, รศ.ดร. Pavel Slutskiy และ รศ.ดร.สมิทธิ์ บุญชุติมา (ตีพิมพ์ปี 2566) อ่านโพสต์บนเวยป๋อ 128 โพสต์ของสื่อภาษาจีนสี่แห่งระหว่างปี 2562–2565 ผู้วิจัยสามคนที่อ่านแยกกันจัดให้โพสต์ 82.8–94.5% เป็นการรายงานแบบกลางๆ มีโพสต์ที่ชวนให้มาไทยเพียง 0.8–2.3% แต่ความเห็นใต้โพสต์ไปอีกทาง ความเห็นจำนวนมากบอกว่าจะไม่มาไทย เพราะกลัวกินอาหารที่มีกัญชาโดยไม่รู้ตัว ไม่เชื่อว่าจะควบคุมได้ดี และมองว่าเป็นนโยบายที่ลอกแบบตะวันตก",
          links: [{ match: "อ่านโพสต์บนเวยป๋อ 128 โพสต์", href: "/research/chinese-media-thailand-cannabis" }],
        },
        {
          kind: "p",
          text: "อีกเรื่องที่น่าสังเกตคือที่มาของข่าว 58.6% ของโพสต์อ้างข่าวจากสื่อไทย 7.8% สื่อเรียบเรียงเอง แต่อีก 33.6% ไม่บอกที่มาเลย",
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "หนึ่งในสามของข่าวเรื่องไทยในสื่อจีนไม่บอกว่ามาจากไหน",
            subtitle: "ร้อยละของโพสต์บนเวยป๋อ 128 โพสต์ จำแนกตามแหล่งที่มาที่อ้าง · 2562–2565",
            alt: "แถบแบ่งสัดส่วนแหล่งที่มาของโพสต์ 128 โพสต์ในสื่อภาษาจีน อ้างสื่อไทย 58.6% ไม่ระบุแหล่งที่มา 33.6% และสื่อเรียบเรียงเอง 7.8%",
            source: "ที่มา: Deng, Slutskiy และ Boonchutima (2023) Heliyon · วิเคราะห์เนื้อหาโพสต์บนเวยป๋อ 128 โพสต์",
            prompt: "คิดว่าข่าวเรื่องไทยในสื่อจีนส่วนใหญ่อ้างข้อมูลจากที่ไหน? เลือกหนึ่งข้อ",
            answerNote: "แต่อีกหนึ่งในสามไม่ระบุที่มาเลย",
            data: [
              { label: "อ้างสื่อไทย", value: 58.6 },
              { label: "ไม่ระบุที่มา", value: 33.6 },
              { label: "สื่อเรียบเรียงเอง", value: 7.8 },
            ],
          },
        },
        {
          kind: "p",
          text: "ตัวเลขนี้บอกว่าข่าวที่ออกจากไทยมีโอกาสสูงที่จะถูกแปลไปเล่าต่อในภาษาอื่น ถ้าหน่วยงานไทยเขียนให้ชัด ตอบสิ่งที่คนสงสัยจริง และอ้างอิงได้ ข้อความนั้นก็มีโอกาสไปถึงคนอ่านต่างประเทศมากกว่าที่คิด แต่ถ้าไม่ตอบสิ่งที่นักท่องเที่ยวสงสัย ความกังวลจะเข้ามาแทนที่",
        },
        { kind: "h2", text: "สามเรื่องที่ควรเตรียมก่อนประกาศนโยบายที่ต่างชาติจับตา" },
        {
          kind: "tips",
          items: [
            {
              title: "ตอบเรื่องที่นักท่องเที่ยวสงสัยจริง",
              text: "นอกจากประกาศว่านโยบายคืออะไร ให้เตรียมคำตอบสั้นๆ สำหรับคำถามที่คนจะถามจริง เช่น จะรู้ได้อย่างไรว่าอาหารใส่กัญชาหรือไม่ และกลับประเทศแล้วต้องระวังอะไร แล้วแปลเป็นภาษาของประเทศที่มีนักท่องเที่ยวมามาก",
            },
            {
              title: "อ่านความเห็นของคนอ่าน ไม่ใช่นับแค่จำนวนข่าว",
              text: "สัดส่วนข่าวที่เป็นกลางหรือเป็นบวกบอกไม่ได้ว่าคนอ่านรู้สึกอย่างไร ควรติดตามความเห็นของคนอ่านในประเทศที่เป็นตลาดหลัก เพราะคนส่วนใหญ่ตัดสินใจจากสิ่งที่คุยกันตรงนั้น",
            },
            {
              title: "เตรียมข้อมูลไว้ให้ค้นเจอหลังกระแสซา",
              text: "สื่อต่างประเทศสนใจอยู่แค่เดือนแรกแล้วก็เงียบไป ข้อมูลที่ช่วยให้คนตัดสินใจเดินทางจึงควรค้นเจอได้ตลอด ไม่ใช่มีอยู่แค่ในข่าววันที่ประกาศนโยบาย",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งานบน YouTube ศึกษาคลิปเพียง 57 คลิปจากแพลตฟอร์มเดียวในหกเดือน จึงเป็นภาพช่วงเวลาหนึ่ง ไม่ใช่ภาพของสื่อทั้งหมด งานสื่อจีนต้องจำกัดอยู่ที่เวยป๋อเพราะการเซ็นเซอร์ทำให้ค้นคำบางคำไม่ได้ ข้อมูลจึงไม่ครบ ความเห็นที่เห็นอยู่อาจไม่ใช่สิ่งที่คนคิดจริงทั้งหมด และงานไม่ได้วัดว่าความเห็นเหล่านั้นทำให้คนเดินทางน้อยลงจริงหรือไม่ ทั้งสองงานเก็บข้อมูลก่อนที่ทิศทางนโยบายกัญชาของไทยจะเปลี่ยนอีกครั้ง ส่วนตัวเลขนักท่องเที่ยวจาก Statista ใส่ไว้เพื่อให้เห็นว่าตลาดใหญ่แค่ไหน ไม่ได้บอกว่าภาพในสื่อหรือนโยบายกัญชาทำให้นักท่องเที่ยวเพิ่มขึ้นหรือลดลง และข้อมูลรายประเทศเป็นตัวเลขเพียงไตรมาสเดียว",
        },
        { kind: "h2", text: "ภาพลักษณ์ที่ดีต้องตอบคำถามของคนได้" },
        {
          kind: "p",
          text: "ข่าวดีไปถึงคนทั่วโลกได้เร็ว แต่สิ่งที่ทำให้คนตัดสินใจมาจริงคือคำตอบของเรื่องเล็กๆ ที่เขากังวล หน่วยงานที่สื่อสารกับต่างชาติจึงควรวัดผลจากจำนวนคำถามที่ตอบได้ ไม่ใช่จำนวนข่าวที่ส่งออกไป",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังวางแผนสื่อสารนโยบายหรือภาพลักษณ์ประเทศกับผู้ชมต่างชาติ ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "Bank of Thailand via Statista. (2026, February 23). Number of international tourist arrivals in Thailand from 2015 to 2025 (in millions). เข้าถึง 29 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/994693/thailand-number-international-tourist-arrivals/",
        },
        {
          text: "Ministry of Tourism and Sports (Thailand) via Statista. (2024, March 21). Number of tourists in Thailand in 3rd quarter 2023, by country (Tourism economic review 2024, p. 23). เข้าถึง 29 ตุลาคม 2569.",
          url: "https://www.statista.com/statistics/672055/tourists-to-thailand-by-country-of-origin/",
        },
      ],
    },
    en: {
      title: "The good news about Thailand reached the world. The travellers' questions are still unanswered",
      dek: "Two studies followed Thailand's image in foreign media after cannabis was legalised. On YouTube the picture was mostly positive; in Chinese-language media the coverage was neutral but the readers' comments ended at \"I'm not going.\" The lesson: a country's image is not settled by the tone of its news.",
      coverAlt:
        "Paper-craft illustration on cream paper: a small burgundy suitcase with a blank orange speech-bubble tag attached to its handle",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Lin (a fictional character) is planning to bring her parents to Bangkok over Chinese New Year. On Weibo she reads that Thailand has legalised cannabis. The report is flat, neither cheering nor condemning. But under the post, people keep asking the same thing: what if a street-side noodle soup has cannabis in it and I don't know? Will I be in trouble when I get home? Nobody answers. She closes the app and starts looking at flights somewhere else.",
        },
        {
          kind: "p",
          text: "For agencies responsible for a country's image or its tourism, this raises a question: what do we measure the success of communicating with the world by? The amount of coverage, its tone, or what the audience decides after reading?",
        },
        { kind: "h2", text: "Visitors have not fully come back" },
        {
          kind: "p",
          text: "The question matters because tourism has not fully recovered. Bank of Thailand figures show international arrivals fell from 39.8 million in 2019 to just 0.43 million in 2021, recovered to 35.55 million in 2024, then dropped to 32.97 million in 2025 [1].",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "International arrivals are still below pre-COVID levels",
            subtitle: "International tourist arrivals in Thailand (millions) · 2015–2025",
            alt: "Line chart of international tourist arrivals in Thailand: 29.9 million in 2015, 32.5 in 2016, 35.59 in 2017, 38.18 in 2018, 39.8 in 2019, 6.7 in 2020, 0.43 in 2021, 11.07 in 2022, 28.15 in 2023, 35.55 in 2024 and 32.97 million in 2025",
            source: "Source: Bank of Thailand via Statista, 2026",
            unit: " million",
            data: [
              { label: "2015", value: 29.9 },
              { label: "2016", value: 32.5 },
              { label: "2017", value: 35.59 },
              { label: "2018", value: 38.18 },
              { label: "2019", value: 39.8 },
              { label: "2020", value: 6.7 },
              { label: "2021", value: 0.43 },
              { label: "2022", value: 11.07 },
              { label: "2023", value: 28.15 },
              { label: "2024", value: 35.55 },
              { label: "2025", value: 32.97 },
            ],
          },
        },
        {
          kind: "p",
          text: "And Chinese visitors remain a large group. In the third quarter of 2023, the latest country breakdown on Statista, 1.05 million came from China, second only to Malaysia [2]. What Chinese-language readers think about Thailand is not a distant concern.",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "China is Thailand's second-largest visitor market",
            subtitle: "Tourists in Thailand by country (thousands) · Q3 2023 · top five",
            alt: "Bar chart of tourists in Thailand in Q3 2023: Malaysia 1,200 thousand, China 1,050, South Korea 430, India 401 and Vietnam 317 thousand",
            source: "Source: Ministry of Tourism and Sports (Thailand) via Statista, 2024 · Tourism economic review 2024, p. 23",
            unit: " thousand",
            data: [
              { label: "Malaysia", value: 1200 },
              { label: "China", value: 1050, highlight: true },
              { label: "South Korea", value: 430 },
              { label: "India", value: 401 },
              { label: "Vietnam", value: 317 },
            ],
          },
        },
        { kind: "h2", text: "On YouTube the world saw Thailand positively, but from one side only" },
        {
          kind: "p",
          text: "A team led by Dr Muhammad Ibtesam Mazahir, Assoc. Prof. Dr Smith Boonchutima and colleagues (published in 2025) analysed 57 YouTube clips, both news and vlogs, posted in the three months either side of legalisation on 9 June 2022. The overall tone was positive in 43 clips, or 75.4%, and negative in only 7.0%.",
          links: [{ match: "analysed 57 YouTube clips", href: "/en/research/thailand-image-cannabis-youtube" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Three in four clips told Thailand's story positively",
            subtitle: "Share of 57 YouTube clips by overall tone · March–September 2022",
            alt: "Bar chart of the tone of 57 YouTube clips about Thailand after cannabis legalisation: positive 75.4%, ambivalent 15.8%, negative 7.0%, neutral 1.8%",
            source: "Source: Mazahir, Boonchutima et al. (2025), PLOS ONE · content analysis of 57 YouTube clips",
            guess: "Positive",
            prompt: "Guess first: what share of clips told Thailand's story positively?",
            answerNote: "Only 7% were negative.",
            data: [
              { label: "Positive", value: 75.4 },
              { label: "Ambivalent", value: 15.8 },
              { label: "Negative", value: 7.0 },
              { label: "Neutral", value: 1.8 },
            ],
          },
        },
        {
          kind: "p",
          text: "That favourable picture comes with two warnings. First, the attention came and went quickly: 81% of the clips appeared after the announcement, clustered in June, falling to just 2 clips by September. Second, many clips carried a single voice. 28.1% quoted no second speaker at all, and very few warned travellers about the law when returning to their own countries, the information this audience needed most.",
        },
        { kind: "h2", text: "In Chinese media the coverage was neutral, but readers did not stay neutral" },
        {
          kind: "p",
          text: "A second study by Deng, Assoc. Prof. Dr Pavel Slutskiy and Assoc. Prof. Dr Smith Boonchutima (published in 2023) read 128 Weibo posts by four Chinese-language outlets from 2019 to 2022. The three coders classified 82.8–94.5% of posts as neutral reporting, and only 0.8–2.3% as encouraging. The comments went the other way. A prominent cluster rejected Thailand as a destination, reasoning that they might eat cannabis-laced food without knowing, that oversight could not be trusted, and that the policy imitated the West.",
          links: [{ match: "read 128 Weibo posts", href: "/en/research/chinese-media-thailand-cannabis" }],
        },
        {
          kind: "p",
          text: "The sources are worth a second look. 58.6% of posts cited Thai media and 7.8% were compiled by the outlets themselves, but 33.6% gave no source at all.",
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "A third of Chinese-media posts about Thailand did not say where the news came from",
            subtitle: "Share of 128 Weibo posts by source cited · 2019–2022",
            alt: "Stacked bar of the sources cited in 128 Chinese-language posts: Thai media 58.6%, no source 33.6%, compiled by the outlet 7.8%",
            source: "Source: Deng, Slutskiy and Boonchutima (2023), Heliyon · content analysis of 128 Weibo posts",
            prompt: "Where do you think most Chinese-media posts about Thailand got their information? Pick one.",
            answerNote: "But another third cited no source at all.",
            data: [
              { label: "Thai media", value: 58.6 },
              { label: "No source", value: 33.6 },
              { label: "Compiled by outlet", value: 7.8 },
            ],
          },
        },
        {
          kind: "p",
          text: "This says that what Thai agencies put out has a good chance of being retold in another language. Clear messages that answer real questions and can be cited are more likely to reach foreign readers than we might assume. Conversely, if the message does not answer the traveller's question, the gap gets filled with worry.",
        },
        { kind: "h2", text: "Three things to do before announcing a policy the world will notice" },
        {
          kind: "tips",
          items: [
            {
              title: "Answer the traveller's everyday questions",
              text: "Beyond announcing what the policy is, prepare short answers to the questions people will actually ask, such as how to tell whether food contains the ingredient and what to watch out for on returning home, translated into the languages of the main visitor markets.",
            },
            {
              title: "Read the comments, not just the coverage",
              text: "The share of neutral or positive coverage does not tell you how readers feel. Follow reader comments in key markets, because that is where meaning gets settled.",
            },
            {
              title: "Plan for after the spike",
              text: "Foreign media attention clustered in the first month and then vanished. Information that helps people decide whether to travel should stay findable over time, not live only in announcement-day news.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "The YouTube study covers only 57 clips from one platform over six months, so it is a snapshot, not a picture of all media. The Chinese-media study had to be confined to Weibo because censorship makes some terms unsearchable, so the data are incomplete, visible comments may not be everyone's real opinion, and the study did not measure whether those comments actually reduced travel. Both studies collected data before the direction of Thailand's cannabis policy shifted again. The Statista visitor figures are included to show the size of the market; they do not show that media coverage or cannabis policy raised or lowered visitor numbers, and the country breakdown covers a single quarter.",
        },
        { kind: "h2", text: "A good image is one that answers questions" },
        {
          kind: "p",
          text: "Good news reaches the world fast. What makes people actually come is an answer to the small questions they worry about. Agencies that communicate with the world should measure success by the questions they answer, not by the volume of coverage.",
        },
        {
          kind: "note",
          text: "If your organisation is planning how to communicate a policy or the country's image to foreign audiences, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "Bank of Thailand via Statista. (2026, February 23). Number of international tourist arrivals in Thailand from 2015 to 2025 (in millions). Accessed 29 October 2026.",
          url: "https://www.statista.com/statistics/994693/thailand-number-international-tourist-arrivals/",
        },
        {
          text: "Ministry of Tourism and Sports (Thailand) via Statista. (2024, March 21). Number of tourists in Thailand in 3rd quarter 2023, by country (Tourism economic review 2024, p. 23). Accessed 29 October 2026.",
          url: "https://www.statista.com/statistics/672055/tourists-to-thailand-by-country-of-origin/",
        },
      ],
    },
  },
  {
    slug: "health-messages-hard-to-reach",
    date: "2026-10-28",
    author: SMITH,
    palette: [3, 14],
    cover: "/images/insights/health-messages-hard-to-reach-hero",
    evidence: [
      "dengue-media-exposure-longitudinal",
      "health-content-working-women",
      "retirees-sodium-campaign",
      "forum-theatre-antibiotics-myanmar",
    ],
    relatedProjects: ["department-of-disease-control", "care-d-plus"],
    th: {
      title: "ข้อความสุขภาพที่ไปถึงทุกคน อาจไม่ได้เปลี่ยนใครเลย",
      dek: "งานวิจัยสี่ชิ้น ตั้งแต่เรื่องไข้เลือดออกจนถึงการลดเค็ม ชี้ว่าการที่ข้อความไปถึงคนมากขึ้นไม่ได้แปลว่าคนจะทำตาม สิ่งที่ได้ผลกว่าคือรู้ก่อนว่ากลุ่มเป้าหมายเข้าใจผิดตรงไหน แล้วเล่าในแบบที่เขาอยากรับ",
      coverAlt:
        "ภาพประกอบกระดาษ ซองจดหมายสีเขียวที่เปิดอยู่บนพื้นกระดาษสีครีม มีหยดน้ำกระดาษสีฟ้าซ้อนหลายชั้นโผล่ขึ้นมาจากฝาซอง",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "พี่นก (ตัวละครสมมติ) เป็นเจ้าหน้าที่สาธารณสุขอำเภอ ทุกปีเมื่อเข้าหน้าฝน เธอติดโปสเตอร์ไข้เลือดออก ส่งข้อความในกลุ่มไลน์หมู่บ้าน และพูดในที่ประชุมหมู่บ้านทุกเดือน ปีนี้มีคนเห็นข้อความมากกว่าทุกปี แต่พอเดินสำรวจตามบ้าน ลูกน้ำในโอ่งก็ยังมีเท่าเดิม",
        },
        {
          kind: "p",
          text: "คนทำงานสื่อสารสุขภาพหลายคนคงเคยสงสัยเหมือนกันว่า ข้อความก็ไปถึงคนมากขึ้นแล้ว ทำไมคนยังไม่เปลี่ยนพฤติกรรม งานวิจัยสี่ชิ้นในบทความนี้ช่วยตอบคำถามนี้ได้คนละมุม",
        },
        { kind: "h2", text: "คนเห็นข่าวมากขึ้นทุกปี แต่ความรู้และการลงมือทำไม่ได้เพิ่มตาม" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา และคณะ (ตีพิมพ์ปี 2560 เก็บข้อมูลปี 2556–2558) สำรวจคนไทย 7,772 คนใน 25 จังหวัดสามปีติดกัน พบว่าคนเห็นข่าวไข้เลือดออกในสื่อบ่อยขึ้นทุกปี แต่ตอบคำถามเรื่องยุงลายถูกมากขึ้นอยู่ปีเดียวแล้วก็กลับลงมา จาก 73.6% เป็น 81.5% แล้วเหลือ 73.3%",
          links: [{ match: "สำรวจคนไทย 7,772 คนใน 25 จังหวัดสามปีติดกัน", href: "/research/dengue-media-exposure-longitudinal" }],
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "ความรู้เรื่องยุงลายดีขึ้นปีเดียว แล้วกลับไปที่เดิม",
            subtitle: "ร้อยละเฉลี่ยของคำตอบที่ถูกในคำถามความรู้เรื่องไข้เลือดออก · 2556–2558 · ผู้ตอบแต่ละปีเป็นคนละกลุ่ม",
            alt: "กราฟเส้นแสดงร้อยละคำตอบที่ถูกเรื่องไข้เลือดออก ปี 2556 73.6% ปี 2557 81.5% และปี 2558 73.3%",
            source: "ที่มา: Boonchutima และคณะ (2017) Journal of Infection and Public Health · สำรวจ 7,772 คน 25 จังหวัด",
            data: [
              { label: "2556", value: 73.6 },
              { label: "2557", value: 81.5 },
              { label: "2558", value: 73.3 },
            ],
          },
        },
        {
          kind: "p",
          text: "ที่น่าห่วงกว่าคือการลงมือทำ สัดส่วนคนที่กำจัดแหล่งเพาะพันธุ์ยุงทุกสัปดาห์ตามคำแนะนำลดลงจาก 61.2% ในปี 2557 เหลือ 48.3% ในปี 2558 ส่วนความเข้าใจผิดที่แก้ยากที่สุดคือเรื่องน้ำ มีคนเพียงราวหนึ่งในสามที่รู้ว่ายุงลายไม่วางไข่ในน้ำสกปรก ความเชื่อผิดๆ ข้อนี้อยู่มาได้สองปีทั้งที่คนเห็นข่าวมากขึ้น แปลว่าข้อความที่ส่งออกไปไม่ได้พูดถึงเรื่องนี้ตรงๆ",
        },
        { kind: "h2", text: "คนต่างกลุ่ม อยากได้ข้อมูลคนละแบบ" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ และคณะ (ตีพิมพ์ปี 2563) สำรวจผู้หญิงวัยทำงาน 1,074 คนใน 13 องค์กร พบว่าคนที่ทำงานบริษัทเอกชนอยากได้วิดีโอแอนิเมชันและอินโฟกราฟิกมากกว่ากลุ่มอื่นอย่างชัดเจน ส่วนคนที่ทำงานหน่วยงานรัฐและโรงงานอยากอ่านเป็นข้อความล้วนมากกว่าคนในบริษัทเอกชน",
          links: [{ match: "สำรวจผู้หญิงวัยทำงาน 1,074 คนใน 13 องค์กร", href: "/research/health-content-working-women" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คนในหน่วยงานรัฐและโรงงานยังอยากอ่านเป็นข้อความ",
            subtitle: "คะแนนเฉลี่ยความต้องการเนื้อหาสุขภาพแบบข้อความล้วน (เต็ม 5) แยกตามประเภทองค์กร · 2562–2563",
            alt: "กราฟแท่งแสดงค่าเฉลี่ยความต้องการเนื้อหาแบบข้อความล้วน หน่วยงานรัฐและรัฐวิสาหกิจ 3.02 โรงงาน 3.01 และบริษัทเอกชน 2.47 จากเต็ม 5",
            source: "ที่มา: Boonchutima, Sthapitanonda, Chongkolrattanaporn และคณะ (2020) วารสารประชาสัมพันธ์และโฆษณา · สำรวจ 1,074 คน",
            unit: " จาก 5",
            data: [
              { label: "หน่วยงานรัฐและรัฐวิสาหกิจ", value: 3.02 },
              { label: "โรงงาน", value: 3.01 },
              { label: "บริษัทเอกชน", value: 2.47 },
            ],
          },
        },
        {
          kind: "p",
          text: "งานของ Wechprasith และ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2565) กับผู้เกษียณ 400 คนในกรุงเทพฯ ก็ชี้ไปทางเดียวกัน ผู้เกษียณเห็นแคมเปญลดเค็มทางเฟซบุ๊กมากที่สุด และเห็นทางวิทยุกับโปสเตอร์น้อยที่สุด จากลักษณะของผู้ตอบแปดด้าน มีเพียงระดับการศึกษาและแหล่งรายได้หลักเท่านั้นที่ทำให้ความเชื่อเรื่องสุขภาพแตกต่างกัน และการเห็นแคมเปญบ่อยขึ้นเกี่ยวข้องกับความเชื่อเรื่องสุขภาพเพียงเล็กน้อยเท่านั้น",
          links: [{ match: "กับผู้เกษียณ 400 คนในกรุงเทพฯ", href: "/research/retirees-sodium-campaign" }],
        },
        { kind: "h2", text: "รู้ว่าต้องทำอะไร ยังไม่เท่ากับรู้ว่าทำไม" },
        {
          kind: "p",
          text: "ภาพที่ชัดที่สุดมาจากงานละครเวทีแบบฟอรัมเรื่องยาปฏิชีวนะในชุมชนชานเมืองย่างกุ้ง (ตีพิมพ์ปี 2563) ซึ่ง ดร.พยู ฮนิน ไหล่ ร่วมเขียน ละครเล่นสิบรอบ มีผู้ชม 1,175 คน และมี 36 คนขึ้นเวทีไปเปลี่ยนตอนจบเอง หลังดูละคร คนส่วนใหญ่ตอบได้ว่ายาปฏิชีวนะใช้ฆ่าเชื้อแบคทีเรีย แต่สิ่งที่เกิดขึ้นบนเวทีบอกอะไรมากกว่านั้น คนที่ขึ้นไปส่วนใหญ่ทำได้แค่บอกตัวละครให้ไปหาหมอ ยังอธิบายไม่ได้ว่าการซื้อยากินเองไม่ดีอย่างไร และคนที่เล่นเป็นลูกหลานแทบเกลี้ยกล่อมผู้ใหญ่ในบ้านไม่ได้เลย",
          links: [{ match: "งานละครเวทีแบบฟอรัมเรื่องยาปฏิชีวนะ", href: "/research/forum-theatre-antibiotics-myanmar" }],
        },
        { kind: "h2", text: "สี่ข้อสำหรับแคมเปญสุขภาพครั้งหน้า" },
        {
          kind: "tips",
          items: [
            {
              title: "หาให้เจอก่อนว่าคนเข้าใจผิดเรื่องอะไร",
              text: "ก่อนผลิตสื่อ ลองถามกลุ่มเป้าหมายสั้นๆ ว่าเขาเข้าใจผิดเรื่องไหน แล้วเขียนข้อความแก้เรื่องนั้นตรงๆ เช่น ยุงลายไม่ได้วางไข่ในน้ำสกปรก แทนการส่งความรู้ทั่วไปชุดเดิมซ้ำทุกปี",
            },
            {
              title: "ทำเนื้อหาให้เหมาะกับแต่ละกลุ่ม",
              text: "เรื่องเดียวกันควรมีหลายแบบ ภาพเคลื่อนไหวสำหรับคนที่ชอบดู ข้อความสั้นอ่านง่ายสำหรับคนที่ยังชอบอ่าน และวางไว้ในช่องทางที่กลุ่มนั้นใช้อยู่จริง",
            },
            {
              title: "ให้คนได้ลองพูดเอง",
              text: "กิจกรรมที่ให้คนลองไปโน้มน้าวคนอื่น เช่น ละครหรือบทบาทสมมติ จะทำให้เห็นว่าเขายังขาดเหตุผลข้อไหน ซึ่งแบบสอบถามมักจับไม่ได้",
            },
            {
              title: "วัดว่าคนลงมือทำ ไม่ใช่แค่วัดว่าคนเห็น",
              text: "ตั้งตัวชี้วัดที่พฤติกรรม เช่น สัดส่วนบ้านที่กำจัดลูกน้ำทุกสัปดาห์ ควบคู่กับจำนวนคนที่เห็นข้อความ เพราะสองตัวเลขนี้อาจสวนทางกัน",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งานไข้เลือดออกเก็บข้อมูลปี 2556–2558 ก่อนที่ศูนย์ฯ จะก่อตั้ง ผู้ตอบแต่ละปีเป็นคนละกลุ่ม และคำถามวัดความรู้ก็ไม่เหมือนกันทุกปี การเทียบข้ามปีจึงบอกได้แค่ทิศทางคร่าวๆ งานผู้หญิงวัยทำงานและงานผู้เกษียณเก็บข้อมูลในกรุงเทพฯ และปริมณฑล จึงไม่ได้เป็นตัวแทนของทั้งประเทศ งานผู้เกษียณใช้แบบสอบถามออนไลน์ จึงเข้าถึงเฉพาะคนที่ใช้อินเทอร์เน็ต ส่วนงานละครประเมินผลจากการสนทนากลุ่มกับผู้ชม 40 คนในวันที่ดูละคร ไม่ได้ติดตามว่าพฤติกรรมเปลี่ยนไปในระยะยาวหรือไม่",
        },
        { kind: "h2", text: "ไปให้ถึงคนก่อน แล้วถามต่อว่าเขาเปลี่ยนหรือยัง" },
        {
          kind: "p",
          text: "การที่ข้อความไปถึงคนเป็นแค่ก้าวแรก ไม่ใช่เส้นชัย แคมเปญสุขภาพที่ได้ผลเริ่มจากการรู้ว่ากลุ่มเป้าหมายคิดอะไรอยู่ เล่าในแบบที่เขาอยากฟัง และวัดผลจากสิ่งที่เขาลงมือทำจริง",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังวางแผนการสื่อสารสุขภาพกับกลุ่มที่เข้าถึงยาก ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "A health message that reaches everyone may change no one",
      dek: "Four studies, from dengue to salt reduction, show that wider reach does not mean people act. What works better is knowing first where the audience gets it wrong, then telling the story in the form that group wants.",
      coverAlt:
        "Paper-craft illustration on cream paper: an open green envelope with a layered blue paper water droplet rising from its flap",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Nok (a fictional character) is a district public health officer. Every rainy season she puts up dengue posters, sends messages to the village LINE group and speaks at the monthly meeting. This year more people saw her messages than ever. But when she walks round the houses, there are as many larvae in the water jars as before.",
        },
        {
          kind: "p",
          text: "Many health communicators face the same question: if messages reach more people, why does behaviour not change? The four studies brought together here answer it from several angles.",
        },
        { kind: "h2", text: "Media reach rose every year, but knowledge and action did not follow" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima and colleagues (published in 2017, data collected 2013–2015) surveyed 7,772 people in 25 provinces over three years. How often people saw dengue information in the media rose every year, but the share of correct answers about the mosquito went up for one year and then fell back, from 73.6% to 81.5% and then 73.3%.",
          links: [{ match: "surveyed 7,772 people in 25 provinces over three years", href: "/en/research/dengue-media-exposure-longitudinal" }],
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "Knowledge about the dengue mosquito rose for a year, then fell back",
            subtitle: "Average share of correct answers to dengue knowledge questions · 2013–2015 · a different group of respondents each year",
            alt: "Line chart of the share of correct answers about dengue: 73.6% in 2013, 81.5% in 2014 and 73.3% in 2015",
            source: "Source: Boonchutima et al. (2017), Journal of Infection and Public Health · survey of 7,772 people in 25 provinces",
            data: [
              { label: "2013", value: 73.6 },
              { label: "2014", value: 81.5 },
              { label: "2015", value: 73.3 },
            ],
          },
        },
        {
          kind: "p",
          text: "Action fared worse. The share eliminating breeding sites every week, as recommended, fell from 61.2% in 2014 to 48.3% in 2015. And the most stubborn misconception was about water: only about a third knew that the dengue mosquito does not lay eggs in dirty water. It survived two years of rising exposure, which suggests the messages sent out never confronted it directly.",
        },
        { kind: "h2", text: "Different groups want different messages" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima, Asst. Prof. Dr Teerada Chongkolrattanaporn and colleagues (published in 2020) surveyed 1,074 working women in 13 organisations. Women in private companies wanted animated video and infographics clearly more than the other groups, while women in government agencies and factories wanted plain text more than private-sector women did.",
          links: [{ match: "surveyed 1,074 working women in 13 organisations", href: "/en/research/health-content-working-women" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Plain text is still wanted in government offices and factories",
            subtitle: "Mean preference for plain-text health content (out of 5) by type of organisation · 2019–2020",
            alt: "Bar chart of mean preference for plain-text content: government and state enterprises 3.02, factories 3.01, private companies 2.47, out of 5",
            source: "Source: Boonchutima, Sthapitanonda, Chongkolrattanaporn et al. (2020), Journal of Public Relations and Advertising · survey of 1,074 women",
            unit: " of 5",
            data: [
              { label: "Government and state enterprises", value: 3.02 },
              { label: "Factories", value: 3.01 },
              { label: "Private companies", value: 2.47 },
            ],
          },
        },
        {
          kind: "p",
          text: "A study by Wechprasith and Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2022) of 400 retirees in Bangkok points the same way. Retirees met salt-reduction campaigns most on Facebook and least on radio and posters. Of eight demographic characteristics, only education and main source of income made a difference to health beliefs, and seeing the campaign more often was associated with beliefs only weakly or very weakly.",
          links: [{ match: "of 400 retirees in Bangkok", href: "/en/research/retirees-sodium-campaign" }],
        },
        { kind: "h2", text: "Knowing what to do is not the same as knowing why" },
        {
          kind: "p",
          text: "A forum-theatre project on antibiotics in a peri-urban Yangon community (published in 2020), co-authored by Dr Phyu Hnin Hlaing, gives the clearest picture. Ten performances reached 1,175 people, and 36 of them stepped on stage to change the story. Afterwards most could say that antibiotics kill bacteria. But what happened on stage said more: most who stepped up simply told the sick character to see a doctor, without being able to explain why buying antibiotics over the counter is a problem, and those playing younger family members could barely persuade the elders.",
          links: [{ match: "A forum-theatre project on antibiotics", href: "/en/research/forum-theatre-antibiotics-myanmar" }],
        },
        { kind: "h2", text: "Four points for the next health campaign" },
        {
          kind: "tips",
          items: [
            {
              title: "Find the misconception before making materials",
              text: "Ask the audience briefly what they get wrong, then write messages that correct that point directly, such as dengue mosquitoes and dirty water, instead of repeating general information every year.",
            },
            {
              title: "Vary the format by group",
              text: "The same content should come in several forms: animation for people who prefer visuals, short readable text for those who still prefer to read, placed in the channels that group actually uses.",
            },
            {
              title: "Let people try saying it themselves",
              text: "Activities in which the audience tries to persuade someone else, such as theatre or role play, reveal which reasons they still lack, something questionnaires rarely see.",
            },
            {
              title: "Measure action, not just exposure",
              text: "Set indicators on behaviour, such as weekly larva control, alongside reach, because the two numbers can move in opposite directions.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "The dengue data were collected in 2013–2015, before the centre was founded. Each year's respondents were a different group and the knowledge questions were not identical, so year-to-year comparisons show only rough direction. The working-women and retiree studies were conducted in Bangkok and its vicinity and are not nationally representative; the retiree study used an online questionnaire and so reached only internet users. The theatre project was evaluated through focus groups of 40 people on the day of the performance and did not follow behaviour over time.",
        },
        { kind: "h2", text: "Reach people first, then ask whether they changed" },
        {
          kind: "p",
          text: "Reach is the first condition, not the destination. Health campaigns that work start by knowing what the audience thinks, tell the story in the form they want, and measure what they do.",
        },
        {
          kind: "note",
          text: "If your organisation is planning health communication with hard-to-reach groups, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
    },
  },
  {
    slug: "working-with-university-research-centre",
    date: "2026-10-28",
    author: SMITH,
    palette: [17, 4],
    cover: "/images/insights/working-with-university-research-centre-hero",
    evidence: ["engage-a3-model", "thai-universities-environmental-communication", "pint-of-science-thailand"],
    relatedProjects: ["care-d-plus", "international-labour-organization", "nia-satisfaction-survey-2020"],
    th: {
      title: "ทำงานกับศูนย์วิจัยในมหาวิทยาลัย ได้อะไรมากกว่าชิ้นงาน",
      dek: "หลายหน่วยงานติดต่อศูนย์วิจัยเพื่อให้ช่วยผลิตชิ้นงาน แต่สิ่งที่ศูนย์วิจัยช่วยได้มากที่สุดมักอยู่ก่อนและหลังชิ้นงานนั้น คือการตั้งโจทย์ให้ชัดตั้งแต่ต้น และการวัดผลที่กล้าบอกด้วยว่าอะไรไม่ได้ผล",
      coverAlt:
        "ภาพประกอบกระดาษ สะพานโค้งที่เรียงจากก้อนกระดาษสีน้ำเงินเข้มบนพื้นกระดาษสีครีม มีก้อนสีแดงหนึ่งก้อนเป็นหินล็อกอยู่ตรงยอดโค้ง",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "คุณต้น (ตัวละครสมมติ) เป็นผู้จัดการโครงการของหน่วยงานแห่งหนึ่ง เขามีเวลาสามเดือน และอยากได้คลิปรณรงค์สองคลิปกับรายงานผลหนึ่งเล่ม เขาโทรหาศูนย์วิจัยในมหาวิทยาลัยพร้อมรายการงานที่ต้องการ แต่คำถามแรกที่ได้กลับมาคือ \"อยากให้ใครเปลี่ยนพฤติกรรมอะไร และจะรู้ได้อย่างไรว่าเขาเปลี่ยนแล้ว\"",
        },
        {
          kind: "p",
          text: "คำถามแบบนี้อาจดูเหมือนทำให้งานช้าลง แต่นี่คือสิ่งที่ทำให้ศูนย์วิจัยในมหาวิทยาลัยต่างจากผู้ผลิตสื่อทั่วไป บทความนี้ใช้งานวิจัยและงานที่ผ่านมาเล่าว่าความต่างนั้นอยู่ตรงไหน",
        },
        { kind: "h2", text: "เรื่องสำคัญที่สุดเกิดขึ้นก่อนจะมีชิ้นงาน" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา และคณะ (ตีพิมพ์ปี 2565) เสนอแบบจำลอง ENGAGE-A3 สำหรับการสื่อสารความเสี่ยงเรื่องเอชไอวีกับแรงงานข้ามชาติ แล้วให้ผู้เชี่ยวชาญสิบคนให้คะแนนว่าแต่ละขั้นเหมาะสมแค่ไหน ขั้นที่ได้คะแนนสูงสุดคือการสร้างความไว้วางใจและการใช้เกม ได้ 4.45 จาก 5 รองลงมาคือการชวนคนในพื้นที่มาร่วม ได้ 4.36 ส่วนการประเมินผลได้คะแนนน้อยที่สุดที่ 4.18",
          links: [{ match: "เสนอแบบจำลอง ENGAGE-A3", href: "/research/engage-a3-model" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "ผู้เชี่ยวชาญให้คะแนนการสร้างความไว้วางใจสูงสุด และการประเมินผลต่ำสุด",
            subtitle: "คะแนนความเหมาะสมเฉลี่ยจากผู้เชี่ยวชาญ 10 คน (เต็ม 5) · บางองค์ประกอบของแบบจำลอง ENGAGE-A3",
            alt: "กราฟแท่งแสดงคะแนนความเหมาะสมขององค์ประกอบในแบบจำลอง ENGAGE-A3 การสร้างความไว้วางใจ 4.45 การใช้เกม 4.45 การชวนคนในพื้นที่มาร่วม 4.36 ภาพรวม 4.26 และการประเมินผล 4.18 จากเต็ม 5",
            source: "ที่มา: Boonchutima, Sukonthasab และ Sthapitanonda (2022) HIV & AIDS Review · กลุ่มสนทนาผู้เชี่ยวชาญ 10 คน",
            unit: " จาก 5",
            data: [
              { label: "สร้างความไว้วางใจ", value: 4.45, highlight: true },
              { label: "ใช้เกม", value: 4.45 },
              { label: "ชวนคนในพื้นที่มาร่วม", value: 4.36 },
              { label: "ภาพรวม", value: 4.26 },
              { label: "ประเมินผล", value: 4.18 },
            ],
          },
        },
        {
          kind: "p",
          text: "ผลนี้บอกเราสองเรื่อง เรื่องแรก สิ่งที่ผู้เชี่ยวชาญให้ความสำคัญที่สุดต้องทำก่อนจะมีสื่อชิ้นแรก เรื่องที่สอง แม้แต่ผู้เชี่ยวชาญเองก็ยังให้คะแนนการประเมินผลน้อยที่สุด ตรงกับที่เราเห็นบ่อยในการทำงานจริง คือการวัดผลมักถูกทิ้งไว้ท้ายสุดและได้งบน้อยที่สุด",
        },
        { kind: "h2", text: "มหาวิทยาลัยมีได้หลายบทบาท ต้องเลือกให้ชัดว่าจะใช้บทบาทไหน" },
        {
          kind: "p",
          text: "บทในหนังสือของ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2567) เรื่องบทบาทของมหาวิทยาลัยไทยในการสื่อสารสิ่งแวดล้อม แบ่งบทบาทของมหาวิทยาลัยไว้หกแบบ ได้แก่ ผู้สอน ผู้สร้างความรู้ ผู้แก้ปัญหาสังคม ผู้สร้างนวัตกรรม ผู้เชื่อมเครือข่าย และผู้ขับเคลื่อนการเปลี่ยนแปลง และแบ่งการประเมินงานประชาสัมพันธ์ไว้สี่ระดับ ตั้งแต่ชิ้นงานที่ส่งออกไปจนถึงผลที่เกิดกับสังคมในท้ายที่สุด บทนี้เป็นงานเชิงแนวคิด ข้อเสนอในบทจึงเป็นความเห็นของผู้เขียน แต่หน่วยงานใช้เป็นกรอบคุยกับศูนย์วิจัยได้ว่าโครงการของตนต้องการบทบาทแบบไหน",
          links: [{ match: "เรื่องบทบาทของมหาวิทยาลัยไทยในการสื่อสารสิ่งแวดล้อม", href: "/research/thai-universities-environmental-communication" }],
        },
        {
          kind: "p",
          text: "ในงานจริงของศูนย์ฯ บทบาทเหล่านี้ต่างกันไปตามโจทย์ เช่น การอบรมบุคลากรสาธารณสุขทั่วประเทศกว่า 10,000 คนในโครงการ Care D Plus การจัดเวิร์กช็อปการสื่อสารเพื่อการพัฒนาที่ยั่งยืนร่วมกับองค์การแรงงานระหว่างประเทศ และการสำรวจความพึงพอใจของผู้รับบริการให้สำนักงานนวัตกรรมแห่งชาติ โดยใช้ทั้งการวิจัยเชิงปริมาณและเชิงคุณภาพ",
          links: [{ match: "โครงการ Care D Plus", href: "/impact/care-d-plus" }],
        },
        { kind: "h2", text: "ศูนย์วิจัยที่ดีต้องกล้าบอกด้วยว่าอะไรไม่ได้ผล" },
        {
          kind: "p",
          text: "งานประเมินเทศกาล Pint of Science ในกรุงเทพฯ (ตีพิมพ์ปี 2562 เก็บข้อมูลปี 2561) ที่ ดร.พยู ฮนิน ไหล่ ร่วมเขียน เป็นตัวอย่างของการรายงานผลอย่างตรงไปตรงมา ผู้ร่วมงานให้คะแนนรวมสูงถึง 35 จาก 40 แต่งานเดียวกันก็บอกด้วยว่างานแบบนี้ยังไปไม่ถึงคนที่ไม่ได้สนใจวิทยาศาสตร์อยู่ก่อน คืนที่บรรยายเป็นภาษาไทยมีคนลงทะเบียนน้อยที่สุด เพียง 13 คน จากทั้งหมด 267 คนตลอดหกวัน ข้อมูลแบบนี้มีประโยชน์กับผู้จัดมากกว่าคะแนนความพึงพอใจสูงๆ",
          links: [{ match: "งานประเมินเทศกาล Pint of Science ในกรุงเทพฯ", href: "/research/pint-of-science-thailand" }],
        },
        { kind: "h2", text: "เริ่มทำงานกับศูนย์วิจัยอย่างไรให้คุ้ม" },
        {
          kind: "tips",
          items: [
            {
              title: "มาพร้อมโจทย์ ไม่ใช่แค่รายการชิ้นงาน",
              text: "เล่าให้ฟังว่าอยากให้ใครเปลี่ยนอะไร และตอนนี้รู้อะไรเกี่ยวกับคนกลุ่มนั้นแล้วบ้าง แล้วค่อยเลือกชิ้นงานที่เหมาะจากคำตอบนั้น",
            },
            {
              title: "กันงบสำหรับการวัดผลตั้งแต่วันแรก",
              text: "ตกลงกันก่อนเริ่มงานว่าจะวัดอะไร ทั้งจำนวนคนที่เห็นและสิ่งที่คนทำจริง และทำใจไว้ล่วงหน้าว่าผลอาจไม่เป็นอย่างที่หวัง",
            },
            {
              title: "ให้กลุ่มเป้าหมายมีส่วนร่วมตั้งแต่ต้น",
              text: "เวลาที่ใช้สร้างความไว้วางใจและชวนคนในพื้นที่มาร่วมไม่ใช่การเสียเวลา แต่เป็นขั้นที่ผู้เชี่ยวชาญให้คะแนนสูงที่สุด",
            },
            {
              title: "ตกลงกันว่าจะเผยแพร่ผลอย่างไร",
              text: "คุยกันตั้งแต่ต้นว่าจะเผยแพร่ข้อค้นพบในรูปแบบไหน เพื่อให้หน่วยงานอื่นที่ทำเรื่องเดียวกันได้เรียนรู้จากโครงการนี้ด้วย",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "แบบจำลอง ENGAGE-A3 ประเมินจากความเห็นของผู้เชี่ยวชาญสิบคน ยังไม่ได้วัดผลด้านสุขภาพในพื้นที่จริง บทเรื่องบทบาทของมหาวิทยาลัยเป็นการมองภาพรวมของผู้เขียนคนเดียว ไม่ใช่การทบทวนงานวิจัยอย่างเป็นระบบ ส่วนงาน Pint of Science เก็บข้อมูลปี 2561 จากผู้ร่วมงาน 125 คน และความรู้ที่ได้เป็นสิ่งที่ผู้ร่วมงานประเมินตัวเองหลังจบงาน ไม่ได้ทดสอบจริง",
        },
        { kind: "h2", text: "ชิ้นงานจบในสามเดือน บทเรียนอยู่ได้นานกว่านั้น" },
        {
          kind: "p",
          text: "ศูนย์วิจัยในมหาวิทยาลัยผลิตชิ้นงานได้ แต่สิ่งที่หาจากที่อื่นได้ยากกว่าคือโจทย์ที่ชัด หลักฐานสำหรับใช้ออกแบบ และการวัดผลอย่างซื่อตรง หน่วยงานที่ได้สามอย่างนี้กลับไปจะทำโครงการต่อไปได้ดีขึ้น แม้ไม่มีเราอยู่ด้วยก็ตาม",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังมองหาคู่ทำงานด้านการวิจัยและการสื่อสาร ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "What you get from working with a university research centre, beyond the deliverables",
      dek: "Many organisations come to a research centre for deliverables. But what a research centre offers most often happens before and after them: a question framed clearly from the start, and evaluation honest enough to say what did not work.",
      coverAlt:
        "Paper-craft illustration on cream paper: an arch of navy paper blocks with a single red keystone at the top",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Ton (a fictional character) is a project manager at an agency. He has a three-month budget and needs two campaign videos and an evaluation report. He calls a university research centre with his list of deliverables, but the first question he gets back is: \"Who do you want to do something differently, and how will you know they have?\"",
        },
        {
          kind: "p",
          text: "That question can sound slow, but it is what a university research centre offers that a typical media producer does not. This article draws on research and past work to show where the difference lies.",
        },
        { kind: "h2", text: "What matters most happens before the first deliverable" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima and colleagues (published in 2022) proposed the ENGAGE-A3 model for HIV risk communication with migrant workers and asked ten experts to rate each step. Earning trust and gamification scored highest at 4.45 out of 5, followed by getting local help at 4.36. Evaluation scored lowest, at 4.18.",
          links: [{ match: "proposed the ENGAGE-A3 model", href: "/en/research/engage-a3-model" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Experts rated earning trust highest and evaluation lowest",
            subtitle: "Mean appropriateness rating from 10 experts (out of 5) · selected components of the ENGAGE-A3 model",
            alt: "Bar chart of appropriateness ratings in the ENGAGE-A3 model: earning trust 4.45, gamification 4.45, getting local help 4.36, overall 4.26, evaluation 4.18, out of 5",
            source: "Source: Boonchutima, Sukonthasab and Sthapitanonda (2022), HIV & AIDS Review · expert focus group, n = 10",
            unit: " of 5",
            data: [
              { label: "Earning trust", value: 4.45, highlight: true },
              { label: "Gamification", value: 4.45 },
              { label: "Getting local help", value: 4.36 },
              { label: "Overall", value: 4.26 },
              { label: "Evaluation", value: 4.18 },
            ],
          },
        },
        {
          kind: "p",
          text: "The ordering says two things. First, what the experts valued most happens before any material exists. Second, even among experts, evaluation was the lowest-rated step, which matches what we often see in practice: evaluation is left to the end and gets the smallest share of the budget.",
        },
        { kind: "h2", text: "Universities can play many roles; choose one clearly" },
        {
          kind: "p",
          text: "A book chapter by Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2024) on the role of Thai universities in environmental communication sets out six roles: educator, knowledge creator, societal problem-solver, innovator, connector and agent of change. It places PR evaluation at four levels, from outputs to final impact. It is a conceptual chapter and the proposals are the author's, but it gives agencies a framework for agreeing with a research centre which role a project needs.",
          links: [{ match: "on the role of Thai universities in environmental communication", href: "/en/research/thai-universities-environmental-communication" }],
        },
        {
          kind: "p",
          text: "In the centre's own work these roles show up differently depending on the brief: training more than 10,000 health workers nationwide in the Care D Plus project, a workshop on communication for sustainable development with the International Labour Organization, and a mixed-methods satisfaction survey for the National Innovation Agency.",
          links: [{ match: "the Care D Plus project", href: "/en/impact/care-d-plus" }],
        },
        { kind: "h2", text: "A good research centre also tells you what did not work" },
        {
          kind: "p",
          text: "An evaluation of the Pint of Science festival in Bangkok (published in 2019, data collected in 2018), co-authored by Dr Phyu Hnin Hlaing, is a good example of candid reporting. Attendees gave it a high overall score of 35 out of 40, yet the same study says the format had not reached anyone outside the circle of people already interested in science. The Thai-language night drew the fewest registrations, just 13 of 267 across six days. Knowing that is worth more to organisers than a high satisfaction score.",
          links: [{ match: "An evaluation of the Pint of Science festival in Bangkok", href: "/en/research/pint-of-science-thailand" }],
        },
        { kind: "h2", text: "How to start working with a research centre and get the most from it" },
        {
          kind: "tips",
          items: [
            {
              title: "Bring a question, not a list of deliverables",
              text: "Explain who you want to change what, and what you already know about that group. The right deliverables follow from the answer.",
            },
            {
              title: "Budget for evaluation from day one",
              text: "Agree indicators before work begins, covering both reach and what people actually do, and accept in advance that the results may not be what you hoped.",
            },
            {
              title: "Give the audience a seat in the project",
              text: "Time spent earning trust and bringing local people in is not a delay; it is the step experts rated highest.",
            },
            {
              title: "Agree how results will be shared",
              text: "Discuss early how findings will be published, so the project's lessons reach other organisations working on the same issue.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "The ENGAGE-A3 model was rated by ten experts and does not measure health outcomes in the field. The chapter on universities' roles is one author's overview, not a systematic review. The Pint of Science study collected data in 2018 from 125 attendees, and knowledge gained was self-assessed after the event, not tested.",
        },
        { kind: "h2", text: "Deliverables end in three months; the lessons last longer" },
        {
          kind: "p",
          text: "A university research centre can produce deliverables, but what is harder to find elsewhere is a clearly framed question, evidence to design from and honest evaluation. Organisations that take those three things away will run their next project better, even without us.",
        },
        {
          kind: "note",
          text: "If your organisation is looking for a partner in research and communication, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
    },
  },
  {
    slug: "creator-credibility-purchase",
    date: "2026-10-31",
    author: SMITH,
    palette: [8, 12],
    cover: "/images/insights/creator-credibility-purchase-hero",
    evidence: [
      "vtuber-streamer-purchase-intention",
      "game-influencer-credibility",
      "fansub-viewers-sponsorship",
      "genz-cruelty-free-purchase",
      "brand-attitude-congruence-purchase",
    ],
    th: {
      title: "คนดูเยอะ ไม่ได้แปลว่าคนจะซื้อ: ทำงานกับครีเอเตอร์ให้คนเชื่อจริง",
      dek: "งานวิจัยห้าชิ้นเรื่องครีเอเตอร์ ผู้สนับสนุน และจุดยืนของแบรนด์ ให้คำตอบตรงกันว่า ยอดผู้ติดตามบอกได้แค่ว่ามีคนเห็น แต่สิ่งที่ทำให้คนเชื่อและอยากซื้อ คือครีเอเตอร์ สินค้า และคนดูต้องเข้ากัน",
      coverAlt: "ภาพประกอบกระดาษ ถุงช้อปปิ้งสีแดงเลือดหมูบนพื้นกระดาษสีครีม มีป้ายรูปหัวใจสีทองห้อยอยู่ที่หูถุง",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "Rakuten Insight via Statista. (2023, June 12). Share of people who followed influencers on social media in Thailand as of May 2023. เข้าถึงเมื่อ 31 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1202049/thailand-share-of-people-following-influencers/",
        },
        {
          text: "Rakuten Insight via Statista. (2023, June 12). Share of people who have purchased a product endorsed by an influencer in Thailand as of May 2023. เข้าถึงเมื่อ 31 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1202107/thailand-influencers-impact-on-purchasing/",
        },
      ],
      body: [
        {
          kind: "p",
          text: "แพร (ตัวละครสมมติ) ดูแลการตลาดให้แบรนด์หูฟังเกมมิ่ง เธอใช้งบที่มีจ้างสตรีมเมอร์ที่มีคนติดตามมากที่สุด คลิปรีวิวมียอดดูสูงกว่าที่ตั้งเป้าไว้ แต่ยอดขายในเดือนนั้นแทบไม่ขยับ เธอเริ่มสงสัยว่าเลือกคนผิด หรือวัดผลผิดมาตั้งแต่ต้น",
        },
        {
          kind: "p",
          text: "คนทำแบรนด์หลายคนคงเคยสงสัยแบบเดียวกับแพร งานวิจัยห้าชิ้นในบทความนี้ศึกษาทั้งคนดูเกม คนดูคอร์สออนไลน์ และผู้บริโภครุ่นใหม่ แล้วได้คำตอบไปในทางเดียวกัน",
        },
        {
          kind: "p",
          text: "ครีเอเตอร์มีอิทธิพลกับคนไทยจริง จากผลสำรวจออนไลน์ของ Rakuten Insight เมื่อเดือนพฤษภาคม 2566 (เผยแพร่ผ่าน Statista) คนไทยราว 82% ติดตามอินฟลูเอนเซอร์อย่างน้อยหนึ่งคน และราว 81% บอกว่าเคยซื้อของเพราะอินฟลูเอนเซอร์แนะนำ โจทย์จึงไม่ใช่ว่าควรใช้ครีเอเตอร์ไหม แต่คือจะเลือกใคร และจะวัดผลอย่างไร",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คนไทยแปดในสิบตามอินฟลูเอนเซอร์ และเคยซื้อตาม",
            subtitle: "สัดส่วนผู้ตอบแบบสำรวจออนไลน์อายุ 16 ปีขึ้นไป · ประเทศไทย 11–31 พฤษภาคม 2566 · สองคำถามมีจำนวนผู้ตอบต่างกัน",
            alt: "กราฟแท่งแสดงสัดส่วนคนไทยที่ติดตามอินฟลูเอนเซอร์อย่างน้อยหนึ่งคน 81.93% จากผู้ตอบ 21,494 คน และเคยซื้อสินค้าเพราะอินฟลูเอนเซอร์แนะนำ 80.94% จากผู้ตอบ 17,621 คน",
            source: "ที่มา: Rakuten Insight via Statista, 2023 · สำรวจออนไลน์ 21,494 และ 17,621 คน",
            guess: "เคยซื้อสินค้าเพราะอินฟลูเอนเซอร์แนะนำ",
            prompt: "ลองทายก่อน: คนไทยกี่เปอร์เซ็นต์บอกว่าเคยซื้อสินค้าเพราะอินฟลูเอนเซอร์แนะนำ",
            answerNote: "เกือบเท่ากับสัดส่วนคนที่ติดตามอินฟลูเอนเซอร์",
            data: [
              { label: "ติดตามอินฟลูเอนเซอร์อย่างน้อยหนึ่งคน", value: 81.93 },
              { label: "เคยซื้อสินค้าเพราะอินฟลูเอนเซอร์แนะนำ", value: 80.94 },
            ],
          },
        },
        { kind: "h2", text: "คนดูแต่ละกลุ่มเชื่อครีเอเตอร์ด้วยเหตุผลต่างกัน" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา และ Surakanon (ตีพิมพ์ปี 2566) สำรวจผู้เล่นเกมหญิงชาวไทย 686 คน แล้วเทียบครีเอเตอร์สายเกมสองแบบ คือวีทูปเบอร์ที่เป็นตัวละครเสมือน กับสตรีมเมอร์ที่เป็นคนจริง ผลออกมากลับกัน คนดูอยากซื้อของที่วีทูปเบอร์แนะนำเพราะเห็นว่ารู้จริง แต่กับสตรีมเมอร์ ความรู้กลับไม่มีผลเลย สิ่งที่ได้ผลคือความไว้ใจและเสน่ห์ของตัวคน",
          links: [{ match: "สำรวจผู้เล่นเกมหญิงชาวไทย 686 คน", href: "/research/vtuber-streamer-purchase-intention" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "วีทูปเบอร์ขายได้เพราะรู้จริง สตรีมเมอร์ขายได้เพราะคนไว้ใจ",
            subtitle: "แต่ละปัจจัยบอกได้แค่ไหนว่าคนดูจะอยากซื้อ (ค่า β ยิ่งสูง ยิ่งบอกได้แม่น) · ผู้เล่นเกมหญิงชาวไทย 686 คน",
            alt: "กราฟแท่งแสดงว่าความน่าเชื่อถือแต่ละด้านบอกความอยากซื้อได้แค่ไหน วีทูปเบอร์: ความรู้ความเชี่ยวชาญ 0.42 ความไว้ใจ 0.26 หน้าตาและเสน่ห์ 0.11 ซึ่งไม่มีผล สตรีมเมอร์: ความไว้ใจ 0.44 หน้าตาและเสน่ห์ 0.23 ความรู้ความเชี่ยวชาญ 0.04 ซึ่งไม่มีผล",
            source: "ที่มา: Boonchutima และ Surakanon (2023) Basic and Applied Social Psychology · สำรวจ 686 คน",
            unit: "",
            data: [
              { label: "วีทูปเบอร์ · ความรู้ความเชี่ยวชาญ", value: 0.42, highlight: true },
              { label: "วีทูปเบอร์ · ความไว้ใจ", value: 0.26 },
              { label: "วีทูปเบอร์ · หน้าตาและเสน่ห์ (ไม่มีผล)", value: 0.11 },
              { label: "สตรีมเมอร์ · ความไว้ใจ", value: 0.44, highlight: true },
              { label: "สตรีมเมอร์ · หน้าตาและเสน่ห์", value: 0.23 },
              { label: "สตรีมเมอร์ · ความรู้ความเชี่ยวชาญ (ไม่มีผล)", value: 0.04 },
            ],
          },
        },
        {
          kind: "p",
          text: "งานเดียวกันยังพบว่าแฟนตัวจริงของวงการเกมดูที่ความรู้เป็นหลัก ส่วนคนดูทั่วไปดูที่เสน่ห์ของตัวคนมากกว่า ก่อนเลือกครีเอเตอร์ จึงต้องรู้ให้ได้ก่อนว่าแคมเปญนี้พูดกับใคร",
        },
        { kind: "h2", text: "ชอบดู ไม่ได้แปลว่าจะซื้อ" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา และ Sankosik (ตีพิมพ์ปี 2565) สำรวจผู้ติดตามยูทูบเบอร์สายเกมรายใหญ่ระดับโลกคนหนึ่ง 238 คน พบว่าแม้จะดูกันเป็นประจำ แต่ความอยากซื้อเกมที่ยูทูบเบอร์คนนั้นเล่นก็อยู่แค่กลางๆ ราว 3.1 ถึง 3.5 จาก 5 และในบรรดาเหตุผลที่ทำให้คนเชื่อ ความไว้ใจสำคัญที่สุด",
          links: [{ match: "สำรวจผู้ติดตามยูทูบเบอร์สายเกมรายใหญ่ระดับโลกคนหนึ่ง 238 คน", href: "/research/game-influencer-credibility" }],
        },
        { kind: "h2", text: "ชอบเนื้อหาแล้วจะชอบแบรนด์ตามไปด้วย แต่ไม่เต็มร้อย" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา และ Lou (ตีพิมพ์ปี 2565) ศึกษาผู้ชมชาวจีน 216 คนที่ดูคอร์สเรียนออนไลน์ซึ่งแฟนคลับแปลซับให้ฟรีโดยมีแบรนด์เป็นสปอนเซอร์ คนดูไม่ได้รู้สึกว่าถูกยัดเยียดโฆษณา และรู้สึกดีกับแบรนด์ที่สนับสนุนจริง แต่ก็ยังรู้สึกดีน้อยกว่าที่รู้สึกกับตัวคอร์สอยู่พอสมควร",
          links: [{ match: "ศึกษาผู้ชมชาวจีน 216 คน", href: "/research/fansub-viewers-sponsorship" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คนดูชอบคอร์สมาก และชอบแบรนด์ผู้สนับสนุนรองลงมา",
            subtitle: "คะแนนเฉลี่ย (เต็ม 5) ของผู้ชมคอร์สออนไลน์ที่แฟนคลับแปลซับ · ผู้ชมชาวจีน 216 คน",
            alt: "กราฟแท่งแสดงคะแนนเฉลี่ยจากเต็ม 5 คอร์สมีคุณค่า 4.35 แบรนด์มาสนับสนุนอย่างจริงใจ 4.01 แบรนด์เข้ากับเนื้อหา 3.84 ภาพลักษณ์แบรนด์ดีขึ้น 3.78 และชอบแบรนด์มากขึ้นกว่าเดิม 3.69",
            source: "ที่มา: Boonchutima และ Lou (2022) Cogent Education · สำรวจ 216 คน",
            unit: " จาก 5",
            guess: "ชอบแบรนด์มากขึ้นกว่าเดิม",
            prompt: "ลองทายก่อน: หลังดูคอร์ส คนดูชอบแบรนด์ผู้สนับสนุนมากขึ้นแค่ไหน (เต็ม 5)",
            guessMax: 5,
            answerNote: "ต่ำที่สุดในห้าข้อ แต่ก็ยังเกินครึ่ง",
            data: [
              { label: "คอร์สมีคุณค่า", value: 4.35 },
              { label: "แบรนด์มาสนับสนุนอย่างจริงใจ", value: 4.01 },
              { label: "แบรนด์เข้ากับเนื้อหา", value: 3.84 },
              { label: "ภาพลักษณ์แบรนด์ดีขึ้น", value: 3.78 },
              { label: "ชอบแบรนด์มากขึ้นกว่าเดิม", value: 3.69 },
            ],
          },
        },
        {
          kind: "p",
          text: "สิ่งที่คนดูให้คะแนนสูงคือแบรนด์มาอย่างจริงใจ และเข้ากับเนื้อหา ทั้งสองเรื่องนี้ต้องคิดตั้งแต่ตอนเลือกว่าจะไปสนับสนุนอะไร ซื้อสื่อเพิ่มทีหลังก็แก้ไม่ได้",
        },
        { kind: "h2", text: "เห็นด้วยกับสิ่งที่แบรนด์ยืนหยัด ยังไม่พอให้ควักกระเป๋า" },
        {
          kind: "p",
          text: "งานของ Lounporn และ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2566) สำรวจคนไทยเจนซี 400 คนเรื่องสินค้าที่ไม่ทดลองกับสัตว์ คนตอบให้ความสำคัญกับการดูแลสัตว์และธรรมชาติสูงถึง 4.65 จาก 5 แต่สิ่งที่บอกได้ดีที่สุดว่าใครจะซื้อจริงคือความภักดีต่อแบรนด์ และข้อที่ได้คะแนนต่ำสุดในเรื่องนี้คือ จะยังซื้อต่อแม้ราคาขึ้น คนพร้อมบอกต่อ แต่ไม่พร้อมจ่ายแพงขึ้นเอง",
          links: [{ match: "สำรวจคนไทยเจนซี 400 คนเรื่องสินค้าที่ไม่ทดลองกับสัตว์", href: "/research/genz-cruelty-free-purchase" }],
        },
        {
          kind: "p",
          text: "งานของ Lamoonpot รศ.ดร.สมิทธิ์ บุญชุติมา และ ดร.มุฮัมมัด อิบเตซาม มาซาฮีร์ (ตีพิมพ์ปี 2567) กับนิสิตนักศึกษา 434 คน ก็ได้ผลไปทางเดียวกัน ข้อที่ได้คะแนนสูงที่สุดคือ จะเลือกซื้อแบรนด์ที่มีจุดยืนตรงกับตัวเอง (5.74 จาก 7) แต่เมื่อดูภาพรวมทั้งหมด จุดยืนที่ตรงกันเป็นแค่ตัวเสริม พื้นฐานที่ต้องมีก่อนคือคนรู้จักแบรนด์ ภาพลักษณ์ดี และแบรนด์ทำได้จริงตามที่โฆษณา",
          links: [{ match: "กับนิสิตนักศึกษา 434 คน", href: "/research/brand-attitude-congruence-purchase" }],
        },
        { kind: "h2", text: "สี่ข้อก่อนเลือกครีเอเตอร์ครั้งหน้า" },
        {
          kind: "tips",
          items: [
            {
              title: "รู้ก่อนว่าคนดูเป็นแฟนตัวจริงหรือคนทั่วไป",
              text: "ถ้าคนดูเป็นแฟนตัวจริงของวงการ ให้เลือกคนที่รู้เรื่องสินค้าจริงและให้เขาได้โชว์ความรู้ ถ้าเป็นคนทั่วไป ความคุ้นเคยและเสน่ห์ของตัวคนจะได้ผลมากกว่า",
            },
            {
              title: "เลือกจากความเข้ากัน ไม่ใช่จากยอดผู้ติดตาม",
              text: "ถามตัวเองก่อนว่าสินค้าเข้ากับเนื้อหาที่เขาทำอยู่ไหม และคนดูจะเชื่อหรือเปล่าว่าเขาแนะนำด้วยใจจริง สองข้อนี้ต้องคิดตั้งแต่ตอนเลือกคน",
            },
            {
              title: "ขายอุดมการณ์ ต้องมีเหตุผลที่จับต้องได้มาด้วย",
              text: "เรื่องอุดมการณ์ช่วยให้คนเชียร์ แต่ถ้าสินค้าแพงกว่าหรือหาซื้อยาก คนจำนวนมากจะไปไม่ถึงขั้นจ่ายเงิน ต้องมีโปรโมชันและช่องทางซื้อที่สะดวกมาด้วย",
            },
            {
              title: "วัดยอดขายหรือการคลิกซื้อ ไม่ใช่แค่ยอดดู",
              text: "ตั้งตัวชี้วัดให้ใกล้การซื้อจริงที่สุด เช่น จำนวนคนที่ใช้โค้ดส่วนลด หรือคลิกเข้าหน้าร้าน เพราะงานวิจัยทั้งห้าชิ้นวัดแค่ความอยากซื้อ ซึ่งยังไม่ใช่การซื้อจริง",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งานทั้งห้าชิ้นวัดความอยากซื้อที่คนตอบบอกเอง ไม่ได้วัดยอดขายจริง และเก็บข้อมูลครั้งเดียว จึงบอกได้ว่าอะไรมักมาคู่กัน แต่บอกไม่ได้ว่าอะไรเป็นต้นเหตุ งานวีทูปเบอร์เก็บข้อมูลจากผู้เล่นเกมหญิงเท่านั้น และใช้ครีเอเตอร์แค่สองคน งานยูทูบเบอร์สายเกมศึกษาเฉพาะผู้ติดตามของยูทูบเบอร์คนเดียว และคนตอบส่วนใหญ่เป็นผู้ชาย งานแปลซับเก็บข้อมูลจากแฟนคลับกลุ่มเดียว และเป็นเฉพาะคนที่ยังติดตามอยู่ งานเจนซีมีคนตอบเป็นผู้หญิงถึง 84.7% ส่วนงานจุดยืนของแบรนด์ศึกษาแบรนด์อสังหาริมทรัพย์แบรนด์เดียว กับนิสิตที่ส่วนใหญ่ยังไม่ได้เป็นลูกค้าสินค้าประเภทนี้ สถิติจาก Rakuten Insight ก็เป็นการสำรวจออนไลน์ปี 2566 และการเคยซื้อตามคำแนะนำเป็นสิ่งที่คนตอบบอกเอง",
        },
        { kind: "h2", text: "เลือกคนที่คนดูเชื่อ แล้ววัดจากสิ่งที่คนดูทำ" },
        {
          kind: "p",
          text: "ยอดผู้ติดตามบอกได้แค่ว่ามีคนเห็นมากแค่ไหน แต่คนจะเชื่อก็ต่อเมื่อครีเอเตอร์ สินค้า และคนดูเข้ากัน แคมเปญที่ได้ผลจึงเริ่มจากการรู้จักคนดู เลือกคนที่เขาเชื่อด้วยเหตุผลที่ตรงกับกลุ่มนั้น แล้ววัดผลให้ใกล้การซื้อจริงที่สุด",
        },
        {
          kind: "note",
          text: "หากแบรนด์หรือเอเจนซีของคุณกำลังวางแผนทำงานกับครีเอเตอร์ ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "A big audience is not a buying audience: working with creators people actually believe",
      dek: "Five studies of creators, sponsorship and brand stance point the same way. Follower counts tell you how many people saw something. What makes people believe and want to buy is the fit between the creator, the product and that particular audience.",
      coverAlt: "Paper-craft illustration on cream paper: a burgundy shopping bag with a gold heart-shaped tag hanging from its handle",
      coverCaption: "Illustration generated with AI",
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "Rakuten Insight via Statista. (2023, June 12). Share of people who followed influencers on social media in Thailand as of May 2023. Accessed 31 October 2026.",
          url: "https://www.statista.com/statistics/1202049/thailand-share-of-people-following-influencers/",
        },
        {
          text: "Rakuten Insight via Statista. (2023, June 12). Share of people who have purchased a product endorsed by an influencer in Thailand as of May 2023. Accessed 31 October 2026.",
          url: "https://www.statista.com/statistics/1202107/thailand-influencers-impact-on-purchasing/",
        },
      ],
      body: [
        {
          kind: "p",
          text: "Prae (a fictional character) runs marketing for a gaming headset brand. She hired the streamer with the biggest following her budget allowed. The review clip beat its view target, but sales that month barely moved. She began to wonder whether she had picked the wrong person, or measured the wrong thing from the start.",
        },
        {
          kind: "p",
          text: "Brand teams ask Prae's question all the time. The five studies brought together here look at gaming audiences, viewers of online courses and young consumers, and their answers line up in an interesting way.",
        },
        {
          kind: "p",
          text: "Creators clearly matter to Thai consumers. An online survey by Rakuten Insight in May 2023, published via Statista, found that about 82% of Thais follow at least one influencer, and about 81% say they have bought a product because an influencer recommended it. So the question is not whether to work with creators, but whom to choose and how to measure the result.",
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Eight in ten Thais follow influencers, and have bought on their word",
            subtitle: "Share of online survey respondents aged 16 and over · Thailand, 11–31 May 2023 · the two questions had different numbers of respondents",
            alt: "Bar chart: 81.93% of Thais follow at least one influencer (21,494 respondents) and 80.94% have bought a product an influencer recommended (17,621 respondents)",
            source: "Source: Rakuten Insight via Statista, 2023 · online surveys of 21,494 and 17,621 people",
            guess: "Have bought on an influencer's recommendation",
            prompt: "Guess first: what share of Thais say they have bought a product because an influencer recommended it?",
            answerNote: "Almost the same as the share who follow influencers.",
            data: [
              { label: "Follow at least one influencer", value: 81.93 },
              { label: "Have bought on an influencer's recommendation", value: 80.94 },
            ],
          },
        },
        { kind: "h2", text: "Different audiences trust creators for different reasons" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima and Surakanon (published in 2023) surveyed 686 Thai female gamers and compared two kinds of gaming creator: a VTuber, who is a virtual character, and a streamer, who is a real person. The results ran in opposite directions. Viewers wanted to buy what the VTuber recommended because they saw real knowledge. For the streamer, knowledge made no difference at all; what worked was trust and personal appeal.",
          links: [{ match: "surveyed 686 Thai female gamers", href: "/en/research/vtuber-streamer-purchase-intention" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "VTubers sell on knowledge, streamers sell on trust",
            subtitle: "Weight of each factor in predicting whether viewers want to buy (β — higher means it predicts more) · 686 Thai female gamers",
            alt: "Bar chart of how strongly each credibility factor predicts purchase intention. VTuber: expertise 0.42, trust 0.26, appeal 0.11 (no effect). Streamer: trust 0.44, appeal 0.23, expertise 0.04 (no effect)",
            source: "Source: Boonchutima and Surakanon (2023), Basic and Applied Social Psychology · survey of 686 people",
            unit: "",
            data: [
              { label: "VTuber · expertise", value: 0.42, highlight: true },
              { label: "VTuber · trust", value: 0.26 },
              { label: "VTuber · appeal (no effect)", value: 0.11 },
              { label: "Streamer · trust", value: 0.44, highlight: true },
              { label: "Streamer · appeal", value: 0.23 },
              { label: "Streamer · expertise (no effect)", value: 0.04 },
            ],
          },
        },
        {
          kind: "p",
          text: "The same study found that committed fans of the scene weighted knowledge most, while general viewers weighted personal appeal more. Before choosing a creator, you need to know who the campaign's audience actually is.",
        },
        { kind: "h2", text: "Watching is not buying" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima and Sankosik (published in 2022) surveyed 238 followers of one of the world's largest gaming YouTubers. Even among regular viewers, intention to buy the games he played sat around the middle of the scale, roughly 3.1 to 3.5 out of 5. Taking credibility as a whole, trust was its core.",
          links: [{ match: "surveyed 238 followers of one of the world's largest gaming YouTubers", href: "/en/research/game-influencer-credibility" }],
        },
        { kind: "h2", text: "Goodwill passes from content to sponsor, but not all of it" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima and Lou (published in 2022) surveyed 216 Chinese viewers of online courses that a fan group subtitles for free, with brand sponsorship. Viewers did not see the sponsorship as intrusive advertising and did feel warmly toward the sponsors, but noticeably less warmly than toward the courses themselves.",
          links: [{ match: "surveyed 216 Chinese viewers", href: "/en/research/fansub-viewers-sponsorship" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Viewers loved the courses, and liked the sponsors a step less",
            subtitle: "Mean scores (out of 5) from viewers of fan-subtitled online courses · 216 Chinese viewers",
            alt: "Bar chart of mean scores out of 5: the course is valuable 4.35, the sponsorship is sincere 4.01, the brand fits the content 3.84, the brand's image improved 3.78, I like the brand more than before 3.69",
            source: "Source: Boonchutima and Lou (2022), Cogent Education · survey of 216 people",
            unit: " of 5",
            guess: "I like the brand more than before",
            prompt: "Guess first: after watching, how much more did viewers like the sponsoring brand (out of 5)?",
            guessMax: 5,
            answerNote: "The lowest of the five, but still above the midpoint.",
            data: [
              { label: "The course is valuable", value: 4.35 },
              { label: "The sponsorship is sincere", value: 4.01 },
              { label: "The brand fits the content", value: 3.84 },
              { label: "The brand's image improved", value: 3.78 },
              { label: "I like the brand more than before", value: 3.69 },
            ],
          },
        },
        {
          kind: "p",
          text: "What viewers rated highly was sincerity and fit with the content. Both are settled when you choose what to sponsor. Buying more media afterwards cannot fix them.",
        },
        { kind: "h2", text: "Values bring people to the shelf, but not to the till" },
        {
          kind: "p",
          text: "A study by Lounporn and Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2023) surveyed 400 Thai Gen Z consumers about cruelty-free products. Care for animals and nature scored as high as 4.65 out of 5, yet the best predictor of who would buy was brand loyalty, and the lowest-scoring loyalty item was buying again after a price rise. People were ready to recommend, but not to pay more themselves.",
          links: [{ match: "surveyed 400 Thai Gen Z consumers about cruelty-free products", href: "/en/research/genz-cruelty-free-purchase" }],
        },
        {
          kind: "p",
          text: "A study by Lamoonpot, Assoc. Prof. Dr Smith Boonchutima and Dr Muhammad Ibtesam Mazahir (published in 2024) with 434 university students points the same way. The highest-scoring item was buying from brands whose stance matches one's own, at 5.74 out of 7. But across the whole path, a shared stance was only a supplement. The base that has to come first is awareness, a good image and a brand that delivers what it advertises.",
          links: [{ match: "with 434 university students", href: "/en/research/brand-attitude-congruence-purchase" }],
        },
        { kind: "h2", text: "Four points before you choose your next creator" },
        {
          kind: "tips",
          items: [
            {
              title: "Know whether the audience is committed or general",
              text: "For committed fans of the scene, choose someone who genuinely knows the product and let them show it. For a general audience, familiarity and personal appeal do more of the work.",
            },
            {
              title: "Choose on fit, not on follower count",
              text: "Ask whether the product fits what this person already makes, and whether viewers will believe the recommendation is sincere. Both are decided at the point of choosing.",
            },
            {
              title: "Pair values with practical reasons",
              text: "Values earn applause, but if the product costs more or is hard to find, many people will not get as far as paying. Promotions and convenient places to buy have to come with it.",
            },
            {
              title: "Measure sales or clicks to buy, not just views",
              text: "Set indicators close to real purchase, such as discount-code use or clicks through to the shop. All five studies measured intention to buy, which is not the same as buying.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "All five studies measure self-reported intention to buy, not actual sales, and each is a single snapshot, so they show which factors go together, not what causes what. The VTuber study surveyed female gamers only and used just two creators. The gaming YouTuber study looked at one creator's followers, most of them men. The fansub study drew on a single fan group of people who were still following it. The Gen Z study's respondents were 84.7% women. The brand-stance study covered one property brand, with students most of whom are not yet buyers in that category. The Rakuten Insight figures come from a 2023 online survey, and having bought on a recommendation is what respondents said themselves.",
        },
        { kind: "h2", text: "Choose who the audience believes, then measure what the audience does" },
        {
          kind: "p",
          text: "Follower counts tell you how many people saw something. Belief comes from the fit between creator, product and audience. Campaigns that work start by knowing the audience, choose someone that audience trusts for the right reasons, and measure as close to the real purchase as possible.",
        },
        {
          kind: "note",
          text: "If your brand or agency is planning to work with creators, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
    },
  },
  {
    slug: "crisis-communication-trust",
    date: "2026-10-31",
    author: SMITH,
    palette: [16, 3],
    cover: "/images/insights/crisis-communication-trust-hero",
    evidence: ["covid-official-communication-credibility", "tv-crisis-communication-korat", "nodam-maewong-framing"],
    th: {
      title: "ยามวิกฤต คนเชื่อสิ่งที่เห็น มากกว่าสิ่งที่ได้ยิน",
      dek: "งานวิจัยสามชิ้นตั้งแต่โควิด-19 เหตุจับตัวประกัน จนถึงการรณรงค์ค้านเขื่อน ชี้ว่ายามวิกฤต คนจะเชื่อหรือไม่ ไม่ได้ขึ้นกับว่าใครพูด แต่ขึ้นกับผลที่เขาเห็น การกล้ายอมรับเมื่อพลาด และข้อเท็จจริงที่เขาส่งต่อได้",
      coverAlt: "ภาพประกอบกระดาษ ประภาคารสีน้ำเงินที่ซ้อนจากแถบกระดาษหลายชั้น มีห้องโคมสีเขียวอยู่บนยอด บนพื้นกระดาษสีครีม",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      referencesTitle: "ข้อมูลประกอบจาก Statista",
      references: [
        {
          text: "Reuters Institute for the Study of Journalism, YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026. เข้าถึงเมื่อ 31 ตุลาคม 2569",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/",
        },
      ],
      body: [
        {
          kind: "p",
          text: "คุณต้น (ตัวละครสมมติ) เป็นหัวหน้าฝ่ายสื่อสารของหน่วยงานแห่งหนึ่ง ระหว่างเกิดเหตุฉุกเฉิน ทีมของเขาออกแถลงการณ์ทุกวัน ข้อมูลถูกต้องทุกบรรทัด แต่ยิ่งออกแถลงการณ์มากเท่าไร คนในโซเชียลมีเดียก็ยิ่งตั้งคำถามมากขึ้น เขาไม่แน่ใจว่าปัญหาอยู่ที่ถ้อยคำ หรืออยู่ที่อื่น",
        },
        {
          kind: "p",
          text: "งานวิจัยสามชิ้นในบทความนี้ศึกษาการสื่อสารในสถานการณ์ที่ต่างกันมาก แต่ได้บทเรียนเดียวกัน คือยามวิกฤต คนตัดสินจากสิ่งที่เห็นกับตา มากกว่าสิ่งที่มีคนบอกให้เชื่อ",
        },
        { kind: "h2", text: "คนจะเชื่อมากหรือน้อย ขึ้นกับผลงานที่เห็น" },
        {
          kind: "p",
          text: "งานของ รศ.ดร. Pavel Slutskiy และ รศ.ดร.สมิทธิ์ บุญชุติมา (ตีพิมพ์ปี 2565) วิเคราะห์โพสต์และความเห็นบนเฟซบุ๊กและทวิตเตอร์ตั้งแต่ต้นปี 2563 ถึงต้นปี 2565 และสัมภาษณ์ผู้เชี่ยวชาญอีก 50 คน ช่วงที่คุมโรคได้ดี คนแทบไม่ตั้งคำถามกับข้อมูลของรัฐเลย และคนใส่หน้ากากถึงเกือบ 95% ตั้งแต่องค์การอนามัยโลกยังไม่ได้แนะนำด้วยซ้ำ แต่พอเข้าระลอกที่สามในปี 2564 ที่เดือนเมษายนเดือนเดียวมีผู้ติดเชื้อใหม่มากกว่ายอดสะสมทั้งหมดก่อนหน้า ความเชื่อก็หายไปพร้อมกับผลงาน",
          links: [{ match: "วิเคราะห์โพสต์และความเห็นบนเฟซบุ๊กและทวิตเตอร์", href: "/research/covid-official-communication-credibility" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คะแนนนิยมผู้นำรัฐบาลร่วงเหลือไม่ถึงหนึ่งในห้า",
            subtitle: "คะแนนนิยมผู้นำรัฐบาลจากโพลที่งานวิจัยอ้างถึง ก่อนและระหว่างช่วงวิกฤตวัคซีน (เมษายน–มิถุนายน 2564)",
            alt: "กราฟแท่งแสดงคะแนนนิยมผู้นำรัฐบาล ก่อนหน้า 93.3% และช่วงวิกฤตวัคซีนปี 2564 19%",
            source: "ที่มา: Slutskiy และ Boonchutima (2022) American Behavioral Scientist · ตัวเลขจากโพลและรายงานข่าวที่บทความอ้างถึง",
            guess: "ช่วงวิกฤตวัคซีน 2564",
            prompt: "ลองทายก่อน: ช่วงวิกฤตวัคซีน คะแนนนิยมผู้นำรัฐบาลเหลือเท่าไร",
            answerNote: "จาก 93.3% เหลือ 19%",
            data: [
              { label: "ก่อนหน้า", value: 93.3 },
              { label: "ช่วงวิกฤตวัคซีน 2564", value: 19, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "ผู้วิจัยสรุปว่า ช่วงนั้นคนจะเชื่อรัฐหรือไม่ ขึ้นอยู่กับว่ารัฐดูเหมือนกำลังเอาชนะโรคได้หรือเปล่า มากกว่าว่าข้อความจริงหรือโปร่งใสแค่ไหน เมื่อคนเลิกเชื่อ เขาก็ไม่ได้เลิกหาข้อมูล แต่หันไปฟังองค์การระหว่างประเทศแทน ส่วนการออกกฎคุมข้อมูลที่ทำให้ประชาชนตื่นกลัว แม้ข้อมูลนั้นจะเป็นเรื่องจริง ก็ถูกมองว่าเป็นการปิดปาก มากกว่าการแก้ปัญหา",
        },
        {
          kind: "p",
          text: "ความเชื่อใจเปลี่ยนได้เร็วกว่าที่คิด และไม่ได้เกิดกับรัฐเท่านั้น จากผลสำรวจออนไลน์ของ Reuters Institute (เผยแพร่ผ่าน Statista) คนไทยที่เชื่อถือข่าวมีราวครึ่งหนึ่งมาตลอด แต่ลดจาก 55% ในปี 2568 เหลือ 47% ในปี 2569 ต่ำที่สุดในรอบหกปีที่มีข้อมูล",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "ความเชื่อถือข่าวของคนไทยลดลงต่ำสุดในหกปี",
            subtitle: "สัดส่วนผู้ตอบที่บอกว่าเชื่อถือข่าวส่วนใหญ่ได้เกือบตลอดเวลา · ประเทศไทย 2564–2569 · สำรวจออนไลน์",
            alt: "กราฟเส้นแสดงความเชื่อถือข่าวโดยรวมของคนไทย ปี 2564 50% ปี 2565 53% ปี 2566 51% ปี 2567 54% ปี 2568 55% และปี 2569 47%",
            source: "ที่มา: Reuters Institute for the Study of Journalism, YouGov via Statista, 2026 · ปี 2569 สำรวจออนไลน์ 2,043 คน",
            data: [
              { label: "2564", value: 50 },
              { label: "2565", value: 53 },
              { label: "2566", value: 51 },
              { label: "2567", value: 54 },
              { label: "2568", value: 55 },
              { label: "2569", value: 47, highlight: true },
            ],
          },
        },
        { kind: "h2", text: "ถ้าองค์กรไม่ยอมรับว่าเป็นวิกฤต ก็ไม่มีใครรับผิดชอบ" },
        {
          kind: "p",
          text: "งานของ Theekakul และ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2564) ศึกษาสถานีโทรทัศน์ดิจิทัลสามช่องที่ถูกลงโทษทางปกครองจากการรายงานข่าวเหตุคนร้ายจับตัวประกันที่นครราชสีมาเมื่อปี 2563 พบว่ามีเพียงช่องเดียวที่ออกมาพูดทางออนไลน์ โดยโพสต์ขอโทษบนเฟซบุ๊กราวสองวันหลังเหตุการณ์จบ โพสต์นั้นมีคนเข้ามาแสดงความเห็นกว่า 3,200 ครั้ง ส่วนใหญ่เป็นคำวิจารณ์ แต่สถานีไม่ตอบกลับเลยสักความเห็นเดียว",
          links: [{ match: "ศึกษาสถานีโทรทัศน์ดิจิทัลสามช่องที่ถูกลงโทษทางปกครอง", href: "/research/tv-crisis-communication-korat" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "คนแสดงความเห็นหลายพันครั้ง สถานีตอบกลับศูนย์",
            subtitle: "ปฏิกิริยาต่อโพสต์ขอโทษบนเฟซบุ๊กของสถานีโทรทัศน์ช่องหนึ่ง · ตัวเลขความเห็นและการแชร์เป็นค่าขั้นต่ำตามที่บทความรายงาน",
            alt: "กราฟแท่งแสดงปฏิกิริยาต่อโพสต์ขอโทษ กดแสดงความรู้สึก 14,947 ครั้ง ความเห็นกว่า 3,200 ครั้ง แชร์กว่า 1,200 ครั้ง และสถานีตอบกลับความเห็น 0 ครั้ง",
            source: "ที่มา: Theekakul และ Chongkolrattanaporn (2021) วารสารประชาสัมพันธ์และโฆษณา",
            unit: " ครั้ง",
            data: [
              { label: "กดแสดงความรู้สึก", value: 14947 },
              { label: "ความเห็น (กว่า)", value: 3200 },
              { label: "แชร์ (กว่า)", value: 1200 },
              { label: "สถานีตอบกลับความเห็น", value: 0, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "บทเรียนที่ใช้ได้กับทุกองค์กรคือ ทั้งสามสถานีไม่ได้มองว่าการถูกลงโทษเป็นวิกฤตของตัวเอง จึงไม่มีแผน ไม่มีคู่มือ และไม่ได้มอบหมายใครไว้ล่วงหน้า สุดท้ายฝ่ายข่าวต้องจัดการเอง ทั้งที่ฝ่ายข่าวคือคู่กรณีโดยตรง ผู้เชี่ยวชาญที่ให้สัมภาษณ์จึงเสนอให้ฝ่ายสื่อสารองค์กรเป็นคนดูแล ตั้งวอร์รูมพร้อมเกณฑ์ประเมินสถานการณ์ที่ตกลงกันไว้ก่อน และขอโทษอย่างเต็มปากเต็มคำ",
        },
        { kind: "h2", text: "คนส่งต่อข้อเท็จจริง มากกว่าส่งต่ออารมณ์" },
        {
          kind: "p",
          text: "งานของ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2561) วิเคราะห์การรณรงค์ค้านเขื่อนแม่วงก์บนทวิตเตอร์เมื่อปี 2556 ฝั่งผู้รณรงค์เล่าเรื่องการเดินเท้า 388 กิโลเมตรด้วยภาษาที่เร้าอารมณ์ แต่ข้อความที่คนแชร์ต่อจริงๆ กลับเป็นข้อความที่มีข้อเท็จจริงและหลักฐานว่าทำไมควรยกเลิกเขื่อน พอสารคดีถูกถอดจากผังออกอากาศ ทีมก็นำไปลง YouTube แทน และรายชื่อค้านเขื่อนบน Change.org ก็มากที่สุดในไทยในตอนนั้น",
          links: [{ match: "วิเคราะห์การรณรงค์ค้านเขื่อนแม่วงก์บนทวิตเตอร์", href: "/research/nodam-maewong-framing" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "รายชื่อค้านเขื่อนมากกว่าการรณรงค์ทั่วไปสิบเท่า",
            subtitle: "จำนวนรายชื่อบน Change.org · ประเทศไทย ปี 2556",
            alt: "กราฟแท่งแสดงจำนวนรายชื่อ การรณรงค์ค้านเขื่อนแม่วงก์ 100,000 รายชื่อ และการรณรงค์ส่วนใหญ่ในไทยขณะนั้นราว 10,000 รายชื่อ",
            source: "ที่มา: Chongkolrattanaporn (2018) วารสารประชาสัมพันธ์และโฆษณา",
            unit: " รายชื่อ",
            data: [
              { label: "ค้านเขื่อนแม่วงก์", value: 100000, highlight: true },
              { label: "การรณรงค์ส่วนใหญ่ขณะนั้น", value: 10000 },
            ],
          },
        },
        {
          kind: "p",
          text: "ผู้รณรงค์ สื่อมวลชน และประชาชนต่างเล่าเรื่องนี้คนละมุม แต่การรณรงค์ก็ได้ผล รัฐมนตรีที่ดูแลเรื่องนี้ส่งตัวแทนมารับรายชื่อ และบอกว่าจะพิจารณารายงานผลกระทบอย่างรอบคอบ ไม่เร่งก่อสร้าง",
        },
        { kind: "h2", text: "สี่ข้อเพื่อเตรียมรับวิกฤตครั้งหน้า" },
        {
          kind: "tips",
          items: [
            {
              title: "ตกลงกันไว้ก่อนว่าอะไรนับเป็นวิกฤต",
              text: "เขียนเกณฑ์ไว้ล่วงหน้า และนับรวมเรื่องที่หน่วยงานกำกับดูแลมองว่าเป็นปัญหาด้วย ถ้าองค์กรไม่นับว่าเป็นวิกฤต ก็จะไม่มีใครลุกขึ้นมารับผิดชอบ",
            },
            {
              title: "ให้คนที่ไม่ใช่คู่กรณีเป็นผู้ดูแล",
              text: "มอบงานให้ฝ่ายสื่อสารองค์กรหรือทีมกลาง ไม่ใช่หน่วยที่เป็นต้นเรื่อง เพราะหน่วยที่เป็นต้นเรื่องมักจะชี้แจงขั้นตอนการทำงานของตัวเอง แทนที่จะขอโทษ",
            },
            {
              title: "บอกตรงๆ เมื่อผลยังไม่ดี",
              text: "เมื่อสิ่งที่คนเห็นสวนทางกับสิ่งที่พูด ยิ่งอธิบายก็ยิ่งไม่ช่วย ให้บอกตรงๆ ว่ากำลังแก้อะไรอยู่ และอ้างอิงแหล่งที่คนเชื่อถืออยู่แล้ว เช่น องค์การระหว่างประเทศ แทนที่จะไปแข่งกับแหล่งเหล่านั้น",
            },
            {
              title: "เตรียมทั้งข้อเท็จจริงและเรื่องเล่า",
              text: "เรื่องเล่าช่วยดึงความสนใจ แต่สิ่งที่คนแชร์ต่อมักเป็นข้อเท็จจริงที่ตรวจสอบได้ เตรียมข้อความสั้นๆ ที่มีตัวเลขและหลักฐานไว้ให้คนแชร์ต่อได้ง่าย",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งานโควิดเป็นการวิเคราะห์เชิงคุณภาพ ไม่ได้นับจำนวนโพสต์หรือสัดส่วนความเห็น ที่บอกว่าคะแนนนิยมกับความเชื่อถือขึ้นลงไปด้วยกัน จึงมาจากการไล่ดูลำดับเหตุการณ์ ไม่ได้วัดทางสถิติ และคะแนนนิยมมาจากโพลกับรายงานข่าว ไม่ใช่ข้อมูลที่ผู้วิจัยเก็บเอง งานสถานีโทรทัศน์ศึกษาเหตุการณ์เดียว สามสถานี และผู้ให้สัมภาษณ์เจ็ดคน ส่วนงานแม่วงก์ศึกษากรณีเดียว ใช้ข้อมูลปี 2556 จากทวิตเตอร์เป็นหลัก และดูความสำเร็จจากผลทางนโยบาย ไม่ได้วัดว่าคนเปลี่ยนความคิดหรือไม่ ตัวเลขความเชื่อถือข่าวจาก Reuters Institute เป็นการสำรวจออนไลน์ จึงสะท้อนคนที่ใช้อินเทอร์เน็ตเป็นหลัก และวัดความเชื่อถือข่าวโดยรวม ไม่ได้วัดความเชื่อต่อหน่วยงานรัฐ บทความนี้ตั้งใจไม่ระบุชื่อบุคคล สถานีโทรทัศน์ และบริษัทที่ถูกวิจารณ์ในงานต้นฉบับ เพราะบทเรียนอยู่ที่กลไก ไม่ได้อยู่ที่ว่าใครเกี่ยวข้อง",
        },
        { kind: "h2", text: "ความเชื่อใจต้องสร้างไว้ก่อน แล้วพิสูจน์ตอนเกิดวิกฤต" },
        {
          kind: "p",
          text: "ยามวิกฤต ถ้อยคำดีแค่ไหนก็ช่วยได้ไม่มาก ถ้าสิ่งที่คนเห็นสวนทาง องค์กรที่ผ่านวิกฤตไปได้คือองค์กรที่เตรียมคนและเกณฑ์ไว้ก่อน กล้ายอมรับเมื่อพลาด และให้ข้อเท็จจริงที่คนตรวจสอบและแชร์ต่อได้",
        },
        {
          kind: "note",
          text: "หากหน่วยงานของคุณกำลังวางแผนรับมือการสื่อสารในภาวะวิกฤต ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "In a crisis, people believe what they see more than what they are told",
      dek: "Three studies, from COVID-19 to a hostage crisis to a campaign against a dam, show that credibility in a crisis does not come from the speaker's position. It comes from results people can see, from admitting mistakes, and from facts people can pass on.",
      coverAlt: "Paper-craft illustration on cream paper: a blue lighthouse built from layered paper bands, with a green lantern room at the top",
      coverCaption: "Illustration generated with AI",
      referencesTitle: "Supporting data from Statista",
      references: [
        {
          text: "Reuters Institute for the Study of Journalism, YouGov via Statista. (2026, July 14). Level of trust in the news in Thailand from 2021 to 2026. Accessed 31 October 2026.",
          url: "https://www.statista.com/statistics/1457023/thailand-level-of-trust-in-the-news/",
        },
      ],
      body: [
        {
          kind: "p",
          text: "Ton (a fictional character) heads communications at a public agency. During an emergency his team issued a statement every day, accurate in every line. Yet the more statements they put out, the more people on social media questioned them. He was not sure whether the problem was the wording or something else.",
        },
        {
          kind: "p",
          text: "The three studies brought together here look at communication in very different situations, but they reach the same lesson: in a crisis, people judge by what they see happening, more than by what they are asked to believe.",
        },
        { kind: "h2", text: "Belief rose and fell with visible results" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Pavel Slutskiy and Assoc. Prof. Dr Smith Boonchutima (published in 2022) analysed Facebook and Twitter posts and comments from early 2020 to early 2022, alongside interviews with 50 experts. While the outbreak was under control, people barely questioned official information, and mask-wearing reached almost 95% before the World Health Organization was even recommending it. But in the third wave of 2021, when April alone brought more new cases than the country's entire previous total, belief went the way of performance.",
          links: [{ match: "analysed Facebook and Twitter posts and comments", href: "/en/research/covid-official-communication-credibility" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "The government leader's approval fell to under one in five",
            subtitle: "Approval of the government leader from polls cited in the study, before and during the vaccine crisis (April–June 2021)",
            alt: "Bar chart of the government leader's approval: 93.3% before, 19% during the 2021 vaccine crisis",
            source: "Source: Slutskiy and Boonchutima (2022), American Behavioral Scientist · figures from polls and news reports cited in the article",
            guess: "During the 2021 vaccine crisis",
            prompt: "Guess first: what was the government leader's approval during the vaccine crisis?",
            answerNote: "From 93.3% down to 19%.",
            data: [
              { label: "Before", value: 93.3 },
              { label: "During the 2021 vaccine crisis", value: 19, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "The researchers conclude that credibility in that period depended on whether the government seemed to be winning, more than on how true or transparent its messages were. When people stopped believing, they did not stop looking for information; they turned to international bodies instead. And a rule restricting information that caused public fear, even when it was true, read as silencing rather than solving.",
        },
        {
          kind: "p",
          text: "Trust can shift faster than we expect, and not only trust in government. An online survey by the Reuters Institute, published via Statista, shows overall trust in news among Thais hovering around half for years, then falling from 55% in 2025 to 47% in 2026, the lowest in the six years of data.",
        },
        {
          kind: "chart",
          chart: {
            type: "area",
            title: "Thai trust in news fell to a six-year low",
            subtitle: "Share of respondents who say they trust most news most of the time · Thailand, 2021–2026 · online survey",
            alt: "Line chart of overall trust in news in Thailand: 50% in 2021, 53% in 2022, 51% in 2023, 54% in 2024, 55% in 2025 and 47% in 2026",
            source: "Source: Reuters Institute for the Study of Journalism, YouGov via Statista, 2026 · 2026 online survey of 2,043 people",
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
        { kind: "h2", text: "If the organisation does not call it a crisis, no one owns it" },
        {
          kind: "p",
          text: "A study by Theekakul and Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2021) looked at three digital TV stations penalised by the regulator over their coverage of the 2020 hostage-taking in Nakhon Ratchasima. Only one communicated online, with an apology on Facebook about two days after the incident ended. The post drew more than 3,200 comments, mostly critical, and the station replied to none of them.",
          links: [{ match: "looked at three digital TV stations penalised by the regulator", href: "/en/research/tv-crisis-communication-korat" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Thousands of comments, zero replies",
            subtitle: "Responses to one TV station's Facebook apology · comments and shares are minimum figures as reported in the article",
            alt: "Bar chart of responses to the apology post: 14,947 reactions, more than 3,200 comments, more than 1,200 shares and 0 replies from the station",
            source: "Source: Theekakul and Chongkolrattanaporn (2021), Journal of Public Relations and Advertising",
            unit: "",
            data: [
              { label: "Reactions", value: 14947 },
              { label: "Comments (over)", value: 3200 },
              { label: "Shares (over)", value: 1200 },
              { label: "Replies from the station", value: 0, highlight: true },
            ],
          },
        },
        {
          kind: "p",
          text: "The finding that applies to any organisation is that none of the three stations saw the penalty as a crisis for itself, so there was no plan, no manual and no one assigned in advance. The newsroom was left to handle it, even though the newsroom was a direct party to the dispute. The specialists interviewed recommended putting corporate communications in charge, setting up a war room with thresholds agreed beforehand, and apologising in full.",
        },
        { kind: "h2", text: "People pass on facts more than feelings" },
        {
          kind: "p",
          text: "A study by Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2018) analysed the 2013 Twitter campaign against the Mae Wong dam. The campaigners told the story of a 388-kilometre walk in emotional language, but the messages people actually passed on were the ones with facts and evidence for cancelling the dam. When a documentary was pulled from broadcast, the team put it on YouTube instead, and the petition on Change.org became the largest in Thailand at the time.",
          links: [{ match: "analysed the 2013 Twitter campaign against the Mae Wong dam", href: "/en/research/nodam-maewong-framing" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Ten times the signatures of a typical campaign",
            subtitle: "Signatures on Change.org · Thailand, 2013",
            alt: "Bar chart of petition signatures: the campaign against the Mae Wong dam 100,000, most Thai petitions at the time around 10,000",
            source: "Source: Chongkolrattanaporn (2018), Journal of Public Relations and Advertising",
            unit: " signatures",
            data: [
              { label: "Against the Mae Wong dam", value: 100000, highlight: true },
              { label: "Most petitions at the time", value: 10000 },
            ],
          },
        },
        {
          kind: "p",
          text: "Campaigners, the news media and the public each framed the issue differently, yet the campaign worked. The responsible minister sent a representative to receive the petition and said the impact report would be examined carefully and construction would not be rushed.",
        },
        { kind: "h2", text: "Four points to prepare for the next crisis" },
        {
          kind: "tips",
          items: [
            {
              title: "Agree in advance what counts as a crisis",
              text: "Write the thresholds down beforehand, including issues a regulator treats as a problem. If the organisation does not count it as a crisis, no one will be assigned to it.",
            },
            {
              title: "Put someone who is not a party in charge",
              text: "Give the work to corporate communications or a central team, not the unit at the centre of the story, which tends to explain its own procedures instead of apologising.",
            },
            {
              title: "Say plainly when results are not good yet",
              text: "When what people see contradicts what you say, more explanation does not help. Say what is being fixed, and cite sources people trust, such as international bodies, rather than competing with them.",
            },
            {
              title: "Prepare both facts and story",
              text: "Stories draw attention, but what people pass on tends to be checkable fact. Prepare short messages with figures and evidence that are easy to share.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "The COVID study is a qualitative analysis. It reports no post counts or proportions of opinion, so the link between approval and credibility is read from the sequence of events rather than measured, and the approval figures come from polls and news reports rather than the researchers' own data. The TV study covers one event, three stations and seven interviewees. The Mae Wong study is a single case from 2013 data, mainly from Twitter, and judges success by the policy outcome rather than by measuring attitude change directly. The Reuters Institute news-trust figures come from an online survey, so they mainly reflect internet users, and they measure trust in news overall rather than trust in government. This article deliberately does not name the individuals, TV stations or companies criticised in the original studies, because the lesson lies in the mechanism, not in who was involved.",
        },
        { kind: "h2", text: "Credibility is built before a crisis and proved during one" },
        {
          kind: "p",
          text: "In a crisis, good wording does little when what people see points the other way. The organisations that come through are the ones that prepared people and thresholds in advance, admit it when they get things wrong, and give facts people can check and pass on.",
        },
        {
          kind: "note",
          text: "If your organisation is planning how to communicate in a crisis, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
        },
      ],
    },
  },
  {
    slug: "ai-learning-skills",
    date: "2026-10-31",
    author: SMITH,
    palette: [4, 9],
    cover: "/images/insights/ai-learning-skills-hero",
    evidence: [
      "ai-generated-citations-students",
      "first-year-online-learning-technostress",
      "online-class-cognitive-load-interactive-media",
      "ai-philippine-higher-education-reflections",
      "adult-media-literacy-pakistan",
    ],
    th: {
      title: "ก่อนสอนให้ใช้ AI ต้องสอนให้ตรวจสอบเป็น",
      dek: "งานวิจัยห้าชิ้นเรื่องนิสิต ห้องเรียนออนไลน์ อาจารย์ และผู้ใหญ่ที่ใช้สื่อทุกวัน ชี้ว่าปัญหาไม่ได้อยู่ที่ตัวเครื่องมือ แต่อยู่ที่ผู้เรียนตรวจสอบข้อมูลเป็นหรือไม่ และต้องแบกงานพร้อมกันมากแค่ไหน",
      coverAlt: "ภาพประกอบกระดาษ หนังสือสีส้มเปิดอยู่ หน้ากระดาษว่างเปล่า มีแว่นขยายสีแดงวางทับกลางหน้า บนพื้นกระดาษสีครีม",
      coverCaption: "ภาพประกอบสร้างด้วย AI",
      body: [
        {
          kind: "p",
          text: "อาจารย์มิ้นท์ (ตัวละครสมมติ) สอนวิชาพื้นฐานให้นิสิตปีหนึ่ง เทอมนี้รายงานที่ส่งมาดูดีขึ้นมาก ภาษาเรียบร้อย มีคำพูดของนักคิดพร้อมชื่อหนังสือและปีที่พิมพ์ครบ แต่พอเธอลองเปิดหนังสือที่อ้างถึง กลับหาคำพูดเหล่านั้นไม่เจอเลย",
        },
        {
          kind: "p",
          text: "เรื่องแบบนี้เกิดขึ้นจริงในหลายห้องเรียน งานวิจัยห้าชิ้นในบทความนี้ช่วยอธิบายว่าทำไม และบอกเป็นนัยว่าสิ่งที่ต้องสอนเพิ่มอาจไม่ใช่วิธีใช้เครื่องมือ",
        },
        { kind: "h2", text: "คำตอบที่ดูน่าเชื่อ อาจไม่มีอยู่จริง" },
        {
          kind: "p",
          text: "งานของ รศ.ดร. Pavel Slutskiy (ตีพิมพ์ปี 2568) ให้นิสิตจุฬาฯ 240 คนทำงานชิ้นเดียวกัน คือไปหาว่านักปรัชญาคนหนึ่งคิดอย่างไรกับเรื่องหนึ่ง แล้วยกคำพูดจากงานของเขามาประกอบ จะค้นจากแหล่งออนไลน์ไหนก็ได้ ปรากฏว่านิสิตราวหนึ่งในห้าเลือกถามแชตบอตเป็นหลัก",
          links: [{ match: "ให้นิสิตจุฬาฯ 240 คนทำงานชิ้นเดียวกัน", href: "/research/ai-generated-citations-students" }],
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "นิสิตหนึ่งในห้าหาคำตอบเชิงวิชาการจากแชตบอต",
            subtitle: "แหล่งข้อมูลหลักที่นิสิตใช้ทำงานชิ้นเดียวกัน · นิสิต 240 คน",
            alt: "แถบสัดส่วนแหล่งข้อมูลหลักของนิสิต 240 คน Google 57% แชตบอต 22% และวิกิพีเดีย 21%",
            source: "ที่มา: Slutskiy (2025) Manusya: Journal of Humanities · นิสิต 240 คน",
            prompt: "ลองเลือกก่อน: นิสิตใช้แหล่งไหนมากที่สุด",
            answerNote: "แต่แชตบอตตามมาเป็นอันดับสอง",
            data: [
              { label: "Google", value: 57 },
              { label: "แชตบอต", value: 22 },
              { label: "วิกิพีเดีย", value: 21 },
            ],
          },
        },
        {
          kind: "p",
          text: "งาน 37 ชิ้นมีคำพูดที่บอกว่าเป็นของนักปรัชญาคนนั้น พร้อมชื่อผลงานและปีที่พิมพ์ครบเหมือนอ้างอิงจริง แต่ไม่มีคำพูดไหนอยู่ในงานที่อ้างถึงเลยสักประโยค และนิสิตทั้ง 37 คนก็มั่นใจว่ายกมาจากต้นฉบับจริง ปัญหาจึงไม่ได้อยู่แค่ว่าเครื่องมือตอบผิด แต่อยู่ที่คำตอบหน้าตาเหมือนผ่านการตรวจสอบมาแล้ว",
        },
        { kind: "h2", text: "สิ่งที่ทำให้เครียดคือปริมาณ ไม่ใช่ความยาก" },
        {
          kind: "p",
          text: "งานของ ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ (ตีพิมพ์ปี 2566) สำรวจนิสิตปีหนึ่ง 803 คนในช่วงที่ต้องเรียนออนไลน์ทั้งหมด พบว่าสิ่งที่ทำให้เครียดชัดกว่าเรื่องอื่น คือเครื่องมือและงานที่ถาโถมเข้ามาพร้อมกัน ส่วนเรื่องเทคโนโลยีใช้ยาก นิสิตกลับไม่ค่อยเครียด",
          links: [{ match: "สำรวจนิสิตปีหนึ่ง 803 คน", href: "/research/first-year-online-learning-technostress" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "เครื่องมือมากเกินไป เครียดกว่าเครื่องมือใช้ยาก",
            subtitle: "คะแนนเฉลี่ยความเครียดจากเทคโนโลยีสี่ด้าน (เต็ม 5) · นิสิตปีหนึ่งสายที่ไม่ใช่วิทยาศาสตร์ ปีการศึกษา 2563",
            alt: "กราฟแท่งแสดงคะแนนเฉลี่ยความเครียดจากเทคโนโลยีของนิสิตสายที่ไม่ใช่วิทยาศาสตร์ จากเต็ม 5 ปริมาณมากเกินไป 3.64 ความไม่มั่นคง 2.96 ความไม่แน่นอน 2.95 และความซับซ้อน 2.88",
            source: "ที่มา: Chongkolrattanaporn (2023) PASAA · สำรวจนิสิตปีหนึ่ง 803 คน",
            unit: " จาก 5",
            data: [
              { label: "เครื่องมือและงานมากเกินไป", value: 3.64, highlight: true },
              { label: "กลัวตามไม่ทัน", value: 2.96 },
              { label: "เทคโนโลยีเปลี่ยนบ่อย", value: 2.95 },
              { label: "ใช้งานยาก", value: 2.88 },
            ],
          },
        },
        {
          kind: "p",
          text: "นิสิตสายวิทยาศาสตร์ก็เป็นแบบเดียวกัน เรื่องงานล้นมือได้ 3.52 จาก 5 สูงกว่าทุกด้าน ทางแก้จึงไม่ใช่อบรมให้ใช้เครื่องมือเก่งขึ้น แต่คือลดจำนวนระบบที่ใช้ในหลักสูตร และจัดกำหนดส่งงานของแต่ละวิชาไม่ให้ชนกัน",
        },
        { kind: "h2", text: "แบบทดสอบช่วยให้จำ แต่จะใช้เป็นต้องได้คุยกัน" },
        {
          kind: "p",
          text: "งานของ รศ.ดร.สมิทธิ์ บุญชุติมา ผศ.ดร.ธีรดา จงกลรัตนาภรณ์ และ ดร.วรรษยุต คงจันทร์ (ตีพิมพ์ปี 2566) ทดลองใช้สื่อโต้ตอบในวิชาออนไลน์ระดับปริญญาโทกับนิสิต 23 คน คะแนนเฉลี่ยขยับจาก 6.77 เป็น 8.20 แต่พอให้ทำแบบทดสอบเดิมซ้ำ คะแนนก็ไม่เพิ่ม และคนทำหายไปราวครึ่งหนึ่ง นิสิตเล่าเองว่าแบบทดสอบช่วยให้จำได้ในระยะสั้น แต่ที่ทำให้เอาไปใช้กับงานจริงได้ คือการได้คุยกับอาจารย์และเพื่อน และได้คำแนะนำตรงๆ นิสิตยังขอสไลด์เป็นไฟล์ PDF ธรรมดาไว้จดโน้ต ทั้งที่มีเว็บนำเสนอพร้อมวิดีโอให้อยู่แล้ว",
          links: [{ match: "ทดลองใช้สื่อโต้ตอบในวิชาออนไลน์ระดับปริญญาโท", href: "/research/online-class-cognitive-load-interactive-media" }],
        },
        { kind: "h2", text: "ใช้คล่อง ไม่ได้แปลว่าแยกแยะเป็น" },
        {
          kind: "p",
          text: "งานของ ดร.มุฮัมมัด อิบเตซาม มาซาฮีร์ และ Yaseen (ตีพิมพ์ปี 2568) สำรวจผู้ใหญ่ในปากีสถาน 500 คนที่ใช้สื่ออย่างน้อยวันละชั่วโมง พบว่ามีเพียง 41% ที่ดูออกว่าข่าวไหนลำเอียงหรือชวนให้เข้าใจผิด คนอายุน้อยใช้เครื่องมือดิจิทัลคล่องกว่า แต่จากการสัมภาษณ์ หลายคนยังแยกไม่ออกว่าเนื้อหาไหนเชื่อถือได้",
          links: [{ match: "สำรวจผู้ใหญ่ในปากีสถาน 500 คน", href: "/research/adult-media-literacy-pakistan" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "ใช้สื่อทุกวัน แต่ดูข่าวลำเอียงออกไม่ถึงครึ่ง",
            subtitle: "สัดส่วนคนที่ทำแต่ละเรื่องได้ · ผู้ใหญ่ในปากีสถาน 500 คน มีนาคม–เมษายน 2568",
            alt: "กราฟแท่งแสดงสัดส่วนคนที่ดูออกว่าข่าวไหนลำเอียงหรือชวนเข้าใจผิด 41% เข้าใจการตั้งค่าความเป็นส่วนตัว 33% และเคยสร้างหรือแชร์เนื้อหาของตัวเอง 18%",
            source: "ที่มา: Mazahir และ Yaseen (2025) International Journal of Media and Information Literacy · สำรวจ 500 คน",
            guess: "ดูออกว่าข่าวไหนลำเอียงหรือชวนเข้าใจผิด",
            prompt: "ลองทายก่อน: ผู้ใหญ่ที่ใช้สื่อทุกวัน กี่เปอร์เซ็นต์ที่ดูออกว่าข่าวไหนลำเอียง",
            answerNote: "ไม่ถึงครึ่ง ทั้งที่ใช้สื่อทุกวัน",
            data: [
              { label: "ดูออกว่าข่าวไหนลำเอียงหรือชวนเข้าใจผิด", value: 41 },
              { label: "เข้าใจการตั้งค่าความเป็นส่วนตัว", value: 33 },
              { label: "เคยสร้างหรือแชร์เนื้อหาของตัวเอง", value: 18 },
            ],
          },
        },
        {
          kind: "p",
          text: "งานของ Giray และคณะ (ตีพิมพ์ปี 2567) ซึ่ง ดร.ร็อบบี้ แจน วินเซนต์ ที. บูเอโล ร่วมเขียน รวบรวมบันทึกของอาจารย์และผู้บริหารมหาวิทยาลัยในฟิลิปปินส์แปดคน ช่วงที่ ChatGPT เพิ่งเปิดตัว ทุกคนใช้ AI ช่วยงานจริง แต่ก็เจอทั้งอ้างอิงที่ AI แต่งขึ้นเอง และนักศึกษาที่เอางานที่ AI เขียนมาส่งเป็นของตัวเอง ตอนนั้นทั้งสี่สถาบันยังไม่มีนโยบาย AI ที่ครบถ้วน ผู้เขียนเห็นตรงกันว่าห้ามใช้ไปก็ไม่ได้ผล และเสนอให้แยกการใช้ AI ช่วยเกลาภาษาหรือจัดการอ้างอิง ออกจากการให้ AI ตอบแทน",
          links: [{ match: "รวบรวมบันทึกของอาจารย์และผู้บริหารมหาวิทยาลัยในฟิลิปปินส์แปดคน", href: "/research/ai-philippine-higher-education-reflections" }],
        },
        { kind: "h2", text: "สี่ข้อสำหรับผู้สอนและผู้จัดอบรม" },
        {
          kind: "tips",
          items: [
            {
              title: "สอนให้ตามกลับไปหาต้นฉบับ",
              text: "ให้ผู้เรียนเปิดต้นฉบับตรวจทุกคำพูดและตัวเลขที่ได้จาก AI และให้คะแนนกับการตรวจสอบด้วย เพราะมีชื่อหนังสือกับปีที่พิมพ์ ไม่ได้แปลว่าคำพูดนั้นมีอยู่จริง",
            },
            {
              title: "บอกให้ชัดว่าใช้ AI แบบไหนได้",
              text: "แยกให้ชัดระหว่างใช้ AI ช่วยเกลาภาษาหรือจัดรูปแบบอ้างอิง กับให้ AI เขียนคำตอบแทน แล้วให้ผู้เรียนบอกว่าใช้อะไรไปบ้าง ดีกว่าห้ามทั้งหมด",
            },
            {
              title: "ลดจำนวนเครื่องมือก่อนเพิ่มการอบรม",
              text: "ถ้าผู้เรียนเครียดเพราะงานล้นมือ สอนเครื่องมือเพิ่มก็ไม่ช่วย ควรใช้ระบบให้น้อยลง และจัดกำหนดส่งงานของแต่ละวิชาไม่ให้ชนกัน",
            },
            {
              title: "ใช้แบบทดสอบให้พอดี แล้วเพิ่มเวลาคุย",
              text: "แบบทดสอบช่วยให้จำ แต่ยิ่งทำซ้ำยิ่งได้ผลน้อยลง ควรเว้นช่วงให้คุยกันสดเป็นระยะ เพราะคนจะเอาความรู้ไปใช้เป็นได้ก็จากการถกกันและคำแนะนำของผู้สอน",
            },
          ],
        },
        { kind: "h2", text: "ข้อควรระวังในการอ่านข้อมูล" },
        {
          kind: "p",
          text: "งานแชตบอตใช้โจทย์เดียวในมหาวิทยาลัยเดียว และเก็บข้อมูลตอนที่นิสิตใช้ ChatGPT รุ่น 3.5 เครื่องมือรุ่นใหม่ที่ค้นเว็บและแนบลิงก์ได้อาจให้ผลต่างไป ตัวเลขแหล่งข้อมูลจึงเป็นภาพของช่วงนั้นเท่านั้น งานความเครียดเก็บข้อมูลช่วงที่ต้องเรียนออนไลน์ล้วน ซึ่งไม่ใช่สภาพปกติ งานสื่อโต้ตอบมีนิสิตกลุ่มเดียว 23 คน ไม่มีกลุ่มเปรียบเทียบ และผู้วิจัยหลักเป็นผู้สอนวิชานั้นเอง งานในฟิลิปปินส์เป็นบันทึกของผู้เขียนแปดคน ไม่ใช่แบบสำรวจ ส่วนงานในปากีสถานศึกษาเฉพาะคนที่ใช้สื่ออย่างน้อยวันละชั่วโมง และไม่มีค่าสถิติกำกับตัวเลขความต่างระหว่างเมืองกับชนบท",
        },
        { kind: "h2", text: "เครื่องมือเปลี่ยนเร็ว ทักษะตรวจสอบอยู่ได้นานกว่า" },
        {
          kind: "p",
          text: "AI และเครื่องมือออนไลน์ยังจะเปลี่ยนไปอีกหลายรอบ สิ่งที่ผู้สอนลงแรงแล้วคุ้มกว่า คือสอนให้ผู้เรียนตามกลับไปหาต้นฉบับ บอกกันตรงๆ ว่าใช้เครื่องมืออะไร และจัดการเรียนไม่ให้งานท่วมจนผู้เรียนไม่มีเวลาคิด",
        },
        {
          kind: "note",
          text: "หากสถาบันหรือองค์กรของคุณกำลังวางแนวทางการใช้ AI ในการเรียนรู้ ศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ยินดีพูดคุยและแลกเปลี่ยนประสบการณ์กับคุณ",
        },
      ],
    },
    en: {
      title: "Before teaching people to use AI, teach them to check",
      dek: "Five studies of students, online classes, lecturers and adults who use media every day show that the problem is not the tool itself. It is the skill of checking information, and how much learners are asked to carry at once.",
      coverAlt: "Paper-craft illustration on cream paper: an open orange book with blank pages and a red magnifying glass resting across the middle",
      coverCaption: "Illustration generated with AI",
      body: [
        {
          kind: "p",
          text: "Mint (a fictional character) teaches a first-year foundation course. This term the reports look much better: tidy language, quotations from thinkers, each with a book title and year. But when she opened the books cited, she could not find the quotations anywhere.",
        },
        {
          kind: "p",
          text: "This happens in real classrooms. The five studies brought together here help explain why, and suggest that what needs teaching may not be how to use the tools.",
        },
        { kind: "h2", text: "An answer that looks credible may not exist" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Pavel Slutskiy (published in 2025) gave 240 Chulalongkorn undergraduates the same task: find out what a particular philosopher thought on a topic and support it with a quotation from his work, using any online source. About one student in five chose a chatbot as the main source.",
          links: [{ match: "gave 240 Chulalongkorn undergraduates the same task", href: "/en/research/ai-generated-citations-students" }],
        },
        {
          kind: "chart",
          chart: {
            type: "split",
            title: "One student in five went to a chatbot for an academic answer",
            subtitle: "Main source students used for the same task · 240 students",
            alt: "Stacked bar of 240 students' main source: Google 57%, chatbot 22%, Wikipedia 21%",
            source: "Source: Slutskiy (2025), Manusya: Journal of Humanities · 240 students",
            prompt: "Pick first: which source did students use most?",
            answerNote: "But chatbots came second.",
            data: [
              { label: "Google", value: 57 },
              { label: "Chatbot", value: 22 },
              { label: "Wikipedia", value: 21 },
            ],
          },
        },
        {
          kind: "p",
          text: "Thirty-seven submissions included a quotation attributed to the philosopher, with the title of the work and the year, just like a real citation. Not one of the quotations appears in the work cited, and all 37 students were confident they had quoted the original. The problem is not only that the tool was wrong. It is that the answer arrived looking as if it had already been checked.",
        },
        { kind: "h2", text: "What causes stress is quantity, not difficulty" },
        {
          kind: "p",
          text: "A study by Asst. Prof. Dr Teerada Chongkolrattanaporn (published in 2023) surveyed 803 first-year students during fully online teaching. The form of technology stress that stood clearly above the rest was the sense of too many tools and tasks arriving at once. The sense that the technology was hard to use was fairly low.",
          links: [{ match: "surveyed 803 first-year students", href: "/en/research/first-year-online-learning-technostress" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Too many tools is more stressful than hard tools",
            subtitle: "Mean technostress scores on four dimensions (out of 5) · first-year non-science students, 2020 academic year",
            alt: "Bar chart of mean technostress scores for non-science students out of 5: overload 3.64, insecurity 2.96, uncertainty 2.95, complexity 2.88",
            source: "Source: Chongkolrattanaporn (2023), PASAA · survey of 803 first-year students",
            unit: " of 5",
            data: [
              { label: "Too many tools and tasks", value: 3.64, highlight: true },
              { label: "Fear of falling behind", value: 2.96 },
              { label: "Technology keeps changing", value: 2.95 },
              { label: "Hard to use", value: 2.88 },
            ],
          },
        },
        {
          kind: "p",
          text: "Science students showed the same picture, with overload at 3.52 out of 5, above every other dimension. The remedy is therefore not more training in the tools, but fewer systems per programme and deadlines across courses that do not pile up together.",
        },
        { kind: "h2", text: "Quizzes help recall; applying knowledge comes from conversation" },
        {
          kind: "p",
          text: "A study by Assoc. Prof. Dr Smith Boonchutima, Asst. Prof. Dr Teerada Chongkolrattanaporn and Dr Wassayut Kongjan (published in 2023) tried interactive media in an online master's course with 23 students. Mean scores rose from 6.77 to 8.20 after using the media, but repeating the same quiz added nothing and participation fell by about half. Students said the quizzes helped short-term memory, while applying the material to real work came from talking with the lecturer and classmates and getting direct feedback. They also asked for the slides as a plain PDF to annotate, even though a web presentation with videos was already provided.",
          links: [{ match: "tried interactive media in an online master's course", href: "/en/research/online-class-cognitive-load-interactive-media" }],
        },
        { kind: "h2", text: "Fluent use is not the same as discernment" },
        {
          kind: "p",
          text: "A study by Dr Muhammad Ibtesam Mazahir and Yaseen (published in 2025) surveyed 500 adults in Pakistan who use media at least an hour a day. Only 41% could correctly identify biased or misleading news. Younger people handled digital tools more easily, but the interviews showed that many still could not tell which content was credible.",
          links: [{ match: "surveyed 500 adults in Pakistan", href: "/en/research/adult-media-literacy-pakistan" }],
        },
        {
          kind: "chart",
          chart: {
            type: "race",
            title: "Daily media users, but under half could spot biased news",
            subtitle: "Share of respondents able to do each · 500 adults in Pakistan, March–April 2025",
            alt: "Bar chart of the share of respondents: could identify biased or misleading news 41%, understood privacy settings 33%, had ever created or shared original content 18%",
            source: "Source: Mazahir and Yaseen (2025), International Journal of Media and Information Literacy · survey of 500 people",
            guess: "Could spot biased or misleading news",
            prompt: "Guess first: what share of daily media users could spot biased news?",
            answerNote: "Under half, despite using media every day.",
            data: [
              { label: "Could spot biased or misleading news", value: 41 },
              { label: "Understood privacy settings", value: 33 },
              { label: "Had created or shared own content", value: 18 },
            ],
          },
        },
        {
          kind: "p",
          text: "A collection by Giray and colleagues (published in 2024), co-written by Dr Robbie Jan Vincent T. Buelo, brought together the reflections of eight lecturers and administrators in the Philippines in the first months after ChatGPT launched. All of them used AI in real work, but they also met fabricated references and students submitting AI-written work as their own. At the time, none of the four institutions had a full AI policy. The authors agreed that prohibition would not work, and proposed separating AI that helps polish language or manage references from AI that produces the answer.",
          links: [{ match: "brought together the reflections of eight lecturers and administrators in the Philippines", href: "/en/research/ai-philippine-higher-education-reflections" }],
        },
        { kind: "h2", text: "Four points for teachers and trainers" },
        {
          kind: "tips",
          items: [
            {
              title: "Teach people to go back to the source",
              text: "Have learners confirm every quotation and figure from AI against the original, and count the checking towards the grade. A book title and a year do not prove a quotation exists.",
            },
            {
              title: "Say clearly which kinds of AI use are allowed",
              text: "Separate help with language or citation formatting from having AI write the answer, and ask learners to say what they used, rather than banning everything.",
            },
            {
              title: "Cut the number of tools before adding training",
              text: "If learners are stressed by quantity, teaching more tools does not help. Use fewer systems and schedule deadlines across courses so they do not collide.",
            },
            {
              title: "Use quizzes in moderation and add time to talk",
              text: "Quizzes help recall, but repeats lose value fast. Open live discussion at regular intervals, because applying knowledge comes from debate and the teacher's feedback.",
            },
          ],
        },
        { kind: "h2", text: "Reading this evidence with care" },
        {
          kind: "p",
          text: "The chatbot study used one task at one university, collected when students were using ChatGPT 3.5; tools that search the web and attach links may behave differently, so the source split is a snapshot of that time. The technostress study was conducted during fully online teaching, which is not a normal condition. The interactive media study had a single group of 23 students, no comparison group, and the lead researcher taught the course. The Philippine study is eight authors' own reflections, not a survey. The Pakistan study covers only people using media at least an hour a day, and its urban–rural difference carries no test statistic.",
        },
        { kind: "h2", text: "Tools change fast; the habit of checking lasts" },
        {
          kind: "p",
          text: "AI and online tools will change many more times. What repays a teacher's investment is the habit of going back to the source, being open about which tools were used, and organising learning so it does not bury learners under so much that they have no time to think.",
        },
        {
          kind: "note",
          text: "If your institution or organisation is setting guidelines for AI in learning, the Center of Excellence in Communication Innovation at Chulalongkorn University's Faculty of Communication Arts would be glad to talk and share what we have learned.",
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

// กราฟชุดสีต้องรู้คู่สีของบทความ ไม่งั้นจะไม่มีสีให้วาด
const COLOR_CHARTS = new Set(["race", "area", "split"]);
for (const p of insights) {
  for (const lang of ["th", "en"] as const)
    for (const b of p[lang].body)
      if (b.kind === "chart" && COLOR_CHARTS.has(b.chart.type)) {
        if (!p.palette) throw new Error(`insights: บทความ "${p.slug}" ใช้กราฟ ${b.chart.type} แต่ไม่มี palette`);
        if (b.chart.guess && !b.chart.prompt)
          throw new Error(`insights: กราฟ "${b.chart.title}" มี guess แต่ไม่มี prompt`);
        if (b.chart.type === "split" && !b.chart.prompt)
          throw new Error(`insights: กราฟ split "${b.chart.title}" ไม่มี prompt`);
      }
}

// ภาพปกที่ไม่มี alt คือภาพที่โปรแกรมอ่านหน้าจออ่านไม่ออก — ให้ build พังดีกว่าขึ้นเว็บเงียบๆ
for (const p of insights) {
  if (p.cover && (!p.th.coverAlt || !p.en.coverAlt))
    throw new Error(`insights: บทความ "${p.slug}" มีภาพปกแต่ไม่มี coverAlt ครบสองภาษา`);
}
