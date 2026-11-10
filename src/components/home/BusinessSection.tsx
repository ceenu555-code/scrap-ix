import React from "react";
import Link from "next/link";
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";

const TARGET_BUSINESSES = [
  "Corporate Offices",
  "Schools & Colleges",
  "Apartment Societies (RWAs)",
  "Hotels & Restaurants",
  "Manufacturing Factories",
  "Retail Stores & Malls",
  "Logistics Warehouses",
];

export function BusinessSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/50 px-3 py-1.5 rounded-full border border-emerald-600/40">
                <Building2 className="w-3.5 h-3.5" />
                Enterprise &amp; Commercial Scrap
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Bulk Scrap Collection for Businesses
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                End-to-end commercial waste management with certified weighbridge receipts,
                transparent GST billing, secure data destruction for IT assets, and Green Recycling Certificates.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {TARGET_BUSINESSES.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/business"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg transition-all text-base"
                >
                  <span>Request Business Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>GST Billing &amp; Green Certificate</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="font-bold text-lg text-white">Why Indian Enterprises Partner With Us</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Scheduled recurring pickups (Weekly, Bi-weekly, Monthly).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Certified certificate of safe e-waste and document destruction.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>High-volume weighbridge logistics for 500 kg to 50 tons.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Dedicated corporate relationship manager &amp; direct NEFT payouts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
