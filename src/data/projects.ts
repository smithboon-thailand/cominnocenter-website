export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  outcome: string;
  sdg: string;
  sdgLabel: string;
  image: string;
  alt: string;
  challenge: string;
  approach: string;
  impact: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "chula-zero-waste",
    title: "Chula Zero Waste",
    titleEn: "Chula Zero Waste",
    outcome:
      "ต้นแบบแคมเปญลดขยะในมหาวิทยาลัยที่นำโดยนักศึกษา เน้นสนุก เข้าใจง่าย และนำไปใช้ได้จริง",
    sdg: "SDG 12",
    sdgLabel: "Responsible Consumption",
    image:
      "https://static.wixstatic.com/media/25218b_0cbe70a072264848be104927c800cdc2~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/25218b_0cbe70a072264848be104927c800cdc2~mv2.jpg",
    alt: "แคมเปญ Chula Zero Waste ต้นแบบการสื่อสารเพื่อลดขยะในจุฬาลงกรณ์มหาวิทยาลัย โดย ComInnoCenter",
    challenge:
      "จุฬาลงกรณ์มหาวิทยาลัยมีเป้าหมายลดขยะภายในมหาวิทยาลัยอย่างน้อย 30% ภายในปี 2021 ภายใต้แผน Chula Zero Waste (2017–2021) ซึ่งมี 6 โปรแกรม และ 18 โครงการ ต้องการแนวทางการสื่อสารที่ทำให้นักศึกษาและชุมชนในมหาวิทยาลัยมีส่วนร่วมได้จริง",
    approach:
      "ออกแบบต้นแบบแคมเปญลดขยะที่นำโดยนักศึกษา เน้นความสนุก ความสดใส ความเรียบง่าย และการนำไปใช้ได้จริง ร่วมกับสถาบันวิจัยสิ่งแวดล้อม สำนักงานบริหารระบบกายภาพ และเครือข่ายภายในจุฬาฯ",
    impact:
      "ได้ต้นแบบแคมเปญที่สื่อสารเรื่องการลดขยะได้อย่างเข้าใจง่าย และเปิดโอกาสให้นักศึกษานำไปขับเคลื่อนต่อในบริบทของมหาวิทยาลัย",
    sourceUrl: "https://www.cominnocenter.com/post/chula-zero-waste",
  },
  {
    slug: "nbtc-encyclopedia",
    title: "สารานุกรม กสทช.",
    titleEn: "NBTC Encyclopedia",
    outcome:
      "สารานุกรมที่อธิบายประเด็นสำคัญด้วยภาษาเข้าใจง่าย พร้อมภาพประกอบและวิดีโอสำหรับคนรุ่นใหม่",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image:
      "https://static.wixstatic.com/media/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg",
    alt: "โครงการสารานุกรม กสทช. โดยศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาฯ",
    challenge:
      "เนื้อหาด้านกิจการโทรคมนาคมและประเด็นที่เกี่ยวข้องมักซับซ้อนและเข้าถึงยากสำหรับคนรุ่นใหม่",
    approach:
      "รวบรวมความคิดเห็นจากทั้งคนรุ่นใหม่และผู้ใหญ่ แล้วออกแบบสารานุกรมสมัยใหม่ที่เชื่อมโยงประเด็น อธิบายด้วยภาษาเข้าใจง่าย มีภาพประกอบน่าสนใจ และมีวิดีโอสำหรับผู้ที่ชอบรับชม",
    impact:
      "ได้สื่อความรู้ที่อ่านง่าย เข้าถึงกลุ่มเป้าหมายได้กว้างขึ้น และรองรับทั้งการอ่านและการรับชม",
    sourceUrl: "https://www.cominnocenter.com/post/nbtc-encyclopedia",
  },
  {
    slug: "nia-100-faces",
    title: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    outcome:
      "รวบรวม 100 นักนวัตกรรมในระยะ 3 ปี นำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR",
    sdg: "SDG 9",
    sdgLabel: "Industry & Innovation",
    image:
      "https://static.wixstatic.com/media/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_4a7a9b23585c4d02bcc3566be8aadec2~mv2.jpg",
    alt: "โครงการ NIA 100 FACES นำเสนอนักนวัตกรรมผ่านสื่อหลากหลายรูปแบบ โดย ComInnoCenter",
    challenge:
      "ต้องการนำเสนอเรื่องราวของนักนวัตกรรมให้สร้างแรงบันดาลใจ และเข้าถึงผู้คนผ่านหลายช่องทาง",
    approach:
      "รวบรวม 100 นักนวัตกรรมที่สร้างแรงบันดาลใจด้านการคิดสร้างสรรค์ แล้วนำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR",
    impact:
      "สร้างชุดสื่อหลายแพลตฟอร์มที่ถ่ายทอดเรื่องราวของนักนวัตกรรมได้อย่างกว้างขวางและน่าสนใจ",
    sourceUrl: "https://www.cominnocenter.com/post/nia-100-faces",
  },
  {
    slug: "pid-thong-lang-phra-foundation",
    title: "มูลนิธิปิดทองหลังพระ",
    titleEn: "Pid Thong Lang Phra Foundation",
    outcome:
      "อบรมการผลิตสื่อออนไลน์ เทคนิคการโน้มน้าวใจ และการพัฒนาบุคลิกภาพ ให้กับบุคลากรมูลนิธิ",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image:
      "https://static.wixstatic.com/media/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_be1e0d6f1491498a97ae09afc2d11e44~mv2.jpg",
    alt: "การอบรมผลิตสื่อและพัฒนาศักยภาพบุคลากรมูลนิธิปิดทองหลังพระ โดย ComInnoCenter",
    challenge:
      "บุคลากรมูลนิธิต้องการทักษะการผลิตสื่อออนไลน์ การสื่อสารเพื่อโน้มน้าวใจ และการพัฒนาบุคลิกภาพ เพื่อขับเคลื่อนงานเพื่อสังคม",
    approach:
      "จัดอบรมโดยผู้เชี่ยวชาญ ครอบคลุม 3 ด้าน ได้แก่ การผลิตสื่อออนไลน์อย่างง่ายด้วย PowerPoint เทคนิคการโน้มน้าวผู้ฟัง และการพัฒนาบุคลิกภาพ",
    impact:
      "เสริมศักยภาพบุคลากรมูลนิธิให้สื่อสารและผลิตสื่อเพื่อขับเคลื่อนสังคมได้มีประสิทธิภาพขึ้น",
    sourceUrl: "https://www.cominnocenter.com/post/pid-thong-lang-phra-foundation",
  },
  {
    slug: "seeds-for-cu-sustainability",
    title: "Seeds for CU Sustainability",
    titleEn: "Seeds for CU Sustainability",
    outcome:
      "ผลิตวิดีโอนำเสนอโครงการความยั่งยืน ทั้งในกรุงเทพฯ และต่างจังหวัด พร้อมภาพมุมสูงและสัมภาษณ์ผู้มีส่วนเกี่ยวข้อง",
    sdg: "SDG 11",
    sdgLabel: "Sustainable Cities",
    image:
      "https://static.wixstatic.com/media/25218b_ce31058ea3674498810d31bf12729eac~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_ce31058ea3674498810d31bf12729eac~mv2.jpg",
    alt: "วิดีโอโครงการ Seeds for CU Sustainability โดยศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร",
    challenge:
      "ต้องการสื่อวิดีโอคุณภาพสูงเพื่อนำเสนอความมุ่งมั่นด้านความยั่งยืนของโครงการในหลายพื้นที่",
    approach:
      "ผลิตวิดีโอตั้งแต่ pre-production ถึง post-production มีการประชุมรายสัปดาห์เพื่อรับฟีดแบ็กจากลูกค้า ใช้ภาพมุมสูงและสัมภาษณ์ผู้มีส่วนเกี่ยวข้อง",
    impact:
      "ได้วิดีโอนำเสนอที่สะท้อนพันธกิจด้านความยั่งยืน และสื่อสารเรื่องราวของโครงการได้อย่างชัดเจน",
    sourceUrl: "https://www.cominnocenter.com/post/seeds-for-cu-sustainability",
  },
  {
    slug: "department-of-disease-control",
    title: "กรมควบคุมโรค",
    titleEn: "Department of Disease Control",
    outcome:
      "เวิร์กช็อปออกแบบกระบวนการบริการ เน้นหลักการสื่อสารตรงกลุ่มเป้าหมายและเทคนิคผลิตสื่อสมัยใหม่",
    sdg: "SDG 3",
    sdgLabel: "Good Health",
    image:
      "https://static.wixstatic.com/media/25218b_78275b5fdfd343f2a4f5d7472302005b~mv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_78275b5fdfd343f2a4f5d7472302005b~mv2.jpg",
    alt: "เวิร์กช็อปการสื่อสารและออกแบบบริการให้กรมควบคุมโรค โดย ComInnoCenter",
    challenge:
      "องค์กรต้องการเสริมความเข้าใจเรื่องการสื่อสารตรงกลุ่มเป้าหมาย และการผลิตสื่อสมัยใหม่ เพื่อสร้างความสัมพันธ์และภาพลักษณ์องค์กร",
    approach:
      "จัดเวิร์กช็อปออกแบบกระบวนการบริการ เน้นหลักการสื่อสารตรงกลุ่มเป้าหมายและเทคนิคการผลิตสื่อสมัยใหม่",
    impact:
      "ผู้เข้าร่วมได้แนวทางสื่อสารและออกแบบบริการที่ช่วยสร้างความเข้าใจภายในองค์กรและยกระดับภาพลักษณ์",
    sourceUrl: "https://www.cominnocenter.com/post/department-of-disease-control",
  },
  {
    slug: "international-labour-organization",
    title: "องค์การแรงงานระหว่างประเทศ",
    titleEn: "International Labour Organization",
    outcome: "อบรมด้านนวัตกรรมการสื่อสารร่วมกับ ILO เพื่อเสริมศักยภาพการสื่อสารเชิงองค์กร",
    sdg: "SDG 8",
    sdgLabel: "Decent Work",
    image:
      "https://static.wixstatic.com/media/25218b_bfb45e4c56094da99ba6feba3b842fca~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/dsc00677jpg.jpg",
    alt: "การอบรมร่วมกับองค์การแรงงานระหว่างประเทศ (ILO) โดย ComInnoCenter",
    challenge:
      "องค์กรระหว่างประเทศต้องการยกระดับทักษะการสื่อสารของบุคลากรให้สอดคล้องกับบริบทการทำงานสมัยใหม่",
    approach:
      "ออกแบบและจัดอบรมด้านนวัตกรรมการสื่อสารให้สอดคล้องกับภารกิจและกลุ่มเป้าหมายของ ILO",
    impact:
      "เสริมศักยภาพบุคลากรด้านสื่อสาร และสร้างแนวทางที่นำไปใช้ในงานจริงได้",
    sourceUrl: "https://www.cominnocenter.com/post/international-labour-organization",
  },
  {
    slug: "asean-university-network",
    title: "ASEAN University Network",
    titleEn: "ASEAN University Network",
    outcome: "อบรมและแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารในเครือข่ายมหาวิทยาลัยอาเซียน",
    sdg: "SDG 4",
    sdgLabel: "Quality Education",
    image:
      "https://static.wixstatic.com/media/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg/v1/fit/w_1200,h_800,al_c/25218b_3012f8f955424b788d79a19cd91abd99%7Emv2.jpg",
    alt: "ความร่วมมือด้านอบรมกับ ASEAN University Network โดย ComInnoCenter",
    challenge:
      "เครือข่ายมหาวิทยาลัยในอาเซียนต้องการพื้นที่แลกเปลี่ยนและพัฒนาศักยภาพด้านการสื่อสาร",
    approach:
      "จัดอบรมและกิจกรรมแลกเปลี่ยนความรู้ด้านนวัตกรรมการสื่อสารภายใต้เครือข่าย ASEAN University Network",
    impact:
      "สร้างการเรียนรู้ร่วมกันระหว่างสถาบัน และขยายเครือข่ายความร่วมมือในภูมิภาค",
    sourceUrl: "https://www.cominnocenter.com/post/asean-university-network",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
