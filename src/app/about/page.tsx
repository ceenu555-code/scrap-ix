import React from "react";
import Link from "next/link";
import {
  Recycle,
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Leaf,
  Globe2,
  Scale,
  Award,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            <Recycle className="w-3.5 h-3.5" />
            Our Journey &amp; Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Transforming Indian Waste into Valuable Resources
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            SCRAPIX is on a mission to formalize, digitize, and green India&apos;s
            multi-billion dollar scrap recycling market through technology, integrity, and trust.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To empower every Indian household and business to declutter responsibly by
                providing transparent, doorstep scrap collection with certified electronic
                weighing, equitable pricing, and immediate digital payments.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To build India&apos;s leading tech-driven circular economy platform where zero
                recyclable material reaches landfills, driving sustainability, job dignity for
                waste collectors, and measurable carbon offsets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Recycling Matters */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              The Environmental Imperative
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Why Recycling Matters</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              India generates over 62 million tons of solid waste annually. Here is how your
              doorstep scrap selling makes a measurable difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Conserves Forests &amp; Water</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Recycling 1 ton of paper saves up to 17 mature trees and over 26,000 liters of
                water compared to virgin pulp manufacturing.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Massive Energy Savings</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Recycled aluminium uses 95% less energy than mining and smelting bauxite ore,
                significantly curbing industrial greenhouse emissions.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Safe Toxin Containment</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                E-waste and old appliances contain heavy metals (lead, cadmium, CFC refrigerants).
                Our authorized recyclers capture and treat these hazardous toxins safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Recycling & Commitment */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Responsible Recycling
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Our Uncompromising Commitment to Customers &amp; Planet
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We believe that recycling should never come at the cost of honesty or customer
                comfort. When you schedule a pickup with Scrapix, you get:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Tamper-proof digital weight measurement right in front of your eyes.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Transparent, benchmarked prices published online with zero hidden costs.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Polite, verified, uniform-clad collection partners with valid ID cards.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Direct supply to Pollution Control Board approved recycling facilities.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/sell-scrap"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-sm"
                >
                  <span>Book Your Scrap Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900">How Scrapix Works</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By bridging consumers and certified recycling mills through smart routing and
                transparent digital ledgers, Scrapix eliminates unfair middlemen, passes maximum
                monetary value to homeowners, and guarantees that collected recyclables are genuinely
                reprocessed into fresh products.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-semibold space-y-1">
                <p className="font-bold">SCRAPIX Tagline:</p>
                <p className="text-base italic text-emerald-800 font-bold">
                  &quot;Your Scrap. Our Responsibility.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
