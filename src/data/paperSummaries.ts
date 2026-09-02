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
 * 5. **ห้ามระบุชื่อองค์กรหรือบุคคลที่ถูกวิจารณ์ในข้อค้นพบ** — บทความต้นฉบับระบุได้
 *    เพราะเป็นงานวิชาการที่ผ่านการตรวจ แต่บทสรุปบนเว็บนี้เป็นงานเขียนของศูนย์ฯ เอง
 *    ผู้อ่านย่อมอ่านว่าเป็นคำตัดสินของศูนย์ฯ ไม่ใช่การรายงานผลวิจัย และชื่อเหล่านั้น
 *    ไม่ได้เพิ่มคุณค่าให้บทเรียนที่นำไปใช้ได้เลย (พบเมื่อ 2 ก.ย. 2569 — ผู้ใช้เป็นคนทัก
 *    ในกรณีสถานีโทรทัศน์ที่ถูกสั่งปรับจากการรายงานข่าวโคราช)
 *    **ต้องตัดตัวเลขที่ชี้ตัวได้ออกด้วย** เช่นยอดผู้ติดตามเพจที่ค้นกลับได้ทันที
 *    การตัดแต่ชื่อแล้วทิ้งลายนิ้วมือไว้ไม่ได้ปิดอะไรเลย · เมื่อตัดแล้วให้เขียนบอกใน
 *    `caveat` ว่าเราตั้งใจไม่ระบุ ไม่ใช่ตัดเงียบๆ ซึ่งจะดูเหมือนลดทอนงานวิจัย
 *    · **ข้อนี้ไม่ห้ามเอ่ยชื่อที่เป็นเพียงขอบเขตของงานและไม่มีข้อวิจารณ์พ่วง**
 *    เช่นระบุว่างานสำรวจผู้ใช้แอปสองเจ้า และไม่ห้ามเอ่ยชื่อหน่วยงานรัฐที่ใช้อำนาจ
 *    ตามกฎหมาย ซึ่งเป็นข้อเท็จจริงสาธารณะ
 *
 * **เว็บไม่ได้เก็บไฟล์ PDF ไว้เสิร์ฟเอง** (ตัดสินใจ 31 ส.ค. 2569)
 *
 * ปุ่มดาวน์โหลดชี้ไปคลังของสำนักพิมพ์ต้นทางโดยตรง เปิดในแท็บใหม่ ไม่ใช่ไฟล์ในเว็บเรา
 *
 * เหตุผลคือ**ความถูกต้องของฉบับ**: ถ้าวารสารออกใบแก้ไข (erratum) หรือถอน
 * บทความ (retraction) สำเนาที่เราเก็บจะกลายเป็นฉบับเก่าที่ผิดโดยเราไม่รู้ตัว แล้ว
 * เรายังยื่นให้ผู้อ่านต่อไปเรื่อยๆ สำหรับเว็บของหน่วยวิจัย การส่งบทความฉบับที่ถูก
 * แทนที่ไปแล้วให้ผู้อ่านเป็นปัญหาหนักกว่าจดหมายเรื่องลิขสิทธิ์เสียอีก · ลิงก์ไป
 * ต้นทางได้ฉบับปัจจุบันเสมอ และช่วยลดขนาดที่ deploy ทุกครั้งด้วย
 *
 * ไฟล์ต้นฉบับบางส่วนเก็บไว้ใน `research-sources/papers/` (นอก public/ จึงไม่ถูกเสิร์ฟ)
 * เพื่อให้ AI ที่ทำงานในคลังนี้อ่านตอนทำคอนเทนต์ได้ — **เก็บได้เฉพาะบทความที่
 * สัญญาอนุญาตเป็น Creative Commons เท่านั้น** เพราะคลัง GitHub นี้เป็นสาธารณะ
 * การใส่ไฟล์ที่สำนักพิมพ์ถือลิขสิทธิ์ลงไปคือการเผยแพร่ซ้ำโดยไม่ได้รับอนุญาตเต็มๆ
 * ถ้าจะให้ AI อ่านบทความที่ปิด ต้องเก็บในที่ส่วนตัว ไม่ใช่ในคลังนี้
 *
 * บทสรุปเป็นงานเขียนของศูนย์ฯ เอง ไม่ใช่ส่วนหนึ่งของบทความต้นฉบับ จึงไม่ติดเงื่อนไข
 * NoDerivatives (nd) ของบทความที่ใช้สัญญาอนุญาตนั้น — แต่หน้าเว็บต้องแยกให้ผู้อ่าน
 * เห็นชัดว่าอะไรคือคำของผู้เขียนงาน อะไรคือคำสรุปของเรา
 *
 * **บทความไทยส่วนใหญ่ไม่มีทั้ง DOI และสัญญาอนุญาต CC** (ตรวจ 1 ก.ย. 2569)
 *
 * ชุดที่เพิ่มจาก ThaiJO ทำให้เจอสองข้อจำกัดที่ชุดแรกไม่มี และทั้งคู่ห้ามกลบ:
 * 1. `jprad`, `jcomm`, `jcmn` **ไม่ออก DOI ให้บทความเลย** (ไม่มี meta `citation_doi`
 *    ในหน้าบทความสักหน้า) รายการเหล่านี้จึงผูกกับ `publications.ts` ด้วย `indexUrl`
 *    และ JSON-LD ต้องใช้ URL หน้าบทความแทน DOI จะแต่ง DOI ขึ้นเองไม่ได้
 * 2. `jprad` กับ `jcmn` ประกาศลิขสิทธิ์แบบสงวนสิทธิ์ ไม่ใช่ CC (`DC.Rights` ว่างเปล่า
 *    และไม่มีลิงก์ creativecommons.org ทั้งในหน้าบทความและหน้านโยบายของวารสาร)
 *    `license` จึงเป็น optional — **ไม่มีค่าแปลว่าไม่มีสัญญาอนุญาต ไม่ใช่ยังไม่ได้กรอก**
 *    หน้าเว็บต้องไม่แสดงข้อความ CC ให้รายการที่ไม่มีค่า และห้ามเก็บ `localCopy`
 */

import { publications, type PublicationEntry } from "@/data/publications";

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

/**
 * กุญแจเชื่อมกลับไป `publications.ts` — ต้องมีอย่างใดอย่างหนึ่งเสมอ
 *
 * ใช้ DOI เมื่อมี เพราะเป็นค่าที่ไม่เปลี่ยน ส่วนวารสารที่ไม่ออก DOI (ThaiJO หลายเล่ม)
 * ใช้ URL หน้าบทความซึ่งเป็นค่าเดียวกับ field `indexUrl` ใน publications.ts
 * เขียนเป็น union เพื่อให้ TypeScript ปฏิเสธรายการที่ไม่ใส่กุญแจตั้งแต่ตอนคอมไพล์
 */
type PaperRef =
  | { doi: string; indexUrl?: undefined }
  | { doi?: undefined; indexUrl: string };

export type PaperSummary = PaperRef & {
  /** ใช้เป็น URL: /research/<slug> และ /en/research/<slug> */
  slug: string;
  /** ภาษาที่**ตัวบทความ**เขียน ไม่ใช่ภาษาของหน้าเว็บ — ส่งเข้า inLanguage ของ JSON-LD */
  articleLanguage: "th" | "en";
  /**
   * คำบรรยายภาพประกอบหัวบทสรุป (บังคับ) — ไฟล์อยู่ที่
   * `public/images/research/summaries/<slug>.webp` พร้อมคู่ย่อ `-800` และ `-1200`
   * จึงเก็บแค่คำบรรยาย ไม่ต้องเก็บ path ซ้ำให้หลุดจากกันภายหลัง
   *
   * **หลักการวาด: วาดรูปร่างของ "ข้อค้นพบ" ไม่ใช่วาดเนื้อเรื่อง** — ในชุดนี้มีงานที่
   * แตะเหตุการณ์จริงซึ่งมีผู้เสียชีวิต การคุกคามทางเพศ ความขัดแย้งที่ยังดำเนินอยู่
   * และโรคที่ยังถูกตีตรา ภาพประกอบตามเนื้อเรื่องจะเสียหายมากกว่าไม่มีภาพ
   * ภาพจึงเป็นอุปมานามธรรมของ*โครงสร้างข้อสรุป* เท่านั้น (เช่น "เชื่อใจมากแต่ไม่จ่าย"
   * = ชามใหญ่เต็มปรี่ต่อเส้นด้ายบางไปยังชามจิ๋วที่ว่าง) และทำตาม BRAND.md E3
   * ทุกใบ: วัตถุกระดาษ สองสีต่อภาพ พื้นครีม ไม่มีตัวอักษร ไม่มีคน
   *
   * เขียนแยกสองภาษา ไม่ใช่คำแปลตรงตัว และต้องบอกว่า "ภาพเป็นรูปอะไร"
   * ไม่ใช่ทวนพาดหัวซ้ำกับ h1 ที่อยู่เหนือมัน
   */
  illustrationAltTh: string;
  illustrationAltEn: string;
  /**
   * สัญญาอนุญาตของบทความต้นฉบับ — **ไม่มีค่าแปลว่าวารสารสงวนลิขสิทธิ์ไว้**
   * ไม่ได้แปลว่ายังไม่ได้ตรวจ ห้ามเดาใส่ และห้ามแสดงข้อความ CC ให้รายการที่ไม่มีค่า
   */
  license?: CcLicense;
  /**
   * ปลายทางของปุ่ม "เปิด PDF ที่ต้นทาง" — URL ของสำนักพิมพ์เอง ไม่ใช่ไฟล์ในเว็บเรา
   * ไม่มีค่าก็ได้ ถ้าไม่มีจะเหลือแค่ลิงก์ไปหน้าบทความซึ่งมีปุ่มดาวน์โหลดอยู่แล้ว
   */
  pdfUrl?: string;
  /**
   * ชื่อไฟล์สำเนาใน research-sources/papers/ — ไว้ให้ AI อ่าน ไม่ได้เสิร์ฟบนเว็บ
   * **ใส่ได้เฉพาะรายการที่มี `license` เป็น CC** ดู research-sources/README.md
   */
  localCopy?: string;
  th: PaperCopy;
  en: PaperCopy;
};

export const paperSummaries: PaperSummary[] = [
  {
    slug: "engage-a3-model",
    illustrationAltTh: "ภาพประกอบกระดาษ สะพานโค้งที่วางอยู่บนฐานซึ่งถูกวางไว้ก่อน",
    illustrationAltEn: "Paper-craft illustration of an arched span resting on a foundation block laid down first",
    doi: "10.5114/hivar.2022.115679",
    articleLanguage: "en",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-46896-10",
    localCopy: "engage-a3-model.pdf",
    th: {
      headline: "งานสื่อสารเรื่องเอดส์กับแรงงานข้ามชาติ เริ่มที่ความไว้วางใจ ไม่ใช่เริ่มที่ตัวสื่อ",
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
    illustrationAltTh: "ภาพประกอบกระดาษ แท่งสองแท่งสูงขึ้น ส่วนแท่งที่สามยังราบอยู่กับพื้น",
    illustrationAltEn: "Paper-craft illustration of two risen bars beside a third that stays flat",
    doi: "10.5114/hivar.2019.88535",
    articleLanguage: "en",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-37921-10",
    localCopy: "hiv-risk-communication-samut-sakhon.pdf",
    th: {
      headline: "ให้แรงงานออกแบบแคมเปญเอง ความรู้และความมั่นใจเพิ่มขึ้น แต่ยังไม่รู้สึกว่าตัวเองเสี่ยง",
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
    illustrationAltTh: "ภาพประกอบกระดาษ ฟันเฟืองเรียงขบกัน โดยมีช่องหนึ่งว่างอยู่",
    illustrationAltEn: "Paper-craft illustration of a gear train with one gear missing from the row",
    doi: "10.5114/hivar.2017.72029",
    articleLanguage: "en",
    license: "cc-by-nc-sa",
    pdfUrl: "https://www.termedia.pl/Journal/-106/pdf-31219-10",
    localCopy: "hiv-knowledge-public-health-officers.pdf",
    th: {
      headline: "ปัญหาไม่ได้อยู่ที่สื่อไม่ดีพอ แต่อยู่ที่ไม่มีใครมีหน้าที่ต้องทำ",
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
    illustrationAltTh: "ภาพประกอบกระดาษ แผ่นสี่เหลี่ยมแบนใบเล็ก เทียบกับวงแหวนที่โอบรอบจุดกึ่งกลาง",
    illustrationAltEn: "Paper-craft illustration of a small flat rectangle beside a ring that wraps all the way around",
    doi: "10.55131/jphd/2022/200118",
    articleLanguage: "en",
    license: "cc-by-nc-nd",
    pdfUrl: "https://he01.tci-thaijo.org/index.php/AIHD-MU/article/view/254520",
    localCopy: "vr360-neck-shoulder-pain.pdf",
    th: {
      headline: "สอนยืดคอบ่าด้วยวิดีโอ 360 องศา ผู้หญิงวัยทำงานบอกว่าดูแล้วจดจ่อกว่าวิดีโอธรรมดา",
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
    illustrationAltTh: "ภาพประกอบกระดาษ ตราชั่งสามตัวเอียงคนละองศา",
    illustrationAltEn: "Paper-craft illustration of three balance scales, each tipped at a different angle",
    doi: "10.1080/23311975.2024.2402513",
    articleLanguage: "en",
    license: "cc-by",
    pdfUrl: "https://www.econstor.eu/handle/10419/326569",
    localCopy: "cryptocurrency-adoption-reddit.pdf",
    th: {
      headline: "เห็นคุณค่าก็อยากลงทุนคริปโต เห็นความเสี่ยงก็ถอย และแต่ละคนชั่งน้ำหนักสองอย่างนี้ไม่เท่ากัน",
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
    illustrationAltTh: "ภาพประกอบกระดาษ กรอบเปล่าที่มองทะลุได้ แต่ทอดเงาทึบเต็มรูป",
    illustrationAltEn: "Paper-craft illustration of an empty frame casting a solid, completely filled shadow",
    doi: "10.35297/001c.123605",
    articleLanguage: "en",
    license: "cc-by",
    pdfUrl: "https://jls.mises.org/article/123605.pdf",
    localCopy: "bitcoin-ownership-property-rights.pdf",
    th: {
      headline: "จับต้องไม่ได้ก็เป็นเจ้าของได้ ข้อถกเถียงทางกฎหมายว่าด้วยบิตคอยน์",
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
  {
    slug: "bangkok-election-social-media",
    illustrationAltTh: "ภาพประกอบกระดาษ กองแผ่นกลมสองแถวที่ความสูงไม่ตรงกันสักตำแหน่ง",
    illustrationAltEn: "Paper-craft illustration of two rows of stacked discs whose heights never line up",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/132679",
    articleLanguage: "en",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/132679/99578",
    th: {
      headline: "เลือกตั้งผู้ว่าฯ กทม. 2556 ยอดไลก์เยอะไม่ได้แปลว่าได้คะแนน",
      question:
        "การเลือกตั้งผู้ว่าราชการกรุงเทพมหานครปี 2556 เป็นครั้งแรกที่ผู้สมัครหลักทุกคนเปิดใช้โซเชียลมีเดียพร้อมกัน และผู้สมัครที่มียอดไลก์เฟซบุ๊กสูงที่สุดกลับได้คะแนนเป็นอันดับสาม งานนี้จึงถามว่าจริงๆ แล้วคนกรุงเทพฯ ใช้สื่ออะไรในการตัดสินใจลงคะแนน",
      method:
        "รวบรวมสถิติการใช้สื่อสังคมออนไลน์ของผู้สมัครสี่คนหลัก (เฟซบุ๊ก ยูทูบ ทวิตเตอร์ อินสตาแกรม กูเกิลพลัส และเว็บไซต์) ประกอบกับการสัมภาษณ์ฝ่ายที่ดูแลแคมเปญ แล้วสำรวจด้วยแบบสอบถามกับผู้มีสิทธิเลือกตั้งในกรุงเทพฯ ที่เคยไปใช้สิทธิเลือกผู้ว่าฯ ครั้งก่อน จำนวน 400 คน กระจายใน 12 กลุ่มเขต เขตละร้อยละ 7–9 ของกลุ่มตัวอย่าง คำถามแบ่งเป็นข้อมูลประชากร การใช้สื่อ และการตัดสินใจลงคะแนน",
      findings: [
        "สื่อที่ผู้ตอบเลือกเป็นอันดับแรกในการรับข้อมูลการเลือกตั้งคือโทรทัศน์ (ร้อยละ 47.3) และสื่อที่มีอิทธิพลต่อการตัดสินใจมากที่สุดก็คือโทรทัศน์ (ร้อยละ 37.8) รองลงมาคือสื่อกลางแจ้ง (ร้อยละ 16.5)",
        "**มีเพียงร้อยละ 10 ที่ระบุว่าสื่อใหม่ — เว็บไซต์และสื่อสังคมออนไลน์ — มีผลต่อการตัดสินใจลงคะแนนของตน**",
        "คะแนนความสำคัญของสื่อดั้งเดิมต่อการเลือกตั้งอยู่ที่ 3.58 จาก 5 ขณะที่สื่อใหม่อยู่ที่ 2.84",
        "ข้อความที่ผู้ตอบเห็นด้วยมากที่สุด (ค่าเฉลี่ย 3.85) คือผู้สมัครควรพบปะกับผู้มีสิทธิเลือกตั้งด้วยตัวเอง",
        "ผู้สมัครที่มียอดไลก์เฟซบุ๊กสูงสุด (238,138) ได้คะแนนเป็นอันดับสาม ส่วนผู้ชนะการเลือกตั้งเป็นผู้ที่มียอด “กำลังพูดถึงสิ่งนี้” สูงสุด (146,294)",
        "กลุ่มอายุ 56 ปีขึ้นไปเห็นด้วยน้อยกว่ากลุ่มอายุน้อยกว่าว่าสื่อใหม่น่าสนใจหรือทันใจ และผู้สมัครเองส่วนใหญ่ให้สัมภาษณ์ว่าโซเชียลมีเดียเร็วและถูก แต่ใช้ทำนายคะแนนไม่ได้",
      ],
      soWhat:
        "ข้อค้นพบที่ยังใช้ได้คือตัวเลขบนโซเชียลมีเดียไม่ใช่ตัวแทนของคะแนนเสียง ผู้กดไลก์อาจไม่ใช่คนกรุงเทพฯ ที่มีสิทธิลงคะแนน หรืออายุยังไม่ถึงเกณฑ์ ผู้วิจัยเสนอว่าแคมเปญควรใช้สื่อใหม่อย่างสร้างสรรค์เพื่อเข้าถึงคนรุ่นใหม่ แต่ยังต้องใช้วิธีโน้มน้าวแบบเดิมควบคู่กันไปจึงจะได้คะแนน",
      caveat:
        "สำรวจผู้มีสิทธิเลือกตั้งในกรุงเทพฯ 400 คน กับการเลือกตั้งครั้งเดียวเมื่อปี 2556 ซึ่งเป็นช่วงที่โซเชียลมีเดียยังไม่แพร่หลายเท่าปัจจุบัน ผลจึงสะท้อนภูมิทัศน์สื่อของเวลานั้น ไม่ใช่ของวันนี้ และผู้วิจัยระบุเองว่าเป็นการศึกษาเพียงจังหวัดเดียวจาก 77 จังหวัด",
    },
    en: {
      headline: "The 2013 Bangkok governor race: likes did not translate into votes",
      question:
        "The 2013 Bangkok governor election was the first in which every major candidate ran social media accounts — and the candidate with the most Facebook likes finished third. So what did Bangkok voters actually use to decide?",
      method:
        "The study compiled the four major candidates' social media statistics (Facebook, YouTube, Twitter, Instagram, Google+ and their own websites) alongside interviews with campaign staff, then surveyed 400 registered Bangkok voters who had voted in the previous governor election, drawn across twelve groups of districts at 7–9% of the sample each. The questionnaire covered demographic profile, media utilisation, and voting decision.",
      findings: [
        "Television was the medium respondents most often turned to first for election information (47.3%), and also the medium that most influenced their decision (37.8%), followed by outdoor media (16.5%).",
        "**Only 10% said new media — websites and social media — influenced how they voted.**",
        "Traditional media rated 3.58 out of 5 in importance to the election; new media rated 2.84.",
        "The statement respondents agreed with most strongly (mean 3.85) was that candidates should have personal contact with voters.",
        "The candidate with the most Facebook likes (238,138) came third, while the winner was the one with the highest “talking about this” count (146,294).",
        "Voters aged 56 and over agreed less than younger groups that new media was interesting or instant — and most candidates themselves said in interviews that social media was fast and cheap but could not predict votes.",
      ],
      soWhat:
        "The finding that still holds is that social media metrics are not a proxy for votes: anyone anywhere can click like, and they may not be Bangkok residents or old enough to vote. The authors argue campaigns should use new media creatively to reach younger generations while keeping traditional persuasion alongside it, because that is what wins votes.",
      caveat:
        "A survey of 400 Bangkok voters about a single election in 2013, before social media reached today's penetration — so it describes that moment's media landscape, not the present one. The authors note it covers one province out of 77.",
    },
  },
  {
    slug: "nodam-maewong-framing",
    illustrationAltTh: "ภาพประกอบกระดาษ วัตถุสามชิ้นคนละรูปทรงที่ทอดเงาไปรวมเป็นเงาเดียว",
    illustrationAltEn: "Paper-craft illustration of three differently shaped objects casting one shared shadow",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/148722",
    articleLanguage: "en",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/148722/109366",
    th: {
      headline: "ค้านเขื่อนแม่วงก์สำเร็จ ทั้งที่ผู้รณรงค์ สื่อ และคนทั่วไป เล่าเรื่องกันคนละแบบ",
      question:
        "ปี 2556 นายศศิน เฉลิมลาภ เลขาธิการมูลนิธิสืบนาคะเสถียร เดินเท้า 388 กิโลเมตรจากพื้นที่ที่จะสร้างเขื่อนแม่วงก์มายังกรุงเทพฯ ระหว่างวันที่ 11–22 กันยายน แล้วเรียกให้คนกว่าสองหมื่นมาสมทบกลางเมือง งานนี้ถามว่าโซเชียลมีเดียทำหน้าที่อะไรในแคมเปญนั้น และกรอบการเล่าเรื่อง (frame) ของผู้รณรงค์ สื่อมวลชน และสาธารณชน ตรงกันหรือไม่",
      method:
        "วิเคราะห์กรอบการเล่าเรื่อง (framing analysis) จากข้อความบนทวิตเตอร์ของมูลนิธิสืบนาคะเสถียร (seubfd) และของนายศศิน (sasin_seub) พร้อมแฮชแท็ก #แม่วงก์ ทั้งภาษาไทยและอังกฤษ แบ่งเป็นสามช่วงคือก่อน ระหว่าง และหลังการเดิน แล้วเทียบกรอบของผู้รณรงค์กับกรอบที่ปรากฏในข่าวและในข้อความของสาธารณชน ประกอบกับการทบทวนกลยุทธ์และยุทธวิธีประชาสัมพันธ์ที่แคมเปญใช้",
      findings: [
        "พบกรอบสามแบบที่**ไม่ตรงกัน** — สาธารณชนใช้กรอบ “ประเด็น” คือพูดถึงตัวเขื่อนด้วยข้อมูลวิทยาศาสตร์และการอนุรักษ์ป่า ผู้รณรงค์ใช้กรอบ “ตัวบุคคล” คือเล่าเรื่องการเดินและเรื่องราวของนายศศินด้วยถ้อยคำเชิงอารมณ์ ส่วนข่าวใช้กรอบ “การเมือง” คือโยงไปที่นักการเมืองและนโยบายการพัฒนาประเทศ",
        "ผู้รณรงค์ใช้การโน้มน้าวเชิงอารมณ์อย่างความเห็นใจและความอบอุ่น แต่ข้อความที่สาธารณชนรีทวีต กดถูกใจ และแบ่งปันจริง กลับเป็นข้อความที่มีข้อเท็จจริงและหลักฐานว่าทำไมจึงควรยกเลิกเขื่อน",
        "ข้อความที่ถูกรีทวีตสูงสุดของมูลนิธิฯ ได้ 751 ครั้ง ส่วนของนายศศินได้ 659 ครั้ง ซึ่งเป็นข้อความหลังช่อง 9 ระงับการออกอากาศสารคดี แล้วทีมงานนำไปลงยูทูบแทน",
        "รายชื่อผู้ร่วมลงชื่อคัดค้านบน Change.org ขึ้นถึง 100,000 รายชื่อ สูงที่สุดในบรรดาคำร้องของไทยขณะนั้น ซึ่งส่วนใหญ่ไปถึงแค่หลักหมื่น",
        "แม้กรอบทั้งสามจะไม่ตรงกัน แคมเปญก็ถือว่าได้ผล เพราะรัฐมนตรีว่าการกระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อมมอบหมายให้เลขานุการรับข้อเรียกร้อง และระบุว่าจะตรวจสอบรายงาน EHIA อย่างรอบคอบและไม่เร่งรัดการก่อสร้าง",
      ],
      soWhat:
        "บทเรียนที่นำไปใช้ได้คือความไม่ตรงกันของกรอบไม่ได้แปลว่าแคมเปญล้มเหลว และการที่สาธารณชนเลือกส่งต่อข้อเท็จจริงมากกว่าความรู้สึก บอกว่าแคมเปญสิ่งแวดล้อมควรเตรียมทั้งสองอย่างไว้คู่กัน อีกจุดคือเมื่อสารคดีถูกระงับจากโทรทัศน์ การย้ายไปยูทูบกลับได้ผู้ชมมากกว่าเดิม สื่อสังคมออนไลน์จึงเป็นทางเลี่ยงการปิดกั้นได้จริง",
      caveat:
        "เป็นกรณีศึกษาเดียวจากข้อมูลปี 2556 วิเคราะห์จากทวิตเตอร์เป็นหลัก และตัดสิน “ความสำเร็จ” จากผลเชิงนโยบายที่ตามมา ไม่ได้วัดการเปลี่ยนทัศนคติของผู้รับสารโดยตรง",
    },
    en: {
      headline: "The Mae Wong dam campaign worked — even though the three sides never framed it the same way",
      question:
        "In 2013 Sasin Chalermlarp, secretary of the Seub Nakhasathien Foundation, walked 388 kilometres from the proposed Mae Wong dam site to Bangkok between 11 and 22 September, calling on more than twenty thousand people to join him in the city centre. What did social media actually do in that campaign, and did the campaigners, the news media, and the public frame the issue the same way?",
      method:
        "A framing analysis of Twitter messages from the Seub Nakhasathien Foundation (seubfd) and from Sasin himself (sasin_seub), together with the #maewong hashtag in both Thai and English, split into three periods — before, during, and after the walk. Campaigner frames were then compared against the frames appearing in news coverage and in the public's own messages, alongside a review of the campaign's public relations strategy and tactics.",
      findings: [
        "Three frames emerged and they **did not match**: the public used an issue-based frame, discussing the dam through scientific terms and forest conservation; the campaigners used a personal frame, telling the story of the walk and of Sasin in emotional language; the news used a political frame, tying the issue to politicians and national development policy.",
        "The campaigners relied on motivational appeals such as sympathy and warmth, yet the messages the public actually retweeted, liked and shared were the ones carrying facts and evidence for why the dam should be cancelled.",
        "The Foundation's most-retweeted message reached 751 retweets; Sasin's reached 659 — that one posted after Channel 9 pulled the documentary and the team put it on YouTube instead.",
        "The anti-dam petition on Change.org reached 100,000 signatures, the highest of any Thai petition at the time, when most reached only ten thousand.",
        "Despite the mismatch, the campaign counts as effective: the Minister of Natural Resources and Environment sent his secretary to receive the petition and stated the ministry would examine the EHIA report carefully and would not rush construction.",
      ],
      soWhat:
        "The usable lesson is that inconsistent framing does not mean a failed campaign — and that because the public chose to pass on facts rather than feelings, environmental campaigns should prepare both. The other lesson: when the documentary was banned from broadcast, moving it to YouTube reached more viewers than the airtime would have. Social media genuinely can route around a block.",
      caveat:
        "A single case study drawn from 2013 data, analysed mainly through Twitter, that judges success by the policy outcome that followed rather than by directly measuring any change in audience attitudes.",
    },
  },
  {
    slug: "health-content-working-women",
    illustrationAltTh: "ภาพประกอบกระดาษ รูปทรงชิ้นเดียว กับแผ่นที่เจาะช่องสามช่องซึ่งไม่มีช่องไหนพอดี",
    illustrationAltEn: "Paper-craft illustration of one shape beside a panel of three openings it fits none of",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/230947",
    articleLanguage: "th",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/230947/166266",
    th: {
      headline: "สื่อสุขภาพชุดเดียวใช้ไม่ได้กับทุกที่ทำงาน คนเอกชน ราชการ และโรงงาน อยากได้คนละแบบ",
      question:
        "สตรีวัยทำงานเป็นกลุ่มที่ค้นและส่งต่อข้อมูลสุขภาพให้คนรอบตัวมากที่สุด แต่ “อาหารและการดูแลสุขภาพ” ก็เป็นหมวดที่มีข่าวปลอมบนสื่อสังคมออนไลน์มากเป็นอันดับหนึ่งด้วย งานนี้ถามว่าสตรีวัยทำงานอยากได้เนื้อหาสุขภาพในรูปแบบไหน กังวลเรื่องอะไร และผู้ที่ทำงานในหน่วยงานต่างประเภทกันต้องการต่างกันหรือไม่",
      method:
        "วิจัยเชิงปริมาณด้วยแบบสอบถามปลายปิด เก็บจากสตรีวัยทำงานอายุ 15 ปีขึ้นไปในหน่วยงานเครือข่ายของ สสส. 13 แห่งในกรุงเทพฯ และปริมณฑล แบ่งเป็นราชการ/รัฐวิสาหกิจ บริษัทเอกชน และโรงงาน/สถานประกอบการ ตั้งโควตาหน่วยงานละ 100 คน (สองโรงงานใหญ่ 50 คน) รวมเป้าหมาย 1,200 คน ได้แบบสอบถามกลับ 1,074 ชุด ค่าความเที่ยงของทุกตัวแปรเกิน 0.70 วิเคราะห์ด้วยสถิติเชิงพรรณนาและ One-way ANOVA",
      findings: [
        "สตรีในหน่วยงานเอกชนต้องการวิดีโออะนิเมชัน (ค่าเฉลี่ย 4.20) อินโฟกราฟิก (4.17) และภาพถ่าย (4.16) มากกว่าอีกสองกลุ่มอย่างมีนัยสำคัญ ขณะที่สตรีในหน่วยงานรัฐ/รัฐวิสาหกิจ (3.02) และโรงงาน (3.01) ต้องการ**ข้อความล้วน**มากกว่าเอกชน (2.47)",
        "เทคนิคที่แต่ละกลุ่มให้คะแนนสูงสุดต่างกัน — เอกชนเลือกการเปรียบเทียบก่อนและหลัง (4.21) รัฐเลือกการให้ข้อมูลทางการแพทย์ประกอบ (3.99) ส่วนโรงงานเลือกการให้คำแนะนำ (3.68)",
        "ทั้งสามกลุ่มให้เนื้อหาประเภท “ให้ความรู้” เป็นอันดับหนึ่งเหมือนกัน (รัฐ 4.18 · เอกชน 4.34 · โรงงาน 3.83)",
        "ความกังวลอันดับหนึ่งไม่ตรงกัน — เอกชนกังวลว่าข้อมูลไม่ถูกต้องมากที่สุด (4.30) ส่วนรัฐและโรงงานกังวลว่าอาจนำไปสู่การละเมิดสิทธิผู้อื่นมากที่สุด (4.20 และ 3.81)",
        "**สามเรื่องที่ทั้งสามกลุ่มไม่ต่างกันอย่างมีนัยสำคัญ** คือเทคนิคการแสดงอารมณ์ความรู้สึก (F = 2.872) ความกังวลว่าข้อมูลมีปริมาณมากเกินไป (F = 2.501) และความกังวลเรื่องการใช้คำศัพท์เฉพาะทาง (F = 1.666)",
      ],
      soWhat:
        "สำหรับหน่วยงานที่ทำสื่อสุขภาพในที่ทำงาน ผลนี้แปลว่าเนื้อหาชุดเดียวกันควรถูกห่อใหม่ตามประเภทองค์กร ไม่ใช่กระจายแบบเดียวกันทั้งหมด ข้อเสนอของผู้วิจัยคือเพิ่มการเล่าเรื่องด้วยภาพ ทั้งวิดีโออะนิเมชัน อินโฟกราฟิก และภาพถ่าย และบทความที่นำมาแชร์ต้องมาจากแหล่งที่น่าเชื่อถือ",
      caveat:
        "กลุ่มตัวอย่างมาจากหน่วยงานเครือข่าย สสส. ในกรุงเทพฯ และปริมณฑล ด้วยการสุ่มแบบเจาะจง กำหนดโควตา และสุ่มแบบสะดวก จึงไม่ใช่ตัวแทนสตรีวัยทำงานทั้งประเทศ อีกทั้งกลุ่มเอกชนมีเพียง 134 คน เทียบกับกลุ่มรัฐ 527 คนและโรงงาน 413 คน เก็บข้อมูลช่วงปี 2562–2563",
    },
    en: {
      headline: "One set of health content will not serve every workplace — private, government and factory staff want different things",
      question:
        "Working-age women are the group that most actively seeks out health information and passes it on to the people around them — yet food and health care is also the single largest category of fake news circulating on Thai social media. What form of health content do these women want, what worries them about it, and do women in different kinds of workplace want different things?",
      method:
        "A quantitative survey using a closed-ended questionnaire with working-age women aged 15 and over at thirteen organisations in the ThaiHealth network across Bangkok and its vicinity, grouped into government and state enterprises, private companies, and factories. A quota of 100 per organisation (50 at two large factories) targeted 1,200 respondents; 1,074 questionnaires were returned. Reliability exceeded 0.70 on every variable. Analysis used descriptive statistics and one-way ANOVA.",
      findings: [
        "Women in private companies wanted animated video (mean 4.20), infographics (4.17) and photographs (4.16) significantly more than the other two groups, while women in government and state enterprises (3.02) and in factories (3.01) wanted **plain text** more than private-sector women did (2.47).",
        "Each group's top-rated technique differed: private-sector women chose before-and-after comparison (4.21), government women chose supporting medical information (3.99), and factory women chose practical advice (3.68).",
        "All three groups ranked “providing knowledge” first as a content type (government 4.18 · private 4.34 · factory 3.83).",
        "Their leading worry differed too: private-sector women worried most that information was incorrect (4.30), while government and factory women worried most that it might violate someone else's rights (4.20 and 3.81).",
        "**Three things showed no significant difference across the groups**: the technique of expressing emotion (F = 2.872), concern about too much information (F = 2.501), and concern about technical jargon (F = 1.666).",
      ],
      soWhat:
        "For anyone producing workplace health media, this says the same content should be repackaged by organisation type rather than distributed identically everywhere. The authors recommend more visual storytelling — animated video, infographics and photographs — and that any article shared must come from a credible source.",
      caveat:
        "The sample came from ThaiHealth network organisations in Bangkok and its vicinity through purposive, quota and accidental sampling, so it does not represent working-age women nationally. The private-sector group numbered only 134 against 527 in government and 413 in factories, and data was collected in 2019–2020.",
    },
  },
  {
    slug: "on-demand-app-loyalty",
    illustrationAltTh: "ภาพประกอบกระดาษ วัตถุที่ยึดไว้ด้วยสายหนาเส้นเดียว ท่ามกลางเส้นบางที่ไม่ได้ยึดอะไร",
    illustrationAltEn: "Paper-craft illustration of an object held by one thick cord among thin threads attached to nothing",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/247870",
    articleLanguage: "th",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/247870/169198",
    th: {
      headline: "คนใช้แอปเรียกบริการติดใจเพราะบริการดี ไม่ใช่เพราะเห็นโฆษณาบ่อย",
      question:
        "แอปให้บริการจุดเดียวเบ็ดเสร็จแบบตอบสนองความต้องการอย่างไลน์แมนและแกร็บแข่งกันด้วยโฆษณาและส่วนลด งานนี้ถามว่าอะไรกันแน่ที่พยากรณ์ความภักดีของผู้ใช้ได้ — การเปิดรับข้อมูลข่าวสาร ส่วนประสมทางการตลาด หรือคุณภาพการให้บริการ",
      method:
        "วิจัยเชิงปริมาณด้วยแบบสอบถามออนไลน์ เก็บข้อมูลเดือนตุลาคม 2563 สุ่มตัวอย่างแบบไม่อาศัยความน่าจะเป็น จากผู้ที่อาศัยในกรุงเทพมหานคร อายุ 18 ปีขึ้นไป และเคยใช้บริการผ่านแอปประเภทนี้อย่างน้อย 3 ครั้งในช่วง 3 เดือนที่ผ่านมา จำนวน 400 คน วิเคราะห์ด้วยสหสัมพันธ์เพียร์สันและการถดถอยพหุคูณผ่านโปรแกรม SPSS",
      findings: [
        "ความภักดีโดยรวมอยู่ที่ 4.26 จาก 5 ซึ่งถือว่าสูงมาก โดยด้านพฤติกรรมสูงกว่าด้านทัศนคติ (4.35 เทียบกับ 4.06) ข้อที่ได้คะแนนสูงสุดคือจะกลับมาใช้บริการซ้ำ (4.43)",
        "คุณภาพการให้บริการพยากรณ์ความภักดีได้สูงสุด (Beta = 0.491) รองลงมาคือส่วนประสมทางการตลาด (Beta = 0.127)",
        "**การเปิดรับข้อมูลข่าวสารพยากรณ์ความภักดีไม่ได้** (Beta = 0.043, Sig = 0.32) ทั้งที่มีความสัมพันธ์เชิงบวกกับความภักดีอยู่ก็ตาม",
        "ตัวแปรทั้งสามรวมกันอธิบายความภักดีได้ราวร้อยละ 36 (R² = 0.364, F = 75.68) ส่วนที่เหลือเป็นปัจจัยที่งานนี้ไม่ได้วัด",
        "เหตุผลที่เลือกใช้บริการมากที่สุดคือความสะดวกสบาย (ร้อยละ 35.4) รองลงมาคือมีส่วนลด (ร้อยละ 20.8) และแอปใช้งานง่าย (ร้อยละ 20.6) โดยบริการที่ใช้มากที่สุดคือจัดส่งอาหาร (ร้อยละ 41.7) และเรียกรถ (ร้อยละ 33.3)",
      ],
      soWhat:
        "สำหรับคนทำการตลาดแพลตฟอร์ม ผลนี้บอกว่างบที่ทุ่มไปกับการทำให้คนเห็นแบรนด์บ่อยๆ ไม่ได้ซื้อความภักดีกลับมา สิ่งที่ซื้อได้คือประสบการณ์การใช้บริการจริง — ความน่าเชื่อถือและไว้วางใจ กับจำนวนพนักงานที่เพียงพอต่อการให้บริการ",
      caveat:
        "สำรวจผู้ใช้ในกรุงเทพฯ 400 คนด้วยการสุ่มแบบไม่อาศัยความน่าจะเป็น เก็บข้อมูลเดือนตุลาคม 2563 ซึ่งเป็นช่วงที่พฤติกรรมสั่งอาหารออนไลน์ผิดไปจากปกติเพราะสถานการณ์โควิด-19 และงานนี้นิยามขอบเขตไว้ที่สองแอปคือไลน์แมนและแกร็บ",
    },
    en: {
      headline: "On-demand app users stay loyal because of the service, not because they saw the advertising",
      question:
        "One-stop on-demand service apps such as LINE MAN and Grab compete through advertising and discounts. Which of these actually predicts user loyalty — exposure to information about the app, the marketing mix, or service quality?",
      method:
        "A quantitative online survey run in October 2020 using non-probability sampling, with 400 Bangkok residents aged 18 and over who had used this kind of app at least three times in the previous three months. Data was analysed in SPSS using Pearson's correlation and multiple regression.",
      findings: [
        "Overall loyalty scored 4.26 out of 5, a very high level, with behavioural loyalty above attitudinal loyalty (4.35 against 4.06). The highest single item was intending to use the service again (4.43).",
        "Service quality was the strongest predictor of loyalty (Beta = 0.491), followed by the marketing mix (Beta = 0.127).",
        "**Exposure to information and advertising did not predict loyalty at all** (Beta = 0.043, Sig = 0.32), even though it did correlate positively with it.",
        "The three factors together explained about 36% of loyalty (R² = 0.364, F = 75.68); the rest lies in factors this study did not measure.",
        "The most common reason for using the service was convenience (35.4%), then discounts (20.8%) and ease of use (20.6%). Food delivery was the most-used service (41.7%), followed by ride-hailing (33.3%).",
      ],
      soWhat:
        "For platform marketers, the finding says that money spent on being seen more often does not buy loyalty back. What does is the experience of the service itself — its credibility and trustworthiness, and having enough staff to serve.",
      caveat:
        "A non-probability sample of 400 users in Bangkok, collected in October 2020 when online food ordering behaviour was distorted by the COVID-19 situation, and scoped to two apps: LINE MAN and Grab.",
    },
  },
  {
    slug: "tv-crisis-communication-korat",
    illustrationAltTh: "ภาพประกอบกระดาษ จอสามจอหันออกนอกทั้งหมด โดยมีสามเหลี่ยมอยู่ข้างหลังที่ไม่มีจอไหนหันไปมอง",
    illustrationAltEn: "Paper-craft illustration of three screens all facing outward, with a triangle behind them that none of them faces",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/251243",
    articleLanguage: "th",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/251243/171220",
    th: {
      headline: "สามช่องทีวีถูกสั่งปรับจากการรายงานข่าวโคราช แต่ไม่มีช่องไหนคิดว่าตัวเองกำลังเผชิญวิกฤต",
      question:
        "หลัง กสทช. สั่งปรับทางปกครองสถานีโทรทัศน์ดิจิทัลจากการรายงานข่าวคนร้ายจับตัวประกันที่จังหวัดนครราชสีมา สถานีเหล่านั้นสื่อสารกับสังคมอย่างไร และบริหารจัดการภาวะวิกฤตด้วยกลไกอะไร",
      method:
        "วิจัยเชิงคุณภาพสองส่วน — เก็บข้อมูลจากเอกสารในช่องทางออนไลน์ทั้งหมด (เว็บไซต์ เฟซบุ๊กแฟนเพจ อินสตาแกรม ทวิตเตอร์) ของสถานีโทรทัศน์ดิจิทัลทั้งสามช่องที่ถูกสั่งปรับ ระหว่างวันที่ 8 กุมภาพันธ์ถึง 8 เมษายน 2563 รวมสองเดือน ประกอบกับการสัมภาษณ์เชิงลึกผู้มีอำนาจตัดสินใจของสถานีละหนึ่งท่าน และผู้เชี่ยวชาญด้านการสื่อสารในภาวะวิกฤตอีก 4 ท่าน (นักวิชาชีพ 2 นักวิชาการ 2) รวมผู้ให้สัมภาษณ์ 7 ท่าน",
      findings: [
        "จากสามสถานี **มีเพียงสถานีเดียวที่สื่อสารเรื่องนี้ผ่านช่องทางออนไลน์** โดยโพสต์บนเฟซบุ๊กแฟนเพจของสถานีเมื่อวันที่ 11 กุมภาพันธ์ 2563 ราวสองวันหลังเหตุการณ์จบ ด้วยกลยุทธ์ขออภัย ส่วนอีกสองสถานียังใช้ช่องทางออนไลน์ประชาสัมพันธ์รายการและเสนอข่าวเสมือนในภาวะปกติ",
        "โพสต์นั้นมีผู้กดแสดงความรู้สึก 14,947 คน แสดงความคิดเห็นกว่า 3,200 ครั้ง และแชร์กว่า 1,200 ครั้ง ความคิดเห็นส่วนใหญ่เป็นปฏิกิริยาเชิงลบที่วิพากษ์วิจารณ์การรายงานข่าว และ**สถานีไม่ได้ตอบกลับความคิดเห็นใดเลย**",
        "การสัมภาษณ์เผยว่ามีอีกหนึ่งสถานีที่สื่อสารผ่านหน้าจอของตัวเอง โดยผู้ประกาศกล่าวขออภัยที่ทำให้เกิดความไม่สบายใจ แต่ไม่ใช่การขอโทษอย่างเต็มรูปแบบ และไม่ได้นำคลิปไปเผยแพร่ในช่องทางอื่น",
        "ทั้งสามสถานี**ไม่ได้มองว่าการถูกสั่งปรับทางปกครองเป็นภาวะวิกฤตของสถานี** และไม่มีแผนงาน คู่มือ คณะกรรมการ หรือการซักซ้อมรับมือไว้ล่วงหน้า งานบริหารภาวะวิกฤตดำเนินการโดยกองบรรณาธิการหรือฝ่ายข่าว ไม่ใช่ฝ่ายสื่อสารองค์กร",
        "เมื่อรับรู้กระแสวิพากษ์วิจารณ์ สถานีปรับลดโทนการรายงานข่าวและหยุดการไลฟ์สดด้วยโทรศัพท์มือถือทันทีตั้งแต่วันเกิดเหตุ",
        "ผู้เชี่ยวชาญชี้สาเหตุใหญ่สามข้อ — ผู้สื่อข่าวไม่มีทักษะรับมือเหตุการณ์ที่ไม่เคยเกิดขึ้นในไทยมาก่อน · การแข่งขันเรตติ้งของทีวีดิจิทัลผลักให้ไลฟ์สดจากที่เกิดเหตุ · และไทยยังไม่มีคู่มือรายงานข่าวเหตุกราดยิง คู่มือที่มีอยู่ถอดบทเรียนจากกรณีถ้ำหลวงซึ่งเป็นวิกฤตคนละลักษณะ",
        "ผู้เชี่ยวชาญเห็นว่างานนี้ควรอยู่กับฝ่ายสื่อสารองค์กร ไม่ใช่ฝ่ายข่าว เพราะฝ่ายข่าวเป็นคู่กรณีเองจึงอาจมีอคติหรืออยากปกป้องตนเอง และเสนอให้ตั้ง War Room พร้อมกำหนดเกณฑ์ประเมินสถานการณ์ไว้ล่วงหน้า รวมถึงการขอโทษอย่างเต็มรูปแบบต่อกลุ่มตัวประกัน ญาติ ผู้ชม และสังคม",
      ],
      soWhat:
        "ข้อค้นพบที่ใช้ได้กับทุกองค์กร ไม่เฉพาะสถานีโทรทัศน์ คือช่องว่างระหว่าง “ผู้กำกับดูแลมองว่าเป็นวิกฤต” กับ “องค์กรมองว่าเป็นวิกฤต” ถ้าองค์กรไม่นับว่าเป็นวิกฤตก็จะไม่มีใครถูกมอบหมาย ไม่มีแผน และการตอบสนองจะกลายเป็นการอธิบายขั้นตอนการทำงานของตัวเองแทนการขอโทษ ซึ่งงานนี้แสดงให้เห็นว่าไม่ได้ลดกระแสวิพากษ์วิจารณ์ลงเลย",
      caveat:
        "ศึกษาเหตุการณ์เดียว สามสถานี และผู้ให้สัมภาษณ์ 7 ท่าน หลักฐานฝั่งออนไลน์ดูได้เฉพาะสิ่งที่ยังเผยแพร่อยู่ในช่วงสองเดือนที่เก็บข้อมูล · บทสรุปนี้ไม่ระบุชื่อสถานี เพราะบทเรียนที่นำไปใช้ได้ไม่ได้ขึ้นอยู่กับว่าเป็นสถานีใด ผู้ที่ต้องการรายละเอียดรายสถานีอ่านได้จากบทความต้นฉบับ",
    },
    en: {
      headline: "Three TV channels were fined over their hostage-crisis coverage — and none of them saw it as a crisis for themselves",
      question:
        "After Thailand's broadcasting regulator imposed administrative penalties on digital television channels for their coverage of the gunman taking hostages in Nakhon Ratchasima, how did those channels communicate with the public, and what machinery did they use to manage the crisis?",
      method:
        "Qualitative research in two parts. Documentary research covered every online channel — website, Facebook page, Instagram and Twitter — of the three penalised digital stations from 8 February to 8 April 2020, a two-month window. Alongside this, in-depth interviews were conducted with one decision-maker at each station plus four specialists in crisis communication and media management (two practitioners, two academics), seven interviewees in total.",
      findings: [
        "Of the three stations, **only one communicated about the situation online**, posting on its Facebook page on 11 February 2020 — roughly two days after the incident ended — using an apology strategy. The other two carried on promoting programmes and posting news as if nothing had happened.",
        "That post drew 14,947 reactions, over 3,200 comments and over 1,200 shares. Most comments were negative and critical of the coverage, and **the station replied to none of them**.",
        "The interviews revealed a second station had responded on air, where a presenter expressed regret for the discomfort caused — not a full apology — and the clip was not published anywhere else.",
        "All three stations **did not regard the administrative penalty as a crisis for the station**, and had no plan, manual, committee, or rehearsal prepared. Crisis handling was run by the newsroom rather than by corporate communications.",
        "Once they registered the public criticism, the stations toned down their reporting and stopped mobile-phone live streaming immediately, on the day of the incident itself.",
        "The specialists identified three causes: reporters had no skills for an event unprecedented in Thailand; ratings competition among digital channels pushed them into live reporting from the scene; and Thailand had no manual for covering a mass shooting — the existing crisis manual was drawn from the Tham Luang cave rescue, a very different kind of crisis.",
        "The specialists argued the work belongs with corporate communications rather than the newsroom, because the newsroom is itself a party to the dispute and may be biased or defensive. They recommended standing up a war room with pre-agreed thresholds for assessing a situation, and a full apology to the hostages, their families, viewers and society.",
      ],
      soWhat:
        "The finding that generalises beyond broadcasters is the gap between what the regulator treats as a crisis and what the organisation treats as one. If the organisation does not count it as a crisis, nobody is assigned to it, no plan exists, and the response becomes an explanation of one's own working procedures rather than an apology — which, this study shows, did nothing to reduce the criticism.",
      caveat:
        "One event, three stations, and seven interviewees. The online evidence covers only what was still published during the two-month collection window. This summary does not name the stations: the transferable lesson does not depend on which station it was, and readers who want the station-by-station detail will find it in the original article.",
    },
  },
  {
    slug: "retirees-sodium-campaign",
    illustrationAltTh: "ภาพประกอบกระดาษ กรวยห้าอันเรียงกัน โดยมีอันหนึ่งกว้างกว่าที่เหลือมาก",
    illustrationAltEn: "Paper-craft illustration of five funnels in a row, one far wider than the rest",
    indexUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/view/253798",
    articleLanguage: "th",
    pdfUrl: "https://so03.tci-thaijo.org/index.php/jprad/article/download/253798/174298",
    th: {
      headline: "คนวัยเกษียณเห็นแคมเปญลดเค็มบนเฟซบุ๊กมากที่สุด ส่วนความเชื่อเรื่องสุขภาพต่างกันตามระดับการศึกษา",
      question:
        "การรณรงค์ลดบริโภคเค็มจะได้ผลกับคนวัยเกษียณต้องออกแบบสารอย่างไร งานนี้ตรวจความสัมพันธ์ระหว่างการเปิดรับสื่อ ทัศนคติต่อสารโน้มน้าวใจ และแบบแผนความเชื่อด้านสุขภาพ (Health Belief Model) พร้อมดูว่าลักษณะทางประชากรแบบใดที่ทำให้ต่างกัน",
      method:
        "วิจัยเชิงปริมาณด้วยแบบสอบถามออนไลน์บน Google Form โดยฝากลิงก์ไว้ตามช่องทางสื่อสังคมออนไลน์และอาศัยการบอกต่อ กลุ่มตัวอย่างคือบุคคลวัยเกษียณอายุ 51–70 ปีที่อาศัยในกรุงเทพมหานคร จำนวน 400 คน แบ่งสัดส่วนตามช่วงอายุจากประชากรจริง 1,255,572 คน ณ เดือนธันวาคม 2562 วิเคราะห์ด้วยสถิติเชิงพรรณนาและสถิติเชิงอนุมานที่ระดับนัยสำคัญ 0.05",
      findings: [
        "การเปิดรับสื่อรณรงค์โดยรวมอยู่ในระดับปานกลาง โดยเปิดรับจากเฟซบุ๊กมากที่สุด รองลงมาคือเว็บไซต์และยูทูบ ส่วนที่เปิดรับน้อยที่สุดคือวิทยุ รองลงมาคือสื่อกิจกรรมและโปสเตอร์",
        "ทัศนคติต่อสารโน้มน้าวใจอยู่ในระดับสูงมากทุกข้อ ข้อที่ได้คะแนนสูงคืออยากให้ข้อความบอกความรุนแรงของโรค และอยากให้ข้อความนำไปปรับใช้ในชีวิตประจำวันได้ ซึ่งตรงกับหลักสารที่มีทั้งการคุกคามสูงและประสิทธิภาพสูง",
        "ในลักษณะทางประชากรแปดด้านที่ทดสอบ **มีเพียงสองด้านที่ทำให้แบบแผนความเชื่อด้านสุขภาพต่างกันอย่างมีนัยสำคัญ** คือระดับการศึกษาและแหล่งรายได้หลัก ส่วนเพศ อายุ สถานภาพสมรส สถานะการทำงาน รายได้เฉลี่ยต่อเดือน และลักษณะการอยู่อาศัย **ไม่ทำให้ต่างกัน**",
        "สารโน้มน้าวใจสัมพันธ์เชิงบวกกับแบบแผนความเชื่อด้านสุขภาพในระดับปานกลางสี่ด้าน คือการรับรู้โอกาสเสี่ยง ความรุนแรงของโรค ประโยชน์ของการป้องกัน และความสามารถของตนเอง แต่ด้านการรับรู้อุปสรรคสัมพันธ์กันในระดับต่ำ",
        "การเปิดรับสื่อสัมพันธ์กับทั้งทัศนคติและแบบแผนความเชื่อด้านสุขภาพอย่างมีนัยสำคัญ แต่**ค่าความสัมพันธ์อยู่ในระดับต่ำถึงต่ำมากทุกด้าน** — เห็นสื่อบ่อยขึ้นจึงไม่ได้แปลว่าความเชื่อด้านสุขภาพจะขยับตามมากนัก",
        "ประเด็นที่ผู้ตอบรับรู้สูงสุดคือ การกินเค็มเป็นประจำมีโอกาสเสี่ยงสูงที่จะเป็นโรคไต และถ้าเป็นโรคไตจะกระทบชีวิตอย่างรุนแรง",
      ],
      soWhat:
        "ข้อเสนอของผู้วิจัยตามผลคือให้หน่วยงานเน้นส่งสารโน้มน้าวใจไปยังกลุ่มที่มีการศึกษาระดับมัธยมหรือต่ำกว่า เพราะเป็นกลุ่มที่แบบแผนความเชื่อด้านสุขภาพต่ำกว่า และเมื่อวัยเกษียณในกรุงเทพฯ เปิดรับจากเฟซบุ๊กมากที่สุด แคมเปญที่ยังทุ่มงบไปกับวิทยุและโปสเตอร์อาจไปไม่ถึงคนกลุ่มนี้",
      caveat:
        "เก็บข้อมูลด้วยแบบสอบถามออนไลน์และการบอกต่อ จึงเข้าถึงเฉพาะวัยเกษียณที่ใช้อินเทอร์เน็ตอยู่แล้ว ซึ่งอธิบายได้ส่วนหนึ่งว่าทำไมเฟซบุ๊กจึงมาเป็นอันดับหนึ่ง เป็นการศึกษาเฉพาะกรุงเทพมหานคร และวัดความเชื่อกับทัศนคติเท่านั้น ไม่ได้วัดว่าบริโภคโซเดียมลดลงจริงหรือไม่",
    },
    en: {
      headline: "Retirees meet salt-reduction campaigns on Facebook — and education is what separates their health beliefs",
      question:
        "How should a campaign to reduce salt intake be designed to reach retired people? This study examined the relationships between media exposure, attitude towards persuasive messages, and the Health Belief Model, and which demographic characteristics made a difference.",
      method:
        "A quantitative survey using a Google Form questionnaire distributed through social media channels and by word of mouth, with 400 retirees aged 51 to 70 living in Bangkok, proportioned by age band against the real population of 1,255,572 as of December 2019. Analysis used descriptive and inferential statistics at the 0.05 significance level.",
      findings: [
        "Overall campaign media exposure was moderate, highest on Facebook, then websites and YouTube. The least-encountered channel was radio, followed by events and posters.",
        "Attitudes towards persuasive messages were very high on every item. The highest-rated wishes were for messages that state how severe the disease is, and messages that can be applied in daily life — matching the principle of pairing high threat with high efficacy.",
        "Of eight demographic characteristics tested, **only two produced a significant difference in health beliefs**: education level and main source of income. Gender, age, marital status, employment status, monthly income and living arrangement **made no difference**.",
        "Persuasive messages correlated positively and moderately with four dimensions of the Health Belief Model — perceived susceptibility, perceived severity, perceived benefits, and self-efficacy — but only weakly with perceived barriers.",
        "Media exposure correlated significantly with both attitude and health beliefs, but **every one of those correlations was low to very low** — seeing the campaign more often did not move health beliefs much.",
        "The item respondents recognised most strongly was that eating salty food regularly carries a high risk of kidney disease, and that kidney disease would seriously affect their lives.",
      ],
      soWhat:
        "The authors' recommendation follows the result: direct persuasive messaging at people educated to secondary level or below, since that is the group with weaker health beliefs. And since Bangkok retirees encounter these campaigns most on Facebook, a campaign still spending on radio and posters may simply not reach them.",
      caveat:
        "Data was gathered through an online questionnaire and word of mouth, so it reached only retirees already using the internet — which partly explains why Facebook came first. It covers Bangkok alone and measures beliefs and attitudes, not whether sodium intake actually fell.",
    },
  },
  {
    slug: "sexual-harassment-entertainment-tv",
    illustrationAltTh: "ภาพประกอบกระดาษ แผ่นบางคลุมทับรูปทรงมีเหลี่ยมคมที่ยังดันทะลุขึ้นมาให้เห็น",
    illustrationAltEn: "Paper-craft illustration of a thin sheet draped over a sharp-edged form that still shows through",
    indexUrl: "https://so02.tci-thaijo.org/index.php/jcomm/article/view/259563",
    articleLanguage: "th",
    license: "cc-by-nc-nd",
    pdfUrl: "https://so02.tci-thaijo.org/index.php/jcomm/article/download/259563/178807",
    localCopy: "sexual-harassment-entertainment-tv.pdf",
    th: {
      headline: "รายการบันเทิงไทยกลบการคุกคามทางเพศด้วยเสียงหัวเราะ แล้วคนดูก็เลิกสนับสนุน",
      question:
        "เนื้อหาไม่เหมาะสมด้านการคุกคามทางเพศในรายการเพื่อความบันเทิงไทยปรากฏในรูปแบบใดบ้าง และเมื่อผู้ชมรับรู้แล้ว มีทัศนคติและพฤติกรรมต่อองค์กรธุรกิจสื่อบันเทิงที่ผลิตรายการนั้นอย่างไร",
      method:
        "วิจัยแบบผสม — ส่วนเชิงคุณภาพวิเคราะห์เนื้อหา 8 เทปรายการที่ตกเป็นประเด็นวิพากษ์วิจารณ์ในข่าวระหว่าง พ.ศ. 2559–2563 ด้วยตารางบันทึกข้อมูล 9 ส่วน ตรวจสอบเครื่องมือโดยผู้เชี่ยวชาญด้านนิเทศศาสตร์ 2 ท่าน · ส่วนเชิงปริมาณสำรวจผู้ชมรายการเพื่อความบันเทิงเป็นประจำอย่างน้อย 3 วันต่อสัปดาห์ อายุ 18 ปีขึ้นไป ในกรุงเทพมหานคร จำนวน 425 คน ด้วยแบบสอบถามออนไลน์เดือนเมษายน 2564 (ค่าความเชื่อมั่นรวม 0.809) วิเคราะห์ด้วย One-way ANOVA เปรียบเทียบรายคู่ด้วย LSD และสหสัมพันธ์เพียร์สัน",
      findings: [
        "รูปแบบที่พบมากที่สุดคือการคุกคามด้วยวัจนภาษา 45 ครั้ง รองลงมาคืออวัจนภาษา 9 ครั้ง รูปแบบผสม 8 ครั้ง และทางร่างกายน้อยที่สุด 7 ครั้ง",
        "คู่กรณีที่พบมากที่สุดคือชายคุกคามหญิง 6 คู่ รองลงมาคือหญิงคุกคามชาย 5 คู่ ส่วนคู่ที่เกี่ยวกับบุคคลที่มีความหลากหลายทางเพศพบฝ่ายละ 2 คู่ โดยสาเหตุที่พบร่วมกันแทบทุกคู่คือความเคยชินกับพฤติกรรมนั้น และการสร้างความบันเทิงตามบทบาทในรายการ",
        "องค์กรผู้ผลิตสื่อสารเนื้อหานี้**ควบคู่กับการทำให้เป็นเรื่องตลกขบขัน เพื่อลดทอนความรุนแรงลงให้ออกอากาศได้**",
        "ผู้ชมที่มีเพศต่างกันรับรู้เนื้อหานี้ต่างกันอย่างมีนัยสำคัญ โดยผู้ชมที่มีความหลากหลายทางเพศรับรู้ในระดับสูงกว่าผู้ชมชายและหญิง",
        "**อายุ ระดับการศึกษา และรายได้เฉลี่ย ไม่ทำให้การรับรู้เนื้อหานี้ต่างกันอย่างมีนัยสำคัญ**",
        "ทัศนคติของผู้ชมต่อองค์กรอยู่ในระดับเชิงลบ และสัมพันธ์ไปในทิศทางเดียวกันกับพฤติกรรมที่ไม่สนับสนุนองค์กร (r = 0.683 ระดับปานกลาง)",
      ],
      soWhat:
        "งานนี้แปลปัญหาจริยธรรมให้เป็นภาษาที่ฝ่ายบริหารอ่านแล้วเข้าใจ — ผู้ชมปฏิบัติกับรายการเหมือนสินค้าขององค์กร เมื่อสินค้าขาดความรับผิดชอบต่อสังคม ผู้บริโภคก็เลิกสนับสนุน ซึ่งกระทบความนิยมและผลกำไรในระยะยาว ข้อเสนอของผู้วิจัยคือให้องค์กรควบคุมกระบวนการผลิตให้ได้มาตรฐานจริยธรรมสื่อตั้งแต่ต้น แทนการรอแก้เมื่อตกเป็นข่าวไปแล้ว",
      caveat:
        "ส่วนวิเคราะห์เนื้อหาเลือกเฉพาะ 8 เทปที่**ตกเป็นข่าววิพากษ์วิจารณ์อยู่แล้ว** จึงใช้บอกความชุกของเนื้อหาแบบนี้ในรายการบันเทิงไทยโดยรวมไม่ได้ ส่วนแบบสำรวจเก็บจากผู้ชมในกรุงเทพฯ 425 คน ซึ่งเป็นหญิงร้อยละ 72.24 และอายุ 24–34 ปีร้อยละ 52.24 อีกทั้งวัดพฤติกรรมจากการรายงานของผู้ตอบเอง",
    },
    en: {
      headline: "Thai entertainment shows wrap sexual harassment in laughter — and viewers answer by withdrawing support",
      question:
        "In what forms does inappropriate sexual harassment content appear in Thai entertainment programmes, and once viewers notice it, what attitude and behaviour do they take towards the media business that produced it?",
      method:
        "Mixed methods. The qualitative half content-analysed eight programme episodes that had drawn public criticism in the news between 2016 and 2020, using a nine-part coding sheet validated by two communication arts specialists. The quantitative half surveyed 425 Bangkok viewers aged 18 and over who watch entertainment programmes at least three days a week, through an online questionnaire in April 2021 (overall reliability 0.809), analysed with one-way ANOVA, LSD pairwise comparison, and Pearson's correlation.",
      findings: [
        "Verbal harassment was by far the most common form, at 45 instances, followed by non-verbal at 9, combined forms at 8, and physical harassment least often at 7.",
        "The most common pairing was men harassing women (6 pairs), then women harassing men (5 pairs), with two pairs each in either direction involving people of diverse gender identity. Almost every pairing shared the same underlying reasons: the behaviour had become habitual, and it was done to entertain within the programme's format.",
        "The producing organisations delivered this content **alongside comedy, to soften its severity enough to be broadcast**.",
        "Viewers of different genders perceived the content significantly differently, with viewers of diverse gender identity perceiving it at a higher level than either men or women.",
        "**Age, education level and average income made no significant difference to how the content was perceived.**",
        "Viewers' attitude towards the organisation was negative, and moved in the same direction as their unsupportive behaviour towards it (r = 0.683, a moderate correlation).",
      ],
      soWhat:
        "The study translates an ethics problem into language management reads: viewers treat a programme as the organisation's product, and when the product lacks social responsibility they stop supporting the company — which hits popularity and profit over the long run. The authors' recommendation is to hold production to media ethics standards from the outset rather than fixing things once the story breaks.",
      caveat:
        "The content analysis deliberately selected eight episodes that **had already become news stories**, so it cannot tell us how common this content is across Thai entertainment generally. The survey covers 425 Bangkok viewers, 72.24% of them women and 52.24% aged 24 to 34, and measures behaviour by self-report.",
    },
  },
  {
    slug: "southern-border-narrative",
    illustrationAltTh: "ภาพประกอบกระดาษ วัตถุชิ้นเดียวที่ทอดเงาห้าเงาออกไปคนละทิศ",
    illustrationAltEn: "Paper-craft illustration of a single object casting five shadows in five different directions",
    indexUrl: "https://so02.tci-thaijo.org/index.php/jcomm/article/view/275202",
    articleLanguage: "th",
    license: "cc-by-nc-nd",
    pdfUrl: "https://so02.tci-thaijo.org/index.php/jcomm/article/download/275202/184754",
    localCopy: "southern-border-narrative.pdf",
    th: {
      headline: "ฟังเรื่องเล่าจากทุกฝ่ายในชายแดนใต้ แล้วจะเห็นว่าปัญหามีห้าด้าน ไม่ใช่ด้านเดียว",
      question:
        "ความขัดแย้งและความรุนแรงในจังหวัดชายแดนใต้มักถูกอธิบายจากมุมของฝ่ายใดฝ่ายหนึ่ง งานนี้ถามว่าถ้าใช้กระบวนทัศน์การเล่าเรื่องที่ข้ามพ้นตัวตน (self-transcendental narrative paradigm) คือให้แต่ละฝ่ายเล่าจากมุมของตน แล้วย้ายไปมองจากมุมของฝ่ายอื่น ปัญหาจะปรากฏออกมาเป็นอย่างไร",
      method:
        "วิจัยเชิงคุณภาพภาคสนามในจังหวัดปัตตานี ทำงานร่วมกับผู้ประสานงานที่คุ้นเคยกับพื้นที่ เก็บข้อมูลด้วยการสนทนากลุ่มกับผู้ให้ข้อมูล 34 คน (ประชาชนที่นับถือศาสนาอิสลาม 8 คน · ประชาชนที่นับถือศาสนาพุทธ 8 คน · ครู 6 คน · ผู้เพิ่งสำเร็จการศึกษา 12 คน) และการสัมภาษณ์เชิงลึกรายบุคคลกับกลุ่มที่อ่อนไหวต่อการแสดงความเห็นในวงกลุ่มอีก 17 คน (ผู้นำศาสนาอิสลาม 3 · พระภิกษุ 3 · เจ้าหน้าที่ฝ่ายปกครองท้องถิ่น 3 · เจ้าหน้าที่รักษาความสงบ 3 · กลุ่มเชื้อชาติศาสนาอื่นและคนนอกพื้นที่ 5) ใช้กิจกรรมสะท้อนความคิดอย่างการวาดภาพและการอุปมาอุปไมยประกอบ แล้ววิเคราะห์เรื่องเล่า 33 เหตุการณ์ งานนี้ได้รับทุนจากสำนักงานการวิจัยแห่งชาติ",
      findings: [
        "ปัญหาปรากฏเป็นห้ามิติ ไม่ใช่มิติเดียว — (1) การรักษาอำนาจปกครองของรัฐ (2) ความสัมพันธ์เชิงอำนาจระหว่างพลเรือนกับทหาร และประชาชนกับฝ่ายปกครอง (3) ปัญหาสังคม การศึกษา ยาเสพติด ความเชื่อ วิถีชีวิตและการทำมาหากิน (4) ผลประโยชน์ของบุคคล กลุ่มคน และองค์กรที่ได้จากการมีความรุนแรงในพื้นที่ (5) การรับรู้ที่มาจากสื่อ",
        "มิติที่ห้าคือช่องว่างระหว่างภาพในข่าวกับชีวิตจริง — คนในพื้นที่มองว่าตนเองยังใช้ชีวิตได้ตามปกติ ไม่ได้อันตรายอย่างที่ปรากฏในสื่อ แต่ภาพในสื่อสร้างความกลัวจนคนนอกไม่กล้าเดินทางเข้าไป",
        "ผู้ให้ข้อมูลในพื้นที่ร้องขอเองว่าสื่อควรนำเสนอภาพการใช้ชีวิตตามปกติ รวมถึงสถานที่ วัฒนธรรม และธรรมชาติที่สวยงาม เพราะจะช่วยการท่องเที่ยวและเศรษฐกิจ ซึ่งเป็นส่วนหนึ่งของปัญหาที่ถูกบดบังด้วยข่าวความรุนแรง",
        "การมุ่งรายงานเฉพาะ “ความรุนแรงที่มองเห็นได้” โดยไม่เสนอทางออก มีส่วนสร้างภาพเหมารวมต่อศาสนาอิสลาม ชาวมุสลิม และตัวพื้นที่ จนนำไปสู่ความหวาดกลัว ความระแวง และการเลือกปฏิบัติ",
      ],
      soWhat:
        "ข้อเสนอของผู้วิจัยคือเปลี่ยนโจทย์จาก “แก้ปัญหาความขัดแย้งและความรุนแรง” เป็น “การสร้างความสงบสุขของเราในพื้นที่” โดยเริ่มจากการสื่อสารมุมของทุกคนให้ผู้เกี่ยวข้องทั้งในและนอกพื้นที่ได้รับรู้จริงๆ แล้วออกแบบกระบวนการที่มากกว่าการเจรจาต่อรองและทำข้อตกลง สำหรับคนทำสื่อ ข้อเสนอที่ตรงที่สุดคือการรายงานชีวิตปกติของพื้นที่ ในฐานะบทบาทที่เพิ่มเติมจากงานสร้างสันติภาพที่ผ่านมา",
      caveat:
        "เป็นงานเชิงคุณภาพในจังหวัดปัตตานีจากผู้ให้ข้อมูล 51 คน มุ่งอธิบายความเข้าใจของผู้คนที่มีต่อปัญหา ไม่ใช่การวัดขนาดหรือความถี่ของเหตุการณ์ และไม่ได้ประเมินผลของนโยบายใด",
    },
    en: {
      headline: "Listen to every side's story in the southern border provinces and the problem appears in five dimensions, not one",
      question:
        "Conflict and violence in Thailand's southern border provinces are usually explained from one side's point of view. What does the problem look like under a self-transcendental narrative paradigm — where each group tells its own story and is then asked to step across and see the same events from another group's position?",
      method:
        "Qualitative field research in Pattani province, conducted with local coordinators familiar with the area. Focus groups gathered 34 participants (8 Muslim residents and traders, 8 Buddhist residents and traders, 6 teachers, 12 recent school leavers), and individual in-depth interviews reached a further 17 people whose views were sensitive to express in a group setting (3 Islamic religious leaders, 3 Buddhist monks, 3 local administrative officers, 3 security officers, and 5 people of other ethnicities and religions plus outsiders). Projective techniques such as drawing and metaphor accompanied the sessions. Thirty-three narrated events were then analysed. The work was funded by the National Research Council of Thailand.",
      findings: [
        "The problem appears in five dimensions rather than one: (1) the state maintaining its governing authority; (2) power relations between civilians and the military, and between the public and the administration; (3) social problems — education, narcotics, belief, ways of life and making a living; (4) the interests of individuals, groups and organisations that benefit from violence continuing in the area; and (5) perception formed by the media.",
        "That fifth dimension is the gap between the picture in the news and daily life: residents see themselves as living normally, not in the danger the media portrays, while the media picture generates enough fear that outsiders will not travel there.",
        "Residents themselves asked that the media show ordinary life in the area, along with its places, culture and natural beauty, because that would help tourism and the local economy — part of the problem that coverage of violence obscures.",
        "Reporting only “visible violence” without offering any way out contributes to stereotypes of Islam, of Muslims, and of the area itself, leading to fear, suspicion and discrimination.",
      ],
      soWhat:
        "The authors propose changing the question from “solving the conflict and violence” to “building our own peace in this place” — starting by communicating everyone's perspective so that those working on the problem, inside and outside the area, genuinely understand it, and then designing a process that goes beyond negotiation and agreements. For media practitioners the most direct recommendation is to report ordinary life in the area as an addition to existing peace-building work.",
      caveat:
        "Qualitative work in Pattani province with 51 informants, aimed at explaining how people understand the problem rather than measuring the scale or frequency of events. It does not evaluate any policy.",
    },
  },
  {
    slug: "horror-storytelling-engagement",
    illustrationAltTh: "ภาพประกอบกระดาษ ชามใบใหญ่เต็มปรี่ ต่อด้วยเส้นด้ายบางไปยังชามจิ๋วที่มีเพียงชิ้นเดียว",
    illustrationAltEn: "Paper-craft illustration of a brimming bowl linked by a thin thread to a tiny bowl holding one disc",
    indexUrl: "https://so12.tci-thaijo.org/index.php/jcmn/article/view/5690",
    articleLanguage: "th",
    pdfUrl: "https://so12.tci-thaijo.org/index.php/jcmn/article/download/5690/5224",
    th: {
      headline: "แฟนรายการผีเชื่อใจรายการมาก แต่แทบไม่ควักเงินสนับสนุน",
      question:
        "รายการเล่าเรื่องราวสยองขวัญมีฐานแฟนเหนียวแน่น งานนี้ถามว่าความคิดเห็นของผู้ติดตามต่อการสื่อสารการตลาดเชิงความสัมพันธ์ของรายการ สัมพันธ์กับพฤติกรรมการมีส่วนร่วมของเขาแค่ไหน และลักษณะทางประชากรทำให้ต่างกันอย่างไร",
      method:
        "วิจัยเชิงสำรวจด้วยแบบสอบถามออนไลน์จากผู้ที่ติดตามหรือเคยติดตามรายการเล่าเรื่องสยองขวัญ อายุ 18 ปีขึ้นไป จำนวน 400 คน (ค่าสัมประสิทธิ์แอลฟา 0.72–0.86) รายการที่กลุ่มตัวอย่างติดตามสูงสุดคือ The Ghost Radio และอังคารคลุมโปง เท่ากันที่ร้อยละ 87.25 วัดสามมิติคือความเชื่อใจ ความผูกพัน และการสื่อสาร เทียบกับพฤติกรรมการมีส่วนร่วมทั้งแบบทั่วไปและแบบที่มีค่าใช้จ่าย วิเคราะห์ด้วยสถิติเชิงพรรณนา สหสัมพันธ์เพียร์สัน และ One-way ANOVA",
      findings: [
        "ความคิดเห็นต่อการสื่อสารการตลาดเชิงความสัมพันธ์โดยรวมอยู่ระดับปานกลาง (3.36) โดยด้านความเชื่อใจสูงสุด (3.56) และข้อที่สูงสุดคือ “เชื่อว่ารายการให้ข้อมูลที่เป็นความจริงและน่าเชื่อถือ” (3.81)",
        "แต่พฤติกรรมการมีส่วนร่วมโดยรวมอยู่ระดับต่ำ (2.45) — กิจกรรมต้นทุนต่ำอย่างการคอมเมนต์ใต้คลิปหรือในไลฟ์ (3.28) และการแบ่งปันคลิป (3.25) ทำกันมาก ส่วนการโดเนทเงินสนับสนุน (1.75) และการไปทริปท่องเที่ยว (1.41) ต่ำที่สุด",
        "ความสัมพันธ์ระหว่างความคิดเห็นกับพฤติกรรมเป็นบวกและมีนัยสำคัญ แต่**อยู่ในระดับต่ำมาก** (r = 0.167, p < .05) ทัศนคติที่ดีจึงแทบไม่ได้ทำนายการมีส่วนร่วมจริง",
        "ด้านความคิดเห็น กลุ่มอายุ 46–59 ปี (3.61) และ 60 ปีขึ้นไป (3.72) เป็นบวกสูงกว่ากลุ่มอายุ 18–35 ปี ส่วน**เพศ ระดับการศึกษา อาชีพ และรายได้ ไม่ทำให้ความคิดเห็นต่างกัน**",
        "ด้านพฤติกรรม กลุ่มข้าราชการ/รัฐวิสาหกิจ และกลุ่มรายได้ 10,001–30,000 บาท มีส่วนร่วมสูงกว่ากลุ่มอื่น ส่วน**เพศ อายุ และระดับการศึกษาไม่ทำให้พฤติกรรมต่างกัน**",
      ],
      soWhat:
        "งานนี้ชี้ช่องว่างระหว่างทัศนคติกับพฤติกรรม (attitude-behaviour gap) ที่คนทำคอนเทนต์เจอบ่อย — ผู้ติดตามเชื่อใจรายการและพร้อมบอกต่อ แต่ยังไม่แปลงเป็นการสนับสนุนที่มีค่าใช้จ่าย ทางออกที่ผลวิจัยชี้คือออกแบบขั้นบันไดจากกิจกรรมต้นทุนต่ำที่คนทำอยู่แล้ว ไปสู่การสนับสนุนที่จับต้องได้ แทนการกระโดดไปขอโดเนทตั้งแต่แรก",
      caveat:
        "ผู้วิจัยระบุข้อจำกัดไว้เองสองข้อ — พฤติกรรมบางด้านวัดจากคำตอบในแบบสอบถามเท่านั้น จึงอาจคลาดเคลื่อนจากพฤติกรรมจริง และกลุ่มตัวอย่าง 400 คนยังถือว่าเล็กเมื่อเทียบกับผู้ที่เคยติดตามรายการประเภทนี้ทั้งหมด สรุปผลจึงยังไม่ครอบคลุมประชากรทั้งหมด",
    },
    en: {
      headline: "Horror-podcast fans trust the show deeply — and that trust almost never turns into money",
      question:
        "Horror storytelling programmes hold unusually devoted audiences. How closely does what followers think of a programme's relationship marketing communication relate to how they actually engage with it, and do demographics change the answer?",
      method:
        "A survey of 400 people aged 18 and over who follow or have followed horror storytelling programmes, conducted by online questionnaire (Cronbach's Alpha 0.72–0.86). The most-followed programmes among respondents were The Ghost Radio and Angkhan Khlum Pong, tied at 87.25%. The instrument measured three dimensions — trust, commitment and communication — against both ordinary engagement behaviour and engagement that costs money, analysed with descriptive statistics, Pearson's correlation, and one-way ANOVA.",
      findings: [
        "Overall opinion of the programmes' relationship marketing communication was moderate (3.36), with trust rated highest (3.56) and the single highest item being “I believe the programme gives truthful and credible information” (3.81).",
        "Engagement behaviour overall, however, was low (2.45). Low-cost actions were common — commenting under clips or during live streams (3.28) and sharing clips (3.25) — while donating money (1.75) and joining a trip (1.41) were lowest of all.",
        "Opinion and behaviour correlated positively and significantly, but **the correlation was very low** (r = 0.167, p < .05), so a favourable attitude barely predicts real engagement.",
        "On opinion, the 46–59 (3.61) and 60-and-over (3.72) groups were more positive than the 18–35 group, while **gender, education, occupation and income made no difference**.",
        "On behaviour, civil servants and state enterprise employees, and those earning 10,001–30,000 baht, engaged more than other groups, while **gender, age and education made no difference**.",
      ],
      soWhat:
        "The study puts a number on the attitude-behaviour gap content creators keep running into: followers trust the programme and will recommend it, but that has not converted into paid support. What the results point to is designing a ladder from the low-cost actions people already take up towards tangible support, rather than jumping straight to asking for donations.",
      caveat:
        "The authors state two limits themselves: some behaviours were measured only through questionnaire answers and may diverge from what people actually do, and 400 respondents remains a small sample against everyone who has followed programmes of this kind, so the conclusions do not yet cover the whole population.",
    },
  },
  {
    slug: "migrant-worker-exercise-codesign",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กล่องใบเล็กที่มีรูปทรงพอดีวางอยู่ข้างใน ขณะที่รูปทรงใหญ่กว่าวางค้างอยู่ข้างนอก",
    illustrationAltEn:
      "Paper-craft illustration of a small box holding the one shape that fits, with a larger shape left outside it",
    doi: "10.1186/s40900-026-00891-8",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "migrant-worker-exercise-codesign.pdf",
    th: {
      headline: "ถามคนทำงานก่อนออกแบบ จึงได้ท่าบริหารที่ทำได้จริงในห้องพักและนอกเวลางาน",
      question:
        "แรงงานข้ามชาติชาวเมียนมาในโรงงานอาหารทะเลของไทยเจ็บป่วยจากงานซ้ำๆ อย่างการแกะกุ้งและยืนนาน แต่โครงการสุขภาพทั่วไปเข้าไม่ถึงคนกลุ่มนี้เพราะกำแพงภาษาและวัฒนธรรม งานนี้ถามว่าถ้าให้คนทำงานร่วมออกแบบตั้งแต่ต้น โปรแกรมที่ได้จะต่างจากที่ผู้เชี่ยวชาญออกแบบเองอย่างไร",
      method:
        "งานออกแบบร่วมแบบผสมวิธี จัดวงสนทนากับแรงงานชาวเมียนมา 29 คน แบ่งสามกลุ่มตามอายุงาน (น้อยกว่า 2 ปี 10 คน · 2–5 ปี 11 คน · มากกว่า 5 ปี 8 คน) ทั้งหมดมาจากโรงงานเดียว คุยด้วยภาษาเมียนมาและจัดเวลาให้เข้ากับกะทำงาน 12 ชั่วโมง ประกอบกับการคุยกับฝ่ายบุคคลและหัวหน้าสายการผลิต 5 คน แล้วส่งให้นักกายภาพบำบัดต่างประเทศ 4 คนตรวจความตรงเชิงเนื้อหา · ขอความยินยอมเป็นรายบุคคลโดยไม่มีฝ่ายบริหารอยู่ด้วย ให้เวลาตัดสินใจ 48 ชั่วโมง และไม่ให้หัวหน้างานเป็นผู้ชี้ตัวผู้เข้าร่วม",
      findings: [
        "**แรงงานทั้ง 29 คนมีอาการที่มือทุกคน** ทั้งชา เสียว และปวด · 25 คน (86%) มีอาการมือแข็งตอนเช้าจนกระทบชีวิตนอกงานด้วย · ปวดคอ 79% ปวดหลังส่วนล่าง 72% ปวดข้อเท้า 45%",
        "**23 คนจาก 29 (79%) ซื้อยาแก้ปวดกินเองอย่างน้อยสัปดาห์ละครั้ง** และบางคนกลับไปทำงานแบบเดิมทันทีหลังผ่าตัด สะท้อนว่าคนกลุ่มนี้พยายามดูแลตัวเองอยู่แล้ว แต่ด้วยวิธีที่เสี่ยง",
        "**26 คนจาก 29 (89.7%) ใช้เฟซบุ๊กทุกวัน** และเลือกช่องทางนี้เพราะเปิดดูเรื่องสุขภาพได้โดยหัวหน้าไม่เห็น · ขอเป็นวิดีโอสาธิตมากกว่าเอกสาร และ**ปฏิเสธการอบรมแบบบังคับในวันหยุดวันเดียวของสัปดาห์**",
        "อุปสรรคเข้าถึงบริการสุขภาพที่แรงงานเล่าเอง — บุคลากรไม่พูดภาษาพม่า ล่ามในโรงพยาบาลรัฐพูดจาไม่ให้เกียรติ ประกันของโรงงานคุ้มครองเฉพาะอุบัติเหตุเฉียบพลันไม่ครอบคลุมอาการเรื้อรัง และถูกเลือกปฏิบัติ",
        "ข้อกำหนดที่แรงงานตั้งเองกลายเป็นโจทย์ออกแบบ — ท่าบริหารต้องทำได้ในพื้นที่แคบระดับห้องพัก ไม่ใช้อุปกรณ์ ทำนอกเวลางาน และไม่ทำให้รายได้ลดลง เพราะทุกคนมีภาระส่งเงินกลับบ้าน",
        "ผลลัพธ์คือชุดท่าบริหาร 12 ท่า 4 สัปดาห์ ที่**ผ่านการตรวจความตรงเชิงเนื้อหาจากผู้เชี่ยวชาญในระดับสูง** (I-CVI 0.95–1.00 · S-CVI/Ave 0.94) แสดงว่าการฟังคนทำงานไม่ได้ทำให้คุณภาพทางคลินิกลดลง",
      ],
      soWhat:
        "บทเรียนที่ใช้ได้กับงานสื่อสารสุขภาพทุกแบบคือ ข้อจำกัดที่คนหน้างานบอกไม่ใช่ข้อจำกัดที่ต้องยอมแลกกับคุณภาพ แต่เป็นเงื่อนไขที่ทำให้โปรแกรมถูกใช้จริง · การเลือกช่องทางที่คนกลุ่มเป้าหมายใช้อยู่แล้วและปกปิดตัวตนได้ สำคัญกว่าการเลือกช่องทางที่องค์กรถนัด",
      caveat:
        "**งานนี้เป็นการออกแบบร่วม ไม่ใช่การทดสอบว่าท่าบริหารได้ผลจริง** สิ่งที่พิสูจน์แล้วคือกระบวนการออกแบบให้ผลลัพธ์ที่ทั้งใช้ได้จริงและผ่านมาตรฐานคลินิก ส่วนผลต่อสุขภาพจะรู้ในระยะถัดไปที่ยังไม่ได้ทำ · เก็บข้อมูลจากโรงงานเดียว 29 คน ด้วยการเลือกตัวอย่างตามสะดวก จึงไม่ใช่ภาพแทนแรงงานข้ามชาติทั้งอุตสาหกรรม",
    },
    en: {
      headline: "Ask the workers first, and you get exercises that fit a dormitory room and the hours they actually have",
      question:
        "Myanmar migrant workers in Thailand's seafood plants are injured by repetitive tasks such as shrimp peeling and long hours standing, yet ordinary health programmes never reach them because of language and cultural barriers. This study asked what changes when the workers help design the programme from the start.",
      method:
        "A mixed-methods co-design study. Engagement sessions were held with 29 Myanmar workers in three groups by length of service (under 2 years, 10; 2–5 years, 11; over 5 years, 8), all from a single factory, conducted in Myanmar language and scheduled around 12-hour shifts. Five workplace stakeholders (HR managers and line supervisors) were consulted, and four international physical therapists assessed content validity. Consent was taken privately without management present, with 48 hours to decide, and supervisors did not refer participants.",
      findings: [
        "**Every one of the 29 workers reported hand symptoms** — numbness, tingling and pain. Twenty-five (86%) had morning hand stiffness that affected life outside work as well. Neck pain 79%, lower back pain 72%, ankle pain 45%.",
        "**23 of the 29 (79%) bought over-the-counter painkillers at least weekly**, and some returned to identical work straight after surgery — this group was already trying to manage its own health, but by risky means.",
        "**26 of 29 (89.7%) used Facebook daily** and chose it because they could read about health without supervisors seeing. They asked for video demonstrations rather than written material, and **rejected compulsory workshops on their single day off**.",
        "Barriers to care named by the workers themselves: providers who do not speak Burmese, interpreters in government hospitals who treated them disrespectfully, workplace insurance covering only acute injury rather than chronic conditions, and discrimination.",
        "The constraints the workers set became the design brief — exercises had to work in a dormitory-sized space, need no equipment, run outside working hours, and never reduce earnings, since all of them send money home.",
        "The result was a 12-exercise, four-week programme that **scored highly on expert content validity** (I-CVI 0.95–1.00; S-CVI/Ave 0.94), showing that listening to workers did not cost clinical quality.",
      ],
      soWhat:
        "The transferable lesson for any health communication work is that the constraints named by the people at the sharp end are not a trade-off against quality — they are the conditions under which a programme gets used at all. Choosing a channel the audience already uses, and can use privately, matters more than choosing the channel the organisation is comfortable with.",
      caveat:
        "**This is a co-design study, not a test of whether the exercises work.** What it demonstrates is that the design process produced something both usable and clinically valid; the health effects belong to a later phase that has not been run. Evidence comes from one factory and 29 people recruited by purposive convenience sampling, so it does not represent migrant workers across the industry.",
    },
  },
  {
    slug: "thailand-image-cannabis-youtube",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กองแผ่นกลมสีเดียวสูงท่วม กับกองสีที่สองที่เตี้ยมากอยู่ข้างๆ",
    illustrationAltEn:
      "Paper-craft illustration of one tall stack of discs in a single colour beside a second stack that is barely off the ground",
    doi: "10.1371/journal.pone.0317506",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "thailand-image-cannabis-youtube.pdf",
    th: {
      headline: "โลกมองไทยหลังปลดล็อกกัญชาในแง่บวกท่วมท้น แต่แทบไม่มีคลิปไหนเตือนนักท่องเที่ยวเรื่องกฎหมายบ้านตัวเอง",
      question:
        "หลังไทยปลดล็อกกัญชาเมื่อ 9 มิถุนายน 2565 ภาพของประเทศบนยูทูบซึ่งเป็นแหล่งข้อมูลหลักของนักท่องเที่ยวทั่วโลกถูกเล่าออกมาอย่างไร ใครเป็นคนเล่า และเล่าครบหรือไม่",
      method:
        "วิเคราะห์เนื้อหาคลิปยูทูบ 57 คลิป ที่เผยแพร่ระหว่าง 9 มีนาคม ถึง 9 กันยายน 2565 คือสามเดือนก่อนและสามเดือนหลังวันปลดล็อก แบ่งเป็นคลิปข่าว 30 คลิป (52.6%) และวล็อก 27 คลิป (47.4%) วิเคราะห์ด้วยกรอบการประกอบสร้างข่าวและภาพลักษณ์ประเทศ",
      findings: [
        "**คลิปร้อยละ 81 เผยแพร่หลังวันประกาศปลดล็อก** และกระจุกตัวในเดือนมิถุนายนที่มีถึง 21 คลิป (36.8%) ก่อนจะลดเหลือ 2 คลิป (3.5%) ในเดือนกันยายน",
        "**โทนโดยรวมเป็นบวก 43 คลิป (75.4%)** ลบเพียง 4 คลิป (7.0%) ก้ำกึ่ง 9 คลิป (15.8%) และเป็นกลาง 1 คลิป (1.8%)",
        "มิติที่ถูกพูดถึงมากที่สุดคือมิติอารมณ์ 89.5% รองมาคือมิติสังคม 82.5% และกายภาพ 77.2% ส่วนมิติการเมืองถูกพูดถึงน้อยที่สุดที่ 50.9%",
        "**คนที่ถูกอ้างเป็นเสียงแรกคือคนไทยทั่วไป 42.1% และเจ้าหน้าที่รัฐไทย 26.3%** รวมกันเกือบเจ็ดในสิบ แปลว่าเรื่องเล่าที่โลกได้ยินมาจากฝั่งไทยเป็นหลัก",
        "**คลิปจำนวนมากมีเสียงเดียว** — 28.1% ไม่มีผู้ถูกอ้างคนที่สองเลย และ 64.9% ไม่มีคนที่สาม",
        "**มีคลิปจำนวนน้อยมากที่เตือนนักท่องเที่ยวเรื่องความยุ่งยากทางกฎหมายเมื่อกลับประเทศตัวเอง** ทั้งที่เป็นข้อมูลที่ผู้ชมกลุ่มนี้ต้องใช้มากที่สุด",
      ],
      soWhat:
        "สำหรับงานสื่อสารภาพลักษณ์ประเทศ ผลนี้ชี้ว่าการเปลี่ยนนโยบายครั้งใหญ่สร้างความสนใจได้จริงและได้โทนบวก แต่ความสนใจนั้นมีอายุสั้นและกระจุกอยู่ที่ช่วงประกาศ · ที่สำคัญกว่าคือเรื่องเล่าที่บวกแต่ไม่ครบอาจทำให้ผู้ชมตัดสินใจโดยขาดข้อมูลที่จำเป็น ซึ่งย้อนกลับมากระทบชื่อเสียงของประเทศได้ในภายหลัง",
      caveat:
        "วิเคราะห์คลิปเพียง 57 คลิปจากแพลตฟอร์มเดียวในช่วงหกเดือน จึงเป็นภาพช่วงเวลาหนึ่งไม่ใช่ภาพรวมของสื่อทั้งหมด · ผู้เขียนเองเสนอให้งานต่อไปขยายทั้งขนาดตัวอย่างและแหล่งข้อมูล · ข้อมูลเก็บปี 2565 ก่อนที่ทิศทางนโยบายกัญชาของไทยจะเปลี่ยนอีกครั้ง",
    },
    en: {
      headline: "The world's picture of Thailand after cannabis legalisation was overwhelmingly positive — and almost never mentioned the law back home",
      question:
        "After Thailand legalised cannabis on 9 June 2022, how was the country portrayed on YouTube — a primary information source for travellers worldwide — who was doing the telling, and was the account complete?",
      method:
        "A content analysis of 57 YouTube clips published between 9 March and 9 September 2022, the three months either side of legalisation: 30 news segments (52.6%) and 27 vlogs (47.4%), analysed through media framing and nation-image frameworks.",
      findings: [
        "**81% of the clips appeared after the legalisation announcement**, concentrated in June with 21 clips (36.8%), falling to just 2 clips (3.5%) by September.",
        "**Overall tone was positive in 43 clips (75.4%)**, negative in only 4 (7.0%), ambivalent in 9 (15.8%) and neutral in 1 (1.8%).",
        "The most covered dimension was emotional at 89.5%, then social at 82.5% and physical at 77.2%. The political dimension was covered least, at 50.9%.",
        "**The first-quoted voice was an ordinary Thai citizen in 42.1% of clips and a Thai government official in 26.3%** — together nearly seven in ten, meaning the story the world heard came mainly from the Thai side.",
        "**Many clips carried a single voice** — 28.1% quoted no second actor at all, and 64.9% quoted no third.",
        "**Very few clips warned travellers about the legal complications of returning to their own countries**, the very information that audience most needed.",
      ],
      soWhat:
        "For nation-image work, this shows a major policy change can generate real attention in a favourable tone — but that the attention is short-lived and clusters around the announcement. More importantly, an account that is positive but incomplete can leave audiences deciding without information they need, which can rebound on the country's reputation later.",
      caveat:
        "Only 57 clips from a single platform over six months, so this is a snapshot rather than a picture of all media coverage. The authors themselves call for larger samples and more sources in future work. The data was collected in 2022, before the direction of Thai cannabis policy shifted again.",
    },
  },
  {
    slug: "health-officers-knowledge-sharing",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ประตูบานใหม่ที่ปิดอยู่ ข้างๆ มีบานเก่าที่เปิดค้างและมีร่องรอยการใช้งาน",
    illustrationAltEn:
      "Paper-craft illustration of a new door standing shut beside an older, well-worn one that is propped open",
    doi: "10.14456/jhr.2015.30",
    articleLanguage: "en",
    th: {
      headline: "อุปสรรคใหญ่ที่สุดคือไม่คุ้นเครื่องมือใหม่ เจ้าหน้าที่จึงเลือกเครื่องมือที่ใช้อยู่ทุกวันกับการเจอหน้ากัน",
      question:
        "ราชการไทยกำหนดให้ทุกหน่วยงานต้องจัดการความรู้ภายในองค์กร งานนี้ถามว่าเจ้าหน้าที่ที่ต้องทำจริงติดขัดตรงไหน และถ้าให้เลือกเอง เขาอยากแลกเปลี่ยนความรู้กันด้วยวิธีไหนและบนช่องทางใด",
      method:
        "สำรวจด้วยแบบสอบถามส่งทางไปรษณีย์ถึงเจ้าหน้าที่กรมควบคุมโรคที่รับผิดชอบงานสื่อสารสุขภาพทั่วประเทศ 111 คน (ชาย 41 หญิง 70) ตอบกลับครบ 100% เพราะผู้บริหารระดับสูงกำหนดให้ต้องตอบ · ใช้หัวข้อการสื่อสารป้องกันโรคเบาหวานเป็นกรณีตั้งต้น · แบบสอบถาม 18 ข้อผ่านการตรวจความตรงเชิงเนื้อหาจากผู้เชี่ยวชาญ 5 ท่าน · ตอบได้มากกว่าหนึ่งข้อต่อคำถาม",
      findings: [
        "**อุปสรรคอันดับหนึ่งคือไม่คุ้นเคยกับเทคโนโลยีใหม่ 54.1% (60 คน)** รองลงมาคือมักแบ่งปันเรื่องที่ไม่เกี่ยวข้อง 43.2% (48 คน) และความไม่สะดวกในการประสานงาน 40.5% (45 คน)",
        "**ไม่อยากเปิดเผยข้อมูล 36.9% (41 คน) และไม่มีแรงจูงใจ 32.4% (36 คน)** ขณะที่ 25.2% (28 คน) ระบุว่าปัญหาคือการถูกบังคับให้เข้าร่วม",
        "**ช่องทางที่เลือกมากที่สุดคือเฟซบุ๊ก 53.2% (59 คน)** ทิ้งห่างเว็บบอร์ดและอีเมลที่ได้เท่ากันที่ 19.8% แชท 18.9% ประชุมทางไกล 18.9% ส่วนทวิตเตอร์ได้เพียง 6.3%",
        "**กิจกรรมที่อยากได้กลับเป็นแบบพบหน้า** — ประชุมและศึกษาดูงาน 30.6% (34 คน) บรรยายและอบรมเชิงปฏิบัติการ 29.7% (33 คน) และมีพี่เลี้ยงคอยแนะ 27.0% (30 คน)",
        "**องค์ประกอบกลุ่มที่ต้องการชัดเจนที่สุดคือกลุ่มคละประสบการณ์และมีพี่เลี้ยง 55.9% (62 คน)** เทียบกับกลุ่มที่มีแต่คนช่ำชองซึ่งได้เพียง 16.2% และกลุ่มมือใหม่ล้วน 6.3%",
      ],
      soWhat:
        "คำตอบของคนหน้างานสวนทางกับสมมติฐานที่มักตั้งกันว่าการจัดการความรู้ต้องเริ่มที่แพลตฟอร์มใหม่ · เมื่ออุปสรรคอันดับหนึ่งคือความไม่คุ้นเคย การเพิ่มเครื่องมือใหม่ยิ่งทำให้ปัญหาหนักขึ้น สิ่งที่เจ้าหน้าที่เลือกคือช่องทางที่ใช้อยู่แล้วในชีวิตประจำวัน บวกกับคนที่คอยแนะ — เทคโนโลยีเป็นเรื่องรอง ความสัมพันธ์เป็นเรื่องหลัก",
      caveat:
        "**อัตราตอบกลับ 100% มาจากการที่ผู้บริหารกำหนดให้ตอบ ไม่ใช่ความสมัครใจ** ซึ่งอาจทำให้คำตอบโน้มไปทางที่คิดว่าองค์กรอยากได้ยิน และสอดคล้องกับที่ผู้ตอบ 25.2% ระบุเองว่าการถูกบังคับเข้าร่วมเป็นปัญหา · เป็นการสำรวจความชอบที่แจ้งเอง ไม่ใช่การสังเกตพฤติกรรมจริง · **เก็บข้อมูลปี 2557–2558** ตัวเลือกในแบบสอบถามยังมีไฮไฟฟ์ บทบาทของเฟซบุ๊กในที่ทำงานไทยจึงต่างจากปัจจุบันมาก · เก็บจากกรมเดียวและใช้หัวข้อเบาหวานเป็นกรณีตั้งต้น",
    },
    en: {
      headline: "The biggest obstacle was unfamiliar technology — so the staff chose the tool they already used daily, and each other",
      question:
        "Thai government offices are required to run internal knowledge management. This study asked where the officers who actually have to do it get stuck, and — given the choice — how and where they would rather share what they know.",
      method:
        "A postal survey of 111 officers responsible for health communication at the Department of Disease Control nationwide (41 men, 70 women), with a 100% response rate because senior management required regional managers to respond. Diabetes prevention communication was the reference topic. The 18-item questionnaire passed content-validity review by five specialists. Respondents could select more than one answer per question.",
      findings: [
        "**The leading obstacle was unfamiliarity with new technology at 54.1% (60 people)**, followed by a tendency to share irrelevant material at 43.2% (48) and inconvenient collaboration at 40.5% (45).",
        "**Unwillingness to disclose information reached 36.9% (41) and lack of motivation 32.4% (36)**, while 25.2% (28) named compulsory participation itself as a problem.",
        "**Facebook was the most chosen platform at 53.2% (59 people)**, far ahead of web boards and email at 19.8% each, chat at 18.9%, videoconference at 18.9%, and Twitter at just 6.3%.",
        "**The activities they wanted were face to face** — meetings and study trips at 30.6% (34), lectures and workshops at 29.7% (33), and mentoring at 27.0% (30).",
        "**The clearest preference of all was for mixed-experience groups with a mentor, at 55.9% (62 people)**, against 16.2% for groups of experienced communicators only and 6.3% for beginners only.",
      ],
      soWhat:
        "The staff's own answers cut against the common assumption that knowledge management starts with a new platform. When the top obstacle is unfamiliarity, adding another tool makes the problem worse. What they chose was the channel already in their daily lives plus people to guide them — technology second, relationships first.",
      caveat:
        "**The 100% response rate came from a management requirement, not from willingness**, which may pull answers toward what respondents thought the organisation wanted to hear — consistent with the 25.2% who named forced participation as a problem. These are self-reported preferences, not observed behaviour. **The data is from 2014–2015**: the option list still included Hi5, and Facebook's role in Thai workplaces has changed considerably since. Evidence comes from a single department using one reference topic.",
    },
  },
];

const byDoi = new Map(
  paperSummaries.flatMap((s) => (s.doi ? [[s.doi, s] as const] : [])),
);
const byIndexUrl = new Map(
  paperSummaries.flatMap((s) => (s.indexUrl ? [[s.indexUrl, s] as const] : [])),
);

/**
 * ค้นบทสรุปจากรายการผลงาน — ใช้ตอน render รายการใน /research และดัชนีค้นหา
 * ผูกด้วย DOI ก่อน ถ้าผลงานไม่มี DOI จึงใช้ URL หน้าบทความของวารสาร
 */
export const summaryForPublication = (pub: { doi?: string; indexUrl?: string }) =>
  (pub.doi ? byDoi.get(pub.doi) : undefined) ??
  (pub.indexUrl ? byIndexUrl.get(pub.indexUrl) : undefined);

/**
 * หาผลงานต้นทางของบทสรุป — **โยน error ถ้าเชื่อมไม่ติด**
 *
 * `publications.ts` ถูกเขียนทับทั้งไฟล์ทุกครั้งที่รัน `fetch-publications.mjs`
 * ถ้าค่าที่ใช้เป็นกุญแจหายไป หน้าบทสรุปจะกลายเป็นหน้ากำพร้าที่ยังอยู่ใน sitemap
 * แต่ขึ้น 404 ให้ build พังตรงนี้ดีกว่า จะได้รู้ตอนแก้ ไม่ใช่ไปรู้จากผู้อ่าน
 */
export function publicationForSummary(s: PaperSummary): PublicationEntry {
  const found = publications.find((p) => (s.doi ? p.doi === s.doi : p.indexUrl === s.indexUrl));
  if (!found)
    throw new Error(
      `paperSummaries: บทสรุป "${s.slug}" หาผลงานต้นทางไม่เจอ (${s.doi ?? s.indexUrl}) — ` +
        "ตรวจว่า publications.ts ยังมีรายการนี้อยู่หลังรัน scripts/fetch-publications.mjs",
    );
  return found;
}

export const paperSummaryBySlug = (slug: string) =>
  paperSummaries.find((s) => s.slug === slug);
