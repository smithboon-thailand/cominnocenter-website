import { InsightListPage } from "@/components/insights/InsightPages";

export const metadata = {
  alternates: {
    canonical: "/en/insights",
    languages: { th: "/insights", en: "/en/insights", "x-default": "/insights" },
  },
  title: "Insights",
  description:
    "What the Center of Excellence in Communication Innovation has found in its research, written for communicators in government, organisations and agencies.",
};

export default function InsightsPage() {
  return <InsightListPage locale="en" />;
}
