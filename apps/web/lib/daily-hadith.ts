import { prisma } from '@/lib/db'
import { getHadith } from '@/lib/hadith'
import { augmentWithBangla } from '@/lib/hadith-bn'

export interface DailyHadithItem {
  id: string
  date: string
  collection: string
  collectionName: string
  hadithNumber: number
  arabic: string
  english: string
  bangla: string
  grade: string
  narrator?: string
  topic?: string
}

// Curated authentic hadiths with accurate Bangla translations and Arabic text for instant high-speed daily loading
export const CURATED_DAILY_HADITHS: Omit<DailyHadithItem, 'id' | 'date'>[] = [
  {
    collection: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: 1,
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    english: 'The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.',
    bangla: 'সকল কাজের ফলাফল নিয়তের উপর নির্ভরশীল এবং প্রত্যেক ব্যক্তি তার নিয়ত অনুযায়ীই প্রতিদান পাবে।',
    grade: 'Sahih',
    narrator: 'উমর ইবনুল খাত্তাব (রা.)',
    topic: 'নিয়ত ও একনিষ্ঠতা (Intention)',
  },
  {
    collection: 'muslim',
    collectionName: 'Sahih Muslim',
    hadithNumber: 223,
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ',
    english: 'Cleanliness is half of faith and Alhamdulillah (Praise be to Allah) fills the scale.',
    bangla: 'পবিত্রতা ঈমানের অর্ধেক এবং \'আলহামদুলিল্লাহ\' নেকির পাল্লাকে পূর্ণ করে দেয়।',
    grade: 'Sahih',
    narrator: 'আবু মালিক আল-আশআরী (রা.)',
    topic: 'পবিত্রতা ও যিকির (Purity & Gratitude)',
  },
  {
    collection: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: 13,
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    english: 'None of you will truly believe until you love for your brother what you love for yourself.',
    bangla: 'তোমাদের কেউ ততক্ষণ পর্যন্ত পূর্ণ ঈমানদার হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তাই পছন্দ করবে যা নিজের জন্য পছন্দ করে।',
    grade: 'Sahih',
    narrator: 'আনাস ইবনে মালিক (রা.)',
    topic: 'ভ্রাতৃত্ব ও সহমর্মিতা (Brotherhood)',
  },
  {
    collection: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: 5027,
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    english: 'The best among you are those who learn the Quran and teach it.',
    bangla: 'তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শিখে এবং অন্যকে শিক্ষা দেয়।',
    grade: 'Sahih',
    narrator: 'উসমান ইবনে আফফান (রা.)',
    topic: 'কুরআনের মর্যাদা (Quranic Learning)',
  },
  {
    collection: 'muslim',
    collectionName: 'Sahih Muslim',
    hadithNumber: 2564,
    arabic: 'الْبِرُّ حُسْنُ الْخُلُقِ، وَالإِثْمُ مَا حَاكَ فِي صَدْرِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ',
    english: 'Righteousness is good character, and sin is that which wavers in your heart and you dislike people finding out about it.',
    bangla: 'সততা ও পুণ্য হলো উত্তম চরিত্র, আর পাপ হলো যা তোমার অন্তরে সংশয় সৃষ্টি করে এবং মানুষ তা জানুক তা তুমি অপছন্দ করো।',
    grade: 'Sahih',
    narrator: 'নাওয়াস ইবনে সামআন (রা.)',
    topic: 'উত্তম চরিত্র ও বিবেক (Good Character)',
  },
  {
    collection: 'tirmidhi',
    collectionName: 'Jami` at-Tirmidhi',
    hadithNumber: 1956,
    arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    english: 'Your smiling in the face of your brother is charity for you.',
    bangla: 'তোমার ভাইয়ের মুখের দিকে তাকিয়ে তোমার মুচকি হাসাও একটি সাদাকা (দান)।',
    grade: 'Sahih',
    narrator: 'আবু যার (রা.)',
    topic: 'সাদাকা ও সদাচার (Kindness & Charity)',
  },
  {
    collection: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: 6011,
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    english: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    bangla: 'যে ব্যক্তি আল্লাহ ও শেষ দিবসের প্রতি বিশ্বাস রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।',
    grade: 'Sahih',
    narrator: 'আবু হুরায়রা (রা.)',
    topic: 'মুখের হেফাজত (Guarding Speech)',
  },
  {
    collection: 'muslim',
    collectionName: 'Sahih Muslim',
    hadithNumber: 2699,
    arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    english: 'Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.',
    bangla: 'যে ব্যক্তি ইলম (জ্ঞান) অর্জনের উদ্দেশ্যে কোনো পথ অবলম্বন করে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।',
    grade: 'Sahih',
    narrator: 'আবু হুরায়রা (রা.)',
    topic: 'জ্ঞান অর্জনের ফজিলত (Seeking Knowledge)',
  },
  {
    collection: 'bukhari',
    collectionName: 'Sahih al-Bukhari',
    hadithNumber: 6116,
    arabic: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
    english: 'The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.',
    bangla: 'প্রকৃত বীর সে নয় যে কুস্তিতে প্রতিপক্ষকে ঘায়েল করে, বরং প্রকৃত বীর সে যে ক্রোধের সময় নিজেকে নিয়ন্ত্রণে রাখে।',
    grade: 'Sahih',
    narrator: 'আবু হুরায়রা (রা.)',
    topic: 'ধৈর্য ও আত্মনিয়ন্ত্রণ (Patience & Restraint)',
  },
  {
    collection: 'tirmidhi',
    collectionName: 'Jami` at-Tirmidhi',
    hadithNumber: 2516,
    arabic: 'احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ',
    english: 'Be mindful of Allah and He will protect you. Be mindful of Allah and you will find Him before you.',
    bangla: 'আল্লাহর বিধানের হেফাজত করো, আল্লাহ তোমাকে রক্ষা করবেন। আল্লাহর সন্তুষ্টির খেয়াল রাখো, তুমি তাঁকে তোমার সামনে পাবে।',
    grade: 'Sahih',
    narrator: 'ইবনে আব্বাস (রা.)',
    topic: 'আল্লাহর ওপর তাওয়াক্কুল (Trust in Allah)',
  },
]

export async function getDailyHadith(dateStr?: string, index?: number): Promise<DailyHadithItem> {
  const today: string = dateStr || (new Date().toISOString().split('T')[0] ?? '2026-01-01')
  
  if (typeof index === 'number' && index >= 0) {
    const item = CURATED_DAILY_HADITHS[index % CURATED_DAILY_HADITHS.length]
    if (!item) {
      throw new Error('Hadith item not found')
    }
    return {
      id: `hadith-${today}-${index}`,
      date: today,
      ...item,
    }
  }

  // Calculate day-of-year deterministic index for daily auto rotation
  const now = new Date(today)
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  const calculatedIndex = Math.abs(dayOfYear) % CURATED_DAILY_HADITHS.length

  const item = CURATED_DAILY_HADITHS[calculatedIndex]
  if (!item) {
    throw new Error('Hadith item not found')
  }
  return {
    id: `hadith-${today}-${calculatedIndex}`,
    date: today,
    ...item,
  }
}
