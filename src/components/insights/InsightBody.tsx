import type { InsightBlock } from "@/data/insights";
import InsightChart from "@/components/insights/InsightChart";
import type { FullLocale } from "@/lib/locale";

/** เนื้อหาบทความ — ข้อความล้วน ไม่แปลงมาร์กดาวน์ (ดูกติกาข้อ 5 ใน src/data/insights.ts) */
export default function InsightBody({ blocks, locale }: { blocks: InsightBlock[]; locale: FullLocale }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.kind === "h2")
          return (
            <h2 key={i} className="pt-4 text-h2-m md:text-h2 text-ink-900">
              {b.text}
            </h2>
          );
        if (b.kind === "ul")
          return (
            <ul key={i} className="list-disc pl-6 space-y-3 text-neutral-700 leading-relaxed text-lg">
              {b.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        if (b.kind === "chart") return <InsightChart key={i} chart={b.chart} locale={locale} />;
        if (b.kind === "tips")
          return (
            <ol key={i} className="space-y-4">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-700 text-white font-medium"
                  >
                    {j + 1}
                  </span>
                  <div>
                    <p className="text-lg font-medium text-ink-900">{item.title}</p>
                    <p className="mt-1 text-neutral-700 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          );
        if (b.kind === "note")
          return (
            <p
              key={i}
              className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-100 p-6 text-neutral-700 leading-relaxed"
            >
              {b.text}
            </p>
          );
        return (
          <p key={i} className="text-neutral-700 leading-relaxed text-lg">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
