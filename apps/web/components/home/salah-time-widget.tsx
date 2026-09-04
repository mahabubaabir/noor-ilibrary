"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import {
  Clock,
  MapPin,
  RefreshCw,
  Navigation,
  Globe2,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react"
import {
  type PrayerTimesData,
  PRAYER_NAMES,
  formatTo12Hour,
  calculateNextPrayer,
  toBengaliNumerals,
} from "@/lib/prayer-times"

const PRESET_CITIES = [
  { city: "Dhaka", country: "Bangladesh", labelBn: "ঢাকা, বাংলাদেশ" },
  { city: "Chittagong", country: "Bangladesh", labelBn: "চট্টগ্রাম, বাংলাদেশ" },
  { city: "Sylhet", country: "Bangladesh", labelBn: "সিলেট, বাংলাদেশ" },
  { city: "Makkah", country: "Saudi Arabia", labelBn: "মক্কা মুকাররমা" },
  { city: "Madinah", country: "Saudi Arabia", labelBn: "মদিনা মুনাওয়ারা" },
  { city: "London", country: "United Kingdom", labelBn: "লন্ডন, যুক্তরাজ্য" },
  { city: "New York", country: "United States", labelBn: "নিউইয়র্ক, যুক্তরাষ্ট্র" },
  { city: "Dubai", country: "United Arab Emirates", labelBn: "দুবাই, ইউএই" },
  { city: "Kuala Lumpur", country: "Malaysia", labelBn: "কুয়ালালামপুর" },
  { city: "Istanbul", country: "Turkey", labelBn: "ইস্তাম্বুল, তুরস্ক" },
]

export function SalahTimeWidget() {
  const [data, setData] = useState<PrayerTimesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [detectingLocation, setDetectingLocation] = useState(false)
  const [locationName, setLocationName] = useState("ঢাকা, বাংলাদেশ")
  const [selectedCity, setSelectedCity] = useState("Dhaka")
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [countdown, setCountdown] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchPrayerTimes = useCallback(
    async (params: { lat?: number; lng?: number; city?: string; country?: string; locName?: string }) => {
      setLoading(true)
      try {
        const q = new URLSearchParams()
        if (params.lat && params.lng) {
          q.set("lat", String(params.lat))
          q.set("lng", String(params.lng))
          if (params.locName) q.set("locationName", params.locName)
        } else {
          q.set("city", params.city || selectedCity)
          q.set("country", params.country || selectedCountry)
        }

        const res = await fetch(`/api/prayer-times?${q.toString()}`)
        const json = await res.json()
        if (json && json.timings) {
          setData(json)
          if (params.locName) {
            setLocationName(params.locName)
          } else {
            const found = PRESET_CITIES.find((c) => c.city.toLowerCase() === (params.city || selectedCity).toLowerCase())
            setLocationName(found ? found.labelBn : `${json.city}, ${json.country}`)
          }
        }
      } catch (err) {
        console.warn("[SALAH WIDGET] Fetch error:", err)
      } finally {
        setLoading(false)
      }
    },
    [selectedCity, selectedCountry]
  )

  // Initial load
  useEffect(() => {
    fetchPrayerTimes({ city: selectedCity, country: selectedCountry })
  }, [fetchPrayerTimes, selectedCity, selectedCountry])

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto detect location via HTML5 Geolocation API
  const handleAutoDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়।")
      return
    }

    setDetectingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        // Reverse geocoding via free open-street-map nominatim or display coords
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            { headers: { "Accept-Language": "bn,en" } }
          )
          const geoData = await geoRes.json()
          const detectedCity =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.state_district ||
            geoData.address?.state ||
            "অটো-ডিটেক্টেড অবস্থান"
          const detectedCountry = geoData.address?.country || ""
          const fullLoc = `${detectedCity}${detectedCountry ? `, ${detectedCountry}` : ""}`
          setLocationName(fullLoc)
          fetchPrayerTimes({
            lat: latitude,
            lng: longitude,
            locName: fullLoc,
          })
        } catch {
          const locName = `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`
          setLocationName(locName)
          fetchPrayerTimes({
            lat: latitude,
            lng: longitude,
            locName,
          })
        } finally {
          setDetectingLocation(false)
        }
      },
      (error) => {
        console.warn("Geolocation denied/failed:", error.message)
        setDetectingLocation(false)
        // Fallback to Dhaka
        fetchPrayerTimes({ city: "Dhaka", country: "Bangladesh" })
      },
      { timeout: 7000, enableHighAccuracy: true }
    )
  }

  // Live countdown timer ticking every second
  useEffect(() => {
    if (!data?.timings) return

    const tick = () => {
      const { nextPrayer } = calculateNextPrayer(data.timings, new Date())
      const hrs = Math.floor(nextPrayer.remainingSeconds / 3600)
      const mins = Math.floor((nextPrayer.remainingSeconds % 3600) / 60)
      const secs = nextPrayer.remainingSeconds % 60
      const formatted = `${hrs > 0 ? `${hrs}ঘণ্টা ` : ""}${mins}মিনিট ${secs}সেকেন্ড`
      setCountdown(toBengaliNumerals(formatted))
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [data?.timings])

  const prayersList = [
    { key: "Fajr", nameBn: "ফজর", nameAr: "الفجر" },
    { key: "Sunrise", nameBn: "সূর্যোদয়", nameAr: "الشروق", isSunrise: true },
    { key: "Dhuhr", nameBn: "যোহর", nameAr: "الظهر" },
    { key: "Asr", nameBn: "আসর", nameAr: "العصر" },
    { key: "Maghrib", nameBn: "মাগরিব", nameAr: "المغرب" },
    { key: "Isha", nameBn: "ইশা", nameAr: "العشاء" },
  ]

  const currentPrayerKey = data?.currentPrayer?.nameEn || "Fajr"
  const nextPrayerKey = data?.nextPrayer?.nameEn || "Dhuhr"

  return (
    <section className="my-10 w-full">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        
        {/* Header: Title, Live Indicator & Location Selector */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 animate-pulse dark:bg-white" />
                Live Salah Times
              </span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
                • ওপেন এপিআই সিঙ্ক (Open API)
              </span>
            </div>
            
            <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
              দৈনিক নামাজের সময়সূচী ও সালাত ট্র্যাকার
            </h2>
            
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
              {data?.date ? (
                <>
                  {data.date.gregorian} • {toBengaliNumerals(data.date.hijri.day)}{" "}
                  {data.date.hijri.monthEn} {toBengaliNumerals(data.date.hijri.year)} হিজরি
                </>
              ) : (
                "নামাজের সঠিক ওয়াক্ত ও রিয়েল-টাইম ওপেন এপিআই সিঙ্ক"
              )}
            </p>
          </div>

          {/* Location Controls */}
          <div className="flex flex-wrap items-center gap-2" ref={dropdownRef}>
            {/* Auto GPS Detection Button */}
            <button
              onClick={handleAutoDetectLocation}
              disabled={detectingLocation || loading}
              title="আমার অবস্থান চিহ্নিত করুন (Auto-detect location)"
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-800 transition-all hover:bg-neutral-100 active:scale-95 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Navigation className={`h-3.5 w-3.5 ${detectingLocation ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">স্বয়ংক্রিয় অবস্থান</span>
            </button>

            {/* City Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-900 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="max-w-[130px] truncate sm:max-w-[170px]">{locationName}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>

              {/* City Selection Dropdown Panel */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                    স্থান পরিবর্তন করুন
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {PRESET_CITIES.map((c) => {
                      const isSelected = selectedCity.toLowerCase() === c.city.toLowerCase()
                      return (
                        <button
                          key={c.city}
                          onClick={() => {
                            setSelectedCity(c.city)
                            setSelectedCountry(c.country)
                            setLocationName(c.labelBn)
                            setDropdownOpen(false)
                            fetchPrayerTimes({ city: c.city, country: c.country, locName: c.labelBn })
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                            isSelected
                              ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                              : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          }`}
                        >
                          <span>{c.labelBn}</span>
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Manual Sync Button */}
            <button
              onClick={() => fetchPrayerTimes({ city: selectedCity, country: selectedCountry })}
              disabled={loading}
              title="রিফ্রেশ করুন"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition-all hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Live Next Prayer Alert Banner */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  পরবর্তী ওয়াক্ত: {PRAYER_NAMES[nextPrayerKey]?.bn || nextPrayerKey}
                </span>
                <span className="rounded-md border border-neutral-300 px-1.5 py-0.2 text-[10px] font-mono text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                  {data?.timings ? formatTo12Hour(data.timings[nextPrayerKey as keyof typeof data.timings] || "") : "--:--"}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                বাকি রয়েছে:{" "}
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {countdown || "হিসাব হচ্ছে..."}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
            <Globe2 className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-300" />
            <span>সোর্স: {data?.meta?.source || "Aladhan Open API"}</span>
          </div>
        </div>

        {/* Prayer Times Grid (Monochrome Minimalism) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {prayersList.map((prayer) => {
            const rawTime = data?.timings?.[prayer.key as keyof typeof data.timings] || ""
            const formattedTime = rawTime ? formatTo12Hour(rawTime) : "--:--"
            const isNext = prayer.key === nextPrayerKey
            const isCurrent = prayer.key === currentPrayerKey && !prayer.isSunrise

            return (
              <div
                key={prayer.key}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                  isNext
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-md dark:border-white dark:bg-white dark:text-black"
                    : isCurrent
                    ? "border-neutral-400 bg-neutral-100 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800/80 dark:text-white"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:text-neutral-200 dark:hover:border-neutral-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isNext
                          ? "text-neutral-300 dark:text-neutral-700"
                          : "text-neutral-600 dark:text-neutral-300"
                      }`}
                    >
                      {prayer.nameBn}
                    </span>
                    <span
                      className={`font-serif text-sm ${
                        isNext ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-600 dark:text-neutral-300"
                      }`}
                    >
                      {prayer.nameAr}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-lg font-black tracking-tight sm:text-xl font-mono">
                      {loading && !rawTime ? (
                        <span className="inline-block h-6 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                      ) : (
                        formattedTime
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-200/40 dark:border-neutral-700/40 flex items-center justify-between text-[10px]">
                  {isNext ? (
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> পরবর্তী ওয়াক্ত
                    </span>
                  ) : isCurrent ? (
                    <span className="font-semibold text-neutral-600 dark:text-neutral-300">
                      চলমান ওয়াক্ত
                    </span>
                  ) : prayer.isSunrise ? (
                    <span className="text-neutral-600 dark:text-neutral-300">
                      সূর্যোদয়
                    </span>
                  ) : (
                    <span className="text-neutral-600 dark:text-neutral-300">
                      ওয়াক্ত
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
