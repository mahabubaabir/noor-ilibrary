# 🌙 Noor — Islamic Knowledge Library (নূর ইসলামিক লাইব্রেরি)

![Noor Islamic Library](https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Neon Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E599)](https://neon.tech/)

> **Noor** is an ultra-modern, minimal, and comprehensive digital Islamic Knowledge & Reading Platform featuring the Noble Quran, Hadith collections, inspiring Life Stories with a PDF/E-book Reader (multi-color text highlights and personal notes), and bi-directional Cloud Auto-Sync.

---

## ✨ Features

### 1. 📖 The Noble Quran (আল-কুরআনুল কারীম)
- Complete **114 Surahs** in authentic Arabic Uthmani script with Bengali and English translations.
- Verse-by-verse audio recitation by world-renowned reciters (Mishary Rashid Alafasy, Abdul Rahman Al-Sudais, etc.).
- Tafsir Ibn Kathir panel with single-click verse navigation.
- Real-time reading progress percentage tracker & resume reading quick jump.

### 2. 📜 7 Hadith Collections (হাদিস সংকলন)
- 34,000+ authentic Hadiths from **Sahih al-Bukhari, Sahih Muslim, Sunan an-Nasa'i, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan Ibn Majah, and 40 Hadith Nawawi**.
- Arabic text, grades, narrators, and Bengali/English translations with search & bookmarks.
- **Hadith of the Day**: Automatic daily rotating Hadith on the home screen with manual next/shuffle buttons.

### 3. 📚 Life Stories & History (নবীজি ﷺ ও মহামানবদের জীবনগাঁথা)
- Authentic, heartwarming life lessons on:
  - **Prophet Muhammad ﷺ (সীরাতুন্নবী ﷺ)**: *Deen & Spirituality, Daily Routine & Lifestyle, Health & Hygiene, Food & Nutrition, Family & Spouses, Children & Youth, Halal Finance & Trade, Charity & Mercy, Honesty & High Character*.
  - **Historical Figures**: *Abu Bakr, Umar, Uthman, Ali, Khadijah, Aisha, Maryam, Yusuf, Ibrahim, and Sulaiman*.
- **Dual Language**: Seamless **Bangla** and **English** toggle on every single story.

### 4. 🖍️ PDF / E-Book Reader Engine
- **Reading Modes**: 📖 E-book Paginated Mode (page turn navigation) and 📜 Continuous Scroll Mode.
- **Multi-color Text Highlighter**: Floating toolbar with 5 colors (🟡 Gold, 🟢 Mint Green, 🔵 Sky Blue, 🟣 Lavender, 🌸 Rose Pink).
- **Personal Notes & Reflections Drawer**: Attach thoughts to paragraphs/highlights with search, copy to clipboard, and delete options.
- **Theme Customizer**: ☀️ Light Sand, 📜 Sepia Paper, 🌙 Dark Slate, and font sizing controls.

### 5. 👤 User Profile & Cloud Data Auto-Sync
- Customize **Full Name**, unique **Username Handle** (`@handle`), **Profile Avatar** (curated preset avatars or custom image URLs), and **Islamic Bio/Goal**.
- Automatic bi-directional syncing of bookmarks, reading progress, highlights, and notes between browser storage and database.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack / Webpack)
- **UI & Components**: [React 19](https://react.dev), [Lucide Icons](https://lucide.dev), [Tailwind CSS v4](https://tailwindcss.com)
- **Database**: [Neon Serverless PostgreSQL](https://neon.tech)
- **ORM**: [Prisma Client v6](https://www.prisma.io)
- **Deployment**: [Vercel](https://vercel.com)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/mahabubaabir/noor-islamic-library.git
cd noor-islamic-library
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
```

### 4. Push Database Schema & Run
```bash
npm run db:push
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Import project into [Vercel](https://vercel.com/new).
3. Set environment variable:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
4. Deploy! Vercel will automatically build and publish the app.

---

## 📄 License
This project is open-source and built for the benefit of the global Muslim Ummah and seekers of knowledge.
