import React from "react";
import Link from "next/link";
import { Recycle, ArrowRight, Home, Calendar, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Recycle className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lost in the Recycling Stream?
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            The page you are looking for might have been moved, recycled, or does not exist. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/sell-scrap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3 rounded-xl border border-slate-300 text-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Scrap Pickup</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-200/80">
          <Link
            href="/track-pickup"
            className="text-xs font-semibold text-emerald-700 hover:underline flex items-center justify-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track existing pickup by Booking ID</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
