export interface HisnulChapter {
  id: string
  chapterNumber: number
  titleBn: string
  titleEn: string
  icon: string
  duas: {
    id: string
    titleBn: string
    arabic: string
    transliterationBn: string
    transliterationEn: string
    translationBn: string
    translationEn: string
    reference: string
    instructionBn?: string
    benefitBn?: string
  }[]
}

export const HISNUL_MUSLIM_CHAPTERS: HisnulChapter[] = [
  {
    id: "sleep-waking",
    chapterNumber: 1,
    titleBn: "ঘুম ও জাগ্রত হওয়ার যিকির",
    titleEn: "Supplications for Sleep & Waking",
    icon: "🌙",
    duas: [
      {
        id: "waking-1",
        titleBn: "ঘুম থেকে জাগ্রত হওয়ার পর দু'আ",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliterationBn: "আলহামদু লিল্লাহিল্লাযী আহ্ইয়ানা বা'দা মা আমাতানা ওয়া ইলাইহিন নুশূর।",
        transliterationEn: "Alhamdu lillahilladhi ahyana ba'da ma amatana wa ilayhin-nushoor.",
        translationBn: "সকল প্রশংসা সেই আল্লাহর জন্য, যিনি (নিদ্রারূপ) মৃত্যুর পর আমাদের পুনরায় জীবন দান করলেন এবং তাঁরই কাছে সকলের পুনরুত্থান।",
        translationEn: "All praise is for Allah who gave us life after having caused us to die and unto Him is the resurrection.",
        reference: "সহীহ বুখারী (৬৩১২), সহীহ মুসলিম (২৭১১)",
      },
      {
        id: "sleep-1",
        titleBn: "ঘুমানোর পূর্বে পাঠ করার দু'আ",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliterationBn: "বিসমিকাল্লাহুম্মা আমূতু ওয়া আহ্ইয়া।",
        transliterationEn: "Bismika Allahumma amootu wa ahya.",
        translationBn: "হে আল্লাহ! আপনারই নামে আমি মৃত্যুবরণ (নিদ্রা গ্রহণ) করছি এবং জীবিত (জাগ্রত) হচ্ছি।",
        translationEn: "In Your name, O Allah, I die and I live.",
        reference: "সহীহ বুখারী (৬৩২৪), সহীহ মুসলিম (২৭১১)",
        instructionBn: "ডান কাত হয়ে ডান হাত গালের নিচে রেখে পাঠ করা সুন্নাত।",
      },
    ],
  },
  {
    id: "restroom-ablution",
    chapterNumber: 2,
    titleBn: "টয়লেট ও ওযুর সুন্নাত দু'আ",
    titleEn: "Supplications for Restroom & Ablution",
    icon: "💧",
    duas: [
      {
        id: "toilet-enter",
        titleBn: "টয়লেটে প্রবেশের পূর্বে দু'আ",
        arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
        transliterationBn: "বিসমিল্লাহি, আল্লাহুম্মা ইন্নী আ'ঊযু বিকা মিনাল খুবছি ওয়াল খাবা-ইছ।",
        transliterationEn: "Bismillahi, Allahumma innee a'oodhu bika minal-khubthi wal-khaba'ith.",
        translationBn: "আল্লাহর নামে। হে আল্লাহ! আমি আপনার আশ্রয় চাই অপবিত্র পুরুষ ও নারী শয়তানদের অনিষ্ট থেকে।",
        translationEn: "In the name of Allah. O Allah, I seek refuge with You from all evil and evil-doers.",
        reference: "সহীহ বুখারী (১৪২), সহীহ মুসলিম (৩৭৫)",
        instructionBn: "বাম পা দিয়ে প্রবেশ করা সুন্নাত।",
      },
      {
        id: "toilet-exit",
        titleBn: "টয়লেট থেকে বের হওয়ার পর দু'আ",
        arabic: "غُفْرَانَكَ",
        transliterationBn: "গুফরানাকা।",
        transliterationEn: "Ghufranaka.",
        translationBn: "হে আল্লাহ! আমি আপনার নিকট ক্ষমা প্রার্থনা করছি।",
        translationEn: "I ask You for Your forgiveness.",
        reference: "সুনান আবু দাউদ (১৭), জামে তিরমিযী (৭)",
        instructionBn: "ডান পা দিয়ে বের হওয়া সুন্নাত।",
      },
      {
        id: "wudu-after",
        titleBn: "ওযু সমাপ্ত করার পর কালেমা শাহাদাত",
        arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        transliterationBn: "আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান 'আবদুহু ওয়া রাসূলুহু। আল্লাহুম্মাজ'আলনী মিনাত তাওয়াবীনা ওয়াজ'আলনী মিনাল মুতাত্বহহিরীন।",
        transliterationEn: "Ashhadu alla ilaha illallahu wahdahu la shareeka lah...",
        translationBn: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই, তিনি এক ও অংশীদারহীন। আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মাদ ﷺ তাঁর বান্দা ও রাসূল। হে আল্লাহ! আমাকে তওবাকারীদের অন্তর্ভুক্ত করুন এবং পবিত্রতা অর্জনকারীদের অন্তর্ভুক্ত করুন।",
        translationEn: "I bear witness that there is no deity except Allah alone, without partner...",
        reference: "সহীহ মুসলিম (২৩৪), জামে তিরমিযী (৫৫)",
        benefitBn: "রাসূলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি ওযু শেষে এটি পাঠ করবে, তার জন্য জান্নাতের ৮টি দরজাই উন্মুক্ত হয়ে যাবে।",
      },
    ],
  },
  {
    id: "mosque-prayer",
    chapterNumber: 3,
    titleBn: "মসজিদ ও সালাতের দু'আ",
    titleEn: "Supplications for the Mosque & Prayer",
    icon: "🕌",
    duas: [
      {
        id: "masjid-enter",
        titleBn: "মসজিদে প্রবেশের দু'আ",
        arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliterationBn: "বিসমিল্লাহি ওয়াস সালাতু ওয়াস সালামু 'আলা রাসূলিল্লাহ, আল্লাহুম্মাফ তাহ্ লী আবওয়াবা রাহমাতিকা।",
        transliterationEn: "Bismillahi was-salatu was-salamu 'ala Rasulillah, Allahummaf-tah lee abwaba rahmatik.",
        translationBn: "আল্লাহর নামে, আর সালাত ও সালাম রাসূলুল্লাহ ﷺ-এর ওপর। হে আল্লাহ! আমার জন্য আপনার রহমতের দরজাসমূহ উন্মুক্ত করে দিন।",
        translationEn: "In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, open for me the doors of Your mercy.",
        reference: "সহীহ মুসলিম (৭১৩)",
        instructionBn: "ডান পা দিয়ে মসজিদে প্রবেশ করা সুন্নাত।",
      },
      {
        id: "masjid-exit",
        titleBn: "মসজিদ থেকে বের হওয়ার দু'আ",
        arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliterationBn: "বিসমিল্লাহি ওয়াস সালাতু ওয়াস সালামু 'আলা রাসূলিল্লাহ, আল্লাহুম্মা ইন্নী আস-আলুকা মিন ফাদ্বলিকা।",
        transliterationEn: "Bismillahi was-salatu was-salamu 'ala Rasulillah, Allahumma innee as'aluka min fadlik.",
        translationBn: "আল্লাহর নামে, আর সালাত ও সালাম রাসূলুল্লাহ ﷺ-এর ওপর। হে আল্লাহ! আমি আপনার অনুগ্রহ ও বরকত প্রার্থনা করছি।",
        translationEn: "In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your favor.",
        reference: "সহীহ মুসলিম (৭১৩)",
        instructionBn: "বাম পা দিয়ে বের হওয়া সুন্নাত।",
      },
    ],
  },
  {
    id: "food-drink",
    chapterNumber: 4,
    titleBn: "খাবার ও পানীয় গ্রহণের দু'আ",
    titleEn: "Supplications for Food & Drink",
    icon: "🍽️",
    duas: [
      {
        id: "food-start",
        titleBn: "খাবার শুরুর পূর্বে দু'আ",
        arabic: "بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ",
        transliterationBn: "বিসমিল্লাহি ওয়া 'আলা বারাকাতিল্লাহ।",
        transliterationEn: "Bismillahi wa 'ala barakatillah.",
        translationBn: "আল্লাহর নামে এবং আল্লাহর বরকতের ওপর ভরসা করে খাওয়া শুরু করছি।",
        translationEn: "In the name of Allah and with the blessings of Allah.",
        reference: "সুনান আবু দাউদ (৩৭৬৭), মুসতাদরাক হাকিম",
      },
      {
        id: "food-end",
        titleBn: "খাবার সমাপ্ত করার পর দু'আ",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliterationBn: "আলহামদু লিল্লাহিল্লাযী আত'আমানী হাযা ওয়া রাযাক্বানীহি মিন গাইরি হাওলিম মিন্নী ওয়ালা ক্বুওয়াহ।",
        transliterationEn: "Alhamdu lillahilladhi at'amanee hadha wa razaqaneehi min ghayri hawlin minnee wa la quwwah.",
        translationBn: "সমস্ত প্রশংসা সেই আল্লাহর, যিনি আমাকে এই খাদ্য আহার করিয়েছেন এবং আমার কোনো নিজস্ব শক্তি ও সামর্থ্য ছাড়াই আমাকে রিযিক দিয়েছেন।",
        translationEn: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
        reference: "জামে তিরমিযী (৩৪৫৮), সুনান আবু দাউদ (৪০২৩)",
        benefitBn: "যে ব্যক্তি খাবার শেষে এই দু'আ পাঠ করে, তার অতীতের সমস্ত সগীরা গুনাহ ক্ষমা করে দেওয়া হয়।",
      },
    ],
  },
  {
    id: "home-travel",
    chapterNumber: 5,
    titleBn: "বাড়ি ও সফরের দু'আ",
    titleEn: "Supplications for Home & Travel",
    icon: "🚗",
    duas: [
      {
        id: "home-exit",
        titleBn: "ঘর থেকে বের হওয়ার সময় দু'আ",
        arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliterationBn: "বিসমিল্লাহি, তাওয়াক্কালতু 'আলাল্লাহ, ওয়ালা হাওলা ওয়ালা ক্বুওয়াতা ইল্লা বিল্লাহ।",
        transliterationEn: "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah.",
        translationBn: "আল্লাহর নামে, আল্লাহর ওপরই ভরসা করলাম। আল্লাহর সাহায্য ব্যতীত কোনো পাপ থেকে বাঁচার বা পুণ্য অর্জনের শক্তি নেই।",
        translationEn: "In the name of Allah, I trust in Allah; there is no power and no strength except with Allah.",
        reference: "সুনান আবু দাউদ (৫০৯৫), জামে তিরমিযী (৩৪২৬)",
        benefitBn: "ফেরেশতাগণ বলেন: তুমি হেদায়েত পেয়েছ, তোমাকে রক্ষা করা হয়েছে এবং শয়তান তোমার থেকে দূরে সরে যায়।",
      },
      {
        id: "travel-vehicle",
        titleBn: "যানবাহনে আরোহণের দু'আ",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
        transliterationBn: "সুবহানাল্লাযী সাখখারা লানা হাযা ওয়া মা কুন্না লাহূ মুক্বরিনীন, ওয়া ইন্না ইলা রাব্বিনা লামুনক্বালিবূন।",
        transliterationEn: "Subhanalladhi sakh-khara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon.",
        translationBn: "পবিত্র সেই মহান সত্তা, যিনি এই বাহনকে আমাদের বশীভূত করে দিয়েছেন, অথচ আমরা একে বশীভূত করতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের প্রতিপালকের কাছেই প্রত্যাবর্তনকারী।",
        translationEn: "Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed we to our Lord will return.",
        reference: "সূরা আয-যুখরুফ (৪৩:১৩-১৪) — সহীহ মুসলিম (১৩৪২)",
      },
    ],
  },
]
