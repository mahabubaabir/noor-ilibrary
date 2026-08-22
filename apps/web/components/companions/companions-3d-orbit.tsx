"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Volume2,
  VolumeX,
  Sparkles,
  X,
  Play,
  Pause,
  ArrowRight,
  RotateCcw,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
} from "lucide-react"
import { COMPANIONS_COLLECTION, CompanionItem } from "@/lib/companions-data"
import { Button } from "@/components/ui/button"

export function Companions3DOrbit() {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionItem | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [language, setLanguage] = useState<"bn" | "en">("bn")
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d")

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startAngleRef = useRef(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const synthVoiceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Auto rotation animation frame
  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      if (isAutoRotating && !isDraggingRef.current && !selectedCompanion) {
        setRotationAngle((prev) => (prev + 0.25) % 360)
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isAutoRotating, selectedCompanion])

  // Mouse / Touch Drag Controls
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true
    const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
    startXRef.current = clientX
    startAngleRef.current = rotationAngle
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return
    const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
    const deltaX = clientX - startXRef.current
    const sensitivity = 0.35
    setRotationAngle((startAngleRef.current + deltaX * sensitivity + 3600) % 360)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Ambient sound synthesizer
  const toggleAmbientSound = () => {
    if (soundEnabled) {
      setSoundEnabled(false)
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
        audioContextRef.current = null
      }
    } else {
      setSoundEnabled(true)
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        // Wind / cosmic ambient white noise through lowpass filter
        const bufferSize = ctx.sampleRate * 2
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1
        }

        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = noiseBuffer
        whiteNoise.loop = true

        const filter = ctx.createBiquadFilter()
        filter.type = "lowpass"
        filter.frequency.setValueAtTime(320, ctx.currentTime)

        const gainNode = ctx.createGain()
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime)

        whiteNoise.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)
        whiteNoise.start()
      } catch {}
    }
  }

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

  // Total count of companions in circle
  const totalItems = COMPANIONS_COLLECTION.length
  const radius = 280 // Radius of orbit in pixels

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-amber-500/30 bg-stone-950 shadow-2xl">
      {/* 3D Scene Viewport */}
      {viewMode === "3d" ? (
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="relative flex h-[580px] sm:h-[680px] w-full cursor-grab select-none items-center justify-center overflow-hidden active:cursor-grabbing"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #1e3a34 0%, #0c201a 45%, #050e0c 85%, #020705 100%)",
          }}
        >
          {/* Desert Dunes Background Silhouettes */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <svg
              className="absolute bottom-0 w-full h-72 text-emerald-950/80"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,229.3C840,224,960,160,1080,144C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </svg>
            <svg
              className="absolute -bottom-10 w-full h-80 text-amber-950/60"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,256L48,229.3C96,203,192,149,288,149.3C384,149,480,203,576,218.7C672,235,768,213,864,186.7C960,160,1056,128,1152,138.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>

          {/* Glowing Green Spiritual Aura Orbs in Sky */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="absolute left-1/2 bottom-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>

          {/* 3D Perspective Stage */}
          <div
            className="relative flex items-center justify-center"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 45%",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Center Floating Sanctuary: Masjid an-Nabawi / Sanctuary Base */}
            <div className="pointer-events-none relative flex flex-col items-center justify-center">
              {/* Floating Island Rock */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Masjid Dome & Minarets Silhouette */}
                <div className="relative mb-[-10px] flex items-end justify-center gap-1.5 opacity-90">
                  {/* Left Minaret */}
                  <div className="h-28 w-2.5 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-700 to-stone-900 shadow-lg" />
                  {/* Sanctuary Main Dome */}
                  <div className="relative flex flex-col items-center">
                    <div className="h-16 w-20 rounded-t-full border border-amber-300/40 bg-gradient-to-b from-emerald-600 via-emerald-800 to-stone-900 shadow-2xl">
                      <div className="mx-auto mt-1 h-3 w-1 bg-amber-400" />
                    </div>
                    <div className="h-8 w-24 rounded-t-md bg-gradient-to-b from-stone-300 via-stone-400 to-stone-700 shadow-md" />
                  </div>
                  {/* Right Minaret */}
                  <div className="h-28 w-2.5 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-700 to-stone-900 shadow-lg" />
                </div>

                {/* Floating Rock Island Base */}
                <div
                  className="h-14 w-44 rounded-[50%] bg-gradient-to-b from-stone-800 via-stone-900 to-black shadow-2xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.3)",
                  }}
                />
              </div>

              {/* Central Floating Top Medallion: Prophet Muhammad ﷺ */}
              <div
                className="absolute -top-32 z-20 flex flex-col items-center transition-transform hover:scale-105"
                title="রাসূলুল্লাহ মুহাম্মদ ﷺ"
              >
                {/* Radiant Glow Behind Prophet Medallion */}
                <div className="absolute inset-0 -m-3 animate-pulse rounded-full bg-amber-400/30 blur-xl" />

                {/* Gold Medallion */}
                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 p-2 shadow-2xl ring-4 ring-amber-300/40">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-amber-300/60 bg-emerald-950/90 text-center shadow-inner">
                    <span className="arabic text-xl sm:text-2xl font-black text-amber-300" dir="rtl">
                      مُحَمَّدٌ
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
                      রাসূলুল্লাহ ﷺ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Ring of Companions Medallions in 3D */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
            >
              {COMPANIONS_COLLECTION.map((companion, index) => {
                // Calculate position along circle with current rotationAngle
                const angleDeg = (index * (360 / totalItems) + rotationAngle) % 360
                const angleRad = (angleDeg * Math.PI) / 180

                // 3D coordinates
                const x = Math.sin(angleRad) * radius
                const z = Math.cos(angleRad) * radius
                const y = Math.sin(angleRad * 2) * 15 // Subtle vertical wave

                // Scale and opacity according to depth (z)
                const scale = 0.75 + ((z + radius) / (2 * radius)) * 0.45
                const opacity = 0.5 + ((z + radius) / (2 * radius)) * 0.5
                const zIndex = Math.round(z + radius)

                return (
                  <div
                    key={companion.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCompanion(companion)
                    }}
                    className="group absolute cursor-pointer transition-all duration-100 ease-out"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                  >
                    {/* Glowing Green Spiritual Energy Beacon over Medallion */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="h-3 w-3 animate-ping rounded-full bg-emerald-400/80" />
                      <div className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_12px_#34d399]" />
                    </div>

                    {/* Companion Golden Coin Medallion */}
                    <div className="relative flex flex-col items-center">
                      <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 p-1.5 shadow-2xl ring-2 ring-amber-400/50 transition-transform group-hover:scale-110">
                        {/* Laurel Wreath Border Ring */}
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-amber-300/60 bg-emerald-950/95 p-1 text-center shadow-inner">
                          <span className="arabic text-sm sm:text-base font-bold text-amber-300 leading-tight" dir="rtl">
                            {companion.arabicName.split(" ")[0]}
                          </span>
                          <span className="mt-0.5 max-w-[70px] truncate text-[9px] font-extrabold text-amber-200">
                            {companion.nameBn.split(" ")[1] || companion.nameBn.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Companion Name Tag below Coin */}
                      <div className="mt-2 rounded-xl border border-amber-400/30 bg-black/80 px-2.5 py-0.5 text-center shadow-lg backdrop-blur">
                        <p className="text-[10px] font-bold text-amber-200 truncate max-w-[100px]">
                          {companion.nameBn}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Bar Controls & View Mode */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            {/* Title Badge */}
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-black tracking-wide text-stone-100">
                রাসূলুল্লাহ ﷺ ও চারপাশের সাহাবায়ে কেরাম
              </span>
            </div>

            {/* View Switcher & Language */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl bg-black/60 p-1 border border-stone-700 backdrop-blur">
                <button
                  onClick={() => setLanguage("bn")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                    language === "bn" ? "bg-emerald-600 text-white" : "text-stone-400"
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                    language === "en" ? "bg-emerald-600 text-white" : "text-stone-400"
                  }`}
                >
                  English
                </button>
              </div>

              <button
                onClick={() => setViewMode("grid")}
                className="rounded-xl border border-stone-700 bg-black/60 p-2 text-stone-300 hover:bg-stone-800 backdrop-blur"
                title="গ্রিড ভিউতে দেখুন"
              >
                <Layers className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom Bar: Ambient Audio & Orbit Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            {/* Rotation Controls */}
            <div className="flex items-center gap-2 rounded-2xl border border-stone-800 bg-black/70 p-1.5 backdrop-blur-md">
              <button
                onClick={() => setRotationAngle((prev) => (prev - 30 + 360) % 360)}
                className="rounded-xl p-2 text-stone-400 hover:bg-stone-800 hover:text-white"
                title="বামে ঘোরান"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isAutoRotating
                    ? "bg-emerald-600/80 text-white"
                    : "bg-stone-800 text-stone-300 hover:text-white"
                }`}
              >
                {isAutoRotating ? "অটো-অরবিট চালু" : "অরবিট থামানো"}
              </button>

              <button
                onClick={() => setRotationAngle((prev) => (prev + 30) % 360)}
                className="rounded-xl p-2 text-stone-400 hover:bg-stone-800 hover:text-white"
                title="ডানে ঘোরান"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Hint & Ambient Sound Toggle */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[11px] font-medium text-stone-400 bg-black/50 px-3 py-1 rounded-xl backdrop-blur">
                🖱️ ড্র্যাগ করে ঘোরান বা সাহাবীর কয়েনে ক্লিক করুন
              </span>

              <button
                onClick={toggleAmbientSound}
                className={`rounded-2xl border p-2.5 transition-all backdrop-blur-md ${
                  soundEnabled
                    ? "border-amber-400/60 bg-amber-500/20 text-amber-300"
                    : "border-stone-800 bg-black/70 text-stone-400 hover:text-white"
                }`}
                title={soundEnabled ? "সাউন্ড বন্ধ করুন" : "অ্যাম্বিয়েন্ট সাউন্ড চালু করুন"}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View Mode */
        <div className="p-6 sm:p-8 bg-stone-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              সকল সাহাবীদের তালিকা ({COMPANIONS_COLLECTION.length})
            </h3>
            <button
              onClick={() => setViewMode("3d")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-700"
            >
              <Compass className="h-4 w-4" /> ৩ডি অরবিট ভিউতে ফিরে যান
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIONS_COLLECTION.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCompanion(c)}
                className="cursor-pointer rounded-2xl border border-stone-800 bg-stone-950/80 p-4 transition-all hover:border-emerald-500/50 hover:bg-stone-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">{c.categoryLabelBn}</span>
                  <span className="text-[11px] text-stone-400">{c.readTime}</span>
                </div>
                <h4 className="mt-2 text-base font-bold text-stone-100">{c.nameBn}</h4>
                <p className="text-xs text-amber-400 font-medium">{c.titleBn}</p>
                <p className="mt-2 text-xs text-stone-400 line-clamp-2">{c.shortBioBn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPANION INFO MODAL POPUP (EXACT REPLICA OF SCREENSHOT 2) */}
      {selectedCompanion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0e3b2e] via-[#092b21] to-[#041913] p-6 sm:p-8 shadow-2xl text-stone-100 ring-1 ring-amber-400/20">
            {/* Top Close Button (Screenshot 2 style) */}
            <button
              onClick={handleCloseModal}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content Header */}
            <div className="text-center pt-2">
              <span className="inline-block rounded-xl bg-emerald-900/60 border border-emerald-400/30 px-3 py-0.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                {selectedCompanion.era} • {selectedCompanion.categoryLabelBn}
              </span>

              {/* Title with Gold Accent (e.g. Abdur-Rahman ibn Awf) */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {language === "bn" ? (
                  <span>
                    <span className="text-white">{selectedCompanion.nameBn.split(" ")[0]} </span>
                    <span className="text-amber-400">
                      {selectedCompanion.nameBn.split(" ").slice(1).join(" ")}
                    </span>
                  </span>
                ) : (
                  <span>
                    <span className="text-white">{selectedCompanion.nameEn.split(" ")[0]} </span>
                    <span className="text-amber-400">
                      {selectedCompanion.nameEn.split(" ").slice(1).join(" ")}
                    </span>
                  </span>
                )}
              </h2>

              <p className="arabic mt-1 text-base text-amber-200/90 font-medium" dir="rtl">
                {selectedCompanion.arabicName}
              </p>
            </div>

            {/* Biography Paragraph */}
            <div className="my-6 rounded-2xl bg-emerald-950/40 p-4 border border-emerald-500/20">
              <p className="text-xs sm:text-sm leading-relaxed text-stone-200">
                {language === "bn" ? selectedCompanion.shortBioBn : selectedCompanion.shortBioEn}
              </p>

              {/* Key Attributes Highlights */}
              <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 pt-3 border-t border-emerald-800/40 text-[11px] text-amber-200">
                {selectedCompanion.keyAttributesBn.slice(0, 2).map((attr, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">{attr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons matching Screenshot 2 */}
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Gold "Read Story >" Button */}
              <Link
                href={`/companions/${selectedCompanion.slug}`}
                className="w-full sm:w-64 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-2.5 text-xs sm:text-sm font-black text-stone-950 shadow-lg hover:from-amber-300 hover:to-amber-500 transition-all active:scale-95 text-center"
              >
                {language === "bn" ? "সম্পূর্ণ জীবনী পড়ুন >" : "Read Story >"}
              </Link>

              {/* White Pill "Listen on Audiobook Stories" Button */}
              <button
                onClick={handleToggleNarration}
                className="w-full sm:w-64 inline-flex items-center justify-center gap-2 rounded-full border border-stone-200/30 bg-white/90 px-6 py-2.5 text-xs sm:text-sm font-bold text-stone-900 shadow-md hover:bg-white transition-all active:scale-95"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="h-3.5 w-3.5 fill-current text-amber-600" />
                    <span>{language === "bn" ? "অডিও থামান" : "Pause Narration"}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current text-amber-600" />
                    <span>{language === "bn" ? "অডিও বিবরণ শুনুন" : "Listen on Audiobook Stories"}</span>
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
