import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Initial seed articles if database has no articles yet
const DEFAULT_ARTICLES = [
  {
    slug: 'importance-of-quran-in-daily-life',
    title: 'The Transformative Power of the Quran in Daily Life',
    titleBn: 'দৈনন্দিন জীবনে আল-কুরআনের রূপান্তরমূলক প্রভাব',
    excerpt: 'How regular reflection upon the words of Allah brings tranquil peace, ethical clarity, and spiritual elevation.',
    category: 'Quran Reflection',
    content: `
# The Transformative Power of the Quran in Daily Life

The Holy Quran is not merely a book to be recited on special occasions; it is a **living guide**, a spiritual remedy, and a blueprint for a balanced human life.

> "Verily, in the remembrance of Allah do hearts find rest." (Surah Ar-Ra'd 13:28)

## 1. Establishing a Daily Habit
Connecting with the Quran daily—even just 10 verses—keeps our consciousness aligned with our ultimate purpose.

- **Morning Reflection:** Reading after Fajr sets a calm, purposeful tone for the whole day.
- **Contemplation (Tadabbur):** Do not rush. Pause and reflect on the meanings in your own language (Bangla or English).
- **Practical Application:** Strive to implement at least one lesson or good character trait every single day.

## 2. The Healing Nature of Divine Revelation
When we face anxieties, modern stress, and uncertainty, the Quran reminds us that tests are transient and Allah's mercy is ever near.

Let us commit to making Noor our companion in learning and understanding the noble Quran.
`,
  },
  {
    slug: 'the-art-of-hadith-sciences',
    title: 'Understanding Hadith Sciences & Preservation',
    titleBn: 'হাদিস শাস্ত্রের মূলনীতি ও সংরক্ষণ পদ্ধতি',
    excerpt: 'An overview of how early scholars verified chains of transmission (Isnad) to protect the Sunnah.',
    category: 'Hadith Studies',
    content: `
# Understanding Hadith Sciences & Preservation

The preservation of the prophetic tradition (*Sunnah*) represents one of the most rigorous historical methodologies in human civilization.

## The Pillars of Hadith Verification
1. **Sanad (Chain of Narrators):** Unbroken line of upright, verified scholars with razor-sharp memory.
2. **Matn (Text):** Scrutinized to ensure consistency with divine principles.
3. **Grading System:** Categorization into *Sahih* (authentic), *Hasan* (good), and *Da'if* (weak).

### The Golden Collections
Imam al-Bukhari and Imam Muslim dedicated decades to compiling only the most verified narrations. Exploring their collections gives us direct insight into the noble character of the Prophet (ﷺ).
`,
  },
  {
    slug: 'spiritual-benefits-of-dhikr',
    title: 'Dhikr: Awakening the Heart with Daily Remembrance',
    titleBn: 'যিকির: অন্তরের প্রশান্তি ও সার্বক্ষণিক স্মরণ',
    excerpt: 'The psychological and spiritual blessings of constant Istighfar, Tasbeeh, and Tahmeed.',
    category: 'Spiritual Reminders',
    content: `
# Dhikr: Awakening the Heart with Daily Remembrance

In our fast-paced digital world, the heart easily becomes distracted. The practice of *Dhikr* (remembrance of Allah) acts as an anchor for the soul.

## Essential Daily Dhikr
- **SubhanAllah (سبحان الله):** Glory be to Allah.
- **Alhamdulillah (الحمد لله):** All praise is due to Allah.
- **La ilaha illallah (لا إله إلا الله):** None has the right to be worshipped except Allah.
- **Allahu Akbar (الله أكبر):** Allah is the Greatest.
- **Astaghfirullah (أستغفر الله):** I seek Allah's forgiveness.

Consistent remembrance brings clarity of mind and brings barakah into every moment of our day.
`,
  },
]

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')?.trim()

    // Ensure initial articles exist if table is empty
    const count = await prisma.blogPost.count().catch(() => 0)
    if (count === 0) {
      let admin = await prisma.user.findFirst({ where: { role: 'admin' } })
      if (!admin) {
        admin = await prisma.user.findFirst()
      }
      if (admin) {
        for (const art of DEFAULT_ARTICLES) {
          await prisma.blogPost.create({
            data: {
              ...art,
              published: true,
              authorId: admin.id,
            },
          }).catch(() => undefined)
        }
      }
    }

    const where: Record<string, any> = { published: true }
    if (category && category !== 'All') {
      where.category = category
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleBn: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true, email: true } },
      },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 })
    }

    const body = (await request.json().catch(() => null)) as {
      title?: string
      titleBn?: string
      excerpt?: string
      content?: string
      category?: string
      coverImage?: string
      published?: boolean
    } | null

    const title = body?.title?.trim() ?? ''
    const content = body?.content?.trim() ?? ''
    const excerpt = body?.excerpt?.trim() || title
    const category = body?.category?.trim() || 'General'
    const titleBn = body?.titleBn?.trim() || null
    const coverImage = body?.coverImage?.trim() || null
    const published = body?.published !== false

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Generate unique slug
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    if (!baseSlug) baseSlug = `post-${Date.now()}`

    let slug = baseSlug
    let counter = 1
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        titleBn,
        excerpt,
        content,
        category,
        coverImage,
        published,
        authorId: user.id,
      },
    })

    return NextResponse.json({ ok: true, post })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
