import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 bg-emerald-600 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Got Scrap? Turn It Into Cash Today.
        </h2>
        <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
          Free doorstep pickup, certified digital weighing, transparent rates, and instant UPI
          payments. Join the Scrapix circular economy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/sell-scrap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-950 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition-all text-base hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Free Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-4 rounded-xl transition-all text-base"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-xs text-emerald-100/90 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Verified Background Checked
          </span>
          <span>•</span>
          <span>Zero Convenience Fee</span>
          <span>•</span>
          <span>Direct UPI Payout</span>
        </div>
      </div>
    </section>
  );
}
