/**
 * Prophet profiles for the Stories of the Prophets section.
 * Bengali content lives in the orbit dataset below; English fields and
 * Quran references are attached in PROPHETS_COLLECTION.
 */

export interface ProphetCosmosNode {
  id: string
  nameBn: string
  nameAr: string
  titleBn: string
  eraBn: string
  quranMentions: string
  keyTheme: string
  summaryBn: string
  lessons: string[]
  isCenter?: boolean
  // 3D coordinates in space
  orbitRadius: number // distance from center in px
  orbitAngle: number // angle in degrees around Y
  elevation: number // elevation angle in degrees (-35 to +35)
}

export const PROPHETS_DATA: ProphetCosmosNode[] = [
  // 0. THE CENTERPIECE - Prophet Muhammad (peace be upon him)
  {
    id: "prophet-muhammad",
    nameBn: "হযরত মুহাম্মদ ﷺ",
    nameAr: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
    titleBn: "সর্বশেষ ও সর্বশ্রেষ্ঠ নবী • রাহমাতুল্লিল আলামীন",
    eraBn: "৫৭০ খ্রিষ্টাব্দ — ৬৩২ খ্রিষ্টাব্দ • পবিত্র মক্কা ও মদিনা",
    quranMentions: "কুরআনে ৪ বার নাম এবং অসংখ্যবার 'নবী' ও 'রাসূল' উপাধিতে সম্বোধন",
    keyTheme: "পূর্ণাঙ্গ জীবনবিধান, বিশ্বজনীন রহমত ও সর্বোত্তম চরিত্র",
    summaryBn:
      "মহান আল্লাহ তা'আলা তাঁকে সমগ্র মানবজাতির জন্য পথপ্রদর্শক ও বিশ্বজগতের জন্য রহমতস্বরূপ প্রেরণ করেছেন। তাঁর আনীত দ্বীন ইসলাম ও আল-কুরআন কিয়ামত পর্যন্ত সকল মানুষের মুক্তির সনদ। তাঁর প্রতিটি সুন্নত মানবজীবনের সকল দিককে আলোকিত করেছে।",
    lessons: [
      "উত্তম চরিত্র, বিনয় ও পরম ক্ষমাশীলতা দিয়ে মানুষের মন জয় করা।",
      "সত্যের পথে সকল জুলুম-অত্যাচারের মুখে অটল ধৈর্য ও তাওয়াক্কুল।",
      "সমগ্র সৃষ্টির প্রতি দয়া, নারী ও এতিমদের অধিকার প্রতিষ্ঠা এবং ইনসাফ।",
    ],
    isCenter: true,
    orbitRadius: 0,
    orbitAngle: 0,
    elevation: 0,
  },

  // Inner Orbital Ring (Radius ~ 240px)
  {
    id: "adam",
    nameBn: "হযরত আদম (আঃ)",
    nameAr: "آدم عليه السلام",
    titleBn: "প্রথম মানব ও আদি পিতা • সফিউল্লাহ",
    eraBn: "মানব ইতিহাসের সূচনা",
    quranMentions: "কুরআনের ২৫টি আয়াতে উল্লেখ",
    keyTheme: "সৃষ্টির শ্রেষ্ঠত্ব, সিজদার নির্দেশ ও খাঁটি তাওবা",
    summaryBn:
      "আল্লাহ তা'আলা নিজ কুদরতে মাটির উপাদান থেকে প্রথম মানব হিসেবে আদম (আঃ)-কে সৃষ্টি করেন এবং ফেরেশতাদের সিজদা করার নির্দেশ দেন। ভুলের পর তাঁর আন্তরিক তাওবা সকল মানুষের জন্য অনুশোচনার সর্বোত্তম শিক্ষা।",
    lessons: [
      "ভুল হলে অহংকার না করে সাথে সাথে আল্লাহর দরবারে তাওবা করা।",
      "শয়তানের ধোঁকা ও প্ররোচনা সম্পর্কে সর্বদা সতর্ক থাকা।",
    ],
    orbitRadius: 240,
    orbitAngle: 0,
    elevation: -15,
  },
  {
    id: "idris",
    nameBn: "হযরত ইদরীস (আঃ)",
    nameAr: "إدريس عليه السلام",
    titleBn: "প্রজ্ঞাবান নবী • জ্ঞানের অগ্রদূত",
    eraBn: "আদম (আঃ) এর পরবর্তী যুগ",
    quranMentions: "কুরআনে ২ বার উল্লেখ",
    keyTheme: "প্রথম কলম দিয়ে লেখা, জ্যোতির্বিদ্যা ও বস্ত্র সেলাইয়ের সূচনা",
    summaryBn:
      "হযরত ইদরীস (আঃ) ছিলেন চরম সত্যবাদী ও ধৈর্যশীল নবী। আল্লাহ তাঁকে বিশেষ সম্মানজনক উচ্চ স্থানে উন্নীত করেছিলেন।",
    lessons: [
      "জ্ঞানার্জন ও ইতিবাচক আবিষ্কার মানবজাতির জন্য বিরাট কল্যাণ।",
      "আল্লাহর স্মরণে অবিচল থাকা।",
    ],
    orbitRadius: 240,
    orbitAngle: 50,
    elevation: 20,
  },
  {
    id: "nuh",
    nameBn: "হযরত নূহ (আঃ)",
    nameAr: "نوح عليه السلام",
    titleBn: "মহা প্লাবন ও নাজাতের কিশতী • নাজীউল্লাহ",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ৩০০০ অব্দ",
    quranMentions: "কুরআনে ৪৩ বার উল্লেখ",
    keyTheme: "৯৫০ বছর নিরবচ্ছিন্ন তাওহীদের দাওয়াত ও চরম ধৈর্য",
    summaryBn:
      "সাড়ে নয়শত বছর দিন-রাত গোপনে ও প্রকাশ্যে নিজের জাতিকে একত্ববাদের আহ্বান জানান। অবাধ্য জাতির ধ্বংস ও বিশ্বাসীদের রক্ষার জন্য আল্লাহর নির্দেশে বিশাল কিশতী (নৌকা) তৈরি করেন।",
    lessons: [
      "ফলাফল যাই হোক, সত্যের দাওয়াত ধৈর্য ও নিষ্ঠার সাথে অব্যাহত রাখা।",
      "আল্লাহর অবাধ্যতার পরিণাম চরম ধ্বংস।",
    ],
    orbitRadius: 240,
    orbitAngle: 110,
    elevation: -25,
  },
  {
    id: "hud",
    nameBn: "হযরত হূদ (আঃ)",
    nameAr: "هود عليه السلام",
    titleBn: "‘আদ জাতির প্রতি সত্যের বার্তাবাহক",
    eraBn: "প্রাচীন ইয়েমেন ও আহকাফ অঞ্চল",
    quranMentions: "কুরআনে ৭ বার উল্লেখ",
    keyTheme: "দৈহিক শক্তি ও প্রাসাদের অহংকার চূর্ণ",
    summaryBn:
      "সুউচ্চ স্তম্ভ ও বিশাল শক্তির অধিকারী ‘আদ জাতিকে মূর্তিপূজা ত্যাগ করে এক আল্লাহর ইবাদত করার আহ্বান জানান।",
    lessons: [
      "শারীরিক শক্তি বা ধন-সম্পদের অহংকার মানুষকে ধ্বংসের মুখে ফেলে।",
      "কৃতজ্ঞ চিত্তে আল্লাহর শুকরিয়া আদায় করা।",
    ],
    orbitRadius: 240,
    orbitAngle: 170,
    elevation: 15,
  },
  {
    id: "saleh",
    nameBn: "হযরত সালেহ (আঃ)",
    nameAr: "صالح عليه السلام",
    titleBn: "সমূদ জাতির নবী • মুজিযার উষ্ট্রী",
    eraBn: "হিজর ও ওয়াদিউল কুরা",
    quranMentions: "কুরআনে ৯ বার উল্লেখ",
    keyTheme: "পাহাড় কেটে অট্টালিকা ও অলৌকিক উটনীর পরীক্ষা",
    summaryBn:
      "পাথর কেটে নির্মিত বিলাসবহুল দুর্গের অধিকারী সমূদ জাতিকে আল্লাহর বিধান মেনে চলার আহ্বান জানান। তাঁর নিদর্শন হিসেবে পাথর থেকে অলৌকিক উটনী প্রকাশ পেয়েছিল।",
    lessons: [
      "আল্লাহর নিদর্শনকে অসম্মান করার ভয়াবহ পরিণতি।",
      "অসৎ নেতৃত্বের অন্ধ আনুগত্য পরিহার করা।",
    ],
    orbitRadius: 240,
    orbitAngle: 230,
    elevation: -18,
  },
  {
    id: "ibrahim",
    nameBn: "হযরত ইব্রাহিম (আঃ)",
    nameAr: "إبراهيم عليه السلام",
    titleBn: "তাওহীদের পিতা • খলিলুল্লাহ",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ২০০০ অব্দ • বাবেল ও কেনান",
    quranMentions: "কুরআনে ৬৯ বার উল্লেখ",
    keyTheme: "নমরুদের অগ্নিকুণ্ডে বিজয়, কাবা পুনর্নির্মাণ ও আত্মসমর্পণ",
    summaryBn:
      "নক্ষত্র, চন্দ্র ও সূর্যের অসারতা প্রমাণ করে এক আল্লাহর তাওহীদের সন্ধান পান। অগ্নিকুণ্ডে নিক্ষিপ্ত হয়েও অবিচল থাকেন এবং আল্লাহর সন্তুষ্টির জন্য জীবনের সকল পরীক্ষায় উত্তীর্ণ হন।",
    lessons: [
      "যুক্তি ও প্রজ্ঞার সাথে অন্ধ কুসংস্কারের মোকাবিলা করা।",
      "আল্লাহর প্রতি নিরেট ভরসা ও সর্বোচ্চ আত্মত্যাগ।",
    ],
    orbitRadius: 240,
    orbitAngle: 290,
    elevation: 25,
  },

  // Outer Orbital Shell (Radius ~ 380px)
  {
    id: "ismail",
    nameBn: "হযরত ইসমাইল (আঃ)",
    nameAr: "إسماعيل عليه السلام",
    titleBn: "যবিহুল্লাহ • পিতা-পুত্রের পরম আনুগত্য",
    eraBn: "পবিত্র মক্কার জনশূন্য উপত্যকা",
    quranMentions: "কুরআনে ১২ বার উল্লেখ",
    keyTheme: "কোরবানির চিরন্তন আদর্শ, জমজম কূপ ও কাবা নির্মাণ",
    summaryBn:
      "পিতার স্বপ্ন বাস্তবায়নে সানন্দে নিজেকে কোরবানির জন্য সঁপে দিয়েছিলেন। পিতার সাথে যৌথভাবে পবিত্র কাবা গৃহের ভিত্তিপ্রস্তর স্থাপন করেন।",
    lessons: [
      "পিতামাতার প্রতি গভীর ভক্তি ও আল্লাহর আদেশে সম্পূর্ণ সমর্পণ।",
      "প্রতিশ্রুতি রক্ষায় অটল থাকা।",
    ],
    orbitRadius: 380,
    orbitAngle: 20,
    elevation: -30,
  },
  {
    id: "yusuf",
    nameBn: "হযরত ইউসুফ (আঃ)",
    nameAr: "يوسف عليه السلام",
    titleBn: "আহসানুল কাসাস • পবিত্রতা ও ক্ষমার পরাকাষ্ঠা",
    eraBn: "প্রাচীন মিসর ও ফিলিস্তিন",
    quranMentions: "কুরআনে ২৭ বার উল্লেখ",
    keyTheme: "কূপ ও কারাগারের অন্ধকারের পর মিসরের শাসন ও ক্ষমা",
    summaryBn:
      "ভাইদের ষড়যন্ত্রে অন্ধকূপে নিক্ষিপ্ত, কৃতদাস হিসেবে বিক্রি এবং অপবাদে দীর্ঘ কারাবাসের পর সততা ও জ্ঞানের গুণে মিসরের রাজপ্রাসাদের সর্বোচ্চ দায়িত্ব লাভ করেন।",
    lessons: [
      "প্রলোভন ও পাপের মুখে নিজের চরিত্র নির্মল রাখা।",
      "ক্ষমতা হাতে থাকা সত্ত্বেও চরম নির্যাতনকারীদের নিঃশর্ত ক্ষমা করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 75,
    elevation: 32,
  },
  {
    id: "ayyub",
    nameBn: "হযরত আইয়ুব (আঃ)",
    nameAr: "أيوب عليه السلام",
    titleBn: "সবর ও কৃতজ্ঞতার অনুপম প্রতীক",
    eraBn: "হওরান অঞ্চল, শাম",
    quranMentions: "কুরআনে ৪ বার উল্লেখ",
    keyTheme: "চরম শারীরিক অসুস্থতা ও সম্পদ হারানোর পরও প্রশংসামুখর",
    summaryBn:
      "ধন-সম্পদ, সন্তান ও সুস্বাস্থ্য সব হারিয়ে দীর্ঘ বছর দুঃসহ শারীরিক যন্ত্রণায় থেকেও এক মুহূর্তের জন্যও আল্লাহর রহমত থেকে নিরাশ হননি।",
    lessons: [
      "বিপদাপদে অভিযোগ না করে সবর ও দোয়ায় নিমগ্ন থাকা।",
      "আল্লাহর রহমত থেকে কখনোই নিরাশ না হওয়া।",
    ],
    orbitRadius: 380,
    orbitAngle: 130,
    elevation: -20,
  },
  {
    id: "yunus",
    nameBn: "হযরত ইউনুস (আঃ)",
    nameAr: "يونس عليه السلام",
    titleBn: "যুন-নূন • তাওবার অনন্য আলোকবর্তিকা",
    eraBn: "নিনেভে, প্রাচীন মেসোপটেমিয়া",
    quranMentions: "কুরআনে ৪ বার উল্লেখ",
    keyTheme: "মাছের পেটের গভীর অন্ধকারে দোয়ার শক্তি",
    summaryBn:
      "আল্লাহর অনুমতি ছাড়া প্রস্থান করার পর বিশাল তিমি মাছের পেটে প্রবেশ করেন। সেখানে তিন স্তরের অন্ধকারে তিনি দোয়ায়ে ইউনুসের মাধ্যমে মহান আল্লাহর তাসবীহ পাঠ করেন।",
    lessons: [
      "চরম সংকটকালেও তাওবা ও তাসবীহের শক্তি অপার।",
      "ধৈর্য ধারণ না করে দায়িত্ব ছেড়ে তাড়াহুড়ো না করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 185,
    elevation: 28,
  },
  {
    id: "musa",
    nameBn: "হযরত মূসা (আঃ)",
    nameAr: "موسى عليه السلام",
    titleBn: "কালিমুল্লাহ • তাওরাতের ধারক",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ১৩০০ অব্দ • মিসর ও সিনাই",
    quranMentions: "কুরআনে সর্বাধিক ১৩৬ বার উল্লেখ",
    keyTheme: "ফেরাউনের রাজপ্রাসাদ, লোহিত সাগর বিদীর্ণ ও প্রত্যক্ষ বাক্যালাপ",
    summaryBn:
      "তুর পাহাড়ে মহান আল্লাহর সাথে সরাসরি বাক্যালাপের অনন্য মর্যাদা পান। ফেরাউনের অহংকার চূর্ণ করে অত্যাচারিত বনী ইসরাঈলকে লোহিত সাগর পাড়ি দিয়ে মুক্তি দেন।",
    lessons: [
      "জালিমের যত সৈন্য ও শক্তিই থাকুক, আল্লাহর সাহায্যের সামনে তা ধূলিসাৎ।",
      "সত্যের পক্ষে নির্ভীক অবস্থান গ্রহণ করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 240,
    elevation: -25,
  },
  {
    id: "dawud",
    nameBn: "হযরত দাউদ (আঃ)",
    nameAr: "داود عليه السلام",
    titleBn: "যাবুরের ধারক • সুবিচারক বাদশাহ ও মধুর তাসবীহ",
    eraBn: "জেরুসালেম ও প্যালেস্টাইন",
    quranMentions: "কুরআনে ১৬ বার উল্লেখ",
    keyTheme: "জালুতের পরাজয়, লোহার নমনীয়তা ও পর্বত-পাখির তাসবীহ",
    summaryBn:
      "তাঁর সুমধুর কণ্ঠে আল্লাহর প্রশংসা শুনে পাহাড় ও উড়ন্ত পাখিরা সমস্বরে তাঁর সাথে জিকিরে যোগ দিত। তিনি একজন অপরাজেয় যোদ্ধা এবং সুবিচারক ন্যায়পরায়ণ বাদশাহ ছিলেন।",
    lessons: [
      "ক্ষমতা ও শাসনকে আল্লাহর ইবাদত ও সুবিচারের মাধ্যম বানানো।",
      "নিজ হাতে উপার্জন করে হালাল আহার গ্রহণ করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 295,
    elevation: 20,
  },
  {
    id: "sulaiman",
    nameBn: "হযরত সুলাইমান (আঃ)",
    nameAr: "سليمان عليه السلام",
    titleBn: "অতুলনীয় বাদশাহাত ও সৃষ্টির ওপর কর্তৃত্ব",
    eraBn: "জেরুসালেম • স্বর্ণযুগ",
    quranMentions: "কুরআনে ১৭ বার উল্লেখ",
    keyTheme: "বাতাস, জিন, পশু-পাখির ভাষা নিয়ন্ত্রণ ও বিনীত শুকরিয়া",
    summaryBn:
      "আল্লাহ তাঁকে পৃথিবীর ইতিহাসে সবচেয়ে বিস্ময়কর সাম্রাজ্য দান করেছিলেন। বাতাস, জিন জাতি এবং প্রাণিকুলের ভাষা বুঝতে ও নিয়ন্ত্রণ করতে পারতেন, তবুও তিনি সদা বিনীত ছিলেন।",
    lessons: [
      "বিশাল সম্পদ ও ক্ষমতা সত্ত্বেও আল্লাহর সামনে একান্ত বিনয়ী হওয়া।",
      "জ্ঞান ও ইনসাফের মাধ্যমে রাষ্ট্র পরিচালনা করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 345,
    elevation: -15,
  },
  {
    id: "isa",
    nameBn: "হযরত ঈসা (আঃ)",
    nameAr: "عيسى عليه السلام",
    titleBn: "রুহুল্লাহ ও কালিমাতুল্লাহ • ইঞ্জিলের বাহক",
    eraBn: "নাসরত, জেরুসালেম • ১ম শতাব্দী",
    quranMentions: "কুরআনে ২৫ বার উল্লেখ",
    keyTheme: "পিতা ছাড়া অলৌকিক জন্ম, মৃতকে জীবনদান ও দ্বিতীয় আগমন",
    summaryBn:
      "মারইয়াম (আঃ)-এর গর্ভে আল্লাহর কুদরতি রুহ দ্বারা পিতার সংস্পর্শ ছাড়াই জন্মগ্রহণ করেন। দোলনায় কথা বলা, কুষ্ঠরোগী নিরাময় এবং মৃতকে জীবিত করার অলৌকিক ক্ষমতা লাভ করেছিলেন।",
    lessons: [
      "দুনিয়ার মোহমুক্ত সহজ-সরল ও আধ্যাত্মিক জীবনযাপন।",
      "মানুষের প্রতি গভীর মমতা ও ভালোবাসার মাধ্যমে সত্যের বার্তা পৌঁছানো।",
    ],
    orbitRadius: 380,
    orbitAngle: 155,
    elevation: 35,
  },
]

export interface ProphetReference {
  label: string
  surah: number
  ayah?: number
}

export interface ProphetProfile extends ProphetCosmosNode {
  slug: string
  nameEn: string
  titleEn: string
  eraEn: string
  quranMentionsEn: string
  summaryEn: string
  lessonsEn: string[]
  references: ProphetReference[]
}

interface ProphetEnrichment {
  nameEn: string
  titleEn: string
  eraEn: string
  quranMentionsEn: string
  summaryEn: string
  lessonsEn: string[]
  references: ProphetReference[]
}

const PROPHET_ENRICHMENT: Record<string, ProphetEnrichment> = {
  'prophet-muhammad': {
    nameEn: 'Prophet Muhammad ﷺ',
    titleEn: 'The final Messenger — a mercy to the worlds',
    eraEn: '570 – 632 CE · Makkah and Madinah',
    quranMentionsEn: 'Named four times; addressed as Prophet and Messenger throughout the Quran',
    summaryEn:
      'The orphan who became the mercy to all creation. With him the religion was completed and the Quran was revealed — his life is the living example of Islam.',
    lessonsEn: [
      'Win hearts through character, humility and forgiveness.',
      'Stand firm on truth with patience and trust in Allah.',
      'Show mercy to all creation and uphold justice for women and orphans.',
    ],
    references: [
      { label: 'Surah Al-Ahzab 33:40', surah: 33, ayah: 40 },
      { label: 'Surah Al-Anbiya 21:107', surah: 21, ayah: 107 },
      { label: 'Surah Al-Fath 48:29', surah: 48, ayah: 29 },
    ],
  },
  adam: {
    nameEn: 'Adam',
    titleEn: 'The first man and the first prophet',
    eraEn: 'The beginning of humanity',
    quranMentionsEn: 'Mentioned 25 times',
    summaryEn:
      'Created from clay, taught the names of all things, honoured above the angels — and forgiven by Allah after his slip.',
    lessonsEn: [
      'Every human being is honoured by Allah.',
      'Mistakes are forgiven when we repent sincerely.',
      'Satan is an open enemy — guard your steps.',
    ],
    references: [
      { label: 'Surah Al-Baqarah 2:30-39', surah: 2, ayah: 30 },
      { label: 'Surah Al-Araf 7:11-27', surah: 7, ayah: 11 },
    ],
  },
  idris: {
    nameEn: 'Idris',
    titleEn: 'The truthful one raised high',
    eraEn: 'Early generations after Adam',
    quranMentionsEn: 'Mentioned 2 times',
    summaryEn:
      'A prophet of truth and patience whom Allah raised to a high station, remembered for his steadfast worship.',
    lessonsEn: [
      'Truthfulness and patience raise a person in rank.',
      'Constant remembrance of Allah shapes a pure life.',
      'Allah honours those who remain steadfast.',
    ],
    references: [
      { label: 'Surah Maryam 19:56-57', surah: 19, ayah: 56 },
      { label: 'Surah Al-Anbiya 21:85-86', surah: 21, ayah: 85 },
    ],
  },
  nuh: {
    nameEn: 'Nuh',
    titleEn: 'The patient warner',
    eraEn: 'Nine hundred and fifty years of calling',
    quranMentionsEn: 'Mentioned 43 times',
    summaryEn:
      'He called his people for nine hundred and fifty years — in public and in secret — and built the ark when they refused.',
    lessonsEn: [
      'Results are with Allah; the duty is the effort.',
      'Never abandon calling to good, however long it takes.',
      'Obedience to Allah saves; arrogance drowns.',
    ],
    references: [
      { label: 'Surah Nuh 71:1-28', surah: 71, ayah: 1 },
      { label: 'Surah Hud 11:25-49', surah: 11, ayah: 25 },
    ],
  },
  hud: {
    nameEn: 'Hud',
    titleEn: 'The warner of the people of Ad',
    eraEn: 'After Nuh, among the people of Ad',
    quranMentionsEn: 'Mentioned 25 times',
    summaryEn:
      'Sent to a powerful people who trusted their strength and towers — he called them to worship Allah alone.',
    lessonsEn: [
      'Power and wealth do not protect against Allah’s decree.',
      'Arrogance is the root of disbelief.',
      'A believer speaks truth even when alone.',
    ],
    references: [
      { label: 'Surah Hud 11:50-60', surah: 11, ayah: 50 },
      { label: 'Surah Al-Araf 7:65-72', surah: 7, ayah: 65 },
    ],
  },
  saleh: {
    nameEn: 'Saleh',
    titleEn: 'The prophet of Thamud',
    eraEn: 'Among the people of Thamud',
    quranMentionsEn: 'Mentioned 9 times',
    summaryEn:
      'His people asked for a sign, so Allah sent them a she-camel — yet they killed her and were destroyed.',
    lessonsEn: [
      'Signs are a mercy; rejecting them invites ruin.',
      'Do not let the crowd push you away from truth.',
      'Repent before the punishment arrives.',
    ],
    references: [
      { label: 'Surah Hud 11:61-68', surah: 11, ayah: 61 },
      { label: 'Surah Al-Araf 7:73-79', surah: 7, ayah: 73 },
    ],
  },
  ibrahim: {
    nameEn: 'Ibrahim',
    titleEn: 'The friend of Allah — Khalilullah',
    eraEn: 'Babylon, Sham and Makkah',
    quranMentionsEn: 'Mentioned 69 times',
    summaryEn:
      'He broke the idols, was thrown into fire that became cool and safe, and built the Kaaba with his son Ismail.',
    lessonsEn: [
      'Tawhid begins with questioning falsehood.',
      'Put Allah before everything, even what you love most.',
      'Allah makes a way out no one imagined.',
    ],
    references: [
      { label: 'Surah Al-Baqarah 2:124-141', surah: 2, ayah: 124 },
      { label: 'Surah As-Saffat 37:99-113', surah: 37, ayah: 99 },
      { label: 'Surah Al-Anam 6:74-79', surah: 6, ayah: 74 },
    ],
  },
  ismail: {
    nameEn: 'Ismail',
    titleEn: 'The patient son and builder of the Kaaba',
    eraEn: 'Makkah',
    quranMentionsEn: 'Mentioned 12 times',
    summaryEn:
      'He submitted to the command of Allah alongside his father, and together they raised the foundations of the Kaaba.',
    lessonsEn: [
      'True submission is obedience before understanding.',
      'Allah honours patience and trust.',
      'A promise kept to Allah never fails.',
    ],
    references: [
      { label: 'Surah As-Saffat 37:99-113', surah: 37, ayah: 99 },
      { label: 'Surah Al-Baqarah 2:125-129', surah: 2, ayah: 125 },
      { label: 'Surah Maryam 19:54-55', surah: 19, ayah: 54 },
    ],
  },
  yusuf: {
    nameEn: 'Yusuf',
    titleEn: 'The beautiful story of patience and forgiveness',
    eraEn: 'Kan’an and Egypt',
    quranMentionsEn: 'Mentioned 27 times — an entire surah tells his story',
    summaryEn:
      'Betrayed by his brothers, enslaved, and imprisoned — yet he rose to govern Egypt and forgave those who wronged him.',
    lessonsEn: [
      'What people intend for harm, Allah turns to good.',
      'Guard your character in hardship and in ease.',
      'Forgiveness is the crown of the strong.',
    ],
    references: [
      { label: 'Surah Yusuf 12:1-111', surah: 12, ayah: 1 },
      { label: 'Surah Yusuf 12:90-92', surah: 12, ayah: 90 },
    ],
  },
  ayyub: {
    nameEn: 'Ayyub',
    titleEn: 'The patient servant',
    eraEn: 'The land of Uz',
    quranMentionsEn: 'Mentioned 4 times',
    summaryEn:
      'He lost his wealth, family and health — yet he never complained against Allah, and Allah restored him.',
    lessonsEn: [
      'Patience in loss is worship.',
      'Complaining to Allah is not complaining about Allah.',
      'After hardship, Allah brings relief.',
    ],
    references: [
      { label: 'Surah Al-Anbiya 21:83-84', surah: 21, ayah: 83 },
      { label: 'Surah Sad 38:41-44', surah: 38, ayah: 41 },
    ],
  },
  yunus: {
    nameEn: 'Yunus',
    titleEn: 'The companion of the whale',
    eraEn: 'Nineveh',
    quranMentionsEn: 'Mentioned 6 times',
    summaryEn:
      'He left his people in frustration, was swallowed by a whale, and cried out in the darkness — and Allah saved him and then guided his whole city.',
    lessonsEn: [
      'No darkness is deeper than Allah’s mercy.',
      'Turn back to Allah immediately.',
      'Never give up hope for anyone’s guidance.',
    ],
    references: [
      { label: 'Surah As-Saffat 37:139-148', surah: 37, ayah: 139 },
      { label: 'Surah Al-Anbiya 21:87-88', surah: 21, ayah: 87 },
    ],
  },
  musa: {
    nameEn: 'Musa',
    titleEn: 'The one who spoke with Allah — Kalimullah',
    eraEn: 'Egypt, Madyan and Sinai',
    quranMentionsEn: 'Mentioned 136 times — the most mentioned prophet',
    summaryEn:
      'From a basket on the Nile to the burning bush, he faced Pharaoh with a staff and trust in Allah, and received the Torah.',
    lessonsEn: [
      'No tyrant is greater than Allah.',
      'Speak truth to power with gentleness and courage.',
      'Trust Allah’s wisdom even when it puzzles you.',
    ],
    references: [
      { label: 'Surah Ta-Ha 20:9-48', surah: 20, ayah: 9 },
      { label: 'Surah Al-Kahf 18:60-82', surah: 18, ayah: 60 },
      { label: 'Surah Al-Araf 7:103-137', surah: 7, ayah: 103 },
    ],
  },
  dawud: {
    nameEn: 'Dawud',
    titleEn: 'The king, psalmist and servant of Allah',
    eraEn: 'The kingdom of Israel',
    quranMentionsEn: 'Mentioned 16 times',
    summaryEn:
      'He defeated Jalut as a youth, received the Zabur, and led a kingdom with justice and humble worship.',
    lessonsEn: [
      'Courage belongs to those who trust Allah.',
      'Worship and leadership go hand in hand.',
      'Judge with justice — even when it costs you.',
    ],
    references: [
      { label: 'Surah Al-Baqarah 2:251', surah: 2, ayah: 251 },
      { label: 'Surah Saba 34:10-11', surah: 34, ayah: 10 },
      { label: 'Surah Sad 38:17-26', surah: 38, ayah: 17 },
    ],
  },
  sulaiman: {
    nameEn: 'Sulaiman',
    titleEn: 'The king who ruled jinn, birds and wind',
    eraEn: 'The kingdom of Israel',
    quranMentionsEn: 'Mentioned 17 times',
    summaryEn:
      'Allah gave him a kingdom unlike any other — the wind, the jinn and the language of the birds — yet he remained a humble servant.',
    lessonsEn: [
      'Every power is a trust from Allah.',
      'Knowledge and gratitude walk together.',
      'Wealth is a test, not a reward.',
    ],
    references: [
      { label: 'Surah An-Naml 27:15-44', surah: 27, ayah: 15 },
      { label: 'Surah Saba 34:12-14', surah: 34, ayah: 12 },
      { label: 'Surah Sad 38:30-40', surah: 38, ayah: 30 },
    ],
  },
  isa: {
    nameEn: 'Isa',
    titleEn: 'The Messiah — a word from Allah',
    eraEn: 'Bayt al-Maqdis',
    quranMentionsEn: 'Mentioned 25 times',
    summaryEn:
      'Born of Maryam without a father, he spoke from the cradle and healed the blind by Allah’s permission. Muslims love him and await his return.',
    lessonsEn: [
      'Allah’s command is simply "Be".',
      'Miracles happen only by Allah’s permission.',
      'Love the Messiah as the Quran teaches — a servant of Allah.',
    ],
    references: [
      { label: 'Surah Al-Imran 3:45-55', surah: 3, ayah: 45 },
      { label: 'Surah Maryam 19:16-36', surah: 19, ayah: 16 },
      { label: 'Surah An-Nisa 4:157-158', surah: 4, ayah: 157 },
    ],
  },
}

export const PROPHETS_COLLECTION: ProphetProfile[] = PROPHETS_DATA.map((node) => {
  const extra = PROPHET_ENRICHMENT[node.id]
  return {
    ...node,
    slug: node.id,
    nameEn: extra?.nameEn ?? node.id,
    titleEn: extra?.titleEn ?? node.titleBn,
    eraEn: extra?.eraEn ?? '',
    quranMentionsEn: extra?.quranMentionsEn ?? '',
    summaryEn: extra?.summaryEn ?? '',
    lessonsEn: extra?.lessonsEn ?? [],
    references: extra?.references ?? [],
  }
})

export function getProphet(slug: string): ProphetProfile | undefined {
  return PROPHETS_COLLECTION.find((p) => p.slug === slug)
}
