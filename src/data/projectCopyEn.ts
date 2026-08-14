/**
 * English body copy for projects whose outcome/challenge/approach/impact
 * are stored in Thai in projects.ts. EN pages prefer these values.
 */
import type { Project } from "./projects";

export type ProjectCopyEn = {
  outcome: string;
  challenge: string;
  approach: string;
  impact: string;
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
  };
}
