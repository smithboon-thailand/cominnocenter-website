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
import { partners } from "@/data/partners";

type Locale = "th" | "en";

/** เลือกข้อความตาม locale โดยถอยไปใช้ค่าที่มีเสมอ (ข้อมูลเดิมบางช่องมีภาษาเดียว) */
function pick(locale: Locale, th?: string, en?: string, base?: string): string | undefined {
  if (locale === "th") return th ?? base;
  return en ?? base;
}

function MemberCard({ person, locale }: { person: TeamMember; locale: Locale }) {
  const isEn = locale === "en";
  const initial =
    (person.nameEn.split(" ").filter(Boolean).slice(-1)[0] || "R").charAt(0).toUpperCase();
  const affiliation = isEn
    ? (person.affiliationEn ?? undefined)
    : (person.affiliationTh ?? person.affiliation);
  const focus = pick(locale, person.focusTh, person.focus, person.focus);
  const funding = isEn ? person.funding : (person.fundingTh ?? person.funding);
  const alt = isEn
    ? `${person.nameEn} — ${person.role}`
    : person.alt;

  return (
    <div className="h-full overflow-hidden rounded-lg border border-ink-300 bg-white">
      <div className="relative aspect-[4/5] bg-ink-100">
        {person.image ? (
          <Image
            src={person.image}
            alt={alt}
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
        <p className="text-[11px] font-medium text-ink-500">
          {isEn ? person.role : person.roleTh}
        </p>
        <h3 className="mt-0.5 text-[15px] font-medium leading-snug text-ink-900">
          {isEn ? person.nameEn : person.name}
        </h3>
        {!isEn && <p className="text-[13px] text-ink-500">{person.nameEn}</p>}
        {isEn && person.name !== person.nameEn && (
          <p className="text-[13px] text-ink-500">{person.name}</p>
        )}
        {funding && (
          <p className="mt-2 text-[11px] leading-snug text-ink-500">{funding}</p>
        )}
        {affiliation && (
          <p className="mt-1.5 text-[11px] leading-[1.6] text-ink-500">{affiliation}</p>
        )}
        {focus && (
          <p className="mt-2 text-[13px] leading-[1.6] text-ink-700 line-clamp-3">{focus}</p>
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
  const isEn = locale === "en";

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          locale={locale}
          title={isEn ? "Postdocs and PhD candidates" : "Postdoc และนักศึกษาปริญญาเอก"}
          description={
            isEn
              ? "C2F postdoctoral fellows and PhD candidates supervised by and collaborating with the center"
              : "นักวิจัยหลังปริญญาเอกทุน C2F และนักศึกษาปริญญาเอกที่อยู่ภายใต้การดูแลและร่วมงานกับศูนย์"
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...postdocs, ...phdCandidates].map((person) => (
            <MemberCard key={person.nameEn} person={person} locale={locale} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[13px] leading-[1.6] text-ink-500">
          {isEn
            ? "Dr. Phyu Hnin Hlaing and Dr. Robbie Buelo — C2F High-Potential Postdoctoral Fellowship · Thinley Lhendup — PhD in Environment, Development and Sustainability (EDS), Chulalongkorn University"
            : "ดร.พยู ฮนิน ไหล่ (Phyu Hnin Hlaing) และ ดร.Robbie Buelo — ทุน C2F High-Potential Postdoctoral Fellowship · Thinley Lhendup — ปริญญาเอกหลักสูตร Environment, Development and Sustainability (EDS) จุฬาฯ"}
        </p>
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            locale={locale}
            title={isEn ? "Affiliated researchers" : "นักวิจัยร่วม"}
            description={
              isEn
                ? "Researchers who have collaborated with the center"
                : "นักวิจัยที่ร่วมงานกับศูนย์ ตามข้อมูลจากเว็บไซต์เดิมของศูนย์"
            }
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
          title={isEn ? "Research assistants and support team" : "ผู้ช่วยวิจัยและทีมสนับสนุน"}
          description={
            isEn
              ? "Research assistants and multimedia designers supporting the center's work"
              : "ทีมผู้ช่วยวิจัยและนักออกแบบมัลติมีเดีย ที่สนับสนุนงานวิจัยและผลงานของศูนย์"
          }
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
            title={isEn ? "Partners and client organizations" : "พันธมิตรและองค์กรที่ร่วมงาน"}
            description={
              isEn
                ? "Organizations that have collaborated with and supported the center's projects"
                : "องค์กรที่เคยร่วมงานและสนับสนุนโครงการของศูนย์"
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
            {partners.map((p) => (
              <div
                key={p.nameEn}
                className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-lg
                  border border-ink-300 bg-white p-5 md:p-6"
              >
                <div className="relative h-20 w-full md:h-24">
                  <Image
                    src={p.image}
                    alt={isEn ? `${p.nameEn} logo` : p.alt}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 768px) 45vw, 200px"
                    unoptimized
                  />
                </div>
                <p className="text-center text-[13px] font-medium leading-tight text-ink-700">
                  {isEn ? p.nameEn : p.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
