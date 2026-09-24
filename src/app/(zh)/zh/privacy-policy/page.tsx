import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/analytics/CookieSettingsButton";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY_INTL, PHONE_HREF } from "@/data/contact";
import {
  PRIVACY_LAST_UPDATED,
  privacyRows,
  privacyThirdParties,
} from "@/data/privacy";

export const metadata = {
  alternates: {
    canonical: "/zh/privacy-policy",
    languages: {
      th: "/privacy-policy",
      en: "/en/privacy-policy",
      "zh-Hans": "/zh/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  title: "隐私政策",
  description:
    "传播创新卓越中心网站收集哪些信息、为什么收集、谁会收到，以及如何依据泰国《个人数据保护法》行使您的权利。",
};

function chineseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("zh-CN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** คู่ภาษาจีนของ (th)/privacy-policy/page.tsx — ข้อเท็จจริงมาจาก data/privacy.ts ชุดเดียวกัน */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header locale="zh" switchHrefs={{ th: "/privacy-policy", en: "/en/privacy-policy" }} />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 md:pt-28">
          <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            隐私政策
          </p>
          <h1 className="text-h1-m md:text-h1 text-ink-900">
            本网站收集您的哪些信息
          </h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            本页如实说明网站的实际做法，而不是套用模板。中心只收集回复您和改进所发布内容所需的信息。
            <strong className="font-medium text-ink-900">
              {" "}我们不会出售、交换您的数据，也不会将其提供给任何人用于广告。
            </strong>
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
            最后更新：{chineseDate(PRIVACY_LAST_UPDATED)}
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">收集的内容</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px] leading-[1.7]">
              <thead>
                <tr className="border-b border-ink-300 text-ink-900">
                  <th scope="col" className="py-3 pr-4 font-medium">收集什么</th>
                  <th scope="col" className="py-3 pr-4 font-medium">何时收集</th>
                  <th scope="col" className="py-3 pr-4 font-medium">用途</th>
                  <th scope="col" className="py-3 font-medium">谁会收到</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {privacyRows.map((r) => (
                  <tr key={r.whatEn} className="border-b border-ink-100 align-top">
                    <td className="py-4 pr-4">{r.whatZh}</td>
                    <td className="py-4 pr-4">{r.whenZh}</td>
                    <td className="py-4 pr-4">{r.whyZh}</td>
                    <td className="py-4">{r.whereZh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
            本网站
            <strong className="font-medium text-ink-900">没有账户、无需登录，也不收集敏感数据</strong>
            ，例如宗教信仰、健康状况或生物识别信息。
          </p>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">Cookie</h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              本网站仅使用 Cookie 收集使用统计。没有广告 Cookie，也没有跨站跟踪。
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              在您于屏幕底部的提示条上点击“接受”之前，统计 Cookie
              <strong className="font-medium text-ink-900">完全不会被设置</strong>
              。如果您拒绝或干脆不作选择，Google 的脚本根本不会被加载——而不只是被禁用。
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              您随时可以改变主意。当您撤回同意时，网站还会
              <strong className="font-medium text-ink-900">删除已经设置的 Cookie</strong>
              ，而不只是停止今后的收集。
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
              <CookieSettingsButton label="打开 Cookie 设置" />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">第三方服务</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            使用本网站时，您的浏览器会与以下服务通信。每项服务都有自己的隐私政策。
          </p>
          <ul className="mt-6 space-y-5">
            {privacyThirdParties.map((t) => (
              <li key={t.name} className="border-l-2 border-ink-300 pl-4">
                <p className="text-[15px] font-medium text-ink-900">
                  {t.href ? (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-700 hover:underline"
                    >
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </p>
                <p className="mt-1 text-[15px] leading-[1.7] text-ink-700">{t.noteZh}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">
              您依据泰国《个人数据保护法》享有的权利
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              您有权访问中心持有的关于您的数据 · 要求更正 · 要求删除 · 限制使用 · 反对收集和使用 · 以机器可读形式获取副本 · 以及随时撤回您的同意。
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              如需行使上述任何权利，请写信至{" "}
              <a
                href={EMAIL_HREF}
                className="text-pink-500 hover:text-pink-700 hover:underline"
              >
                {EMAIL}
              </a>
              。撤回同意不影响此前已经进行的收集和使用的合法性。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">个人数据相关联系方式</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            传播创新促进生活质量与可持续发展卓越中心
            <br />
            朱拉隆功大学传播艺术学院，泰国曼谷
            <br />
            <a
              href={EMAIL_HREF}
              className="text-pink-500 hover:text-pink-700 hover:underline"
            >
              {EMAIL}
            </a>{" "}
            ·{" "}
            <a
              href={PHONE_HREF}
              className="text-pink-500 hover:text-pink-700 hover:underline"
            >
              {PHONE_DISPLAY_INTL}
            </a>
          </p>
        </section>
      </main>
      <Footer locale="zh" />
    </div>
  );
}
