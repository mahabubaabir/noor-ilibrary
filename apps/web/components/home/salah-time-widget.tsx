"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import {
  Clock,
  MapPin,
  RefreshCw,
  Navigation,
  ChevronDown,
  Check,
  CheckCircle2,
  Circle,
  Sparkles,
  Award,
  RotateCcw,
  Ban,
} from "lucide-react"
import {
  type PrayerTimesData,
  type ProhibitedWindow,
  formatTo12Hour,
  calculateNextPrayer,
  getPrayerDisplayName,
  isJummahDay,
  toBengaliNumerals,
  getOfflinePrayerFallback,
  getProhibitedWindows,
  getActiveProhibitedWindow,
} from "@/lib/prayer-times"

const SALAH_LOCATION_KEY = "noor_salah_location_v1"

interface SavedLocation {
  mode: "gps" | "city" | "search"
  lat?: number
  lng?: number
  city?: string
  country?: string
  q?: string
  label?: string
}

interface CityPreset {
  city: string
  country?: string
  labelBn: string
  /** When set, the server resolves this free-text address (works even when
   *  the upstream city database lacks the local spelling). */
  search?: string
}

// All 64 district headquarters of Bangladesh - resolved through the address
// lookup so every district works, not just the big division cities.
const BD_DISTRICTS: CityPreset[] = [
  // Dhaka Division
  { city: "Dhaka", labelBn: "ঢাকা", search: "Dhaka, Bangladesh" },
  { city: "Faridpur", labelBn: "ফরিদপুর", search: "Faridpur, Bangladesh" },
  { city: "Gazipur", labelBn: "গাজীপুর", search: "Gazipur, Bangladesh" },
  { city: "Gopalganj", labelBn: "গোপালগঞ্জ", search: "Gopalganj, Bangladesh" },
  { city: "Kishoreganj", labelBn: "কিশোরগঞ্জ", search: "Kishoreganj, Bangladesh" },
  { city: "Madaripur", labelBn: "মাদারীপুর", search: "Madaripur, Bangladesh" },
  { city: "Manikganj", labelBn: "মানিকগঞ্জ", search: "Manikganj, Bangladesh" },
  { city: "Munshiganj", labelBn: "মুন্সিগঞ্জ", search: "Munshiganj, Bangladesh" },
  { city: "Narayanganj", labelBn: "নারায়ণগঞ্জ", search: "Narayanganj, Bangladesh" },
  { city: "Narsingdi", labelBn: "নরসিংদী", search: "Narsingdi, Bangladesh" },
  { city: "Rajbari", labelBn: "রাজবাড়ী", search: "Rajbari, Bangladesh" },
  { city: "Shariatpur", labelBn: "শরীয়তপুর", search: "Shariatpur, Bangladesh" },
  { city: "Tangail", labelBn: "টাঙ্গাইল", search: "Tangail, Bangladesh" },
  // Chattogram Division
  { city: "Bandarban", labelBn: "বান্দরবান", search: "Bandarban, Bangladesh" },
  { city: "Brahmanbaria", labelBn: "ব্রাহ্মণবাড়িয়া", search: "Brahmanbaria, Bangladesh" },
  { city: "Chandpur", labelBn: "চাঁদপুর", search: "Chandpur, Bangladesh" },
  { city: "Chittagong", labelBn: "চট্টগ্রাম", search: "Chattogram, Bangladesh" },
  { city: "Comilla", labelBn: "কুমিল্লা", search: "Comilla, Bangladesh" },
  { city: "Cox's Bazar", labelBn: "কক্সবাজার", search: "Cox's Bazar, Bangladesh" },
  { city: "Feni", labelBn: "ফেনী", search: "Feni, Bangladesh" },
  { city: "Khagrachhari", labelBn: "খাগড়াছড়ি", search: "Khagrachhari, Bangladesh" },
  { city: "Lakshmipur", labelBn: "লক্ষ্মীপুর", search: "Lakshmipur, Bangladesh" },
  { city: "Noakhali", labelBn: "নোয়াখালী", search: "Noakhali, Bangladesh" },
  { city: "Rangamati", labelBn: "রাঙ্গামাটি", search: "Rangamati, Bangladesh" },
  // Rajshahi Division
  { city: "Bogra", labelBn: "বগুড়া", search: "Bogura, Bangladesh" },
  { city: "Chapainawabganj", labelBn: "চাঁপাইনবাবগঞ্জ", search: "Chapainawabganj, Bangladesh" },
  { city: "Joypurhat", labelBn: "জয়পুরহাট", search: "Joypurhat, Bangladesh" },
  { city: "Naogaon", labelBn: "নওগাঁ", search: "Naogaon, Bangladesh" },
  { city: "Natore", labelBn: "নাটোর", search: "Natore, Bangladesh" },
  { city: "Pabna", labelBn: "পাবনা", search: "Pabna, Bangladesh" },
  { city: "Rajshahi", labelBn: "রাজশাহী", search: "Rajshahi, Bangladesh" },
  { city: "Sirajganj", labelBn: "সিরাজগঞ্জ", search: "Sirajganj, Bangladesh" },
  // Khulna Division
  { city: "Bagerhat", labelBn: "বাগেরহাট", search: "Bagerhat, Bangladesh" },
  { city: "Chuadanga", labelBn: "চুয়াডাঙ্গা", search: "Chuadanga, Bangladesh" },
  { city: "Jessore", labelBn: "যশোর", search: "Jashore, Bangladesh" },
  { city: "Jhenaidah", labelBn: "ঝিনাইদহ", search: "Jhenaidah, Bangladesh" },
  { city: "Khulna", labelBn: "খুলনা", search: "Khulna, Bangladesh" },
  { city: "Kushtia", labelBn: "কুষ্টিয়া", search: "Kushtia, Bangladesh" },
  { city: "Magura", labelBn: "মাগুরা", search: "Magura, Bangladesh" },
  { city: "Meherpur", labelBn: "মেহেরপুর", search: "Meherpur, Bangladesh" },
  { city: "Narail", labelBn: "নড়াইল", search: "Narail, Bangladesh" },
  { city: "Satkhira", labelBn: "সাতক্ষীরা", search: "Satkhira, Bangladesh" },
  // Barishal Division
  { city: "Barguna", labelBn: "বরগুনা", search: "Barguna, Bangladesh" },
  { city: "Barisal", labelBn: "বরিশাল", search: "Barishal, Bangladesh" },
  { city: "Bhola", labelBn: "ভোলা", search: "Bhola, Bangladesh" },
  { city: "Jhalokathi", labelBn: "ঝালকাঠি", search: "Jhalokathi, Bangladesh" },
  { city: "Patuakhali", labelBn: "পটুয়াখালী", search: "Patuakhali, Bangladesh" },
  { city: "Pirojpur", labelBn: "পিরোজপুর", search: "Pirojpur, Bangladesh" },
  // Sylhet Division
  { city: "Habiganj", labelBn: "হবিগঞ্জ", search: "Habiganj, Bangladesh" },
  { city: "Moulvibazar", labelBn: "মৌলভীবাজার", search: "Moulvibazar, Bangladesh" },
  { city: "Sunamganj", labelBn: "সুনামগঞ্জ", search: "Sunamganj, Bangladesh" },
  { city: "Sylhet", labelBn: "সিলেট", search: "Sylhet, Bangladesh" },
  // Rangpur Division
  { city: "Dinajpur", labelBn: "দিনাজপুর", search: "Dinajpur, Bangladesh" },
  { city: "Gaibandha", labelBn: "গাইবান্ধা", search: "Gaibandha, Bangladesh" },
  { city: "Kurigram", labelBn: "কুড়িগ্রাম", search: "Kurigram, Bangladesh" },
  { city: "Lalmonirhat", labelBn: "লালমনিরহাট", search: "Lalmonirhat, Bangladesh" },
  { city: "Nilphamari", labelBn: "নীলফামারী", search: "Nilphamari, Bangladesh" },
  { city: "Panchagarh", labelBn: "পঞ্চগড়", search: "Panchagarh, Bangladesh" },
  { city: "Rangpur", labelBn: "রংপুর", search: "Rangpur, Bangladesh" },
  { city: "Thakurgaon", labelBn: "ঠাকুরগাঁও", search: "Thakurgaon, Bangladesh" },
  // Mymensingh Division
  { city: "Jamalpur", labelBn: "জামালপুর", search: "Jamalpur, Bangladesh" },
  { city: "Mymensingh", labelBn: "ময়মনসিংহ", search: "Mymensingh, Bangladesh" },
  { city: "Netrokona", labelBn: "নেত্রকোণা", search: "Netrokona, Bangladesh" },
  { city: "Sherpur", labelBn: "শেরপুর", search: "Sherpur, Bangladesh" },
]

// Major cities outside Bangladesh (resolved through the city database path).
const WORLD_CITIES: CityPreset[] = [
  { city: "Makkah", country: "Saudi Arabia", labelBn: "মক্কা মুকাররমা" },
  { city: "Madinah", country: "Saudi Arabia", labelBn: "মদিনা মুনাওয়ারা" },
  { city: "Jerusalem", country: "Palestine", labelBn: "বায়তুল মুকাদ্দাস" },
  { city: "London", country: "United Kingdom", labelBn: "লন্ডন, যুক্তরাজ্য" },
  { city: "New York", country: "United States", labelBn: "নিউইয়র্ক, যুক্তরাষ্ট্র" },
  { city: "Dubai", country: "United Arab Emirates", labelBn: "দুবাই, ইউএই" },
  { city: "Kuala Lumpur", country: "Malaysia", labelBn: "কুয়ালালামপুর" },
  { city: "Istanbul", country: "Turkey", labelBn: "ইস্তাম্বুল, তুরস্ক" },
]

const PRESET_CITIES: CityPreset[] = [...BD_DISTRICTS, ...WORLD_CITIES]

export function SalahTimeWidget() {
  // Pre-seed with default fallback so it NEVER flashes empty or broken on initial load
  const [data, setData] = useState<PrayerTimesData>(() => getOfflinePrayerFallback("Dhaka", "Bangladesh"))
  const [loading, setLoading] = useState(false)
  const [detectingLocation, setDetectingLocation] = useState(false)
  const [locationName, setLocationName] = useState("ঢাকা, বাংলাদেশ")
  const [selectedCity, setSelectedCity] = useState("Dhaka")
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState("")
  const [countdown, setCountdown] = useState<string>("")
  const [activeProhibitedKey, setActiveProhibitedKey] = useState<string | null>(null)
  const [tracker, setTracker] = useState<Record<string, boolean>>({
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  })

  const dropdownRef = useRef<HTMLDivElement>(null)
  const initialLoadDoneRef = useRef(false)
  const lastFetchParamsRef = useRef<{
    lat?: number
    lng?: number
    city?: string
    country?: string
    search?: string
    locName?: string
  }>({})

  // Load tracker state from localStorage for today
  useEffect(() => {
    // Deferred so the synchronous setState does not trigger a cascading render
    // from within the effect body.
    queueMicrotask(() => {
      try {
        const todayKey = new Date().toISOString().slice(0, 10)
        const saved = localStorage.getItem(`noor_salah_tracker_${todayKey}`)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && typeof parsed === "object") {
            setTracker((prev) => ({ ...prev, ...parsed }))
          }
        }
      } catch {
        // ignore storage access errors
      }
    })
  }, [])

  // Toggle individual prayer completion status
  const togglePrayerStatus = (prayerKey: string) => {
    setTracker((prev) => {
      const next = { ...prev, [prayerKey]: !prev[prayerKey] }
      try {
        const todayKey = new Date().toISOString().slice(0, 10)
        localStorage.setItem(`noor_salah_tracker_${todayKey}`, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  // Mark all prayers completed or reset
  const handleMarkAllPrayers = (completed: boolean) => {
    const next = {
      Fajr: completed,
      Dhuhr: completed,
      Asr: completed,
      Maghrib: completed,
      Isha: completed,
    }
    setTracker(next)
    try {
      const todayKey = new Date().toISOString().slice(0, 10)
      localStorage.setItem(`noor_salah_tracker_${todayKey}`, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  // Robust fetch function
  const fetchPrayerTimes = useCallback(
    async (params: {
      lat?: number
      lng?: number
      city?: string
      country?: string
      search?: string
      locName?: string
    }) => {
      lastFetchParamsRef.current = params
      setLoading(true)
      try {
        const query = new URLSearchParams()
        if (params.lat && params.lng) {
          query.set("lat", String(params.lat))
          query.set("lng", String(params.lng))
        } else if (params.search) {
          query.set("q", params.search)
        } else {
          query.set("city", params.city || selectedCity)
          query.set("country", params.country || selectedCountry)
        }

        const res = await fetch(`/api/prayer-times?${query.toString()}`)
        if (!res.ok) throw new Error("Prayer request failed")
        const json = await res.json()
        if (json && json.timings) {
          setData(json)
          if (params.locName) {
            setLocationName(params.locName)
          } else if (params.lat && params.lng) {
            setLocationName(json.city || `${params.lat.toFixed(2)}°N, ${params.lng.toFixed(2)}°E`)
          } else if (params.search) {
            setLocationName(json.city || params.search)
          } else {
            const found = PRESET_CITIES.find(
              (c) => c.city.toLowerCase() === (params.city || selectedCity).toLowerCase()
            )
            setLocationName(found ? found.labelBn : `${json.city}, ${json.country}`)
          }
        }
      } catch (err) {
        console.warn("[SALAH WIDGET] Fetch warning:", err)
      } finally {
        setLoading(false)
      }
    },
    [selectedCity, selectedCountry]
  )

  // Universal automatic location: on first load use the saved location (GPS or
  // city). If nothing is saved, call the API with no params — the server
  // resolves the visitor's location from edge geo headers, so correct prayer
  // times appear automatically with no permission prompt.
  useEffect(() => {
    if (initialLoadDoneRef.current) return
    initialLoadDoneRef.current = true
    queueMicrotask(() => {
      let params: {
        lat?: number
        lng?: number
        city?: string
        country?: string
        search?: string
        locName?: string
      } = {}
      try {
        const raw = localStorage.getItem(SALAH_LOCATION_KEY)
        if (raw) {
          const saved = JSON.parse(raw) as SavedLocation
          if (saved.mode === "gps" && typeof saved.lat === "number" && typeof saved.lng === "number") {
            params = { lat: saved.lat, lng: saved.lng, locName: saved.label }
          } else if (saved.mode === "city" && saved.city) {
            setSelectedCity(saved.city)
            setSelectedCountry(saved.country || "Bangladesh")
            params = { city: saved.city, country: saved.country || "Bangladesh", locName: saved.label }
          } else if (saved.mode === "search" && saved.q) {
            params = { search: saved.q, locName: saved.label }
          }
        }
      } catch {
        // ignore storage access errors
      }
      fetchPrayerTimes(params)
    })
  }, [fetchPrayerTimes])

  const persistLocation = (saved: SavedLocation) => {
    try {
      localStorage.setItem(SALAH_LOCATION_KEY, JSON.stringify(saved))
    } catch {
      // ignore storage access errors
    }
  }

  // Select a district / world city from the picker. Bangladesh districts use
  // the address lookup so every one resolves; world cities use the city DB.
  const handleSelectPreset = (c: CityPreset) => {
    setSelectedCity(c.city)
    setSelectedCountry(c.country || "Bangladesh")
    setLocationName(c.labelBn)
    setDropdownOpen(false)
    setCityQuery("")
    if (c.search) {
      persistLocation({ mode: "search", city: c.city, q: c.search, label: c.labelBn })
      fetchPrayerTimes({ search: c.search, locName: c.labelBn })
    } else {
      persistLocation({ mode: "city", city: c.city, country: c.country, label: c.labelBn })
      fetchPrayerTimes({ city: c.city, country: c.country, locName: c.labelBn })
    }
  }

  // Free-typed location ("Chuadanga", "Toronto, Canada", ...).
  const handleFreeTextSearch = () => {
    const term = cityQuery.trim()
    if (!term) return
    setLocationName(term)
    setDropdownOpen(false)
    setCityQuery("")
    persistLocation({ mode: "search", q: term, label: term })
    fetchPrayerTimes({ search: term, locName: term })
  }

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

  // Auto detect location via HTML5 Geolocation API with server reverse-geocoding
  const handleAutoDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়।")
      return
    }

    setDetectingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          await fetchPrayerTimes({
            lat: latitude,
            lng: longitude,
          })
          persistLocation({ mode: "gps", lat: latitude, lng: longitude })
        } finally {
          setDetectingLocation(false)
        }
      },
      (error) => {
        console.warn("Geolocation denied/failed:", error.message)
        setDetectingLocation(false)
      },
      { timeout: 8000, enableHighAccuracy: false }
    )
  }

  // Live countdown timer ticking every second
  useEffect(() => {
    if (!data?.timings) return

    const tick = () => {
      const { nextPrayer } = calculateNextPrayer(data.timings, new Date(), data.meta?.timezone)
      const hrs = Math.floor(nextPrayer.remainingSeconds / 3600)
      const mins = Math.floor((nextPrayer.remainingSeconds % 3600) / 60)
      const secs = nextPrayer.remainingSeconds % 60
      const formatted = `${hrs > 0 ? `${hrs} ঘণ্টা ` : ""}${mins} মিনিট ${secs} সেকেন্ড`
      setCountdown(toBengaliNumerals(formatted))

      // Live prohibited-time state (জাওয়াল / সূর্যোদয় / সূর্যাস্ত)
      const active = getActiveProhibitedWindow(data.timings, new Date(), data.meta?.timezone)
      setActiveProhibitedKey(active?.key ?? null)
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [data?.timings, data?.meta?.timezone])

  // Jummah: on Fridays the Dhuhr slot is observed as Jummah. The API supplies
  // isJummah; pre-seeded fallback data re-derives it from the location timezone.
  const isJummah = data?.isJummah ?? isJummahDay(new Date(), data?.meta?.timezone)

  const prayersList = [
    { key: "Fajr", nameBn: "ফজর", nameAr: "الفجر", isFard: true },
    { key: "Sunrise", nameBn: "সূর্যোদয়", nameAr: "الشروق", isSunrise: true, isFard: false },
    {
      key: "Dhuhr",
      nameBn: isJummah ? "জুমআ" : "যোহর",
      nameAr: isJummah ? "الجمعة" : "الظهر",
      isFard: true,
    },
    { key: "Asr", nameBn: "আসর", nameAr: "العصر", isFard: true },
    { key: "Maghrib", nameBn: "মাগরিব", nameAr: "المغرب", isFard: true },
    { key: "Isha", nameBn: "ইশা", nameAr: "العشاء", isFard: true },
  ]

  const currentPrayerKey = data?.currentPrayer?.nameEn || "Fajr"
  const nextPrayerKey = data?.nextPrayer?.nameEn || "Dhuhr"

  // Prohibited prayer moments (সূর্যোদয় / জাওয়াল / সূর্যাস্ত)
  const prohibitedWindows: ProhibitedWindow[] = data?.timings
    ? getProhibitedWindows(data.timings)
    : []
  const activeProhibited =
    prohibitedWindows.find((w) => w.key === activeProhibitedKey) || null

  // Filter the location picker by Bengali or English name.
  const filteredCities = PRESET_CITIES.filter((c) => {
    const q = cityQuery.trim()
    if (!q) return true
    return c.labelBn.includes(q) || c.city.toLowerCase().includes(q.toLowerCase())
  })

  const fardKeys = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
  const completedCount = fardKeys.filter((k) => !!tracker[k]).length
  const progressPercent = Math.round((completedCount / 5) * 100)

  return (
    <section className="my-10 w-full" aria-label="নামাজের সময়সূচী ও সালাত ট্র্যাকার">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        
        {/* Header: Title, Live Status & Location Selector */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
                লাইভ ওয়াক্ত
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                • দৈনিক ৫ ওয়াক্ত সালাত
              </span>
            </div>
            
            <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
              দৈনিক নামাজের সময়সূচী ও সালাত ট্র্যাকার
            </h2>
            
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              {data?.date ? (
                <>
                  {data.date.gregorian} • {toBengaliNumerals(data.date.hijri.day)}{" "}
                  {data.date.hijri.monthEn} {toBengaliNumerals(data.date.hijri.year)} হিজরি
                </>
              ) : (
                "নামাজের সঠিক ওয়াক্ত ও নিয়মিত আমল সংরক্ষণ"
              )}
            </p>
          </div>

          {/* Location Controls */}
          <div className="flex flex-wrap items-center gap-2" ref={dropdownRef}>
            {/* Auto GPS Detection Button */}
            <button
              onClick={handleAutoDetectLocation}
              disabled={detectingLocation || loading}
              title="আমার বর্তমান অবস্থান চিহ্নিত করুন"
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
                <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-1">
                    <input
                      type="text"
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          if (filteredCities.length === 0) handleFreeTextSearch()
                        }
                      }}
                      placeholder="শহর/জেলা খুঁজুন (যেমন: চুয়াডাঙ্গা)"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 px-1 pb-1">
                    {filteredCities.map((c) => {
                      const isSelected = selectedCity.toLowerCase() === c.city.toLowerCase()
                      return (
                        <button
                          key={`${c.city}-${c.labelBn}`}
                          onClick={() => handleSelectPreset(c)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                            isSelected
                              ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                              : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          }`}
                        >
                          <span>{c.labelBn}</span>
                          <span className="flex items-center gap-1.5">
                            <span className="text-[10px] opacity-60">{c.country || "বাংলাদেশ"}</span>
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </button>
                      )
                    })}

                    {filteredCities.length === 0 && cityQuery.trim() && (
                      <button
                        onClick={handleFreeTextSearch}
                        className="flex w-full items-center justify-between rounded-xl border border-dashed border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        <span className="truncate">খুঁজুন: “{cityQuery.trim()}”</span>
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Manual Sync Button */}
            <button
              onClick={() =>
                fetchPrayerTimes(
                  Object.keys(lastFetchParamsRef.current).length
                    ? lastFetchParamsRef.current
                    : { city: selectedCity, country: selectedCountry }
                )
              }
              disabled={loading}
              title="রিফ্রেশ করুন"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition-all hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Salah Tracker Progress Summary Banner */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    আজকের সালাত ট্র্যাকার
                  </span>
                  <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                    {toBengaliNumerals(String(completedCount))}/৫ ওয়াক্ত সম্পন্ন
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  {completedCount === 5
                    ? "আলহামদুলিল্লাহ! আজকের সকল ফরজ সালাত আদায় সম্পন্ন হয়েছে।"
                    : completedCount > 0
                    ? `মাশাআল্লাহ! আপনি ${toBengaliNumerals(String(completedCount))}টি ওয়াক্ত আদায় করেছেন। বাকি ওয়াক্তগুলো সময়ের সাথে আদায় করুন।`
                    : "আজকের সালাত ট্র্যাক করতে নিচে প্রতিটি ওয়াক্তের ডানপাশে টিক চিহ্ন দিন।"}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {completedCount < 5 ? (
                <button
                  onClick={() => handleMarkAllPrayers(true)}
                  className="inline-flex items-center gap-1 rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>সব সম্পন্ন</span>
                </button>
              ) : (
                <button
                  onClick={() => handleMarkAllPrayers(false)}
                  className="inline-flex items-center gap-1 rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>রিসেট</span>
                </button>
              )}
            </div>
          </div>

          {/* Minimalist Progress Bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full bg-neutral-900 transition-all duration-500 ease-out dark:bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Live Next Prayer Alert Banner */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  পরবর্তী ওয়াক্ত: {getPrayerDisplayName(nextPrayerKey, isJummah).bn || nextPrayerKey}
                </span>
                <span className="rounded-md border border-neutral-300 px-1.5 py-0.2 text-[10px] font-mono font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                  {data?.timings ? formatTo12Hour(data.timings[nextPrayerKey as keyof typeof data.timings] || "") : "--:--"}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                বাকি রয়েছে:{" "}
                <span className="font-semibold text-neutral-900 dark:text-white font-mono">
                  {countdown || "হিসাব হচ্ছে..."}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="inline-block h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>অবস্থান: {locationName}</span>
          </div>
        </div>

        {/* Prayer Times & Tracker Grid (Monochrome Minimalism) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {prayersList.map((prayer) => {
            const rawTime = data?.timings?.[prayer.key as keyof typeof data.timings] || ""
            const formattedTime = rawTime ? formatTo12Hour(rawTime) : "--:--"
            const isNext = prayer.key === nextPrayerKey
            const isCurrent = prayer.key === currentPrayerKey && !prayer.isSunrise
            const isCompleted = prayer.isFard ? !!tracker[prayer.key] : false

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
                        isNext ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-500 dark:text-neutral-400"
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

                <div className="mt-3 pt-2 border-t border-neutral-200/40 dark:border-neutral-700/40">
                  <div className="flex items-center justify-between text-[10px]">
                    {isNext ? (
                      <span className="font-bold flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> পরবর্তী ওয়াক্ত
                      </span>
                    ) : isCurrent ? (
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        চলমান ওয়াক্ত
                      </span>
                    ) : prayer.isSunrise ? (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        সূর্যোদয়
                      </span>
                    ) : (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        ওয়াক্ত
                      </span>
                    )}
                  </div>

                  {/* Interactive Tracker Button for Fard Prayers */}
                  {prayer.isFard && (
                    <button
                      type="button"
                      onClick={() => togglePrayerStatus(prayer.key)}
                      className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-semibold transition-all ${
                        isCompleted
                          ? isNext
                            ? "bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800"
                            : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                          : isNext
                          ? "border border-neutral-600 bg-neutral-800 text-white hover:bg-neutral-700 dark:border-neutral-300 dark:bg-neutral-200 dark:text-black dark:hover:bg-neutral-300"
                          : "border border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-neutral-800"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          <span>আদায় সম্পন্ন</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-3.5 w-3.5 shrink-0 opacity-60" />
                          <span>আদায় করুন</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Prohibited Prayer Moments (নিষিদ্ধ সময়) */}
        {prohibitedWindows.length > 0 && (
          <div
            className={`mt-6 rounded-2xl border p-5 transition-colors ${
              activeProhibited
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/60"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${
                    activeProhibited
                      ? "bg-white text-black dark:bg-black dark:text-white"
                      : "bg-black text-white dark:bg-white dark:text-black"
                  }`}
                >
                  <Ban className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">নিষিদ্ধ সময় — সালাত আদায় করা যায় না</h3>
                  <p
                    className={`text-[11px] ${
                      activeProhibited ? "opacity-80" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {activeProhibited
                      ? `এখন ${activeProhibited.nameBn} সময় চলছে — ফরজ/নফল সালাত থেকে বিরত থাকুন`
                      : "দৈনিক তিনটি সময়ে (সূর্যোদয়, জাওয়াল ও সূর্যাস্ত) সালাত আদায় নিষিদ্ধ"}
                  </p>
                </div>
              </div>
              {activeProhibited && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-current px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  চলমান
                </span>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {prohibitedWindows.map((w) => {
                const isActive = w.key === activeProhibitedKey
                return (
                  <div
                    key={w.key}
                    className={`rounded-xl border p-3 transition-colors ${
                      isActive
                        ? "border-current bg-black/5 dark:bg-white/10"
                        : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{w.nameBn}</span>
                      <span className="font-serif text-xs opacity-70">{w.nameAr}</span>
                    </div>
                    <div className="mt-2 font-mono text-sm font-black">
                      {formatTo12Hour(w.start)} – {formatTo12Hour(w.end)}
                    </div>
                    <p
                      className={`mt-1.5 text-[10px] leading-relaxed ${
                        isActive ? "opacity-80" : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {w.noteBn}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
