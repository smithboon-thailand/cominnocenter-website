/**
 * เนื้อหาหน้านโยบายความเป็นส่วนตัว — เก็บไว้ที่เดียวให้ TH/EN/ZH อ่านชุดเดียวกัน
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
 *
 * ตรวจซ้ำ 3 ก.ย. 2569 ด้วยการอ่าน**โฮสต์ที่ HTML ที่ build ออกมาอ้างถึงจริง**
 * ไม่ใช่อ่านจากซอร์สอย่างเดียว — วิธีนี้ทำให้เจอว่าโฮสต์ภาพหลักสูตรวัฒนธรรม
 * ถูกเรียกเป็น <img src> แต่ไม่ได้ประกาศไว้ · เป็นช่องว่างชนิดเดียวกับที่การตรวจ
 * ของอีกทีมพบในเว็บอีกตัว (ประกาศชื่อผู้ประมวลผลที่ไม่ได้ใช้ และไม่ประกาศตัวที่ใช้จริง)
 */

export const PRIVACY_LAST_UPDATED = "2026-09-03";

export type PrivacyRow = {
  /** สิ่งที่เก็บ */
  whatTh: string;
  whatEn: string;
  whatZh: string;
  /** เก็บเมื่อไหร่ */
  whenTh: string;
  whenEn: string;
  whenZh: string;
  /** เก็บไปทำอะไร */
  whyTh: string;
  whyEn: string;
  whyZh: string;
  /** ข้อมูลไปอยู่ที่ใคร */
  whereTh: string;
  whereEn: string;
  whereZh: string;
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
    whatZh:
      "通过 Google Analytics 4 收集的使用统计：浏览的页面、设备与浏览器、大致的国家与城市、来源网站，以及以 _ga 开头的 Cookie",
    whenZh: "仅在您于 Cookie 提示条上点击“接受”之后",
    whyZh: "了解哪些内容真正有人阅读，以便改进",
    whereZh: "Google",
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
    whatZh: "不使用 Cookie、不识别个人的总体访客数量（Vercel Analytics）",
    whenZh: "每次打开页面时",
    whyZh: "大致了解网站的使用量",
    whereZh: "Vercel（本网站的托管服务商）",
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
    whatZh:
      "姓名 · 机构 · 电子邮件 · 电话 · 感兴趣的合作类型 · 留言，以及记录您从网站哪个链接进入的代码",
    whenZh: "当您填写并提交联系表单时",
    whyZh: "回复您并商谈合作事宜",
    whereZh: "Formspree，随后转发至中心邮箱",
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
    whatZh: "电子邮件地址",
    whenZh: "当您订阅电子报时",
    whyZh: "向您发送资讯与合作机会",
    whereZh: "Formspree",
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
    whatZh: "您接受或拒绝统计 Cookie 的选择",
    whenZh: "当您点击 Cookie 提示条上的任一按钮时",
    whyZh: "记住您的选择，避免每页重复询问",
    whereZh: "仅保存在您自己的浏览器中，不会发送到任何地方",
  },
];

export type PrivacyThirdParty = {
  name: string;
  noteTh: string;
  noteEn: string;
  noteZh: string;
  href?: string;
};

/** บริการภายนอกที่เบราว์เซอร์ของผู้อ่านติดต่อด้วยจริงเมื่อใช้เว็บนี้ */
export const privacyThirdParties: PrivacyThirdParty[] = [
  {
    name: "Google Analytics",
    noteZh: "仅在您点击接受后才加载并开始收集数据；若未接受，脚本根本不会被加载",
    noteTh: "โหลดและเริ่มเก็บข้อมูลเฉพาะหลังคุณกดยอมรับ ถ้าไม่กด สคริปต์จะไม่ถูกโหลดเลย",
    noteEn:
      "Loads and starts collecting only after you accept. If you do not, the script is never loaded at all",
    href: "https://policies.google.com/privacy",
  },
  {
    name: "Vercel",
    noteZh: "托管本网站，因此会在正常提供服务的过程中看到访问请求",
    noteTh: "โฮสต์เว็บนี้ จึงเห็นคำขอที่เข้ามาตามปกติของการให้บริการเว็บ",
    noteEn:
      "Hosts this site, and therefore sees incoming requests as part of normally serving it",
    href: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Formspree",
    noteZh: "接收您通过联系表单和电子报订阅提交的内容，并转交给中心",
    noteTh: "รับข้อมูลจากแบบฟอร์มติดต่อและการสมัครรับข่าวสาร แล้วส่งต่อมาที่ศูนย์ฯ",
    noteEn:
      "Receives what you submit through the contact form and newsletter, and passes it to the centre",
    href: "https://formspree.io/legal/privacy-policy",
  },
  {
    name: "YouTube",
    noteZh:
      "打开含视频的页面时，视频封面从 i.ytimg.com 加载；播放器本身仅在您点击播放后才从 youtube-nocookie.com 加载",
    noteTh:
      "ภาพหน้าปกคลิปโหลดจาก i.ytimg.com ตอนเปิดหน้าที่มีวิดีโอ ส่วนตัวเล่นวิดีโอโหลดจาก youtube-nocookie.com เฉพาะเมื่อคุณกดเล่นเท่านั้น",
    noteEn:
      "Video thumbnails load from i.ytimg.com when a page with videos opens; the player itself loads from youtube-nocookie.com only when you press play",
    href: "https://policies.google.com/privacy",
  },
  {
    // เพิ่มเมื่อ 3 ก.ย. 2569 หลังการตรวจของอีกทีมชี้ว่า "ผู้รับข้อมูลที่ประกาศไว้"
    // กับ "ผู้รับข้อมูลจริง" หลุดจากกันได้ง่าย — ตรวจ HTML ที่ build ออกมาแล้วพบว่า
    // ภาพหลักสูตรวัฒนธรรม 7 ใบยังโหลดจากโฮสต์นี้เป็น <img src> คือเบราว์เซอร์
    // ของผู้อ่านติดต่อไปเองทุกครั้งที่เปิดหน้า ไม่ได้รอให้กด จึงต้องประกาศไว้ด้วย
    name: "cuculturecom-static.vercel.app",
    noteZh:
      "托管文化传播课程的配图。当您打开使用这些图片的项目页面时，浏览器会从该主机加载图片——它只会看到普通的图片请求，没有 Cookie，也没有您输入的任何内容",
    noteTh:
      "โฮสต์ภาพประกอบของหลักสูตรสื่อสารเชิงวัฒนธรรม เบราว์เซอร์จะโหลดภาพจากที่นี่เมื่อเปิดหน้าโครงการที่มีภาพชุดนั้น — เห็นเฉพาะคำขอโหลดภาพตามปกติ ไม่มีคุกกี้และไม่มีข้อมูลที่คุณกรอก",
    noteEn:
      "Hosts the illustrations for the cultural communication programme. Your browser loads those images from it when you open a project page that uses them — it sees an ordinary image request, with no cookies and nothing you typed",
  },
];
