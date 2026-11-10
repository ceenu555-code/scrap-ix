"use client";

import React from "react";
import Link from "next/link";
import { Booking } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface StepConfirmationProps {
  booking: Booking;
  onReset: () => void;
}

export function StepConfirmation({ booking, onReset }: StepConfirmationProps) {
  const { showToast } = useToast();

  const copyBookingId = (id: string) => {
    navigator.clipboard?.writeText(id);
    showToast("Booking ID copied to clipboard!", "info");
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/30 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          Doorstep Pickup Scheduled
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
          Pickup Scheduled Successfully!
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Thank you, <strong className="text-slate-800">{booking.customerName}</strong>.
          Your scrap pickup has been logged. Our verified partner will call you prior to arrival.
        </p>
      </div>

      {/* Receipt Summary Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">
              Your Booking ID
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-2xl font-black text-emerald-700">
                {booking.id}
              </span>
              <button
                type="button"
                onClick={() => copyBookingId(booking.id)}
                className="p-1 text-slate-400 hover:text-slate-600"
                title="Copy ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-sm sm:text-right">
            <span className="text-xs text-slate-400 font-semibold uppercase block">
              Estimated Amount
            </span>
            <span className="font-mono text-2xl font-black text-slate-900">
              {formatCurrency(booking.estimatedTotalAmount)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Pickup Date &amp; Time</span>
            <p className="font-bold text-slate-800 mt-0.5">
              {booking.pickupDate} ({booking.pickupTimeSlot})
            </p>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold block">Mobile Contact</span>
            <p className="font-bold text-slate-800 mt-0.5">+91 {booking.customerPhone}</p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs text-slate-400 font-semibold block">Pickup Address</span>
            <p className="font-semibold text-slate-700 mt-0.5">
              {booking.address.streetAddress}, {booking.address.area}, {booking.address.city}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs text-slate-400 font-semibold block mb-1">
              Scrap Categories &amp; Items
            </span>
            <div className="flex flex-wrap gap-1.5">
              {booking.items.map((i, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700"
                >
                  {i.itemName} (~{i.approxQuantity} {i.unit})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/track-pickup?bookingId=${booking.id}&phone=${booking.customerPhone}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-base"
        >
          <span>Track Pickup</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 text-sm"
        >
          Go to Customer Dashboard
        </Link>
      </div>
    </div>
  );
}
