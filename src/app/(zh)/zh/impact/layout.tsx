import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目成果",
  description: "传播创新卓越中心的项目与案例——对生活质量与可持续发展的真实影响",
};

export default function ChineseImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
