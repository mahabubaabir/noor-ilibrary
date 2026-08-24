"use client"

import Link from "next/link"
import { BookOpen, Search, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2 } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import type { SurahMeta } from "@noor/types"

const BANGLE_SURAH_NAMES: Record<number, { bnName: string; bnMeaning: string }> = {
  1: { bnName: "আল-ফাতিহা", bnMeaning: "সূচনা" },
  2: { bnName: "আল-বাক্বারাহ", bnMeaning: "গাভী" },
  3: { bnName: "আলে-ইমরান", bnMeaning: "ইমরানের পরিবার" },
  4: { bnName: "আন-নিসা", bnMeaning: "নারী" },
  5: { bnName: "আল-মায়িদাহ", bnMeaning: "খাদ্য পরিবেশিত পাত্র" },
  6: { bnName: "আল-আনআম", bnMeaning: "গৃহপালিত পশু" },
  7: { bnName: "আল-আরাফ", bnMeaning: "উঁচু স্থানসমূহ" },
  8: { bnName: "আল-আনফাল", bnMeaning: "যুদ্ধলব্ধ ধন-সম্পদ" },
  9: { bnName: "আত-তাওবাহ", bnMeaning: "অনুশোচনা" },
  10: { bnName: "ইউনুস", bnMeaning: "নবী ইউনুস" },
  11: { bnName: "হুদ", bnMeaning: "নবী হুদ" },
  12: { bnName: "ইউসুফ", bnMeaning: "নবী ইউসুফ" },
  13: { bnName: "আর-রাদ", bnMeaning: "বজ্রপাত" },
  14: { bnName: "ইব্রাহীম", bnMeaning: "নবী ইব্রাহীম" },
  15: { bnName: "আল-হিজর", bnMeaning: "পাথুরে পাহাড়" },
  16: { bnName: "আন-নাহল", bnMeaning: "মৌমাছি" },
  17: { bnName: "আল-ইসরা", bnMeaning: "নৈশভ্রমণ" },
  18: { bnName: "আল-কাহফ", bnMeaning: "গুহা" },
  19: { bnName: "মারইয়াম", bnMeaning: "মারইয়াম (আ.)" },
  20: { bnName: "ত্বা-হা", bnMeaning: "ত্বা-হা" },
  21: { bnName: "আল-আম্বিয়া", bnMeaning: "নবীগণ" },
  22: { bnName: "আল-হাজ্জ", bnMeaning: "হজ" },
  23: { bnName: "আল-মুমিনুন", bnMeaning: "মুমিনগণ" },
  24: { bnName: "আন-নূর", bnMeaning: "জ্যোতি" },
  25: { bnName: "আল-ফুরকান", bnMeaning: "সত্য-মিথ্যার পার্থক্যকারী" },
  26: { bnName: "আশ-শুয়ারা", bnMeaning: "কবিগণ" },
  27: { bnName: "আন-নামল", bnMeaning: "পিপীলিকা" },
  28: { bnName: "আল-কাসাস", bnMeaning: "কাহিনী" },
  29: { bnName: "আল-আনকাবুত", bnMeaning: "মাকড়সা" },
  30: { bnName: "আর-রূম", bnMeaning: "রোমবাসী" },
  31: { bnName: "লুকমান", bnMeaning: "জ্ঞানী লুকমান" },
  32: { bnName: "আস-সাজদাহ", bnMeaning: "সিজদা" },
  33: { bnName: "আল-আহযাব", bnMeaning: "মিত্রবাহিনী" },
  34: { bnName: "সাবা", bnMeaning: "সাবার অধিবাসী" },
  35: { bnName: "ফাতির", bnMeaning: "সৃষ্টিকর্তা" },
  36: { bnName: "ইয়া-সীন", bnMeaning: "ইয়াসীন" },
  37: { bnName: "আস-সাফফাত", bnMeaning: "সারিবদ্ধভাবে দাঁড়ানো" },
  38: { bnName: "সোয়াদ", bnMeaning: "সোয়াদ" },
  39: { bnName: "আজ-জুমার", bnMeaning: "দলবদ্ধ জনতা" },
  40: { bnName: "গাফির", bnMeaning: "ক্ষমাশীল" },
  41: { bnName: "ফুসসিলাত", bnMeaning: "সুস্পষ্ট বিবরণ" },
  42: { bnName: "আশ-শূরা", bnMeaning: "পরামর্শ" },
  43: { bnName: "আজ-জুখরূফ", bnMeaning: "স্বর্ণালঙ্কার" },
  44: { bnName: "আদ-দুখান", bnMeaning: "ধোঁয়া" },
  45: { bnName: "আল-জাসিয়াহ", bnMeaning: "নতজানু" },
  46: { bnName: "আল-আহকাফ", bnMeaning: "বালির পাহাড়" },
  47: { bnName: "মুহাম্মদ", bnMeaning: "নবী মুহাম্মদ (ﷺ)" },
  48: { bnName: "আল-ফাতহ", bnMeaning: "বিজয়" },
  49: { bnName: "আল-হুজুরাত", bnMeaning: "কক্ষসমূহ" },
  50: { bnName: "ক্বাফ", bnMeaning: "ক্বাফ" },
  51: { bnName: "আয-যারিয়াত", bnMeaning: "বিক্ষিপ্তকারী বাতাস" },
  52: { bnName: "আত-তূর", bnMeaning: "তূর পর্বত" },
  53: { bnName: "আন-নাজম", bnMeaning: "নক্ষত্র" },
  54: { bnName: "আল-ক্বামার", bnMeaning: "চন্দ্র" },
  55: { bnName: "আর-রাহমান", bnMeaning: "পরম দয়াময়" },
  56: { bnName: "আল-ওয়াকিয়াহ", bnMeaning: "নিশ্চিত ঘটনা" },
  57: { bnName: "আল-হাদীদ", bnMeaning: "লোহা" },
  58: { bnName: "আল-মুজাদালাহ", bnMeaning: "বিতর্ককারিণী" },
  59: { bnName: "আল-হাশর", bnMeaning: "সমাবেশ" },
  60: { bnName: "আল-মুমতাহানাহ", bnMeaning: "পরীক্ষিত নারী" },
  61: { bnName: "আস-সাফ", bnMeaning: "সারিবদ্ধ সৈন্যদল" },
  62: { bnName: "আল-জুমুআহ", bnMeaning: "শুক্রবার" },
  63: { bnName: "আল-মুনাফিকুন", bnMeaning: "কপটাচারী" },
  64: { bnName: "আত-তাগাবুন", bnMeaning: "লাভ-ক্ষতি" },
  65: { bnName: "আত-ত্বালাক্ব", bnMeaning: "তালাক" },
  66: { bnName: "আত-তাহরীম", bnMeaning: "নিষিদ্ধকরণ" },
  67: { bnName: "আল-মুলক", bnMeaning: "সার্বভৌম কর্তৃত্ব" },
  68: { bnName: "আল-ক্বলম", bnMeaning: "কলম" },
  69: { bnName: "আল-হাক্কাহ", bnMeaning: "অবশ্যম্ভাবী সত্য" },
  70: { bnName: "আল-মাআরিজ", bnMeaning: "উন্নয়নের সোপান" },
  71: { bnName: "নূহ", bnMeaning: "নবী নূহ" },
  72: { bnName: "আল-জ্বিন", bnMeaning: "জ্বিন জাতি" },
  73: { bnName: "আল-মুযযাম্মিল", bnMeaning: "বস্ত্রাচ্ছাদিত" },
  74: { bnName: "আল-মুদ্দাসসির", bnMeaning: "চাদরাবৃত" },
  75: { bnName: "আল-ক্বিয়ামাহ", bnMeaning: "কেয়ামত" },
  76: { bnName: "আল-ইনসান", bnMeaning: "মানবজাতি" },
  77: { bnName: "আল-মুরসালাত", bnMeaning: "প্রেরিত বাতাস" },
  78: { bnName: "আন-নাবা", bnMeaning: "মহা সংবাদ" },
  79: { bnName: "আন-নাযিআত", bnMeaning: "উৎপাটনকারী" },
  80: { bnName: "আবাসা", bnMeaning: "ভ্রুকুটি করল" },
  81: { bnName: "আত-তাকভীর", bnMeaning: "অন্ধকারাচ্ছন্নকরণ" },
  82: { bnName: "আল-ইনফিতার", bnMeaning: "বিদীর্ণ হওয়া" },
  83: { bnName: "আল-মুতাফফিফীন", bnMeaning: "পরমাপে কম দানকারী" },
  84: { bnName: "আল-ইনশিকাক", bnMeaning: "খণ্ড-বিখণ্ড হওয়া" },
  85: { bnName: "আল-বুরূজ", bnMeaning: "নক্ষত্রপুঞ্জ" },
  86: { bnName: "আত-তারিক্ব", bnMeaning: "রাতের আগন্তুক" },
  87: { bnName: "আল-আলা", bnMeaning: "সর্বোচ্চ" },
  88: { bnName: "আল-গাশিয়াহ", bnMeaning: "আচ্ছন্নকারী বিপর্যয়" },
  89: { bnName: "আল-ফজর", bnMeaning: "প্রভাতকাল" },
  90: { bnName: "আল-বালাদ", bnMeaning: "নগরী" },
  91: { bnName: "আশ-শামস", bnMeaning: "সূর্য" },
  92: { bnName: "আল-লাইল", bnMeaning: "রাত্রি" },
  93: { bnName: "আদ-দুহা", bnMeaning: "পূর্বাহ্নের রৌদ্র" },
  94: { bnName: "আল-ইনশিরাহ", bnMeaning: "বক্ষ প্রশস্তকরণ" },
  95: { bnName: "আত-তীন", bnMeaning: "ডুমুর" },
  96: { bnName: "আল-আলাক্ব", bnMeaning: "রক্তপিণ্ড" },
  97: { bnName: "আল-ক্বদর", bnMeaning: "মহিমান্বিত রজনী" },
  98: { bnName: "আল-বাইয়্যিনাহ", bnMeaning: "সুস্পষ্ট প্রমাণ" },
  99: { bnName: "আল-যিলযাল", bnMeaning: "ভূমিকম্প" },
  100: { bnName: "আল-আদিয়াত", bnMeaning: "অভিযানকারী অশ্ব" },
  101: { bnName: "আল-ক্বারিয়াহ", bnMeaning: "মহা বিপর্যয়" },
  102: { bnName: "আত-তাকাসুর", bnMeaning: "প্রাচুর্যের প্রতিযোগিতা" },
  103: { bnName: "আল-আসর", bnMeaning: "মহাকাল" },
  104: { bnName: "আল-হুমাযাহ", bnMeaning: "পরনিন্দুক" },
  105: { bnName: "আল-ফীল", bnMeaning: "হাতি" },
  106: { bnName: "কুরাইশ", bnMeaning: "কুরাইশ বংশ" },
  107: { bnName: "আল-মাউন", bnMeaning: "নিত্যপ্রয়োজনীয় সাহায্য" },
  108: { bnName: "আল-কাউসার", bnMeaning: "প্রচুর কল্যাণ" },
  109: { bnName: "আল-কাফিরুন", bnMeaning: "অবিশ্বাসীগণ" },
  110: { bnName: "আন-নাসর", bnMeaning: "সাহায্য ও বিজয়" },
  111: { bnName: "আল-লাহাব", bnMeaning: "অগ্নিশিখা" },
  112: { bnName: "আল-ইখলাস", bnMeaning: "একনিষ্ঠতা ও একত্ববাদ" },
  113: { bnName: "আল-ফালাক্ব", bnMeaning: "উষাকাল" },
  114: { bnName: "আন-নাস", bnMeaning: "মানবজাতি" },
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"All" | "Meccan" | "Medinan">("All")
  const [view, setView] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch("/api/quran/surahs")
      .then((r) => r.json())
      .then((d) => {
        if (d.surahs && Array.isArray(d.surahs)) {
          setSurahs(d.surahs)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase()
    return surahs.filter((s) => {
      if (filterType !== "All" && s.revelationType !== filterType) {
        return false
      }
      if (!q) return true

      const bn = BANGLE_SURAH_NAMES[s.number]
      const bnMatch = bn?.bnName.toLowerCase().includes(q) || bn?.bnMeaning.toLowerCase().includes(q)

      return (
        s.nameEnglish.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        s.nameTranslation.toLowerCase().includes(q) ||
        String(s.number) === q ||
        bnMatch
      )
    })
  }, [surahs, search, filterType])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-amber-500/5 p-6 sm:p-8 dark:border-emerald-500/30 dark:from-emerald-950/40 dark:via-stone-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              পবিত্র আল-কুরআন (114 Surahs)
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
              The Noble Quran
            </h1>
            <p className="mt-1 max-w-xl text-sm text-stone-600 dark:text-stone-400">
              Read with Arabic script, authentic English & Bangla translations, verse-by-verse recitation, and Ibn Kathir Tafsir.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 text-center backdrop-blur dark:border-emerald-500/30 dark:bg-stone-900/80">
              <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">114</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">সূরা / Surahs</span>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-white/80 p-4 text-center backdrop-blur dark:border-amber-500/30 dark:bg-stone-900/80">
              <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">6,236</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">আয়াত / Ayahs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, number, Bangla (যেমন: ফাতিহা)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-stone-800/80">
            {(["All", "Meccan", "Medinan"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  filterType === type
                    ? "bg-white text-emerald-700 shadow-sm dark:bg-stone-900 dark:text-emerald-400"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {type === "All" ? "সকল (All)" : type === "Meccan" ? "মাক্কী (Meccan)" : "মাদানী (Medinan)"}
              </button>
            ))}
          </div>

          <div className="flex rounded-xl bg-stone-100 p-1 dark:bg-stone-800/80">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                view === "grid"
                  ? "bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                view === "list"
                  ? "bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Surah List / Grid */}
      {loading ? (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-stone-200/70 dark:bg-stone-800/70" />
          ))}
        </div>
      ) : filteredSurahs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white/40 p-12 text-center dark:border-stone-800 dark:bg-stone-900/40">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-stone-400" />
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">কোনো সূরা পাওয়া যায়নি</h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            &quot;{search}&quot; এর জন্য কোনো ফলাফল মেলেনি। অন্য শব্দ দিয়ে অনুসন্ধান করুন।
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => {
            const bn = BANGLE_SURAH_NAMES[surah.number]
            return (
              <Link key={surah.number} href={`/quran/${surah.number}`}>
                <div className="group relative flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-lg dark:border-stone-800/80 dark:bg-stone-900/90 dark:hover:border-emerald-500/40">
                  {/* Number Badge */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-bold text-emerald-800 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-300 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    {surah.number}
                  </div>

                  {/* Main Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <h3 className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">
                        {surah.nameEnglish}
                      </h3>
                      <span className="font-arabic text-xl leading-none text-emerald-800 dark:text-emerald-400">
                        {surah.nameArabic}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span className="truncate">
                        {bn ? `${bn.bnName} (${bn.bnMeaning})` : surah.nameTranslation}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500">
                      <span className="rounded-md bg-stone-100 px-1.5 py-0.5 font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                        {surah.ayahCount} আয়াত
                      </span>
                      <span>·</span>
                      <span>{surah.revelationType === "Meccan" ? "মাক্কী" : "মাদানী"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
          {filteredSurahs.map((surah) => {
            const bn = BANGLE_SURAH_NAMES[surah.number]
            return (
              <Link key={surah.number} href={`/quran/${surah.number}`}>
                <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {surah.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">{surah.nameEnglish}</span>
                      {bn && <span className="text-xs text-emerald-700 dark:text-emerald-400">({bn.bnName})</span>}
                    </div>
                    <p className="text-xs text-stone-400">{bn?.bnMeaning || surah.nameTranslation} · {surah.ayahCount} Ayahs</p>
                  </div>
                  <span className="font-arabic text-xl text-emerald-800 dark:text-emerald-400">{surah.nameArabic}</span>
                  <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-emerald-600 dark:text-stone-600" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
