import { Metadata } from "next"
import { SamsulAlamPlayer } from "@/components/media/samsul-alam-player"
import { Tv, Sparkles, BookOpen, Volume2 } from "lucide-react"

export const metadata: Metadata = {
  title: "ভিডিও সূরা ও তিলাওয়াত | শামসুল হক প্লেলিস্ট - নূর লাইব্রেরি",
  description:
    "শামসুল হক এর প্রাঞ্জল কুরআন তিলাওয়াত ও সূরা অডিও-ভিডিও সংকলন। সাথে রয়েছে পূর্ণাঙ্গ অর্থ ও তাফসীর পড়ার সরাসরি লিংক।",
}

export default function SurahMediaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/10 p-6 sm:p-8 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Tv className="h-3.5 w-3.5" />
              ইউটিউব সূরা প্লেলিস্ট (YouTube Surah Media)
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              শামসুল হক — নির্বাচিত সূরা তিলাওয়াত ও আলোচনা
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              মনোমুগ্ধকর ও হৃদয়গ্রাহী তিলাওয়াত শুনুন। যেকোনো সূরার সাথে কুরআনে আরবী ও বাংলা অনুবাদ একসঙ্গে অধ্যয়ন করুন।
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <span className="flex items-center gap-1 rounded-2xl border border-emerald-500/30 bg-white/70 px-3.5 py-2 backdrop-blur dark:bg-stone-900/80">
              <Sparkles className="h-4 w-4 text-amber-500" />
              এইচডি (HD) অডিও ও ভিডিও
            </span>
          </div>
        </div>
      </div>

      {/* Main Player Component */}
      <SamsulAlamPlayer />
    </div>
  )
}
