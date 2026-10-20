"use client";

import { useEffect, useRef, useState } from "react";
import type { InsightChartData } from "@/data/insights";
import type { FullLocale } from "@/lib/locale";
import { Dial, Pick } from "@/components/insights/InsightChartChoice";
import { Coverage, Waffle } from "@/components/insights/InsightChartShare";

/**
 * กราฟของบทความ วาดจากตัวเลขตรงๆ — ไม่ใช้ภาพกราฟสำเร็จรูป
 *
 * เหตุผล: (1) Statista ห้ามคัดลอกภาพกราฟ ต้องสร้างใหม่จากตัวเลขพร้อมเครดิตแหล่งต้นทาง
 * (2) หน้าไทยกับหน้าอังกฤษใช้ข้อมูลชุดเดียวกันแต่ป้ายคนละภาษา (3) ตัวหนังสือเป็นข้อความจริง
 * อ่านด้วยโปรแกรมอ่านหน้าจอได้ และสระ/วรรณยุกต์ไทยซ้อนกันถูกต้องเพราะเบราว์เซอร์วาดเอง
 *
 * ลูกเล่น (ตามคู่มือภาพของ Content Studio "หนึ่งกราฟหนึ่งลูกเล่น ห้ามซ่อนข้อมูล"):
 * - กราฟแท่งที่มี `guess` ให้ผู้อ่านทายค่าของแท่งนั้นก่อนเฉลย
 * - กราฟเส้นวาดตัวเองเมื่อเลื่อนมาถึง มีจุดบอกค่าและส่วนต่างจากปีก่อน และปุ่มเล่นอีกครั้ง
 * **HTML ที่ build ออกมาคือกราฟสมบูรณ์ทุกค่า** ลูกเล่นเริ่มหลัง hydrate เท่านั้น — ไม่มี JavaScript
 * หรือเปิด prefers-reduced-motion ก็ยังเห็นข้อมูลครบ (กราฟแท่งคงการทายไว้แต่ไม่มีภาพเคลื่อนไหว)
 * สีตาม BRAND.md: แท่งปกติ ink-300 · แท่ง/จุดที่เน้น pink-700
 */
const T = {
  th: {
    guessPrompt: (label: string) => `ลองทายก่อน: คนไทยกี่เปอร์เซ็นต์รับข่าวผ่าน ${label}?`,
    reveal: "ดูเฉลย",
    revealed: "เฉลยแล้ว",
    yourGuess: (g: number) => `คุณทาย ${g}% (เส้นประ)`,
    close: "ใกล้มาก! ",
    higher: "สูงกว่าที่คุณคิด ",
    lower: "ต่ำกว่าที่คุณคิด ",
    answer: "คำตอบคือ",
    vsPrev: (d: number) => ` (${d > 0 ? "+" : ""}${d} จากปีก่อน)`,
    replay: "เล่นอีกครั้ง",
    hint: "แตะหรือชี้ที่จุดเพื่อดูค่า",
  },
  en: {
    guessPrompt: (label: string) => `Guess first: what share of Thais get news on ${label}?`,
    reveal: "Reveal",
    revealed: "Revealed",
    yourGuess: (g: number) => `You guessed ${g}% (dashed line)`,
    close: "Very close! ",
    higher: "Higher than you thought. ",
    lower: "Lower than you thought. ",
    answer: "The answer is",
    vsPrev: (d: number) => ` (${d > 0 ? "+" : ""}${d} on the year before)`,
    replay: "Play again",
    hint: "Tap or hover over a point to see its value",
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

export default function InsightChart({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  return (
    <figure className="my-10 rounded-2xl border border-ink-300 bg-white p-5 md:p-6">
      <figcaption className="mb-4">
        <p className="text-h3-m md:text-h3 text-ink-900">{chart.title}</p>
        <p className="mt-1 text-sm text-ink-500">
          {chart.subtitle}
          {chart.type === "line" && <> · {T[locale].hint}</>}
        </p>
      </figcaption>
      {chart.type === "bar" && <Bars chart={chart} locale={locale} />}
      {chart.type === "line" && <Line chart={chart} locale={locale} />}
      {chart.type === "dial" && <Dial chart={chart} locale={locale} />}
      {chart.type === "pick" && <Pick chart={chart} locale={locale} />}
      {chart.type === "waffle" && <Waffle chart={chart} locale={locale} />}
      {chart.type === "coverage" && <Coverage chart={chart} locale={locale} />}
      <p className="mt-4 text-xs text-ink-500">{chart.source}</p>
    </figure>
  );
}

function Bars({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const max = Math.max(...chart.data.map((d) => d.value));
  const scale = (v: number) => (v / max) * 85;
  const target = chart.guess ? chart.data.find((d) => d.label === chart.guess) : undefined;
  // ก่อน hydrate = กราฟครบ (armed=false) · หลัง hydrate ซ่อนค่าของแท่งที่ให้ทายจนกว่าจะกดเฉลย
  const [armed, setArmed] = useState(false);
  const [guess, setGuess] = useState(20);
  const [revealed, setRevealed] = useState(false);
  const [grown, setGrown] = useState(true);
  useEffect(() => {
    if (target) setArmed(true);
  }, [target]);

  function reveal() {
    setRevealed(true);
    if (!reduce) {
      setGrown(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    }
  }

  const hiding = armed && !revealed;
  const diff = target ? guess - target.value : 0;
  const verdict = Math.abs(diff) <= 5 ? t.close : diff < 0 ? t.higher : t.lower;
  const motion = reduce ? "" : "transition-[width,left] duration-1000 ease-out";

  return (
    <div>
      {target && armed && (
        <div className="mb-5 rounded-xl bg-ink-100 p-4">
          <label htmlFor={`guess-${target.label}`} className="block text-ink-900">
            {t.guessPrompt(target.label)}
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              id={`guess-${target.label}`}
              type="range"
              min={0}
              max={100}
              value={guess}
              disabled={revealed}
              onChange={(e) => setGuess(Number(e.target.value))}
              className="min-w-0 flex-[1_1_180px] accent-pink-700"
            />
            <output htmlFor={`guess-${target.label}`} className="min-w-[3.5ch] text-xl text-pink-700 tabular-nums">
              {guess}%
            </output>
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
                {t.yourGuess(guess)} · {verdict}
                {t.answer} <span className="font-medium text-pink-700">{target.value}%</span>
              </>
            )}
          </p>
        </div>
      )}
      <div role="img" aria-label={chart.alt} className="space-y-3">
        {chart.data.map((d, i) => {
          const isTarget = target?.label === d.label;
          const hide = isTarget && hiding;
          const g = Math.min(scale(guess), 100);
          const w = hide ? g : grown || !isTarget ? scale(d.value) : 0;
          const left = hide ? g : isTarget && !grown ? 0 : scale(d.value);
          return (
            <div
              key={d.label}
              aria-hidden
              title={`${d.label}: ${d.value}%`}
              className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] items-center gap-3"
            >
              <span className="text-sm text-ink-900 text-right">{d.label}</span>
              <span className="relative block h-7">
                <span
                  className={`absolute inset-y-0 left-0 rounded ${motion} ${
                    hide
                      ? "border-2 border-dashed border-pink-700 bg-transparent"
                      : d.highlight
                        ? "bg-pink-700"
                        : "bg-ink-300"
                  }`}
                  style={{ width: `${w}%`, transitionDelay: reduce ? undefined : `${i * 60}ms` }}
                />
                {isTarget && revealed && (
                  <span
                    className="absolute -inset-y-1.5 border-l-2 border-dashed border-ink-900"
                    style={{ left: `${Math.min(scale(guess), 100)}%` }}
                  />
                )}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 pl-2 text-sm tabular-nums ${motion} ${
                    d.highlight || hide ? "font-medium text-pink-700" : "text-ink-900"
                  }`}
                  style={{ left: `${Math.min(left, 90)}%` }}
                >
                  {hide ? "?" : `${d.value}%`}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Line({ chart, locale }: { chart: InsightChartData; locale: FullLocale }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const W = 480;
  const H = 280;
  const pad = { l: 28, r: 28, t: 44, b: 44 };
  const vals = chart.data.map((d) => d.value);
  const lo = Math.floor((Math.min(...vals) - 5) / 5) * 5;
  const hi = Math.ceil((Math.max(...vals) + 5) / 5) * 5;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (chart.data.length - 1);
  const y = (v: number) => pad.t + ((hi - v) * (H - pad.t - pad.b)) / (hi - lo);
  const d = chart.data.map((p, i) => `${i ? "L" : "M"}${x(i)} ${y(p.value)}`).join(" ");

  const figRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  // drawn=true คือสภาพพักที่วาดครบ · การเล่นคือสลับเป็น false แล้วกลับเป็น true ในเฟรมถัดไป
  const [drawn, setDrawn] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  function play() {
    if (reduce || !pathRef.current) return;
    setLen(pathRef.current.getTotalLength());
    setDrawn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
  }

  useEffect(() => {
    if (reduce || !figRef.current || !("IntersectionObserver" in window)) return;
    const el = figRef.current;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // play อ่าน ref กับ reduce เท่านั้น การผูก observer ครั้งเดียวต่อค่า reduce จึงถูกต้อง
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const animating = len > 0 && !reduce;
  const lastIdx = chart.data.findIndex((p) => p.highlight);
  const ref50 = 50 >= lo && 50 <= hi;

  return (
    <div ref={figRef}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.alt} className="block h-auto w-full overflow-visible">
          <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} className="stroke-ink-300" />
          {ref50 && (
            <line x1={pad.l} x2={W - pad.r} y1={y(50)} y2={y(50)} strokeDasharray="5 5" className="stroke-ink-300" />
          )}
          <path
            ref={pathRef}
            d={d}
            fill="none"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="stroke-ink-500"
            style={
              animating
                ? {
                    strokeDasharray: len,
                    strokeDashoffset: drawn ? 0 : len,
                    transition: drawn ? "stroke-dashoffset 1.8s ease-in-out" : "none",
                  }
                : undefined
            }
          />
          {lastIdx >= 0 && !reduce && drawn && (
            <circle
              cx={x(lastIdx)}
              cy={y(chart.data[lastIdx].value)}
              r={9}
              className="fill-pink-700 insight-pulse"
              style={animating ? { animationDelay: "1.8s" } : undefined}
            />
          )}
          {chart.data.map((p, i) => {
            const delay = animating && drawn ? `${i * 300}ms` : "0ms";
            const fade = animating ? { opacity: drawn ? 1 : 0, transition: drawn ? `opacity .35s ${delay}` : "none" } : undefined;
            const prev = i > 0 ? chart.data[i - 1].value : null;
            return (
              <g key={p.label}>
                <text
                  x={x(i)}
                  y={y(p.value) - 16}
                  textAnchor="middle"
                  fontSize={19}
                  className={p.highlight ? "fill-pink-700" : "fill-ink-900"}
                  style={fade}
                >
                  {p.value}%
                </text>
                <circle
                  cx={x(i)}
                  cy={y(p.value)}
                  r={p.highlight ? 8 : 6}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.label}: ${p.value}%${prev !== null ? t.vsPrev(p.value - prev) : ""}`}
                  className={`cursor-pointer outline-none focus-visible:stroke-ink-900 focus-visible:[stroke-width:3] ${
                    p.highlight ? "fill-pink-700" : "fill-ink-500"
                  }`}
                  style={fade}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                />
                {/* พื้นที่แตะที่ใหญ่กว่าจุด สำหรับนิ้วบนมือถือ */}
                <circle
                  cx={x(i)}
                  cy={y(p.value)}
                  r={20}
                  fill="transparent"
                  aria-hidden
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(i)}
                />
                <text x={x(i)} y={H - 12} textAnchor="middle" fontSize={18} className="fill-ink-900">
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
        {active !== null && (
          <div
            aria-hidden
            className="pointer-events-none absolute whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1.5 text-sm text-white"
            style={{
              left: `${(x(active) / W) * 100}%`,
              top: `${(y(chart.data[active].value) / H) * 100}%`,
              transform: `translate(${active === 0 ? "-10%" : active === chart.data.length - 1 ? "-90%" : "-50%"}, -150%)`,
            }}
          >
            {chart.data[active].label} · {chart.data[active].value}%
            {active > 0 && t.vsPrev(chart.data[active].value - chart.data[active - 1].value)}
          </div>
        )}
      </div>
      {!reduce && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={play}
            className="rounded-full border border-pink-700 px-4 py-1.5 text-sm font-medium text-pink-700 hover:bg-pink-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900"
          >
            {t.replay}
          </button>
        </div>
      )}
    </div>
  );
}
