"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import {
  Volume2,
  VolumeX,
  X,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { COMPANIONS_COLLECTION, CompanionItem } from "@/lib/companions-data"

interface Props {
  initialCompanions?: CompanionItem[]
}

export function CompanionsGeometricGrid({ initialCompanions = [] }: Props) {
  const companionsData = initialCompanions.length > 0 ? initialCompanions : COMPANIONS_COLLECTION;
  
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionItem | null>(null)
  const [language, setLanguage] = useState<"bn" | "en">("bn")
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const synthVoiceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Audio speech narration
  const handleToggleNarration = () => {
    if (!selectedCompanion) return

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
    } else {
      window.speechSynthesis.cancel()
      const text =
        language === "bn"
          ? `${selectedCompanion.nameBn}। ${selectedCompanion.titleBn}। ${selectedCompanion.shortBioBn}`
          : `${selectedCompanion.nameEn}. ${selectedCompanion.titleEn}. ${selectedCompanion.shortBioEn}`

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "bn" ? "bn-BD" : "en-US"
      utterance.rate = 0.95
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)

      synthVoiceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsPlayingAudio(true)
    }
  }

  const handleCloseModal = () => {
    setSelectedCompanion(null)
    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-stone-200/50 bg-white/40 shadow-sm backdrop-blur-xl dark:border-stone-800/50 dark:bg-stone-950/40">
      
      {/* Subtle Geometric Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-6 sm:p-10">
        
        {/* Top Controls */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/80">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold tracking-wide text-stone-900 dark:text-stone-100">
              {language === "bn" ? "সাহাবায়ে কেরাম" : "The Companions"}
            </span>
          </div>

          <div className="flex rounded-xl bg-white/80 p-1 border border-stone-200 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/80">
            <button
              onClick={() => setLanguage("bn")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                language === "bn" ? "bg-emerald-600 text-white shadow-sm" : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                language === "en" ? "bg-emerald-600 text-white shadow-sm" : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Central Prophet Muhammad ﷺ Card */}
        <div className="mb-12 flex justify-center">
          <div 
            className="group relative flex w-full max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-amber-900/30 dark:from-amber-950/40 dark:to-stone-900/80"
            onClick={() => {
              setSelectedCompanion({
                id: "prophet-muhammad",
                slug: "prophet-muhammad",
                nameBn: "মুহাম্মদ ﷺ",
                nameEn: "Muhammad ﷺ",
                arabicName: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
                titleBn: "সর্বশেষ নবী ও রাসূল",
                titleEn: "The Final Messenger",
                shortBioBn: "মুহাম্মদ ﷺ হলেন ইসলামের সর্বশেষ নবী ও রাসূল। তিনি সমগ্র মানবজাতির জন্য রহমতস্বরূপ প্রেরিত হয়েছেন। তাঁর মাধ্যমেই আল্লাহ তাআলা পূর্ণাঙ্গ দ্বীন ইসলাম এবং সর্বশেষ আসমানী কিতাব আল-কুরআন নাযিল করেছেন।",
                shortBioEn: "Muhammad ﷺ is the final Prophet and Messenger of Islam. He was sent as a mercy to all mankind. Through him, Allah revealed the complete religion of Islam and the final revelation, the Quran.",
                keyAttributesBn: ["সর্বশ্রেষ্ঠ মানব", "খাতামুন নাবিয়্যীন"],
                keyAttributesEn: ["Greatest of Mankind", "Seal of the Prophets"],
                category: "prominent" as any,
                categoryLabelBn: "নবী",
                categoryLabelEn: "Prophet",
                era: "570 CE - 632 CE",
                readTime: "20 min",
                lifeLessonsBn: [],
                lifeLessonsEn: [],
                sectionsBn: [],
                sectionsEn: []
              } as unknown as CompanionItem)
            }}
          >
            {/* Geometric overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay" 
                 style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #d97706 0%, transparent 60%)' }} />
            
            <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-400/50 bg-amber-100/50 shadow-inner dark:bg-amber-900/30">
              <span className="arabic text-3xl font-black text-amber-600 dark:text-amber-400" dir="rtl">
                مُحَمَّدٌ
              </span>
            </div>
            
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              {language === "bn" ? "রাসূলুল্লাহ মুহাম্মদ ﷺ" : "Prophet Muhammad ﷺ"}
            </h2>
            <p className="mt-2 text-center text-sm font-medium text-amber-700 dark:text-amber-500">
              {language === "bn" ? "সর্বশেষ নবী ও রাসূল" : "The Final Messenger"}
            </p>
          </div>
        </div>

        {/* Grid of Companions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companionsData.map((companion) => (
            <div
              key={companion.id || companion.slug}
              onClick={() => setSelectedCompanion(companion)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-white hover:shadow-lg dark:border-stone-800 dark:bg-stone-900/50 dark:hover:bg-stone-900"
            >
              {/* Corner decorative element */}
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-100/50 transition-transform group-hover:scale-150 dark:bg-emerald-900/20" />
              
              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {language === "bn" ? companion.categoryLabelBn : companion.categoryLabelEn}
                </span>
                <ArrowRight className="h-4 w-4 text-stone-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-emerald-500 group-hover:opacity-100" />
              </div>

              <div className="relative mt-5">
                <p className="arabic mb-2 text-xl font-bold text-emerald-600 dark:text-emerald-500" dir="rtl">
                  {companion.arabicName.split(" ")[0]}
                </p>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {language === "bn" ? companion.nameBn : companion.nameEn}
                </h3>
                <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-500">
                  {language === "bn" ? companion.titleBn : companion.titleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANION INFO MODAL POPUP */}
      {selectedCompanion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-stone-800 dark:bg-stone-950">
            {/* Top Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors dark:bg-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content Header */}
            <div className="text-center pt-2">
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mb-3">
                {selectedCompanion.era} • {language === "bn" ? selectedCompanion.categoryLabelBn : selectedCompanion.categoryLabelEn}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                {language === "bn" ? selectedCompanion.nameBn : selectedCompanion.nameEn}
              </h2>

              <p className="arabic mt-2 text-lg text-emerald-600 dark:text-emerald-500 font-medium" dir="rtl">
                {selectedCompanion.arabicName}
              </p>
            </div>

            {/* Biography Paragraph */}
            <div className="my-6 rounded-2xl bg-stone-50 p-5 dark:bg-stone-900/50">
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {language === "bn" ? selectedCompanion.shortBioBn : selectedCompanion.shortBioEn}
              </p>

              {/* Key Attributes Highlights */}
              {selectedCompanion.keyAttributesBn && selectedCompanion.keyAttributesBn.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                  {(language === "bn" ? selectedCompanion.keyAttributesBn : selectedCompanion.keyAttributesEn || []).slice(0, 2).map((attr, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium">{attr}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-3">
              <Link
                href={`/companions/${selectedCompanion.slug}`}
                className="w-full sm:w-72 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95 text-center"
              >
                {language === "bn" ? "সম্পূর্ণ জীবনী পড়ুন" : "Read Full Story"}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={handleToggleNarration}
                className="w-full sm:w-72 inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-bold text-stone-700 shadow-sm hover:bg-stone-50 transition-all active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === "bn" ? "অডিও থামান" : "Pause Narration"}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === "bn" ? "অডিও বিবরণ শুনুন" : "Listen to Audio"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
