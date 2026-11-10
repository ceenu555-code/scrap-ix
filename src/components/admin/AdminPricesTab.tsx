"use client";

import React from "react";
import { ScrapItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit2 } from "lucide-react";

interface AdminPricesTabProps {
  items: ScrapItem[];
  onAddNew: () => void;
  onEdit: (item: ScrapItem) => void;
}

export function AdminPricesTab({ items, onAddNew, onEdit }: AdminPricesTabProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Manage Scrap Prices</h3>
          <p className="text-xs text-slate-500">
            Centralized scrap pricing. Changes immediately synchronize with the catalog and customer booking calculator.
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
        >
          <Plus className="w-3.5 h-3.5" /> Add Scrap Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Item Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Unit</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Inspection Note</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3.5 font-bold text-slate-900">{item.name}</td>
                <td className="py-3.5">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.categoryId}
                  </span>
                </td>
                <td className="py-3.5 text-slate-600">Per {item.unit}</td>
                <td className="py-3.5 font-mono font-bold text-emerald-700 text-sm">
                  {item.isInspectionRequired
                    ? "Inspection based"
                    : formatCurrency(item.price)}
                </td>
                <td className="py-3.5 text-slate-500 max-w-[200px] truncate">
                  {item.indicativeNote || "Standard benchmark"}
                </td>
                <td className="py-3.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {item.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => onEdit(item)}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-bold"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
