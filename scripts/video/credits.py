#!/usr/bin/env python3
"""เครดิตผู้เขียนบทความสำหรับการ์ดปิด — อ่านจาก src/data/publications.ts (citation.authors) ผ่าน doi ใน paperSummaries.ts
อ่านไฟล์เป็นข้อความเหมือน check-content.ts เพราะไฟล์อ้างกันด้วย @/ · ใช้ citation.authors ไม่ใช่ authors (ซึ่งเก็บแต่คนของศูนย์ฯ)"""
import json, os, re

def _find_repo():
    """คลังเว็บ: ถ้าไฟล์นี้อยู่ใน scripts/video/ ของคลังให้ใช้คลังนั้น ไม่งั้นใช้ตัวแปร COMINNO_REPO หรือที่อยู่มาตรฐานของเซสชัน remote"""
    here = os.path.dirname(os.path.abspath(__file__))
    cand = os.path.abspath(os.path.join(here, "..", ".."))
    if os.path.exists(os.path.join(cand, "package.json")):
        return cand
    return os.environ.get("COMINNO_REPO", "/home/user/cominnocenter-website")


REPO = _find_repo()


def _summary_key(slug):
    src = open(os.path.join(REPO, "src/data/paperSummaries.ts"), encoding="utf-8").read()
    i = src.find(f'slug: "{slug}"')
    if i < 0:
        raise SystemExit(f"no summary for {slug}")
    block = src[i:i + 1500]
    m = re.search(r'(doi|indexUrl):\s*"([^"]+)"', block)
    return m.group(1), m.group(2)


def credit_for(slug):
    kind, key = _summary_key(slug)
    src = open(os.path.join(REPO, "src/data/publications.ts"), encoding="utf-8").read()
    i = src.find(f'"{kind}": "{key}"')
    if i < 0:
        raise SystemExit(f"no publication with {kind}={key}")
    start = src.rfind("\n  {\n", 0, i)
    end = src.find("\n  },", i)
    block = src[start:end]
    cit = re.search(r'"citation":\s*\{(.*?)\n    \}', block, re.S).group(1)
    authors = [(m.group(2) + " " + m.group(1)).strip() for m in re.finditer(r'"family":\s*"([^"]*)",\s*"given":\s*"([^"]*)"', cit)]
    journal = re.search(r'"containerTitle":\s*"([^"]*)"', cit).group(1)
    year = re.search(r'"year":\s*(\d{4})', cit).group(1)
    return {"authors": authors, "journal": journal, "year": year}


if __name__ == "__main__":
    for slug in ["dengue-media-exposure-longitudinal", "elephant-tales-sensory-exhibition", "anime-thai-gen-z"]:
        print(slug, json.dumps(credit_for(slug), ensure_ascii=False))
