/**
 * Islamic history library — concise bilingual chapters written from the
 * classical public-domain sources named on each book. Every chapter ends
 * with its references so readers can verify the narrations themselves.
 */

export interface HistoryReference {
  label: string
  href?: string
}

export interface HistoryChapter {
  id: string
  titleBn: string
  titleEn: string
  arabic?: string
  contentBn: string[]
  contentEn: string[]
  references: HistoryReference[]
}

export interface HistoryBook {
  id: string
  slug: string
  titleBn: string
  titleEn: string
  authorBn: string
  authorEn: string
  eraBn: string
  eraEn: string
  descriptionBn: string
  descriptionEn: string
  chapters: HistoryChapter[]
}

export const HISTORY_BOOKS: HistoryBook[] = [
  {
    id: 'seerah',
    slug: 'seerah',
    titleBn: 'সীরাতে রাসূল ﷺ',
    titleEn: 'The Life of the Prophet ﷺ',
    authorBn: 'ইবনে হিশাম ও ইবনে ইসহাকের সীরাত অবলম্বনে',
    authorEn: 'Based on Ibn Hisham & Ibn Ishaq (public domain)',
    eraBn: '৫৭০ – ৬৩২ খ্রিষ্টাব্দ',
    eraEn: '570 – 632 CE',
    descriptionBn:
      'মক্কার জন্ম থেকে বিদায় হজ পর্যন্ত — বিশ্বনবী মুহাম্মদ ﷺ-এর জীবনী, কুরআন ও সহীহ হাদিসের সূত্রসহ সংক্ষিপ্ত অধ্যায়ে।',
    descriptionEn:
      'From his birth in Makkah to the Farewell Pilgrimage — the life of Prophet Muhammad ﷺ in concise chapters with Quran and hadith references.',
    chapters: [
      {
        id: 'makkah-dawn',
        titleBn: 'প্রথম অধ্যায়: মক্কার ভোর',
        titleEn: 'Chapter 1: The Dawn of Makkah',
        contentBn: [
          'রাসূলুল্লাহ ﷺ ৫৭০ খ্রিষ্টাব্দে মক্কায় জন্মগ্রহণ করেন। জন্মের পূর্বেই পিতা আবদুল্লাহ মৃত্যুবরণ করেন, ছয় বছর বয়সে মা আমিনা, এবং আট বছর বয়সে দাদা আবদুল মুত্তালিব ইন্তেকাল করেন। এরপর চাচা আবু তালিব তাঁকে লালন-পালন করেন।',
          'কিশোর বয়সেই তিনি সততা ও আমানতদারির জন্য "আল-আমিন" নামে পরিচিত হন। ব্যবসায়িক সফরে খাদিজা (রা.)-এর কাফেলা পরিচালনা করেন এবং পরবর্তীতে তাঁর সঙ্গে বিবাহবন্ধনে আবদ্ধ হন।',
          'সমাজের জুলুম-অবিচার দেখে তিনি হেরা গুহায় ধ্যানে সময় কাটাতেন। চল্লিশ বছর বয়সে সেখানেই জিব্রীল (আ.)-এর মাধ্যমে প্রথম ওহি নাজিল হয়: "পড়ুন, আপনার রবের নামে, যিনি সৃষ্টি করেছেন।"',
        ],
        contentEn: [
          'The Messenger of Allah ﷺ was born in Makkah in 570 CE. His father Abdullah died before his birth; his mother Aminah passed away when he was six, and his grandfather Abdul Muttalib when he was eight. His uncle Abu Talib then raised him.',
          'Even as a youth he was known as Al-Amin — the trustworthy. He led Khadijah\'s trade caravan to Syria and later married her, finding in her the first supporter of the revelation.',
          'Disturbed by the injustice around him, he would retreat to the cave of Hira. At the age of forty the angel Jibril came with the first revelation: "Read, in the name of your Lord who created."',
        ],
        references: [
          { label: 'Surah Al-Alaq 96:1-5', href: '/quran/96#ayah-1' },
          { label: 'Sahih al-Bukhari 3', href: '/hadith/bukhari?n=3' },
          { label: 'Sahih al-Bukhari 6982', href: '/hadith/bukhari?n=6982' },
        ],
      },
      {
        id: 'hijrah',
        titleBn: 'দ্বিতীয় অধ্যায়: হিজরত',
        titleEn: 'Chapter 2: The Hijrah',
        contentBn: [
          'মক্কায় তেরো বছর দাওয়াতের পর কুরাইশদের অত্যাচার চরমে পৌঁছলে আল্লাহ মদিনায় হিজরতের অনুমতি দেন। ৬২২ খ্রিষ্টাব্দে রাসূলুল্লাহ ﷺ আবু বকরের (রা.) সঙ্গে মক্কা ত্যাগ করেন।',
          'সাওর গুহায় তিন দিন আশ্রয়ের পর তাঁরা মদিনায় পৌঁছান। মদিনাবাসী আনসারগণ তাঁকে সাদরে গ্রহণ করেন; মসজিদে নববী নির্মিত হয় এবং মুহাজির-আনসারদের মধ্যে ভ্রাতৃত্ব প্রতিষ্ঠিত হয়।',
          'হিজরত ইসলামী ইতিহাসের মহা সন্ধিক্ষণ — এখান থেকেই ইসলামী রাষ্ট্র ও সভ্যতার সূচনা।',
        ],
        contentEn: [
          'After thirteen years of calling to Islam in Makkah, persecution peaked and Allah permitted the migration. In 622 CE the Prophet ﷺ left Makkah with Abu Bakr (may Allah be pleased with him).',
          'They sheltered three days in the cave of Sawr before reaching Madinah, where the Ansar welcomed them warmly. The Prophet\'s Mosque was built and a bond of brotherhood was established between the Muhajirun and the Ansar.',
          'The Hijrah marks the turning point of Islamic history — the foundation of the Muslim community and its civilization.',
        ],
        references: [
          { label: 'Surah At-Tawbah 9:40', href: '/quran/9#ayah-40' },
          { label: 'Surah Al-Anfal 8:30', href: '/quran/8#ayah-30' },
          { label: 'Sahih al-Bukhari 3905', href: '/hadith/bukhari?n=3905' },
        ],
      },
      {
        id: 'farewell',
        titleBn: 'তৃতীয় অধ্যায়: বিদায় হজ ও চূড়ান্ত বার্তা',
        titleEn: 'Chapter 3: The Farewell Pilgrimage',
        contentBn: [
          '৬৩২ খ্রিষ্টাব্দে রাসূলুল্লাহ ﷺ বিদায় হজ পালন করেন। আরাফাতের ময়দানে লক্ষাধিক সাহাবীর সমাবেশে তিনি খুতবা দেন — প্রাণ, সম্পদ ও সম্মান রক্ষার আদেশ, নারীর অধিকার, সুদের বিলোপ এবং মানবতার সমতার ঘোষণা।',
          'তিনি ঘোষণা করেন: "আমি তোমাদের কাছে এমন জিনিস রেখে যাচ্ছি, যা আঁকড়ে থাকলে তোমরা কখনো পথভ্রষ্ট হবে না — আল্লাহর কিতাব ও তাঁর রাসূলের সুন্নাহ।"',
          'এরপর নাজিল হয়: "আজ আমি তোমাদের জন্য তোমাদের দ্বীন পূর্ণ করলাম।" তিন মাস পর মদিনায় তিনি ইন্তেকাল করেন।',
        ],
        contentEn: [
          'In 632 CE the Prophet ﷺ performed the Farewell Pilgrimage. At Arafah before over a hundred thousand companions he delivered a sermon — protecting life, wealth and honour, the rights of women, the abolition of usury, and the equality of all humanity.',
          'He declared: "I leave among you that which, if you hold fast to it, you will never go astray — the Book of Allah and the Sunnah of His Messenger."',
          'Then the verse was revealed: "This day I have perfected for you your religion." Three months later he passed away in Madinah.',
        ],
        references: [
          { label: 'Surah Al-Maidah 5:3', href: '/quran/5#ayah-3' },
          { label: 'Surah Al-Maidah 5:67', href: '/quran/5#ayah-67' },
          { label: 'Sahih Muslim 1218', href: '/hadith/muslim?n=1218' },
        ],
      },
    ],
  },
  {
    id: 'qisas-al-anbiya',
    slug: 'qisas-al-anbiya',
    titleBn: 'কিসাসুল আম্বিয়া',
    titleEn: 'Stories of the Prophets',
    authorBn: 'ইবনে কাসীর (রহ.)',
    authorEn: 'Ibn Kathir (public domain)',
    eraBn: 'আদম (আ.) থেকে ঈসা (আ.)',
    eraEn: 'From Adam to Isa',
    descriptionBn:
      'কুরআন ও সহীহ হাদিসের আলোকে নবীদের ধারাবাহিক কাহিনি — ইবনে কাসীরের কিসাসুল আম্বিয়া অবলম্বনে সংক্ষিপ্ত পাঠ।',
    descriptionEn:
      'The prophets in order, told from the Quran and authentic hadith — concise chapters based on Ibn Kathir\'s Qisas al-Anbiya.',
    chapters: [
      {
        id: 'one-message',
        titleBn: 'প্রথম অধ্যায়: একই বার্তা, বহু নবী',
        titleEn: 'Chapter 1: One Message, Many Prophets',
        contentBn: [
          'আল্লাহ যুগে যুগে অসংখ্য নবী পাঠিয়েছেন; কুরআনে ২৫ জনের নাম উল্লেখ করা হয়েছে। প্রত্যেকেই একই বার্তা নিয়ে এসেছেন: "আল্লাহ ছাড়া কোনো ইলাহ নেই, কেবল তাঁরই ইবাদত করো।"',
          'নবীদের কেউ ছিলেন রাজা, কেউ ছুতার, কেউ রাখাল। কিন্তু তাঁদের বৈশিষ্ট্য ছিল সততা, আমানতদারি এবং চরম ধৈর্য। তাঁদের কাহিনি কেবল ইতিহাস নয় — প্রতিটি ঘটনায় মানুষের জন্য শিক্ষা রয়েছে।',
          'আল্লাহ বলেন: "নিশ্চয়ই তাদের কাহিনিতে বুদ্ধিমানদের জন্য শিক্ষা রয়েছে।"',
        ],
        contentEn: [
          'Allah sent countless prophets through the ages; twenty-five are named in the Quran. Each came with the same message: "There is no god but Allah — so worship Him alone."',
          'Some prophets were kings, some carpenters, some shepherds — but all were truthful, trustworthy and profoundly patient. Their stories are not mere history: every account carries a lesson for humanity.',
          'Allah says: "Indeed in their stories there is a lesson for people of understanding."',
        ],
        references: [
          { label: 'Surah Yusuf 12:111', href: '/quran/12#ayah-111' },
          { label: 'Surah Al-Anbiya 21:25', href: '/quran/21#ayah-25' },
          { label: 'Sahih al-Bukhari 3443', href: '/hadith/bukhari?n=3443' },
        ],
      },
      {
        id: 'ibrahim-trial',
        titleBn: 'দ্বিতীয় অধ্যায়: ইব্রাহীম (আ.)-এর পরীক্ষা',
        titleEn: 'Chapter 2: The Trials of Ibrahim',
        contentBn: [
          'ইব্রাহীম (আ.) প্রথমে তারকারাজি ও চাঁদের প্রতি আকৃষ্ট হলেও উপলব্ধি করেন যে এগুলো ডুবে যায় — আর ডুবে যাওয়া বস্তু ইলাহ হতে পারে না। তিনি ঘোষণা করেন: "আমি আমার মুখ সৃষ্টিকর্তার দিকে ফিরালাম।"',
          'মূর্তি ভাঙার অপরাধে তাঁকে অগ্নিকুণ্ডে নিক্ষেপ করা হয়, কিন্তু আল্লাহ আগুনকে শীতল ও নিরাপদ করে দেন। এরপর তিনি স্ত্রী হাজারা ও শিশু ইসমাঈলকে মরুপ্রান্তরে রেখে আসেন — সেখানেই জমজমের ধারা প্রবাহিত হয়।',
          'বৃদ্ধ বয়সে প্রিয় পুত্র ইসমাঈলকে কুরবানির আদেশ পান; উভয়েই আত্মসমর্পণ করেন এবং আল্লাহ একটি মহান কুরবানি দিয়ে তাকে মুক্তি দেন।',
        ],
        contentEn: [
          'Ibrahim (peace be upon him) first contemplated the stars and the moon, but realised they set and vanish — what sets cannot be a god. He declared: "I have turned my face to the One who created the heavens and the earth."',
          'Thrown into the fire for smashing the idols, he was saved when Allah made the flames cool and safe. He later left Hajar and the infant Ismail in a barren valley — where the well of Zamzam sprang forth.',
          'In old age he was commanded to sacrifice his beloved son Ismail; both submitted, and Allah ransomed him with a mighty sacrifice.',
        ],
        references: [
          { label: 'Surah Al-Anam 6:74-79', href: '/quran/6#ayah-74' },
          { label: 'Surah Al-Anbiya 21:68-70', href: '/quran/21#ayah-68' },
          { label: 'Surah As-Saffat 37:99-113', href: '/quran/37#ayah-99' },
        ],
      },
      {
        id: 'musa-pharaoh',
        titleBn: 'তৃতীয় অধ্যায়: মূসা (আ.) ও ফিরআউন',
        titleEn: 'Chapter 3: Musa and Pharaoh',
        contentBn: [
          'ফিরআউনের নিষ্ঠুরতার মুখে শিশু মূসাকে নীল নদে ভাসিয়ে দেওয়া হয় এবং আল্লাহর কৌশলে তিনি ফিরআউনের নিজের প্রাসাদেই পালিত হন। পরবর্তীতে মাদইয়ানে নির্বাসনে গিয়ে তিনি নবুয়ত লাভ করেন।',
          'তূয়া উপত্যকায় আগুনের কাছে আল্লাহ তাঁর সঙ্গে কথা বলেন এবং তাঁকে ফিরআউনের কাছে যাওয়ার নির্দেশ দেন — নরম ভাষায়, সদুপদেশ দিয়ে।',
          'নীল নদ দুইভাগ হয়ে বনী ইসরাইল মুক্তি পায় এবং ফিরআউন ধ্বংস হয়। তাওরাতকে মূসা (আ.)-এর প্রতি অবতীর্ণ করা হয়।',
        ],
        contentEn: [
          'Under Pharaoh\'s tyranny the infant Musa was placed in the Nile and, by Allah\'s design, raised in Pharaoh\'s own palace. Years later he found refuge in Madyan and was called to prophethood.',
          'In the valley of Tuwa, Allah spoke to him directly and sent him to Pharaoh — to speak with gentle words and call him to truth.',
          'The sea split, Banu Israel were delivered and Pharaoh was destroyed. The Torah was revealed to Musa (peace be upon him).',
        ],
        references: [
          { label: 'Surah Ta-Ha 20:9-48', href: '/quran/20#ayah-9' },
          { label: 'Surah Al-Qasas 28:3-13', href: '/quran/28#ayah-3' },
          { label: 'Surah Ash-Shuara 26:10-68', href: '/quran/26#ayah-10' },
        ],
      },
    ],
  },
  {
    id: 'tarikh-tabari',
    slug: 'tarikh-tabari',
    titleBn: 'তারিখ আত-তাবারী (নির্বাচিত অংশ)',
    titleEn: 'History of al-Tabari (Selections)',
    authorBn: 'ইমাম আত-তাবারী (রহ.)',
    authorEn: 'Imam al-Tabari (public domain Arabic)',
    eraBn: 'রাশিদুন খিলাফত',
    eraEn: 'The Rashidun era',
    descriptionBn:
      'প্রখ্যাত ঐতিহাসিক ইমাম তাবারীর সংকলন থেকে খুলাফায়ে রাশেদীনের যুগের নির্বাচিত ঘটনা — কুরআন ও হাদিসের সূত্রসহ।',
    descriptionEn:
      'Selected events of the Rashidun era from Imam al-Tabari\'s chronicle, referenced with Quran and hadith.',
    chapters: [
      {
        id: 'abu-bakr',
        titleBn: 'প্রথম অধ্যায়: আবু বকর (রা.)-এর খিলাফত',
        titleEn: 'Chapter 1: The Caliphate of Abu Bakr',
        contentBn: [
          'রাসূলুল্লাহ ﷺ-এর ইন্তেকালের পর সাহাবীগণ সাকিফায় সমবেত হয়ে আবু বকর (রা.)-কে খলিফা নির্বাচন করেন — রাসূল ﷺ-এর "গুহার সঙ্গী" ও ইসলামের প্রথম মুক্ত মানুষের।',
          'তাঁর খিলাফতে ভণ্ড নবীদের দমন, জাকাত অস্বীকারকারীদের বিরুদ্ধে সত্য প্রতিষ্ঠা এবং কুরআনের একক সংকলনের মহৎ কাজ সম্পন্ন হয়।',
          'দুই বছরের শাসনে তিনি সহজ-সরল জীবনযাপন করেন এবং মৃত্যুর আগে উমর (রা.)-কে পরবর্তী খলিফা হিসেবে মনোনীত করেন।',
        ],
        contentEn: [
          'After the passing of the Prophet ﷺ, the companions gathered at Saqifah and chose Abu Bakr — the Prophet\'s companion in the cave and the first free man to embrace Islam.',
          'His caliphate confronted false prophets, upheld the truth against those who withheld zakat, and oversaw the gathering of the Quran into a single collection.',
          'In his two years of rule he lived simply and, before his death, nominated Umar (may Allah be pleased with him) as his successor.',
        ],
        references: [
          { label: 'Surah At-Tawbah 9:40', href: '/quran/9#ayah-40' },
          { label: 'Sahih al-Bukhari 467', href: '/hadith/bukhari?n=467' },
          { label: 'Sahih al-Bukhari 4986', href: '/hadith/bukhari?n=4986' },
        ],
      },
      {
        id: 'umar-justice',
        titleBn: 'দ্বিতীয় অধ্যায়: উমর (রা.)-এর ইনসাফ',
        titleEn: 'Chapter 2: The Justice of Umar',
        contentBn: [
          'উমর ইবনুল খাত্তাব (রা.)-এর দশ বছরের খিলাফতে ইসলামী রাষ্ট্র পারস্য ও রোম পর্যন্ত বিস্তৃত হয়, অথচ তিনি ছিলেন "আল-ফারুক" — সত্য ও মিথ্যার পার্থক্যকারী।',
          'তিনি রাতে নিজে পাহারা দিতেন, ক্ষুধার্ত শিশুদের খবর নিতেন, এবং ঘোষণা করতেন: "নীল নদের পানি পিপাসুদের জন্য, জমির মালিকানা কেবল আল্লাহর।"',
          'হিজরি সন চালু, দিওয়ান পদ্ধতি, বিচার ব্যবস্থা ও সামাজিক নিরাপত্তার ভিত্তি তাঁর যুগেই স্থাপিত হয়। ন্যায়ের এই মানদণ্ড পরবর্তী খিলাফতের জন্য আদর্শ হয়ে থাকে।',
        ],
        contentEn: [
          'In the ten years of Umar ibn al-Khattab\'s caliphate the Muslim state expanded to Persia and Byzantium, yet he remained Al-Faruq — the one who distinguishes truth from falsehood.',
          'He patrolled at night, sought out hungry children, and declared that the waters of the Nile belong to the thirsty and the land to Allah alone.',
          'The Hijri calendar, the state register, the judiciary and social welfare all took shape in his era. His standard of justice became the model for later generations.',
        ],
        references: [
          { label: 'Sahih al-Bukhari 3689', href: '/hadith/bukhari?n=3689' },
          { label: 'Sahih Muslim 1821', href: '/hadith/muslim?n=1821' },
          { label: 'Surah An-Nisa 4:58', href: '/quran/4#ayah-58' },
        ],
      },
      {
        id: 'uthman-ali',
        titleBn: 'তৃতীয় অধ্যায়: উসমান (রা.) ও আলী (রা.)',
        titleEn: 'Chapter 3: Uthman and Ali',
        contentBn: [
          'উসমান (রা.)-এর খিলাফতে কুরআনের চূড়ান্ত সংকলন সম্পন্ন হয় — একই পাঠ, একই হরফ, যা আজও সারা বিশ্বে ব্যবহৃত হয়। ইসলামী নৌবহরের সূচনা এবং মসজিদে নববীর সম্প্রসারণও তাঁর কীর্তি।',
          'আলী (রা.)-এর যুগে ফিতনার মেঘ নেমে আসে; তবু তিনি ইলম, বীরত্ব ও ন্যায়ের প্রতীক হয়ে থাকেন। রাসূল ﷺ তাঁকে তাঁর নিকটবর্তী আত্মীয় বলেছিলেন এবং খায়বারে তাঁর হাতেই বিজয় দিয়েছিলেন।',
          'আল্লাহ বলেন: "নিশ্চয়ই আল্লাহ আদেশ দেন ইনসাফ, ইহসান ও আত্মীয়কে দানের।" চার খলিফার জীবন এই আয়াতের জীবন্ত ছবি।',
        ],
        contentEn: [
          'During Uthman\'s caliphate the final collection of the Quran was completed — one text, one recitation, used across the world today. He also established the first Muslim navy and expanded the Prophet\'s Mosque.',
          'Ali\'s era saw the clouds of trial descend, yet he remains a symbol of knowledge, courage and justice. The Prophet ﷺ counted him among his closest family and granted victory through his hands at Khaybar.',
          'Allah says: "Indeed Allah commands justice, excellence and giving to relatives." The lives of the four caliphs are a living picture of this verse.',
        ],
        references: [
          { label: 'Surah An-Nahl 16:90', href: '/quran/16#ayah-90' },
          { label: 'Sahih al-Bukhari 4987', href: '/hadith/bukhari?n=4987' },
          { label: 'Sahih al-Bukhari 2942', href: '/hadith/bukhari?n=2942' },
        ],
      },
    ],
  },
]

export function getHistoryBook(slug: string): HistoryBook | undefined {
  return HISTORY_BOOKS.find((book) => book.slug === slug)
}
