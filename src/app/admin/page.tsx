"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Tag,
  Truck,
  Building2,
  Settings,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import {
  getBookings,
  getScrapItems,
  getCollectors,
  getCustomers,
  getBusinessLeads,
  updateBookingStatus,
  updateBusinessLeadStatus,
  resetToDefaults,
} from "@/lib/storage";
import {
  Booking,
  ScrapItem,
  Collector,
  Customer,
  BusinessLead,
  BookingStatus,
} from "@/types";
import { AdminOverviewTab } from "@/components/admin/AdminOverviewTab";
import { AdminBookingsTab } from "@/components/admin/AdminBookingsTab";
import { AdminPricesTab } from "@/components/admin/AdminPricesTab";
import {
  AdminCustomersView,
  AdminCollectorsView,
  AdminLeadsView,
} from "@/components/admin/AdminRostersTab";
import { CollectorAssignModal } from "@/components/admin/CollectorAssignModal";
import { PriceEditModal } from "@/components/admin/PriceEditModal";
import { useToast } from "@/components/ui/Toast";

export default function AdminDashboardPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "bookings" | "prices" | "customers" | "collectors" | "leads" | "settings"
  >("dashboard");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [items, setItems] = useState<ScrapItem[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<BusinessLead[]>([]);

  const [assignBooking, setAssignBooking] = useState<Booking | null>(null);
  const [editItem, setEditItem] = useState<ScrapItem | null | undefined>(undefined);

  const loadData = () => {
    setBookings(getBookings());
    setItems(getScrapItems());
    setCollectors(getCollectors());
    setCustomers(getCustomers());
    setLeads(getBusinessLeads());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scrapix-storage-update", loadData);
    return () => window.removeEventListener("scrapix-storage-update", loadData);
  }, []);

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    updateBookingStatus(bookingId, newStatus);
    loadData();
    showToast(`Booking status updated to ${newStatus}`, "info");
  };

  const handleLeadStatus = (leadId: string, status: BusinessLead["status"]) => {
    updateBusinessLeadStatus(leadId, status);
    loadData();
    showToast("Lead status updated", "success");
  };

  // KPIs
  const pendingPickups = bookings.filter(
    (b) =>
      b.status === "requested" ||
      b.status === "confirmed" ||
      b.status === "collector_assigned"
  ).length;
  const completedPickups = bookings.filter((b) => b.status === "completed").length;
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.finalPayableAmount || b.estimatedTotalAmount || 0),
    0
  );
  const totalScrapWeight = bookings.reduce(
    (sum, b) =>
      sum +
      (b.actualWeight ||
        b.items.reduce((s, i) => s + (i.unit === "kg" ? i.approxQuantity : 10), 0)),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Operations Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Scrapix Admin Portal
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Live fleet management, real-time rate cards, customer records, and B2B leads.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/collector"
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
            >
              <Truck className="w-3.5 h-3.5" /> Collector App
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs border border-slate-700"
            >
              Customer View
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "bookings", label: `Bookings (${bookings.length})`, icon: Calendar },
            { id: "prices", label: "Scrap Prices", icon: Tag },
            { id: "customers", label: "Customers", icon: Users },
            { id: "collectors", label: "Collectors Fleet", icon: Truck },
            { id: "leads", label: `B2B Leads (${leads.length})`, icon: Building2 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSel
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        {activeTab === "dashboard" && (
          <AdminOverviewTab
            totalCustomers={customers.length}
            bookings={bookings}
            pendingPickups={pendingPickups}
            completedPickups={completedPickups}
            totalScrapWeight={totalScrapWeight}
            totalRevenue={totalRevenue}
            onSelectBooking={(b) => setAssignBooking(b)}
            onViewAll={() => setActiveTab("bookings")}
          />
        )}

        {activeTab === "bookings" && (
          <AdminBookingsTab
            bookings={bookings}
            onStatusChange={handleStatusChange}
            onAssignCollector={(b) => setAssignBooking(b)}
          />
        )}

        {activeTab === "prices" && (
          <AdminPricesTab
            items={items}
            onAddNew={() => setEditItem(null)}
            onEdit={(i) => setEditItem(i)}
          />
        )}

        {activeTab === "customers" && <AdminCustomersView customers={customers} />}

        {activeTab === "collectors" && <AdminCollectorsView collectors={collectors} />}

        {activeTab === "leads" && (
          <AdminLeadsView leads={leads} onStatusChange={handleLeadStatus} />
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">System Settings &amp; Data Control</h3>
              <p className="text-xs text-slate-500">Manage mock database storage and demo state.</p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <h4 className="font-bold text-sm text-rose-900">Reset System to Initial Sample Data</h4>
              <p className="text-xs text-rose-700 leading-relaxed">
                Restore the default initial bookings, rates, customers, and fleet. All locally created test bookings will be cleared.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  loadData();
                  showToast("Storage reset to initial state!", "success");
                }}
                className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Database to Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {assignBooking && (
        <CollectorAssignModal
          booking={assignBooking}
          collectors={collectors}
          onClose={() => setAssignBooking(null)}
          onAssigned={() => loadData()}
        />
      )}

      {editItem !== undefined && (
        <PriceEditModal
          item={editItem}
          onClose={() => setEditItem(undefined)}
          onSaved={() => loadData()}
        />
      )}
    </div>
  );
}
