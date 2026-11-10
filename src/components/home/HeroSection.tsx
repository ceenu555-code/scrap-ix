import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Zap,
  Leaf,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/20 via-teal-100/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>India&apos;s Modern Doorstep Scrap &amp; Recycling Partner</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Turn Your Scrap Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              Instant Cash
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sell your recyclable waste from the comfort of your home. Schedule a doorstep
            pickup and get transparent pricing for your scrap.
          </p>

          {/* Primary / Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/sell-scrap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all text-base hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              Book Scrap Pickup
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scrap-prices"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-4 rounded-xl border border-slate-300 shadow-sm hover:border-emerald-300 transition-all text-base"
            >
              Check Scrap Prices
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Doorstep Pickup</h4>
                <p className="text-[11px] text-slate-500">Free home collection</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Transparent Pricing</h4>
                <p className="text-[11px] text-slate-500">Live indexed rates</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Verified Collectors</h4>
                <p className="text-[11px] text-slate-500">Trained &amp; background checked</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Responsible Recycling</h4>
                <p className="text-[11px] text-slate-500">Zero landfill mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
