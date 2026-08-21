import { prisma } from '@/lib/db'

/**
 * Cache the result of `fn` under `key` for `ttlSeconds`.
 * If the database is unavailable, fetches from the API without caching
 * so the app never shows blank pages.
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>,
): Promise<T> {
  try {
    const existing = await prisma.contentCache.findUnique({ where: { key } })

    if (existing) {
      const ageSeconds = (Date.now() - existing.updatedAt.getTime()) / 1000
      if (ageSeconds < ttlSeconds) {
        return JSON.parse(existing.payload) as T
      }
    }
  } catch {
    // DB unavailable — skip cache, fetch directly
  }

  const value = await fn()

  try {
    await prisma.contentCache.upsert({
      where: { key },
      create: { key, payload: JSON.stringify(value) },
      update: { payload: JSON.stringify(value) },
    })
  } catch {
    // DB unavailable — skip caching, still return the data
  }

  return value
}
