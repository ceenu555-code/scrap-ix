"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building2,
  Handshake,
} from "lucide-react";
import { isValidIndianPhone } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export default function ContactPage() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "Customer Support",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!isValidIndianPhone(form.mobile)) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number";
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setSubmitted(true);
    showToast("Message sent successfully! We will contact you shortly.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-emerald-300">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            We Are Here To Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact {COMPANY_CONFIG.brandName}
          </h1>
          <p className="text-slate-600 text-base">
            Have questions about today&apos;s scrap rates, pickup scheduling, or commercial
            contracts? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Direct Department Channels</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Customer Support</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Booking inquiries &amp; feedback</p>
                    <a href={`tel:${COMPANY_CONFIG.phone}`} className="font-semibold text-emerald-700 mt-1 block hover:underline">
                      {COMPANY_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Business &amp; Bulk Scrap</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Offices, factories &amp; bulk orders</p>
                    <a href={`mailto:${COMPANY_CONFIG.businessEmail}`} className="font-semibold text-blue-700 mt-1 block hover:underline">
                      {COMPANY_CONFIG.businessEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Partnership &amp; Collector Fleet</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Join our certified collector network</p>
                    <a href={`mailto:${COMPANY_CONFIG.email}`} className="font-semibold text-purple-700 mt-1 block hover:underline">
                      {COMPANY_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Addresses */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {COMPANY_CONFIG.registeredAddress.title}
                  </div>
                  <div>{COMPANY_CONFIG.registeredAddress.company}</div>
                  <div>{COMPANY_CONFIG.registeredAddress.line1}</div>
                  <div>{COMPANY_CONFIG.registeredAddress.line2}</div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {COMPANY_CONFIG.correspondenceAddress.title}
                  </div>
                  <div>{COMPANY_CONFIG.correspondenceAddress.company}</div>
                  <div>{COMPANY_CONFIG.correspondenceAddress.line1}</div>
                  <div>{COMPANY_CONFIG.correspondenceAddress.line2}</div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500">
                <p className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  {COMPANY_CONFIG.supportHours}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Thank You!</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Your message has been dispatched to our support desk. A representative will
                    respond within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        mobile: "",
                        email: "",
                        subject: "Customer Support",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Send Us a Message</h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anjali Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                        errors.name ? "border-rose-400" : "border-slate-200"
                      }`}
                    />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
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
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="anjali@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          errors.email ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Department / Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                    >
                      <option value="Customer Support">Customer Support</option>
                      <option value="Business Enquiries">Business &amp; Bulk Enquiries</option>
                      <option value="Partnership Enquiries">Partnership &amp; Collector Enquiries</option>
                      <option value="Feedback / Complaint">Feedback &amp; Suggestions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="How can we assist you today?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                        errors.message ? "border-rose-400" : "border-slate-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-rose-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}