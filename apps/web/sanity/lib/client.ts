import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

/**
 * Safe server-side fetch with ISR revalidation.
 * Returns null instead of throwing so CMS outages never break a page.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 3600,
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    })
  } catch (error) {
    console.warn("[sanity] fetch failed:", error instanceof Error ? error.message : error)
    return null
  }
}
