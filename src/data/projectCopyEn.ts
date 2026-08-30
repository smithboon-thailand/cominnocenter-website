/**
 * English body copy for projects whose outcome/challenge/approach/impact
 * are stored in Thai in projects.ts. EN pages prefer these values.
 */
import type { Project, ProjectResult, ProjectTestimonial } from "./projects";

export type ProjectCopyEn = {
  outcome: string;
  challenge: string;
  approach: string;
  impact: string;
  /** ตัวเลขผลลัพธ์ฉบับอังกฤษ — ต้องตรงกับ results ใน projects.ts ตัวต่อตัว */
  results?: ProjectResult[];
  testimonial?: ProjectTestimonial;
};

export const projectCopyEn: Record<string, ProjectCopyEn> = {
  "sri-trang-agro-industry": {
    outcome:
      "Online content and video training for organizational learning for Sri Trang Agro-Industry Public Company Limited staff",
    challenge:
      "The organization needed to build staff capacity to create video media and screen recordings for continuous internal learning",
    approach:
      "The Center, with the Sirindhorn Thai Language Institute, Chulalongkorn University, delivered Online Content Creation training on 20–21 July 2022 at Burisrigu Conference Center, Hat Yai",
    impact:
      "Staff can produce video and learning media independently, supporting sustainable organizational learning",
  },
  "empowering-youth-leaders": {
    outcome:
      "Training for youth leaders and mentors in three southern border provinces to plan, implement, and evaluate activities on sexual, physical, and mental well-being",
    challenge:
      "Youth and mentors in the South needed skills to design participatory activities promoting sexual, physical, and mental well-being",
    approach:
      "Workshop led by Assoc. Prof. Dr. Smith with Look South Peace, 10–13 November 2023 in Phatthalung, sharing experience from Impulse Bangkok",
    impact:
      "Participants can plan creative activities and serve as mentors, creating safe spaces for younger youth",
    results: [
      { value: "3", unit: "provinces", label: "Southern border provinces covered" },
    ],
  },
  "care-d-plus": {
    outcome:
      "Training for over 10,000 public health personnel nationwide in empathetic and understanding communication skills",
    challenge:
      "Over 90% of conflicts and complaints in healthcare settings stem from communication failure or inadequate crisis management",
    approach:
      "Chulalongkorn University with the Ministry of Public Health developed the Care D+ (Team of the Heart) curriculum across 7 core units, training executives, staff, and health communication volunteers nationwide (10 November 2023 – 30 June 2024)",
    impact:
      "Elevated compassionate, understanding, and respectful communication among patients, families, and health professionals",
    results: [
      { value: "10,000+", unit: "people", label: "Public health personnel trained" },
    ],
  },
  "media-communication-transnational-citizens": {
    outcome:
      "Launched a 12-month online course for digital nomads and global talents in Thailand on The Sharpener School platform",
    challenge:
      "Digital nomads and international talents in Thailand need communication skills and cultural understanding to live and work in Thailand",
    approach:
      "The Center, led by Assoc. Prof. Dr. Smith, developed a 12-month curriculum with The Sharpener School and Chula Unisearch, starting 1 August 2024",
    impact:
      "Learners receive confirmation letters and certificates from the Faculty of Communication Arts, plus practical intercultural communication skills",
    results: [
      { value: "12", unit: "months", label: "Length of the online course" },
    ],
  },
  // ห้ามใช้ "Thai language course/learn Thai" — ดูคำอธิบายที่ตัวโครงการใน projects.ts
  "talk-thai-today": {
    outcome:
      "A 6-month online program teaching communication in daily life in Thailand for transnational citizens, with learners from over 30 nationalities worldwide",
    challenge:
      "Many transnational citizens living in Thailand still cannot communicate in daily life, and existing programs often start with reading and writing — a high barrier that makes many give up before they can actually communicate",
    approach:
      "The Center developed and operates the entire program itself — curriculum, teaching, and the enrollment and progress platform at talkthaitoday.com. Live Zoom classes run four times a week for six months, using romanized pronunciation so learners practice communicating from day one; enrollment opens every week with self-study materials unlocked instantly",
    impact:
      "Learners from over 30 nationalities worldwide practice communication for daily life in Thailand until they can genuinely use it, and receive a certificate from the Faculty of Communication Arts, Chulalongkorn University",
    results: [
      { value: "6", unit: "months", label: "Length of the online program" },
      { value: "30+", unit: "nationalities", label: "Learners from around the world" },
    ],
  },
  "public-relationshift": {
    outcome:
      "Thailand's first study of digital-first PR practice, conducted with Moonshot Digital — a survey of 222 practitioners leading to 15 recommendations for the industry",
    challenge:
      "The Thai PR industry has moved quickly to digital tools, but lacked baseline data reflecting practitioners' real experience and had little uptake of international frameworks such as AMEC and PESO — so strategy and measurement kept circling old habits",
    approach:
      "The Center, with Assoc. Prof. Dr. Smith as principal investigator, designed the study with Moonshot Digital around eight objectives: a survey of 222 PR professionals across government, the private sector, civil society, and agencies, alongside in-depth interviews with industry leaders, journalists, creators, and academics",
    impact:
      "The study found that 97.5% of Thai PR practitioners already use AI, yet 77.4% still measure results with traditional advertising value equivalencies (AVEs). It proposes the AKISS model and 15 recommendations for five groups across the industry, published as a digital report by Moonshot Digital",
    results: [
      { value: "222", unit: "people", label: "PR professionals surveyed" },
      { value: "15", unit: "items", label: "Recommendations for five industry groups" },
    ],
  },
  "cultural-communication-program": {
    outcome:
      "Training and field-study program in art history and cultural communication, 10 participants per cohort, led by Professor Emeritus M.R. Suriyawut Sukhasvasti",
    challenge:
      "The general public and those interested in Thai cultural heritage need accurate learning from national-level experts, including real field visits",
    approach:
      "The Department of Public Relations, Faculty of Communication Arts, Chulalongkorn University, runs cohorts of 10 with Professor Emeritus M.R. Suriyawut Sukhasvasti, plus a new registration system and website",
    impact:
      "Participants gain accurate knowledge of art history and cultural communication from experts and can pass it on",
    results: [
      { value: "10", unit: "per cohort", label: "Learners in each cohort" },
    ],
  },
  "chula-zero-waste": {
    outcome:
      "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality.",
    challenge:
      "The Action Plan for Sustainable Management of Solid and Hazardous Waste at Chulalongkorn University (Chula Zero Waste) (2017-2021) aims to reduce waste within the university by at least 30% by 2021. The plan includes 6 programs and 18 projects.",
    approach:
      "Create a Campaign Prototype for Reducing Waste in the University Led by Students, Emphasizing Fun, Brightness, Simplicity, and Practicality. Collaboration of the Environmental Research Institute, the Office of Physical System Management, and various networks within Chulalongkorn University.",
    impact:
      "Prototype campaign that communicates waste reduction in a fun, simple and practical way for university communities.",
  },
  "nbtc-encyclopedia": {
    outcome:
      "This encyclopedia compiles important topics, creates connections, explains in language that the younger generation can easily understand, and uses engaging illustrations.",
    challenge:
      "Important telecommunications topics are often complex and hard for younger audiences to understand.",
    approach:
      "Gathered feedback from younger and older generations, then created a modern encyclopedia with connections, clear language, engaging illustrations, and videos.",
    impact:
      "A widely readable encyclopedia for the younger generation with illustrations and video support.",
  },
  "nia-100-faces": {
    outcome:
      "We gathered 100 innovators (3 Years) who inspire creativity, presenting them through a website, Instagram, a book, and AR images.",
    challenge:
      "Need to present innovator stories across multiple channels to inspire creativity.",
    approach:
      "Collected 100 innovators over 3 years and presented them via website, Instagram, book, and AR images — https://www.nia100faces.com/",
    impact:
      "Multi-platform storytelling of Thailand's innovation inspirers.",
    results: [
      { value: "100", unit: "innovators", label: "Innovators profiled and published" },
      { value: "3", unit: "years", label: "Duration of the project" },
    ],
  },
  "nia-media-innovation": {
    outcome:
      "Research on the meaning of media innovation and a small projection mapping display event for NIA.",
    challenge:
      "Need to define and communicate the meaning of media innovation through research and an immersive event.",
    approach:
      "Compiled research, produced the event including lighting and sound, created a small projection mapping display, and invited experts for interviews.",
    impact:
      "Research report and an engaging media innovation event experience.",
  },
  "nia-satisfaction-survey-2020": {
    outcome:
      "Customer satisfaction survey using mixed methods for the National Innovation Agency (Public Organization).",
    challenge:
      "Support service development for NIA through rigorous customer satisfaction measurement.",
    approach:
      "Conducted a customer satisfaction survey using mixed methods.",
    impact:
      "Evidence base for improving NIA services.",
  },
  "pid-thong-lang-phra-foundation": {
    outcome:
      "Training on online media production, persuasion techniques, and personality development for foundation trainees.",
    challenge:
      "Foundation staff need practical skills in online media, persuasion, and personality development.",
    approach:
      "Expert-led training covering simple online media production with PowerPoint, persuasion techniques, and personality development.",
    impact:
      "Stronger communication capacity for foundation trainees.",
  },
  "seeds-for-cu-sustainability": {
    outcome:
      "Project presentation videos in Bangkok and other provinces, from pre-production to post-production, with aerial footage and stakeholder interviews.",
    challenge:
      "Need high-quality presentation videos to communicate sustainability projects across locations.",
    approach:
      "Full production pipeline with weekly client feedback meetings, aerial footage, and stakeholder interviews.",
    impact:
      "Videos that showcase commitment to societal sustainability.",
  },
  "department-of-disease-control": {
    outcome:
      "Workshop on service process design focusing on targeted communication and modern media production techniques.",
    challenge:
      "Organization needs stronger targeted communication and modern media production skills.",
    approach:
      "Workshop on service process design, targeted communication principles, and modern media production techniques.",
    impact:
      "Improved internal communication and organizational image capabilities.",
  },
  "creative-tourism-development-project-in-nan-province": {
    outcome:
      "Workshop in Nan to enhance communication skills with photography and video practice for local residents.",
    challenge:
      "Local communities in Nan need stronger communication skills for creative tourism.",
    approach:
      "Open workshop at Namthong Nan Hotel with photography and video equipment, props, lighting, theory and practice sessions.",
    impact:
      "Participants gained practical knowledge to create more engaging images and stories.",
  },
  "ministry-of-natural-resources-and-environment": {
    outcome:
      "Personnel development training on impactful writing and photography for the Department of Environmental Quality Promotion.",
    challenge:
      "Staff need higher efficiency in impactful writing and professional photography.",
    approach:
      "Training program covering writing techniques, photography, and equipment recommendations.",
    impact:
      "Elevated professionalism of environmental communication work.",
  },
  "international-labour-organization": {
    outcome:
      "United Nations workshop on text, photography, videography, and TikTok for sustainable development communication.",
    challenge:
      "Need practical media skills for presenting individual and group projects in a UN sustainability context.",
    approach:
      "Workshop teaching text usage, photography, videography, and TikTok production techniques.",
    impact:
      "Participants equipped to produce higher-quality project communication.",
  },
  "asean-university-network": {
    outcome:
      "Annual Report design for ASEAN University Network (2016–2019) with print-ready and digital versions.",
    challenge:
      "Need a creative modern annual report aligned with AUN's identity for print and digital channels.",
    approach:
      "Designed graphics and layout, delivered print-ready files, and smaller digital files for web viewing.",
    impact:
      "High-quality print and digital annual reports for 2016–2019.",
  },
  "itd": {
    outcome:
      "Meeting to gather opinions and analyze trends on digital commerce for Thai SMEs and global trade adaptation.",
    challenge:
      "Need structured dialogue on digital commerce opportunities for Thai SMEs and global trade adaptation.",
    approach:
      "Organized meetings to gather opinions and analyze trends on key economic topics.",
    impact:
      "Insights to support policy and SME adaptation discussions.",
  },
};

export function getProjectCopyEn(slug: string): ProjectCopyEn | undefined {
  return projectCopyEn[slug];
}

/** Prefer EN copy when available; otherwise fall back to fields on the project. */
export function getLocalizedProjectCopy(project: Project): ProjectCopyEn {
  const en = projectCopyEn[project.slug];
  return {
    outcome: en?.outcome ?? project.outcome,
    challenge: en?.challenge ?? project.challenge,
    approach: en?.approach ?? project.approach,
    impact: en?.impact ?? project.impact,
    // ตัวเลข/คำอ้างอิงไม่มี fallback เป็นภาษาไทย — ถ้ายังไม่ได้แปล ให้ซ่อนไปเลย
    // ดีกว่าปล่อยข้อความไทยโผล่กลางหน้าอังกฤษ (กฎภาษาใน CLAUDE.md)
    results: en?.results,
    testimonial: en?.testimonial,
  };
}
