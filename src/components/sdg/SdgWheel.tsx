"use client";

import { useState } from "react";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import { SDG, SDG_IDS, sdgAria, type SdgId } from "@/data/sdg";
import { projects } from "@/data/projects";

type SdgWheelProps = {
  locale?: "th" | "en";
};

/** จำนวนโครงการต่อเป้าหมาย (นับทั้งเป้าหมายหลักและรอง — เกณฑ์เดียวกับ SdgPosterGrid) */
function projectCount(id: SdgId): number {
  return projects.filter((p) => p.sdg.includes(id)).length;
}

const CX = 210;
const CY = 210;
const R_INNER = 92;
const SEG_BASE = 16;
const SEG_EXTRA = 70;
const R_LABEL = 192;
const GAP_DEG = 2.4;

function polar(r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

/** annular sector — วงแหวนหนึ่งซี่ */
function arcPath(r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r1, a0);
  const [x1, y1] = polar(r1, a1);
  const [x2, y2] = polar(r0, a1);
  const [x3, y3] = polar(r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r1} ${r1} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${r0} ${r0} 0 ${large} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
}

/**
 * วงล้อ SDG อินเทอร์แอกทีฟ (เฉพาะหน้า /sdg — หน้าเดียวที่ได้รับยกเว้นกฎ ≤6 สี ตาม PART H)
 * ความยาวซี่ = จำนวนโครงการจริง (Rigorous — PART A1) · ซี่ว่างสั้นและจาง
 * hover/focus = ชื่อเป้าหมาย+จำนวนแสดงกลางวงล้อ · คลิก = anchor ไปการ์ดเป้าหมายนั้นด้านล่าง
 * ตัวอักษรใช้สี deep เท่านั้น · แอนิเมชันปิดอัตโนมัติเมื่อ prefers-reduced-motion
 */
export default function SdgWheel({ locale = "th" }: SdgWheelProps) {
  const [hovered, setHovered] = useState<SdgId | null>(null);

  const counts = Object.fromEntries(SDG_IDS.map((id) => [id, projectCount(id)])) as Record<
    SdgId,
    number
  >;
  const maxCount = Math.max(...Object.values(counts));
  const covered = SDG_IDS.filter((id) => counts[id] > 0).length;

  const seg = 360 / 17;

  const t =
    locale === "th"
      ? {
          coveredLabel: "เป้าหมายที่ครอบคลุม",
          projects: (n: number) => `${n} โครงการ`,
          open: "เปิดรับความร่วมมือ",
          wheelLabel: "วงล้อเป้าหมายการพัฒนาที่ยั่งยืน 17 ข้อ ความยาวแต่ละซี่ตามจำนวนโครงการ",
        }
      : {
          coveredLabel: "goals covered",
          projects: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
          open: "Open for collaboration",
          wheelLabel: "Wheel of all 17 Sustainable Development Goals, segment length shows project count",
        };

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <svg viewBox="0 0 420 420" role="group" aria-label={t.wheelLabel} className="block w-full">
        {SDG_IDS.map((id, i) => {
          const goal = SDG[id];
          const count = counts[id];
          const has = count > 0;
          const a0 = i * seg + GAP_DEG / 2;
          const a1 = (i + 1) * seg - GAP_DEG / 2;
          const r1 = R_INNER + SEG_BASE + (has ? (count / maxCount) * SEG_EXTRA : 0);
          const mid = (a0 + a1) / 2;
          const [lx, ly] = polar(R_LABEL, mid);
          const dimOthers = hovered !== null && hovered !== id;
          return (
            <a
              key={id}
              href={`#sdg-${id}`}
              aria-label={`${sdgAria(id, locale)} — ${has ? t.projects(count) : t.open}`}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
              className="outline-none"
            >
              <g
                className="animate-[sdg-pop_450ms_cubic-bezier(0.2,0,0,1)_both] motion-reduce:animate-none"
                style={{ animationDelay: `${i * 35}ms`, transformOrigin: "210px 210px" }}
              >
                <path
                  d={arcPath(R_INNER, r1, a0, a1)}
                  fill={goal.pure}
                  className="transition-opacity duration-150 ease-brand"
                  opacity={dimOthers ? 0.25 : has ? (hovered === id ? 1 : 0.92) : 0.3}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13"
                  fontWeight="500"
                  fill={goal.deep}
                  className="transition-opacity duration-150 ease-brand"
                  opacity={dimOthers ? 0.3 : 1}
                >
                  {id}
                </text>
                {hovered === id && (
                  <path
                    d={arcPath(R_INNER - 6, R_INNER - 3, a0, a1)}
                    fill={goal.pure}
                    aria-hidden
                  />
                )}
              </g>
            </a>
          );
        })}
      </svg>

      {/* ศูนย์กลางวงล้อ — ตัวเลขรวม หรือรายละเอียดซี่ที่ hover */}
      <div
        aria-live="polite"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[150px] text-center">
          {hovered === null ? (
            <>
              <p className="text-4xl font-medium leading-none text-ink-900">
                <AnimatedCounter value={covered} duration={1200} />
                <span className="text-ink-500">/17</span>
              </p>
              <p className="mt-1.5 text-[13px] font-medium leading-[1.4] text-ink-500">
                {t.coveredLabel}
              </p>
            </>
          ) : (
            <>
              <p
                className="text-3xl font-medium leading-none"
                style={{ color: SDG[hovered].deep }}
              >
                {hovered}
              </p>
              <p
                className="mt-1.5 text-[13px] font-medium leading-[1.4]"
                style={{ color: SDG[hovered].deep }}
              >
                {SDG[hovered][locale]}
              </p>
              <p className="mt-1 text-[13px] leading-[1.4] text-ink-500">
                {counts[hovered] > 0 ? t.projects(counts[hovered]) : t.open}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
