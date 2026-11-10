"use client";

import React from "react";
import { SelectedScrapItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

interface StepQuantityProps {
  computedItems: SelectedScrapItem[];
  totalEstimatedAmount: number;
  onQtyChange: (itemId: string, delta: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function StepQuantity({
  computedItems,
  totalEstimatedAmount,
  onQtyChange,
  onPrev,
  onNext,
}: StepQuantityProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Enter Approximate Quantities
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Give your best estimate. Our collector will verify the final weight using a digital
          scale at your doorstep.
        </p>
      </div>

      <div className="space-y-3.5">
        {computedItems.map((item) => (
          <div
            key={item.itemId}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 gap-4"
          >
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-slate-900">{item.itemName}</h4>
              <p className="text-xs text-slate-500">
                Rate:{" "}
                {item.isInspectionRequired
                  ? "Price after inspection"
                  : `${formatCurrency(item.ratePerUnit)}/${item.unit}`}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5">
              {/* Quantity controls */}
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() =>
                    onQtyChange(item.itemId, item.unit === "piece" ? -1 : -5)
                  }
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="px-3 text-center min-w-[70px]">
                  <span className="font-mono font-bold text-base text-slate-900">
                    {item.approxQuantity}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">{item.unit}</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onQtyChange(item.itemId, item.unit === "piece" ? 1 : 5)
                  }
                  className="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[100px]">
                <span className="text-xs text-slate-400 block">Est. Payout</span>
                <span className="font-mono font-black text-emerald-700 text-base">
                  {item.isInspectionRequired
                    ? "On Inspection"
                    : formatCurrency(item.estimatedTotal)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estimated Total Card */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Estimated Total Payout
          </span>
          <p className="text-xs text-emerald-700">
            Calculated based on your approximate quantities
          </p>
        </div>
        <span className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">
          {formatCurrency(totalEstimatedAmount)}
        </span>
      </div>

      <div className="pt-4 flex justify-between items-center border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-sm"
        >
          <span>Enter Address</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
