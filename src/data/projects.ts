export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  outcome: string;
  sdg: string;
  sdgLabel: string;
  /** Cover image for cards / listing */
  image: string;
  alt: string;
  /** Full gallery from original post */
  gallery: ProjectImage[];
  challenge: string;
  approach: string;
  impact: string;
  sourceUrl: string;
};

const wix = (id: string, ext: "jpg" | "png" = "jpg") =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_1200,h_800,al_c,q_85/${id}~mv2.${ext}`;

export const projects: Project[] = [
  {
    slug: "chula-zero-waste",
    title: "Chula Zero Waste",
    titleEn: "Chula Zero Waste",
    outcome:
      "ต้นแบบแคมเปญลดขยะในมหาวิทยาลัยที่นำโดยนักศึกษา เน้นสนุก เข้าใจง่าย และนำไปใช้ได้จริง",
    sdg: "SDG 12",
    sdgLabel: "Responsible Consumption",
    image: wix("25218b_0cbe70a072264848be104927c800cdc2"),
    alt: "แคมเปญ Chula Zero Waste — ป้ายและถังขยะในพื้นที่จุฬาลงกรณ์มหาวิทยาลัย",
    gallery: [
      {
        src: wix("25218b_0cbe70a072264848be104927c800cdc2"),
        alt: "ป้าย Chula Zero Waste ในพื้นที่มหาวิทยาลัย",
      },
      {
        src: wix("25218b_e61a0df2ac404c42b60e2f743ba1922f"),
        alt: "ภาพกิจกรรมแคมเปญ Chula Zero Waste",
      },
      {
        src: wix("25218b_22bfdef3302f4991a2bd11ef81819cff"),
        alt: "ภาพจากแคมเปญลดขยะ Chula Zero Waste",
      },
      {
        src: wix("25218b_b34abe46ff40476b93affd7f29ec76ec"),
        alt: "ภาพกิจกรรมนักศึกษาในโครงการ Chula Zero Waste",
      },
      {
        src: wix("25218b_99f4b08cc5614fe28fcf24459fc3821e"),
        alt: "ภาพสื่อแคมเปญ Chula Zero Waste",
      },
      {
        src: wix("25218b_3848646dca9c4fc792552222d59b75f1"),
        alt: "ภาพประกอบโครงการ Chula Zero Waste",
      },
      {
        src: wix("25218b_435a1f9db0584d5b8edeb85c6eaff1b6", "png"),
        alt: "สื่อออกแบบแคมเปญ Chula Zero Waste",
      },
      {
        src: wix("25218b_eb46de9e4bc44c60b9f562d87b4ccd2e", "png"),
        alt: "สื่อกราฟิกแคมเปญ Chula Zero Waste",
      },
      {
        src: wix("25218b_c80bd0576b1e437cad527055772fcf24", "png"),
        alt: "สื่อรณรงค์ Chula Zero Waste",
      },
      {
        src: wix("25218b_7b09e2c8993f4268851844c1be7312b1", "png"),
        alt: "โปสเตอร์แคมเปญ Chula Zero Waste",
      },
      {
        src: wix("25218b_8af411897da3411fa74f6b2f49f9d238", "png"),
        alt: "สื่อออกแบบแคมเปญลดขยะ",
      },
      {
        src: wix("25218b_4449dc75285e439782314b410eeded34", "png"),
        alt: "สื่อแคมเปญ Chula Zero Waste",
      },
    ],
    challenge:
      "จุฬาลงกรณ์มหาวิทยาลัยมีเป้าหมายลดขยะภายในมหาวิทยาลัยอย่างน้อย 30% ภายในปี 2021 ภายใต้แผน Chula Zero Waste (2017–2021) ซึ่งมี 6 โปรแกรม และ 18 โครงการ ต้องการแนวทางการสื่อสารที่ทำให้นักศึกษาและชุมชนในมหาวิทยาลัยมีส่วนร่วมได้จริง",
    approach:
      "ออกแบบต้นแบบแคมเปญลดขยะที่นำโดยนักศึกษา เน้นความสนุก ความสดใส ความเรียบง่าย และการนำไปใช้ได้จริง ร่วมกับสถาบันวิจัยสิ่งแวดล้อม สำนักงานบริหารระบบกายภาพ และเครือข่ายภายในจุฬาฯ",
    impact:
      "ได้ต้นแบบแคมเปญที่สื่อสารเรื่องการลดขยะได้อย่างเข้าใจง่าย และเปิดโอกาสให้นักศึกษานำไปขับเคลื่อนต่อในบริบทของมหาวิทยาลัย",
    sourceUrl: "https://www.cominnocenter.com/post/chula-zero-waste",
  },
  {
    slug: "nia-100-faces",
    title: "NIA 100 FACES",
    titleEn: "NIA 100 FACES",
    outcome:
      "รวบรวม 100 นักนวัตกรรมในระยะ 3 ปี นำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR",
    sdg: "SDG 9",
    sdgLabel: "Industry & Innovation",
    image: wix("25218b_4caad4d894fc4108b321da6753a27a44", "png"),
    alt: "NIA 100 Faces of Thailand’s innovation inspirers — ปกโครงการ",
    gallery: [
      {
        src: wix("25218b_4caad4d894fc4108b321da6753a27a44", "png"),
        alt: "ปกโครงการ NIA 100 FACES — 100 Faces of Thailand’s innovation inspirers",
      },
    ],
    challenge:
      "ต้องการนำเสนอเรื่องราวของนักนวัตกรรมให้สร้างแรงบันดาลใจ และเข้าถึงผู้คนผ่านหลายช่องทาง",
    approach:
      "รวบรวม 100 นักนวัตกรรมที่สร้างแรงบันดาลใจด้านการคิดสร้างสรรค์ แล้วนำเสนอผ่านเว็บไซต์ Instagram หนังสือ และภาพ AR — https://www.nia100faces.com/",
    impact:
      "สร้างชุดสื่อหลายแพลตฟอร์มที่ถ่ายทอดเรื่องราวของนักนวัตกรรมได้อย่างกว้างขวางและน่าสนใจ",
    sourceUrl: "https://www.cominnocenter.com/post/nia-100-faces",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
