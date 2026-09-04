"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  BookOpen,
  Compass,
  ArrowRight,
  Info,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"

export interface ProphetCosmosNode {
  id: string
  nameBn: string
  nameAr: string
  titleBn: string
  eraBn: string
  quranMentions: string
  keyTheme: string
  summaryBn: string
  lessons: string[]
  isCenter?: boolean
  // 3D coordinates in space
  orbitRadius: number // distance from center in px
  orbitAngle: number // angle in degrees around Y
  elevation: number // elevation angle in degrees (-35 to +35)
}

export const PROPHETS_DATA: ProphetCosmosNode[] = [
  // 0. THE CENTERPIECE - Prophet Muhammad (peace be upon him)
  {
    id: "prophet-muhammad",
    nameBn: "হযরত মুহাম্মদ ﷺ",
    nameAr: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
    titleBn: "সর্বশেষ ও সর্বশ্রেষ্ঠ নবী • রাহমাতুল্লিল আলামীন",
    eraBn: "৫৭০ খ্রিষ্টাব্দ — ৬৩২ খ্রিষ্টাব্দ • পবিত্র মক্কা ও মদিনা",
    quranMentions: "কুরআনে ৪ বার নাম এবং অসংখ্যবার 'নবী' ও 'রাসূল' উপাধিতে সম্বোধন",
    keyTheme: "পূর্ণাঙ্গ জীবনবিধান, বিশ্বজনীন রহমত ও সর্বোত্তম চরিত্র",
    summaryBn:
      "মহান আল্লাহ তা'আলা তাঁকে সমগ্র মানবজাতির জন্য পথপ্রদর্শক ও বিশ্বজগতের জন্য রহমতস্বরূপ প্রেরণ করেছেন। তাঁর আনীত দ্বীন ইসলাম ও আল-কুরআন কিয়ামত পর্যন্ত সকল মানুষের মুক্তির সনদ। তাঁর প্রতিটি সুন্নত মানবজীবনের সকল দিককে আলোকিত করেছে।",
    lessons: [
      "উত্তম চরিত্র, বিনয় ও পরম ক্ষমাশীলতা দিয়ে মানুষের মন জয় করা।",
      "সত্যের পথে সকল জুলুম-অত্যাচারের মুখে অটল ধৈর্য ও তাওয়াক্কুল।",
      "সমগ্র সৃষ্টির প্রতি দয়া, নারী ও এতিমদের অধিকার প্রতিষ্ঠা এবং ইনসাফ।",
    ],
    isCenter: true,
    orbitRadius: 0,
    orbitAngle: 0,
    elevation: 0,
  },

  // Inner Orbital Ring (Radius ~ 240px)
  {
    id: "adam",
    nameBn: "হযরত আদম (আঃ)",
    nameAr: "آدم عليه السلام",
    titleBn: "প্রথম মানব ও আদি পিতা • সফিউল্লাহ",
    eraBn: "মানব ইতিহাসের সূচনা",
    quranMentions: "কুরআনের ২৫টি আয়াতে উল্লেখ",
    keyTheme: "সৃষ্টির শ্রেষ্ঠত্ব, সিজদার নির্দেশ ও খাঁটি তাওবা",
    summaryBn:
      "আল্লাহ তা'আলা নিজ কুদরতে মাটির উপাদান থেকে প্রথম মানব হিসেবে আদম (আঃ)-কে সৃষ্টি করেন এবং ফেরেশতাদের সিজদা করার নির্দেশ দেন। ভুলের পর তাঁর আন্তরিক তাওবা সকল মানুষের জন্য অনুশোচনার সর্বোত্তম শিক্ষা।",
    lessons: [
      "ভুল হলে অহংকার না করে সাথে সাথে আল্লাহর দরবারে তাওবা করা।",
      "শয়তানের ধোঁকা ও প্ররোচনা সম্পর্কে সর্বদা সতর্ক থাকা।",
    ],
    orbitRadius: 240,
    orbitAngle: 0,
    elevation: -15,
  },
  {
    id: "idris",
    nameBn: "হযরত ইদরীস (আঃ)",
    nameAr: "إدريس عليه السلام",
    titleBn: "প্রজ্ঞাবান নবী • জ্ঞানের অগ্রদূত",
    eraBn: "আদম (আঃ) এর পরবর্তী যুগ",
    quranMentions: "কুরআনে ২ বার উল্লেখ",
    keyTheme: "প্রথম কলম দিয়ে লেখা, জ্যোতির্বিদ্যা ও বস্ত্র সেলাইয়ের সূচনা",
    summaryBn:
      "হযরত ইদরীস (আঃ) ছিলেন চরম সত্যবাদী ও ধৈর্যশীল নবী। আল্লাহ তাঁকে বিশেষ সম্মানজনক উচ্চ স্থানে উন্নীত করেছিলেন।",
    lessons: [
      "জ্ঞানার্জন ও ইতিবাচক আবিষ্কার মানবজাতির জন্য বিরাট কল্যাণ।",
      "আল্লাহর স্মরণে অবিচল থাকা।",
    ],
    orbitRadius: 240,
    orbitAngle: 50,
    elevation: 20,
  },
  {
    id: "nuh",
    nameBn: "হযরত নূহ (আঃ)",
    nameAr: "نوح عليه السلام",
    titleBn: "মহা প্লাবন ও নাজাতের কিশতী • নাজীউল্লাহ",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ৩০০০ অব্দ",
    quranMentions: "কুরআনে ৪৩ বার উল্লেখ",
    keyTheme: "৯৫০ বছর নিরবচ্ছিন্ন তাওহীদের দাওয়াত ও চরম ধৈর্য",
    summaryBn:
      "সাড়ে নয়শত বছর দিন-রাত গোপনে ও প্রকাশ্যে নিজের জাতিকে একত্ববাদের আহ্বান জানান। অবাধ্য জাতির ধ্বংস ও বিশ্বাসীদের রক্ষার জন্য আল্লাহর নির্দেশে বিশাল কিশতী (নৌকা) তৈরি করেন।",
    lessons: [
      "ফলাফল যাই হোক, সত্যের দাওয়াত ধৈর্য ও নিষ্ঠার সাথে অব্যাহত রাখা।",
      "আল্লাহর অবাধ্যতার পরিণাম চরম ধ্বংস।",
    ],
    orbitRadius: 240,
    orbitAngle: 110,
    elevation: -25,
  },
  {
    id: "hud",
    nameBn: "হযরত হূদ (আঃ)",
    nameAr: "هود عليه السلام",
    titleBn: "‘আদ জাতির প্রতি সত্যের বার্তাবাহক",
    eraBn: "প্রাচীন ইয়েমেন ও আহকাফ অঞ্চল",
    quranMentions: "কুরআনে ৭ বার উল্লেখ",
    keyTheme: "দৈহিক শক্তি ও প্রাসাদের অহংকার চূর্ণ",
    summaryBn:
      "সুউচ্চ স্তম্ভ ও বিশাল শক্তির অধিকারী ‘আদ জাতিকে মূর্তিপূজা ত্যাগ করে এক আল্লাহর ইবাদত করার আহ্বান জানান।",
    lessons: [
      "শারীরিক শক্তি বা ধন-সম্পদের অহংকার মানুষকে ধ্বংসের মুখে ফেলে।",
      "কৃতজ্ঞ চিত্তে আল্লাহর শুকরিয়া আদায় করা।",
    ],
    orbitRadius: 240,
    orbitAngle: 170,
    elevation: 15,
  },
  {
    id: "saleh",
    nameBn: "হযরত সালেহ (আঃ)",
    nameAr: "صالح عليه السلام",
    titleBn: "সমূদ জাতির নবী • মুজিযার উষ্ট্রী",
    eraBn: "হিজর ও ওয়াদিউল কুরা",
    quranMentions: "কুরআনে ৯ বার উল্লেখ",
    keyTheme: "পাহাড় কেটে অট্টালিকা ও অলৌকিক উটনীর পরীক্ষা",
    summaryBn:
      "পাথর কেটে নির্মিত বিলাসবহুল দুর্গের অধিকারী সমূদ জাতিকে আল্লাহর বিধান মেনে চলার আহ্বান জানান। তাঁর নিদর্শন হিসেবে পাথর থেকে অলৌকিক উটনী প্রকাশ পেয়েছিল।",
    lessons: [
      "আল্লাহর নিদর্শনকে অসম্মান করার ভয়াবহ পরিণতি।",
      "অসৎ নেতৃত্বের অন্ধ আনুগত্য পরিহার করা।",
    ],
    orbitRadius: 240,
    orbitAngle: 230,
    elevation: -18,
  },
  {
    id: "ibrahim",
    nameBn: "হযরত ইব্রাহিম (আঃ)",
    nameAr: "إبراهيم عليه السلام",
    titleBn: "তাওহীদের পিতা • খলিলুল্লাহ",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ২০০০ অব্দ • বাবেল ও কেনান",
    quranMentions: "কুরআনে ৬৯ বার উল্লেখ",
    keyTheme: "নমরুদের অগ্নিকুণ্ডে বিজয়, কাবা পুনর্নির্মাণ ও আত্মসমর্পণ",
    summaryBn:
      "নক্ষত্র, চন্দ্র ও সূর্যের অসারতা প্রমাণ করে এক আল্লাহর তাওহীদের সন্ধান পান। অগ্নিকুণ্ডে নিক্ষিপ্ত হয়েও অবিচল থাকেন এবং আল্লাহর সন্তুষ্টির জন্য জীবনের সকল পরীক্ষায় উত্তীর্ণ হন।",
    lessons: [
      "যুক্তি ও প্রজ্ঞার সাথে অন্ধ কুসংস্কারের মোকাবিলা করা।",
      "আল্লাহর প্রতি নিরেট ভরসা ও সর্বোচ্চ আত্মত্যাগ।",
    ],
    orbitRadius: 240,
    orbitAngle: 290,
    elevation: 25,
  },

  // Outer Orbital Shell (Radius ~ 380px)
  {
    id: "ismail",
    nameBn: "হযরত ইসমাইল (আঃ)",
    nameAr: "إسماعيل عليه السلام",
    titleBn: "যবিহুল্লাহ • পিতা-পুত্রের পরম আনুগত্য",
    eraBn: "পবিত্র মক্কার জনশূন্য উপত্যকা",
    quranMentions: "কুরআনে ১২ বার উল্লেখ",
    keyTheme: "কোরবানির চিরন্তন আদর্শ, জমজম কূপ ও কাবা নির্মাণ",
    summaryBn:
      "পিতার স্বপ্ন বাস্তবায়নে সানন্দে নিজেকে কোরবানির জন্য সঁপে দিয়েছিলেন। পিতার সাথে যৌথভাবে পবিত্র কাবা গৃহের ভিত্তিপ্রস্তর স্থাপন করেন।",
    lessons: [
      "পিতামাতার প্রতি গভীর ভক্তি ও আল্লাহর আদেশে সম্পূর্ণ সমর্পণ।",
      "প্রতিশ্রুতি রক্ষায় অটল থাকা।",
    ],
    orbitRadius: 380,
    orbitAngle: 20,
    elevation: -30,
  },
  {
    id: "yusuf",
    nameBn: "হযরত ইউসুফ (আঃ)",
    nameAr: "يوسف عليه السلام",
    titleBn: "আহসানুল কাসাস • পবিত্রতা ও ক্ষমার পরাকাষ্ঠা",
    eraBn: "প্রাচীন মিসর ও ফিলিস্তিন",
    quranMentions: "কুরআনে ২৭ বার উল্লেখ",
    keyTheme: "কূপ ও কারাগারের অন্ধকারের পর মিসরের শাসন ও ক্ষমা",
    summaryBn:
      "ভাইদের ষড়যন্ত্রে অন্ধকূপে নিক্ষিপ্ত, কৃতদাস হিসেবে বিক্রি এবং অপবাদে দীর্ঘ কারাবাসের পর সততা ও জ্ঞানের গুণে মিসরের রাজপ্রাসাদের সর্বোচ্চ দায়িত্ব লাভ করেন।",
    lessons: [
      "প্রলোভন ও পাপের মুখে নিজের চরিত্র নির্মল রাখা।",
      "ক্ষমতা হাতে থাকা সত্ত্বেও চরম নির্যাতনকারীদের নিঃশর্ত ক্ষমা করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 75,
    elevation: 32,
  },
  {
    id: "ayyub",
    nameBn: "হযরত আইয়ুব (আঃ)",
    nameAr: "أيوب عليه السلام",
    titleBn: "সবর ও কৃতজ্ঞতার অনুপম প্রতীক",
    eraBn: "হওরান অঞ্চল, শাম",
    quranMentions: "কুরআনে ৪ বার উল্লেখ",
    keyTheme: "চরম শারীরিক অসুস্থতা ও সম্পদ হারানোর পরও প্রশংসামুখর",
    summaryBn:
      "ধন-সম্পদ, সন্তান ও সুস্বাস্থ্য সব হারিয়ে দীর্ঘ বছর দুঃসহ শারীরিক যন্ত্রণায় থেকেও এক মুহূর্তের জন্যও আল্লাহর রহমত থেকে নিরাশ হননি।",
    lessons: [
      "বিপদাপদে অভিযোগ না করে সবর ও দোয়ায় নিমগ্ন থাকা।",
      "আল্লাহর রহমত থেকে কখনোই নিরাশ না হওয়া।",
    ],
    orbitRadius: 380,
    orbitAngle: 130,
    elevation: -20,
  },
  {
    id: "yunus",
    nameBn: "হযরত ইউনুস (আঃ)",
    nameAr: "يونس عليه السلام",
    titleBn: "যুন-নূন • তাওবার অনন্য আলোকবর্তিকা",
    eraBn: "নিনেভে, প্রাচীন মেসোপটেমিয়া",
    quranMentions: "কুরআনে ৪ বার উল্লেখ",
    keyTheme: "মাছের পেটের গভীর অন্ধকারে দোয়ার শক্তি",
    summaryBn:
      "আল্লাহর অনুমতি ছাড়া প্রস্থান করার পর বিশাল তিমি মাছের পেটে প্রবেশ করেন। সেখানে তিন স্তরের অন্ধকারে তিনি দোয়ায়ে ইউনুসের মাধ্যমে মহান আল্লাহর তাসবীহ পাঠ করেন।",
    lessons: [
      "চরম সংকটকালেও তাওবা ও তাসবীহের শক্তি অপার।",
      "ধৈর্য ধারণ না করে দায়িত্ব ছেড়ে তাড়াহুড়ো না করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 185,
    elevation: 28,
  },
  {
    id: "musa",
    nameBn: "হযরত মূসা (আঃ)",
    nameAr: "موسى عليه السلام",
    titleBn: "কালিমুল্লাহ • তাওরাতের ধারক",
    eraBn: "আনুমানিক খ্রিস্টপূর্ব ১৩০০ অব্দ • মিসর ও সিনাই",
    quranMentions: "কুরআনে সর্বাধিক ১৩৬ বার উল্লেখ",
    keyTheme: "ফেরাউনের রাজপ্রাসাদ, লোহিত সাগর বিদীর্ণ ও প্রত্যক্ষ বাক্যালাপ",
    summaryBn:
      "তুর পাহাড়ে মহান আল্লাহর সাথে সরাসরি বাক্যালাপের অনন্য মর্যাদা পান। ফেরাউনের অহংকার চূর্ণ করে অত্যাচারিত বনী ইসরাঈলকে লোহিত সাগর পাড়ি দিয়ে মুক্তি দেন।",
    lessons: [
      "জালিমের যত সৈন্য ও শক্তিই থাকুক, আল্লাহর সাহায্যের সামনে তা ধূলিসাৎ।",
      "সত্যের পক্ষে নির্ভীক অবস্থান গ্রহণ করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 240,
    elevation: -25,
  },
  {
    id: "dawud",
    nameBn: "হযরত দাউদ (আঃ)",
    nameAr: "داود عليه السلام",
    titleBn: "যাবুরের ধারক • সুবিচারক বাদশাহ ও মধুর তাসবীহ",
    eraBn: "জেরুসালেম ও প্যালেস্টাইন",
    quranMentions: "কুরআনে ১৬ বার উল্লেখ",
    keyTheme: "জালুতের পরাজয়, লোহার নমনীয়তা ও পর্বত-পাখির তাসবীহ",
    summaryBn:
      "তাঁর সুমধুর কণ্ঠে আল্লাহর প্রশংসা শুনে পাহাড় ও উড়ন্ত পাখিরা সমস্বরে তাঁর সাথে জিকিরে যোগ দিত। তিনি একজন অপরাজেয় যোদ্ধা এবং সুবিচারক ন্যায়পরায়ণ বাদশাহ ছিলেন।",
    lessons: [
      "ক্ষমতা ও শাসনকে আল্লাহর ইবাদত ও সুবিচারের মাধ্যম বানানো।",
      "নিজ হাতে উপার্জন করে হালাল আহার গ্রহণ করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 295,
    elevation: 20,
  },
  {
    id: "sulaiman",
    nameBn: "হযরত সুলাইমান (আঃ)",
    nameAr: "سليمان عليه السلام",
    titleBn: "অতুলনীয় বাদশাহাত ও সৃষ্টির ওপর কর্তৃত্ব",
    eraBn: "জেরুসালেম • স্বর্ণযুগ",
    quranMentions: "কুরআনে ১৭ বার উল্লেখ",
    keyTheme: "বাতাস, জিন, পশু-পাখির ভাষা নিয়ন্ত্রণ ও বিনীত শুকরিয়া",
    summaryBn:
      "আল্লাহ তাঁকে পৃথিবীর ইতিহাসে সবচেয়ে বিস্ময়কর সাম্রাজ্য দান করেছিলেন। বাতাস, জিন জাতি এবং প্রাণিকুলের ভাষা বুঝতে ও নিয়ন্ত্রণ করতে পারতেন, তবুও তিনি সদা বিনীত ছিলেন।",
    lessons: [
      "বিশাল সম্পদ ও ক্ষমতা সত্ত্বেও আল্লাহর সামনে একান্ত বিনয়ী হওয়া।",
      "জ্ঞান ও ইনসাফের মাধ্যমে রাষ্ট্র পরিচালনা করা।",
    ],
    orbitRadius: 380,
    orbitAngle: 345,
    elevation: -15,
  },
  {
    id: "isa",
    nameBn: "হযরত ঈসা (আঃ)",
    nameAr: "عيسى عليه السلام",
    titleBn: "রুহুল্লাহ ও কালিমাতুল্লাহ • ইঞ্জিলের বাহক",
    eraBn: "নাসরত, জেরুসালেম • ১ম শতাব্দী",
    quranMentions: "কুরআনে ২৫ বার উল্লেখ",
    keyTheme: "পিতা ছাড়া অলৌকিক জন্ম, মৃতকে জীবনদান ও দ্বিতীয় আগমন",
    summaryBn:
      "মারইয়াম (আঃ)-এর গর্ভে আল্লাহর কুদরতি রুহ দ্বারা পিতার সংস্পর্শ ছাড়াই জন্মগ্রহণ করেন। দোলনায় কথা বলা, কুষ্ঠরোগী নিরাময় এবং মৃতকে জীবিত করার অলৌকিক ক্ষমতা লাভ করেছিলেন।",
    lessons: [
      "দুনিয়ার মোহমুক্ত সহজ-সরল ও আধ্যাত্মিক জীবনযাপন।",
      "মানুষের প্রতি গভীর মমতা ও ভালোবাসার মাধ্যমে সত্যের বার্তা পৌঁছানো।",
    ],
    orbitRadius: 380,
    orbitAngle: 155,
    elevation: 35,
  },
]

export function Prophets3DCosmos() {
  const [selectedProphet, setSelectedProphet] = useState<ProphetCosmosNode | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [zoom, setZoom] = useState(1.0)
  const [rotation, setRotation] = useState({ x: 12, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging) return

    const tick = () => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.18) % 360,
      }))
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isAutoRotating, isDragging])

  // Mouse drag handlers for multi-direction 3D movement
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setRotation((prev) => ({
      // Pitch (clamp between -60 and +60 to keep view balanced)
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.35)),
      // Yaw (360 continuous rotation)
      y: (prev.y + dx * 0.45) % 360,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => setIsDragging(false)

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0]!.clientX, y: e.touches[0]!.clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const dx = e.touches[0]!.clientX - dragStart.x
    const dy = e.touches[0]!.clientY - dragStart.y

    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.4)),
      y: (prev.y + dx * 0.5) % 360,
    }))

    setDragStart({ x: e.touches[0]!.clientX, y: e.touches[0]!.clientY })
  }

  const handleTouchEnd = () => setIsDragging(false)

  // Reset to Center
  const resetToCenter = () => {
    setRotation({ x: 12, y: 0 })
    setZoom(1.0)
    setSelectedProphet(PROPHETS_DATA[0] || null)
  }

  // Calculate 3D Cartesian coordinates (X, Y, Z) from spherical orbit
  const calculate3DPosition = useCallback(
    (orbitRadius: number, orbitAngleDeg: number, elevationDeg: number) => {
      if (orbitRadius === 0) return { x: 0, y: 0, z: 0 }

      const phi = (elevationDeg * Math.PI) / 180
      const theta = (orbitAngleDeg * Math.PI) / 180

      const x = orbitRadius * Math.cos(phi) * Math.sin(theta)
      const y = -orbitRadius * Math.sin(phi) // inverted Y for web space
      const z = orbitRadius * Math.cos(phi) * Math.cos(theta)

      return { x, y, z }
    },
    []
  )

  const centerProphet = PROPHETS_DATA[0]!

  return (
    <section className="relative my-12 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 p-4 text-white shadow-2xl transition-all duration-300 dark:border-neutral-800 sm:p-8">
      {/* Top Header & Interactive 3D Controls */}
      <div className="relative z-20 flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 animate-spin text-white" />
            <span>৩ডি বহুমুখী স্পেসিয়াল ক্যানভাস</span>
          </div>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
            নবীদের জীবনী — ৩ডি মহাকাশীয় আবর্তন
          </h2>

          <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
            কেন্দ্রে রয়েছেন বিশ্বনবী হযরত মুহাম্মদ ﷺ। মাউস দিয়ে টেনে যেকোনো দিকে ঘুরিয়ে নবীদের জীবনাদর্শ অন্বেষণ করুন।
          </p>
        </div>

        {/* 3D View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? "ঘূর্ণন থামান" : "স্বয়ংক্রিয় ঘূর্ণন চালু"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
          >
            {isAutoRotating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? "থামান" : "ঘুরান"}</span>
          </button>

          <button
            onClick={() => setZoom((prev) => Math.min(1.6, prev + 0.15))}
            title="জুম ইন"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setZoom((prev) => Math.max(0.65, prev - 0.15))}
            title="জুম আউট"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={resetToCenter}
            title="কেন্দ্রে রিসেট করুন"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white bg-white px-3 py-2 text-xs font-bold text-black transition hover:bg-neutral-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>কেন্দ্রে নবীজি ﷺ</span>
          </button>
        </div>
      </div>

      {/* Main 3D Spatial Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`perspective-1200 relative h-[520px] w-full select-none overflow-hidden cursor-grab active:cursor-grabbing sm:h-[620px]`}
        style={{ touchAction: "none" }}
      >
        {/* Subtle Background Celestial Grid & Rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-[280px] w-[280px] rounded-full border border-dashed border-neutral-500 animate-[spin_60s_linear_infinite]" />
          <div className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-neutral-600 animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute h-[760px] w-[760px] rounded-full border border-neutral-800" />
        </div>

        {/* The 3D Rotating World Matrix */}
        <div
          className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0 transition-transform duration-75 ease-out"
          style={{
            transform: `scale3d(${zoom}, ${zoom}, ${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* CENTER NODE: PROPHET MUHAMMAD ﷺ */}
          <div
            className="preserve-3d absolute -left-28 -top-28 z-30 flex h-56 w-56 flex-col items-center justify-center text-center"
            style={{
              transform: `translate3d(0px, 0px, 0px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
            }}
          >
            {/* Radiant Glowing Concentric Rings */}
            <div className="pointer-events-none absolute inset-0 -m-6 animate-pulse rounded-full border border-white/20" />
            <div className="pointer-events-none absolute inset-0 -m-12 animate-ping rounded-full border border-white/10 opacity-30 duration-1000" />

            <button
              onClick={() => setSelectedProphet(centerProphet)}
              className="group relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-white bg-black p-4 text-white shadow-[0_0_50px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-110 hover:border-white hover:shadow-[0_0_70px_rgba(255,255,255,0.6)]"
            >
              <div className="absolute -top-3 rounded-full border border-neutral-700 bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black shadow">
                কেন্দ্র • Center
              </div>

              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-neutral-200">
                مُحَمَّدٌ ﷺ
              </span>
              <span className="mt-1 text-xs font-bold text-neutral-100">
                হযরত মুহাম্মদ ﷺ
              </span>
              <span className="mt-0.5 text-[10px] text-neutral-400">
                রাহমাতুল্লিল আলামীন
              </span>

              <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-neutral-300 group-hover:text-white">
                <span>জীবনগাঁথা দেখুন</span>
                <ChevronRight className="h-2.5 w-2.5" />
              </div>
            </button>
          </div>

          {/* SURROUNDING ORBITAL PROPHETS */}
          {PROPHETS_DATA.slice(1).map((prophet) => {
            const { x, y, z } = calculate3DPosition(
              prophet.orbitRadius,
              prophet.orbitAngle,
              prophet.elevation
            )

            // Billboard effect: invert camera rotation so text always faces viewer
            const billboardTransform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`

            return (
              <div
                key={prophet.id}
                className="preserve-3d absolute -left-16 -top-16 z-20 h-32 w-32"
                style={{
                  transform: billboardTransform,
                }}
              >
                <button
                  onClick={() => setSelectedProphet(prophet)}
                  className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900/90 p-3 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:z-50 hover:scale-115 hover:border-white hover:bg-neutral-800 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  <span className="font-serif text-xs text-neutral-400 group-hover:text-neutral-200">
                    {prophet.nameAr}
                  </span>
                  <span className="mt-1 text-xs font-bold text-white group-hover:text-neutral-100">
                    {prophet.nameBn}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-[9px] text-neutral-400">
                    {prophet.titleBn.split("•")[0]}
                  </span>

                  <span className="mt-1.5 inline-flex items-center rounded-full border border-neutral-700 px-1.5 py-0.2 text-[8px] text-neutral-400 group-hover:border-neutral-500 group-hover:text-white">
                    বিস্তারিত &rarr;
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Drag Helper Guide Overlay on Bottom Left */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-[11px] text-neutral-400 backdrop-blur-sm">
          <span>মাউস বা স্পর্শ দিয়ে ৩৬০° কোণে ঘুরান • জুম করতে স্ক্রল করুন</span>
        </div>
      </div>

      {/* DETAILED PROPHET MODAL / DRAWER */}
      {selectedProphet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-neutral-700 bg-neutral-950 p-6 text-white shadow-2xl dark:border-neutral-700 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProphet(null)}
              className="absolute right-5 top-5 rounded-full border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-semibold text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>{selectedProphet.isCenter ? "সর্বশ্রেষ্ঠ ও সর্বশেষ নবী" : "পবিত্র কুরআনের মহান নবী"}</span>
            </div>

            {/* Prophet Names & Title */}
            <div className="mt-4">
              <p className="font-serif text-2xl text-neutral-400 sm:text-3xl">
                {selectedProphet.nameAr}
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {selectedProphet.nameBn}
              </h3>
              <p className="mt-1 text-sm font-semibold text-neutral-300">
                {selectedProphet.titleBn}
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="mt-4 grid grid-cols-1 gap-2 border-y border-neutral-800 py-3 sm:grid-cols-2 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-500">ঐতিহাসিক যুগ:</span> {selectedProphet.eraBn}
              </div>
              <div>
                <span className="text-neutral-500">কুরআনে উল্লেখ:</span> {selectedProphet.quranMentions}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                জীবনগাঁথা ও ভূমিকা
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {selectedProphet.summaryBn}
              </p>
            </div>

            {/* Key Life Lessons */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                আমাদের জীবনের শিক্ষা
              </h4>
              <ul className="mt-3 space-y-2">
                {selectedProphet.lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-xs text-neutral-200"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-white" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-neutral-800 pt-5">
              <button
                onClick={() => setSelectedProphet(null)}
                className="rounded-xl border border-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
              >
                বন্ধ করুন
              </button>

              <Link
                href="/stories"
                onClick={() => setSelectedProphet(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-neutral-200"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>সম্পূর্ণ কাহিনী পড়ুন</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
