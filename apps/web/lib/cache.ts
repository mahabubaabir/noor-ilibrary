import { prisma } from '@/lib/db'

/**
 * Cache the result of `fn` under `key` for `ttlSeconds`.
 * Quranic content never changes, so cached responses are served indefinitely
 * within the TTL and only refreshed after expiry. Keeps us gentle on free APIs.
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fn: () => Promise<T>,
): Promise<T> {
  const existing = await prisma.contentCache.findUnique({ where: { key } })

  if (existing) {
    const ageSeconds = (Date.now() - existing.updatedAt.getTime()) / 1000
    if (ageSeconds < ttlSeconds) {
      return JSON.parse(existing.payload) as T
    }
  }

  const value = await fn()
  await prisma.contentCache.upsert({
    where: { key },
    create: { key, payload: JSON.stringify(value) },
    update: { payload: JSON.stringify(value) },
  })
  return value
}