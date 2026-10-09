"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { COMPANIONS_COLLECTION, type CompanionItem } from "@/lib/companions-data"
import {
  X,
  ArrowRight,
  Compass,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Languages,
  Sparkles,
} from "lucide-react"

interface Props {
  initialCompanions?: CompanionItem[]
}

// The Prophet ﷺ is the radiant hub of the neural constellation.
const PROPHET_NODE = {
  id: "prophet-muhammad",
  slug: "prophet-muhammad",
  nameBn: "মুহাম্মদ ﷺ",
  nameEn: "Muhammad ﷺ",
  arabicName: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
  titleBn: "সর্বশেষ নবী ও রাসূল",
  titleEn: "The Final Messenger",
  shortBioBn:
    "মুহাম্মদ ﷺ হলেন ইসলামের সর্বশেষ নবী ও রাসূল। তিনি সমগ্র মানবজাতির জন্য রহমতস্বরূপ প্রেরিত হয়েছেন। তাঁর মাধ্যমেই আল্লাহ তাআলা পূর্ণাঙ্গ দ্বীন ইসলাম এবং সর্বশেষ আসমানী কিতাব আল-কুরআন নাযিল করেছেন।",
  shortBioEn:
    "Muhammad ﷺ is the final Prophet and Messenger of Islam. He was sent as a mercy to all mankind. Through him, Allah revealed the complete religion of Islam and the final revelation, the Quran.",
  keyAttributesBn: ["সর্বশ্রেষ্ঠ মানব", "খাতামুন নাবিয়্যীন"],
  keyAttributesEn: ["Greatest of Mankind", "Seal of the Prophets"],
  category: "prominent" as CompanionItem["category"],
  categoryLabelBn: "নবী",
  categoryLabelEn: "Prophet",
  era: "570 CE - 632 CE",
  readTime: "20 min",
  lifeLessonsBn: [],
  lifeLessonsEn: [],
  sectionsBn: [],
  sectionsEn: [],
} as unknown as CompanionItem

interface OrbitNode {
  companion: CompanionItem
  /** Base angle on the constellation ring (degrees). */
  theta: number
  /** Ring radius in px. */
  radius: number
  /** Vertical offset for a layered, spherical feel. */
  elevation: number
}

interface ProjectedNode {
  id: string
  x: number
  y: number
  depth: number
  scale: number
}

export function CompanionsNeuralCosmos({ initialCompanions = [] }: Props) {
  const companions = useMemo(
    () => (initialCompanions.length > 0 ? initialCompanions : COMPANIONS_COLLECTION),
    [initialCompanions]
  )

  const [selectedCompanion, setSelectedCompanion] = useState<CompanionItem | null>(null)
  const [language, setLanguage] = useState<"bn" | "en">("bn")
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodeElsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const frameRef = useRef<number | null>(null)
  const didDragRef = useRef(false)

  // Live simulation refs (kept out of React state to avoid re-render churn).
  const rotationRef = useRef(0)
  const tiltRef = useRef(0)
  const zoomRef = useRef(1)
  const autoRef = useRef(true)
  const draggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const parallaxRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    autoRef.current = isAutoRotating
  }, [isAutoRotating])

  useEffect(() => {
    draggingRef.current = isDragging
  }, [isDragging])

  // Deterministic golden-angle distribution across two rings - stable for a
  // given number of companions, no random reshuffling between renders.
  const orbitNodes: OrbitNode[] = useMemo(() => {
    const GOLDEN = 137.508
    return companions.map((companion, i) => ({
      companion,
      theta: (i * GOLDEN) % 360,
      radius: i % 2 === 0 ? 200 + (i % 3) * 34 : 300 + (i % 3) * 30,
      elevation: ((i % 5) - 2) * 34,
    }))
  }, [companions])

  const resetToCenter = useCallback(() => {
    rotationRef.current = 0
    tiltRef.current = 0
    zoomRef.current = 1
  }, [])

  // Drag handlers: horizontal drag spins the constellation, vertical drag
  // tilts it (changing the ellipse squash of the rings).
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    didDragRef.current = false
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    if (Math.abs(dx) + Math.abs(dy) > 4) didDragRef.current = true
    rotationRef.current += dx * 0.35
    tiltRef.current = Math.max(-0.9, Math.min(0.9, tiltRef.current + dy * 0.004))
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleMouseLeave = () => {
    setIsDragging(false)
    mouseRef.current = { ...mouseRef.current, active: false }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      didDragRef.current = false
      dragStartRef.current = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const dx = e.touches[0]!.clientX - dragStartRef.current.x
    const dy = e.touches[0]!.clientY - dragStartRef.current.y
    if (Math.abs(dx) + Math.abs(dy) > 4) didDragRef.current = true
    rotationRef.current += dx * 0.4
    tiltRef.current = Math.max(-0.9, Math.min(0.9, tiltRef.current + dy * 0.005))
    dragStartRef.current = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
  }

  const handleTouchEnd = () => setIsDragging(false)

  const openCompanion = (companion: CompanionItem) => {
    // Suppress the accidental click that ends a drag gesture.
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    setSelectedCompanion(companion)
  }

  // ===== Neuron simulation loop =====
  // Drives both the DOM nodes and the canvas filaments from the same
  // positions every frame, so lines always connect the nodes exactly.
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = container.clientWidth
    let height = container.clientHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    resize()
    window.addEventListener("resize", resize)

    const projected: ProjectedNode[] = []

    const render = () => {
      const cx = width / 2
      const cy = height / 2

      // Advance auto-rotation and damp pointer parallax.
      if (autoRef.current && !draggingRef.current) {
        rotationRef.current += 0.12
      }
      const parallax = parallaxRef.current
      if (mouseRef.current.active) {
        const tx = (mouseRef.current.x - cx) * 0.035
        const ty = (mouseRef.current.y - cy) * 0.035
        parallax.x += (tx - parallax.x) * 0.06
        parallax.y += (ty - parallax.y) * 0.06
      } else {
        parallax.x += (0 - parallax.x) * 0.04
        parallax.y += (0 - parallax.y) * 0.04
      }

      const squash = 0.5 - tiltRef.current * 0.35
      const zoom = zoomRef.current
      // Keep the constellation inside the viewport on narrow/mobile screens.
      const radiusScale = Math.min(1, Math.max(0.55, width / 950))

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      projected.length = 0

      // === Project every companion onto the spinning ring ===
      for (const node of orbitNodes) {
        const rad = ((node.theta + rotationRef.current) * Math.PI) / 180
        const depth = Math.sin(rad) // -1 back .. +1 front
        const r = node.radius * zoom * radiusScale
        const x = cx + Math.cos(rad) * r + parallax.x
        const y = cy + depth * r * squash + node.elevation * zoom * radiusScale + parallax.y
        const scale = 0.78 + ((depth + 1) / 2) * 0.32

        projected.push({ id: node.companion.id, x, y, depth, scale })

        const el = nodeElsRef.current.get(node.companion.id)
        if (el) {
          el.style.transform = `translate3d(${(x - cx).toFixed(1)}px, ${(y - cy).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
          el.style.zIndex = String(100 + Math.round(depth * 50))
          el.style.opacity = String(0.55 + ((depth + 1) / 2) * 0.45)
        }
      }

      // Prophet ﷺ stays at the center hub.
      const prophetEl = nodeElsRef.current.get("prophet-muhammad")
      if (prophetEl) {
        prophetEl.style.transform = `translate3d(${parallax.x.toFixed(1)}px, ${parallax.y.toFixed(1)}px, 0)`
        prophetEl.style.zIndex = "200"
      }

      // === Draw neuron filaments between nearby nodes ===
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i]!
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 175
          if (dist < maxDist) {
            const strength = 1 - dist / maxDist
            const depthFade = 0.35 + ((a.depth + b.depth) / 2 + 1) * 0.2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${(strength * 0.3 * depthFade).toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // === Hub dendrites: the Prophet ﷺ connects outward ===
      for (const p of projected) {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 420
        if (dist < maxDist) {
          ctx.beginPath()
          ctx.moveTo(cx + parallax.x, cy + parallax.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${((1 - dist / maxDist) * 0.18).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // === Cursor synapses: filaments reach toward the pointer ===
      const mouse = mouseRef.current
      if (mouse.active) {
        for (const p of projected) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 230
          if (dist < maxDist) {
            const strength = 1 - dist / maxDist
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${(strength * 0.55).toFixed(3)})`
            ctx.lineWidth = 0.9
            ctx.stroke()

            // Slight synaptic spark at the node the cursor is closest to
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3.2 * p.scale + strength * 2.4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${(strength * 0.5).toFixed(3)})`
            ctx.fill()
          }
        }

        // Cursor halo
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        halo.addColorStop(0, "rgba(255, 255, 255, 0.10)")
        halo.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = halo
        ctx.fillRect(mouse.x - 90, mouse.y - 90, 180, 180)
      }

      // === Neuron bodies ===
      for (const p of projected) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.1 * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.3 + ((p.depth + 1) / 2) * 0.5).toFixed(3)})`
        ctx.fill()
      }

      // Central hub nucleus
      ctx.beginPath()
      ctx.arc(cx + parallax.x, cy + parallax.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
      ctx.fill()

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [orbitNodes])

  const handleZoom = (delta: number) => {
    zoomRef.current = Math.max(0.65, Math.min(1.6, zoomRef.current + delta))
  }

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 text-white shadow-2xl dark:border-neutral-800">
      {/* Header & Controls */}
      <div className="relative z-30 flex flex-col gap-4 border-b border-neutral-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 animate-spin text-white" />
            <span>নিউরাল কসমস • ৩ডি ইন্টারঅ্যাকটিভ</span>
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
            রাসূলুল্লাহ ﷺ ও চারপাশের সাহাবীদের আলোকিত জীবন
          </h2>
          <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
            নিউরনের মতো জড়িয়ে থাকা নক্ষত্র-জালিকা — মাউস নাড়ালে সংযোগগুলো সাড়া দেয়, টেনে ঘুরিয়ে প্রতিটি
            সাহাবীর জীবনী খুলুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            title="ভাষা পরিবর্তন"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{language === "bn" ? "English" : "বাংলা"}</span>
          </button>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? "ঘূর্ণন থামান" : "স্বয়ংক্রিয় ঘূর্ণন চালু"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
          >
            {isAutoRotating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? "থামান" : "ঘুরান"}</span>
          </button>

          <button
            onClick={() => handleZoom(0.15)}
            title="জুম ইন"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => handleZoom(-0.15)}
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
            <span>রিসেট</span>
          </button>
        </div>
      </div>

      {/* Neural 3D Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative h-[560px] w-full cursor-grab select-none overflow-hidden active:cursor-grabbing sm:h-[680px]"
        style={{ touchAction: "none" }}
      >
        {/* Neuron filaments (canvas, behind the nodes) */}
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

        {/* Emanating hub rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-25">
          <div className="h-[300px] w-[300px] rounded-full border border-dashed border-neutral-600 animate-[spin_60s_linear_infinite]" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-700 animate-[spin_90s_linear_infinite_reverse]" />
        </div>

        {/* CENTER HUB: PROPHET MUHAMMAD ﷺ (anchored at container center) */}
        <div
          ref={(el) => {
            if (el) nodeElsRef.current.set("prophet-muhammad", el)
          }}
          className="absolute left-1/2 top-1/2 z-[200] h-0 w-0"
        >
          <button
            onClick={() => openCompanion(PROPHET_NODE)}
            className="group absolute -left-[104px] -top-[104px] flex h-52 w-52 flex-col items-center justify-center rounded-full border-2 border-white bg-black p-4 text-center text-white shadow-[0_0_60px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.6)]"
          >
            <span className="pointer-events-none absolute inset-0 -m-5 animate-pulse rounded-full border border-white/25" />
            <span className="pointer-events-none absolute inset-0 -m-10 animate-ping rounded-full border border-white/10 opacity-30 duration-1000" />
            <span className="absolute -top-3 rounded-full border border-neutral-700 bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black shadow">
              কেন্দ্র • Center
            </span>
            <span className="font-serif text-lg font-bold tracking-tight" dir="rtl">
              مُحَمَّدٌ ﷺ
            </span>
            <span className="mt-1 text-xs font-bold text-neutral-100">
              {language === "bn" ? "রাসূলুল্লাহ মুহাম্মদ ﷺ" : "Prophet Muhammad ﷺ"}
            </span>
            <span className="mt-0.5 text-[10px] text-neutral-400">
              {language === "bn" ? "রহমাতুল্লিল আলামীন" : "Mercy to all worlds"}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-neutral-300 group-hover:text-white">
              <span>{language === "bn" ? "জীবনগাঁথা দেখুন" : "View life story"}</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </button>
        </div>

        {/* ORBITING COMPANION NODES */}
        {orbitNodes.map((node) => {
          const companion = node.companion
          return (
            <div
              key={companion.id || companion.slug}
              ref={(el) => {
                if (el) nodeElsRef.current.set(companion.id, el)
                else nodeElsRef.current.delete(companion.id)
              }}
              className="absolute left-1/2 top-1/2 z-[100] h-0 w-0 will-change-transform"
            >
              <button
                onClick={() => openCompanion(companion)}
                className="group absolute -left-16 -top-16 flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900/90 p-2.5 text-center shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-neutral-800 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span className="font-serif text-[11px] text-neutral-400 group-hover:text-neutral-200" dir="rtl">
                  {companion.arabicName.split(" ")[0]}
                </span>
                <span className="mt-1 line-clamp-2 text-[11px] font-bold leading-tight text-white">
                  {language === "bn" ? companion.nameBn : companion.nameEn}
                </span>
                <span className="mt-1 line-clamp-1 text-[9px] text-neutral-400">
                  {(language === "bn" ? companion.titleBn : companion.titleEn).split("•")[0]}
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-neutral-700 px-1.5 py-0.5 text-[8px] text-neutral-400 group-hover:border-neutral-500 group-hover:text-white">
                  {language === "bn" ? "বিস্তারিত" : "Details"}
                  <ArrowRight className="h-2 w-2" />
                </span>
              </button>
            </div>
          )
        })}

        {/* Helper overlay */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-[300] rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-[11px] text-neutral-400 backdrop-blur-sm">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            মাউস নাড়ান — নিউরন সংযোগ জাগবে • টেনে ঘুরান • নোড ক্লিকে জীবনী
          </span>
        </div>
      </div>

      {/* COMPANION INFO MODAL POPUP */}
      {selectedCompanion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
            <button
              onClick={() => setSelectedCompanion(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

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

            <div className="my-6 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 dark:border-neutral-800/80 dark:bg-neutral-900/60">
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {language === "bn" ? selectedCompanion.shortBioBn : selectedCompanion.shortBioEn}
              </p>

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

            <div className="flex flex-col items-center justify-center gap-3">
              {selectedCompanion.slug && (
                <Link
                  href={
                    selectedCompanion.slug === "prophet-muhammad"
                      ? "/prophets/prophet-muhammad"
                      : `/companions/${selectedCompanion.slug}`
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900 px-6 py-3 text-center text-sm font-bold text-white shadow transition-all hover:bg-neutral-800 active:scale-95 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-72"
                >
                  <span>{language === "bn" ? "সম্পূর্ণ জীবনী পড়ুন" : "Read Full Story"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
