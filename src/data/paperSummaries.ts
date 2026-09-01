/**
 * บทสรุปย่อยง่ายของผลงานตีพิมพ์ — "งานวิจัยชิ้นนี้พูดว่าอะไร" สำหรับคนที่ไม่ได้อ่านวารสาร
 *
 * ทำไมต้องมี: หน้า /research เดิมเป็นรายการชื่อเรื่องกับลิงก์ DOI ซึ่งบอกได้แค่ว่า
 * "ศูนย์ฯ ตีพิมพ์อะไรบ้าง" แต่ไม่ได้บอกว่า "แล้วมันได้ความรู้อะไรมา" คนที่ควรได้
 * ประโยชน์จากงานเหล่านี้มากที่สุด — คนทำนโยบาย นักข่าว องค์กรที่จะทำแคมเปญ นิสิต —
 * มักไม่เปิดไฟล์วารสารอ่าน หน้าบทสรุปจึงเป็นสะพาน
 *
 * **กติกาการเขียนที่ต้องรักษาไว้ (ผูกกับ CLAUDE.md ข้อ 8):**
 * 1. ทุกบทสรุป**เขียนจากตัวบทความจริง**ที่อ่านครบแล้ว ไม่ใช่จากชื่อเรื่องหรือบทคัดย่อลอยๆ
 * 2. ตัวเลขทุกตัวต้องมาจากบทความ ห้ามปัดเศษให้ดูดีขึ้นหรือเดาแทน
 * 3. **ผลที่ไม่พบนัยสำคัญต้องเขียนด้วย** ไม่ใช่เล่าแต่ผลที่สวย — งานวิจัยที่รายงาน
 *    แต่ด้านที่ได้ผลคือการบิดเบือน และเป็นสิ่งที่เว็บของหน่วยวิจัยต้องไม่ทำ
 * 4. ข้อจำกัดของงาน (กลุ่มตัวอย่างเล็ก เก็บข้อมูลนานแล้ว ฯลฯ) เขียนไว้ใน `caveat`
 *    เพื่อไม่ให้ผู้อ่านทั่วไปเอาไปอ้างเกินกว่าที่งานรองรับ
 *
 * **เว็บไม่ได้เก็บไฟล์ PDF ไว้เสิร์ฟเอง** (ตัดสินใจ 31 ส.ค. 2569)
 *
 * ปุ่มดาวน์โหลดชี้ไปคลังของสำนักพิมพ์ต้นทางโดยตรง เปิดในแท็บใหม่ ไม่ใช่ไฟล์ในเว็บเรา
 *
 * เหตุผลหลัก**ไม่ใช่เรื่องลิขสิทธิ์** — ทั้ง 6 ชิ้นเป็น Creative Commons ซึ่งเจ้าของ
 * ลิขสิทธิ์อนุญาตให้เผยแพร่ซ้ำไว้ชัดเจนแล้ว การเก็บสำเนาจึงไม่ผิดอะไรตั้งแต่ต้น
 *
 * เหตุผลจริงคือ**ความถูกต้องของฉบับ**: ถ้าวารสารออกใบแก้ไข (erratum) หรือถอน
 * บทความ (retraction) สำเนาที่เราเก็บจะกลายเป็นฉบับเก่าที่ผิดโดยเราไม่รู้ตัว แล้ว
 * เรายังยื่นให้ผู้อ่านต่อไปเรื่อยๆ สำหรับเว็บของหน่วยวิจัย การส่งบทความฉบับที่ถูก
 * แทนที่ไปแล้วให้ผู้อ่านเป็นปัญหาหนักกว่าจดหมายเรื่องลิขสิทธิ์เสียอีก · ลิงก์ไป
 * ต้นทางได้ฉบับปัจจุบันเสมอ และช่วยลดขนาดที่ deploy ทุกครั้งด้วย
 *
 * ไฟล์ต้นฉบับยังเก็บไว้ใน `research-sources/papers/` (นอก public/ จึงไม่ถูกเสิร์ฟ)
 * เพื่อให้ AI ที่ทำงานในคลังนี้อ่านตอนทำคอนเทนต์ได้ — **เก็บได้เฉพาะบทความที่
 * สัญญาอนุญาตเป็น Creative Commons เท่านั้น** เพราะคลัง GitHub นี้เป็นสาธารณะ
 * การใส่ไฟล์ที่สำนักพิมพ์ถือลิขสิทธิ์ลงไปคือการเผยแพร่ซ้ำโดยไม่ได้รับอนุญาตเต็มๆ
 * ถ้าจะให้ AI อ่านบทความที่ปิด ต้องเก็บในที่ส่วนตัว ไม่ใช่ในคลังนี้
 *
 * บทสรุปเป็นงานเขียนของศูนย์ฯ เอง ไม่ใช่ส่วนหนึ่งของบทความต้นฉบับ จึงไม่ติดเงื่อนไข
 * NoDerivatives (nd) ของบทความที่ใช้สัญญาอนุญาตนั้น — แต่หน้าเว็บต้องแยกให้ผู้อ่าน
 * เห็นชัดว่าอะไรคือคำของผู้เขียนงาน อะไรคือคำสรุปของเรา
 */

/** สัญญาอนุญาต Creative Commons ที่เจอในผลงานของศูนย์ฯ */
export type CcLicense = "cc-by" | "cc-by-sa" | "cc-by-nc" | "cc-by-nc-sa" | "cc-by-nc-nd";

/** ชื่อเต็มและลิงก์ตัวบทสัญญาอนุญาต — CC บังคับให้ระบุ ไม่ใช่แค่บอกว่า "เปิดฟรี" */
export const CC_LICENSES: Record<CcLicense, { label: string; href: string }> = {
  "cc-by": { label: "CC BY 4.0", href: "https://creativecommons.org/licenses/by/4.0/" },
  "cc-by-sa": { label: "CC BY-SA 4.0", href: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "cc-by-nc": { label: "CC BY-NC 4.0", href: "https://creativecommons.org/licenses/by-nc/4.0/" },
  "cc-by-nc-sa": {
    label: "CC BY-NC-SA 4.0",
    href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
  "cc-by-nc-nd": {
    label: "CC BY-NC-ND 4.0",
    href: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  },
};

type PaperCopy = {
  /** พาดหัวภาษาชาวบ้าน — ไม่ใช่ชื่อบทความ ต้องอ่านแล้วรู้ทันทีว่าได้อะไร */
  headline: string;
  /** งานนี้ตั้งคำถามอะไร */
  question: string;
  /** ทำอย่างไร — ให้ผู้อ่านชั่งน้ำหนักหลักฐานได้เอง */
  method: string;
  /** พบอะไร — รวมผลที่ไม่พบนัยสำคัญด้วย */
  findings: string[];
  /** แล้วยังไงต่อ — ใครเอาไปใช้ได้ ใช้อย่างไร */
  soWhat: string;
  /** ข้อจำกัดที่ผู้อ่านต้องรู้ก่อนเอาไปอ้าง */
  caveat: string;
};

export type PaperSummary = {
  /** ใช้เป็น URL: /research/<slug> และ /en/research/<slug> */
  slug: string;
  /** กุญแจเชื่อมกลับไป publications.ts — ใช้ DOI เพราะเป็นค่าที่ไม่เปลี่ยน */
  doi: string;
  license: CcLicense;
  /**
   * ปลายทางของปุ่ม "เปิด PDF ที่ต้นทาง" — URL ของสำนักพิมพ์เอง ไม่ใช่ไฟล์ในเว็บเรา
   * ไม่มีค่าก็ได้ ถ้าไม่มีจะเหลือแค่ลิงก์ DOI ซึ่งพาไปหน้าบทความที่มีปุ่มดาวน์โหลดอยู่แล้ว
   */
  pdfUrl?: string;
  /** ชื่อไฟล์สำเนาใน research-sources/papers/ — ไว้ให้ AI อ่าน ไม่ได้เสิร์ฟบนเว็บ */
  localCopy?: string;
  th: PaperCopy;
  en: PaperCopy;
};

export const paperSummaries: PaperSummary[] = [
  {
    slug: "engage-a3-model",
    doi: "10.5114/hivar.2022.115679",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-46896-10",
    localCopy: "engage-a3-model.pdf",
    th: {
      headline: "สื่อสารเรื่องเอดส์กับแรงงานข้ามชาติ ต้องเริ่มที่ความไว้วางใจ ไม่ใช่ที่ข้อมูล",
      question:
        "การให้ข้อมูลสุขภาพกับแรงงานข้ามชาติชาวเมียนมาในไทยติดปัญหาซ้ำๆ ทั้งกำแพงภาษา ข้อมูลที่ให้ไม่ตรงกับที่เขาอยากรู้ ใช้ช่องทางและจังหวะเวลาที่ไม่เหมาะ และผลที่ได้ไม่ยั่งยืน งานนี้ถามว่าแล้วควรออกแบบการสื่อสารความเสี่ยงอย่างไรจึงจะแก้ปัญหาเหล่านั้นได้พร้อมกัน",
      method:
        "ผู้วิจัยสร้างแบบจำลองขึ้นจากบทเรียนภาคสนามของตนเองและการทบทวนวรรณกรรม แล้วนำเข้าสนทนากลุ่มกับผู้เชี่ยวชาญ 10 คน — อาจารย์มหาวิทยาลัยและมืออาชีพด้านการสื่อสาร สาธารณสุข แรงงานข้ามชาติ และการลดความเสี่ยงด้านสุขภาพ ที่มีประสบการณ์เกิน 10 ปี — ให้ประเมินความเหมาะสมของแต่ละองค์ประกอบด้วยมาตรวัด 1 ถึง 5",
      findings: [
        "ได้แบบจำลอง ENGAGE-A3 หกขั้น — สร้างความไว้วางใจ (Earning trust) · สำรวจบริบทแวดล้อม (ENvironmental scanning) · หาคนในพื้นที่มาช่วย (Getting local help) · ลงมือทำ (Action) · ทำให้เป็นเกม (Gamification) · ประเมินผล (Evaluating) — ซึ่งนำไปสู่ผลสามด้านคือการประเมินตนเอง ความตระหนัก และการเป็นปากเสียงให้เรื่องนี้",
        "คะแนนความเหมาะสมโดยรวมอยู่ที่ 4.26 จาก 5 = ระดับ “เหมาะสมมาก”",
        "สองขั้นที่ผู้เชี่ยวชาญให้คะแนนสูงสุดเท่ากันคือ การสร้างความไว้วางใจ และการทำให้เป็นเกม (4.45 ทั้งคู่) รองลงมาคือ การหาคนในพื้นที่มาช่วย และการลงมือทำ (4.36 ทั้งคู่)",
        "ขั้นประเมินผลได้คะแนนต่ำสุดในหกขั้น คือ 4.18 ซึ่งอยู่ที่ระดับ “เหมาะสม” ไม่ถึง “เหมาะสมมาก”",
      ],
      soWhat:
        "ข้อค้นพบที่ใช้ได้ทันทีคือลำดับ — งานสื่อสารสุขภาพกับกลุ่มเปราะบางมักเริ่มจากการผลิตสื่อ แต่ผู้เชี่ยวชาญให้น้ำหนักสูงสุดกับสิ่งที่ต้องทำ*ก่อน*ผลิตสื่อ คือการสร้างความไว้วางใจและการดึงคนในพื้นที่เข้ามาเป็นเจ้าของงาน องค์กรที่กำลังออกแบบแคมเปญกับแรงงานข้ามชาติเอาหกขั้นนี้ไปใช้เป็นโครงได้เลย",
      caveat:
        "งานชิ้นนี้ประเมินความเหมาะสมของแบบจำลองด้วยความเห็นผู้เชี่ยวชาญ 10 คน ไม่ใช่การวัดผลลัพธ์ทางสุขภาพในภาคสนาม (ส่วนนั้นอยู่ในงานปี 2019 ของทีมเดียวกัน)",
    },
    en: {
      headline: "Reaching migrant workers on HIV starts with trust, not with information",
      question:
        "Health communication aimed at Myanmar transnational workers in Thailand keeps hitting the same obstacles: language barriers, information that does not match what workers actually want to know, the wrong channels and timing, and results that do not last. This study asks how risk communication should be designed to address those problems together.",
      method:
        "The researchers built a proposed model from their own field experience and a literature review, then put it to a focus group of ten experts — university academics and professionals in communication, public health, migration, and health risk reduction, each with more than ten years of experience — who rated the appropriateness of every component on a 1-to-5 scale.",
      findings: [
        "The result is the six-step ENGAGE-A3 model — Earning trust, ENvironmental scanning, Getting local help, Action, Gamification, and Evaluating — leading to three outcomes: assessment, awareness, and advocacy.",
        "Overall appropriateness scored 4.26 out of 5, in the “very appropriate” band.",
        "Earning trust and gamification tied for the highest expert rating at 4.45, followed by getting local help and action at 4.36.",
        "Evaluation scored lowest of the six components at 4.18 — “appropriate”, but not “very appropriate”.",
      ],
      soWhat:
        "The immediately usable finding is the ordering. Health campaigns for vulnerable groups usually begin by producing materials, yet the experts gave their highest marks to what has to happen *before* any material exists: earning trust and bringing local people in as owners of the work. Organisations designing a campaign with migrant workers can adopt the six steps as a scaffold.",
      caveat:
        "This study evaluates the model's appropriateness through the judgement of ten experts. It does not measure health outcomes in the field — that is the 2019 study by the same team.",
    },
  },
  {
    slug: "hiv-risk-communication-samut-sakhon",
    doi: "10.5114/hivar.2019.88535",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-37921-10",
    localCopy: "hiv-risk-communication-samut-sakhon.pdf",
    th: {
      headline: "แคมเปญที่แรงงานร่วมออกแบบเอง เพิ่มความรู้และความมั่นใจได้ แต่ไม่ได้ทำให้รู้สึกว่าตัวเองเสี่ยง",
      question:
        "ถ้าให้แรงงานข้ามชาติเป็นผู้ร่วมออกแบบแคมเปญสื่อสารความเสี่ยงเอชไอวีเอง แทนที่จะเป็นผู้รับสารอย่างเดียว จะเปลี่ยนความรู้ ความมั่นใจ การรับรู้ความเสี่ยง และพฤติกรรมป้องกันได้จริงหรือไม่",
      method:
        "ออกแบบแคมเปญจากข้อมูลของสนทนากลุ่มสองกลุ่ม รวมผู้ร่วม 16 คนในโรงงานที่สมุทรสาคร ประกอบกับการสัมภาษณ์เชิงลึกเจ้าหน้าที่รัฐและองค์กรพัฒนาเอกชนที่ดูแลงานป้องกันเอชไอวี 10 คน จากนั้นให้อาสาสมัครสาธารณสุขที่คัดจากตัวแรงงานเองเป็นผู้เดินงาน ดำเนินการกับแรงงาน 400 คน เป็นเวลาสองสัปดาห์ เริ่มในวันถุงยางอนามัยสากล ปี 2560 องค์ประกอบของแคมเปญมีทั้งกิจกรรม การอบรมเชิงปฏิบัติการ แคมเปญสื่อ และการประเมินผลทั้งเชิงปริมาณและคุณภาพ",
      findings: [
        "คะแนนความรู้เรื่องเอชไอวีเพิ่มขึ้นอย่างมีนัยสำคัญทางสถิติ",
        "ขั้นของการเปลี่ยนแปลงพฤติกรรมเรื่องการใช้ถุงยางอนามัยและการไปตรวจเอชไอวีขยับขึ้นอย่างมีนัยสำคัญ",
        "ความเชื่อมั่นว่าตนเองทำได้ (self-efficacy) และการรับรู้ประโยชน์กับอุปสรรคของการป้องกัน เปลี่ยนแปลงอย่างมีนัยสำคัญ",
        "แต่การรับรู้ว่าตัวเองมีความเสี่ยงจะติดเชื้อ **ไม่เปลี่ยนอย่างมีนัยสำคัญ** ที่ระดับนัยสำคัญ 0.05",
      ],
      soWhat:
        "ผลที่ไม่ขยับมีค่าพอๆ กับผลที่ขยับ แคมเปญทำให้คนรู้มากขึ้นและมั่นใจว่าป้องกันตัวเองได้ โดยไม่จำเป็นต้องทำให้เขารู้สึกว่าตัวเองเสี่ยงก่อน นั่นแปลว่าการออกแบบแคมเปญสุขภาพไม่ต้องพึ่งการทำให้กลัวก็เปลี่ยนพฤติกรรมได้ — และการที่แรงงานเป็นผู้ร่วมออกแบบคือปัจจัยที่ผู้วิจัยสรุปว่าทำให้แคมเปญได้ผล",
      caveat:
        "เป็นการศึกษาในโรงงานเดียวที่สมุทรสาคร เก็บข้อมูลปี 2560 และวัดพฤติกรรมด้วยการรายงานของผู้เข้าร่วมเอง",
    },
    en: {
      headline:
        "A campaign the workers helped design raised knowledge and confidence — but not their sense of personal risk",
      question:
        "If migrant workers help design an HIV risk communication campaign themselves rather than simply receiving it, does that actually change their knowledge, confidence, perceived risk, and preventive behaviour?",
      method:
        "The campaign was designed from two focus groups totalling 16 workers at a factory in Samut Sakhon, together with in-depth interviews with ten government and NGO officers responsible for HIV prevention. Health volunteers recruited from among the workers themselves then delivered it to 400 workers over two weeks, starting on International Condom Day in 2017. The campaign combined events, workshops and training, a media campaign, and both quantitative and qualitative evaluation.",
      findings: [
        "Knowledge scores rose significantly.",
        "Stages of change for condom use and for HIV testing both advanced significantly.",
        "Self-efficacy, and perceived benefits and barriers to prevention, changed significantly.",
        "Perceived personal risk of contracting HIV, however, **did not change significantly** (alpha 0.05).",
      ],
      soWhat:
        "What did not move matters as much as what did. The campaign made people more knowledgeable and more confident they could protect themselves without first making them feel personally at risk — which means health campaigns can change behaviour without relying on fear. The researchers attribute the campaign's effect to the workers' own participation in designing it.",
      caveat:
        "A single factory in Samut Sakhon, data collected in 2017, with behaviour measured by participants' self-reports.",
    },
  },
  {
    slug: "hiv-knowledge-public-health-officers",
    doi: "10.5114/hivar.2017.72029",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-31219-10",
    localCopy: "hiv-knowledge-public-health-officers.pdf",
    th: {
      headline: "ช่องว่างไม่ได้อยู่ที่สื่อไม่ดีพอ แต่อยู่ที่ไม่มีใครถูกมอบหมายให้ทำ",
      question:
        "ความรู้เรื่องเอชไอวีเดินทางจากระบบสาธารณสุขไทยไปถึงแรงงานข้ามชาติชาวเมียนมาได้แค่ไหน งานนี้ไปถามจากฝั่งเจ้าหน้าที่ผู้ปฏิบัติ ไม่ใช่ฝั่งผู้รับสาร",
      method:
        "เก็บข้อมูลด้วยแบบสอบถามจากเจ้าหน้าที่สาธารณสุข 106 คน จากสำนักสื่อสารความเสี่ยงและพัฒนาพฤติกรรมสุขภาพ กรมควบคุมโรค วิเคราะห์ด้วย SPSS รุ่น 22 ใช้สถิติเชิงพรรณนาและการวิเคราะห์สหสัมพันธ์พหุคูณ",
      findings: [
        "ผู้ตอบแบบสอบถาม 106 คน เป็นหญิง 66 คน ชาย 40 คน",
        "**ไม่พบข้อกำหนดจากภาครัฐที่บังคับให้เจ้าหน้าที่สาธารณสุขต้องติดต่อกับแรงงานชาวเมียนมา** เพื่อให้ความรู้เรื่องเอชไอวี",
        "เจ้าหน้าที่จำนวนมากไม่เคยติดต่อกับแรงงานกลุ่มนี้เพื่อสื่อสารเรื่องเอชไอวีเลย",
        "แรงงานชาวเมียนมาส่วนใหญ่ประสบปัญหาในการรับข้อมูลเรื่องเอชไอวี และรูปแบบที่พวกเขาต้องการมากที่สุดคือการอบรมเป็นกลุ่มในสถานที่ทำงาน",
      ],
      soWhat:
        "ข้อสรุปชี้ไปที่โครงสร้าง ไม่ใช่ที่ตัวสื่อ เมื่อไม่มีคำสั่งหรือภารกิจที่ระบุชัดว่าใครรับผิดชอบ งานนี้ก็ไม่เกิดขึ้นแม้จะมีคนพร้อมทำ ข้อเสนอเชิงปฏิบัติของผู้วิจัยคือให้ใช้การอบรมกลุ่มในที่ทำงาน ประกอบกับโปสเตอร์และใบปลิว ซึ่งตรงกับรูปแบบที่แรงงานเลือกเอง",
      caveat:
        "สำรวจเจ้าหน้าที่จากหน่วยงานเดียวในปี 2560 ข้อมูลเกี่ยวกับแรงงานในงานนี้มาจากมุมมองของเจ้าหน้าที่ ไม่ได้ถามแรงงานโดยตรง",
    },
    en: {
      headline: "The gap is not weak materials — it is that nobody was assigned the job",
      question:
        "How far does HIV knowledge actually travel from the Thai public health system to Myanmar migrant workers? This study asks the officers who do the work, rather than the audience.",
      method:
        "A questionnaire was administered to 106 public health officers from the Bureau of Risk Communication and Health Behaviour Development, Department of Disease Control, and analysed in SPSS version 22 using descriptive statistics and multiple correlation analysis.",
      findings: [
        "106 officers responded — 66 women and 40 men.",
        "**No government mandate was found requiring public health officers to engage Myanmar migrants** on HIV knowledge.",
        "A significant number of officers had never interacted with these migrants to convey HIV information at all.",
        "Most Burmese migrants experienced major problems receiving HIV information, and the format they preferred was group training at the workplace.",
      ],
      soWhat:
        "The conclusion points at structure rather than at materials: with no mandate naming who is responsible, the work does not happen even where willing staff exist. The authors' practical recommendation is group training in migrants' workplaces alongside posters and flyers — matching the format the workers themselves preferred.",
      caveat:
        "A 2017 survey of officers at a single agency. What it reports about migrants comes from the officers' perspective, not from migrants directly.",
    },
  },
  {
    slug: "vr360-neck-shoulder-pain",
    doi: "10.55131/jphd/2022/200118",
    license: "cc-by-nc-nd",
    pdfUrl: "https://he01.tci-thaijo.org/index.php/AIHD-MU/article/view/254520",
    localCopy: "vr360-neck-shoulder-pain.pdf",
    th: {
      headline: "วิดีโอ 360 องศาสอนยืดคอบ่า ผู้หญิงวัยทำงานรับได้ และรู้สึกจดจ่อกว่าวิดีโอธรรมดา",
      question:
        "กลุ่มอาการปวดกล้ามเนื้อและพังผืด (myofascial pain syndrome) รักษาด้วยการออกกำลังกายได้ และตอนนี้กล้องถ่ายวิดีโอ 360 องศาราคาถูกลงมากพร้อมกับที่ยูทูบเปิดให้อัปโหลดฟรี คำถามคือสื่อ VR360 ที่สอนท่ายืดคลายปวดคอและบ่าจะเป็นที่ยอมรับของผู้หญิงวัยทำงานหรือไม่",
      method:
        "คัดผู้หญิงวัยทำงาน 20 คน อายุ 25–40 ปี ที่ถือว่ามีความเสี่ยงต่อกลุ่มอาการนี้ ให้ชมวิดีโอ VR360 แล้วเก็บข้อมูลด้วยแบบสอบถามและการสัมภาษณ์เชิงลึก ระหว่างเดือนมีนาคมถึงเมษายน 2560",
      findings: [
        "ผู้เข้าร่วมพึงพอใจกับวิดีโอ VR360 ในระดับสูงมาก",
        "เห็นด้วยอย่างยิ่งว่า VR360 ทำให้จดจ่อกับสิ่งที่อยู่ตรงหน้ามากกว่าวิดีโอปกติ",
        "รู้สึกเป็นส่วนหนึ่งของเหตุการณ์ที่กำลังชม และรู้สึกว่าเลือกทิศทางการมองได้อย่างอิสระ",
        "เห็นว่าเนื้อหาน่าสนใจและเรียบเรียงดี ส่วนการเลือกผู้นำเสนอ สถานที่ การแสดงอารมณ์ โทนของงาน และความยาว อยู่ในระดับเหมาะสม",
      ],
      soWhat:
        "ข้อสรุปของผู้วิจัยคือเมื่อเนื้อหาออกแบบมาดีพอและต้นทุนเทคโนโลยีลดลงขนาดนี้ VR360 ก็กลายเป็นวิธีจัดการความปวดที่ยอมรับได้ในทางปฏิบัติ — แปลว่าองค์กรที่อยากทำสื่อสุขภาพแบบนี้ไม่ต้องรอห้องแล็บหรืองบก้อนใหญ่อีกต่อไป",
      caveat:
        "เป็นการศึกษาทัศนคติและความคิดเห็นของผู้ชม 20 คน **ไม่ได้วัดว่าอาการปวดลดลงจริงหรือไม่** และเก็บข้อมูลตั้งแต่ปี 2560",
    },
    en: {
      headline:
        "A 360-degree video teaching neck and shoulder stretches held working women's attention better than ordinary video",
      question:
        "Myofascial pain syndrome responds to exercise, and 360-degree cameras have become cheap while YouTube hosts the format for free. Would a VR360 video teaching stretches for neck and shoulder pain actually be accepted by working-age women?",
      method:
        "Twenty working-age women aged 25 to 40 considered at risk of the syndrome watched a VR360 video, after which data was collected through questionnaires and in-depth interviews during March and April 2017.",
      findings: [
        "Participants were extremely satisfied with the VR360 video.",
        "They strongly agreed that VR360 made them concentrate on what was in front of them more than ordinary video did.",
        "They felt part of the event they were viewing, and free to control the direction of their view.",
        "They found the video interesting and well organised, and rated the presenter, location, emotional expression, mood and tone, and duration as appropriate.",
      ],
      soWhat:
        "The authors conclude that adequately designed content plus the falling cost of the technology makes VR360 a practically acceptable way of dealing with pain — meaning organisations wanting to make health media of this kind no longer need a lab or a large budget.",
      caveat:
        "This is a study of the attitudes and opinions of 20 viewers. It **does not measure whether pain actually decreased**, and the data was collected in 2017.",
    },
  },
  {
    slug: "cryptocurrency-adoption-reddit",
    doi: "10.1080/23311975.2024.2402513",
    license: "cc-by",
    pdfUrl: "https://www.econstor.eu/handle/10419/326569",
    localCopy: "cryptocurrency-adoption-reddit.pdf",
    th: {
      headline: "คุณค่าที่มองเห็นดันให้ลงทุนคริปโต ความเสี่ยงที่มองเห็นดึงกลับ และภูมิหลังของคนกำกับน้ำหนักทั้งสองแรง",
      question:
        "นักลงทุนรายย่อยเป็นแรงขับสำคัญที่ทำให้คริปโตเคอร์เรนซีแพร่หลาย แต่ยังไม่ค่อยมีงานที่ตรวจสอบว่า “คุณค่าที่รับรู้” กับ “ความเสี่ยงที่รับรู้” ทำงานอย่างไรในการตัดสินใจของคนกลุ่มนี้ งานนี้เข้าไปตอบช่องว่างนั้น",
      method:
        "สำรวจผู้ใช้โซเชียลมีเดียที่ใช้งานอยู่บนแพลตฟอร์ม Reddit จำนวน 200 คน แล้ววิเคราะห์ความสัมพันธ์ระหว่างคุณค่าที่รับรู้ ความเสี่ยงที่รับรู้ ปัจจัยด้านประชากร และการยอมรับการลงทุนคริปโต",
      findings: [
        "คุณค่าที่รับรู้ส่งผลทางบวกต่อการยอมรับการลงทุนคริปโตเคอร์เรนซี",
        "ความเสี่ยงที่รับรู้ส่งผลทางลบ",
        "อายุ ระดับการศึกษา เพศ รายได้ต่อเดือน และประสบการณ์การลงทุน ทำหน้าที่เป็นตัวแปรกำกับ (moderator) ความสัมพันธ์ระหว่างสองแรงนั้นกับการยอมรับ",
      ],
      soWhat:
        "สำหรับคนทำงานสื่อสารการเงิน ข้อค้นพบนี้บอกว่าการพูดถึงคริปโตด้วยข้อความชุดเดียวกับทุกกลุ่มไม่ได้ผล เพราะน้ำหนักที่คนให้กับคุณค่าและความเสี่ยงเปลี่ยนไปตามอายุ การศึกษา รายได้ และประสบการณ์ลงทุนของแต่ละคน",
      caveat:
        "สำรวจผู้ใช้ Reddit 200 คน ซึ่งเป็นชุมชนออนไลน์ที่มีลักษณะเฉพาะ ไม่ใช่ตัวแทนของนักลงทุนทั่วไปหรือของผู้ใช้ในประเทศไทย",
    },
    en: {
      headline:
        "Perceived value pushes people into crypto, perceived risk pulls them back — and who they are decides which wins",
      question:
        "Retail investors drive much of cryptocurrency's adoption, yet the perceived value and perceived risk behind their decisions have not been examined closely. This study addresses that gap.",
      method:
        "A survey of 200 social media users active on Reddit, analysing the interplay between perceived value, perceived risk, demographic factors, and the adoption of cryptocurrency investment.",
      findings: [
        "Perceived value positively influences acceptance of cryptocurrency investment.",
        "Perceived risk exerts a negative influence.",
        "Age, education, gender, monthly income, and investment experience all moderate the relationship between those two forces and adoption.",
      ],
      soWhat:
        "For anyone communicating about finance, the finding says a single message will not work across audiences: how much weight people give to value versus risk shifts with their age, education, income, and investing experience.",
      caveat:
        "A survey of 200 Reddit users — a distinctive online community, not a representative sample of investors generally or of users in Thailand.",
    },
  },
  {
    slug: "bitcoin-ownership-property-rights",
    doi: "10.35297/001c.123605",
    license: "cc-by",
    pdfUrl: "https://jls.mises.org/article/123605.pdf",
    localCopy: "bitcoin-ownership-property-rights.pdf",
    th: {
      headline: "บิตคอยน์จับต้องไม่ได้ แต่ก็ยัง “เป็นเจ้าของ” ได้ — ข้อโต้แย้งทางทฤษฎีกฎหมาย",
      question:
        "นักคิดสายเสรีนิยมบางกลุ่มเห็นว่าบิตคอยน์เป็นเจ้าของไม่ได้ เพราะเป็นสินทรัพย์ดิจิทัลที่ไม่มีตัวตนทางกายภาพ จึงไม่เข้าเกณฑ์ของกรรมสิทธิ์แบบดั้งเดิม บทความนี้ตั้งใจโต้แย้งข้อสรุปนั้นโดยตรง",
      method:
        "เป็นบทความเชิงทฤษฎีทางกฎหมายและปรัชญา ไม่ใช่งานเก็บข้อมูลเชิงประจักษ์ ผู้เขียนวิเคราะห์ข้อโต้แย้งของ Konrad S. Graf และ Stephan Kinsella ที่เห็นว่าไม่ควรรับรองสิทธิ์ในบิตคอยน์ แล้วเสนอเหตุผลคัดค้านทีละข้อ",
      findings: [
        "ข้อโต้แย้งหลักคือเทคโนโลยีเบื้องหลังบิตคอยน์ทำให้มันเป็นทรัพยากรที่ “หายากและแย่งกันใช้ได้” (scarce and rivalrous) ซึ่งเป็นเงื่อนไขเดียวกับที่ทำให้ทรัพย์สินทั่วไปต้องมีกรรมสิทธิ์",
        "ข้อพิพาทเรื่องการใช้บิตคอยน์เกิดขึ้นได้จริง และหน้าที่โดยทั่วไปของกรรมสิทธิ์คือป้องกันข้อพิพาทแบบนั้นด้วยการกำหนดสิทธิ์ครอบครองแต่ผู้เดียว กรรมสิทธิ์จึงควรขยายมาครอบคลุมบิตคอยน์",
        "บทความอภิปรายต่อถึงผลที่ตามมาหากรับรองบิตคอยน์เป็นทรัพยากรที่เป็นเจ้าของได้ในสังคมที่ใช้กฎหมายเอกชน รวมถึงความยากในการเอาผิดกรณีบิตคอยน์ถูกขโมย",
      ],
      soWhat:
        "เป็นตัวอย่างงานของศูนย์ฯ ในสายทฤษฎีการสื่อสารและปรัชญากฎหมาย ที่แสดงว่าคำถามเรื่องทรัพย์สินดิจิทัลไม่ได้จบที่เทคโนโลยี แต่ต้องตอบด้วยกรอบคิดว่าอะไรทำให้สิ่งหนึ่งเป็นสิ่งที่เป็นเจ้าของได้",
      caveat:
        "เป็นข้อถกเถียงเชิงทฤษฎี ไม่ใช่ข้อสรุปทางกฎหมายที่ใช้บังคับได้ และผู้เขียนระบุไว้เองในบทความว่าชื่อเรื่องไม่ใช่คำแนะนำในการลงทุน",
    },
    en: {
      headline: "Bitcoin is intangible, yet still ownable — an argument in legal theory",
      question:
        "Several libertarian writers hold that bitcoin cannot be owned: as an intangible digital asset it fails the criteria for traditional ownership. This article sets out to refute that position.",
      method:
        "A work of legal and philosophical theory rather than empirical research. The author examines the arguments of Konrad S. Graf and Stephan Kinsella against recognising property rights in bitcoin, and answers them in turn.",
      findings: [
        "The central argument is that the technology behind bitcoin makes it a scarce, rivalrous resource — the same condition that makes ordinary property require ownership rules.",
        "Conflicts over the use of bitcoin can and do arise, and the general function of property rights is to avoid such conflicts by assigning exclusive ownership; property rights should therefore extend to bitcoin.",
        "The article goes on to discuss what follows from recognising bitcoin as an ownable scarce resource in a private law society, including the difficulty of penalising bitcoin theft.",
      ],
      soWhat:
        "It illustrates the centre's work in communication theory and legal philosophy, showing that questions about digital property are not settled by technology alone but by what makes something ownable in the first place.",
      caveat:
        "A theoretical argument rather than a statement of enforceable law. The author notes in the article that the title is not financial advice.",
    },
  },
];

/** ค้นบทสรุปจาก DOI ของผลงาน — ใช้ตอน render รายการใน /research */
export const summaryByDoi = new Map(paperSummaries.map((s) => [s.doi, s]));

export const paperSummaryBySlug = (slug: string) =>
  paperSummaries.find((s) => s.slug === slug);
