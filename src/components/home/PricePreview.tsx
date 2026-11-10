"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const POPULAR_RATES = [
  { name: "Newspaper (Raddi)", rate: "₹15/kg", category: "Paper", popular: true },
  { name: "Cardboard (Cartons)", rate: "₹10/kg", category: "Cardboard", popular: true },
  { name: "Iron (Loha)", rate: "₹30/kg", category: "Metal", popular: true },
  { name: "Steel (Stainless)", rate: "₹35/kg", category: "Metal", popular: false },
  { name: "Aluminium", rate: "₹120/kg", category: "Metal", popular: true },
  { name: "Copper Wire", rate: "₹650/kg", category: "Metal", popular: true },
  { name: "Brass (Pital)", rate: "₹420/kg", category: "Metal", popular: false },
  { name: "Plastic Bottles (PET)", rate: "₹20/kg", category: "Plastic", popular: true },
  { name: "Hard Plastic", rate: "₹18/kg", category: "Plastic", popular: false },
  { name: "E-Waste / Laptops", rate: "Price after inspection", category: "Electronics", special: true },
  { name: "Old AC / Fridge", rate: "Price after inspection", category: "Appliances", special: true },
];

export function PricePreview() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Live Indicative Market Rates
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Transparent Scrap Pricing
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              We ensure fair, benchmarked scrap prices. Digital weighing scales mean you get paid
              for every single gram.
            </p>
          </div>

          <Link
            href="/scrap-prices"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm bg-emerald-50 hover:bg-emerald-100/70 px-5 py-3 rounded-xl border border-emerald-200 transition-all self-start md:self-auto"
          >
            <span>View All Scrap Prices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {POPULAR_RATES.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                item.special
                  ? "bg-slate-900 text-white border-slate-800"
                  : "bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.special
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {item.category}
                </span>
                {item.popular && (
                  <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3 fill-current" /> Hot
                  </span>
                )}
              </div>

              <h3
                className={`font-bold text-sm sm:text-base leading-snug truncate ${
                  item.special ? "text-white" : "text-slate-800"
                }`}
              >
                {item.name}
              </h3>

              <div className="mt-3 pt-3 border-t border-slate-200/50 flex items-baseline justify-between">
                <span
                  className={`text-lg sm:text-xl font-black ${
                    item.special ? "text-emerald-400 text-sm font-bold" : "text-emerald-700"
                  }`}
                >
                  {item.rate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> Prices are indicative and may vary slightly based on
            location, scrap quality, quantity, and daily wholesale commodity market conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
