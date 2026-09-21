import { NextResponse } from 'next/server'
import {
  addMinutesToTime,
  calculateNextPrayer,
  cleanTimeStr,
  getOfflinePrayerFallback,
  type PrayerTimesData,
} from '@/lib/prayer-times'

export const dynamic = 'force-dynamic'

/**
 * Pick the most accurate Aladhan calculation method for a country.
 * Accepts either a country name ("Bangladesh") or an ISO code ("BD").
 */
function resolveMethod(countryRaw: string): number {
  const c = (countryRaw || '').trim().toLowerCase()
  const inList = (names: string[], codes: string[]) =>
    names.some((n) => c.includes(n)) || codes.includes(c)

  // Islamic Foundation / University of Islamic Sciences, Karachi
  if (inList(['bangladesh', 'india', 'pakistan', 'afghanistan', 'sri lanka', 'nepal', 'maldives', 'bhutan'], ['bd', 'in', 'pk', 'af', 'lk', 'np', 'mv', 'bt'])) return 1
  // Umm al-Qura, Makkah
  if (inList(['saudi', 'yemen', 'kuwait', 'qatar', 'bahrain', 'oman'], ['sa', 'ye', 'kw', 'qa', 'bh', 'om'])) return 4
  // Gulf Region (UAE)
  if (inList(['emirates'], ['ae'])) return 8
  // Egyptian General Authority of Survey
  if (inList(['egypt', 'syria', 'iraq', 'lebanon'], ['eg', 'sy', 'iq', 'lb'])) return 5
  if (inList(['jordan'], ['jo'])) return 23
  // ISNA (North America)
  if (inList(['united states', 'canada', 'mexico'], ['us', 'ca', 'mx'])) return 2
  // Diyanet (Turkey)
  if (inList(['turkey'], ['tr'])) return 13
  // Institute of Geophysics, University of Tehran
  if (inList(['iran'], ['ir'])) return 7
  // JAKIM (Malaysia) / KEMENAG (Indonesia) / MUIS (Singapore)
  if (inList(['malaysia'], ['my'])) return 17
  if (inList(['indonesia'], ['id'])) return 20
  if (inList(['singapore', 'brunei'], ['sg', 'bn'])) return 11
  // Muslim World League — safe international default
  return 3
}

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
  const paramLat = searchParams.get('lat')
  const paramLng = searchParams.get('lng')
  const paramCity = searchParams.get('city')?.trim()
  const paramCountry = searchParams.get('country')?.trim()
  let locationName = searchParams.get('locationName')?.trim() || ''

  // Universal automatic geolocation: Vercel injects the visitor's coarse
  // location into these headers, so every visitor gets correct prayer times
  // without any browser permission prompt. Explicit ?lat/lng or ?city wins.
  const headers = request.headers
  const geoLat = headers.get('x-vercel-ip-latitude')
  const geoLng = headers.get('x-vercel-ip-longitude')
  const geoCityRaw = headers.get('x-vercel-ip-city')
  const geoCountry = headers.get('x-vercel-ip-country') || ''
  const geoCity = geoCityRaw ? decodeURIComponent(geoCityRaw) : ''

  const useGeo = !paramLat && !paramLng && !paramCity
  const lat = paramLat || (useGeo ? geoLat : null)
  const lng = paramLng || (useGeo ? geoLng : null)
  const city = paramCity || geoCity || 'Dhaka'
  const country = paramCountry || geoCountry || 'Bangladesh'

  if (!locationName && geoCity) {
    locationName = geoCity
  }

  try {
    let aladhanUrl: string
    if (lat && lng) {
      const timestamp = Math.floor(Date.now() / 1000)
      const method = resolveMethod(country)
      aladhanUrl = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=${method}`

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
      const method = resolveMethod(country)
      aladhanUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}&method=${method}`
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
    const dhuhrClean = cleanTimeStr(d.timings.Dhuhr || '12:06')
    const cleanTimings = {
      Fajr: cleanTimeStr(d.timings.Fajr || '04:45'),
      Sunrise: cleanTimeStr(d.timings.Sunrise || '06:02'),
      Dhuhr: dhuhrClean,
      Asr: cleanTimeStr(d.timings.Asr || '15:28'),
      Maghrib: cleanTimeStr(d.timings.Maghrib || '18:09'),
      Isha: cleanTimeStr(d.timings.Isha || '19:24'),
      Imsak: cleanTimeStr(d.timings.Imsak || '04:35'),
      Midnight: cleanTimeStr(d.timings.Midnight || '00:06'),
      Sunset: cleanTimeStr(d.timings.Sunset || d.timings.Maghrib || '18:07'),
      // জাওয়াল / ইস্তিওয়া: sun at its zenith, ~10 minutes before Dhuhr
      Zawal: addMinutesToTime(dhuhrClean, -10),
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
