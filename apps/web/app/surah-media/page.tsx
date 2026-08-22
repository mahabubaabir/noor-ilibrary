import { Metadata } from "next"
import { SamsulAlamPlayer } from "@/components/media/samsul-alam-player"
import { Tv, Sparkles, BookOpen, Volume2, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Shamsul haQue (@shamsul_haque) — কুরআন তিলাওয়াত ও মিডিয়া | নূর লাইব্রেরি",
  description:
    "Shamsul haQue (@shamsul_haque) অফিসিয়াল ইউটিউব চ্যানেলের হৃদয়গ্রাহী কুরআন তিলাওয়াত, দোয়া ও রুকইয়াহ সংকলন।",
}

export default function SurahMediaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-stone-900/10 to-emerald-950/10 p-6 sm:p-8 backdrop-blur-xl dark:border-red-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
              <Tv className="h-3.5 w-3.5" />
              ইউটিউব চ্যানেল • @shamsul_haque
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Shamsul haQue — অফিসিয়াল কুরআন তিলাওয়াত মিডিয়া
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              <a
                href="https://www.youtube.com/@shamsul_haque"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-red-600 hover:underline dark:text-red-400"
              >
                @shamsul_haque
              </a>{" "}
              চ্যানেলের সুললিত কণ্ঠে সূরা আল-মুলক, সূরা আর-রহমান, সূরা আল-কাহফ ও রুকইয়াহ তিলাওয়াত।
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <span className="flex items-center gap-1 rounded-2xl border border-red-500/30 bg-white/70 px-3.5 py-2 backdrop-blur dark:bg-stone-900/80">
              <Sparkles className="h-4 w-4 text-amber-500" />
              অফিসিয়াল চ্যানেল
            </span>
          </div>
        </div>
      </div>

      {/* Main Player Component */}
      <SamsulAlamPlayer />
    </div>
  )
}
