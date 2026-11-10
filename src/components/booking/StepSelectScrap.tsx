"use client";

import React from "react";
import { ScrapItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

interface StepSelectScrapProps {
  availableItems: ScrapItem[];
  selectedItems: Record<string, number>;
  onToggleItem: (itemId: string) => void;
  onNext: () => void;
  error?: string;
}

export function StepSelectScrap({
  availableItems,
  selectedItems,
  onToggleItem,
  onNext,
  error,
}: StepSelectScrapProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Select The Scrap You Want To Sell
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Choose one or more items. You can specify approximate quantities in the next step.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {availableItems.map((item) => {
          const isSelected = !!selectedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                isSelected
                  ? "bg-emerald-50/80 border-emerald-500 shadow-xs"
                  : "bg-slate-50/60 border-slate-200 hover:border-emerald-300"
              }`}
            >
              <div className="space-y-1 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                    {item.categoryId}
                  </span>
                  {item.isInspectionRequired && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                      Inspection
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                <p className="text-xs text-emerald-700 font-semibold font-mono">
                  {item.isInspectionRequired
                    ? "Price after inspection"
                    : `${formatCurrency(item.price)}/${item.unit}`}
                </p>
              </div>

              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-between items-center border-t border-slate-100">
        <span className="text-xs text-slate-500 font-semibold">
          {Object.keys(selectedItems).length} items selected
        </span>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-sm"
        >
          <span>Continue to Quantities</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
