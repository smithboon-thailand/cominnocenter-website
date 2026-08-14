# CLAUDE.md — ComInno Center Website

คู่มือสำหรับ Claude Code ในโปรเจ็ค redesign เว็บ ComInno Center
(ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย)

> **เอกสารคู่กัน:** `BRAND.md` ที่ root คือ source of truth ด้านดีไซน์ทั้งหมด
> แผนงานทุก Phase อยู่ใน `cominno-workflow.md` (เอกสารในแชทหลัก — สรุปย่ออยู่ท้ายไฟล์นี้)

---

## Tech stack

| ส่วน | เทคโนโลยี |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS 3.4 (config: `tailwind.config.ts`) + CSS variables ใน `src/app/globals.css` |
| ฟอนต์ปัจจุบัน | Inter + Sarabun ผ่าน `next/font/google` (จะเปลี่ยนเป็น **Kanit** ตาม BRAND.md ใน Phase 1) |
| Utilities | clsx, tailwind-merge |
| Deploy | Vercel — ทุก branch ที่ push ได้ Preview URL อัตโนมัติ |
| รูปภาพ | ปัจจุบันโหลดจาก `static.wixstatic.com` (จะ self-host ใน Phase 0) — ดู `remotePatterns` ใน `next.config.ts` |

คำสั่งหลัก: `npm run dev` · `npm run build` · `npm run lint`

## โครงสร้างโฟลเดอร์

```
src/
├── app/                    # App Router — ภาษาไทยที่ root
│   ├── layout.tsx          # root layout (lang="th", ฟอนต์, metadata)
│   ├── page.tsx            # Home (ไทย)
│   ├── about/  expertise/  collaborate/
│   ├── impact/             # รายการโครงการ + impact/[slug]/ รายละเอียด
│   ├── en/                 # ภาษาอังกฤษ — โครงสร้างเดียวกันใต้ /en
│   │   ├── page.tsx  about/  expertise/  collaborate/
│   │   └── impact/  impact/[slug]/
│   ├── globals.css         # design tokens (Phase 1 จะแทนที่ตาม BRAND.md I1)
│   ├── sitemap.ts  not-found.tsx
├── components/             # Header, Footer, ContactForm, ProjectGallery, ฯลฯ
│   ├── about/TeamAndPartners.tsx
│   └── effects/            # Reveal, ParallaxHero, GlassCard, AnimatedCounter, InnovationNetwork
└── data/                   # ข้อมูลทั้งหมดของเว็บ (ดูตารางด้านล่าง)
public/
├── illustrations/          # SVG ประกอบ (hero-network, sdg-ring, ฯลฯ)
└── robots.txt
```

## Data files (`src/data/`)

| ไฟล์ | เนื้อหา |
|---|---|
| `projects.ts` | โครงการทั้งหมด 22 โครงการ — field `sdg` ปัจจุบันเป็น string เช่น `"SDG 12"` (Phase 1-C จะ migrate เป็น `SdgId[]`) · `sourceUrl` หลายรายการชี้ไป `cominnocenter.com/post/...` (Wix) |
| `projectMedia.ts` | mapping slug → Wix media id ของภาพ gallery |
| `projectCopyEn.ts` | คำแปลอังกฤษของเนื้อหาโครงการ |
| `leadership.ts` | ผู้บริหารศูนย์ |
| `team.ts` / `researchers.ts` | ทีมงานและนักวิจัย |
| `partners.ts` | หน่วยงานพันธมิตร |
| `highlights.ts` | ข่าว/ไฮไลต์กิจกรรม |
| `videos.ts` | วิดีโอ showcase |
| `illustrations.ts` | path ของ SVG ใน `public/illustrations/` |

ภาพส่วนใหญ่สร้าง URL จาก Wix media id ผ่านฟังก์ชัน `media()` ใน `projects.ts` — จุดสำคัญของ Phase 0

## กติกา i18n

- **ไทย = ภาษาหลัก** อยู่ที่ root path (`/`, `/about`, `/impact/...`)
- **อังกฤษ** อยู่ใต้ `/en` (`/en`, `/en/about`, `/en/impact/...`) โครงสร้างต้องขนานกับไทยเสมอ
- เพิ่มหน้าใหม่ต้องทำทั้งคู่ เช่น `/sdg` คู่กับ `/en/sdg`, `/news/[slug]` คู่กับ `/en/news/[slug]`
- เนื้อหาหน้าไทยต้องไทยล้วน หน้าอังกฤษต้องอังกฤษล้วน — ห้ามปนภาษาในประโยคเดียว ยกเว้นชื่อเฉพาะ (ตาม BRAND.md PART C/F)

## กฎการทำงาน (บังคับทุกครั้ง)

1. **ทุกการตัดสินใจด้านดีไซน์ต้องปฏิบัติตาม `BRAND.md`** ถ้าโค้ดเดิมขัดแย้ง ให้ BRAND.md ชนะ (เช่น สีชมพูเดิม `#DE5C8E` ใน tailwind.config.ts ต้องแทนด้วย `pink-500 #E0218A`, ฟอนต์ Sarabun/Inter ต้องแทนด้วย Kanit)
2. **ห้าม push เข้า `main`** — เว็บ production ใช้งานอยู่ งาน redesign ทั้งหมด commit เข้า `feature/redesign` เท่านั้น
   (หมายเหตุ: เซสชัน Claude remote push ตรงไป `feature/redesign` ไม่ได้ ให้ commit บน branch `claude/*` ของเซสชัน แล้ว sync เข้า `feature/redesign` ผ่าน GitHub — ห้ามแตะ `main` เช่นเดิม)
3. **ทำงานทีละ Phase ตาม `cominno-workflow.md`** ห้ามข้าม Phase ห้ามแตะไฟล์นอกขอบเขต Phase ที่กำลังทำ
4. **commit ย่อยบ่อยๆ** prefix ด้วยชื่อ phase เช่น `phase0: `, `phase1: `
5. **ก่อนแก้ไฟล์ใด อ่านไฟล์เต็มก่อนเสมอ**
6. **หลังแก้เสร็จ รัน `npm run build` ให้ผ่านก่อน push ทุกครั้ง**
7. **เนื้อหาไทยต้องไทยล้วน อังกฤษต้องอังกฤษล้วน**

## สรุปแผนงาน (รายละเอียดเต็มใน cominno-workflow.md)

- **Phase 0 — Asset Independence:** สำรวจทุกจุดที่อ้าง wixstatic/cominnocenter.com (0-A รายงานก่อน ห้ามแก้) → self-host ภาพลง `public/images/` → เก็บเนื้อหาข่าวเป็น `/news/[slug]` → 301 redirects → ตรวจ
- **Phase 1 — Design System:** tokens + Kanit + `src/data/sdg.ts` → components (SdgBadge, Button, SectionHeader, Stat, ProjectCard) + หน้า `/dev/components` → migrate `projects.ts` เป็น `sdg: SdgId[]` (เสนอ mapping ให้ตรวจก่อน)
- **Phase 2 — Assets จาก Grok:** ทำขนานกับ Phase 3 ได้ ใช้ placeholder ไปก่อน
- **Phase 3 — Implementation ทีละหน้า:** Impact list → Impact detail → `/sdg` → Home → About/Expertise/Collaborate → แปลภาษา → EN parity
- **Phase 4 — QA ทั้งเว็บ:** ลิงก์เสีย, alt, heading, metadata, sitemap+hreflang, QA checklist ใน BRAND.md PART J, Lighthouse ≥ 90, ลบ `/dev/components`
- **Phase 5 — Cutover:** merge → main, ย้ายโดเมนจาก Wix, รอ 2–4 สัปดาห์ก่อนปิด Wix

**จุดที่ต้องหยุดหารือในแชทหลัก:** หลัง 0-A · หลัง 1-B · หลัง 1-C · ก่อน Phase 2 · build/deploy พัง · ก่อน Phase 5
