/**
 * สร้างชุดไฟล์สำหรับอัปเดตโปรไฟล์ ResearchGate — `npm run researchgate:kit`
 *
 * ResearchGate ไม่มี API และไม่มีการนำเข้าเป็นชุด ทุกอย่างต้องทำผ่านหน้าเว็บ
 * ขณะล็อกอิน (ด้วยมือ หรือให้ Claude in Chrome / computer use ทำตามรายการ)
 * สคริปต์นี้จึงไม่ได้แตะ ResearchGate เลย แต่รวบรวมสิ่งที่คนหรือเอเจนต์
 * ที่ทำงานหน้าเบราว์เซอร์ต้องใช้ ออกมาเป็นไฟล์ข้อความชุดเดียวใน
 * `research-sources/researchgate/` จากข้อมูลที่ตรวจสอบแล้วในคลังนี้
 *
 *   00-profile.md      ข้อมูลโปรไฟล์จาก leadership.ts (ชื่อ สังกัด ประวัติ ลิงก์ ID)
 *   01-checklist.md    หนึ่งรายการต่อผลงาน — ระดับลิขสิทธิ์ · ไฟล์ · สิ่งที่ต้องทำ · ช่องติ๊ก
 *   02-abstracts.md    บทคัดย่อของวารสารเฉพาะรายการที่ RG เติมเองไม่ได้ (ไม่มี DOI)
 *                      + พาดหัวภาษาชาวบ้านและลิงก์หน้าบทสรุปบนเว็บของทุกชิ้น
 *   05-citations.bib   รายการอ้างอิงทุกชิ้น สร้างจาก citation.ts (ตัวเดียวกับปุ่มบนเว็บ)
 *   05-citations.ris
 *   06-log.md          แม่แบบบันทึกความคืบหน้า — ให้เอเจนต์เขียนทุกรายการที่ทำ
 *
 * **กติกาลิขสิทธิ์สามระดับ** (ตัดสินจากหลักฐาน ไม่ใช่จากความรู้สึกว่า "เปิดอ่านได้")
 *   1  สัญญาอนุญาต CC ที่ตรวจแล้วและมีไฟล์ใน research-sources/papers/
 *      → อัปโหลดฉบับสำนักพิมพ์เป็น public full-text ได้
 *   1? Unpaywall รายงานว่า CC แต่คลังนี้ยังไม่ได้ตรวจกับหน้าวารสารเอง
 *      → ตรวจก่อน (หาลิงก์ creativecommons.org บนหน้าบทความ) แล้วค่อยอัปโหลด
 *   2  สำนักพิมพ์สงวนลิขสิทธิ์ (Unpaywall: closed หรือไม่รู้จัก)
 *      → เพิ่มระเบียนด้วย DOI เท่านั้น · ไฟล์ accepted manuscript อัปโหลดได้
 *        เฉพาะเมื่อนโยบายสำนักพิมพ์อนุญาต (ตรวจที่ Open Policy Finder)
 *   3  เปิดให้อ่านฟรีแต่ไม่ใช่ CC (bronze · วารสารไทยที่สงวนสิทธิ์)
 *      → เพิ่มระเบียน + ลิงก์หน้าวารสาร ไม่อัปโหลดไฟล์
 *
 * **ไฟล์ PDF ไม่ถูกคัดลอกมาไว้ในโฟลเดอร์นี้** รายการชี้ไป research-sources/papers/
 * ซึ่งมีเฉพาะไฟล์ CC อยู่แล้ว (ดู research-sources/README.md) จึงไม่มีทางที่
 * ไฟล์สงวนลิขสิทธิ์จะหลุดมาอยู่ในชุดนี้
 *
 * ตัวเลือก:
 *   --author <slug>        คนของศูนย์ฯ ที่จะทำชุด (ค่าเริ่มต้น smith-boonchutima)
 *   --refresh-unpaywall    ถาม Unpaywall ใหม่ทุก DOI แล้วเขียน unpaywall-snapshot.json
 *   --refresh-abstracts    ดึงบทคัดย่อจาก meta tag ของวารสาร (รายการที่ไม่มี DOI)
 *                          แล้วเขียน abstracts-snapshot.json
 *   (ในเซสชัน remote ต้องรันสองตัวเลือกนี้ด้วย NODE_USE_ENV_PROXY=1)
 *
 * รันด้วย --import ./scripts/alias-loader.mjs เพราะ paperSummaries.ts อ้าง
 * publications ด้วย `@/` ซึ่ง Node ตามเองไม่ได้ — ที่นี่ต้องการข้อความบทสรุป
 * ครบทุกช่อง การ parse ไฟล์เป็นข้อความอย่างที่ check-content ทำจึงไม่พอ
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { publications, type PublicationEntry } from "../src/data/publications.ts";
import { CC_LICENSES, summaryForPublication, type PaperSummary } from "../src/data/paperSummaries.ts";
import { leadership } from "../src/data/leadership.ts";
import { EMAIL } from "../src/data/contact.ts";
import { apa, bibtex, ris } from "../src/lib/citation.ts";

const SITE = "https://www.cominnocenter.com";
const OUT = new URL("../research-sources/researchgate/", import.meta.url);
const PAPERS = new URL("../research-sources/papers/", import.meta.url);
const UNPAYWALL_SNAPSHOT = new URL("unpaywall-snapshot.json", OUT);
const ABSTRACTS_SNAPSHOT = new URL("abstracts-snapshot.json", OUT);
const DECISIONS = new URL("decisions.json", OUT);
const OPEN_POLICY_FINDER = "https://openpolicyfinder.jisc.ac.uk/search?q=";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const AUTHOR = option("--author") ?? "smith-boonchutima";
const TODAY = new Date().toISOString().slice(0, 10);

const person = leadership.find((l) => l.slug === AUTHOR);
if (!person) {
  console.error(`researchgate:kit — ไม่พบ "${AUTHOR}" ใน leadership.ts`);
  process.exit(1);
}

const mine = publications.filter((p) => p.authors.includes(AUTHOR));
if (mine.length === 0) {
  console.error(`researchgate:kit — ${AUTHOR} ไม่มีผลงานใน publications.ts`);
  process.exit(1);
}

/* ---------- snapshots (Unpaywall + บทคัดย่อ) ---------- */

type UnpaywallRow = {
  status: "ok" | "not-found";
  checked?: string;
  oa_status?: string | null;
  is_oa?: boolean;
  journal_is_oa?: boolean;
  journal_name?: string | null;
  publisher?: string | null;
  license?: string | null;
  host_type?: string | null;
  url?: string | null;
  url_for_pdf?: string | null;
  version?: string | null;
};

type AbstractRow = {
  fetched: string;
  source: string;
  title?: string;
  abstract?: string;
  pdfUrl?: string;
  ccLink?: string;
};

const readJson = <T>(url: URL, fallback: T): T =>
  existsSync(url) ? (JSON.parse(readFileSync(url, "utf8")) as T) : fallback;

let unpaywall = readJson<Record<string, UnpaywallRow>>(UNPAYWALL_SNAPSHOT, {});
let abstracts = readJson<Record<string, AbstractRow>>(ABSTRACTS_SNAPSHOT, {});

/**
 * คำตัดสินหลังเปิดหน้าวารสารด้วยเบราว์เซอร์ — สำหรับรายการที่ Unpaywall กับหน้าวารสารเห็นไม่ตรงกัน
 * (ระดับ 1?) พอคนหรือเอเจนต์หน้าเบราว์เซอร์ตัดสินแล้ว บันทึกไว้ที่นี่ รอบรันถัดไปจะไม่จัดเป็น 1? ซ้ำ
 * และไม่สั่งให้ใครไปเปิดดูอีก · **เขียนมือ ต้องมีวันที่ตรวจและหลักฐานทุกแถว** (กติกาเดียวกับ
 * CITATION_FIXES) · กุญแจคือ DOI หรือ indexUrl · รอบแรก 26 ก.ย. 2569: Media Education 2024 ที่
 * Unpaywall ว่า cc-by (ผ่าน cyberleninka ซึ่งเป็นคลังรวม) แต่ตัวไฟล์ระบุสงวนลิขสิทธิ์ → ระดับ 3
 */
type Decision = { tier: "1" | "3"; license?: string; checked: string; note: string };
const decisions = readJson<Record<string, Decision>>(DECISIONS, {});

if (flag("--refresh-unpaywall")) {
  const next: Record<string, UnpaywallRow> = {};
  for (const p of mine) {
    if (!p.doi) continue;
    const res = await fetch(
      `https://api.unpaywall.org/v2/${p.doi}?email=${encodeURIComponent(EMAIL)}`,
    );
    if (!res.ok) {
      next[p.doi] = { status: "not-found", checked: TODAY };
      console.log(`  unpaywall ${p.doi} → HTTP ${res.status}`);
      continue;
    }
    const d = (await res.json()) as {
      oa_status?: string;
      is_oa?: boolean;
      journal_is_oa?: boolean;
      journal_name?: string;
      publisher?: string;
      best_oa_location?: {
        license?: string | null;
        host_type?: string | null;
        url?: string | null;
        url_for_pdf?: string | null;
        version?: string | null;
      } | null;
    };
    const b = d.best_oa_location ?? {};
    next[p.doi] = {
      status: "ok",
      checked: TODAY,
      oa_status: d.oa_status ?? null,
      is_oa: d.is_oa,
      journal_is_oa: d.journal_is_oa,
      journal_name: d.journal_name ?? null,
      publisher: d.publisher ?? null,
      license: b.license ?? null,
      host_type: b.host_type ?? null,
      url: b.url ?? null,
      url_for_pdf: b.url_for_pdf ?? null,
      version: b.version ?? null,
    };
    console.log(`  unpaywall ${p.doi} → ${d.oa_status} ${b.license ?? "-"}`);
  }
  unpaywall = next;
  writeFileSync(UNPAYWALL_SNAPSHOT, JSON.stringify(unpaywall, null, 1) + "\n");
}

const metaContent = (html: string, name: string) => {
  const re = new RegExp(`<meta name="${name}"(?: xml:lang="([^"]*)")? content="([^"]*)"`, "g");
  const out: { lang?: string; value: string }[] = [];
  for (const m of html.matchAll(re)) out.push({ lang: m[1], value: decodeEntities(m[2]) });
  return out;
};

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ");

if (flag("--refresh-abstracts")) {
  const next: Record<string, AbstractRow> = {};
  for (const p of mine) {
    if (p.doi || !p.indexUrl) continue;
    const res = await fetch(p.indexUrl, {
      headers: { "User-Agent": `cominnocenter-website/1.0 (mailto:${EMAIL})` },
    });
    if (!res.ok) {
      console.log(`  abstract ${p.indexUrl} → HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    // OJS ใส่บทคัดย่อไว้ใน DC.Description แยกตามภาษา — เอาฉบับอังกฤษ (ถ้ามี) ก่อน
    const descs = metaContent(html, "DC.Description").filter((d) => d.value.trim());
    const en = descs.find((d) => !/[฀-๿]/.test(d.value)) ?? descs[0];
    const cc = html.match(/creativecommons\.org\/licenses\/[a-z-]+\/[0-9.]+/)?.[0];
    next[p.indexUrl] = {
      fetched: TODAY,
      source: p.indexUrl,
      title: metaContent(html, "citation_title")[0]?.value,
      abstract: en?.value,
      pdfUrl: metaContent(html, "citation_pdf_url")[0]?.value,
      ccLink: cc ? `https://${cc}` : undefined,
    };
    console.log(`  abstract ${p.indexUrl} → ${en ? en.value.length + " chars" : "ไม่พบ"}`);
  }
  abstracts = next;
  writeFileSync(ABSTRACTS_SNAPSHOT, JSON.stringify(abstracts, null, 1) + "\n");
}

/* ---------- จัดระดับลิขสิทธิ์ ---------- */

type Tier = "1" | "1?" | "2" | "3";

type Row = {
  n: number;
  pub: PublicationEntry;
  summary?: PaperSummary;
  up?: UnpaywallRow;
  tier: Tier;
  licenseLabel: string;
  evidence: string;
  file?: string;
  fileMissing?: boolean;
  action: string;
  link: string;
};

const TIER_ORDER: Record<Tier, number> = { "1": 0, "1?": 1, "2": 2, "3": 3 };

const TIER_LABEL: Record<Tier, string> = {
  "1": "1 · CC ตรวจแล้ว — อัปโหลดสาธารณะได้",
  "1?": "1? · Unpaywall ว่า CC — ตรวจหน้าวารสารก่อน",
  "2": "2 · สงวนลิขสิทธิ์ — ระเบียนเท่านั้น (accepted manuscript ตามนโยบาย)",
  "3": "3 · อ่านฟรีแต่ไม่ใช่ CC — ระเบียน + ลิงก์",
};

const doiLink = (doi: string) => `https://doi.org/${doi}`;
const summaryUrl = (s: PaperSummary, lang: "th" | "en" | "zh") =>
  `${SITE}${lang === "th" ? "" : `/${lang}`}/research/${s.slug}`;

function classify(pub: PublicationEntry, n: number): Row {
  const summary = summaryForPublication(pub);
  const up = pub.doi ? unpaywall[pub.doi] : undefined;
  const link = pub.doi ? doiLink(pub.doi) : (pub.indexUrl ?? "");
  const policy = `${OPEN_POLICY_FINDER}${encodeURIComponent(pub.citation?.containerTitle || pub.venue)}`;

  if (summary?.license) {
    const label = CC_LICENSES[summary.license].label;
    const evidence = `ตรวจแล้วในคลังเว็บ (paperSummaries.ts)${up?.license ? ` · Unpaywall: ${up.license}` : ""}`;
    if (summary.localCopy) {
      const file = summary.localCopy;
      return {
        n,
        pub,
        summary,
        up,
        tier: "1",
        licenseLabel: label,
        evidence,
        file,
        fileMissing: !existsSync(new URL(file, PAPERS)),
        link,
        action:
          `เพิ่มระเบียนด้วย DOI/ชื่อเรื่องถ้ายังไม่มี → อัปโหลด \`${file}\` เป็น **public full-text** ` +
          `ระบุสัญญาอนุญาต ${label}`,
      };
    }
    // สัญญาอนุญาตยืนยันแล้วแต่ยังไม่มีไฟล์ในคลัง (สำนักพิมพ์กันบอตตอนดึง — PR #42)
    // อัปโหลดได้ แต่ต้องดาวน์โหลดจากต้นทางด้วยเบราว์เซอร์ก่อน
    const source = summary.pdfUrl ?? up?.url_for_pdf ?? up?.url ?? link;
    return {
      n,
      pub,
      summary,
      up,
      tier: "1",
      licenseLabel: label,
      evidence: `${evidence} · ยังไม่มีไฟล์ในคลัง (ดึงอัตโนมัติไม่ได้)`,
      link,
      action:
        `เพิ่มระเบียนด้วย DOI ถ้ายังไม่มี → ดาวน์โหลดฉบับสำนักพิมพ์ด้วยเบราว์เซอร์จาก ${source} ` +
        `แล้วอัปโหลดเป็น **public full-text** ระบุสัญญาอนุญาต ${label}`,
    };
  }

  const decided = decisions[pub.doi ?? pub.indexUrl ?? ""];
  if (decided) {
    const evidence = `ตรวจหน้าวารสารด้วยเบราว์เซอร์ ${decided.checked}: ${decided.note}`;
    if (decided.tier === "1") {
      const source = up?.url_for_pdf ?? up?.url ?? link;
      return {
        n,
        pub,
        summary,
        up,
        tier: "1",
        licenseLabel: decided.license ?? "CC (ยืนยันจากหน้าวารสาร)",
        evidence,
        link,
        action:
          `เพิ่มระเบียนด้วย DOI ถ้ายังไม่มี → ดาวน์โหลดฉบับสำนักพิมพ์ด้วยเบราว์เซอร์จาก ${source} ` +
          `แล้วอัปโหลดเป็น **public full-text** ระบุสัญญาอนุญาต ${decided.license ?? "ตามที่ตรวจพบ"}`,
      };
    }
    return {
      n,
      pub,
      summary,
      up,
      tier: "3",
      licenseLabel: "อ่านฟรี ไม่ใช่ CC",
      evidence,
      link,
      action:
        `เพิ่มระเบียนด้วย${pub.doi ? " DOI" : "ชื่อเรื่อง แล้วใส่ลิงก์หน้าวารสาร"} · ` +
        `**ไม่อัปโหลดไฟล์** (เปิดหน้าวารสารแล้วไม่พบสัญญาอนุญาต CC ระดับบทความ)`,
    };
  }

  if (up?.license?.startsWith("cc-")) {
    return {
      n,
      pub,
      summary,
      up,
      tier: "1?",
      licenseLabel: `${up.license} (ยังไม่ยืนยัน)`,
      evidence: `Unpaywall ${up.checked ?? ""}: ${up.oa_status} · ${up.host_type ?? "-"} · ยังไม่ได้ตรวจกับหน้าวารสาร`,
      link,
      action:
        `เพิ่มระเบียนด้วย DOI · เปิดหน้าบทความที่ต้นทางแล้วหาลิงก์ creativecommons.org ` +
        `ถ้ามีจริง ดาวน์โหลดจาก ${up.url_for_pdf ?? up.url ?? link} แล้วอัปโหลดเป็น public full-text · ` +
        `ถ้าไม่มี ให้ถือเป็นระดับ 3`,
    };
  }

  const closed = !up || up.status === "not-found" || up.oa_status === "closed";
  if (closed && !(pub.indexUrl && !pub.doi)) {
    return {
      n,
      pub,
      summary,
      up,
      tier: "2",
      licenseLabel: "สงวนลิขสิทธิ์",
      evidence: up
        ? up.status === "ok"
          ? `Unpaywall ${up.checked ?? ""}: ${up.oa_status}`
          : `Unpaywall ${up.checked ?? ""}: ไม่รู้จัก DOI นี้`
        : "ไม่มี DOI ให้ตรวจ",
      link,
      action:
        `เพิ่มระเบียนด้วย DOI **เท่านั้น** ห้ามอัปโหลด PDF ของสำนักพิมพ์ · ` +
        `ถ้ามีไฟล์ accepted manuscript ให้ตรวจนโยบายที่ [Open Policy Finder](${policy}) ก่อน ` +
        `อัปโหลดได้ตามที่นโยบายอนุญาต (เลือก private ถ้าไม่แน่ใจ)`,
    };
  }

  return {
    n,
    pub,
    summary,
    up,
    tier: "3",
    licenseLabel: "อ่านฟรี ไม่ใช่ CC",
    evidence: up
      ? `Unpaywall ${up.checked ?? ""}: ${up.oa_status} · license ${up.license ?? "ไม่มี"}`
      : "วารสารบน ThaiJO เปิดให้อ่านแต่สงวนลิขสิทธิ์ (research-sources/README.md)",
    link,
    action:
      `เพิ่มระเบียนด้วย${pub.doi ? " DOI" : "ชื่อเรื่อง แล้วใส่ลิงก์หน้าวารสาร"} · ` +
      `**ไม่อัปโหลดไฟล์** (วารสารเปิดให้อ่านที่ต้นทางแต่ไม่ได้ให้สิทธิ์เผยแพร่ซ้ำ)`,
  };
}

const rows = mine
  .map((p, i) => classify(p, i + 1))
  .sort(
    (a, b) =>
      TIER_ORDER[a.tier] - TIER_ORDER[b.tier] ||
      b.pub.year - a.pub.year ||
      (b.pub.citations ?? 0) - (a.pub.citations ?? 0) ||
      a.pub.title.localeCompare(b.pub.title),
  )
  .map((r, i) => ({ ...r, n: i + 1 }));

const missingFiles = rows.filter((r) => r.fileMissing);
if (missingFiles.length) {
  console.error(
    `researchgate:kit — localCopy หาย ${missingFiles.length} ไฟล์:\n` +
      missingFiles.map((r) => `  ${r.file}`).join("\n"),
  );
  process.exit(1);
}

/* ---------- เขียนไฟล์ ---------- */

mkdirSync(OUT, { recursive: true });
const write = (name: string, body: string) => {
  writeFileSync(new URL(name, OUT), body.trimEnd() + "\n");
  console.log(`  เขียน ${name}`);
};

const md = (s: string) => s.replace(/\|/g, "\\|");
const short = (t: string, n = 70) => (t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t);
const cite = (p: PublicationEntry) => (p.citation ? apa(p, p.citation) : `${p.title} (${p.year}). ${p.venue}.`);

const count = (t: Tier) => rows.filter((r) => r.tier === t).length;
const header = `<!-- สร้างโดย scripts/researchgate-kit.ts เมื่อ ${TODAY} — อย่าแก้ด้วยมือ ให้แก้ข้อมูลต้นทางแล้วรัน npm run researchgate:kit -->`;

/* 00-profile.md */
const profileLinks = person.links.map((l) => `- ${l.label}: ${l.href}`).join("\n");
const orcid = person.links.find((l) => l.label === "ORCID")?.href.split("/").pop();
const scopusId = person.links.find((l) => l.label === "Scopus")?.href.match(/authorId=(\d+)/)?.[1];
const scholarId = person.links.find((l) => l.label === "Google Scholar")?.href.match(/user=([^&]+)/)?.[1];
const rgUrl = person.links.find((l) => l.label === "ResearchGate")?.href;

write(
  "00-profile.md",
  `${header}

# โปรไฟล์ ResearchGate — ${person.nameEn}

ข้อมูลทุกช่องมาจาก \`src/data/leadership.ts\` ซึ่งเป็นชุดเดียวกับหน้า ${SITE}/about
ถ้า RG แสดงค่าต่างจากนี้ ให้ยึดตามนี้ (เว้นแต่อาจารย์บอกเป็นอย่างอื่น)

## ชื่อ

| ช่อง | ค่า |
|---|---|
| ชื่อบนโปรไฟล์ | ${person.nameEn.replace(/^Assoc\. Prof\. Dr\. |^Asst\. Prof\. Dr\. |^Dr\. /, "")} |
| ชื่อไทย | ${person.name} |
| คำนำหน้า/ตำแหน่งวิชาการ | ${person.nameEn.match(/^(Assoc\. Prof\.|Asst\. Prof\.|Prof\.|Dr\.)/)?.[1] ?? ""} · Dr. |
| ชื่อที่ใช้ตีพิมพ์ (ตรวจกับรายการอ้างอิงใน 05-citations.bib) | ${[...new Set(mine.flatMap((p) => p.citation?.authors.filter((a) => a.family.toLowerCase() === person.nameEn.split(" ").pop()!.toLowerCase()).map((a) => `${a.given} ${a.family}`) ?? []))].join(" · ")} |
| โปรไฟล์ RG ปัจจุบัน | ${rgUrl ?? "-"} |

## สังกัด (กรอกตามลำดับที่ RG ถาม)

| ช่อง | ค่า |
|---|---|
| Institution | Chulalongkorn University |
| Department | Faculty of Communication Arts |
| Position | ${person.role} · Associate Professor, Department of Public Relations |
| Lab / Centre | Center of Excellence in Communication Innovation for Development of Quality of Life and Sustainability (ComInno Center) — ${SITE} |
| อีเมลสถาบัน | ${person.email ?? "-"} |

## ตัวระบุที่ต้องผูกกับโปรไฟล์

| ระบบ | ค่า |
|---|---|
| ORCID | ${orcid ?? "-"} |
| Scopus Author ID | ${scopusId ?? "-"} |
| Google Scholar | ${scholarId ?? "-"} |
| เว็บไซต์ | ${SITE} |

ลิงก์เต็ม:
${profileLinks}

## ประวัติ

การศึกษา
${person.education.map((e) => `- ${e}`).join("\n")}

ตำแหน่งงาน
${person.work.map((w) => `- ${w}`).join("\n")}

## Disciplines / Skills and expertise (ข้อเสนอ — RG ให้เลือกจากรายการของเขา)

${person.focus
  .split(",")
  .map((f) => `- ${f.trim()}`)
  .join("\n")}
- Communication Studies
- Health Promotion
- Migrant Health

## แนะนำตัวสั้น (ข้อเสนอสำหรับช่อง Introduction — ปรับได้)

**English**
${person.nameEn} is Associate Professor of Public Relations at the Faculty of Communication Arts, Chulalongkorn University, and Head of the ComInno Center (Center of Excellence in Communication Innovation for Development of Quality of Life and Sustainability). Research focus: ${person.focus.toLowerCase()}. Plain-language summaries of the centre's publications are available at ${SITE}/en/research.

**ไทย**
${person.name} ${person.roleTh.split(" / ")[0].replace(/ศูนย์$/, "")}ศูนย์คอมอินโน (ศูนย์เชี่ยวชาญเฉพาะทางด้านนวัตกรรมการสื่อสารเพื่อการพัฒนาคุณภาพชีวิตและความยั่งยืน) และรองศาสตราจารย์ประจำภาควิชาการประชาสัมพันธ์ คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย สนใจงานวิจัยด้าน${person.focusTh} บทสรุปย่อยง่ายของผลงานอยู่ที่ ${SITE}/research

## ตัวเลขที่ใช้ตรวจสอบกับที่ RG แสดง (hard-code ในเว็บ ตรวจซ้ำปีละครั้ง)

${person.metricsNote}

## รูปโปรไฟล์

ไฟล์บนเว็บ: ${SITE}${person.image} (WebP) — สำเนา JPG ชื่อ \`00-profile-photo-${AUTHOR}.jpg\` อยู่ในโฟลเดอร์ Drive \`05 ResearchGate/03-public-pdf/\` (มาพร้อม zip)
`,
);

/* 01-checklist.md */
const tierSummary = (["1", "1?", "2", "3"] as Tier[])
  .map((t) => `| ${md(TIER_LABEL[t])} | ${count(t)} |`)
  .join("\n");

const tableRows = rows
  .map(
    (r) =>
      `| ${r.n} | ${r.tier} | ${r.pub.year} | ${md(short(r.pub.title))} | ${md(short(r.pub.citation?.containerTitle || r.pub.venue, 40))} | ${r.pub.doi ? `[${r.pub.doi}](${r.link})` : `[หน้าวารสาร](${r.link})`} | ${md(r.licenseLabel)} | ${r.file ? `\`${r.file}\`` : "—"} | ${r.summary ? `[EN](${summaryUrl(r.summary, "en")})` : "—"} | ☐ |`,
  )
  .join("\n");

const cards = rows
  .map((r) => {
    const s = r.summary;
    const lines = [
      `### ${r.n}. ${r.pub.title}`,
      "",
      `- **ระดับ:** ${TIER_LABEL[r.tier]}`,
      `- **อ้างอิง (APA 7):** ${cite(r.pub)}`,
      `- **ลิงก์:** ${r.link}${r.pub.doi ? "" : " (ไม่มี DOI — เพิ่มด้วยชื่อเรื่อง)"}`,
      `- **หลักฐานสัญญาอนุญาต:** ${r.evidence}`,
      r.file ? `- **ไฟล์ (ระดับ 1 เท่านั้น):** \`research-sources/papers/${r.file}\` · Drive: 05 ResearchGate/03-public-pdf/${r.file}` : undefined,
      s
        ? `- **หน้าบทสรุปบนเว็บ:** [ไทย](${summaryUrl(s, "th")}) · [English](${summaryUrl(s, "en")})${s.zh ? ` · [中文](${summaryUrl(s, "zh")})` : ""}`
        : `- **หน้าบทสรุปบนเว็บ:** ยังไม่มี`,
      r.pub.citations ? `- **การอ้างอิง (Crossref):** ${r.pub.citations}` : undefined,
      `- **ทำอะไร:** ${r.action}`,
      `- **ผล:** _(ให้เอเจนต์เติม: มีอยู่แล้ว / เพิ่มระเบียนแล้ว / อัปโหลดแล้ว / ข้าม เพราะ…)_`,
    ].filter(Boolean);
    return lines.join("\n");
  })
  .join("\n\n");

write(
  "01-checklist.md",
  `${header}

# รายการผลงานสำหรับโปรไฟล์ ResearchGate — ${person.nameEn}

ผลงาน ${rows.length} ชิ้นจากทะเบียนที่ตรวจสอบแล้วของเว็บ (\`src/data/publications.ts\`) เรียงตามลำดับที่ควรทำก่อน:
ระดับลิขสิทธิ์ที่อัปโหลดได้ → ปีใหม่กว่า → ยอดอ้างอิง

**เลข # เป็นลำดับของรอบสร้างนี้เท่านั้น** (สร้าง ${TODAY}) พอรายการใดถูกจัดระดับใหม่หรือมีผลงานเพิ่ม เลขจะเลื่อน
ใน 06-log จึงต้องเขียนชื่อย่อผลงานกำกับเลขเสมอ ไม่อ้างเลขลอยๆ

| ระดับ | จำนวน |
|---|---|
${tierSummary}

## กติกาสำหรับคนหรือเอเจนต์ที่ทำตามรายการนี้

1. **อ่านโปรไฟล์ปัจจุบันก่อน** ไล่ดูรายการ Research ทั้งหมดที่มีอยู่แล้ว สำนักพิมพ์ใหญ่หลายราย
   (Springer Nature · Wiley · Taylor & Francis · Elsevier · SAGE) ส่งบทความขึ้นโปรไฟล์ให้อัตโนมัติ
   รายการที่มีแล้วให้ติ๊ก "มีอยู่แล้ว" ไม่เพิ่มซ้ำ
2. **เพิ่มด้วย DOI ก่อนเสมอ** ค้นชื่อเรื่องเฉพาะรายการที่ไม่มี DOI (ระบุไว้ในการ์ด) การเพิ่มด้วยชื่อเรื่อง
   ทั้งที่มี DOI ทำให้เกิดรายการซ้ำ
3. **อัปโหลดไฟล์เฉพาะระดับ 1** และเฉพาะไฟล์ที่ระบุชื่อในการ์ด ระดับ 1? ต้องตรวจหน้าวารสารก่อน
   ระดับ 2 และ 3 **ห้ามอัปโหลด PDF ของสำนักพิมพ์ในทุกกรณี**
4. RG ถาม "Is this your publication?" ให้ตอบตามรายการนี้เท่านั้น รายการที่ไม่อยู่ในนี้ให้ข้าม
   แล้วจดชื่อไว้ใน 06-log.md เพื่อให้อาจารย์ตัดสิน
5. ทำทีละรายการ ช้าๆ ไม่เปิดหลายแท็บพร้อมกัน เจอหน้าต่างหรือคำถามที่ไม่คาดคิด (ยืนยันตัวตน ·
   ขอสิทธิ์ · ข้อความเรื่องลิขสิทธิ์) ให้หยุดแล้วถาม ไม่เดา
6. **เขียน 06-log.md ทุกรายการ** ก่อนไปรายการถัดไป งานนี้ยาวกว่าหนึ่งเซสชัน log คือสิ่งเดียวที่
   ทำให้เซสชันถัดไปทำต่อได้โดยไม่ซ้ำ
7. เสร็จแต่ละระดับให้เทียบจำนวนบนโปรไฟล์กับตารางนี้ แล้วรายงานส่วนต่าง

## ตารางรวม

| # | ระดับ | ปี | ชื่อเรื่อง | วารสาร | DOI / ลิงก์ | สัญญาอนุญาต | ไฟล์ | บทสรุป | เสร็จ |
|---|---|---|---|---|---|---|---|---|---|
${tableRows}

## การ์ดรายชิ้น

${cards}
`,
);

/* 02-abstracts.md */
const abstractCards = rows
  .map((r) => {
    const s = r.summary;
    const ab = !r.pub.doi && r.pub.indexUrl ? abstracts[r.pub.indexUrl] : undefined;
    const lines = [
      `### ${r.n}. ${r.pub.title}`,
      "",
      `- ${r.pub.doi ? `DOI: ${r.pub.doi}` : `ลิงก์: ${r.pub.indexUrl}`} · ${r.pub.citation?.containerTitle || r.pub.venue} (${r.pub.year})`,
    ];
    if (ab?.abstract) {
      lines.push(
        "",
        `**Abstract (จากหน้าวารสาร ${ab.source} ดึงเมื่อ ${ab.fetched})** — ใช้กรอกช่อง Abstract เพราะ RG ไม่มี DOI ให้ดึงเอง`,
        "",
        `> ${ab.abstract.replace(/\s+/g, " ").trim()}`,
      );
    } else if (!r.pub.doi) {
      lines.push("", "_ยังไม่ได้ดึงบทคัดย่อ — รัน `--refresh-abstracts`_");
    } else {
      lines.push("", "_มี DOI — RG เติมบทคัดย่อจากทะเบียนเอง ไม่ต้องกรอก_");
    }
    if (s) {
      lines.push(
        "",
        `**พาดหัวภาษาชาวบ้าน (งานเขียนของศูนย์ฯ ใช้ได้อิสระ):** ${s.en.headline}`,
        "",
        `Plain-language summary: ${summaryUrl(s, "en")}`,
      );
    }
    return lines.join("\n");
  })
  .join("\n\n");

write(
  "02-abstracts.md",
  `${header}

# บทคัดย่อและพาดหัวภาษาชาวบ้าน — ${person.nameEn}

- รายการที่มี DOI ไม่ต้องกรอกบทคัดย่อ ResearchGate ดึงจากทะเบียนเอง
- รายการที่ไม่มี DOI (วารสารไทยใน ThaiJO) ให้วางบทคัดย่อจากหน้าวารสารตามที่ให้ไว้ตรงๆ ไม่แต่งเพิ่ม
- พาดหัวและลิงก์บทสรุปเป็นงานเขียนของศูนย์ฯ เอง ใช้ในช่อง Introduction ของโปรไฟล์ หรือใช้ตอบ
  คำขอ full-text ของรายการระดับ 2/3 ได้ ("ไฟล์เผยแพร่ซ้ำไม่ได้ แต่อ่านบทสรุปได้ที่…")
- **ห้ามแก้บทคัดย่อของสำนักพิมพ์ให้มีลิงก์ของเรา** บทคัดย่อเป็นส่วนหนึ่งของบทความ
- บทคัดย่อคัดมาจาก meta tag ของหน้าวารสารตามตัวอักษร ถ้าข้อความขาดตอน (วารสารบางเล่มใส่ meta ไม่ครบ)
  ให้เปิดหน้าวารสารตามลิงก์แล้วคัดจากหน้าบทความแทน ไม่เติมคำเอง

${abstractCards}
`,
);

/* 05-citations.bib / .ris */
const citable = rows.filter((r) => r.pub.citation);
write(
  "05-citations.bib",
  `% สร้างโดย scripts/researchgate-kit.ts เมื่อ ${TODAY} จาก src/lib/citation.ts (ตัวเดียวกับปุ่มอ้างอิงบนเว็บ)
% ${person.nameEn} — ${citable.length} รายการ

${citable.map((r) => bibtex(r.pub, r.pub.citation!)).join("\n\n")}
`,
);
write("05-citations.ris", citable.map((r) => ris(r.pub, r.pub.citation!)).join("\n\n") + "\n");

/* 06-log.md */
write(
  "06-log.md",
  `# บันทึกการอัปเดตโปรไฟล์ ResearchGate — ${person.nameEn}

เขียนทุกรายการที่ทำ **ก่อน** ไปรายการถัดไป (กติกาข้อ 6 ใน 01-checklist.md)
เลข # ตรงกับ 01-checklist.md **ฉบับที่สร้างวันเดียวกัน** และต้องมีชื่อย่อผลงานกำกับเสมอ (เลขเลื่อนได้เมื่อสร้างใหม่) · สถานะใช้คำเหล่านี้: มีอยู่แล้ว · เพิ่มระเบียนแล้ว · อัปโหลดสาธารณะแล้ว ·
อัปโหลด private แล้ว · ข้าม (บอกเหตุผล) · ติดปัญหา (บอกว่าอะไร)

| วันที่ | # | สถานะ | หมายเหตุ |
|---|---|---|---|
| | | | |

## รายการที่ RG เสนอว่า "เป็นของคุณหรือไม่" แต่ไม่อยู่ในรายการ (ให้อาจารย์ตัดสิน)

| วันที่ | ชื่อเรื่องที่ RG แสดง | ปี | ที่มา | ตัดสิน |
|---|---|---|---|---|
| | | | | |

## ส่วนต่างระหว่างโปรไฟล์กับตาราง (กรอกตอนจบแต่ละระดับ)

| ระดับ | ในตาราง | บนโปรไฟล์ | ต่างเพราะ |
|---|---|---|---|
| 1 | ${count("1")} | | |
| 1? | ${count("1?")} | | |
| 2 | ${count("2")} | | |
| 3 | ${count("3")} | | |
`,
);

/* README.md */
write(
  "README.md",
  `# researchgate — ชุดไฟล์สำหรับอัปเดตโปรไฟล์ ResearchGate

สร้างด้วย \`npm run researchgate:kit\` (ค่าเริ่มต้น \`--author ${AUTHOR}\`) — **อย่าแก้ไฟล์ที่สร้างด้วยมือ**
แก้ข้อมูลต้นทาง (\`src/data/leadership.ts\` · \`publications.ts\` · \`paperSummaries.ts\`) แล้วรันใหม่

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| \`00-profile.md\` | ข้อมูลโปรไฟล์ทุกช่อง + ตัวระบุ (ORCID · Scopus · Scholar) |
| \`01-checklist.md\` | ผลงานทุกชิ้นพร้อมระดับลิขสิทธิ์และสิ่งที่ต้องทำ — **ไฟล์หลักที่เอเจนต์อ่าน** |
| \`02-abstracts.md\` | บทคัดย่อของรายการที่ไม่มี DOI + พาดหัวและลิงก์บทสรุป |
| \`05-citations.bib\` / \`.ris\` | รายการอ้างอิงทุกชิ้น ใช้กับ ORCID · Google Scholar · โปรแกรมจัดการอ้างอิง |
| \`06-log.md\` | แม่แบบบันทึกความคืบหน้า (สำเนาที่เขียนจริงอยู่ใน Drive) |
| \`unpaywall-snapshot.json\` | คำตอบ Unpaywall ต่อ DOI ที่ใช้จัดระดับ — รีเฟรชด้วย \`--refresh-unpaywall\` |
| \`abstracts-snapshot.json\` | บทคัดย่อจาก meta tag ของวารสารสำหรับรายการที่ไม่มี DOI — \`--refresh-abstracts\` |
| \`decisions.json\` | คำตัดสินหลังเปิดหน้าวารสารด้วยเบราว์เซอร์สำหรับรายการระดับ 1? — **เขียนมือ** ต้องมีวันที่และหลักฐานทุกแถว รอบรันถัดไปใช้แทนคำตอบ Unpaywall |

**โฟลเดอร์นี้มีแต่ไฟล์ข้อความ** PDF ที่อัปโหลดได้อ้างไปที่ \`../papers/\` ซึ่งมีเฉพาะไฟล์ CC ตามกติกาใน
\`../README.md\` ไฟล์ accepted manuscript ของงานที่สงวนลิขสิทธิ์อยู่ใน Drive เท่านั้น ห้ามลงคลังนี้

**สำเนาทำงานอยู่ใน Google Drive** โฟลเดอร์ \`05 ResearchGate\` ใต้ \`ComInno — คลังบทความเต็ม\`
(มี \`03-public-pdf/\` และ \`04-private-manuscripts/\` เพิ่ม) Claude in Chrome / computer use อ่านจากที่นั่น
และเขียน log ที่นั่น ส่วนในคลังนี้คือแหล่งที่สร้างซ้ำได้

ในเซสชัน remote ตัวเลือก \`--refresh-*\` ต้องรันด้วย \`NODE_USE_ENV_PROXY=1\` (เหมือน fetch-publications.mjs)
`,
);

console.log(
  `\nresearchgate:kit — ${person.nameEn}: ${rows.length} รายการ · ระดับ 1: ${count("1")} · 1?: ${count("1?")} · 2: ${count("2")} · 3: ${count("3")}`,
);
