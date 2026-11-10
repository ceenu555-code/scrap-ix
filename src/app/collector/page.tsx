"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Truck,
  Phone,
  MapPin,
  Clock,
  Scale,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  DollarSign,
  User,
} from "lucide-react";
import { getBookings, updateBookingStatus, getCollectors } from "@/lib/storage";
import { Booking, BookingStatus, Collector } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

export default function CollectorDashboardPage() {
  const { showToast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);

  // Digital Weighing Scale Modal state
  const [weighingBooking, setWeighingBooking] = useState<Booking | null>(null);
  const [weightInput, setWeightInput] = useState<number>(30);
  const [amountInput, setAmountInput] = useState<number>(650);
  const [paymentMethod, setPaymentMethod] = useState<"UPI / Instant Transfer" | "Cash">("UPI / Instant Transfer");

  const loadData = () => {
    const all = getBookings();
    setBookings(all);
    const cols = getCollectors();
    if (cols.length > 0) setSelectedCollector(cols[0]);
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scrapix-storage-update", loadData);
    return () => window.removeEventListener("scrapix-storage-update", loadData);
  }, []);

  const handleAdvanceStatus = (booking: Booking, nextStatus: BookingStatus) => {
    updateBookingStatus(booking.id, nextStatus);
    loadData();
    showToast(`Pickup ${booking.id} marked as: ${nextStatus.replace(/_/g, " ")}`, "success");
  };

  const openWeighingTerminal = (booking: Booking) => {
    setWeighingBooking(booking);
    setWeightInput(booking.actualWeight || 25);
    setAmountInput(booking.finalPayableAmount || booking.estimatedTotalAmount || 500);
  };

  const handleCompletePickup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weighingBooking) return;

    updateBookingStatus(weighingBooking.id, "completed", {
      actualWeight: Number(weightInput),
      finalPayableAmount: Number(amountInput),
      paymentMethod,
      paymentStatus: "paid",
    });

    loadData();
    setWeighingBooking(null);
    showToast(`Pickup ${weighingBooking.id} completed and payment recorded!`, "success");
  };

  // Filter for active pickups
  const activePickups = bookings.filter(
    (b) => b.status !== "completed" && b.status !== "cancelled"
  );
  const completedToday = bookings.filter((b) => b.status === "completed");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Mobile Header Bar */}
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-400/20">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">Collector Terminal</h1>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                  Field Mode
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Partner: <strong>{selectedCollector?.name || "Ramesh Sharma"}</strong> &bull; {selectedCollector?.vehicleNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/admin"
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-xl font-bold"
            >
              Admin View
            </Link>
            <Link
              href="/"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl font-bold"
            >
              Customer Site
            </Link>
          </div>
        </div>

        {/* Shift Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Pickups</span>
            <span className="text-2xl font-black text-amber-400 font-mono block mt-1">
              {activePickups.length}
            </span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Completed Today</span>
            <span className="text-2xl font-black text-emerald-400 font-mono block mt-1">
              {completedToday.length}
            </span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Rating</span>
            <span className="text-2xl font-black text-white font-mono block mt-1">
              ★ {selectedCollector?.rating || 4.9}
            </span>
          </div>
        </div>

        {/* Assigned Pickups Section */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Today&apos;s Active Runs ({activePickups.length})</span>
            <span className="text-xs text-slate-400 font-normal">Auto-synced</span>
          </h2>

          {activePickups.length === 0 ? (
            <div className="bg-slate-800/60 rounded-3xl p-10 text-center border border-slate-700 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">All Pickups Cleared!</h3>
              <p className="text-xs text-slate-400">
                You have no pending doorstep collections assigned right now. Check back when new bookings are dispatched.
              </p>
            </div>
          ) : (
            activePickups.map((booking) => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${booking.address.streetAddress}, ${booking.address.area}, ${booking.address.city}`
              )}`;

              return (
                <div
                  key={booking.id}
                  className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-md space-y-5"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700/80 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-black text-amber-400">
                        {booking.id}
                      </span>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{booking.pickupTimeSlot}</span>
                    </div>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                        Customer Info
                      </span>
                      <p className="font-bold text-sm text-white">{booking.customerName}</p>
                      <p className="text-slate-300 font-mono">+91 {booking.customerPhone}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                        Doorstep Address
                      </span>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {booking.address.streetAddress}, {booking.address.area}, {booking.address.city}
                        {booking.address.pincode && ` - ${booking.address.pincode}`}
                      </p>
                      {booking.address.landmark && (
                        <p className="text-slate-400 italic">Landmark: {booking.address.landmark}</p>
                      )}
                    </div>
                  </div>

                  {/* Scrap Items Preview */}
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1.5">
                      Expected Scrap Categories
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg font-medium"
                        >
                          {it.itemName} (~{it.approxQuantity} {it.unit})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${booking.customerPhone}`}
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer</span>
                    </a>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-600"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>View Location</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    {/* Step Transitions */}
                    {booking.status === "collector_assigned" && (
                      <button
                        onClick={() => handleAdvanceStatus(booking, "on_the_way")}
                        className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs ml-auto"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Start Pickup (On The Way)</span>
                      </button>
                    )}

                    {booking.status === "on_the_way" && (
                      <button
                        onClick={() => handleAdvanceStatus(booking, "arrived")}
                        className="inline-flex items-center gap-1.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs ml-auto"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Arrived</span>
                      </button>
                    )}

                    {(booking.status === "arrived" || booking.status === "requested" || booking.status === "confirmed") && (
                      <button
                        onClick={() => openWeighingTerminal(booking)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs ml-auto shadow-md"
                      >
                        <Scale className="w-4 h-4" />
                        <span>Digital Weighing &amp; Pay</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Weighing & Payment Terminal Modal */}
        {weighingBooking && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 shadow-2xl space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Digital Weighing Terminal</h3>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-slate-800 px-2 py-1 rounded">
                  {weighingBooking.id}
                </span>
              </div>

              <form onSubmit={handleCompletePickup} className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Customer Name</span>
                  <p className="text-base font-bold text-white">{weighingBooking.customerName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-300 uppercase mb-1">
                      Actual Total Weight (KG) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={weightInput}
                      onChange={(e) => setWeightInput(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 text-white font-mono text-xl font-black rounded-xl border border-slate-600 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Certified scale reading
                    </span>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-300 uppercase mb-1">
                      Final Payable (₹ INR) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={amountInput}
                      onChange={(e) => setAmountInput(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 text-emerald-400 font-mono text-xl font-black rounded-xl border border-slate-600 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Amount to transfer
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1.5">
                    Customer Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("UPI / Instant Transfer")}
                      className={`p-3 rounded-xl border font-bold text-center transition-all ${
                        paymentMethod === "UPI / Instant Transfer"
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      UPI (GPay / PhonePe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Cash")}
                      className={`p-3 rounded-xl border font-bold text-center transition-all ${
                        paymentMethod === "Cash"
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      Cash at Doorstep
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-[11px] text-emerald-300 space-y-0.5">
                  <p className="font-bold">Instant Payout Confirmation:</p>
                  <p>Triggering completion marks the scrap as securely collected and logs instant UPI payout.</p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setWeighingBooking(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Pickup &amp; Payout</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
