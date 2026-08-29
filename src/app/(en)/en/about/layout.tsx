import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Center of Excellence in Communication Innovation, Faculty of Communication Arts, Chulalongkorn University — vision, mission, and leadership team",
};

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
