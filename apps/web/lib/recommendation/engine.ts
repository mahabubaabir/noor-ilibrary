export type ContentCategory = "quran" | "hadith" | "companion" | "dua" | "names" | "tools" | "blog"

export interface RecommendationItem {
  id: string
  category: ContentCategory
  categoryLabelBn: string
  titleBn: string
  titleEn: string
  subtitleBn: string
  badgeBn: string
  reasonBn: string
  href: string
  iconName: "book" | "library" | "shield" | "heart" | "sparkles" | "compass" | "sun" | "moon"
  gradientFrom: string
  gradientTo: string
  accentColor: string
}

export interface UserActivityLog {
  category: ContentCategory
  id: string
  timestamp: number
  weight: number
}

export interface UserInterestProfile {
  categories: Record<ContentCategory, number>
  recentHistory: UserActivityLog[]
  totalInteractions: number
  selectedTopicOverride?: ContentCategory | "all"
}

const STORAGE_KEY = "noor_user_interest_profile"

const DEFAULT_RECOMMENDATION_POOL: RecommendationItem[] = [
  {
    id: "quran-mulk",
    category: "quran",
    categoryLabelBn: "পবিত্র কুরআন",
    titleBn: "সূরা আল-মুলক (تبارك الذي بيده الملك)",
    titleEn: "Surah Al-Mulk (Sovereignty)",
    subtitleBn: "কবরের আযাব থেকে সুরক্ষাকারী বরকতময় ৩০টি আয়াতের সূরা",
    badgeBn: "দৈনিক আমল",
    reasonBn: "রাসূলুল্লাহ ﷺ প্রতি রাতে ঘুমানোর পূর্বে এটি পাঠ করতেন",
    href: "/quran/67",
    iconName: "book",
    gradientFrom: "from-emerald-900/30",
    gradientTo: "to-teal-900/10",
    accentColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "quran-kahf",
    category: "quran",
    categoryLabelBn: "পবিত্র কুরআন",
    titleBn: "সূরা আল-কাহাফ (سورة الكهف)",
    titleEn: "Surah Al-Kahf (The Cave)",
    subtitleBn: "দাজ্জালের ফিতনা থেকে নিরাপত্তা ও আসহাবে কাহাফের ঘটনা",
    badgeBn: "বিশেষ ফজিলত",
    reasonBn: "শুক্রবার ও নিয়মিত পাঠে দুই জুমার মধ্যবর্তী সময়ে নূর চমকাবে",
    href: "/quran/18",
    iconName: "book",
    gradientFrom: "from-sky-900/30",
    gradientTo: "to-indigo-900/10",
    accentColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "hadith-repentance",
    category: "hadith",
    categoryLabelBn: "হাদিস শরীফ",
    titleBn: "আল্লাহর ক্ষমা ও তাওবার মহিমা",
    titleEn: "Mercy of Repentance & Forgiveness",
    subtitleBn: "সহীহ বুখারী ও মুসলিমের খাঁটি তাওবা ও ক্ষমা প্রার্থনার হাদিস",
    badgeBn: "আত্মশুদ্ধি",
    reasonBn: "যে ব্যক্তি তাওবা করে সে যেন নিষ্পাপ শিশুর মতো হয়ে যায়",
    href: "/hadith/bukhari?n=1",
    iconName: "library",
    gradientFrom: "from-amber-900/30",
    gradientTo: "to-stone-900/10",
    accentColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "companion-abu-bakr",
    category: "companion",
    categoryLabelBn: "সাহাবী জীবনী",
    titleBn: "হযরত আবু বকর আস-সিদ্দীক (রাঃ)",
    titleEn: "Abu Bakr As-Siddiq (RA)",
    subtitleBn: "উম্মতের সর্বশ্রেষ্ঠ ব্যক্তি ও ইসলামের প্রথম খলিফার আত্মত্যাগ",
    badgeBn: "খলিফায়ে রাশেদীন",
    reasonBn: "নবীজির সবচেয়ে বিশ্বস্ত বন্ধু ও হিজরতের সঙ্গী",
    href: "/companions/abu-bakr-as-siddiq",
    iconName: "shield",
    gradientFrom: "from-emerald-950/40",
    gradientTo: "to-emerald-900/10",
    accentColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "companion-khalid",
    category: "companion",
    categoryLabelBn: "সাহাবী জীবনী",
    titleBn: "হযরত খালিদ বিন ওয়ালিদ (রাঃ)",
    titleEn: "Khalid ibn al-Walid (RA)",
    subtitleBn: "আল্লাহর উন্মুক্ত তরবারি — অপরাজিত সেনাপতি ও বীর মুজাহিদ",
    badgeBn: "সাইফুল্লাহ",
    reasonBn: "শত যুদ্ধের ময়দানে ইসলামের অপরাজেয় বিজয়গাথা",
    href: "/companions/khalid-bin-walid",
    iconName: "shield",
    gradientFrom: "from-rose-900/30",
    gradientTo: "to-amber-900/10",
    accentColor: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "dua-istighfar",
    category: "dua",
    categoryLabelBn: "মাসনূন দু'আ",
    titleBn: "সাইয়্যিদুল ইস্তিগফার (শ্রেষ্ঠ ক্ষমা প্রার্থনা)",
    titleEn: "Sayyidul Istighfar (Master of Forgiveness)",
    subtitleBn: "اللهم أنت ربي لا إله إلا أنت — জান্নাত লাভের সর্বোত্তম দু'আ",
    badgeBn: "সর্বোচ্চ ফজিলত",
    reasonBn: "সকালে ও সন্ধ্যায় বিশ্বাস সহকারে পাঠকারী জান্নাতবাসী হবেন",
    href: "/duas",
    iconName: "heart",
    gradientFrom: "from-indigo-900/30",
    gradientTo: "to-teal-900/10",
    accentColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "names-rahman",
    category: "names",
    categoryLabelBn: "আসমাউল হুসনা",
    titleBn: "আর-রহমান ও আর-রহীম (পরম করুণাময় ও অসীম দয়ালু)",
    titleEn: "Ar-Rahman & Ar-Raheem",
    subtitleBn: "আল্লাহর অসীম রহমত ও করুণার বিস্তারিত তাফসীর ও আমল",
    badgeBn: "৯৯ নাম",
    reasonBn: "যে আল্লাহর রহমত স্মরণ করে, তার অন্তরে পরম প্রশান্তি আসে",
    href: "/names-of-allah",
    iconName: "sparkles",
    gradientFrom: "from-amber-900/30",
    gradientTo: "to-yellow-900/10",
    accentColor: "text-amber-500",
  },
  {
    id: "tools-tasbih",
    category: "tools",
    categoryLabelBn: "ইসলামিক টুলস",
    titleBn: "দৈনিক তাসবীহ ও যিকির কাউন্টার",
    titleEn: "Smart Digital Tasbih Counter",
    subtitleBn: "সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার পাঠের ডিজিটাল মাধ্যম",
    badgeBn: "প্রাত্যহিক আমল",
    reasonBn: "প্রতিদিনের যিকির লক্ষ্য পূরণ ও আত্মিক প্রশান্তির জন্য",
    href: "/tasbih",
    iconName: "compass",
    gradientFrom: "from-teal-900/30",
    gradientTo: "to-emerald-900/10",
    accentColor: "text-teal-600 dark:text-teal-400",
  },
]

export function getUserInterestProfile(): UserInterestProfile {
  if (typeof window === "undefined") {
    return {
      categories: { quran: 1, hadith: 1, companion: 1, dua: 1, names: 1, tools: 1, blog: 1 },
      recentHistory: [],
      totalInteractions: 0,
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {}

  return {
    categories: { quran: 1, hadith: 1, companion: 1, dua: 1, names: 1, tools: 1, blog: 1 },
    recentHistory: [],
    totalInteractions: 0,
  }
}

export function trackUserInteraction(category: ContentCategory, id: string): void {
  if (typeof window === "undefined") return

  try {
    const profile = getUserInterestProfile()
    profile.categories[category] = (profile.categories[category] || 0) + 3
    profile.totalInteractions += 1

    profile.recentHistory.unshift({
      category,
      id,
      timestamp: Date.now(),
      weight: 1,
    })

    // Keep history bounded
    if (profile.recentHistory.length > 25) {
      profile.recentHistory = profile.recentHistory.slice(0, 25)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {}
}

export function getPersonalizedRecommendations(
  activeTopicFilter: ContentCategory | "all" = "all",
  limit = 4
): { items: RecommendationItem[]; dominantTopicBn: string; userActivityCount: number } {
  const profile = getUserInterestProfile()

  // Find dominant topic
  let maxWeight = 0
  let dominantCategory: ContentCategory = "quran"

  for (const [cat, weight] of Object.entries(profile.categories) as [ContentCategory, number][]) {
    if (weight > maxWeight) {
      maxWeight = weight
      dominantCategory = cat
    }
  }

  const topicLabelsBn: Record<ContentCategory, string> = {
    quran: "পবিত্র কুরআন অধ্যয়ন",
    hadith: "বিশুদ্ধ হাদিস পাঠ",
    companion: "সাহাবীদের সোনালী জীবনী",
    dua: "মাসনূন দু'আ ও যিকির",
    names: "আসমাউল হুসনা",
    tools: "প্রাত্যহিক ইসলামিক টুলস",
    blog: "ইসলামিক প্রবন্ধ",
  }

  let candidates = [...DEFAULT_RECOMMENDATION_POOL]

  // Filter if active topic filter is applied
  if (activeTopicFilter !== "all") {
    candidates = candidates.filter((item) => item.category === activeTopicFilter)
  } else {
    // Sort candidate items dynamically based on user interest weight
    candidates.sort((a, b) => {
      const weightA = profile.categories[a.category] || 1
      const weightB = profile.categories[b.category] || 1

      // Boost items matching dominant category
      const boostA = a.category === dominantCategory ? 3 : 0
      const boostB = b.category === dominantCategory ? 3 : 0

      return (weightB + boostB) - (weightA + boostA)
    })
  }

  return {
    items: candidates.slice(0, limit),
    dominantTopicBn: topicLabelsBn[dominantCategory] || "ইসলামিক জ্ঞান চর্চা",
    userActivityCount: profile.totalInteractions,
  }
}
