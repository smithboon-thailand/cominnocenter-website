import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import PersonaBlocks from "@/components/collaborate/PersonaBlocks";
import ProcessSteps from "@/components/collaborate/ProcessSteps";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY_INTL, PHONE_HREF } from "@/data/contact";

export const metadata = {
  alternates: {
    canonical: "/zh/collaborate",
    languages: {
      th: "/collaborate",
      en: "/en/collaborate",
      "zh-Hans": "/zh/collaborate",
      "x-default": "/collaborate",
    },
  },
  title: "合作洽谈",
  description: "与中心在研究、培训或可衡量的传播活动上合作——我们欢迎政府、企业与公民社会",
};

/** หน้านี้ไม่ใช้สี SDG — ชมพู (action) นำ ตาม BRAND.md PART H */
const collaborationWays = [
  {
    title: "项目合作",
    description: "共同开发项目，创造长期影响",
  },
  {
    title: "培训与能力建设",
    description: "为贵机构设计并开展传播创新培训",
  },
  {
    title: "研究与评估",
    description: "对传播项目开展系统、可信的研究与评估",
  },
];

export default function ChineseCollaboratePage() {
  return (
    <div className="min-h-screen">
      <Header active="collaborate" locale="zh" />
      <main>

      <PageHero
        page="collaborate"
        locale="zh"
        kicker="合作洽谈"
        title="携手创造影响"
        lede="无论是研究、培训、宣传活动还是其他形式的合作，我们都欢迎与政府、企业和公民社会携手，以传播创新提升生活质量与可持续发展。"
      />

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collaborationWays.map((item) => (
            <div key={item.title} className="rounded-lg border border-ink-300 bg-white p-6">
              <h2 className="text-h3-m md:text-h3 text-ink-900">{item.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <PersonaBlocks locale="zh" />
      </section>

      <section className="border-y border-ink-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeader
                locale="zh"
                icon="contactForm"
                title="给我们留言"
                description="简要介绍您的项目或需求，我们的团队将与您联系。"
              />
              <div className="mt-8">
                <ContactForm locale="zh" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full rounded-lg border border-ink-300 bg-ink-0 p-8">
                <h3 className="text-h3-m md:text-h3 text-ink-900">联系方式</h3>
                <div className="mt-6 space-y-6 text-[15px] leading-[1.6]">
                  <div>
                    <p className="mb-1 text-ink-500">电子邮件</p>
                    <a
                      href={EMAIL_HREF}
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">电话</p>
                    {/* รูปแบบสากล — ผู้อ่านจีนโทรจากต่างประเทศ */}
                    <a
                      href={PHONE_HREF}
                      className="font-medium text-ink-900 hover:text-pink-500"
                    >
                      {PHONE_DISPLAY_INTL}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-ink-500">地址</p>
                    <p className="text-ink-900">
                      朱拉隆功大学传播艺术学院
                      <br />
                      泰国曼谷
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-ink-500">社交媒体</p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/comm.inno21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink-900 hover:text-pink-500"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/comm.inno21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink-900 hover:text-pink-500"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <ProcessSteps locale="zh" />
      </section>

      <section className="bg-ink-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-h2-m md:text-h2 text-ink-900">还没准备好联系我们？</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">
              订阅我们的电子报，获取未来的合作机会。
            </p>
            <div className="mx-auto mt-6 max-w-md">
              <NewsletterForm variant="light" locale="zh" />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer locale="zh" />
    </div>
  );
}
