import type { StudyTheme } from '@noor/types'

/**
 * Curated study themes for learning the core message of the Quran.
 * Ayahs and hadiths are fetched live from the content providers at
 * request time (and cached), so only references and study notes are
 * stored here. Every hadith reference has been verified against
 * UmmahAPI.
 */
export const studyThemes: StudyTheme[] = [
  {
    id: 'tawhid',
    title: 'The Oneness of Allah',
    arabicTitle: 'التَّوْحِيد',
    tagline: 'Know your Lord — He is One, without partner or likeness.',
    description:
      'Begin where the Quran begins: knowing Allah. This theme builds your understanding of tawhid — that Allah is One, unique, and unlike anything we know, and that He alone deserves our worship. It closes with the famous lesson of the angel Jibril: Islam, Iman and Ihsan.',
    difficulty: 'Beginner',
    duration: '~20 min',
    icon: 'star',
    objectives: [
      'Understand that Allah is One and has no partner',
      'Learn His attributes of mercy, power and uniqueness',
      'See tawhid as the summary of the whole religion',
    ],
    lessons: [
      {
        id: 'he-is-one',
        title: 'Say: He is Allah, the One',
        arabicTitle: 'قُلْ هُوَ اللّٰهُ أَحَدٌ',
        overview:
          'The entire message of the Quran in four short verses. Surah Al-Ikhlas is so central that the Prophet ﷺ described it as equal to a third of the Quran.',
        ayahs: [
          {
            surah: 112,
            from: 1,
            to: 4,
            note: 'Four verses that define Allah: One, the Sustainer of all, beyond being begotten or begetting, with no equal.',
          },
          {
            surah: 2,
            from: 163,
            note: 'The oneness of Allah is joined with His two great names of mercy — the pair that opens every chapter of the Quran.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 5013,
            note: 'Reciting Surah Al-Ikhlas is equal to a third of the Quran.',
          },
        ],
        takeaway:
          'Tawhid begins with the tongue but lives in the heart: know that Allah is One, and let that oneness shape how you live.',
      },
      {
        id: 'his-names',
        title: 'His mercy, His power, His uniqueness',
        arabicTitle: 'أَسْمَاؤُهُ وَصِفَاتُهُ',
        overview:
          'Allah introduces Himself throughout the Quran. These verses reveal the attributes that should fill the heart: His mercy, His power over everything, and the fact that nothing resembles Him.',
        ayahs: [
          {
            surah: 6,
            from: 102,
            note: 'Because He created all things, worship belongs to Him alone.',
          },
          {
            surah: 6,
            from: 103,
            note: 'No eye can see Him in this world, yet He sees and knows everything.',
          },
          {
            surah: 57,
            from: 3,
            note: 'He was before everything and remains after everything; He is near and knows all.',
          },
          {
            surah: 42,
            from: 11,
            note: 'Nothing is like Him — the closest definition of Allah is that He has no definition.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 3194,
            note: 'When Allah completed the creation, He wrote: My mercy prevails over My wrath.',
          },
        ],
        takeaway:
          'Know Allah by His names: He is powerful enough to create everything and merciful enough to forgive everything — so fear Him and hope in Him together.',
      },
      {
        id: 'islam-iman-ihsan',
        title: 'The religion: Islam, Iman and Ihsan',
        arabicTitle: 'الإِسْلَامُ وَالإِيمَانُ وَالإِحْسَانُ',
        overview:
          'One day the angel Jibril came in the form of a man and asked the Prophet ﷺ to explain the religion. His answer — Islam, Iman and Ihsan — is the summary of everything a Muslim must know and practice.',
        ayahs: [
          {
            surah: 2,
            from: 177,
            note: 'True righteousness begins with believing in Allah, the Last Day, the angels, the Books and the prophets — and then acting on that belief.',
          },
          {
            surah: 3,
            from: 19,
            note: 'The religion Allah accepts is Islam: the heart submitting to its Lord.',
          },
          {
            surah: 49,
            from: 15,
            note: 'Faith that does not move a person to sacrifice is not yet complete faith.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 50,
            note: 'The hadith of Jibril: the whole religion explained — Islam, Iman and Ihsan.',
          },
        ],
        takeaway:
          'The religion has three levels: Islam (submission), Iman (belief of the heart), and Ihsan (worshipping Allah as if you see Him). Grow through all three.',
      },
    ],
  },
  {
    id: 'signs-in-creation',
    title: 'Signs of Allah in Creation',
    arabicTitle: 'آيَاتُ اللّٰهِ فِي الخَلْقِ',
    tagline: 'The seen world is a book of signs — every one points to its Maker.',
    description:
      'The universe is full of verses too: the sky, the mountains, the rain, the plants, and your own body. Allah calls these "signs" for those who reflect. This theme trains the eye to read creation as evidence of its Creator and turns gratitude into worship.',
    difficulty: 'Beginner',
    duration: '~20 min',
    icon: 'sparkles',
    objectives: [
      'Read the universe as a book of signs pointing to Allah',
      'Connect provision, plants and rain to gratitude',
      'See the design of the human body as proof of its Creator',
    ],
    lessons: [
      {
        id: 'heavens-and-earth',
        title: 'The heavens and the earth',
        arabicTitle: 'السَّمَاوَاتُ وَالأَرْضُ',
        overview:
          "Allah's evidence is not complicated — just look at the sky above and the earth below. The Quran repeats this invitation: travel, observe, and think about how creation began.",
        ayahs: [
          {
            surah: 88,
            from: 17,
            to: 20,
            note: 'Four simple signs — the camel, the sky, the mountains, the earth — each one a miracle on its own.',
          },
          {
            surah: 3,
            from: 190,
            to: 191,
            note: 'Reflecting on the creation of the heavens and the earth is itself described as worship.',
          },
          {
            surah: 2,
            from: 164,
            note: 'Ships, rain, living soil, winds and clouds — a full catalogue of signs for people who reason.',
          },
        ],
        hadiths: [],
        takeaway:
          'Deep thought about the world around you is a form of worship. The universe is not silent — it is speaking about its Creator.',
      },
      {
        id: 'rain-and-provision',
        title: 'Rain, plants and provision',
        arabicTitle: 'المَطَرُ وَالرِّزْقُ',
        overview:
          'From a drop of rain to a bee to the languages and colors of humanity — Allah draws our attention to the details of His care. Every blessing is a sign of the Giver.',
        ayahs: [
          {
            surah: 16,
            from: 65,
            to: 69,
            note: 'Water that revives dead land, and a bee that produces healing honey — two signs from a single surah.',
          },
          {
            surah: 30,
            from: 22,
            note: 'The differences in your languages and your colors are among His signs — diversity itself is a miracle.',
          },
          {
            surah: 45,
            from: 12,
            to: 13,
            note: 'Everything in the heavens and the earth is subjected for you — all of it from Him.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 2320,
            note: 'Planting a tree from which a bird or person eats is counted as charity — the earth is part of our worship.',
          },
        ],
        takeaway:
          'Provision is not an accident; it is a sign. When you eat, drink and plant, remember the Giver — and gratitude becomes worship.',
      },
      {
        id: 'your-own-self',
        title: 'Your own self — the greatest sign',
        arabicTitle: 'وَأَنْفُسِكُمْ أَفَلَا تُبْصِرُونَ',
        overview:
          'The nearest evidence of the Creator is you. The Quran points to the stages of your creation — from a drop of fluid to a fully formed human being — as the clearest proof of the One who fashioned you.',
        ayahs: [
          {
            surah: 51,
            from: 20,
            to: 21,
            note: 'Signs in the earth — and signs in your own selves. The closest proof is inside you.',
          },
          {
            surah: 41,
            from: 53,
            note: 'Allah will show His signs in the universe and in yourselves until the truth becomes clear.',
          },
          {
            surah: 86,
            from: 5,
            to: 7,
            note: 'Reflect on what you were created from — a small, humble beginning.',
          },
          {
            surah: 82,
            from: 6,
            to: 8,
            note: 'Who created you, fashioned you and balanced you? The question carries its own answer.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 1385,
            note: 'Every child is born upon the natural faith (fitrah) — the human self is made to know its Creator.',
          },
        ],
        takeaway:
          'You are not just a sign — you are the sign closest to yourself. Study your own body and soul, and you will find the Maker in every detail.',
      },
    ],
  },
  {
    id: 'the-unseen-world',
    title: 'The Unseen World',
    arabicTitle: 'عَالَمُ الغَيْبِ',
    tagline: 'Angels, jinn and the soul — realities beyond our senses that shape our life.',
    description:
      'Beyond what we see lies a world that the Quran tells us about: the angels who serve Allah and record our deeds, the jinn, the satan who whispers, and the soul that was breathed into us. Believing in the unseen is the first quality of the God-conscious.',
    difficulty: 'Intermediate',
    duration: '~25 min',
    icon: 'eye',
    objectives: [
      'Understand why belief in the unseen is the foundation of faith',
      'Learn about the angels: their nature and their tasks',
      'Know about the jinn, satan, and the mystery of the soul',
    ],
    lessons: [
      {
        id: 'belief-in-unseen',
        title: 'Belief in the unseen',
        arabicTitle: 'الإِيمَانُ بِالغَيْبِ',
        overview:
          'The very first description of the believers in the Quran is that they believe in the unseen. Our religion is built on accepting realities we cannot see, because the One who told us about them is the One who created them.',
        ayahs: [
          {
            surah: 2,
            from: 3,
            note: 'The first quality of the God-conscious: belief in the unseen, prayer, and giving from what Allah provided.',
          },
          {
            surah: 2,
            from: 285,
            note: 'Every believer affirms belief in Allah, His angels, His books and His messengers — the unseen world in one verse.',
          },
          {
            surah: 25,
            from: 2,
            note: 'The One who created everything and precisely measured it — no blind chance, but plan and measure.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 50,
            note: 'When asked about Iman, the Prophet ﷺ listed the unseen beliefs: Allah, His angels, His books, His messengers, the Last Day and divine decree.',
          },
        ],
        takeaway:
          'Faith in the unseen is not blind trust — it is trust in the One who sees everything. The unseen world is more real than what our eyes can see.',
      },
      {
        id: 'the-angels',
        title: 'The angels',
        arabicTitle: 'المَلَائِكَةُ',
        overview:
          'Angels are beings of light created to worship Allah and carry out His commands without hesitation. They carry the Throne, deliver revelation, record our deeds, and seek out the people who remember their Lord.',
        ayahs: [
          {
            surah: 35,
            from: 1,
            note: 'Angels are messengers with wings — two, three and four — and Allah increases His creation as He wills.',
          },
          {
            surah: 16,
            from: 49,
            to: 50,
            note: 'Everything in the heavens and the earth prostrates to Allah — including the angels, who never grow arrogant.',
          },
          {
            surah: 39,
            from: 75,
            note: 'The angels surround the Throne, glorifying their Lord — the unseen world is alive with worship.',
          },
          {
            surah: 82,
            from: 10,
            to: 12,
            note: 'Honorable recording angels write down everything you do — your deeds are witnessed.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 6408,
            note: 'Allah has angels who seek out the people remembering Him and surround them with mercy and tranquillity.',
          },
        ],
        takeaway:
          'You are never alone: angels witness your deeds and seek out those who remember Allah. Let that reality raise the quality of your life.',
      },
      {
        id: 'jinn-and-soul',
        title: 'The jinn and the soul',
        arabicTitle: 'الجِنُّ وَالرُّوحُ',
        overview:
          'The unseen world also contains the jinn — beings created from fire — and among them satan, whose whisper reaches the heart like blood reaches the veins. And there is the soul: a mystery that only its Creator knows.',
        ayahs: [
          {
            surah: 72,
            from: 1,
            to: 2,
            note: 'A group of jinn listened to the Quran and believed — the message of tawhid reaches beyond the human world.',
          },
          {
            surah: 55,
            from: 15,
            note: 'Jinn were created from a smokeless flame of fire — a different creation with the same test.',
          },
          {
            surah: 17,
            from: 85,
            note: 'The soul: knowledge of it belongs to Allah alone. Some realities are beyond human reach by design.',
          },
          {
            surah: 32,
            from: 9,
            note: 'Man was given hearing, sight and a heart — and a soul breathed into him from his Lord.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 3281,
            note: 'Satan circulates in the human mind as blood circulates in the veins — know your enemy and seek Allah\'s protection.',
          },
        ],
        takeaway:
          'The unseen world is not a fantasy — it is a reality you interact with every day. Guard your heart from the whisperer, and honour the soul your Lord breathed into you.',
      },
    ],
  },
  {
    id: 'purpose-and-hereafter',
    title: 'Purpose of Life & the Hereafter',
    arabicTitle: 'الغَايَةُ وَالآخِرَةُ',
    tagline: 'Why are we here, and where are we going? The two questions every soul must answer.',
    description:
      'Why did Allah create us? What is this life? And what happens when we return to Him? This theme answers the three questions of existence directly from the Quran — creation for worship, life as a test, and a final return in which nothing is lost.',
    difficulty: 'Intermediate',
    duration: '~25 min',
    icon: 'heart',
    objectives: [
      'Know the purpose for which Allah created us',
      'Understand this life as a test with real stakes',
      'Look forward to the Final Return with hope and preparation',
    ],
    lessons: [
      {
        id: 'why-created',
        title: 'Why were we created?',
        arabicTitle: 'وَمَا خَلَقْتُ الجِنَّ وَالإِنْسَ إِلَّا لِيَعْبُدُونِ',
        overview:
          'The Quran does not leave us guessing about our origin or our purpose. In one clear verse Allah tells us why He created us — and in another, what He is testing in us.',
        ayahs: [
          {
            surah: 51,
            from: 56,
            note: 'The purpose in one verse: I created jinn and mankind only to worship Me.',
          },
          {
            surah: 67,
            from: 2,
            note: 'He created death and life to test which of you is best in deeds — the test defines the creation.',
          },
          {
            surah: 2,
            from: 30,
            note: 'Adam was placed on earth as a vicegerent — not abandoned, but entrusted.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 6502,
            note: 'Draw near to Allah through what He obligated, then through extra worship — until He loves you and becomes your hearing, sight, hand and support.',
          },
        ],
        takeaway:
          'You were created for worship — and worship is simply living your whole life for Allah. That purpose gives every day meaning.',
      },
      {
        id: 'life-is-a-test',
        title: 'This life is a test',
        arabicTitle: 'الحَيَاةُ الدُّنْيَا امْتِحَانٌ',
        overview:
          'This world was not made to last, and it was not made to be our reward. The Quran calls it the test and the temporary life — the true life is the one that begins after it.',
        ayahs: [
          {
            surah: 23,
            from: 115,
            note: 'You were not created in play — this life is serious, and it will be accounted for.',
          },
          {
            surah: 103,
            from: 1,
            to: 3,
            note: 'By time: mankind is in loss — except those who believe, do good, urge truth and urge patience.',
          },
          {
            surah: 6,
            from: 162,
            to: 163,
            note: 'My prayer, my sacrifice, my life and my death are all for Allah — the full surrender of the believer.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 6547,
            note: 'The Prophet ﷺ stood at the gate of Paradise and saw that most of those entering it were the poor — wealth is not the measure of success.',
          },
        ],
        takeaway:
          'Measure success by deeds, not possessions. This life is the exam hall — and every moment is a question paper.',
      },
      {
        id: 'the-final-return',
        title: 'The Final Return',
        arabicTitle: 'المَرْجِعُ وَالجَزَاءُ',
        overview:
          'Every soul will taste death, and every deed will be weighed. The Hereafter is not a distant idea — it is the destination this life is moving toward every second. And for the believers, it is glad tidings.',
        ayahs: [
          {
            surah: 3,
            from: 185,
            note: 'Every soul will taste death — and you will be paid in full on the Day of Resurrection.',
          },
          {
            surah: 99,
            from: 7,
            to: 8,
            note: 'An atom of good and an atom of evil — both will be seen and answered for.',
          },
          {
            surah: 101,
            from: 6,
            to: 11,
            note: 'The scales will decide: heavy with good, or falling into the abyss.',
          },
          {
            surah: 10,
            from: 62,
            to: 64,
            note: 'No fear, no grief for the friends of Allah — glad tidings in this life, at death, and in the Hereafter.',
          },
        ],
        hadiths: [
          {
            collection: 'bukhari',
            number: 6518,
            note: 'On the Day of Resurrection the people will fall unconscious at the blast — and the Prophet ﷺ will be the first to rise.',
          },
          {
            collection: 'bukhari',
            number: 3244,
            note: 'Allah says: I have prepared for My righteous servants what no eye has seen, no ear has heard, and no heart has imagined.',
          },
        ],
        takeaway:
          'Death is not the end — it is the door. Prepare for the return, carry the hope of His mercy, and let the promise of Paradise make you patient in this life.',
      },
    ],
  },
]

export function getStudyTheme(id: string): StudyTheme | undefined {
  return studyThemes.find((theme) => theme.id === id)
}

export function countAyahRefs(theme: StudyTheme): number {
  return theme.lessons.reduce((sum, lesson) => sum + lesson.ayahs.length, 0)
}