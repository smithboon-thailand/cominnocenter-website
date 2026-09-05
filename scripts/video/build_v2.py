#!/usr/bin/env python3
"""ประกอบวิดีโอฉบับ 2 — ทุกฉากมีภาพ paper-craft อยู่ขวา ข้อความ Kanit อยู่ซ้าย บนพื้นครีมเดียวกัน

ใช้: python3 build_v2.py <clipkey> <th|en> out.mp4
อ่าน storyboard.json (ฉาก/ข้อความ/น้ำหนักเวลา) · images-v2/<key>-NN.png (ภาพใหม่) · ภาพประจำบทความจาก public/ · audio-v2/<key>-<lang>.mp3

หลักการวางภาพ: ย่อภาพให้พอดีกรอบฝั่งขวา แล้ว "ละลาย" ขอบทั้งสี่ด้านเข้ากับพื้นครีมด้วยหน้ากากไล่ระดับ
และเลื่อนโทนพื้นของภาพให้เท่ากับครีมของการ์ดก่อนวาง (ภาพที่เจนมาพื้นไม่เท่ากันทุกใบ ต่างกันไม่กี่ค่า แต่พอเห็นเป็นรอยต่อ)
"""
import json, os, re, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
W, H, FPS = 1920, 1080, 25
HERE = os.path.dirname(os.path.abspath(__file__))
def _find_repo():
    """คลังเว็บ: ถ้าไฟล์นี้อยู่ใน scripts/video/ ของคลังให้ใช้คลังนั้น ไม่งั้นใช้ตัวแปร COMINNO_REPO หรือที่อยู่มาตรฐานของเซสชัน remote"""
    here = os.path.dirname(os.path.abspath(__file__))
    cand = os.path.abspath(os.path.join(here, "..", ".."))
    if os.path.exists(os.path.join(cand, "package.json")):
        return cand
    return os.environ.get("COMINNO_REPO", "/home/user/cominnocenter-website")


REPO = _find_repo()
FONT_R = os.path.join(HERE, "fonts", "Kanit-Regular.ttf")
FONT_M = os.path.join(HERE, "fonts", "Kanit-Medium.ttf")
CREAM = (247, 246, 242)      # #F7F6F2 — พื้นเดียวกับที่สั่งเจนภาพ
INK9 = (26, 22, 19)
INK5 = (122, 113, 106)
PINK = (211, 29, 129)
XFADE = 0.6
TAIL = 1.2                   # ค้างการ์ดปิดหลังเสียงจบ
TEXT_X, TEXT_W = 120, 700    # คอลัมน์ข้อความซ้าย
IMG_BOX = (640, 120, 1920, 960)  # กรอบวางภาพฝั่งขวา (x0,y0,x1,y1) — ภาพที่เจนใหม่เว้นพื้นซ้ายหนึ่งในสามไว้แล้ว
IMG_BOX_FULL = (880, 120, 1920, 960)  # ภาพประจำบทความ 2.33:1 วัตถุเต็มเฟรม ต้องเริ่มขวากว่าไม่ให้ชนหัวเรื่อง
FEATHER = 110

THAI_COMBINING = set("ัิีึืฺุู็่้๊๋์ํ๎")
THAI_LEADING = set("เแโใไ")

SB = json.load(open(os.path.join(HERE, "storyboard.json"), encoding="utf-8"))
LOGO = os.path.join(REPO, "public/images/logo/logo-communication-innovation.png")
CLOSING_LINES = {
    "th": ["ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสาร", "เพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน", "คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย", "cominnocenter.com"],
    "en": ["Center of Excellence in Communication Innovation", "for the Development of Quality of Life and Sustainability", "Faculty of Communication Arts, Chulalongkorn University", "cominnocenter.com"],
}


def audio_duration(path):
    out = subprocess.run([FF, "-i", path], capture_output=True, text=True).stderr
    h, mi, s = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", out).groups()
    return int(h) * 3600 + int(mi) * 60 + float(s)


def safe_chunks(token):
    chunks, cur = [], ""
    for ch in token:
        if ch in THAI_COMBINING or (cur and cur[-1] in THAI_LEADING):
            cur += ch
        else:
            if cur:
                chunks.append(cur)
            cur = ch
    if cur:
        chunks.append(cur)
    return chunks


_SEG_CACHE = {}


def segment(text):
    """ตัดคำด้วย Intl.Segmenter ของ Node (ICU เต็ม) — วิธีเดียวกับ src/lib/text.ts ของเว็บ
    ภาษาไทยไม่มีช่องว่างระหว่างคำ ถ้าตัดตามอักขระจะได้ "คนมา|กขึ้น" """
    if text in _SEG_CACHE:
        return _SEG_CACHE[text]
    js = ("const s=new Intl.Segmenter('th',{granularity:'word'});"
          "const t=require('fs').readFileSync(0,'utf8');"
          "process.stdout.write(JSON.stringify([...s.segment(t)].map(x=>x.segment)))")
    out = subprocess.run(["node", "-e", js], input=text, capture_output=True, text=True, check=True)
    toks = json.loads(out.stdout)
    toks = glue_punct(keep_compounds(toks))
    _SEG_CACHE[text] = toks
    return toks


# เครื่องหมายที่ห้ามขึ้นต้นบรรทัด (ปิด) / ห้ามลงท้ายบรรทัด (เปิด) — พบ "(r = 0.64" แล้ว ")" ตกไปอยู่บรรทัดถัดไปเดี่ยวๆ ในเฟรมจริง
CLOSE_PUNCT = set(")]}.,;:!?…”’»%")
OPEN_PUNCT = set("([{“‘«")


def glue_punct(toks):
    """เชื่อมโทเค็นที่เป็นเครื่องหมายปิดล้วนเข้ากับโทเค็นก่อนหน้า และเชื่อมโทเค็นถัดจากเครื่องหมายเปิดล้วนเข้ากับเครื่องหมายนั้น"""
    out = []
    for tok in toks:
        if out and tok and all(c in CLOSE_PUNCT for c in tok):
            out[-1] += tok
        elif out and out[-1] and all(c in OPEN_PUNCT for c in out[-1]):
            out[-1] += tok
        else:
            out.append(tok)
    return group_parens(out, "")


# คำประสมที่ ICU แยกเป็นสองคำแต่ไม่ควรขึ้นบรรทัดใหม่กลางคำ (พบ "ทั้งปลด | ปล่อย" ในเฟรมจริง)
COMPOUNDS = ["ปลดปล่อย", "ห้องทดลอง", "ตัวตน", "เจนซี", "แหล่งเพาะพันธุ์", "ความทรงจำ", "อินฟลูเอนเซอร์",
             "ประสาทสัมผัส", "ไข้เลือดออก", "ยุงลาย", "ลูกน้ำ", "คอมมูนิตี้มอลล์", "ไอศกรีม", "ประติมากรรม",
             "คำบอกต่อ", "กระแสหลัก", "ความตระหนัก", "ตระหนัก", "พฤติกรรม", "แบบสอบถาม", "นิทรรศการ",
             "เพื่อนสนิท", "ปีครึ่งให้หลัง", "ให้หลัง", "ตัดสินใจ", "สมาชิก", "ข่าวสาร", "รู้ลึก", "รู้จริง", "เจนซีไทย",
             "กระแสหลัก", "คำบอกต่อ", "ไม่ได้", "ไม่ใช่", "ไม่มี", "มากขึ้น", "น้อยลง"]


def keep_compounds(toks):
    """รวมโทเค็นที่ต่อกันแล้วได้คำในรายการ COMPOUNDS ให้เป็นโทเค็นเดียว (ลองรวมได้สูงสุด 4 ชิ้น)"""
    out, i = [], 0
    while i < len(toks):
        merged = False
        for n in (4, 3, 2):
            if i + n <= len(toks):
                cand = "".join(toks[i:i + n])
                if cand in COMPOUNDS:
                    out.append(cand)
                    i += n
                    merged = True
                    break
        if not merged:
            out.append(toks[i])
            i += 1
    return out


def group_parens(items, sep):
    """กลุ่มวงเล็บสั้นๆ เช่น "(r = 0.64)" ให้เป็นชิ้นเดียว ไม่ตัดกลางวงเล็บ"""
    res, i = [], 0
    while i < len(items):
        tok = items[i]
        if tok.startswith("(") and not tok.endswith(")"):
            j = i
            while j < len(items) and not items[j].endswith(")"):
                j += 1
            if j < len(items) and len(sep.join(items[i:j + 1])) <= 16:
                res.append(sep.join(items[i:j + 1]))
                i = j + 1
                continue
        res.append(tok)
        i += 1
    return res


NUM_RE = re.compile(r"^\d[\d,.]*(?:[–-]\d[\d,.]*)?%?$")   # รวมช่วงเลข "10–20" "2557–2558" (ชุดที่ 4: "10–19 | คน" · "ข้อมูลปี | 2557–2558")
# เลขกับสิ่งที่ผูกกับเลข ต้องอยู่บรรทัดเดียวกัน — พบ "23 | คนในกรุงเทพฯ" · "5 ใน | 6" · "ผู้ชมราว | 300 คน" ในเฟรมจริง
TH_AFTER_NUM = ("คน", "วัน", "ปี", "จังหวัด", "กลุ่ม", "ชิ้น", "ครั้ง", "สัปดาห์", "เดือน", "ใน", "จาก", "%",
                "ข้อความ", "คลิป", "ท่า", "ชั่วโมง", "องศา", "ใบ", "แท่ง", "เรื่อง", "ข้อ", "คู่", "ช่อง", "ราย",
                "ช่วง", "ด้าน", "แบบ", "ระบบ", "ครั้ง", "ข้อ", "ราย", "ชื่อ",
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม")   # ชุดที่ 2: "รีวิวลบ 1 | ข้อความ" เคยหลุดบนจอจริง
EN_AFTER_NUM = {"of", "in", "to", "from", "people", "visitors", "provinces", "years", "days", "senses", "interviews", "groups",
                "students", "clips", "news", "vlogs", "workers", "women", "ad", "negative", "physical", "months", "exercises", "weeks", "hours",
                "men", "officers", "answered", "eligible", "models", "users", "experts", "kept"}   # ชุดที่ 5: "40 | men" · "414 | answered"
TH_BEFORE_NUM = ("ราว", "กว่า", "ประมาณ", "เกือบ", "ทั้ง", "เหลือ", "จาก", "ใน", "เพียง", "แค่", "ถึง", "ปี", "สูง", "ต่ำ", "ได้", "รวม",
                 "สัมภาษณ์", "ตอบ")   # "อธิบายได้ | 63%" ชุดที่ 3 · "สัมภาษณ์ | 10 คน" ชุดที่ 5
TH_CONJ = {"กับ", "และ", "หรือ", "แต่", "จึง", "คือ"}   # คำเชื่อมที่ไม่ควรค้างท้ายบรรทัด
EN_BEFORE_NUM = {"of", "in", "to", "from", "around", "about", "over", "under", "only", "all", "than"}


def glue_numbers(phrases):
    """รวมวรรคที่เป็นเลขเข้ากับลักษณนาม/คำเชื่อม/คำนำหน้าของมัน ให้เป็นวรรคเดียว (คั่นด้วยช่องว่างเหมือนเดิม)"""
    out = []
    for ph in phrases:
        if out and re.match(r"^\.\d+[%.,;:]?$", ph):      # ทศนิยมเปล่า ".89" เกาะคำหน้าเสมอ (ชุดที่ 3: "ไว้วางใจ | .26")
            out[-1] += " " + ph
            continue
        if out:
            last = out[-1].split(" ")[-1]
            bare_ph, bare_last = ph.lower().rstrip(",.;:"), last.lower().rstrip(",.;:")
            attach = (NUM_RE.match(last) and (ph.startswith(TH_AFTER_NUM) or bare_ph in EN_AFTER_NUM)) or \
                     (NUM_RE.match(ph) and (last.endswith(TH_BEFORE_NUM) or bare_last in EN_BEFORE_NUM))
            if attach:
                out[-1] += " " + ph
                continue
        out.append(ph)
    return out


def wrap(draw, text, font, max_w, intra=True):
    """ตัดบรรทัดตาม "วรรค" (ช่องว่าง) ก่อนเสมอ — ผู้เขียนไทยเว้นวรรคตามหน่วยความหมาย การตัดตามวรรคจึงไม่มีทางขาดกลางคำ
    (ผู้ใช้พบ "คนรู้ | ลึก" จากการตัดด้วย ICU ซึ่งแยก "รู้ลึก" เป็นสองคำ) · เฉพาะเมื่อวรรคเดียวยาวเกินหนึ่งบรรทัด
    และ intra=True จึงค่อยตัด*ภายในวรรคนั้น*ด้วยตัวตัดคำ ICU · intra=False คืน None ถ้าทำไม่ได้ ให้ fit_text ตัดสินใจลดขนาดฟอนต์แทน"""
    lines = []
    for para in text.split("\n"):
        phrases = glue_numbers(group_parens([p for p in para.split(" ") if p], " "))
        # ตัวคั่น "·" ต้องปิดท้ายบรรทัดก่อน ไม่ขึ้นต้นบรรทัดใหม่ (ขึ้นต้นแล้วอ่านเหมือนหัวข้อย่อย — พบในเฟรมชุดที่ 2)
        merged, glue_next, arrow_next = [], False, False
        for ph in phrases:
            if arrow_next and merged:                        # "1.99 → 2.56" เป็นหน่วยเดียวเมื่อยังพอดีบรรทัด (ชุดที่ 5 พบ "1.99 → | 2.56") — ถ้าหน่วยยาวเกินบรรทัดให้ "→" ปิดท้ายบรรทัดเหมือนเดิม
                arrow_next = False                           # (เกาะแบบไม่มีเงื่อนไขทำให้ "3 แบบ → ความผูกพัน → ใช้ต่อและบอกต่อ" ของชุดที่ 2 กลายเป็นหน่วยเดียวที่ยาวเกินบรรทัดแล้วถูกตัดกลางวรรค)
                if draw.textlength(merged[-1] + " " + ph, font=font) <= max_w:
                    merged[-1] += " " + ph
                else:
                    merged.append(ph)
            elif glue_next and merged:
                glue_next = False
                if draw.textlength(merged[-1] + " " + ph, font=font) <= max_w:   # เกาะขวาเฉพาะเมื่อยังพอดีบรรทัด ไม่งั้นปล่อย "=" ปิดท้ายบรรทัดเหมือนเดิม
                    merged[-1] += " " + ph
                else:
                    merged.append(ph)
            elif ph == "→" and merged:
                merged[-1] += " →"; arrow_next = True
            elif ph == "·" and merged:
                merged[-1] += " ·"
            elif ph == "=" and merged:                       # เครื่องหมายเท่ากับต้องอยู่บรรทัดเดียวกับทั้งสองข้าง (ชุดที่ 3)
                merged[-1] += " ="; glue_next = True
            elif ph.startswith("= ") and merged:             # "= .36" (ทศนิยมเปล่าเกาะ "=" มาแล้วใน glue_numbers) ก็ต้องเกาะฝั่งซ้ายด้วย — ชุดที่ 4 พบ "r | = .36"
                merged[-1] += " " + ph
            elif merged and NUM_RE.match(ph) and not re.search(r"[\d·→]", merged[-1].split(" ")[-1]) \
                    and draw.textlength(merged[-1] + " " + ph, font=font) <= max_w:
                merged[-1] += " " + ph                       # ป้ายกับตัวเลขของมัน ("ข่าวลบ | 36.7%" · "ถาม | 4 เรื่อง") เกาะกันเมื่อยังพอดีบรรทัด (ชุดที่ 4)
            elif ph in TH_CONJ or ph.endswith(":"):          # คำเชื่อมโดดๆ ("เรียนสด กับ | เรียนจากคลิป") และป้ายที่ลงท้ายด้วย ":" ("ไม่ใช่โอตาคุ: | หน้าตามาก่อน")
                merged.append(ph); glue_next = True           # ต้องไม่ปิดท้ายบรรทัด — เกาะวรรคถัดไปถ้ายังพอดีบรรทัด (ชุดที่ 3)
            else:
                merged.append(ph)
        phrases = merged
        line = ""
        for ph in phrases:
            cand = ph if not line else line + " " + ph
            if draw.textlength(cand, font=font) <= max_w:
                line = cand
                continue
            if line:
                lines.append(line)
                line = ""
            if draw.textlength(ph, font=font) <= max_w:
                line = ph
                continue
            if not intra:
                return None
            piece = ""
            for tok in segment(ph):
                if draw.textlength(piece + tok, font=font) <= max_w:
                    piece += tok
                    continue
                if piece:
                    lines.append(piece)
                    piece = ""
                if draw.textlength(tok, font=font) <= max_w:
                    piece = tok
                    continue
                for c in safe_chunks(tok):
                    if draw.textlength(piece + c, font=font) <= max_w:
                        piece += c
                    else:
                        lines.append(piece)
                        piece = c
            line = piece
        if line:
            lines.append(line)
        # คำอังกฤษโดดเดี่ยวบรรทัดสุดท้าย ("comparative or | not") — ดึงคำท้ายบรรทัดก่อนลงมาเป็นคู่ ถ้ายังพอดีบรรทัด
        # ทำเฉพาะคำละติน เพราะบรรทัดไทยไม่มีช่องว่างระหว่างคำ เช็ก "คำเดียว" ไม่ได้
        if len(lines) >= 2 and re.fullmatch(r"[A-Za-z][A-Za-z'’\-]*[.,;:!?]?", lines[-1]):
            prev = lines[-2].split(" ")
            if len(prev) >= 2 and not prev[-1].endswith("·"):
                cand = prev[-1] + " " + lines[-1]
                if draw.textlength(cand, font=font) <= max_w:
                    lines[-2] = " ".join(prev[:-1])
                    lines[-1] = cand
    return lines


def fit_text(draw, text, font_path, max_w, max_h, start, minimum, spacing=1.3):
    """เลือกขนาดฟอนต์: (1) ตัดตามวรรคล้วนที่ขนาดเริ่มต้น ยอมลดได้ไม่เกินสองขั้น (6px) เพื่อรักษาวรรคให้อยู่บรรทัดเดียว
    (2) ถ้ายังไม่ได้ จึงยอมตัดในวรรคที่ยาวเกินด้วย ICU แล้วไล่ขนาดลงตามปกติ"""
    size = start
    while size >= max(minimum, start - 6):
        font = ImageFont.truetype(font_path, size)
        lines = wrap(draw, text, font, max_w, intra=False)
        lh = int(size * spacing)
        if lines is not None and len(lines) * lh <= max_h:
            return font, lines, lh
        size -= 3
    size = start
    while size >= minimum:
        font = ImageFont.truetype(font_path, size)
        lines = wrap(draw, text, font, max_w)
        lh = int(size * spacing)
        if len(lines) * lh <= max_h:
            return font, lines, lh
        size -= 3
    font = ImageFont.truetype(font_path, minimum)
    return font, wrap(draw, text, font, max_w), int(minimum * spacing)


def sample_bg(im):
    """สีพื้นของภาพ = ค่ากลางของแถบขอบบนซ้าย 40×40"""
    px = list(im.crop((0, 0, 40, 40)).getdata())
    ch = list(zip(*px))
    return tuple(sorted(c)[len(c) // 2] for c in ch)


def normalise_bg(im):
    bg = sample_bg(im)
    delta = [CREAM[i] - bg[i] for i in range(3)]
    bands = im.split()
    out = [b.point(lambda v, d=delta[i]: max(0, min(255, v + d))) for i, b in enumerate(bands)]
    return Image.merge("RGB", out)


def feather_mask(w, h, f):
    m = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(m)
    for i in range(f):
        a = int(255 * i / f)
        d.line([(i, 0), (i, h)], fill=a)
        d.line([(w - 1 - i, 0), (w - 1 - i, h)], fill=a)
    # ไล่ระดับบน-ล่างซ้อนอีกชั้น (คูณกัน)
    m2 = Image.new("L", (w, h), 255)
    d2 = ImageDraw.Draw(m2)
    for i in range(f):
        a = int(255 * i / f)
        d2.line([(0, i), (w, i)], fill=a)
        d2.line([(0, h - 1 - i), (w, h - 1 - i)], fill=a)
    return Image.eval(Image.merge("L", [m]), lambda v: v).point(lambda v: v) if False else _mul(m, m2)


def _mul(a, b):
    from PIL import ImageChops
    return ImageChops.multiply(a, b)


TEXT_SAFE_X = 880   # ขอบซ้ายของวัตถุในภาพต้องไม่ล้ำเข้ามาทางซ้ายเกินเส้นนี้ (คอลัมน์ข้อความจบที่ 820)


def content_left(im, tol=18):
    """คอลัมน์ซ้ายสุดที่มีพิกเซลต่างจากพื้นครีมเกิน tol — ใช้กันวัตถุชนข้อความ"""
    small = im.resize((im.width // 4, im.height // 4))
    bg = sample_bg(small)
    px = small.load()
    for x in range(small.width):
        for y in range(small.height):
            r, g, b = px[x, y]
            if abs(r - bg[0]) > tol or abs(g - bg[1]) > tol or abs(b - bg[2]) > tol:
                return x * 4
    return im.width


def place_image(canvas, path, box=IMG_BOX):
    im = Image.open(path).convert("RGB")
    im = normalise_bg(im)
    bw, bh = box[2] - box[0], box[3] - box[1]
    scale = min(bw / im.width, bh / im.height)
    # ภาพชิดขวา: ขอบซ้ายของวัตถุบนผืนผ้าใบ = box[2] - scale*(im.width - content_left) ต้อง ≥ TEXT_SAFE_X
    cl = content_left(im)
    if im.width - cl > 0:
        scale = min(scale, (box[2] - TEXT_SAFE_X) / (im.width - cl))
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    x = box[2] - nw                 # ชิดขวา
    y = box[1] + (bh - nh) // 2     # กึ่งกลางแนวตั้ง
    canvas.paste(im, (x, y), feather_mask(nw, nh, FEATHER))


def base():
    im = Image.new("RGB", (W, H), CREAM)
    return im, ImageDraw.Draw(im)


def draw_label(d, text, y):
    font = ImageFont.truetype(FONT_M, 32)
    d.text((TEXT_X, y), text, font=font, fill=PINK)
    tw = d.textlength(text, font=font)
    d.line([(TEXT_X, y + 50), (TEXT_X + max(tw, 120), y + 50)], fill=PINK, width=3)


def draw_footer(d, lang):
    f = ImageFont.truetype(FONT_R, 24)
    org = "ศูนย์คอมอินโน · คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย" if lang == "th" else "ComInno Center · Faculty of Communication Arts, Chulalongkorn University"
    d.text((TEXT_X, H - 124), org, font=f, fill=INK5)
    d.text((TEXT_X, H - 88), "cominnocenter.com", font=f, fill=INK5)


def render_scene(clip, scene, lang, img_path):
    im, d = base()
    if img_path:
        place_image(im, img_path, IMG_BOX_FULL if scene["image"] == "existing" else IMG_BOX)
        d = ImageDraw.Draw(im)
    label = scene["label"][lang]
    text = scene["text"][lang]
    draw_label(d, label, 190)
    is_title = scene["role"] == "hook"
    font, lines, lh = fit_text(d, text, FONT_M, TEXT_W, 520, 56 if is_title else 52, 34)
    total = len(lines) * lh
    y = 290 + max(0, (520 - total) // 2) - 30
    for ln in lines:
        d.text((TEXT_X, y), ln, font=font, fill=INK9)
        y += lh
    draw_footer(d, lang)
    return im


def render_closing(lang, credit=None):
    """การ์ดปิด · credit = {"authors": [...], "journal": str, "year": str} ถ้าให้มา จะพิมพ์บรรทัดเครดิตผู้เขียนบทความไว้ใต้ข้อความปิด
    (ชื่อทุกคนจาก citation.authors ของ publications.ts — ผู้ร่วมวิจัยทุกคนได้เครดิตบนจอ ไม่ใช่แค่ศูนย์ฯ)"""
    im, d = base()
    lg = Image.open(LOGO).convert("RGBA")
    lw = 440
    lh_ = round(lg.height * lw / lg.width)
    lg = lg.resize((lw, lh_), Image.LANCZOS)
    y0 = 260 if credit else 300
    im.paste(lg, (160, y0), lg)
    y = y0 + lh_ + 48
    font = ImageFont.truetype(FONT_M, 52)
    lines = CLOSING_LINES[lang]
    for i, ln in enumerate(lines):
        f = font if i < len(lines) - 1 else ImageFont.truetype(FONT_M, 64)
        col = INK9 if i < len(lines) - 1 else PINK
        d.text((160, y), ln, font=f, fill=col)
        y += int(f.size * 1.35)
    if credit:
        y += 36
        f_lab = ImageFont.truetype(FONT_M, 26)
        f_txt = ImageFont.truetype(FONT_R, 26)
        label = "ผู้เขียนบทความ" if lang == "th" else "Authors"
        d.text((160, y), label, font=f_lab, fill=PINK)
        y += 40
        names = "  ·  ".join(credit["authors"])
        for ln in wrap(d, names, f_txt, W - 320):
            d.text((160, y), ln, font=f_txt, fill=INK9)
            y += 36
        src = f"{credit['journal']}, {credit['year']}"
        d.text((160, y), src, font=f_txt, fill=INK5)
    return im


def make_clip(png, dur, out):
    frames = max(1, int(round(dur * FPS)))
    # ซูมทั้งเฟรมเบามาก (สูงสุด 1.035) ให้ภาพมีชีวิตโดยตัวอักษรไม่เพี้ยน
    vf = (f"scale=4000:-1,zoompan=z='min(zoom+0.0004,1.035)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={W}x{H}:fps={FPS},format=yuv420p")
    cmd = [FF, "-y", "-loop", "1", "-i", png, "-vf", vf, "-t", f"{dur:.3f}", "-r", str(FPS), "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", out]
    subprocess.run(cmd, check=True, capture_output=True)


def main(key, lang, out_path):
    clip = next(c for c in SB if c["key"] == key)
    audio = os.path.join(HERE, "audio-v2", f"{key}-{lang}.mp3")
    total = audio_duration(audio) + TAIL
    scenes = clip["scenes"]
    weights = [len(s["narr"][lang]) for s in scenes]
    n = len(scenes)
    usable = total + XFADE * (n - 1)
    durs = [max(2.5, usable * w / sum(weights)) for w in weights]
    k = usable / sum(durs)
    durs = [d * k for d in durs]

    tmp = tempfile.mkdtemp(prefix=f"v2_{key}_{lang}_")
    clips = []
    for i, s in enumerate(scenes):
        if s["image"] == "existing":
            img = os.path.join(REPO, "public/images/research/summaries", clip["slug"] + ".webp")
            im = render_scene(clip, s, lang, img)
        elif s["image"] == "new":
            img = os.path.join(HERE, "images-v2", s["image_file"].replace(".webp", ".png"))
            im = render_scene(clip, s, lang, img)
        else:
            im = render_closing(lang)
        png = os.path.join(tmp, f"s{i}.png")
        im.save(png)
        c = os.path.join(tmp, f"s{i}.mp4")
        make_clip(png, durs[i], c)
        clips.append(c)

    inputs = []
    for c in clips:
        inputs += ["-i", c]
    fc, prev, offset = [], "[0:v]", 0.0
    for i in range(1, n):
        offset += durs[i - 1] - XFADE
        outl = f"[v{i}]" if i < n - 1 else "[vout]"
        fc.append(f"{prev}[{i}:v]xfade=transition=fade:duration={XFADE}:offset={offset:.3f}{outl}")
        prev = outl
    cmd = [FF, "-y"] + inputs + ["-i", audio, "-filter_complex", ";".join(fc),
           "-map", "[vout]", "-map", f"{n}:a", "-c:v", "libx264", "-preset", "medium", "-crf", "19",
           "-af", "apad", "-c:a", "aac", "-b:a", "160k", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-shortest", out_path]
    subprocess.run(cmd, check=True, capture_output=True)
    print(out_path, f"{total:.1f}s", [round(d, 1) for d in durs])
    return tmp


if __name__ == "__main__":
    if sys.argv[1] == "--frames":
        # เรนเดอร์เฉพาะภาพนิ่งของทุกฉากไว้ตรวจ ไม่เข้ารหัสวิดีโอ: --frames <key> <lang> <outdir>
        key, lang, outdir = sys.argv[2], sys.argv[3], sys.argv[4]
        os.makedirs(outdir, exist_ok=True)
        clip = next(c for c in SB if c["key"] == key)
        for i, s in enumerate(clip["scenes"]):
            if s["image"] == "existing":
                img = os.path.join(REPO, "public/images/research/summaries", clip["slug"] + ".webp")
                im = render_scene(clip, s, lang, img)
            elif s["image"] == "new":
                img = os.path.join(HERE, "images-v2", s["image_file"].replace(".webp", ".png"))
                im = render_scene(clip, s, lang, img) if os.path.exists(img) else render_scene(clip, s, lang, None)
            else:
                im = render_closing(lang)
            im.resize((960, 540), Image.LANCZOS).save(os.path.join(outdir, f"{key}-{lang}-s{i+1}.png"))
        print("frames ->", outdir)
    else:
        main(sys.argv[1], sys.argv[2], sys.argv[3])
