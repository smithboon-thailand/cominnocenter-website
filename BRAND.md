# ComInno Center — Brand Identity (Complete)

**Version 1.2 · August 2026** (typography → Kanit 400/500 + two-tone display)
ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน
คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย

> **สำหรับ Claude Code:** ไฟล์นี้คือ source of truth ด้านดีไซน์ วางไว้ที่ root ของ repo ชื่อ `BRAND.md` และอ้างอิงจาก `CLAUDE.md` ทุกการตัดสินใจด้านภาพต้องสอดคล้องกับไฟล์นี้ ถ้าขัดแย้งกับโค้ดเดิม ให้ไฟล์นี้ชนะ

---

## PART A — Foundation

### A1. Positioning

**หนึ่งประโยค:** ศูนย์วิจัยที่แปลงองค์ความรู้ด้านการสื่อสาร ให้กลายเป็นเครื่องมือที่เปลี่ยนคุณภาพชีวิตคนจริง

| Pillar | ความหมาย | แสดงออกทางภาพ |
|---|---|---|
| Rigorous | งานวิจัยที่เชื่อถือได้ | headline น้ำหนักเบาขนาดใหญ่, ตัวเลขจริง, อ้างอิงแหล่งที่มาเสมอ |
| Human | ทำเพื่อคน | ภาพจริงจากภาคสนาม, ภาษาอ่านง่าย |
| Applied | ลงมือทำ มีผลลัพธ์ | case study ที่มี outcome เป็นตัวเลข |
| SDG-driven | ทุกงานผูกกับเป้าหมายโลก | ระบบสี 17 เป้าหมาย ปรากฏทุกหน้า |

**ไม่ใช่:** tech startup / agency โฆษณา / ราชการที่แข็งทื่อ

### A2. ลำดับชั้นของสี — ใครทำหน้าที่อะไร

นี่คือกฎที่สำคัญที่สุดของทั้งระบบ:

| ระบบสี | หน้าที่ | ตอบคำถาม |
|---|---|---|
| **Ink** (neutral) | โครงสร้าง เนื้อหา 85% ของทุกหน้า | "อ่านตรงนี้" |
| **Chula Pink** | การกระทำ — CTA, ลิงก์, focus | "กดตรงไหน" |
| **SDG 17 สี** | หมวดหมู่ — โครงการเชื่อมกับเป้าหมายไหน | "เรื่องอะไร" |

สามระบบไม่ก้าวก่ายกัน: SDG ห้ามอยู่บนปุ่ม · ชมพูห้ามเป็นป้ายหมวด · Ink ห้ามใช้ตกแต่ง

---

## PART B — Colour

### B1. Ink — โครงสร้าง (warm neutral)

| Token | Hex | ใช้ |
|---|---|---|
| `ink-0` | `#FBF9F7` | page background |
| `ink-100` | `#EFEBE6` | section alternate, card เงียบ |
| `ink-300` | `#C3BCB5` | border, divider |
| `ink-500` | `#7A716A` | text muted, caption |
| `ink-700` | `#4A423D` | body text |
| `ink-900` | `#1A1613` | heading, footer bg |

### B2. Chula Pink — การกระทำ

| Token | Hex | ใช้ |
|---|---|---|
| `pink-100` | `#FBDCEB` | hover tint, badge เงียบ |
| `pink-300` | `#F07EB6` | decorative, border hover |
| `pink-500` | `#D31D81` | **primary — eyebrow, link, focus ring** (พื้น CTA ใช้ `pink-700`) |
| `pink-700` | `#8C1256` | ตัวอักษรบนพื้น pink-100, link hover |
| `pink-900` | `#4A0B2E` | พื้นเข้มพิเศษ |

> ⚠️ ตรวจ `#D31D81` กับ brand guideline คณะ/จุฬาฯ ก่อน production ถ้ามีค่าทางการ ให้แทนที่แล้วสร้าง ramp รอบค่านั้น (โครงสร้าง token ไม่เปลี่ยน)
>
> **ประวัติค่า `pink-500` (31 ส.ค. 2569):** เดิมเป็น `#E0218A` ซึ่ง**ไม่ผ่าน WCAG AA** เมื่อใช้เป็นสีตัวอักษร — ได้ 4.07 บนพื้น body `#F8F5F2` และ 4.42 บนการ์ดขาว ต่ำกว่าเกณฑ์ 4.5 ทั้งคู่
> เปลี่ยนเป็น `#D31D81` โดย**คงเฉดสีเดิมทุกประการ** (H 327° · S 75.5%) ลดเฉพาะความสว่าง 50.4% → 47.2% ได้ **4.54 / 4.69 / 4.93** บนพื้น `#F8F5F2` / `#FBF9F7` / ขาว — ผ่านทุกพื้นที่เว็บใช้จริง
> เคยมีการเสนอ `#D81E84` ไว้ก่อนหน้า แต่**ค่านั้นไม่พอ** (4.36 บนพื้น body) เพราะตอนนั้นวัดกับพื้นเดียวไม่ครบทุกแบบ
> หมายเหตุ: `#E0218A` ยังใช้อยู่ในพาเลตต์ไอคอน paper-craft ที่ `ExpertiseExplorer.tsx` โดยตั้งใจ — เป็นสีของงานภาพที่ต้องตรงกับภาพประกอบ ไม่ใช่ token ของ UI

**กฎ:** ชมพูกินพื้นที่ ≤ 10% ต่อหน้าจอ · CTA หลัก 1 ปุ่มต่อ section

### B3. SDG — หมวดหมู่ (17 เป้าหมาย × 3 stops)

ทุกค่า `deep` ผ่าน WCAG AA (≥4.5:1) ทั้งบนพื้นขาวและบน `tint` ของตัวเอง — คำนวณและตรวจแล้ว

| # | Goal (EN) | Goal (TH) | `tint` | `pure` | `deep` |
|---|---|---|---|---|---|
| 1 | No poverty | ขจัดความยากจน | `#F5E5E7` | `#E5243B` | `#CD1329` |
| 2 | Zero hunger | ขจัดความหิวโหย | `#F4EFE6` | `#DDA63A` | `#8D6415` |
| 3 | Good health and well-being | สุขภาพและความเป็นอยู่ที่ดี | `#EAF2E8` | `#4C9F38` | `#397B29` |
| 4 | Quality education | การศึกษาที่มีคุณภาพ | `#F5E6E7` | `#C5192D` | `#C9152A` |
| 5 | Gender equality | ความเท่าเทียมทางเพศ | `#F7E6E3` | `#FF3A21` | `#CE1700` |
| 6 | Clean water and sanitation | น้ำสะอาดและสุขาภิบาล | `#E6F2F5` | `#26BDE2` | `#0F758D` |
| 7 | Affordable and clean energy | พลังงานสะอาด | `#F7F2E4` | `#FCC30B` | `#876700` |
| 8 | Decent work | งานที่มีคุณค่า | `#F4E6EA` | `#A21942` | `#A51641` |
| 9 | Industry and innovation | อุตสาหกรรมและนวัตกรรม | `#F7EAE4` | `#FD6925` | `#C13D00` |
| 10 | Reduced inequalities | ลดความเหลื่อมล้ำ | `#F5E5EC` | `#DD1367` | `#CA0C5B` |
| 11 | Sustainable cities | เมืองที่ยั่งยืน | `#F7EEE4` | `#FD9D24` | `#A15A00` |
| 12 | Responsible consumption | การผลิตและบริโภคที่ยั่งยืน | `#F3EFE7` | `#BF8B2E` | `#8C651F` |
| 13 | Climate action | การรับมือโลกรวน | `#EAF0EA` | `#3F7E44` | `#3A793F` |
| 14 | Life below water | นิเวศทางทะเล | `#E4F0F6` | `#0A97D9` | `#0473A7` |
| 15 | Life on land | นิเวศบนบก | `#EBF3E7` | `#56C02B` | `#357C19` |
| 16 | Peace and justice | สันติภาพและความยุติธรรม | `#E3F0F7` | `#00689D` | `#00689D` |
| 17 | Partnerships | หุ้นส่วนความร่วมมือ | `#E7EEF3` | `#19486A` | `#17486C` |

**การใช้แต่ละ stop:**

| ที่ | ใช้ stop |
|---|---|
| ตัวอักษร (บนขาวหรือบน tint) | `deep` เสมอ — **`pure` ห้ามเป็นสีตัวอักษรเด็ดขาด** |
| แถบ accent, จุด, ไอคอน, เส้น chart | `pure` |
| พื้น badge, พื้น card, hover | `tint` |
| ตัวอักษรขาวบนพื้น `pure` | เฉพาะ SDG 4, 8, 16, 17 เท่านั้น |

**สีที่ต้องมีเลขกำกับเสมอ** (แยกด้วยตาไม่ออก): แดง 1·4·5 / เขียว 3·13·15 / ส้มเหลือง 2·7·11·12 / น้ำเงิน 6·14·16·17
→ ทุก badge ต้องมีเลข SDG ไม่ใช้สีเดี่ยวสื่อความหมาย

### B4. Semantic (system states)

| Token | Hex | ใช้ |
|---|---|---|
| `success` | `#2E7D32` | ฟอร์มสำเร็จ |
| `error` | `#C62828` | ฟอร์มผิดพลาด |
| `warning` | `#B45309` | คำเตือน |

---

## PART C — Typography

**ตระกูลเดียวทั้งเว็บ: Kanit** (Google Fonts) — sans ไทย loop-less + ละติน, เรขาคณิต ทันสมัย

หลักการลำดับชั้น: **ขนาดเป็นตัวสร้างลำดับหลัก น้ำหนักใช้ชิดกัน (400/500)** เพราะ Kanit หนึ่งสเต็ปน้ำหนักดูต่างเท่าฟอนต์อื่นหนึ่งสเต็ปครึ่ง — display/h1 ใช้ 500 ให้มั่นคง อ่านชัดทุกจอ, h2 ใช้ 400 ให้รองอย่างสงบ

โหลดด้วย `next/font/google` weights: **400, 500 เท่านั้น** · `display: swap` · subset `thai, latin` — ห้ามโหลด 300 (บางเกินสำหรับวรรณยุกต์ไทย) และห้าม 600/700

**Two-tone display (ลายเซ็นของแบรนด์):** หัวเรื่อง hero แบ่ง 2 ท่อน 2 สี —
ท่อนหลัก `ink-900` / ท่อนรองหรือคำสำคัญ `ink-500` (หรือ `pink-500` เฉพาะคำเดียวที่สำคัญจริง)
ได้ความหนาของ 500 โดยไม่เป็นกำแพงดำ และเป็นกราฟิกไอเดียที่จดจำได้

**ข้อควรระวังของ Kanit:**
- เป็นฟอนต์เรขาคณิตที่ค่อนข้างแน่น — เนื้อหายาวต้องคุมความกว้าง ≤ 65ch
- ขนาดต่ำสุด 15px สำหรับ body (ตัวเล็กกว่านี้อ่านยาก)
- ตัวเลขของ Kanit สวยมาก — ใช้กับ Stat ได้เต็มที่
- หัวเรื่อง display ต้องยาวไม่เกิน 2 บรรทัด (กฎ copywriting — ตัว 500 ขนาดใหญ่ 3 บรรทัดขึ้นไปจะเป็นกำแพง)
- ระยะว่างเหนือ-ใต้ hero ≥ sp-12 — ตัวหนาต้องการที่หายใจมากกว่าตัวบาง

### Type scale

| Token | Font | Desktop | Mobile | Weight | ใช้ |
|---|---|---|---|---|---|
| `display` | Kanit | 52/1.25 | 34/1.3 | **500** | Hero เท่านั้น · two-tone · ≤2 บรรทัด |
| `h1` | Kanit | 38/1.3 | 28/1.3 | **500** | หัวหน้าเพจ |
| `h2` | Kanit | 28/1.35 | 24/1.35 | **400** | หัว section |
| `h3` | Kanit | 20/1.45 | 18/1.45 | 500 | หัวการ์ด |
| `body` | Kanit | 17/1.7 | 17/1.7 | 400 | เนื้อหา |
| `small` | Kanit | 15/1.6 | 15/1.6 | 400 | meta, caption |
| `eyebrow` | Kanit | 13/1.4 | 13/1.4 | 500 | ป้ายเหนือหัวเรื่อง tracking .12em |

**กฎ:**
- Weight 400 / 500 เท่านั้น — ห้าม 300 (วรรณยุกต์ไทยจาง) และห้าม 600/700 (Kanit หนาเกินบทบาท) ทุกกรณี
- 500 ใช้กับ: display, h1, h3, eyebrow, ปุ่ม — **h2 ต้องเป็น 400** (ถ้า h2 เป็น 500 จะแย่งน้ำหนักจาก h1)
- body line-height ≥ 1.7 · หัวเรื่อง line-height ≥ 1.25 (วรรณยุกต์ไทยต้องการที่ว่างแนวตั้ง)
- ความกว้าง body ≤ 65ch (`max-w-prose` custom)
- Eyebrow uppercase เฉพาะอังกฤษ ไทยใช้ tracking แต่ไม่แปลงตัว
- ห้ามปนภาษาในประโยคเดียว ยกเว้นชื่อเฉพาะ

---

## PART D — Space, Shape, Motion

### D1. Spacing — 8pt grid

`8 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

| Token | ค่า | ใช้ |
|---|---|---|
| `section-y` | 128px desktop / 64px mobile | ระยะระหว่าง section |
| `card-pad` | 24px | padding ในการ์ด |
| `stack-sm/md/lg` | 8 / 16 / 32 | ระยะภายใน component |

### D2. Shape

- radius: `4px` controls · `8px` cards — ไม่เกินนี้ ไม่มี pill ยกเว้น badge
- border: `1px solid ink-300` — สร้างชั้นด้วยสีพื้น (`ink-0` vs ขาว vs `ink-100`) ไม่ใช้ shadow
- shadow: อนุญาตเฉพาะ `0 0 0 3px pink-100` เป็น focus ring

### D3. Motion

- duration: `150ms` (hover) · `300ms` (reveal) · easing `cubic-bezier(0.2, 0, 0, 1)`
- scroll reveal: fade + translateY(12px) ครั้งเดียว ไม่ loop
- เคารพ `prefers-reduced-motion` เสมอ
- ห้าม: parallax หนักๆ, marquee เร็ว, animation ที่เล่นซ้ำไม่รู้จบ (ยกเว้น SDG marquee ที่เลื่อนช้า ≥40s/รอบ และหยุดเมื่อ hover)

---

## PART E — Graphic Language

### E1. โมทีฟ — Connective lines
จุดและเส้นเชื่อม แทน "การสื่อสาร/เครือข่าย"
- ลายพื้นหลัง opacity ≤ 0.06 ใน hero
- เส้นคั่น section

**สไตล์ไอคอน — paper-craft แบบแบน ไม่ใช่ line icon**

> เดิมข้อนี้เขียนว่า "stroke 1.5px, มุมมน, ไม่มี fill" แต่ไอคอนบริการ 9 ตัวที่อนุมัติ
> และขึ้นเว็บจริงตั้งแต่ PR #6 เป็น **รูปทรงที่ระบายสีทึบ** ไม่ใช่เส้นเปล่า และใช้
> stroke ตั้งแต่ 1.8 ถึง 4 ไม่ใช่ 1.5 · แก้ข้อความให้ตรงกับของจริงเมื่อ 3 ก.ย. 2569
> ด้วยเหตุผลเดียวกับที่แก้ E3 เมื่อ 2 ก.ย. — BRAND.md ชนะโค้ดเสมอ (CLAUDE.md ข้อ 1)
> ถ้าปล่อยข้อความเดิมไว้ ไอคอนตัวถัดไปจะถูกวาดผิดภาษาภาพตั้งแต่วันแรก

- **ภาษาเดียวกับภาพประกอบ paper-craft** ใน E3 — วัตถุเดียวต่อไอคอน รูปทรงเรียบ ระบายสีทึบ
- **สองสีต่อไอคอน** จับคู่ตามช่วงกระบวนการที่บริการนั้นอยู่ (ดู `services.ts`)
- **facet เงาพับกระดาษ** ทำด้วยสีเดิมหรือโทน Ink `#1A1613` ลด opacity (ที่ใช้จริง 0.12–0.65)
  ไม่ใช้สีเทากลางๆ ตัวใหม่ — เงาต้องเป็นสีของกระดาษแผ่นนั้นเอง
- **stroke ใช้เฉพาะรายละเอียดที่วาดเป็นรูปทึบไม่ได้** เช่นวงแว่นขยายหรือก้านเชื่อม
  น้ำหนัก 1.8–4 ตามขนาดของรูป ปลายมน — ไม่ใช่ค่าตายตัวค่าเดียว
- ไอคอนเป็น **การตกแต่ง** ทั้งหมด (`aria-hidden`) ความหมายต้องอยู่ในข้อความข้างๆ เสมอ
- สีจากพาเลตต์โลโก้ที่ใช้ในงานภาพ **ไม่นับรวมเพดานสีของ UI** เพราะเป็นภาษางานภาพ ไม่ใช่ token
- ของจริงอยู่ที่ `src/components/expertise/ServiceIcon.tsx` — วาดเป็น SVG ในโค้ด ไม่ใช่ไฟล์แยก

### E2. Photography
- ภาพงานจริง: ภาคสนาม เวิร์กช็อป ห้องเรียน — ไม่ใช้ stock คนใส่สูทจับมือ
- treatment อุ่นเล็กน้อยให้เข้า Ink ramp
- บุคคล: crop 4:5 พื้นหลังสะอาด
- ทุกภาพมี alt ที่มีความหมายทั้งไทย/อังกฤษตามหน้า

### E3. Illustration — Premium paper-craft

ไม่มีภาพจริง → **ภาพงานตัดกระดาษถ่ายบนพื้นครีม** (มาตรฐานที่ใช้จริงตั้งแต่ Phase 2)

> เดิมข้อนี้เขียนว่า "line illustration สีเดียว" แต่งานที่อนุมัติและขึ้นเว็บจริงตั้งแต่ ส.ค. 2569
> เป็น paper-craft สองสีทั้งหมด (hero, CTA, expertise, collaborate, 404, thumbnail สื่อ 22 ใบ)
> แก้ข้อความให้ตรงกับของจริงเมื่อ 2 ก.ย. 2569 เพราะ BRAND.md ชนะโค้ดเสมอ (CLAUDE.md ข้อ 1)
> ถ้าปล่อยไว้ ภาพใหม่ทุกใบจะขัดกับ source of truth ตั้งแต่วันแรก

**กติกาของภาพหนึ่งใบ**
- **วัตถุเดียว** เป็นอุปมาของเรื่องนั้น วางกลาง เหลือพื้นที่ว่างรอบตัวเยอะ
- **สองสีต่อภาพเท่านั้น** (ยกเว้นภาพ hero หน้าแรกที่เป็นดาวหลากสีประจำแบรนด์)
- พื้นหลังกระดาษสีครีม เห็นเนื้อกระดาษบางๆ
- เงานุ่มแบบถ่ายจริง ไม่ใช่เงาแบบ 3D render
- **ไม่มีตัวอักษรในภาพ** เพราะต้องใช้ร่วมทั้งหน้าไทยและอังกฤษ
- ห้าม corporate memphis หลากสี · ห้าม 3D render ลอยๆ · ห้ามคนหรือใบหน้า

**อัตราส่วนและขนาดที่ใช้อยู่** — ยึดตามนี้ อย่าตั้งใหม่

| การใช้งาน | ขนาด | อัตราส่วน |
|---|---|---|
| แบนเนอร์หัวหน้า / hero / CTA | 1600×686 | 2.33:1 |
| แถบขั้นตอน (expertise stage) | 1600×600 | 2.67:1 |
| การ์ดฟีเจอร์ | 1200×800 | 3:2 |
| thumbnail สื่อ | 1400×875 | 1.6:1 |

**ข้อจำกัดทางเทคนิคที่ห้ามลืม** — `next.config.ts` ตั้ง `unoptimized: true` หลังเหตุการณ์
โควตาแปลงภาพของ Vercel หมดจนภาพหายทั้งเว็บ (30 ส.ค. 2569) แปลว่า**ไม่มีการย่อภาพอัตโนมัติ**
ไฟล์ที่เข้าคลังต้อง**กว้างไม่เกิน 1600px และบีบเป็น WebP มาให้เรียบร้อยแล้ว** ของเดิมอยู่ที่ 7–62 KB ต่อใบ

**เวลาสร้างภาพใหม่** ให้ป้อนภาพเดิมบนเว็บเป็นภาพอ้างอิงสไตล์เสมอ อย่าสั่งด้วยคำบรรยายล้วน —
บทเรียนเดียวกับตอนทำวิดีโอที่บันทึกไว้ใน CLAUDE.md ว่าสั่งด้วยคำอย่างเดียวแล้วโมเดลไม่ทำตาม

### E4. Logo
- ดึงไฟล์ความละเอียดสูงจาก Wix (SVG ถ้าได้) — PNG 400×120 ปัจจุบันเล็กเกิน
- clear space = ความสูงตัวอักษรใหญ่สุด รอบทุกด้าน
- ขนาดต่ำสุดบนเว็บ 120px
- 3 เวอร์ชัน: full colour / mono ขาว / mono ดำ

---

## PART F — Voice & Tone

**ไทย:** ประโยคสั้น ไม่มีครับ/ค่ะในเนื้อหาเว็บ เลขอารบิก ไม่ใช้ "!"
**อังกฤษ:** sentence case ทุกหัวเรื่องและปุ่ม ปุ่มขึ้นต้นกริยา ("View our work" ไม่ใช่ "Learn more")
**ใช้:** research, evidence, impact, community
**ห้าม:** revolutionary, world-class, synergy, disrupt, leverage, seamless, empower

---

## PART G — Component Specs

### G1. Button
| Variant | สไตล์ |
|---|---|
| Primary | พื้น `pink-700` ตัวอักษรขาว · hover `pink-900` (เดิม `pink-500` แต่ contrast ไม่ผ่าน ดูหมายเหตุ B2) |
| Secondary | border `ink-300` ตัวอักษร `ink-900` · hover พื้น `ink-100` |
| Ghost | ตัวอักษร `pink-700` ไม่มี border · hover underline |

สูง 44px · padding x 24px · radius 4px · focus ring `3px pink-100`

### G2. SDG Badge
```
[● SDG 12  การผลิตและบริโภคที่ยั่งยืน]
```
- พื้น `tint` · จุด 8px `pure` · ตัวอักษร 13px/500 `deep` · radius 4px · padding 4px 10px
- `aria-label="SDG 12 — การผลิตและบริโภคที่ยั่งยืน"`
- แบบย่อ: `[● 12]` ใช้ในที่แคบ

### G3. Project Card
- พื้นขาว · border `ink-300` · radius 8px
- แถบบน 4px สี `pure` ของ SDG หลัก
- ภาพ 16:10 → SDG badge → h3 → คำอธิบาย 2 บรรทัด (line-clamp)
- hover: border เปลี่ยนเป็น `pure` ของ SDG นั้น + translateY(-2px)

### G4. Section header pattern
```
EYEBROW (pink-500, tracking .12em)
หัวเรื่อง (Kanit 400 h2)
คำอธิบายหนึ่งย่อหน้า (body, ink-700, ≤65ch)
```

### G5. Stat
ตัวเลข Kanit 48/500 `ink-900` + หน่วย Kanit 15/400 `ink-500` — ตัวเลขไม่แต่งสี

---

## PART H — การใช้สี SDG ต่อหน้า

| หน้า | ระดับการใช้ |
|---|---|
| **Home** | marquee 17 จุดสี + การ์ดผลงานเด่น (แถบ+badge) · เพดาน 6 สี/viewport |
| **Impact list** | เต็มที่ — การ์ดพื้น `tint` ได้ · **เรียงกลุ่มตาม SDG** ไม่เรียงสุ่ม · filter chips 17 อัน |
| **Impact detail** | หนึ่งหน้า หนึ่งสี — แถบ hero 6px + ส่วน impact พื้น `tint` |
| **About** | เฉพาะส่วนพันธกิจ แสดงแถวจุดสี+เลข · Leadership ไม่มีสี SDG |
| **Expertise** | จุดสี 8px ใต้หัวข้อบริการ map ไป SDG ที่เกี่ยว |
| **/sdg (หน้าใหม่)** | หน้าเดียวที่ 17 สีเต็มรูปแบบ — grid `pure` แบบโปสเตอร์ UN กดไป filter ผลงาน |
| **Collaborate** | ไม่มีสี SDG — โฟกัสที่ CTA ชมพู |

---

## PART I — Implementation

### I1. globals.css

```css
:root {
  /* Ink */
  --ink-0:#FBF9F7; --ink-100:#EFEBE6; --ink-300:#C3BCB5;
  --ink-500:#7A716A; --ink-700:#4A423D; --ink-900:#1A1613;

  /* Pink */
  --pink-100:#FBDCEB; --pink-300:#F07EB6; --pink-500:#D31D81;
  --pink-700:#8C1256; --pink-900:#4A0B2E;

  /* SDG */
  --sdg1-tint:#F5E5E7;  --sdg1-pure:#E5243B;  --sdg1-deep:#CD1329;
  --sdg2-tint:#F4EFE6;  --sdg2-pure:#DDA63A;  --sdg2-deep:#8D6415;
  --sdg3-tint:#EAF2E8;  --sdg3-pure:#4C9F38;  --sdg3-deep:#397B29;
  --sdg4-tint:#F5E6E7;  --sdg4-pure:#C5192D;  --sdg4-deep:#C9152A;
  --sdg5-tint:#F7E6E3;  --sdg5-pure:#FF3A21;  --sdg5-deep:#CE1700;
  --sdg6-tint:#E6F2F5;  --sdg6-pure:#26BDE2;  --sdg6-deep:#0F758D;
  --sdg7-tint:#F7F2E4;  --sdg7-pure:#FCC30B;  --sdg7-deep:#876700;
  --sdg8-tint:#F4E6EA;  --sdg8-pure:#A21942;  --sdg8-deep:#A51641;
  --sdg9-tint:#F7EAE4;  --sdg9-pure:#FD6925;  --sdg9-deep:#C13D00;
  --sdg10-tint:#F5E5EC; --sdg10-pure:#DD1367; --sdg10-deep:#CA0C5B;
  --sdg11-tint:#F7EEE4; --sdg11-pure:#FD9D24; --sdg11-deep:#A15A00;
  --sdg12-tint:#F3EFE7; --sdg12-pure:#BF8B2E; --sdg12-deep:#8C651F;
  --sdg13-tint:#EAF0EA; --sdg13-pure:#3F7E44; --sdg13-deep:#3A793F;
  --sdg14-tint:#E4F0F6; --sdg14-pure:#0A97D9; --sdg14-deep:#0473A7;
  --sdg15-tint:#EBF3E7; --sdg15-pure:#56C02B; --sdg15-deep:#357C19;
  --sdg16-tint:#E3F0F7; --sdg16-pure:#00689D; --sdg16-deep:#00689D;
  --sdg17-tint:#E7EEF3; --sdg17-pure:#19486A; --sdg17-deep:#17486C;

  /* Semantic */
  --success:#2E7D32; --error:#C62828; --warning:#B45309;

  /* Purpose */
  --bg-page:var(--ink-0); --bg-card:#FFFFFF; --bg-alt:var(--ink-100);
  --text-heading:var(--ink-900); --text-body:var(--ink-700);
  --text-muted:var(--ink-500); --border-line:var(--ink-300);
  --accent:var(--pink-500);

  /* Space */
  --sp-1:8px; --sp-2:16px; --sp-3:24px; --sp-4:32px;
  --sp-6:48px; --sp-8:64px; --sp-12:96px; --sp-16:128px;
  --section-y:var(--sp-16);

  --radius-control:4px; --radius-card:8px;
  --ease:cubic-bezier(0.2,0,0,1);
}
```

### I2. src/data/sdg.ts

```ts
export const SDG = {
  1:  { en:'No poverty', th:'ขจัดความยากจน', tint:'#F5E5E7', pure:'#E5243B', deep:'#CD1329' },
  2:  { en:'Zero hunger', th:'ขจัดความหิวโหย', tint:'#F4EFE6', pure:'#DDA63A', deep:'#8D6415' },
  3:  { en:'Good health and well-being', th:'สุขภาพและความเป็นอยู่ที่ดี', tint:'#EAF2E8', pure:'#4C9F38', deep:'#397B29' },
  4:  { en:'Quality education', th:'การศึกษาที่มีคุณภาพ', tint:'#F5E6E7', pure:'#C5192D', deep:'#C9152A' },
  5:  { en:'Gender equality', th:'ความเท่าเทียมทางเพศ', tint:'#F7E6E3', pure:'#FF3A21', deep:'#CE1700' },
  6:  { en:'Clean water and sanitation', th:'น้ำสะอาดและสุขาภิบาล', tint:'#E6F2F5', pure:'#26BDE2', deep:'#0F758D' },
  7:  { en:'Affordable and clean energy', th:'พลังงานสะอาด', tint:'#F7F2E4', pure:'#FCC30B', deep:'#876700' },
  8:  { en:'Decent work and economic growth', th:'งานที่มีคุณค่า', tint:'#F4E6EA', pure:'#A21942', deep:'#A51641' },
  9:  { en:'Industry, innovation and infrastructure', th:'อุตสาหกรรมและนวัตกรรม', tint:'#F7EAE4', pure:'#FD6925', deep:'#C13D00' },
  10: { en:'Reduced inequalities', th:'ลดความเหลื่อมล้ำ', tint:'#F5E5EC', pure:'#DD1367', deep:'#CA0C5B' },
  11: { en:'Sustainable cities and communities', th:'เมืองที่ยั่งยืน', tint:'#F7EEE4', pure:'#FD9D24', deep:'#A15A00' },
  12: { en:'Responsible consumption and production', th:'การผลิตและบริโภคที่ยั่งยืน', tint:'#F3EFE7', pure:'#BF8B2E', deep:'#8C651F' },
  13: { en:'Climate action', th:'การรับมือโลกรวน', tint:'#EAF0EA', pure:'#3F7E44', deep:'#3A793F' },
  14: { en:'Life below water', th:'นิเวศทางทะเล', tint:'#E4F0F6', pure:'#0A97D9', deep:'#0473A7' },
  15: { en:'Life on land', th:'นิเวศบนบก', tint:'#EBF3E7', pure:'#56C02B', deep:'#357C19' },
  16: { en:'Peace, justice and strong institutions', th:'สันติภาพและความยุติธรรม', tint:'#E3F0F7', pure:'#00689D', deep:'#00689D' },
  17: { en:'Partnerships for the goals', th:'หุ้นส่วนความร่วมมือ', tint:'#E7EEF3', pure:'#19486A', deep:'#17486C' },
} as const;

export type SdgId = keyof typeof SDG;

/** สีขาวอ่านได้บนพื้น pure เฉพาะ 4 เป้าหมายนี้ */
export const SDG_WHITE_TEXT_OK: readonly SdgId[] = [4, 8, 16, 17];
```

`projects.ts` เปลี่ยน field เป็น `sdg: SdgId[]` (array — โครงการเดียวได้หลายเป้าหมาย เป้าหมายแรกคือสีหลัก)

### I3. Dark mode (ทำเป็นเฟสหลังได้)

`pure` คงเดิมทุกโหมด · badge สลับ: พื้น `deep` ตัวอักษร `tint` · Ink ramp กลับด้าน

### I4. ลำดับงานใน Claude Code

1. วาง `BRAND.md` ที่ root + อ้างใน `CLAUDE.md`
2. สร้าง `src/data/sdg.ts` ตาม I2
3. แทนที่ tokens ใน `globals.css` ตาม I1 + ตั้ง Kanit ด้วย `next/font/google` (weights 400/500 เท่านั้น)
4. สร้าง components: `SdgBadge`, `Button` (3 variants), `SectionHeader`, `Stat`, `ProjectCard`
5. migrate `projects.ts` → `sdg: SdgId[]` แล้วเสนอ mapping ให้ตรวจ
6. ไล่ปรับทีละหน้าตาม PART H — เริ่มจาก Impact (ใช้สีเยอะสุด เจอปัญหาเร็วสุด)
7. สร้างหน้า `/sdg` + `/en/sdg`

---

## PART J — QA Checklist (ตรวจทุกหน้า ก่อน merge)

- [ ] ชมพู ≤ 10% ของหน้าจอ · CTA หลัก 1 ปุ่ม/section · ปุ่มไม่เคยเป็นสี SDG
- [ ] SDG `pure` ไม่ถูกใช้เป็นสีตัวอักษรที่ไหนเลย
- [ ] ทุก badge SDG มีเลขกำกับ + `aria-label` เต็ม
- [ ] ≤ 6 สี SDG ต่อ viewport (ยกเว้น `/sdg`)
- [ ] หน้ารายละเอียดโครงการมีสีเดียว
- [ ] font-weight มีแค่ 400/500 (ไม่มี 300/600/700) · h2 เป็น 400 · display two-tone ≤2 บรรทัด · body ≤ 65ch · lh ≥ 1.7
- [ ] ระยะ section ≥ 96px desktop
- [ ] ทุกภาพมี alt มีความหมาย · contrast ผ่าน AA
- [ ] เนื้อหาไม่ปนภาษา
- [ ] ทดสอบ deuteranopia — หมวดยังแยกได้ด้วยเลข
- [ ] `prefers-reduced-motion` ทำงาน
