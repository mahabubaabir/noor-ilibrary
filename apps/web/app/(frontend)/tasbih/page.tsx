import { Metadata } from "next"
import { TasbihCounter } from "@/components/tools/tasbih-counter"
import { Sparkles, Clock, Compass } from "lucide-react"

export const metadata: Metadata = {
  title: "ডিজিটাল তাসবীহ ও যিকির কাউন্টার | নূর লাইব্রেরি",
  description:
    "অনলাইন ডিজিটাল তাসবীহ কাউন্টার। সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার সহ বিভিন্ন যিকিরের হিসাব রাখুন এবং আত্মিক প্রশান্তি অর্জন করুন।",
}

export default function TasbihPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-1 text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
          <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
          <span>ডিজিটাল তাসবীহ (Digital Tasbih)</span>
        </div>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          প্রতিদিনের যিকির ও তাসবীহ কাউন্টার
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          &ldquo;নিশ্চয়ই আল্লাহর স্মরণে অন্তরসমূহ প্রশান্তি লাভ করে।&rdquo; (সূরা আর-রাদ: ২৮)
        </p>
      </div>

      {/* Main Tasbih Interactive Widget */}
      <TasbihCounter />
    </div>
  )
}
