"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Copy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { saveBooking } from "@/lib/storage";
import { Booking, TimeSlot, SelectedScrapItem } from "@/types";
import { isValidIndianPhone, generateBookingId } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const SCRAP_OPTIONS = [
  "Newspaper",
  "Cardboard",
  "Plastic",
  "Iron",
  "Steel",
  "Aluminium",
  "Copper",
  "Brass",
  "E-Waste",
  "Old Appliances",
  "Furniture",
  "Other",
];

const TIME_SLOTS: TimeSlot[] = [
  "9 AM – 12 PM",
  "12 PM – 3 PM",
  "3 PM – 6 PM",
];

export function QuickBookingCard() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    city: "Bengaluru",
    area: "",
    pickupAddress: "",
    pickupDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    pickupTime: "9 AM – 12 PM" as TimeSlot,
    selectedCategories: ["Newspaper", "Cardboard"] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      if (exists) {
        if (prev.selectedCategories.length === 1) {
          showToast("Please select at least one scrap category", "info");
          return prev;
        }
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter((c) => c !== cat),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, cat],
        };
      }
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!isValidIndianPhone(formData.mobile)) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
    }
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.area.trim()) errs.area = "Area / Locality is required";
    if (!formData.pickupAddress.trim()) errs.pickupAddress = "Pickup address is required";
    if (!formData.pickupDate) errs.pickupDate = "Pickup date is required";
    if (formData.selectedCategories.length === 0)
      errs.categories = "Select at least one scrap category";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill in all required fields correctly", "error");
      return;
    }

    setIsSubmitting(true);

    const bookingId = generateBookingId();

    const items: SelectedScrapItem[] = formData.selectedCategories.map((cat, idx) => ({
      itemId: `quick-${idx}`,
      itemName: cat,
      category: "other",
      unit: "kg",
      approxQuantity: 10,
      ratePerUnit: 20,
      estimatedTotal: 200,
    }));

    const newBooking: Booking = {
      id: bookingId,
      customerName: formData.fullName.trim(),
      customerPhone: formData.mobile.replace(/\D/g, ""),
      address: {
        fullName: formData.fullName.trim(),
        phone: formData.mobile.replace(/\D/g, ""),
        streetAddress: formData.pickupAddress.trim(),
        area: formData.area.trim(),
        city: formData.city.trim(),
      },
      pickupDate: formData.pickupDate,
      pickupTimeSlot: formData.pickupTime,
      scrapCategories: formData.selectedCategories,
      items,
      estimatedTotalAmount: items.length * 200,
      status: "requested",
      createdAt: new Date().toISOString(),
      paymentMethod: "UPI / Instant Transfer",
      paymentStatus: "pending",
    };

    setTimeout(() => {
      saveBooking(newBooking);
      setIsSubmitting(false);
      setCreatedBooking(newBooking);
      showToast("Pickup scheduled successfully! Booking ID: " + bookingId, "success");
    }, 600);
  };

  if (createdBooking) {
    return (
      <div className="max-w-3xl mx-auto -mt-10 mb-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/10 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Demo Booking Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pickup Scheduled Successfully!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Our verified collector will contact you before arriving at your doorstep.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold uppercase text-slate-500">Booking ID</span>
              <span className="font-mono text-base font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {createdBooking.id}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              <div>
                <span className="text-xs text-slate-500 block">Customer</span>
                <span className="font-semibold">{createdBooking.customerName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Mobile</span>
                <span className="font-semibold">{createdBooking.customerPhone}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Date &amp; Slot</span>
                <span className="font-semibold">
                  {createdBooking.pickupDate} ({createdBooking.pickupTimeSlot})
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Location</span>
                <span className="font-semibold truncate block">
                  {createdBooking.address.area}, {createdBooking.address.city}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-500 block">Selected Scrap Items</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {createdBooking.scrapCategories.map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/track-pickup?bookingId=${createdBooking.id}&phone=${createdBooking.customerPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              Track This Pickup
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setCreatedBooking(null);
                setFormData({
                  fullName: "",
                  mobile: "",
                  city: "Bengaluru",
                  area: "",
                  pickupAddress: "",
                  pickupDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                  pickupTime: "9 AM – 12 PM",
                  selectedCategories: ["Newspaper", "Cardboard"],
                });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Schedule Another Pickup
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            * Demonstration mode: The booking has been recorded in your local workspace store.
            You can manage it in the Admin Console or Collector Portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto -mt-8 sm:-mt-12 mb-20 px-4 relative z-20">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Fast 1-Minute Booking
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Schedule Your Scrap Pickup
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Guaranteed doorstep service with certified digital scales &amp; instant payment.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-3 px-4 border border-white/10 text-center sm:text-right">
            <span className="text-xs text-slate-300 block">Minimum Order</span>
            <span className="text-lg font-black text-emerald-300">15 KG / Any Appliance</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Customer Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.fullName ? "border-rose-400 ring-rose-200" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Number (For WhatsApp Updates) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-sm font-bold text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className={`w-full pl-13 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.mobile ? "border-rose-400 ring-rose-200" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-rose-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>

          {/* Location Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Area / Locality *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. Indiranagar, Sector 4, Koramangala"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.area ? "border-rose-400 ring-rose-200" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.area && <p className="text-rose-500 text-xs mt-1">{errors.area}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Pickup Address (Flat / House No., Street, Landmark) *
            </label>
            <input
              type="text"
              placeholder="e.g. Flat 301, Sunshine Heights, Near Metro Station"
              value={formData.pickupAddress}
              onChange={(e) =>
                setFormData({ ...formData, pickupAddress: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.pickupAddress
                  ? "border-rose-400 ring-rose-200"
                  : "border-slate-200"
              }`}
            />
            {errors.pickupAddress && (
              <p className="text-rose-500 text-xs mt-1">{errors.pickupAddress}</p>
            )}
          </div>

          {/* Schedule Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Pickup Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.pickupDate}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupDate: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Pickup Time Slot *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, pickupTime: slot })}
                    className={`py-3 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                      formData.pickupTime === slot
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrap Categories Checkbox Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Scrap Categories (Multiple Allowed) *
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {formData.selectedCategories.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {SCRAP_OPTIONS.map((item) => {
                const isSelected = formData.selectedCategories.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleCategory(item)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs"
                        : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
            {errors.categories && (
              <p className="text-rose-500 text-xs mt-1.5">{errors.categories}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all text-base flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scheduling Your Pickup...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Pickup</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-2.5">
              Instant digital scale weighing at your doorstep. Zero cancellation fee.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
