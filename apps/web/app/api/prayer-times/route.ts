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
  let locationName = searchParams.get('locationName')?.trim() || ''

  try {
    let aladhanUrl: string
    if (lat && lng) {
      const timestamp = Math.floor(Date.now() / 1000)
      aladhanUrl = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=1`

      // Server-side reverse geocoding for human-readable location name if not provided
      if (!locationName) {
        try {
          const geoController = new AbortController()
          const geoTimeout = setTimeout(() => geoController.abort(), 3500)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
            {
              signal: geoController.signal,
              headers: {
                'User-Agent': 'Noor-Islamic-Library/1.0',
                'Accept-Language': 'bn,en',
              },
            }
          ).finally(() => clearTimeout(geoTimeout))

          if (geoRes.ok) {
            const geo = await geoRes.json()
            const cName =
              geo.address?.city ||
              geo.address?.town ||
              geo.address?.state_district ||
              geo.address?.state ||
              ''
            const coName = geo.address?.country || ''
            if (cName) {
              locationName = `${cName}${coName ? `, ${coName}` : ''}`
            }
          }
        } catch {
          // fallback coordinate string
        }
      }
    } else {
      aladhanUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}&method=1`
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(aladhanUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Noor-Islamic-Library/1.0',
      },
    }).finally(() => clearTimeout(timeout))

    if (!res.ok) {
      throw new Error(`Prayer service responded with status ${res.status}`)
    }

    const json: AladhanResponse = await res.json()
    if (!json.data || !json.data.timings) {
      throw new Error('Malformed prayer response')
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

    const timezone = d.meta.timezone || 'Asia/Dhaka'
    const now = new Date()
    const { currentPrayer, nextPrayer } = calculateNextPrayer(cleanTimings, now, timezone)

    const displayCity = lat && lng
      ? (locationName || `${Number(lat).toFixed(2)}°N, ${Number(lng).toFixed(2)}°E`)
      : city

    const result: PrayerTimesData = {
      city: displayCity,
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
        methodName: d.meta.method.name || 'Islamic Foundation',
        source: 'স্ট্যান্ডার্ড ওয়াক্ত',
        timezone,
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
