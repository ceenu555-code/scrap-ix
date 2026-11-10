"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Filter,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Scale,
  Calendar,
  Layers,
} from "lucide-react";
import { getScrapItems } from "@/lib/storage";
import { ScrapItem, ScrapCategoryType } from "@/types";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Recyclables" },
  { id: "paper", label: "Paper" },
  { id: "plastic", label: "Plastic" },
  { id: "metal", label: "Metal" },
  { id: "electronics", label: "Electronics" },
  { id: "appliances", label: "Appliances" },
  { id: "cardboard", label: "Cardboard" },
];

export default function ScrapPricesPage() {
  const [items, setItems] = useState<ScrapItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setItems(getScrapItems());
    const handleUpdate = () => setItems(getScrapItems());
    window.addEventListener("scrapix-storage-update", handleUpdate);
    return () => window.removeEventListener("scrapix-storage-update", handleUpdate);
  }, []);

  const filteredItems = items.filter((item) => {
    if (!item.isActive) return false;
    const matchesCategory =
      selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            Transparent Benchmark Rates
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Today&apos;s Scrap Prices in India
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Check transparent, wholesale-indexed scrap prices before scheduling your doorstep
            pickup. We ensure certified digital weighing for every item.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search scrap item (e.g. Copper, Newspaper, Old AC, Bottles)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Action Button */}
            <Link
              href="/sell-scrap"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md shrink-0"
            >
              <Calendar className="w-4 h-4" />
              Schedule Scrap Pickup
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-4 px-1">
          <span>
            Showing {filteredItems.length} {filteredItems.length === 1 ? "rate" : "rates"}
          </span>
          <span>Updated daily based on Indian commodity benchmarks</span>
        </div>

        {/* Prices Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8">
            <p className="text-base font-bold text-slate-700">No scrap items match your search.</p>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for &quot;Paper&quot;, &quot;Iron&quot;, &quot;Plastic&quot;, or &quot;AC&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {item.categoryId}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Per {item.unit}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">{item.name}</h3>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                    {item.description || "Acceptable clean recyclable scrap."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-slate-500 font-medium">Rate</span>
                    {item.isInspectionRequired ? (
                      <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Price after inspection
                      </span>
                    ) : (
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-700 font-mono">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          /{item.unit}
                        </span>
                      </div>
                    )}
                  </div>

                  {item.indicativeNote && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg mb-3 italic">
                      {item.indicativeNote}
                    </p>
                  )}

                  <Link
                    href={`/sell-scrap?item=${item.id}&cat=${item.categoryId}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <span>Sell This Scrap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Indicative Disclaimer Alert */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Pricing Disclaimer &amp; Quality Guidelines
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              All prices displayed above are indicative sample rates based on prevailing Indian
              wholesale market conditions. The actual payout is determined at your doorstep by our
              verified collectors using certified digital scales. For electronics and appliances,
              pricing depends on physical condition, working status, and brand model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
