"use client";

import React from "react";
import Link from "next/link";
import {
  Recycle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Shield,
  Scale,
  Sparkles,
} from "lucide-react";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Support & Callback Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50">
              <Clock className="w-3.5 h-3.5" />
              <span>{COMPANY_CONFIG.supportHours}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need Assistance or Custom Scrap Quote?
            </h3>
            <p className="text-slate-400 text-sm">
              Our customer happiness team is available to assist your household or corporate pickup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black px-5 py-3 rounded-xl transition-all shadow-md text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: {COMPANY_CONFIG.phone}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3 rounded-xl border border-slate-700 transition-all text-sm"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Request a Callback</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Address Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SCRAP<span className="text-emerald-400">IX</span>
              </span>
            </Link>

            <p className="text-emerald-400 font-semibold text-sm">
              &quot;{COMPANY_CONFIG.tagline}&quot;
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India&apos;s trusted doorstep scrap collection and recycling ecosystem.
              Accurate digital weighing, transparent market rates, and instant UPI payment.
            </p>

            {/* Addresses (ScrapUncle format) */}
            <div className="space-y-3 pt-2 text-xs text-slate-400">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200 mb-0.5">
                  {COMPANY_CONFIG.registeredAddress.title}
                </div>
                <div>{COMPANY_CONFIG.registeredAddress.company}</div>
                <div>{COMPANY_CONFIG.registeredAddress.line1}</div>
                <div>{COMPANY_CONFIG.registeredAddress.line2}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200 mb-0.5">
                  {COMPANY_CONFIG.correspondenceAddress.title}
                </div>
                <div>{COMPANY_CONFIG.correspondenceAddress.company}</div>
                <div>{COMPANY_CONFIG.correspondenceAddress.line1}</div>
                <div>{COMPANY_CONFIG.correspondenceAddress.line2}</div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors font-medium text-emerald-400">
                  Scrap Rates
                </Link>
              </li>
              <li>
                <Link href="/sell-scrap" className="hover:text-emerald-400 transition-colors">
                  Schedule Pickup
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/track-pickup" className="hover:text-emerald-400 transition-colors">
                  Track Pickup
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-emerald-400 transition-colors">
                  For Businesses (B2B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Recyclables */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Recyclables
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Newspaper (Raddi) - ₹11/kg
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Clothes - ₹4/kg
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Window / Split AC - ₹7,100/pc
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Old Bike - ₹2,500/pc
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Computer CPU - ₹400/pc
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-emerald-400 transition-colors">
                  Iron / Steel / Metals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/collector" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Collector Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sky-400 hover:text-sky-300 transition-colors">
                  Admin Command Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright matching ScrapUncle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of service
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}