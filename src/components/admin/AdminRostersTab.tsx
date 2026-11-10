"use client";

import React from "react";
import Link from "next/link";
import { Collector, Customer, BusinessLead } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";

export function AdminCustomersView({ customers }: { customers: Customer[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Customer Directory</h3>
        <p className="text-xs text-slate-500">
          Registered customer accounts and recycling metrics.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Customer Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">City</th>
              <th className="pb-3">Total Pickups</th>
              <th className="pb-3">Total Earnings</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3.5 font-bold text-slate-900">{c.name}</td>
                <td className="py-3.5 font-mono text-slate-600">+91 {c.phone}</td>
                <td className="py-3.5 text-slate-700 font-medium">{c.city}</td>
                <td className="py-3.5 font-bold">{c.totalPickups}</td>
                <td className="py-3.5 font-mono font-bold text-emerald-700">
                  {formatCurrency(c.totalEarnings)}
                </td>
                <td className="py-3.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminCollectorsView({ collectors }: { collectors: Collector[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Collector Fleet Roster</h3>
          <p className="text-xs text-slate-500">
            Field partners operating electric cargo carts and mini-trucks.
          </p>
        </div>
        <Link
          href="/collector"
          className="text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl"
        >
          Open Collector Interface &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collectors.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                  <span className="text-xs text-slate-500">+91 {c.phone}</span>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded ${
                  c.status === "available"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200">
              <div>
                <span className="text-slate-400 block">Vehicle</span>
                <span className="font-semibold text-slate-800">{c.vehicleNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Customer Rating</span>
                <span className="font-bold text-amber-600 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-current" /> {c.rating} / 5.0
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Assigned Runs</span>
                <span className="font-bold text-slate-900">{c.assignedPickupsCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Lifetime Completed</span>
                <span className="font-bold text-emerald-700">{c.completedPickupsCount}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200">
              <strong>Service Territory:</strong> {c.area}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminLeadsView({
  leads,
  onStatusChange,
}: {
  leads: BusinessLead[];
  onStatusChange: (id: string, s: BusinessLead["status"]) => void;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">B2B Corporate Inquiries</h3>
        <p className="text-xs text-slate-500">Commercial bulk quote requests submitted by organizations.</p>
      </div>

      <div className="space-y-4">
        {leads.map((l) => (
          <div
            key={l.id}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-emerald-700 text-sm">{l.id}</span>
                <span className="text-[10px] font-bold uppercase bg-slate-200 px-2 py-0.5 rounded">
                  {l.businessType}
                </span>
              </div>
              <h4 className="font-bold text-base text-slate-900">{l.companyName}</h4>
              <p className="text-xs text-slate-600">
                Contact: <strong>{l.contactPerson}</strong> &bull; +91 {l.mobile} &bull; {l.email}
              </p>
              <p className="text-xs text-slate-500">
                Scrap: <strong>{l.scrapType}</strong> (~{l.approxQuantity}) &bull; Frequency: {l.pickupFrequency}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={l.status}
                onChange={(e) =>
                  onStatusChange(l.id, e.target.value as BusinessLead["status"])
                }
                className="px-3 py-1.5 text-xs font-semibold border rounded-xl bg-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quotation_sent">Quotation Sent</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
