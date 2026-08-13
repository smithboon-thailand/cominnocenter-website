import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ผลงาน",
  description:
    "ผลงานและโครงการนวัตกรรมการสื่อสารเพื่อคุณภาพชีวิตและความยั่งยืน โดยศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร จุฬาฯ",
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
