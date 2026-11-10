"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Recycle,
  Menu,
  X,
  PhoneCall,
  Calendar,
  User,
  ShieldCheck,
  Truck,
  Sparkles,
  Search,
} from "lucide-react";
import { getCurrentUser, AuthSession } from "@/lib/storage";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthSession | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const handleUpdate = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener("scrapix-storage-update", handleUpdate);
    return () => window.removeEventListener("scrapix-storage-update", handleUpdate);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sell Scrap", href: "/sell-scrap" },
    { name: "Scrap Prices", href: "/scrap-prices" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "For Businesses", href: "/business" },
    { name: "Track Pickup", href: "/track-pickup" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href) && href !== "/#how-it-works") return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top Banner with Quick Role Access & Helplines */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Doorstep Scrap Pickup Across India
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">
            Free Pickup &amp; Instant UPI Payout
          </span>
        </div>

        <div className="flex items-center gap-3 font-medium">
          <Link
            href="/track-pickup"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <Search className="w-3 h-3" />
            Track Status
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/collector"
            className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
            title="Collector Terminal"
          >
            <Truck className="w-3 h-3" />
            Collector Portal
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/admin"
            className="text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1"
            title="Admin Console"
          >
            <ShieldCheck className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                SCRAP<span className="text-emerald-600">IX</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
                Doorstep Recycling
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-700 bg-emerald-50 font-bold"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                Login
              </Link>
            )}

            <Link
              href="/sell-scrap"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book Pickup
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/sell-scrap"
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-700 bg-emerald-50 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-xl text-slate-800 font-semibold bg-slate-50 hover:bg-slate-100"
              >
                <User className="w-4 h-4 text-emerald-600" />
                My Dashboard ({user.name})
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-xl text-slate-800 font-semibold bg-slate-50 hover:bg-slate-100"
              >
                <User className="w-4 h-4 text-slate-600" />
                Customer Login / Signup
              </Link>
            )}

            <Link
              href="/sell-scrap"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md text-center"
            >
              <Calendar className="w-5 h-5" />
              Schedule Scrap Pickup
            </Link>

            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/collector"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-center font-bold flex items-center justify-center gap-1.5"
              >
                <Truck className="w-4 h-4 text-amber-700" />
                Collector App
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 text-center font-bold flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-sky-700" />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
