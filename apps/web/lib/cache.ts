import { prisma } from '@/lib/db'

/**
 * Cache the result of `fn` under `key` for `ttlSeconds`.
 * If the database is unavailable, fetches from the API without caching
 * so the app never shows blank pages. If the cached value is expired
 * but the fresh fetch fails, the stale value is served as a fallback.
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>,
): Promise<T> {
  let stale: T | undefined
  try {
    const existing = await prisma.contentCache.findUnique({ where: { key } })

    if (existing) {
      const ageSeconds = (Date.now() - existing.updatedAt.getTime()) / 1000
      if (ageSeconds < ttlSeconds) {
        return JSON.parse(existing.payload) as T
      }
      try {
        stale = JSON.parse(existing.payload) as T
      } catch {
        stale = undefined
      }
    }
  } catch {
    // DB unavailable — skip cache, fetch directly
  }

  let value: T
  try {
    value = await fn()
  } catch (error) {
    if (stale !== undefined) return stale
    throw error
  }

  // Never persist null/undefined — a cached "empty" would look like a fresh
  // result for the whole TTL and block recovery (e.g. a transient API miss).
  if (value === null || value === undefined) {
    return value
  }

  try {
    await prisma.contentCache.upsert({
      where: { key },
      create: { key, payload: JSON.stringify(value) },
      update: { payload: JSON.stringify(value), updatedAt: new Date() },
    })
  } catch {
    // DB unavailable — skip caching, still return the data
  }

  return value
}
