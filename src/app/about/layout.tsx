import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "รู้จักศูนย์ความเป็นเลิศด้านนวัตกรรมการสื่อสาร คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย วิสัยทัศน์ พันธกิจ และทีมผู้นำ",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
