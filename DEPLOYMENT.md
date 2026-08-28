# Noor Islamic Library — Deployment & Architecture Guide

## Automated CI/CD Deployment with GitHub, Vercel, Neon PostgreSQL & Sanity CMS

---

### 1. Database Setup (Neon Serverless PostgreSQL)
1. Log in to [Neon Console](https://console.neon.tech).
2. Create a new PostgreSQL database project (e.g. `noor-db`).
3. Copy your Pooled Connection String:
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
   ```

---

### 2. Sanity CMS Setup & CORS Whitelisting
1. Log in to [Sanity Management Dashboard](https://www.sanity.io/manage).
2. Select your project (ID: `f7yazuq4`).
3. Go to **API** → **CORS Origins** → click **Add CORS origin**:
   - For local development: `http://localhost:3000` (Check **Allow credentials**)
   - For Vercel production: `https://noor-ilibrary.vercel.app` (Check **Allow credentials**)
4. Ensure your dataset is created (e.g. `ace-noor` or `production`).
5. Open your live Sanity Studio at `/studio`: [https://noor-ilibrary.vercel.app/studio](https://noor-ilibrary.vercel.app/studio).

---

### 3. Email Service Setup (Resend)
1. Sign up at [Resend](https://resend.com) (free tier provides 3,000 emails/month).
2. Create an API Key in the Resend dashboard.
3. Add the following to your Vercel Environment Variables:
   ```env
   RESEND_API_KEY="re_123456789..."
   EMAIL_FROM="Noor Library <onboarding@resend.dev>"
   ```
   *(Note: In local development without an API key, password reset links are safely logged to your server console for instant testing).*

---

### 4. Auto Code Deployment on Vercel
1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "Fix Sanity Studio, secure password reset email flow, and Neon sync"
   git push origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository `noor-islamic-library`.
4. Configure the following **Environment Variables** in Vercel:

| Variable | Recommended Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Neon PostgreSQL pooled connection string |
| `AUTH_COOKIE_SECURE` | `true` | Enables HTTPS-only secure session cookies |
| `NEXT_PUBLIC_APP_URL` | `https://noor-ilibrary.vercel.app` | Canonical domain for password reset links |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `f7yazuq4` | Your Sanity Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `ace-noor` | Your Sanity Dataset name |
| `RESEND_API_KEY` | `re_...` | Resend API key for transactional emails |
| `ADMIN_EMAIL` | `admin@noor.app` | Default administrator account email |

5. Click **Deploy**. Vercel will automatically build and deploy every time you push to GitHub!

---

### 5. One-Click Database Initialization
Once deployed, make a single POST request or visit the `/api/setup` endpoint to initialize all tables (`User`, `Session`, `Bookmark`, `HadithBookmark`, `ReadingProgress`, `UserPreference`, `BlogPost`, `DailyHadith`, `UserHighlight`, `UserNote`, `PasswordResetToken`):
```bash
curl -X POST https://your-domain.vercel.app/api/setup
```
This automatically provisions all tables, indexes, and sets up your default administrator account.

---

### 6. Default Admin Credentials
- **Email:** `admin@noor.app`
- **Password:** `Admin123456!`
*(You can log in and change your password anytime via `/library` or `/forgot-password`)*

---

### 7. Core Features & Routes Summary
- **Sanity Studio (`/studio`):** Standalone, full-screen headless CMS dashboard for managing companions and stories.
- **114 Surahs (Quran) (`/quran`):** Full Arabic Uthmani text, verified English & Bangla translations, Tafsir Ibn Kathir, verse recitation with multiple reciters, bookmarks, and reading progress saving.
- **7 Hadith Collections (`/hadith`):** Bukhari, Muslim, Tirmidhi, Abu Dawud, Nasa'i, Ibn Majah, Nawawi 40 with cached Bangla translations, Arabic text, grades, and bookmarks.
- **Hadith of the Day (Home Screen):** Deterministic daily auto-rotation in Bangla with Arabic/English options.
- **User Profile & Library (`/library`):** Visual percentage tracker, reading jump, streak badges, tabbed Quran & Hadith bookmarks.
- **Password Reset & Recovery (`/forgot-password` & `/reset-password`):** Secure cryptographic tokens, transactional email dispatch via Resend, and bilingual UI.
- **Admin Dashboard (`/admin`):** Publishing articles, monitoring metrics, and auditing users.
