"use client"

import React, { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { PRAYER_NAMES, formatTo12Hour, type PrayerTimesData } from "@/lib/prayer-times"

export function HeaderSalahPill() {
  const [data, setData] = useState<PrayerTimesData | null>(null)

  useEffect(() => {
    fetch("/api/prayer-times?city=Dhaka&country=Bangladesh")
      .then((r) => r.json())
      .then((d) => {
        if (d?.timings) setData(d)
      })
      .catch(() => {})
  }, [])

  if (!data?.nextPrayer) return null

  const nextName = PRAYER_NAMES[data.nextPrayer.nameEn]?.bn || data.nextPrayer.nameEn
  const formattedTime = formatTo12Hour(data.nextPrayer.time)

  return (
    <div
      title={`পরবর্তী ওয়াক্ত: ${nextName} (${formattedTime}) • ${data.city}`}
      className="hidden xl:flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/80 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300"
    >
      <Clock className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
      <span>{nextName}: <span className="font-mono text-neutral-900 dark:text-white">{formattedTime}</span></span>
    </div>
  )
}
