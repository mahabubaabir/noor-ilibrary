export const SITE_CONFIG = {
  name: "Noor - Islamic Knowledge Library",
  nameBn: "নূর ইসলামিক লাইব্রেরি",
  tagline: "জ্ঞানের আলো ছড়িয়ে পড়ুক বিশ্বজুড়ে",
  description:
    "পবিত্র কুরআন, বিশুদ্ধ হাদিস গ্রন্থসমূহ, তাফসীর ইবনে কাসীর, আসমাউল হুসনা, মাসনূন দু'আ এবং সাহাবায়ে কেরামের আলোকিত জীবনগাঁথার আধুনিক ডিজিটাল পাঠাগার।",
  url: "https://noor-ilibrary.vercel.app",
  domain: "noor-ilibrary.vercel.app",
  ogImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f7yazuq4",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "ace-noor",
    apiVersion: "2024-02-28",
    studioPath: "/studio",
  },
  neonDb: {
    status: "Neon Serverless Postgres Active",
  },
  reciters: [
    { id: "ar.alafasy", nameBn: "মিশারি রাশিদ আল-আফাসি", nameEn: "Mishary Rashid Alafasy", folder: "Alafasy_128kbps" },
    { id: "ar.abdurrahmaanassudais", nameBn: "আব্দুর রহমান আস-সুদাইস (ইমামে কাবা)", nameEn: "Abdul Rahman Al-Sudais", folder: "Abdurrahmaan_As-Sudais_192kbps" },
    { id: "ar.abubakrasshatri", nameBn: "আবু বকর আশ-শাতরি", nameEn: "Abu Bakr Al-Shatri", folder: "Abu_Bakr_Ash-Shatri_128kbps" },
    { id: "ar.minshawi", nameBn: "মুহাম্মদ সিদ্দিক আল-মিনশাবি", nameEn: "Mohamed Siddiq Al-Minshawi", folder: "Minshawy_Murattal_128kbps" },
    { id: "ar.hudhaify", nameBn: "আলী আল-হুযাইফী", nameEn: "Ali Al-Hudhaify", folder: "Hudhaify_128kbps" },
    { id: "ar.husary", nameBn: "মাহমুদ খলিল আল-হুসারি", nameEn: "Mahmoud Khalil Al-Husary", folder: "Husary_128kbps" },
  ],
  navLinks: [
    { href: "/quran", label: "কুরআন" },
    { href: "/hadith", label: "হাদিস" },
    { href: "/companions", label: "সাহাবী" },
    { href: "/names-of-allah", label: "৯৯ নাম" },
    { href: "/duas", label: "দু'আ" },
    { href: "/hisnul-muslim", label: "হিসনুল মুসলিম" },
    { href: "/tasbih", label: "তাসবীহ" },
    { href: "/zakat-calculator", label: "যাকাত" },
    { href: "/stories", label: "জীবনগাঁথা" },
    { href: "/blog", label: "ব্লগ" },
  ],
  links: {
    github: "https://github.com/mahabubaabir/noor-ilibrary",
    vercel: "https://noor-ilibrary.vercel.app",
    studio: "https://noor-ilibrary.vercel.app/studio",
  },
}
