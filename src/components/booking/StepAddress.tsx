"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepAddressProps {
  address: {
    fullName: string;
    phone: string;
    streetAddress: string;
    area: string;
    city: string;
    pincode: string;
    landmark: string;
  };
  setAddress: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      phone: string;
      streetAddress: string;
      area: string;
      city: string;
      pincode: string;
      landmark: string;
    }>
  >;
  errors: Record<string, string>;
  onPrev: () => void;
  onNext: () => void;
}

export function StepAddress({
  address,
  setAddress,
  errors,
  onPrev,
  onNext,
}: StepAddressProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Enter Pickup Address
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Where should our verified collector arrive to weigh and collect your scrap?
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-emerald-500 ${
                errors.fullName ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {errors.fullName && (
              <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Mobile Number (10 Digits) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-sm font-bold text-slate-400">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className={`w-full pl-13 pr-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-emerald-500 ${
                  errors.phone ? "border-rose-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              City *
            </label>
            <select
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Area / Locality *
            </label>
            <input
              type="text"
              placeholder="e.g. Indiranagar, HSR Layout, Whitefield"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-emerald-500 ${
                errors.area ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {errors.area && <p className="text-rose-500 text-xs mt-1">{errors.area}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Complete Address (House / Flat No., Building, Street) *
          </label>
          <input
            type="text"
            placeholder="e.g. Flat 402, Green Meadows Apartment, 14th Cross"
            value={address.streetAddress}
            onChange={(e) =>
              setAddress({ ...address, streetAddress: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-emerald-500 ${
              errors.streetAddress ? "border-rose-400" : "border-slate-200"
            }`}
          />
          {errors.streetAddress && (
            <p className="text-rose-500 text-xs mt-1">{errors.streetAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Near Metro Station / BDA Complex"
              value={address.landmark}
              onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Pincode (Optional)
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 560038"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium"
            />
          </div>
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
          <span>Select Date &amp; Time</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
