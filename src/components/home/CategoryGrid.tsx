import React from "react";
import Link from "next/link";
import {
  FileText,
  Package,
  Recycle,
  ShieldAlert,
  Cpu,
  Tv,
  Armchair,
  Building2,
  ArrowRight,
} from "lucide-react";
import { SCRAP_CATEGORIES } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Package,
  Recycle,
  ShieldAlert,
  Cpu,
  Tv,
  Armchair,
  Building2,
};

export function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
            What We Accept
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Scrap Categories We Recycle
          </h2>
          <p className="text-slate-600 text-base">
            From household paper and plastic bottles to industrial machinery and appliances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCRAP_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Recycle;
            return (
              <div
                key={cat.id}
                className="group p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 group-hover:border-emerald-300 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    href={`/scrap-prices?cat=${cat.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800"
                  >
                    <span>View Rates</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={`/sell-scrap?cat=${cat.id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Sell Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
