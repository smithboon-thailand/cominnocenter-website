import { InsightListPage } from "@/components/insights/InsightPages";

export const metadata = {
  alternates: {
    canonical: "/insights",
    languages: { th: "/insights", en: "/en/insights", "x-default": "/insights" },
  },
  title: "บทความ",
  description:
    "ข้อค้นพบจากงานวิจัยของศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ เล่าให้คนทำงานสื่อสารในหน่วยงานรัฐ องค์กร และเอเจนซีนำไปใช้ได้จริง",
};

export default function InsightsPage() {
  return <InsightListPage locale="th" />;
}
