import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST() {
  try {
    // 1. ContentCache
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContentCache" (
        "key" TEXT NOT NULL PRIMARY KEY,
        "payload" TEXT NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 2. User
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "passwordHash" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`)
    
    // Add role column if table previously existed without it
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'user'`)
    } catch {
      // Ignored if already exists
    }

    // 3. PasswordResetToken
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "token" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId")`)

    // 4. Session
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "token" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "Session"("expiresAt")`)

    // 5. Bookmark
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Bookmark" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "surahNumber" INTEGER NOT NULL,
        "ayahNumber" INTEGER NOT NULL,
        "surahName" TEXT NOT NULL,
        "textArabic" TEXT NOT NULL,
        "translationEn" TEXT NOT NULL,
        "translationBn" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Bookmark_userId_surahNumber_ayahNumber_key" ON "Bookmark"("userId", "surahNumber", "ayahNumber")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Bookmark_userId_createdAt_idx" ON "Bookmark"("userId", "createdAt")`)

    // 6. ReadingProgress
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ReadingProgress" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "scope" TEXT NOT NULL DEFAULT 'quran',
        "surahNumber" INTEGER NOT NULL,
        "ayahNumber" INTEGER NOT NULL,
        "surahName" TEXT,
        "totalAyahs" INTEGER DEFAULT 7,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "ReadingProgress_userId_scope_key" ON "ReadingProgress"("userId", "scope")`)
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "ReadingProgress" ADD COLUMN IF NOT EXISTS "surahName" TEXT`)
      await prisma.$executeRawUnsafe(`ALTER TABLE "ReadingProgress" ADD COLUMN IF NOT EXISTS "totalAyahs" INTEGER DEFAULT 7`)
    } catch {
      // Ignored
    }

    // 7. UserPreference
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UserPreference" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL UNIQUE,
        "defaultTranslation" TEXT NOT NULL DEFAULT 'en',
        "defaultReciter" TEXT NOT NULL DEFAULT 'ar.alafasy',
        "theme" TEXT NOT NULL DEFAULT 'system',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 8. HadithBookmark
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "HadithBookmark" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "collection" TEXT NOT NULL,
        "hadithNumber" INTEGER NOT NULL,
        "arabic" TEXT NOT NULL,
        "english" TEXT NOT NULL,
        "grade" TEXT NOT NULL,
        "translationBn" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "HadithBookmark_userId_collection_hadithNumber_key" ON "HadithBookmark"("userId", "collection", "hadithNumber")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "HadithBookmark_userId_createdAt_idx" ON "HadithBookmark"("userId", "createdAt")`)
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "HadithBookmark" ADD COLUMN IF NOT EXISTS "translationBn" TEXT`)
    } catch {
      // Ignored
    }

    // 9. BlogPost
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "BlogPost" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "titleBn" TEXT,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "coverImage" TEXT,
        "category" TEXT NOT NULL DEFAULT 'General',
        "published" BOOLEAN NOT NULL DEFAULT true,
        "authorId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost"("slug")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "BlogPost_category_idx" ON "BlogPost"("category")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "BlogPost_published_createdAt_idx" ON "BlogPost"("published", "createdAt")`)

    // 10. DailyHadith
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "DailyHadith" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "date" TEXT NOT NULL,
        "collection" TEXT NOT NULL,
        "hadithNumber" INTEGER NOT NULL,
        "arabic" TEXT NOT NULL,
        "english" TEXT NOT NULL,
        "bangla" TEXT NOT NULL,
        "grade" TEXT,
        "narrator" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "DailyHadith_date_key" ON "DailyHadith"("date")`)

    // 11. UserHighlight
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UserHighlight" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "targetId" TEXT NOT NULL,
        "targetType" TEXT NOT NULL DEFAULT 'story',
        "text" TEXT NOT NULL,
        "color" TEXT NOT NULL DEFAULT 'yellow',
        "note" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "UserHighlight_userId_targetType_targetId_idx" ON "UserHighlight"("userId", "targetType", "targetId")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "UserHighlight_userId_createdAt_idx" ON "UserHighlight"("userId", "createdAt")`)

    // 12. UserNote
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UserNote" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "targetId" TEXT NOT NULL,
        "targetType" TEXT NOT NULL DEFAULT 'story',
        "title" TEXT,
        "content" TEXT NOT NULL,
        "color" TEXT DEFAULT 'emerald',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "UserNote_userId_targetType_targetId_idx" ON "UserNote"("userId", "targetType", "targetId")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "UserNote_userId_createdAt_idx" ON "UserNote"("userId", "createdAt")`)

    // Ensure default admin exists or can be upgraded
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@noor.app'
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
    if (!existingAdmin) {
      const defaultHash = await hashPassword('Admin123456!')
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Noor Admin',
          passwordHash: defaultHash,
          role: 'admin',
        },
      })
    } else if (existingAdmin.role !== 'admin') {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: 'admin' },
      })
    }

    return NextResponse.json({ ok: true, message: 'All tables and schema initialized successfully' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

