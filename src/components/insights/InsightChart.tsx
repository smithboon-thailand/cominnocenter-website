import type { InsightChartData } from "@/data/insights";

/**
 * กราฟของบทความ วาดเป็น SVG จากตัวเลขตรงๆ — ไม่ใช้ภาพกราฟสำเร็จรูป
 *
 * เหตุผล: (1) Statista ห้ามคัดลอกภาพกราฟ ต้องสร้างใหม่จากตัวเลขพร้อมเครดิตแหล่งต้นทาง
 * (2) หน้าไทยกับหน้าอังกฤษใช้ข้อมูลชุดเดียวกันแต่ป้ายคนละภาษา (3) ตัวหนังสือเป็นข้อความจริง
 * อ่านด้วยโปรแกรมอ่านหน้าจอได้ และสระ/วรรณยุกต์ไทยซ้อนกันถูกต้องเพราะเบราว์เซอร์วาดเอง
 * สีตาม BRAND.md: แท่งปกติ neutral · แท่งที่เน้น pink-700
 */
export default function InsightChart({ chart }: { chart: InsightChartData }) {
  return (
    <figure className="my-10">
      <figcaption className="mb-4">
        <p className="text-h3-m md:text-h3 text-ink-900">{chart.title}</p>
        <p className="mt-1 text-sm text-neutral-500">{chart.subtitle}</p>
      </figcaption>
      {chart.type === "bar" ? <Bars chart={chart} /> : <Line chart={chart} />}
      <p className="mt-3 text-xs text-neutral-500">{chart.source}</p>
    </figure>
  );
}

function Bars({ chart }: { chart: InsightChartData }) {
  const max = Math.max(...chart.data.map((d) => d.value));
  return (
    <div role="img" aria-label={chart.alt} className="space-y-3">
      {chart.data.map((d) => (
        <div key={d.label} className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[11rem_1fr] items-center gap-3" aria-hidden>
          <span className="text-sm text-ink-900 text-right">{d.label}</span>
          <span className="flex items-center gap-2">
            <span
              className={`block h-7 rounded-sm ${d.highlight ? "bg-pink-700" : "bg-neutral-300"}`}
              style={{ width: `${(d.value / max) * 85}%` }}
            />
            <span className={`text-sm ${d.highlight ? "text-pink-700 font-medium" : "text-ink-900"}`}>
              {d.value}%
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Line({ chart }: { chart: InsightChartData }) {
  const W = 480;
  const H = 280;
  const pad = { l: 28, r: 28, t: 40, b: 44 };
  const vals = chart.data.map((d) => d.value);
  const lo = Math.floor((Math.min(...vals) - 5) / 5) * 5;
  const hi = Math.ceil((Math.max(...vals) + 5) / 5) * 5;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (chart.data.length - 1);
  const y = (v: number) => pad.t + ((hi - v) * (H - pad.t - pad.b)) / (hi - lo);
  const points = chart.data.map((d, i) => `${x(i)},${y(d.value)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.alt} className="w-full h-auto">
      <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} className="stroke-neutral-200" />
      <polyline points={points} fill="none" strokeWidth={3} className="stroke-neutral-500" />
      {chart.data.map((d, i) => (
        <g key={d.label}>
          <circle cx={x(i)} cy={y(d.value)} r={d.highlight ? 7 : 5} className={d.highlight ? "fill-pink-700" : "fill-neutral-500"} />
          <text x={x(i)} y={y(d.value) - 16} textAnchor="middle" fontSize={19} className={d.highlight ? "fill-pink-700" : "fill-ink-900"}>
            {d.value}%
          </text>
          <text x={x(i)} y={H - 12} textAnchor="middle" fontSize={18} className="fill-ink-900">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
