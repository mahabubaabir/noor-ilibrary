# Noor Islamic Library — Deployment & Architecture Guide

## Automated CI/CD Deployment with GitHub, Vercel & Neon PostgreSQL

### 1. Database Setup (Neon PostgreSQL)
1. Log in to [Neon Console](https://console.neon.tech).
2. Create a new PostgreSQL database project (e.g. `noor-db`).
3. Copy your Pooled Connection String:
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
   ```

### 2. Auto Code Deployment on Vercel
1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "Full Noor library upgrade with Quran, Hadith, Blog & Admin"
   git push origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository `noor-islamic-library`.
4. Configure Environment Variables in Vercel:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `AUTH_COOKIE_SECURE`: `true`
   - `ADMIN_EMAIL`: `admin@noor.app` (or your preferred admin email)
5. Click **Deploy**. Vercel will automatically build and deploy every time you push to GitHub!

### 3. One-Click Database Initialization
Once deployed, make a single POST request or visit the `/api/setup` endpoint to initialize all tables (`User`, `Session`, `Bookmark`, `HadithBookmark`, `ReadingProgress`, `BlogPost`, `DailyHadith`, `PasswordResetToken`):
```bash
curl -X POST https://your-domain.vercel.app/api/setup
```
This automatically provisions all tables, indexes, and sets up your default administrator account.

---

## Default Admin Credentials
- **Email:** `admin@noor.app`
- **Password:** `Admin123456!`
*(You can log in and change your password anytime via `/library` or `/forgot-password`)*

---

## Core Features & Architecture Summary
- **114 Surahs (Quran):** Full Arabic Uthmani text, verified English & Bangla translations, Tafsir Ibn Kathir, verse-by-verse recitation with multiple reciters, bookmarks, and reading progress saving.
- **7 Hadith Collections:** Bukhari, Muslim, Tirmidhi, Abu Dawud, Nasa'i, Ibn Majah, Nawawi 40 with automated cached Bangla translations, Arabic text, grades, and bookmarks.
- **Hadith of the Day (Home Screen):** Deterministic daily auto-rotation in Bangla with Arabic/English options, plus manual shuffle/next buttons.
- **User Profile & Reading Progress:** Visual percentage tracker, resume reading quick jump, streak badges, tabbed Quran & Hadith bookmarks.
- **Password Reset & Recovery:** Secure cryptographic token generator and updater (`/forgot-password` & `/reset-password`).
- **Dynamic Blog & Admin Dashboard:** Public `/blog` with Markdown rendering and `/admin` for publishing articles, monitoring metrics, and auditing users.
