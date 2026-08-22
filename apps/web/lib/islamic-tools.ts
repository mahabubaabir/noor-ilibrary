export interface TasbihPreset {
  id: string
  arabic: string
  transliterationBn: string
  meaningBn: string
  defaultTarget: number
  benefitBn: string
}

export const TASBIH_PRESETS: TasbihPreset[] = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliterationBn: "সুবহানাল্লাহ",
    meaningBn: "আল্লাহ পরম পবিত্র ও মহিমান্বিত",
    defaultTarget: 33,
    benefitBn: "জান্নাতে একটি খেজুর গাছ রোপণ করা হয় এবং গুনাহ মাফ হয়।",
  },
  {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliterationBn: "আলহামদুলিল্লাহ",
    meaningBn: "সমস্ত প্রশংসা একমাত্র আল্লাহর জন্য",
    defaultTarget: 33,
    benefitBn: "মিযানের পাল্লা নেকিতে ভরপুর করে দেয়।",
  },
  {
    id: "allahu-akbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliterationBn: "আল্লাহু আকবার",
    meaningBn: "আল্লাহ সর্বশ্রেষ্ঠ ও মহান",
    defaultTarget: 34,
    benefitBn: "আসমান ও যমীনের মধ্যবর্তী স্থান সওয়াবে পূর্ণ করে।",
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliterationBn: "আস্তাগফিরুল্লাহ",
    meaningBn: "আমি আল্লাহর নিকট ক্ষমা প্রার্থনা করছি",
    defaultTarget: 100,
    benefitBn: "আল্লাহ বান্দার সকল দুশ্চিন্তা দূর করেন ও অপ্রত্যাশিত রিযিক দান করেন।",
  },
  {
    id: "la-ilaha-illallah",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliterationBn: "লা ইলাহা ইল্লাল্লাহ",
    meaningBn: "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই",
    defaultTarget: 100,
    benefitBn: "সর্বোত্তম যিকির এবং জান্নাতের চাবিকাঠি।",
  },
  {
    id: "salawat",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    transliterationBn: "আল্লাহুম্মা সাল্লি 'আলা মুহাম্মাদ",
    meaningBn: "হে আল্লাহ! মুহাম্মাদ ﷺ এর ওপর রহমত বর্ষণ করুন",
    defaultTarget: 100,
    benefitBn: "একবার পাঠে ১০টি রহমত বর্ষিত হয়, ১০টি গুনাহ মাফ হয় ও ১০টি মর্যাদা বৃদ্ধি পায়।",
  },
  {
    id: "la-hawla",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliterationBn: "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
    meaningBn: "আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই",
    defaultTarget: 100,
    benefitBn: "জান্নাতের অমূল্য রত্নভাণ্ডারের একটি ধন।",
  },
]

// Zakat Calculation Constants & Helpers
export const DEFAULT_NISAB_GOLD_GRAMS = 87.48 // 7.5 tola
export const DEFAULT_NISAB_SILVER_GRAMS = 612.36 // 52.5 tola

export const DEFAULT_GOLD_PRICE_PER_GRAM_BDT = 11500
export const DEFAULT_SILVER_PRICE_PER_GRAM_BDT = 180

export function calculateZakat({
  cashInHand,
  bankSavings,
  goldValue,
  silverValue,
  businessStock,
  investments,
  debtsOwedToYou,
  shortTermDebts,
  nisabThreshold,
}: {
  cashInHand: number
  bankSavings: number
  goldValue: number
  silverValue: number
  businessStock: number
  investments: number
  debtsOwedToYou: number
  shortTermDebts: number
  nisabThreshold: number
}): {
  totalAssets: number
  netWealth: number
  isEligible: number
  zakatPayable: number
} {
  const totalAssets =
    cashInHand +
    bankSavings +
    goldValue +
    silverValue +
    businessStock +
    investments +
    debtsOwedToYou

  const netWealth = Math.max(0, totalAssets - shortTermDebts)
  const isEligible = netWealth >= nisabThreshold ? 1 : 0
  const zakatPayable = isEligible ? netWealth * 0.025 : 0

  return {
    totalAssets,
    netWealth,
    isEligible,
    zakatPayable,
  }
}
