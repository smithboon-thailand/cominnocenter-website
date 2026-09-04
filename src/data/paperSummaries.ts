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
  /**
   * ภาษาที่**ตัวบทความ**เขียน ไม่ใช่ภาษาของหน้าเว็บ — ส่งเข้า inLanguage ของ JSON-LD
   *
   * เพิ่ม `"ru"` เมื่อ 3 ก.ย. 2569 เพราะผลงานร่วมกับ Санкт-Петербургский
   * государственный университет ตีพิมพ์เป็นภาษารัสเซีย · **ค่านี้ต้องตรงกับภาษา
   * ของต้นฉบับจริง** ไม่ใช่ภาษาของบทสรุป ถ้าใส่ผิด JSON-LD จะบอกเสิร์ชเอนจินว่า
   * บทความอยู่ในภาษาที่ผู้อ่านหาไม่เจอ
   */
  articleLanguage: "th" | "en" | "ru";
  /**
   * ประเภทของงาน — **ไม่มีค่าแปลว่างานที่มีผลแล้ว**
   *
   * `"protocol"` คือ**ประกาศแผนวิจัย** ซึ่งวารสารตรวจและตีพิมพ์*แผน*ก่อนเริ่มเก็บ
   * ข้อมูล เพื่อให้วิธีการถูกตรวจตั้งแต่ต้นและเทียบได้ภายหลังว่าผลที่รายงานตรงกับ
   * ที่ประกาศไว้ไหม งานประเภทนี้**ยังไม่มีผลการศึกษา** ตัวบทความเขียนไว้เองว่า
   * *"Since this is a study protocol, precise findings are not yet available"*
   *
   * เมื่อใส่ค่านี้ หน้าเว็บจะเปลี่ยนหัวข้อจาก "พบอะไร" เป็น "จะทำอะไร" ขึ้นป้าย
   * บอกก่อนเนื้อหา และเปลี่ยนคำบนลิงก์ในหน้ารายการ — ต้องเปลี่ยนครบทั้งสามที่
   * ไม่ใช่แค่ในหน้ารายละเอียด เพราะผู้อ่านที่กวาดสายตาผ่านรายการก็ต้องไม่เข้าใจผิด
   * (เคยตัดงานสองชิ้นนี้ทิ้งใน PR #31 เพราะเติมหัวข้อ "พบอะไร" อย่างซื่อสัตย์ไม่ได้
   *  · ผู้ใช้ทักเมื่อ 2 ก.ย. 2569 ว่าแผนวิจัยก็ควรมีหน้าของตัวเอง เพียงแต่ต้องเรียก
   *  ให้ตรงกับสิ่งที่มันเป็น ซึ่งถูกกว่าการตัดทิ้ง — การประกาศแผนล่วงหน้าเป็นสิ่งที่
   *  ศูนย์ฯ ควรแสดง ไม่ใช่สิ่งที่ต้องซ่อนจนกว่าจะมีผล)
   *
   * `"argument"` คือ**บทความเชิงแนวคิด** ที่ไม่ได้เก็บข้อมูลเชิงประจักษ์ตั้งแต่ต้น
   * เป็นการให้เหตุผลทางทฤษฎีล้วนๆ (ปรัชญาการสื่อสาร ปรัชญากฎหมาย ทฤษฎีศิลปะ)
   * หัวข้อเปลี่ยนเป็น "เสนออะไร / ให้เหตุผลอย่างไร" ด้วยตรรกะเดียวกับ `protocol`
   * คือ **"พบอะไร" เติมอย่างซื่อสัตย์ไม่ได้กับงานที่ไม่มีสิ่งที่พบ**
   *
   * ป้ายของ `argument` **บอกด้วยว่าข้อเสนอเป็นของผู้เขียน ไม่ใช่จุดยืนของศูนย์ฯ**
   * เพราะงานกลุ่มนี้เสนอจุดยืนเชิงบรรทัดฐานที่ถกเถียงได้ — ถ้าไม่บอก ผู้อ่านย่อม
   * อ่านหน้าบนเว็บของศูนย์ฯ ว่าเป็นคำแถลงของศูนย์ฯ ซึ่งเป็นปัญหาเดียวกับกติกาข้อ 5
   * เพียงแต่คนละด้าน (ข้อ 5 กันการที่ศูนย์ฯ ดูเหมือนตัดสินใคร · ข้อนี้กันการที่
   * ศูนย์ฯ ดูเหมือนประกาศจุดยืนทางปรัชญาแทนผู้เขียน)
   */
  kind?: "protocol" | "argument";
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
  {
    slug: "ai-generated-citations-students",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กรอบรูปที่ทำอย่างประณีตทุกด้าน แต่ข้างในว่างเปล่าเป็นพื้นสีเดียวกับฉากหลัง",
    illustrationAltEn:
      "Paper-craft illustration of a meticulously made frame whose interior is empty — the same ground as the background",
    doi: "10.1163/26659077-20252811",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "ai-generated-citations-students.pdf",
    th: {
      headline: "นิสิตหนึ่งในห้าค้นข้อมูลวิชาการจากแชตบอต และคำพูดที่มันยกมาอ้างไม่มีอยู่จริงสักประโยค",
      question:
        "เมื่อได้โจทย์ที่ต้องหาความรู้วิชาการซึ่งไม่คุ้นเคย นิสิตไทยหันไปหาแหล่งไหน และข้อมูลที่ได้จากปัญญาประดิษฐ์เชื่อถือได้แค่ไหนเมื่อเอาไปตรวจกับต้นฉบับจริง",
      method:
        "ให้นิสิตปริญญาตรีจุฬาลงกรณ์มหาวิทยาลัย 240 คน ทำโจทย์เดียวกันคือค้นอย่างรวดเร็วว่า Rudolf Carnap นักปรัชญาสายตรรกวิทยา คิดอย่างไรกับแนวคิดการพิสูจน์ยืนยันความหมาย พร้อมยกข้อความจากงานเขียนของเขามาประกอบหนึ่งข้อความ ใช้แหล่งใดก็ได้ตามใจ แล้วรายงานผ่านแบบสอบถามที่มีโครงสร้างว่าได้ข้อมูลมาจากที่ไหน ระบุถึงรุ่นของเครื่องมือ · จากนั้นผู้วิจัยนำข้อความที่นิสิตยกมาอ้างไปไล่ตรวจกับงานเขียนต้นฉบับที่ระบุไว้ทีละข้อ",
      findings: [
        "**กูเกิล 57% · แชตบอต 22% · วิกิพีเดีย 21%** — เกินหนึ่งในห้าเลือกแชตบอตเป็นแหล่งหลักในงานที่ต้องอ้างอิงงานวิชาการ โดยให้เหตุผลว่าได้คำตอบตรงและกระชับ",
        "**คำตอบ 37 ชิ้นมีข้อความที่ระบุว่าเป็นของ Carnap** พร้อมชื่อหนังสือและปีที่พิมพ์ครบถ้วน อ่านแล้วเข้ารูปการอ้างอิงวิชาการทุกประการ",
        "**ไม่มีข้อความใดเลยปรากฏอยู่ในงานที่อ้างถึง** ทั้งหมดเป็นข้อความที่ระบบแต่งขึ้นเลียนสำนวนและแนวคิดของเขา",
        "**ในการชี้แจงหลังการทดลอง นิสิตทั้ง 37 คนยืนยันว่ามั่นใจ** ว่ากำลังอ้างข้อความจริงจากงานของ Carnap — ไม่มีใครเอะใจว่าต้องกลับไปตรวจ",
      ],
      soWhat:
        "ปัญหาที่งานนี้ชี้ไม่ใช่ว่าปัญญาประดิษฐ์ตอบผิด แต่คือ**รูปแบบของคำตอบที่ดูเหมือนผ่านการตรวจสอบมาแล้ว** มีชื่อหนังสือ มีปี มีสำนวนของเจ้าของงาน ซึ่งในบริบทวิชาการคือสัญญาณว่า “ตรวจมาแล้ว” · ข้อเสนอของผู้เขียนจึงไม่ใช่การห้ามใช้ แต่ให้แพลตฟอร์มแจ้งข้อจำกัดของตัวเองให้ชัดว่าไม่สามารถตรวจสอบหรือให้การอ้างอิงที่ถูกต้องได้ และให้สถาบันการศึกษาสอนการตรวจย้อนกลับไปยังต้นฉบับเป็นทักษะการรู้เท่าทันสื่อชุดใหม่ — คนที่นำไปใช้ได้ทันทีคือผู้สอนที่ออกแบบงานมอบหมาย",
      caveat:
        "**เป็นโจทย์เดียว มหาวิทยาลัยเดียว** และแหล่งข้อมูลที่นิสิตเลือกสะท้อนช่วงเวลาที่เก็บข้อมูล ซึ่งรุ่นที่ระบุไว้ในบทความคือ ChatGPT 3.5 (ต้นฉบับส่งวารสารเดือนมกราคม 2567) เครื่องมือรุ่นที่ค้นเว็บและแนบลิงก์ได้อาจให้ผลต่างออกไป **สัดส่วน 57/22/21 จึงเป็นภาพของช่วงนั้น ไม่ใช่สัดส่วนปัจจุบัน** · หัวข้อที่ใช้เป็นปรัชญาเฉพาะทางที่มีข้อความต้นฉบับออนไลน์ไม่มาก ซึ่งเป็นเงื่อนไขที่เอื้อให้เกิดการแต่งข้อความมากกว่าหัวข้อทั่วไป · งานนี้ไม่ได้วัดว่าการอบรมแบบใดช่วยลดปัญหาได้จริง",
    },
    en: {
      headline: "One student in five researched an academic question with a chatbot — and not one of the quotations it supplied exists",
      question:
        "Given a task that requires unfamiliar academic material, where do Thai students go for it, and how well does what an AI returns hold up when checked against the original works?",
      method:
        "240 undergraduates at Chulalongkorn University were given the same task: quickly find out what Rudolf Carnap thought about verificationism and support the summary with a quotation from one of his works, using any online source they liked. Immediately afterwards a structured questionnaire recorded which source they had used, down to the version of the tool. The researchers then checked every quotation the students submitted against the work it was attributed to.",
      findings: [
        "**Google 57%, a chatbot 22%, Wikipedia 21%** — more than a fifth chose a conversational AI as their main source for a task requiring an academic citation, citing the directness and brevity of the answers.",
        "**37 submissions contained a quotation attributed to Carnap**, complete with the title of the work and the year of publication, in the form a scholarly citation takes.",
        "**Not one of those quotations appears in the work it cites.** All of them were generated text imitating his style and ideas.",
        "**At the debriefing all 37 students said they were confident** they had been quoting Carnap directly. None had thought to verify it.",
      ],
      soWhat:
        "The problem this study identifies is not that the AI was wrong. It is that **the answer arrived in the form of something already verified** — a title, a year, the author's cadence — which in academic work is precisely the signal that checking has been done. The authors' proposal is not a ban but disclosure: platforms stating plainly that they cannot verify sources or supply reliable citations, and institutions teaching verification back to the original as a new component of media literacy. The people who can act on this immediately are the ones who set the assignments.",
      caveat:
        "**One task, one university.** The source mix reflects when the data was gathered: the article names ChatGPT 3.5 as the version in use (the manuscript was submitted in January 2024), and tools that now search the web and attach links may behave differently, so **the 57/22/21 split is a snapshot, not a current figure**. The topic was a specialised area of philosophy with limited primary text online — conditions that favour fabrication more than a general topic would. The study does not test which interventions actually reduce the problem.",
    },
  },
  {
    slug: "chinese-media-thailand-cannabis",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ริบบิ้นเรียบตรงเส้นหนึ่งลอดผ่านช่องแคบ แล้วออกมาอีกด้านเป็นเส้นที่ยับและโค้งลง",
    illustrationAltEn:
      "Paper-craft illustration of a smooth ribbon passing through a narrow slot and coming out creased and curling downward",
    doi: "10.1016/j.heliyon.2023.e15478",
    articleLanguage: "en",
    license: "cc-by-nc-nd",
    localCopy: "chinese-media-thailand-cannabis.pdf",
    th: {
      headline: "ข่าวรายงานกลางๆ แต่ช่องความเห็นไม่กลาง และปลายทางคือ “ไม่ไปแล้ว”",
      question:
        "หลังไทยปลดล็อกกัญชา สื่อภาษาจีนเล่าเรื่องไทยในฐานะจุดหมายท่องเที่ยวอย่างไร และผู้อ่านชาวจีนตอบสนองต่อเรื่องเล่านั้นในทิศทางเดียวกับน้ำเสียงของข่าวหรือไม่",
      method:
        "วิเคราะห์เนื้อหาโพสต์ 128 โพสต์บนเว่ยป๋อ ระหว่างปี 2562 ถึง 2565 จากสำนักข่าวภาษาจีนสี่แห่ง (สามแห่งเป็นสื่อจีน อีกแห่งเป็นหนังสือพิมพ์ภาษาจีนในกรุงเทพฯ) ใช้กรอบทฤษฎีการวางกรอบข่าวและทฤษฎีอัตลักษณ์ทางสังคม ลงรหัสโดยผู้ลงรหัสสามคนพร้อมทดสอบความสอดคล้องระหว่างกัน · โพสต์ที่มีปฏิสัมพันธ์น้อยกว่า 10 ครั้งถูกตัดออกจากการวิเคราะห์",
      findings: [
        "**น้ำเสียงของข่าวเป็นกลางเป็นส่วนใหญ่** ผู้ลงรหัสทั้งสามคนจัดโพสต์เป็นข้อความกลางๆ ที่ 94.5% · 85.2% · 82.8% ตามลำดับ ส่วนที่ชักชวนเชิงบวกมีเพียง 0.8–2.3%",
        "**มุมที่เล่ามากที่สุดคือการอธิบายตัวนโยบาย 55.5% (71 โพสต์) รองลงมาคือข่าวเชิงลบเกี่ยวกับการปลดล็อก 36.7% (47 โพสต์)** ขณะที่ข่าวเชิงบวกมีเพียง 4.7% (6 โพสต์) และประโยชน์ทางการแพทย์ 10.9% (14 โพสต์) · จำนวนโพสต์พุ่งสูงสุดในเดือนที่นโยบายมีผลบังคับใช้",
        "**ความเห็นของผู้อ่านไปคนละทางกับน้ำเสียงของข่าว** ผู้วิจัยพบชุดความเห็นที่ปฏิเสธไทยในฐานะจุดหมายท่องเที่ยว โดยให้เหตุผลว่ากลัวเผลอกินอาหารที่มีกัญชาผสม ไม่มั่นใจการกำกับดูแลหลังปลดล็อก และมองว่าเป็นการทำตามชาติตะวันตก",
        "**หนึ่งในสามของโพสต์ไม่ระบุแหล่งที่มา** — อ้างสื่อไทย 58.6% (75 โพสต์) เป็นเนื้อหาที่สื่อจีนเรียบเรียงเอง 7.8% (10 โพสต์) และไม่ระบุแหล่ง 33.6% (43 โพสต์)",
        "**โพสต์ที่ห้ามปรามชัดเจนที่สุดไม่ใช่ความเห็นของสื่อ** แต่เป็นการส่งต่อประกาศของสถานทูตจีนในไทยที่ห้ามนำผลิตภัณฑ์กัญชากลับประเทศ",
      ],
      soWhat:
        "บทเรียนสำหรับงานสื่อสารภาพลักษณ์ประเทศคือ **การนับว่าข่าวเป็นกลางกี่เปอร์เซ็นต์ ไม่ได้บอกว่าผู้รับสารรู้สึกอย่างไร** ช่องความเห็นคือที่ที่ความหมายถูกตัดสิน และข่าวที่กลางแต่ไม่ตอบคำถามที่ผู้อ่านกังวลจริง — กินอาหารข้างทางแล้วจะเจอกัญชาไหม กลับประเทศแล้วผิดกฎหมายไหม — เปิดช่องให้ความกลัวเข้ามาเติมแทน · หน่วยงานที่ทำงานด้านการท่องเที่ยวจึงต้องออกแบบสารที่ตอบคำถามระดับชีวิตประจำวันของนักท่องเที่ยว ไม่ใช่แค่ประกาศนโยบายให้ครบถ้วน",
      caveat:
        "**ระบบเซนเซอร์ทำให้เก็บข้อมูลได้ไม่ครบ** ผู้วิจัยระบุเองว่าต้องจำกัดที่เว่ยป๋อแพลตฟอร์มเดียว เพราะค้นในเครื่องมือค้นหาหลักของจีนไม่ได้ และคำว่ากัญชาถูกจำกัด สื่อจึงเลี่ยงไปใช้คำพ้องเสียงหรืออิโมจิ ทำให้ค้นไม่ครบ · ระบบชื่อจริงบนเว่ยป๋อทำให้ผู้ใช้เซนเซอร์ตัวเอง ความเห็นที่เห็นจึงอาจไม่ใช่ความเห็นจริง · **งานนี้ไม่ได้วัดว่าความเห็นเหล่านั้นทำให้คนเลิกเดินทางมาจริงหรือไม่** ซึ่งผู้วิจัยระบุว่าอยู่นอกขอบเขต · บทสรุปนี้ไม่ระบุชื่อสำนักข่าวทั้งสี่ เพราะข้อค้นพบเรื่องการไม่อ้างแหล่งที่มาผูกกับสำนักข่าวเป็นรายแห่ง และบทเรียนที่นำไปใช้ได้ไม่ได้ขึ้นกับว่าเป็นแห่งใด",
    },
    en: {
      headline: "The coverage was mostly neutral. The comment threads were not — and they ended at “I'm not going.”",
      question:
        "After Thailand legalised cannabis, how did Chinese-language media narrate the country as a travel destination, and did readers respond in the same direction as the coverage they were reading?",
      method:
        "A content analysis of 128 Weibo posts published between 2019 and 2022 by four Chinese-language outlets (three Chinese media houses and one Chinese-language newspaper based in Bangkok), read through framing theory and social identity theory. Three coders classified the posts and inter-coder reliability was tested. Posts with fewer than ten engagements were excluded.",
      findings: [
        "**The tone of the coverage was predominantly neutral** — the three coders classified 94.5%, 85.2% and 82.8% of posts respectively as neutral statements, against only 0.8–2.3% offering positive encouragement.",
        "**The dominant angle was explaining the policy itself, at 55.5% (71 posts), followed by negative news about legalisation at 36.7% (47 posts)**, with positive news at just 4.7% (6 posts) and medical benefits at 10.9% (14). Volume peaked in the month the policy took effect.",
        "**Reader comments ran in the opposite direction to the coverage.** The researchers found a cluster of comments rejecting Thailand as a destination, reasoning that they might unknowingly eat food containing cannabis, that oversight after legalisation could not be trusted, and that the policy was imitation of the West.",
        "**A third of the posts cited no source at all** — 58.6% (75 posts) drew on Thai media reports, 7.8% (10) were compiled by the outlets themselves, and 33.6% (43) gave no source.",
        "**The most strongly discouraging posts were not editorial opinion** but forwarded notices from the Chinese embassy prohibiting citizens from bringing cannabis products home.",
      ],
      soWhat:
        "For nation-image work the lesson is that **counting how much coverage is neutral tells you nothing about how it lands.** The comment thread is where meaning is settled, and coverage that stays neutral while leaving the reader's actual worry unanswered — could I eat it by accident at a street stall, what happens when I fly home — leaves a space that fear fills instead. Tourism communication has to answer questions at the level of a traveller's day, not only announce the policy completely.",
      caveat:
        "**Censorship left the dataset incomplete**, and the authors say so: the study had to be confined to Weibo because the relevant terms cannot be searched on China's main search engine, and because outlets evade the restricted word using homophones or emoji, so the search cannot have caught everything. Weibo's real-name system encourages self-censorship, so visible comments may not be genuine opinion. **The study does not measure whether those comments translated into fewer trips** — the authors place that outside its scope. This summary does not name the four outlets, because the finding about missing source attribution attaches to individual outlets and the usable lesson does not depend on which one.",
    },
  },
  {
    slug: "joox-rooms-relational-bonds",
    illustrationAltTh:
      "ภาพประกอบกระดาษ รูปทรงมนสองรูปซ้อนทับกันเกือบสนิท เหลื่อมกันเพียงริ้วบางๆ ที่ขอบด้านล่าง",
    illustrationAltEn:
      "Paper-craft illustration of two rounded shapes lying almost exactly on top of one another, offset by only a thin sliver along the lower edge",
    doi: "10.1080/23311983.2026.2675861",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "joox-rooms-relational-bonds.pdf",
    th: {
      headline: "แฟนเพลงแยกไม่ออกว่ารักศิลปินหรือรักแพลตฟอร์ม และนั่นคือข้อค้นพบ ไม่ใช่ความบกพร่องของแบบวัด",
      question:
        "อะไรทำให้ผู้ฟังผูกพันกับบริการสตรีมมิงเพลงที่มีห้องไลฟ์ให้คุยกับศิลปินแบบทันที และความผูกพันนั้นนำไปสู่การใช้ต่อและบอกต่อจริงหรือไม่",
      method:
        "แบบสอบถามออนไลน์กับผู้ใช้ห้องไลฟ์ JOOX Rooms ในไทย เก็บเดือนเมษายนถึงพฤษภาคม 2567 เริ่มทำ 306 คน เหลือ 175 คนหลังคัดข้อมูล กระจายแบบบอกต่อ วิเคราะห์ด้วยโมเดลสมการโครงสร้าง แยกสายสัมพันธ์สามแบบตามกรอบ relational bonds — ด้านการเงิน (ส่วนลด เหรียญในระบบ รางวัลจากเกม) ด้านสังคม (แชตสด การตอบกลับของศิลปิน คำทักเฉพาะบุคคล) และด้านโครงสร้าง (การตอบอย่างมืออาชีพ ระบบที่ใช้ได้จริง การจัดเรียงข้อมูล)",
      findings: [
        "**สายสัมพันธ์ทั้งสามแบบเพิ่มความผูกพันทางอารมณ์กับแพลตฟอร์ม** และความผูกพันนั้นทำนายความตั้งใจจะใช้ต่อและบอกต่อ",
        "**ความผูกพันทางอารมณ์เป็นตัวส่งผ่านแบบเต็มรูป** — สายสัมพันธ์ทั้งสามไม่ได้ผลักดันพฤติกรรมโดยตรง แต่ส่งผลผ่านความรู้สึกผูกพันเท่านั้น",
        "**ความผูกพันกับศิลปินกับความผูกพันกับแพลตฟอร์มวัดแยกกันไม่ได้** ค่าสหสัมพันธ์สูงถึง .89 จนโมเดลเกิดปัญหาค่าความแปรปรวนติดลบ ผู้วิจัยจึงตัดตัวแปรความผูกพันกับศิลปินออกจากโมเดลสุดท้าย — **สมมติฐานทุกข้อที่เกี่ยวกับศิลปินจึงทดสอบไม่ได้ ไม่ใช่ไม่พบผล**",
        "ค่าความกลมกลืนของโมเดลการวัดอยู่ในเกณฑ์ยอมรับได้ (robust CFI = 0.914 · robust RMSEA = 0.066 · SRMR = 0.060)",
      ],
      soWhat:
        "สำหรับแพลตฟอร์มและค่ายเพลง ข้อเสนอที่ใช้ได้คือ**ต้องลงทุนทั้งสามด้านพร้อมกัน** เพราะแต่ละด้านสร้างความผูกพันคนละชนิด — ส่วนลดสร้างความผูกพันแบบแลกเปลี่ยน แชตสดสร้างความใกล้ชิด ระบบที่เสถียรสร้างความไว้วางใจ ถ้าเลือกทำแต่ด้านราคาจะได้ยอดใช้งานระยะสั้นที่ไม่มีความลึก · ส่วนข้อค้นพบที่ทำให้ต้องตัดตัวแปรทิ้งกลับมีนัยเชิงปฏิบัติมากที่สุด: ถ้าผู้ฟังแยกความรู้สึกที่มีต่อศิลปินออกจากแพลตฟอร์มไม่ได้ การย้ายแพลตฟอร์มก็มีต้นทุนทางความรู้สึกติดอยู่ด้วย ไม่ใช่แค่ต้นทุนการเปลี่ยนแอป",
      caveat:
        "**เก็บตัวอย่างแบบบอกต่อ จึงเอนไปทางผู้ใช้ที่ผูกพันสูงอยู่แล้ว** ผู้เขียนระบุเองว่าอาจทำให้ความสัมพันธ์ที่วัดได้สูงเกินจริง · เป็นการวัดตัดขวางครั้งเดียว บอกลำดับเวลาไม่ได้ · เก็บจากแพลตฟอร์มเดียวในประเทศเดียว · **และเพราะตัวแปรความผูกพันกับศิลปินถูกตัดออก งานนี้ไม่ได้แปลว่าศิลปินไม่สำคัญ แต่แปลว่าเครื่องมือชุดนี้วัดแยกจากแพลตฟอร์มไม่ได้** ความต่างนี้สำคัญและห้ามอ่านข้าม",
    },
    en: {
      headline: "Fans could not separate loving the artist from loving the platform — and that is the finding, not a flaw in the instrument",
      question:
        "What makes listeners attach to a music streaming service that lets them talk to artists live, and does that attachment actually lead to continued use and recommendation?",
      method:
        "An online survey of JOOX Rooms users in Thailand, collected in April and May 2024. 306 people began the survey and 175 remained after data cleaning; distribution was by snowball sampling. The data was analysed with structural equation modelling, separating three relational bonds: financial (discounts, in-app coins, game rewards), social (live chat, artist responsiveness, personalised greetings) and structural (professional responses, reliable service, curated information).",
      findings: [
        "**All three bonds increased affective engagement with the platform**, and that engagement predicted intentions to keep using the service and to recommend it.",
        "**Affective engagement was a full mediator** — none of the three bonds drove behaviour directly; they worked only through how users felt.",
        "**Engagement with artists and engagement with the platform could not be measured apart.** They correlated at .89, producing a negative variance in the model, so the artist construct was dropped from the final specification — **every hypothesis involving artists is therefore untested, not disconfirmed**.",
        "Measurement-model fit was acceptable (robust CFI = 0.914, robust RMSEA = 0.066, SRMR = 0.060).",
      ],
      soWhat:
        "For platforms and labels the usable implication is to **invest in all three bonds at once**, because each produces a different kind of attachment: discounts produce transactional attachment, live chat produces closeness, reliable service produces trust. Building only on price yields short-term activity with no depth. The finding that forced a construct out of the model is the most practical of all: if listeners cannot separate what they feel about an artist from what they feel about the platform, then switching platforms carries an emotional cost, not merely the cost of installing a different app.",
      caveat:
        "**Snowball sampling skews toward users who were already highly engaged**, and the authors note this may inflate the observed relationships. The design is cross-sectional, so it cannot establish sequence. It covers a single platform in a single country. **And because the artist construct was removed, this study does not show that artists do not matter — it shows that this instrument could not separate them from the platform.** That distinction should not be read past.",
    },
  },
  {
    slug: "genz-cruelty-free-purchase",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ขั้นบันไดเรียงสูงขึ้นสามขั้น ส่วนขั้นบนสุดหลุดลอยห่างออกไปเล็กน้อย",
    illustrationAltEn:
      "Paper-craft illustration of three rising steps with the topmost one detached, floating slightly out of reach",
    doi: "10.14456/cmap.2023.5",
    articleLanguage: "en",
    th: {
      headline: "เจนซีเลือกสินค้าไม่ทดลองกับสัตว์เพราะค่านิยม แต่สิ่งที่ทำนายการซื้อได้แรงที่สุดคือความภักดี ซึ่งหายไปเมื่อราคาขึ้น",
      question:
        "ผู้บริโภคเจนซีไทยให้คุณค่ากับสินค้าที่ไม่ทดลองกับสัตว์ในแง่ใด มีทัศนคติต่อเครื่องมือสื่อสารการตลาดของแบรนด์กลุ่มนี้อย่างไร และปัจจัยใดทำนายความตั้งใจซื้อได้จริง",
      method:
        "แบบสอบถามออนไลน์ 400 คน เก็บแบบโควตาจากคนไทยอายุ 18 ถึง 26 ปีที่รู้จักแบรนด์ซึ่งประกาศว่าไม่ทดลองกับสัตว์ (ผู้ตอบเป็นหญิง 84.7% ชาย 11.35% เพศอื่น 4.00%) วัดสี่ด้านคือค่านิยม ทัศนคติต่อเครื่องมือสื่อสารการตลาดแบบผสมผสาน ความภักดีต่อแบรนด์ และความตั้งใจซื้อ ด้วยมาตรวัดลิเคิร์ตห้าระดับ ค่าความเชื่อมั่นทั้งฉบับ .93 · วิเคราะห์ด้วยสหสัมพันธ์เพียร์สันและการถดถอยพหุคูณแบบขั้นตอน",
      findings: [
        "**ค่านิยมที่ได้คะแนนสูงสุดคือค่านิยมสากลนิยม 4.65 จาก 5** ตามด้วยคุณค่าเชิงหน้าที่ 4.08 และคุณค่าเชิงสังคม 3.36 — ผู้ตอบให้น้ำหนักกับการดูแลสัตว์และธรรมชาติมากกว่าการได้รับการยอมรับจากคนรอบตัว",
        "**ตัวทำนายความตั้งใจซื้อที่แรงที่สุดคือความภักดีต่อแบรนด์ (β = .486)** ตามด้วยทัศนคติ (β = .300) และค่านิยม (β = .119) ทั้งสามอธิบายความแปรปรวนของความตั้งใจซื้อได้ 62.9% · ความภักดีกับความตั้งใจซื้อสัมพันธ์กันสูงสุดที่ r = .74",
        "**ข้อที่ได้คะแนนต่ำที่สุดในหมวดความภักดีคือ “จะซื้อแบรนด์นี้ต่อแม้ราคาขึ้น”** ขณะที่ข้อการบอกต่อได้คะแนนสูงสุดในหมวดที่ 4.40 — ยินดีเชียร์ให้คนอื่น แต่ไม่ยินดีจ่ายเพิ่มเอง",
        "**เครื่องมือสื่อสารที่ชอบที่สุดคือการส่งเสริมการขาย 4.59** ตามด้วยการประชาสัมพันธ์ 4.46 และสื่อนอกบ้าน 4.28 ส่วนการตลาดทางตรงได้คะแนนต่ำที่สุด ซึ่งผู้เขียนอ่านว่าเป็นการปฏิเสธการขายตรงแบบเร่งเร้า",
        "**ข้อที่ได้คะแนนต่ำสุดในหมวดความตั้งใจซื้อคือ “จะซื้อแม้ไม่มีขายใกล้ตัว” ที่ 3.60** ความสะดวกในการหาซื้อจึงยังเป็นเงื่อนไข",
      ],
      soWhat:
        "ข้อค้นพบชี้ช่องว่างที่ใช้ได้ทันทีสำหรับคนทำแบรนด์และคนทำแคมเปญรณรงค์ — **ค่านิยมพาคนมาถึงหน้าร้าน แต่ไม่ได้พาไปถึงการจ่ายเงินเมื่อราคาต่างกัน** แบรนด์ที่สื่อสารด้วยเนื้อหาเชิงคุณค่าอย่างเดียวจะได้เสียงเชียร์ที่ดังแต่ยอดขายที่บาง ขณะที่ข้อมูลชุดเดียวกันบอกว่าการประชาสัมพันธ์ที่ให้ความรู้ได้คะแนนสูงเป็นอันดับสอง จึงทำหน้าที่คนละอย่างกับโปรโมชันและต้องมาคู่กัน · และการกระจายสินค้าให้หาซื้อได้สะดวกเป็นเงื่อนไขที่ตัดออกไม่ได้",
      caveat:
        "**ผู้ตอบเป็นผู้หญิง 84.7% ตัวเลขทั้งหมดจึงสะท้อนกลุ่มนี้เป็นหลัก** · **“กลุ่มผู้บริโภคห้ากลุ่ม” ที่บทความเสนอมาจากการตีความค่าเฉลี่ยรายข้อและค่าสหสัมพันธ์ ไม่ได้มาจากการวิเคราะห์จัดกลุ่มทางสถิติ** จึงควรอ่านเป็นการบรรยายลักษณะ ไม่ใช่กลุ่มที่แยกออกจากกันได้จริงในทางสถิติ · สินค้ากลุ่มนี้ในตลาดไทยส่วนใหญ่เป็นเครื่องสำอางและของใช้ส่วนตัว ผลจึงผูกกับหมวดสินค้านั้น · เป็นความตั้งใจซื้อที่ผู้ตอบแจ้งเอง ไม่ใช่ยอดซื้อจริง",
    },
    en: {
      headline: "Thai Gen Z buy cruelty-free out of values — but the strongest predictor of purchase is loyalty, and loyalty falls away when the price rises",
      question:
        "What do Thai Gen Z consumers value in cruelty-free products, how do they feel about the marketing communication of those brands, and what actually predicts an intention to buy?",
      method:
        "An online survey of 400 Thai respondents aged 18 to 26 who were aware of cruelty-free brands, collected by quota sampling (84.7% women, 11.35% men, 4.00% other genders). Four constructs were measured on five-point Likert scales — values, attitudes toward integrated marketing communication tools, brand loyalty and purchase intention — with an overall reliability of .93. Analysis used Pearson correlations and stepwise multiple regression.",
      findings: [
        "**Universalism scored highest among the value dimensions at 4.65 out of 5**, ahead of functional value at 4.08 and social value at 3.36 — respondents weighted care for animals and nature above recognition from people around them.",
        "**The strongest predictor of purchase intention was brand loyalty (β = .486)**, followed by attitude (β = .300) and values (β = .119); together they explained 62.9% of the variance. Loyalty and purchase intention correlated most strongly at r = .74.",
        "**The lowest-scoring loyalty item was “I would keep buying this brand even if its price increased”**, while the advocacy items scored highest in that section at 4.40 — willing to recommend, unwilling to pay more.",
        "**The best-liked communication tool was sales promotion at 4.59**, followed by public relations at 4.46 and out-of-home media at 4.28, with direct marketing lowest — which the authors read as a rejection of hard selling.",
        "**The lowest purchase-intention item was “I would buy even if it is not available locally”, at 3.60.** Convenience of supply remains a condition.",
      ],
      soWhat:
        "The gap here is immediately usable for brands and for campaigners: **values bring people to the shelf, but they do not carry them across a price difference.** A brand communicating only on values earns loud advocacy and thin sales. The same data shows public relations that educates scoring second highest, which means it does a different job from promotion and the two have to run together — and that distribution, so the product is actually within reach, is not an optional part of the plan.",
      caveat:
        "**84.7% of respondents were women, so every figure here principally describes that group.** **The five consumer segments the article proposes were derived by interpreting item means and correlations, not by statistical cluster analysis**, so they should be read as descriptions rather than as groups that separate reliably. Cruelty-free products in the Thai market are mostly cosmetics and personal care, which ties the findings to that category. And these are self-reported intentions, not observed purchases.",
    },
  },
  {
    slug: "dating-apps-disclosure-msm",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ริบบิ้นสองเส้นเข้าหากันจากคนละด้าน แล้วเรียวลงจนแทบไม่เหลือตรงแผ่นกั้นบางๆ ที่คั่นกลาง",
    illustrationAltEn:
      "Paper-craft illustration of two ribbons approaching from opposite sides and thinning almost to nothing at the slender divider between them",
    doi: "10.14456/jhr.2016.32",
    articleLanguage: "en",
    th: {
      headline: "ยิ่งบอกข้อมูลส่วนตัวมาก ยิ่งไว้ใจกัน และยิ่งสัมพันธ์กับการไม่ใช้ถุงยาง",
      question:
        "แอปหาคู่บนมือถือเปลี่ยนวิธีนัดพบของชายที่มีเพศสัมพันธ์กับชายในไทย งานนี้ถามว่าการเปิดเผยข้อมูลส่วนตัวระหว่างคุยกันในแอปสัมพันธ์กับพฤติกรรมทางเพศหลังนัดเจอกันอย่างไร",
      method:
        "แบบสอบถามออนไลน์แบบไม่ระบุตัวตน เก็บกลางเดือนกุมภาพันธ์ถึงกลางเดือนมีนาคม 2558 ผู้ตอบ 277 คน ผ่านเกณฑ์คัดเข้าเป็นผู้ใช้แอปหาคู่เพื่อหาคู่นัด 222 คน กระจายแบบสอบถามผ่านเว็บบอร์ดสาธารณะและกลุ่มปิดบนเฟซบุ๊ก วิเคราะห์ความสัมพันธ์ด้วยค่าสหสัมพันธ์",
      findings: [
        "**ความถี่ในการใช้แอปสัมพันธ์กับการมีเพศสัมพันธ์แบบไม่ป้องกัน** ทั้งจำนวนวันที่ใช้ (r = .249) จำนวนสถานที่ที่ใช้ (r = .320) และเวลาที่ใช้ต่อครั้ง (r = .360)",
        "**การเปิดเผยข้อมูลที่ระบุตัวได้ก็สัมพันธ์กับการไม่ป้องกันเช่นกัน** — บัญชีเฟซบุ๊ก (r = .337) เบอร์โทรศัพท์ (r = .306) และที่อยู่ (r = .240)",
        "**คนส่วนใหญ่ปกปิดชื่อจริง 88.3% แต่เปิดเผยรูปถ่ายจริงของตัวเอง 80%** และมากกว่าครึ่ง (54.3%) เปิดเผยข้อมูลมากกว่าสองประเภท",
        "**ในกลุ่มที่ไปพบกันจริง 106 คน มี 77 คน (72.6%) ที่มีเพศสัมพันธ์ทางทวารหนัก และในจำนวนนั้น 27 คนไม่ได้ใช้ถุงยาง**",
        "**การใช้ถุงยางกระจุกอยู่ที่เพศสัมพันธ์ทางทวารหนักเท่านั้นที่ 91.5%** ส่วนเพศสัมพันธ์ทางปากใช้เพียง 13.2% และการใช้มือ 17.9%",
        "**ในรอบหกเดือนที่ผ่านมา 37.3% ไม่เคยตรวจเอชไอวี และ 44.6% ไม่เคยตรวจโรคติดต่อทางเพศสัมพันธ์อื่น**",
      ],
      soWhat:
        "ข้อเสนอของงานคือย้ายงานสื่อสารเรื่องเอชไอวีเข้าไปอยู่ในที่ที่กลุ่มเป้าหมายอยู่จริง ทั้งในตัวแอปเองและบนเฟซบุ๊ก แทนที่จะรอให้คนเดินเข้ามาหาข้อมูล · แต่สิ่งที่ใช้ออกแบบตัวสารได้คือ**กลไก** ไม่ใช่แค่ช่องทาง — ความไว้วางใจที่เกิดจากการแลกข้อมูลกันคือสิ่งที่มาก่อนการลดการป้องกัน สารที่ได้ผลจึงต้องพูดกับความรู้สึกว่า “รู้จักกันแล้ว” ไม่ใช่พูดกับคนที่คิดว่ากำลังเจอคนแปลกหน้า · และตัวเลขการใช้ถุงยางที่ต่ำมากในเพศสัมพันธ์ทางปากชี้ว่าความเข้าใจเรื่องช่องทางการติดต่อยังไม่ครบ",
      caveat:
        "**เป็นค่าสหสัมพันธ์ ไม่ใช่ความเป็นเหตุเป็นผล** การเปิดเผยข้อมูลกับการไม่ป้องกันไปด้วยกัน แต่ข้อมูลชุดนี้ไม่ได้พิสูจน์ว่าอย่างหนึ่งทำให้เกิดอีกอย่าง · เก็บด้วยวิธีสะดวกจากผู้ใช้เว็บบอร์ดและกลุ่มเฉพาะ ผู้เขียนระบุเองว่าใช้แทนภาพรวมทั้งประเทศไม่ได้ · **ข้อมูลเก็บต้นปี 2558 ซึ่งผ่านมากว่าสิบปี** ทั้งแอปที่ใช้กันและทางเลือกในการป้องกันเอชไอวีเปลี่ยนไปมากตั้งแต่นั้น ตัวเลขจึงควรใช้อ่านกลไก ไม่ใช่ใช้อ้างสถานการณ์ปัจจุบัน · **บทคัดย่อของบทความระบุจำนวนผู้ตอบไว้ 286 คน ซึ่งไม่ตรงกับเนื้อในที่ระบุ 277 คนและผ่านเกณฑ์ 222 คน** บทสรุปนี้ใช้ตัวเลขจากเนื้อใน ซึ่งตรงกับตารางผลทุกตาราง",
    },
    en: {
      headline: "The more personal information was shared, the more trust followed — and the more that tracked with sex without a condom",
      question:
        "Dating apps changed how men who have sex with men in Thailand arrange to meet. This study asks how the personal information disclosed while chatting in an app relates to what happens sexually after they meet.",
      method:
        "An anonymous online survey run from mid-February to mid-March 2015. 277 people responded and 222 passed the screening as app users seeking partners. The questionnaire was distributed through public web boards and closed Facebook groups, and relationships were examined with correlation analysis.",
      findings: [
        "**How much the apps were used correlated with unprotected sex** — number of days used (r = .249), number of locations used from (r = .320) and time spent per session (r = .360).",
        "**Disclosing identifying information correlated with it as well** — a Facebook account (r = .337), a mobile number (r = .306) and an address (r = .240).",
        "**88.3% withheld their real name, yet 80% shared a real photograph of themselves**, and more than half (54.3%) disclosed more than two types of information.",
        "**Of the 106 respondents who met someone in person, 77 (72.6%) had anal sex, and 27 of them did so without a condom.**",
        "**Condom use was concentrated on anal sex at 91.5%**, falling to 13.2% for oral sex and 17.9% for manual sex.",
        "**In the previous six months, 37.3% had never tested for HIV and 44.6% had never tested for other sexually transmitted infections.**",
      ],
      soWhat:
        "The study's recommendation is to move HIV communication into the places the audience already is — inside the apps and on Facebook — rather than waiting for people to come looking. But the part that shapes the message is **the mechanism, not the channel**: trust built by exchanging information is what comes before protection drops away, so a message that works has to speak to the feeling of already knowing someone, not to someone who thinks they are meeting a stranger. The very low condom use in oral sex also points to an incomplete picture of transmission routes.",
      caveat:
        "**These are correlations, not causes.** Disclosure and unprotected sex move together; this data does not establish that one produces the other. Recruitment was by convenience through particular web boards and groups, and the authors state it cannot stand for the country as a whole. **The data was collected in early 2015, more than a decade ago**; both the apps in use and the available means of HIV prevention have changed substantially since, so the figures are useful for reading the mechanism rather than for describing the present. **The article's abstract states 286 respondents, which does not match the body's 277 respondents and 222 who passed screening** — this summary uses the body's figures, which are the ones every results table reports.",
    },
  },
  {
    slug: "infectious-disease-stigma-scales",
    kind: "protocol",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ไม้บรรทัดสองอันวางเคียงกัน อันหนึ่งมีขีดแบ่งครบทั้งอัน อีกอันเพิ่งมีขีดแรกๆ",
    illustrationAltEn:
      "Paper-craft illustration of two rulers lying side by side, one fully graduated and the other carrying only its first few marks",
    doi: "10.12688/wellcomeopenres.26014.1",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "infectious-disease-stigma-scales.pdf",
    th: {
      headline: "ไทยยังไม่มีเครื่องมือวัดการตีตราช่วงโรคระบาดที่ผ่านการตรวจสอบ นี่คือแผนสร้างขึ้นสองภาษา",
      question:
        "การตีตราทำให้คนไม่กล้าไปรับบริการสุขภาพและทำให้การควบคุมการระบาดสะดุด แต่ไทยยังไม่มีแบบวัดที่ผ่านการตรวจสอบคุณภาพว่าใช้วัดประสบการณ์การถูกตีตราของกลุ่มเปราะบางได้จริง งานนี้จึงประกาศแผนแปลและตรวจสอบแบบวัดชุดหนึ่งให้ใช้ได้ในบริบทไทยและพม่า",
      method:
        "แปลและปรับแบบวัด RAPID ซึ่งวัดการตีตราจากชุมชนและการตีตราตนเอง รวม 16 ข้อ เป็นภาษาไทยและภาษาพม่า ตามแนวปฏิบัติ ISPOR ด้วยวิธีแปลไปแล้วแปลกลับ · แบ่งเป็นสองระยะ ระยะแรกให้ผู้เชี่ยวชาญสองคณะ คณะละ 8 คน ประเมินสามรอบแบบเดลฟาย แล้วสัมภาษณ์เชิงปริชานกับสมาชิกชุมชนละ 15 ถึง 20 คน · ระยะที่สองตรวจสอบคุณสมบัติการวัดกับผู้เข้าร่วม 400 คน (ชุมชนละ 200 คน) ด้วยการวิเคราะห์องค์ประกอบเชิงยืนยันและการทดสอบความเที่ยง",
      findings: [
        "**สองชุมชนที่งานนี้ทำงานด้วยคือชายไทยที่มีเพศสัมพันธ์กับชาย ในประเด็นการตีตราจากฝีดาษวานร และแรงงานข้ามชาติชาวเมียนมา ในประเด็นการตีตราจากโควิด-19**",
        "**คณะผู้เชี่ยวชาญออกแบบให้มีคนในชุมชนอยู่ด้วยตั้งแต่ต้น ไม่ใช่มีแต่นักวิชาการ** — แต่ละคณะ 8 คน ประกอบด้วยผู้นำชุมชนที่มีประสบการณ์ตรง 2 คน ผู้เชี่ยวชาญด้านสุขภาพที่ทำงานกับกลุ่มนั้น 2 คน นักวิจัย 2 คน ผู้เชี่ยวชาญภาษา 1 คน และผู้เชี่ยวชาญด้านวัฒนธรรม 1 คน",
        "**เกณฑ์ตัดสินถูกประกาศไว้ล่วงหน้า** ข้อคำถามที่ได้ค่าดัชนีความตรงเชิงเนื้อหารายข้อต่ำกว่า 0.78 จะถูกนำกลับไปแก้ ส่วนรอบสุดท้ายตั้งเป้าให้ผู้เชี่ยวชาญเกิน 80% ให้คะแนนความตรงเชิงพินิจในระดับสูง และค่าดัชนีความตรงทั้งฉบับเกิน 0.90",
        "**ระยะที่สองต้องขอการรับรองจริยธรรมการวิจัยแยกอีกฉบับ** และเลือกตัวอย่างแบบโควตาให้ครอบคลุมห้ากลุ่มย่อยในแต่ละชุมชน ตั้งแต่ผู้ที่หายป่วย ผู้สัมผัสใกล้ชิด บุคลากรสาธารณสุข ผู้ปฏิบัติงานสนับสนุนช่วงระบาด ไปจนถึงคนทั่วไปในชุมชน",
      ],
      soWhat:
        "ถ้าแผนนี้เดินจนจบ ไทยจะมีเครื่องมือที่หยิบไปใช้วัดการตีตราได้ทันทีเมื่อเกิดการระบาดครั้งหน้า แทนที่จะเริ่มออกแบบแบบสอบถามตอนที่สถานการณ์เดินไปแล้ว — ซึ่งเป็นเหตุผลที่ผู้เขียนระบุว่าเครื่องมือวัดการตีตราส่วนใหญ่มาไม่ทันใช้กับการระบาดที่กำลังเกิดขึ้น · และเพราะแบบวัดต้นทางออกแบบให้ใช้ข้ามโรคได้ ฉบับภาษาไทยและภาษาพม่าจึงไม่ผูกกับโรคใดโรคหนึ่ง",
      caveat:
        "**นี่คือแผน ไม่ใช่ผล** ณ วันที่ตีพิมพ์ยังไม่มีการเก็บข้อมูล และเอกสารระบุเองว่าการรับรองจริยธรรมการวิจัยอยู่ระหว่างพิจารณา ส่วนระยะที่สองต้องขออนุมัติแยกอีกฉบับ · **การเลือกตัวอย่างเป็นแบบโควตา ไม่ใช่การสุ่ม** ผลที่ได้ภายหลังจึงใช้ประเมินคุณภาพของเครื่องมือได้ แต่ใช้ประมาณระดับการตีตราของประชากรทั้งกลุ่มไม่ได้ · ฉบับที่เผยแพร่ผ่านการประเมินจากผู้ทรงคุณวุฒิอิสระแล้ว 1 ท่าน",
    },
    en: {
      headline: "Thailand has no validated way to measure stigma during an outbreak — this is the plan to build one in two languages",
      question:
        "Stigma keeps people from seeking care and undermines outbreak control, yet Thailand has no validated instrument for measuring how vulnerable groups experience it. This protocol sets out a plan to adapt and validate one for the Thai and Burmese contexts.",
      method:
        "The RAPID Community and Self Stigma Scales — 16 items in total — will be translated into Thai and Burmese following ISPOR guidelines, using forward and back translation. The work runs in two phases. Phase 1 puts the translations to two expert panels of eight members each across three Delphi rounds, then to cognitive interviews with 15 to 20 members of each community. Phase 2 validates the adapted scales with 400 participants (200 per community) through confirmatory factor analysis and reliability testing.",
      findings: [
        "**The two communities are Thai men who have sex with men, for mpox-related stigma, and Myanmar migrants, for COVID-19-related stigma.**",
        "**The expert panels are designed to include community members from the start, not only academics** — each panel of eight comprises two community leaders with lived experience, two health specialists working with that group, two researchers, one language expert and one cultural expert.",
        "**Decision thresholds are declared in advance.** Items scoring below 0.78 on the item-level content validity index go back for revision, and the final round targets more than 80% of experts rating face validity highly and an overall scale-level index above 0.90.",
        "**Phase 2 requires a separate ethics approval** and uses quota sampling to cover five subgroups in each community: recovered individuals, close contacts, healthcare workers, outbreak support staff and general community members.",
      ],
      soWhat:
        "If the plan runs to completion, Thailand would have an instrument ready to deploy the moment the next outbreak begins, rather than starting to design a questionnaire once events are already moving — which is the authors' stated reason most stigma instruments arrive too late to inform anything. And because the source scales were built to work across diseases, the Thai and Burmese versions would not be tied to any single one.",
      caveat:
        "**This is a plan, not a result.** No data had been collected at publication, the document states that ethics approval was still pending, and Phase 2 requires a separate approval of its own. **Sampling is by quota rather than random selection**, so the eventual results will speak to the quality of the instrument and not to the level of stigma in the wider population. The published version carries one approving independent peer review.",
    },
  },
  {
    slug: "gamified-wmsds-prevention",
    kind: "protocol",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ลูกศรโค้งต่อกันเป็นวงรอบ โดยมีอยู่ช่วงหนึ่งที่ยังเป็นสีพื้นครีม ไม่ได้ลงสีเหมือนช่วงอื่น",
    illustrationAltEn:
      "Paper-craft illustration of curved arrows forming a closed loop, with one segment still left in bare cream, uncoloured like the rest",
    doi: "10.12688/wellcomeopenres.21428.1",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "gamified-wmsds-prevention.pdf",
    th: {
      headline: "แผนทดสอบว่าท่าบริหาร 12 ท่าที่ส่งผ่านกลุ่มเฟซบุ๊กแบบเกม จะช่วยลดอาการปวดจากงานของแรงงานข้ามชาติได้หรือไม่",
      question:
        "แรงงานข้ามชาติชาวเมียนมาในโรงงานอาหารทะเลเผชิญอาการปวดกล้ามเนื้อและข้อจากลักษณะงานที่ทำซ้ำๆ แต่สื่อสุขภาพแบบเดิมมักไปไม่ถึงเพราะกำแพงภาษาและวัฒนธรรม งานนี้ประกาศแผนพัฒนาและทดสอบชุดการสื่อสารสุขภาพที่ออกแบบให้ตรงกับภาษา วัฒนธรรม และลักษณะงานของคนกลุ่มนี้",
      method:
        "แบ่งเป็นสองระยะ · ระยะแรกพัฒนาชุดกิจกรรมจากการสนทนากลุ่ม กลุ่มละ 8 ถึง 10 คนจนข้อมูลอิ่มตัว การสัมภาษณ์ผู้ให้ข้อมูลหลักครั้งละ 40 ถึง 60 นาที และการตรวจโดยผู้เชี่ยวชาญ พร้อมปรับแบบประเมินโดยตั้งต้นจากแบบสอบถามอาการทางกล้ามเนื้อและกระดูกฉบับนอร์ดิก · ระยะที่สองนำไปใช้จริงกับผู้เข้าร่วมที่ตั้งเป้าไว้ 400 คน ซึ่งคาดว่าเหลือราว 360 คนหลังหักการออกกลางคัน 10% แล้ววัดก่อนและหลังด้วยแบบประเมินที่ผ่านการตรวจแล้ว · ขึ้นทะเบียนการทดลองไว้กับ Thai Clinical Trials Registry ตั้งแต่เดือนพฤษภาคม 2567",
      findings: [
        "**ชุดกิจกรรมคือท่าบริหาร 12 ท่า** ที่เลือกให้ตรงกับส่วนของร่างกายที่ลักษณะงานกระทบมากที่สุด เช่น คอและหลัง โดยผ่านการปรึกษาผู้เชี่ยวชาญด้านสุขภาพ",
        "**ช่องทางคือกลุ่มเฟซบุ๊ก ไม่ใช่แอปที่ต้องติดตั้งใหม่** เกณฑ์คัดเข้ากำหนดว่าผู้เข้าร่วมต้องเข้าเฟซบุ๊กอย่างน้อยสัปดาห์ละครั้ง — เป็นการเลือกช่องทางที่กลุ่มเป้าหมายใช้อยู่แล้ว",
        "**กลไกเกมถูกกำหนดไว้ล่วงหน้าเป็นข้อๆ** โพสต์ให้ความรู้สัปดาห์ละ 3 ครั้ง ควิซสัปดาห์ละ 3 ครั้งสลับวัน และภารกิจประจำสัปดาห์ · ให้คะแนนตามการมีส่วนร่วม (กดถูกใจ 1 คะแนน · แสดงความเห็น 2 คะแนน · ทำควิซ 1 คะแนน ตอบถูก 2 คะแนน · ร่วมภารกิจประจำสัปดาห์ 5 คะแนน) และแสดงกระดานผู้นำเฉพาะผู้เข้าร่วมที่ตื่นตัวที่สุด 10% แรก",
        "**สิ่งที่จะวัดคือความรู้ ความตระหนัก และอาการทางกล้ามเนื้อและข้อที่ผู้เข้าร่วมรายงานเอง** เปรียบเทียบก่อนและหลังด้วยสถิติ t-test หรือ ANOVA พร้อมติดตามระดับการมีส่วนร่วมจากพฤติกรรมจริงในกลุ่ม",
        "**คำว่า “ethical” ในชื่องานมาจากเงื่อนไขที่เขียนไว้ล่วงหน้า** ทั้งการขอความยินยอมโดยได้รับข้อมูลครบ การรักษาความลับ และการกำหนดเพดานค่าตอบแทนไม่ให้เกิน 200 บาท เพื่อไม่ให้เงินกลายเป็นแรงกดดันให้เข้าร่วม",
      ],
      soWhat:
        "แผนนี้ตอบโจทย์ที่งานสื่อสารสุขภาพกับแรงงานข้ามชาติติดมาตลอด คือสื่อไปไม่ถึงคนที่ควรได้ประโยชน์ · จุดที่หน่วยงานอื่นหยิบไปใช้ได้ทันทีมีสองเรื่อง หนึ่งคือวิธีเลือกช่องทาง — ไม่สร้างแอปใหม่ แต่เข้าไปอยู่ในที่ที่กลุ่มเป้าหมายอยู่แล้ว สองคือการเขียนกลไกจูงใจและเพดานค่าตอบแทนไว้เป็นลายลักษณ์อักษรตั้งแต่ก่อนเริ่ม ซึ่งทำให้ตรวจสอบได้ว่าการเข้าร่วมเป็นความสมัครใจจริง · งานคู่กันที่ตีพิมพ์ผลแล้วคือขั้นตอนออกแบบท่าบริหารร่วมกับตัวแรงงานเอง",
      caveat:
        "**นี่คือแผน ไม่ใช่ผล** ตัวบทความระบุเองว่ายังไม่มีข้อค้นพบเพราะเป็นการประกาศแผน สิ่งที่อยู่ในหัวข้อ “จะทำอะไร” คือสิ่งที่ทีมตั้งใจจะทำและจะวัด ไม่ใช่สิ่งที่เกิดขึ้นแล้ว · **การออกแบบเป็นการวัดก่อนและหลังในกลุ่มเดียว ไม่มีกลุ่มเปรียบเทียบ** การเปลี่ยนแปลงที่วัดได้จึงแยกออกจากปัจจัยอื่นในช่วงเวลาเดียวกันไม่ได้ · ทำในโรงงานแห่งเดียว และวัดอาการจากการรายงานของผู้เข้าร่วมเอง ไม่ใช่การตรวจร่างกาย · ฉบับที่เผยแพร่ยังอยู่ระหว่างรอการประเมินจากผู้ทรงคุณวุฒิ",
    },
    en: {
      headline: "A plan to test whether twelve exercises, delivered as a game inside a Facebook group, can reduce work-related pain among migrant workers",
      question:
        "Myanmar migrant workers in Thailand's seafood industry develop musculoskeletal disorders from repetitive work, but conventional health communication rarely reaches them across language and cultural barriers. This protocol sets out a plan to develop and test a health communication package built for their language, culture and the actual nature of their work.",
      method:
        "The study runs in two phases. Phase 1 develops the package through focus group discussions of 8 to 10 participants until saturation, key informant interviews of 40 to 60 minutes each and expert review, and adapts an assessment form starting from the Nordic Musculoskeletal Questionnaire. Phase 2 implements it with a target of 400 participants — an expected 360 after a 10% dropout allowance — measured before and after with the validated form. The trial was registered with the Thai Clinical Trials Registry in May 2024.",
      findings: [
        "**The package is twelve exercises**, chosen with health specialists to target the body areas the work affects most, such as the neck and back.",
        "**The channel is a Facebook group rather than an app that has to be installed.** The inclusion criteria require participants to log in at least once a week — a deliberate choice to work where the audience already is.",
        "**The game mechanics are specified in advance**: informational posts three times a week, quizzes three times a week on alternating days, and a weekly challenge. Points are awarded for participation (1 for a reaction, 2 for a comment, 1 for completing a quiz and 2 for answering correctly, 5 for joining the weekly challenge), with a leaderboard showing only the most active 10%.",
        "**What will be measured is knowledge, awareness and self-reported musculoskeletal symptoms**, compared before and after with t-tests or ANOVA, alongside engagement tracked from actual behaviour in the group.",
        "**The word “ethical” in the title refers to conditions written down in advance** — informed consent, confidentiality, and a cap on compensation of no more than 200 baht so that payment does not become pressure to take part.",
      ],
      soWhat:
        "The plan addresses the problem that has dogged health communication with migrant workers: the material never reaches the people it is for. Two things here are directly reusable. The first is the channel decision — not building an app, but going where the audience already is. The second is writing the incentive design and the payment ceiling down before recruitment starts, which makes it possible to check afterwards that participation was genuinely voluntary. The companion study that has already reported results covers designing the exercises together with the workers themselves.",
      caveat:
        "**This is a plan, not a result.** The article states plainly that findings are not yet available because it is a protocol; everything under “what the study will do” is intended, not achieved. **The design is a single-group before-and-after measurement with no comparison group**, so any change observed cannot be separated from anything else happening over the same period. It takes place in one factory, and symptoms are self-reported rather than clinically assessed. The published version was awaiting peer review.",
    },
  },
  {
    slug: "vtuber-streamer-purchase-intention",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ตราชั่งสองอันวางเคียงกันและเอียงเท่ากัน แต่ก้อนน้ำหนักที่กดแต่ละอันเป็นคนละรูปทรง",
    illustrationAltEn:
      "Paper-craft illustration of two balances tipped to the same angle, each by a differently shaped weight",
    doi: "10.1080/01973533.2023.2208246",
    articleLanguage: "en",
    license: "cc-by-nc",
    localCopy: "vtuber-streamer-purchase-intention.pdf",
    th: {
      headline: "ความน่าเชื่อถือคนละแบบได้ผลกับคนละกลุ่ม — ความเชี่ยวชาญขายของให้แฟนตัวจริง หน้าตาขายให้คนทั่วไป",
      question:
        "ผู้มีอิทธิพลสายเกมสองแบบ — วีทูปเบอร์ที่เป็นตัวละครเสมือน กับสตรีมเมอร์ที่เป็นคนจริง — ส่งผลต่อความตั้งใจซื้อของผู้ชมต่างกันอย่างไร และปัจจัยความน่าเชื่อถือด้านใดสำคัญกับผู้ชมกลุ่มใด",
      method:
        "แบบสอบถามออนไลน์กับผู้เล่นเกมหญิงชาวไทย 686 คนที่ติดตามผู้มีอิทธิพลสายเกมหญิงอย่างน้อยหนึ่งคน อายุเฉลี่ย 24.79 ปี ในจำนวนนี้ระบุตนเองว่าเป็นโอตาคุ 105 คน และไม่ใช่โอตาคุ 581 คน · วัดการรับรู้สามด้านตามกรอบความน่าเชื่อถือของแหล่งสาร คือความเชี่ยวชาญ ความน่าดึงดูด และความน่าไว้วางใจ โดยใช้ผู้มีอิทธิพลจริงสองคนเป็นสิ่งเร้า คนหนึ่งเป็นวีทูปเบอร์ อีกคนเป็นสตรีมเมอร์ · วิเคราะห์ด้วยการเปรียบเทียบค่าเฉลี่ยและการถดถอย",
      findings: [
        "**เมื่อรวมทั้งสองแบบ ปัจจัยทั้งสามทำนายความตั้งใจซื้อได้อย่างมีนัยสำคัญ** — ความเชี่ยวชาญ (β = .330) ความน่าไว้วางใจ (β = .237) และความน่าดึงดูด (β = .188)",
        "**แต่พอแยกดูทีละแบบ ภาพกลับต่างกันชัดเจน** สำหรับวีทูปเบอร์ ตัวทำนายคือความเชี่ยวชาญ (β = .423) และความน่าไว้วางใจ (β = .258) ส่วน**ความน่าดึงดูดไม่มีนัยสำคัญ** (β = .108) โมเดลอธิบายความแปรปรวนได้ 57.2%",
        "**สำหรับสตรีมเมอร์กลับกลายเป็นตรงข้าม** ตัวทำนายคือความน่าไว้วางใจ (β = .438) และความน่าดึงดูด (β = .230) ส่วน**ความเชี่ยวชาญไม่มีนัยสำคัญ** (β = .039) โมเดลอธิบายความแปรปรวนได้ 46.7%",
        "**กลุ่มโอตาคุให้คะแนนความเชี่ยวชาญสูงกว่าอย่างมีนัยสำคัญ** (Cohen's d = 0.518 ขนาดผลปานกลาง) และมีความตั้งใจซื้อสูงกว่า (d = 0.615 ปานกลางถึงมาก)",
        "**ลำดับความสำคัญของปัจจัยต่างกันตามกลุ่มผู้ชม** — กลุ่มโอตาคุให้น้ำหนักความเชี่ยวชาญมากที่สุด (β = .333) ตามด้วยความน่าไว้วางใจ (.256) และความน่าดึงดูด (.178) ส่วนกลุ่มที่ไม่ใช่โอตาคุ ความน่าดึงดูดมีอิทธิพลมากที่สุด และ**ความน่าไว้วางใจไม่มีนัยสำคัญ**",
      ],
      soWhat:
        "ข้อค้นพบนี้ใช้เลือกคนและเลือกสารได้ตรงขึ้น — **ถ้ากลุ่มเป้าหมายเป็นแฟนตัวจริงของหมวดนั้น สิ่งที่ต้องพิสูจน์คือความรู้จริงในเรื่องนั้น ไม่ใช่ภาพลักษณ์** เนื้อหาจึงควรให้เห็นฝีมือและความเข้าใจสินค้า · แต่ถ้าเป็นผู้ชมทั่วไป ความรู้สึกชอบและความคุ้นเคยทำงานมากกว่า · และเพราะวีทูปเบอร์เป็นตัวละครเสมือน ผลที่ว่าความน่าดึงดูดไม่มีนัยสำคัญกับกลุ่มนี้ ชี้ว่าผู้ชมประเมินตัวละครด้วยสิ่งที่ตัวละครทำได้ ไม่ใช่ด้วยรูปลักษณ์ที่ออกแบบมา",
      caveat:
        "**เก็บจากผู้เล่นเกมหญิงในไทยเท่านั้น** ผู้เขียนระบุเองว่าจำกัดการนำไปใช้กับบริบทวัฒนธรรมอื่น · เป็นข้อมูลที่ผู้ตอบรายงานเอง ไม่ใช่พฤติกรรมการซื้อจริง · **กลุ่มโอตาคุมีเพียง 105 คนเทียบกับอีกกลุ่ม 581 คน** ขนาดกลุ่มที่ต่างกันมากทำให้การเปรียบเทียบมีข้อจำกัด · ใช้ผู้มีอิทธิพลเพียงสองคนเป็นสิ่งเร้า และไม่ได้แยกดูว่าเนื้อหาแบบใดให้ผลต่างกัน · เป็นความตั้งใจซื้อ ไม่ใช่ยอดขาย",
    },
    en: {
      headline: "Different kinds of credibility work on different audiences — expertise sells to the committed fan, appeal sells to everyone else",
      question:
        "Two kinds of gaming influencer — a VTuber, who is a virtual character, and a live streamer, who is a real person — affect viewers' purchase intentions differently. Which dimensions of credibility matter, and to whom?",
      method:
        "An online survey of 686 Thai female gamers who follow at least one female gaming influencer, mean age 24.79. Of these, 105 identified as Otaku and 581 did not. The survey measured three source-credibility dimensions — expertise, attractiveness and trustworthiness — using two real influencers as stimuli, one a VTuber and one a streamer, and analysed the data with mean comparisons and regression.",
      findings: [
        "**With both influencer types combined, all three dimensions significantly predicted purchase intention** — expertise (β = .330), trustworthiness (β = .237) and attractiveness (β = .188).",
        "**Split by type, the picture changes sharply.** For the VTuber, the predictors were expertise (β = .423) and trustworthiness (β = .258), while **attractiveness was not significant** (β = .108). The model explained 57.2% of the variance.",
        "**For the streamer it reversed.** The predictors were trustworthiness (β = .438) and attractiveness (β = .230), while **expertise was not significant** (β = .039). The model explained 46.7% of the variance.",
        "**Otaku respondents rated expertise significantly higher** (Cohen's d = 0.518, a medium effect) and reported higher purchase intention (d = 0.615, medium to large).",
        "**The ranking of factors differed by audience.** For Otaku, expertise mattered most (β = .333), then trustworthiness (.256) and attractiveness (.178). For non-Otaku, attractiveness had the strongest influence and **trustworthiness was not a significant predictor**.",
      ],
      soWhat:
        "This is directly usable when choosing a partner and writing a brief. **If the audience is committed to the category, what has to be demonstrated is genuine knowledge of it, not image** — so the content should show skill and real understanding of the product. For a general audience, familiarity and liking do more work. And because a VTuber is a designed character, the finding that attractiveness did not predict anything for that type suggests viewers judge the character by what it can do rather than by how it was drawn.",
      caveat:
        "**The sample is Thai female gamers only**, and the authors note this limits transfer to other cultural contexts. The measures are self-reported intentions, not observed purchases. **The Otaku group numbered only 105 against 581 in the other group**, so the comparison rests on very unequal cells. Only two influencers served as stimuli, and the study did not separate content types. Purchase intention is not sales.",
    },
  },
  {
    slug: "fansub-viewers-sponsorship",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แผ่นสีหนึ่งวางแตะขอบอีกแผ่นหนึ่ง แล้วสีค่อยๆ ซึมข้ามไปติดที่ขอบของแผ่นข้างเคียง",
    illustrationAltEn:
      "Paper-craft illustration of one coloured sheet touching another, its colour bleeding across the join into the neighbouring edge",
    doi: "10.1080/2331186x.2022.2102481",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "fansub-viewers-sponsorship.pdf",
    th: {
      headline: "ผู้ชมที่ชอบคอร์สที่แฟนคลับแปลให้ฟรี ก็รู้สึกดีกับผู้สนับสนุนไปด้วย และไม่ได้มองว่าเป็นการยัดเยียดโฆษณา",
      question:
        "คอร์สเรียนออนไลน์ที่กลุ่มแฟนคลับแปลซับให้ฟรีมีผู้สนับสนุนเป็นแบรนด์ งานนี้ถามว่าผู้ชมชาวจีนรู้สึกอย่างไรกับตัวคอร์ส กับการมีผู้สนับสนุน และกับตัวผู้สนับสนุนเอง — และความรู้สึกทั้งสามอย่างเกี่ยวข้องกันไหม",
      method:
        "แบบสอบถามออนไลน์แบบตัดขวาง เผยแพร่บนหน้าเว็บบอร์ดของกลุ่มแฟนซับกลุ่มหนึ่ง ได้ผู้ตอบ 216 คน (หญิง 132 คน · ครึ่งหนึ่งอายุ 18–25 ปี · จบปริญญาตรี 150 คน) วัดด้วยมาตรวัดลิเคิร์ต 5 ระดับ ค่าความเชื่อมั่นของแต่ละชุด .83 ถึง .90 · วิเคราะห์ด้วย one-sample t-test เทียบกับจุดกึ่งกลางของมาตรวัด และค่าสหสัมพันธ์เพียร์สัน",
      findings: [
        "**ทัศนคติทั้งสามด้านเป็นบวกอย่างมีนัยสำคัญเมื่อเทียบกับจุดกึ่งกลาง** — ต่อตัวคอร์ส t(215) = 25.25 · ต่อผู้สนับสนุน t(215) = 13.92 · ต่อการมีผู้สนับสนุนโดยรวม t(215) = 22.17 ทั้งหมด p < .001",
        "**ผู้ชมให้คะแนนตัวคอร์สสูงที่สุด** ว่ามีคุณค่า 4.35 ดี 4.28 และเป็นประโยชน์ 4.25 จาก 5",
        "**ผู้ชมไม่ได้มองว่าคอร์สถูกทำให้เป็นการค้าเกินไป** (3.75) และเห็นว่าการที่แบรนด์มาสนับสนุนมีเหตุผลรองรับ (3.90) เข้ากันกับเนื้อหา (3.84) และมาด้วยความจริงใจ (4.01)",
        "**ความรู้สึกดีต่อผู้สนับสนุนมีจริงแต่ต่ำกว่าความรู้สึกต่อตัวคอร์ส** — ภาพลักษณ์ดีขึ้น 3.78 ชอบมากกว่าเดิม 3.69 เฉลี่ยทั้งชุด 3.76",
        "**ความสัมพันธ์ระหว่างสามด้านเป็นบวกทั้งหมดแต่อยู่ในระดับปานกลาง ไม่ใช่สูง** — ทัศนคติต่อคอร์สกับต่อผู้สนับสนุน r = .36 · ต่อคอร์สกับต่อการสนับสนุนโดยรวม r = .51 · ต่อผู้สนับสนุนกับต่อการสนับสนุนโดยรวม r = .59",
      ],
      soWhat:
        "งานนี้เป็นหลักฐานให้กับการสนับสนุนเนื้อหาที่ชุมชนทำกันเอง — **ความรู้สึกดีส่งต่อจากเนื้อหาไปยังผู้สนับสนุนได้จริง แต่ส่งได้ไม่เต็ม** (r ระดับกลาง) แบรนด์จึงไม่ควรคาดหวังว่าความชอบที่ผู้ชมมีต่อเนื้อหาจะกลายเป็นความชอบต่อแบรนด์แบบหนึ่งต่อหนึ่ง · จุดที่ผู้ชมให้คะแนนสูงคือ “ความเข้ากัน” และ “ความจริงใจ” ซึ่งเป็นสิ่งที่เลือกได้ตั้งแต่ตอนเลือกว่าจะไปสนับสนุนอะไร ไม่ใช่สิ่งที่แก้ทีหลังด้วยการซื้อสื่อเพิ่ม",
      caveat:
        "**เป็นความสัมพันธ์ ไม่ใช่เหตุและผล** ผู้เขียนระบุไว้เป็นข้อแรก · **ผู้ตอบมาจากกลุ่มแฟนซับกลุ่มเดียว และเป็นคนที่ยังติดตามอยู่** คนที่เคยดูแล้วไม่ชอบย่อมเลิกติดตามไปแล้วและไม่ได้อยู่ในกลุ่มตัวอย่าง ผู้เขียนเรียกค่าที่ได้ว่าเป็น “การประมาณอย่างมีข้อมูล” มากกว่าค่าที่แทนความเห็นสาธารณะ · ค่าความคลาดเคลื่อนของการสุ่มอยู่ที่ 7% · ไม่ได้วัดว่าความรู้สึกดีนำไปสู่การซื้อจริงหรือไม่ ซึ่งผู้เขียนเสนอเป็นงานต่อไป",
    },
    en: {
      headline: "Viewers who value the courses fan groups subtitle for free feel warmly toward the sponsors too — and do not read it as commercial intrusion",
      question:
        "Online courses subtitled for free by fan groups carry brand sponsorship. How do Chinese viewers feel about the courses themselves, about the sponsorship, and about the sponsors — and are those three feelings connected?",
      method:
        "A cross-sectional online survey posted on the forum of one fansub group, yielding 216 respondents (132 women; half aged 18 to 25; 150 holding a bachelor's degree). All measures used five-point Likert scales with reliabilities between .83 and .90, analysed with one-sample t-tests against the scale midpoint and Pearson correlations.",
      findings: [
        "**All three attitudes were significantly positive against the scale midpoint** — toward the courses t(215) = 25.25, toward the sponsors t(215) = 13.92, and toward sponsorship overall t(215) = 22.17, all p < .001.",
        "**The courses themselves scored highest**: valuable 4.35, good 4.28 and beneficial 4.25 out of 5.",
        "**Viewers did not see the courses as over-commercialised** (3.75) and agreed that sponsorship made sense (3.90), fitted the content (3.84) and was sincerely meant (4.01).",
        "**Goodwill toward the sponsors was real but lower than toward the content** — improved image 3.78, liking them more than before 3.69, section mean 3.76.",
        "**All the relationships were positive but moderate, not strong** — courses to sponsors r = .36, courses to sponsorship overall r = .51, sponsors to sponsorship overall r = .59.",
      ],
      soWhat:
        "This is evidence for sponsoring content a community makes for itself: **goodwill does transfer from the content to the sponsor, but it does not transfer in full** — the correlations are moderate. A brand should not expect affection for the content to become affection for the brand one for one. What viewers rated highest was fit and sincerity, and both are settled at the point of choosing what to sponsor, not repaired afterwards by buying more media.",
      caveat:
        "**These are correlations, not causes** — the authors say so first. **Respondents came from a single fansub group and were people still following it**; anyone who watched and disliked it would have unsubscribed and is absent from the sample, which is why the authors call their figure an “educated guess” rather than an estimate of public attitudes. Sampling error was 7%. The study does not test whether goodwill leads to purchase, which the authors propose as the next step.",
    },
  },
  {
    slug: "first-year-online-learning-technostress",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กองแผ่นบางๆ ซ้อนกันสูงจนย่นและทรุดลงข้างหนึ่ง ข้างๆ มีแผ่นหนาเพียงแผ่นเดียวที่ตั้งตรงอยู่ได้มั่นคง",
    illustrationAltEn:
      "Paper-craft illustration of a tall stack of thin sheets buckling under its own height, beside one thick board standing upright and steady",
    doi: "10.58837/chula.pasaa.65.1.8",
    articleLanguage: "en",
    th: {
      headline: "ความเครียดของนิสิตปีหนึ่งไม่ได้มาจากเทคโนโลยียาก แต่มาจากปริมาณที่ต้องรับมือพร้อมกัน",
      question:
        "นิสิตปีหนึ่งที่ต้องย้ายจากห้องเรียนมาเรียนออนไลน์กลางคัน มองการเรียนสองแบบ — เรียนสดพร้อมกันกับเรียนจากสิ่งที่บันทึกไว้ — อย่างไร และเครียดกับเทคโนโลยีในด้านใดบ้าง · นิสิตสายวิทย์กับสายที่ไม่ใช่วิทย์ต่างกันหรือไม่",
      method:
        "แบบสอบถามออนไลน์ภาษาไทย 45 ข้อ กับนิสิตปีหนึ่งของมหาวิทยาลัยแห่งหนึ่ง 803 คน จากประชากรรุ่นนั้น 6,778 คน ในปีการศึกษา 2563 · วัดสองส่วนด้วยมาตรวัดลิเคิร์ต 5 ระดับ คือมุมมองต่อการเรียนสองแบบ 20 ข้อ และความเครียดจากเทคโนโลยีสี่ด้าน 20 ข้อ — ด้านปริมาณงานล้น ด้านความซับซ้อน ด้านความไม่มั่นคงของระบบ และด้านความไม่แน่นอนของเทคโนโลยีที่เปลี่ยนบ่อย · ตรวจความตรงเชิงเนื้อหาโดยผู้เชี่ยวชาญ 3 ท่านและทดลองใช้ก่อน · เปรียบเทียบสองกลุ่มด้วย t-test",
      findings: [
        "**ความเครียดด้านปริมาณงานล้นสูงกว่าอีกสามด้านชัดเจนในทั้งสองกลุ่ม** — สายวิทย์ 3.52 และสายที่ไม่ใช่วิทย์ 3.64 จาก 5",
        "**อีกสามด้านอยู่ระดับกลางค่อนไปทางต่ำทั้งหมด** — ความซับซ้อน 2.83 กับ 2.88 · ความไม่มั่นคงของระบบ 2.95 กับ 2.96 · ความไม่แน่นอน 2.73 กับ 2.95",
        "**ความต่างระหว่างสองกลุ่มมีนัยสำคัญเพียงด้านเดียว คือความไม่แน่นอนของเทคโนโลยี** (t = −3.62, p < .01) ส่วน**ด้านความซับซ้อน (p = .42) และด้านความไม่มั่นคง (p = .91) ไม่พบความต่าง** และด้านปริมาณงานล้นอยู่ที่เส้นพอดี (p = .05)",
        "**เรื่องมุมมองต่อการเรียน นิสิตสายที่ไม่ใช่วิทย์เป็นบวกกว่าทั้งสองแบบ แต่ต่างอย่างมีนัยสำคัญเฉพาะแบบเรียนจากสิ่งที่บันทึกไว้** (t(801) = −2.13, p = .03) — 3.06 เทียบกับ 2.94",
        "**คะแนนมุมมองต่อการเรียนออนไลน์ของทุกกลุ่มอยู่ราว 3 จาก 5 เท่านั้น** คือกลางๆ ไม่ได้ชอบและไม่ได้เกลียด",
      ],
      soWhat:
        "ข้อค้นพบชี้ทางแก้ที่ต่างจากที่มักทำกัน — **เมื่อด้านที่สูงคือปริมาณ ส่วนด้านความซับซ้อนกลับต่ำ การอบรมให้ใช้เครื่องมือเป็นจึงไม่ใช่คำตอบ** สิ่งที่ต้องจัดการคือจำนวนแพลตฟอร์มและจำนวนกำหนดส่งที่วิ่งเข้ามาพร้อมกันจากหลายวิชา · ผู้เขียนเสนอให้ลดจำนวนระบบที่ใช้ในหลักสูตรเดียวกันลง และเพิ่มสัดส่วนการเรียนจากสิ่งที่บันทึกไว้สำหรับกลุ่มที่ตอบรับดีกว่า เพราะให้ผู้เรียนจัดจังหวะเองได้",
      caveat:
        "**เก็บจากมหาวิทยาลัยเดียวและนิสิตรุ่นเดียว** ในช่วงที่มหาวิทยาลัยสั่งย้ายมาเรียนออนไลน์ทั้งหมด บริบทนี้ไม่ได้เกิดซ้ำในภาวะปกติ · ผู้เขียนระบุเองว่าใช้วิธีเชิงปริมาณอย่างเดียว จึงจับรายละเอียดของประสบการณ์ได้ไม่ครบ และเสนอให้ทำการสัมภาษณ์เชิงลึกต่อ · เป็นการรายงานความรู้สึกด้วยตนเอง ไม่ใช่การวัดภาระงานจริง",
    },
    en: {
      headline: "First-year students were not stressed because the technology was hard — they were stressed by how much of it arrived at once",
      question:
        "First-year students moved mid-course from classrooms to online learning. How did they view the two modes — live sessions and recorded material — and which kinds of technology stress did they feel? Did science and non-science students differ?",
      method:
        "A 45-item online questionnaire in Thai completed by 803 first-year students at one university, from a cohort of 6,778, in the 2020 academic year. Two sections used five-point Likert scales: 20 items on views of the two learning modes and 20 on four kinds of technostress — overload, complexity, insecurity and uncertainty. Content validity was reviewed by three specialists and the instrument was piloted; the two groups were compared with t-tests.",
      findings: [
        "**Techno-overload stood clearly above the other three in both groups** — 3.52 among science students and 3.64 among non-science students, out of 5.",
        "**The other three all sat in the middle-to-low range** — complexity 2.83 and 2.88, insecurity 2.95 and 2.96, uncertainty 2.73 and 2.95.",
        "**Only one difference between the groups was significant: techno-uncertainty** (t = −3.62, p < .01). **Complexity (p = .42) and insecurity (p = .91) showed no difference at all**, and overload sat exactly on the line (p = .05).",
        "**On views of the modes, non-science students were more positive about both, but significantly so only for the recorded mode** (t(801) = −2.13, p = .03) — 3.06 against 2.94.",
        "**Every group's rating of online learning hovered around 3 out of 5** — neither liked nor disliked.",
      ],
      soWhat:
        "The finding points somewhere other than the usual remedy. **When the high score is quantity while complexity is low, training people to use the tools is not the answer.** What has to be managed is the number of platforms and the number of deadlines arriving together from different courses. The authors recommend reducing how many systems a single programme uses, and offering more recorded material for the group that responded better to it, because it lets students set their own pace.",
      caveat:
        "**One university, one cohort**, during a period when the institution had mandated fully online teaching — a context that does not recur in normal conditions. The authors note the study is quantitative only and therefore cannot capture the texture of the experience, and they call for interviews as a follow-up. These are self-reported feelings, not measured workload.",
    },
  },
  {
    slug: "brand-attitude-congruence-purchase",
    illustrationAltTh:
      "ภาพประกอบกระดาษ สะพานสองช่วงพาดระหว่างเสาสองต้น ช่วงบนกว้างหนา อีกช่วงแคบกว่าวางขนานอยู่ด้านล่าง",
    illustrationAltEn:
      "Paper-craft illustration of two spans bridging the same pair of piers, the upper one broad and thick, the other narrower running parallel below it",
    doi: "10.13187/me.2024.2.239",
    articleLanguage: "en",
    th: {
      headline: "การมีจุดยืนตรงกันช่วยให้นิสิตอยากซื้อจริง แต่เป็นเพียงส่วนหนึ่งของเส้นทาง ไม่ใช่ทั้งหมด",
      question:
        "เมื่อผู้บริโภครุ่นใหม่คาดหวังให้แบรนด์แสดงจุดยืนต่อประเด็นสังคม การที่จุดยืนของแบรนด์ตรงกับของผู้บริโภคส่งผลต่อความตั้งใจซื้อมากน้อยเพียงใด และส่งผลผ่านอะไร",
      method:
        "แบบสอบถามที่ผู้ตอบประเมินตนเอง มาตรวัด 7 ระดับ กับนิสิตนักศึกษาไทยอายุ 18–24 ปีจากหลายมหาวิทยาลัย 434 คน (หญิง 53% ชาย 47%) โดยใช้แบรนด์อสังหาริมทรัพย์ Sansiri เป็นกรณีศึกษา · วัดความคล้ายของจุดยืน คุณค่าแบรนด์ การรับรู้แบรนด์ ภาพลักษณ์ ความน่าเชื่อถือ ความผูกพันเชิงความรู้สึก ความรู้สึกเป็นชุมชน และความตั้งใจซื้อ · ทดลองใช้กับผู้ตอบ 50 คนก่อน · วิเคราะห์ด้วยสถิติเชิงพรรณนา ค่าความสอดคล้องภายใน และโมเดลสมการโครงสร้างเพื่อทดสอบการส่งผ่าน",
      findings: [
        "**ข้อที่ได้คะแนนสูงสุดทั้งชุดคือ “จะซื้อจากแบรนด์ที่มีจุดยืนตรงกับเรามากกว่า”** ที่ 5.74 จาก 7 (SD 1.40) และผู้ตอบยังระบุว่าจะไม่ค่อยซื้อจากแบรนด์ที่มีจุดยืนตรงข้าม",
        "**ความคล้ายของจุดยืนเป็นตัวส่งผ่านแบบบางส่วน ไม่ใช่ทั้งหมด** — เส้นทางอ้อม β = .18 (p < .001) ขณะที่เส้นทางรวมอยู่ที่ β = .95 (p < .001) แปลว่าคุณค่าแบรนด์ยังส่งผลไปยังความตั้งใจซื้อโดยตรงเป็นส่วนใหญ่",
        "**การรับรู้แบรนด์และภาพลักษณ์ได้คะแนนสูงที่สุดในบรรดาองค์ประกอบ** — นึกถึงแบรนด์ได้ง่าย 5.42 · แยกออกจากคู่แข่งได้ 5.31 · รู้สึกดีกับภาพลักษณ์ 5.62 · เห็นว่าน่าสนใจกว่าแบรนด์อื่น 5.20",
        "**ความรู้สึกเป็นส่วนหนึ่งของชุมชนแบรนด์ได้คะแนนต่ำที่สุดในทุกองค์ประกอบ** แม้จะยังอยู่ในระดับค่อนข้างสูงก็ตาม — ผู้ตอบเห็นด้วยกับแบรนด์ แต่ไม่ได้รู้สึกว่าตนเป็นสมาชิกของกลุ่มผู้สนับสนุน",
        "**ความน่าเชื่อถือมาจากการทำได้ตามที่โฆษณาไว้** — ทำตามคำสัญญาในโฆษณา 5.36 และเชื่อถือชื่อเสียงของแบรนด์ได้ 5.50",
      ],
      soWhat:
        "สำหรับแบรนด์ที่กำลังชั่งใจว่าจะแสดงจุดยืนต่อประเด็นสังคมหรือไม่ ข้อมูลนี้บอกสองอย่างพร้อมกัน — **จุดยืนที่ตรงกันมีน้ำหนักจริงกับผู้บริโภครุ่นนี้** (เป็นข้อที่ได้คะแนนสูงสุดทั้งชุด) แต่**มันทำงานเป็นส่วนเสริม ไม่ใช่ตัวหลัก** ค่าส่งผ่านที่ .18 เทียบกับเส้นทางรวม .95 หมายความว่าการรับรู้แบรนด์ ภาพลักษณ์ และการทำได้ตามที่โฆษณาไว้ ยังเป็นฐานที่ต้องมีก่อน · และการที่ความรู้สึกเป็นชุมชนได้คะแนนต่ำสุดชี้ว่าการเห็นด้วยกับจุดยืนแบรนด์ไม่เท่ากับการอยากเป็นสมาชิกของชุมชนแบรนด์ ซึ่งเป็นคนละเป้าหมายและต้องออกแบบคนละแบบ",
      caveat:
        "**ผู้เขียนระบุข้อจำกัดไว้เองสองข้อ** คือขนาดตัวอย่างไม่ใหญ่และเป็นการรายงานด้วยตนเองทั้งหมด · **ค่าสัมประสิทธิ์เส้นทางรวมที่ .95 สูงผิดปกติ** ซึ่งเป็นสิ่งที่พบได้บ่อยเมื่อวัดทุกตัวแปรด้วยแบบสอบถามชุดเดียวกันในคราวเดียว จึงควรอ่านขนาดของผลด้วยความระมัดระวัง · เป็นแบรนด์เดียวและหมวดสินค้าเดียว (อสังหาริมทรัพย์) กับผู้ตอบที่เป็นนิสิตอายุ 18–24 ปี ซึ่งส่วนใหญ่ยังไม่ใช่ผู้ซื้อจริงของสินค้าหมวดนี้ · วัดความตั้งใจซื้อ ไม่ใช่การซื้อจริง",
    },
    en: {
      headline: "Sharing a brand's stance does move Thai students toward buying — but it carries part of the route, not the whole of it",
      question:
        "Younger consumers increasingly expect brands to take positions on social issues. How much does agreement between a brand's stance and a consumer's own affect the intention to buy, and what does it work through?",
      method:
        "A self-rated questionnaire on seven-point scales completed by 434 Thai university students aged 18 to 24 (53% women, 47% men), using the property brand Sansiri as the case. It measured attitude similarity, brand value, brand awareness, image, reliability, sentiment engagement, sense of community and purchase intention, after a pilot with 50 respondents, and was analysed with descriptive statistics, internal consistency and a structural equation model testing mediation.",
      findings: [
        "**The single highest-scoring item in the whole instrument was “I am more likely to buy from brands whose stance matches mine”**, at 5.74 out of 7 (SD 1.40); respondents also said they were less likely to buy from brands taking the opposite position.",
        "**Attitude similarity mediated only partially.** The indirect path was β = .18 (p < .001) against a total path of β = .95 (p < .001) — meaning brand value still reaches purchase intention mostly by the direct route.",
        "**Awareness and image scored highest among the components** — the brand comes to mind easily 5.42, is recognisable among rivals 5.31, feels good in image 5.62 and more attractive than others 5.20.",
        "**Sense of belonging to a brand community scored lowest of all components**, though still relatively high — respondents agreed with the brand without feeling they were members of its advocacy group.",
        "**Reliability rested on delivering what the advertising promised** — fulfils its advertised promise 5.36, reputation can be trusted 5.50.",
      ],
      soWhat:
        "For a brand weighing whether to take a public position, the data says two things at once. **Shared stance genuinely carries weight with this cohort** — it is the highest-scoring item in the study. But **it works as a supplement, not the main channel**: a mediated effect of .18 against a total of .95 means awareness, image and actually delivering what was advertised remain the base that has to be there first. And the lowest score going to sense of community says that agreeing with a brand's position is not the same as wanting to belong to its community — different goals, needing different design.",
      caveat:
        "**The authors name two limitations themselves**: a modest sample and entirely self-reported measures. **The total path coefficient of .95 is unusually high**, which commonly happens when every variable is measured with the same instrument at the same sitting, so the size of the effect should be read cautiously. It covers one brand in one category — property — with respondents aged 18 to 24 who are mostly not yet buyers in that category. And it measures purchase intention, not purchases.",
    },
  },
  {
    slug: "russian-media-capitol-riots",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กรอบสี่เหลี่ยมสีน้ำเงินสี่ชั้นตั้งเรียงซ้อนกันเป็นอุโมงค์ ปลายอุโมงค์ปิดด้วยแผ่นกระดาษสีแดงทึบ",
    illustrationAltEn:
      "Paper-craft illustration of four blue rectangular frames standing in a row to form a tunnel, its far end closed by a solid red panel",
    doi: "10.1177/00027642221078767",
    articleLanguage: "en",
    th: {
      headline:
        "สื่อรัสเซียเล่าเหตุการณ์บุกรัฐสภาสหรัฐฯ ด้วยกรอบสี่ชั้น และปลายทางของทั้งสี่ชั้นคือการพูดถึงรัสเซียเอง",
      question:
        "หลังผู้ชุมนุมบุกอาคารรัฐสภาสหรัฐอเมริกาเมื่อ 6 มกราคม 2564 สื่อตะวันตกบางสำนักรายงานว่ารัสเซีย “มองเหตุการณ์นี้ต่างออกไป” · คำถามของงานนี้คือ ภาพที่สื่อรัสเซียประกอบขึ้นให้ผู้อ่านภายในประเทศของตนเอง เป็นภาพเดียวกับที่ถูกส่งออกไปยังผู้ฟังต่างชาติหรือไม่ และประกอบขึ้นด้วยวิธีใด",
      method:
        "การวิเคราะห์กรอบการนำเสนอเชิงคุณภาพ ตามแนวคิดเรื่องกรอบของ Goffman และวิธีของ Entman โดยใช้ชุดกรอบพื้นฐานห้าแบบของ Neuman และคณะ (ผลกระทบต่อคน · ความไร้อำนาจ · เศรษฐกิจ · ศีลธรรม · ความขัดแย้ง) เป็นโครงตั้งต้น · เก็บข้อความ**ทุกชิ้น**ที่ตรงคำค้นที่กำหนดไว้ล่วงหน้า จากหนังสือพิมพ์รายวันระดับชาติ 3 ฉบับและสถานีโทรทัศน์ของรัฐ 1 ช่อง ซึ่งงานเลือกมาเพราะอยู่ในกลุ่มที่ใกล้ชิดรัฐบาลและมีผู้รับสารมากที่สุด · ช่วงเวลา 1 มกราคม ถึง 1 กุมภาพันธ์ 2564 · ดึงข้อความจากหอสมุดแห่งชาติรัสเซียและฐานข้อมูลสื่อสองแห่ง แล้วผู้เขียนแปลเอง · กรอบที่ใช้จริงได้จากการอ่านตัวอย่างนำร่องก่อน แล้วจึงนำไปใช้กับข้อความที่เหลือ",
      findings: [
        "**กรอบที่หนึ่ง — จะเรียกผู้ก่อเหตุว่าอะไร** สื่อในกลุ่มตัวอย่างเรียกผู้ชุมนุมว่าผู้ประท้วงทางการเมืองที่มาพร้อมข้อเรียกร้อง ไม่ใช่ผู้ก่อจลาจล และมักเรียกว่าคนธรรมดาที่เหนื่อยล้าจากการถูกกดขี่ · วิธีที่ใช้ซ้ำคือการอ้างคำพูดของ “คนทั่วไป” ที่อยู่ในเหตุการณ์ แทนการอ้างเจ้าหน้าที่หรือผู้เชี่ยวชาญ",
        "**กรอบที่สอง — คนตัวเล็กกับอำนาจรัฐ** เมื่อวางไว้แล้วว่าผู้ชุมนุมคือคนธรรมดา การดำเนินคดีจึงถูกเล่าเป็นการลงโทษที่เกินกว่าเหตุ และถูกเล่าคู่กับการเปรียบเทียบตรงๆ ว่าการจัดการผู้ชุมนุมในสหรัฐฯ หนักกว่าที่รัสเซียทำกับผู้ชุมนุมของตนเอง",
        "**กรอบที่สาม — ศีลธรรม** ประเด็นที่ถูกหยิบมามากที่สุดคือเสรีภาพสื่อและการปิดกั้นเสียงฝ่ายตรงข้าม โดยมีข้อสรุปร่วมกันว่าสหรัฐฯ ไม่ได้ทำตามค่านิยมที่ตนประกาศ จึงหมดสถานะที่จะสอนประเทศอื่นเรื่องประชาธิปไตย",
        "**กรอบที่สี่ — การแข่งขัน** เหตุการณ์ถูกอ่านผ่านการชิงความเป็นผู้นำโลกระหว่างสองประเทศ ความอ่อนแอของอีกฝ่ายจึงไม่ได้ถูกเล่าเป็นเรื่องภายในของเขา แต่เป็นการเสียอำนาจนำ",
        "**ข้อสังเกตที่ผู้เขียนเห็นว่าสำคัญที่สุด คือกรอบทั้งสี่ชั้นวางอยู่บนการยอมรับว่าประชาธิปไตยเป็นค่านิยมที่ดี** ไม่ใช่การเสนอว่าระบอบอื่นดีกว่า — คำวิจารณ์ทั้งหมดมีรูปเป็น “คุณไม่ได้ทำตามสิ่งที่คุณเองบอกว่าดี” ซึ่งเป็นรูปที่โต้กลับได้ยากกว่าการปฏิเสธค่านิยมนั้นตรงๆ",
        "ผู้เขียนสรุปว่าชุดกรอบที่พบมีลักษณะของการโฆษณาชวนเชื่อ จากการวางบทบาทให้ทุกฝ่ายในเรื่องไปในทางที่เอื้อต่อข้อสรุปที่ตั้งไว้ล่วงหน้า",
      ],
      soWhat:
        "บทเรียนที่ใช้ได้กว้างกว่ากรณีนี้คือ**การเล่าเรื่องเหตุการณ์ในประเทศหนึ่ง มักไม่ได้มีเป้าหมายอยู่ที่ประเทศนั้น** ในกรณีนี้ปลายทางของทั้งสี่กรอบคือข้อสรุปเรื่องความชอบธรรมของฝ่ายผู้เล่าเอง · สำหรับคนอ่านข่าวต่างประเทศ วิธีตรวจที่งานนี้สาธิตให้ดูคือถามสามคำถาม — ใครถูกเลือกมาให้พูด เขาถูกแนะนำตัวว่าเป็นใคร และคำพูดนั้นถูกวางไว้ตรงไหนของเรื่อง — สามข้อนี้บอกทิศทางของกรอบได้ก่อนอ่านเนื้อหาจบด้วยซ้ำ · สำหรับการเรียนการสอนด้านนิเทศศาสตร์ งานนี้เป็นตัวอย่างที่เห็นชัดว่าการวิเคราะห์กรอบทำงานอย่างไรกับข่าวการเมืองระหว่างประเทศ",
      caveat:
        "**การวิเคราะห์กรอบอ่านได้แค่ตัวบท ไม่ได้บอกว่าผู้รับสารคิดตามหรือไม่** ซึ่งผู้เขียนระบุข้อจำกัดนี้ไว้เองในบทสรุป · ขอบเขตคือสื่อสี่แห่งในช่วงหนึ่งเดือน ไม่ใช่ภาพรวมของสื่อรัสเซียทั้งหมด · ข้อความทั้งหมดผู้เขียนแปลเอง ผู้อ่านจึงตรวจคำแปลย้อนกลับจากตัวบทความไม่ได้ · เป็นงานเชิงคุณภาพ ไม่ได้รายงานจำนวนชิ้นงานในแต่ละกรอบหรือค่าความสอดคล้องระหว่างผู้วิเคราะห์ · **บทสรุปนี้ตั้งใจไม่ระบุชื่อสำนักข่าวและชื่อบุคคลที่ถูกอ้างถึงในบทความ** เพราะข้อวิจารณ์ในงานเป็นคำของผู้เขียนงานวิจัย ไม่ใช่คำของศูนย์ฯ และรายชื่อไม่ได้เพิ่มอะไรให้บทเรียนที่นำไปใช้ได้",
    },
    en: {
      headline:
        "Russian media told the U.S. Capitol story through four layered frames, and all four end up talking about Russia",
      question:
        "After a mob entered the United States Capitol on 6 January 2021, some Western outlets reported that Russia “took a different view” of it. This study asks whether the picture Russian media assembled for readers at home was the same one sent abroad, and how that picture was built.",
      method:
        "Qualitative frame analysis, following Goffman's concept of frames and Entman's method, scaffolded on the five common frames of Neuman and colleagues (human impact, powerlessness, economics, moral values, conflict). **Every** text matching a pre-set keyword list was included, drawn from three national daily newspapers and one state television channel — selected because they sit closest to government and reach the largest audiences. The window ran from 1 January to 1 February 2021; texts came from the Russian National Library and two media databases and were translated by the authors. The working frames emerged from a pilot reading first and were then applied to the rest of the sample.",
      findings: [
        "**Frame one — what to call the people involved.** The sampled outlets described them as political protesters arriving with demands rather than rioters, and often as ordinary people worn down by oppression. The recurring device was quoting “ordinary people” present at the scene instead of officials or experts.",
        "**Frame two — small people against state power.** Once the participants were established as ordinary people, the prosecutions were narrated as disproportionate punishment, paired with an explicit comparison holding that the United States treats protesters more harshly than Russia treats its own.",
        "**Frame three — moral values.** The most-used theme was press freedom and the silencing of opposing voices, converging on the conclusion that the United States had not lived up to the values it professes and so had lost standing to lecture other countries on democracy.",
        "**Frame four — competition.** The events were read through the contest for global leadership between the two countries, so the other side's weakness was narrated not as its internal affair but as a loss of primacy.",
        "**The observation the authors treat as most important is that all four frames rest on accepting democracy as a good**, not on arguing that some other system is better. Every criticism takes the form “you are not doing what you yourself call good” — a shape that is harder to answer than rejecting the value outright.",
        "The authors conclude that the frame set is propagandistic in character, given how consistently every actor in the story is positioned to support a conclusion fixed in advance.",
      ],
      soWhat:
        "The lesson travels well beyond this case: **coverage of an event in one country often is not aimed at that country**. Here all four frames terminate in a claim about the legitimacy of the side doing the telling. For anyone reading foreign news, the check this study demonstrates is three questions — who was chosen to speak, how were they introduced, and where in the story was the quote placed. Those three tell you the direction of the frame before you have finished reading. For communication teaching, it is a clear worked example of frame analysis applied to international political news.",
      caveat:
        "**Frame analysis reads texts only; it does not show what audiences made of them** — a limitation the authors state themselves in the conclusion. The scope is four outlets across one month, not Russian media as a whole. All quoted material was translated by the authors, so readers cannot check the translations against the originals from the article itself. The work is qualitative and reports neither counts per frame nor inter-coder agreement. **This summary deliberately omits the names of the outlets and of the people quoted in the article**, because the criticism in the study belongs to its authors rather than to the centre, and the names add nothing to the transferable lesson.",
    },
  },
  {
    slug: "colorism-advertising-free-speech",
    illustrationAltTh:
      "ภาพประกอบกระดาษ โต๊ะกลมล้อมด้วยเก้าอี้เจ็ดตัว เว้นด้านหน้าเป็นช่องว่างที่ไม่มีเก้าอี้ตั้งอยู่",
    illustrationAltEn:
      "Paper-craft illustration of a round table ringed by seven chairs, the near side left as an empty gap where no chair stands",
    doi: "10.20472/ss2017.6.2.005",
    articleLanguage: "en",
    th: {
      headline:
        "ในข้อความ 70 ชิ้นที่ถกเรื่องโฆษณาเหยียดสีผิว ไม่มีชิ้นใดเลยที่พูดถึงเสรีภาพในการแสดงออก",
      question:
        "ต้นปี 2559 โฆษณาครีมผิวขาวของแบรนด์ไทยรายหนึ่งถูกวิจารณ์อย่างกว้างขวางจนถูกถอน และมีเสียงเรียกร้องให้ออกกฎหมายเอาผิด “โฆษณาที่เลือกปฏิบัติ” · งานนี้ถามว่าการถกเถียงสาธารณะครั้งนั้นได้ชั่งข้อเรียกร้องดังกล่าวกับคุณค่าเรื่องเสรีภาพในการแสดงออกไว้ด้วยหรือไม่",
      method:
        "วิเคราะห์เนื้อหาข้อความที่กล่าวถึงกรณีนี้ 70 ชิ้น — ภาษาอังกฤษ 18 ชิ้น ภาษาไทย 52 ชิ้น — ครอบคลุมทั้งสิ่งพิมพ์ สื่อออนไลน์ และโพสต์บนโซเชียลมีเดีย · เกณฑ์การอ่านมีข้อเดียว คือก่อนที่ข้อความนั้นจะเรียกร้องให้ใช้มาตรการทางกฎหมาย ข้อความนั้นได้เอ่ยถึงคุณค่าของเสรีภาพในการแสดงออก หรือได้แยกระหว่าง “คำพูด” กับ “การกระทำ” ไว้หรือไม่ · เนื้อหาส่วนที่เหลือของบทความเป็นการโต้แย้งเชิงปรัชญาต่อข้อเสนอให้ออกกฎหมาย",
      findings: [
        "**ไม่มีข้อความชิ้นใดเลยใน 70 ชิ้นที่เอ่ยถึงเสรีภาพในการแสดงออก หรือแยกคำพูดออกจากการกระทำ — ศูนย์เปอร์เซ็นต์** ผู้เขียนสรุปว่าคุณค่าข้อนี้ไม่ได้อยู่ในบทสนทนาสาธารณะเรื่องโฆษณาที่เลือกปฏิบัติในไทยเลย",
        "**ข้อความที่เรียกร้องให้ออกกฎหมายไม่ได้ระบุชัดว่ากฎหมายนั้นมุ่งแก้ปัญหาอะไร** ผู้เขียนต้องประมวลข้อกังวลที่กระจัดกระจายออกมาเองเป็นสองข้อ คือโฆษณาแบบนี้ทำให้คนผิวเข้มรู้สึกถูกดูหมิ่น และการบอกว่าผิวขาวดีกว่าเป็นการเลือกปฏิบัติในตัวมันเอง",
        "**ความนิยมเรื่องสีผิวไม่ได้ชี้ไปทางเดียวกันทุกสังคม** งานทบทวนไว้ว่าในสังคมที่มีอดีตเป็นเกษตรกรรม ผิวขาวถูกใช้สื่อว่าไม่ได้ทำงานกลางแจ้ง ส่วนในสังคมอุตสาหกรรมที่คนทำงานในร่ม ผิวแทนกลับถูกใช้สื่อว่ามีเวลาว่าง — ทิศทางกลับด้านกันได้ เพราะสิ่งที่คนต้องการสื่อคือสถานะ ไม่ใช่สีผิวในตัวเอง",
        "**ข้อสรุปเชิงข้อเสนอของผู้เขียนคือไม่ควรออกกฎหมายเอาผิด** โดยให้เหตุผลว่าความรู้สึกถูกกระทบไม่ใช่ความเสียหายที่วัดได้ และกลไกที่มีอยู่แล้ว — ผู้บริโภคเลือกไม่ซื้อ กับผลต่อชื่อเสียงของแบรนด์ — ตอบสนองต่อกรณีแบบนี้ได้เองอยู่แล้ว · **ส่วนนี้เป็นข้อโต้แย้งเชิงปรัชญาของผู้เขียน ไม่ใช่ผลที่ได้จากการวิเคราะห์เนื้อหา**",
      ],
      soWhat:
        "ส่วนที่นำไปใช้ต่อได้โดยไม่ต้องเห็นด้วยกับข้อสรุปของผู้เขียน คือ**ตัวเลข 0 จาก 70** ซึ่งเป็นภาพของบทสนทนาสาธารณะที่ด้านหนึ่งของการถกเถียงมาตรฐานหายไปทั้งด้าน ไม่ใช่แค่เป็นเสียงข้างน้อย · สำหรับคนทำงานข่าวและคนออกแบบเวทีรับฟังความคิดเห็น วิธีตรวจแบบนี้ทำซ้ำได้ง่ายกับประเด็นอื่น เพียงถามว่าจุดยืนที่เป็นไปได้จุดใดบ้างที่ไม่ปรากฏในกองข้อความเลยแม้แต่ชิ้นเดียว · สำหรับการสอนจริยธรรมโฆษณา กรณีนี้ใช้เป็นโจทย์ที่มีทั้งข้อมูลเชิงประจักษ์และข้อโต้แย้งสองทางอยู่ในชิ้นเดียวกัน",
      caveat:
        "**เป็นกรณีศึกษาเดียว ตัวอย่าง 70 ชิ้น** ตัวเลข 0% จึงบอกเรื่องบทสนทนารอบกรณีนี้ ไม่ใช่บทสนทนาสาธารณะของไทยโดยรวม · บทความไม่ได้ระบุช่วงเวลาที่เก็บข้อความ วิธีเลือกตัวอย่าง หรือค่าความสอดคล้องระหว่างผู้วิเคราะห์ ผู้อ่านจึงตรวจซ้ำได้ยาก · **เนื้อหาส่วนใหญ่ของบทความเป็นการโต้แย้งเชิงบรรทัดฐานจากจุดยืนเสรีนิยมคลาสสิก ไม่ใช่ข้อค้นพบ** ศูนย์ฯ สรุปมาในฐานะข้อเสนอของผู้เขียน ไม่ใช่จุดยืนของศูนย์ฯ · **บทสรุปนี้ตั้งใจไม่ระบุชื่อแบรนด์และไม่ยกถ้อยคำบนตัวโฆษณา** เพราะทั้งสองอย่างชี้ตัวบริษัทได้ทันที ขณะที่บทเรียนที่นำไปใช้ได้ไม่ต้องพึ่งชื่อเลย",
    },
    en: {
      headline:
        "Across 70 texts debating a skin-whitening advertisement, not one raised freedom of speech",
      question:
        "In early 2016 a skin-whitening advertisement by a Thai brand drew wide criticism and was withdrawn, and voices called for a law against “discriminatory advertising”. This study asks whether that public debate ever weighed the proposal against the value of free expression.",
      method:
        "A content analysis of 70 texts mentioning the case — 18 in English and 52 in Thai — spanning print, online publications and social media posts. The reading criterion was single: before a text called for legal action, did it mention the value of free speech, or distinguish “words” from “deeds”? The remainder of the article is a philosophical argument against the proposed legislation.",
      findings: [
        "**Not one of the 70 texts mentioned freedom of speech or separated words from deeds — zero percent.** The authors conclude the value is simply absent from Thai public discourse about discriminatory advertising.",
        "**The texts calling for a law did not state clearly what the law was meant to fix.** The authors had to reconstruct the scattered concerns into two: that such advertising insults and distresses people with darker skin, and that claiming lighter skin is preferable is itself discriminatory.",
        "**Preference in skin tone does not point the same way in every society.** The review notes that in societies with an agrarian past, lighter skin signals not working outdoors, while in industrialised societies where work is indoors, a tan signals leisure time instead — the direction reverses, because what people are signalling is status rather than skin tone as such.",
        "**The authors' normative conclusion is that no such law should be passed**, on the grounds that hurt feelings are not measurable harm and that existing mechanisms — consumers declining to buy, and the reputational cost to the brand — already respond to cases like this. **This part is the authors' philosophical argument, not a result of the content analysis.**",
      ],
      soWhat:
        "The part that transfers without having to share the authors' conclusion is **the figure of 0 out of 70**: a picture of a public conversation in which one whole side of a standard debate is missing, not merely outnumbered. For journalists and for anyone designing public consultation, the check repeats easily on other issues — ask which tenable positions appear in none of the texts at all. For teaching advertising ethics, the case carries both an empirical result and both sides of an argument in a single paper.",
      caveat:
        "**One case, 70 texts.** The 0% therefore describes the conversation around this case, not Thai public discourse in general. The article does not state the collection window, the sampling method, or any inter-coder agreement, so the result is hard to reproduce. **Most of the article is normative argument from a classical-liberal position rather than a finding** — the centre summarises it as the authors' proposal, not as a position of its own. **This summary deliberately omits the brand's name and the wording on the advertisement**, since either identifies the company immediately while the usable lesson needs neither.",
    },
  },
  {
    slug: "social-media-moderation-property-rights",
    kind: "argument",
    illustrationAltTh:
      "ภาพประกอบกระดาษ วงกบประตูสีเขียวตั้งลอยเดี่ยวๆ บนพื้นว่าง บานประตูสีครีมเปิดค้างอยู่ ไม่มีรั้วต่อออกไปทั้งสองข้าง",
    illustrationAltEn:
      "Paper-craft illustration of a green gate frame standing alone on bare ground, its cream leaf swung open, with no fence running off to either side",
    doi: "10.51698/tripodos.2020.48p53-68",
    articleLanguage: "en",
    th: {
      headline: "เสรีภาพในการพูดคือสิทธิที่จะไม่ถูกขัดขวาง ไม่ใช่สิทธิที่จะได้เวทีจากคนอื่น",
      question:
        "เป้าหมายที่ 16.10 ของ SDG พูดถึงการเข้าถึงข้อมูลข่าวสารและการคุ้มครองเสรีภาพขั้นพื้นฐาน ขณะเดียวกันแพลตฟอร์มโซเชียลมีเดียถูกวิจารณ์ว่า “เซ็นเซอร์” เนื้อหาของผู้ใช้ · งานนี้ถามว่าการที่เจ้าของแพลตฟอร์มลบเนื้อหาหรือระงับบัญชี เป็นการละเมิดเสรีภาพในการแสดงออกจริงหรือไม่",
      method:
        "การให้เหตุผลเชิงปรัชญาการเมืองและปรัชญากฎหมาย ไล่เป็นขั้น — เริ่มจากแยก **เสรีภาพ** ออกจาก **ความสามารถ** ตามที่ Rothbard อธิบายไว้และเทียบกับแนวคิดเรื่องเสรีภาพของ Locke · แล้วแยก **สิทธิเชิงลบ** (สิทธิที่ขอเพียงให้คนอื่นไม่มาแทรกแซง) ออกจาก **สิทธิเชิงบวก** (สิทธิที่คนอื่นต้องลงมือทำหรือจ่ายให้จึงจะเป็นจริง) ตามที่ Berlin วางไว้ · แล้วจึงเชื่อมเสรีภาพในการสื่อสารเข้ากับสิทธิในทรัพย์สิน · ไม่มีการเก็บข้อมูลและไม่มีกรณีศึกษาเชิงประจักษ์",
      findings: [
        "**เสรีภาพไม่เท่ากับความสามารถ** — ตัวอย่างที่งานยกคือคนเราไม่ได้ “ไม่มีเสรีภาพ” ที่จะกระโดดข้ามมหาสมุทร แต่ไม่มี*ความสามารถ*ต่างหาก · การขาดความสามารถไม่ใช่การถูกลิดรอนสิทธิ และการสับสนสองอย่างนี้เป็นต้นทางของข้อถกเถียงที่พันกัน",
        "**สิทธิเชิงลบกับสิทธิเชิงบวกเรียกร้องจากคนอื่นไม่เท่ากัน** — สิทธิเชิงลบขอเพียงให้คนอื่นไม่มาแทรกแซง จึงไม่ต้องบังคับใครเลย ส่วนสิทธิเชิงบวกแปลว่าต้องมีใครสักคนถูกบังคับให้ลงมือทำหรือจ่าย เพื่อให้สิทธินั้นเป็นจริงขึ้นมา",
        "**เสรีภาพในการพูดไม่ใช่สิทธิที่ลอยอยู่เดี่ยวๆ แต่เป็นส่วนขยายของสิทธิในทรัพย์สิน** — คำถามที่มักถูกข้ามคือ “พูดที่ไหน” เพราะการพูดต้องเกิดบนพื้นที่ใดพื้นที่หนึ่งเสมอ ไม่ว่าจะเป็นของตนเอง หรือของคนที่ยินยอมให้ใช้",
        "**เมื่อวางบนกรอบนี้ การที่แพลตฟอร์มเอกชนไม่ยอมเผยแพร่เนื้อหาบางอย่าง จึงไม่ใช่การเซ็นเซอร์ แต่คือการใช้สิทธิเหนือทรัพย์สินของตน** — งานแยกให้ชัดระหว่างเอกชนที่ปฏิเสธจะแบกข้อความของคนอื่นไว้บนพื้นที่ตัวเอง กับรัฐที่ห้ามคนพูดบนพื้นที่ที่เขาเป็นเจ้าของโดยชอบ ซึ่งเป็นคนละเรื่องกัน",
        "**ข้อสรุปกลับด้านกับข้อวิจารณ์ที่ได้ยินบ่อย** — ผู้เขียนเสนอว่าการออกกฎบังคับให้แพลตฟอร์มยกเลิกนโยบายเนื้อหาของตน จะเป็นภัยต่อเสรีภาพในการแสดงออก*มากกว่า* การที่แพลตฟอร์มลบโพสต์ เพราะเป็นการบังคับเจ้าของทรัพย์สินให้ทำสิ่งที่เขาไม่ต้องการ",
      ],
      soWhat:
        "ข้อถกเถียงเรื่องแพลตฟอร์มกับเสรีภาพในการแสดงออกกลับมาทุกครั้งที่มีการลบโพสต์ที่เป็นข่าว งานนี้ให้**เครื่องมือแยกคำถาม**ที่ใช้ได้โดยไม่ต้องเห็นด้วยกับข้อสรุป — ก่อนถามว่า “นี่คือการเซ็นเซอร์หรือไม่” ให้ถามก่อนสองข้อ คือเวทีที่กำลังพูดถึงเป็นของใคร และผู้เรียกร้องกำลังขอให้ใครงดเว้นการกระทำ หรือขอให้ใครถูกบังคับให้ทำอะไรบางอย่าง · สองคำถามนี้แยกกรณีที่ดูเหมือนกันออกจากกันได้ทันที และใช้ได้กับสื่อทุกชนิด ไม่ใช่เฉพาะโซเชียลมีเดีย",
      caveat:
        "**เป็นการให้เหตุผลจากจุดยืนเสรีนิยมคลาสสิกสายสิทธิในทรัพย์สิน** ซึ่งเป็นหนึ่งในหลายสำนักคิด ไม่ใช่ข้อสรุปที่วงวิชาการเห็นตรงกัน · ข้อสมมติตั้งต้นที่ว่าสิทธิทั้งหมดทอนลงเป็นสิทธิในทรัพย์สินได้ เป็นจุดที่นักปรัชญาจำนวนมากไม่ยอมรับ — ถ้าไม่รับข้อสมมตินี้ ข้อสรุปก็ไม่ตามมา · งานไม่ได้เก็บข้อมูลและไม่ได้ทดสอบข้อเสนอกับกรณีจริง · เขียนเมื่อปี 2563 ก่อนกฎหมายกำกับแพลตฟอร์มรุ่นใหม่หลายฉบับจะมีผล จึงไม่ได้ตอบข้อโต้แย้งเรื่องอำนาจเหนือตลาดของแพลตฟอร์มขนาดใหญ่ ซึ่งกลายเป็นแกนหลักของการถกเถียงในระยะหลัง",
    },
    en: {
      headline: "Free speech is a right against being stopped, not a right to be carried on someone else's platform",
      question:
        "SDG target 16.10 calls for public access to information and the protection of fundamental freedoms, while social media platforms are criticised for “censoring” user content. Does a platform owner deleting a post or suspending an account actually violate freedom of expression?",
      method:
        "A step-by-step argument in political and legal philosophy. It separates **freedom** from **power** as Rothbard sets it out, alongside Locke's conception of liberty; then separates **negative rights** (which ask only that others not interfere) from **positive rights** (which require someone else to act or pay before the right is real), following Berlin; and then ties communication freedom to property rights. No data is collected and no empirical case is examined.",
      findings: [
        "**Freedom is not the same as power.** A person is not “unfree” to leap an ocean — they lack the *power* to. Lacking power is not being deprived of a right, and confusing the two is where tangled arguments begin.",
        "**Negative and positive rights ask different things of other people.** A negative right asks only that others refrain, so it coerces nobody. A positive right means someone must be compelled to act or to pay before the right exists in practice.",
        "**Free speech is not a free-standing right but an extension of property rights.** The question usually skipped is *where* — speech always happens somewhere, either on your own property or on property whose owner has agreed to host you.",
        "**On that framing, a private platform declining to carry content is not censorship but the exercise of property rights.** The article draws a sharp line between a private party refusing to carry someone's ideas on its own property and a government forbidding speech on property the speaker legitimately owns.",
        "**The conclusion inverts the common criticism.** The author argues that compelling platforms to abandon their content policies would threaten freedom of expression *more* than deleting posts does, because it forces property owners to do what they do not wish to do.",
      ],
      soWhat:
        "The platform-and-speech argument returns every time a newsworthy post is removed. Whether or not you accept the conclusion, the article supplies a **way of splitting the question**: before asking “is this censorship?”, ask whose platform it is, and whether the demand is that someone refrain from acting or that someone be compelled to act. Those two questions separate cases that look identical, and they apply to any medium, not only social media.",
      caveat:
        "**This is reasoning from a classical-liberal, property-rights position** — one school among several, not a settled academic conclusion. The founding assumption that all rights reduce to property rights is exactly what many philosophers reject; without it, the conclusion does not follow. Nothing is measured and the argument is not tested against real cases. It was written in 2020, before the newer platform-regulation regimes took effect, so it does not engage the market-power argument about very large platforms that dominates the later debate.",
    },
  },
  {
    slug: "deceptive-pr-responsibility",
    kind: "argument",
    illustrationAltTh:
      "ภาพประกอบกระดาษ โซ่สามห่วงเรียงกัน ห่วงกลางเป็นคนละสีและมีรอยแยกเปิดอยู่ แต่โซ่ยังคล้องต่อกัน",
    illustrationAltEn:
      "Paper-craft illustration of a three-link chain, its middle link in a different colour and split open, yet still holding the chain together",
    doi: "10.51698/tripodos.2018.42.21-38",
    articleLanguage: "en",
    th: {
      headline: "เมื่อข่าวแจกที่เป็นเท็จผ่านมือกองบรรณาธิการไปถึงผู้อ่าน ใครต้องรับผิด",
      question:
        "นักข่าวใช้ข่าวแจก จดหมายข่าว และการแถลงข่าวเป็นวัตถุดิบของงานข่าวตามปกติ · ถ้าข้อมูลนั้นไม่จริง หรือจงใจให้เป็นเท็จ แล้วผู้อ่านเสียหายจากการเชื่อ ใครควรรับผิด — คนทำประชาสัมพันธ์ที่ปล่อยข้อมูลเท็จ นักข่าวที่พึ่งแหล่งข่าวนั้นมากเกินไป หรือผู้อ่านเอง",
      method:
        "ปรัชญากฎหมาย ด้วยวิธี **การทดลองทางความคิด** — ตั้งกรณีสมมติขึ้นชุดหนึ่งแล้วไล่เปรียบเทียบทีละขั้น เริ่มจากบริษัทที่กล่าวอ้างสรรพคุณเท็จกับผู้ซื้อโดยตรง → เปลี่ยนเป็นซื้อโฆษณาในหนังสือพิมพ์ → เปลี่ยนเป็นส่งข่าวแจกให้กองบรรณาธิการนำไปเขียนเป็นข่าว แล้วดูว่าความรับผิดขยับไปอย่างไรในแต่ละขั้น · วิเคราะห์ด้วยกรอบเรื่องเจตนา วิธีการและเป้าหมาย และเรื่องเจตจำนงของผู้ที่เข้ามาคั่นกลาง · ไม่มีการเก็บข้อมูลจริง",
      findings: [
        "**สองขั้นแรกตอบไม่ยาก** — ทั้งการหลอกลวงผู้ซื้อโดยตรงและการซื้อพื้นที่โฆษณา ผู้รับผิดคือบริษัท เพราะบริษัทควบคุมข้อความเองและเป็นฝ่ายได้เงินไป การที่ข้อความเดินผ่านสื่อไม่ได้เปลี่ยนอะไร",
        "**ขั้นที่สามต่างออกไป เพราะมีคนที่มีเจตจำนงของตัวเองเข้ามาคั่น** — กองบรรณาธิการไม่ได้ถูกจ้าง และเลือกเองว่าจะเขียนหรือไม่เขียน การมีผู้เลือกคั่นอยู่จึง “ตัด” สายของเหตุและผลที่วิ่งจากบริษัทไปถึงผู้เสียหาย",
        "**แต่บริษัทก็ยังใช้สื่อเป็นเครื่องมือไปสู่เป้าหมายที่ต้องห้ามอยู่ดี** — งานเทียบกับกรณีบุรุษไปรษณีย์ที่ส่งซองซึ่งข้างในเป็นข้อความหลอกลวง โดยไม่รู้ว่าข้างในเขียนว่าอะไร · บุรุษไปรษณีย์เป็นเพียงเครื่องมือ ไม่ได้มีเจตนา จึงไม่ต้องรับผิด",
        "**และนี่คือหัวใจของข้อเสนอ — กองบรรณาธิการไม่ใช่บุรุษไปรษณีย์** เพราะ**การรู้เนื้อหาและการคัดเลือกว่าจะเผยแพร่อะไรคือเนื้องานของเขาโดยตรง** เขาจึงถูกกันออกจากความรับผิดทั้งหมดไม่ได้ แม้จะไม่ใช่ผู้ได้เงินไปก็ตาม",
        "**ข้อสรุปคือไม่มีคำตอบสำเร็จรูป** — ผู้เขียนระบุเองว่าตอบ “จากบนเก้าอี้” ไม่ได้ ต้องดูเป็นรายกรณี และ**ข้อความหลอกลวงโดยตัวมันเองยังไม่ใช่ความผิด** ต้องมีผู้เสียหายที่ระบุตัวได้ซึ่งเรียกร้องความเป็นธรรม แล้วให้ผู้ตัดสินชั่งจากทั้งหลักการและจากแนวปฏิบัติที่วงการนั้นถือกันอยู่ในเวลาและสถานที่นั้น",
      ],
      soWhat:
        "สำหรับกองบรรณาธิการและคนทำงานประชาสัมพันธ์ ข้อที่ใช้ได้ทันทีคือ**การเลือกว่าจะเผยแพร่อะไรเป็นการกระทำที่มีน้ำหนักในตัวเอง ไม่ใช่การส่งต่อเฉยๆ** — ข้อแยกระหว่างบุรุษไปรษณีย์กับบรรณาธิการเป็นเหตุผลที่กระชับที่สุดข้อหนึ่งว่าทำไมการตรวจสอบข้อเท็จจริงจึงไม่ใช่งานเสริมที่ทำก็ได้ไม่ทำก็ได้ · สำหรับการสอนจริยธรรมสื่อ โครงของงานใช้เป็นแบบฝึกหัดได้ตรงๆ เพราะมันไล่กรณีทีละขั้นให้เห็นว่าความรับผิดขยับตรงไหนและเพราะอะไร",
      caveat:
        "**เป็นการทดลองทางความคิด ไม่ใช่การศึกษาคดีจริง** ไม่มีข้อมูลและไม่มีคำพิพากษาจริงมาประกอบ · กรอบที่ใช้เป็นปรัชญากฎหมายสายเสรีนิยม ซึ่งวางความรับผิดบนความยินยอมและสิทธิในทรัพย์สินเป็นหลัก สำนักคิดอื่นให้คำตอบต่างออกไปได้ · **ไม่ใช่ความเห็นทางกฎหมาย และไม่ได้อิงกฎหมายไทย** ผู้ที่ต้องการคำตอบสำหรับกรณีจริงต้องดูตัวบทและแนวคำพิพากษาของเขตอำนาจนั้นเอง · ชื่อบริษัทและหนังสือพิมพ์ในกรณีสมมติเป็นชื่อที่ผู้เขียนตั้งขึ้น ไม่ได้อ้างถึงองค์กรใดที่มีอยู่จริง",
    },
    en: {
      headline: "When a false press release reaches readers through a newsroom, who is answerable",
      question:
        "Journalists routinely build stories on press releases, newsletters and briefings. If that material is untrue, or deliberately false, and readers are harmed by believing it, who should answer for the harm — the PR practitioner who issued it, the journalist who leaned too heavily on the source, or the public?",
      method:
        "Legal philosophy conducted as a **thought experiment**: a hypothetical case is set up and then varied step by step. A company makes a false claim directly to a buyer; then it buys a newspaper advertisement instead; then it merely sends a press release that an editorial team turns into a news story. At each step the argument asks where responsibility moves, analysed through a means-and-ends framework and the question of intervening free will. No real data is gathered.",
      findings: [
        "**The first two steps are straightforward.** Whether the company deceives the buyer directly or through paid advertising, the company answers: it controlled the message and it took the money. Passing through a medium changes nothing.",
        "**The third step differs, because an actor with free will stands in between.** The newsroom is not paid and chooses for itself whether to publish, and that choice “breaks” the chain of causation running from company to victim.",
        "**Yet the company has still used the medium as a means toward a forbidden end.** The article compares this to a postman delivering an envelope whose fraudulent contents he does not know: the postman is only a means, has no intent, and is not answerable.",
        "**And here is the core of the argument — a newsroom is not that postman.** **Knowing the content and choosing what to publish is precisely its job**, so it cannot be excluded from responsibility altogether, even though it is not the party that took the money.",
        "**The conclusion is that there is no off-the-shelf answer.** The authors state plainly that the question cannot be settled “from the armchair”. It goes case by case, and **a deceptive message is not by itself a crime**: there must be an identifiable victim seeking restitution, and an adjudicator weighing both abstract principle and the expectations that practice has established in that time and place.",
      ],
      soWhat:
        "For newsrooms and PR practitioners the usable point is that **choosing what to publish is an act with weight of its own, not mere relaying**. The postman-versus-editor distinction is one of the most compact reasons on record for why fact-checking is not an optional extra. For teaching media ethics, the structure works directly as an exercise, because it walks a single case through variations and shows exactly where responsibility shifts and why.",
      caveat:
        "**This is a thought experiment, not a study of decided cases** — no data and no actual judgments. The framework is liberal legal philosophy, resting responsibility on consent and property rights; other schools answer differently. **It is not legal advice and it is not grounded in Thai law**; anyone needing an answer for a real case must consult the statutes and precedents of that jurisdiction. The company and newspaper in the hypothetical are names the authors invented and refer to no real organisation.",
    },
  },
  {
    slug: "video-art-screen-savers",
    kind: "argument",
    illustrationAltTh:
      "ภาพประกอบกระดาษ จอสี่เหลี่ยมแนวนอนเปล่าๆ ตั้งอยู่บนขาตั้งวาดภาพแบบจิตรกร",
    illustrationAltEn:
      "Paper-craft illustration of a blank widescreen panel standing on a painter's easel",
    doi: "10.22492/ijcs.3.1.05",
    articleLanguage: "en",
    th: {
      headline: "วิดีโออาร์ตใช้เวลาครึ่งศตวรรษหาที่ยืนในวัฒนธรรมมวลชน แล้วเดินเข้าห้องนั่งเล่นทางประตูที่ไม่มีใครเฝ้า",
      question:
        "ปี 2558 มีการเปิดตัวภาพพักหน้าจอชุดใหม่บนกล่องทีวีของ Apple เป็นคลิปถ่ายทางอากาศแบบสโลว์โมชันจากเมืองและภูมิประเทศทั่วโลก · งานนี้ถามว่าคลิปเหล่านี้นับเป็นวิดีโออาร์ตได้หรือไม่ และถ้าได้ มันหมายความว่าอะไรกับสถานะของวิดีโออาร์ตในวัฒนธรรมมวลชน",
      method:
        "การให้เหตุผลเชิงทฤษฎีศิลปะและวัฒนธรรมศึกษา — ทบทวนนิยามของงานศิลปะก่อน แล้วแยกจุดมุ่งหมายของศิลปะแบบที่ไม่ได้มุ่งประโยชน์ออกจากแบบที่มุ่งประโยชน์ตามที่ Lévi-Strauss จำแนกไว้ · ตรวจว่าภาพพักหน้าจอเข้าเกณฑ์ข้อใดบ้าง แล้ววางผลที่ได้ไว้ในบริบทของประวัติศาสตร์วิดีโออาร์ตและพฤติกรรมการใช้จอในบ้าน · ไม่มีการสำรวจผู้ชมและไม่มีข้อมูลเชิงปริมาณ",
      findings: [
        "**ของที่มีประโยชน์ใช้สอยเป็นงานศิลปะได้** — ข้อที่ว่าศิลปะต้องไม่มีประโยชน์ใช้สอยถูกตรวจสอบแล้วพบว่าแคบเกินไป เพราะศิลปะทำหน้าที่ได้หลายอย่างในประวัติศาสตร์ รวมถึงการสื่ออารมณ์ การให้ความบันเทิง และการเป็นรูปแบบหนึ่งของการสื่อสาร",
        "**ภาพพักหน้าจอเกิดมาเพื่อประโยชน์ใช้สอยล้วนๆ** คือถนอมจอไม่ให้ภาพไหม้ติด แต่ทำหน้าที่แบบงานศิลปะเพิ่มขึ้นมาด้วย — สื่ออารมณ์ สร้างบรรยากาศ และมุ่งไปที่ผู้ชมคนหนึ่ง",
        "**สิ่งที่เปลี่ยนไปจริงคือที่ตั้ง ไม่ใช่ตัวงาน** — ผู้เขียนเสนอว่าเทคโนโลยีนี้ให้ความหมายใหม่แก่วิดีโออาร์ตด้วยการเปลี่ยนมันเป็น**วัตถุตกแต่งภายใน** จากงานที่ต้องเดินไปดูในหอศิลป์ กลายเป็นสิ่งที่ทำงานอยู่กลางห้องนั่งเล่นจำนวนมหาศาล โดยแทบไม่มีใครสังเกต",
        "**เงื่อนไขที่จะทำให้มันโตต่อคือการเปิดให้ผู้ใช้เลือกเอง** — ณ เวลาที่เขียน ผู้ใช้ยังใส่คลิปของตัวเองไม่ได้ เลือกได้เฉพาะชุดที่ผู้ผลิตให้มา · ผู้เขียนเสนอว่าถ้าเปิดให้ใส่ของจากภายนอกได้เมื่อใด ตลาดของภาพพักหน้าจอที่เป็นงานศิลปะก็น่าจะเกิดขึ้น เพราะจอใหญ่กลางห้องคือพื้นที่แสดงรสนิยมแบบเดียวกับชั้นเก็บแผ่นเพลง",
        "**เป็นข้อเสนอในรูปคำถามปลายเปิด ไม่ใช่คำประกาศ** — ตัวบทความจบด้วยการถามว่าเรากำลังอยู่ตรงจุดกำเนิดของศิลปะมวลชนแบบใหม่หรือไม่ ไม่ได้ยืนยันว่าใช่",
      ],
      soWhat:
        "สำหรับคนที่ทำงานกับสื่อและพื้นที่แสดงผล ประเด็นที่ยกออกมาใช้ต่อได้คือ**การเปลี่ยนที่ตั้งของงานเปลี่ยนสถานะของงาน** — สิ่งเดียวกันย้ายจากหอศิลป์มาอยู่บนจอในบ้านแล้วความหมายเปลี่ยน ทั้งที่ตัวคลิปไม่เปลี่ยนเลยสักนิด · เป็นกรอบที่คิดต่อได้กับจอในที่สาธารณะ จอในล็อบบี้อาคาร และงานที่เผยแพร่ผ่านแพลตฟอร์มที่ไม่ได้ตั้งใจให้เป็นพื้นที่ศิลปะตั้งแต่แรก",
      caveat:
        "**เป็นบทความเชิงแนวคิด ไม่มีข้อมูลผู้ชมและไม่มีตัวเลขใดรองรับ** ข้อเสนอเรื่องแนวโน้มจึงเป็นการคาดการณ์ของผู้เขียน ไม่ใช่ผลการวัด · เขียนเมื่อปี 2561 โดยอ้างอิงอุปกรณ์และข้อจำกัดของแพลตฟอร์ม ณ เวลานั้น ซึ่งเปลี่ยนไปแล้ว · นิยาม “ศิลปะ” ที่ใช้เป็นนิยามกว้าง ถ้าใช้นิยามที่เข้มกว่านี้ ข้อสรุปอาจไม่ตามมา · ข้อสังเกตเรื่องความแตกต่างระหว่างรุ่นวัยเป็นการอ้างงานของผู้อื่น ไม่ใช่ผลจากงานชิ้นนี้เอง",
    },
    en: {
      headline: "Video art spent half a century looking for a way into popular culture, then walked into the living room through an unguarded door",
      question:
        "In 2015 a new screen saver arrived on Apple TV: a set of slow-motion aerial clips of skylines and landscapes from around the world. Do these count as video art — and if they do, what does that mean for where video art now sits in popular culture?",
      method:
        "An argument in art theory and cultural studies. It revisits what counts as visual art, separates art's non-motivated purposes from its motivated ones as Lévi-Strauss distinguishes them, tests which of those criteria a screen saver meets, and then places the result in the history of video art and in how people actually use screens at home. There is no audience survey and no quantitative data.",
      findings: [
        "**Purely utilitarian objects can be artworks.** The claim that art must have no use is examined and found too narrow: art has served many purposes historically, including conveying mood, entertaining, and communicating.",
        "**Screen savers began as pure utility** — protecting a display from burn-in — but they now also do what artworks do: convey a mood, create an atmosphere, and address a viewer.",
        "**What actually changed is the location, not the work.** The author's proposal is that the technology gives video art a new meaning by turning it into an **interior object**: from something you travel to a gallery to see, into something running in the middle of a vast number of living rooms, almost unremarked.",
        "**What would let it grow is letting viewers choose.** At the time of writing, users could not supply their own clips and were limited to the manufacturer's set. If third-party screen savers were allowed, the author expects a market in screen-saver art to follow, since the large screen in the room displays taste the way a record collection does.",
        "**It is offered as an open question, not a declaration.** The article closes by asking whether we are at the birth of a new popular art form, rather than asserting that we are.",
      ],
      soWhat:
        "For anyone working with media and display space, the transferable point is that **moving a work changes what the work is**: the same clips carry a different meaning in a living room than in a gallery, without a frame of the footage changing. That frame extends to public screens, lobby displays, and work distributed through platforms never designed as art spaces.",
      caveat:
        "**This is a conceptual article with no audience data and no figures behind it**, so the claims about where things are heading are the author's forecast rather than a measurement. It was written in 2018 around the devices and platform limits of that moment, which have since changed. The working definition of “art” is a broad one; a stricter definition would not yield the same conclusion. The remarks about generational differences cite other people's work, not findings of this one.",
    },
  },
  {
    slug: "communication-moral-norms",
    kind: "argument",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แท่งสี่เหลี่ยมสองก้อนหันหน้าเข้าหากันโดยมีช่องว่างคั่น และมีลูกบาศก์สีส้มหนึ่งก้อนลอยอยู่กลางช่องว่างนั้น",
    illustrationAltEn:
      "Paper-craft illustration of two blocks facing each other across a gap, with a single orange cube suspended in the middle of that gap",
    doi: "10.1163/26659077-01902005",
    articleLanguage: "en",
    th: {
      headline: "ทำไมคนถึงรับกฎศีลธรรมมาถือ — ข้อเสนอคือกฎเหล่านี้ไม่ใช่คำสั่ง แต่เป็นเครื่องมือที่คนสร้างขึ้นเพื่อใช้กับคนอื่น",
      question:
        "ปรัชญาศีลธรรมมีช่องว่างเก่าแก่ระหว่างข้อความที่**บรรยายว่าอะไรเป็นอย่างไร** กับข้อความที่**กำหนดว่าควรทำอะไร** — ต่อให้ยอมรับว่าการฆ่าคนเป็นสิ่งไม่ดี ก็ยังไม่ได้อธิบายว่าทำไมฉันจึงไม่ควรฆ่า · งานนี้ถามว่าช่องว่างนี้ข้ามได้อย่างไร และการสื่อสารมีบทบาทอะไรอยู่ตรงนั้น",
      method:
        "การให้เหตุผลเชิงปรัชญาศีลธรรม โดยเสนอให้**แยกคำถามออกเป็นสามข้อแทนที่จะเป็นสองข้อ** — อะไรถูกอะไรผิด · ทำไมสังคมหนึ่งจึงพัฒนาและรับกฎศีลธรรมข้อหนึ่งมาใช้ · และทำไมคนคนหนึ่งจึงควรทำตามกฎนั้น — เพราะสามข้อนี้ต้องใช้วิธีตอบคนละแบบ · งานเน้นความสัมพันธ์ระหว่างสองข้อแรก และแตะข้อสามเพียงสั้นๆ · ไม่มีการเก็บข้อมูล",
      findings: [
        "**ข้อเสนอหลักคือให้แทรกคำถามข้อที่สองเข้าไปกลางช่องว่าง** ระหว่าง “เป็นอย่างไร” กับ “ควรทำอย่างไร” — เพราะสองข้อนั้นตอบด้วยวิธีคนละแบบ การพยายามกระโดดข้ามตรงๆ จึงติดขัดเสมอ",
        "**เมื่อมองแบบนี้ จริยศาสตร์เชิงบรรทัดฐานไม่ได้ตอบว่าใครควรทำอะไร แต่ตอบว่าถ้ารับกฎข้อนี้มาใช้ สังคมจะกลายเป็นแบบไหน** ซึ่งเป็นคำถามที่ตอบได้ด้วยการพิจารณาผลของกฎ ไม่ใช่ด้วยการอ้างอำนาจของใคร",
        "**คำถามทางจริยธรรมเกิดขึ้นเพราะการกระทำของคนหนึ่งไปกระทบอีกคน** งานจึงนิยาม “การกระทำผิด” ว่าคือการกระทำต่อผู้อื่นโดยผู้นั้นไม่ยินยอม",
        "**สิ่งที่ทุกคนมีร่วมกันไม่ใช่ค่านิยมชุดเดียวกัน แต่คือความไม่อยากถูกกระทำโดยไม่ยินยอม** — ผู้เขียนเรียกว่าเป็นความชอบเชิงอัตวิสัยที่เป็นสากล และเสนอว่านี่คือสะพานข้ามไปสู่ข้อความเชิงกำหนดให้ทำ",
        "**กฎศีลธรรมจึงเป็นเครื่องมือที่คนสร้างขึ้นเพื่อใช้กับผู้อื่นเป็นหลัก** ไม่ใช่คู่มือที่แต่ละคนหยิบมาอ่านก่อนตัดสินใจ — คนต้องการกฎเพราะกฎสร้างสภาพแวดล้อมที่ปลอดภัยสำหรับตัวเขาเอง",
        "**การสื่อสารคือสิ่งที่ทำให้ขั้นตอนนี้เป็นไปได้** — เมื่อความชอบที่มีร่วมกันถูกทำให้ปรากฏ กฎจึงถูกซึมซับผ่านวัฒนธรรมและกลายเป็นของที่ใช้ร่วมกันระหว่างผู้คน · สิ่งนี้เกิดขึ้นได้เพียงเพราะมนุษย์สื่อสารกันได้ และสร้างสถาบันที่ซับซ้อนขึ้นเพื่อให้ร่วมมือกันได้ดีขึ้น",
      ],
      soWhat:
        "สำหรับคนที่ออกแบบการรณรงค์เปลี่ยนพฤติกรรมหรือทำงานกับบรรทัดฐานทางสังคม ข้อที่นำไปคิดต่อได้คือ**บรรทัดฐานไม่ได้แพร่เพราะคนถูกบอกว่าอะไรถูก แต่แพร่เมื่อคนมองเห็นว่าคนอื่นก็อยากได้สภาพแบบเดียวกัน** — ซึ่งเปลี่ยนโจทย์ของงานสื่อสารจาก “จะโน้มน้าวให้เขาเชื่อตามอย่างไร” ไปเป็น “จะทำให้ความต้องการที่มีร่วมกันอยู่แล้วปรากฏให้เห็นได้อย่างไร” · การเชื่อมข้อนี้เข้ากับงานรณรงค์เป็นการอ่านต่อของศูนย์ฯ เอง ตัวบทความไม่ได้เขียนถึงการรณรงค์ไว้",
      caveat:
        "**เป็นการให้เหตุผลเชิงปรัชญาล้วน ไม่มีข้อมูลเชิงประจักษ์** · ข้อเสนอเรื่อง “ความชอบเชิงอัตวิสัยที่เป็นสากล” เป็นข้อสมมติที่งานไม่ได้ทดสอบ และเป็นจุดที่สำนักคิดอื่นโต้แย้งได้โดยตรง · การนิยามการกระทำผิดด้วยความยินยอมเป็นกรอบของสายเสรีนิยม ซึ่งไม่ใช่กรอบเดียวที่ใช้กันในจริยศาสตร์ · **คำถามที่ว่าทำไมบุคคลหนึ่งจึงควรทำตามกฎ ผู้เขียนแตะเพียงสั้นๆ และไม่ได้ตอบให้จบ** ซึ่งเป็นขอบเขตที่ผู้เขียนระบุไว้เองตั้งแต่ต้นบทความ",
    },
    en: {
      headline: "Why people take on moral rules — the argument is that these rules are not commands but tools people build to apply to others",
      question:
        "Moral philosophy has a long-standing gap between statements that **describe how things are** and statements that **prescribe what ought to be done**: agreeing that murder is bad still does not explain why I should not murder. How is that gap crossed, and what part does communication play in crossing it?",
      method:
        "An argument in moral philosophy that proposes **splitting the problem into three questions rather than two** — what is right and wrong; why a society develops and adopts a particular moral norm; and why an individual ought to follow it — because each needs a different method to answer. The paper concentrates on the relationship between the first two and touches only briefly on the third. No data is collected.",
      findings: [
        "**The central move is to insert the second question into the gap** between “is” and “ought”. The two are answered by different methods, which is why attempts to jump straight across keep stalling.",
        "**Seen this way, normative ethics does not tell anyone what to do; it tells you what kind of society follows from adopting a given norm** — a question answerable by examining the norm's effects rather than by appeal to authority.",
        "**Ethical questions arise because one person's actions affect another**, so the paper defines wrongdoing as acting upon another person without that person's consent.",
        "**What everyone shares is not one set of values but the wish not to be acted upon without consent** — the author calls this a universally shared subjective preference, and proposes it as the bridge to prescriptive statements.",
        "**Moral norms are therefore devices people create largely to impose on others**, not manuals each person consults before deciding. People want the rules because the rules produce conditions that are safer for themselves.",
        "**Communication is what makes the step possible.** Once a shared preference becomes visible, the norm is internalised through culture and enters the shared space between people — which happens only because humans can communicate, and can build the more complex institutions that better cooperation needs.",
      ],
      soWhat:
        "For anyone designing behaviour-change work or working with social norms, the point worth carrying forward is that **norms do not spread because people are told what is right; they spread when people can see that others want the same conditions** — which turns the communication problem from “how do we persuade them” into “how do we make an existing shared preference visible”. Connecting the argument to campaign work is the centre's own reading; the article itself does not discuss campaigns.",
      caveat:
        "**This is philosophical argument alone, with no empirical evidence.** The proposed “universally shared subjective preference” is an assumption the paper does not test, and it is precisely where other schools would push back. Defining wrongdoing through consent is a liberal framework, not the only one in ethics. **The question of why an individual ought to follow a norm is touched on only briefly and left unresolved** — a scope limit the author states at the outset.",
    },
  },
  {
    slug: "dating-apps-substance-persuasion",
    illustrationAltTh:
      "ภาพประกอบกระดาษ กรวยกระดาษพับใบเดียว มีกระดาษพับชิ้นเดียวกำลังตกเข้าปากกรวยด้านบน ส่วนใต้ปลายกรวยมีกระดาษพับสองชิ้นคนละรูปวางอยู่",
    illustrationAltEn:
      "Paper-craft illustration of a single folded paper funnel with one folded piece dropping into its wide top opening and two differently shaped folded pieces resting below its narrow spout",
    doi: "10.2147/prbm.s121480",
    articleLanguage: "en",
    license: "cc-by-nc",
    th: {
      headline: "ช่องทางที่สร้างไว้ให้นัดพบ กลายเป็นช่องทางส่งคำชวนใช้สารเสพติดไปด้วย",
      question:
        "แอปหาคู่เป็นช่องทางหลักที่ชายซึ่งมีเพศสัมพันธ์กับชายในไทยใช้หาคู่นัด งานนี้ถามว่าช่องทางเดียวกันนี้ถูกใช้ส่งคำชวนให้ลองสารเสพติดด้วยหรือไม่ และคำชวนเหล่านั้นสัมพันธ์กับพฤติกรรมการใช้สารจริงแค่ไหน",
      method:
        "แบบสอบถามออนไลน์ 21 ข้อ เก็บ 9 กุมภาพันธ์ถึง 10 มีนาคม 2559 (เลือกช่วงนี้เพราะคร่อมวันวาเลนไทน์ซึ่งการใช้แอปสูง) ได้ผู้ตอบ 350 คน — 200 คนจากเว็บไซต์ 8 แห่ง และ 150 คนจากช่องทางโซเชียล 5 ช่องทาง คัดผู้ตอบแบบสะดวก วิเคราะห์ด้วยสถิติเชิงพรรณนา ค่าสหสัมพันธ์เพียร์สัน และการถดถอยพหุคูณแบบขั้นตอน ผ่านการรับรองจริยธรรมการวิจัยจากสถาบันต้นสังกัดของผู้วิจัย และเก็บข้อมูลโดยไม่ระบุตัวตน",
      findings: [
        "**ราวสามในสี่ (73.74%) ใช้แอปหาคู่ในรอบหกเดือนที่ผ่านมา** และส่วนใหญ่ (80.3%) นัดพบผู้ใช้แอปคนอื่นสัปดาห์ละหนึ่งคน",
        "**มากกว่าครึ่ง (54.6%) เคยถูกชักชวนให้ลองใช้สารเสพติดผ่านแอป**",
        "**ในกลุ่มที่เคยใช้สาร มากกว่าสี่ในห้า (82.9%) ได้สารมาจากการแบ่งกันใช้หรือซื้อร่วมกับคนที่รู้จักผ่านแอป** ซึ่งชี้ว่าแอปทำหน้าที่เป็นทั้งช่องทางชักชวนและช่องทางกระจาย",
        "**หนึ่งในสี่ (25.7%) ของผู้ใช้สาร ใช้เป็นประจำอย่างน้อยสัปดาห์ละครั้ง**",
        "**สองในสามของผู้ใช้สารใช้สารระหว่างมีเพศสัมพันธ์** (มีเพียง 34.3% ที่มีเพศสัมพันธ์โดยไม่ใช้สารไปด้วย) และในกลุ่มที่ใช้สารระหว่างมีเพศสัมพันธ์ 31.4% ไม่ได้ใช้ถุงยางอย่างสม่ำเสมอ",
        "**ผู้ใช้สารถึง 77.1% ไม่ได้ตรวจเอชไอวีเลยในรอบหกเดือน**",
        "**ตัวแปรที่ทำนายพฤติกรรมการใช้สารได้ดีที่สุดสองตัวคือ การตัดสินใจตอบรับคำชวน และความรู้สึกพอใจเมื่อได้รับคำชวน** — แบบจำลองถดถอยอธิบายพฤติกรรมได้ราว 60% (R² 0.572–0.591) นั่นคือ**ตัวคำชวนเองมีน้ำหนักมากกว่าที่คิด** ไม่ใช่แค่ทัศนคติต่อสารเสพติดที่มีอยู่เดิม",
      ],
      soWhat:
        "ข้อค้นพบที่ใช้ออกแบบงานสื่อสารได้คือ **จุดแทรกแซงอยู่ที่ “ตอนได้รับคำชวน” ไม่ใช่ตอนตัดสินใจใช้** เพราะตัวแปรที่ทำนายได้ดีที่สุดคือความรู้สึกตอบสนองต่อคำชวน ไม่ใช่ทัศนคติต่อสารเสพติดโดยทั่วไป · และเพราะแอปทำหน้าที่ทั้งชวนและกระจาย งานป้องกันที่รอให้คนเดินเข้ามาหาข้อมูลจึงมาช้ากว่าคำชวนเสมอ · ตัวเลขการไม่ตรวจเอชไอวีที่สูงมากในกลุ่มที่ใช้สารระหว่างมีเพศสัมพันธ์ ชี้ว่าการสื่อสารเรื่องการตรวจกับเรื่องสารเสพติดควรออกแบบไปด้วยกัน ไม่ใช่แยกแคมเปญ",
      caveat:
        "**เป็นค่าสหสัมพันธ์และการทำนายทางสถิติ ไม่ใช่การพิสูจน์ว่าอะไรทำให้เกิดอะไร** · คัดผู้ตอบแบบสะดวกจากเว็บไซต์และช่องทางโซเชียลเฉพาะกลุ่ม ผู้เขียนระบุเองว่าจำกัดความหลากหลายของกลุ่มตัวอย่างและใช้แทนภาพรวมไม่ได้ · เก็บข้อมูลทั้งหมดทางออนไลน์ ไม่มีการสัมภาษณ์ตัวต่อตัว · ถามเรื่องการป้องกันเฉพาะการใช้ถุงยาง ไม่ได้ถามถึงวิธีป้องกันอื่น · **ข้อมูลเก็บต้นปี 2559 ซึ่งผ่านมาเกือบสิบปี** ทั้งแอปที่ใช้กันและทางเลือกในการป้องกันเอชไอวีเปลี่ยนไปมาก ตัวเลขจึงควรใช้อ่านกลไก ไม่ใช่อ้างสถานการณ์ปัจจุบัน · **บทสรุปนี้ตั้งใจไม่ระบุชื่อแอปทั้งห้าที่บทความรายงานไว้** เพราะข้อค้นพบเป็นการวิจารณ์การใช้งานที่เกิดบนแพลตฟอร์มเหล่านั้น และชื่อแอปไม่ได้เพิ่มอะไรให้บทเรียนที่นำไปใช้ได้ · เขียนจากฉบับเต็มใน PubMed Central ซึ่งไม่มีตารางผล ตัวเลขที่ยกมาจึงเป็นเฉพาะที่ระบุไว้ในเนื้อความโดยตรง",
    },
    en: {
      headline: "A channel built for meeting people also carries invitations to use drugs",
      question:
        "Dating apps are a main channel through which men who have sex with men in Thailand find partners. This study asks whether the same channel is also used to invite others to try illicit substances, and how strongly those invitations relate to actual substance use.",
      method:
        "A 21-item online survey run from 9 February to 10 March 2016 — a window chosen to span Valentine's Day, when app use is high. 350 people responded: 200 through eight websites and 150 through five social media channels, recruited by convenience sampling. Analysis used descriptive statistics, Pearson correlations and stepwise multiple regression. The study had research ethics approval from the researchers' institution and collected no identifying information.",
      findings: [
        "**About three in four (73.74%) had used a dating app in the previous six months**, and most (80.3%) met one other app user per week.",
        "**More than half (54.6%) had been urged through an app to try a substance.**",
        "**Among those who had used substances, more than four in five (82.9%) obtained them by sharing with, or buying alongside, people they had met through the apps** — the apps function as a distribution channel, not only as a channel for persuasion.",
        "**One in four substance users (25.7%) used at least weekly.**",
        "**Two-thirds of substance users combined substances with sex** — only 34.3% had sex without using at the same time — and among those who combined the two, 31.4% did not use condoms consistently.",
        "**77.1% of substance users had not tested for HIV at all in the previous six months.**",
        "**The two strongest predictors of substance-use behaviour were the decision to accept an invitation and the satisfaction felt on receiving one** — the regression models account for roughly 60% of the behaviour (R² 0.572–0.591). **The invitation itself carries more weight than expected**, over and above pre-existing attitudes to substances.",
      ],
      soWhat:
        "For communication design the usable finding is that **the point of intervention is the moment an invitation arrives, not the moment of use** — the strongest predictor was how someone responded to being asked, not their general attitude to substances. Because the apps serve both to persuade and to distribute, prevention work that waits for people to come looking for information will always arrive after the invitation has. And the very high proportion of substance users who had not tested for HIV suggests that testing messages and substance messages should be designed together rather than run as separate campaigns.",
      caveat:
        "**These are correlations and statistical predictions, not demonstrations of cause.** Recruitment was by convenience through particular websites and social channels; the authors state this limits the diversity of the sample and that it cannot stand for the wider population. All data was collected online with no face-to-face interviews. Protection was asked about only in terms of condom use, not other methods. **The data was collected in early 2016, nearly a decade ago**; both the apps in use and the available means of HIV prevention have changed substantially, so the figures are best read for the mechanism rather than as a description of the present. **This summary deliberately does not name the five apps the article reports**, because the finding is a criticism of behaviour occurring on those platforms and the names add nothing to the lesson that can be applied. Written from the PubMed Central full text, which does not carry the results tables, so only figures stated directly in the text are quoted here.",
    },
  },
  {
    slug: "pr-evaluation-coefficient",
    illustrationAltTh:
      "ภาพประกอบกระดาษ ลูกบาศก์กระดาษพับสองลูกขนาดเท่ากันเป๊ะ วางอยู่บนปลายทางลาดกระดาษที่ยาวไม่เท่ากัน ลูกบนทางลาดที่ยาวกว่าจึงอยู่สูงกว่า",
    illustrationAltEn:
      "Paper-craft illustration of two identically sized folded paper cubes resting on the raised ends of paper ramps of unequal length, so the cube on the longer ramp sits higher",
    doi: "10.21638/11701/spbu09.2017.210",
    articleLanguage: "ru",
    kind: "argument",
    th: {
      headline: "ผลงานประชาสัมพันธ์เท่ากัน ไม่ได้แปลว่าทำงานได้ดีเท่ากัน — ต้องหารด้วยความง่ายของเรื่องที่ได้มาทำ",
      question:
        "การวัดผลงานประชาสัมพันธ์เป็นเรื่องขัดแย้งกันมานาน เอเจนซีแต่ละเจ้าใช้สูตรของตัวเองซึ่งเป็นจุดขาย จึงต้านมาตรฐานกลาง ส่วนลูกค้าคุ้นกับตัวเลขเดิมอย่าง AVE (การตีมูลค่าข่าวเป็นค่าโฆษณาพื้นที่เท่ากัน) ซึ่งถูกวิจารณ์มานานแต่ยังใช้กันอยู่ครึ่งวงการ บทความถามว่าจะออกแบบระบบวัดผลอย่างไรให้ทั้งสองฝ่ายตกลงกันได้ตั้งแต่ต้น",
      method:
        "เป็นบทความเชิงแนวคิดเชิงวิธีวิทยา ไม่ได้เก็บข้อมูลเชิงประจักษ์ ผู้เขียนทบทวนข้อวิจารณ์ที่มีต่อ AVE และต่อสมมติฐานที่เอเจนซีตั้งขึ้นเอง แล้วเสนอชุดตัวชี้วัดพร้อมตัวอย่างการคำนวณ",
      findings: [
        "**ข้อเสนอหลักคือ “ค่าสัมประสิทธิ์ศักยภาพของประเด็นข่าว” ที่ตกลงกันตั้งแต่ตอนวางแผน** ไม่ใช่ตอนรายงานผล — ประเมินว่าเรื่องที่จะสื่อสารมีแรงดึงดูดสื่อในตัวเองมากแค่ไหน",
        "**ค่านี้กลับทางกับสัญชาตญาณ: ยิ่งประเด็นมีศักยภาพสูง ค่าสัมประสิทธิ์ยิ่งต่ำ** ตัวอย่างที่เสนอคือ ศักยภาพสูง = 0.5 · ปานกลาง = 1.5 · ต่ำ = 2.0 เพราะประเด็นที่แรงอยู่แล้วสร้างข่าวได้เอง ส่วนประเด็นที่จืดต้องใช้แรงของเอเจนซีมากกว่า",
        "**ใช้เป็นตัวคูณกับตัวชี้วัดเชิงปริมาณ** ตัวอย่างในบทความ: ส่งเชิญ 100 ราย ตอบรับ 20 ราย ถ้าประเด็นศักยภาพปานกลาง (1.5) ได้ 20/100 × 1.5 = 0.3 แต่ถ้าประเด็นศักยภาพต่ำ (2.0) ตัวเลขเดียวกันได้ 0.4 — **ผลงานเท่ากันแต่คะแนนต่างกัน เพราะต้นทุนความยากต่างกัน**",
        "**องค์ประกอบที่สองคือรายชื่อสื่อที่จัดลำดับความสำคัญร่วมกันและอธิบายเหตุผลไว้** — สื่อท้องถิ่นอาจสำคัญกว่าฉบับส่วนกลางสำหรับงานระดับภูมิภาค การนับจำนวนข่าวเฉยๆ จึงมองข้ามเรื่องนี้",
        "**องค์ประกอบที่สามคือคุณภาพเนื้อหา ซึ่งเป็นค่าสัมประสิทธิ์แบบ “ลด” เท่านั้น** — ถ้าสารหลักที่ตั้งไว้สี่ข้อ ปรากฏในข่าวเพียงข้อเดียว คุณภาพเนื้อหาไม่เกิน 0.25",
        "**ผู้เขียนระบุเองว่าวิธีนี้ไม่ได้ทำให้การวัดแม่นยำขึ้น** เป้าหมายคือทำให้ความคาดหวังของเอเจนซีกับลูกค้าตรงกัน ไม่ใช่ทำให้การประเมินเป็นภววิสัยมากขึ้น",
      ],
      soWhat:
        "สิ่งที่องค์กรเอาไปใช้ได้ทันทีไม่ใช่ตัวเลขสัมประสิทธิ์ แต่เป็น**ลำดับเวลา** — ตกลงเกณฑ์วัดผลและประเมินความยากของประเด็นให้เสร็จ*ก่อน*เริ่มงาน ไม่ใช่มาเถียงกันตอนส่งรายงาน · ข้อขัดแย้งเรื่องผลงานประชาสัมพันธ์ส่วนใหญ่เกิดจากไม่เคยตั้งเป้าที่วัดได้ร่วมกันตั้งแต่แรก · และการแยก “ผลงานของเอเจนซี” ออกจาก “แรงของประเด็นเอง” เป็นวิธีคิดที่ใช้ได้แม้ไม่ใช้สูตรนี้",
      caveat:
        "**เป็นข้อเสนอเชิงวิธีวิทยา ไม่ใช่ผลการวิจัยเชิงประจักษ์ และเป็นข้อเสนอของผู้เขียน ไม่ใช่จุดยืนของศูนย์ฯ** · ตัวเลขสัมประสิทธิ์ 0.5 / 1.5 / 2.0 เป็น**ตัวอย่างที่ผู้เขียนยกขึ้นเพื่ออธิบายหลักการ** ไม่ได้มาจากการสอบเทียบกับข้อมูลจริง · การจัดว่าประเด็นไหนศักยภาพสูงหรือต่ำยังเป็นดุลพินิจ ซึ่งย้ายจุดที่ต้องตกลงกันไป ไม่ได้ทำให้หายไป · ตัวอย่างประกอบอ้างอิงบริบทสื่อรัสเซีย การนำมาใช้ที่อื่นต้องปรับ · **บทสรุปนี้ตั้งใจไม่ระบุชื่อเอเจนซีสองแห่งที่บทความยกสมมติฐานขึ้นมาวิจารณ์** เพราะข้อวิจารณ์นั้นไม่ได้เพิ่มอะไรให้หลักการที่นำไปใช้ได้",
    },
    en: {
      headline: "The same PR results do not mean the same performance — divide by how easy the story was to begin with",
      question:
        "Measuring public relations performance has long been contested. Agencies use proprietary formulas as a point of differentiation and so resist common standards, while clients fall back on familiar numbers such as AVE — pricing coverage at what the equivalent advertising space would cost — which has been criticised for years yet is still used by around half the industry. The paper asks how an evaluation system could be designed so that both sides agree on it before the work starts.",
      method:
        "A conceptual, methodological paper with no empirical data collection. The authors review the standing criticisms of AVE and of the assumptions agencies build into their own formulas, then propose a set of indicators with worked examples.",
      findings: [
        "**The central proposal is a “news-hook potential coefficient” agreed at the planning stage**, not at the reporting stage — an assessment of how much media pull the story carries on its own.",
        "**The coefficient runs counter to intuition: the higher the potential, the lower the number.** The illustrative values are high potential = 0.5, medium = 1.5, low = 2.0, because a strong story generates coverage by itself while a weak one takes more work from the agency.",
        "**It is applied as a multiplier on quantitative indicators.** The paper's own example: 100 invitations sent and 20 accepted gives 20/100 × 1.5 = 0.3 for a medium-potential story, but 0.4 for a low-potential one. **The same output scores differently because the difficulty differed.**",
        "**The second component is a jointly agreed, argued media list ranked by priority** — a local title may matter more than a national edition for a regional event, which a raw count of placements ignores.",
        "**The third is content quality, and it can only reduce.** If one of four intended key messages appears in the coverage, content quality is no more than 0.25.",
        "**The authors state plainly that this does not make measurement more accurate.** Its purpose is to align the expectations of agency and client, not to make evaluation more objective.",
      ],
      soWhat:
        "What an organisation can use immediately is not the coefficient itself but **the sequence**: settle the measures and assess the difficulty of the story *before* the work begins, rather than arguing about it when the report lands. Most disputes over PR results come from never having set an agreed, measurable target in the first place. And separating “what the agency did” from “how much pull the story had anyway” is a useful way to think even without adopting this formula.",
      caveat:
        "**This is a methodological proposal rather than an empirical finding, and it is the authors' proposal, not a position of the Center.** The coefficients of 0.5 / 1.5 / 2.0 are **illustrative values used to explain the principle**, not calibrated against data. Judging a story as high or low potential remains a matter of judgement, which relocates the point that has to be agreed rather than removing it. The worked examples draw on the Russian media context and would need adapting elsewhere. **This summary deliberately does not name the two agencies whose assumptions the article singles out for criticism**, since those names add nothing to the principle that can be applied.",
    },
  },
  {
    slug: "dengue-media-exposure-longitudinal",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แท่งกระดาษพับสามแท่งยืนเรียงกันสูงขึ้นเป็นบันไดจากซ้ายไปขวา ส่วนแท่งที่สี่ล้มนอนราบอยู่ทางขวา ทุกแท่งทอดเงาแบนยาวไปข้างหน้า",
    illustrationAltEn:
      "Paper-craft illustration of three folded paper columns standing in a staircase that rises from left to right, with a fourth column lying toppled on its side to the right, each casting a long flat shadow forward",
    doi: "10.1016/j.jiph.2017.01.016",
    articleLanguage: "en",
    license: "cc-by-nc-nd",
    localCopy: "dengue-media-exposure-longitudinal.pdf",
    th: {
      headline: "สื่อเรื่องไข้เลือดออกไปถึงคนมากขึ้นทุกปี แต่ความรู้และการกำจัดลูกน้ำทุกสัปดาห์ไม่ได้ตามไปด้วย",
      question:
        "ไทยรณรงค์เรื่องไข้เลือดออกผ่านสื่อมวลชนมาหลายสิบปี งานนี้ถามว่าในช่วงสามปี (2556–2558) ที่มีการระบาดใหญ่ปี 2556 คั่นอยู่ คนไทยเห็นข้อมูลไข้เลือดออกในสื่อบ่อยแค่ไหน เข้าใจเรื่องยุงลายถูกต้องเพียงใด และลงมือกำจัดแหล่งเพาะพันธุ์ทุกสัปดาห์ตามคำแนะนำหรือไม่ — และสามอย่างนี้เคลื่อนไปด้วยกันไหม",
      method:
        "แบบสอบถามสามรอบ ปี 2556, 2557 และ 2558 ใน 25 จังหวัด (24 จังหวัดเลือกจากอัตราป่วยสูงและต่ำ บวกกรุงเทพฯ) ผู้ตอบรวม 7,772 คน (2,323 / 2,842 / 2,607 คน) อายุ 15 ปีขึ้นไปและอ่านออกเขียนได้ คัดแบบบังเอิญ — แต่ละรอบเป็นคนละกลุ่มคน ไม่ได้ติดตามคนเดิม · วัดการเปิดรับสื่อเป็นความถี่ที่เห็นข้อมูลไข้เลือดออก 5 ระดับตั้งแต่ทุกวันจนถึงไม่เคย · วัดความรู้ด้วยข้อถูก-ผิด 3 ข้อ · วัดพฤติกรรมจากความถี่ในการกำจัดแหล่งเพาะพันธุ์ · เปรียบเทียบค่าเฉลี่ยข้ามปีด้วย repeated-measures ANOVA และ t-test",
      findings: [
        "**การเปิดรับสื่อเพิ่มขึ้นทุกปี** คะแนนความถี่เฉลี่ย 2.84 (2556) → 3.31 (2557) → 3.37 (2558) แตกต่างกันอย่างมีนัยสำคัญ (p = 0.001) — ปี 2556 กลุ่มใหญ่สุดเห็นข้อมูลแค่เดือนละครั้ง (32.4%) ปี 2557 กลุ่มใหญ่สุดเห็นมากกว่าสามครั้งต่อสัปดาห์ (35.2%)",
        "**แต่ความรู้ไม่ได้ไต่ตาม** สัดส่วนตอบถูกเฉลี่ย 73.6% → 81.5% → 73.3% ขึ้นปีเดียวแล้วตกกลับ ผู้เขียนอ่านว่าปี 2557 คือความตื่นตัวหลังการระบาดใหญ่ปี 2556 ซึ่งแผ่วลงเมื่อเข้าสู่ช่วงฟื้นตัว",
        "**ความเข้าใจผิดที่ฝังแน่นที่สุดคือเรื่องน้ำ** มีเพียงราวหนึ่งในสาม (33.5% ในปี 2556 · 30.0% ในปี 2558) ที่รู้ว่ายุงลาย*ไม่ได้*วางไข่ในน้ำสกปรกส่งกลิ่น ผู้เขียนคาดว่าคนสับสนระหว่างการควบคุมมาลาเรียกับไข้เลือดออก ขณะที่ข้ออื่นตอบถูกเกิน 90%",
        "**การลงมือทำถอยหลัง** สัดส่วนคนที่กำจัดแหล่งเพาะพันธุ์ทุกสัปดาห์ตามคำแนะนำลดจาก 61.2% (2557) เหลือ 48.3% (2558) ส่วนกลุ่มที่ทำน้อยกว่าสัปดาห์ละครั้งเพิ่มจาก 28.0% เป็น 35.2%",
        "**ผู้เขียนสรุปตรงไปตรงมาว่า แคมเปญสื่อที่มุ่งเพิ่มความตระหนักอย่างเดียวโดยไม่มีการมีส่วนร่วมของชุมชน ไม่ได้ผลในการควบคุมไข้เลือดออก** — ความกังวลเรื่องไข้เลือดออกในไทยมาเป็นช่วง ขึ้นเมื่อภัยใกล้ตัวและซาลงหลังจากนั้น",
      ],
      soWhat:
        "บทเรียนสำหรับคนทำงานสื่อสารสุขภาพคือ **การเข้าถึงไม่ใช่ตัวชี้วัดความสำเร็จ** สื่อไปถึงคนมากขึ้นทุกปีแต่พฤติกรรมกลับถอย · ความเข้าใจผิดเรื่อง “น้ำสกปรก” อยู่รอดมาสองปีทั้งที่การเปิดรับสื่อเพิ่มขึ้น แปลว่าข้อความที่ส่งออกไปอาจไม่ได้ปะทะกับความเข้าใจผิดข้อนี้ตรงๆ — แคมเปญควรตรวจก่อนว่าคนเข้าใจผิดตรงไหนแล้วยิงตรงจุดนั้น · ผู้เขียนเสนอให้รณรงค์ต่อเนื่องตลอดปีแทนการโหมเฉพาะช่วงระบาด ย้ายไปสื่อสังคมออนไลน์ที่คนใช้จริง และผูกงานสื่อเข้ากับโครงการชุมชนที่ทำให้คนลงมือทำ",
      caveat:
        "**ผู้ตอบแต่ละปีเป็นคนละกลุ่ม** ไม่ใช่การติดตามคนเดิม การเปลี่ยนแปลงข้ามปีจึงอาจมาจากองค์ประกอบของกลุ่มตัวอย่างที่ต่างกันด้วย ซึ่งผู้เขียนระบุไว้เอง · คัดผู้ตอบแบบบังเอิญและตัดผู้ที่อ่านหนังสือไม่ออก ซึ่งเป็นกลุ่มที่สื่อเข้าถึงยากที่สุด · **ข้อความรู้สามข้อไม่เหมือนกันทุกปี** สัดส่วนตอบถูกเฉลี่ยจึงเทียบข้ามปีได้อย่างหยาบเท่านั้น · ตัวเลขพฤติกรรมมีเฉพาะปี 2557–2558 · ข้อสรุปว่าแคมเปญ “ไม่ได้ผล” อ่านจากแนวโน้ม ไม่ใช่จากการทดลองเทียบกลุ่ม · สถิติสรุปในบทความระบุว่าปี 2558 มีพฤติกรรมตามคำแนะนำสูงสุด ขณะที่ตารางความถี่แสดงว่าการทำทุกสัปดาห์ลดลง บทสรุปนี้ยกตัวเลขจากตารางความถี่ซึ่งอ่านความหมายได้ตรง · ข้อมูลอายุกว่าสิบปี ภูมิทัศน์สื่อเปลี่ยนไปมากตั้งแต่นั้น",
    },
    en: {
      headline: "Dengue messaging reached more people every year — but knowledge and weekly larva control did not follow",
      question:
        "Thailand has run dengue campaigns through mass media for decades. Across three years (2013–2015) that bracket the large 2013 outbreak, this study asks how often Thai people saw dengue information in the media, how accurately they understood the mosquito, and whether they destroyed breeding sites weekly as recommended — and whether those three things moved together.",
      method:
        "Three survey rounds in 2013, 2014 and 2015 across 25 provinces (24 chosen by high and low incidence, plus Bangkok). 7,772 respondents in total (2,323 / 2,842 / 2,607), aged 15 and over and literate, recruited by accidental sampling — each round was a different set of people, not the same people followed over time. Media exposure was measured as the frequency of seeing dengue information on five levels from every day to never; knowledge with three true/false statements; behaviour as how often respondents eliminated breeding sites. Year-to-year means were compared with repeated-measures ANOVA and t-tests.",
      findings: [
        "**Media exposure rose every year.** The mean frequency score went from 2.84 (2013) to 3.31 (2014) to 3.37 (2015), a significant difference (p = 0.001). In 2013 the largest group saw dengue information only once a month (32.4%); in 2014 the largest group saw it more than three times a week (35.2%).",
        "**Knowledge did not climb with it.** The average share of correct answers went 73.6% → 81.5% → 73.3% — up for one year, then back down. The authors read 2014 as the alert that followed the 2013 outbreak, fading once the recovery period set in.",
        "**The most stubborn misconception concerns water.** Only about a third (33.5% in 2013, 30.0% in 2015) knew that the dengue mosquito does *not* lay eggs in dirty, smelly water; the authors suspect people conflate malaria control with dengue control. Other statements were answered correctly by more than 90%.",
        "**Action went backwards.** The share eliminating breeding sites weekly, as recommended, fell from 61.2% (2014) to 48.3% (2015), while the share doing so less than once a week rose from 28.0% to 35.2%.",
        "**The authors' conclusion is blunt: a media campaign aimed only at raising awareness, without community participation, proved ineffective at controlling dengue.** Concern about dengue in Thailand is episodic — it rises with imminent danger and subsides afterwards.",
      ],
      soWhat:
        "For health communicators the lesson is that **reach is not a success measure**: the media reached more people each year while behaviour slipped. The “dirty water” misconception survived two years of rising exposure, which suggests the messages being sent did not confront that specific error — a campaign should first find out what people actually get wrong, then aim there. The authors recommend a year-round campaign rather than outbreak-driven bursts, a move towards the social media people actually use, and tying media work to community programmes that get people to act.",
      caveat:
        "**Each year's respondents were a different group**, not a panel followed over time, so year-to-year changes may partly reflect differences in who was sampled — the authors say so themselves. Recruitment was accidental and excluded people who cannot read, who are precisely the hardest for media to reach. **The three knowledge statements were not identical across years**, so the average scores are only a rough cross-year comparison. Behaviour figures exist only for 2014–2015. The judgement that the campaign “did not work” is read from trends, not from a controlled comparison. The article's summary statistics describe 2015 as the year of highest recommended behaviour while its frequency table shows weekly practice falling; this summary quotes the frequency table, whose meaning is unambiguous. The data is over a decade old and the media landscape has changed considerably since.",
    },
  },
  {
    slug: "game-influencer-credibility",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แถบกระดาษสามเส้นทอดจากขอบซ้ายมาบรรจบที่ลูกบาศก์กระดาษพับลูกเดียวทางขวา เส้นกลางตึงตรงในแนวนอน เส้นบนตรงแต่เฉียงลงมา ส่วนเส้นล่างหย่อนเป็นคลื่น",
    illustrationAltEn:
      "Paper-craft illustration of three paper ribbons converging from the left edge on a single folded paper cube at the right: the middle ribbon runs straight and taut, the upper one straight at a downward angle, and the lower one sagging in a wave",
    doi: "10.5559/di.31.4.06",
    articleLanguage: "en",
    license: "cc-by-nc",
    localCopy: "game-influencer-credibility.pdf",
    th: {
      headline: "ความน่าเชื่อถือของอินฟลูเอนเซอร์เกมทำนายความตั้งใจซื้อได้ — แต่ถ้าแยกวัดสามองค์ประกอบทีละตัว ผลจะดูเหมือนมีแค่ “ความไว้ใจ” ที่ทำงาน",
      question:
        "ทฤษฎีบอกว่าคนตามอินฟลูเอนเซอร์เพราะน่าเชื่อถือกว่าดารา แต่หลักฐานเชิงประจักษ์ยังปนกันและแทบไม่มีในวงการเกม งานนี้ถามสองข้อ: ความน่าเชื่อถือของแหล่งสาร — ความดึงดูด ความไว้ใจได้ ความเชี่ยวชาญ — ทำนายความตั้งใจซื้อเกมที่อินฟลูเอนเซอร์เล่นได้ไหม และผลที่ขัดกันในงานก่อนหน้าอาจเกิดจากการตั้งแบบจำลองผิดหรือเปล่า",
      method:
        "แบบสอบถามออนไลน์กับผู้ติดตามยูทูบเบอร์สายเกมรายใหญ่ระดับโลก (PewDiePie) จากหลายประเทศ ได้ 414 คำตอบ คัดเหลือ 238 คนที่ผ่านเกณฑ์ (ชาย 77.3% อายุเฉลี่ยราว 21–22 ปี) วัดสามองค์ประกอบของความน่าเชื่อถือด้วยมาตรของ Ohanian ควบคู่กับความตั้งใจซื้อเกมที่อินฟลูเอนเซอร์เล่น วิเคราะห์ด้วยสหสัมพันธ์และแบบจำลองสมการโครงสร้าง (SEM) สองแบบเทียบกัน · ข้อมูลเปิดให้ตรวจสอบบน OSF",
      findings: [
        "**ทั้งสามองค์ประกอบสัมพันธ์กับความตั้งใจซื้อ** ความไว้ใจได้ r = 0.51 · ความดึงดูด 0.46 · ความเชี่ยวชาญ 0.33 และความน่าเชื่อถือรวม 0.54",
        "**แต่พอใส่สามองค์ประกอบเป็นตัวทำนายแยกกันในแบบจำลองเดียว เหลือแค่ความไว้ใจได้ที่มีนัยสำคัญ** อีกสองตัวหายไป (R² = 0.33) — ผู้เขียนชี้ว่านี่คือปัญหา “ตัวควบคุมที่ไม่ควรควบคุม” เพราะสามองค์ประกอบเป็นด้านของสิ่งเดียวกันและซ้อนทับกันสูง การให้แข่งกันเองในสมการจึงกลบผลของกันและกัน",
        "**เมื่อจัดเป็นปัจจัยระดับสองคือ “ความน่าเชื่อถือ” ตัวเดียวที่มีสามด้าน เส้นทางสู่ความตั้งใจซื้อเท่ากับ 0.54 (R² = 0.29) และแบบจำลองเข้ากับข้อมูลได้ดี (CFI 0.955)** — ผู้เขียนเสนอว่าผลที่ขัดกันในงานก่อนหน้าน่าจะมาจากการตั้งแบบจำลองแบบแรก",
        "**ผู้ติดตามไม่ได้ตั้งใจซื้อเกมมากนัก** ค่าเฉลี่ยความตั้งใจซื้ออยู่ราวจุดกลาง (3.14–3.45 จากมาตร 5 ระดับ) แม้จะตามดูเป็นประจำ",
        "**มาตรวัดความเชี่ยวชาญมีความเที่ยงต่ำ** (α = 0.46) ผลด้านนี้จึงอ่านได้ไม่มั่นใจนัก",
      ],
      soWhat:
        "สำหรับแบรนด์ที่จะทำงานกับอินฟลูเอนเซอร์เกม: อย่าเลือกคนจากการติ๊กว่า “ดูดี” หรือ “เก่ง” เป็นข้อๆ — **สิ่งที่ทำงานคือความน่าเชื่อถือโดยรวมที่ผู้ชมรับรู้ ซึ่งมีความไว้ใจได้เป็นแกน** · สำหรับนักวิจัย: ผลที่ดูเหมือน “ความดึงดูดกับความเชี่ยวชาญไม่มีผล” อาจเป็นผลข้างเคียงของสมการ ไม่ใช่ข้อเท็จจริงเกี่ยวกับผู้ชม · และความตั้งใจซื้อที่อยู่ระดับกลางเตือนว่าการตามดูกับการซื้อเป็นคนละเรื่อง",
      caveat:
        "**เป็นการศึกษาความสัมพันธ์ ณ จุดเวลาเดียว** ไม่ได้พิสูจน์ว่าความน่าเชื่อถือทำให้ซื้อ · ผู้ติดตามอินฟลูเอนเซอร์**คนเดียว** และเป็นผู้ที่สมัครใจตอบ ใช้แทนผู้ชมเกมทั่วไปไม่ได้ · ผู้ตอบส่วนใหญ่เป็นชายอายุยี่สิบต้น · ความตั้งใจซื้อวัดจากคำบอก ไม่ได้วัดการซื้อจริง · มาตรวัดความเชี่ยวชาญมีความเที่ยงต่ำ · ระบุชื่อยูทูบเบอร์ไว้เพราะเป็นขอบเขตของงาน บทความไม่ได้วิจารณ์ตัวบุคคล · งานนี้อยู่ในบริบทช่วงโควิด-19 ที่กิจกรรมย้ายไปออนไลน์มากผิดปกติ",
    },
    en: {
      headline: "A gaming influencer's credibility predicts intention to buy — but measure its three parts separately and only “trust” appears to work",
      question:
        "Theory says audiences follow influencers rather than celebrities because influencers are more credible, but the empirical evidence is mixed and almost none of it concerns gaming. The study asks two things: does source credibility — attractiveness, trustworthiness and expertise — predict intention to buy the games an influencer plays, and could the inconsistent results of earlier studies be an artefact of how their models were specified?",
      method:
        "An online survey of followers of one of the world's largest gaming YouTubers (PewDiePie), drawn from many countries. 414 responses were screened down to 238 eligible participants (77.3% men, mean age around 21–22). The three components of credibility were measured with Ohanian's scale, alongside intention to buy games the influencer plays. Analysis used correlations and two competing structural equation models. The data is openly available on OSF.",
      findings: [
        "**All three components correlate with purchase intention**: trustworthiness r = 0.51, attractiveness 0.46, expertise 0.33, and overall credibility 0.54.",
        "**But when the three are entered as separate predictors in one model, only trustworthiness stays significant** and the other two vanish (R² = 0.33). The authors argue this is a “bad controls” problem: the three are facets of one construct and overlap heavily, so making them compete in the same equation masks each other's effect.",
        "**Modelled instead as a single second-order “credibility” factor with three facets, the path to purchase intention is 0.54 (R² = 0.29) and the model fits well (CFI 0.955).** The authors suggest the contradictory findings in earlier work most likely came from the first kind of model.",
        "**Followers do not particularly intend to buy.** Mean purchase intention sat around the neutral point (3.14–3.45 on a 5-point scale) even among people who watch regularly.",
        "**The expertise scale had low reliability** (α = 0.46), so results for that facet should be read with less confidence.",
      ],
      soWhat:
        "For brands working with gaming influencers: do not pick a partner by ticking “looks good” or “is skilled” as separate boxes — **what works is the overall credibility the audience perceives, with trustworthiness at its core**. For researchers: a result that appears to show attractiveness and expertise “don't matter” may be a side-effect of the equation rather than a fact about audiences. And purchase intention hovering at neutral is a reminder that watching and buying are different things.",
      caveat:
        "**A single-time-point correlational study**; it does not show that credibility causes purchase. Followers of **one** influencer, self-selected, cannot stand for gaming audiences in general. Most respondents were men in their early twenties. Purchase intention is self-reported, not observed buying. The expertise measure had low reliability. The YouTuber is named because he is the scope of the study; the article makes no criticism of him. The study is framed by the COVID-19 period, when everyday activity had shifted online to an unusual degree.",
    },
  },
  {
    slug: "elephant-tales-sensory-exhibition",
    illustrationAltTh:
      "ภาพประกอบกระดาษ รูปทรงกระดาษพับห้าแฉกเตี้ยๆ วางอยู่ทางซ้าย ทอดเงาแบนยาวมากไปจนสุดขอบขวาของภาพ ยาวกว่าตัววัตถุหลายเท่า",
    illustrationAltEn:
      "Paper-craft illustration of a low five-pointed folded paper form on the left casting a flat shadow that stretches to the right edge of the frame, many times longer than the object itself",
    doi: "10.1016/j.tsc.2022.101017",
    articleLanguage: "en",
    license: "cc-by-nc-nd",
    localCopy: "elephant-tales-sensory-exhibition.pdf",
    th: {
      headline: "นิทรรศการที่ให้จับ ดม ฟัง และชิม ทำให้คนตระหนักเรื่องช้างมากขึ้น — และยังจำได้อีกปีครึ่งให้หลัง",
      question:
        "การอนุรักษ์ช้างไทยเป็นประเด็นที่สื่อสารยากและถูกมองข้าม งานนี้ทดลองใช้นิทรรศการศิลปะที่ออกแบบให้ใช้ประสาทสัมผัสทั้งห้า แล้วถามว่าความรู้สึกว่า “ได้โต้ตอบ” กับงาน สัมพันธ์กับความตระหนักเรื่องช้างที่เพิ่มขึ้นแค่ไหน และประสบการณ์แบบนี้อยู่ในความทรงจำนานเพียงใด",
      method:
        "จัดนิทรรศการ “The Elephant tales” สองวัน (12–13 มีนาคม 2563) ในคอมมูนิตี้มอลล์ใกล้มหาวิทยาลัย มีผู้ชมราว 300 คน — นอกจากงานภาพ มีประติมากรรมให้สัมผัส 3 ชิ้น กลิ่นป่า เสียงช้างที่บันทึกมา และไอศกรีมรสผลไม้ที่ช้างชอบ · โปรโมตผ่านอินสตาแกรมของอินฟลูเอนเซอร์ 30 คน (ผู้ติดตามเกิน 5,000 คน) · การศึกษาที่ 1: แบบสอบถามหลังชม 231 คน (54.5% เป็นนิสิตนักศึกษาอายุ 19–27 ปี) วัดการรับรู้ปฏิสัมพันธ์และความตระหนักที่เพิ่มขึ้น · การศึกษาที่ 2: สัมภาษณ์ทางโทรศัพท์ผู้ชม 6 คนในเดือนพฤศจิกายน 2564 หรือราวปีครึ่งหลังงาน",
      findings: [
        "**ผู้ชมให้คะแนนทั้งสองอย่างสูงมาก** การรับรู้ปฏิสัมพันธ์เฉลี่ย 4.68 และความตระหนักที่เพิ่มขึ้น 4.66 จากเต็ม 5",
        "**สองอย่างนี้สัมพันธ์กันระดับปานกลางถึงสูง** r = 0.64 (ช่วงความเชื่อมั่น 95% อยู่ที่ 0.56–0.71 · Kendall τ = 0.62) — ยิ่งรู้สึกว่าได้โต้ตอบกับงานมาก ยิ่งรายงานว่าตระหนักเรื่องช้างมากขึ้น",
        "**ปีครึ่งให้หลัง ทุกคนที่สัมภาษณ์ยังจำภาพและรสชาติได้** ห้าในหกจำเสียงช้างได้ แต่มีเพียงหนึ่งในหกที่จำกลิ่นได้",
        "**สิ่งที่ต่างจากนิทรรศการทั่วไปคือสิ่งที่ถูกจำ** ไอศกรีมและประติมากรรมที่จับได้ถูกยกขึ้นมาเองโดยไม่ต้องถามนำ ซึ่งผู้เขียนอธิบายด้วยปรากฏการณ์ von Restorff — สิ่งที่โดดออกจากบริบทถูกจำได้ดีกว่า",
      ],
      soWhat:
        "สำหรับงานสื่อสารประเด็นสิ่งแวดล้อมที่คน “รู้อยู่แล้วแต่ไม่รู้สึก” **การให้ร่างกายมีส่วนร่วม — จับ ชิม ฟัง — สร้างความทรงจำที่อยู่นานกว่าการดูภาพและอ่านป้าย** และต้นทุนไม่สูง งานนี้จัดสองวันในพื้นที่ค้าปลีก · ไมโครอินฟลูเอนเซอร์จำนวนมากดึงคนมาได้ราว 300 คน · ข้อสังเกตที่ใช้ได้ทันที: กลิ่นเป็นประสาทสัมผัสที่จำได้น้อยที่สุด ถ้าจะลงทุนกับมัน ต้องทำให้เด่นกว่านี้มาก",
      caveat:
        "**วัดหลังชมอย่างเดียว ไม่มีการวัดก่อน** ความตระหนักที่ “เพิ่มขึ้น” จึงเป็นการประเมินตนเองของผู้ชม ไม่ใช่การเทียบก่อน-หลัง · ตัวแปรหลักวัดด้วยข้อคำถามข้อเดียว · ผู้ชมมาเองแบบสะดวก และเกินครึ่งเป็นนักศึกษา · การสัมภาษณ์ติดตามมีเพียง 6 คน · **ความตระหนักไม่ใช่การเปลี่ยนพฤติกรรม** งานนี้ไม่ได้วัดว่าใครทำอะไรต่อ · จัดงานกลางเดือนมีนาคม 2563 ก่อนมาตรการล็อกดาวน์โควิด-19 ไม่นาน",
    },
    en: {
      headline: "An exhibition you could touch, smell, hear and taste raised awareness about elephants — and was still remembered a year and a half later",
      question:
        "Conserving the Thai elephant is an issue that has proved hard to promote. This study tried an arts exhibition designed to engage all five senses and asked how strongly visitors' sense of having “interacted” with the work related to their reported increase in awareness — and how long the experience stayed in memory.",
      method:
        "A two-day exhibition, “The Elephant tales”, on 12–13 March 2020 in a community mall near the university, with around 300 visitors. Beyond visual work it included three sculptures to touch, a forest scent, recorded elephant sounds and ice cream flavoured with fruits elephants prefer. It was promoted through 30 Instagram influencers with more than 5,000 followers each. Study 1: a post-visit questionnaire completed by 231 visitors (54.5% students aged 19–27) measuring perceived interactivity and raised awareness. Study 2: telephone interviews with six visitors in November 2021, about a year and a half after the event.",
      findings: [
        "**Visitors rated both very highly**: perceived interactivity averaged 4.68 and raised awareness 4.66 out of 5.",
        "**The two were moderately to strongly related**: r = 0.64 (95% CI 0.56–0.71; Kendall's τ = 0.62). The more interactive visitors found the exhibition, the more they reported their awareness had increased.",
        "**A year and a half later, everyone interviewed still remembered the visuals and the taste.** Five of six recalled the elephant sounds; only one of six recalled the scent.",
        "**What departed from an ordinary exhibition is what stuck.** The ice cream and the touchable sculptures were raised unprompted, which the authors explain through the von Restorff effect — items that stand out from their context are remembered better.",
      ],
      soWhat:
        "For communicating environmental issues that people “know about but don't feel”, **involving the body — touching, tasting, hearing — builds memories that outlast looking at pictures and reading captions**, and the cost is modest: this ran for two days in a retail space. A large group of micro-influencers drew around 300 visitors. One immediately usable observation: smell was the least remembered sense, so if you invest in it, make it far more prominent.",
      caveat:
        "**Measured after the visit only, with no baseline**, so the “increase” in awareness is visitors' own estimate rather than a before–after comparison. The main variables were single-item measures. Visitors were a convenience sample, more than half of them students. The follow-up interviews covered only six people. **Awareness is not behaviour change**; the study did not measure what anyone did afterwards. The event ran in mid-March 2020, shortly before COVID-19 lockdown measures.",
    },
  },
  {
    slug: "anime-thai-gen-z",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แถบกระดาษเส้นบางจำนวนมากกางออกเป็นพัดกว้างทางซ้าย ส่วนทางขวามีลูกบาศก์กระดาษพับสามลูกยืนเกาะกลุ่มชิดกัน",
    illustrationAltEn:
      "Paper-craft illustration of many thin paper strips fanned out loosely on the left and, on the right, three folded paper cubes standing in a tight cluster touching one another",
    doi: "10.1080/23311983.2026.2647143",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "anime-thai-gen-z.pdf",
    th: {
      headline: "อนิเมะเข้ากระแสหลักในเจน Z ไทยผ่านคำบอกต่อของเพื่อนสนิท — ฟีดกว้างทำให้ค้นเจอ แต่ไม่ได้ทำให้ตัดสินใจ",
      question:
        "การชอบอนิเมะเคยทำให้คนไทยถูกมองว่าแปลก แต่ในเจน Z กลายเป็นเรื่องปกติ ข้อมูลไหลผ่านช่องทางไหน ใครที่ทำให้คนเชื่อจริงๆ และชุมชนแฟนทำหน้าที่อะไรต่อตัวตนของคนรุ่นนี้ งานนี้ถามจากมุมของคนสี่กลุ่มที่อยู่คนละตำแหน่งในวงการ",
      method:
        "สัมภาษณ์กึ่งโครงสร้าง 23 คนในกรุงเทพฯ ช่วงมีนาคม–เมษายน 2568 ครั้งละ 35–75 นาที แบ่งเป็นผู้จัดงาน 5 คน (อายุ 26–31 ปี) ผู้ผลิตเนื้อหาและอินฟลูเอนเซอร์ 4 คน (23–26 ปี) แฟนทั่วไป 7 คน (20–24 ปี) และแฟนสายเฉพาะทาง 7 คน (19–25 ปี) วิเคราะห์แก่นเรื่องจากรหัสราว 187 รหัส",
      findings: [
        "**ค้นพบจากฟีด แต่ตัดสินใจจากเพื่อน** 20 จาก 23 คนบอกว่า TikTok คือที่ที่เจอเรื่องใหม่ แต่แทบไม่มีใครเริ่มดูเพราะฟีดอย่างเดียว — 21 จาก 23 คนบอกว่าคำแนะนำจากเพื่อนสนิทคือสิ่งที่ทำให้ลงมือดูจริง",
        "**อินฟลูเอนเซอร์รายใหญ่ถูกระแวง อินฟลูเอนเซอร์สายเฉพาะทางถูกไว้ใจ** ผู้ให้สัมภาษณ์มองคอนเทนต์ที่ดูเป็นการโปรโมตว่าไม่จริงใจ และให้น้ำหนักกับคนที่พิสูจน์ได้ว่ารู้ลึกในแนวนั้นๆ",
        "**คนที่แค่ดูเงียบๆ ก็นับเป็นสมาชิกชุมชน** การ “ซุ่มดู” ไม่ได้ถูกมองว่าเป็นคนนอก และการมีส่วนร่วมหลายระดับได้รับการยอมรับเท่ากัน",
        "**งานอีเวนต์ทำหน้าที่เป็น “ห้องทดลองตัวตน”** — คอสเพลย์และการรวมตัวเปิดพื้นที่ปลอดภัยให้ลองเป็นคนแบบอื่น แต่พื้นที่เดียวกันก็มีแรงกดดันเรื่องมาตรฐานรูปร่างหน้าตาและการใช้จ่าย แฟนบางคนใช้เงินกับงานอดิเรกนี้เกิน 50,000 บาทต่อปี",
        "**ผู้เขียนเสนอกรอบสามอย่างจากข้อมูล** การแพร่ของวัฒนธรรมแบบ “เกิดเอง” ที่ไม่ได้อาศัยแรงผลักของบริษัท · เครือข่ายความไว้วางใจที่มีเพื่อนสนิทอยู่ตรงกลาง · และงานอีเวนต์ในฐานะห้องทดลองตัวตน",
      ],
      soWhat:
        "สำหรับแบรนด์หรือองค์กรที่อยากเข้าถึงเจน Z ผ่านวัฒนธรรมแฟน: **การซื้อพื้นที่บนฟีดทำได้แค่ให้คนเห็น การตัดสินใจเกิดในวงเพื่อน** ซึ่งซื้อไม่ได้แต่เข้าไปสนับสนุนได้ เช่นหนุนครีเอเตอร์สายลึกหรือกลุ่มเฉพาะทางแทนคนดังทั่วไป · คอนเทนต์ที่ดูเป็นการขายทำลายความไว้ใจเร็วมากในชุมชนนี้ · และการออกแบบงานอีเวนต์ควรตระหนักว่าพื้นที่ที่ปลดปล่อยตัวตนก็สร้างแรงกดดันได้ในเวลาเดียวกัน",
      caveat:
        "**เป็นงานเชิงคุณภาพกับคน 23 คนในกรุงเทพฯ** ตัวเลขอย่าง “20 จาก 23” บอกว่าประเด็นนั้นพบบ่อยแค่ไหนในกลุ่มนี้ ไม่ใช่สัดส่วนของเจน Z ไทย · ผู้ให้สัมภาษณ์สมัครใจเข้าร่วม จึงเอนไปทางคนที่ผูกพันกับชุมชนอยู่แล้ว · ไม่มีมุมมองจากฝั่งบริษัทผู้ถือลิขสิทธิ์หรือแพลตฟอร์ม · กรอบแนวคิดสามอย่างเป็นข้อเสนอของผู้เขียนจากข้อมูลชุดนี้ ยังไม่ได้ทดสอบกับกลุ่มอื่น · เก็บข้อมูลต้นปี 2568 ภูมิทัศน์ของแพลตฟอร์มเปลี่ยนเร็ว",
    },
    en: {
      headline: "Anime went mainstream among Thai Gen Z through close friends' word of mouth — the feed makes discoveries, not decisions",
      question:
        "Liking anime once marked a Thai person out as odd; among Generation Z it is now ordinary. Through which channels does information flow, whom do people actually believe, and what does the fan community do for this generation's sense of self? The study asks from the vantage point of four groups positioned differently within the scene.",
      method:
        "Twenty-three semi-structured interviews in Bangkok in March–April 2025, each lasting 35–75 minutes: five event organisers (aged 26–31), four content creators and influencers (23–26), seven casual fans (20–24) and seven niche fans (19–25). Thematic analysis was built from roughly 187 codes.",
      findings: [
        "**Discovered on the feed, decided by friends.** 20 of 23 named TikTok as where they first encounter new titles, yet almost no one starts watching on the strength of the feed alone — 21 of 23 said a close friend's recommendation is what actually gets them to watch.",
        "**Big influencers are viewed with suspicion; niche ones are trusted.** Content that reads as promotion was seen as insincere, while people who demonstrably know a genre deeply carried weight.",
        "**Quiet watchers count as members.** “Lurking” was not read as being an outsider; several levels of participation were treated as equally legitimate.",
        "**Events function as “identity laboratories”** — cosplay and gatherings open a safe space to try being someone else, but the same spaces carry pressure over appearance standards and spending; some fans spend more than 50,000 baht a year on the hobby.",
        "**The authors propose three frameworks from the data**: an “organic” cultural spread that did not depend on corporate push, a trust network with close friends at its centre, and events as identity laboratories.",
      ],
      soWhat:
        "For brands or organisations hoping to reach Gen Z through fan culture: **buying space on the feed only gets you seen; decisions happen among friends**, which cannot be bought but can be supported — for instance by backing deep-knowledge niche creators rather than general celebrities. Content that looks like selling destroys trust quickly in this community. And event design should recognise that a space that frees identity can create pressure at the same time.",
      caveat:
        "**A qualitative study of 23 people in Bangkok.** Figures such as “20 of 23” say how often a theme came up in this group, not what proportion of Thai Gen Z holds a view. Participants volunteered, so the sample leans towards people already attached to the community. No perspective from rights-holders or platforms was included. The three frameworks are the authors' proposals from this dataset and have not been tested elsewhere. Data was collected in early 2025 and platform landscapes shift quickly.",
    },
  },
  {
    slug: "negative-wom-advertising-moderation",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แผ่นกระดาษสี่เหลี่ยมสี่แผ่นเรียงเป็นตาราง 2×2 สามแผ่นวางราบ ส่วนแผ่นหลังขวายกสูงขึ้นบนฐานกระดาษพับเล็กๆ",
    illustrationAltEn:
      "Paper-craft illustration of four square paper tiles in a two-by-two grid, three lying flat and the back-right tile raised clearly higher on a small folded paper plinth",
    doi: "10.1080/23311886.2025.2526800",
    articleLanguage: "en",
    license: "cc-by",
    localCopy: "negative-wom-advertising-moderation.pdf",
    th: {
      headline: "รีวิวเชิงลบที่เทียบกับคู่แข่งไม่ได้ทำร้ายแบรนด์มากกว่ารีวิวลบธรรมดา — และการตอบโต้ด้วยโฆษณาเปรียบเทียบกลับได้ผลแย่ที่สุด",
      question:
        "ผู้บริโภคเจอรีวิวเชิงลบออนไลน์ตลอดเวลา บางรีวิวเทียบกับคู่แข่งตรงๆ บางรีวิวบ่นเฉยๆ งานนี้ถามว่ารีวิวลบแบบเทียบคู่แข่งทำให้ทัศนคติต่อสินค้าแย่กว่าแบบไม่เทียบไหม และโฆษณาที่ให้ข้อมูลคุณสมบัติสินค้า — แบบเทียบคู่แข่งหรือไม่เทียบ — ปรับเปลี่ยนผลนั้นอย่างไร",
      method:
        "การทดลอง 2×2 ระหว่างกลุ่มกับนักศึกษามหาวิทยาลัยในปากีสถาน 100 คน (อายุ 17–26 ปี เฉลี่ย 20 ปี ชายหญิงเท่ากัน) แต่ละคนอ่านรีวิวเชิงลบของหูฟังแฮนด์ฟรียี่ห้อสมมติหนึ่งข้อความ (เทียบคู่แข่ง หรือไม่เทียบ) แล้วดูโฆษณาของยี่ห้อนั้นหนึ่งชิ้น (เทียบคู่แข่ง หรือไม่เทียบ) ก่อนตอบทัศนคติต่อสินค้า 4 ข้อบนมาตร 7 ระดับ (α = 0.90) · คุณสมบัติที่ใช้ในข้อความคัดจากการทดสอบล่วงหน้าสามรอบ (ผู้ตอบ 50–52 คนต่อรอบ) · ผู้เข้าร่วมทุกคนระบุรูปแบบข้อความได้ถูกต้องในการตรวจสอบการจัดกระทำ · วิเคราะห์ด้วย two-way ANOVA · ผ่านการรับรองจริยธรรมเมื่อธันวาคม 2565",
      findings: [
        "**สมมติฐานแรกไม่ได้รับการสนับสนุน** รีวิวลบแบบเทียบคู่แข่งกับแบบไม่เทียบให้ทัศนคติต่อสินค้าไม่ต่างกัน (เฉลี่ย 3.39 กับ 3.61 · F = 0.67 ไม่มีนัยสำคัญ) — ผู้เขียนตีความว่าคนจับที่ “ความลบ” ไม่ได้จับที่โครงสร้างของข้อความ",
        "**โฆษณาปรับเปลี่ยนผลได้จริง (รายงานค่า p = 0.00) แต่ไปคนละทางกับที่ทำนาย** เมื่อรีวิวลบเทียบคู่แข่ง โฆษณาแบบไม่เทียบให้ทัศนคติดีกว่า (3.68 เทียบ 3.11) ไม่ใช่โฆษณาเทียบกลับอย่างที่ผู้เขียนคาด",
        "**คู่ที่ได้ผลดีที่สุดคือรีวิวลบแบบไม่เทียบตามด้วยโฆษณาแบบไม่เทียบ** ทัศนคติเฉลี่ย 5.07 จาก 7 · คู่ที่แย่ที่สุดคือรีวิวลบแบบไม่เทียบตามด้วยโฆษณาเปรียบเทียบ เหลือเพียง 2.15",
        "**ผู้เขียนอธิบายด้วยสามกลไก** อคติต่อข้อมูลเชิงลบที่กลบรูปแบบข้อความ · ภาระการประมวลผลที่หนักกว่าของข้อความเปรียบเทียบ · และบริบทวัฒนธรรมของปากีสถานที่โฆษณาเปรียบเทียบพบไม่บ่อยและมักถูกมองว่าไม่เหมาะสม",
      ],
      soWhat:
        "สำหรับแบรนด์ที่เจอรีวิวลบ: **การตอบโต้ด้วย “เราดีกว่าคู่แข่งตรงไหน” อาจตอกย้ำกรอบเชิงลบแทนที่จะลบล้าง** ในบริบทนี้โฆษณาที่พูดถึงคุณสมบัติของตัวเองอย่างตรงไปตรงมาทำงานได้ดีกว่าอย่างชัดเจน · การมีโฆษณาที่ให้ข้อมูลอยู่ในสายตาผู้บริโภคช่วยเป็นเรื่องเล่าทางเลือกต่อรีวิวลบได้ · และก่อนใช้โฆษณาเปรียบเทียบในตลาดใด ควรตรวจก่อนว่าคนที่นั่นมองรูปแบบนี้ว่าปกติหรือไม่เหมาะสม",
      caveat:
        "**นักศึกษา 100 คนจากมหาวิทยาลัยเดียวในปากีสถาน** ราว 25 คนต่อเงื่อนไข ใช้แทนผู้บริโภคกลุ่มอื่นหรือประเทศอื่นไม่ได้ และผู้เขียนเองระบุว่าผลอาจต่างมากในตลาดที่โฆษณาเปรียบเทียบเป็นเรื่องปกติ · สินค้าเป็นหูฟังแฮนด์ฟรียี่ห้อสมมติ ซึ่งเป็นสินค้าเกี่ยวพันต่ำ · ผู้เข้าร่วมเห็นรีวิวเพียงข้อความเดียวและโฆษณาเพียงชิ้นเดียว ต่างจากชีวิตจริงที่ข้อมูลขัดกันจากหลายแหล่ง · **ข้อความแบบเทียบคู่แข่งยาวกว่าแบบไม่เทียบโดยธรรมชาติ** ผู้เขียนยอมรับว่าความยาวอาจปะปนกับผลของรูปแบบ · ศึกษาเฉพาะข้อมูลเชิงเหตุผล ไม่รวมอารมณ์หรือน้ำเสียงของรีวิว · ทัศนคติทางวัฒนธรรมต่อโฆษณาเปรียบเทียบถูกใช้อธิบายผล แต่ไม่ได้วัดโดยตรง",
    },
    en: {
      headline: "A negative review that compares you with a rival does no more damage than a plain one — and answering it with a comparative ad works worst of all",
      question:
        "Consumers meet negative reviews online constantly; some compare a product directly with a competitor, others simply complain. The study asks whether comparative negative word of mouth hurts attitudes towards a product more than the non-comparative kind, and how attribute-based advertising — itself comparative or not — moderates that effect.",
      method:
        "A 2×2 between-subjects experiment with 100 university students in Pakistan (aged 17–26, mean 20, half men and half women). Each read one negative review of a fictitious hands-free headset brand (comparative or non-comparative), then saw one advertisement for that brand (comparative or non-comparative), and rated attitude towards the product on four 7-point items (α = 0.90). The attributes used in the messages were selected through three pretests of 50–52 respondents each. Every participant correctly identified the message format in the manipulation check. Analysis used two-way ANOVA. Ethics approval was granted in December 2022.",
      findings: [
        "**Hypothesis 1 was not supported.** Comparative and non-comparative negative reviews produced attitudes that did not differ (means 3.39 vs 3.61; F = 0.67, not significant). The authors read this as consumers reacting to the negativity rather than to the structure of the message.",
        "**Advertising did moderate the effect (reported p = 0.00), but in the opposite direction to the prediction.** After a comparative negative review, the non-comparative ad produced the better attitude (3.68 vs 3.11), not the comparative counter-ad the authors expected.",
        "**The best-performing pairing was a non-comparative review followed by a non-comparative ad**, with mean attitude 5.07 out of 7. The worst was a non-comparative review followed by a comparative ad, at 2.15.",
        "**The authors offer three explanations**: negativity bias that swamps message format, the heavier processing load of comparative messages, and Pakistan's cultural context, where comparative advertising is uncommon and often regarded as improper.",
      ],
      soWhat:
        "For a brand facing negative reviews: **answering with “here is why we beat the competitor” may reinforce the negative frame rather than dispel it**. In this setting, an ad that spoke plainly about the product's own attributes performed clearly better. Having an informative ad in front of consumers at all offers an alternative narrative to the review. And before using comparative advertising in any market, check whether people there regard the format as normal or as improper.",
      caveat:
        "**100 students from a single university in Pakistan**, roughly 25 per condition; the results cannot stand for other consumer groups or countries, and the authors themselves note they could differ substantially where comparative advertising is routine. The product was a fictitious hands-free headset brand — a low-involvement product. Participants saw one review and one ad, unlike real life with many conflicting sources. **Comparative messages were naturally longer than non-comparative ones**, and the authors acknowledge that length may be confounded with format. Only cognitive content was studied, not emotional tone. Cultural attitudes to comparative advertising were invoked to explain the results but not measured directly.",
    },
  },
  {
    slug: "covid-official-communication-credibility",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แถบกระดาษสองเส้นทอดขนานกันข้ามภาพ ทั้งคู่ไต่ขึ้นถึงยอดแล้วลาดลง เส้นหนึ่งนำหน้าอีกเส้นเล็กน้อย",
    illustrationAltEn:
      "Paper-craft illustration of two paper ribbons running side by side across the frame, both climbing to a peak and descending together, one slightly ahead of the other",
    doi: "10.1177/00027642221118297",
    articleLanguage: "en",
    th: {
      headline: "คนเชื่อข้อความของรัฐเรื่องโควิดตราบเท่าที่เห็นว่ารัฐคุมโรคได้ — พอมาตรการล้มเหลว ความเชื่อก็หายไปด้วย แม้ข้อความจะจริง",
      question:
        "ระหว่างการระบาดของโควิด-19 ผู้ใช้โซเชียลมีเดียไทยตั้งคำถามกับข้อความทางการอยู่ตลอด งานนี้ถามว่าความเชื่อถือในข้อความของรัฐเคลื่อนไปตามอะไร สัมพันธ์กับความพอใจในผลงานควบคุมโรคหรือไม่ และเมื่อคนไม่เชื่อรัฐ เขาไปเทียบกับแหล่งไหนแล้วถือว่าใครคือผู้ตัดสินความจริง",
      method:
        "วิเคราะห์วาทกรรมบนโซเชียลมีเดีย — โพสต์และคอมเมนต์บนเฟซบุ๊กและทวิตเตอร์ตั้งแต่ต้นปี 2563 ถึงต้นปี 2565 ค้นตามเดือนและแฮชแท็กที่ใช้กันในแต่ละช่วง — ควบคู่กับสัมภาษณ์ผู้เชี่ยวชาญ 50 คน (ผู้ตรวจสอบข้อเท็จจริง คนทำงานข้อมูลสุขภาพ สื่อมวลชน และประชาสัมพันธ์ คัดแบบบอกต่อ) ระหว่างธันวาคม 2564 ถึงกุมภาพันธ์ 2565 · ผู้เขียนสองคนแปลข้อความไทยเป็นอังกฤษเองและมีผู้ช่วยวิจัยตรวจความสอดคล้องของการลงรหัส · ข้อมูลคะแนนนิยมรัฐบาลใช้จากโพลและสื่อเพราะไม่มีชุดข้อมูลระยะยาว · เป็นการวิเคราะห์เชิงคุณภาพ แบ่งตามสี่ช่วงของการระบาด",
      findings: [
        "**ช่วงแรก (มกราคม–มีนาคม 2563) ข้อความทางการสับสน** เมื่อผู้มีอำนาจบอกว่าเป็น “แค่ไข้หวัด” ขณะที่ต่างประเทศประกาศภาวะฉุกเฉิน ผู้ใช้โซเชียลก็หันไปอ้างแนวทางขององค์การอนามัยโลกแทน จนกระทั่งหน่วยงานควบคุมโรคปรับข้อความให้ตรงกับ WHO และตั้งศูนย์บริหารสถานการณ์เป็นเสียงเดียว",
        "**ช่วงล็อกดาวน์สำเร็จ (ถึงกลางปี 2563) ความเชื่อถือสูงสุดและแทบไม่มีใครตั้งคำถาม** ไทยถูกยกเป็นตัวอย่างระดับโลก การแถลงรายวันโดยแพทย์ได้รับความไว้วางใจ และ**คนไทยเลือกเชื่อรัฐเหนือ WHO ในเรื่องหน้ากาก** — สวมหน้ากากถึงราว 90% ปลายมกราคม และเกือบ 95% กลางมีนาคม ทั้งที่ WHO ขณะนั้นยังไม่แนะนำ",
        "**ช่วงวัคซีน (เมษายน–มิถุนายน 2564) ความเชื่อถือพังลงพร้อมกับผลงาน** ระลอกที่สามมีผู้ติดเชื้อใหม่ 36,650 รายในเดือนเมษายนเดือนเดียว มากกว่ายอดสะสมทั้งหมดก่อนหน้า ขณะที่ฉีดครบยังไม่ถึง 1% ของประชากรถึงเดือนพฤษภาคม · คำร้องออนไลน์ให้ปลดผู้รับผิดชอบด้านสาธารณสุขได้ 200,000 ชื่อในไม่กี่วัน · คะแนนนิยมผู้นำรัฐบาลตกจาก 93.3% เหลือ 19% · ประชาชนหยิบข้อมูลเปรียบเทียบประสิทธิภาพวัคซีนของ WHO และ CDC มาโต้ทางเลือกวัคซีนของรัฐ",
        "**ทิศทางกลับหัวกับตะวันตก** ที่ผู้ไม่เชื่อรัฐใช้โซเชียลต่อต้านวัคซีน ในไทยผู้ไม่เชื่อรัฐกลับ**เรียกร้อง**วัคซีนรุ่นใหม่และตำหนิรัฐที่ไม่จัดหา สิ้นปี 2564 คนที่ฉีดแล้วหรือยินดีฉีดสูงถึง 90.2%",
        "**ช่วงตอบโต้ (กรกฎาคม 2564)** รัฐขยายข้อกำหนดฉุกเฉินให้ครอบคลุมข้อมูลที่ “ทำให้หวาดกลัว” แม้เป็นความจริง ซึ่งถูกมองว่าเป็นการปิดปากแทนการแก้ปัญหา · พอการฉีดวัคซีนเข้าที่ปลายปี 2564 ผู้คนก็เหนื่อยกับเรื่องโควิดและวาทกรรมค่อยๆ เงียบไป",
        "**ข้อสรุปของผู้เขียน: ความน่าเชื่อถือเป็นผลของ “การยอมรับผลงาน” ไม่ใช่ของความจริงหรือความโปร่งใส** ตราบที่นโยบายดูได้ผล ข้อความของรัฐไม่ถูกท้าทายและไม่มีใครเห็นว่าแหล่งต่างประเทศเหนือกว่า แต่เมื่อผลงานตก คนจะไปหา “ผู้ตัดสินความจริง” ที่องค์กรสากล",
      ],
      soWhat:
        "สำหรับการสื่อสารในภาวะวิกฤตสุขภาพ: **สร้างความน่าเชื่อถือด้วยการอธิบายไม่พอ ถ้าผลงานที่คนเห็นสวนทาง** งานสื่อสารกับงานปฏิบัติจึงแยกจากกันไม่ได้ · เมื่อความเชื่อถือร่วง คนไม่ได้เลิกหาข้อมูล แต่ย้ายไปแหล่งที่เขาเชื่อกว่า การสื่อสารของรัฐที่**อิงและอ้างองค์กรสากลอย่างเปิดเผย**จึงยืมความน่าเชื่อถือนั้นมาได้ แทนที่จะแข่งกับมัน · และการควบคุมข้อมูลในช่วงที่ความเชื่อถือต่ำอยู่แล้วให้ผลตรงข้าม เพราะถูกอ่านว่าเป็นการยอมรับว่ามีสิ่งที่ต้องปิด",
      caveat:
        "**เป็นการวิเคราะห์เชิงคุณภาพและการตีความ** ไม่ได้รายงานจำนวนโพสต์หรือสัดส่วนความเห็น และ “ความสัมพันธ์” ระหว่างคะแนนนิยมกับความเชื่อถือเป็นการอ่านจากลำดับเหตุการณ์ ไม่ใช่การวัดทางสถิติ · คะแนนนิยมรัฐบาลมาจากโพลและรายงานข่าว ไม่ใช่ข้อมูลที่เก็บเอง · โพสต์ที่ยกมาเป็นตัวอย่างที่ผู้เขียนเลือก และผู้ให้สัมภาษณ์เป็นผู้เชี่ยวชาญด้านข้อมูลกับสื่อ ไม่ใช่ประชาชนทั่วไป · ผู้เขียนเองระบุว่ายังไม่ชัดว่าการตั้งคำถามกับรัฐช่วยให้การสื่อสารความเสี่ยงดีขึ้นจริงหรือไม่ · **บทสรุปนี้ตั้งใจไม่ระบุชื่อบุคคล ยี่ห้อวัคซีน และบริษัทที่บทความยกมาเป็นเป้าของข้อวิจารณ์** เพราะบทเรียนอยู่ที่กลไก ไม่ใช่ตัวบุคคล · บทความสงวนลิขสิทธิ์โดยสำนักพิมพ์ เว็บนี้จึงไม่มีสำเนาให้ดาวน์โหลด",
    },
    en: {
      headline: "People believed official COVID messaging as long as the government seemed to be winning — once measures failed, belief went with them, however true the message",
      question:
        "Throughout the COVID-19 pandemic, Thai social media users kept questioning official messaging. This study asks what trust in government communication actually tracked, whether it moved with approval of the government's disease-control performance, and where people turned — and whom they treated as the final arbiter of truth — once they stopped believing the government.",
      method:
        "Social media discourse analysis of Facebook and Twitter posts and comments from early 2020 to early 2022, searched month by month and through the hashtags in use at each stage, combined with 50 expert interviews (fact-checkers, health-information workers, journalists and public relations practitioners, recruited by snowball sampling) between December 2021 and February 2022. The two authors translated the Thai material into English and a research assistant checked coding agreement. Government approval figures were taken from polls and media reports, since no longitudinal dataset exists. The analysis is qualitative and organised around the four waves of the outbreak.",
      findings: [
        "**In the first stage (January–March 2020) official messaging was confused.** When those in authority described the virus as “just a cold” while other countries declared emergencies, social media users cited the World Health Organization's guidance instead — until the disease-control authority aligned its messaging with WHO and a single command centre was set up to speak with one voice.",
        "**During the successful lockdown (to mid-2020) credibility peaked and the official line was barely questioned.** Thailand was held up as a global example, the daily briefings led by a doctor were trusted, and **on masks Thais chose the government over WHO** — mask-wearing reached about 90% by late January and almost 95% by mid-March, although WHO was not yet recommending it.",
        "**In the vaccination stage (April–June 2021) credibility collapsed along with performance.** The third wave brought 36,650 new cases in April alone, more than the country's entire previous total, while under 1% of the population was fully vaccinated by May. An online petition to remove the official responsible for public health gathered 200,000 signatures in days; the government leader's approval fell from 93.3% to 19%; and the public used WHO and CDC comparisons of vaccine efficacy to contest the government's vaccine choices.",
        "**The direction was the reverse of the West.** Where Western sceptics used social media to oppose vaccines, Thai sceptics of the government **demanded** newer vaccines and blamed the government for not securing them. By the end of 2021, 90.2% had been vaccinated or were willing to be.",
        "**In the response stage (July 2021)** the government widened its emergency decree to cover information that “causes public fear” even when true, which was read as silencing rather than solving. Once vaccination got on track late in 2021, people tired of the subject and the discourse faded.",
        "**The authors' conclusion: credibility was a function of approval, not of truthfulness or transparency.** While policies appeared to work, official messages went unchallenged and foreign sources were not seen as superior; when performance fell, people went looking for an “arbiter of truth” in international bodies.",
      ],
      soWhat:
        "For crisis health communication: **explaining well is not enough to build credibility when the results people can see point the other way** — communication and delivery cannot be separated. When trust falls, people do not stop seeking information; they move to sources they trust more. Official communication that **openly grounds itself in, and cites, international bodies** can borrow that credibility rather than compete with it. And controlling information at a moment when trust is already low backfires, because it reads as an admission that there is something to hide.",
      caveat:
        "**A qualitative, interpretive analysis.** It reports no post counts or proportions of opinion, and the “correlation” between approval and trust is read from the sequence of events, not measured statistically. Approval figures come from polls and news reports rather than the authors' own data. The quoted posts are examples the authors selected, and the interviewees were information and media professionals rather than members of the public. The authors themselves note it remains unclear whether questioning the government actually improves risk communication. **This summary deliberately omits the names of individuals, vaccine brands and companies the article singles out for criticism**, since the lesson lies in the mechanism rather than in who was involved. The publisher retains copyright, so no copy is available for download here.",
    },
  },
  {
    slug: "online-class-cognitive-load-interactive-media",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แถบกระดาษพับจีบแบบหีบเพลงตั้งอยู่ชิ้นเดียว จีบทางซ้ายสูงและคม แล้วค่อยๆ เตี้ยและหย่อนลงไปทางขวาจนเกือบราบ",
    illustrationAltEn:
      "Paper-craft illustration of a single accordion-folded paper strip standing on edge, its pleats tall and crisp at the left and gradually lower and looser toward the right until it lies almost flat",
    doi: "10.1109/tencon58879.2023.10322455",
    articleLanguage: "en",
    th: {
      headline: "ควิซซ้ำๆ ในห้องเรียนออนไลน์ช่วยความจำระยะสั้นจริง แต่ยิ่งซ้ำนักศึกษายิ่งถอย — และการเอาไปใช้ต้องอาศัยการพูดคุย ไม่ใช่การสอบ",
      question:
        "เมื่อโควิด-19 บังคับให้วิชาวางแผนและประเมินการสื่อสารเชิงกลยุทธ์ต้องสอนออนไลน์ทั้งหมด ผู้สอนถามว่าสื่อโต้ตอบ — เว็บนำเสนอ วิดีโอ ควิซแข่งขัน และแบบทดสอบก่อน-หลังรายสัปดาห์ — ช่วยให้นักศึกษาปริญญาโท**จำ**เนื้อหาได้ดีขึ้นและ**นำไปใช้**ในโครงงานได้จริงหรือไม่ และรูปแบบไหนช่วยเรื่องไหน",
      method:
        "การวิจัยกึ่งทดลองกลุ่มเดียววัดก่อน-หลัง กับนักศึกษาปริญญาโทหลักสูตรนานาชาติปีหนึ่ง 23 คน ในวิชา 2800575 ภาคการศึกษาสุดท้ายของปีการศึกษา 2564 สอนผ่าน Zoom ทั้งหมด · เครื่องมือ: ระบบ myCourseVille สำหรับแบบทดสอบก่อนและหลังเรียนรายสัปดาห์ (ปรนัย) · สไลด์บนเว็บ Adobe Spark · วิดีโอบันทึกการสอนบน YouTube · ควิซ Kahoot สองรอบ (ระหว่างสัปดาห์ที่ 1–11 และทวนก่อนสอบปลายภาคด้วยชุดคำถามเดิม) · สัมภาษณ์นักศึกษาตลอด 16 สัปดาห์ · เปรียบเทียบคะแนนด้วย paired t-test · คะแนนควิซทั้งหมดไม่นับเป็นเกรด และแจ้งนักศึกษาไว้ล่วงหน้า",
      findings: [
        "**คะแนนหลังใช้สื่อโต้ตอบสูงกว่าก่อนใช้อย่างมีนัยสำคัญ** เฉลี่ยรวม 6.77 → 8.20 (ต่างกัน 1.42 · t = 5.905 · p < 0.001 · n = 23)",
        "**แต่ดูรายสัปดาห์แล้วไม่ได้ผลทุกสัปดาห์** แบบทดสอบเรื่องการวางแผนสูงขึ้นอย่างมีนัยสำคัญ 5 จาก 11 สัปดาห์ · แบบทดสอบคู่มือการตัดสินใจ 7 จาก 10 ครั้ง ที่เหลือคะแนนขึ้นแต่ไม่ถึงนัยสำคัญ",
        "**ทวนซ้ำแล้วไม่ได้เพิ่มอีก** การทำแบบทดสอบชุดเดิมรอบสองได้ 8.77 เทียบ 8.19 (ไม่มีนัยสำคัญ p = 0.085) · ควิซ Kahoot รอบสองได้ 6.30 เทียบ 6.46 ในรอบแรก (ไม่มีนัยสำคัญ p = 0.422) และ**จำนวนคนที่มาเล่นลดจากราว 10–20 คนเหลือ 4–10 คน** ผู้เขียนอ่านว่าเป็นความเบื่อจากการสอบซ้ำและการที่คะแนนไม่นับเกรด",
        "**นักศึกษาบอกเองว่าควิซช่วยความจำระยะสั้น ไม่ได้ช่วยให้เอาไปใช้ทำโครงงาน** สิ่งที่ช่วยเรื่องการนำไปใช้คือการพูดคุยแลกเปลี่ยนกับผู้สอนและเพื่อนผ่าน Zoom เอกสารประกอบ (ตัวอย่างแผน กรณีศึกษา แนวทางเขียนแผน) และคำแนะนำตรงจากผู้สอน",
        "**นักศึกษาขอสไลด์เป็นไฟล์ PDF ธรรมดามาจดโน้ต** แม้จะมีเว็บนำเสนอที่ฝังวิดีโอและลิงก์ให้ — ผู้เขียนโยงกับทฤษฎีภาระทางปัญญาว่าสื่อที่ดึงดูดเกินไปเบี่ยงทรัพยากรสมองออกจากเนื้อหา",
        "**ข้อเสนอของผู้เขียน** ลดความถี่ของการสอบวัดความจำ ใช้คำถามหลายแบบ รวมควิซไว้แพลตฟอร์มเดียว และเปิดวงพูดคุยสดทุกราว 30 นาทีระหว่างบรรยาย",
      ],
      soWhat:
        "สำหรับผู้สอนออนไลน์: **การทดสอบบ่อยๆ ใช้ได้กับการจำ แต่ผลตอบแทนลดลงเร็ว** ควิซครั้งที่สองแทบไม่เพิ่มอะไรและทำให้คนหายไปครึ่งหนึ่ง · การนำความรู้ไปใช้เกิดจากการสนทนาและงานจริงที่มีผู้สอนเป็นที่ปรึกษา ไม่ใช่จากสื่อที่ดูทันสมัย · และเครื่องมือที่นักศึกษาขอกลับเป็นของพื้นฐาน — ไฟล์ให้จดโน้ตได้ — ซึ่งเตือนว่า “โต้ตอบได้” ไม่ได้แปลว่า “เรียนได้ดีกว่า” เสมอไป",
      caveat:
        "**กลุ่มเดียว 23 คน ไม่มีกลุ่มควบคุม** จึงแยกไม่ได้ว่าคะแนนที่ขึ้นมาจากสื่อโต้ตอบหรือจากการเรียนตามปกติ · **ผู้วิจัยหลักเป็นผู้สอนวิชานี้เอง** ซึ่งบทความระบุเป็นข้อจำกัดและมีผู้ช่วยวิจัยร่วมตรวจ · แบบทดสอบรายสัปดาห์หลายครั้งมีผู้ทำเพียง 10–19 คนจาก 23 เพราะขาดเรียน · คะแนนไม่นับเกรด นักศึกษาจึงอาจไม่ตั้งใจทำ · วัดความจำระยะสั้นเป็นหลัก ไม่ได้วัดการคงอยู่ระยะยาว · ผูกกับแพลตฟอร์มเฉพาะชุดหนึ่ง · ผ่านการพิจารณาจากผู้ประเมินของศูนย์นวัตกรรมการเรียนรู้ จุฬาฯ และได้รับทุนจากศูนย์นั้นร่วมกับศูนย์ฯ นี้ · บทความสงวนลิขสิทธิ์โดย IEEE เว็บนี้จึงไม่มีสำเนาให้ดาวน์โหลด",
    },
    en: {
      headline: "Repeated quizzes in an online class do lift short-term recall, but each repeat loses students — and applying the material takes conversation, not testing",
      question:
        "When COVID-19 forced a strategic communication planning course fully online, the instructors asked whether interactive media — a presentation website, videos, competitive quizzes and weekly pre- and post-tests — actually helped master's students **remember** the content and **apply** it in their projects, and which format helped with which.",
      method:
        "A one-group pre-test/post-test quasi-experiment with 23 first-year students on an international master's programme, in course 2800575 during the final semester of academic year 2021, taught entirely over Zoom. Tools: the myCourseVille learning system for weekly multiple-choice pre- and post-tests; Adobe Spark web presentations; recorded lectures on YouTube; Kahoot quizzes in two rounds (during weeks 1–11 and again before the final exam with the same questions); student interviews across the 16-week term; paired t-tests for score comparisons. Quiz scores did not count towards grades, and students were told so in advance.",
      findings: [
        "**Scores after the interactive media were significantly higher than before**: overall mean 6.77 → 8.20 (a difference of 1.42; t = 5.905; p < 0.001; n = 23).",
        "**Week by week, though, it did not work every time.** Planning tests rose significantly in 5 of 11 weeks; decision-guide tests in 7 of 10. The rest rose without reaching significance.",
        "**Repeating did not add more.** A second run of the same test scored 8.77 against 8.19 (not significant, p = 0.085); the second Kahoot round scored 6.30 against 6.46 in the first (not significant, p = 0.422), and **participation fell from roughly 10–20 students to 4–10**. The authors read this as boredom with repeated testing and the fact that scores did not count.",
        "**Students said themselves that quizzes helped short-term memory, not application to their projects.** What helped application was live exchange with the instructor and classmates on Zoom, supporting documents (sample plans, case studies, plan-writing guidelines) and direct feedback from the instructor.",
        "**Students asked for slides as plain PDF files to take notes on**, even though a web presentation with embedded videos and links was provided — which the authors relate to cognitive load theory: media that attracts too much attention diverts mental resources from the content.",
        "**The authors recommend** fewer memory-focused tests, more varied question types, one platform for quizzes, and a live discussion roughly every 30 minutes of lecture.",
      ],
      soWhat:
        "For online teaching: **frequent testing works for recall, but the returns fall off fast** — the second quiz added almost nothing and lost half the room. Applying knowledge came from conversation and real tasks with the instructor as adviser, not from media that looked sophisticated. And the tool students asked for was the most basic one, a file they could annotate, a reminder that “interactive” does not automatically mean “learned better”.",
      caveat:
        "**A single group of 23 with no control group**, so the score gains cannot be separated from ordinary learning over the term. **The lead researcher was also the course lecturer**, which the article names as a limitation mitigated by research assistants. Many weekly tests were taken by only 10–19 of the 23 students because of absences. Scores did not count, so effort may have been low. The study measured short-term recall rather than long-term retention and is tied to one particular set of platforms. It was reviewed by Chulalongkorn University's Learning Innovation Center, which funded it together with this Center. IEEE retains copyright, so no copy is available for download here.",
    },
  },
  {
    slug: "slow-paced-flight-safety-videos",
    illustrationAltTh:
      "ภาพประกอบกระดาษ แท่งกระดาษพับสองแท่งยืนเคียงกัน แผ่นกระดาษแบนแผ่นเดียววางพาดบนยอดแท่งที่สูงกว่าเหมือนฝา ส่วนแท่งที่เตี้ยกว่าอยู่ห่างจากแผ่นนั้นเห็นช่องว่างชัด",
    illustrationAltEn:
      "Paper-craft illustration of two folded paper columns side by side, a single flat paper sheet resting on top of the taller one like a lid, with a clear gap between that sheet and the shorter column",
    indexUrl: "https://he01.tci-thaijo.org/index.php/AIHD-MU/article/view/251894",
    articleLanguage: "en",
    license: "cc-by-nc",
    pdfUrl: "https://he01.tci-thaijo.org/index.php/AIHD-MU/article/view/251894",
    localCopy: "slow-paced-flight-safety-videos.pdf",
    th: {
      headline: "วิดีโอความปลอดภัยบนเครื่องบินแบบช้าและเรียบง่าย ทำให้วัยรุ่นรู้เรื่องความปลอดภัยเกือบเต็มคะแนน — ไม่ว่าจะเคยขึ้นเครื่องหรือไม่ ชายหรือหญิง",
      question:
        "ผู้โดยสารเพียง 30–40% ตั้งใจฟังการสาธิตความปลอดภัยก่อนเครื่องขึ้น และงานวิจัยเรื่องลักษณะของวิดีโอที่ถ่ายทอดข้อมูลได้ผลยังน้อยและขัดกัน งานนี้ถามว่าวิดีโอที่**ช้าและตัดสิ่งเร้าที่ไม่จำเป็นออก**ถ่ายทอดความรู้ให้ผู้โดยสารมือใหม่วัยรุ่นได้จริงไหม และเพศมีผลต่อประสิทธิภาพนั้นหรือไม่",
      method:
        "การทดลองสองกลุ่มวัดก่อน-หลังในโรงเรียนรัฐแห่งหนึ่งในเมืองใกล้กรุงเทพฯ ที่ไม่มีสนามบิน วันที่ 15 พฤษภาคม 2558 · นักเรียนอาสาสมัคร 128 คน อายุ 14–16 ปี ชายหญิงเท่ากัน — 64 คนเคยขึ้นเครื่องบินแล้ว 64 คนไม่เคย · ทำแบบทดสอบก่อน (ถูก-ผิด 20 ข้อ เรื่องการอพยพ เข็มขัดนิรภัย หน้ากากออกซิเจน เสื้อชูชีพ ผ่านการตรวจโดยผู้เชี่ยวชาญด้านความปลอดภัยการบิน 3 คน) แล้วจับคู่ตามคะแนนและประสบการณ์บินก่อนแบ่งเป็นกลุ่มทดลองกับกลุ่มควบคุมกลุ่มละ 64 · กลุ่มทดลองดูวิดีโอความปลอดภัยยาว 5 นาที 36 วินาที พูดช้ากว่า 140 คำต่อนาที (812 คำ) โดยพนักงานต้อนรับชายหญิงพูดไทยแล้วแปลอังกฤษทีละหัวข้อ ตัดสิ่งรบกวนออก · กลุ่มควบคุมดูคลิปตลกอังกฤษความยาวเท่ากันที่ไม่เกี่ยวกับการบิน · แล้วทำแบบทดสอบชุดเดิมซ้ำ ตามด้วยสนทนากลุ่มสั้นๆ · ขอความยินยอมจากผู้อำนวยการ ครู นักเรียน และผู้ปกครองครบ",
      findings: [
        "**ทุกกลุ่มได้คะแนนรอบสองสูงขึ้น (p < 0.001 ทั้งหมด) แม้แต่กลุ่มที่ดูคลิปตลก** เพราะทำข้อสอบชุดเดิมซ้ำ — แต่ขนาดของผลต่างกันหลายเท่า: กลุ่มควบคุม d = 0.63–0.94 ส่วนกลุ่มที่ดูวิดีโอความปลอดภัย d = 3.16–3.87",
        "**กลุ่มที่ดูวิดีโอได้เกือบเต็ม** เฉลี่ย 19.44 (เคยบิน) และ 19.53 (ไม่เคยบิน) จาก 20 คะแนน เทียบกับ 16.44 และ 15.59 ในกลุ่มควบคุม จากคะแนนก่อนดูราว 14–15 ทั้งสองกลุ่ม — ผู้เขียนระบุว่าเกิด**ผลเพดาน**ในกลุ่มทดลอง",
        "**ประสบการณ์บินไม่ทำให้ต่างกัน** คนที่ไม่เคยขึ้นเครื่องเลยขึ้นจาก 14.06 ไป 19.53 ไม่ต่างจากคนที่เคยบิน",
        "**เพศไม่มีผล** คะแนนหลังดูของชาย 17.81 กับหญิง 17.69 ไม่ต่างกัน (p = 0.73) และก่อนดูก็ไม่ต่าง (p = 0.09)",
        "**ในสนทนากลุ่ม นักเรียนบอกว่าวิดีโอน่าสนใจ ไม่น่าเบื่อ และไม่มีข้อเสนอให้ปรับปรุง** พร้อมอยากรู้เรื่องความปลอดภัยการบินเพิ่ม",
        "**ผู้เขียนแยกสองปัญหาออกจากกัน: “ดึงความสนใจ” กับ “รักษาความสนใจเพื่อถ่ายทอดความรู้”** วิดีโอช้าและเรียบง่ายทำอย่างหลังได้ดี แต่อาจแพ้ในอย่างแรก และเสนอเป็น**สมมติฐานที่ยังไม่ได้ทดสอบ**ว่าควรใช้เนื้อหาเร้าใจดึงคนเข้ามาก่อน แล้วค่อยสอนด้วยจังหวะช้า",
      ],
      soWhat:
        "สำหรับคนทำสื่อสอนเรื่องความปลอดภัยหรือสื่อการเรียนทั่วไป: **จังหวะช้า พูดทีละเรื่อง ไม่มีสิ่งรบกวน ถ่ายทอดความรู้ได้เกือบสมบูรณ์แม้กับคนที่ไม่มีพื้นเลย** และไม่ต้องทำเวอร์ชันแยกตามเพศ · แต่ต้องออกแบบ**ทางเข้า**ให้คนหันมาดูก่อนด้วย เพราะข้อมูลที่ถ่ายทอดได้ดีก็ไร้ค่าถ้าไม่มีใครมอง · ผู้เขียนโยงว่าเกี่ยวกับการเรียนออนไลน์ช่วงโควิดที่ทุกสถาบันต้องพึ่งวิดีโอ",
      caveat:
        "**ทดลองในหอประชุมโรงเรียน ไม่ใช่บนเครื่องบิน** และนักเรียนถูกผู้ใหญ่บอกให้ดู จึงตั้งใจกว่าผู้โดยสารจริงมาก · ไม่มีสิ่งรบกวนอย่างเสียงในห้องโดยสาร · ทดสอบเพียงรูปแบบเดียว (ช้า + สิ่งเร้าน้อย) จึงบอกไม่ได้ว่าแบบเร็วหรือแบบมีสิ่งเร้ามากจะได้ผลต่างกันอย่างไร · ดูครั้งเดียว ขณะที่ผู้โดยสารประจำเห็นซ้ำหลายครั้ง · **วัดความรู้ ไม่ได้วัดว่าจะทำตามจริงเมื่อเกิดเหตุ** · ผลเพดานทำให้แยกความต่างระหว่างผู้ที่ดูวิดีโอไม่ได้ · คัดกลุ่มตัวอย่างแบบสะดวกจากโรงเรียนเดียว · **เก็บข้อมูลปี 2558 ตีพิมพ์ปี 2564** เป็นรายงานสั้น",
    },
    en: {
      headline: "A slow, simple in-flight safety video brought teenagers close to a perfect score — whether or not they had flown before, boys and girls alike",
      question:
        "Only 30–40% of passengers pay attention to the pre-flight safety demonstration, and research on which characteristics make a safety video effective is thin and contradictory. This study asks whether a video that is **slow-paced and stripped of unnecessary stimuli** actually conveys safety knowledge to teenage first-time flyers, and whether gender changes its effectiveness.",
      method:
        "A two-group pre-test/post-test experiment on 15 May 2015 at a government school in a town near Bangkok with no airport. 128 student volunteers aged 14–16, half of them boys — 64 who had flown before and 64 who had not — took a 20-item true/false test on evacuation, seat belts, oxygen masks and life vests (reviewed by three flight-safety experts), and were then matched on score and flight experience before being split into an experimental and a control group of 64 each. The experimental group watched a 5 min 36 s safety video delivered at under 140 words per minute (812 words) by a male and a female flight attendant in Thai with English after each topic, designed to minimise distraction; the control group watched an excerpt of a British comedy of the same length unrelated to flying. Both then repeated the test, followed by brief focus groups. Consent was obtained from the principal, teachers, students and parents.",
      findings: [
        "**Every group scored higher the second time (all p < 0.001), even the comedy group**, because they were retaking the same test — but the size of the effect differed several-fold: d = 0.63–0.94 in the control group against d = 3.16–3.87 in the group that watched the safety video.",
        "**The video group came close to a perfect score**: means of 19.44 (with flight experience) and 19.53 (without) out of 20, against 16.44 and 15.59 in the control group, from pre-test scores of around 14–15 in both. The authors note a **ceiling effect** in the experimental group.",
        "**Prior flying made no difference**: students who had never been on a plane went from 14.06 to 19.53, on a par with those who had.",
        "**Gender made no difference**: post-test means of 17.81 for boys and 17.69 for girls (p = 0.73), with no difference before viewing either (p = 0.09).",
        "**In the focus groups, students found the video interesting rather than boring, offered no suggestions for improvement**, and said they wanted to learn more about flight safety.",
        "**The authors separate two problems: attracting attention and holding it long enough to convey knowledge.** A slow, simple video does the second well but may lose on the first; they propose, as an **untested hypothesis**, opening with engaging material to draw people in and then teaching at a slow pace.",
      ],
      soWhat:
        "For anyone producing safety or instructional video: **a slow pace, one point at a time and no distractions conveyed the knowledge almost completely, even to people with no background at all**, and no separate versions by gender are needed. But the **entry point** — getting people to look in the first place — has to be designed too, because well-delivered information is worth nothing if no one is watching. The authors connect this to the pandemic shift to online teaching, when every institution came to depend on video.",
      caveat:
        "**Run in a school auditorium, not on an aircraft**, with students told by adults to watch, so attention was far higher than among real passengers. There were no distractions such as cabin noise. Only one format was tested (slow pace plus few stimuli), so nothing can be said about fast or stimulus-rich versions. A single viewing, whereas frequent flyers see the briefing repeatedly. **Knowledge was measured, not whether anyone would act on it in an emergency.** The ceiling effect makes differences among video viewers impossible to see. A convenience sample from one school. **Data collected in 2015, published in 2021**, as a short report.",
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
