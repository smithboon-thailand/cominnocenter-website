#!/usr/bin/env python3
"""ทดลองตัดบรรทัดข้อความบนจอทีละข้อความ (ไม่ต้องรัน check_wrap2 ทั้งชุด): python3 try_wrap.py [--hook] < candidates.txt"""
import sys
import build_v2 as V
from PIL import Image, ImageDraw
d = ImageDraw.Draw(Image.new("RGB", (10, 10)))
is_title = "--hook" in sys.argv
for raw in sys.stdin.read().split("\n"):
    text = raw.strip()
    if not text or text.startswith("#"):
        continue
    font, lines, _ = V.fit_text(d, text, V.FONT_M, V.TEXT_W, 520, 56 if is_title else 52, 34)
    print(f"size={font.size}  {text}")
    for ln in lines:
        print("    |", ln)
