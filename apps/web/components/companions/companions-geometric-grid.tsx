"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import {
  X,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react"
import { COMPANIONS_COLLECTION, CompanionItem } from "@/lib/companions-data"
import { playSafeSpeech } from "@/lib/audio/audio-player-engine"

interface Props {
  initialCompanions?: CompanionItem[]
}

export function CompanionsGeometricGrid({ initialCompanions = [] }: Props) {
  const companionsData = initialCompanions.length > 0 ? initialCompanions : COMPANIONS_COLLECTION

  const [selectedCompanion, setSelectedCompanion] = useState<CompanionItem | null>(null)
  const [language, setLanguage] = useState<"bn" | "en">("bn")
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const audioCancelRef = useRef<(() => void) | null>(null)

  // Audio speech narration
  const handleToggleNarration = () => {
    if (!selectedCompanion) return

    if (isPlayingAudio || isLoadingAudio) {
      audioCancelRef.current?.()
      setIsPlayingAudio(false)
      setIsLoadingAudio(false)
    } else {
      audioCancelRef.current?.()
      setIsLoadingAudio(true)
      const text =
        language === "bn"
          ? `${selectedCompanion.nameBn}। ${selectedCompanion.titleBn || ""}। ${selectedCompanion.shortBioBn}`
          : `${selectedCompanion.nameEn}. ${selectedCompanion.titleEn || ""}. ${selectedCompanion.shortBioEn}`

      const { cancel } = playSafeSpeech({
        text,
        lang: language === "bn" ? "bn-BD" : "en-US",
        onStart: () => {
          setIsLoadingAudio(false)
          setIsPlayingAudio(true)
        },
        onEnd: () => {
          setIsLoadingAudio(false)
          setIsPlayingAudio(false)
        },
        onError: () => {
          setIsLoadingAudio(false)
          setIsPlayingAudio(false)
        },
      })
      audioCancelRef.current = cancel
    }
  }

  const handleCloseModal = () => {
    setSelectedCompanion(null)
    if (isPlayingAudio || isLoadingAudio) {
      audioCancelRef.current?.()
      setIsPlayingAudio(false)
      setIsLoadingAudio(false)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 sm:p-10">
      <div className="relative">
        {/* Top Controls */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Sparkles className="h-4 w-4 text-neutral-900 dark:text-white" />
            <span className="text-sm font-bold tracking-wide text-neutral-900 dark:text-white">
              {language === "bn" ? "সাহাবায়ে কেরাম" : "The Companions"}
            </span>
          </div>

          <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 p-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <button
              onClick={() => setLanguage("bn")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                language === "bn"
                  ? "bg-neutral-900 text-white shadow dark:bg-white dark:text-black"
                  : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                language === "en"
                  ? "bg-neutral-900 text-white shadow dark:bg-white dark:text-black"
                  : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Central Prophet Muhammad ﷺ Card */}
        <div className="mb-12 flex justify-center">
          <div
            className="group relative flex w-full max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-neutral-900 bg-neutral-900 p-8 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white dark:bg-white dark:text-black"
            onClick={() => {
              setSelectedCompanion({
                id: "prophet-muhammad",
                slug: "prophet-muhammad",
                nameBn: "মুহাম্মদ ﷺ",
                nameEn: "Muhammad ﷺ",
                arabicName: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
                titleBn: "সর্বশেষ নবী ও রাসূল",
                titleEn: "The Final Messenger",
                shortBioBn:
                  "মুহাম্মদ ﷺ হলেন ইসলামের সর্বশেষ নবী ও রাসূল। তিনি সমগ্র মানবজাতির জন্য রহমতস্বরূপ প্রেরিত হয়েছেন। তাঁর মাধ্যমেই আল্লাহ তাআলা পূর্ণাঙ্গ দ্বীন ইসলাম এবং সর্বশেষ আসমানী কিতাব আল-কুরআন নাযিল করেছেন।",
                shortBioEn:
                  "Muhammad ﷺ is the final Prophet and Messenger of Islam. He was sent as a mercy to all mankind. Through him, Allah revealed the complete religion of Islam and the final revelation, the Quran.",
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
                sectionsEn: [],
              } as unknown as CompanionItem)
            }}
          >
            <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/20 bg-black/40 shadow-inner dark:border-black/20 dark:bg-neutral-100">
              <span className="arabic text-3xl font-black text-white dark:text-black" dir="rtl">
                مُحَمَّدٌ
              </span>
            </div>

            <h2 className="text-xl font-black text-white dark:text-black">
              {language === "bn" ? "রাসূলুল্লাহ মুহাম্মদ ﷺ" : "Prophet Muhammad ﷺ"}
            </h2>
            <p className="mt-1 text-center text-sm font-medium text-neutral-300 dark:text-neutral-700">
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
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-600"
            >
              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                  {language === "bn" ? companion.categoryLabelBn : companion.categoryLabelEn}
                </span>
                <ArrowRight className="h-4 w-4 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-black group-hover:opacity-100 dark:group-hover:text-white" />
              </div>

              <div className="relative mt-5">
                <p className="arabic mb-2 text-xl font-bold text-neutral-700 dark:text-neutral-300" dir="rtl">
                  {companion.arabicName.split(" ")[0]}
                </p>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {language === "bn" ? companion.nameBn : companion.nameEn}
                </h3>
                <p className="mt-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {language === "bn" ? companion.titleBn : companion.titleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANION INFO MODAL POPUP */}
      {selectedCompanion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
            {/* Top Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content Header */}
            <div className="pt-2 text-center">
              <span className="mb-3 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                {selectedCompanion.era} •{" "}
                {language === "bn" ? selectedCompanion.categoryLabelBn : selectedCompanion.categoryLabelEn}
              </span>

              <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                {language === "bn" ? selectedCompanion.nameBn : selectedCompanion.nameEn}
              </h2>

              <p className="arabic mt-2 text-lg font-medium text-neutral-700 dark:text-neutral-300" dir="rtl">
                {selectedCompanion.arabicName}
              </p>
            </div>

            {/* Biography Paragraph */}
            <div className="my-6 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 dark:border-neutral-800/80 dark:bg-neutral-900/60">
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {language === "bn" ? selectedCompanion.shortBioBn : selectedCompanion.shortBioEn}
              </p>

              {/* Key Attributes Highlights */}
              {selectedCompanion.keyAttributesBn && selectedCompanion.keyAttributesBn.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-2 border-t border-neutral-200 pt-4 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 sm:grid-cols-2">
                  {(language === "bn"
                    ? selectedCompanion.keyAttributesBn
                    : selectedCompanion.keyAttributesEn || []
                  )
                    .slice(0, 2)
                    .map((attr, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-white" />
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900 px-6 py-3 text-center text-sm font-bold text-white shadow transition-all hover:bg-neutral-800 active:scale-95 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-72"
              >
                <span>{language === "bn" ? "সম্পূর্ণ জীবনী পড়ুন" : "Read Full Story"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={handleToggleNarration}
                disabled={isLoadingAudio}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-sm font-bold shadow-sm transition-all active:scale-95 sm:w-72 ${
                  isPlayingAudio
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                {isLoadingAudio ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-neutral-900 dark:text-white" />
                    <span>{language === "bn" ? "অডিও লোড হচ্ছে..." : "Loading Audio..."}</span>
                  </>
                ) : isPlayingAudio ? (
                  <>
                    <Pause className="h-4 w-4 fill-current text-white dark:text-black" />
                    <span>{language === "bn" ? "অডিও বিরতি দিন" : "Pause Narration"}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current text-neutral-900 dark:text-white" />
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
