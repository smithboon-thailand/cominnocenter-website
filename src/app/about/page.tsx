import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/effects/Reveal";
import GlassCard from "@/components/effects/GlassCard";
import TeamAndPartners from "@/components/about/TeamAndPartners";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header active="about" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-pink-400/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -left-20 w-[24rem] h-[24rem] rounded-full bg-blue-700/10 blur-3xl animate-float-medium" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal>
            <p className="text-sm font-medium text-pink-500 mb-3">เกี่ยวกับเรา</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
              ศูนย์เชี่ยวชาญเฉพาะทาง
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500">
                ด้านนวัตกรรมการสื่อสาร
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
              เพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
              คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-6">เรื่องราวของเรา</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร ก่อตั้งขึ้นภายใต้คณะนิเทศศาสตร์
                  จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นศูนย์กลางในการสร้างองค์ความรู้
                  พัฒนานวัตกรรม และขับเคลื่อนการสื่อสารที่ส่งผลต่อคุณภาพชีวิตและความยั่งยืน
                </p>
                <p>
                  เราทำงานร่วมกับภาครัฐ ภาคเอกชน และภาคประชาสังคม
                  ผ่านการวิจัย การพัฒนาเครื่องมือ การอบรม และการสร้างเครือข่ายความร่วมมือ
                  เพื่อให้นวัตกรรมการสื่อสารเกิดประโยชน์อย่างแท้จริงต่อสังคมไทยและภูมิภาค
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <GlassCard className="p-8 md:p-10">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">วิสัยทัศน์</h3>
              <p className="text-neutral-700 leading-relaxed">
                เป็นศูนย์ชั้นนำด้านนวัตกรรมการสื่อสาร ที่สร้างผลกระทบเชิงบวกต่อคุณภาพชีวิต
                และความยั่งยืนในระดับประเทศและภูมิภาค
              </p>
              <h3 className="text-lg font-semibold text-blue-700 mt-8 mb-4">พันธกิจ</h3>
              <p className="text-neutral-700 leading-relaxed">
                สร้างองค์ความรู้ พัฒนานวัตกรรม และเชื่อมโยงเครือข่าย
                เพื่อยกระดับศักยภาพการสื่อสารของสังคมไทยอย่างยั่งยืน
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <TeamAndPartners />

      <section className="relative overflow-hidden bg-blue-700 text-white">
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">สนใจร่วมงานกับเรา?</h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              เรายินดีรับฟังและร่วมพัฒนาโครงการที่สร้างผลกระทบจริงต่อสังคม
            </p>
            <Link
              href="/collaborate"
              className="inline-flex items-center mt-8 px-8 py-3.5 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/30"
            >
              ติดต่อเรา
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
