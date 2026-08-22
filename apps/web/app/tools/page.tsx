import { Metadata } from "next"
import Link from "next/link"
import {
  Sparkles,
  Calculator,
  Compass,
  Coins,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Moon,
  Clock,
} from "lucide-react"

export const metadata: Metadata = {
  title: "ডিজিটাল ইসলামিক টুলস ও রিসোর্স | নূর লাইব্রেরি",
  description:
    "ডিজিটাল তাসবীহ কাউন্টার, যাকাত ক্যালকুলেটর, আসমাউল হুসনা ৯৯ নাম ও মাসনূন দু'আ সংকলন।",
}

export default function ToolsHubPage() {
  const tools = [
    {
      title: "ডিজিটাল তাসবীহ কাউন্টার",
      titleEn: "Digital Tasbih Counter",
      desc: "সুবহানাল্লাহ, আলহামদুলিল্লাহ সহ প্রতিদিনের বিভিন্ন যিকির গণনা ও অটো-সেভ সুবিধা।",
      href: "/tasbih",
      icon: Sparkles,
      color: "emerald",
    },
    {
      title: "সহজ যাকাত ক্যালকুলেটর",
      titleEn: "Zakat Calculator",
      desc: "সোনা, রূপা, নগদ টাকা ও ব্যবসার সম্পদের সঠিক ২.৫% যাকাত হিসাব করুন।",
      href: "/zakat-calculator",
      icon: Coins,
      color: "amber",
    },
    {
      title: "আল্লাহর ৯৯টি সুন্দর নাম (আসমাউল হুসনা)",
      titleEn: "99 Names of Allah",
      desc: "আরবী, বাংলা উচ্চারণ, অর্থ, ব্যাখ্যা ও মুখস্থ ট্র্যাকিং সহ ৯৯টি নামের সংকলন।",
      href: "/names-of-allah",
      icon: BookOpen,
      color: "emerald",
    },
    {
      title: "দু'আ ও আযকার কেন্দ্র (Dua Center)",
      titleEn: "Dua & Azkar Collection",
      desc: "৪০টি কুরআনী রাব্বানা দু'আ, সকাল-সন্ধ্যার জিকির ও রোগমুক্তির সহীহ দু'আ।",
      href: "/duas",
      icon: Sparkles,
      color: "blue",
    },
    {
      title: "হিসনুল মুসলিম (মুমিনের দুর্গ)",
      titleEn: "Hisnul Muslim",
      desc: "ঘুম, ওযু, সালাত, আহার ও সফরের প্রাত্যহিক জীবনের সহীহ মাসনূন দু'আ।",
      href: "/hisnul-muslim",
      icon: ShieldCheck,
      color: "emerald",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="mb-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-stone-900/10 to-amber-950/20 p-6 sm:p-10 backdrop-blur-xl dark:border-emerald-500/30">
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          ইসলামিক রিসোর্স হাব
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          ডিজিটাল ইসলামিক টুলস ও রিসোর্স
        </h1>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          প্রতিদিনের ইবাদত, যিকির ও আমলকে সহজ করতে আধুনিক ও বিশুদ্ধ ডিজিটাল ইসলামিক টুলস।
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={tool.href} className="group">
              <div className="relative h-full flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-white/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900/90">
                <div>
                  <div className="mb-4 inline-flex rounded-2xl bg-emerald-600 p-3 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium mb-2">{tool.titleEn}</p>
                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border-t border-stone-100 dark:border-stone-800 pt-4">
                  টুল চালু করুন <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
