export interface StorySection {
  heading: string
  text: string
  hadithOrAyahRef?: string
  reflection?: string
}

export interface StoryItem {
  id: string
  figure: string
  figureNameBn: string
  figureNameEn: string
  category: "deen" | "lifestyle" | "health" | "food" | "family" | "children" | "finance" | "charity" | "honesty"
  categoryLabelBn: string
  categoryLabelEn: string
  titleBn: string
  titleEn: string
  subtitleBn: string
  subtitleEn: string
  readTime: string
  thumbnailIcon: string
  keyTakeawaysBn: string[]
  keyTakeawaysEn: string[]
  sectionsBn: StorySection[]
  sectionsEn: StorySection[]
}

export const STORIES_DATA: StoryItem[] = [
  // 1. Prophet Muhammad (s) - Daily Lifestyle & Routine
  {
    id: "prophet-daily-lifestyle-routine",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "lifestyle",
    categoryLabelBn: "দৈনন্দিন জীবন ও প্রাত্যহিক রুটিন",
    categoryLabelEn: "Daily Lifestyle & Routine",
    titleBn: "রাসূলুল্লাহ ﷺ এর আদর্শ দিনলিপি ও প্রাত্যহিক জীবনধারা",
    titleEn: "The Daily Routine & Lifestyle of Prophet Muhammad ﷺ",
    subtitleBn: "ভোরের তাহাজ্জুদ থেকে রাতের বিশ্রাম—কীভাবে কাটতো বিশ্বনবীর প্রতিটি মুহূর্ত?",
    subtitleEn: "From predawn prayers to nighttime rest—how the Prophet ﷺ spent his everyday life.",
    readTime: "7 মিনিট",
    thumbnailIcon: "sun",
    keyTakeawaysBn: [
      "ভোরে দিন শুরু করা এবং প্রতিটি কাজে সময়ানুবর্তিতা বজায় রাখা।",
      "মুখমণ্ডলে সর্বদা মৃদু হাসি এবং মানুষের সাথে হাসিমুখে কথা বলা।",
      "ঘরের কাজে পরিবারকে সহযোগিতা করা এবং নিজের জুতো ও কাপড় নিজে মেরামত করা।",
      "অপ্রয়োজনীয় কথা পরিহার করে কাজের মাধ্যমে দৃষ্টান্ত স্থাপন করা।"
    ],
    keyTakeawaysEn: [
      "Starting the day early with purpose and gratitude.",
      "Maintaining a warm, gentle smile with everyone you meet.",
      "Active participation in household chores and self-reliance.",
      "Speaking with clarity, kindness, and avoiding unnecessary chatter."
    ],
    sectionsBn: [
      {
        heading: "ভোরের সূচনা ও আধ্যাত্মিক জাগরণ",
        text: "রাসূলুল্লাহ ﷺ ফজরের অনেক আগেই জাগ্রত হতেন। ঘুম থেকে জেগে তিনি প্রথমে আল্লাহর শোকর আদায় করতেন এবং মিসওয়াক দিয়ে মুখ পরিষ্কার করতেন। এরপর তিনি প্রশান্ত চিত্তে তাহাজ্জুদের সালাত আদায় করতেন, যেখানে তিনি মহান রবের সাথে একান্তে মনের আকুতি প্রকাশ করতেন।",
        hadithOrAyahRef: "হযরত আয়েশা (রাঃ) বলেন: 'রাসূলুল্লাহ ﷺ রাতে এত দীর্ঘ সময় নামাজে দাঁড়িয়ে থাকতেন যে তাঁর পা মোবারক ফুলে যেত।' (সহীহ বুখারী)",
        reflection: "দিনের শুরু যদি মহান রবের স্মরণ ও আত্মশুদ্ধি দিয়ে হয়, তবে সারাদিনের সকল কাজে প্রশান্তি ও বরকত লাভ হয়।"
      },
      {
        heading: "দিনের কর্মব্যস্ততা ও সামাজিক মেলবন্ধন",
        text: "ফজরের নামাজের পর তিনি সাহাবীদের সাথে মসজিদে নববীতে বসে কথা বলতেন, তাঁদের খোঁজখবর নিতেন, কারো স্বপ্ন থাকলে তার সুন্দর ব্যাখ্যা দিতেন এবং সকলের সমস্যা সমাধান করতেন। তিনি কখনো কাউকে তুচ্ছ মনে করতেন না; ছোট-বড়, ধনী-দরিদ্র সবাইকে সমান মর্যাদায় আপন করে নিতেন।",
      },
      {
        heading: "পারিবারিক সান্নিধ্য ও ঘরের কাজ",
        text: "যখন তিনি ঘরে প্রবেশ করতেন, তখন তিনি একজন স্নেহশীল স্বামী ও পিতা হিসেবে থাকতেন। তিনি ঘরে বসে অলস সময় কাটাতেন না। হযরত আয়েশা (রাঃ) কে জিজ্ঞাসা করা হয়েছিল, 'রাসূলুল্লাহ ﷺ ঘরে কী করতেন?' তিনি উত্তর দিলেন, 'তিনি পরিবারের কাজে সাহায্য করতেন, নিজের কাপড় নিজে সেলাই করতেন, জুতো মেরামত করতেন এবং ছাগলের দুধ দোয়াতেন।'",
        hadithOrAyahRef: "সহীহ বুখারী: ৬৭৬",
        reflection: "নিজের কাজ নিজে করা এবং পরিবারের সদস্যদের ঘরের কাজে সাহায্য করা কোনো লজ্জার বিষয় নয়, বরং তা শ্রেষ্ঠ সুন্নাহ।"
      },
      {
        heading: "রাতের বিশ্রাম ও সমাপ্তি",
        text: "এশার নামাজের পর তিনি অহেতুক আড্ডা বা গল্পগুজব পছন্দ করতেন না। ঘুমানোর পূর্বে তিনি বিছানা ঝেড়ে নিতেন, সূরা ইখলাস, ফালাক ও নাস পড়ে শরীরে ফুঁ দিতেন এবং ডান কাতে শয়ন করতেন। তাঁর বালিশ ছিল চামড়ার, যার ভেতরে ছিল খেজুর গাছের ছাল।"
      }
    ],
    sectionsEn: [
      {
        heading: "The Dawn Awakening and Spiritual Radiance",
        text: "The Prophet Muhammad ﷺ woke up well before dawn. The moment he awoke, he remembered Allah and cleaned his mouth with a miswak. He would then stand in tranquility for Tahajjud (night prayer), pouring his heart out to his Creator with tears of deep gratitude and humility.",
        hadithOrAyahRef: "Aisha (RA) narrated: 'The Prophet ﷺ used to pray at night until his feet became swollen.' (Sahih al-Bukhari)",
        reflection: "Beginning our morning with remembrance of the Creator sets an anchor of calmness and productivity for the rest of the day."
      },
      {
        heading: "Daytime Interaction and Social Community",
        text: "After Fajr prayer, he sat with his companions, inquiring about their well-being, resolving their grievances, and smiling at everyone. He never made anyone feel insignificant; kings and poor nomads received the exact same attention and warmth.",
      },
      {
        heading: "Involvement at Home and Household Chores",
        text: "Inside his home, the Prophet ﷺ was the gentlest family member. When Aisha (RA) was asked what the Prophet did at home, she replied: 'He served his family, mended his own shoes, patched his own garments, and milked his own goats.'",
        hadithOrAyahRef: "Sahih al-Bukhari: 676",
        reflection: "Doing your own chores and supporting your spouse in daily tasks is not a chore—it is an act of prophetic devotion."
      },
      {
        heading: "Evening Rest and Wholesome Sleep",
        text: "After Isha prayer, he disliked unnecessary gossip. Before sleeping, he dusted his bedding, recited Surah Al-Ikhlas, Al-Falaq, and An-Nas, blowing over his hands and wiping his body, then rested calmly on his right side."
      }
    ]
  },

  // 2. Prophet Muhammad (s) - Food & Eating Habits
  {
    id: "prophet-food-nutrition-habits",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "food",
    categoryLabelBn: "খাদ্যাভ্যাস ও আহারের আদব",
    categoryLabelEn: "Food Habits & Nutrition",
    titleBn: "রাসূলুল্লাহ ﷺ এর খাদ্যাভ্যাস, প্রিয় খাবার ও আহারের আদব",
    titleEn: "Diet, Nutrition & Eating Etiquettes of the Prophet ﷺ",
    subtitleBn: "পরিমিত আহার, প্রিয় খাবার এবং সুস্বাস্থ্যের ভারসাম্যপূর্ণ জীবনরীতি।",
    subtitleEn: "Mindful eating, favorite wholesome foods, and the prophetic balance of nutrition.",
    readTime: "6 মিনিট",
    thumbnailIcon: "utensils",
    keyTakeawaysBn: [
      "খাবারের শুরুতে 'বিসমিল্লাহ' এবং শেষে 'আলহামদুলিল্লাহ' বলা।",
      "পেটের এক-তৃতীয়াংশ খাবার, এক-তৃতীয়াংশ পানি এবং এক-তৃতীয়াংশ বাতাসের জন্য খালি রাখা।",
      "খেজুর, মধু, জয়তুন তেল, দুধ, লাউ এবং তালবীনা ছিল তাঁর প্রিয় পুষ্টিকর খাবার।",
      "খাবারের কখনো কোনো ত্রুটি না ধরা; পছন্দ হলে খাওয়া, না হলে চুপ থাকা।"
    ],
    keyTakeawaysEn: [
      "Beginning meals with Bismillah and concluding with heartfelt gratitude (Alhamdulillah).",
      "The prophetic golden rule of diet: 1/3 for food, 1/3 for water, and 1/3 for air.",
      "Wholesome preferred foods: dates, raw honey, olive oil, barley (talbina), milk, and gourd.",
      "Never criticizing food; eating if desired or leaving it politely without complain."
    ],
    sectionsBn: [
      {
        heading: "পরিমিত আহারের মূলনীতি",
        text: "রাসূলুল্লাহ ﷺ কখনো অতিরিক্ত পেট ভরে খেতেন না। তিনি শিখিয়েছেন যে মানুষের বেঁচে থাকার জন্য কয়েক লোকমা খাবারই যথেষ্ট, যা তার মেরুদণ্ডকে সোজা রাখবে। তিনি স্পষ্ট করে বলেছেন: পেটের এক-তৃতীয়াংশ খাবারের জন্য, এক-তৃতীয়াংশ পানির জন্য এবং এক-তৃতীয়াংশ শ্বাস-প্রশ্বাসের জন্য খালি রাখা উচিত।",
        hadithOrAyahRef: "তিরমিযী: ২৩৮০ (সহীহ হাদিস)",
        reflection: "অতিরিক্ত ভোজন ক্লান্তি ও অলসতা ডেকে আনে; পরিমিত আহার শরীর ও মনকে সতেজ রাখে।"
      },
      {
        heading: "রাসূলুল্লাহ ﷺ এর প্রিয় ও বরকতময় খাবারসমূহ",
        text: "বিশ্বনবী ﷺ এর প্রিয় খাবারের মধ্যে অন্যতম ছিল খেজুর (বিশেষ করে আজওয়া খেজুর), খাঁটি মধু, জয়তুনের তেল, মিষ্টি লাউ বা কদু, বার্লি বা যবের রুটি এবং তালবীনা (যবের ছাতু ও দুধের তৈরি পথ্য)। তিনি তরমুজের সাথে তাজা খেজুর মিলিয়ে খেতে পছন্দ করতেন, কারণ এর দ্বারা একটির উষ্ণতা অপরটির শীতলতা দিয়ে প্রশমিত হতো।",
      },
      {
        heading: "আহারের সুন্দর আদব ও আচরণ",
        text: "তিনি সর্বদা ডান হাত দিয়ে খেতেন এবং পাত্রের নিজের সামনের অংশ থেকে তুলে খেতেন। খাবার কখনো দাঁড়িয়ে বা হেলান দিয়ে খেতেন না। আহারের পূর্বে ও পরে হাত ধুয়ে নিতেন। সবচেয়ে বিস্ময়কর বিষয় হলো—তিনি জীবনে কখনো কোনো খাবারের নিন্দা বা ত্রুটি ধরেননি। ভালো লাগলে খেতেন, ভালো না লাগলে হাসিমুখে রেখে দিতেন।"
      }
    ],
    sectionsEn: [
      {
        heading: "The Golden Principle of Moderation",
        text: "The Prophet ﷺ taught that a human being does not fill any vessel worse than their stomach. A few morsels sufficient to keep one's back straight are enough. If one must eat, then one-third should be for food, one-third for drink, and one-third left empty for breathing.",
        hadithOrAyahRef: "Jami` at-Tirmidhi: 2380",
        reflection: "Overeating dulls the sharp mind and induces fatigue; conscious eating preserves vitality and energy."
      },
      {
        heading: "Favorite Wholesome Foods of the Prophet ﷺ",
        text: "The Prophet's favorites included fresh dates (Ajwa), pure raw honey, cold-pressed olive oil, bottle gourd (kaddu), barley bread, and Talbina (a soothing porridge made of barley flour and milk). He frequently paired fresh dates with watermelon or cucumber to balance nutritional properties naturally.",
      },
      {
        heading: "Mindful Eating Etiquettes",
        text: "He always ate with his right hand, took food from what was directly in front of him, and never ate while reclining. He washed his hands before and after meals. Remarkably, throughout his entire life, he never criticized any meal: if he liked it he ate, and if not, he left it politely without a word of complaint."
      }
    ]
  },

  // 3. Prophet Muhammad (s) - Health, Hygiene & Wellness
  {
    id: "prophet-health-hygiene-wellness",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "health",
    categoryLabelBn: "স্বাস্থ্য, চিকিৎসা ও সুস্থতা",
    categoryLabelEn: "Health, Hygiene & Wellness",
    titleBn: "রাসূলুল্লাহ ﷺ এর স্বাস্থ্যবিধি, পরিচ্ছন্নতা ও সুস্থ জীবনরীতি",
    titleEn: "Prophetic Hygiene, Medicine & Wholesome Health Practices",
    subtitleBn: "দৈহিক ও মানসিক সুস্থতায় সুন্নাহর পথনির্দেশ ও চিকিৎসাবিধি।",
    subtitleEn: "Physical vitality, pristine hygiene, and natural healing in the prophetic tradition.",
    readTime: "6 মিনিট",
    thumbnailIcon: "heart-pulse",
    keyTakeawaysBn: [
      "পরিচ্ছন্নতা ঈমানের অর্ধেক—নিয়মিত ওযু, গোসল ও মিসওয়াক করা।",
      "হিজামা (রক্তমোক্ষণ) ও কালোজিরার ব্যবহারে আরোগ্য অন্বেষণ।",
      "হাঁটাহাঁটি, দৌড় ও শারীরিক সক্রিয়তা বজায় রাখা।",
      "রোগ প্রতিরোধে কোয়ারেন্টাইন এবং মানসিক প্রশান্তির গুরুত্ব।"
    ],
    keyTakeawaysEn: [
      "Cleanliness is half of faith: daily wudu, regular bathing, and dental hygiene with miswak.",
      "Natural remedies: black seed (Nigella sativa), cupping (Hijama), and honey.",
      "Active movement: purposeful walking, archery, and physical fitness.",
      "Preventive health: quarantine during epidemics and safeguarding mental peace."
    ],
    sectionsBn: [
      {
        heading: "পরিচ্ছন্নতা ও দাঁতের যত্ন (মিসওয়াক)",
        text: "রাসূলুল্লাহ ﷺ পরিচ্ছন্নতাকে ঈমানের অঙ্গ ঘোষণা করেছেন। তিনি দিনে বহুবার মিসওয়াক করতেন—ঘুম থেকে উঠে, ওযুর সময়, নামাজে যাওয়ার আগে এবং ঘরে প্রবেশের সাথে সাথে। তিনি সুগন্ধি অত্যন্ত পছন্দ করতেন এবং শরীরে দুর্গন্ধযুক্ত কিছু পছন্দ করতেন না।",
        hadithOrAyahRef: "সহীহ মুসলিম: ২২৩ ('পবিত্রতা ঈমানের অর্ধেক')",
        reflection: "উত্তম পরিচ্ছন্নতা মানুষের আত্মবিশ্বাস বৃদ্ধি করে এবং রোগবালাই থেকে পরিবারকে সুরক্ষিত রাখে।"
      },
      {
        heading: "প্রাকৃতিক প্রতিষেধক ও চিকিৎসা পদ্ধতি",
        text: "তিনি অসুস্থ হলে চিকিৎসকের পরামর্শ নিতে এবং ঔষধ গ্রহণ করতে উৎসাহিত করতেন। তিনি বলেছেন, 'আল্লাহ এমন কোনো রোগ দেননি যার নিরাময় তিনি সৃষ্টি করেননি।' তিনি কালোজিরাকে মৃত্যুর ব্যতীত সকল রোগের নিরাময়কারী বলে উল্লেখ করেছেন এবং হিজামাকে অন্যতম শ্রেষ্ঠ চিকিৎসা পদ্ধতি হিসেবে অভিহিত করেছেন।",
      },
      {
        heading: "মহামারী ও স্বাস্থ্য সচেতনতা",
        text: "সংক্রামক রোগ ও মহামারী প্রতিরোধে বিশ্বনবী ﷺ যে আধুনিক কোয়ারেন্টাইন বিধির কথা বলেছেন তা আজ বিশ্বজুড়ে স্বীকৃত। তিনি নির্দেশ দিয়েছেন: 'কোথাও প্লেগ বা মহামারী দেখা দিলে সেখানে প্রবেশ করো না, আর তোমরা যেখানে আছো সেখানে দেখা দিলে সেখান থেকে পালিয়ে যেও না।'"
      }
    ],
    sectionsEn: [
      {
        heading: "Pristine Personal Hygiene & Dental Care",
        text: "The Prophet ﷺ placed cleanliness at the very core of faith. He utilized the miswak (natural tooth-stick) repeatedly throughout the day: upon waking, during ablution, before prayer, and when entering his home. He loved pleasing scents and maintained immaculately fresh presentation at all times.",
        hadithOrAyahRef: "Sahih Muslim: 223 ('Purity is half of faith')",
        reflection: "Meticulous hygiene enhances mental clarity, elevates self-esteem, and protects the entire household."
      },
      {
        heading: "Holistic Healing & Natural Remedies",
        text: "Whenever someone fell ill, the Prophet ﷺ encouraged seeking qualified medical treatment, declaring: 'Allah has not sent down a disease except that He has also sent down its cure.' He highlighted the natural benefits of black seed (Habbat al-Barakah), cupping therapy (Hijama), and raw honey.",
      },
      {
        heading: "Quarantine & Epidemic Safety",
        text: "Fourteen centuries ago, the Prophet ﷺ established the foundational principles of modern public health quarantine: 'If you hear of an outbreak of plague in a land, do not enter it; but if the plague breaks out in a place while you are in it, do not leave that place.'"
      }
    ]
  },

  // 4. Prophet Muhammad (s) - Family Life & Treatment of Wives
  {
    id: "prophet-family-wives-treatment",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "family",
    categoryLabelBn: "পারিবারিক জীবন ও দাম্পত্য সম্পর্ক",
    categoryLabelEn: "Family & Treatment of Spouses",
    titleBn: "বিশ্বনবী ﷺ এর পারিবারিক জীবন ও স্ত্রীদের প্রতি ভালোবাসাময় আচরণ",
    titleEn: "Romantic Compassion & Family Harmony of the Prophet ﷺ",
    subtitleBn: "স্ত্রীগণের প্রতি শ্রদ্ধা, স্নেহ, খোলামেলা আলোচনা ও ভালোবাসার অনুপম দৃষ্টান্ত।",
    subtitleEn: "Unconditional gentleness, emotional intelligence, and loving communication with spouses.",
    readTime: "7 মিনিট",
    thumbnailIcon: "heart",
    keyTakeawaysBn: [
      "'তোমাদের মধ্যে শ্রেষ্ঠ ব্যক্তি সে, যে তার পরিবারের কাছে শ্রেষ্ঠ।'—নবীজির অমর বাণী।",
      "স্ত্রীদের সাথে খেলাধুলা করা, দৌড় প্রতিযোগিতা করা ও হাসিখুশি গল্প করা।",
      "পারিবারিক মনোমালিন্যে কখনো রাগারাগি বা গায়ে হাত না তোলা; ভালোবাসা দিয়ে মন জয় করা।",
      "স্ত্রীদের মতামতের মূল্যায়ন করা এবং গুরুত্বপূর্ণ সিদ্ধান্তে তাঁদের পরামর্শ গ্রহণ করা।"
    ],
    keyTakeawaysEn: [
      "'The best among you are those who are best to their wives.'—Prophetic maxim.",
      "Engaging in playful moments, friendly footraces, and affectionate conversations.",
      "Never resorting to harsh anger or physical harm; resolving conflicts with gentle patience.",
      "Valuing wives' intellectual opinions and consulting them on critical state matters."
    ],
    sectionsBn: [
      {
        heading: "পরিবারে কোমলতা ও ভালোবাসার প্রকাশ",
        text: "বিশ্বনবী ﷺ ঘরের ভেতর ছিলেন পরম স্নেহশীল ও রোমান্টিক মনের মানুষ। তিনি স্ত্রীদের আদর করে সুন্দর নামে ডাকতেন (যেমন আয়েশা রাঃ কে 'হুমায়রা' বলতেন)। তিনি পানির পাত্রে আয়েশা (রাঃ) যেখানে ঠোঁট রেখে পানি খেতেন, ঠিক সেখানেই ঠোঁট রেখে পানি পান করতেন।",
        hadithOrAyahRef: "সহীহ মুসলিম: ৩০০",
        reflection: "দাম্পত্য জীবনে ছোট ছোট ভালোবাসার প্রকাশ সম্পর্ককে সুদৃঢ় ও মাধুর্যপূর্ণ করে তোলে।"
      },
      {
        heading: "বিনোদন ও আনন্দময় সান্নিধ্য",
        text: "রাসূলুল্লাহ ﷺ আয়েশা (রাঃ) এর সাথে মরুভূমিতে আনন্দদায়ক দৌড় প্রতিযোগিতা করেছিলেন। তিনি কখনোই স্ত্রীদের ওপর নিজের কর্তৃত্ব চাপিয়ে দিতেন না, বরং তাদের আনন্দ ও আনন্দের সময়কে সর্বোচ্চ গুরুত্ব দিতেন।",
      },
      {
        heading: "হুদাইবিয়ার সন্ধি ও উম্মে সালামাহ (রাঃ) এর পরামর্শ",
        text: "হুদাইবিয়ার সন্ধির কঠিন মুহূর্তে যখন সাহাবীগণ মনঃকষ্টে দ্বিধাদ্বন্দ্বে ছিলেন, তখন রাসূলুল্লাহ ﷺ তাঁর স্ত্রী উম্মে সালামাহ (রাঃ) এর পরামর্শ গ্রহণ করেন। তাঁর প্রজ্ঞাপূর্ণ পরামর্শেই সংকট তাৎক্ষণিকভাবে দূরীভূত হয়েছিল। এটি প্রমাণ করে ইসলামে নারীর বুদ্ধিমত্তা ও পরামর্শের স্থান কত উচ্চে।"
      }
    ],
    sectionsEn: [
      {
        heading: "Gentleness & Affectionate Expressions",
        text: "Inside the home, the Prophet ﷺ was affectionate, humorous, and gentle. He called his wives with endearing nicknames. When drinking water, he would deliberately place his lips on the exact spot where Aisha (RA) had placed hers on the cup.",
        hadithOrAyahRef: "Sahih Muslim: 300",
        reflection: "Small gestures of tenderness and emotional validation breathe lasting life and joy into marriage."
      },
      {
        heading: "Playfulness & Quality Time",
        text: "The Prophet ﷺ engaged in lighthearted footraces with Aisha (RA) in the desert. He never ruled through intimidation or harsh dominance, but through warmth, companionship, and shared laughter.",
      },
      {
        heading: "The Wisdom of Consulting Women: Umm Salamah (RA)",
        text: "During the treaty of Hudaybiyyah, when the companions were overwhelmed with grief, the Prophet ﷺ sought the strategic advice of his wife, Umm Salamah (RA). Her profound counsel resolved a major impasse—demonstrating the high value of women's intellect in leadership."
      }
    ]
  },

  // 5. Prophet Muhammad (s) - Children & Youth
  {
    id: "prophet-children-youth-parenting",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "children",
    categoryLabelBn: "সন্তান, নাতি-নাতনি ও শিশুদের প্রতি স্নেহ",
    categoryLabelEn: "Children, Youth & Compassion",
    titleBn: "শিশুদের প্রতি বিশ্বনবী ﷺ এর অপরিসীম মমতা ও আদর্শ অভিভাবকত্ব",
    titleEn: "The Prophet's Tender Love for Children & Empowering Youth",
    subtitleBn: "শিশুদের চুম্বন করা, তাদের খেলায় শরিক হওয়া ও তরুণের আত্মবিশ্বাস গড়ে তোলার গল্প।",
    subtitleEn: "Embracing little ones, joining their play, and instilling profound self-worth in young minds.",
    readTime: "6 মিনিট",
    thumbnailIcon: "smile",
    keyTakeawaysBn: [
      "শিশুদের নিয়মিত জড়িয়ে ধরা, চুমু খাওয়া এবং নিঃশর্ত স্নেহ প্রদান করা।",
      "নামাজে সিজদারত অবস্থায় নাতিরা পিঠে চড়লে সিজদা দীর্ঘ করা যাতে তাদের কষ্ট না হয়।",
      "কিশোর ও তরুণদের বড় দায়িত্ব দিয়ে তাদের প্রতি আস্থা প্রকাশ করা (যেমন উসামা বিন যায়দ)।",
      "ভুল করলে তিরস্কার না করে স্নেহের সাথে বুঝিয়ে বলা (যেমন হযরত আনাস রাঃ এর সাক্ষ্য)।"
    ],
    keyTakeawaysEn: [
      "Constantly hugging, kissing, and showing unconditional warmth to children.",
      "Prolonging prostration in prayer when his grandchildren climbed on his back so they wouldn't fall.",
      "Entrusting youth with major leadership roles (e.g. appointing Usama ibn Zayd as general).",
      "Correcting mistakes with empathy rather than harsh scolding (witnessed by Anas ibn Malik)."
    ],
    sectionsBn: [
      {
        heading: "শিশুদের চুম্বন ও মমতা",
        text: "একবার এক বেদুইন নেতা নবীজিকে নাতি হাসানকে চুমু খেতে দেখে বলল, 'আমার দশটি সন্তান আছে, আমি তো কখনো তাদের কাউকে চুমু খাইনি!' রাসূলুল্লাহ ﷺ অবাক হয়ে বললেন: 'আল্লাহ যদি তোমার অন্তর থেকে দয়া কেড়ে নেন, তবে আমার কি করার আছে? যে দয়া করে না, সে দয়া পায় না।'",
        hadithOrAyahRef: "সহীহ বুখারী: ৫৯৯৭",
        reflection: "শিশুদের প্রতি শারীরিক স্নেহ ও জড়িয়ে ধরা তাদের মানসিকভাবে সুস্থ ও আত্মবিশ্বাসী করে গড়ে তোলে।"
      },
      {
        heading: "নামাজে শিশুদের প্রতি সংবেদনশীলতা",
        text: "রাসূলুল্লাহ ﷺ নামাজে দাঁড়িয়ে শিশুর কান্নার আওয়াজ শুনলে নামাজ সংক্ষেপ করতেন, যাতে শিশুর মা কষ্ট না পান। হাসান ও হুসাইন (রাঃ) সিজদার সময় তাঁর পিঠে চড়লে তিনি নিজে থেকে উঠতেন না, যতক্ষণ না শিশুরা স্বেচ্ছায় নেমে যেত।",
      },
      {
        heading: "হযরত আনাস (রাঃ) এর ১০ বছরের অভিজ্ঞতা",
        text: "হযরত আনাস (রাঃ) বলেন: 'আমি দশ বছর বয়স থেকে রাসূলুল্লাহ ﷺ এর খেদমতে ছিলাম। আল্লাহর কসম! তিনি কখনো আমাকে 'উহ' শব্দটি বলেননি। আমি কোনো কাজ ভুল করলে তিনি কখনো বলেননি—কেন তুমি এমন করলে? বা কেন এমন করলে না?'"
      }
    ],
    sectionsEn: [
      {
        heading: "Kissing Children & Pure Tenderness",
        text: "A bedouin leader once saw the Prophet ﷺ kissing his grandson Hasan and remarked: 'I have ten children and I have never kissed any of them!' The Prophet ﷺ looked at him and said: 'What can I do for you if Allah has removed mercy from your heart? Whoever shows no mercy will not receive mercy.'",
        hadithOrAyahRef: "Sahih al-Bukhari: 5997",
        reflection: "Physical affection and warmth build emotional resilience and security in young minds."
      },
      {
        heading: "Sensitivity to Children during Congregational Prayer",
        text: "Whenever the Prophet ﷺ heard a baby cry while leading prayer, he would shorten the recitation so the mother would not feel distressed. When Hasan and Husayn mounted his back during Sajdah, he stayed down patiently until they happily climbed off.",
      },
      {
        heading: "Anas ibn Malik's Ten Years of Gentle Mentorship",
        text: "Anas (RA) recounted: 'I served the Messenger of Allah ﷺ for ten years. By Allah, he never once said 'Uff' (an expression of irritation) to me. If I failed to do something, he never scolded me saying: Why did you not do this?'"
      }
    ]
  },

  // 6. Prophet Muhammad (s) - Finance, Trade & Honesty
  {
    id: "prophet-finance-trade-honesty",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "finance",
    categoryLabelBn: "ব্যবসা, অর্থব্যবস্থা ও আর্থিক সততা",
    categoryLabelEn: "Finance, Business & Honesty",
    titleBn: "ব্যবসা ও অর্থব্যবস্থায় রাসূলুল্লাহ ﷺ এর সততা, হালাল উপার্জন ও বিশ্বস্ততা",
    titleEn: "Business Integrity, Fair Trade & Halal Earning of the Prophet ﷺ",
    subtitleBn: "নবুয়তের পূর্বে 'আল-আমিন' উপাধি থেকে শুরু করে মদিনার বাজারে ন্যায়পরায়ণ ব্যবসার মডেল।",
    subtitleEn: "From the trusted merchant 'Al-Amin' in Mecca to building an ethical marketplace in Medina.",
    readTime: "7 মিনিট",
    thumbnailIcon: "coins",
    keyTakeawaysBn: [
      "ব্যবসায় পণ্যের কোনো খুঁত বা ত্রুটি থাকলে তা ক্রেতার কাছে স্পষ্ট করে বলা।",
      "ওজন ও পরিমাপে কখনো ফাঁকি না দেওয়া এবং অতিরিক্ত শপথ করে বিক্রি না করা।",
      "শ্রমিকের ঘাম শুকানোর আগেই তার পারিশ্রমিক পরিশোধ করে দেওয়া।",
      "সুদ, ধোঁকাবাজি ও একচেটিয়া মজুদদারি সম্পূর্ণ বর্জন করা।"
    ],
    keyTakeawaysEn: [
      "Disclosing any defect in goods transparently to the customer before selling.",
      "Strict honesty in weights and measures without false oaths or misleading ads.",
      "Paying workers and employees their full wages before their sweat dries.",
      "Absolute prohibition of usury, deceptive hoarding, and exploitation."
    ],
    sectionsBn: [
      {
        heading: "নবুয়তের পূর্বে 'আল-আমিন' উপাধি লাভ",
        text: "নবুয়তের অনেক পূর্ব থেকেই মক্কার সাধারণ মানুষ নবীজিকে 'আল-আমিন' (পরম বিশ্বস্ত) এবং 'আস-সাদিক' (সত্যবাদী) নামে ডাকত। তিনি যখন খাদিজা (রাঃ) এর বাণিজ্যিক কাফেলা নিয়ে সিরিয়ায় বাণিজ্য করতে যান, তখন তাঁর অপরিসীম সততা, ন্যায়পরায়ণ হিসাব এবং উত্তম ব্যবহার দেখে সবাই মুগ্ধ হয়েছিল।",
        hadithOrAyahRef: "তিরমিযী: ১২০৯ ('সৎ ও বিশ্বস্ত ব্যবসায়ী কিয়ামতের দিন নবী, সত্যবাদী ও শহীদদের সাথে থাকবেন')",
        reflection: "ব্যবসায় সাময়িক মিথ্যা লাভ আনলেও সততা ও স্বচ্ছতাই দীর্ঘমেয়াদী বরকত ও সুনাম নিশ্চিত করে।"
      },
      {
        heading: "মদিনার বাজারে শস্যের স্তূপে পানির ঘটনা",
        text: "একবার বাজারে এক শস্য বিক্রেতার স্তূপে হাত ঢুকিয়ে নবীজি দেখলেন ভেতরটা ভেজা। তিনি বিক্রেতাকে জিজ্ঞেস করলেন, 'এটা কি?' বিক্রেতা বলল, 'বৃষ্টির পানিতে ভিজে গেছে হে আল্লাহর রাসুল!' নবীজি বললেন, 'তাহলে তুমি সেটা উপরে রাখলে না কেন যাতে মানুষ দেখতে পেত? মনে রেখো, যে ধোঁকা দেয় সে আমার উম্মতের অন্তর্ভুক্ত নয়।'",
      },
      {
        heading: "ঋণ পরিশোধে অতুলনীয় উদারতা",
        text: "তিনি কারো কাছ থেকে ঋণ নিলে পরিশোধের সময় তার চেয়ে উত্তম জিনিস দিতেন এবং বলতেন: 'তোমাদের মধ্যে শ্রেষ্ঠ সে, যে ঋণ পরিশোধে সবচেয়ে সুন্দর আচরণ করে।' তিনি শ্রমিকের অধিকার নিশ্চিত করে ঘোষণা করেছেন: 'শ্রমিকের ঘাম শুকানোর পূর্বেই তার মজুরি দিয়ে দাও।'"
      }
    ],
    sectionsEn: [
      {
        heading: "The Title 'Al-Amin' in the Marketplace",
        text: "Long before prophethood, the citizens of Mecca unanimously honored Muhammad ﷺ with the title 'Al-Amin' (The Trustworthy). When he managed trade expeditions for Khadijah (RA) to Syria, his impeccable bookkeeping, fair pricing, and transparency yielded unprecedented respect.",
        hadithOrAyahRef: "Jami` at-Tirmidhi: 1209 ('The honest merchant will be with the Prophets and martyrs on the Day of Judgment')",
        reflection: "Deceit might bring quick revenue, but radical transparency builds lasting trust and divine barakah."
      },
      {
        heading: "The Grain Inspection in the Medina Market",
        text: "While walking through the Medina marketplace, the Prophet ﷺ dipped his hand into a pile of grain and felt moisture beneath the surface. He asked the seller why it was damp. The man replied it got wet in the rain. The Prophet ﷺ said: 'Why did you not put the wet grain on top so buyers could see it? Whoever deceives us is not one of us.'",
      },
      {
        heading: "Fair Wages & Grace in Debt Repayment",
        text: "When returning borrowed items, he always returned better quality than he had received, proclaiming: 'The best among you are those who are best in settling debts.' He also declared the universal labor law: 'Give the worker their wage before their sweat dries.'"
      }
    ]
  },

  // 7. Prophet Muhammad (s) - Charity & Helping Others
  {
    id: "prophet-charity-helping-others",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "charity",
    categoryLabelBn: "মানবসেবা, দানশীলতা ও সহানুভূতি",
    categoryLabelEn: "Charity & Helping Humanity",
    titleBn: "বিশ্বনবী ﷺ এর সীমাহীন দানশীলতা ও নিঃস্বার্থ মানবসেবা",
    titleEn: "The Boundless Generosity & Universal Mercy of the Prophet ﷺ",
    subtitleBn: "প্রবহমান বাতাসের চেয়েও দ্রুত দান, নিঃস্বদের আশ্রয় ও সৃষ্টির প্রতি দয়া।",
    subtitleEn: "Giving freely without fear of poverty, uplifting orphans, and showing kindness to every soul.",
    readTime: "6 মিনিট",
    thumbnailIcon: "gift",
    keyTakeawaysBn: [
      "রাসূলুল্লাহ ﷺ কখনো কোনো যাচনাকারীকে 'না' বলতেন না।",
      "রমজান মাসে তিনি প্রবহমান বাতাসের চেয়েও অধিক দানশীল হয়ে উঠতেন।",
      "হাসিমুখে কথা বলা, পথ থেকে কষ্টদায়ক বস্তু সরিয়ে দেওয়া এবং মানুষকে সান্ত্বনা দেওয়াও সাদাকাহ।",
      "পশু-পাখি ও প্রকৃতির প্রতিও দয়াশীল আচরণ করার নির্দেশ।"
    ],
    keyTakeawaysEn: [
      "The Prophet ﷺ never refused anyone who asked him for help.",
      "In Ramadan, his generosity flowed faster than the unhindered gentle breeze.",
      "A warm smile, removing harmful objects from the road, and listening to the distressed are all charity.",
      "Universal mercy extending to animals, birds, and preserving greenery."
    ],
    sectionsBn: [
      {
        heading: "প্রবহমান বাতাসের চেয়েও দ্রুত দান",
        text: "হযরত ইবনে আব্বাস (রাঃ) বলেন: 'রাসূলুল্লাহ ﷺ ছিলেন মানুষের মাঝে সবচেয়ে বেশি দানশীল। আর রমজান মাসে তাঁর দানশীলতা এত বেড়ে যেত যে তা প্রবহমান মুক্ত বাতাসের চেয়েও দ্রুত প্রবাহিত হতো।' তাঁর কাছে যা থাকত, তিনি সব বিলিয়ে দিতেন; নিজের ঘরে এক মুঠো খাবার না রেখেও অন্যকে খাবার দিতেন।",
        hadithOrAyahRef: "সহীহ বুখারী: ৬",
        reflection: "দান কখনো সম্পদ কমায় না, বরং তা অন্তরে প্রশান্তি এবং সম্পদে বরকত দান করে।"
      },
      {
        heading: "অনাথ ও বিধবাদের আশ্রয়দাতা",
        text: "তিনি দুই আঙুল পাশাপাশি রেখে বললেন: 'যে ব্যক্তি এতিম বা অনাথের দায়িত্ব গ্রহণ করে, সে এবং আমি জান্নাতে এভাবেই পাশাপাশি থাকব।' সমাজের সবচেয়ে অবহেলিত মানুষকে বুকে জড়িয়ে নেওয়ার মতো এমন মানবিক নেতা পৃথিবীর ইতিহাস আর দেখেনি।",
      },
      {
        heading: "পশু-পাখির প্রতিও অসীম করুণা",
        text: "একবার এক সাহাবী একটি পাখির বাসা থেকে ছানা তুলে আনলে পাখিটি অস্থির হয়ে ডানা ঝাপটাতে লাগল। নবীজি বললেন, 'কে এই অবলা পাখিটির ছানা নিয়ে তাকে কষ্ট দিয়েছে? এখনই ছানাগুলো তার বাসায় ফিরিয়ে দাও।' পিপীলিকার গর্তে আগুন দেওয়া এবং পশুকে অনাহারে রাখাকে তিনি কঠোরভাবে নিষেধ করেছেন।"
      }
    ],
    sectionsEn: [
      {
        heading: "Generosity Faster than the Flowing Wind",
        text: "Ibn Abbas (RA) reported: 'The Messenger of Allah ﷺ was the most generous of all people, and he was even more generous in Ramadan when Gabriel met him. He was more generous than the blowing wind.' He would give away entire flocks of sheep without fearing poverty.",
        hadithOrAyahRef: "Sahih al-Bukhari: 6",
        reflection: "Charity does not decrease wealth; it multiplies inner contentment and spiritual peace."
      },
      {
        heading: "Guardian of Orphans and the Oppressed",
        text: "Holding his index and middle fingers closely together, the Prophet ﷺ declared: 'The one who cares for an orphan and myself will be together in Paradise like this.' He elevated the most vulnerable from society's margins into the sanctuary of honored dignity.",
      },
      {
        heading: "Mercy to Animals & Nature",
        text: "When a companion took fledglings from a nest causing the mother bird to flap in distress, the Prophet ﷺ immediately commanded: 'Who has grieved this mother bird over her young? Return them to her at once!' He strictly forbade harming ants, starving animals, or cutting productive trees in war."
      }
    ]
  },

  // 8. Prophet Muhammad (s) - Honesty, Forgiveness & High Morals
  {
    id: "prophet-honesty-forgiveness-morals",
    figure: "prophet-muhammad",
    figureNameBn: "রাসূলুল্লাহ মুহাম্মদ ﷺ",
    figureNameEn: "Prophet Muhammad ﷺ",
    category: "honesty",
    categoryLabelBn: "সততা, ক্ষমা ও উত্তম চরিত্র",
    categoryLabelEn: "Honesty, Forgiveness & Morals",
    titleBn: "বিশ্বনবী ﷺ এর সত্যবাদিতা, অতুলনীয় ক্ষমা ও অনুপম চরিত্র",
    titleEn: "Unshakable Truthfulness, Forgiveness & Lofty Character",
    subtitleBn: "মক্কা বিজয়ের দিনে চরম শত্রুদের নিঃশর্ত ক্ষমা এবং সততার অদ্বিতীয় নজির।",
    subtitleEn: "Unconditional amnesty at the Conquest of Mecca and absolute integrity in all circumstances.",
    readTime: "7 মিনিট",
    thumbnailIcon: "shield-check",
    keyTakeawaysBn: [
      "শত্রু-মিত্র নির্বিশেষে সকলের কাছে প্রতিজ্ঞা ও অঙ্গীকার রক্ষা করা।",
      "মক্কা বিজয়ে চরম নির্যাতনকারী শত্রুদের নিঃশর্ত ক্ষমা ঘোষণা করা।",
      "ব্যক্তিগত কোনো অপমানের প্রতিশোধ কখনো না নেওয়া।",
      "উত্তম চরিত্রই কিয়ামতের দিন মিজানের পাল্লায় সবচেয়ে ভারী বস্তু হবে।"
    ],
    keyTakeawaysEn: [
      "Upholding pledges and contracts with allies and adversaries alike.",
      "Declaring complete amnesty for bitter persecutors during the Conquest of Mecca.",
      "Never taking personal revenge for insults or injuries inflicted upon himself.",
      "Good character is the heaviest deed on the scales on the Day of Judgment."
    ],
    sectionsBn: [
      {
        heading: "শত্রুদের আমানত রক্ষা",
        text: "যখন মক্কার কুরাইশরা নবীজিকে হত্যা করার ষড়যন্ত্র করছিল এবং তিনি হিজরতের প্রস্তুতি নিচ্ছিলেন, তখনও কাফেরদের বহু মূল্যবান সম্পদ নবীজির কাছেই আমানত রাখা ছিল! তিনি আলী (রাঃ) কে নিজের বিছানায় রেখে নির্দেশ দিলেন—সকলের আমানত যেন সঠিকভাবে তাদের হাতে পৌঁছে দেওয়া হয়। শত্রুর সম্পদও তিনি আত্মসাৎ করেননি।",
        hadithOrAyahRef: "সীরাতে ইবনে হিশাম",
        reflection: "প্রকৃত সততা তা-ই, যা বিপদের মুহূর্তেও নীতি থেকে এক চুল বিচ্যুত হয় না।"
      },
      {
        heading: "মক্কা বিজয়ের দিনে ঐতিহাসিক ক্ষমা",
        text: "যাঁরা নবীজিকে দীর্ঘ ১৩ বছর নির্যাতন করেছে, বয়কট করেছে, দেশছাড়া করেছে এবং তাঁর পরিবার ও সাহাবীদের শহীদ করেছে—মক্কা বিজয়ের দিনে তারা যখন ভয়ে কাঁপছিল, তখন তিনি বললেন: 'আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই। যাও, তোমরা সবাই মুক্ত!'",
      },
      {
        heading: "তায়েফের ময়দানে পরম ধৈর্য",
        text: "তায়েফের লোকেরা যখন নবীজিকে পাথর ছুড়ে রক্তাক্ত করেছিল, তখন পাহাড়ের ফেরেশতা এসে আবেদন করল তাদের দুই পাহাড়ের মাঝে পিষে ধ্বংস করে দিতে। কিন্তু রহমতের নবী বললেন: 'না! বরং আমি আশা করি তাদের ভবিষ্যৎ বংশধররা একমাত্র আল্লাহর ইবাদত করবে।' এই ছিল তাঁর ক্ষমার পরাকাষ্ঠা।"
      }
    ],
    sectionsEn: [
      {
        heading: "Safeguarding the Wealth of his Persecutors",
        text: "Even on the fateful night when the Meccan chieftains plotted to assassinate him, they still entrusted their valuables in his custody because they knew he was incorruptible. Before emigrating to Medina, he instructed Ali (RA) to stay behind and return every single item to its owner safely.",
        hadithOrAyahRef: "Seerah Ibn Hisham",
        reflection: "True integrity shines brightest when you remain honest even with those who actively harm you."
      },
      {
        heading: "The Universal Amnesty of Mecca",
        text: "On the day he entered Mecca victorious, the very oppressors who had boycotted, tortured, and killed his family stood trembling before him. Instead of retaliation, he smiled gently and announced: 'No blame will there be upon you today. Go, for you are all free!'",
      },
      {
        heading: "The Supreme Patience at Ta'if",
        text: "When the people of Ta'if pelted him with stones until his shoes were soaked in blood, an angel offered to crush the city between two mountains. The Prophet ﷺ replied: 'No, I pray that Allah will bring from their descendants those who worship Him alone.'"
      }
    ]
  },

  // 9. Historical: Abu Bakr As-Siddiq (ra)
  {
    id: "abu-bakr-siddiq-sacrifice",
    figure: "abu-bakr",
    figureNameBn: "হযরত আবু বকর আস-সিদ্দিক (রাঃ)",
    figureNameEn: "Abu Bakr As-Siddiq (RA)",
    category: "charity",
    categoryLabelBn: "সত্যবাদিতা, আত্মত্যাগ ও দান",
    categoryLabelEn: "Truthfulness, Sacrifice & Charity",
    titleBn: "হযরত আবু বকর (রাঃ) এর অটল সত্যবাদিতা ও সর্বস্ব দানের ইতিহাস",
    titleEn: "Abu Bakr As-Siddiq: Unshakable Loyalty & Giving Everything for Truth",
    subtitleBn: "ইসলামের প্রথম খলিফার সততা, মেসিনের দাসদের মুক্তি এবং তাবুকের যুদ্ধে সর্বস্ব দান।",
    subtitleEn: "The premier champion of truth, liberator of the oppressed, and unmatched philanthropist.",
    readTime: "6 মিনিট",
    thumbnailIcon: "award",
    keyTakeawaysBn: [
      "তাবুক যুদ্ধের সময় ঘরের সমস্ত সম্পদ এনে আল্লাহর রাস্তায় দিয়ে দেওয়া।",
      "হযরত বেলাল (রাঃ) সহ নির্যাতিত বহু ক্রীতদাসকে নিজের অর্থে ক্রয় করে মুক্ত করা।",
      "খলিফা হওয়ার পরও সাধারণ মানুষের ছাগলের দুধ দোয়ানো এবং সাধারণ জীবন বজায় রাখা।"
    ],
    keyTakeawaysEn: [
      "Donating 100% of his wealth for the Tabuk expedition, leaving Allah and His Messenger for his family.",
      "Purchasing and freeing enslaved, tortured believers like Bilal (RA).",
      "Continuing to milk goats for elderly widows even after becoming the ruler of Arabia."
    ],
    sectionsBn: [
      {
        heading: "সর্বস্ব দানের অনুপম দৃষ্টান্ত",
        text: "তাবুক যুদ্ধের প্রস্তুতিতে যখন নবীজি সবাইকে সাদাকাহ দিতে বললেন, তখন হযরত উমর (রাঃ) তাঁর অর্ধেক সম্পদ নিয়ে এলেন। এরপর আবু বকর (রাঃ) তাঁর ঘরের যা কিছু ছিল সব নিয়ে হাজির হলেন। নবীজি জিজ্ঞাসা করলেন, 'পরিবারের জন্য কী রেখে এলে?' তিনি বিনীতভাবে বললেন, 'আল্লাহ ও তাঁর রাসূলকে রেখে এসেছি।'",
        hadithOrAyahRef: "আবু দাউদ: ১৬৭৮",
        reflection: "আল্লাহর ওপর অবিচল আস্থা মানুষকে লোভ-লালসার ঊর্ধ্বে এক পরম শান্তিতে উন্নীত করে।"
      },
      {
        heading: "পীড়িত মানবতার মুক্তিদাতা",
        text: "মক্কায় যখন দুর্বল ক্রীতদাসদের ইসলামের কারণে তপ্ত বালুর ওপর পাথর চাপা দিয়ে নির্যাতন করা হতো, তখন আবু বকর (রাঃ) তাঁর উপার্জিত বিপুল অর্থ দিয়ে তাদের কিনে স্বাধীন করে দিতেন। হযরত বেলাল (রাঃ) কে তিনি এভাবেই মুক্ত করেছিলেন।"
      }
    ],
    sectionsEn: [
      {
        heading: "Giving One Hundred Percent for the Cause",
        text: "During the campaign of Tabuk, Umar (RA) brought half of his entire wealth. Then Abu Bakr (RA) arrived carrying everything he owned. The Prophet ﷺ asked: 'What have you left for your family?' Abu Bakr smiled serenely and replied: 'I have left them Allah and His Messenger.'",
        hadithOrAyahRef: "Sunan Abi Dawud: 1678",
        reflection: "Absolute reliance upon the Creator liberates the human heart from the fear of tomorrow."
      },
      {
        heading: "Liberating the Tortured Slaves",
        text: "When poor slaves in Mecca were being tortured beneath scorching boulders for declaring faith, Abu Bakr (RA) spent his private commercial wealth to buy and emancipate them, granting them freedom and dignity."
      }
    ]
  },

  // 10. Historical: Umar ibn al-Khattab (ra)
  {
    id: "umar-ibn-khattab-justice-leadership",
    figure: "umar",
    figureNameBn: "হযরত উমর ইবনুল খাত্তাব (রাঃ)",
    figureNameEn: "Umar ibn al-Khattab (RA)",
    category: "honesty",
    categoryLabelBn: "ন্যায়বিচার, শাসন ও জবাবদিহিতা",
    categoryLabelEn: "Justice, Governance & Accountability",
    titleBn: "হযরত উমর (রাঃ) এর নির্ভীক ন্যায়বিচার ও গভীর জবাবদিহিতা",
    titleEn: "Umar ibn al-Khattab: The Beacon of Justice & Humble Governance",
    subtitleBn: "বিশাল সাম্রাজ্যের শাসক হয়েও রাতের আঁধারে ক্ষুধার্ত শিশুদের ঘরে আটার বস্তা কাঁধে পৌঁছে দেওয়ার ইতিহাস।",
    subtitleEn: "Ruling an empire while carrying sacks of flour on his own back to feed starving orphan children.",
    readTime: "7 মিনিট",
    thumbnailIcon: "scale",
    keyTakeawaysBn: [
      "আইনের চোখে ধনী-দরিদ্র, শাসক-প্রজা সবাইকে এক সমান রাখা।",
      "রাতের আঁধারে ঘুরে সাধারণ নাগরিকের কষ্টের খোঁজখবর নেওয়া।",
      "শাসক হয়েও সাধারণ সুতির কাপড় পরা এবং মাটিতে খেজুর গাছের নিচে বিশ্রাম নেওয়া।"
    ],
    keyTakeawaysEn: [
      "Absolute equality before the law: no special privileges for rulers or princes.",
      "Nightly patrols through cities to personally discover struggling citizens.",
      "Supreme austerity: sleeping on bare earth under a palm tree with no bodyguards."
    ],
    sectionsBn: [
      {
        heading: "রাতের আঁধারে আটার বস্তা কাঁধে খলিফা",
        text: "এক রাতে হযরত উমর (রাঃ) মদিনার উপকণ্ঠে দেখলেন এক মা পাত্রে শুধু পানি ও পাথর ফুটিয়ে ক্ষুধার্ত শিশুদের সান্ত্বনা দিয়ে ঘুম পাড়ানোর চেষ্টা করছেন। উমর (রাঃ) তৎক্ষণাৎ বায়তুল মালে ছুটে গেলেন, নিজের কাঁধে আটা ও চর্বির বস্তা তুলে নিলেন এবং নিজে হাতে আগুন জ্বালিয়ে সেই শিশুদের খাবার রান্না করে খাওয়ালেন।",
        hadithOrAyahRef: "তারিখে তাবারী",
        reflection: "প্রকৃত নেতা ক্ষমতার অহংকারে মত্ত থাকে না, বরং মানুষের সেবায় নিজেকে নিয়োজিত করে।"
      },
      {
        heading: "আইনের কাছে সবাই সমান",
        text: "এক মিশরীয় সাধারণ নাগরিকের সাথে গভর্নরের পুত্রের ঘোড়াদৌড়ে বিবাদ হলে উমর (রাঃ) গভর্নর ও তাঁর পুত্রকে ডেকে পাঠান এবং সাধারণ নাগরিকের হাতে সুবিচার তুলে দেন। তিনি বিখ্যাত সেই উক্তি করেন: 'কবে থেকে তোমরা মানুষকে গোলাম বানিয়েছ, অথচ তাদের মায়েরা তাদের স্বাধীন হিসেবে জন্ম দিয়েছিল?'"
      }
    ],
    sectionsEn: [
      {
        heading: "Carrying Rations on the Emperor's Back",
        text: "One night, Umar (RA) discovered a mother boiling stones in water to soothe her crying, starving children to sleep. Heartbroken, Umar ran straight to the state treasury, hoisted a heavy sack of flour onto his own shoulders, built the fire with his own hands, and fed the children until they giggled with joy.",
        hadithOrAyahRef: "Tarikh at-Tabari",
        reflection: "A true leader does not revel in pomp and security, but walks with the vulnerable and carries their burdens."
      },
      {
        heading: "Universal Human Freedom & Equality",
        text: "When a common Egyptian was wronged by the provincial governor's son, Umar summoned both and ensured equal justice was served. He proclaimed his legendary words: 'Since when did you enslave the people when their mothers gave birth to them free?'"
      }
    ]
  },

  // 11. Historical: Khadijah bint Khuwaylid (ra)
  {
    id: "khadijah-business-loyalty-support",
    figure: "khadijah",
    figureNameBn: "হযরত খাদিজা বিনতে খুওয়াইলিদ (রাঃ)",
    figureNameEn: "Khadijah bint Khuwaylid (RA)",
    category: "finance",
    categoryLabelBn: "নারী উদ্যোক্তা, ব্যবসায়িক সততা ও বিশ্বস্ততা",
    categoryLabelEn: "Business Leadership & Devotion",
    titleBn: "হযরত খাদিজা (রাঃ): সফল উদ্যোক্তা ও ইসলামের প্রথম আশ্রয়স্থল",
    titleEn: "Khadijah (RA): Visionary Entrepreneur & Sanctuary of Faith",
    subtitleBn: "আন্তর্জাতিক বাণিজ্যের সফল পরিচালনা, প্রথম ঈমান গ্রহণ এবং রাসূলুল্লাহ ﷺ এর মানসিক অবলম্বন।",
    subtitleEn: "Leading an international commercial enterprise and serving as the emotional rock of the Prophet ﷺ.",
    readTime: "6 মিনিট",
    thumbnailIcon: "briefcase",
    keyTakeawaysBn: [
      "উচ্চ নৈতিকতা ও দক্ষতার মাধ্যমে তৎকালীন আরবের শ্রেষ্ঠ ব্যবসায়ী হওয়া।",
      "হেরা গুহায় ওহী নাযিলের পর নবীজিকে অভয় দেওয়া ও পরম সান্ত্বনা প্রদান করা।",
      "ইসলামের কঠিন দিনগুলোতে নিজের সমস্ত সম্পদ মানবকল্যাণে ব্যয় করা।"
    ],
    keyTakeawaysEn: [
      "Operating the largest, most respected merchant enterprise in Arabia with pure ethics.",
      "Comforting and reassuring the Prophet ﷺ upon receiving the first revelation in Cave Hira.",
      "Financing the early Muslim community through the severe social boycott."
    ],
    sectionsBn: [
      {
        heading: "আরবের শ্রেষ্ঠ সফল নারী উদ্যোক্তা",
        text: "হযরত খাদিজা (রাঃ) ছিলেন অত্যন্ত সফল ও সম্মানিত ব্যবসায়ী। তাঁর বাণিজ্যিক কাফেলা তৎকালীন কুরাইশদের অন্যান্য সকল কাফেলার সমান ছিল। তিনি সততা ও দক্ষতার কারণে আরবে 'তাহিরা' (পবিত্র নারী) উপাধিতে ভূষিত হয়েছিলেন।",
        hadithOrAyahRef: "সহীহ বুখারী: ৩",
        reflection: "সততা, বুদ্ধিমত্তা ও পরিশ্রম যে কোনো বাধা অতিক্রম করে অর্থনৈতিক সাফল্য এনে দেয়।"
      },
      {
        heading: "হেরা গুহার প্রথম আলো ও অবিচল সান্ত্বনা",
        text: "হেরা গুহায় জিবরাঈল (আঃ) এর প্রথম ওহী পেয়ে রাসূলুল্লাহ ﷺ যখন কাঁপতে কাঁপতে ঘরে ফিরে বললেন, 'আমাকে চাদর দিয়ে ঢেকে দাও', তখন খাদিজা (রাঃ) তাঁকে সাহস জুগিয়ে বললেন: 'কখনোই না! আল্লাহর কসম, আল্লাহ আপনাকে কখনোই লাঞ্ছিত করবেন না। আপনি তো আত্মীয়ের সম্পর্ক রক্ষা করেন, নিঃস্বদের বোঝা বহন করেন, মেহমানের সেবা করেন এবং বিপদে মানুষকে সাহায্য করেন।'"
      }
    ],
    sectionsEn: [
      {
        heading: "The Premier Merchant of Arabia",
        text: "Khadijah (RA) managed a vast international trading enterprise whose goods equaled the combined caravans of all other merchants of Mecca. Known as 'At-Tahirah' (The Pure), she set the benchmark for ethical business leadership.",
        hadithOrAyahRef: "Sahih al-Bukhari: 3",
        reflection: "Professional competence combined with high ethical standards commands universal respect."
      },
      {
        heading: "The Reassurance of Faith at Cave Hira",
        text: "When the Prophet ﷺ returned from Cave Hira trembling from the intensity of revelation, saying 'Cover me, cover me!', Khadijah embraced him and gave the timeless reassurance: 'Never! By Allah, Allah will never disgrace you. You maintain family ties, you bear the burdens of the weak, you honor guests, and you assist those in crisis.'"
      }
    ]
  },

  // 12. Historical: Prophet Yusuf (as)
  {
    id: "prophet-yusuf-integrity-crisis-management",
    figure: "yusuf",
    figureNameBn: "হযরত ইউসুফ (আঃ)",
    figureNameEn: "Prophet Yusuf (AS)",
    category: "finance",
    categoryLabelBn: "আর্থিক ব্যবস্থাপনা, সততা ও সংকট মোকাবেলা",
    categoryLabelEn: "Economic Governance & Forgiveness",
    titleBn: "হযরত ইউসুফ (আঃ) এর সততা, ৭ বছরের জাতীয় সংকট ব্যবস্থাপনা ও ক্ষমা",
    titleEn: "Prophet Yusuf (AS): Strategic Governance & Unrivaled Forgiveness",
    subtitleBn: "কূপ থেকে রাজপ্রাসাদ, কারাগারে ধৈর্য এবং দুর্ভিক্ষের যুগে নিখুঁত অর্থনৈতিক দূরদর্শিতা।",
    subtitleEn: "From betrayal in the well to saving an entire nation through visionary economic planning.",
    readTime: "7 মিনিট",
    thumbnailIcon: "landmark",
    keyTakeawaysBn: [
      "প্রলোভন ও অন্যায়ের মুখে নিজের নৈতিক চরিত্র অক্ষুণ্ণ রাখা।",
      "৭ বছরের প্রাচুর্যে খাদ্য সংরক্ষণ করে পরবর্তী ৭ বছরের তীব্র দুর্ভিক্ষ সফলভাবে জয় করা।",
      "যাঁরা তাঁকে কূপে ফেলে দিয়েছিল সেই ভাইদের পরম ক্ষমা ও ভালোবাসায় গ্রহণ করা।"
    ],
    keyTakeawaysEn: [
      "Maintaining moral integrity when facing overwhelming temptation and false accusations.",
      "Pioneering 7-year strategic grain storage to rescue millions during a catastrophic famine.",
      "Embracing and forgiving the very brothers who had thrown him into the well."
    ],
    sectionsBn: [
      {
        heading: "নৈতিক সততা ও প্রলোভন জয়",
        text: "মিশরের প্রধানমন্ত্রীর ঘরে যখন ইউসুফ (আঃ) কে চরম পাপের দিকে আহ্বান জানানো হলো, তিনি দ্ব্যর্থহীন কণ্ঠে বললেন: 'আল্লাহর আশ্রয় চাই! আমার প্রতিপালক আমাকে উত্তম স্থান দিয়েছেন, নিশ্চয়ই জালেমরা সফলকাম হয় না।' তিনি অন্যায়ের চেয়ে কারাগারের কষ্টকে বেছে নিলেন।",
        hadithOrAyahRef: "সূরা ইউসুফ: ২৩-৩৩",
        reflection: "সাময়িক লাভের জন্য নৈতিকতা বিসর্জন না দেওয়া মানুষের মর্যাদাকে চিরস্থায়ী করে।"
      },
      {
        heading: "দুর্ভিক্ষ মোকাবেলায় ৭ বছরের দূরদর্শী অর্থনৈতিক পরিকল্পনা",
        text: "বাদশাহর স্বপ্নের ব্যাখ্যা দিয়ে ইউসুফ (আঃ) মিশরের খাদ্যমন্ত্রী নিযুক্ত হন। তিনি আগামী ৭ বছর শস্য শীষসহ সংরক্ষণ করার বৈজ্ঞানিক ও অর্থনৈতিক মডেল বাস্তবায়ন করেন। ফলে যখন ৭ বছরের তীব্র খরা ও দুর্ভিক্ষ এলো, তখন সমগ্র পৃথিবী যখন খাদ্যের অভাবে হাহাকার করছিল, মিশর শুধু নিজেকেই রক্ষা করেনি বরং প্রতিবেশী দেশসমূহের ক্ষুধার্ত মানুষকে খাদ্য জুগিয়েছিল।"
      },
      {
        heading: "অনুপম ক্ষমা ও পুনর্মিলন",
        text: "যে ভাইয়েরা তাঁকে শৈশবে হত্যার উদ্দেশ্যে অন্ধকূপে নিক্ষেপ করেছিল, তারা যখন ক্ষুধার্ত হয়ে সাহায্য চাইতে এলো, ইউসুফ (আঃ) বললেন: 'আজ তোমাদের বিরুদ্ধে কোনো তিরস্কার নেই। আল্লাহ তোমাদের ক্ষমা করুন।' তিনি সবাইকে বুকে জড়িয়ে নিলেন।"
      }
    ],
    sectionsEn: [
      {
        heading: "Incorruptible Moral Character",
        text: "When subjected to immense temptation and deceit in Egypt, Yusuf (AS) stood firm in faith, saying: 'I seek refuge in Allah! He has granted me a good home, and the wrongdoers never prosper.' He chose the hardship of prison over compromising his purity.",
        hadithOrAyahRef: "Surah Yusuf: 23-33",
        reflection: "Refusing to compromise your soul for momentary worldly pleasure yields enduring divine elevation."
      },
      {
        heading: "Seven-Year Economic Crisis Strategy",
        text: "Appointed as the custodian of the state treasury, Yusuf (AS) executed a brilliant seven-year agricultural storage plan. When the catastrophic seven-year drought struck the ancient world, Egypt not only had abundance but became the breadbasket providing food to all surrounding nations.",
      },
      {
        heading: "The Pinnacle of Brotherly Forgiveness",
        text: "When his brothers, who had thrown him into the well as a child, stood helpless before him, Yusuf (AS) did not seek revenge. He smiled and said: 'No reproach will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful.'"
      }
    ]
  }
]
