"use client";

import React from "react";
import { Star, Quote, Heart, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    name: "Sheeba Bhatnagar",
    city: "New Delhi",
    review:
      "Quick and easy. Sometimes the pickup can be delayed slightly during peak traffic, but they do get it done. The team is super helpful, polite, and transparent. I much prefer dealing with SCRAPIX rather than local unorganized dealers.",
    rating: 5,
    tag: "Doorstep Pickup",
  },
  {
    name: "Pooja",
    city: "Gurugram",
    review:
      "I used SCRAPIX for fridge and microwave pickup and the experience was good. Pickup was on time and the staff behaved politely. The price was exactly as shown on the website without hidden charges. Overall service was smooth and convenient.",
    rating: 5,
    tag: "Appliance Recycling",
  },
  {
    name: "Mridul Sah",
    city: "Noida",
    review:
      "SCRAPIX provides excellent service with timely pickup and fair pricing. The staff is polite, professional, and the entire process is smooth and hassle-free. It’s a very convenient and eco-friendly way to dispose of scrap. Highly recommended!",
    rating: 5,
    tag: "Paper & Metal Scrap",
  },
  {
    name: "Preeti Verma",
    city: "Bengaluru",
    review:
      "Hassle-free good experience with SCRAPIX. Home pickup service is very convenient, and a great initiative to save the environment from landfill waste. Accurate digital weighing scales give full peace of mind. Will surely recommend to others.",
    rating: 5,
    tag: "Green Hero",
  },
  {
    name: "Parul Chadha",
    city: "South Delhi",
    review:
      "The process of booking a pickup was simple and convenient. The team arrived on time, handled the old electronics professionally, and the weighing process was completely transparent. Payment was made promptly via UPI before they left.",
    rating: 5,
    tag: "Instant UPI Payment",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-current" />
            Loved by Millions of Green Heroes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Also loved by millions of green heroes.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Contribute to making your environment vibrant and sustainable. Read genuine stories from households across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {r.tag}
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                  &quot;{r.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{r.name}</h4>
                  <span className="text-xs text-slate-500">{r.city}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified User</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}