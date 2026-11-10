"use client";

import React from "react";
import { Play, Award, Sparkles, Tv } from "lucide-react";

export function MediaBanner() {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Shark Tank Highlight */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Tv className="w-4 h-4 text-amber-400" />
              <span>Funded on Shark Tank India</span>
            </div>

            <a
              href="https://www.youtube.com/watch?v=4PL_XH8ipDI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch on YouTube</span>
            </a>
          </div>

          {/* Media Recognitions List */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs sm:text-sm font-semibold">
            <span className="text-slate-500 uppercase tracking-widest text-[11px] font-bold">
              Media Recognitions:
            </span>
            <span className="hover:text-white transition-colors">Shark Tank India</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">YourStory</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">Business Standard</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">Inc42</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">Tech in Asia</span>
          </div>
        </div>
      </div>
    </section>
  );
}