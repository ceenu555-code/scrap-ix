import React from "react";
import {
  Scale,
  ShieldCheck,
  Zap,
  Leaf,
  Clock,
  BadgeIndianRupee,
} from "lucide-react";

const FEATURES = [
  {
    title: "Transparent Pricing",
    description:
      "All scrap rates are published online with zero hidden deductions or surprise bargaining at the doorstep.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Digital Weighing",
    description:
      "Every pickup is weighed using government-certified, tamper-proof electronic scales accurate to 10 grams.",
    icon: Scale,
  },
  {
    title: "Verified Pickup Partners",
    description:
      "Our scrap collectors undergo rigorous identity checks, police verification, and safety training.",
    icon: ShieldCheck,
  },
  {
    title: "Doorstep Service",
    description:
      "No hauling heavy junk to roadside scrap yards. We pick up straight from your house, flat, or warehouse.",
    icon: Clock,
  },
  {
    title: "Fast Payment",
    description:
      "Get paid the exact weighed amount right in front of you via instant UPI (PhonePe, GPay, Paytm) or cash.",
    icon: Zap,
  },
  {
    title: "Responsible Recycling",
    description:
      "Your scrap is supplied directly to pollution-board authorized recycling facilities, minimizing landfill waste.",
    icon: Leaf,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
            Trust &amp; Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why Choose Scrapix?
          </h2>
          <p className="text-slate-400 text-base">
            We are transforming India&apos;s unorganized scrap ecosystem into a modern,
            dignified, and eco-friendly circular service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
