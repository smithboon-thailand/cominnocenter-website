import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/effects/Reveal";
import { stagger } from "@/components/effects/stagger";
import Stat from "@/components/ui/Stat";
import { personas, personaCopy } from "@/data/personas";
import { localePath, type Locale } from "@/lib/locale";

type PersonaBlocksProps = {
  locale?: Locale;
};

/**
 * "ความร่วมมือสำหรับองค์กรของคุณ" — สามกลุ่มผู้ตัดสินใจ (Phase 6.4)
 *
 * วางเหนือฟอร์ม เพื่อให้คนรู้ตัวว่าเราเคยทำงานกับองค์กรแบบเขาก่อนจะถึงช่องกรอก
 * โครงการ์ดชุดเดียวกับการ์ดบริการบนหน้าแรก เพื่อไม่ให้เว็บมีภาษาการ์ดหลายแบบ
 */
export default function PersonaBlocks({ locale = "th" }: PersonaBlocksProps) {
  const t = personaCopy[locale];
  const impactPath = localePath(locale, "/impact");

  return (
    <>
      <SectionHeader
        locale={locale}
        icon="partners"
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {personas.map((p, i) => {
          const title = { th: p.titleTh, en: p.titleEn, zh: p.titleZh }[locale];
          const body = { th: p.bodyTh, en: p.bodyEn, zh: p.bodyZh }[locale];
          const unit = { th: p.proof.unitTh, en: p.proof.unitEn, zh: p.proof.unitZh }[locale];
          const label = { th: p.proof.labelTh, en: p.proof.labelEn, zh: p.proof.labelZh }[locale];
          const caseTitle = { th: p.caseTitleTh, en: p.caseTitleEn, zh: p.caseTitleZh }[locale];
          return (
            <Reveal
              key={p.key}
              delay={stagger(i)}
              className="flex flex-col rounded-lg border border-ink-300 bg-white p-6"
            >
              <h3 className="text-h3-m md:text-h3 text-ink-900">{title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-700">{body}</p>
              <div className="mt-6 border-t border-ink-100 pt-5">
                <Stat
                  value={p.proof.value}
                  unit={unit}
                  label={label}
                  delay={i * 120}
                  size="compact"
                />
              </div>
              <Link
                href={`${impactPath}/${p.caseSlug}`}
                className="mt-5 inline-block text-[13px] font-medium text-pink-500 transition-colors duration-150 ease-brand hover:text-pink-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                {caseTitle} →
              </Link>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
