"use client";

import React from "react";
import { Calendar, Scale, Wallet, ArrowRight, CheckCircle2, Recycle } from "lucide-react";
import Link from "next/link";

const THREE_STEPS = [
  {
    step: "Step 1",
    title: "Schedule Pickup",
    description:
      "Choose your preferred pickup date, 2-hour doorstep arrival slot, and select scrap items online in under 60 seconds.",
    icon: Calendar,
    accent: "bg-emerald-500",
  },
  {
    step: "Step 2",
    title: "Our Trained Crew Collects Scrap From Your Doorstep",
    description:
      "Our verified, uniform-wearing crew arrives at your home with certified digital weighing scales. 100% transparent measurement in front of your eyes.",
    icon: Scale,
    accent: "bg-teal-600",
  },
  {
    step: "Step 3",
    title: "Get Instant Payment Before We Leave!",
    description:
      "Receive payment right away via UPI (Google Pay, PhonePe, Paytm), cash, or bank transfer before our crew exits your gate.",
    icon: Wallet,
    accent: "bg-emerald-700",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching ScrapUncle */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-flex items-center gap-1.5">
            <Recycle className="w-3.5 h-3.5 text-emerald-600" />
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Best Value for your Scrap in 3 simple steps
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From Pickup to Recycling: The SCRAPIX Circular Journey ensures safe, convenient, and rewarding scrap disposal.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {THREE_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {s.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl ${s.accent} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 leading-snug mb-3">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Zero Deduction</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/sell-scrap"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all text-base"
          >
            <span>Book Your Free Pickup Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}