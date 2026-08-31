# CLAUDE.md — ComInno Center Website

คู่มือสำหรับ Claude Code ในโปรเจ็ค redesign เว็บ ComInno Center
(ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารฯ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย)

> **เอกสารคู่กัน:** `BRAND.md` ที่ root คือ source of truth ด้านดีไซน์ทั้งหมด
> แผนงาน Phase 0–5 อยู่ใน `cominno-workflow.md` (เอกสารในแชทหลัก — สรุปย่ออยู่ท้ายไฟล์นี้)
> **เว็บขึ้น production แล้วตั้งแต่ 16 ส.ค. 2569** งานปัจจุบันดูหัวข้อ "งานหลัง cutover" ท้ายไฟล์

---

## Tech stack

| ส่วน | เทคโนโลยี |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS 3.4 (config: `tailwind.config.ts`) + CSS variables ใน `src/app/globals.css` |
| ฟอนต์ | **Kanit** ตัวเดียวทั้งเว็บ ผ่าน `next/font/google` — weights **400/500 เท่านั้น** (BRAND.md v1.2: ห้าม 300/600/700 · display/h1 = 500 two-tone · h2 = 400) |
| Utilities | clsx, tailwind-merge |
| Deploy | Vercel — ทุก branch ที่ push ได้ Preview URL อัตโนมัติ |
| รูปภาพ | **self-host แล้ว** (Phase 0-B) ใน `public/images/` — 320 ไฟล์ (246 ไฟล์จาก Wix ดู mapping ใน `scripts/wix-image-manifest.json` + ภาพ paper-craft จาก Grok) · เหลือ remote เฉพาะรูปหลักสูตรวัฒนธรรมจาก `cuculturecom-static.vercel.app` |
| SEO/analytics | JSON-LD ทุกหน้าผ่าน `src/lib/schema.ts` · `sitemap.ts` · hreflang TH/EN · Vercel Analytics ใน root layout |
| Favicon | `src/app/icon.png` + `apple-icon.png` — ทำจากโลโก้ปัจจุบัน **ใช้ถาวร** (ผู้ใช้ยืนยันคงโลโก้เดิม 16 ส.ค. 2569) |

คำสั่งหลัก: `npm run dev` · `npm run build` · `npm run lint` (ESLint 9 flat config ที่ `eslint.config.mjs` — ต่อยอด `next/core-web-vitals` + `next/typescript`)

## โครงสร้างโฟลเดอร์

```
src/
├── app/                    # App Router — root layout สองตัว ดูหมายเหตุใต้ผัง
│   ├── (th)/               # ภาษาไทย — วงเล็บเป็น route group ไม่มีผลกับ URL
│   │   ├── layout.tsx      # root layout ไทย (lang="th", og:locale th_TH, ฟอนต์, JSON-LD)
│   │   ├── page.tsx        # Home (ไทย)
│   │   ├── about/  expertise/  collaborate/
│   │   ├── impact/         # รายการโครงการ + impact/[slug]/ รายละเอียด
│   │   ├── news/           # ข่าวที่เก็บจากเว็บเดิม + news/[slug]/ (Phase 0-C)
│   │   ├── media/          # "สื่อถึงเรา" — ศูนย์ฯ ปรากฏบนสื่อภายนอก
│   │   ├── research/       # ผลงานวิชาการ (จาก publications.ts)
│   │   ├── sdg/            # 17 เป้าหมาย + วงล้อ SDG
│   │   ├── not-found.tsx   # หน้า 404 ไทย · [...notFound]/ ดึง URL แปลกๆ มาที่นี่
│   ├── (en)/               # ภาษาอังกฤษ — โครงสร้างขนานกันครบทุกหน้า
│   │   ├── layout.tsx      # root layout อังกฤษ (lang="en", og:locale en_US)
│   │   └── en/             # page.tsx about/ expertise/ collaborate/ media/ research/ sdg/
│   │                       #   impact/ impact/[slug]/ news/ news/[slug]/
│   │                       #   not-found.tsx + [...notFound]/
│   ├── globals.css         # design tokens ตาม BRAND.md I1 + keyframes
│   ├── sitemap.ts          # สร้างจาก data file แตกสองภาษาอัตโนมัติ + hreflang
├── components/
│   ├── Header  Footer  ContactForm  NewsletterForm  ProjectGallery  VideoShowcase  HomeLeadership
│   ├── ui/                 # Button, DisplayHeading, ProjectCard, SdgBadge, SdgFilterChips,
│   │                       #   SdgPosterGrid, SectionHeader, Stat
│   ├── effects/            # HeroArtwork, Reveal, ParallaxHero, GlassCard, AnimatedCounter,
│   │                       #   InnovationNetwork
│   ├── impact/             # ImpactExplorer (filter), ProjectFooterNav (related/prev-next)
│   ├── expertise/          # ExpertiseExplorer (4 ช่วงกระบวนการ), ServiceIcon
│   ├── research/           # ResearchExplorer      · media/ MediaExplorer
│   ├── sdg/SdgWheel        # search/SiteSearch (⌘K) · seo/JsonLd · about/TeamAndPartners
├── lib/                    # ตรรกะที่ไม่ผูกกับ UI (ดูตารางด้านล่าง)
└── data/                   # ข้อมูลทั้งหมดของเว็บ (ดูตารางด้านล่าง)
public/
├── images/                 # ภาพ self-host ทั้งหมด (projects/ news/ media/ expertise/ home/ og/)
├── illustrations/          # SVG ประกอบ (hero-network, sdg-ring, ฯลฯ)
└── robots.txt
```

**ทำไม root layout ถึงมีสองตัว (29 ส.ค. 2569)** — `<html lang>` ต้องบอกภาษาของหน้านั้นจริงๆ (WCAG 3.1.1) แต่ layout เป็น server component ที่อ่าน pathname ไม่ได้ ถ้าจะอ่านต้องพึ่ง `headers()` ซึ่งจะดึงทั้งเว็บออกจาก static ไปเป็น dynamic ทั้ง 102 หน้า วิธีที่ Next รองรับคือ root layout หลายตัวผ่าน route group จึงแยกเป็น `(th)` กับ `(en)` — **วงเล็บไม่มีผลกับ URL** `/about` ยังเป็น `/about` เหมือนเดิม

ผลที่ตามมาที่ต้องจำ:
- **เพิ่มหน้าใหม่ต้องวางใต้ group ให้ถูก** ไทยไป `(th)/` อังกฤษไป `(en)/en/` ไม่งั้นจะได้ `lang` ผิดภาษา
- `metadata` ของหน้าลูก**ทับ**ของ layout ทีละ field ระดับบนสุด ไม่ merge เข้าไปข้างใน — เขียน `openGraph` ของตัวเองเมื่อไหร่ ต้องใส่ `images` ด้วยทุกครั้ง ไม่งั้นหน้านั้นจะไม่มีภาพตอนแชร์
- Next render `not-found` ในเปลือก `<html id="__next_error__">` ของตัวเอง ไม่ใช่เปลือกของ layout เรา ฟอนต์/พื้นหลังจึงอยู่ใน `not-found.tsx` เอง อย่าย้ายกลับไปพึ่ง layout

## Data files (`src/data/`)

| ไฟล์ | เนื้อหา |
|---|---|
| `projects.ts` | โครงการทั้งหมด 18 โครงการ (17 โครงการมี gallery ใน `projectMedia.ts`) — field `sdg: SdgId[]` แล้ว (Phase 1-C) ตัวแรก = สีหลักของการ์ด · `sourceUrl` 17 รายการชี้ `/news/<slug>` ภายใน (Phase 0-C) |
| `sdg.ts` | SDG 17 เป้าหมาย × 3 stops ตาม BRAND.md I2 + `SDG_WHITE_TEXT_OK` + `sdgAria()` · **เกณฑ์ map SDG ให้โครงการ: อิงผลลัพธ์ปลายทางของโครงการ ไม่ใช่รูปแบบกิจกรรม ใส่เป้าหมายรองเฉพาะที่เนื้องานรองรับจริง** |
| `news.ts` | ข่าว 24 โพสต์ที่เก็บจากเว็บเดิม (ไทย+อังกฤษ) — `sourceUrl` เก็บ URL Wix เดิมไว้ทำ 301 redirect ใน Phase 0-D |
| `newsMedia.ts` | (generated) local path ของภาพในโพสต์ข่าว — สร้างจาก `scripts/wix-posts-manifest.json` |
| `projectMedia.ts` | mapping slug → media id ของภาพ gallery (id ใช้เป็นชื่อไฟล์ local ใน `public/images/projects/<slug>/` แล้ว) |
| `projectCopyEn.ts` | คำแปลอังกฤษของเนื้อหาโครงการ |
| `services.ts` | บริการ 9 ด้าน + 4 ช่วงกระบวนการ (`ServiceStage`) ที่หน้า Expertise ใช้จัดเรียง · `projectSlugs` ผูกบริการกับโครงการจริง |
| `media.ts` | "สื่อถึงเรา" 22 รายการที่ศูนย์ฯ ปรากฏบนสื่อภายนอก — field `code` ตรงกับชื่อไฟล์ thumbnail `public/images/media/C-XX.webp` |
| `publications.ts` | **(generated — ห้ามแก้ด้วยมือ)** ผลงานวิชาการ 72 รายการ · field `verified` 4 ระดับ `doi`/`link`/`index`/`self` (44/2/11/15) · สร้างด้วย `scripts/fetch-publications.mjs` |
| `leadership.ts` | ผู้บริหารศูนย์ |
| `team.ts` / `researchers.ts` | ทีมงานและนักวิจัย |
| `partners.ts` | หน่วยงานพันธมิตร |
| `highlights.ts` | ข่าว/ไฮไลต์กิจกรรม |
| `videos.ts` | วิดีโอ showcase |
| `illustrations.ts` | path ของ SVG ใน `public/illustrations/` |

ภาพทั้งหมด self-host แล้ว (Phase 0-B) — ฟังก์ชัน `media()/logo()` ในแต่ละ data file ชี้ไป `public/images/` · สคริปต์ดาวน์โหลด: `scripts/download-wix-images.mjs` (ต้องรันด้วย `NODE_USE_ENV_PROXY=1` ในเซสชัน remote)

## Logic files (`src/lib/`)

| ไฟล์ | หน้าที่ |
|---|---|
| `schema.ts` | JSON-LD ทั้งเว็บ — `organizationSchema`, `websiteSchema`, `personSchema`, `publicationListSchema`, `breadcrumbSchema`, `newsArticleSchema` · **`publicationListSchema` กรอง `verified === "self"` ออก** ไม่ยืนยันสิ่งที่พิสูจน์ไม่ได้ต่อ Google |
| `related.ts` | `relatedProjects(slug)` ให้คะแนนจากข้อมูลจริง (+3 บริการร่วม · +2 SDG หลักเดียวกัน · +1 ต่อ SDG รองที่ซ้ำ) เสมอกันตัดสินด้วย slug เพื่อให้ build เสถียร · `projectNeighbours(slug)` ทำ prev/next แบบวน |
| `searchIndex.ts` | ดัชนีค้นหาสร้างตอน build จาก data files (โครงการ ข่าว สื่อ บริการ ผลงานวิชาการ SDG 17 ข้อ และหน้าหลัก) — ไม่มี backend ไม่มีไลบรารีค้นหา |

## Scripts (`scripts/`)

| ไฟล์ | หน้าที่ |
|---|---|
| `fetch-publications.mjs` | ดึงและ**ตรวจสอบ**ผลงานวิชาการ แล้วเขียนทับ `src/data/publications.ts` — ORCID + Crossref + doi.org CSL + ดัชนีอิสระ + ตาราง `THAIJO_SOURCES` ที่ตรวจซ้ำ `citation_author` ทุกครั้งที่รัน |
| `download-wix-images.mjs` · `download-wix-posts.mjs` | สคริปต์ย้ายภาพ/โพสต์จาก Wix (Phase 0 — เก็บไว้อ้างอิง) |
| `indexnow.mjs` | แจ้ง Bing ว่ามีหน้าใหม่/หน้าที่แก้ไข (`npm run indexnow -- <url>`) — ดูหัวข้อ IndexNow ท้ายไฟล์ |

## กติกา i18n

- **ไทย = ภาษาหลัก** อยู่ที่ root path (`/`, `/about`, `/impact/...`)
- **อังกฤษ** อยู่ใต้ `/en` (`/en`, `/en/about`, `/en/impact/...`) โครงสร้างต้องขนานกับไทยเสมอ
- เพิ่มหน้าใหม่ต้องทำทั้งคู่ เช่น `/sdg` คู่กับ `/en/sdg`, `/news/[slug]` คู่กับ `/en/news/[slug]`
- เนื้อหาหน้าไทยต้องไทยล้วน หน้าอังกฤษต้องอังกฤษล้วน — ห้ามปนภาษาในประโยคเดียว ยกเว้นชื่อเฉพาะ (ตาม BRAND.md PART C/F)

## กฎการทำงาน (บังคับทุกครั้ง)

1. **ทุกการตัดสินใจด้านดีไซน์ต้องปฏิบัติตาม `BRAND.md`** ถ้าโค้ดเดิมขัดแย้ง ให้ BRAND.md ชนะ (เช่น สีชมพูเดิม `#DE5C8E` ใน tailwind.config.ts ต้องแทนด้วย `pink-500 #E0218A`, ฟอนต์ Sarabun/Inter ต้องแทนด้วย Kanit)
2. **ห้าม push ตรงเข้า `main`** — ตั้งแต่ 16 ส.ค. 2569 `main` คือเว็บ production จริง (โดเมน www.cominnocenter.com ชี้ Vercel แล้ว) ทุกการเปลี่ยนแปลงทำบน branch `claude/*` ของเซสชัน → เปิด PR → ให้ผู้ใช้ตรวจ Preview/อนุมัติก่อน merge เสมอ (branch `feature/redesign` จบภารกิจแล้ว — merged เข้า main ไปแล้ว ไม่ใช้ต่อ)
3. **Phase 0–5 จบหมดแล้ว** งานหลังจากนี้ทำเป็นฟีเจอร์ต่อฟีเจอร์ หนึ่งเรื่องหนึ่ง PR ไม่ต้องอิงลำดับ Phase อีก
4. **commit ย่อยบ่อยๆ** ขึ้นต้นด้วยขอบเขตงาน เช่น `research: `, `fix: `, `feat: `
5. **ก่อนแก้ไฟล์ใด อ่านไฟล์เต็มก่อนเสมอ**
6. **หลังแก้เสร็จ รัน `npm run build` ให้ผ่านก่อน push ทุกครั้ง**
7. **เนื้อหาไทยต้องไทยล้วน อังกฤษต้องอังกฤษล้วน**
8. **ห้ามขึ้นเว็บด้วยข้อมูลวิชาการที่ยังไม่ได้ตรวจ** — ผลงานวิชาการทุกรายการต้องพิสูจน์ได้ทั้งว่า *มีจริง* และ *เป็นของคนนั้นจริง* ก่อนแสดง ห้ามกรอกมือลง `publications.ts` ให้แก้ที่ `scripts/fetch-publications.mjs` แล้วรันใหม่ · รายการที่ยังพิสูจน์ออนไลน์ไม่ได้ (`self`) แสดงได้แต่ต้องกำกับที่มาให้ผู้อ่านเห็น และห้ามส่งเข้า JSON-LD

## สรุปแผนงาน (รายละเอียดเต็มใน cominno-workflow.md)

- **Phase 0 — Asset Independence: ✅ เสร็จสมบูรณ์** — 0-A สำรวจ · 0-B self-host ภาพ 246 ไฟล์ + favicon ชั่วคราว · 0-C เก็บ 24 โพสต์เป็น `/news/[slug]` + `/en/news/[slug]` (+39 ภาพ) · 0-D redirects 33 กฎใน `next.config.ts` (โพสต์เดิม 24 + /insights /contact /blog ฯลฯ + catch-all `/post/:slug*`) · 0-E ตรวจแล้ว runtime เหลือ dependency ภายนอกแค่ `cuculturecom-static.vercel.app` (รูป 7), YouTube (thumbnail+embed) และ `formspree.io` (backend ฟอร์มติดต่อ/newsletter — บริการเดิมของเว็บ)
- **Phase 1 — Design System: ✅ เสร็จสมบูรณ์** — tokens + Kanit 400/500 (typography v1.2 locked) + `src/data/sdg.ts` + components 6 ตัว + migrate `projects.ts` เป็น `sdg: SdgId[]` (mapping อนุมัติแล้ว)
- **Phase 2 — Assets จาก Grok: ✅ ภาพนิ่งครบทุกชุด (16 ส.ค. 2569)** — โลโก้เดิมใช้ถาวร · สไตล์ "Premium paper-craft" (วัตถุเดียว/2 สีต่อภาพ/คู่สีตามหมวด) เจนโดย Grok agent ผ่าน branch `grok/visual-assets` → `assets-inbox/` → Claude คัด/แปลง WebP: B ภาพ OG (`public/images/og/og-default.jpg` ประกอบโลโก้แล้ว) · C thumbnail 22/22 (`public/images/media/C-XX.webp` — รหัสตรง field `code` ใน `media.ts`) · D hero (`public/images/home/hero-bg.webp`) · E expertise 4 ภาพ (`public/images/expertise/`) · F collaborate banner · G 404 · H พื้นหลัง CTA · **ค้างเฉพาะวิดีโอ D+H** (hero ใช้ภาพนิ่ง + CSS motion แทนแล้วใน PR #11 — ดูหัวข้อ "งานหลัง cutover") · บทเรียน: การอัปโหลดไฟล์จำนวนมากผ่าน GitHub API ควรรวม commit ต่อชุด เพราะทุก commit กินโควตา deployment ของ Vercel แม้ตั้งข้าม build
- **Phase 3 — Implementation: ✅ เสร็จสมบูรณ์** — Impact list (filter ?sdg=N) → Impact detail (หนึ่งหน้าหนึ่งสี) → `/sdg` → Home → About/Expertise/Collaborate → language sweep → EN parity ครบ
- **Phase 4 — QA ทั้งเว็บ: ✅ เสร็จสมบูรณ์** — crawl 98 หน้า: ลิงก์ภายใน/alt/heading/h1/metadata/OG/hreflang ผ่านหมด · เพิ่ม `<main>` landmark ทุกหน้า · แก้การ์ด EN ที่โชว์ outcome ไทย · `/impact` เปลี่ยนเป็น static (filter ฝั่ง client ผ่าน `ImpactExplorer` — metadata อยู่ใน `<head>`) · Vercel Analytics ใน root layout · ลบ `/dev/components` · Lighthouse (home+impact, mobile+desktop) ทุกหมวด ≥ 93 · external links 26/34 ตอบ 200 ที่เหลือเป็น bot-block (FB/IG/LinkedIn/ResearchGate/Scopus) + TLS chain ไม่ครบของ `ee.eng.chula.ac.th` (เปิดในเบราว์เซอร์ได้ปกติ) · หมายเหตุ: contrast ของ pink-500/ink-500 บนพื้นอ่อนต่ำกว่า AA เล็กน้อย (4.06–4.41) — เป็นสีตาม BRAND.md ถ้าจะแก้ต้องหารือก่อน
- **Phase 5 — Cutover: ✅ เสร็จ 16 ส.ค. 2569** — merge PR #1 เข้า `main` + ย้ายโดเมน `www.cominnocenter.com`/apex มา Vercel แล้ว (SSL ผ่าน · apex 308→www · redirects เก่า 33/33 ผ่าน · crawl 98 หน้าบนโดเมนจริงผ่านหมด) · **MX อีเมล Google Workspace อยู่บน Wix DNS — ห้ามแตะ** · ค้าง: `en.cominnocenter.com` ยังชี้ Wix (404) รอผู้ใช้เพิ่มโดเมนใน Vercel เป็น redirect + แก้ CNAME · คงบัญชี Wix ถึง ~กลางเดือนกันยายน 2569 แล้วยกเลิกเฉพาะ website plan (**ห้ามยกเลิกส่วนโดเมน/DNS ก่อนย้าย DNS ออก**) 

## งานหลัง cutover (ทำเสร็จแล้ว — เรียงตามลำดับที่ขึ้นเว็บ)

| งาน | PR | สาระ |
|---|---|---|
| "สื่อถึงเรา" | #2 | `/media` + `/en/media` 22 รายการ + thumbnail ชุด C จาก Grok |
| วงล้อ SDG (ทาง A) | #3 | `SdgWheel` บน `/sdg` เลือกซี่แล้วเลื่อนไปการ์ดเป้าหมายนั้น (`:target` ไฮไลต์) |
| Expertise ใหม่ (ทาง A + C) | #6 | เรียง 9 บริการตาม 4 ช่วงกระบวนการ + การ์ดหลักฐาน + ไอคอน duotone 9 ตัว + แบนเนอร์ชุด S |
| แก้บั๊กมือถือ + Stat spec | #7–8 | ภาพการ์ดขอบขาว/ครอปเสีย → เปลี่ยนไปภาพ landscape จริง · `Stat` นับเลขไต่ขึ้นตาม spec ผู้ใช้ |
| ผลงานวิชาการ + structured data | #9 | `/research` 72 รายการพร้อมระดับการตรวจสอบ · JSON-LD ทั้งเว็บ |
| ค้นหา ⌘K + โครงการเกี่ยวข้อง | #10 | `SiteSearch` (ไม่มี backend) · `ProjectFooterNav` · BreadcrumbList |
| Hero มีชีวิต + header 768px | #11 | `HeroArtwork` (drift 26s + parallax, ปิดตาม reduced-motion) · แก้เมนูอังกฤษล้นจอ |

**ค้างฝั่งผู้ใช้ (ไม่ใช่งานโค้ด):** เพิกถอน PAT ของ Grok · ลบ branch `grok/visual-assets` · เพิ่ม `en.cominnocenter.com` ใน Vercel เป็น redirect 308 → www แล้วแก้ CNAME · ยกเลิก **เฉพาะ website plan** ของ Wix ราวกลางเดือนกันยายน 2569 (ห้ามแตะโดเมน/DNS — MX ของ Google Workspace อยู่ที่นั่น) · ชวน ผศ.ดร.ธีรดา ผูก ORCID เข้ากับ Crossref/Scopus เพื่อให้ผลงานเลื่อนขึ้นเป็นระดับ `doi` อัตโนมัติในรอบรันถัดไป

**ค้างฝั่งงานเว็บ:** วิดีโอพื้นหลัง CTA (ชุด H) — ยังใช้ภาพนิ่ง `cta-bg.webp` อยู่ ส่วน**วิดีโอ hero (ชุด D) เสร็จแล้ว** ดูหัวข้อถัดไป

### วิธีทำวิดีโอประกอบเว็บ (30 ส.ค. 2569)

เซสชัน Claude มีตัวเจนวิดีโอแล้วผ่าน ElevenLabs MCP (`creative_*`) ไม่ต้องพึ่ง Grok เหมือนตอนทำภาพนิ่ง

**บทเรียนสำคัญ: อย่าสั่งด้วยคำบรรยายล้วน** ลองสั่ง "seen from above" ตรงๆ แล้ว Veo ไม่ทำตาม ได้มุมเฉียงกลับมาทุกครั้ง (ปิด prompt enhancement ของ Google ไม่ได้ โมเดลไม่เปิดพารามิเตอร์นั้นให้ตั้ง) **วิธีที่ได้ผลคือใช้ภาพจริงบนเว็บเป็น `start_frame`** แล้วให้โมเดลขยับต่อ — มุมกล้อง สี และองค์ประกอบจะตรงกับเว็บโดยอัตโนมัติเพราะเป็นภาพเดียวกัน (`end_frame` ก็มี ใช้เมื่ออยากให้คลิปไป*จบ*ที่ภาพนั้น)

ขั้นตอน: `creative_create_flow` → `creative_create_asset_upload` + PUT ไฟล์ → `creative_finalize_asset_upload(flow_id)` ได้ node_id → `creative_add_flow_node` (veo-3.1-fast-generate-001, `generate_audio: false`) → `creative_connect_flow_nodes` ต่อเข้าพอร์ต `start_frame` → `creative_run_flow_nodes`

ข้อจำกัดที่ต้องรู้: Veo รับแค่ 16:9 หรือ 9:16 (ภาพ 2.33:1 ของเราต้องเติมพื้นครีม `#F7F6F2` บน-ล่างก่อน) · คลิปละ 4/6/8 วินาทีเท่านั้น · **ราคาคิดทุกครั้งที่กดสร้าง ไม่มีการลองฟรี** ใช้ `estimate_only: true` ดูราคาก่อนเสมอ (8 วิ 1080p ≈ $0.80) และต้องขออนุมัติผู้ใช้ก่อนกดทุกครั้ง

เครื่องนี้ไม่มี ffmpeg มาให้ ติดตั้งด้วย `pip install imageio-ffmpeg` แล้วเรียกจาก `imageio_ffmpeg.get_ffmpeg_exe()`

### IndexNow — แจ้ง Bing เมื่อมีหน้าใหม่ (31 ส.ค. 2569)

หลังเพิ่มโครงการ/ข่าวใหม่แล้ว merge ขึ้น production **ให้รันหนึ่งบรรทัด**:

```bash
npm run indexnow -- https://www.cominnocenter.com/impact/<slug>
```

Bing จะรู้ภายในไม่กี่นาทีแทนที่จะรอบอทมาคลานเจอเองเป็นสัปดาห์ — และเพราะ **ChatGPT search ดึงจากดัชนีของ Bing** ผลงานใหม่จึงไปโผล่ในคำตอบของ AI เร็วขึ้นด้วย (Yandex/Naver/Seznam ใช้มาตรฐานเดียวกัน · **Google ไม่ร่วม** ฝั่ง Google ยังใช้ sitemap + Search Console เหมือนเดิม)

**ข้อห้ามสำคัญ: อย่าใส่ในขั้นตอน build หรือรันทุก deploy** แนวปฏิบัติของ IndexNow คือแจ้งเฉพาะ URL ที่เนื้อหาเปลี่ยนจริง การยิงทั้งเว็บซ้ำๆ เข้าข่ายสแปมและอาจถูกจำกัดสิทธิ์ · `--all` มีไว้สำหรับการเปลี่ยนแปลงครั้งใหญ่เท่านั้น

กุญแจอยู่สองที่และ**ต้องตรงกันเสมอ**: ค่า `KEY` ใน `scripts/indexnow.mjs` กับชื่อ+เนื้อไฟล์ `public/<key>.txt` ถ้าไม่ตรงจะได้ HTTP 403 ทั้งหมด · ไฟล์กุญแจต้องขึ้น production ก่อนถึงจะส่งได้ (IndexNow จะมาดึงไปตรวจ)

**จุดที่ต้องหยุดหารือกับผู้ใช้:** เปลี่ยนสี/ฟอนต์นอก BRAND.md · เพิ่ม/ลบหน้าในเมนูหลัก · แตะ DNS หรือบัญชี Wix · เผยแพร่ข้อมูลบุคคลหรือผลงานวิชาการที่ยังตรวจไม่ครบ · build/deploy พัง
