"use client";

import { useEffect, useRef, useState } from "react";
import type { InsightChartData } from "@/data/insights";
import type { FullLocale } from "@/lib/locale";

/**
 * กราฟสัดส่วนของบทความ — แยกจาก `InsightChart` เพราะข้อมูลไม่ใช่ค่าเดี่ยวต่อแถว
 *
 * - `waffle` 100 ช่องแบ่งตามกลุ่ม (`groups`) ต่อปี (`series`) · ทายจำนวนของกลุ่มแรกก่อนเฉลย
 *   ช่องที่ทายแสดงเป็นเส้นประทันทีที่เลื่อน · ปุ่มปีสลับดูปีอื่นหลังเฉลย
 * - `coverage` แถบละระบบ กรอบเส้นประ = ผู้มีสิทธิ์ (`total`) แถบสี = ลงทะเบียนแล้ว (`value`)
 *   แต่ละแถบเทียบกับผู้มีสิทธิ์ของระบบตัวเอง ไม่ได้เทียบข้ามระบบ
 *
 * ค่าใน `series`/`value`/`total` เป็นหน่วย "พันคน" ตามตารางต้นทาง · สัดส่วนคำนวณที่นี่
 * กติกาเดียวกับ `InsightChart`: HTML ที่ build ออกมาแสดงข้อมูลครบ ลูกเล่นเริ่มหลัง hydrate
 */
const T = {
  th: {
    guessPrompt: (g: string) => `ลองทายก่อน: ใน 100 คน เป็นชาว${g}กี่คน?`,
    people: (n: number) => `${n} คน`,
    reveal: "ดูเฉลย",
    revealed: "เฉลยแล้ว",
    close: "ใกล้มาก! ",
    more: "มากกว่าที่คุณคิด ",
    less: "น้อยกว่าที่คุณคิด ",
    answer: (n: number, y: string) => `คำตอบคือราว ${n} คนในปี ${y} ลองกดดูปีอื่นได้`,
    of100: (n: string) => `${n} จาก 100`,
    year: "ปี",
    million: "ล้าน",
    enrolled: "ลงทะเบียน",
    eligible: "มีสิทธิ์",
    gap: "ยังไม่ลงทะเบียน",
    unit: "คน",
  },
  en: {
    guessPrompt: (g: string) => `Guess first: out of 100 workers, how many are from ${g}?`,
    people: (n: number) => `${n}`,
    reveal: "Reveal",
    revealed: "Revealed",
    close: "Very close! ",
    more: "More than you thought. ",
    less: "Fewer than you thought. ",
    answer: (n: number, y: string) => `The answer is about ${n} in ${y}. Try the other years too.`,
    of100: (n: string) => `${n} of 100`,
    year: "Year",
    million: "million",
    enrolled: "Enrolled",
    eligible: "Eligible",
    gap: "Not enrolled",
    unit: "",
  },
} as const;

// สีของกลุ่มในกราฟ 100 ช่อง — กลุ่มแรกคือกลุ่มที่บทความพูดถึง จึงได้สีเน้นของแบรนด์
const SWATCH = ["bg-pink-700", "bg-ink-700", "bg-ink-300", "bg-ink-100 ring-1 ring-inset ring-ink-300"];

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** ค่าเป็นพันคน → ข้อความที่ผู้อ่านเห็น */
function people(k: number, locale: FullLocale) {
  if (k >= 1000) return `${(k / 1000).toFixed(2)} ${T[locale].million}`;
  return Math.round(k * 1000).toLocaleString(locale === "th" ? "th-TH" : "en-GB");
}

/** แบ่ง 100 ช่องตามสัดส่วน โดยปัดเศษแบบเศษเหลือมากสุดได้ก่อน ผลรวมจึงเป็น 100 เสมอ */
function hundred(values: number[]) {
  const total = values.reduce((a, b) => a + b, 0);
  const raw = values.map((v) => (v / total) * 100);
  const c = raw.map(Math.floor);
  const left = 100 - c.reduce((a, b) => a + b, 0);
  raw
    .map((x, i) => [x - Math.floor(x), i] as const)
    .sort((a, b) => b[0] - a[0])
    .slice(0, left)
    .forEach(([, i]) => c[i]++);
  return { counts: c, pct: raw };
}

export function Waffle({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const series = chart.series ?? [];
  const groups = chart.groups ?? [];
  const last = series.length - 1;
  const [armed, setArmed] = useState(false);
  const [guess, setGuess] = useState(30);
  const [revealed, setRevealed] = useState(false);
  const [year, setYear] = useState(last);
  const [filled, setFilled] = useState(100);
  const timer = useRef(0);
  useEffect(() => setArmed(true), []);
  useEffect(() => () => window.clearInterval(timer.current), []);

  const { counts, pct } = hundred(series[year]?.values ?? []);
  const cells: number[] = [];
  counts.forEach((n, g) => {
    for (let k = 0; k < n; k++) cells.push(g);
  });
  const real = hundred(series[last]?.values ?? []).counts[0];
  const hiding = armed && !revealed;
  const diff = guess - real;

  function reveal() {
    setRevealed(true);
    setYear(last);
    if (reduce) return;
    setFilled(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 4;
      setFilled(Math.min(n, 100));
      if (n >= 100) window.clearInterval(timer.current);
    }, 24);
  }

  return (
    <div>
      {armed && (
        <div className="mb-5 rounded-xl bg-ink-100 p-4">
          <label htmlFor={`waffle-${chart.title}`} className="block text-ink-900">
            {t.guessPrompt(groups[0])}
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              id={`waffle-${chart.title}`}
              type="range"
              min={0}
              max={100}
              value={guess}
              disabled={revealed}
              onChange={(e) => setGuess(Number(e.target.value))}
              className="min-w-0 flex-[1_1_180px] accent-pink-700"
            />
            <output className="min-w-[4.5ch] text-xl text-pink-700 tabular-nums">{t.people(guess)}</output>
            <button
              type="button"
              onClick={reveal}
              disabled={revealed}
              className="rounded-full bg-pink-700 px-5 py-2 text-sm font-medium text-white hover:bg-pink-900 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
            >
              {revealed ? t.revealed : t.reveal}
            </button>
          </div>
          <p className="mt-3 min-h-[1.5em] text-ink-900" aria-live="polite">
            {revealed && (
              <>
                {Math.abs(diff) <= 5 ? t.close : diff < 0 ? t.more : t.less}
                {t.answer(real, series[last].label)}
              </>
            )}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start">
        <div role="img" aria-label={chart.alt} className="grid grid-cols-10 gap-1 max-w-[15rem]">
          {Array.from({ length: 100 }, (_, i) => {
            const cls = hiding
              ? i < guess
                ? "border-2 border-dashed border-pink-700"
                : "bg-ink-100"
              : i < filled
                ? SWATCH[cells[i]]
                : "bg-ink-100";
            return <span key={i} aria-hidden className={`aspect-square rounded-sm ${cls}`} />;
          })}
        </div>
        {!hiding && (
          <div>
            <ul className="space-y-2" aria-hidden>
              {groups.map((g, i) => (
                <li key={g} className="flex items-center gap-2 text-sm text-ink-900">
                  <span className={`h-3.5 w-3.5 shrink-0 rounded-sm ${SWATCH[i]}`} />
                  <span className={i === 0 ? "font-medium" : ""}>{g}</span>
                  <span className="ml-auto pl-3 tabular-nums text-ink-500">
                    {t.of100(pct[i] > 0 && pct[i] < 1 ? "<1" : String(Math.round(pct[i])))} ·{" "}
                    {people(series[year].values[i], locale)}
                    {t.unit && ` ${t.unit}`}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={t.year}>
              <span className="text-xs text-ink-500">{t.year}</span>
              {series.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={i === year}
                  onClick={() => {
                    window.clearInterval(timer.current);
                    setFilled(100);
                    setYear(i);
                  }}
                  className={`rounded-full border px-3 py-1 text-sm tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900 ${
                    i === year ? "border-pink-700 bg-pink-700 text-white" : "border-ink-300 text-ink-900 hover:border-pink-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Coverage({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // สภาพพักคือแถบเต็ม · มี JS และไม่ลดการเคลื่อนไหว จึงเริ่มจากศูนย์แล้วเติมเมื่อเลื่อนมาถึง
  const [grown, setGrown] = useState(true);
  useEffect(() => {
    if (reduce || !ref.current || !("IntersectionObserver" in window)) return;
    setGrown(false);
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          setGrown(true);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    // ไม่ปล่อยให้แถบว่างค้าง ถ้า observer ไม่ยิง (เช่น หน้าต่างเตี้ยมาก)
    const fallback = window.setTimeout(() => setGrown(true), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduce]);

  return (
    <div ref={ref} role="img" aria-label={chart.alt} className="space-y-6">
      {chart.data.map((d, i) => {
        const total = d.total ?? d.value;
        const p = (d.value / total) * 100;
        return (
          <div key={d.label} aria-hidden>
            <p className="mb-2 font-medium text-ink-900">{d.label}</p>
            <div className="relative h-10 rounded-md border-2 border-dashed border-ink-500">
              <span
                className={`absolute inset-y-0 left-0 rounded-l bg-pink-700 ${reduce ? "" : "transition-[width] duration-1000 ease-out"}`}
                style={{ width: `${grown ? p : 0}%`, transitionDelay: reduce ? undefined : `${i * 300}ms` }}
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-sm font-medium text-white">
                {t.enrolled} {people(d.value, locale)}
              </span>
              <span className="absolute inset-y-0 right-3 flex items-center text-lg font-medium tabular-nums text-pink-700">
                {Math.round(p)}%
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap justify-between gap-x-4 text-xs text-ink-500">
              <span>
                {t.eligible} {people(total, locale)} {t.unit}
              </span>
              <span>
                {t.gap} {people(total - d.value, locale)} {t.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
