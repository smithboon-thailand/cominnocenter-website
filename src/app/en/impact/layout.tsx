import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Projects and case studies from the Center of Excellence in Communication Innovation — real impact on quality of life and sustainability",
};

export default function EnglishImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
