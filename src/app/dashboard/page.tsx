"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Wallet,
  MapPin,
  User,
  LogOut,
  Plus,
  ArrowRight,
  TrendingUp,
  Leaf,
  Scale,
  CreditCard,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react";
import {
  getBookings,
  getCurrentUser,
  clearCurrentUser,
  AuthSession,
} from "@/lib/storage";
import { Booking, PickupAddress } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "overview" | "pickups" | "payments" | "addresses" | "profile"
  >("overview");

  const [user, setUser] = useState<AuthSession | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [addresses, setAddresses] = useState<PickupAddress[]>([
    {
      fullName: "Rahul Sundaram",
      phone: "9845012345",
      streetAddress: "Flat 402, Green Meadows Apartment, 14th Cross",
      area: "Indiranagar",
      city: "Bengaluru",
      pincode: "560038",
      landmark: "Near BDA Complex",
    },
    {
      fullName: "Rahul Sundaram",
      phone: "9845012345",
      streetAddress: "House 18, 5th Main, HAL 2nd Stage",
      area: "Koramangala",
      city: "Bengaluru",
      pincode: "560095",
    },
  ]);

  const [newAddrModal, setNewAddrModal] = useState(false);
  const [addrForm, setAddrForm] = useState({
    streetAddress: "",
    area: "",
    city: "Bengaluru",
    pincode: "",
    landmark: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);
    setBookings(getBookings());

    const handleUpdate = () => {
      setBookings(getBookings());
    };
    window.addEventListener("scrapix-storage-update", handleUpdate);
    return () => window.removeEventListener("scrapix-storage-update", handleUpdate);
  }, [router]);

  const handleLogout = () => {
    clearCurrentUser();
    showToast("Signed out successfully", "info");
    router.push("/login");
  };

  // Metrics
  const totalPickupsCount = bookings.length;
  const completedPickups = bookings.filter((b) => b.status === "completed");
  const totalEarnings = bookings.reduce(
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

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.streetAddress || !addrForm.area) {
      showToast("Please provide street address and area", "error");
      return;
    }
    const newA: PickupAddress = {
      fullName: user?.name || "Customer",
      phone: user?.phone || "9845012345",
      streetAddress: addrForm.streetAddress,
      area: addrForm.area,
      city: addrForm.city,
      pincode: addrForm.pincode,
      landmark: addrForm.landmark,
    };
    setAddresses([...addresses, newA]);
    setNewAddrModal(false);
    setAddrForm({ streetAddress: "", area: "", city: "Bengaluru", pincode: "", landmark: "" });
    showToast("Address saved to your profile!", "success");
  };

  const handleDeleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    showToast("Address removed", "info");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-600/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Verified Customer
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">
                +91 {user.phone} {user.email && `• ${user.email}`}
              </p>
            </div>
          </div>

          <Link
            href="/sell-scrap"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Pickup</span>
          </Link>
        </div>

        {/* Dashboard Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeTab === "overview"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("pickups")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeTab === "pickups"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>My Pickups</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === "pickups"
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeTab === "payments"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Earnings &amp; Payments</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeTab === "addresses"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeTab === "profile"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-900 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Need Help?
              </h4>
              <p className="text-xs text-slate-300">
                Contact our customer support team for instant booking modifications or pricing queries.
              </p>
              <Link
                href="/contact"
                className="inline-block text-xs font-bold text-emerald-300 hover:text-white pt-1"
              >
                Contact Support &rarr;
              </Link>
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 4 KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Total Pickups
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block mt-1">
                      {totalPickupsCount}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                      {completedPickups.length} completed
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Total Scrap Sold
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block mt-1">
                      {totalScrapWeight}
                      <span className="text-sm font-sans font-bold ml-1 text-slate-500">kg</span>
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Recycled safely
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Total Earnings
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono block mt-1">
                      {formatCurrency(totalEarnings)}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                      Instant UPI / Cash
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Eco Impact
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-teal-700 font-mono block mt-1">
                      {Math.max(1, Math.round(totalScrapWeight * 0.04))}
                      <span className="text-sm font-sans font-bold ml-1 text-slate-500">Trees</span>
                    </span>
                    <span className="text-[11px] text-teal-600 font-medium mt-1 block">
                      Equivalent saved
                    </span>
                  </div>
                </div>

                {/* Recent Pickups Table */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Recent Pickups</h3>
                    <button
                      onClick={() => setActiveTab("pickups")}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      View All Pickups
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                          <th className="pb-3">Booking ID</th>
                          <th className="pb-3">Date &amp; Slot</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Amount</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50/70">
                            <td className="py-3.5 font-mono font-bold text-emerald-700">
                              {b.id}
                            </td>
                            <td className="py-3.5 font-medium text-slate-800">
                              {b.pickupDate}
                              <span className="block text-[11px] text-slate-400 font-normal">
                                {b.pickupTimeSlot}
                              </span>
                            </td>
                            <td className="py-3.5 text-slate-600">
                              {b.scrapCategories.join(", ")}
                            </td>
                            <td className="py-3.5">
                              <StatusBadge status={b.status} />
                            </td>
                            <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                              {formatCurrency(b.finalPayableAmount || b.estimatedTotalAmount)}
                            </td>
                            <td className="py-3.5 text-right">
                              <Link
                                href={`/track-pickup?bookingId=${b.id}&phone=${b.customerPhone}`}
                                className="text-emerald-700 hover:text-emerald-900 font-bold"
                              >
                                Track &rarr;
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MY PICKUPS TAB */}
            {activeTab === "pickups" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">My Pickup History</h3>
                    <p className="text-slate-500 text-xs">
                      All your doorstep scrap collection orders and their statuses.
                    </p>
                  </div>
                  <Link
                    href="/sell-scrap"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-3.5 h-3.5" /> Book Pickup
                  </Link>
                </div>

                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-slate-900 text-base">
                            {b.id}
                          </span>
                          <StatusBadge status={b.status} />
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>Date:</strong> {b.pickupDate} ({b.pickupTimeSlot})
                        </p>
                        <p className="text-xs text-slate-600">
                          <strong>Location:</strong> {b.address.area}, {b.address.city}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {b.scrapCategories.map((c) => (
                            <span
                              key={c}
                              className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 flex sm:flex-col justify-between items-end gap-2">
                        <div>
                          <span className="text-xs text-slate-400 block">Payout Amount</span>
                          <span className="font-mono text-lg font-black text-emerald-700">
                            {formatCurrency(b.finalPayableAmount || b.estimatedTotalAmount)}
                          </span>
                        </div>

                        <Link
                          href={`/track-pickup?bookingId=${b.id}&phone=${b.customerPhone}`}
                          className="inline-flex items-center gap-1 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                        >
                          <span>Track Status</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Payments &amp; Receipts</h3>
                  <p className="text-slate-500 text-xs">
                    All completed door-step payouts directly into your UPI or bank account.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Booking ID</th>
                        <th className="pb-3">Payment Method</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="py-3.5 font-medium text-slate-800">{b.pickupDate}</td>
                          <td className="py-3.5 font-mono text-emerald-700 font-bold">{b.id}</td>
                          <td className="py-3.5 text-slate-600">
                            {b.paymentMethod || "UPI / Instant Payout"}
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                b.status === "completed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {b.status === "completed" ? "Paid at Doorstep" : "Pending Pickup"}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                            {formatCurrency(b.finalPayableAmount || b.estimatedTotalAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Saved Addresses</h3>
                    <p className="text-slate-500 text-xs">
                      Manage frequent pickup locations for quick 1-click scheduling.
                    </p>
                  </div>
                  <button
                    onClick={() => setNewAddrModal(true)}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((a, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {idx === 0 ? "Default Address" : `Address #${idx + 1}`}
                        </span>
                        {addresses.length > 1 && (
                          <button
                            onClick={() => handleDeleteAddress(idx)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title="Delete address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">{a.fullName}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {a.streetAddress}, {a.area}, {a.city} {a.pincode && `- ${a.pincode}`}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">Mobile: +91 {a.phone}</p>
                    </div>
                  ))}
                </div>

                {newAddrModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">Add New Address</h3>
                      <form onSubmit={handleAddAddress} className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            placeholder="Flat/House No, Building, Street"
                            value={addrForm.streetAddress}
                            onChange={(e) =>
                              setAddrForm({ ...addrForm, streetAddress: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Area / Locality *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. HSR Layout, Sector 3"
                            value={addrForm.area}
                            onChange={(e) =>
                              setAddrForm({ ...addrForm, area: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-xl text-xs"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={addrForm.city}
                              onChange={(e) =>
                                setAddrForm({ ...addrForm, city: e.target.value })
                              }
                              className="w-full px-3 py-2 border rounded-xl text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                              Pincode
                            </label>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="560038"
                              value={addrForm.pincode}
                              onChange={(e) =>
                                setAddrForm({ ...addrForm, pincode: e.target.value })
                              }
                              className="w-full px-3 py-2 border rounded-xl text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setNewAddrModal(false)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Customer Profile</h3>
                  <p className="text-slate-500 text-xs">
                    Your personal contact credentials and communication preferences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block">Full Name</span>
                    <span className="font-bold text-slate-800">{user.name}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block">Phone Number</span>
                    <span className="font-bold text-slate-800">+91 {user.phone}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block">Email</span>
                    <span className="font-bold text-slate-800">{user.email || "Not provided"}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block">Account Role</span>
                    <span className="font-bold text-emerald-700 capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
