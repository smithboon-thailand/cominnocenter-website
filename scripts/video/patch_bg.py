#!/usr/bin/env python3
"""ลบวัตถุที่เกินบรีฟออกจากภาพฉาก — ทำงานเฉพาะในหน้าต่างรอบวัตถุ อ้างสีพื้น "เฉพาะที่" (มัธยฐานของขอบหน้าต่าง)
เพราะพื้นครีมไม่ได้เท่ากันทั้งภาพ (มุมล่างขวามืดกว่า) การเทียบกับ #F7F6F2 ตายตัวจะมองพื้นเป็นวัตถุไปหมด
ทาทับเฉพาะ "ก้อน" ที่อยู่ตรงกลางกรอบ (flood fill) ไม่แตะวัตถุข้างเคียง · พื้นสังเคราะห์ = normalized convolution + เกรนจากบริเวณสะอาด
ใช้: python3 patch_bg.py images-v2/<key>.png x0 y0 x1 y1   — ต้นฉบับเก็บเป็น <key>-orig.png และอ่านจากต้นฉบับทุกครั้ง (รันซ้ำได้)"""
import os, sys
from collections import deque
from PIL import Image, ImageFilter, ImageChops, ImageDraw
src = sys.argv[1]; x0, y0, x1, y1 = map(int, sys.argv[2:6])
orig = src.replace(".png", "-orig.png")
if not os.path.exists(orig):
    os.rename(src, orig)
im = Image.open(orig).convert("RGB"); W, H = im.size
M = 170                                   # หน้าต่างรอบกรอบ
wx0, wy0, wx1, wy1 = max(0, x0 - M), max(0, y0 - M), min(W, x1 + M), min(H, y1 + M)
win = im.crop((wx0, wy0, wx1, wy1)); ww, wh = win.size; wp = win.load()
# สีพื้นอ้างอิง = มัธยฐานของแถบขอบหน้าต่าง
ring = [wp[x, y] for y in range(wh) for x in range(ww) if x < 24 or y < 24 or x >= ww - 24 or y >= wh - 24]
ref = tuple(sorted(c[i] for c in ring)[len(ring) // 2] for i in range(3))
dirty = Image.new("L", (ww, wh), 0); dp = dirty.load()
for y in range(wh):
    for x in range(ww):
        r, g, b = wp[x, y]
        if abs(r - ref[0]) + abs(g - ref[1]) + abs(b - ref[2]) > 36:
            dp[x, y] = 255
# ก้อนเป้าหมาย = flood fill จากพิกเซลไม่สะอาดที่ใกล้กลางกรอบที่สุด (บนหน้ากากที่ขยาย 5px ให้เงาอ่อนเชื่อมกับวัตถุ)
grow = dirty.filter(ImageFilter.MaxFilter(5)); gp = grow.load()
cx, cy = (x0 + x1) // 2 - wx0, (y0 + y1) // 2 - wy0
seed = min(((x, y) for y in range(y0 - wy0, y1 - wy0) for x in range(x0 - wx0, x1 - wx0) if gp[x, y]), key=lambda p: (p[0] - cx) ** 2 + (p[1] - cy) ** 2)
target = Image.new("L", (ww, wh), 0); tp = target.load()
q = deque([seed]); tp[seed] = 255
while q:
    x, y = q.popleft()
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < ww and 0 <= ny < wh and gp[nx, ny] and not tp[nx, ny]:
            tp[nx, ny] = 255; q.append((nx, ny))
others = ImageChops.subtract(dirty, target)          # วัตถุอื่นในหน้าต่าง ห้ามทาทับ
paint = ImageChops.subtract(target.filter(ImageFilter.MaxFilter(21)), others.filter(ImageFilter.MaxFilter(3)))
# พื้นเรียบจากพิกเซลสะอาด (ไม่รวมทุกก้อนที่ขยายแล้ว)
clean = ImageChops.invert(dirty.filter(ImageFilter.MaxFilter(17)))
R = 60
num = Image.composite(win, Image.new("RGB", (ww, wh), (0, 0, 0)), clean).filter(ImageFilter.GaussianBlur(R))
den = clean.filter(ImageFilter.GaussianBlur(R))
np_, dp_ = num.load(), den.load()
# เกรน: หาสี่เหลี่ยมสะอาดขนาดเท่ากรอบทาในหน้าต่าง (สแกนหยาบ) — เอา high-pass ของมัน
bb = paint.getbbox(); pw, ph = bb[2] - bb[0], bb[3] - bb[1]
cp = clean.load()
best = None
for gy in range(0, wh - ph, 12):
    for gx in range(0, ww - pw, 12):
        bad = sum(1 for yy in range(gy, gy + ph, 6) for xx in range(gx, gx + pw, 6) if not cp[xx, yy])
        if best is None or bad < best[0]:
            best = (bad, gx, gy)
_, gx, gy = best
gsrc = win.crop((gx, gy, gx + pw, gy + ph))
grain = ImageChops.subtract(gsrc, gsrc.filter(ImageFilter.GaussianBlur(6)), 1, 128).load()
out = win.copy(); op = out.load(); pp = paint.load(); n = 0
for y in range(bb[1], bb[3]):
    for x in range(bb[0], bb[2]):
        if not pp[x, y]:
            continue
        d = dp_[x, y] / 255.0
        if d < 0.01:
            continue
        g = grain[x - bb[0], y - bb[1]]
        op[x, y] = tuple(max(0, min(255, int(np_[x, y][i] / d) + g[i] - 128)) for i in range(3)); n += 1
alpha = paint.filter(ImageFilter.GaussianBlur(3))
final = im.copy(); final.paste(Image.composite(out, win, alpha), (wx0, wy0))
final.save(src)
print(f"patched {src}: ref={ref} target bbox={tuple(v + o for v, o in zip(target.getbbox(), (wx0, wy0, wx0, wy0)))} painted={n}px grain from ({gx + wx0},{gy + wy0}) bad={best[0]}")
