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
| รูปภาพ | **self-host แล้ว** (Phase 0-B) ใน `public/images/` — 246 ไฟล์ ดู mapping ใน `scripts/wix-image-manifest.json` · เหลือ remote เฉพาะรูปหลักสูตรวัฒนธรรมจาก `cuculturecom-static.vercel.app` |
| Favicon | `src/app/icon.png` + `apple-icon.png` — **ชั่วคราว** ทำจากโลโก้เดิม (จะแทนด้วยโลโก้ SVG จริงจาก Phase 2) |

คำสั่งหลัก: `npm run dev` · `npm run build` · `npm run lint`

## โครงสร้างโฟลเดอร์

```
src/
├── app/                    # App Router — ภาษาไทยที่ root
│   ├── layout.tsx          # root layout (lang="th", ฟอนต์, metadata)
│   ├── page.tsx            # Home (ไทย)
│   ├── about/  expertise/  collaborate/
│   ├── impact/             # รายการโครงการ + impact/[slug]/ รายละเอียด
│   ├── news/               # ข่าวที่เก็บจากเว็บเดิม + news/[slug]/ (Phase 0-C)
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
| `projects.ts` | โครงการทั้งหมด 18 โครงการ (17 โครงการมี gallery ใน `projectMedia.ts`) — field `sdg` ปัจจุบันเป็น string เช่น `"SDG 12"` (Phase 1-C จะ migrate เป็น `SdgId[]`) · `sourceUrl` 17 รายการชี้ `/news/<slug>` ภายในแล้ว (Phase 0-C) |
| `news.ts` | ข่าว 24 โพสต์ที่เก็บจากเว็บเดิม (ไทย+อังกฤษ) — `sourceUrl` เก็บ URL Wix เดิมไว้ทำ 301 redirect ใน Phase 0-D |
| `newsMedia.ts` | (generated) local path ของภาพในโพสต์ข่าว — สร้างจาก `scripts/wix-posts-manifest.json` |
| `projectMedia.ts` | mapping slug → media id ของภาพ gallery (id ใช้เป็นชื่อไฟล์ local ใน `public/images/projects/<slug>/` แล้ว) |
| `projectCopyEn.ts` | คำแปลอังกฤษของเนื้อหาโครงการ |
| `leadership.ts` | ผู้บริหารศูนย์ |
| `team.ts` / `researchers.ts` | ทีมงานและนักวิจัย |
| `partners.ts` | หน่วยงานพันธมิตร |
| `highlights.ts` | ข่าว/ไฮไลต์กิจกรรม |
| `videos.ts` | วิดีโอ showcase |
| `illustrations.ts` | path ของ SVG ใน `public/illustrations/` |

ภาพทั้งหมด self-host แล้ว (Phase 0-B) — ฟังก์ชัน `media()/logo()` ในแต่ละ data file ชี้ไป `public/images/` · สคริปต์ดาวน์โหลด: `scripts/download-wix-images.mjs` (ต้องรันด้วย `NODE_USE_ENV_PROXY=1` ในเซสชัน remote)

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

- **Phase 0 — Asset Independence: ✅ เสร็จสมบูรณ์** — 0-A สำรวจ · 0-B self-host ภาพ 246 ไฟล์ + favicon ชั่วคราว · 0-C เก็บ 24 โพสต์เป็น `/news/[slug]` + `/en/news/[slug]` (+39 ภาพ) · 0-D redirects 33 กฎใน `next.config.ts` (โพสต์เดิม 24 + /insights /contact /blog ฯลฯ + catch-all `/post/:slug*`) · 0-E ตรวจแล้ว runtime เหลือ dependency ภายนอกแค่ `cuculturecom-static.vercel.app` (รูป 7), YouTube (thumbnail+embed) และ `formspree.io` (backend ฟอร์มติดต่อ/newsletter — บริการเดิมของเว็บ)
- **Phase 1 — Design System:** tokens + Kanit + `src/data/sdg.ts` → components (SdgBadge, Button, SectionHeader, Stat, ProjectCard) + หน้า `/dev/components` → migrate `projects.ts` เป็น `sdg: SdgId[]` (เสนอ mapping ให้ตรวจก่อน)
- **Phase 2 — Assets จาก Grok:** ทำขนานกับ Phase 3 ได้ ใช้ placeholder ไปก่อน
- **Phase 3 — Implementation ทีละหน้า:** Impact list → Impact detail → `/sdg` → Home → About/Expertise/Collaborate → แปลภาษา → EN parity
- **Phase 4 — QA ทั้งเว็บ:** ลิงก์เสีย, alt, heading, metadata, sitemap+hreflang, QA checklist ใน BRAND.md PART J, Lighthouse ≥ 90, ลบ `/dev/components`
- **Phase 5 — Cutover:** merge → main, ย้ายโดเมนจาก Wix, รอ 2–4 สัปดาห์ก่อนปิด Wix

**จุดที่ต้องหยุดหารือในแชทหลัก:** หลัง 0-A · หลัง 1-B · หลัง 1-C · ก่อน Phase 2 · build/deploy พัง · ก่อน Phase 5
