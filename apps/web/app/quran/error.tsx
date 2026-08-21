'use client'

export default function QuranError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-stone-600 dark:text-stone-300">
        The Quran content could not be loaded from the data sources. This is usually temporary —
        please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        Try again
      </button>
    </div>
  )
}