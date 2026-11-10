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
  Smartphone,
  Star,
  Tv,
} from "lucide-react";
import { getCurrentUser, AuthSession } from "@/lib/storage";
import { COMPANY_CONFIG } from "@/data/companyConfig";

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
    { name: "Scrap Rates", href: "/scrap-prices" },
    { name: "Schedule Pickup", href: "/sell-scrap" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "For Businesses", href: "/business" },
    { name: "Track Pickup", href: "/track-pickup" },
    { name: "About", href: "/about" },
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
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            ★ 4.8 | 1.3M+ Users
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-emerald-400 font-medium">
            Funded on Shark Tank India
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline text-slate-300">
            Helpline: {COMPANY_CONFIG.phone} ({COMPANY_CONFIG.supportHours})
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
            <Link
              href="/scrap-prices"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Download App</span>
            </Link>

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
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-black px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Schedule Pickup
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Navigation
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-current" />
              <span>★ 4.8 | 1.3M Users</span>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive(link.href)
                  ? "bg-emerald-50 text-emerald-800 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <Link
              href="/sell-scrap"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Pickup
            </Link>
            <Link
              href="/scrap-prices"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Download App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}