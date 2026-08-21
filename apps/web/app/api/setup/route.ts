import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContentCache" (
        "key" TEXT NOT NULL PRIMARY KEY,
        "payload" TEXT NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "passwordHash" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`)
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
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ReadingProgress" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "scope" TEXT NOT NULL DEFAULT 'quran',
        "surahNumber" INTEGER NOT NULL,
        "ayahNumber" INTEGER NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "ReadingProgress_userId_scope_key" ON "ReadingProgress"("userId", "scope")`)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UserPreference" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL UNIQUE,
        "defaultTranslation" TEXT NOT NULL DEFAULT 'en',
        "defaultReciter" TEXT NOT NULL DEFAULT 'ar.alafasy',
        "theme" TEXT NOT NULL DEFAULT 'system',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )
    `)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "HadithBookmark" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "collection" TEXT NOT NULL,
        "hadithNumber" INTEGER NOT NULL,
        "arabic" TEXT NOT NULL,
        "english" TEXT NOT NULL,
        "grade" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "HadithBookmark_userId_collection_hadithNumber_key" ON "HadithBookmark"("userId", "collection", "hadithNumber")`)
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "HadithBookmark_userId_createdAt_idx" ON "HadithBookmark"("userId", "createdAt")`)

    return NextResponse.json({ ok: true, message: 'All tables created successfully' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
