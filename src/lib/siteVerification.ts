import type { Metadata } from "next";

/**
 * meta tag ยืนยันความเป็นเจ้าของเว็บ สำหรับ Google Search Console และ Bing Webmaster
 *
 * **ทำไมใช้ meta tag ไม่ใช่ DNS TXT** — ทั้งสองเจ้ารองรับการยืนยันผ่าน DNS ซึ่งปกติ
 * เป็นวิธีที่ดีกว่า (ครอบทุก subdomain) แต่ DNS ของโดเมนนี้ยังอยู่ที่ Wix และมี
 * **MX ของ Google Workspace ซึ่งเป็นอีเมลของศูนย์ฯ อยู่ที่นั่นด้วย** กติกาของโปรเจ็ค
 * คือห้ามแตะส่วน DNS การยืนยันผ่าน meta tag จึงได้ผลเท่ากันโดยไม่ต้องเข้าใกล้ MX เลย
 *
 * ค่าที่ต้องใส่คือ**เฉพาะรหัส** ไม่ใช่แท็กทั้งบรรทัด เช่นถ้า Google ให้มาว่า
 *   <meta name="google-site-verification" content="AbC123..." />
 * ให้ใส่แค่ `AbC123...`
 *
 * ตั้งที่ Vercel → Settings → Environment Variables (Production ก็พอ)
 *   GOOGLE_SITE_VERIFICATION  — จาก search.google.com/search-console
 *   BING_SITE_VERIFICATION    — จาก bing.com/webmasters
 *
 * ไม่ต้องมี NEXT_PUBLIC_ เพราะ layout เป็น server component อ่านตอน build ได้
 * และไม่ต้องให้ค่าไปโผล่ในบันเดิล JS (ถึงจะไม่ใช่ความลับก็ไม่มีเหตุให้ส่งไป)
 *
 * ไม่ตั้ง = ไม่มี meta tag ออกมาเลย ไม่ใช่แท็กเปล่าที่อาจทำให้การยืนยันล้มเหลว
 *
 * **หลังยืนยันผ่านแล้ว ห้ามลบแท็กออก** ทั้งสองเจ้าจะตรวจซ้ำเป็นระยะ
 * ถ้าแท็กหายไปจะถือว่าเสียสิทธิ์และต้องยืนยันใหม่
 */
export function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    // Bing ไม่มีคีย์เฉพาะใน Next metadata จึงใส่ผ่าน other ด้วยชื่อแท็กจริงของ Bing
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
