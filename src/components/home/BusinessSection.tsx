"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Scale,
  Award,
} from "lucide-react";

export function BusinessSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching ScrapUncle */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            Tailored Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Households &amp; Businesses have different needs, and we cater to each of them
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whether clearing clutter from a residential apartment or offloading corporate IT and industrial scrap, SCRAPIX offers specialized workflows.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Household Card */}
          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 rounded-3xl p-8 border border-emerald-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Residential
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">
                For Households
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Effortless doorstep scrap clearance for families, individuals, and residential societies.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-slate-900 block">On-Demand Doorstep Pickups</strong>
                    <span className="text-xs text-slate-500">Pick any date and 2-hour slot that fits your schedule.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-slate-900 block">Accurate Digital Weighing</strong>
                    <span className="text-xs text-slate-500">Certified ISO digital scales; zero guesswork or hawker tricks.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-slate-900 block">Safety (Trained &amp; Verified Staff)</strong>
                    <span className="text-xs text-slate-500">Police-verified, uniformed staff with official company badges.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-slate-900 block">Instant Spot Payment</strong>
                    <span className="text-xs text-slate-500">Immediate UPI, GooglePay, PhonePe, or cash before crew departs.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200">
              <Link
                href="/sell-scrap"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Schedule Household Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Business Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Commercial &amp; Enterprise
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                For Businesses
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Comprehensive scrap management, IT asset disposition, factory offcuts, and compliance certificates.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-white block">Formal Payments &amp; Documentation</strong>
                    <span className="text-xs text-slate-400">Formal GST invoices, weighbridge slips, and bank IMPS settlements.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-white block">Sustainability Reports</strong>
                    <span className="text-xs text-slate-400">Detailed ESG reports with carbon emissions and trees saved metrics.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-white block">Competitive Bulk Prices</strong>
                    <span className="text-xs text-slate-400">Higher volume tier pricing for factory scrap, e-waste, and office de-cluttering.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-white block">EPR Compliance &amp; Green Certificate</strong>
                    <span className="text-xs text-slate-400">Official Extended Producer Responsibility destruction certificates for audits.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800">
              <Link
                href="/business"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 font-black px-6 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Request Business Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}