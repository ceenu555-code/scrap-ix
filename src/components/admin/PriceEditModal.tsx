"use client";

import React, { useState } from "react";
import { ScrapItem } from "@/types";
import { updateScrapItem, addScrapItem } from "@/lib/storage";
import { X, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface PriceEditModalProps {
  item: ScrapItem | null;
  onClose: () => void;
  onSaved: () => void;
}

export function PriceEditModal({ item, onClose, onSaved }: PriceEditModalProps) {
  const { showToast } = useToast();

  const isNew = !item;

  const [form, setForm] = useState<Partial<ScrapItem>>({
    name: item?.name || "",
    categoryId: item?.categoryId || "metal",
    unit: item?.unit || "kg",
    price: item?.price || 20,
    isInspectionRequired: item?.isInspectionRequired || false,
    indicativeNote: item?.indicativeNote || "",
    description: item?.description || "",
    isActive: item?.isActive ?? true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      showToast("Item name is required", "error");
      return;
    }

    if (isNew) {
      addScrapItem({
        name: form.name.trim(),
        categoryId: form.categoryId || "metal",
        unit: form.unit || "kg",
        price: Number(form.price) || 0,
        isInspectionRequired: form.isInspectionRequired,
        indicativeNote: form.indicativeNote,
        description: form.description,
        isActive: form.isActive ?? true,
      });
      showToast("New scrap rate added successfully!", "success");
    } else {
      updateScrapItem({
        ...item!,
        ...form,
        name: form.name.trim(),
        price: Number(form.price) || 0,
      } as ScrapItem);
      showToast(`Updated pricing for ${form.name}!`, "success");
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            {isNew ? "Add New Scrap Item" : `Edit ${item.name}`}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Item Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value as any })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                <option value="paper">Paper</option>
                <option value="plastic">Plastic</option>
                <option value="metal">Metal</option>
                <option value="electronics">Electronics</option>
                <option value="appliances">Appliances</option>
                <option value="cardboard">Cardboard</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Unit</label>
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                <option value="kg">Per kg</option>
                <option value="piece">Per piece</option>
                <option value="ton">Per ton</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Price (₹ INR)</label>
              <input
                type="number"
                disabled={form.isInspectionRequired}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold disabled:opacity-40"
              />
            </div>

            <div className="flex flex-col justify-end pb-1.5">
              <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isInspectionRequired}
                  onChange={(e) =>
                    setForm({ ...form, isInspectionRequired: e.target.checked })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Inspection Needed</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              Indicative Note / Range
            </label>
            <input
              type="text"
              placeholder="e.g. Price after inspection (₹100 - ₹500)"
              value={form.indicativeNote || ""}
              onChange={(e) => setForm({ ...form, indicativeNote: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Active in public price catalog</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
