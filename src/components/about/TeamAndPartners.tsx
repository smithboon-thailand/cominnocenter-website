import Image from "next/image";
import Reveal from "@/components/effects/Reveal";
import {
  affiliatedResearchers,
  researchAssistants,
  designers,
  type TeamMember,
} from "@/data/team";
import { partners } from "@/data/partners";

function MemberCard({ person }: { person: TeamMember }) {
  return (
    <div className="h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-50 to-pink-50">
        <Image
          src={person.image}
          alt={person.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
      <div className="p-4">
        <p className="text-[11px] font-medium text-pink-500">{person.roleTh}</p>
        <h3 className="mt-0.5 text-sm font-semibold text-neutral-900 leading-snug">{person.name}</h3>
        <p className="text-xs text-neutral-500">{person.nameEn}</p>
        {person.affiliation && (
          <p className="mt-2 text-[11px] text-neutral-500 leading-relaxed">{person.affiliation}</p>
        )}
      </div>
    </div>
  );
}

export default function TeamAndPartners() {
  return (
    <>
      {/* Affiliated researchers from old site */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">นักวิจัยร่วม</h2>
            <p className="text-neutral-600 max-w-2xl">
              นักวิจัยที่ร่วมงานกับศูนย์ ตามข้อมูลจากเว็บไซต์เดิมของศูนย์
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {affiliatedResearchers.map((person, i) => (
            <Reveal key={person.nameEn} delay={i * 70}>
              <MemberCard person={person} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Research assistants + designer */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">ผู้ช่วยวิจัยและทีมสนับสนุน</h2>
              <p className="text-neutral-600 max-w-2xl">
                ทีมผู้ช่วยวิจัยและนักออกแบบมัลติมีเดีย ที่สนับสนุนงานวิจัยและผลงานของศูนย์
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {[...researchAssistants, ...designers].map((person, i) => (
              <Reveal key={person.nameEn} delay={i * 50}>
                <MemberCard person={person} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-neutral-400 max-w-3xl">
            ชื่อ ตำแหน่ง และรูปภาพอ้างอิงจากหน้า About ของเว็บเดิม ComInnoCenter
            (ชื่อภาษาไทยเป็นการถอดจากชื่ออังกฤษบนเว็บเดิม — โปรดแจ้งหากต้องการแก้การสะกด)
          </p>
        </div>
      </section>

      {/* Partners / Clients */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">พันธมิตรและองค์กรที่ร่วมงาน</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              องค์กรที่เคยร่วมงานและสนับสนุนโครงการของศูนย์ (Our Clients จากเว็บเดิม)
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {partners.map((p, i) => (
            <Reveal key={p.nameEn} delay={i * 40}>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-100 bg-white hover:border-pink-200 hover:shadow-sm transition-all">
                <div className="relative w-full h-16">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 text-center leading-tight">{p.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
