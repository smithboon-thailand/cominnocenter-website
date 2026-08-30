/**
 * เงื่อนไขว่าจะเปิด Google Analytics หรือไม่ — ใช้ร่วมกันทั้งแถบความยินยอม
 * และปุ่มตั้งค่าท้ายเว็บ เพื่อให้สองที่ตัดสินใจตรงกันเสมอ
 *
 * ค่าทั้งสองเป็น NEXT_PUBLIC_ จึงถูกฝังลงบันเดิลตอน build
 * (ทุกหน้าเป็น static — เปลี่ยนค่าแล้ว **ต้อง redeploy** ถึงจะมีผล)
 */

/** Measurement ID จาก GA4 หน้าตา G-XXXXXXXXXX — ไม่ตั้ง = ไม่มี GA และไม่มีแถบความยินยอม */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * ปิด GA บน preview deployment ของ Vercel
 *
 * เหตุผล: ทุก branch ที่ push ได้ preview URL อัตโนมัติ ถ้า GA ทำงานที่นั่นด้วย
 * ทุกครั้งที่เราเปิด preview ตรวจงานจะถูกนับเป็นผู้เข้าชมเว็บจริง สถิติของศูนย์ฯ
 * จะเพี้ยนโดยไม่มีใครรู้ตัว และแยกออกทีหลังไม่ได้เพราะ GA4 ลบข้อมูลย้อนหลังไม่ได้
 *
 * ทำไมต้องมีตัวกันชั้นนี้ทั้งที่ตั้ง env var เฉพาะ Production ก็พอ:
 * ตอนเพิ่มตัวแปรใน Vercel ระบบ**ติ๊กครบทั้งสามสภาพแวดล้อมให้เป็นค่าเริ่มต้น**
 * (Production / Preview / Development) คนที่กดผ่านเร็วๆ จะได้ค่าที่เก็บ preview
 * ไปด้วยทันที ชั้นนี้กันความผิดพลาดนั้นไว้ไม่ว่าจะตั้งค่ามาแบบไหน
 *
 * เช็คว่าเท่ากับ "preview" ไม่ใช่เช็คว่าเท่ากับ "production" โดยตั้งใจ —
 * ถ้าวันหนึ่งย้ายออกจาก Vercel ตัวแปรนี้จะหายไปเป็น undefined ซึ่งไม่เท่ากับ
 * "preview" GA จึงยังทำงานตามปกติ ไม่ดับเงียบๆ โดยไม่มีใครสังเกต
 */
const IS_VERCEL_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

export const analyticsEnabled = Boolean(GA_ID) && !IS_VERCEL_PREVIEW;
