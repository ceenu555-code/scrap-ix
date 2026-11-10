"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

const POPULAR_RATES = [
  { name: "Newspaper", rate: "₹11/kg", category: "Paper", popular: true },
  { name: "Clothes", rate: "₹4/kg", category: "Fabric", popular: false },
  { name: "Window / Split AC (2 Ton)", rate: "₹7,100/pc", category: "Appliances", popular: true },
  { name: "Bike", rate: "₹2,500/pc", category: "Vehicle", popular: true },
  { name: "UPS", rate: "₹180/pc", category: "Electronics", popular: false },
  { name: "Computer CPU", rate: "₹400/pc", category: "Electronics", popular: true },
  { name: "Iron (Loha)", rate: "₹30/kg", category: "Metal", popular: true },
  { name: "Cardboard (Carton)", rate: "₹12/kg", category: "Paper", popular: true },
  { name: "Copper Wire", rate: "₹650/kg", category: "Metal", popular: true },
  { name: "Brass (Pital)", rate: "₹420/kg", category: "Metal", popular: false },
  { name: "Aluminium", rate: "₹120/kg", category: "Metal", popular: false },
  { name: "PET Plastic Bottles", rate: "₹20/kg", category: "Plastic", popular: false },
];

export function PricePreview() {
  return (
    <section id="rates" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Popular Rates
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Best Value For Your Scrap
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              We provide benchmarked prices updated daily. Certified digital weighing ensures you are paid accurately for every single gram.
            </p>
          </div>

          <Link
            href="/scrap-prices"
            className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-900 font-black text-sm bg-emerald-100 hover:bg-emerald-200/80 px-6 py-3.5 rounded-xl border border-emerald-300 transition-all self-start md:self-auto shadow-xs"
          >
            <span>View All Scrap Rates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pricing Cards Grid (12 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {POPULAR_RATES.map((item, idx) => (
            <Link
              key={idx}
              href="/scrap-prices"
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {item.category}
                  </span>
                  {item.popular && (
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 fill-current" /> Hot
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-baseline justify-between">
                <span className="text-xl font-black text-emerald-700">
                  {item.rate}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-600 flex items-center gap-0.5 font-medium">
                  Sell <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footnote matching ScrapUncle */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-700">
              * Rates vary according to area and market fluctuations.
            </span>
          </div>
          <Link
            href="/scrap-prices"
            className="text-emerald-700 hover:text-emerald-900 font-bold underline shrink-0"
          >
            See Full Category Price List &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}