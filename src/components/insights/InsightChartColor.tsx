"use client";

import { useEffect, useRef, useState } from "react";
import type { InsightChartData } from "@/data/insights";
import type { FullLocale } from "@/lib/locale";

/**
 * กราฟชุดสี — สำหรับบทความที่ประกาศ `palette` (คู่สี SDG สองเป้าหมาย) ไว้ระดับบทความ
 *
 * ทำไมแยกจาก `InsightChart`: กราฟชุดแรกใช้แท่ง ink-300 กับ pink-700 ซึ่งผู้ใช้เห็นว่า "เป็นสีเทา/ดำ"
 * (27 ต.ค. 2569) และ BRAND.md A2 สงวนชมพูไว้ให้การกระทำ (ปุ่ม/ลิงก์) — กราฟชุดนี้จึงใช้คู่สี SDG
 * เดียวกับภาพ hero ของบทความ (BRAND.md B3: เส้น/แท่ง chart ใช้ `pure` · ตัวอักษรใช้ `deep` · พื้นใช้ `tint`)
 * ปุ่มยังเป็นชมพูตามเดิม กราฟของบทความเก่าไม่เปลี่ยน
 *
 * - `race`  แท่งแนวนอนยืดขึ้นทีละแท่งพร้อมตัวเลขนับขึ้นเมื่อเลื่อนมาถึง · มี `guess` ได้ (ทายก่อนเฉลย)
 * - `area`  เส้น + พื้นไล่สีวาดตัวเองจากซ้ายไปขวา · แตะจุดดูค่าและส่วนต่างจากปีก่อน · ปุ่มเล่นอีกครั้ง
 * - `split` แถบ 100% แบ่งสัดส่วน ให้ผู้อ่านเลือกก่อนว่าส่วนไหนมากสุด แล้วแถบค่อยเติมทีละส่วน
 *
 * กติกาเดียวกับกราฟชุดแรก: **HTML ที่ build ออกมาแสดงข้อมูลครบทุกค่า** ลูกเล่นเริ่มหลัง hydrate
 * ไม่มี JavaScript หรือเปิด prefers-reduced-motion ก็ยังเห็นข้อมูลครบ
 */

export type Swatch = { pure: string; deep: string; tint: string; whiteOk: boolean };
export type Palette = { a: Swatch; b: Swatch };

const T = {
  th: {
    reveal: "ดูเฉลย",
    revealed: "เฉลยแล้ว",
    close: "ใกล้มาก! ",
    higher: "มากกว่าที่คุณคิด ",
    lower: "น้อยกว่าที่คุณคิด ",
    answer: "คำตอบคือ",
    yourGuess: "คุณทาย",
    replay: "เล่นอีกครั้ง",
    hint: "แตะหรือชี้ที่จุดเพื่อดูค่า",
    vsPrev: (d: string) => ` (${d} จากปีก่อน)`,
    right: "ถูกต้อง! ",
    wrong: (x: string) => `ยังไม่ใช่ คุณเลือก "${x}" `,
    biggest: (x: string, v: string) => `ส่วนที่มากที่สุดคือ "${x}" ${v}`,
  },
  en: {
    reveal: "Reveal",
    revealed: "Revealed",
    close: "Very close! ",
    higher: "Higher than you thought. ",
    lower: "Lower than you thought. ",
    answer: "The answer is",
    yourGuess: "You guessed",
    replay: "Play again",
    hint: "Tap or hover over a point to see its value",
    vsPrev: (d: string) => ` (${d} on the year before)`,
    right: "Correct! ",
    wrong: (x: string) => `Not quite. You picked "${x}". `,
    biggest: (x: string, v: string) => `The largest share is "${x}" at ${v}`,
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

/** เรียก `play` ครั้งเดียวเมื่อกราฟเลื่อนเข้ามาในจอ */
function useOnScreen(ref: React.RefObject<HTMLElement | null>, play: () => void, reduce: boolean) {
  useEffect(() => {
    if (reduce || !ref.current || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
}

const fmt = (v: number, locale: FullLocale, unit = "%") => {
  const n = v.toLocaleString(locale === "th" ? "th-TH" : "en-GB", { maximumFractionDigits: 2 });
  return unit === "%" ? `${n}%` : `${n}${unit}`;
};

/** ตัวเลขที่นับขึ้นจาก 0 เมื่อ `run` เปลี่ยน — สภาพพักคือค่าจริง */
function CountUp({ to, run, locale, unit, delay = 0 }: { to: number; run: number; locale: FullLocale; unit?: string; delay?: number }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const dec = Number.isInteger(to) ? 0 : 1;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / 900));
      const e = 1 - Math.pow(1 - p, 3);
      setV(Number((to * e).toFixed(dec)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setV(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, delay]);
  return <>{fmt(v, locale, unit)}</>;
}

export default function InsightChartColor({ chart, locale, palette }: { chart: InsightChartData; locale: FullLocale; palette: Palette }) {
  return (
    <figure
      className="my-10 rounded-2xl border bg-white p-5 md:p-6"
      style={{ borderColor: palette.a.tint, boxShadow: `inset 0 4px 0 ${palette.a.pure}` }}
    >
      <figcaption className="mb-4">
        <p className="text-h3-m md:text-h3 text-ink-900">{chart.title}</p>
        <p className="mt-1 text-sm text-ink-500">
          {chart.subtitle}
          {chart.type === "area" && <> · {T[locale].hint}</>}
        </p>
      </figcaption>
      {chart.type === "race" && <Race chart={chart} locale={locale} palette={palette} />}
      {chart.type === "area" && <Area chart={chart} locale={locale} palette={palette} />}
      {chart.type === "split" && <Split chart={chart} locale={locale} palette={palette} />}
      <p className="mt-4 text-xs text-ink-500">{chart.source}</p>
    </figure>
  );
}

function Race({ chart, locale, palette }: { chart: InsightChartData; locale: FullLocale; palette: Palette }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const unit = chart.unit ?? "%";
  const max = Math.max(...chart.data.map((d) => d.value));
  const scale = (v: number) => (v / max) * 82;
  const target = chart.guess ? chart.data.find((d) => d.label === chart.guess) : undefined;
  const guessMax = chart.guessMax ?? 100;

  const ref = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(true);
  const [run, setRun] = useState(0);
  const [armed, setArmed] = useState(false);
  const [guess, setGuess] = useState(Math.round(guessMax / 4));
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (target) setArmed(true);
  }, [target]);

  function play() {
    if (reduce) return;
    setGrown(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setGrown(true);
        setRun((r) => r + 1);
      }),
    );
  }
  useOnScreen(ref, play, reduce);

  function reveal() {
    setRevealed(true);
    play();
  }

  const hiding = armed && !revealed;
  const diff = target ? guess - target.value : 0;
  const near = target ? Math.max(3, target.value * 0.08) : 0;
  const verdict = Math.abs(diff) <= near ? t.close : diff < 0 ? t.higher : t.lower;
  const motion = reduce ? "" : "transition-[width,left] duration-1000 ease-out";

  return (
    <div ref={ref}>
      {target && armed && (
        <div className="mb-5 rounded-xl p-4" style={{ background: palette.a.tint }}>
          <label htmlFor={`race-${chart.title}`} className="block text-ink-900">
            {chart.prompt}
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              id={`race-${chart.title}`}
              type="range"
              min={0}
              max={guessMax}
              value={guess}
              disabled={revealed}
              onChange={(e) => setGuess(Number(e.target.value))}
              className="min-w-0 flex-[1_1_180px]"
              style={{ accentColor: palette.b.deep }}
            />
            <output htmlFor={`race-${chart.title}`} className="min-w-[4ch] text-xl tabular-nums" style={{ color: palette.b.deep }}>
              {fmt(guess, locale, unit)}
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
                {t.yourGuess} {fmt(guess, locale, unit)} · {verdict}
                {t.answer}{" "}
                <span className="font-medium" style={{ color: palette.b.deep }}>
                  {fmt(target.value, locale, unit)}
                </span>
                {chart.answerNote && <> {chart.answerNote}</>}
              </>
            )}
          </p>
        </div>
      )}
      <div role="img" aria-label={chart.alt} className="space-y-2.5">
        {chart.data.map((d, i) => {
          const isTarget = target?.label === d.label;
          const hide = isTarget && hiding;
          const hl = d.highlight || isTarget;
          const g = Math.min((guess / max) * 82, 100);
          const w = hide ? g : grown ? scale(d.value) : 0;
          const color = hl ? palette.b.pure : palette.a.pure;
          return (
            <div
              key={d.label}
              aria-hidden
              title={hide ? undefined : `${d.label}: ${fmt(d.value, locale, unit)}`}
              className="grid grid-cols-1 gap-1 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-3"
            >
              <span className={`text-sm leading-snug sm:text-right ${hl ? "font-medium" : "text-ink-900"}`} style={hl ? { color: palette.b.deep } : undefined}>
                {d.label}
              </span>
              <span className="relative block h-7">
                <span
                  className={`absolute inset-y-0 left-0 rounded-md ${motion}`}
                  style={{
                    width: `${w}%`,
                    transitionDelay: reduce || hide ? undefined : `${i * 80}ms`,
                    background: hide ? "transparent" : color,
                    border: hide ? `2px dashed ${palette.b.deep}` : undefined,
                    opacity: hl || hide ? 1 : 0.82,
                  }}
                />
                {isTarget && revealed && (
                  <span
                    className="absolute -inset-y-1.5 border-l-2 border-dashed border-ink-900"
                    style={{ left: `${Math.min((guess / max) * 82, 100)}%` }}
                  />
                )}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 pl-2 text-sm tabular-nums whitespace-nowrap ${motion} ${hl ? "font-medium" : "text-ink-900"}`}
                  style={{ left: `${Math.min(hide ? g : scale(d.value), 86)}%`, color: hl ? palette.b.deep : undefined }}
                >
                  {hide ? "?" : <CountUp to={d.value} run={run} locale={locale} unit={unit} delay={i * 80} />}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Area({ chart, locale, palette }: { chart: InsightChartData; locale: FullLocale; palette: Palette }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const unit = chart.unit ?? "%";
  const W = 520;
  const H = 300;
  const pad = { l: 24, r: 24, t: 48, b: 44 };
  const vals = chart.data.map((d) => d.value);
  const hi = Math.max(...vals) * 1.12;
  const n = chart.data.length;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (n - 1);
  const y = (v: number) => pad.t + ((hi - v) * (H - pad.t - pad.b)) / hi;
  const line = chart.data.map((p, i) => `${i ? "L" : "M"}${x(i)} ${y(p.value)}`).join(" ");
  const area = `${line} L${x(n - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`;
  const gid = `g-${chart.title.length}-${n}-${Math.round(hi)}`;
  const every = n > 10 ? 2 : 1;
  const labelled = (i: number) => i === 0 || i === n - 1 || chart.data[i].highlight;

  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  function play() {
    if (reduce) return;
    setAnimating(true);
    setDrawn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
  }
  useOnScreen(ref, play, reduce);
  const dur = 2.2;

  return (
    <div ref={ref}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.alt} className="block h-auto w-full overflow-visible">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.a.pure} stopOpacity={0.45} />
              <stop offset="100%" stopColor={palette.a.pure} stopOpacity={0.04} />
            </linearGradient>
            <clipPath id={`${gid}-clip`}>
              <rect
                x={0}
                y={0}
                height={H}
                width={animating && !drawn ? 0 : W}
                style={animating ? { transition: drawn ? `width ${dur}s cubic-bezier(0.2,0,0,1)` : "none" } : undefined}
              />
            </clipPath>
          </defs>
          <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke={palette.a.tint} strokeWidth={2} />
          <g clipPath={`url(#${gid}-clip)`}>
            <path d={area} fill={`url(#${gid})`} />
            <path d={line} fill="none" stroke={palette.a.pure} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {chart.data.map((p, i) => {
            const delay = animating && drawn ? `${(i / (n - 1)) * dur}s` : "0s";
            const fade = animating ? { opacity: drawn ? 1 : 0, transition: drawn ? `opacity .3s ${delay}` : "none" } : undefined;
            const prev = i > 0 ? chart.data[i - 1].value : null;
            const hl = Boolean(p.highlight) || i === n - 1;
            const diff = prev !== null ? p.value - prev : 0;
            const dtxt = `${diff > 0 ? "+" : ""}${fmt(Number(diff.toFixed(2)), locale, unit)}`;
            return (
              <g key={p.label}>
                {labelled(i) && (
                  <text
                    x={x(i)}
                    y={y(p.value) - (i === 0 ? 22 : 16)}
                    textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
                    fontSize={20}
                    fontWeight={500}
                    fill={hl ? palette.b.deep : palette.a.deep}
                    style={fade}
                  >
                    {unit === "%" ? fmt(p.value, locale, unit) : fmt(p.value, locale, "")}
                  </text>
                )}
                {hl && !reduce && drawn && i === n - 1 && (
                  <circle cx={x(i)} cy={y(p.value)} r={9} fill={palette.b.pure} className="insight-pulse" style={animating ? { animationDelay: `${dur}s` } : undefined} />
                )}
                <circle
                  cx={x(i)}
                  cy={y(p.value)}
                  r={hl ? 8 : 5.5}
                  fill={hl ? palette.b.pure : "#fff"}
                  stroke={hl ? palette.b.deep : palette.a.pure}
                  strokeWidth={hl ? 2 : 3}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.label}: ${fmt(p.value, locale, unit)}${prev !== null ? t.vsPrev(dtxt) : ""}`}
                  className="cursor-pointer outline-none focus-visible:[stroke-width:4]"
                  style={fade}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                />
                <circle cx={x(i)} cy={y(p.value)} r={18} fill="transparent" aria-hidden onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onClick={() => setActive(i)} />
                {(i % every === 0 || i === n - 1) && (
                  <text x={x(i)} y={H - 14} textAnchor="middle" fontSize={16} className="fill-ink-700">
                    {p.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {active !== null && (
          <div
            aria-hidden
            className="pointer-events-none absolute whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm text-white"
            style={{
              background: palette.a.deep,
              left: `${(x(active) / W) * 100}%`,
              top: `${(y(chart.data[active].value) / H) * 100}%`,
              transform: `translate(${active <= 1 ? "-10%" : active >= n - 2 ? "-90%" : "-50%"}, -150%)`,
            }}
          >
            {chart.data[active].label} · {fmt(chart.data[active].value, locale, unit)}
            {active > 0 &&
              t.vsPrev(
                `${chart.data[active].value - chart.data[active - 1].value > 0 ? "+" : ""}${fmt(
                  Number((chart.data[active].value - chart.data[active - 1].value).toFixed(2)),
                  locale,
                  unit,
                )}`,
              )}
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

function Split({ chart, locale, palette }: { chart: InsightChartData; locale: FullLocale; palette: Palette }) {
  const t = T[locale];
  const reduce = useReducedMotion();
  const unit = chart.unit ?? "%";
  const total = chart.data.reduce((s, d) => s + d.value, 0);
  const top = chart.data.reduce((a, d) => (d.value > a.value ? d : a), chart.data[0]);
  const fills = [
    { bg: palette.a.pure, fg: palette.a.whiteOk ? "#fff" : "#1A1613", key: palette.a.deep },
    { bg: palette.b.pure, fg: palette.b.whiteOk ? "#fff" : "#1A1613", key: palette.b.deep },
    { bg: palette.a.tint, fg: palette.a.deep, key: palette.a.deep },
    { bg: palette.b.tint, fg: palette.b.deep, key: palette.b.deep },
  ];

  const [armed, setArmed] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [grown, setGrown] = useState(true);
  const [run, setRun] = useState(0);
  useEffect(() => setArmed(true), []);

  function pick(i: number) {
    setPicked(i);
    if (reduce) return;
    setGrown(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setGrown(true);
        setRun((r) => r + 1);
      }),
    );
  }

  const hiding = armed && picked === null;
  return (
    <div>
      {armed && (
        <div className="mb-5 rounded-xl p-4" style={{ background: palette.a.tint }}>
          <p className="text-ink-900" id={`split-${chart.title.length}`}>
            {chart.prompt}
          </p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby={`split-${chart.title.length}`}>
            {chart.data.map((d, i) => (
              <button
                key={d.label}
                type="button"
                disabled={picked !== null}
                aria-pressed={picked === i}
                onClick={() => pick(i)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900 ${
                  picked === i ? "border-pink-700 bg-pink-700 text-white" : "border-ink-300 bg-white text-ink-900 hover:border-pink-700 disabled:opacity-70"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p className="mt-3 min-h-[1.5em] text-ink-900" aria-live="polite">
            {picked !== null && (
              <>
                {chart.data[picked].label === top.label ? t.right : t.wrong(chart.data[picked].label)}
                {t.biggest(top.label, fmt(top.value, locale, unit))}
                {chart.answerNote && <> {chart.answerNote}</>}
              </>
            )}
          </p>
        </div>
      )}
      <div role="img" aria-label={chart.alt}>
        <div className="flex h-16 w-full overflow-hidden rounded-xl" style={{ background: hiding ? palette.a.tint : "#F1EEE9" }}>
          {chart.data.map((d, i) => {
            const f = fills[i % fills.length];
            const w = (d.value / total) * 100;
            return (
              <div
                key={d.label}
                aria-hidden
                className={`flex h-full items-center justify-center overflow-hidden ${reduce ? "" : "transition-[width] duration-700 ease-out"}`}
                style={{
                  width: hiding ? `${100 / chart.data.length}%` : grown ? `${w}%` : "0%",
                  transitionDelay: reduce ? undefined : `${i * 350}ms`,
                  background: hiding ? "transparent" : f.bg,
                  borderRight: hiding && i < chart.data.length - 1 ? `2px dashed ${palette.a.deep}` : undefined,
                  color: hiding ? palette.a.deep : f.fg,
                }}
              >
                <span className="text-lg font-medium tabular-nums">
                  {hiding ? "?" : <CountUp to={d.value} run={run} locale={locale} unit={unit} delay={i * 350} />}
                </span>
              </div>
            );
          })}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-900">
          {chart.data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-3 rounded-sm" style={{ background: fills[i % fills.length].bg, boxShadow: `inset 0 0 0 1px ${fills[i % fills.length].key}` }} />
              {d.label}
              {!hiding && <span className="tabular-nums text-ink-500">{fmt(d.value, locale, unit)}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
