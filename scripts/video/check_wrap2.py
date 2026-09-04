#!/usr/bin/env python3
"""ตรวจตัวตัดบรรทัดฉบับ "ตามวรรคก่อน": พิมพ์ขนาดฟอนต์ + บรรทัดของทุกฉากทุกภาษา ฟ้องจุดที่ตัดภายในวรรค (INTRA)
แล้วเรนเดอร์เฟรมทุกฉากเป็น contact sheet ต่อภาษาไว้ตรวจด้วยตา: frames/v6/sheet-<lang>.png"""
import os
import build_v2 as V
from PIL import Image, ImageDraw

d = ImageDraw.Draw(Image.new("RGB", (10, 10)))
OUT = os.path.join(V.HERE, "frames", "v6")
os.makedirs(OUT, exist_ok=True)

intra_hits = 0
for c in V.SB:
    for s in c["scenes"]:
        if not s.get("text"):
            continue
        for lang in ("th", "en"):
            text = s["text"][lang]
            is_title = s["role"] == "hook"
            font, lines, _ = V.fit_text(d, text, V.FONT_M, V.TEXT_W, 520, 56 if is_title else 52, 34)
            flags, pos = [], 0
            for ln in lines:
                idx = text.find(ln, pos)
                assert idx >= 0, (c["key"], lang, s["n"], ln)
                end = idx + len(ln)
                if end < len(text) and text[end] != " ":
                    flags.append("INTRA")
                    intra_hits += 1
                pos = end
            print(f"{c['key']}-{lang} s{s['n']} size={font.size} {' '.join(flags)}")
            for ln in lines:
                print("    |", ln)

for c in V.SB:
    for lang in ("th", "en"):
        tiles = []
        for i, s in enumerate(c["scenes"]):
            if s["image"] == "existing":
                img = os.path.join(V.REPO, "public/images/research/summaries", c["slug"] + ".webp")
                im = V.render_scene(c, s, lang, img)
            elif s["image"] == "new":
                img = os.path.join(V.HERE, "images-v2", s["image_file"].replace(".webp", ".png"))
                im = V.render_scene(c, s, lang, img if os.path.exists(img) else None)   # ชุดที่ยังไม่เจนภาพ ตรวจแต่ข้อความ
            else:
                im = V.render_closing(lang)
            tiles.append(im.resize((640, 360), Image.LANCZOS))
        cols = 2
        rows = (len(tiles) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * 640 + (cols + 1) * 12, rows * 360 + (rows + 1) * 12), (60, 56, 52))
        for k, t in enumerate(tiles):
            sheet.paste(t, (12 + (k % cols) * 652, 12 + (k // cols) * 372))
        sheet.save(os.path.join(OUT, f"sheet-{c['key']}-{lang}.png"))
print("INTRA breaks:", intra_hits)
