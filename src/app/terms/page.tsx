"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
              <FileText className="w-3.5 h-3.5" />
              Legal &amp; Compliance
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Terms of Service &amp; Pickup Policy
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Last updated: October 2026 • {COMPANY_CONFIG.legalName}
            </p>
          </div>

          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By accessing, using, or booking services on {COMPANY_CONFIG.brandName} (operated by {COMPANY_CONFIG.legalName}), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our doorstep pickup platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. Doorstep Pickup &amp; Weighing Policy</h2>
              <p>
                Our trained and verified pickup crew conducts weighing exclusively on certified, calibrated digital scales in the presence of the customer.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                <li>Pickups are scheduled based on customer-selected dates and arrival slots.</li>
                <li>The customer has the right to inspect the digital scale before and after weighing.</li>
                <li>Rates quoted on the website are indicative and subject to area and current market fluctuations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Instant Payment Settlement</h2>
              <p>
                Payment for accepted scrap will be disbursed immediately upon final weighing before our crew leaves the premises. Payments may be made via:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                <li>Instant UPI transfer (Google Pay, PhonePe, Paytm, BHIM)</li>
                <li>Direct Bank Transfer (IMPS/NEFT)</li>
                <li>Cash in hand</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. Prohibited Materials</h2>
              <p>
                {COMPANY_CONFIG.brandName} adheres strictly to environmental and safety guidelines. We do NOT accept:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                <li>Hazardous chemicals, bio-medical waste, or explosive items.</li>
                <li>Stolen property or items without rightful ownership.</li>
                <li>Pressurized gas cylinders or radioactive materials.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. Registered Office &amp; Grievance Redressal</h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <p className="font-bold text-slate-900">{COMPANY_CONFIG.registeredAddress.title}</p>
                <p>{COMPANY_CONFIG.registeredAddress.company}</p>
                <p>{COMPANY_CONFIG.registeredAddress.line1}</p>
                <p>{COMPANY_CONFIG.registeredAddress.line2}</p>
                <p className="pt-2"><strong>Support Email:</strong> {COMPANY_CONFIG.email}</p>
                <p><strong>Customer Helpline:</strong> {COMPANY_CONFIG.phone} ({COMPANY_CONFIG.supportHours})</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}