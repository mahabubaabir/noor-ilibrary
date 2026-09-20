"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { PROPHETS_DATA, type ProphetCosmosNode } from "@/lib/prophets-data"
import Link from "next/link"
import {
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  X,
  BookOpen,
  Compass,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"


export function Prophets3DCosmos() {
  const [selectedProphet, setSelectedProphet] = useState<ProphetCosmosNode | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [zoom, setZoom] = useState(1.0)
  const [rotation, setRotation] = useState({ x: 12, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging) return

    const tick = () => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.18) % 360,
      }))
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isAutoRotating, isDragging])

  // Mouse drag handlers for multi-direction 3D movement
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setRotation((prev) => ({
      // Pitch (clamp between -60 and +60 to keep view balanced)
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.35)),
      // Yaw (360 continuous rotation)
      y: (prev.y + dx * 0.45) % 360,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => setIsDragging(false)

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0]!.clientX, y: e.touches[0]!.clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const dx = e.touches[0]!.clientX - dragStart.x
    const dy = e.touches[0]!.clientY - dragStart.y

    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.4)),
      y: (prev.y + dx * 0.5) % 360,
    }))

    setDragStart({ x: e.touches[0]!.clientX, y: e.touches[0]!.clientY })
  }

  const handleTouchEnd = () => setIsDragging(false)

  // Reset to Center
  const resetToCenter = () => {
    setRotation({ x: 12, y: 0 })
    setZoom(1.0)
    setSelectedProphet(PROPHETS_DATA[0] || null)
  }

  // Calculate 3D Cartesian coordinates (X, Y, Z) from spherical orbit
  const calculate3DPosition = useCallback(
    (orbitRadius: number, orbitAngleDeg: number, elevationDeg: number) => {
      if (orbitRadius === 0) return { x: 0, y: 0, z: 0 }

      const phi = (elevationDeg * Math.PI) / 180
      const theta = (orbitAngleDeg * Math.PI) / 180

      const x = orbitRadius * Math.cos(phi) * Math.sin(theta)
      const y = -orbitRadius * Math.sin(phi) // inverted Y for web space
      const z = orbitRadius * Math.cos(phi) * Math.cos(theta)

      return { x, y, z }
    },
    []
  )

  const centerProphet = PROPHETS_DATA[0]!

  return (
    <section className="relative my-12 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 p-4 text-white shadow-2xl transition-all duration-300 dark:border-neutral-800 sm:p-8">
      {/* Top Header & Interactive 3D Controls */}
      <div className="relative z-20 flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 animate-spin text-white" />
            <span>৩ডি বহুমুখী স্পেসিয়াল ক্যানভাস</span>
          </div>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
            নবীদের জীবনী — ৩ডি মহাকাশীয় আবর্তন
          </h2>

          <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
            কেন্দ্রে রয়েছেন বিশ্বনবী হযরত মুহাম্মদ ﷺ। মাউস দিয়ে টেনে যেকোনো দিকে ঘুরিয়ে নবীদের জীবনাদর্শ অন্বেষণ করুন।
          </p>
        </div>

        {/* 3D View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? "ঘূর্ণন থামান" : "স্বয়ংক্রিয় ঘূর্ণন চালু"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
          >
            {isAutoRotating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? "থামান" : "ঘুরান"}</span>
          </button>

          <button
            onClick={() => setZoom((prev) => Math.min(1.6, prev + 0.15))}
            title="জুম ইন"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setZoom((prev) => Math.max(0.65, prev - 0.15))}
            title="জুম আউট"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={resetToCenter}
            title="কেন্দ্রে রিসেট করুন"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white bg-white px-3 py-2 text-xs font-bold text-black transition hover:bg-neutral-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>কেন্দ্রে নবীজি ﷺ</span>
          </button>
        </div>
      </div>

      {/* Main 3D Spatial Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`perspective-1200 relative h-[520px] w-full select-none overflow-hidden cursor-grab active:cursor-grabbing sm:h-[620px]`}
        style={{ touchAction: "none" }}
      >
        {/* Subtle Background Celestial Grid & Rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-[280px] w-[280px] rounded-full border border-dashed border-neutral-500 animate-[spin_60s_linear_infinite]" />
          <div className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-neutral-600 animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute h-[760px] w-[760px] rounded-full border border-neutral-800" />
        </div>

        {/* The 3D Rotating World Matrix */}
        <div
          className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0 transition-transform duration-75 ease-out"
          style={{
            transform: `scale3d(${zoom}, ${zoom}, ${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* CENTER NODE: PROPHET MUHAMMAD ﷺ */}
          <div
            className="preserve-3d absolute -left-28 -top-28 z-30 flex h-56 w-56 flex-col items-center justify-center text-center"
            style={{
              transform: `translate3d(0px, 0px, 0px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
            }}
          >
            {/* Radiant Glowing Concentric Rings */}
            <div className="pointer-events-none absolute inset-0 -m-6 animate-pulse rounded-full border border-white/20" />
            <div className="pointer-events-none absolute inset-0 -m-12 animate-ping rounded-full border border-white/10 opacity-30 duration-1000" />

            <button
              onClick={() => setSelectedProphet(centerProphet)}
              className="group relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-white bg-black p-4 text-white shadow-[0_0_50px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[0_0_70px_rgba(255,255,255,0.6)]"
            >
              <div className="absolute -top-3 rounded-full border border-neutral-700 bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black shadow">
                কেন্দ্র • Center
              </div>

              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-neutral-200">
                مُحَمَّدٌ ﷺ
              </span>
              <span className="mt-1 text-xs font-bold text-neutral-100">
                হযরত মুহাম্মদ ﷺ
              </span>
              <span className="mt-0.5 text-[10px] text-neutral-400">
                রাহমাতুল্লিল আলামীন
              </span>

              <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-neutral-300 group-hover:text-white">
                <span>জীবনগাঁথা দেখুন</span>
                <ChevronRight className="h-2.5 w-2.5" />
              </div>
            </button>
          </div>

          {/* SURROUNDING ORBITAL PROPHETS */}
          {PROPHETS_DATA.slice(1).map((prophet) => {
            const { x, y, z } = calculate3DPosition(
              prophet.orbitRadius,
              prophet.orbitAngle,
              prophet.elevation
            )

            // Billboard effect: invert camera rotation so text always faces viewer
            const billboardTransform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`

            return (
              <div
                key={prophet.id}
                className="preserve-3d absolute -left-16 -top-16 z-20 h-32 w-32"
                style={{
                  transform: billboardTransform,
                }}
              >
                <button
                  onClick={() => setSelectedProphet(prophet)}
                  className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900/90 p-3 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:z-50 hover:scale-115 hover:border-white hover:bg-neutral-800 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  <span className="font-serif text-xs text-neutral-400 group-hover:text-neutral-200">
                    {prophet.nameAr}
                  </span>
                  <span className="mt-1 text-xs font-bold text-white group-hover:text-neutral-100">
                    {prophet.nameBn}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-[9px] text-neutral-400">
                    {prophet.titleBn.split("•")[0]}
                  </span>

                  <span className="mt-1.5 inline-flex items-center rounded-full border border-neutral-700 px-1.5 py-0.2 text-[8px] text-neutral-400 group-hover:border-neutral-500 group-hover:text-white">
                    বিস্তারিত &rarr;
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Drag Helper Guide Overlay on Bottom Left */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-[11px] text-neutral-400 backdrop-blur-sm">
          <span>মাউস বা স্পর্শ দিয়ে ৩৬০° কোণে ঘুরান • জুম করতে স্ক্রল করুন</span>
        </div>
      </div>

      {/* DETAILED PROPHET MODAL / DRAWER */}
      {selectedProphet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-neutral-700 bg-neutral-950 p-6 text-white shadow-2xl dark:border-neutral-700 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProphet(null)}
              className="absolute right-5 top-5 rounded-full border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-semibold text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>{selectedProphet.isCenter ? "সর্বশ্রেষ্ঠ ও সর্বশেষ নবী" : "পবিত্র কুরআনের মহান নবী"}</span>
            </div>

            {/* Prophet Names & Title */}
            <div className="mt-4">
              <p className="font-serif text-2xl text-neutral-400 sm:text-3xl">
                {selectedProphet.nameAr}
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {selectedProphet.nameBn}
              </h3>
              <p className="mt-1 text-sm font-semibold text-neutral-300">
                {selectedProphet.titleBn}
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="mt-4 grid grid-cols-1 gap-2 border-y border-neutral-800 py-3 sm:grid-cols-2 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-500">ঐতিহাসিক যুগ:</span> {selectedProphet.eraBn}
              </div>
              <div>
                <span className="text-neutral-500">কুরআনে উল্লেখ:</span> {selectedProphet.quranMentions}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                জীবনগাঁথা ও ভূমিকা
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {selectedProphet.summaryBn}
              </p>
            </div>

            {/* Key Life Lessons */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                আমাদের জীবনের শিক্ষা
              </h4>
              <ul className="mt-3 space-y-2">
                {selectedProphet.lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-xs text-neutral-200"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-white" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-neutral-800 pt-5">
              <button
                onClick={() => setSelectedProphet(null)}
                className="rounded-xl border border-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
              >
                বন্ধ করুন
              </button>

              <Link
                href={`/prophets/${selectedProphet.id}`}
                onClick={() => setSelectedProphet(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-neutral-200"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>সম্পূর্ণ কাহিনী পড়ুন</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
