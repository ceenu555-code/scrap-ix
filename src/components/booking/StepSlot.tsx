"use client";

import React from "react";
import { TimeSlot } from "@/types";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const TIME_SLOTS: TimeSlot[] = [
  "9 AM – 12 PM",
  "12 PM – 3 PM",
  "3 PM – 6 PM",
];

interface StepSlotProps {
  slot: {
    pickupDate: string;
    pickupTime: TimeSlot;
    notes: string;
  };
  setSlot: React.Dispatch<
    React.SetStateAction<{
      pickupDate: string;
      pickupTime: TimeSlot;
      notes: string;
    }>
  >;
  onPrev: () => void;
  onNext: () => void;
}

export function StepSlot({ slot, setSlot, onPrev, onNext }: StepSlotProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Choose Date &amp; Time Slot
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Select your preferred 3-hour pickup window.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
            Select Pickup Date *
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={slot.pickupDate}
            onChange={(e) => setSlot({ ...slot, pickupDate: e.target.value })}
            className="w-full sm:w-80 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
            Select Time Slot *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIME_SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot({ ...slot, pickupTime: s })}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  slot.pickupTime === s
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold"
                }`}
              >
                <Clock className="w-5 h-5 mx-auto mb-1.5 opacity-80" />
                <span className="text-sm block">{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Special Instructions for Collector (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Call before arrival, elevator available, scrap kept near basement..."
            value={slot.notes}
            onChange={(e) => setSlot({ ...slot, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
          />
        </div>
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
          <span>Review Booking</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
