import { Metadata } from "next"
import { ZakatCalculatorWidget } from "@/components/tools/zakat-calc"
import { Coins, Sparkles, HelpCircle, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "যাকাত ক্যালকুলেটর (Zakat Calculator) | নূর লাইব্রেরি",
  description:
    "অনলাইন সহজ ও নির্ভুল যাকাত ক্যালকুলেটর। স্বর্ণ, রৌপ্য, নগদ অর্থ, ব্যাংক ব্যালেন্স ও ব্যবসার সম্পদের সঠিক ২.৫% যাকাত হিসাব করুন।",
}

export default function ZakatCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Page Header */}
      <div className="mb-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Coins className="h-3.5 w-3.5" />
              ইসলামের ৩য় স্তম্ভ • যাকাত হিসাব
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
              সহজ ও নির্ভুল যাকাত ক্যালকুলেটর
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              স্বর্ণ, রূপা, নগদ টাকা, ব্যবসায়িক পণ্য ও শেয়ারের বর্তমান বাজারমূল্যের ওপর ভিত্তি করে শরীয়াহ সম্মত নিয়মে আপনার যাকাতের পরিমাণ নির্ণয় করুন।
            </p>
          </div>
        </div>
      </div>

      {/* Main Calculator */}
      <ZakatCalculatorWidget />

      {/* 8 Eligible Categories of Zakat (যাকাত ব্যয়ের ৮টি খাত) */}
      <div className="mt-12 rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          কুরআনুল কারীমে বর্ণিত যাকাত ব্যয়ের ৮টি খাত (সূরা আত-তাওবাহ: ৬০)
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          যাকাতের অর্থ কেবল এই ৮টি খাতের হকদারদের নিকট পৌঁছানো বাধ্যতামূলক:
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs font-semibold">
          {[
            { num: "১", title: "ফকির / নিঃস্ব", desc: "যার বেঁচে থাকার মতো পর্যাপ্ত সম্পদ নেই।" },
            { num: "২", title: "মিসকিন / অভাবগ্রস্ত", desc: "যার দৈনন্দিন মৌলিক চাহিদা পূরণ কষ্টকর।" },
            { num: "৩", title: "যাকাত কর্মকর্তা", desc: "যাকাত সংগ্রহ ও বিতরণে নিয়োজিত ব্যক্তি।" },
            { num: "৪", title: "নওমুসলিম / অনুরাগী", desc: "ইসলামের প্রতি আকৃষ্ট করার জন্য।" },
            { num: "৫", title: "দাসমুক্তি ও বন্দিমুক্তি", desc: "বন্দি ও দাসদের মুক্তির কাজে।" },
            { num: "৬", title: "ঋণগ্রস্ত ব্যক্তি", desc: "ঋণ পরিশোধে সম্পূর্ণ অপারগ ব্যক্তি।" },
            { num: "৭", title: "আল্লাহর পথে (ফি সাবিলিল্লাহ)", desc: "ইসলাম প্রচার ও প্রতিরক্ষার কাজে।" },
            { num: "৮", title: "মুসাফির / পথচারী", desc: "সফরে বিপদে পড়া অসহায় পথিক।" },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-2xl border border-stone-200/60 bg-stone-50/60 p-4 dark:border-stone-800 dark:bg-stone-800/40"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[11px]">
                  {item.num}
                </span>
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] font-normal text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
