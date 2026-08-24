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
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          ডিজিটাল তাসবীহ (Digital Tasbih)
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          প্রতিদিনের যিকির ও তাসবীহ কাউন্টার
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          &ldquo;নিশ্চয়ই আল্লাহর স্মরণে অন্তরসমূহ প্রশান্তি লাভ করে।&rdquo; (সূরা আর-রাদ: ২৮)
        </p>
      </div>

      {/* Main Tasbih Interactive Widget */}
      <TasbihCounter />
    </div>
  )
}
