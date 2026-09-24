import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  affiliatedResearchers,
  researchAssistants,
  designers,
  postdocs,
  phdCandidates,
  type TeamMember,
} from "@/data/team";
import { partners, type Partner } from "@/data/partners";
import type { Locale } from "@/lib/locale";

/**
 * ข้อความของแต่ละคนตามภาษาของหน้า
 *
 * ไทยถอยไปใช้ค่าไม่มีภาษากำกับได้ (ข้อมูลเดิมบางช่องมีภาษาเดียวและช่องนั้นเป็นไทย)
 * อังกฤษกับจีน**ไม่ถอยไปภาษาอื่น** — ช่องที่ไม่มีค่าจะไม่แสดง ดีกว่าให้ข้อความ
 * ผิดภาษาโผล่กลางการ์ด (กติกา i18n ข้อ 7) · หน้าจีนแสดงชื่ออังกฤษเป็นชื่อหลัก
 * และไม่แสดงชื่อไทยซ้ำ เพราะผู้อ่านจีนอ่านอักษรไทยไม่ออกและชื่อไทยไม่ช่วยให้ค้นต่อได้
 */
function memberText(person: TeamMember, locale: Locale) {
  switch (locale) {
    case "th":
      return {
        role: person.roleTh,
        name: person.name,
        secondaryName: person.nameEn,
        funding: person.fundingTh ?? person.funding,
        affiliation: person.affiliationTh ?? person.affiliation,
        focus: person.focusTh ?? person.focus,
        alt: person.alt,
      };
    case "en":
      return {
        role: person.role,
        name: person.nameEn,
        secondaryName: person.name !== person.nameEn ? person.name : undefined,
        funding: person.funding,
        affiliation: person.affiliationEn,
        focus: person.focus,
        alt: `${person.nameEn} — ${person.role}`,
      };
    case "zh":
      return {
        role: person.roleZh,
        name: person.nameEn,
        secondaryName: undefined,
        funding: person.fundingZh,
        affiliation: person.affiliationZh,
        focus: person.focusZh,
        alt: `${person.nameEn}——${person.roleZh}`,
      };
  }
}

function partnerText(p: Partner, locale: Locale) {
  switch (locale) {
    case "th":
      return { name: p.name, alt: p.alt };
    case "en":
      return { name: p.nameEn, alt: `${p.nameEn} logo` };
    case "zh": {
      // หน่วยงานที่ไม่มีชื่อจีนทางการคงชื่ออังกฤษ (ชื่อเฉพาะ) — ดูหมายเหตุที่ `nameZh`
      const name = p.nameZh ?? p.nameEn;
      return { name, alt: `${name}标志` };
    }
  }
}

const COPY = {
  th: {
    postdocTitle: "Postdoc และนักศึกษาปริญญาเอก",
    postdocDesc: "นักวิจัยหลังปริญญาเอกทุน C2F และนักศึกษาปริญญาเอกที่อยู่ภายใต้การดูแลและร่วมงานกับศูนย์",
    postdocNote:
      "ดร.พยู ฮนิน ไหล่ (Phyu Hnin Hlaing) และ ดร.Robbie Buelo — ทุน C2F High-Potential Postdoctoral Fellowship · Thinley Lhendup — ปริญญาเอกหลักสูตร Environment, Development and Sustainability (EDS) จุฬาฯ",
    affiliatedTitle: "นักวิจัยร่วม",
    affiliatedDesc: "นักวิจัยที่ร่วมงานกับศูนย์ ตามข้อมูลจากเว็บไซต์เดิมของศูนย์",
    supportTitle: "ผู้ช่วยวิจัยและทีมสนับสนุน",
    supportDesc: "ทีมผู้ช่วยวิจัยและนักออกแบบมัลติมีเดีย ที่สนับสนุนงานวิจัยและผลงานของศูนย์",
    partnersTitle: "พันธมิตรและองค์กรที่ร่วมงาน",
    partnersDesc: "องค์กรที่เคยร่วมงานและสนับสนุนโครงการของศูนย์",
  },
  en: {
    postdocTitle: "Postdocs and PhD candidates",
    postdocDesc:
      "C2F postdoctoral fellows and PhD candidates supervised by and collaborating with the center",
    postdocNote:
      "Dr. Phyu Hnin Hlaing and Dr. Robbie Buelo — C2F High-Potential Postdoctoral Fellowship · Thinley Lhendup — PhD in Environment, Development and Sustainability (EDS), Chulalongkorn University",
    affiliatedTitle: "Affiliated researchers",
    affiliatedDesc: "Researchers who have collaborated with the center",
    supportTitle: "Research assistants and support team",
    supportDesc: "Research assistants and multimedia designers supporting the center's work",
    partnersTitle: "Partners and client organizations",
    partnersDesc: "Organizations that have collaborated with and supported the center's projects",
  },
  zh: {
    postdocTitle: "博士后与博士生",
    postdocDesc: "C2F 博士后研究员，以及由中心指导并与中心合作的博士生",
    postdocNote:
      "Phyu Hnin Hlaing 博士与 Robbie Buelo 博士——C2F 高潜力博士后奖学金 · Thinley Lhendup——朱拉隆功大学环境、发展与可持续发展（EDS）博士项目",
    affiliatedTitle: "合作研究人员",
    affiliatedDesc: "曾与中心合作的研究人员",
    supportTitle: "研究助理与支持团队",
    supportDesc: "支持中心研究与项目工作的研究助理和多媒体设计师",
    partnersTitle: "合作伙伴与委托机构",
    partnersDesc: "曾与中心合作并支持中心项目的机构",
  },
} as const;

function MemberCard({ person, locale }: { person: TeamMember; locale: Locale }) {
  const t = memberText(person, locale);
  const initial =
    (person.nameEn.split(" ").filter(Boolean).slice(-1)[0] || "R").charAt(0).toUpperCase();

  return (
    <div className="h-full overflow-hidden rounded-lg border border-ink-300 bg-white">
      <div className="relative aspect-[4/5] bg-ink-100">
        {person.image ? (
          <Image
            src={person.image}
            alt={t.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-medium text-ink-500">{initial}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-medium text-ink-500">{t.role}</p>
        <h3 className="mt-0.5 text-[15px] font-medium leading-snug text-ink-900">{t.name}</h3>
        {t.secondaryName && <p className="text-[13px] text-ink-500">{t.secondaryName}</p>}
        {t.funding && (
          <p className="mt-2 text-[11px] leading-snug text-ink-500">{t.funding}</p>
        )}
        {t.affiliation && (
          <p className="mt-1.5 text-[11px] leading-[1.6] text-ink-500">{t.affiliation}</p>
        )}
        {t.focus && (
          <p className="mt-2 text-[13px] leading-[1.6] text-ink-700 line-clamp-3">{t.focus}</p>
        )}
        {person.links && person.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {person.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border border-ink-300 px-2 py-0.5
                  text-[11px] font-medium text-ink-700 transition-colors duration-150
                  hover:border-pink-300 hover:text-pink-700"
              >
                {link.label}
                <span className="ml-0.5 opacity-50">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamAndPartners({ locale = "th" }: { locale?: Locale }) {
  const t = COPY[locale];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          locale={locale}
          icon="people"
          title={t.postdocTitle}
          description={t.postdocDesc}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...postdocs, ...phdCandidates].map((person) => (
            <MemberCard key={person.nameEn} person={person} locale={locale} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[13px] leading-[1.6] text-ink-500">{t.postdocNote}</p>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            locale={locale}
            icon="people"
            title={t.affiliatedTitle}
            description={t.affiliatedDesc}
          />
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {affiliatedResearchers.map((person) => (
              <MemberCard key={person.nameEn} person={person} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          locale={locale}
          icon="people"
          title={t.supportTitle}
          description={t.supportDesc}
        />
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {[...researchAssistants, ...designers].map((person) => (
            <MemberCard key={person.nameEn} person={person} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            locale={locale}
            icon="partners"
            title={t.partnersTitle}
            description={t.partnersDesc}
          />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
            {partners.map((p) => {
              const pt = partnerText(p, locale);
              return (
                <div
                  key={p.nameEn}
                  className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-lg
                    border border-ink-300 bg-white p-5 md:p-6"
                >
                  <div className="relative h-20 w-full md:h-24">
                    <Image
                      src={p.image}
                      alt={pt.alt}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 45vw, 200px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[13px] font-medium leading-tight text-ink-700">
                    {pt.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
