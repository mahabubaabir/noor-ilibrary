"use client"

import React, { useState, useEffect, use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BookOpen,
  Share2,
  Bookmark,
  Sparkles,
  Check,
  Globe,
  Type,
  Sun,
  Moon,
  Coffee,
  Highlighter,
  MessageSquare,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react"
import { COMPANIONS_COLLECTION, CompanionItem } from "@/lib/companions-data"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function CompanionDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const companion = COMPANIONS_COLLECTION.find((c) => c.slug === slug)

  if (!companion) {
    notFound()
  }

  // Reader Settings State
  const [lang, setLang] = useState<"bn" | "en">("bn")
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base")
  const [readerTheme, setReaderTheme] = useState<"default" | "sepia" | "night">("default")
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Highlight & Notes State (stored in localStorage)
  const [highlights, setHighlights] = useState<{ id: string; text: string; note?: string }[]>([])
  const [selectedText, setSelectedText] = useState("")
  const [noteInput, setNoteInput] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)

  useEffect(() => {
    try {
      const savedHighlights = localStorage.getItem(`noor_companion_highlights_${companion.id}`)
      if (savedHighlights) setHighlights(JSON.parse(savedHighlights))

      const savedBookmarks = localStorage.getItem("noor_companion_bookmarks")
      if (savedBookmarks) {
        const list = JSON.parse(savedBookmarks)
        setBookmarked(list.includes(companion.id))
      }
    } catch {}
  }, [companion.id])

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem("noor_companion_bookmarks")
      let list = saved ? JSON.parse(saved) : []
      if (list.includes(companion.id)) {
        list = list.filter((id: string) => id !== companion.id)
        setBookmarked(false)
      } else {
        list.push(companion.id)
        setBookmarked(true)
      }
      localStorage.setItem("noor_companion_bookmarks", JSON.stringify(list))
    } catch {}
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: companion.nameBn,
          text: `${companion.nameBn} (${companion.titleBn}) — নূর ইসলামিক লাইব্রেরি`,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  // Handle text selection for highlighting
  const handleMouseUp = () => {
    const sel = window.getSelection()?.toString().trim()
    if (sel && sel.length > 5) {
      setSelectedText(sel)
    }
  }

  const addHighlight = () => {
    if (!selectedText) return
    const newHighlight = {
      id: String(Date.now()),
      text: selectedText,
      note: noteInput.trim() || undefined,
    }
    const updated = [...highlights, newHighlight]
    setHighlights(updated)
    try {
      localStorage.setItem(`noor_companion_highlights_${companion.id}`, JSON.stringify(updated))
    } catch {}
    setSelectedText("")
    setNoteInput("")
    setIsAddingNote(false)
  }

  const deleteHighlight = (id: string) => {
    const updated = highlights.filter((h) => h.id !== id)
    setHighlights(updated)
    try {
      localStorage.setItem(`noor_companion_highlights_${companion.id}`, JSON.stringify(updated))
    } catch {}
  }

  const fontSizeClass = {
    sm: "text-xs sm:text-sm",
    base: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
    xl: "text-lg sm:text-xl",
  }[fontSize]

  const themeContainerClass = {
    default: "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800",
    sepia: "bg-[#fbf0d9] text-[#433422] border-[#ebd5b3] dark:bg-[#2b241c] dark:text-[#ede4d8] dark:border-[#4a3f33]",
    night: "bg-stone-950 text-stone-100 border-stone-800",
  }[readerTheme]

  const sections = lang === "bn" ? companion.sectionsBn : companion.sectionsEn
  const lifeLessons = lang === "bn" ? companion.lifeLessonsBn : companion.lifeLessonsEn
  const keyAttributes = lang === "bn" ? companion.keyAttributesBn : companion.keyAttributesEn

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <Link
          href="/companions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" /> সাহাবীদের তালিকায় ফিরুন
        </Link>

        {/* Reader Customization Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Toggle */}
          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
            <button
              onClick={() => setLang("bn")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                lang === "bn"
                  ? "bg-white text-emerald-700 shadow-sm dark:bg-stone-700 dark:text-emerald-300"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                lang === "en"
                  ? "bg-white text-emerald-700 shadow-sm dark:bg-stone-700 dark:text-emerald-300"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400"
              }`}
            >
              English
            </button>
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
            <button
              onClick={() => setFontSize("sm")}
              className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                fontSize === "sm" ? "bg-white shadow-sm dark:bg-stone-700" : "text-stone-500"
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("base")}
              className={`rounded-lg px-2 py-1 text-xs font-bold ${
                fontSize === "base" ? "bg-white shadow-sm dark:bg-stone-700" : "text-stone-500"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`rounded-lg px-2 py-1 text-xs font-bold ${
                fontSize === "lg" ? "bg-white shadow-sm dark:bg-stone-700" : "text-stone-500"
              }`}
            >
              A+
            </button>
          </div>

          {/* Theme Mode */}
          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
            <button
              onClick={() => setReaderTheme("default")}
              className={`rounded-lg p-1.5 text-xs ${
                readerTheme === "default" ? "bg-white shadow-sm dark:bg-stone-700" : "text-stone-500"
              }`}
              title="ডিফল্ট মোড"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme("sepia")}
              className={`rounded-lg p-1.5 text-xs ${
                readerTheme === "sepia" ? "bg-amber-100 text-amber-900 shadow-sm" : "text-stone-500"
              }`}
              title="সেপিয়া বই মোড"
            >
              <Coffee className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme("night")}
              className={`rounded-lg p-1.5 text-xs ${
                readerTheme === "night" ? "bg-stone-900 text-white shadow-sm" : "text-stone-500"
              }`}
              title="ডার্ক নাইট মোড"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bookmark & Share */}
          <button
            onClick={toggleBookmark}
            className={`rounded-xl p-2 transition-colors ${
              bookmarked
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60"
                : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Highlight / Note Creation Prompt */}
      {selectedText && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-2 rounded-2xl border border-emerald-500/30 bg-white p-4 shadow-2xl backdrop-blur-xl dark:bg-stone-900 sm:bottom-10 sm:right-10">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Highlighter className="h-3.5 w-3.5" /> নির্বাচিত টেক্সট হাইলাইট করুন
            </span>
            <button
              onClick={() => setSelectedText("")}
              className="text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          </div>

          <p className="line-clamp-2 text-xs italic text-stone-600 dark:text-stone-300">
            &ldquo;{selectedText}&rdquo;
          </p>

          {isAddingNote ? (
            <div className="space-y-2">
              <textarea
                placeholder="আপনার নিজস্ব নোট বা মন্তব্য লিখুন..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2 text-xs focus:border-emerald-500 focus:outline-none dark:border-stone-800 dark:bg-stone-800"
                rows={2}
              />
              <div className="flex justify-end gap-2">
                <Button size="sm" onClick={addHighlight} className="text-xs">
                  সংরক্ষণ করুন
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={addHighlight} className="text-xs">
                শুধুমাত্র হাইলাইট
              </Button>
              <Button size="sm" onClick={() => setIsAddingNote(true)} className="text-xs">
                নোট যোগ করুন
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main Companion Article Container */}
      <div
        onMouseUp={handleMouseUp}
        className={`rounded-3xl border p-6 shadow-sm backdrop-blur-md transition-colors sm:p-10 ${themeContainerClass}`}
      >
        {/* Article Header */}
        <div className="mb-8 border-b border-stone-200/50 pb-6 text-center dark:border-stone-800/50">
          <span className="inline-block rounded-xl bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            {lang === "bn" ? companion.categoryLabelBn : companion.categoryLabelEn} • {companion.era}
          </span>

          <p className="arabic mt-4 text-3xl font-bold text-stone-900 dark:text-stone-100 sm:text-4xl" dir="rtl">
            {companion.arabicName}
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">
            {lang === "bn" ? companion.nameBn : companion.nameEn}
          </h1>

          <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {lang === "bn" ? companion.titleBn : companion.titleEn}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            {lang === "bn" ? companion.shortBioBn : companion.shortBioEn}
          </p>
        </div>

        {/* Key Attributes Pills */}
        <div className="mb-8 rounded-2xl bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-600" />
            {lang === "bn" ? "প্রধান বৈশিষ্ট্য ও গুণাবলী" : "Key Attributes & Honors"}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
            {keyAttributes.map((attr, idx) => (
              <div key={idx} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{attr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story Body Sections */}
        <div className={`space-y-8 ${fontSizeClass}`}>
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                {section.heading}
              </h2>

              <p className="leading-relaxed whitespace-pre-line text-stone-800 dark:text-stone-200">
                {section.text}
              </p>

              {section.hadithOrQuoteRef && (
                <div className="rounded-2xl border-l-4 border-emerald-500 bg-stone-50/80 p-4 text-xs italic dark:bg-stone-800/60">
                  <span className="font-bold not-italic text-emerald-700 dark:text-emerald-400">
                    সনদ ও উদ্ধৃতি:
                  </span>{" "}
                  {section.hadithOrQuoteRef}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Practical Life Lessons Takeaway Box */}
        <div className="mt-10 rounded-3xl border border-amber-500/30 bg-amber-50/60 p-6 dark:border-amber-500/30 dark:bg-amber-950/20 sm:p-8">
          <h3 className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-600" />
            {lang === "bn" ? "আমাদের দৈনন্দিন জীবনের শিক্ষা" : "Practical Lessons for Daily Life"}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200 list-disc pl-5 leading-relaxed">
            {lifeLessons.map((lesson, idx) => (
              <li key={idx}>{lesson}</li>
            ))}
          </ul>
        </div>

        {/* Highlighted Notes Review Section */}
        {highlights.length > 0 && (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-800/40">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-4">
              <Highlighter className="h-4 w-4 text-emerald-600" />
              আপনার সংরক্ষিত হাইলাইট ও নোটসমূহ ({highlights.length})
            </h3>
            <div className="space-y-3">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-white p-3.5 shadow-sm dark:bg-stone-900"
                >
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                      &ldquo;{h.text}&rdquo;
                    </p>
                    {h.note && (
                      <p className="text-stone-600 dark:text-stone-400">
                        <span className="font-bold">নোট:</span> {h.note}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteHighlight(h.id)}
                    className="p-1 text-stone-400 hover:text-red-500"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Companions Footer Grid */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
          অন্যান্য সাহাবীদের জীবনী পড়ুন
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COMPANIONS_COLLECTION.filter((c) => c.id !== companion.id)
            .slice(0, 3)
            .map((c) => (
              <Link
                key={c.id}
                href={`/companions/${c.slug}`}
                className="group rounded-2xl border border-stone-200/80 bg-white p-4 transition-all hover:border-emerald-400 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {c.categoryLabelBn}
                </span>
                <h4 className="mt-1 text-sm font-bold text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                  {c.nameBn}
                </h4>
                <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
                  {c.shortBioBn}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
