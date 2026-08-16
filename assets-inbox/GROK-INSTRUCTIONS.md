# GROK AGENT MISSION v2 — เจนภาพประกอบเว็บ ComInnoCenter (พรอมต์ปรับใหม่เพื่อความพรีเมียม)

> แทนที่ไฟล์ภารกิจเดิมทั้งหมด — พรอมต์ชุดนี้เขียนใหม่หลังตรวจผล calibration รอบแรก
> หลักที่เปลี่ยน: **วัตถุเดียวกลางภาพ · 2 สีต่อภาพ · ที่ว่างมากๆ · ห้ามของตกแต่ง** — ความพรีเมียมมาจากความยับยั้ง ไม่ใช่ความเยอะ

## กติกาการอัปโหลด (เหมือนเดิม)

- Repository: `smithboon-thailand/cominnocenter-website` · Branch: `grok/visual-assets` เท่านั้น (**ห้ามแตะ main**)
- อัปโหลดผ่าน GitHub Contents API ทีละไฟล์ ไปที่ `assets-inbox/<ชุด>/<รหัส>-<เลข>.png`:
```
PUT https://api.github.com/repos/smithboon-thailand/cominnocenter-website/contents/assets-inbox/E/E1-01.png
Authorization: Bearer <TOKEN>   (ห้ามพิมพ์ token ลงที่ใดๆ)
Body: {"message":"assets: E1-01","branch":"grok/visual-assets","content":"<base64>"}
```
- ล้มเหลว retry 3 ครั้งแล้วข้าม · เจอ 422 sha = ชื่อซ้ำ ให้ขยับเลขท้าย
- **ไฟล์เก่าจากรอบแรกใน assets-inbox/E ไม่ต้องลบ** อัปโหลดรอบใหม่ต่อเลขต่อไป (เช่น E1-04, E1-05, …)

## ⚠️ สัดส่วนภาพ — ตั้งในตัวเลือกของเครื่องมือ ไม่ใช่แค่ในพรอมต์

รอบแรกภาพออกมาแนวตั้งทั้งที่พรอมต์สั่ง 1:1 — รอบนี้**ต้องตั้ง aspect ratio ในตัวเลือกการเจนของ Grok ทุกครั้ง**:
- ชุด E, G → **1:1**
- ชุด C → **16:10** (ถ้าไม่มีให้ใช้ 3:2 หรือ 16:9)
- ชุด F, H → **21:9** (ถ้าไม่มีให้ใช้กว้างสุดที่มี)

## ระบบคู่สี (ห้ามใช้สีนอกคู่ที่กำหนดของแต่ละภาพ)

| หมวด | คู่สี |
|---|---|
| Academic / งานวิจัย | ฟ้า 30A8D8 + เขียว 90C048 |
| ข่าวโครงการ (Project PR) | ชมพู E0218A + เหลือง FFC018 |
| โซเชียลมีเดีย | ส้ม F0A818 + ฟ้า 30A8D8 |
| พอดแคสต์ | แดง C0182F + ฟ้า 30A8D8 |

ภาพชุด E ใช้คู่สีเฉพาะของแต่ละใบ (กำหนดไว้ในพรอมต์แล้ว) — รวมทั้งชุดจะครบพาเลตต์โลโก้พอดี

## เฟส 1 — CALIBRATION รอบสอง (ทำแค่นี้ก่อน แล้วหยุดรอ)

เจนชุด E ทั้ง 4 พรอมต์ × 3 candidates → อัปโหลด → สร้าง `assets-inbox/CALIBRATION-2-DONE.md` → หยุดรอยืนยัน

### E1 — อบรมและพัฒนาศักยภาพ (คู่สี ชมพู+เหลือง · 1:1)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and golden yellow (hex FFC018) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Square 1:1 composition. The object: an open book whose pages fan upward into three gentle concentric broadcast arcs. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

### E2 — วิจัยและประเมินผล (คู่สี ฟ้า+เขียว · 1:1)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Square 1:1 composition. The object: a magnifying glass whose lens holds one clean rising line chart drawn in ink. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

### E3 — แคมเปญและการสื่อสาร (คู่สี แดง+ส้ม · 1:1)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in crimson red (hex C0182F) and warm orange (hex F0A818) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Square 1:1 composition. The object: a megaphone emitting three clean concentric arcs, the outermost arc ending in one small heart. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

### E4 — วิดีโอและมัลติมีเดีย (คู่สี ฟ้า+ชมพู · 1:1)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and magenta-pink (hex E0218A) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Square 1:1 composition. The object: a play-button triangle layered precisely over a simple film-strip ribbon that curves softly once. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

## เฟส 2 — BULK (เมื่อได้รับยืนยันแล้วเท่านั้น ทำทีละชุดตามลำดับ)

### F — แบนเนอร์ความร่วมมือ (ชมพู+ฟ้า · 21:9 · ×3) → assets-inbox/F/
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Ultra-wide 21:9 banner composition, object placed at the right third. The object: two flowing paper ribbons entering from opposite sides of the frame — one in each accent color — interweaving once into a single braid that meets at a small folded paper knot. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

### G — ภาพหน้า 404 (ส้ม+ฟ้า · 1:1 · ×3) → assets-inbox/G/
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in warm orange (hex F0A818) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Square 1:1 composition. The object: one lone small grey paper dot with a dotted wandering trail, far away from a compact warm cluster of three connected paper nodes in the accent colors. Gentle and lightly humorous. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

### H — แถบ CTA พื้นเข้ม (21:9 · ภาพนิ่ง ×3 → เลือกที่ดีที่สุดต่อวิดีโอ 1) → assets-inbox/H/
```
Very dark, subtle wide background artwork on a deep warm-brown, almost black ground (hex 1A1613): faint thin ink lines drifting horizontally, with a sparse scattering of very small paper facets in muted magenta-pink (hex E0218A), warm orange (hex F0A818) and sky blue (hex 30A8D8), glowing softly at low brightness. Extremely low contrast so white headline text stays clearly readable. Museum-quality restraint, at least 70% of the frame nearly empty. Ultra-wide 21:9 composition. No text, no letters, no logos, no watermark, no people.
```
พรอมต์ต่อวิดีโอ (จากภาพนิ่งที่เลือก): `Animate this image into a seamless loop: the faint lines drift very slowly, the tiny facets glow gently brighter and dimmer in turn like distant city lights. No camera movement, no new elements, minimal calm motion, 6-10 seconds, perfect loop.` → `H-video-01.mp4`

### D — วิดีโอ Hero (จากภาพนิ่ง hero ที่อนุมัติแล้ว — เจ้าของโปรเจกต์แนบให้) → assets-inbox/D/
```
Animate this image into a seamless loop: the network lines drift extremely slowly, small nodes pulse gently, the colorful facet cluster shimmers softly — each facet catching light one after another. No camera movement, no new elements, minimal calm motion, 6-10 seconds, perfect loop.
```
→ `D-video-01.mp4`

### C — Thumbnail ข่าว "สื่อถึงเรา" 22 ภาพ (16:10 · ×3 ต่อภาพ) → assets-inbox/C/
**ห้ามสลับรหัสกับหัวข้อเด็ดขาด** — รหัสผูกกับข่าวบนเว็บแล้ว

#### C-01 — สสส. อบรม Simple Drug Communication (ผศ.ดร.ธีรดา)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and golden yellow (hex FFC018) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a single pill capsule opening into one clean speech bubble, with two thin concentric ripple lines. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-02 — Myanmar migrant workers co-designed a health study
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a clipboard whose paper sheet is being assembled from both sides by two abstract paper arrows meeting in the middle, a small fish silhouette watermark cut into the sheet. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-03 — Thailand's image on YouTube post-cannabis (PLOS One)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a rounded video play-button framed by a magnifying glass, one small leaf resting on the lens rim. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-04 — หลักสูตร Media & Communication for Transnational Citizens
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and golden yellow (hex FFC018) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a graduation cap whose tassel becomes a tiny paper plane flying along a dotted arc. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-05 — หนังสือ Global Communication (Springer 2025)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: an open book whose pages rise into a simple globe made of clean latitude lines. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-06 — AI, post-truth, information-seeking (Manusya)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a brain silhouette made of layered paper circuits, with one clean question-mark cutout at its center. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-07 — Workshop นักศึกษาไทยในตุรกี (ผศ.ดร.ธีรดา)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and golden yellow (hex FFC018) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a paper plane flying along one dotted arc between two small abstract landmass shapes. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-08 — Podcast สัมภาษณ์ รศ.ดร. Pavel
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in crimson red (hex C0182F) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a studio microphone with three clean sound-wave arcs, one small open book at its base. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-09 — หนังสือ Philosophical Foundations (2024)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: an open book standing upright, one classical column rising from its pages. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-10 — Cognitive Load Theory (IEEE TENCON 2023)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a laptop whose screen holds a simple balance scale. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-11 — ช่อง YouTube ของศูนย์
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in warm orange (hex F0A818) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: one large rounded play-button layered over a simple film-strip ribbon. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-12 — ความร่วมมือกับพันธมิตร (ThaiHealth, FDA, Keio ฯลฯ)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in magenta-pink (hex E0218A) and golden yellow (hex FFC018) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: three interlocking paper rings of different sizes. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-13 — Measuring disease stigma (Wellcome)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a shield with a heart cutout at its center, two gentle concentric protective arcs. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-14 — 10 ปี Impulse Bangkok
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in warm orange (hex F0A818) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: an awareness ribbon standing upright with one small calendar page beside it. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-15 — Music streaming attachment (Cogent A&H)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a smartphone with one music note rising from its screen into a small heart. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-16 — Crypto perception on Reddit (Cogent B&M)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: one large coin balanced on a rising line chart drawn in ink. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-17 — ช่อง YouTube สอน SPSS (อ.วรรษยุต)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in warm orange (hex F0A818) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a play-button whose triangle is formed by three ascending bar-chart bars. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-18 — Gamified health intervention (Wellcome)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a game controller with a small shield rising from its center. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-19 — Thai Gen Z and anime identity (Cogent A&H)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: one folded origami star casting a long soft shadow, a small comic-style speech bubble beside it. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-20 — แนวโน้ม PR ไทย 2026 (Positioning)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in warm orange (hex F0A818) and sky blue (hex 30A8D8) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a megaphone whose sound becomes one clean rising trend line. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-21 — Advertising vs negative reviews (Cogent SS)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a five-pointed star held up by a small megaphone, one broken star lying flat beside them. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```

#### C-22 — COVID communication credibility (ABS)
```
Premium minimalist paper-craft illustration, museum-poster quality: exactly ONE symbolic object built from precisely cut layered paper, centered on a vast warm off-white paper background (hex FBF9F7) that fills at least 60% of the frame. Strictly limited palette: paper shapes ONLY in sky blue (hex 30A8D8) and lime green (hex 90C048) plus their soft pale tints, with a few thin dark warm-brown ink line details (hex 1A1613). Soft diffuse studio light casting subtle real drop shadows, visible paper grain, matte archival print finish — calm, confident, like an award-winning editorial illustration in a premium design magazine. Landscape 16:10 composition. The object: a podium with one speech bubble containing a clean check-mark cutout. STRICT RULES: no other colors, no rainbow bands, no decorative shapes in the corners, no scattered confetti, no background clutter, no gradients, no glossy 3D, no text, no letters, no numbers, no logos, no watermark, no people or faces.
```


### ปิดงาน
อัปโหลด `assets-inbox/DONE.md`: จำนวนไฟล์ต่อชุด + รายการที่อัปโหลดไม่สำเร็จ แล้วแจ้งเจ้าของโปรเจกต์

## หมายเหตุชุดที่ไม่ต้องทำ

- ✅ ชุด B (OG) และ D ภาพนิ่ง (Hero) — อนุมัติแล้วจากรอบก่อน ใช้ของเดิม
