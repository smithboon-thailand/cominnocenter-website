/**
 * ComInno Center — วิดีโอชุดที่ 7 (ผลงานของ ดร.อิบเตซาม มาซาฮีร์): ใส่ชื่อ คำอธิบาย แท็ก แล้วเผยแพร่ 4 คลิป
 * ต่อยอดจาก ComInnoYouTubeMetadata.gs (5 ก.ย. 2569) — ต่างกันตรงที่ข้อมูลฝังอยู่ในสคริปต์นี้ ไม่ต้องวางไฟล์ CSV
 * และหาคลิปจากเพลย์ลิสต์ "อัปโหลด" ของช่อง (เห็นฉบับร่างทันที) แทน Search ซึ่งอาจยังไม่เห็นคลิปที่เพิ่งอัปโหลด
 *
 * วิธีใช้ (ทำครั้งเดียว)
 *  1. เปิด YouTube Studio ของช่อง Communication Innovation → สร้าง → อัปโหลดวิดีโอ → ลาก 4 ไฟล์เข้าไปพร้อมกัน
 *     ไม่ต้องกรอกอะไร รอจนอัปโหลดเสร็จแล้วปิดหน้าต่างได้เลย (คลิปจะเป็นฉบับร่าง ชื่อคลิป = ชื่อไฟล์
 *     เช่น ComInnoResearch24PakistanMediaLiteracyTH — สคริปต์ใช้ชื่อนี้หาคลิป อย่าเปลี่ยนชื่อไฟล์หรือชื่อคลิป)
 *  2. เปิด https://script.google.com ด้วยบัญชีที่ดูแลช่อง → โปรเจ็กต์ใหม่ → วางโค้ดนี้ทับ Code.gs ทั้งหมด
 *  3. แถบซ้าย "Services" กด + → เลือก "YouTube Data API v3" → Add
 *  4. เลือกฟังก์ชัน run แล้วกด Run → อนุญาตสิทธิ์ (ถ้าช่องเป็น Brand Account ให้เลือกช่อง Communication Innovation
 *     ตอนเลือกบัญชี ไม่ใช่บัญชีส่วนตัว — สคริปต์ตรวจ id ช่องและหยุดทันทีถ้าไม่ใช่ช่องนี้)
 *     รอบแรก DRY_RUN = true → ดู Execution log ว่าเจอครบ 4 คลิป ยังไม่แก้อะไร
 *  5. เปลี่ยน DRY_RUN เป็น false แล้ว Run อีกครั้ง → คลิปได้ชื่อ/คำอธิบาย/แท็ก และเปลี่ยนเป็นสาธารณะ
 *     บรรทัดท้ายของ log คือ id ของทั้ง 4 คลิป คัดลอกส่งให้ Claude เพื่อฝังบนหน้าบทสรุปของเว็บ
 *
 * โควตา YouTube Data API: 10,000 หน่วย/วัน · รอบนี้ใช้ราว 250 หน่วย
 */

const CHANNEL_ID = 'UCHSgYLtnzQSsy3CZh8beDow';   // ช่อง Communication Innovation (ตัวเดียวกับสคริปต์ 5 ก.ย.)
const DRY_RUN = true;                             // true = รายงานอย่างเดียว ไม่แก้อะไร
const CATEGORY_EDUCATION = '27';
const LIMITS = { title: 100, description: 5000, tags: 500 };

const SITE = 'https://www.cominnocenter.com';
const ORG_TH = 'ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน\nคณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย\n' + SITE;
const ORG_EN = 'Center of Excellence in Communication Innovation for the Development of Quality of Life and Sustainability\nFaculty of Communication Arts, Chulalongkorn University\n' + SITE + '/en';

const CITE_PK = 'Mazahir, I., & Yaseen, S. (2025). Media literacy in the age of misinformation: A mixed-methods analysis of adult media literacy across urban and rural areas of Pakistan. International Journal of Media and Information Literacy, 10(1), 40-46. https://doi.org/10.13187/ijmil.2025.1.40';
const CITE_QA = 'Al-khulaifi, A. A. A. T., Boonchutima, S., & Mazahir, I. (2025). Empowering women entrepreneurs in Qatar: The role of social media and media literacy in marketing communication. Media Education (Mediaobrazovanie), 21(1), 3-11. https://doi.org/10.13187/me.2025.1.3';

/** ชื่อคลิปใน Studio (= ชื่อไฟล์ที่อัปโหลด) → ข้อมูลที่จะใส่ */
const META = {
  ComInnoResearch24PakistanMediaLiteracyTH: {
    key: 'pkmedia th', lang: 'th',
    title: 'ผู้ใหญ่ปากีสถานที่ใช้สื่อทุกวัน ดูข่าวลำเอียงออกแค่ 41% | ComInno Center',
    description: [
      'ผู้ใหญ่ในปากีสถานที่ใช้สื่อทุกวัน มีเพียง 41% ที่ดูออกว่าข่าวไหนลำเอียงหรือชวนให้เข้าใจผิด ทีมวิจัยสำรวจแบบพบหน้าผู้ใหญ่ 500 คนจากทั้งสี่แคว้นของปากีสถาน แล้วสัมภาษณ์เชิงลึกอีก 30 คน พบว่าการใช้สื่อได้คล่องกับการดูสื่อเป็น คือคนละทักษะ และการศึกษาคือสิ่งที่ไปด้วยกันกับการรู้เท่าทันสื่อชัดที่สุด',
      'ศูนย์คอมอินโนขอเล่างานของ ดร.อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญของศูนย์ฯ ซึ่งเขียนร่วมกับ Sidrah Yaseen',
      'ข้อควรระวัง: กลุ่มที่สำรวจคือคนที่ใช้สื่ออย่างน้อยวันละชั่วโมง ไม่ใช่ผู้ใหญ่ทั้งประเทศ และเก็บข้อมูลครั้งเดียว จึงบอกได้ว่าอะไรไปด้วยกัน ไม่ใช่อะไรเป็นเหตุ',
      'อ่านบทสรุปฉบับเต็ม\n' + SITE + '/research/adult-media-literacy-pakistan',
      'บทความต้นฉบับ\n' + CITE_PK,
      ORG_TH,
    ].join('\n\n'),
    tags: ['ComInno Center', 'ศูนย์คอมอินโน', 'นิเทศศาสตร์ จุฬาฯ', 'งานวิจัย', 'การรู้เท่าทันสื่อ', 'ข่าวลำเอียง', 'ข่าวปลอม', 'ปากีสถาน', 'media literacy', 'Pakistan'],
  },
  ComInnoResearch24PakistanMediaLiteracyEN: {
    key: 'pkmedia en', lang: 'en',
    title: 'Only 41% of Pakistani adults who use media daily could spot biased news | ComInno Center',
    description: [
      'Among adults in Pakistan who use media every day, only 41% could tell when a news story was biased or misleading. The research team surveyed 500 adults face to face across all four provinces, then interviewed 30 of them in depth. Using media fluently and judging it well turned out to be two different skills, and education was the clearest link with media literacy.',
      'The ComInno Center presents the work of Dr. Ibtesam Mazahir, an invited researcher at the Center, written with Sidrah Yaseen.',
      'One caution: the survey covered people who use media at least an hour a day, not every adult, and it was a single snapshot, so it shows what goes together, not what causes what.',
      'Read the full summary\n' + SITE + '/en/research/adult-media-literacy-pakistan',
      'Original article\n' + CITE_PK,
      ORG_EN,
    ].join('\n\n'),
    tags: ['ComInno Center', 'Chulalongkorn University', 'communication research', 'media literacy', 'misinformation', 'Pakistan', 'adult education', 'digital skills', 'rural women'],
  },
  ComInnoResearch25QatarWomenEntrepreneursTH: {
    key: 'qatarwe th', lang: 'th',
    title: 'โซเชียลมีเดียเปิดตลาดให้ผู้ประกอบการหญิงในกาตาร์ แต่พลาดครั้งเดียวอาจโดนคว่ำบาตร | ComInno Center',
    description: [
      'สำหรับผู้หญิงที่อยากเริ่มธุรกิจในกาตาร์ โซเชียลมีเดียเปิดประตูสู่ตลาดได้ง่ายและถูก แต่ผู้ประกอบการคนหนึ่งเตือนว่า พลาดครั้งเดียวธุรกิจอาจโดนคว่ำบาตร ทีมวิจัยสัมภาษณ์เชิงลึกผู้ประกอบการหญิงในกาตาร์ 10 คน พบว่าสิ่งที่เปราะที่สุดไม่ใช่การโพสต์ แต่คือการรับมือคำวิจารณ์และการดูแลชื่อเสียง',
      'ศูนย์คอมอินโนขอเล่างานของ ไอชา อัลคุไลฟี (Aisha Al-khulaifi) และ ดร.อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญของศูนย์ฯ งานนี้ต่อยอดจากผลงานวิจัยของนิสิตคณะนิเทศศาสตร์ โดยมีอาจารย์ของศูนย์คอมอินโนเป็นที่ปรึกษา',
      'ข้อควรระวัง: สัมภาษณ์ 10 คนในประเทศเดียว ส่วนใหญ่เป็นคนรุ่นใหม่ และแม้การรู้เท่าทันสื่อจะอยู่ในชื่อเรื่อง แต่ผลการสัมภาษณ์ไม่ได้แยกเรื่องนี้ออกมาโดยตรง',
      'อ่านบทสรุปฉบับเต็ม\n' + SITE + '/research/women-entrepreneurs-qatar-social-media',
      'บทความต้นฉบับ\n' + CITE_QA,
      ORG_TH,
    ].join('\n\n'),
    tags: ['ComInno Center', 'ศูนย์คอมอินโน', 'นิเทศศาสตร์ จุฬาฯ', 'งานวิจัย', 'ผู้ประกอบการหญิง', 'กาตาร์', 'โซเชียลมีเดีย', 'การตลาดออนไลน์', 'ชื่อเสียงแบรนด์', 'women entrepreneurs'],
  },
  ComInnoResearch25QatarWomenEntrepreneursEN: {
    key: 'qatarwe en', lang: 'en',
    title: "Qatar's women entrepreneurs: an easy way in, but one mistake can mean a boycott | ComInno Center",
    description: [
      'For women starting a business in Qatar, social media opens the door to the market, easily and cheaply, but as one entrepreneur warned, a single mistake can get a business boycotted. The research team interviewed ten women entrepreneurs in Qatar in depth and found that the hard part was not posting, but handling criticism and protecting a reputation.',
      "The ComInno Center presents the work of Aisha Al-khulaifi and Dr. Ibtesam Mazahir, an invited researcher at the Center. The study grew out of a student's research project at the Faculty of Communication Arts, supervised by a ComInno Center lecturer.",
      "One caution: ten interviews in one country, mostly with younger entrepreneurs, and although media literacy is in the title, the interview results don't single it out directly.",
      'Read the full summary\n' + SITE + '/en/research/women-entrepreneurs-qatar-social-media',
      'Original article\n' + CITE_QA,
      ORG_EN,
    ].join('\n\n'),
    tags: ['ComInno Center', 'Chulalongkorn University', 'communication research', 'women entrepreneurs', 'Qatar', 'social media marketing', 'online reputation', 'media literacy', 'entrepreneurship'],
  },
};

function run() {
  checkMeta_();
  const channel = assertChannel_();
  const found = findUploads_();
  Logger.log('ช่อง: %s (%s) · %s', channel.snippet.title, channel.id, DRY_RUN ? 'ทดลอง (ไม่แก้)' : 'แก้จริง');

  const results = [];
  Object.keys(META).forEach(studio => {
    const v = found[studio];
    const m = META[studio];
    if (!v) { Logger.log('✗ ไม่เจอคลิปชื่อ %s — อัปโหลดแล้วหรือยัง หรือชื่อคลิปถูกแก้ใน Studio', studio); return; }
    if (v.dupes > 1) Logger.log('⚠ %s มี %s คลิปชื่อนี้ — ใช้ตัวล่าสุด (%s) ลบตัวที่เหลือใน Studio ได้', studio, v.dupes, v.id);
    Logger.log('%s %s (%s · %s) → "%s"', DRY_RUN ? '[ทดลอง]' : '[แก้]', studio, v.id, v.privacy, m.title);
    if (!DRY_RUN) {
      YouTube.Videos.update({
        id: v.id,
        snippet: { title: m.title, description: m.description, tags: m.tags, categoryId: CATEGORY_EDUCATION,
                   defaultLanguage: m.lang, defaultAudioLanguage: m.lang },
        status: { privacyStatus: 'public', selfDeclaredMadeForKids: false, embeddable: true },
      }, 'snippet,status');
      Utilities.sleep(300);
    }
    results.push(m.key + ' ' + v.id);
  });

  Logger.log('เจอ %s จาก 4 คลิป%s', results.length, DRY_RUN ? ' — ถ้าครบ เปลี่ยน DRY_RUN เป็น false แล้ว Run อีกครั้ง' : ' — เผยแพร่แล้ว');
  Logger.log('ส่งให้ Claude:\n' + results.join('\n'));
}

// ---------- helpers ----------

function checkMeta_() {
  Object.keys(META).forEach(k => {
    const m = META[k];
    if (m.title.length > LIMITS.title) throw new Error(k + ': ชื่อยาว ' + m.title.length + ' เกิน ' + LIMITS.title);
    if (m.description.length > LIMITS.description) throw new Error(k + ': คำอธิบายยาวเกิน ' + LIMITS.description);
    if (/[<>]/.test(m.description)) throw new Error(k + ': คำอธิบายมี < หรือ > ซึ่ง YouTube ไม่รับ');
    if (m.tags.join(',').length > LIMITS.tags) throw new Error(k + ': แท็กรวมยาวเกิน ' + LIMITS.tags);
  });
}

function assertChannel_() {
  const res = YouTube.Channels.list('id,snippet,contentDetails', { mine: true });
  const ch = res.items && res.items[0];
  if (!ch || ch.id !== CHANNEL_ID) {
    throw new Error('บัญชีที่รันอยู่ไม่ใช่ช่อง ' + CHANNEL_ID +
      (ch ? ' (ได้ ' + ch.id + ' — ' + ch.snippet.title + ')' : ' (ไม่พบช่อง)') +
      ' — ถอนสิทธิ์แล้วรันใหม่ โดยเลือกช่อง Communication Innovation ตอนอนุญาต');
  }
  return ch;
}

/** คลิปล่าสุด 100 ตัวในเพลย์ลิสต์ "อัปโหลด" ของช่อง (รวมฉบับร่าง/ส่วนตัว) → { ชื่อคลิป: { id, privacy, dupes } } */
function findUploads_() {
  const uploads = assertChannel_().contentDetails.relatedPlaylists.uploads;
  const ids = [];
  let pageToken;
  do {
    const res = YouTube.PlaylistItems.list('contentDetails', { playlistId: uploads, maxResults: 50, pageToken: pageToken });
    (res.items || []).forEach(it => ids.push(it.contentDetails.videoId));
    pageToken = res.nextPageToken;
  } while (pageToken && ids.length < 100);
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const res = YouTube.Videos.list('snippet,status', { id: ids.slice(i, i + 50).join(',') });
    (res.items || []).forEach(v => {
      const t = v.snippet.title.trim();
      if (!META[t]) return;
      if (!out[t]) out[t] = { id: v.id, privacy: v.status.privacyStatus, dupes: 0, at: v.snippet.publishedAt };
      out[t].dupes++;
      if (v.snippet.publishedAt > out[t].at) { out[t].id = v.id; out[t].privacy = v.status.privacyStatus; out[t].at = v.snippet.publishedAt; }
    });
  }
  return out;
}
