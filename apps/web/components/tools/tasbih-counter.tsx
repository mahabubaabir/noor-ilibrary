"use client"

import React, { useState, useEffect } from "react"
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react"
import { TASBIH_PRESETS, TasbihPreset } from "@/lib/islamic-tools"
import { Button } from "@/components/ui/button"

export function TasbihCounter() {
  const [selectedPreset, setSelectedPreset] = useState<TasbihPreset>(TASBIH_PRESETS[0] as TasbihPreset)
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [totalLifetimeCount, setTotalLifetimeCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrateEnabled, setVibrateEnabled] = useState(true)
  const [isMilestoneReached, setIsMilestoneReached] = useState(false)

  // Load lifetime count from localStorage
  useEffect(() => {
    try {
      const savedTotal = localStorage.getItem("noor_tasbih_lifetime_count")
      if (savedTotal) setTotalLifetimeCount(parseInt(savedTotal, 10) || 0)
    } catch {}
  }, [])

  // Play click audio
  const playClickSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch {}
  }

  // Play milestone chime
  const playMilestoneSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }

  const handleIncrement = () => {
    const nextCount = count + 1
    const nextTotal = totalLifetimeCount + 1

    setCount(nextCount)
    setTotalLifetimeCount(nextTotal)

    try {
      localStorage.setItem("noor_tasbih_lifetime_count", String(nextTotal))
    } catch {}

    // Vibration feedback on mobile
    if (vibrateEnabled && "vibrate" in navigator) {
      navigator.vibrate(nextCount % target === 0 ? [100, 50, 100] : 30)
    }

    if (nextCount % target === 0) {
      setIsMilestoneReached(true)
      playMilestoneSound()
      setTimeout(() => setIsMilestoneReached(false), 1500)
    } else {
      playClickSound()
    }
  }

  const handleReset = () => {
    setCount(0)
  }

  const handleSelectPreset = (preset: TasbihPreset) => {
    setSelectedPreset(preset)
    setTarget(preset.defaultTarget)
    setCount(0)
  }

  const progressPercent = Math.min(100, Math.round((count / target) * 100))

  return (
    <div className="space-y-8">
      {/* Preset Selector Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {TASBIH_PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-2 ring-emerald-500/20"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
              }`}
            >
              <span>{preset.transliterationBn}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Tasbih Unit */}
      <div className="mx-auto max-w-md rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/90 sm:p-8">
        {/* Active Dhikr Display */}
        <div className="text-center">
          <p className="arabic text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100" dir="rtl">
            {selectedPreset.arabic}
          </p>
          <h2 className="mt-2 text-lg font-bold text-emerald-700 dark:text-emerald-400">
            {selectedPreset.transliterationBn}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {selectedPreset.meaningBn}
          </p>
        </div>

        {/* Circular Progress & Tap Button */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer Progress Ring */}
            <svg className="h-64 w-64 -rotate-90 transform" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-stone-100 dark:stroke-stone-800"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-emerald-600 transition-all duration-200"
                strokeWidth="12"
                strokeDasharray={691}
                strokeDashoffset={691 - (691 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Tap Action Center */}
            <button
              onClick={handleIncrement}
              className={`absolute flex h-48 w-48 flex-col items-center justify-center rounded-full border-4 border-emerald-500/20 bg-gradient-to-b from-stone-50 to-stone-100 shadow-2xl transition-all duration-150 active:scale-95 dark:from-stone-800 dark:to-stone-900 ${
                isMilestoneReached ? "ring-8 ring-amber-400/50" : ""
              }`}
            >
              <span className="text-5xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                {count}
              </span>
              <span className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                লক্ষ্য: {target}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                ট্যাপ করুন (Tap)
              </span>
            </button>
          </div>
        </div>

        {/* Milestone Indicator */}
        {isMilestoneReached && (
          <div className="mb-4 animate-bounce rounded-2xl bg-amber-100 p-3 text-center text-xs font-bold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
            ✨ আলহামদুলিল্লাহ! আপনি {target} বারের চক্র সম্পন্ন করেছেন!
          </div>
        )}

        {/* Target Buttons (33, 100, 1000) */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-stone-500 mr-1">টার্গেট:</span>
          {[33, 100, 300, 1000].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t)
                setCount(0)
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                target === t
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bottom Utility Controls */}
        <div className="flex items-center justify-between border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "শব্দ বন্ধ করুন" : "শব্দ চালু করুন"}
              className={`rounded-xl p-2.5 text-xs font-semibold transition-colors ${
                soundEnabled
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setVibrateEnabled(!vibrateEnabled)}
              title={vibrateEnabled ? "ভাইব্রেশন বন্ধ করুন" : "ভাইব্রেশন চালু করুন"}
              className={`rounded-xl p-2.5 text-xs font-semibold transition-colors ${
                vibrateEnabled
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <Vibrate className="h-4 w-4" />
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-1.5 rounded-xl text-xs font-bold text-stone-600 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400"
          >
            <RotateCcw className="h-3.5 w-3.5" /> রিসেট
          </Button>
        </div>
      </div>

      {/* Lifetime Stats & Dhikr Benefits */}
      <div className="mx-auto max-w-md space-y-4">
        {/* Total Dhikr Tracker */}
        <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white/70 p-4 backdrop-blur dark:border-stone-800/80 dark:bg-stone-900/70">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                মোট মোট পঠিত যিকির
              </p>
              <p className="text-[11px] text-stone-500">আপনার ডিভাইসে সংরক্ষিত মোট সংখ্যা</p>
            </div>
          </div>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {totalLifetimeCount}
          </span>
        </div>

        {/* Selected Dhikr Virtue Card */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
            <Sparkles className="h-4 w-4 text-amber-500" />
            এই যিকিরের বিশেষ ফজিলত:
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
            {selectedPreset.benefitBn}
          </p>
        </div>
      </div>
    </div>
  )
}
