import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/analytics/CookieSettingsButton";
import {
  PRIVACY_LAST_UPDATED,
  privacyRows,
  privacyThirdParties,
} from "@/data/privacy";

export const metadata = {
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      th: "/privacy-policy",
      en: "/en/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "เว็บไซต์ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ เก็บข้อมูลอะไรบ้าง เพื่ออะไร ส่งต่อให้ใคร และคุณใช้สิทธิตาม PDPA ได้อย่างไร",
};

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

function thaiDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

/**
 * ใช้ path /privacy-policy ตรงกับ URL ของเว็บ Wix เดิม
 * เดิมมีกฎ redirect ส่ง /privacy-policy ไปหน้าแรก (ตอนที่ยังไม่มีหน้านี้)
 * ตอนนี้ลบกฎนั้นออกจาก next.config.ts แล้ว ลิงก์เก่าจึงมาถึงหน้าจริง
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header switchHref="/en/privacy-policy" />
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 md:pt-28">
          <p className="mb-2 text-[13px] font-medium leading-[1.4] tracking-[0.12em] text-pink-500">
            นโยบายความเป็นส่วนตัว
          </p>
          <h1 className="text-h1-m md:text-h1 text-ink-900">
            เว็บนี้เก็บข้อมูลอะไรของคุณบ้าง
          </h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            หน้านี้อธิบายตามที่เว็บทำจริงทุกข้อ ไม่ใช่ข้อความมาตรฐานที่คัดลอกมา
            ศูนย์ฯ เก็บข้อมูลเท่าที่จำเป็นต่อการติดต่อกลับและการปรับปรุงเนื้อหาเท่านั้น
            <strong className="font-medium text-ink-900">
              {" "}ไม่ขาย ไม่แลกเปลี่ยน และไม่ส่งต่อข้อมูลของคุณให้ผู้อื่นเพื่อการโฆษณา
            </strong>
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
            ปรับปรุงล่าสุด {thaiDate(PRIVACY_LAST_UPDATED)}
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">ข้อมูลที่เก็บ</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px] leading-[1.7]">
              <thead>
                <tr className="border-b border-ink-300 text-ink-900">
                  <th scope="col" className="py-3 pr-4 font-medium">สิ่งที่เก็บ</th>
                  <th scope="col" className="py-3 pr-4 font-medium">เก็บเมื่อไหร่</th>
                  <th scope="col" className="py-3 pr-4 font-medium">เพื่ออะไร</th>
                  <th scope="col" className="py-3 font-medium">ข้อมูลไปอยู่ที่ใคร</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {privacyRows.map((r) => (
                  <tr key={r.whatTh} className="border-b border-ink-100 align-top">
                    <td className="py-4 pr-4">{r.whatTh}</td>
                    <td className="py-4 pr-4">{r.whenTh}</td>
                    <td className="py-4 pr-4">{r.whyTh}</td>
                    <td className="py-4">{r.whereTh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
            เว็บนี้<strong className="font-medium text-ink-900">ไม่มีระบบสมาชิก ไม่มีการเข้าสู่ระบบ
            และไม่ได้เก็บข้อมูลอ่อนไหว</strong>ใดๆ เช่น ศาสนา สุขภาพ หรือข้อมูลชีวมิติ
          </p>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">คุกกี้</h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              เว็บนี้ใช้คุกกี้เพื่อเก็บสถิติการใช้งานเท่านั้น ไม่มีคุกกี้โฆษณาและไม่มีการติดตามข้ามเว็บ
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              คุกกี้สถิติจะ<strong className="font-medium text-ink-900">ไม่ถูกวางเลย</strong>
              จนกว่าคุณจะกด “ยอมรับ” ที่แถบด้านล่างจอ ถ้าคุณไม่กดหรือกดปฏิเสธ
              สคริปต์ของ Google จะไม่ถูกโหลดขึ้นมาตั้งแต่แรก ไม่ใช่แค่ถูกปิดการทำงาน
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              เปลี่ยนใจได้ทุกเมื่อ — เมื่อคุณถอนความยินยอม ระบบจะ<strong className="font-medium text-ink-900">ลบคุกกี้ที่ค้างอยู่ให้ด้วย</strong>
              ไม่ใช่แค่หยุดเก็บครั้งต่อไป
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-ink-700">
              <CookieSettingsButton label="เปิดการตั้งค่าคุกกี้" />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">บริการภายนอกที่เกี่ยวข้อง</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            เมื่อคุณใช้เว็บนี้ เบราว์เซอร์ของคุณจะติดต่อกับบริการเหล่านี้
            แต่ละรายมีนโยบายความเป็นส่วนตัวของตัวเอง
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
                <p className="mt-1 text-[15px] leading-[1.7] text-ink-700">{t.noteTh}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-ink-300 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-h2-m md:text-h2 text-ink-900">
              สิทธิของคุณตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              คุณมีสิทธิขอเข้าถึงข้อมูลของคุณที่ศูนย์ฯ เก็บไว้ · ขอให้แก้ไขให้ถูกต้อง ·
              ขอให้ลบ · ขอให้ระงับการใช้ · คัดค้านการเก็บและใช้ ·
              ขอรับสำเนาในรูปแบบที่อ่านด้วยเครื่องได้ · และถอนความยินยอมเมื่อใดก็ได้
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
              ใช้สิทธิเหล่านี้ได้โดยเขียนมาที่{" "}
              <a
                href="mailto:comminno@chula.ac.th"
                className="text-pink-500 hover:text-pink-700 hover:underline"
              >
                comminno@chula.ac.th
              </a>{" "}
              การถอนความยินยอมไม่กระทบการเก็บและใช้ข้อมูลที่ทำไปแล้วโดยชอบก่อนหน้านั้น
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-h2-m md:text-h2 text-ink-900">ติดต่อเรื่องข้อมูลส่วนบุคคล</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-700">
            ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
            <br />
            คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย กรุงเทพมหานคร
            <br />
            <a
              href="mailto:comminno@chula.ac.th"
              className="text-pink-500 hover:text-pink-700 hover:underline"
            >
              comminno@chula.ac.th
            </a>{" "}
            ·{" "}
            <a
              href="tel:022182262"
              className="text-pink-500 hover:text-pink-700 hover:underline"
            >
              02-218-2262
            </a>
          </p>
        </section>
      </main>
      <Footer locale="th" />
    </div>
  );
}
