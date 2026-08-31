/**
 * เนื้อหาหน้านโยบายความเป็นส่วนตัว — เก็บไว้ที่เดียวให้ TH/EN อ่านชุดเดียวกัน
 *
 * ทำไมไม่เขียนแยกในไฟล์หน้าแต่ละภาษา: นโยบายคือคำแถลง**ข้อเท็จจริง** ถ้าวันหนึ่ง
 * เว็บเพิ่มบริการที่เก็บข้อมูล แล้วมีคนไปแก้แค่ฉบับไทย ฉบับอังกฤษจะกลายเป็นคำแถลง
 * ที่ไม่ตรงความจริง ซึ่งร้ายแรงกว่าเนื้อหาทั่วไปที่หลุดตรงกัน — เป็นบทเรียนเดียวกับ
 * ที่เจอกับ sameAs ใน PR #18 (พิมพ์ไว้สองที่แล้วหลุดตรงกันจนชี้เพจที่ไม่มีอยู่จริง)
 *
 * **ทุกบรรทัดในไฟล์นี้ต้องตรงกับสิ่งที่โค้ดทำจริง** ตรวจแล้วเมื่อ 31 ส.ค. 2569 จาก:
 * AnalyticsConsent.tsx (GA4 + คุกกี้ + localStorage) · layout ทั้งสอง (Vercel Analytics)
 * ContactForm.tsx + NewsletterForm.tsx (Formspree) · videos.ts (YouTube) · projects.ts
 * ถ้าเพิ่มบริการใหม่ที่แตะข้อมูลผู้ใช้ ต้องมาเพิ่มที่นี่ด้วยเสมอ
 */

export const PRIVACY_LAST_UPDATED = "2026-08-31";

export type PrivacyRow = {
  /** สิ่งที่เก็บ */
  whatTh: string;
  whatEn: string;
  /** เก็บเมื่อไหร่ */
  whenTh: string;
  whenEn: string;
  /** เก็บไปทำอะไร */
  whyTh: string;
  whyEn: string;
  /** ข้อมูลไปอยู่ที่ใคร */
  whereTh: string;
  whereEn: string;
};

export const privacyRows: PrivacyRow[] = [
  {
    whatTh:
      "สถิติการใช้งานผ่าน Google Analytics 4 — หน้าที่เปิด อุปกรณ์และเบราว์เซอร์ ประเทศและเมืองโดยประมาณ และเว็บที่ลิงก์มา พร้อมคุกกี้ที่ขึ้นต้นด้วย _ga",
    whatEn:
      "Usage statistics through Google Analytics 4 — pages viewed, device and browser, approximate country and city, and the site you arrived from, together with cookies beginning with _ga",
    whenTh: "เฉพาะเมื่อคุณกด “ยอมรับ” ที่แถบคุกกี้เท่านั้น",
    whenEn: "Only after you press “Accept” on the cookie notice",
    whyTh: "ดูว่าเนื้อหาส่วนไหนมีคนอ่าน เพื่อปรับปรุงให้ตรงกับผู้อ่าน",
    whyEn: "To see which content people actually read, so we can improve it",
    whereTh: "Google",
    whereEn: "Google",
  },
  {
    whatTh: "จำนวนผู้เข้าชมโดยรวม แบบไม่ใช้คุกกี้และไม่ระบุตัวบุคคล (Vercel Analytics)",
    whatEn:
      "Aggregate visitor counts, without cookies and without identifying individuals (Vercel Analytics)",
    whenTh: "ทุกครั้งที่เปิดหน้าเว็บ",
    whenEn: "On every page view",
    whyTh: "รู้ภาพรวมว่าเว็บมีคนใช้มากน้อยแค่ไหน",
    whyEn: "To know roughly how much the site is used",
    whereTh: "Vercel (ผู้ให้บริการโฮสต์เว็บนี้)",
    whereEn: "Vercel (this site's hosting provider)",
  },
  {
    whatTh:
      "ชื่อ · หน่วยงาน · อีเมล · เบอร์โทร · ประเภทงานที่สนใจ · ข้อความ และรหัสที่บอกว่าคุณกดมาจากลิงก์ไหนในเว็บ",
    whatEn:
      "Name · organisation · email · phone · type of work · your message, and a code recording which link in the site you came from",
    whenTh: "เมื่อคุณกรอกและกดส่งแบบฟอร์มติดต่อ",
    whenEn: "When you fill in and submit the contact form",
    whyTh: "ติดต่อกลับและพูดคุยเรื่องความร่วมมือ",
    whyEn: "To reply to you and discuss working together",
    whereTh: "Formspree แล้วส่งต่อเข้าอีเมลของศูนย์ฯ",
    whereEn: "Formspree, then forwarded to the centre's email",
  },
  {
    whatTh: "อีเมล",
    whatEn: "Email address",
    whenTh: "เมื่อคุณสมัครรับจดหมายข่าว",
    whenEn: "When you subscribe to the newsletter",
    whyTh: "ส่งข่าวสารและโอกาสร่วมงานให้คุณ",
    whyEn: "To send you news and collaboration opportunities",
    whereTh: "Formspree",
    whereEn: "Formspree",
  },
  {
    whatTh: "การเลือกของคุณว่ายอมรับหรือปฏิเสธคุกกี้สถิติ",
    whatEn: "Your choice to accept or decline statistics cookies",
    whenTh: "เมื่อคุณกดปุ่มใดปุ่มหนึ่งที่แถบคุกกี้",
    whenEn: "When you press either button on the cookie notice",
    whyTh: "จำไว้เพื่อไม่ถามซ้ำทุกหน้า",
    whyEn: "To remember it and not ask again on every page",
    whereTh: "เก็บในเบราว์เซอร์ของคุณเอง ไม่ถูกส่งออกไปที่ใดเลย",
    whereEn: "Stored in your own browser only, never sent anywhere",
  },
];

export type PrivacyThirdParty = {
  name: string;
  noteTh: string;
  noteEn: string;
  href?: string;
};

/** บริการภายนอกที่เบราว์เซอร์ของผู้อ่านติดต่อด้วยจริงเมื่อใช้เว็บนี้ */
export const privacyThirdParties: PrivacyThirdParty[] = [
  {
    name: "Google Analytics",
    noteTh: "โหลดและเริ่มเก็บข้อมูลเฉพาะหลังคุณกดยอมรับ ถ้าไม่กด สคริปต์จะไม่ถูกโหลดเลย",
    noteEn:
      "Loads and starts collecting only after you accept. If you do not, the script is never loaded at all",
    href: "https://policies.google.com/privacy",
  },
  {
    name: "Vercel",
    noteTh: "โฮสต์เว็บนี้ จึงเห็นคำขอที่เข้ามาตามปกติของการให้บริการเว็บ",
    noteEn:
      "Hosts this site, and therefore sees incoming requests as part of normally serving it",
    href: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Formspree",
    noteTh: "รับข้อมูลจากแบบฟอร์มติดต่อและการสมัครรับข่าวสาร แล้วส่งต่อมาที่ศูนย์ฯ",
    noteEn:
      "Receives what you submit through the contact form and newsletter, and passes it to the centre",
    href: "https://formspree.io/legal/privacy-policy",
  },
  {
    name: "YouTube",
    noteTh:
      "ภาพหน้าปกคลิปโหลดจาก i.ytimg.com ตอนเปิดหน้าที่มีวิดีโอ ส่วนตัวเล่นวิดีโอโหลดจาก youtube-nocookie.com เฉพาะเมื่อคุณกดเล่นเท่านั้น",
    noteEn:
      "Video thumbnails load from i.ytimg.com when a page with videos opens; the player itself loads from youtube-nocookie.com only when you press play",
    href: "https://policies.google.com/privacy",
  },
];
