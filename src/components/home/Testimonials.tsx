import React from "react";
import { Star, Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/data/mockData";

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
            Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Loved By 5,000+ Households
          </h2>
          <p className="text-slate-600 text-base">
            Read how everyday Indians are transforming clutter into clean homes and fast earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                  &quot;{t.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Earned</span>
                    <span className="text-xs font-bold text-emerald-700">{t.amountEarned}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          * Fictional customer names used for demonstration and testing.
        </p>
      </div>
    </section>
  );
}
