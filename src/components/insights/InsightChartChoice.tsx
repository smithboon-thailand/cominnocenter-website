"use client";

import { useEffect, useRef, useState } from "react";
import type { InsightChartData } from "@/data/insights";
import type { FullLocale } from "@/lib/locale";

/**
 * กราฟที่ให้ผู้อ่าน "ลงมือ" ก่อนดูข้อมูล — แยกจาก `InsightChart` เพราะไม่ได้เป็นแท่ง/เส้นธรรมดา
 *
 * - `dial` แถบเลื่อนทีละขั้น (เช่น คนเขียน → AI เขียน) ตัวเลขใหญ่ไต่ตาม · บล็อกบอกสัดส่วนคน/AI
 *   ต่อขั้นมาจาก `aiShare` ของแต่ละแถว · คอลัมน์เล็กทุกขั้นแสดงค่าครบตลอด กดเพื่อกระโดดไปขั้นนั้นได้
 * - `pick` ให้เลือกงานที่ตัวเองโอเค (เรียงตาม `order` เพื่อไม่ให้ลำดับเผยคำตอบ) แล้วกดเทียบ
 *
 * กติกาเดียวกับ `InsightChart`: HTML ที่ build ออกมาแสดงข้อมูลครบทุกค่า ลูกเล่นเริ่มหลัง hydrate
 */
const T = {
  th: {
    dialLabel: "ระดับการใช้ AI",
    human: "คน",
    ai: "AI",
    comfortable: "สบายใจ",
    compare: "เทียบกับคนอื่น",
    again: "เลือกใหม่",
    none: (top: number) => `คุณไม่ได้เลือกงานไหนเลย ใกล้เคียงกับคนส่วนใหญ่ที่ยังลังเล งานที่คนสบายใจที่สุดก็มีคนสบายใจเพียง ${top}%`,
    picked: (n: number, avg: number) => `คุณเลือก ${n} งาน งานที่คุณเลือกมีคนสบายใจเฉลี่ย ${avg}%`,
    backstage: " ส่วนใหญ่เป็นงานหลังบ้านที่คนยอมรับได้มากที่สุด",
    ahead: " คุณเปิดรับ AI ในงานที่คนอื่นยังลังเล",
    yours: "งานที่คุณเลือก",
    pickHint: "เลือกได้หลายข้อ แล้วกดเทียบ",
  },
  en: {
    dialLabel: "How much AI is involved",
    human: "Human",
    ai: "AI",
    comfortable: "comfortable",
    compare: "Compare with others",
    again: "Choose again",
    none: (top: number) =>
      `You picked nothing, much like most people, who are still unsure. Even the most accepted task is comfortable for only ${top}%.`,
    picked: (n: number, avg: number) => `You picked ${n} task${n === 1 ? "" : "s"}. On average, ${avg}% of people are comfortable with them.`,
    backstage: " Mostly behind-the-scenes work that people accept most readily.",
    ahead: " You are more open to AI than most people here.",
    yours: "Your pick",
    pickHint: "Pick as many as you like, then compare",
  },
} as const;

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

export function Dial({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(chart.data[0].value);
  const raf = useRef(0);
  const max = Math.max(...chart.data.map((d) => d.value));
  const cur = chart.data[step];
  const blocks = 4;
  const aiBlocks = Math.round((cur.aiShare ?? 0) * blocks);

  function go(i: number) {
    setStep(i);
    const to = chart.data[i].value;
    cancelAnimationFrame(raf.current);
    if (reduce) {
      setShown(to);
      return;
    }
    const from = shown;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 500);
      setShown(Math.round(from + (to - from) * p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <p className="text-6xl md:text-7xl font-medium tabular-nums text-pink-700" aria-hidden>
          {shown}%
        </p>
        <div>
          <p className="min-h-[3em] text-lg text-ink-900" aria-live="polite">
            {cur.detail ?? cur.label} · {cur.value}% {t.comfortable}
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {Array.from({ length: blocks }, (_, k) => (
              <span
                key={k}
                className={`flex h-8 flex-1 items-center justify-center rounded text-xs font-medium transition-colors duration-300 ${
                  k < aiBlocks ? "bg-pink-700 text-white" : "bg-ink-300 text-ink-900"
                }`}
              >
                {k < aiBlocks ? t.ai : t.human}
              </span>
            ))}
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={chart.data.length - 1}
        step={1}
        value={step}
        onChange={(e) => go(Number(e.target.value))}
        aria-label={t.dialLabel}
        aria-valuetext={cur.detail ?? cur.label}
        className="mt-5 w-full accent-pink-700"
      />
      <div role="img" aria-label={chart.alt} className="mt-4 grid grid-cols-4 items-end gap-2 sm:gap-4">
        {chart.data.map((d, i) => (
          <button
            key={d.label}
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => go(i)}
            className="group flex flex-col items-center text-center"
          >
            <span className={`text-sm tabular-nums ${i === step ? "font-medium text-pink-700" : "text-ink-900"}`}>{d.value}%</span>
            <span className="mt-1 flex h-28 w-full items-end">
              <span
                className={`block w-full rounded-t transition-colors ${i === step ? "bg-pink-700" : "bg-ink-300 group-hover:bg-ink-500"}`}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </span>
            <span className="mt-2 text-xs leading-snug text-ink-700">{d.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Pick({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const order = chart.order ?? chart.data.map((_, i) => i);
  const max = Math.max(...chart.data.map((d) => d.value));
  const scale = (v: number) => (v / max) * 82;
  // ก่อน hydrate = ผลครบ (armed=false) · หลัง hydrate ซ่อนผลจนกว่าจะกดเทียบ
  const [armed, setArmed] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [grown, setGrown] = useState(true);
  useEffect(() => setArmed(true), []);

  function toggle(i: number) {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  }
  function compare() {
    setDone(true);
    if (!reduce) {
      setGrown(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    }
  }
  function again() {
    setDone(false);
    setPicked([]);
  }

  const showResults = !armed || done;
  const top = Math.max(...chart.data.map((d) => d.value));
  const avg = picked.length ? Math.round(picked.reduce((s, i) => s + chart.data[i].value, 0) / picked.length) : 0;
  const verdict = !picked.length ? t.none(top) : t.picked(picked.length, avg) + (avg >= 45 ? t.backstage : t.ahead);

  return (
    <div>
      {armed && (
        <div className="mb-5">
          <p className="mb-3 text-sm text-ink-500">{t.pickHint}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={chart.title}>
            {order.map((i) => {
              const on = picked.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  disabled={done}
                  onClick={() => toggle(i)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900 disabled:cursor-default ${
                    on ? "border-pink-700 bg-pink-700 text-white" : "border-ink-300 bg-white text-ink-900 hover:border-pink-700"
                  }`}
                >
                  {on && <span aria-hidden>✓ </span>}
                  {chart.data[i].label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {!done ? (
              <button
                type="button"
                onClick={compare}
                className="rounded-full bg-pink-700 px-5 py-2 text-sm font-medium text-white hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
              >
                {t.compare}
              </button>
            ) : (
              <button
                type="button"
                onClick={again}
                className="rounded-full border border-pink-700 px-5 py-2 text-sm font-medium text-pink-700 hover:bg-pink-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
              >
                {t.again}
              </button>
            )}
          </div>
          <p className="mt-3 min-h-[1.5em] text-ink-900" aria-live="polite">
            {done ? verdict : ""}
          </p>
        </div>
      )}
      {showResults && (
        <div role="img" aria-label={chart.alt} className="space-y-2.5">
          {chart.data.map((d, i) => {
            const mine = done && picked.includes(i);
            const w = grown ? scale(d.value) : 0;
            const motion = reduce ? "" : "transition-[width,left] duration-700 ease-out";
            return (
              <div
                key={d.label}
                aria-hidden
                title={`${d.label}: ${d.value}%`}
                className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[13rem_1fr] items-center gap-3"
              >
                <span className={`text-sm text-right leading-snug ${mine ? "font-medium text-pink-700" : "text-ink-900"}`}>
                  {mine && <span className="sr-only">{t.yours}: </span>}
                  {mine && <span aria-hidden>✓ </span>}
                  {d.label}
                </span>
                <span className="relative block h-6">
                  <span
                    className={`absolute inset-y-0 left-0 rounded ${motion} ${mine ? "bg-pink-700" : "bg-ink-300"}`}
                    style={{ width: `${w}%`, transitionDelay: reduce ? undefined : `${i * 50}ms` }}
                  />
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 pl-2 text-sm tabular-nums ${motion} ${mine ? "font-medium text-pink-700" : "text-ink-900"}`}
                    style={{ left: `${w}%`, transitionDelay: reduce ? undefined : `${i * 50}ms` }}
                  >
                    {d.value}%
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
