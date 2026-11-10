"use client";

import React from "react";
import { Booking } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

interface AdminOverviewTabProps {
  totalCustomers: number;
  bookings: Booking[];
  pendingPickups: number;
  completedPickups: number;
  totalScrapWeight: number;
  totalRevenue: number;
  onSelectBooking: (b: Booking) => void;
  onViewAll: () => void;
}

export function AdminOverviewTab({
  totalCustomers,
  bookings,
  pendingPickups,
  completedPickups,
  totalScrapWeight,
  totalRevenue,
  onSelectBooking,
  onViewAll,
}: AdminOverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Customers</span>
          <span className="text-2xl font-black text-slate-900 font-mono block mt-1">
            {totalCustomers}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Active across India</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Bookings</span>
          <span className="text-2xl font-black text-slate-900 font-mono block mt-1">
            {bookings.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">System Lifetime</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-amber-600">Pending Pickups</span>
          <span className="text-2xl font-black text-amber-600 font-mono block mt-1">
            {pendingPickups}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Requires dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-emerald-700">Completed Pickups</span>
          <span className="text-2xl font-black text-emerald-700 font-mono block mt-1">
            {completedPickups}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">100% Weighed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Scrap Recycled</span>
          <span className="text-2xl font-black text-slate-900 font-mono block mt-1">
            {totalScrapWeight}
            <span className="text-xs font-bold text-slate-500 ml-1">kg</span>
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Landfill diverted</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Payout</span>
          <span className="text-2xl font-black text-emerald-700 font-mono block mt-1">
            {formatCurrency(totalRevenue)}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Direct UPI / Cash</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Bookings</h3>
            <p className="text-xs text-slate-500">Pickups awaiting assignment or currently on the run.</p>
          </div>
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Manage All Bookings &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Slot</th>
                <th className="pb-3">Area</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Collector</th>
                <th className="pb-3 text-right">Est. Amount</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-3.5 font-mono font-bold text-emerald-700">{b.id}</td>
                  <td className="py-3.5 font-medium text-slate-900">
                    {b.customerName}
                    <span className="block text-[11px] text-slate-400">+91 {b.customerPhone}</span>
                  </td>
                  <td className="py-3.5 text-slate-600">{b.pickupDate} ({b.pickupTimeSlot})</td>
                  <td className="py-3.5 text-slate-600">{b.address.area}</td>
                  <td className="py-3.5">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3.5">
                    {b.collector ? (
                      <span className="font-semibold text-slate-800">{b.collector.name}</span>
                    ) : (
                      <span className="text-amber-600 font-semibold italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                    {formatCurrency(b.finalPayableAmount || b.estimatedTotalAmount)}
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg border border-slate-200"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
