"use client";

import React, { useState } from "react";
import { Booking, BookingStatus } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Search } from "lucide-react";

interface AdminBookingsTabProps {
  bookings: Booking[];
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  onAssignCollector: (booking: Booking) => void;
}

export function AdminBookingsTab({
  bookings,
  onStatusChange,
  onAssignCollector,
}: AdminBookingsTabProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone.includes(search) ||
      b.address.area.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Manage All Bookings</h3>
          <p className="text-xs text-slate-500">
            Search, filter, update live status, or dispatch collectors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, Name, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-xl text-xs w-56 font-medium"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-xl text-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="requested">Requested</option>
            <option value="confirmed">Confirmed</option>
            <option value="collector_assigned">Collector Assigned</option>
            <option value="on_the_way">On The Way</option>
            <option value="arrived">Arrived</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Booking ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Slot</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Collector</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-right">Status Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3.5 font-mono font-bold text-emerald-700">{b.id}</td>
                <td className="py-3.5">
                  <span className="font-bold text-slate-900 block">{b.customerName}</span>
                  <span className="text-[11px] text-slate-500">+91 {b.customerPhone}</span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">
                    {b.address.area}, {b.address.city}
                  </span>
                </td>
                <td className="py-3.5 text-slate-600">
                  {b.pickupDate}
                  <span className="block text-[11px] text-slate-400">{b.pickupTimeSlot}</span>
                </td>
                <td className="py-3.5 text-slate-600 max-w-[140px] truncate">
                  {b.scrapCategories.join(", ")}
                </td>
                <td className="py-3.5">
                  <StatusBadge status={b.status} />
                </td>
                <td className="py-3.5">
                  {b.collector ? (
                    <div>
                      <span className="font-bold text-slate-900 block">{b.collector.name}</span>
                      <button
                        onClick={() => onAssignCollector(b)}
                        className="text-[10px] text-emerald-700 font-bold hover:underline"
                      >
                        Reassign
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAssignCollector(b)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-md"
                    >
                      + Assign
                    </button>
                  )}
                </td>
                <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                  {formatCurrency(b.finalPayableAmount || b.estimatedTotalAmount)}
                </td>
                <td className="py-3.5 text-right">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      onStatusChange(b.id, e.target.value as BookingStatus)
                    }
                    className="px-2 py-1 text-[11px] font-semibold border rounded-lg bg-white"
                  >
                    <option value="requested">Requested</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="collector_assigned">Assigned</option>
                    <option value="on_the_way">On The Way</option>
                    <option value="arrived">Arrived</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
