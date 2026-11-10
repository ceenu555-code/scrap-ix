"use client";

import React, { useState } from "react";
import {
  Building2,
  FileCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Copy,
} from "lucide-react";
import { saveBusinessLead } from "@/lib/storage";
import { BusinessLead } from "@/types";
import { isValidIndianPhone, generateLeadId } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const BUSINESS_TYPES = [
  "Office",
  "School",
  "Apartment",
  "Hotel",
  "Factory",
  "Retail",
  "Warehouse",
  "Other",
] as const;

const FREQUENCIES = ["One Time", "Weekly", "Monthly", "Custom"] as const;

export default function BusinessPage() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    businessType: "Office" as (typeof BUSINESS_TYPES)[number],
    city: "Bengaluru",
    address: "",
    scrapType: "",
    approxQuantity: "",
    pickupFrequency: "Monthly" as (typeof FREQUENCIES)[number],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<BusinessLead | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.companyName.trim()) errs.companyName = "Company / Entity name is required";
    if (!form.contactPerson.trim()) errs.contactPerson = "Contact person name is required";
    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!isValidIndianPhone(form.mobile)) {
      errs.mobile = "Enter a valid 10-digit Indian phone number";
    }
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.address.trim()) errs.address = "Business facility address is required";
    if (!form.scrapType.trim()) errs.scrapType = "Specify primary scrap materials";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill in all required enterprise details", "error");
      return;
    }

    setIsSubmitting(true);
    const leadId = generateLeadId();

    const newLead: BusinessLead = {
      id: leadId,
      companyName: form.companyName.trim(),
      contactPerson: form.contactPerson.trim(),
      mobile: form.mobile.replace(/\D/g, ""),
      email: form.email.trim(),
      businessType: form.businessType,
      city: form.city,
      address: form.address.trim(),
      scrapType: form.scrapType.trim(),
      approxQuantity: form.approxQuantity.trim() || "100+ kg",
      pickupFrequency: form.pickupFrequency,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      saveBusinessLead(newLead);
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      showToast("Enquiry submitted successfully! Ref: " + leadId, "success");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Corporate &amp; Industrial Waste Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Smart Scrap Collection for Businesses
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Custom recurring pickups, certified weighbridge documentation, GST billing, and
            compliance-ready Green Recycling Certificates for organizations across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form or Success */}
          <div className="lg:col-span-7">
            {submittedLead ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/30 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Enquiry Logged
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Quotation Request Received!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-slate-800">{submittedLead.contactPerson}</strong>.
                    Our B2B Corporate Accounts Team has received your request for{" "}
                    <strong className="text-slate-800">{submittedLead.companyName}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 max-w-md mx-auto text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Enquiry Reference ID
                    </span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {submittedLead.id}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400 block">Type:</span>
                      <span className="font-semibold">{submittedLead.businessType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Frequency:</span>
                      <span className="font-semibold">{submittedLead.pickupFrequency}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">City:</span>
                      <span className="font-semibold">{submittedLead.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Scrap:</span>
                      <span className="font-semibold truncate block">
                        {submittedLead.scrapType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedLead(null);
                      setForm({
                        companyName: "",
                        contactPerson: "",
                        mobile: "",
                        email: "",
                        businessType: "Office",
                        city: "Bengaluru",
                        address: "",
                        scrapType: "",
                        approxQuantity: "",
                        pickupFrequency: "Monthly",
                      });
                    }}
                    className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Request Corporate Scrap Quotation
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Fill out the form below and our regional business executive will provide an
                    optimized pricing proposal within 4 business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zenith Technologies Pvt Ltd"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          errors.companyName ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-rose-500 text-xs mt-1">{errors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Chandra (Facility Head)"
                        value={form.contactPerson}
                        onChange={(e) =>
                          setForm({ ...form, contactPerson: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          errors.contactPerson ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                      {errors.contactPerson && (
                        <p className="text-rose-500 text-xs mt-1">{errors.contactPerson}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          errors.mobile ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-rose-500 text-xs mt-1">{errors.mobile}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        placeholder="facilities@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          errors.email ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Business Type
                      </label>
                      <select
                        value={form.businessType}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            businessType: e.target.value as (typeof BUSINESS_TYPES)[number],
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                      >
                        {BUSINESS_TYPES.map((bt) => (
                          <option key={bt} value={bt}>
                            {bt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Pickup Frequency
                      </label>
                      <select
                        value={form.pickupFrequency}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            pickupFrequency: e.target.value as (typeof FREQUENCIES)[number],
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                      >
                        {FREQUENCIES.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        City
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                      >
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Estimated Scrap Quantity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 500 kg / 2 tons / 50 laptops"
                        value={form.approxQuantity}
                        onChange={(e) =>
                          setForm({ ...form, approxQuantity: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Scrap Types / Description *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Server racks, shredded paper, corrugated boxes, copper wire offcuts"
                      value={form.scrapType}
                      onChange={(e) => setForm({ ...form, scrapType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                        errors.scrapType ? "border-rose-400" : "border-slate-200"
                      }`}
                    />
                    {errors.scrapType && (
                      <p className="text-rose-500 text-xs mt-1">{errors.scrapType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Facility / Plant Address *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Plot 42, Electronic City Phase 1, Near Toll Gate"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                        errors.address ? "border-rose-400" : "border-slate-200"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-rose-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Generating Quote Request...</span>
                    ) : (
                      <>
                        <Building2 className="w-5 h-5" />
                        <span>Request Quote</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Value Propositions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6">
              <h3 className="text-xl font-bold">The Scrapix B2B Advantage</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Certified Weighbridge Slip</strong>
                    Tare and gross weights recorded with digital timestamp slips.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">GST Compliant Billing</strong>
                    Standardized tax invoices for scrap sales and corporate accounting.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Green Recycling Certificate</strong>
                    Demonstrate ESG compliance and zero-landfill milestones for audit.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Certified IT Asset Sanitization</strong>
                    De-identification and magnetic shredding for obsolete electronics.
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 text-slate-800 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">
                Enterprise Accounts Helpline
              </h4>
              <p className="text-xs text-slate-600">
                Need an immediate site inspection or multi-city corporate rate contract?
              </p>
              <div className="space-y-2 pt-1 text-sm font-semibold">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>enterprise@scrapix.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
