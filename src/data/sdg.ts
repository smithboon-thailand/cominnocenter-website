/**
 * SDG 17 เป้าหมาย × 3 stops — ตาม BRAND.md PART I2 (source of truth: PART B3)
 *
 * กฎการใช้ (PART B3):
 * - ตัวอักษรใช้ `deep` เสมอ — `pure` ห้ามเป็นสีตัวอักษรเด็ดขาด
 * - แถบ accent / จุด / ไอคอน / เส้น chart ใช้ `pure`
 * - พื้น badge / พื้น card / hover ใช้ `tint`
 * - ตัวอักษรขาวบนพื้น `pure` ได้เฉพาะ SDG_WHITE_TEXT_OK
 * - ทุก badge ต้องมีเลขกำกับ ไม่ใช้สีเดี่ยวสื่อความหมาย
 */
export const SDG = {
  1:  { en: 'No poverty', th: 'ขจัดความยากจน', tint: '#F5E5E7', pure: '#E5243B', deep: '#CD1329' },
  2:  { en: 'Zero hunger', th: 'ขจัดความหิวโหย', tint: '#F4EFE6', pure: '#DDA63A', deep: '#8D6415' },
  3:  { en: 'Good health and well-being', th: 'สุขภาพและความเป็นอยู่ที่ดี', tint: '#EAF2E8', pure: '#4C9F38', deep: '#397B29' },
  4:  { en: 'Quality education', th: 'การศึกษาที่มีคุณภาพ', tint: '#F5E6E7', pure: '#C5192D', deep: '#C9152A' },
  5:  { en: 'Gender equality', th: 'ความเท่าเทียมทางเพศ', tint: '#F7E6E3', pure: '#FF3A21', deep: '#CE1700' },
  6:  { en: 'Clean water and sanitation', th: 'น้ำสะอาดและสุขาภิบาล', tint: '#E6F2F5', pure: '#26BDE2', deep: '#0F758D' },
  7:  { en: 'Affordable and clean energy', th: 'พลังงานสะอาด', tint: '#F7F2E4', pure: '#FCC30B', deep: '#876700' },
  8:  { en: 'Decent work and economic growth', th: 'งานที่มีคุณค่า', tint: '#F4E6EA', pure: '#A21942', deep: '#A51641' },
  9:  { en: 'Industry, innovation and infrastructure', th: 'อุตสาหกรรมและนวัตกรรม', tint: '#F7EAE4', pure: '#FD6925', deep: '#C13D00' },
  10: { en: 'Reduced inequalities', th: 'ลดความเหลื่อมล้ำ', tint: '#F5E5EC', pure: '#DD1367', deep: '#CA0C5B' },
  11: { en: 'Sustainable cities and communities', th: 'เมืองที่ยั่งยืน', tint: '#F7EEE4', pure: '#FD9D24', deep: '#A15A00' },
  12: { en: 'Responsible consumption and production', th: 'การผลิตและบริโภคที่ยั่งยืน', tint: '#F3EFE7', pure: '#BF8B2E', deep: '#8C651F' },
  13: { en: 'Climate action', th: 'การรับมือโลกรวน', tint: '#EAF0EA', pure: '#3F7E44', deep: '#3A793F' },
  14: { en: 'Life below water', th: 'นิเวศทางทะเล', tint: '#E4F0F6', pure: '#0A97D9', deep: '#0473A7' },
  15: { en: 'Life on land', th: 'นิเวศบนบก', tint: '#EBF3E7', pure: '#56C02B', deep: '#357C19' },
  16: { en: 'Peace, justice and strong institutions', th: 'สันติภาพและความยุติธรรม', tint: '#E3F0F7', pure: '#00689D', deep: '#00689D' },
  17: { en: 'Partnerships for the goals', th: 'หุ้นส่วนความร่วมมือ', tint: '#E7EEF3', pure: '#19486A', deep: '#17486C' },
} as const;

export type SdgId = keyof typeof SDG;

/** สีขาวอ่านได้บนพื้น pure เฉพาะ 4 เป้าหมายนี้ */
export const SDG_WHITE_TEXT_OK: readonly SdgId[] = [4, 8, 16, 17];

/** id ทั้ง 17 เรียงตามเลขเป้าหมาย */
export const SDG_IDS = Object.keys(SDG).map(Number) as SdgId[];

/** ป้าย aria สำหรับ badge เช่น "SDG 12 — การผลิตและบริโภคที่ยั่งยืน" */
export function sdgAria(id: SdgId, locale: 'th' | 'en' = 'th'): string {
  return `SDG ${id} — ${SDG[id][locale]}`;
}
