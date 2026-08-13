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
  image: string;
  alt: string;
  gallery: ProjectImage[];
  challenge: string;
  approach: string;
  impact: string;
  sourceUrl: string;
};

/** Full-size image URL from Wix media id (largest practical web size) */
function media(id: string, ext: string = "jpg"): string {
  return `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_1920,h_1280,al_c,q_90,enc_auto/${id}~mv2.${ext}`;
}

export const projects: Project[] = [
  // See artifacts/projects.ts - loading full content next
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
