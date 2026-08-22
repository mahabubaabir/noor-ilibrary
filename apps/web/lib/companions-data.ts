export interface CompanionSection {
  heading: string
  text: string
  hadithOrQuoteRef?: string
  reflection?: string
}

export interface CompanionItem {
  id: string
  slug: string
  nameBn: string
  nameEn: string
  arabicName: string
  titleBn: string
  titleEn: string
  category: "caliphs" | "ashara" | "mothers" | "prominent" | "youth"
  categoryLabelBn: string
  categoryLabelEn: string
  era: string
  shortBioBn: string
  shortBioEn: string
  readTime: string
  avatarIcon: string
  keyAttributesBn: string[]
  keyAttributesEn: string[]
  lifeLessonsBn: string[]
  lifeLessonsEn: string[]
  sectionsBn: CompanionSection[]
  sectionsEn: CompanionSection[]
}

export const COMPANION_CATEGORIES = [
  { id: "all", labelBn: "সকল সাহাবী", icon: "✨" },
  { id: "caliphs", labelBn: "খুলাফায়ে রাশেদীন", icon: "👑" },
  { id: "ashara", labelBn: "আশারায়ে মুবাশশারাহ (জান্নাতের সুসংবাদপ্রাপ্ত ১০ সাহাবী)", icon: "🌟" },
  { id: "mothers", labelBn: "উম্মাহাতুল মুমিনীন ও মহীয়সী নারী সাহাবী", icon: "🌹" },
  { id: "prominent", labelBn: "বিশিষ্ট আনসার ও মুহাজির সাহাবী", icon: "🛡️" },
]

export const COMPANIONS_COLLECTION: CompanionItem[] = [
  // 1. Abu Bakr As-Siddiq (R.A.)
  {
    id: "abu-bakr-as-siddiq",
    slug: "abu-bakr-as-siddiq",
    nameBn: "হযরত আবু বকর আস-সিদ্দিক্ব (রাঃ)",
    nameEn: "Abu Bakr As-Siddiq (R.A.)",
    arabicName: "أَبُو بَكْرٍ الصِّدِّيقُ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "আস-সিদ্দিক্ব (মহাসত্যবাদী) • ইসলামের ১ম খলিফা",
    titleEn: "As-Siddiq (The Truthful) • 1st Caliph of Islam",
    category: "caliphs",
    categoryLabelBn: "খুলাফায়ে রাশেদীন",
    categoryLabelEn: "Rightly Guided Caliphs",
    era: "৫৭৩ খ্রিষ্টাব্দ – ৬৩৪ খ্রিষ্টাব্দ",
    readTime: "৮ মিনিট",
    avatarIcon: "shield",
    shortBioBn: "পুরুষদের মধ্যে সর্বপ্রথম ইসলাম গ্রহণকারী, মিরাজের রাতের একমাত্র অটল সমর্থক, রাসূলুল্লাহ ﷺ-এর হিজরতের একান্ত সঙ্গী এবং ইসলামের প্রথম খলিফা।",
    shortBioEn: "The first adult free male to accept Islam, closest companion of the Prophet ﷺ during Hijrah, and the first Caliph of Islam.",
    keyAttributesBn: [
      "পরম সত্যবাদিতা ও ঈমানের অবিচলতা",
      "দীন ও মানবতার সেবায় সর্বস্ব বিলিয়ে দেওয়ার অনুপম দৃষ্টান্ত",
      "অগাধ নম্রতা, প্রজ্ঞা ও দূরদর্শী নেতৃত্ব",
      "নবীজি ﷺ-এর প্রতি নিঃশর্ত ভালোবাসা ও আনুগত্য"
    ],
    keyAttributesEn: [
      "Unshakable faith and absolute truthfulness",
      "Unmatched charity—donating entire wealth for the cause of Islam",
      "Profound humility, wisdom, and steadfast leadership",
      "Unconditional loyalty and love for Prophet Muhammad ﷺ"
    ],
    lifeLessonsBn: [
      "বিপদের মুখে ঈমানে অটল থাকা এবং সত্যের পক্ষে নির্ভীক অবস্থান নেওয়া।",
      "সম্পদকে কেবল আল্লাহর সন্তুষ্টি ও আর্তপীড়িত মানুষের মুক্তির হাতিয়ার হিসেবে ব্যবহার করা।",
      "ক্ষমতা ও নেতৃত্বে অধিষ্ঠিত হয়েও সাধারণ প্রজার মতো জীবনযাপন করা ও জবাবদিহিতা নিশ্চিত করা।"
    ],
    lifeLessonsEn: [
      "Remaining steadfast in faith during times of intense hardship.",
      "Using material wealth as a trust in service of Allah and humanity.",
      "Practicing exemplary humility, justice, and accountability in leadership."
    ],
    sectionsBn: [
      {
        heading: "ইসলাম গ্রহণ ও 'আস-সিদ্দিক্ব' উপাধি লাভ",
        text: "নবুওয়াত প্রকাশের পর রাসূলুল্লাহ ﷺ যখন হযরত আবু বকর (রাঃ)-এর কাছে ইসলামের দাওয়াত পেশ করেন, তখন তিনি বিন্দুমাত্র দ্বিধা বা সংশয় প্রকাশ না করে তাৎক্ষণিক ঈমান আনেন। মিরাজের ঘটনা যখন মক্কার মুশরিকরা উপহাসভরে প্রচার করছিল, আবু বকর (রাঃ) তখন দৃঢ় কণ্ঠে বলেছিলেন: 'মুহাম্মদ ﷺ যদি এ কথা বলে থাকেন, তবে তা ধ্রুব সত্য।' এই অটল বিশ্বাসের কারণে রাসূলুল্লাহ ﷺ তাঁকে 'আস-সিদ্দিক্ব' (মহাসত্যবাদী) উপাধিতে ভূষিত করেন।",
        hadithOrQuoteRef: "রাসূলুল্লাহ ﷺ বলেন: 'আমি যার কাছেই ইসলামের দাওয়াত দিয়েছি, তার মধ্যেই কিছুটা দ্বিধা দেখেছি; কেবল আবু বকর ছাড়া।' (সিরাত ইবনে হিশাম)"
      },
      {
        heading: "সম্পদ উৎসর্গ ও দাসমুক্তি",
        text: "হযরত আবু বকর (রাঃ) ছিলেন একজন সফল ও সৎ ব্যবসায়ী। ইসলামের সূচনালগ্নে যখন দুর্বল ও দাস সাহাবীদের ওপর চরম নির্যাতন চালানো হতো, তখন তিনি নিজের বিপুল অর্থ দিয়ে হযরত বিলাল (রাঃ), আমির ইবনে ফুহাইরা (রাঃ) সহ বহু নির্যাতিত দাস-দাসীকে কিনে মুক্ত করে দেন। তাবুক যুদ্ধের সময় তিনি তাঁর ঘরের যাবতীয় সম্পদ আল্লাহর রাস্তায় দান করে দেন। রাসূলুল্লাহ ﷺ যখন জিজ্ঞেস করলেন, 'পরিবারের জন্য কী রেখে এলে?', তিনি জবাব দিলেন: 'আল্লাহ এবং তাঁর রাসূলকে রেখে এসেছি।'"
      },
      {
        heading: "হিজরতের সঙ্গী ও গুহায় আশ্রয়",
        text: "মক্কার কাফেরদের হত্যার ষড়যন্ত্র থেকে রক্ষা পেয়ে মদিনায় হিজরতের চরম ঝুঁকিপূর্ণ রাতে রাসূলুল্লাহ ﷺ একমাত্র আবু বকর (রাঃ)-কেই সঙ্গী করেছিলেন। সাওর পর্বতের গুহায় যখন কাফেররা একদম গুহামুখে চলে এসেছিল, আবু বকর (রাঃ) নবীজির নিরাপত্তার চিন্তায় ব্যাকুল হয়ে উঠেন। তখন নবীজি ﷺ সান্ত্বনা দিয়ে বললেন: 'হে আবু বকর! সেই দুজনের ব্যাপারে তোমার কী ধারণা, যাদের তৃতীয়জন হলেন স্বয়ং আল্লাহ?' (সূরা আত-তাওবাহ: ৪০)।"
      },
      {
        heading: "খেলাফত ও ঐতিহাসিক ভাষণ",
        text: "রাসূলুল্লাহ ﷺ-এর ওফাতের পর মুসলিম উম্মাহ যখন শোকে স্তব্ধ ও দিশেহারা, তখন আবু বকর (রাঃ) ঐতিহাসিক ভাষণ দেন: 'তোমাদের মধ্যে যারা মুহাম্মদের ইবাদত করতে, জেনে রাখ মুহাম্মদ মৃত্যুবরণ করেছেন; আর যারা আল্লাহর ইবাদত কর, নিশ্চয়ই আল্লাহ চিরঞ্জীব, যাঁর কোনো মৃত্যু নেই।' খলিফা নির্বাচিত হয়ে তিনি জনগণের উদ্দেশে বলেন: 'আমি যদি সঠিক পথে চলি তবে আমাকে সহযোগিতা কর; আর যদি ভুল করি তবে আমাকে সংশোধন করে দাও।'"
      }
    ],
    sectionsEn: [
      {
        heading: "Acceptance of Islam and Title of As-Siddiq",
        text: "When the Prophet ﷺ presented Islam to Abu Bakr (R.A.), he accepted without a single moment of hesitation. When the Quraysh mocked the miraculous Night Journey (Isra and Mi'raj), Abu Bakr declared: 'If he said it, then it is undeniably true.' For this pure conviction, the Prophet bestowed upon him the title 'As-Siddiq' (The Truthful).",
        hadithOrQuoteRef: "The Prophet ﷺ said: 'Whenever I invited anyone to Islam, they had some hesitation, except Abu Bakr.' (Ibn Hisham)"
      },
      {
        heading: "Freeing the Oppressed and Unmatched Charity",
        text: "A wealthy and honest merchant, Abu Bakr used his fortune to buy and free brutally tortured slaves including Bilal ibn Rabah (R.A.). During the Expedition of Tabuk, Abu Bakr brought his entire wealth to the Prophet. When asked what he had left for his family, he replied: 'I have left for them Allah and His Messenger.'"
      },
      {
        heading: "The Companion of the Cave during Hijrah",
        text: "Chosen as the Prophet's sole companion on the perilous journey of Hijrah, they hid in the Cave of Thawr. When enemy trackers stood at the cave entrance, the Prophet reassured him: 'Do not grieve; indeed Allah is with us.' (Quran 9:40)."
      }
    ]
  },

  // 2. Umar ibn Al-Khattab (R.A.)
  {
    id: "umar-ibn-al-khattab",
    slug: "umar-ibn-al-khattab",
    nameBn: "হযরত উমর ইবনুল খাত্তাব (রাঃ)",
    nameEn: "Umar ibn Al-Khattab (R.A.)",
    arabicName: "عُمَرُ بْنُ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "আল-ফারুক্ব (সত্য-মিথ্যার প্রভেদকারী) • ইসলামের ২য় খলিফা",
    titleEn: "Al-Faruq (The Distinguisher) • 2nd Caliph of Islam",
    category: "caliphs",
    categoryLabelBn: "খুলাফায়ে রাশেদীন",
    categoryLabelEn: "Rightly Guided Caliphs",
    era: "৫৮৪ খ্রিষ্টাব্দ – ৬৪৪ খ্রিষ্টাব্দ",
    readTime: "৯ মিনিট",
    avatarIcon: "scale",
    shortBioBn: "সাহসিকতা, সুবিচার ও ইনসাফের কালজয়ী প্রতীক। যাঁর ইসলাম গ্রহণে মুসলিমরা কাবা প্রাঙ্গণে প্রকাশ্যে সালাত আদায় করতে পেরেছিলেন এবং যাঁর শাসনামলে সুবিচারের সোনালী ইতিহাস রচিত হয়েছিল।",
    shortBioEn: "The pinnacle of justice, strength, and visionary governance. His conversion brought glory to Islam, and his caliphate set the gold standard for equity.",
    keyAttributesBn: [
      "আপসহীন সুবিচার ও ইনসাফ প্রতিষ্ঠা",
      "প্রজাবৎসলতা ও রাতের আঁধারে ছদ্মবেশে প্রজাদের খোঁজখবর নেওয়া",
      "প্রশাসনিক সংস্কার ও জনকল্যাণমুখী রাষ্ট্রীয় ব্যবস্থার প্রবর্তন",
      "চরম আত্মসংযম ও সাধারণ জীবনযাপন"
    ],
    keyAttributesEn: [
      "Uncompromising justice regardless of kinship or wealth",
      "Night patrols to personally check on the destitute and hungry",
      "Founding pioneering welfare systems, courts, and the Hijri calendar",
      "Extreme modesty, self-discipline, and fear of Allah"
    ],
    lifeLessonsBn: [
      "আইনের চোখে ধনী-গরিব, শাসক ও প্রজার সমান অধিকার প্রতিষ্ঠা করা।",
      "দায়িত্বশীল পদে থাকলে প্রতিটি নাগরিকের সুখ-দুঃখের জবাবদিহিতার অনুভূতি অন্তরে লালন করা।",
      "ভুল হলে দ্বিধাহীন চিত্তে সত্য ও ন্যায়কে মাথা পেতে মেনে নেওয়া।"
    ],
    lifeLessonsEn: [
      "Equal application of the law without fear or favoritism.",
      "Leaders must carry deep empathy and personal accountability for their people.",
      "The humility to accept correction openly when presented with truth."
    ],
    sectionsBn: [
      {
        heading: "ইসলাম গ্রহণ ও সাহসিকতা",
        text: "হযরত উমর (রাঃ)-এর ইসলাম গ্রহণের পেছনে ছিল রাসূলুল্লাহ ﷺ-এর বিশেষ দু'আ: 'হে আল্লাহ! আবু জাহেল অথবা উমর—এই দুজনের মধ্যে যে তোমার নিকট অধিক প্রিয়, তাকে দিয়ে ইসলামকে শক্তিশালী কর।' বোন ফাতিমা ও ভগ্নিপতির ঘরে সূরা ত্বাহা-এর আয়াত শুনে তাঁর অন্তর বিগলিত হয়। ইসলাম গ্রহণের পর তিনি মক্কার মুশরিকদের চোখে চোখ রেখে কাবা প্রাঙ্গণে গিয়ে প্রকাশ্যে সালাত আদায় করেন। তাঁর এই নির্ভীকতার কারণে রাসূলুল্লাহ ﷺ তাঁকে 'আল-ফারুক্ব' উপাধি দেন।"
      },
      {
        heading: "ইনসাফ ও প্রজাবৎসলতার অনুপম দৃষ্টান্ত",
        text: "খলিফা হওয়ার পর উমর (রাঃ) রাতে ছদ্মবেশে মদিনার অলিতে-গলিতে ঘুরে বেড়াতেন। এক রাতে তিনি দেখতে পান, এক নারী হাঁড়িতে পানি ও পাথর ফুটাচ্ছে যাতে ক্ষুধায় ক্রন্দনরত শিশুরা মনে করে খাবার রান্না হচ্ছে এবং তারা ঘুমিয়ে পড়ে। এই দৃশ্য দেখে উমর (রাঃ) নিজে বাইতুল মাল থেকে আটার বস্তা ও ঘি নিজের কাঁধে বহন করে এনে শিশুদের রান্না করে খাওয়ান। সাহায্যকারী যখন বস্তা বহন করতে চাইল, তিনি বললেন: 'কিয়ামতের দিন কি তুমি আমার গুনাহের বোঝা বহন করবে?'"
      },
      {
        heading: "জেরুজালেম বিজয় ও সাম্য",
        text: "জেরুজালেমের খ্রিস্টান প্যাট্রিয়ার্ক যখন মুসলিম খলিফার কাছে নগরীর চাবি হস্তান্তরের শর্ত দিলেন, তখন উমর (রাঃ) মদিনা থেকে জেরুজালেমে রওয়ানা হলেন একটিমাত্র উটে চড়ে—যাতে তিনি ও তাঁর দাস পালাক্রমে সওয়ার হচ্ছিলেন। জেরুজালেমে প্রবেশের সময় ছিল দাসের চড়ার পালা। উমর (রাঃ) উটের লাগাম ধরে হেঁটে নগরীতে প্রবেশ করলেন। তাঁর এই অভূতপূর্ব বিনয় ও সাম্য দেখে বিশ্ববাসী বিস্মিত হয়ে ইসলাম গ্রহণ করে।"
      }
    ],
    sectionsEn: [
      {
        heading: "Conversion and Bold Steadfastness",
        text: "Umar's conversion was an answer to the Prophet's prayer: 'O Allah, strengthen Islam through the one more beloved to You of the two: Abu Jahl or Umar.' After hearing verses from Surah Ta-Ha, his heart embraced faith. He marched directly to the Kaaba, leading Muslims to pray publicly for the first time."
      },
      {
        heading: "The Relentless Pursuit of Justice",
        text: "Umar famously declared: 'If a stray camel dies of neglect on the bank of the Euphrates, I fear that Allah will hold Umar accountable for it.' He established the welfare system, the police force, postal services, and organized judicial bodies."
      }
    ]
  },

  // 3. Uthman ibn Affan (R.A.)
  {
    id: "uthman-ibn-affan",
    slug: "uthman-ibn-affan",
    nameBn: "হযরত উসমান ইবনে আফফান (রাঃ)",
    nameEn: "Uthman ibn Affan (R.A.)",
    arabicName: "عُثْمَانُ بْنُ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "যুন-নুরাইন (দুই জ্যোতির অধিকারী) • ইসলামের ৩য় খলিফা",
    titleEn: "Dhun-Nurayn (Possessor of Two Lights) • 3rd Caliph of Islam",
    category: "caliphs",
    categoryLabelBn: "খুলাফায়ে রাশেদীন",
    categoryLabelEn: "Rightly Guided Caliphs",
    era: "৫৭৬ খ্রিষ্টাব্দ – ৬৫৬ খ্রিষ্টাব্দ",
    readTime: "৭ মিনিট",
    avatarIcon: "book",
    shortBioBn: "লজ্জাশীলতা ও অতুলনীয় দানশীলতার প্রতীক। রাসূলুল্লাহ ﷺ-এর দুই কন্যাকে বিয়ে করার সৌভাগ্য অর্জনকারী এবং পবিত্র কুরআনকে এক প্রমিত লিপিতে সংকলনকারী খলিফা।",
    shortBioEn: "Renowned for supreme modesty and generosity. Husband to two of the Prophet's daughters and compiler of the standardized Quranic text.",
    keyAttributesBn: [
      "অতুলনীয় লজ্জাশীলতা ও চরিত্রের পবিত্রতা",
      "উম্মতের প্রয়োজনে অফুরন্ত দান (রূমার কূপ ক্রয়, তাবুক অভিযানের রসদ)",
      "কুরআনুল কারীমের প্রমিত সংস্করণ সমগ্র বিশ্বে সংরক্ষণ ও বিতরণ",
      "মুসলিম রক্তপাত এড়াতে নিজের জীবন বিলিয়ে দেওয়া"
    ],
    keyAttributesEn: [
      "Paragon of modesty—even angels felt shy in his presence",
      "Infinite generosity in purchasing the Well of Rumah and funding expeditions",
      "Standardizing and distributing the unified text of the Holy Quran",
      "Refusing to shed Muslim blood to save his own life during the siege"
    ],
    lifeLessonsBn: [
      "লজ্জাশীলতাকে চরিত্রের অন্যতম শ্রেষ্ঠ ভূষণ হিসেবে গ্রহণ করা।",
      "ব্যবসায় উপার্জিত অর্থ সমাজ ও মানবতার কল্যাণে অকাতরে ব্যয় করা।",
      "শান্তি ও ঐক্যের জন্য চরম প্ররোচনার মুখেও ধৈর্য ও সহনশীলতা প্রদর্শন করা।"
    ],
    lifeLessonsEn: [
      "Upholding modesty and decorum in every sphere of life.",
      "Investing commercial success back into the upliftment of the community.",
      "Preserving peace, unity, and patience even when facing personal injustice."
    ],
    sectionsBn: [
      {
        heading: "লজ্জাশীলতা ও ফেরেশতাদের সম্মান",
        text: "হযরত উসমান (রাঃ) ছিলেন স্বভাবগতভাবেই অত্যন্ত লজ্জাশীল ও বিনয়ী। হযরত আয়েশা (রাঃ) বর্ণনা করেন, রাসূলুল্লাহ ﷺ একদিন ঘরে আরাম করছিলেন। আবু বকর ও উমর (রাঃ) ঘরে এলে তিনি স্বাভাবিক ছিলেন, কিন্তু উসমান (রাঃ) প্রবেশ করতেই তিনি চাদর ঠিক করে সোজা হয়ে বসলেন। পরে কারণ জানতে চাইলে নবীজি ﷺ বললেন: 'আমি কি এমন ব্যক্তিকে দেখে লজ্জা করব না, যাকে দেখে আসমানের ফেরেশতারাও লজ্জা পায়?'"
      },
      {
        heading: "রূমার কূপ ও দুর্ভিক্ষে দান",
        text: "মদিনায় হিজরতের পর পানির চরম সংকট দেখা দেয়। তখন এক ইহুদির মালিকানাধীন 'রূমার কূপ' থেকে উচ্চমূল্যে পানি কিনতে হতো। রাসূলুল্লাহ ﷺ বললেন: 'যে ব্যক্তি রূমার কূপ কিনে মুসলমানদের জন্য ওয়াকফ করবে, তার জন্য জান্নাত।' উসমান (রাঃ) নিজের বিপুল অর্থ দিয়ে কূপটি কিনে সকল মানুষের জন্য উন্মুক্ত করে দেন। মদিনার দুর্ভিক্ষের সময় তাঁর শত শত উট বোঝাই খাদ্যশস্য মদিনায় পৌঁছালে তিনি কোনো অতিরিক্ত মুনাফা না নিয়ে সব খাদ্য গরিব-অসহায়দের মাঝে বিনামূল্যে বিলিয়ে দেন।"
      },
      {
        heading: "মুসহাফে উসমানী — কুরআন সংকলন",
        text: "ইসলাম যখন রোম, পারস্য ও নানা অনারব ভূখণ্ডে দ্রুত ছড়িয়ে পড়ছিল, তখন উচ্চারণ ও ক্বিরাতের বিভিন্নতা নিয়ে বিভ্রান্তি তৈরি হওয়ার আশঙ্কা দেখা দেয়। হযরত উসমান (রাঃ) যায়েদ ইবনে সাবিত (রাঃ)-এর নেতৃত্বে সাহাবীদের নিয়ে একটি কমিটি গঠন করেন এবং কুরাইশ উপভাষার ভিত্তিতে প্রমিত 'মুসহাফে উসমানী' সংকলন করে সমস্ত প্রদেশে প্রেরণ করেন। আজ বিশ্বজুড়ে কোটি কোটি মানুষের হাতে যে কুরআন শোভা পাচ্ছে, তা উসমান (রাঃ)-এর সেই মহৎ কীর্তিরই ধারাবাহিকতা।"
      }
    ],
    sectionsEn: [
      {
        heading: "Unmatched Modesty and Generosity",
        text: "The Prophet ﷺ remarked: 'Shall I not feel shy before a man whom even the angels feel shy of?' Uthman bought the Well of Rumah with his personal fortune to supply free water to Madinah, and financed one-third of the entire army for the expedition of Tabuk."
      },
      {
        heading: "Compilation of the Mus'haf Uthmani",
        text: "To prevent disputes over dialectical pronunciation across the expanding Islamic empire, Uthman oversaw the compilation of the standardized Quranic text, preserving the Word of Allah immutably for all generations."
      }
    ]
  },

  // 4. Ali ibn Abi Talib (R.A.)
  {
    id: "ali-ibn-abi-talib",
    slug: "ali-ibn-abi-talib",
    nameBn: "হযরত আলী ইবনে আবি তালিব (রাঃ)",
    nameEn: "Ali ibn Abi Talib (R.A.)",
    arabicName: "عَلِيُّ بْنُ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "আসাদুল্লাহ (আল্লাহর সিংহ) • জ্ঞানের নগরীর তোরণ • ৪র্থ খলিফা",
    titleEn: "Asadullah (Lion of Allah) • Gate to Knowledge • 4th Caliph",
    category: "caliphs",
    categoryLabelBn: "খুলাফায়ে রাশেদীন",
    categoryLabelEn: "Rightly Guided Caliphs",
    era: "৬০১ খ্রিষ্টাব্দ – ৬৬১ খ্রিষ্টাব্দ",
    readTime: "৯ মিনিট",
    avatarIcon: "zap",
    shortBioBn: "শিশুদের মধ্যে প্রথম ইসলাম গ্রহণকারী, রাসূলুল্লাহ ﷺ-এর জামাতা, খায়বার বিজয়ের বীর সেনানী এবং অসাধারণ প্রজ্ঞা ও ফিকাহর আধার।",
    shortBioEn: "The first child to embrace Islam, cousin and son-in-law of the Prophet ﷺ, victor of Khaybar, and legendary hero of wisdom and eloquence.",
    keyAttributesBn: [
      "অকুতোভয় বীরত্ব ও রণাঙ্গনে অপরাজেয় নেতৃত্ব",
      "উন্মুক্ত জ্ঞানের আধার ও অতুলনীয় প্রজ্ঞা",
      "চরম দারিদ্র্যের মাঝেও সন্তুষ্টি ও যুহদ (দুনিয়াবিমুখতা)",
      "ইসলামের প্রতি অটল আত্মত্যাগ (হিজরতের রাতে নবীজির বিছানায় শয়ন)"
    ],
    keyAttributesEn: [
      "Legendary courage and mastery in battle",
      "Vast knowledge in Islamic jurisprudence and eloquent wisdom",
      "Deep asceticism and contentedness in a simple lifestyle",
      "Willingness to sacrifice life (sleeping in the Prophet's bed on the night of Hijrah)"
    ],
    lifeLessonsBn: [
      "অন্যায় ও ভয়ের মুখে সত্যের পক্ষে বীর বিক্রমে দাঁড়িয়ে থাকা।",
      "জ্ঞানার্জন ও প্রজ্ঞাকে জীবনের শ্রেষ্ঠ ধন হিসেবে বিবেচনা করা।",
      "ব্যক্তিগত ক্রোধ বা অহংকারকে দ্বীনি উদ্দেশ্যের সাথে কখনো গুলিয়ে না ফেলা।"
    ],
    lifeLessonsEn: [
      "Standing courageously for justice against all odds.",
      "Pursuing wisdom, spiritual insight, and deep knowledge of the Quran.",
      "Never acting out of personal ego or vengeance."
    ],
    sectionsBn: [
      {
        heading: "হিজরতের রাতে আত্মত্যাগ ও বিশ্বস্ততা",
        text: "হিজরতের রাতে যখন মক্কার অস্ত্রধারী যুবকরা রাসূলুল্লাহ ﷺ-এর ঘর ঘিরে রেখেছিল তাঁকে হত্যা করার জন্য, তখন নবীজি ﷺ আলীকে বললেন তাঁর বিছানায় সবুজ চাদর মুড়ি দিয়ে শুয়ে থাকতে এবং মানুষের গচ্ছিত আমানতসমূহ পরদিন মালিকদের কাছে ফেরত দিয়ে মদিনায় রওয়ানা হতে। নিশ্চিত মৃত্যুর ঝুঁকি জেনেও কিশোর আলী এক মুহূর্তও দ্বিধা না করে নবীজির বিছানায় পরম শান্তিতে ঘুমিয়েছিলেন।"
      },
      {
        heading: "খায়বারের দুর্গ জয় ও নবীজির ঘোষণা",
        text: "খায়বার যুদ্ধে দুর্ভেদ্য কামুস দুর্গ যখন কিছুতেই বিজয় হচ্ছিল না, তখন রাসূলুল্লাহ ﷺ ঘোষণা করলেন: 'আগামীকাল আমি এমন এক ব্যক্তির হাতে এই পতাকা অর্পণ করব, যে আল্লাহ ও তাঁর রাসূলকে ভালোবাসে এবং আল্লাহ ও তাঁর রাসূলও তাকে ভালোবাসেন। আল্লাহ তার হাতেই বিজয় দান করবেন।' পরদিন নবীজি ﷺ আলীর চোখে থুথু মোবারক লাগিয়ে চক্ষু রোগ দূর করে তাঁর হাতে পতাকা তুলে দেন। আলী (রাঃ) বীর বিক্রমে দুর্গ জয় করেন।"
      },
      {
        heading: "জ্ঞানের তোরণ ও সরল জীবন",
        text: "রাসূলুল্লাহ ﷺ বলেছেন: 'আমি জ্ঞানের নগরী আর আলী তার তোরণ।' জ্ঞান ও প্রজ্ঞায় অনন্য হওয়া সত্ত্বেও আলী (রাঃ) ও ফাতিমা (রাঃ)-এর জীবন ছিল অতি সাধারণ। খলিফা থাকা অবস্থায়ও তিনি মোটা কাপড়ের জামা পরতেন এবং নিজ হাতে কাজ করে জীবিকা নির্বাহ করতেন। রণাঙ্গনে এক শত্রু যখন তাঁর মুখে থুথু নিক্ষেপ করেছিল, আলী (রাঃ) তলোয়ার নামিয়ে নিয়েছিলেন—যাতে তাঁর আঘাত ব্যক্তিগত ক্রোধের কারণে না হয়ে কেবলমাত্র আল্লাহর সন্তুষ্টির জন্য হয়।"
      }
    ],
    sectionsEn: [
      {
        heading: "The Perilous Night of Hijrah",
        text: "When assassins encircled the Prophet's house, Ali willingly slept in the Prophet's bed to mislead the Quraysh, later returning all trusted deposits to the people of Makkah before walking to Madinah."
      },
      {
        heading: "Victory at Khaybar and the Standard of Islam",
        text: "The Prophet ﷺ announced: 'Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.' He handed the standard to Ali, who shattered the fortress defenses and secured victory."
      }
    ]
  },

  // 5. Bilal ibn Rabah (R.A.)
  {
    id: "bilal-ibn-rabah",
    slug: "bilal-ibn-rabah",
    nameBn: "হযরত বিলাল ইবনে রাবাহ (রাঃ)",
    nameEn: "Bilal ibn Rabah (R.A.)",
    arabicName: "بِلَالُ بْنُ رَبَاحٍ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "মুয়াযযিনুর রাসূল (রাসূলের মুয়াযযিন) • ঈমানের অবিচল দুর্গ",
    titleEn: "Mu'adh-dhin of the Prophet • Symbol of Steadfast Faith",
    category: "prominent",
    categoryLabelBn: "বিশিষ্ট সাহাবী",
    categoryLabelEn: "Prominent Companions",
    era: "৫৮০ খ্রিষ্টাব্দ – ৬৪০ খ্রিষ্টাব্দ",
    readTime: "৭ মিনিট",
    avatarIcon: "volume",
    shortBioBn: "তপ্ত বালুর বুকে পাথরের নিচে চাপা পড়েও 'আহাদ, আহাদ' ধ্বনি দিয়ে তাওহীদের সাক্ষ্য দেওয়া আবিসিনীয় সাহাবী, ইসলামের প্রথম মুয়াযযিন ও মানবতার সাম্যের প্রতীক।",
    shortBioEn: "The Abyssinian slave who endured scorching desert torture repeating 'Ahad, Ahad', and rose to become Islam's first caller to prayer.",
    keyAttributesBn: [
      "অমানুষিক অত্যাচারের মুখেও ঈমানের অটল অবিচলতা",
      "মধুমাখা সুরেলা কণ্ঠে ইসলামের প্রথম আযান প্রদান",
      "বর্ণ ও জাতভেদের ঊর্ধ্বে ইসলামিক ভ্রাতৃত্ব ও মর্যাদার প্রতীক",
      "রাসূলুল্লাহ ﷺ-এর প্রতি ব্যাকুল ও অশ্রুসিক্ত ভালোবাসা"
    ],
    keyAttributesEn: [
      "Indomitable steadfastness in faith under brutal torture",
      "Selected as the very first Mu'adh-dhin of Islam",
      "Epitome of racial equality and spiritual honor in Islam",
      "Profound, tearful devotion to Prophet Muhammad ﷺ"
    ],
    lifeLessonsBn: [
      "শারীরিক বর্ণ বা সামাজিক অবস্থান নয়, বরং অন্তরের তাকওয়াই মানুষের আসল মর্যাদা।",
      "বিপদ ও প্রতিকূলতার চূড়ান্ত মুহূর্তেও এক আল্লাহর ওপর ভরসা রাখা।",
      "দ্বীনের খেদমতে নিজের কণ্ঠ, মেধা ও দক্ষতাকে নিবেদিত করা।"
    ],
    lifeLessonsEn: [
      "True nobility lies in piety (Taqwa), not lineage, race, or social background.",
      "Holding onto faith unconditionally even in moments of severe physical trial.",
      "Devoting one's voice, gifts, and soul to the worship and service of Allah."
    ],
    sectionsBn: [
      {
        heading: "মরুভূমির তপ্ত বুকে 'আহাদ! আহাদ!'",
        text: "হযরত বিলাল (রাঃ) ছিলেন মক্কার উমাইয়া ইবনে খালাফের ক্রীতদাস। ইসলাম গ্রহণের পর উমাইয়া তাঁকে উত্তপ্ত মরুভূমিতে শুইয়ে বুকের ওপর ভারী পাথর চাপা দিত এবং ইসলাম ত্যাগ করতে বলত। কিন্তু বিলাল (রাঃ) ব্যথায় কাতরালেও অবিরাম উচ্চারণ করতেন: 'আহাদ! আহাদ!' (আল্লাহ এক! আল্লাহ এক!)। পরবর্তীতে হযরত আবু বকর (রাঃ) তাঁকে উচ্চমূল্যে কিনে মুক্ত করে দেন।"
      },
      {
        heading: "মসজিদে নববীর প্রথম আযান ও কাবার চূড়া",
        text: "মদিনায় মসজিদে নববী নির্মিত হলে সালাতের জন্য আহবান জানানোর পদ্ধতি ঠিক করার পর রাসূলুল্লাহ ﷺ বিলাল (রাঃ)-কে ডেকে বললেন: 'হে বিলাল! ওঠো এবং মানুষকে সালাতের জন্য আহবান করো।' কাবার বিজয়ের দিন রাসূলুল্লাহ ﷺ বিলালকে কাবা ঘরের ছাদে উঠে আযান দেওয়ার নির্দেশ দেন। যে দাসকে মক্কার কাফেররা পায়ের তলায় পিষে ফেলতে চেয়েছিল, তিনি দাঁড়িয়েছিলেন কাবার চূড়ায়—ইসলামের সাম্যের বিজয় ঘোষণা করে।"
      },
      {
        heading: "রাসূল ﷺ-এর ওফাত ও বিলালের অশ্রু",
        text: "রাসূলুল্লাহ ﷺ-এর ওফাতের পর বিলাল (রাঃ) শোকে ভেঙে পড়েন। আযান দিতে গেলেই যখন তিনি 'আশহাদু আন্না মুহাম্মাদার রাসূলুল্লাহ' বলতেন, তখন কান্নায় তাঁর কণ্ঠ রুদ্ধ হয়ে যেত। তিনি মদিনা ছেড়ে সিরিয়ায় চলে যান। বহু বছর পর মদিনায় ফিরে তিনি যখন আবার আযান দিলেন, তখন মদিনার প্রতিটি ঘরে ঘরে মানুষ কান্নায় ভেঙে পড়েছিল নবীজির স্মৃতি মনে করে।"
      }
    ],
    sectionsEn: [
      {
        heading: "Enduring Desert Torture with 'Ahad! Ahad!'",
        text: "His master Umayyah ibn Khalaf pinned him under burning desert boulders, demanding he renounce Islam. Bilal gasped only one eternal truth: 'Ahad! Ahad!' (God is One! God is One!). Abu Bakr (R.A.) purchased and freed him."
      },
      {
        heading: "Calling the Adhan from the Roof of the Kaaba",
        text: "On the Conquest of Makkah, the Prophet instructed Bilal to climb atop the Kaaba and call the Adhan—a definitive historic blow against tribal racism and a celebration of Islamic brotherhood."
      }
    ]
  },

  // 6. Khadijah bint Khuwaylid (R.A.)
  {
    id: "khadijah-bint-khuwaylid",
    slug: "khadijah-bint-khuwaylid",
    nameBn: "হযরত খাদীজা বিনতে খুওয়াইলিদ (রাঃ)",
    nameEn: "Khadijah bint Khuwaylid (R.A.)",
    arabicName: "خَدِيجَةُ بِنْتُ خُوَيْلِدٍ رَضِيَ اللَّهُ عَنْهَا",
    titleBn: "উম্মুল মুমিনীন • তাহিরা (পরম পবিত্রা) • বিশ্বনবীর প্রথম আশ্রয়",
    titleEn: "Mother of the Believers • At-Tahirah (The Pure) • First Believer",
    category: "mothers",
    categoryLabelBn: "উম্মাহাতুল মুমিনীন",
    categoryLabelEn: "Mothers of the Believers",
    era: "৫৫৫ খ্রিষ্টাব্দ – ৬১৯ খ্রিষ্টাব্দ",
    readTime: "৮ মিনিট",
    avatarIcon: "heart",
    shortBioBn: "ইসলামের প্রথম মুমিন, সফল ও দূরদর্শী ব্যবসায়ী, হেরা গুহার প্রথম অহির পর নবীজির সবচেয়ে বিশ্বস্ত শান্তিদাত্রী এবং তাঁর সমস্ত সম্পদ ইসলামের তরে বিলিয়ে দেওয়া মহীয়সী নারী।",
    shortBioEn: "The first person to believe in Islam, successful noble merchant, and the most supportive and cherished wife of the Prophet Muhammad ﷺ.",
    keyAttributesBn: [
      "সর্বপ্রথম ইসলাম গ্রহণ ও নবীজিকে পূর্ণ সমর্থন",
      "সফল ব্যবসায়ী ও উচ্চ নৈতিক চরিত্রের অধিকারী (তাহিরা)",
      "ইসলামের কঠিনতম মুহূর্তে সকল ধন-সম্পদ উৎসর্গ",
      "আল্লাহর পক্ষ থেকে জিব্রাইল (আঃ)-এর মাধ্যমে বিশেষ সালাম প্রাপ্তি"
    ],
    keyAttributesEn: [
      "First human being to embrace Islam and comfort the Prophet ﷺ",
      "Visionary, ethical, and successful businesswoman",
      "Sacrificing immense wealth during the boycott of Shi'b Abi Talib",
      "Received personal greetings of peace (Salam) from Allah Almighty"
    ],
    lifeLessonsBn: [
      "কঠিন পরিস্থিতিতে জীবনসঙ্গীর পাশে পাহাড়ের মতো অবিচল আস্থা নিয়ে দাঁড়ানো।",
      "সততা ও নৈতিকতার সাথে ব্যবসা ও সম্পদ পরিচালনা করা।",
      "দ্বীনের জন্য নিঃস্বার্থ ত্যাগ স্বীকার করা।"
    ],
    lifeLessonsEn: [
      "Providing unyielding emotional and practical support to one's spouse.",
      "Conducting business and wealth management with uncompromising integrity.",
      "Selfless dedication to spiritual truth and community welfare."
    ],
    sectionsBn: [
      {
        heading: "হেরা গুহার প্রথম ওহি ও খাদীজার সান্ত্বনা",
        text: "হেরা গুহায় জিব্রাইল (আঃ)-এর মাধ্যমে প্রথম ওহি লাভের পর রাসূলুল্লাহ ﷺ যখন ভয়ে কাঁপতে কাঁপতে ঘরে ফিরে বললেন 'জাম্মিলূনী! জাম্মিলূনী!' (আমাকে চাদর দিয়ে আবৃত কর!), তখন খাদীজা (রাঃ) তাঁকে পরম স্নেহে জড়িয়ে ধরেন এবং ঐতিহাসিক আশ্বাসের বাণী শোনান: 'কখনোই নয়! আল্লাহর শপথ, আল্লাহ আপনাকে কখনোই লাঞ্ছিত করবেন না। কারণ আপনি আত্মীয়তার সম্পর্ক বজায় রাখেন, অসহায় মানুষের বোঝা বহন করেন, নিঃস্বকে সাহায্য করেন, মেহমানের সম্মান করেন এবং সত্য প্রতিষ্ঠায় সহযোগিতা করেন।'"
      },
      {
        heading: "সম্পদ বিলিয়ে দেওয়া ও শিয়াবে আবি তালিবে ত্যাগ",
        text: "হযরত খাদীজা (রাঃ) ছিলেন কুরাইশদের মধ্যে অন্যতম ধনী ব্যবসায়ী। ইসলাম গ্রহণের পর তিনি তাঁর সমস্ত সম্পদ রাসূলুল্লাহ ﷺ-এর হাতে তুলে দেন দ্বীনের প্রচার ও অসহায় মুসলিমদের সাহায্যের জন্য। কুরাইশরা যখন মুসলিমদের ৩ বছরব্যাপী 'শিয়াবে আবি তালিব' উপত্যকায় বন্দি ও একঘরে করে রাখে, তখন বৃদ্ধ বয়সেও খাদীজা (রাঃ) গাছের পাতা খেয়ে নবীজির পাশে অনাহারে দিন কাটিয়েছেন।"
      },
      {
        heading: "আল্লাহর সালাম ও জান্নাতের প্রাসাদ",
        text: "একদিন জিব্রাইল (আঃ) রাসূলুল্লাহ ﷺ-এর কাছে এসে বললেন: 'হে আল্লাহর রাসূল! এই যে খাদীজা একটি পাত্রে খাবার নিয়ে আপনার কাছে আসছেন। তিনি এলে তাঁকে তাঁর প্রতিপালকের পক্ষ থেকে এবং আমার পক্ষ থেকে সালাম জানাবেন এবং তাঁকে জান্নাতে মুক্তার তৈরি একটি প্রাসাদের সুসংবাদ দেবেন, যেখানে কোনো কোলাহল থাকবে না এবং কোনো ক্লান্তি থাকবে না।' (সহীহ বুখারী)।"
      }
    ],
    sectionsEn: [
      {
        heading: "First Revelation and Unshakable Assurance",
        text: "When the Prophet returned trembling from Mount Hira, Khadijah wrapped him in reassurance: 'Never! By Allah, Allah will never disgrace you. You uphold family ties, help the poor, support the destitute, host guests, and stand for truth.' (Bukhari)."
      },
      {
        heading: "Divine Greetings from Allah",
        text: "Angel Jibril came to the Prophet ﷺ and said: 'Give Khadijah greetings of peace (Salam) from her Lord and from me, and give her glad tidings of a palace in Paradise fashioned of pearl, wherein there is neither noise nor toil.'"
      }
    ]
  },

  // 7. Khalid ibn Al-Walid (R.A.)
  {
    id: "khalid-ibn-al-walid",
    slug: "khalid-ibn-al-walid",
    nameBn: "হযরত খালিদ বিন ওয়ালিদ (রাঃ)",
    nameEn: "Khalid ibn Al-Walid (R.A.)",
    arabicName: "خَالِدُ بْنُ الْوَلِيدِ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "সাইফুল্লাহ (আল্লাহর উন্মুক্ত তরবারি) • অপরাজেয় সেনাপতি",
    titleEn: "Sayfullah (The Sword of Allah) • Undefeated Military Genius",
    category: "prominent",
    categoryLabelBn: "বিশিষ্ট সাহাবী",
    categoryLabelEn: "Prominent Companions",
    era: "৫৯২ খ্রিষ্টাব্দ – ৬৪২ খ্রিষ্টাব্দ",
    readTime: "৮ মিনিট",
    avatarIcon: "shield",
    shortBioBn: "বিশ্ব ইতিহাসের অন্যতম শ্রেষ্ঠ যুদ্ধকুশলী সেনাপতি, যিনি ১০০টিরও বেশি যুদ্ধে অংশগ্রহণ করে একটিতেও পরাজিত হননি এবং যাঁর ত্যাগ ও আনুগত্য ছিল অনন্য।",
    shortBioEn: "One of the greatest military commanders in human history, undefeated in over 100 battles, and a model of complete devotion and obedience to Allah.",
    keyAttributesBn: [
      "রণাঙ্গনে ১০০+ যুদ্ধে অপরাজিত সামরিক প্রজ্ঞা",
      "রাসূলুল্লাহ ﷺ কর্তৃক 'সাইফুল্লাহ' (আল্লাহর তরবারি) খেতাবে ভূষিত",
      "পদমর্যাদা নয়, সাধারণ সৈনিক হিসেবেও আনুগত্যের অনন্য নজির",
      "শাহাদাতের তীব্র আকাঙ্ক্ষা"
    ],
    keyAttributesEn: [
      "Undefeated in over 100 tactical campaigns and major battles",
      "Conferred the legendary title 'Sword of Allah' by Prophet Muhammad ﷺ",
      "Exemplary humility—readily accepting dismissal from leadership to fight as a private",
      "Unmatched longing for martyrdom in the way of Allah"
    ],
    lifeLessonsBn: [
      "নিজের অনন্য প্রতিভা ও শক্তিকে সততা ও ন্যায়ের পথে পরিচালিত করা।",
      "পদবী বা সম্মানের মোহে নয়, বরং নিষ্ঠা ও দায়িত্ববোধের সাথে কাজ করা।",
      "যেকোনো কঠিন চ্যালেঞ্জে কৌশল ও দূরদর্শিতার সাথে সিদ্ধান্ত গ্রহণ করা।"
    ],
    lifeLessonsEn: [
      "Channeling natural brilliance and power entirely toward noble causes.",
      "Serving selflessly without attachment to status, rank, or applause.",
      "Combining strategic preparation and decisive courage in adversity."
    ],
    sectionsBn: [
      {
        heading: "মু'তার যুদ্ধ ও 'সাইফুল্লাহ' উপাধি",
        text: "মু'তার যুদ্ধে মাত্র ৩,০০০ মুসলিম সৈন্যের বিরুদ্ধে রোমানদের ২ লক্ষ সৈন্যের বিশাল বাহিনী মুখোমুখি হয়েছিল। একে একে তিনজন প্রধান মুসলিম সেনাপতি শাহাদাত বরণ করার পর খালিদ বিন ওয়ালিদ (রাঃ) সর্বসম্মতিক্রমে সেনাপতির দায়িত্ব নেন। তাঁর রণকৌশলে মুসলিম বাহিনী অলৌকিকভাবে সুরক্ষিত অবস্থায় ফিরে আসে। মদিনায় রাসূলুল্লাহ ﷺ সাহাবীদের বললেন: 'অবশেষে আল্লাহর তরবারিসমূহের মধ্য থেকে একটি তরবারি (খালিদ) পতাকা তুলে নিয়েছে এবং আল্লাহ বিজয় দান করেছেন।' সেদিন থেকেই তিনি 'সাইফুল্লাহ' নামে খ্যাত হন।"
      },
      {
        heading: "ইয়ামামার যুদ্ধ ও রোম-পারস্য বিজয়",
        text: "ভণ্ড নবী মুসাইলামা কাযযাবের বিরুদ্ধে রক্তক্ষয়ী ইয়ামামার যুদ্ধে খালিদ (রাঃ) অসাধারণ বীরত্ব দেখিয়ে ফেতনা দমন করেন। এরপর রোম ও পারস্য সাম্রাজ্যের বিরুদ্ধে ঐতিহাসিক ইয়ারমুক যুদ্ধে তিনি যে সামরিক কৌশল ও গতিশীলতার প্রদর্শন করেছিলেন, তা আজও বিশ্বের সামরিক একাডেমিগুলোতে পাঠ্য হিসেবে পড়ানো হয়।"
      },
      {
        heading: "সেনাপতিত্ব থেকে অব্যাহতি ও আনুগত্যের পরাকাষ্ঠা",
        text: "ইয়ারমুক যুদ্ধের সময় খলিফা উমর (রাঃ) খালিদকে প্রধান সেনাপতির পদ থেকে অব্যাহতি দিয়ে আবু উবাইদাহ (রাঃ)-কে সেনাপতি নিযুক্ত করেন—যাতে মানুষ খালিদের ওপর নয়, আল্লাহর ওপর নির্ভর করে। খালিদ (রাঃ) বিন্দুমাত্র ক্ষোভ প্রকাশ না করে হাসিমুখে আবু উবাইদাহর অধীনে একজন সাধারণ সৈনিক হিসেবে যুদ্ধ চালিয়ে যান। তিনি বললেন: 'আমি উমরের জন্য যুদ্ধ করি না, আমি উমরের রবের সন্তুষ্টির জন্য যুদ্ধ করি।'"
      }
    ],
    sectionsEn: [
      {
        heading: "The Battle of Mu'tah and the Sword of Allah",
        text: "Facing 200,000 Byzantine forces with only 3,000 Muslims, Khalid took command after three leaders were martyred. He broke nine swords in battle and skillfully saved the army. The Prophet announced in Madinah: 'A sword from the swords of Allah has taken the banner.'"
      },
      {
        heading: "Pinnacle of Humility and Sincerity",
        text: "When Caliph Umar stepped him down from chief commander during the pivotal Battle of Yarmouk, Khalid fought as a regular soldier under Abu Ubaidah without hesitation, stating: 'I do not fight for Umar, I fight for the Lord of Umar.'"
      }
    ]
  },

  // 8. Salman Al-Farsi (R.A.)
  {
    id: "salman-al-farsi",
    slug: "salman-al-farsi",
    nameBn: "হযরত সালমান আল-ফারসি (রাঃ)",
    nameEn: "Salman Al-Farsi (R.A.)",
    arabicName: "سَلْمَانُ الْفَارِسِيُّ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "সত্যের সন্ধানী • খন্দক যুদ্ধের কৌশলবিদ • আহলে বাইতের সদস্য",
    titleEn: "The Seeker of Truth • Strategist of the Trench • Member of the Household",
    category: "prominent",
    categoryLabelBn: "বিশিষ্ট সাহাবী",
    categoryLabelEn: "Prominent Companions",
    era: "৫৬৮ খ্রিষ্টাব্দ – ৬৫৬ খ্রিষ্টাব্দ",
    readTime: "৮ মিনিট",
    avatarIcon: "compass",
    shortBioBn: "সত্যের সন্ধানে পারস্যের ঐশ্বর্য ত্যাগ করে সিরিয়া, ইরাক হয়ে দাসত্ব বরণ করে মদিনায় পৌঁছানো এবং খন্দক যুদ্ধে ঐতিহাসিক পরিখা খননের কৌশল প্রদানকারী প্রজ্ঞাবান সাহাবী।",
    shortBioEn: "The Persian noble who renounced luxury and traveled across lands seeking the true Prophet, enduring slavery until finding the light of Islam in Madinah.",
    keyAttributesBn: [
      "সত্যের সন্ধানে দীর্ঘ সফর ও ত্যাগ স্বীকার",
      "খন্দকের যুদ্ধে মদিনা রক্ষায় পরিখা খননের উদ্ভাবনী কৌশল",
      "নবীজি ﷺ কর্তৃক 'সালমান আমাদের আহলে বাইতের সদস্য' সম্মাননা লাভ",
      "গভর্নর হয়েও নিজ হাতে চাটাই বুনে জীবিকা নির্বাহ"
    ],
    keyAttributesEn: [
      "Decades of relentless travel, trials, and slavery in search of ultimate truth",
      "Innovative military engineering—suggesting the defensive Trench around Madinah",
      "Honored by the Prophet: 'Salman is one of us, a member of our household (Ahl al-Bayt)'",
      "Extreme simplicity—weaving palm mats to earn livelihood while serving as governor"
    ],
    lifeLessonsBn: [
      "সত্য ও কল্যাণের সন্ধানে কোনো ত্যাগকেই বড় মনে না করা।",
      "বিপদের সময় উদ্ভাবনী চিন্তা ও কৌশল প্রয়োগ করা।",
      "উচ্চপদে অধিষ্ঠিত হলেও আত্মনির্ভরশীল ও বিনয়ী থাকা।"
    ],
    lifeLessonsEn: [
      "Never abandoning the quest for spiritual truth despite hardships.",
      "Applying innovative problem-solving and diverse skills for the community.",
      "Remaining self-reliant and deeply humble regardless of official rank."
    ],
    sectionsBn: [
      {
        heading: "পারস্যের রাজকীয় জীবন থেকে সত্যের সন্ধানে যাত্রা",
        text: "সালমান (রাঃ) ছিলেন পারস্যের এক ধনী অগ্নিপূজক পরিবারের সন্তান। সত্যের তৃষ্ণায় তিনি নিজের রাজকীয় আরাম-আয়েশ ত্যাগ করে বিভিন্ন পাদ্রীর সাথে বছরের পর বছর সিরিয়া ও আরবের মরুভূমিতে ঘুরে বেড়ান। এক পর্যায়ে প্রতারিত হয়ে তিনি দাস হিসেবে এক ইহুদির কাছে বিক্রি হয়ে যান এবং মদিনার এক খেজুর বাগানে ক্রীতদাস হিসেবে কাজ করতে থাকেন।"
      },
      {
        heading: "নবুওয়াতের নিদর্শন ও মুক্তি লাভ",
        text: "রাসূলুল্লাহ ﷺ মদিনায় হিজরত করার পর সালমান (রাঃ) তাঁর সাথে সাক্ষাৎ করেন এবং পাদ্রীদের বলা নবুওয়াতের ৩টি নিদর্শন মিলিয়ে দেখেন—তিনি সদকা খান না, উপহার গ্রহণ করেন এবং তাঁর দুই কাঁধের মাঝে নবুওয়াতের মোহর রয়েছে। সব লক্ষণ হুবহু মিলে যাওয়ায় তিনি কান্নায় ভেঙে পড়ে ইসলাম গ্রহণ করেন। পরে রাসূলুল্লাহ ﷺ ও সাহাবীদের আর্থিক সহযোগিতায় শত শত খেজুর গাছ রোপণ করে তিনি দাসত্ব থেকে মুক্তি লাভ করেন।"
      },
      {
        heading: "খন্দকের পরিখা ও নববীর সম্মান",
        text: "খন্দকের যুদ্ধে যখন কাফেরদের ১০,০০০ সৈন্যের যৌথ বাহিনী মদিনা ধ্বংস করতে এগিয়ে আসছিল, তখন সালমান (রাঃ) পারস্যের অনুকরণে মদিনার অরক্ষিত অংশে গভীর পরিখা খননের বুদ্ধি দেন। এই অভিনব কৌশলে মদিনা রক্ষা পায়। আনসার ও মুহাজিররা যখন সালমানকে নিজেদের বলে দাবি করছিল, তখন রাসূলুল্লাহ ﷺ বললেন: 'সালমান আমাদের মধ্য থেকে, সে আমার আহলে বাইতের (পরিবারের) অন্তর্ভুক্ত।'"
      }
    ],
    sectionsEn: [
      {
        heading: "The Legendary Quest for Truth",
        text: "Born to a wealthy Zoroastrian priest in Persia, Salman abandoned wealth to seek the true faith, learning under Christian ascetics until arriving as an enslaved laborer in the date groves of Madinah."
      },
      {
        heading: "The Trench and Ahl al-Bayt",
        text: "During the Battle of the Ahzab (Confederates), Salman proposed digging a vast defensive trench around Madinah. The Prophet ﷺ embraced him, saying: 'Salman is of us, the household of the Prophet.'"
      }
    ]
  },

  // 9. Aisha bint Abi Bakr (R.A.)
  {
    id: "aisha-bint-abi-bakr",
    slug: "aisha-bint-abi-bakr",
    nameBn: "হযরত আয়েশা বিনতে আবু বকর (রাঃ)",
    nameEn: "Aisha bint Abi Bakr (R.A.)",
    arabicName: "عَائِشَةُ بِنْتُ أَبِي بَكْرٍ رَضِيَ اللَّهُ عَنْهَا",
    titleBn: "উম্মুল মুমিনীন • আস-সিদ্দিক্বা • উম্মতের সেরা শিক্ষিকা ও মুফতিয়া",
    titleEn: "Mother of the Believers • As-Siddiqah • Scholar of Islam",
    category: "mothers",
    categoryLabelBn: "উম্মাহাতুল মুমিনীন",
    categoryLabelEn: "Mothers of the Believers",
    era: "৬১৩ খ্রিষ্টাব্দ – ৬৭৮ খ্রিষ্টাব্দ",
    readTime: "৮ মিনিট",
    avatarIcon: "book-open",
    shortBioBn: "ইসলামের সর্বশ্রেষ্ঠ মহিলা ফকীহ ও হাদিস বর্ণনাকারী, যাঁর প্রখর মেধা ও পাণ্ডিত্য উম্মাহকে ২,২১০টি সহীহ হাদিস ও পারিবারিক জীবনের সোনালী বিধান উপহার দিয়েছে।",
    shortBioEn: "The intellectual powerhouse and Mother of the Believers, who narrated 2,210 Hadiths and served as the greatest teacher and jurist of the Muslim world.",
    keyAttributesBn: [
      "অসাধারণ স্মৃতিশক্তি ও হাদিস ও ফিকাহর গভীর জ্ঞান",
      "সাহাবায়ে কেরামদের জটিল মাসআলা সমাধানে দিকনির্দেশনা",
      "দানশীলতা ও পরোপকার (নিজের ইফতারির খাবারও অন্যকে দান)",
      "নবীজি ﷺ-এর গৃহস্থালী ও ইবাদতের অনুপুঙ্খ বিবরণ সংরক্ষণ"
    ],
    keyAttributesEn: [
      "Extraordinary intellect, narrating 2,210 authentic Hadiths",
      "Senior legal consultant to the foremost Companions on complex matters",
      "Profound generosity—giving away bags of gold coins while fasting in poverty",
      "Preserving the intimate prophetic traditions of home life and spirituality"
    ],
    lifeLessonsBn: [
      "নারী শিক্ষাকে গুরুত্ব দেওয়া ও গবেষণাধর্মী জ্ঞানচর্চা করা।",
      "নিজের যা আছে তা নিয়ে সন্তুষ্ট থেকে অন্যকে অগ্রাধিকার দেওয়া।",
      "ভাষার মাধুর্য ও বাগ্মীতার সাথে মানুষকে সত্য ও কল্যাণের শিক্ষা দেওয়া।"
    ],
    lifeLessonsEn: [
      "Pursuing higher scholarly learning and teaching with passion.",
      "Prioritizing the needy even when facing personal scarcity.",
      "Communicating wisdom with eloquence, clarity, and kindness."
    ],
    sectionsBn: [
      {
        heading: "জ্ঞানচর্চা ও অনন্য পাণ্ডিত্য",
        text: "হযরত আবু মুসা আশ'আরী (রাঃ) বলেন: 'আমরা রাসূলুল্লাহ ﷺ-এর সাহাবীরা যখনই কোনো হাদিসের মর্ম বা জটিল বিষয়ে সংশয়ে পড়তাম, তখন আয়েশা (রাঃ)-এর কাছে যেতাম এবং তাঁর কাছে তার সমাধান ও সঠিক জ্ঞান খুঁজে পেতাম।' তিনি কেবল হাদিস ও ফিকাহ নয়, চিকিৎসা বিজ্ঞান, কবিতা ও আরবের ইতিহাসেরও অন্যতম শ্রেষ্ঠ পণ্ডিত ছিলেন।"
      },
      {
        heading: "দানশীলতা ও নিঃস্বার্থ জীবন",
        text: "একদিন হযরত মুয়াবিয়া (রাঃ) উম্মুল মুমিনীন আয়েশা (রাঃ)-এর কাছে ১ লক্ষ দিরহাম পাঠান। তিনি সারাদিন রোজা রাখা অবস্থায় সেই পুরো অর্থ মদিনার গরিব-মিসকিনদের মাঝে বণ্টন করে দেন। সন্ধ্যায় যখন দাসী বলল, 'আমাদের ইফতারের জন্য কি একটি দিরহাম রাখা যেত না?', আয়েশা (রাঃ) মিষ্টি হেসে বললেন: 'আগে স্মরণ করিয়ে দিলে একটি দিরহাম রেখে দিতাম।'"
      }
    ],
    sectionsEn: [
      {
        heading: "Beacon of Knowledge and Jurisprudence",
        text: "Abu Musa al-Ash'ari said: 'Whenever we, the companions, faced an intricate issue, we asked Aisha and found clear knowledge with her.' She was a master of Hadith, Quranic exegesis, medicine, and Arabic rhetoric."
      }
    ]
  },

  // 10. Abdur Rahman bin Awf (R.A.)
  {
    id: "abdur-rahman-bin-awf",
    slug: "abdur-rahman-bin-awf",
    nameBn: "হযরত আব্দুর রহমান বিন আউফ (রাঃ)",
    nameEn: "Abdur Rahman bin Awf (R.A.)",
    arabicName: "عَبْدُ الرَّحْمَٰنِ بْنُ عَوْفٍ رَضِيَ اللَّهُ عَنْهُ",
    titleBn: "আশারায়ে মুবাশশারাহ • হালাল ব্যবসার দিকপাল • পরোপকারী ধনী",
    titleEn: "10 Promised Paradise • Master of Ethical Business • Philanthropist",
    category: "ashara",
    categoryLabelBn: "আশারায়ে মুবাশশারাহ",
    categoryLabelEn: "10 Promised Paradise",
    era: "৫৮১ খ্রিষ্টাব্দ – ৬৫৩ খ্রিষ্টাব্দ",
    readTime: "৭ মিনিট",
    avatarIcon: "coins",
    shortBioBn: "মদিনায় শূন্যহাতে এসে হালাল ব্যবসার মাধ্যমে ধনকুবের হওয়া এবং সেই ধনসম্পদের সিংহভাগ আল্লাহর রাস্তায় বিলিয়ে দিয়ে জান্নাতের সুসংবাদপ্রাপ্ত সাহাবী।",
    shortBioEn: "The legendary merchant who arrived in Madinah penniless, built immense ethical wealth, and gave away millions for the sake of Allah.",
    keyAttributesBn: [
      "শূন্য থেকে হালাল ব্যবসার মাধ্যমে শীর্ষ ধনী হওয়া",
      "'আমাকে শুধু বাজারের রাস্তাটি দেখিয়ে দিন'—আত্মনির্ভরশীলতার প্রতীক",
      "একদিনে ৭০০ উট বোঝাই খাদ্যশস্য মদিনার গরিবদের দান",
      "বদর যুদ্ধে অংশগ্রহণকারী জীবিত সকল সাহাবীকে ৪০০ দিনার করে অসিয়ত"
    ],
    keyAttributesEn: [
      "Building colossal wealth strictly through ethical and halal commerce",
      "Epitome of self-reliance: 'Just show me the way to the marketplace'",
      "Donated an entire 700-camel caravan laden with food to the poor of Madinah",
      "Bequeathed 400 gold dinars to every surviving veteran of the Battle of Badr"
    ],
    lifeLessonsBn: [
      "অন্যের ওপর বোঝা না হয়ে নিজের পরিশ্রমে হালাল জীবিকা উপার্জন করা।",
      "ব্যবসা ও লেনদেনে সততা, স্বচ্ছতা ও আল্লাহর ভয় বজায় রাখা।",
      "সম্পদ বৃদ্ধি পেলে দানের হাত আরও বেশি সম্প্রসারিত করা।"
    ],
    lifeLessonsEn: [
      "Striving for hard work and self-reliance rather than dependency.",
      "Conducting business with fairness, transparency, and no exploitation.",
      "Viewing wealth as an opportunity to serve humanity and earn Paradise."
    ],
    sectionsBn: [
      {
        heading: "'আমাকে শুধু বাজারের পথ দেখিয়ে দিন'",
        text: "মক্কায় নিজের সমস্ত ধনসম্পদ কাফেরদের ভয়ে ফেলে রেখে যখন আব্দুর রহমান বিন আউফ (রাঃ) মদিনায় নিঃস্ব অবস্থায় হিজরত করেন, তখন নবীজি ﷺ সা'দ ইবনে রাবী (রাঃ)-এর সাথে তাঁর ভ্রাতৃত্ব বন্ধন গড়ে দেন। সা'দ নিজের অর্ধেক সম্পত্তি ও ব্যবসা তাঁকে উপহার দিতে চাইলেন। কিন্তু আত্মমর্যাদাবোধসম্পন্ন আব্দুর রহমান বললেন: 'আল্লাহ আপনার পরিবার ও সম্পদে বরকত দিন; আমাকে শুধু বাজারের রাস্তাটি দেখিয়ে দিন।' তিনি বাজারে গিয়ে পনির ও ঘি বিক্রি শুরু করলেন এবং অল্প দিনেই মদিনার শীর্ষ ব্যবসায়ীতে পরিণত হলেন।"
      },
      {
        heading: "মদিনার ৭০০ উটের কাফেলা দান",
        text: "একদিন মদিনা নগরী গমগম শব্দে কেঁপে উঠল। আয়েশা (রাঃ) জানতে চাইলেন কীসের এই শব্দ? জানা গেল, আব্দুর রহমান বিন আউফের ৭০০ উট বোঝাই বাণিজ্য কাফেলা মদিনায় প্রবেশ করেছে। তিনি আয়েশা (রাঃ)-এর কাছে এসে ঘোষণা করলেন: 'আল্লাহর শপথ, এই ৭০০ উট এবং তাদের পিঠে থাকা যাবতীয় খাদ্যশস্য ও মালামাল আমি মদিনার অসহায় ও গরিবদের জন্য সদকা করে দিলাম।'"
      }
    ],
    sectionsEn: [
      {
        heading: "The Golden Rule of Halal Commerce",
        text: "Arriving with nothing in Madinah, he politely declined an offer to take half his brother's fortune, asking only: 'Show me the way to the marketplace.' Through honesty and fair margins, his trade flourished abundantly."
      }
    ]
  }
]
