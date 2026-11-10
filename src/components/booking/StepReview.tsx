"use client";

import React from "react";
import { SelectedScrapItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Calendar, ChevronLeft } from "lucide-react";

interface StepReviewProps {
  address: {
    fullName: string;
    phone: string;
    streetAddress: string;
    area: string;
    city: string;
    pincode: string;
  };
  slot: {
    pickupDate: string;
    pickupTime: string;
  };
  computedItems: SelectedScrapItem[];
  totalEstimatedAmount: number;
  onEditStep: (step: number) => void;
  onPrev: () => void;
  onConfirm: () => void;
}

export function StepReview({
  address,
  slot,
  computedItems,
  totalEstimatedAmount,
  onEditStep,
  onPrev,
  onConfirm,
}: StepReviewProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Review Your Scrap Pickup
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Please double-check your scrap details and pickup address before confirming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup Address Summary */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Pickup Details
            </h4>
            <button
              onClick={() => onEditStep(3)}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-bold text-slate-900">{address.fullName}</p>
            <p className="text-slate-600">+91 {address.phone}</p>
            <p className="text-slate-600">{address.streetAddress}</p>
            <p className="text-slate-600">
              {address.area}, {address.city} {address.pincode ? `- ${address.pincode}` : ""}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
            <p>
              <strong className="text-slate-800">Date:</strong> {slot.pickupDate}
            </p>
            <p>
              <strong className="text-slate-800">Slot:</strong> {slot.pickupTime}
            </p>
          </div>
        </div>

        {/* Scrap Items Summary */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Selected Items ({computedItems.length})
            </h4>
            <button
              onClick={() => onEditStep(1)}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {computedItems.map((i) => (
              <div
                key={i.itemId}
                className="flex justify-between text-xs py-1 border-b border-slate-200/60"
              >
                <span className="font-medium text-slate-700">
                  {i.itemName} ({i.approxQuantity} {i.unit})
                </span>
                <span className="font-bold text-emerald-800">
                  {i.isInspectionRequired
                    ? "Inspection"
                    : formatCurrency(i.estimatedTotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-baseline justify-between font-bold text-sm">
            <span className="text-slate-700">Est. Total Amount:</span>
            <span className="text-lg font-black text-emerald-700 font-mono">
              {formatCurrency(totalEstimatedAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Policy */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Scrapix Doorstep Guarantee
        </p>
        <p>
          Our collector will bring an electronic digital scale. You will receive final payment
          immediately via UPI or cash before the collector leaves. Free pickup, zero cancellation fee.
        </p>
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
          onClick={onConfirm}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-xl shadow-lg transition-all text-base"
        >
          <Calendar className="w-5 h-5" />
          <span>Confirm Scrap Pickup</span>
        </button>
      </div>
    </div>
  );
}
