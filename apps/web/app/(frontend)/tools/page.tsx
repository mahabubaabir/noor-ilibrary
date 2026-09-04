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
      <div className="mb-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900">
        <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-1 text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">
          <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
          ইসলামিক রিসোর্স হাব
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          ডিজিটাল ইসলামিক টুলস ও রিসোর্স
        </h1>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          প্রতিদিনের ইবাদত, যিকির ও আমলকে সহজ করতে আধুনিক ও বিশুদ্ধ ডিজিটাল ইসলামিক টুলস।
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={tool.href} className="group">
              <div className="relative h-full flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
                <div>
                  <div className="mb-4 inline-flex rounded-2xl bg-neutral-900 p-3 text-white shadow-md dark:bg-white dark:text-neutral-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:underline">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium mb-2">{tool.titleEn}</p>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white border-t border-neutral-100 dark:border-neutral-800 pt-4">
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
