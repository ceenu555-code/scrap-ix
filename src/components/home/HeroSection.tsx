"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Calendar,
  Sparkles,
  Smartphone,
  Star,
  Tv,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/20 via-teal-100/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Rating & Shark Tank Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>★ 4.8 | 1.3M Users</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
              <Tv className="w-4 h-4 text-emerald-700" />
              <span>Funded on Shark Tank India</span>
            </div>
          </div>

          {/* Main Headline (ScrapUncle matching) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Sell Recyclables{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              Online!
            </span>
          </h1>

          {/* Value Prop Subtitle */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-emerald-800 font-extrabold text-lg sm:text-xl lg:text-2xl">
            <span className="bg-emerald-100 px-3 py-1 rounded-lg">Schedule</span>
            <span className="text-emerald-400">➔</span>
            <span className="bg-emerald-100 px-3 py-1 rounded-lg">We Collect</span>
            <span className="text-emerald-400">➔</span>
            <span className="bg-emerald-100 px-3 py-1 rounded-lg">You Get Paid Instantly</span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Doorstep scrap collection with certified ISO digital weighing scales, 100% transparent live pricing, and instant UPI or cash payment before we leave your home.
          </p>

          {/* Primary / Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/sell-scrap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all text-base hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#rates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-4 rounded-xl border border-slate-300 shadow-sm hover:border-emerald-300 transition-all text-base"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Check Popular Rates</span>
            </a>

            <Link
              href="/scrap-prices"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl transition-all text-base shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>or Download App</span>
            </Link>
          </div>

          {/* Trust Indicators (4-pillar) */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Doorstep Pickup</h4>
                <p className="text-[11px] text-slate-500">Free home collection</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Digital Weighing</h4>
                <p className="text-[11px] text-slate-500">Certified digital scales</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Verified Crew</h4>
                <p className="text-[11px] text-slate-500">Police-verified staff</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Instant Payment</h4>
                <p className="text-[11px] text-slate-500">UPI / Cash on spot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}