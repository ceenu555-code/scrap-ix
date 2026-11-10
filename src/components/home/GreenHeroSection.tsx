"use client";

import React from "react";
import Link from "next/link";
import { Award, Leaf, Calendar, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

const HEROES = [
  {
    name: "Dharmendra",
    role: "Lead Field Collector • South Delhi",
    metric: "2,480 kg",
    label: "Recycled this month",
    badge: "1st Place Champion",
    bgColor: "from-amber-500/10 to-emerald-500/10",
    borderColor: "border-amber-300",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    name: "Bikkie",
    role: "Senior Pickup Partner • West Delhi",
    metric: "1,940 kg",
    label: "Recycled this month",
    badge: "Speed & Accuracy Hero",
    bgColor: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-300",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    name: "Vikas",
    role: "Appliance & E-Waste Specialist • Gurugram",
    metric: "1,820 kg",
    label: "Recycled this month",
    badge: "Customer Delight Star",
    bgColor: "from-teal-500/10 to-sky-500/10",
    borderColor: "border-teal-300",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
  },
];

export function GreenHeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Spotlight on Our Frontline Heroes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Congratulations to Our Green Super Heroes of the Month 🌱
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our Green Super Heroes are the backbone of SCRAPIX&apos;s recycling mission.
            Each month we celebrate the pickers who make the biggest recycling impact and deliver five-star service at your doorstep.
          </p>
        </div>

        {/* 3 Heroes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {HEROES.map((h, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 bg-gradient-to-br ${h.bgColor} bg-white border ${h.borderColor} shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${h.badgeColor}`}>
                    {h.badge}
                  </span>
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    {h.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900">{h.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{h.role}</p>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-3.5 border border-slate-200/80 mb-2">
                  <div className="text-2xl font-black text-emerald-700">{h.metric}</div>
                  <div className="text-xs text-slate-500 font-medium">{h.label}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified • Trained • ISO Digital Weighing</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 text-center bg-emerald-900 text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-black">Let&apos;s fix the environment together.</h3>
            <p className="text-emerald-200 text-sm">
              Schedule your first pickup today • Customer Support Available 9AM - 7PM
            </p>
          </div>
          <Link
            href="/sell-scrap"
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule a Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}