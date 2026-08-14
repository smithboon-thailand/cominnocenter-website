/**
 * ภาพประกอบตกแต่ง (AI-generated / vector)
 * ใช้เป็น decorative graphics เท่านั้น — ไม่ใช่ภาพถ่ายจริง
 * อัปเดต: 2026-08-14
 */

export type Illustration = {
  id: string;
  src: string;
  altTh: string;
  altEn: string;
  usage: string;
};

export const illustrations: Illustration[] = [
  {
    id: "hero-network",
    src: "/illustrations/hero-network.svg",
    altTh:
      "ภาพประกอบ AI: โครงข่ายการสื่อสารโทนน้ำเงินจุฬาฯ และชมพู — กราฟิกตกแต่ง",
    altEn:
      "AI-generated illustration: communication network in Chulalongkorn blue and pink — decorative graphic",
    usage: "Home hero side / About atmosphere",
  },
  {
    id: "sdg-ring",
    src: "/illustrations/sdg-ring.svg",
    altTh:
      "ภาพประกอบ AI: วงแหวนความยั่งยืนแนว SDG หลายสี — กราฟิกตกแต่ง",
    altEn:
      "AI-generated illustration: multicolor sustainability ring inspired by SDGs — decorative graphic",
    usage: "Impact / sustainability section",
  },
  {
    id: "expertise-icons",
    src: "/illustrations/expertise-icons.svg",
    altTh:
      "ภาพประกอบ AI: ไอคอนความเชี่ยวชาญ อบรม วิจัย แคมเปญ และมัลติมีเดีย",
    altEn:
      "AI-generated illustration: expertise icons for training, research, campaigns, and multimedia",
    usage: "Expertise section visual",
  },
  {
    id: "parallax-overlay",
    src: "/illustrations/parallax-overlay.svg",
    altTh:
      "ภาพประกอบ AI: เลเยอร์กระจกโปร่งแสงและเส้นแสง — กราฟิก parallax",
    altEn:
      "AI-generated illustration: translucent glass layers and light trails — parallax decorative graphic",
    usage: "Dark CTA / parallax overlay",
  },
];

export function illustration(id: string): Illustration | undefined {
  return illustrations.find((i) => i.id === id);
}
