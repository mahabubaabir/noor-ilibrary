"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Languages,
  ArrowLeft,
  Library,
} from "lucide-react"
import type { HistoryBook } from "@/lib/history-books"

type Lang = "bn" | "en"

export function BookReader({ book }: { book: HistoryBook }) {
  const [lang, setLang] = useState<Lang>("bn")
  const [page, setPage] = useState(0)
  const [tocOpen, setTocOpen] = useState(false)
  const [jumpValue, setJumpValue] = useState("")

  const totalPages = book.chapters.length + 1 // last page = bibliography
  const isBibliography = page === book.chapters.length
  const chapter = isBibliography ? null : book.chapters[page]

  // Resume from device-local progress
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = Number(localStorage.getItem(`book_progress_${book.slug}`))
        if (Number.isInteger(saved) && saved > 0 && saved < book.chapters.length + 1) {
          setPage(saved)
        }
      } catch {}
    })
  }, [book.slug, book.chapters.length])

  const goToPage = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(totalPages - 1, next))
      setPage(clamped)
      try {
        localStorage.setItem(`book_progress_${book.slug}`, String(clamped))
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [book.slug, totalPages],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") goToPage(page + 1)
      if (e.key === "ArrowLeft" || e.key === "PageUp") goToPage(page - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goToPage, page])

  const allReferences = useMemo(
    () =>
      book.chapters.flatMap((c) =>
        c.references.map((r) => ({ ...r, chapter: lang === "bn" ? c.titleBn : c.titleEn })),
      ),
    [book.chapters, lang],
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
        <Link
          href="/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> সব বই
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTocOpen((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
              tocOpen
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            }`}
          >
            <List className="h-3.5 w-3.5" /> সূচিপত্র
          </button>

          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
          >
            <Languages className="h-3.5 w-3.5" /> {lang === "bn" ? "English" : "বাংলা"}
          </button>
        </div>
      </div>

      {/* Table of contents */}
      {tocOpen && (
        <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <ol className="space-y-1">
            {book.chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => {
                    goToPage(i)
                    setTocOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    page === i
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="font-mono text-xs opacity-70">{i + 1}.</span>
                  <span className="font-semibold">{lang === "bn" ? c.titleBn : c.titleEn}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  goToPage(book.chapters.length)
                  setTocOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  isBibliography
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <Library className="h-3.5 w-3.5" />
                <span className="font-semibold">{lang === "bn" ? "গ্রন্থপঞ্জি ও সূত্র" : "Bibliography & Sources"}</span>
              </button>
            </li>
          </ol>
        </div>
      )}

      {/* Page header */}
      <header className="mb-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          {lang === "bn" ? book.authorBn : book.authorEn} · {lang === "bn" ? book.eraBn : book.eraEn}
        </p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
          {lang === "bn" ? book.titleBn : book.titleEn}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {lang === "bn" ? book.descriptionBn : book.descriptionEn}
        </p>
      </header>

      {/* Page content */}
      <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        {isBibliography ? (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white">
              <Library className="h-4 w-4" />
              {lang === "bn" ? "গ্রন্থপঞ্জি ও সূত্র" : "Bibliography & Sources"}
            </h2>
            <ul className="space-y-2">
              {allReferences.map((ref, i) => (
                <li key={`${ref.label}-${i}`} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs text-neutral-400">{i + 1}.</span>
                  {ref.href ? (
                    <Link
                      href={ref.href}
                      className="font-semibold text-neutral-900 underline-offset-2 hover:underline dark:text-white"
                    >
                      {ref.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-neutral-900 dark:text-white">{ref.label}</span>
                  )}
                  <span className="text-xs text-neutral-400">— {ref.chapter}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : chapter ? (
          <div>
            <h2 className="mb-1 text-lg font-bold text-neutral-900 dark:text-white">
              {lang === "bn" ? chapter.titleBn : chapter.titleEn}
            </h2>
            <p className="mb-5 text-xs font-mono uppercase tracking-wider text-neutral-400">
              {lang === "bn" ? `পৃষ্ঠা ${page + 1} / ${totalPages}` : `Page ${page + 1} / ${totalPages}`}
            </p>

            <div className="space-y-4">
              {(lang === "bn" ? chapter.contentBn : chapter.contentEn).map((paragraph, i) => (
                <p
                  key={i}
                  className={`${lang === "bn" ? "bengali" : ""} text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                {lang === "bn" ? "সূত্র" : "References"}
              </p>
              <div className="flex flex-wrap gap-2">
                {chapter.references.map((ref) =>
                  ref.href ? (
                    <Link
                      key={ref.label}
                      href={ref.href}
                      className="rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      {ref.label}
                    </Link>
                  ) : (
                    <span
                      key={ref.label}
                      className="rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                    >
                      {ref.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        ) : null}
      </article>

      {/* Pager */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
          className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-900 disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> {lang === "bn" ? "আগের পৃষ্ঠা" : "Previous"}
        </button>

        <div className="flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const n = parseInt(jumpValue, 10)
              if (Number.isInteger(n) && n >= 1 && n <= totalPages) {
                goToPage(n - 1)
                setJumpValue("")
              }
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              placeholder={String(page + 1)}
              className="w-14 rounded-xl border border-neutral-200 bg-white px-2 py-1.5 text-center text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
            />
            <button
              type="submit"
              className="rounded-xl border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            >
              যান
            </button>
          </form>
          <span className="text-xs font-mono text-neutral-400">
            {page + 1}/{totalPages}
          </span>
        </div>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages - 1}
          className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          {lang === "bn" ? "পরের পৃষ্ঠা" : "Next"} <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] text-neutral-400">
        <BookOpen className="mr-1 inline h-3 w-3" />
        {lang === "bn"
          ? "টিপস: কীবোর্ডের ← → কী দিয়ে পৃষ্ঠা বদলান। আপনার অগ্রগতি ডিভাইসে সংরক্ষিত হয়।"
          : "Tip: use ← → keys to turn pages. Your progress is saved on this device."}
      </p>
    </div>
  )
}
