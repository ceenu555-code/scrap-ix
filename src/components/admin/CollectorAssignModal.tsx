"use client";

import React, { useState } from "react";
import { Collector, Booking } from "@/types";
import { assignCollectorToBooking } from "@/lib/storage";
import { Truck, X, Check, Star } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface CollectorAssignModalProps {
  booking: Booking;
  collectors: Collector[];
  onClose: () => void;
  onAssigned: () => void;
}

export function CollectorAssignModal({
  booking,
  collectors,
  onClose,
  onAssigned,
}: CollectorAssignModalProps) {
  const { showToast } = useToast();
  const [selectedCollectorId, setSelectedCollectorId] = useState(
    booking.collectorId || collectors[0]?.id || ""
  );

  const handleAssign = () => {
    if (!selectedCollectorId) {
      showToast("Please select a collector", "error");
      return;
    }
    const success = assignCollectorToBooking(booking.id, selectedCollectorId);
    if (success) {
      showToast(`Collector assigned to ${booking.id}!`, "success");
      onAssigned();
      onClose();
    } else {
      showToast("Failed to assign collector", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Assign Collector Partner</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Booking: <strong className="font-mono text-emerald-700">{booking.id}</strong> ({booking.address.area})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {collectors.map((c) => {
            const isSelected = selectedCollectorId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCollectorId(c.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-emerald-50 border-emerald-500 shadow-xs"
                    : "bg-slate-50/60 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <span className="text-[10px] bg-white text-slate-700 border px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-current" /> {c.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{c.vehicleNumber}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Areas: {c.area}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      c.status === "available"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    {c.assignedPickupsCount} active runs
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Assignment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
