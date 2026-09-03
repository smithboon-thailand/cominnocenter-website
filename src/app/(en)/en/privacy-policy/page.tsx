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
    canonical: "/en/privacy-policy",
    languages: {
      th: "/privacy-policy",
      en: "/en/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  title: "Privacy Policy",
  description:
    "What the Center of Excellence in Communication Innovation website collects, why, who receives it, and how to exercise your rights under Thailand's PDPA.",
};

function englishDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** คู่ภาษาอังกฤษของ (th)/privacy-policy/page.tsx — ข้อเท็จจริงมาจาก data/privacy.ts ชุดเดียวกัน */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header locale="en" switchHref="/privacy-policy" />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 md:pt-28">
          <p className="mb-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.12em] text-pink-500">
            Privacy Policy
          </p>
          <h1 className="text-h1-m md:text-h1 text-ink-900">
            What this site collects about you
          </h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            This page describes exactly what the site does, rather than reproducing boilerplate.
            The centre collects only what it needs to reply to you and to improve what it
            publishes.
            <strong className="font-medium text-ink-900">
              {" "}We do not sell, trade, or pass your data to anyone for advertising.
            </strong>
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
            Last updated {englishDate(PRIVACY_LAST_UPDATED)}
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">What is collected</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px] leading-[1.7]">
              <thead>
                <tr className="border-b border-ink-300 text-ink-900">
                  <th scope="col" className="py-3 pr-4 font-medium">What</th>
                  <th scope="col" className="py-3 pr-4 font-medium">When</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Why</th>
                  <th scope="col" className="py-3 font-medium">Who receives it</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {privacyRows.map((r) => (
                  <tr key={r.whatEn} className="border-b border-ink-100 align-top">
                    <td className="py-4 pr-4">{r.whatEn}</td>
                    <td className="py-4 pr-4">{r.whenEn}</td>
                    <td className="py-4 pr-4">{r.whyEn}</td>
                    <td className="py-4">{r.whereEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
            This site has{" "}
            <strong className="font-medium text-ink-900">
              no accounts, no login, and collects no sensitive data
            </strong>{" "}
            such as religion, health, or biometric information.
          </p>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">Cookies</h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              This site uses cookies only to collect usage statistics. There are no advertising
              cookies and no cross-site tracking.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              Statistics cookies are{" "}
              <strong className="font-medium text-ink-900">not set at all</strong> until you press
              “Accept” on the notice at the bottom of the screen. If you decline or simply do not
              choose, Google&rsquo;s script is never loaded in the first place — not merely
              disabled.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              You can change your mind at any time. When you withdraw consent, the site also{" "}
              <strong className="font-medium text-ink-900">deletes the cookies already set</strong>,
              rather than only stopping future collection.
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
              <CookieSettingsButton label="Open cookie settings" />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">Third-party services</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            When you use this site your browser contacts the following services. Each has its own
            privacy policy.
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
                <p className="mt-1 text-[15px] leading-[1.7] text-ink-700">{t.noteEn}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">
              Your rights under Thailand&rsquo;s Personal Data Protection Act
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              You have the right to access the data the centre holds about you · to have it
              corrected · to have it erased · to restrict its use · to object to its collection and
              use · to receive a copy in a machine-readable form · and to withdraw your consent at
              any time.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              To exercise any of these, write to{" "}
              <a
                href={EMAIL_HREF}
                className="text-pink-500 hover:text-pink-700 hover:underline"
              >
              </a>
              . Withdrawing consent does not affect the lawfulness of collection and use that
              already took place beforehand.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">Contact about personal data</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            Center of Excellence in Communication Innovation for the Development of Quality of Life
            and Sustainability
            <br />
            Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand
            <br />
            <a
              href={EMAIL_HREF}
              className="text-pink-500 hover:text-pink-700 hover:underline"
            >
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
      <Footer locale="en" />
    </div>
  );
}
