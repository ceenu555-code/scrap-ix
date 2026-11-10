import React from "react";
import { CheckCircle2, Calendar, Scale, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Select Your Scrap",
    description:
      "Choose from paper, plastics, metals, appliances, or e-waste and check live price estimates.",
    icon: CheckCircle2,
  },
  {
    step: "02",
    title: "Schedule Pickup",
    description:
      "Pick your preferred date and convenient 3-hour doorstep time slot in under a minute.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Weighing at Doorstep",
    description:
      "Our verified collector arrives with certified digital weighing scales for 100% transparent measurement.",
    icon: Scale,
  },
  {
    step: "04",
    title: "Get Paid Instantly",
    description:
      "Receive payment right away at your doorstep via UPI, cash, or direct IMPS bank transfer.",
    icon: Wallet,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Scrapix Works
          </h2>
          <p className="text-slate-600 text-base">
            No more haggling with unverified hawkers. Experience effortless scrap selling with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600">
                  <span>Seamless Experience</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/sell-scrap"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <span>Book Your First Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
