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
| ฟอนต์ | **Kanit** ตัวเดียวทั้งเว็บ ผ่าน `next/font/google` — weights **400/500 เท่านั้น** (BRAND.md v1.2: ห้าม 300/600/700 · display/h1 = 500 two-tone · h2 = 400) |
| Utilities | clsx, tailwind-merge |
| Deploy | Vercel — ทุก branch ที่ push ได้ Preview URL อัตโนมัติ |
| รูปภาพ | **self-host แล้ว** (Phase 0-B) ใน `public/images/` — 246 ไฟล์ ดู mapping ใน `scripts/wix-image-manifest.json` · เหลือ remote เฉพาะรูปหลักสูตรวัฒนธรรมจาก `cuculturecom-static.vercel.app` |
| Favicon | `src/app/icon.png` + `apple-icon.png` — ทำจากโลโก้ปัจจุบัน **ใช้ถาวร** (ผู้ใช้ยืนยันคงโลโก้เดิม 16 ส.ค. 2569) |

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
| `projects.ts` | โครงการทั้งหมด 18 โครงการ (17 โครงการมี gallery ใน `projectMedia.ts`) — field `sdg: SdgId[]` แล้ว (Phase 1-C) ตัวแรก = สีหลักของการ์ด · `sourceUrl` 17 รายการชี้ `/news/<slug>` ภายใน (Phase 0-C) |
| `sdg.ts` | SDG 17 เป้าหมาย × 3 stops ตาม BRAND.md I2 + `SDG_WHITE_TEXT_OK` + `sdgAria()` · **เกณฑ์ map SDG ให้โครงการ: อิงผลลัพธ์ปลายทางของโครงการ ไม่ใช่รูปแบบกิจกรรม ใส่เป้าหมายรองเฉพาะที่เนื้องานรองรับจริง** |
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
2. **ห้าม push ตรงเข้า `main`** — ตั้งแต่ 16 ส.ค. 2569 `main` คือเว็บ production จริง (โดเมน www.cominnocenter.com ชี้ Vercel แล้ว) ทุกการเปลี่ยนแปลงทำบน branch `claude/*` ของเซสชัน → เปิด PR → ให้ผู้ใช้ตรวจ Preview/อนุมัติก่อน merge เสมอ (branch `feature/redesign` จบภารกิจแล้ว — merged เข้า main ไปแล้ว ไม่ใช้ต่อ)
3. **ทำงานทีละ Phase ตาม `cominno-workflow.md`** ห้ามข้าม Phase ห้ามแตะไฟล์นอกขอบเขต Phase ที่กำลังทำ
4. **commit ย่อยบ่อยๆ** prefix ด้วยชื่อ phase เช่น `phase0: `, `phase1: `
5. **ก่อนแก้ไฟล์ใด อ่านไฟล์เต็มก่อนเสมอ**
6. **หลังแก้เสร็จ รัน `npm run build` ให้ผ่านก่อน push ทุกครั้ง**
7. **เนื้อหาไทยต้องไทยล้วน อังกฤษต้องอังกฤษล้วน**

## สรุปแผนงาน (รายละเอียดเต็มใน cominno-workflow.md)

- **Phase 0 — Asset Independence: ✅ เสร็จสมบูรณ์** — 0-A สำรวจ · 0-B self-host ภาพ 246 ไฟล์ + favicon ชั่วคราว · 0-C เก็บ 24 โพสต์เป็น `/news/[slug]` + `/en/news/[slug]` (+39 ภาพ) · 0-D redirects 33 กฎใน `next.config.ts` (โพสต์เดิม 24 + /insights /contact /blog ฯลฯ + catch-all `/post/:slug*`) · 0-E ตรวจแล้ว runtime เหลือ dependency ภายนอกแค่ `cuculturecom-static.vercel.app` (รูป 7), YouTube (thumbnail+embed) และ `formspree.io` (backend ฟอร์มติดต่อ/newsletter — บริการเดิมของเว็บ)
- **Phase 1 — Design System: ✅ เสร็จสมบูรณ์** — tokens + Kanit 400/500 (typography v1.2 locked) + `src/data/sdg.ts` + components 6 ตัว + migrate `projects.ts` เป็น `sdg: SdgId[]` (mapping อนุมัติแล้ว)
- **Phase 2 — Assets จาก Grok: กำลังทำ (หลัง cutover)** — โลโก้: **ยืนยันใช้โลโก้เดิมถาวร ไม่เจนใหม่** (16 ส.ค. 2569) · ชุดภาพที่เหลือทำผ่านแอป "ComInno Visual Kit" (artifact ในแชทหลัก): B ภาพ OG · C thumbnail ฟีเจอร์สื่อถึงเรา · D hero ภาพ/วิดีโอ · E ภาพประกอบ expertise 4 ด้าน · F แบนเนอร์ collaborate · G ภาพ 404 — ผู้ใช้เจนภาพจาก Grok แล้วส่งไฟล์กลับในแชท (ชื่อไฟล์ขึ้นต้นรหัสชุด) Claude แปลง WebP/ใส่โค้ด
- **Phase 3 — Implementation: ✅ เสร็จสมบูรณ์** — Impact list (filter ?sdg=N) → Impact detail (หนึ่งหน้าหนึ่งสี) → `/sdg` → Home → About/Expertise/Collaborate → language sweep → EN parity ครบ
- **Phase 4 — QA ทั้งเว็บ: ✅ เสร็จสมบูรณ์** — crawl 98 หน้า: ลิงก์ภายใน/alt/heading/h1/metadata/OG/hreflang ผ่านหมด · เพิ่ม `<main>` landmark ทุกหน้า · แก้การ์ด EN ที่โชว์ outcome ไทย · `/impact` เปลี่ยนเป็น static (filter ฝั่ง client ผ่าน `ImpactExplorer` — metadata อยู่ใน `<head>`) · Vercel Analytics ใน root layout · ลบ `/dev/components` · Lighthouse (home+impact, mobile+desktop) ทุกหมวด ≥ 93 · external links 26/34 ตอบ 200 ที่เหลือเป็น bot-block (FB/IG/LinkedIn/ResearchGate/Scopus) + TLS chain ไม่ครบของ `ee.eng.chula.ac.th` (เปิดในเบราว์เซอร์ได้ปกติ) · หมายเหตุ: contrast ของ pink-500/ink-500 บนพื้นอ่อนต่ำกว่า AA เล็กน้อย (4.06–4.41) — เป็นสีตาม BRAND.md ถ้าจะแก้ต้องหารือก่อน
- **Phase 5 — Cutover: ✅ เสร็จ 16 ส.ค. 2569** — merge PR #1 เข้า `main` + ย้ายโดเมน `www.cominnocenter.com`/apex มา Vercel แล้ว (SSL ผ่าน · apex 308→www · redirects เก่า 33/33 ผ่าน · crawl 98 หน้าบนโดเมนจริงผ่านหมด) · **MX อีเมล Google Workspace อยู่บน Wix DNS — ห้ามแตะ** · ค้าง: `en.cominnocenter.com` ยังชี้ Wix (404) รอผู้ใช้เพิ่มโดเมนใน Vercel เป็น redirect + แก้ CNAME · คงบัญชี Wix ถึง ~กลางเดือนกันยายน 2569 แล้วยกเลิกเฉพาะ website plan (**ห้ามยกเลิกส่วนโดเมน/DNS ก่อนย้าย DNS ออก**) 
- **งานถัดไป — ฟีเจอร์ "สื่อถึงเรา":** section/หน้าข่าวที่คนของศูนย์ปรากฏบนสื่อภายนอก + thumbnail จาก Grok (ชุด C) — สรุปย่อเขียนเอง ลิงก์เครดิตต้นทาง ห้ามใบหน้าคนจริง/ตัวอักษรในภาพ · รอรายการลิงก์ข่าวจากผู้ใช้

**จุดที่ต้องหยุดหารือในแชทหลัก:** หลัง 0-A · หลัง 1-B · หลัง 1-C · ก่อน Phase 2 · build/deploy พัง · ก่อน Phase 5
