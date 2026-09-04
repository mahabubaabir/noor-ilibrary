import React from "react"
import Link from "next/link"
import { BookOpen, Users } from "lucide-react"
import { CompanionsGeometricGrid } from "@/components/companions/companions-geometric-grid"
import { client } from "@/sanity/lib/client"
import { companionsQuery } from "@/sanity/lib/queries"

// Force dynamic or revalidate as needed
export const revalidate = 3600 // revalidate at most every hour

export default async function CompanionsPage() {
  let initialCompanions = []
  
  try {
    // Attempt to fetch from Sanity
    // Note: If project ID is missing, client will throw or return empty.
    initialCompanions = await client.fetch(companionsQuery)
  } catch (error) {
    console.warn("Failed to fetch companions from Sanity. Falling back to local data.", error)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Hero Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm backdrop-blur-xl transition-all dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              <Users className="h-3.5 w-3.5" />
              <span>সাহাবায়ে কেরাম (Companions of the Prophet)</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
              রাসূলুল্লাহ ﷺ ও চারপাশের সাহাবীদের আলোকিত জীবন
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              সাহাবীদের কার্ডে স্পর্শ করুন এবং বিস্তারিত জীবনী ও অডিও বিবরণ শুনুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <BookOpen className="h-4 w-4" /> ৩ডি নবীদের জীবনী ও কাহিনী &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Companions Experience Widget */}
      <div className="mb-12">
        <CompanionsGeometricGrid initialCompanions={initialCompanions} />
      </div>
    </div>
  )
}
