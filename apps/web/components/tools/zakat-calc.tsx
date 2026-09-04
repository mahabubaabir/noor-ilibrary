"use client"

import React, { useState, useMemo } from "react"
import {
  Calculator,
  Coins,
  DollarSign,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import {
  DEFAULT_NISAB_GOLD_GRAMS,
  DEFAULT_NISAB_SILVER_GRAMS,
  DEFAULT_GOLD_PRICE_PER_GRAM_BDT,
  DEFAULT_SILVER_PRICE_PER_GRAM_BDT,
  calculateZakat,
} from "@/lib/islamic-tools"

export function ZakatCalculatorWidget() {
  const [nisabStandard, setNisabStandard] = useState<"silver" | "gold">("silver")
  const [goldPricePerGram, setGoldPricePerGram] = useState(DEFAULT_GOLD_PRICE_PER_GRAM_BDT)
  const [silverPricePerGram, setSilverPricePerGram] = useState(DEFAULT_SILVER_PRICE_PER_GRAM_BDT)

  // Asset inputs
  const [cashInHand, setCashInHand] = useState("")
  const [bankSavings, setBankSavings] = useState("")
  const [goldValue, setGoldValue] = useState("")
  const [silverValue, setSilverValue] = useState("")
  const [businessStock, setBusinessStock] = useState("")
  const [investments, setInvestments] = useState("")
  const [debtsOwedToYou, setDebtsOwedToYou] = useState("")

  // Deductions
  const [shortTermDebts, setShortTermDebts] = useState("")

  // Nisab threshold calculation
  const currentNisabThreshold = useMemo(() => {
    if (nisabStandard === "silver") {
      return DEFAULT_NISAB_SILVER_GRAMS * silverPricePerGram
    }
    return DEFAULT_NISAB_GOLD_GRAMS * goldPricePerGram
  }, [nisabStandard, silverPricePerGram, goldPricePerGram])

  const zakatResult = useMemo(() => {
    return calculateZakat({
      cashInHand: parseFloat(cashInHand) || 0,
      bankSavings: parseFloat(bankSavings) || 0,
      goldValue: parseFloat(goldValue) || 0,
      silverValue: parseFloat(silverValue) || 0,
      businessStock: parseFloat(businessStock) || 0,
      investments: parseFloat(investments) || 0,
      debtsOwedToYou: parseFloat(debtsOwedToYou) || 0,
      shortTermDebts: parseFloat(shortTermDebts) || 0,
      nisabThreshold: currentNisabThreshold,
    })
  }, [
    cashInHand,
    bankSavings,
    goldValue,
    silverValue,
    businessStock,
    investments,
    debtsOwedToYou,
    shortTermDebts,
    currentNisabThreshold,
  ])

  const formatCurrency = (amount: number) => {
    return "৳ " + amount.toLocaleString("bn-BD", { maximumFractionDigits: 2 })
  }

  return (
    <div className="space-y-8">
      {/* Nisab Basis Standard Card */}
      <div className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/90 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              নিসাব নির্ধারণ পদ্ধতি (Nisab Standard)
            </h3>
            <p className="text-xs text-stone-500">
              বেশিরভাগ উলামায়ে কেরামের মতে গরিবদের কল্যাণে রূপার নিসাবকে ভিত্তি ধরা উত্তম।
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-100 p-1.5 dark:border-neutral-800 dark:bg-neutral-900">
            <button
              onClick={() => setNisabStandard("silver")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                nisabStandard === "silver"
                  ? "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-black"
                  : "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              রৌপ্য নিসাব ({DEFAULT_NISAB_SILVER_GRAMS} গ্রাম)
            </button>
            <button
              onClick={() => setNisabStandard("gold")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                nisabStandard === "gold"
                  ? "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-black"
                  : "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              স্বর্ণ নিসাব ({DEFAULT_NISAB_GOLD_GRAMS} গ্রাম)
            </button>
          </div>
        </div>

        {/* Current Live Nisab Threshold Banner */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Coins className="h-5 w-5 text-neutral-900 dark:text-white" />
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">
                বর্তমান নিসাব থ্রেশহোল্ড ({nisabStandard === "silver" ? "রূপা" : "সোনা"})
              </p>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                সম্পদ এই পরিমাণের সমপরিমাণ বা বেশি হলে ২.৫% যাকাত প্রযোজ্য হবে
              </p>
            </div>
          </div>
          <span className="text-lg font-black text-neutral-900 dark:text-white font-mono">
            {formatCurrency(currentNisabThreshold)}
          </span>
        </div>
      </div>

      {/* Two Column Layout: Asset Inputs & Live Result */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Form: Inputs */}
        <div className="space-y-6 lg:col-span-7">
          {/* Zakatable Assets */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
            <h3 className="mb-4 text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-neutral-900 dark:text-white" />
              যাকাতযোগ্য সম্পদের বিবরণ (Zakatable Assets)
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  নগদ টাকা (হাতে বা বাড়িতে থাকা ক্যাশ)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={cashInHand}
                    onChange={(e) => setCashInHand(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  ব্যাংক ব্যালেন্স ও সঞ্চয়পত্র
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={bankSavings}
                    onChange={(e) => setBankSavings(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    স্বর্ণালংকারের বাজারমূল্য
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={goldValue}
                      onChange={(e) => setGoldValue(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    রৌপ্যালংকারের বাজারমূল্য
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={silverValue}
                      onChange={(e) => setSilverValue(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  ব্যবসায়িক পণ্যসামগ্রী ও ইনভেন্টরি
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={businessStock}
                    onChange={(e) => setBusinessStock(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    শেয়ার ও লাভজনক বিনিয়োগ
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={investments}
                      onChange={(e) => setInvestments(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    প্রাপ্য পাওনা টাকা (পাওনা ফেরতযোগ্য)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={debtsOwedToYou}
                      onChange={(e) => setDebtsOwedToYou(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deductible Liabilities */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
            <h3 className="mb-4 text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-neutral-500" />
              কর্তনযোগ্য দেনা ও বকেয়া (Deductible Liabilities)
            </h3>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                তাৎক্ষণিক পরিশোধযোগ্য ঋণ ও চলতি মাসের বকেয়া
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-400">৳</span>
                <input
                  type="number"
                  placeholder="0"
                  value={shortTermDebts}
                  onChange={(e) => setShortTermDebts(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-4 text-xs font-bold focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white transition-colors"
                />
              </div>
              <p className="mt-1 text-[11px] text-neutral-500">
                দীর্ঘমেয়াদী ঋণের কেবল চলতি বছরের কিস্তি বা তাৎক্ষণিক দেনা বাদ দেওয়া যাবে।
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Zakat Result & Breakdown */}
        <div className="space-y-6 lg:col-span-5">
          {/* Summary Calculation Card */}
          <div className="sticky top-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition-all dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-neutral-900 dark:text-white" />
              যাকাত হিসাব বিবরণী (Summary)
            </h3>

            <div className="mt-6 space-y-3.5 border-b border-neutral-200 pb-6 dark:border-neutral-800 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">মোট সম্পদ (Gross Assets):</span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(zakatResult.totalAssets)}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                <span>ঋণ ও দেনা কর্তন (Deductions):</span>
                <span className="font-bold">- {formatCurrency(parseFloat(shortTermDebts) || 0)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-200 pt-2 font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
                <span>যাকাতযোগ্য নিট সম্পদ (Net Wealth):</span>
                <span className="text-neutral-900 dark:text-white font-mono">
                  {formatCurrency(zakatResult.netWealth)}
                </span>
              </div>
            </div>

            {/* Eligibility & Payable Output */}
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              {zakatResult.isEligible ? (
                <>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 dark:text-white">
                    <CheckCircle2 className="h-4 w-4" /> আপনার ওপর যাকাত ফরজ
                  </span>
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500">প্রদেয় যাকাত (২.৫%):</p>
                    <p className="text-3xl font-black text-neutral-900 dark:text-white mt-1 font-mono">
                      {formatCurrency(zakatResult.zakatPayable)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <Info className="h-4 w-4" /> সম্পদ নিসাব পরিমাণ স্পর্শ করেনি
                  </span>
                  <p className="mt-2 text-xs text-neutral-500">
                    নিসাব থ্রেশহোল্ড ({formatCurrency(currentNisabThreshold)}) পূর্ণ না হওয়ায় যাকাত ওয়াজিব নয়।
                  </p>
                </>
              )}
            </div>

            {/* Quranic Verse */}
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-[11px] leading-relaxed text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              &ldquo;এবং তোমরা সালাত কায়েম কর ও যাকাত আদায় কর; যে নেক কাজ তোমরা নিজেদের জন্য পূর্বে পাঠাবে, তা আল্লাহর কাছে পাবে।&rdquo; (সূরা বাক্বারাহ: ১১০)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
