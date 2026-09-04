"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  MessageSquare,
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Type,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Languages,
  X,
  Share2,
  CloudCheck,
  RefreshCw,
  Search,
  Plus,
} from "lucide-react"
import { StoryItem, StorySection } from "@/lib/stories-data"
import { Button } from "@/components/ui/button"

interface HighlightItem {
  id: string
  text: string
  color: "yellow" | "green" | "blue" | "purple" | "pink"
  note?: string
  sectionIndex: number
  createdAt: string
}

interface NoteItem {
  id: string
  sectionIndex: number
  sectionHeading: string
  title?: string
  content: string
  color?: string
  createdAt: string
}

interface ReaderProps {
  story: StoryItem
}

type ReaderTheme = "light" | "sepia" | "dark" | "emerald"
type FontSize = "sm" | "base" | "lg" | "xl"
type LineSpacing = "normal" | "relaxed" | "loose"
type ViewMode = "paginated" | "scroll"

export function PdfEbookReader({ story }: ReaderProps) {
  // Language
  const [lang, setLang] = useState<"bn" | "en">("bn")

  // Reader Settings
  const [theme, setTheme] = useState<ReaderTheme>("light")
  const [fontSize, setFontSize] = useState<FontSize>("base")
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("relaxed")
  const [viewMode, setViewMode] = useState<ViewMode>("paginated")
  const [currentPage, setCurrentPage] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false)

  // Highlights & Notes State
  const [highlights, setHighlights] = useState<HighlightItem[]>([])
  const [notes, setNotes] = useState<NoteItem[]>([])
  const [syncStatus, setSyncStatus] = useState<"synced" | "saving" | "offline">("synced")

  // Selection & Popover
  const [selectedText, setSelectedText] = useState("")
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null)
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)

  // New Note Modal
  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [currentNoteText, setCurrentNoteText] = useState("")
  const [noteTargetSection, setNoteTargetSection] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchNotes, setSearchNotes] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)

  const activeSections = lang === "bn" ? story.sectionsBn : story.sectionsEn
  const title = lang === "bn" ? story.titleBn : story.titleEn
  const subtitle = lang === "bn" ? story.subtitleBn : story.subtitleEn
  const takeaways = lang === "bn" ? story.keyTakeawaysBn : story.keyTakeawaysEn

  const totalPages = activeSections.length + 1 // Page 0 is Overview, Page 1..N are sections

  // Load Saved Highlights, Notes, Settings from LocalStorage & Sync
  useEffect(() => {
    const savedTheme = localStorage.getItem(`reader_theme`) as ReaderTheme
    if (savedTheme) setTheme(savedTheme)

    const savedView = localStorage.getItem(`reader_viewMode`) as ViewMode
    if (savedView) setViewMode(savedView)

    const savedFontSize = localStorage.getItem(`reader_fontSize`) as FontSize
    if (savedFontSize) setFontSize(savedFontSize)

    // Load Local Highlights
    const localH = localStorage.getItem(`highlights_${story.id}`)
    if (localH) {
      try {
        setHighlights(JSON.parse(localH))
      } catch {}
    }

    // Load Local Notes
    const localN = localStorage.getItem(`notes_${story.id}`)
    if (localN) {
      try {
        setNotes(JSON.parse(localN))
      } catch {}
    }

    // Fetch from Backend API if logged in
    fetch(`/api/library/highlights?targetId=${story.id}&targetType=story`)
      .then((r) => r.json())
      .then((d) => {
        if (d.highlights && d.highlights.length > 0) {
          const apiHighlights = d.highlights.map((h: any) => ({
            id: h.id,
            text: h.text,
            color: h.color || "yellow",
            note: h.note,
            sectionIndex: 0,
            createdAt: h.createdAt,
          }))
          setHighlights((prev) => {
            const merged = [...prev]
            apiHighlights.forEach((ah: HighlightItem) => {
              if (!merged.some((m) => m.text === ah.text)) {
                merged.push(ah)
              }
            })
            return merged
          })
        }
      })
      .catch(() => {})

    fetch(`/api/library/notes?targetId=${story.id}&targetType=story`)
      .then((r) => r.json())
      .then((d) => {
        if (d.notes && d.notes.length > 0) {
          const apiNotes = d.notes.map((n: any) => ({
            id: n.id,
            sectionIndex: 0,
            sectionHeading: n.title || "Note",
            title: n.title,
            content: n.content,
            color: n.color || "emerald",
            createdAt: n.createdAt,
          }))
          setNotes((prev) => {
            const merged = [...prev]
            apiNotes.forEach((an: NoteItem) => {
              if (!merged.some((m) => m.id === an.id || m.content === an.content)) {
                merged.push(an)
              }
            })
            return merged
          })
        }
      })
      .catch(() => {})
  }, [story.id])

  // Save changes to localStorage & trigger auto-sync
  const persistState = useCallback(
    (newHighlights: HighlightItem[], newNotes: NoteItem[]) => {
      localStorage.setItem(`highlights_${story.id}`, JSON.stringify(newHighlights))
      localStorage.setItem(`notes_${story.id}`, JSON.stringify(newNotes))
      setSyncStatus("saving")

      // Sync with API
      fetch("/api/library/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          highlights: newHighlights.map((h) => ({
            targetId: story.id,
            targetType: "story",
            text: h.text,
            color: h.color,
            note: h.note,
          })),
          notes: newNotes.map((n) => ({
            targetId: story.id,
            targetType: "story",
            title: n.sectionHeading,
            content: n.content,
            color: n.color,
          })),
        }),
      })
        .then(() => setSyncStatus("synced"))
        .catch(() => setSyncStatus("offline"))
    },
    [story.id]
  )

  // Keyboard navigation for paginated mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (noteModalOpen || settingsOpen || notesDrawerOpen) return
      if (viewMode !== "paginated") return

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prev) => prev + 1)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (currentPage > 0) {
          setCurrentPage((prev) => prev - 1)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, totalPages, viewMode, noteModalOpen, settingsOpen, notesDrawerOpen])

  // Handle Text Selection for Floating Highlight Bar
  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      setPopoverPos(null)
      setSelectedText("")
      return
    }

    const text = selection.toString().trim()
    if (text.length > 2) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setSelectedText(text)
      setPopoverPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 12 + window.scrollY,
      })
    } else {
      setPopoverPos(null)
    }
  }

  // Add Highlight
  const addHighlight = (color: "yellow" | "green" | "blue" | "purple" | "pink") => {
    if (!selectedText) return
    const newH: HighlightItem = {
      id: "hl_" + Date.now(),
      text: selectedText,
      color,
      sectionIndex: currentPage === 0 ? 0 : currentPage - 1,
      createdAt: new Date().toISOString(),
    }
    const updated = [newH, ...highlights]
    setHighlights(updated)
    persistState(updated, notes)
    setPopoverPos(null)
    window.getSelection()?.removeAllRanges()
  }

  // Delete Highlight
  const removeHighlight = (id: string) => {
    const updated = highlights.filter((h) => h.id !== id)
    setHighlights(updated)
    persistState(updated, notes)

    fetch(`/api/library/highlights?id=${id}`, { method: "DELETE" }).catch(() => {})
  }

  // Open note creation
  const handleOpenAddNote = (sectionIndex: number) => {
    setNoteTargetSection(sectionIndex)
    setCurrentNoteText(selectedText ? `"${selectedText}" — ` : "")
    setNoteModalOpen(true)
    setPopoverPos(null)
  }

  // Save note
  const handleSaveNote = () => {
    if (!currentNoteText.trim()) return
    const targetSec = activeSections[noteTargetSection] || activeSections[0]
    const newNote: NoteItem = {
      id: "nt_" + Date.now(),
      sectionIndex: noteTargetSection,
      sectionHeading: targetSec?.heading || "সাধারণ নোট",
      content: currentNoteText.trim(),
      color: "emerald",
      createdAt: new Date().toISOString(),
    }
    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    persistState(highlights, updatedNotes)
    setCurrentNoteText("")
    setNoteModalOpen(false)
  }

  // Delete note
  const removeNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id)
    setNotes(updated)
    persistState(highlights, updated)

    fetch(`/api/library/notes?id=${id}`, { method: "DELETE" }).catch(() => {})
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // Style classes based on theme
  const getThemeClasses = () => {
    switch (theme) {
      case "sepia":
        return "bg-neutral-100 text-neutral-900 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800"
      case "dark":
        return "bg-neutral-950 text-neutral-100 border-neutral-800"
      case "emerald":
        return "bg-neutral-900 text-neutral-100 border-neutral-800"
      default:
        return "bg-white text-neutral-900 border-neutral-200"
    }
  }

  const getPageContainerClasses = () => {
    switch (theme) {
      case "sepia":
        return "bg-neutral-100/90 shadow-xl border-neutral-300 dark:bg-neutral-900/90 dark:border-neutral-800"
      case "dark":
        return "bg-neutral-950 shadow-2xl border-neutral-800"
      case "emerald":
        return "bg-neutral-900 shadow-2xl border-neutral-800"
      default:
        return "bg-white shadow-xl border-neutral-200"
    }
  }

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-sm leading-relaxed"
      case "lg":
        return "text-lg leading-loose"
      case "xl":
        return "text-xl leading-loose"
      default:
        return "text-base leading-relaxed"
    }
  }

  const filteredNotes = notes.filter(
    (n) =>
      n.content.toLowerCase().includes(searchNotes.toLowerCase()) ||
      n.sectionHeading.toLowerCase().includes(searchNotes.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-4xl px-2 sm:px-4 py-4" onMouseUp={handleMouseUp}>
      {/* Top Floating Reader Toolbar */}
      <div className="sticky top-18 z-40 mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-stone-200/80 bg-white/90 p-2.5 shadow-lg backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90">
        <div className="flex items-center gap-2">
          <Link
            href="/stories"
            className="flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <ChevronLeft className="h-4 w-4" /> সূচিপত্র
          </Link>

          <div className="h-4 w-px bg-stone-200 dark:bg-stone-800" />

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="flex items-center gap-1.5 rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-900 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            title="ভাষা পরিবর্তন করুন"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{lang === "bn" ? "English" : "বাংলা"}</span>
          </button>
        </div>

        {/* View Mode & Page Progress */}
        <div className="flex items-center gap-2">
          {viewMode === "paginated" && (
            <div className="flex items-center gap-1 text-xs font-bold text-neutral-600 dark:text-neutral-400">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className="h-8 w-8 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-1">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className="h-8 w-8 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Sync Status Badge */}
          <div
            className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-400"
            title="স্বয়ংক্রিয় ডেটা সিঙ্ক সক্রিয়"
          >
            <Sparkles className="h-3 w-3" />
            <span>{syncStatus === "synced" ? "স্বয়ংক্রিয় সিঙ্ক" : "সংরক্ষিত"}</span>
          </div>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Highlights & Notes Drawer Toggle */}
          <button
            onClick={() => setNotesDrawerOpen(!notesDrawerOpen)}
            className="relative flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
          >
            <Highlighter className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
            <span className="hidden sm:inline">নোটস ও হাইলাইট</span>
            {(highlights.length > 0 || notes.length > 0) && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white dark:bg-white dark:text-neutral-900">
                {highlights.length + notes.length}
              </span>
            )}
          </button>

          {/* Reader Customizer Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            title="রিডার সেটিংস"
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Reader Settings Dropdown Panel */}
      {settingsOpen && (
        <div className="mb-6 rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/95">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              রিডার কাস্টমাইজেশন ও পড়ার ধরন (Reader Preferences)
            </h3>
            <button
              onClick={() => setSettingsOpen(false)}
              className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Theme Selector */}
            <div>
              <label className="mb-1.5 block text-xs font-bold text-neutral-500">কালার থিম (Theme)</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTheme("light")
                    localStorage.setItem("reader_theme", "light")
                  }}
                  className={`flex-1 rounded-xl border p-2 text-xs font-semibold ${
                    theme === "light"
                      ? "border-neutral-900 bg-neutral-100 font-bold text-neutral-900 dark:border-white dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  ☀️ হালকা
                </button>
                <button
                  onClick={() => {
                    setTheme("sepia")
                    localStorage.setItem("reader_theme", "sepia")
                  }}
                  className={`flex-1 rounded-xl border p-2 text-xs font-semibold ${
                    theme === "sepia"
                      ? "border-neutral-900 bg-neutral-100 font-bold text-neutral-900 dark:border-white dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  📜 সেপিয়া
                </button>
                <button
                  onClick={() => {
                    setTheme("dark")
                    localStorage.setItem("reader_theme", "dark")
                  }}
                  className={`flex-1 rounded-xl border p-2 text-xs font-semibold ${
                    theme === "dark"
                      ? "border-neutral-900 bg-neutral-100 font-bold text-neutral-900 dark:border-white dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  🌙 ডার্ক
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="mb-1.5 block text-xs font-bold text-neutral-500">ফন্ট সাইজ (Font Size)</label>
              <div className="flex gap-2">
                {(["sm", "base", "lg", "xl"] as FontSize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setFontSize(sz)
                      localStorage.setItem("reader_fontSize", sz)
                    }}
                    className={`flex-1 rounded-xl border py-2 text-xs font-semibold uppercase ${
                      fontSize === sz
                        ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                    }`}
                  >
                    {sz === "sm" ? "ছোট" : sz === "base" ? "স্বাভাবিক" : sz === "lg" ? "বড়" : "অধিক বড়"}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode (Paginated E-book vs Continuous Scroll) */}
            <div>
              <label className="mb-1.5 block text-xs font-bold text-neutral-500">পড়ার ভিউ (Layout)</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setViewMode("paginated")
                    localStorage.setItem("reader_viewMode", "paginated")
                  }}
                  className={`flex-1 rounded-xl border p-2 text-xs font-semibold ${
                    viewMode === "paginated"
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  📖 ই-বুক পৃষ্ঠা মোড
                </button>
                <button
                  onClick={() => {
                    setViewMode("scroll")
                    localStorage.setItem("reader_viewMode", "scroll")
                  }}
                  className={`flex-1 rounded-xl border p-2 text-xs font-semibold ${
                    viewMode === "scroll"
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  }`}
                >
                  📜 স্ক্রোল মোড
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Highlight Toolbar on Text Selection */}
      {popoverPos && selectedText && (
        <div
          style={{
            position: "absolute",
            left: `${Math.max(10, Math.min(popoverPos.x - 140, window.innerWidth - 300))}px`,
            top: `${popoverPos.y - 50}px`,
          }}
          className="z-50 flex items-center gap-1.5 rounded-2xl border border-stone-800/30 bg-stone-900/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Color Palettes */}
          <button
            onClick={() => addHighlight("yellow")}
            title="হলুদ হাইলাইট"
            className="h-6 w-6 rounded-full bg-yellow-300 ring-1 ring-white/20 transition-transform hover:scale-115 active:scale-95"
          />
          <button
            onClick={() => addHighlight("green")}
            title="সবুজ হাইলাইট"
            className="h-6 w-6 rounded-full bg-emerald-300 ring-1 ring-white/20 transition-transform hover:scale-115 active:scale-95"
          />
          <button
            onClick={() => addHighlight("blue")}
            title="নীল হাইলাইট"
            className="h-6 w-6 rounded-full bg-sky-300 ring-1 ring-white/20 transition-transform hover:scale-115 active:scale-95"
          />
          <button
            onClick={() => addHighlight("purple")}
            title="বেগুনি হাইলাইট"
            className="h-6 w-6 rounded-full bg-purple-300 ring-1 ring-white/20 transition-transform hover:scale-115 active:scale-95"
          />
          <button
            onClick={() => addHighlight("pink")}
            title="গোলাপি হাইলাইট"
            className="h-6 w-6 rounded-full bg-pink-300 ring-1 ring-white/20 transition-transform hover:scale-115 active:scale-95"
          />

          <div className="h-4 w-px bg-stone-700 mx-1" />

          {/* Add Note Button */}
          <button
            onClick={() => handleOpenAddNote(currentPage > 0 ? currentPage - 1 : 0)}
            className="flex items-center gap-1 rounded-xl bg-neutral-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <MessageSquare className="h-3 w-3" />
            নোট লিখুন
          </button>
        </div>
      )}

      {/* Main E-Book / PDF Page Presentation */}
      <div
        ref={containerRef}
        className={`min-h-[70vh] rounded-3xl border p-6 sm:p-12 transition-all duration-300 ${getPageContainerClasses()}`}
      >
        {/* VIEW 1: PAGINATED MODE */}
        {viewMode === "paginated" ? (
          <div>
            {/* Page 0: Cover & Key Takeaways Overview */}
            {currentPage === 0 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-900 dark:bg-neutral-800 dark:text-white">
                    <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
                    {lang === "bn" ? story.categoryLabelBn : story.categoryLabelEn} • {story.readTime}
                  </span>

                  <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-neutral-900 dark:text-white">
                    {title}
                  </h1>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {subtitle}
                  </p>
                </div>

                {/* Key Takeaways Box */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-neutral-900 dark:text-white" />
                    {lang === "bn" ? "মূল শিক্ষা ও দৈনন্দিন আমল (Key Takeaways)" : "Key Lessons & Daily Practices"}
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => setCurrentPage(1)}
                    className="gap-2 rounded-2xl bg-neutral-900 px-6 py-3 font-bold text-white shadow-lg hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    পড়া শুরু করুন (Start Reading) <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Page 1..N: Individual Chapters / Sections */}
            {currentPage > 0 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {(() => {
                  const sec = activeSections[currentPage - 1]
                  if (!sec) return null
                  const secIdx = currentPage - 1
                  return (
                    <div>
                      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                          অধ্যায় {currentPage} / {activeSections.length}
                        </span>

                        <button
                          onClick={() => handleOpenAddNote(secIdx)}
                          className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" /> এই অধ্যায়ে নোট যোগ করুন
                        </button>
                      </div>

                      <h2 className="text-xl font-bold tracking-tight sm:text-2xl text-neutral-900 dark:text-white">
                        {sec.heading}
                      </h2>

                      <p className={`mt-4 whitespace-pre-line leading-relaxed select-text ${getFontSizeClass()}`}>
                        {sec.text}
                      </p>

                      {sec.hadithOrAyahRef && (
                        <div className="mt-6 rounded-2xl border-l-4 border-neutral-900 bg-neutral-100 p-4 text-xs sm:text-sm font-medium italic text-neutral-800 dark:border-white dark:bg-neutral-900 dark:text-neutral-200">
                          {sec.hadithOrAyahRef}
                        </div>
                      )}

                      {sec.reflection && (
                        <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs sm:text-sm dark:border-neutral-800 dark:bg-neutral-900">
                          <strong className="text-neutral-900 dark:text-white block mb-1">
                            💡 {lang === "bn" ? "অনুপ্রেরণামূলক উপলব্ধি" : "Practical Reflection"}:
                          </strong>
                          <span className="text-neutral-700 dark:text-neutral-300">{sec.reflection}</span>
                        </div>
                      )}
                    </div>
                  )
                })()}

                {/* Page Navigation Bottom Bar */}
                <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    className="gap-1 rounded-xl text-xs font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4" /> পূর্ববর্তী পৃষ্ঠা
                  </Button>

                  <span className="text-xs font-bold text-neutral-500">
                    পৃষ্ঠা {currentPage + 1} / {totalPages}
                  </span>

                  {currentPage < totalPages - 1 ? (
                    <Button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="gap-1 rounded-xl bg-neutral-900 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      পরবর্তী পৃষ্ঠা <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Link
                      href="/stories"
                      className="inline-flex items-center gap-1 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      সমাপ্ত • অন্যান্য গল্পসমূহ <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: CONTINUOUS SCROLL MODE */
          <div className="space-y-10">
            <div className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-900 dark:bg-neutral-800 dark:text-white">
                <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
                {lang === "bn" ? story.categoryLabelBn : story.categoryLabelEn} • {story.readTime}
              </span>

              <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-neutral-900 dark:text-white">
                {title}
              </h1>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            </div>

            {/* All Sections rendered continuously */}
            {activeSections.map((sec, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-transparent p-4 transition-all hover:border-neutral-200 dark:hover:border-neutral-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {idx + 1}. {sec.heading}
                  </h2>

                  <button
                    onClick={() => handleOpenAddNote(idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-white"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> নোট লিখুন
                  </button>
                </div>

                <p className={`mt-3 whitespace-pre-line leading-relaxed select-text ${getFontSizeClass()}`}>
                  {sec.text}
                </p>

                {sec.hadithOrAyahRef && (
                  <div className="mt-4 rounded-2xl border-l-4 border-neutral-900 bg-neutral-100 p-4 text-xs sm:text-sm font-medium italic text-neutral-800 dark:border-white dark:bg-neutral-900 dark:text-neutral-200">
                    {sec.hadithOrAyahRef}
                  </div>
                )}

                {sec.reflection && (
                  <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs sm:text-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <strong className="text-neutral-900 dark:text-white block mb-1">
                      💡 {lang === "bn" ? "অনুপ্রেরণামূলক উপলব্ধি" : "Practical Reflection"}:
                    </strong>
                    <span className="text-neutral-700 dark:text-neutral-300">{sec.reflection}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-out Drawer: Highlights & Notes Panel */}
      {notesDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Highlighter className="h-5 w-5 text-neutral-900 dark:text-white" />
              <h3 className="font-bold text-neutral-900 dark:text-white">
                আমার হাইলাইট ও নোটস ({highlights.length + notes.length})
              </h3>
            </div>

            <button
              onClick={() => setNotesDrawerOpen(false)}
              className="rounded-xl p-1 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search within notes */}
          <div className="border-b border-neutral-200 p-3 dark:border-neutral-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="নোট বা হাইলাইট খুঁজুন..."
                value={searchNotes}
                onChange={(e) => setSearchNotes(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-3 text-xs focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* List of Highlights & Notes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Highlights Section */}
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                হাইলাইটসমূহ ({highlights.length})
              </h4>
              {highlights.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">কোনো টেক্সট হাইলাইট করা হয়নি। টেক্সট সিলেক্ট করে রঙ নির্বাচন করুন।</p>
              ) : (
                <div className="space-y-2">
                  {highlights.map((hl) => (
                    <div
                      key={hl.id}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <p className="font-medium italic leading-relaxed text-neutral-900 dark:text-white">
                        &quot;{hl.text}&quot;
                      </p>
                      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 text-[10px] opacity-70">
                        <span className="text-neutral-500">{new Date(hl.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopy(hl.text, hl.id)}
                            className="p-1 hover:opacity-100 text-neutral-700 dark:text-neutral-300"
                            title="কপি করুন"
                          >
                            {copiedId === hl.id ? <Check className="h-3 w-3 text-neutral-900 dark:text-white" /> : <Copy className="h-3 w-3" />}
                          </button>
                          <button
                            onClick={() => removeHighlight(hl.id)}
                            className="p-1 hover:text-red-600 text-neutral-500"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Personal Notes Section */}
            <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                ব্যক্তিগত নোট ও মন্তব্য ({notes.length})
              </h4>
              {filteredNotes.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">এখনো কোনো ব্যক্তিগত নোট যোগ করা হয়নি।</p>
              ) : (
                <div className="space-y-2">
                  {filteredNotes.map((nt) => (
                    <div
                      key={nt.id}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <span className="block font-bold text-neutral-900 dark:text-white mb-1">
                        📌 {nt.sectionHeading}
                      </span>
                      <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                        {nt.content}
                      </p>
                      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-2 text-[10px] text-neutral-400 dark:border-neutral-800">
                        <span>{new Date(nt.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopy(nt.content, nt.id)}
                            className="p-1 hover:text-neutral-900 dark:hover:text-white text-neutral-600"
                            title="কপি করুন"
                          >
                            {copiedId === nt.id ? <Check className="h-3 w-3 text-neutral-900 dark:text-white" /> : <Copy className="h-3 w-3" />}
                          </button>
                          <button
                            onClick={() => removeNote(nt.id)}
                            className="p-1 hover:text-red-600 text-neutral-500"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {noteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-neutral-900 dark:text-white" />
                ব্যক্তিগত নোট বা মন্তব্য যুক্ত করুন
              </h3>
              <button
                onClick={() => setNoteModalOpen(false)}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <textarea
              rows={4}
              placeholder="আপনার অনুভূতি, শিক্ষা বা কোনো প্রতিফলন লিখুন..."
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-xs sm:text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNoteModalOpen(false)}
                className="rounded-xl text-xs"
              >
                বাতিল
              </Button>
              <Button
                size="sm"
                onClick={handleSaveNote}
                className="rounded-xl bg-neutral-900 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                সংরক্ষণ করুন (Save Note)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
