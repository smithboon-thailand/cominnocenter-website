import SectionHeader from "@/components/ui/SectionHeader";
import { processSteps, processCopy } from "@/data/process";

type ProcessStepsProps = {
  locale?: "th" | "en";
};

/**
 * "หลังจากส่งข้อความ" — สามขั้นตอนที่เกิดขึ้นหลังผู้ติดต่อกดส่ง (Phase 6.1)
 *
 * ลดความลังเลก่อนกดส่ง: คนที่ไม่รู้ว่าจะเจออะไรต่อมักไม่กด
 *
 * ใช้ <ol> จริงเพราะเป็นลำดับขั้น — screen reader จึงอ่านลำดับได้เอง
 * เลข 01–03 บนการ์ดเป็นกราฟิกล้วน (aria-hidden) สไตล์เดียวกับเลข ghost
 * ของการ์ดบริการในหน้า Expertise
 */
export default function ProcessSteps({ locale = "th" }: ProcessStepsProps) {
  const steps = processSteps[locale];
  const t = processCopy[locale];

  return (
    <>
      <SectionHeader
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3" aria-label={t.listLabel}>
        {steps.map((step) => (
          <li
            key={step.number}
            className="relative overflow-hidden rounded-lg border border-ink-300 bg-white p-6"
          >
            {/* มุมกระดาษพับโทน Ink — ล้อภาษา paper-craft ของชุดภาพ Phase 2 */}
            <span
              aria-hidden
              className="absolute right-0 top-0 h-0 w-0"
              style={{
                borderStyle: "solid",
                borderWidth: "0 14px 14px 0",
                borderColor: "var(--ink-0) var(--ink-0) var(--ink-300) var(--ink-300)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-2 select-none text-[64px] font-medium leading-none text-ink-100"
            >
              {step.number}
            </span>
            <div className="relative">
              <h3 className="text-h3-m md:text-h3 text-ink-900">{step.title}</h3>
              <p className="mt-2 max-w-prose text-[15px] leading-[1.6] text-ink-700">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
