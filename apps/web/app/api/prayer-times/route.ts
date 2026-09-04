import { NextResponse } from 'next/server'
import {
  calculateNextPrayer,
  cleanTimeStr,
  getOfflinePrayerFallback,
  type PrayerTimesData,
} from '@/lib/prayer-times'

export const dynamic = 'force-dynamic'

interface AladhanResponse {
  code: number
  status: string
  data?: {
    timings: Record<string, string>
    date: {
      readable: string
      gregorian: {
        date: string
        weekday: { en: string }
        month: { en: string }
        year: string
      }
      hijri: {
        date: string
        day: string
        month: { en: string; ar: string }
        year: string
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
      method: { id: number; name: string }
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const city = searchParams.get('city')?.trim() || 'Dhaka'
  const country = searchParams.get('country')?.trim() || 'Bangladesh'

  try {
    let aladhanUrl: string
    if (lat && lng) {
      const timestamp = Math.floor(Date.now() / 1000)
      aladhanUrl = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=1`
    } else {
      aladhanUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}&method=1`
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4500)

    const res = await fetch(aladhanUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Noor-Islamic-Library/1.0',
      },
      next: { revalidate: 1800 },
    }).finally(() => clearTimeout(timeout))

    if (!res.ok) {
      throw new Error(`Aladhan API responded with status ${res.status}`)
    }

    const json: AladhanResponse = await res.json()
    if (!json.data || !json.data.timings) {
      throw new Error('Malformed prayer response from Aladhan')
    }

    const d = json.data
    const cleanTimings = {
      Fajr: cleanTimeStr(d.timings.Fajr || '04:45'),
      Sunrise: cleanTimeStr(d.timings.Sunrise || '06:02'),
      Dhuhr: cleanTimeStr(d.timings.Dhuhr || '12:06'),
      Asr: cleanTimeStr(d.timings.Asr || '15:28'),
      Maghrib: cleanTimeStr(d.timings.Maghrib || '18:09'),
      Isha: cleanTimeStr(d.timings.Isha || '19:24'),
      Imsak: cleanTimeStr(d.timings.Imsak || '04:35'),
      Midnight: cleanTimeStr(d.timings.Midnight || '00:06'),
    }

    const now = new Date()
    const { currentPrayer, nextPrayer } = calculateNextPrayer(cleanTimings, now)

    const result: PrayerTimesData = {
      city: lat && lng ? (searchParams.get('locationName') || `${lat.slice(0, 5)}°, ${lng.slice(0, 5)}°`) : city,
      country,
      date: {
        gregorian: `${d.date.gregorian.weekday.en}, ${d.date.gregorian.month.en} ${d.date.gregorian.year}`,
        hijri: {
          day: d.date.hijri.day,
          monthEn: d.date.hijri.month.en,
          monthAr: d.date.hijri.month.ar,
          year: d.date.hijri.year,
        },
      },
      timings: cleanTimings,
      currentPrayer,
      nextPrayer,
      meta: {
        methodName: d.meta.method.name,
        source: 'Aladhan Open API',
        timezone: d.meta.timezone,
        isFallback: false,
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.warn('[PRAYER TIME] Using offline fallback due to:', error instanceof Error ? error.message : error)
    const fallback = getOfflinePrayerFallback(city, country)
    return NextResponse.json(fallback)
  }
}
