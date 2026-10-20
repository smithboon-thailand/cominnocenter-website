import type { InsightBlock } from "@/data/insights";

/** เนื้อหาบทความ — ข้อความล้วน ไม่แปลงมาร์กดาวน์ (ดูกติกาข้อ 5 ใน src/data/insights.ts) */
export default function InsightBody({ blocks }: { blocks: InsightBlock[] }) {
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
