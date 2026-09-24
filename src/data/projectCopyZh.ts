/**
 * เนื้อหาโครงการฉบับจีนตัวย่อ — คู่กับ `projectCopyEn.ts` (24 ก.ย. 2569)
 *
 * ต่างจากฉบับอังกฤษตรงที่**มี `title` ด้วย** เพราะ `projects.ts` เก็บชื่อเรื่องแค่
 * สองภาษา (title ไทย · titleEn) การเพิ่ม `titleZh` เข้าไปที่นั่นจะทำให้ไฟล์ข้อมูล
 * หลักบวมขึ้นทุกครั้งที่เพิ่มภาษา จึงเก็บชื่อจีนไว้กับเนื้อหาจีนในไฟล์เดียวกัน
 *
 * **ไม่มี fallback เป็นภาษาอื่น** — `getProjectCopyZh()` โยน error ถ้าโครงการใด
 * ไม่มีคำแปล เพราะหน้าจีนที่แสดงข้อความไทยหรืออังกฤษปนอยู่คือบั๊กที่ผู้อ่านเห็น
 * (กติกา i18n ข้อ 7) ให้ build พังดีกว่าปล่อยหน้าปนภาษาขึ้นเว็บ
 * ส่วน `results` เป็น optional เหมือนฉบับอังกฤษ — โครงการที่ไม่มีตัวเลขยืนยันได้
 * ไม่มีในทุกภาษา ตามกติกาใน `projects.ts`
 *
 * ชื่อหน่วยงานที่มีชื่อจีนทางการเป็นที่รู้จัก (กระทรวง กรม องค์การระหว่างประเทศ)
 * ใช้ชื่อจีน ส่วนชื่อโครงการ แบรนด์ และแพลตฟอร์มคงชื่อเดิม (ชื่อเฉพาะ — BRAND.md PART C)
 * ผู้ตรวจภาษาจีนของผู้ใช้ตรวจถ้อยคำก่อน merge
 */
import type { Project, ProjectResult } from "./projects";

export type ProjectCopyZh = {
  title: string;
  outcome: string;
  challenge: string;
  approach: string;
  impact: string;
  /** ตัวเลขผลลัพธ์ฉบับจีน — ต้องตรงกับ results ใน projects.ts ตัวต่อตัว */
  results?: ProjectResult[];
};

export const projectCopyZh: Record<string, ProjectCopyZh> = {
  "sri-trang-agro-industry": {
    title: "诗董农工集团（Sri Trang Agro-Industry）",
    outcome: "为诗董农工集团（上市公司）员工开展在线内容与视频制作培训，用于机构内部学习",
    challenge: "该企业需要提升员工制作视频与录屏教学素材的能力，以支持持续的内部学习",
    approach:
      "中心与朱拉隆功大学诗琳通泰语学院合作，于 2022 年 7 月 20–21 日在合艾 Burisrigu 会议中心开展在线内容创作培训",
    impact: "员工能够独立制作视频与学习素材，支持机构的可持续学习",
  },
  "empowering-youth-leaders": {
    title: "青年领袖赋能",
    outcome: "为泰国南部三个边境府的青年领袖与辅导员开展培训，学习策划、实施并评估有关性健康、身体健康与心理健康的活动",
    challenge: "泰南的青年与辅导员需要掌握设计参与式活动的技能，以促进性健康、身体健康与心理健康",
    approach:
      "由 Smith 副教授主持，与 Look South Peace 合作，于 2023 年 11 月 10–13 日在博他仑府举办工作坊，并分享 Impulse Bangkok 的经验",
    impact: "参与者能够策划创意活动并担任辅导员，为更年轻的青少年创造安全空间",
    results: [{ value: "3", unit: "个府", label: "覆盖的南部边境府" }],
  },
  "care-d-plus": {
    title: "Care D+ 公共与社会传播培训",
    outcome: "为全国一万余名公共卫生人员开展培训，提升富有同理心与理解力的沟通技能",
    challenge: "医疗场所中超过 90% 的冲突与投诉源于沟通失败或危机处理不当",
    approach:
      "朱拉隆功大学与泰国公共卫生部共同开发 Care D+（用心团队）课程，包含 7 个核心单元，面向全国的管理者、工作人员与健康传播志愿者开展培训（2023 年 11 月 10 日至 2024 年 6 月 30 日）",
    impact: "提升了患者、家属与医疗专业人员之间充满关怀、理解与尊重的沟通",
    results: [{ value: "10,000+", unit: "人", label: "接受培训的公共卫生人员" }],
  },
  "media-communication-transnational-citizens": {
    title: "在线课程：面向跨国公民的媒体与传播",
    outcome: "在 The Sharpener School 平台上开设为期 12 个月的在线课程，面向在泰国的数字游民与国际人才",
    challenge: "在泰国的数字游民与国际人才需要沟通技能与文化理解，才能在泰国生活和工作",
    approach:
      "中心由 Smith 副教授主持，与 The Sharpener School 及 Chula Unisearch 合作开发为期 12 个月的课程，于 2024 年 8 月 1 日开课",
    impact: "学员可获得传播艺术学院颁发的确认函与证书，并掌握实用的跨文化沟通技能",
    results: [{ value: "12", unit: "个月", label: "在线课程时长" }],
  },
  "talk-thai-today": {
    title: "Talk Thai Today——在泰国的日常生活沟通",
    outcome: "为期 6 个月的在线课程，面向跨国公民教授在泰国日常生活中的沟通，学员来自全球 30 多个国家和地区",
    challenge:
      "许多生活在泰国的跨国公民仍无法进行日常沟通，而现有课程往往从读写入手——门槛太高，很多人还没能真正开口交流就放弃了",
    approach:
      "中心自主开发并运营整个课程，从课程设计、教学到位于 talkthaitoday.com 的报名与进度平台。通过 Zoom 每周直播四次，持续六个月，采用罗马字母注音，让学员从第一天起就练习沟通；每周开放报名，自学材料即时解锁",
    impact: "来自全球 30 多个国家和地区的学员练习在泰国的日常沟通直至真正能够使用，并获得朱拉隆功大学传播艺术学院颁发的证书",
    results: [
      { value: "6", unit: "个月", label: "在线课程时长" },
      { value: "30+", unit: "个国家和地区", label: "学员来自世界各地" },
    ],
  },
  "public-relationshift": {
    title: "Public RelationSHIFT——描绘数字时代的泰国公关",
    outcome: "与 Moonshot Digital 合作开展泰国首个数字优先公关实践研究——调查 222 位从业者，提出 15 项行业建议",
    challenge:
      "泰国公关行业迅速转向数字工具，却缺乏反映从业者真实经验的基线数据，对 AMEC、PESO 等国际框架的采用也很有限——策略与效果衡量因此一直在旧习惯中打转",
    approach:
      "中心由 Smith 副教授担任首席研究员，与 Moonshot Digital 围绕八项目标设计研究：调查来自政府、私营部门、公民社会和代理机构的 222 位公关专业人士，并深度访谈行业领袖、记者、创作者与学者",
    impact:
      "研究发现 97.5% 的泰国公关从业者已在使用人工智能，但仍有 77.4% 以传统的广告价值等值（AVE）衡量成效。研究提出 AKISS 模型以及面向行业五类群体的 15 项建议，由 Moonshot Digital 以数字报告形式发布",
    results: [
      { value: "222", unit: "人", label: "接受调查的公关专业人士" },
      { value: "15", unit: "项", label: "面向行业五类群体的建议" },
    ],
  },
  "cultural-communication-program": {
    title: "文化传播培训与实地考察课程",
    outcome: "艺术史与文化传播的培训与实地考察课程，每期 10 人，由荣休教授 M.R. Suriyawut Sukhasvasti 主讲",
    challenge: "公众以及对泰国文化遗产感兴趣的人，需要向国家级专家学习准确的知识，包括真实的实地考察",
    approach:
      "朱拉隆功大学传播艺术学院公共关系系与荣休教授 M.R. Suriyawut Sukhasvasti 合作，每期招收 10 人，并建立了新的报名系统和网站",
    impact: "参与者从专家那里获得准确的艺术史与文化传播知识，并能够进一步传播",
    results: [{ value: "10", unit: "人/期", label: "每期学员人数" }],
  },
  "chula-zero-waste": {
    title: "Chula Zero Waste 零废弃校园",
    outcome: "打造由学生主导的校园减废宣传活动原型，强调有趣、明快、简洁与可操作",
    challenge:
      "《朱拉隆功大学固体与危险废弃物可持续管理行动计划（Chula Zero Waste）》（2017–2021）的目标是到 2021 年将校内废弃物至少减少 30%，计划包含 6 个方案与 18 个项目",
    approach:
      "打造由学生主导的校园减废宣传活动原型，强调有趣、明快、简洁与可操作。由环境研究所、校园设施管理办公室以及朱拉隆功大学内部多个网络协作完成",
    impact: "以有趣、简洁、可操作的方式向大学社区传播减废理念的宣传活动原型",
  },
  "nbtc-encyclopedia": {
    title: "NBTC 百科全书",
    outcome: "这部百科全书汇集重要主题，建立主题之间的联系，用年轻一代易于理解的语言解释，并配以引人入胜的插图",
    challenge: "电信领域的重要主题往往复杂，年轻受众难以理解",
    approach: "收集年轻一代与年长一代的反馈，然后编写一部现代化的百科全书：建立联系、语言清晰、插图生动，并配有视频",
    impact: "一部面向年轻一代、广泛易读的百科全书，配有插图与视频支持",
  },
  "nia-100-faces": {
    title: "NIA 100 FACES",
    outcome: "历时 3 年汇集 100 位激发创意灵感的创新者，通过网站、Instagram、图书和 AR 影像呈现",
    challenge: "需要通过多种渠道呈现创新者的故事，以激发创意灵感",
    approach: "历时 3 年汇集 100 位创新者，通过网站、Instagram、图书和 AR 影像呈现——https://www.nia100faces.com/",
    impact: "以多平台叙事呈现泰国的创新灵感人物",
    results: [
      { value: "100", unit: "位", label: "收录并出版的创新者" },
      { value: "3", unit: "年", label: "项目历时" },
    ],
  },
  "nia-media-innovation": {
    title: "NIA 媒体创新",
    outcome: "为泰国国家创新局开展媒体创新内涵研究，并举办小型投影映射展示活动",
    challenge: "需要通过研究与沉浸式活动来界定并传播媒体创新的内涵",
    approach: "汇编研究成果，制作包含灯光与音响的活动，打造小型投影映射展示，并邀请专家接受访谈",
    impact: "一份研究报告，以及一场引人入胜的媒体创新活动体验",
  },
  "nia-satisfaction-survey-2020": {
    title: "NIA 2020 年满意度调查",
    outcome: "采用混合研究方法，为泰国国家创新局（公共机构）开展客户满意度调查",
    challenge: "通过严谨的客户满意度测量，支持泰国国家创新局的服务改进",
    approach: "采用混合研究方法开展客户满意度调查",
    impact: "为改进泰国国家创新局服务提供证据基础",
  },
  "pid-thong-lang-phra-foundation": {
    title: "Pid Thong Lang Phra 基金会",
    outcome: "为基金会学员开展在线媒体制作、说服技巧与个人形象发展培训",
    challenge: "基金会工作人员需要在线媒体、说服技巧与个人形象发展方面的实用技能",
    approach: "由专家主讲，内容涵盖使用 PowerPoint 制作简易在线媒体、说服技巧以及个人形象发展",
    impact: "增强基金会学员的沟通能力",
  },
  "seeds-for-cu-sustainability": {
    title: "Seeds for CU Sustainability",
    outcome: "在曼谷及其他府制作项目宣传视频，涵盖从前期筹备到后期制作的全过程，包含航拍画面与利益相关方访谈",
    challenge: "需要高品质的宣传视频，在不同地点传播可持续发展项目",
    approach: "完整的制作流程，每周与客户召开反馈会议，包含航拍画面与利益相关方访谈",
    impact: "展现对社会可持续发展承诺的系列视频",
  },
  "department-of-disease-control": {
    title: "泰国疾病控制厅",
    outcome: "以服务流程设计为主题的工作坊，聚焦精准传播与现代媒体制作技术",
    challenge: "机构需要加强精准传播与现代媒体制作技能",
    approach: "工作坊内容包括服务流程设计、精准传播原则与现代媒体制作技术",
    impact: "提升了机构内部沟通与形象塑造能力",
  },
  "creative-tourism-development-project-in-nan-province": {
    title: "难府创意旅游发展项目",
    outcome: "在难府举办工作坊，通过摄影与视频实践提升当地居民的传播技能",
    challenge: "难府的当地社区需要更强的传播技能，以发展创意旅游",
    approach: "在 Namthong Nan 酒店举办公开工作坊，配备摄影与视频设备、道具和灯光，兼顾理论与实践",
    impact: "参与者掌握了实用知识，能够创作更具吸引力的影像与故事",
  },
  "ministry-of-natural-resources-and-environment": {
    title: "泰国自然资源与环境部",
    outcome: "为环境质量促进厅开展人员发展培训，主题为有感染力的写作与摄影",
    challenge: "工作人员需要提高有感染力的写作与专业摄影方面的效率",
    approach: "培训课程涵盖写作技巧、摄影以及器材建议",
    impact: "提升了环境传播工作的专业水准",
  },
  "international-labour-organization": {
    title: "国际劳工组织（ILO）",
    outcome: "与联合国合作举办工作坊，教授文字、摄影、视频与 TikTok 制作，用于可持续发展传播",
    challenge: "在联合国可持续发展的背景下，需要实用的媒体技能来展示个人与团队项目",
    approach: "工作坊教授文字运用、摄影、视频拍摄与 TikTok 制作技巧",
    impact: "参与者具备了制作更高质量项目传播内容的能力",
  },
  "asean-university-network": {
    title: "东盟大学联盟（AUN）",
    outcome: "为东盟大学联盟设计 2016–2019 年度报告，提供可印刷版与数字版",
    challenge: "需要一份富有创意、符合 AUN 形象的现代年度报告，同时适用于印刷与数字渠道",
    approach: "设计图形与版式，交付可印刷文件，以及适合网页浏览的小体积数字文件",
    impact: "2016–2019 年高品质的印刷版与数字版年度报告",
  },
  itd: {
    title: "ITD",
    outcome: "举办意见征集会议，分析数字贸易对泰国中小企业的机遇以及全球贸易的调整趋势",
    challenge: "需要围绕数字贸易对泰国中小企业的机遇以及全球贸易的调整开展有组织的对话",
    approach: "组织会议征集意见，并就关键经济议题分析趋势",
    impact: "为政策讨论与中小企业调整提供洞见",
  },
};

/**
 * เนื้อหาจีนของโครงการ — โยน error ถ้าไม่มี เพื่อให้ build พังก่อนหน้าปนภาษาขึ้นเว็บ
 * (`generateStaticParams` ของ /zh/impact/[slug] เรียกทุกโครงการ จึงตรวจครบทุกตัวตอน build)
 */
export function getProjectCopyZh(project: Project): ProjectCopyZh {
  const zh = projectCopyZh[project.slug];
  if (!zh) {
    throw new Error(
      `projectCopyZh: ไม่มีคำแปลจีนของโครงการ "${project.slug}" — เพิ่มใน src/data/projectCopyZh.ts`,
    );
  }
  return zh;
}
