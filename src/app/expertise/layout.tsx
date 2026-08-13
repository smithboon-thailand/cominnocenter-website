import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ความเชี่ยวชาญ",
  description:
    "ความเชี่ยวชาญด้านนวัตกรรมการสื่อสารของ ComInnoCenter ครอบคลุมการอบรม วิจัย แคมเปญ วิดีโอ AR และอื่นๆ",
};

export default function ExpertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
