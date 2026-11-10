import React from "react";
import { IMPACT_METRICS } from "@/data/mockData";
import { Leaf, Info } from "lucide-react";

export function ImpactMetrics() {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-3.5 py-1.5 rounded-full border border-emerald-700/50">
            <Leaf className="w-4 h-4" />
            Environmental Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            &quot;Together, We Can Keep Recyclable Waste Out of Landfills.&quot;
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Every kilogram of paper, iron, or plastic you recycle saves trees, conserves precious
            energy, and directly reduces carbon emissions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_METRICS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 font-mono tracking-tight block">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1 block">
                {stat.label}
              </span>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>* Demonstration statistics reflecting initial pilot operations in Bengaluru &amp; Delhi NCR.</span>
        </div>
      </div>
    </section>
  );
}
