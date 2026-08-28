# 🌙 Noor — Islamic Knowledge Library (নূর ইসলামিক লাইব্রেরি)

![Noor Islamic Library](https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1600&auto=format&fit=crop&q=85)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Neon Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E599)](https://neon.tech/)
[![Sanity CMS](https://img.shields.io/badge/CMS-Sanity%20v3-F03E2F?logo=sanity)](https://sanity.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://noor-ilibrary.vercel.app)

> **Noor** (নূর) is an ultra-modern, cinematic, and comprehensive digital Islamic Knowledge Platform. It features the Noble Quran with multi-reciter CDN streaming and Tafsir Ibn Kathir, authentic Hadith collections, 99 Names of Allah with audio pronunciation, Sahaba biographies, Masnoon Duas, Hisnul Muslim, Digital Tasbih, Zakat Calculator, Sanity CMS Content Studio, and social-media-style "For You" personalized content recommendations.

---

## 🌟 Key Features & Modules

### 1. 📖 The Noble Quran (আল-কুরআনুল কারীম)
- **114 Surahs** in authentic Arabic Uthmani calligraphy with Bengali and English translations.
- **Universal Multi-Reciter Audio Engine**: Instant verse-by-verse recitation streaming across 6 renowned reciters (*Mishary Rashid Alafasy, Abdul Rahman Al-Sudais, Abu Bakr Al-Shatri, Mohamed Siddiq Al-Minshawi, Ali Al-Hudhaify, Mahmoud Khalil Al-Husary*) with multi-tier CDN fallback.
- **Sticky Bottom Audio Player**: Floating audio controls with real-time ayah tracking and seamless reciter switching.
- **Tafsir Ibn Kathir**: Integrated comprehensive chapter tafsir panel with single-click verse navigation.

### 2. 📜 7 Authentic Hadith Collections (বিশুদ্ধ হাদিস সংকলন)
- 34,000+ authentic Hadiths from **Sahih al-Bukhari, Sahih Muslim, Sunan an-Nasa'i, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan Ibn Majah, and 40 Hadith Nawawi**.
- Arabic text, authentic grades (Sahih, Hasan), narrators, and Bengali/English translations with search & personal bookmarking.
- **Hadith of the Day**: Automatic daily rotating Hadith on the home screen with manual next/shuffle and copy buttons.

### 3. ✨ 99 Names of Allah (আসমাউল হুসনা)
- Complete 99 beautiful Names of Allah with authentic Arabic script, Bengali transliteration, deep spiritual meanings, Quranic references, and audio pronunciation.
- Memorization progress checklist and favorites list saved directly to localStorage.

### 4. 🛡️ Companions of the Prophet (সাহাবায়ে কেরাম)
- Inspiring biographies and life stories of the Prophet's Companions (*Abu Bakr, Umar, Uthman, Ali, Bilal ibn Rabah, Khalid ibn al-Walid, and more*).
- Islamic geometric grid UI with audio narration.

### 5. 🤲 Masnoon Duas & Hisnul Muslim (দু'আ ও হিসনুল মুসলিম)
- 40 Quranic Rabbana Duas, Morning & Evening Adhkar, and fortress of the Muslim supplications with Arabic, Bengali, and audio narration.

### 6. 📿 Digital Tasbih & Zakat Calculator (ইসলামিক টুলস)
- Smart tactile Digital Tasbih with sound/vibration feedback and count presets.
- Accurate Nisab-based Zakat Calculator for cash, gold, silver, business assets, and liabilities.

### 7. 🔥 Smart "For You" Personalization Engine ("আপনার জন্য প্রস্তাবিত")
- Client-side privacy-first activity tracker analyzing reading habits (Surahs read, Hadiths bookmarked, Duas viewed).
- Dynamically calculates topic affinity and recommends curated spiritual knowledge matching the user's journey.

### 8. 📝 Sanity Studio CMS & Neon PostgreSQL
- Isolated full-screen Sanity Studio at `/studio` for creating and managing blog articles, reflections, and rich media.
- Neon Serverless PostgreSQL with Prisma ORM for robust user authentication, bookmarks, and cloud sync.
- Transactional password reset emails powered by Resend.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Webpack)
- **UI & Styling**: [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [Lucide Icons](https://lucide.dev)
- **Database & ORM**: [Neon Serverless PostgreSQL](https://neon.tech), [Prisma Client v6](https://www.prisma.io)
- **CMS**: [Sanity v3](https://sanity.io)
- **Transactional Email**: [Resend](https://resend.com)
- **Hosting**: [Vercel](https://vercel.com)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/mahabubaabir/noor-ilibrary.git
cd noor-ilibrary
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create an `.env` or `.env.local` inside `apps/web`:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require"
AUTH_COOKIE_SECURE="false"
NEXT_PUBLIC_SANITY_PROJECT_ID="f7yazuq4"
NEXT_PUBLIC_SANITY_DATASET="ace-noor"
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

### 4. Push Database Schema & Run
```bash
npm run db:push
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Deployment

- **Website**: [https://noor-ilibrary.vercel.app](https://noor-ilibrary.vercel.app)
- **Sanity Studio**: [https://noor-ilibrary.vercel.app/studio](https://noor-ilibrary.vercel.app/studio)

---

## 📄 License
This project is open-source and built for the benefit of the global Muslim Ummah and seekers of authentic Islamic knowledge.
