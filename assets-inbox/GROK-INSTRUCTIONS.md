# GROK AGENT MISSION — เจนภาพประกอบเว็บ ComInnoCenter แล้ว commit เข้า GitHub

> อ่านไฟล์นี้จนจบก่อนเริ่ม ทำตามลำดับเฟสอย่างเคร่งครัด ห้ามข้ามเฟส

## 1) ภารกิจโดยสรุป

เจนภาพประกอบตามพรอมต์ในไฟล์นี้ (สไตล์ Colorful Collage — ล็อกแล้ว) แล้วอัปโหลดไฟล์เข้า GitHub repository ของเว็บไซต์ผ่าน GitHub API — จากนั้นทีมพัฒนา (Claude Code) จะเป็นผู้คัดภาพ แปลงไฟล์ และนำขึ้นเว็บเอง

## 2) ปลายทางการอัปโหลด (ห้ามเปลี่ยน)

- Repository: `smithboon-thailand/cominnocenter-website`
- Branch: `grok/visual-assets` — **ห้าม commit ไป branch อื่นเด็ดขาด โดยเฉพาะ `main` ซึ่งเป็นเว็บ production**
- โฟลเดอร์: `assets-inbox/<รหัสชุด>/` เช่น `assets-inbox/E/E1-01.png`, `assets-inbox/C/C-05-02.png`
- เจ้าของโปรเจกต์จะให้ GitHub token (fine-grained, สิทธิ์เฉพาะ repo นี้) — **ห้ามพิมพ์ token ลงในไฟล์ commit, log หรือข้อความใดๆ**

## 3) วิธีอัปโหลดไฟล์ (GitHub Contents API)

ต่อ 1 ไฟล์ ใช้ HTTP PUT หนึ่งครั้ง (เนื้อไฟล์เข้ารหัส base64):

```
PUT https://api.github.com/repos/smithboon-thailand/cominnocenter-website/contents/assets-inbox/E/E1-01.png
Headers:
  Authorization: Bearer <TOKEN>
  Accept: application/vnd.github+json
Body (JSON):
  {
    "message": "assets: E1-01",
    "branch": "grok/visual-assets",
    "content": "<ไฟล์ base64>"
  }
```

ตัวอย่างด้วย curl:

```bash
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/smithboon-thailand/cominnocenter-website/contents/assets-inbox/E/E1-01.png" \
  -d "{\"message\":\"assets: E1-01\",\"branch\":\"grok/visual-assets\",\"content\":\"$(base64 -w0 E1-01.png)\"}"
```

กติกา:
- อัปโหลด**ทีละไฟล์** ถ้า request ล้มเหลว ให้ retry ไฟล์นั้นสูงสุด 3 ครั้งแล้วข้ามไปไฟล์ถัดไป (บันทึกชื่อไฟล์ที่ล้มเหลวไว้รายงานตอนจบ)
- ถ้า API ตอบ 422 "sha" แปลว่าไฟล์ชื่อนั้นมีอยู่แล้ว — เปลี่ยนเลขลำดับท้ายชื่อไฟล์แทนการเขียนทับ
- ชื่อไฟล์: `<รหัสพรอมต์>-<เลข candidate 2 หลัก>.png` เช่น `E1-01.png`, `E1-02.png`, `C-14-03.png` · วิดีโอ: `D-video-01.mp4`, `H-video-01.mp4`

## 4) สเปคไฟล์

- ภาพนิ่ง: PNG หรือ JPG ด้านกว้าง ≥ 1600px · เจน **3 candidate ต่อพรอมต์**
- วิดีโอ: MP4 ยาว 6–10 วินาที ลูปเนียน ไฟล์ ≤ 50MB
- ห้ามมีตัวอักษร/ตัวเลข/โลโก้ในภาพ · ห้ามใบหน้าคนจริง · พื้นหลังกระดาษอุ่นโล่ง สีสันเป็นจุดเน้น

## 5) ลำดับการทำงาน — 2 เฟส

### เฟส 1 — CALIBRATION (ทำแค่นี้ก่อน แล้วหยุดรอ)
1. เจนเฉพาะ **ชุด E ทั้ง 4 พรอมต์** (E1–E4) พรอมต์ละ 3 candidates = 12 ไฟล์
2. อัปโหลดเข้า `assets-inbox/E/`
3. อัปโหลดไฟล์ `assets-inbox/CALIBRATION-DONE.md` เนื้อหา: รายการไฟล์ที่อัปโหลด + ปัญหาที่พบ (ถ้ามี)
4. **หยุด** — แจ้งเจ้าของโปรเจกต์ให้ทีมพัฒนาตรวจสไตล์ก่อน จะได้ไม่เสียแรงเจนทั้งชุดถ้าต้องจูนพรอมต์

### เฟส 2 — BULK (ทำเมื่อเจ้าของโปรเจกต์ยืนยันว่าผ่านแล้วเท่านั้น)
ทำทีละชุดตามลำดับ อัปโหลดจบชุดแล้วค่อยเริ่มชุดถัดไป:
1. ชุด F (1 พรอมต์ × 3) → `assets-inbox/F/`
2. ชุด G (1 พรอมต์ × 3) → `assets-inbox/G/`
3. ชุด H ภาพนิ่ง (1 × 3) → `assets-inbox/H/` แล้วเลือก candidate ที่ดีที่สุดต่อเป็นวิดีโอ H (1 ไฟล์)
4. วิดีโอ D — ใช้ภาพนิ่ง hero ที่อนุมัติแล้ว (เจ้าของโปรเจกต์จะแนบให้) ต่อเป็นวิดีโอ (1 ไฟล์) → `assets-inbox/D/`
5. ชุด C ทั้ง 22 พรอมต์ (C-01…C-22) พรอมต์ละ 3 → `assets-inbox/C/` — **ห้ามสลับรหัสกับหัวข้อข่าวเด็ดขาด**
6. จบทั้งหมด: อัปโหลด `assets-inbox/DONE.md` สรุป: จำนวนไฟล์ต่อชุด + รายการไฟล์ที่อัปโหลดไม่สำเร็จ

---
 (ข้ามได้)

- ✅ **ชุด B (ภาพ OG)** — เจนและอนุมัติแล้ว
- ✅ **ชุด D (Hero ภาพนิ่ง)** — เจนและอนุมัติแล้ว *(ถ้าต้องการเจนสำรอง ให้เติมวลี "with visible paper-craft collage texture" เพื่อให้ผิวสัมผัสตรงกับภาพ B)*

---

## งานที่ 1 — ภาพประกอบ 4 ด้านความเชี่ยวชาญ (ชุด E · สัดส่วน 1:1 ทั้งสี่ภาพ)

เจนทั้ง 4 ภาพในเซสชันเดียวกันเพื่อให้สไตล์สม่ำเสมอ

### E1 — อบรมและพัฒนาศักยภาพ
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Abstract symbol of knowledge transfer: an open book on a lectern radiating concentric communication waves toward neat rows of small dots representing an audience. Square 1:1 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### E2 — วิจัยและประเมินผล
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Abstract symbol of research and measurement: a magnifying lens hovering over flowing data lines, with a small rising chart drawn in ink beside it. Square 1:1 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### E3 — แคมเปญและการสื่อสาร
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Abstract symbol of a public communication campaign: a megaphone emitting geometric ripples that dissolve into small hearts and speech bubbles. Square 1:1 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### E4 — วิดีโอและมัลติมีเดีย
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Abstract symbol of multimedia production: a play-button triangle intersecting a film strip and flowing sound waves. Square 1:1 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

## งานที่ 2 — แบนเนอร์หน้าร่วมงานกับเรา (ชุด F · 21:9)

```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Abstract symbol of partnership: two flowing ink lines entering from opposite sides of the frame, interweaving into a single braided line that meets at a colorful faceted origami node in the center-right. Wide 21:9 banner composition with calm negative space. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

## งานที่ 3 — ภาพหน้า 404 (ชุด G · 1:1)

```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. A small playful scene: one lone grey dot with a dotted wandering trail, far away from a warm cluster of colorful connected origami nodes it is trying to find. Mostly empty space, gentle and lightly humorous. Square 1:1 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

## งานที่ 4 — แถบ CTA พื้นเข้ม (ชุด H · 21:9 · ภาพนิ่ง → วิดีโอ)

### H ภาพนิ่ง
```
Very dark, subtle wide background artwork on a deep warm-brown, almost black ground (hex 1A1613): faint thin network lines and small nodes drifting across the frame, with a few tiny faceted origami shapes in muted crimson red (hex C0182F), warm orange (hex F0A818), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) glowing softly at low brightness. Extremely low contrast so white headline text stays clearly readable on top. Ultra-wide 21:9 composition. No text, no letters, no logos, no watermark, no people.
```

### H วิดีโอ (ใช้ภาพนิ่ง H ที่คัดแล้วเป็นต้นทาง)
```
Animate this image into a seamless loop: the faint lines drift very slowly across the dark ground, the tiny colorful facets glow gently brighter and dimmer in turn, like distant city lights. No camera movement, no new elements, minimal calm motion, 6-10 seconds, perfect loop.
```

## งานที่ 5 — วิดีโอ Hero (ใช้ภาพนิ่งชุด D ที่อนุมัติแล้วเป็นต้นทาง)

```
Animate this image into a seamless loop: the network lines drift extremely slowly, small nodes pulse gently, the colorful facet cluster shimmers softly — each facet catching light one after another. No camera movement, no new elements, minimal calm motion, 6-10 seconds, perfect loop.
```

---

## งานที่ 6 — Thumbnail ข่าว "สื่อถึงเรา" 22 ภาพ (ชุด C · 16:10 ทุกภาพ)

ภาพประกอบเชิงสัญลักษณ์ประจำข่าวแต่ละชิ้น — **หนึ่งพรอมต์ต่อหนึ่งข่าว ห้ามสลับรหัส** เพราะรหัส C ต้องตรงกับข่าวบนเว็บ

### C-01 (High) — สสส. จัดอบรม “Simple Drug Communication as Daily Routine” โดย ผศ.ดร.ธีรดา
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a national training program on communicating drug safety as part of daily healthcare routines. Represent the theme only with abstract objects — a pill capsule, a speech bubble, concentric communication ripples, a daily checklist — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-02 (High) — Myanmar migrant workers co-designed a health study for their workplace pain
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about factory workers co-designing a health research study about workplace pain. Represent the theme only with abstract objects — a fish silhouette, a clipboard with a heart, connecting arrows between paper shapes — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-03 (High) — Thailand's image on YouTube amid post-cannabis legalization (PLOS One)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research analyzing a country's image on online video platforms after a major policy change. Represent the theme only with abstract objects — a video play button, a magnifying lens, a single leaf, small rating stars — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-04 (High) — เปิดตัวหลักสูตร Media & Communication for Transnational Citizens
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about an online course preparing digital nomads and global talents for cross-border work. Represent the theme only with abstract objects — a laptop, a globe, a graduation cap, a small paper plane — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-05 (High) — หนังสือ Global Communication: Planning Global PR Campaigns (Springer 2025)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a new academic book about planning global public relations campaigns. Represent the theme only with abstract objects — an open book, a globe, a megaphone — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-06 (High) — AI, post-truth realities, and Thai students' information-seeking (Manusya)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research on artificial intelligence, post-truth media, and how students seek reliable information. Represent the theme only with abstract objects — a circuit-patterned brain shape, a large question mark, layered newspaper sheets — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-07 (High) — ผศ.ดร.ธีรดา Workshop นักศึกษาไทยในตุรกีสู่โลกการทำงาน
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a workshop preparing Thai students abroad for the world of work. Represent the theme only with abstract objects — a paper plane flying along a dotted arc between two abstract landmasses, a briefcase — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-08 (High) — Podcast: Communication and Libertarianism — Interview with Pavel Slutskiy
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about an in-depth podcast interview about communication theory and libertarianism. Represent the theme only with abstract objects — a studio microphone, headphones, an open book, flowing sound waves — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-09 (High) — หนังสือ Philosophical Foundations of Communication Studies (2024)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about an academic book on the philosophical foundations of communication studies. Represent the theme only with abstract objects — an open book, a classical column, a flowing speech wave — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-10 (Medium) — Cognitive Load Theory in Online Education (IEEE TENCON 2023)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research on cognitive load theory in online education. Represent the theme only with abstract objects — a laptop, a balance scale, layered documents — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-11 (Medium) — ช่อง YouTube ของศูนย์ Communication Innovation
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a university research center's video channel sharing research and activities. Represent the theme only with abstract objects — a large play button, a film strip, small charts and speech bubbles — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-12 (Medium) — ความร่วมมือและโครงการอบรมกับพันธมิตร (ThaiHealth, FDA, Keio ฯลฯ)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about training collaborations between a university center and government and international partners. Represent the theme only with abstract objects — interlocking rings, overlapping speech bubbles, interwoven ribbons — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-13 (Medium) — Measuring disease stigma in Thailand (MSM and Myanmar migrants)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research measuring and reducing disease stigma in vulnerable communities. Represent the theme only with abstract objects — a protective shield, a heart, gentle concentric circles — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-14 (Medium) — 10 ปี Impulse Bangkok — สุขภาพทางเพศและชุมชน
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about ten years of community sexual-health outreach and free testing. Represent the theme only with abstract objects — an awareness ribbon, a calendar, celebratory paper confetti — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-15 (Medium) — Why fans get attached to music streaming apps (Cogent Arts & Humanities)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research on why fans grow attached to music streaming platforms. Represent the theme only with abstract objects — a music note, a smartphone, a heart — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-16 (Medium) — Cryptocurrency investment perception on Reddit (Cogent Business & Management)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research on social media users' perception of cryptocurrency investment. Represent the theme only with abstract objects — a coin, a chat bubble, a rising line chart — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-17 (Medium) — อ.วรรษยุต — ช่อง YouTube สอน SPSS และเครื่องมือวิจัย
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a professor's video channel teaching statistics software and research tools. Represent the theme only with abstract objects — a play button, a bar chart, a calculator — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-18 (Medium) — Gamified health intervention to prevent work injuries (Wellcome Open Research)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about a gamified health program preventing workplace injuries for migrant workers. Represent the theme only with abstract objects — a game controller, a protective shield, a hard hat — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-19 (Medium) — How Thai Gen Z turned anime into mainstream identity (Cogent Arts & Humanities)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about how a young generation turned anime fandom into a mainstream cultural identity. Represent the theme only with abstract objects — a folded paper star, comic-style speech bubbles, small hearts — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-20 (Medium) — ผลการวิจัยแนวโน้มการประชาสัมพันธ์ของไทย 2026 (Positioning)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research findings on national public relations trends. Represent the theme only with abstract objects — a megaphone, a rising trend line, layered newspaper sheets — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-21 (Medium) — How advertising can fight back against negative online reviews (Cogent Social Sciences)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about research on how advertising counters negative online word-of-mouth. Represent the theme only with abstract objects — a one-star and a five-star rating shape, a megaphone, a shield — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```

### C-22 (Low) — Credibility of the official COVID communication in Thailand (ABS)
```
Modern editorial collage illustration: cut-paper geometric shapes in a bright palette echoing the organization's logo — crimson red (hex C0182F), warm orange (hex F0A818), golden yellow (hex FFC018), lime green (hex 90C048), sky blue (hex 30A8D8) and magenta-pink (hex E0218A) — arranged on a warm off-white background (hex FBF9F7) with thin dark warm-brown ink line details (hex 1A1613). Color stays on the shapes themselves; the background remains calm and open. Clean composition, generous negative space, premium magazine feel. Symbolic editorial illustration for a news story about the credibility of official government communication during a pandemic. Represent the theme only with abstract objects — a podium, a speech bubble with a check mark, a spiky paper ball resembling a virus — never an identifiable person. One clear focal element carrying the accent colors. Landscape 16:10 composition. No text, no letters, no numbers, no logos, no watermark, no identifiable real people or faces.
```


---


---

## เช็คลิสต์รวม

| เฟส | ชุด | ไฟล์โดยประมาณ |
|---|---|---|
| 1 | E1–E4 × 3 | 12 + CALIBRATION-DONE.md |
| 2 | F, G, H × 3 + H-video | 10 |
| 2 | D-video | 1 |
| 2 | C-01…C-22 × 3 | 66 |
| 2 | DONE.md | 1 |

ทำครบแล้วแจ้งเจ้าของโปรเจกต์ว่า "อัปโหลดครบแล้ว" เพื่อส่งต่อให้ Claude Code ประมวลผลขึ้นเว็บ
