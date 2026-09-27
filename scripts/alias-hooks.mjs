/**
 * Loader hook สำหรับสคริปต์ที่ต้อง import ไฟล์ข้อมูลใน src/ ตรงๆ
 *
 * ไฟล์ใน src/ อ้างกันด้วย `@/` (ตั้งใน tsconfig paths) ซึ่ง Node ตามไม่ได้
 * ตัวตรวจส่วนใหญ่จึงอ่านไฟล์ข้อมูลเป็นข้อความแทน แต่งานที่ต้องใช้ข้อความ
 * ในไฟล์ครบทุกช่อง (เช่นบทสรุปหกช่องต่อชิ้น) การ parse ด้วย regex เสี่ยง
 * ตัดข้อความขาดเงียบๆ hook นี้จึงแปลง `@/x` → `../src/x.ts` ให้ตอน resolve
 * ใช้คู่กับ --experimental-strip-types ผ่าน scripts/alias-loader.mjs
 */
const SRC = new URL("../src/", import.meta.url);

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const rel = specifier.slice(2);
    const target = new URL(rel.endsWith(".ts") ? rel : `${rel}.ts`, SRC);
    return next(target.href, context);
  }
  return next(specifier, context);
}
