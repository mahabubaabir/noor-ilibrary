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
    Sunset: string
    Zawal: string
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
  Sunrise: { bn: "সূর্যোদয়", ar: "الشروق" },
  Dhuhr: { bn: "যোহর", ar: "الظهر" },
  Asr: { bn: "আসর", ar: "العصر" },
  Maghrib: { bn: "মাগরিব", ar: "المغرب" },
  Isha: { bn: "ইশা", ar: "العشاء" },
  Imsak: { bn: "ইমসাক", ar: "الإمساك" },
  Midnight: { bn: "মধ্যরাত", ar: "منتصف الليل" },
  Sunset: { bn: "সূর্যাস্ত", ar: "الغروب" },
  Zawal: { bn: "জাওয়াল", ar: "الاستواء" },
}

export interface ProhibitedWindow {
  key: "sunrise" | "zawal" | "sunset"
  nameBn: string
  nameAr: string
  start: string
  end: string
  noteBn: string
}

// "HH:MM" + delta minutes (handles wrapping past midnight)
export function addMinutesToTime(time24: string, deltaMinutes: number): string {
  const clean = cleanTimeStr(time24)
  const [h, m] = clean.split(":").map(Number)
  let total = (h ?? 0) * 60 + (m ?? 0) + deltaMinutes
  total = ((total % 1440) + 1440) % 1440
  const hh = String(Math.floor(total / 60)).padStart(2, "0")
  const mm = String(total % 60).padStart(2, "0")
  return `${hh}:${mm}`
}

/**
 * The three daily moments when prayer is prohibited (নিষিদ্ধ সময়):
 * 1. সূর্যোদয় — while the sun is rising (~15 min after sunrise)
 * 2. জাওয়াল / ইস্তিওয়া — sun at its zenith (~10 min before Dhuhr)
 * 3. সূর্যাস্ত — while the sun is setting (~15 min before Maghrib)
 */
export function getProhibitedWindows(timings: Record<string, string>): ProhibitedWindow[] {
  const windows: ProhibitedWindow[] = []

  if (timings.Sunrise) {
    windows.push({
      key: "sunrise",
      nameBn: "সূর্যোদয়",
      nameAr: "الشروق",
      start: cleanTimeStr(timings.Sunrise),
      end: addMinutesToTime(timings.Sunrise, 15),
      noteBn: "সূর্য সম্পূর্ণ উদয় হওয়া পর্যন্ত (প্রায় ১৫ মিনিট) সালাত নিষিদ্ধ",
    })
  }

  if (timings.Dhuhr) {
    const zawalStart = timings.Zawal
      ? cleanTimeStr(timings.Zawal)
      : addMinutesToTime(timings.Dhuhr, -10)
    windows.push({
      key: "zawal",
      nameBn: "জাওয়াল / ইস্তিওয়া",
      nameAr: "الاستواء",
      start: zawalStart,
      end: cleanTimeStr(timings.Dhuhr),
      noteBn: "সূর্য মধ্যাকাশে থাকা অবস্থায় (যোহরের পূর্বে প্রায় ১০ মিনিট) সালাত নিষিদ্ধ",
    })
  }

  if (timings.Maghrib) {
    windows.push({
      key: "sunset",
      nameBn: "সূর্যাস্ত",
      nameAr: "الغروب",
      start: addMinutesToTime(timings.Maghrib, -15),
      end: cleanTimeStr(timings.Maghrib),
      noteBn: "সূর্য অস্ত যাওয়া পর্যন্ত (মাগরিবের পূর্বে প্রায় ১৫ মিনিট) সালাত নিষিদ্ধ",
    })
  }

  return windows
}

export function getActiveProhibitedWindow(
  timings: Record<string, string>,
  now: Date = new Date(),
  targetTimezone?: string,
): ProhibitedWindow | null {
  const targetNow = targetTimezone
    ? new Date(now.toLocaleString("en-US", { timeZone: targetTimezone }))
    : now
  const minutesNow =
    targetNow.getHours() * 60 + targetNow.getMinutes() + targetNow.getSeconds() / 60

  for (const window of getProhibitedWindows(timings)) {
    const [sh, sm] = window.start.split(":").map(Number)
    const [eh, em] = window.end.split(":").map(Number)
    const start = (sh ?? 0) * 60 + (sm ?? 0)
    const end = (eh ?? 0) * 60 + (em ?? 0)
    if (minutesNow >= start && minutesNow < end) return window
  }
  return null
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
  now: Date = new Date(),
  targetTimezone?: string
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
  const targetNow = targetTimezone
    ? new Date(now.toLocaleString("en-US", { timeZone: targetTimezone }))
    : now

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
  const currentMinutes = targetNow.getHours() * 60 + targetNow.getMinutes() + targetNow.getSeconds() / 60

  const prayerMinutesList = prayers.map((p) => {
    const cleaned = cleanTimeStr(timings[p] || "12:00")
    const [h, m] = cleaned.split(":").map(Number)
    return {
      name: p,
      time: cleaned,
      minutes: (h ?? 0) * 60 + (m ?? 0),
    }
  })

  // Check sunrise time
  const sunriseClean = cleanTimeStr(timings.Sunrise || "")
  let sunriseMinutes = 0
  if (sunriseClean) {
    const [sh, sm] = sunriseClean.split(":").map(Number)
    sunriseMinutes = (sh ?? 0) * 60 + (sm ?? 0)
  }

  const fajrMinutes = prayerMinutesList[0]!.minutes
  const dhuhrMinutes = prayerMinutesList[1]!.minutes

  let currentPrayer = ""
  let nextPrayer = prayerMinutesList[0]!
  let diffMinutes = 0

  if (currentMinutes < fajrMinutes) {
    // Before Fajr (Tahajjud / Sehri time)
    currentPrayer = "Isha"
    nextPrayer = prayerMinutesList[0]!
    diffMinutes = fajrMinutes - currentMinutes
  } else if (sunriseMinutes && currentMinutes >= fajrMinutes && currentMinutes < sunriseMinutes) {
    // Fajr is active until Sunrise
    currentPrayer = "Fajr"
    nextPrayer = { name: "Sunrise", time: sunriseClean, minutes: sunriseMinutes }
    diffMinutes = sunriseMinutes - currentMinutes
  } else if (sunriseMinutes && currentMinutes >= sunriseMinutes && currentMinutes < dhuhrMinutes) {
    // Sunrise passed, waiting for Dhuhr (Ishraq / Chasht)
    currentPrayer = ""
    nextPrayer = prayerMinutesList[1]!
    diffMinutes = dhuhrMinutes - currentMinutes
  } else {
    for (let i = 1; i < prayerMinutesList.length; i++) {
      const p = prayerMinutesList[i]!
      if (currentMinutes >= p.minutes) {
        currentPrayer = p.name
        if (i < prayerMinutesList.length - 1) {
          nextPrayer = prayerMinutesList[i + 1]!
          diffMinutes = nextPrayer.minutes - currentMinutes
        } else {
          // Past Isha -> next is Fajr
          nextPrayer = prayerMinutesList[0]!
          diffMinutes = 1440 - currentMinutes + nextPrayer.minutes
        }
      }
    }
  }

  const remainingSeconds = Math.max(0, Math.round(diffMinutes * 60))
  const hrs = Math.floor(remainingSeconds / 3600)
  const mins = Math.floor((remainingSeconds % 3600) / 60)
  const secs = remainingSeconds % 60

  const remainingFormatted = `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`

  return {
    currentPrayer: {
      nameEn: currentPrayer,
      nameBn: currentPrayer ? PRAYER_NAMES[currentPrayer]?.bn || currentPrayer : "ওয়াক্তের বিরতি",
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

// Built-in fallback timings for major regions
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
    Sunset: "18:07",
    Zawal: "11:56",
  }

  const { currentPrayer, nextPrayer } = calculateNextPrayer(timings, now, "Asia/Dhaka")

  return {
    city,
    country,
    date: {
      gregorian: now.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      hijri: {
        day: "১৫",
        monthEn: "Ramadan",
        monthAr: "رمضان",
        year: "১৪৪৭",
      },
    },
    timings,
    currentPrayer,
    nextPrayer,
    meta: {
      methodName: "ইসলামিক ফাউন্ডেশন পদ্ধতি",
      source: "স্ট্যান্ডার্ড ওয়াক্ত",
      timezone: "Asia/Dhaka",
      isFallback: true,
    },
  }
}
