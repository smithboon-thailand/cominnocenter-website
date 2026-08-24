"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildSearchIndex, KIND_LABEL, type SearchDoc } from "@/lib/searchIndex";

type SiteSearchProps = {
  locale?: "th" | "en";
};

const COPY = {
  th: {
    open: "ค้นหาทั้งเว็บ",
    placeholder: "ค้นหาโครงการ ข่าว บริการ ผลงานวิชาการ…",
    empty: "ไม่พบผลลัพธ์",
    hint: "พิมพ์เพื่อค้นหา · ↑↓ เลื่อน · Enter เปิด · Esc ปิด",
    results: (n: number) => `${n} ผลลัพธ์`,
    close: "ปิดการค้นหา",
  },
  en: {
    open: "Search the site",
    placeholder: "Search projects, news, services, publications…",
    empty: "No results",
    hint: "Type to search · ↑↓ to move · Enter to open · Esc to close",
    results: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    close: "Close search",
  },
} as const;

const norm = (s: string) => s.toLowerCase().trim();

/** ให้คะแนน: ขึ้นต้นตรง > อยู่ในชื่อ > อยู่ใน meta/keywords — ทุกคำในคำค้นต้องเจอ */
function score(doc: SearchDoc, terms: string[]): number {
  const title = norm(doc.title);
  const haystack = `${title} ${norm(doc.meta)} ${norm(doc.keywords)}`;
  let total = 0;
  for (const term of terms) {
    if (!haystack.includes(term)) return 0;
    if (title.startsWith(term)) total += 6;
    else if (title.includes(term)) total += 4;
    else total += 1;
  }
  return total;
}

/**
 * ค้นหาทั้งเว็บ — เปิดด้วย ⌘K / Ctrl+K หรือกดปุ่มแว่นขยายบน Header
 * ดัชนีสร้างจากไฟล์ข้อมูลตอน build (ไม่มี backend) · ไม่ใช้ library ภายนอก
 * รองรับคีย์บอร์ดเต็มรูปแบบและคืนโฟกัสให้ปุ่มเดิมเมื่อปิด
 */
export default function SiteSearch({ locale = "th" }: SiteSearchProps) {
  const t = COPY[locale];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const index = useMemo(() => buildSearchIndex(locale), [locale]);

  const results = useMemo(() => {
    const terms = norm(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .map((doc) => ({ doc, s: score(doc, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.doc);
  }, [index, query]);

  // ⌘K / Ctrl+K เปิดได้จากทุกที่ในหน้า
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // รอให้ dialog อยู่ใน DOM ก่อนโฟกัส
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (doc: SearchDoc) => {
    setOpen(false);
    if (doc.external) window.open(doc.href, "_blank", "noopener,noreferrer");
    else router.push(doc.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600
          transition-colors duration-150 ease-brand hover:text-pink-500
          focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
      >
        <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-900/40 p-4 pt-[10vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.open}
            className="w-full max-w-2xl overflow-hidden rounded-lg border border-ink-300 bg-white shadow-lg"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-ink-100 px-4">
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-ink-500">
                <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.open}
                aria-controls="site-search-results"
                className="h-14 w-full bg-transparent text-[17px] leading-[1.6] text-ink-900
                  outline-none placeholder:text-ink-300"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="shrink-0 rounded px-2 py-1 text-[13px] text-ink-500
                  transition-colors duration-150 ease-brand hover:text-ink-900
                  focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--pink-100)]"
              >
                Esc
              </button>
            </div>

            {query && (
              <ul
                id="site-search-results"
                ref={listRef}
                className="max-h-[52vh] overflow-y-auto"
              >
                {results.length === 0 && (
                  <li className="px-4 py-6 text-[15px] leading-[1.6] text-ink-500">{t.empty}</li>
                )}
                {results.map((doc, i) => (
                  <li key={`${doc.kind}-${doc.href}-${doc.title}`}>
                    <button
                      type="button"
                      onClick={() => go(doc)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left
                        transition-colors duration-150 ease-brand ${
                          i === active ? "bg-ink-100" : "bg-white"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[13px] leading-[1.4] text-ink-700">
                          {KIND_LABEL[locale][doc.kind]}
                        </span>
                        <span className="text-[15px] font-medium leading-[1.6] text-ink-900">
                          {doc.title}
                        </span>
                      </span>
                      {doc.meta && (
                        <span className="line-clamp-1 text-[13px] leading-[1.5] text-ink-500">
                          {doc.meta}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="border-t border-ink-100 px-4 py-2.5 text-[13px] leading-[1.4] text-ink-500">
              {query ? t.results(results.length) : t.hint}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
