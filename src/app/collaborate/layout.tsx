import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร่วมงานกับเรา",
  description:
    "ร่วมงานกับศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร จุฬาฯ ทั้งด้าน Partnership, Training และ Research",
};

export default function CollaborateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
