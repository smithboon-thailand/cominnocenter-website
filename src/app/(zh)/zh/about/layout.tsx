import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "朱拉隆功大学传播艺术学院传播创新卓越中心——愿景、使命与领导团队",
};

export default function ChineseAboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
