import React from "react";
import Link from "next/link";
import {
  Recycle,
  Phone,
  Mail,
  MapPin,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Shield,
  Scale,
  Award,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
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
              &quot;Your Scrap. Our Responsibility.&quot;
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India&apos;s trusted doorstep scrap collection and responsible recycling
              ecosystem. Digitally weighed, transparently priced, and instantly paid.
            </p>

            <div className="pt-2 text-xs text-emerald-300/80 font-medium bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3 inline-block">
              🌱 &quot;Recycle More. Waste Less.&quot;
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-scrap"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sell Scrap Online
                </Link>
              </li>
              <li>
                <Link
                  href="/scrap-prices"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Scrap Price Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/track-pickup"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Track Your Pickup
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="hover:text-emerald-400 transition-colors"
                >
                  For Businesses (B2B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Scrap Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Recyclables
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/scrap-prices?cat=paper"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Paper &amp; Newspapers
                </Link>
              </li>
              <li>
                <Link
                  href="/scrap-prices?cat=metal"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Iron, Steel &amp; Copper
                </Link>
              </li>
              <li>
                <Link
                  href="/scrap-prices?cat=plastic"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Plastic &amp; PET Bottles
                </Link>
              </li>
              <li>
                <Link
                  href="/scrap-prices?cat=electronics"
                  className="hover:text-emerald-400 transition-colors"
                >
                  E-Waste &amp; Circuit Boards
                </Link>
              </li>
              <li>
                <Link
                  href="/scrap-prices?cat=appliances"
                  className="hover:text-emerald-400 transition-colors"
                >
                  AC, Fridges &amp; Appliances
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Factory &amp; Commercial Scrap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
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
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/collector"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Join as Collector Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Admin Console
                </Link>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-pointer">
                  Privacy Policy &amp; Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} SCRAPIX India Technologies Pvt Ltd. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Scale className="w-3.5 h-3.5 text-emerald-500" />
              Certified Digital Weighing
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Verified Background Checked
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
