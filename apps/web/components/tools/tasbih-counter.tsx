"use client"

import React, { useState, useEffect } from "react"
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  Sparkles,
  Award,
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
                  ? "border border-neutral-900 bg-neutral-900 text-white shadow-md dark:border-white dark:bg-white dark:text-black"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <span>{preset.transliterationBn}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Tasbih Unit */}
      <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        {/* Active Dhikr Display */}
        <div className="text-center">
          <p className="arabic text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white" dir="rtl">
            {selectedPreset.arabic}
          </p>
          <h2 className="mt-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {selectedPreset.transliterationBn}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
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
                className="stroke-neutral-100 dark:stroke-neutral-800"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-neutral-900 transition-all duration-200 dark:stroke-white"
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
              className={`absolute flex h-48 w-48 flex-col items-center justify-center rounded-full border-4 border-neutral-200 bg-neutral-50 shadow-2xl transition-all duration-150 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 ${
                isMilestoneReached ? "ring-8 ring-neutral-400/50 dark:ring-neutral-500/50" : ""
              }`}
            >
              <span className="text-5xl font-black tracking-tight text-neutral-900 dark:text-white font-mono">
                {count}
              </span>
              <span className="mt-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                লক্ষ্য: {target}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                ট্যাপ করুন (Tap)
              </span>
            </button>
          </div>
        </div>

        {/* Milestone Indicator */}
        {isMilestoneReached && (
          <div className="mb-4 animate-bounce rounded-2xl border border-neutral-300 bg-neutral-100 p-3 text-center text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
            ✨ আলহামদুলিল্লাহ! আপনি {target} বারের চক্র সম্পন্ন করেছেন!
          </div>
        )}

        {/* Target Buttons (33, 100, 300, 1000) */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-neutral-500 mr-1">টার্গেট:</span>
          {[33, 100, 300, 1000].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t)
                setCount(0)
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                target === t
                  ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-black"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bottom Utility Controls */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-900">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "শব্দ বন্ধ করুন" : "শব্দ চালু করুন"}
              className={`rounded-xl p-2.5 text-xs font-semibold transition-colors ${
                soundEnabled
                  ? "border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setVibrateEnabled(!vibrateEnabled)}
              title={vibrateEnabled ? "ভাইব্রেশন বন্ধ করুন" : "ভাইব্রেশন চালু করুন"}
              className={`rounded-xl p-2.5 text-xs font-semibold transition-colors ${
                vibrateEnabled
                  ? "border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Vibrate className="h-4 w-4" />
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-1.5 rounded-xl text-xs font-bold text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" /> রিসেট
          </Button>
        </div>
      </div>

      {/* Lifetime Stats & Dhikr Benefits */}
      <div className="mx-auto max-w-md space-y-4">
        {/* Total Dhikr Tracker */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">
                মোট পঠিত যিকির
              </p>
              <p className="text-[11px] text-neutral-500">আপনার ডিভাইসে সংরক্ষিত মোট সংখ্যা</p>
            </div>
          </div>
          <span className="text-lg font-black text-neutral-900 dark:text-white font-mono">
            {totalLifetimeCount}
          </span>
        </div>

        {/* Selected Dhikr Virtue Card */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-neutral-900 dark:text-white" />
            <span>এই যিকিরের বিশেষ ফজিলত:</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            {selectedPreset.benefitBn}
          </p>
        </div>
      </div>
    </div>
  )
}
