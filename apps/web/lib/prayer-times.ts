export interface PrayerTimesData {
  city: string
  country: string
  date: {
    gregorian: string
    hijri: {
      day: string
      monthEn: string
      monthAr: string
      year: string
    }
  }
  timings: {
    Fajr: string
    Sunrise: string
    Dhuhr: string
    Asr: string
    Maghrib: string
    Isha: string
    Imsak: string
    Midnight: string
  }
  nextPrayer: {
    nameEn: string
    nameBn: string
    time: string
    remainingSeconds: number
    remainingFormatted: string
  }
  currentPrayer: {
    nameEn: string
    nameBn: string
  }
  meta: {
    methodName: string
    source: string
    timezone: string
    isFallback?: boolean
  }
}

export const PRAYER_NAMES: Record<string, { bn: string; ar: string }> = {
  Fajr: { bn: "ফজর", ar: "الفجر" },
  Sunrise: { bn: "সূর্যোদয়", ar: "الشروق" },
  Dhuhr: { bn: "যোহর", ar: "الظهر" },
  Asr: { bn: "আসর", ar: "العصر" },
  Maghrib: { bn: "মাগরিব", ar: "المغرب" },
  Isha: { bn: "ইশা", ar: "العشاء" },
  Imsak: { bn: "ইমসাক", ar: "الإمساك" },
  Midnight: { bn: "মধ্যরাত", ar: "منتصف الليل" },
}

// Clean time string "05:12 (BST)" -> "05:12"
export function cleanTimeStr(rawTime: string): string {
  if (!rawTime) return "00:00"
  const match = rawTime.match(/(\d{1,2}):(\d{2})/)
  if (!match) return rawTime
  return `${match[1]!.padStart(2, "0")}:${match[2]!}`
}

// Convert "HH:MM" (24h) to 12h format "h:mm AM/PM"
export function formatTo12Hour(time24: string): string {
  const clean = cleanTimeStr(time24)
  const [hStr, mStr] = clean.split(":")
  const h = parseInt(hStr || "0", 10)
  const m = mStr || "00"
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${m} ${period}`
}

// Convert time to Bengali digits
export function toBengaliNumerals(str: string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  return str.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)] ?? d)
}

export function calculateNextPrayer(
  timings: Record<string, string>,
  now: Date = new Date()
): {
  currentPrayer: { nameEn: string; nameBn: string }
  nextPrayer: {
    nameEn: string
    nameBn: string
    time: string
    remainingSeconds: number
    remainingFormatted: string
  }
} {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60

  const prayerMinutesList = prayers.map((p) => {
    const cleaned = cleanTimeStr(timings[p] || "12:00")
    const [h, m] = cleaned.split(":").map(Number)
    return {
      name: p,
      time: cleaned,
      minutes: (h ?? 0) * 60 + (m ?? 0),
    }
  })

  // Determine current and next prayer
  let currentPrayer = prayers[prayers.length - 1]!
  let nextPrayer = prayerMinutesList[0]!
  let diffMinutes = 0

  for (let i = 0; i < prayerMinutesList.length; i++) {
    const p = prayerMinutesList[i]!
    if (currentMinutes >= p.minutes) {
      currentPrayer = p.name
    } else {
      nextPrayer = p
      diffMinutes = p.minutes - currentMinutes
      break
    }
  }

  // If past Isha, next prayer is Fajr tomorrow
  if (currentMinutes >= (prayerMinutesList[prayerMinutesList.length - 1]?.minutes ?? 1440)) {
    currentPrayer = "Isha"
    nextPrayer = prayerMinutesList[0]!
    diffMinutes = 1440 - currentMinutes + nextPrayer.minutes
  }

  const remainingSeconds = Math.max(0, Math.round(diffMinutes * 60))
  const hrs = Math.floor(remainingSeconds / 3600)
  const mins = Math.floor((remainingSeconds % 3600) / 60)
  const secs = remainingSeconds % 60

  const remainingFormatted = `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`

  return {
    currentPrayer: {
      nameEn: currentPrayer,
      nameBn: PRAYER_NAMES[currentPrayer]?.bn || currentPrayer,
    },
    nextPrayer: {
      nameEn: nextPrayer.name,
      nameBn: PRAYER_NAMES[nextPrayer.name]?.bn || nextPrayer.name,
      time: nextPrayer.time,
      remainingSeconds,
      remainingFormatted,
    },
  }
}

// Built-in offline fallback timings for major regions
export function getOfflinePrayerFallback(city = "Dhaka", country = "Bangladesh"): PrayerTimesData {
  const now = new Date()
  const timings = {
    Fajr: "04:45",
    Sunrise: "06:02",
    Dhuhr: "12:06",
    Asr: "15:28",
    Maghrib: "18:09",
    Isha: "19:24",
    Imsak: "04:35",
    Midnight: "00:06",
  }

  const { currentPrayer, nextPrayer } = calculateNextPrayer(timings, now)

  return {
    city,
    country,
    date: {
      gregorian: now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      hijri: {
        day: "14",
        monthEn: "Ramadan",
        monthAr: "رمضان",
        year: "1447",
      },
    },
    timings,
    currentPrayer,
    nextPrayer,
    meta: {
      methodName: "University of Islamic Sciences, Karachi (Fallback)",
      source: "Offline Sync Engine",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dhaka",
      isFallback: true,
    },
  }
}
