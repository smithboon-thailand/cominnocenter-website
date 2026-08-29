import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import { personas, personaCopy } from "@/data/personas";

type PersonaBlocksProps = {
  locale?: "th" | "en";
};

/**
 * "ความร่วมมือสำหรับองค์กรของคุณ" — สามกลุ่มผู้ตัดสินใจ (Phase 6.4)
 *
 * วางเหนือฟอร์ม เพื่อให้คนรู้ตัวว่าเราเคยทำงานกับองค์กรแบบเขาก่อนจะถึงช่องกรอก
 * โครงการ์ดชุดเดียวกับการ์ดบริการบนหน้าแรก เพื่อไม่ให้เว็บมีภาษาการ์ดหลายแบบ
 */
export default function PersonaBlocks({ locale = "th" }: PersonaBlocksProps) {
  const t = personaCopy[locale];
  const isTh = locale === "th";
  const impactPath = isTh ? "/impact" : "/en/impact";

  return (
    <>
      <SectionHeader
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {personas.map((p, i) => (
          <div
            key={p.key}
            className="flex flex-col rounded-lg border border-ink-300 bg-white p-6"
          >
            <h3 className="text-h3-m md:text-h3 text-ink-900">
              {isTh ? p.titleTh : p.titleEn}
            </h3>
            <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-700">
              {isTh ? p.bodyTh : p.bodyEn}
            </p>
            <div className="mt-6 border-t border-ink-100 pt-5">
              <Stat
                value={p.proof.value}
                unit={isTh ? p.proof.unitTh : p.proof.unitEn}
                label={isTh ? p.proof.labelTh : p.proof.labelEn}
                delay={i * 120}
                size="compact"
              />
            </div>
            <Link
              href={`${impactPath}/${p.caseSlug}`}
              className="mt-5 inline-block text-[13px] font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
            >
              {isTh ? p.caseTitleTh : p.caseTitleEn} →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
