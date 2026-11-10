"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  User,
  Truck,
  Shield,
  KeyRound,
  Info,
} from "lucide-react";
import { isValidIndianPhone } from "@/lib/utils";
import { setCurrentUser, AuthSession } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [mockOtp, setMockOtp] = useState("123456");
  const [error, setError] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setError("");
    setOtpSent(true);
    showToast("Demo OTP generated: 123456", "info");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "123456" && otp !== mockOtp) {
      setError("Invalid OTP code. Please use 123456 for demo login.");
      return;
    }

    const session: AuthSession = {
      role: "customer",
      name: "Rahul Sundaram",
      phone: phone.replace(/\D/g, "") || "9845012345",
      email: "rahul.sundaram@example.com",
    };

    setCurrentUser(session);
    showToast("Logged in successfully!", "success");
    router.push("/dashboard");
  };

  // Quick Demo Logins
  const loginAsDemo = (role: "customer" | "collector" | "admin") => {
    if (role === "customer") {
      setCurrentUser({
        role: "customer",
        name: "Rahul Sundaram",
        phone: "9845012345",
        email: "rahul.sundaram@example.com",
      });
      showToast("Signed in as Customer (Rahul Sundaram)", "success");
      router.push("/dashboard");
    } else if (role === "collector") {
      setCurrentUser({
        role: "collector",
        name: "Ramesh Sharma (Field Collector)",
        phone: "9876543210",
        collectorId: "col-101",
      });
      showToast("Signed in as Collector (Ramesh Sharma)", "success");
      router.push("/collector");
    } else {
      setCurrentUser({
        role: "admin",
        name: "Admin Officer",
        phone: "9800011122",
        email: "admin@scrapix.in",
      });
      showToast("Signed in as Admin", "success");
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Secure Authentication
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome to SCRAPIX
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage pickups, check earnings, and track collectors.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Mobile Number (10 Digits)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-sm font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9845012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-13 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Get Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <span>Demo OTP sent to +91 {phone}</span>
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                  123456
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono font-bold text-center tracking-widest text-lg focus:ring-2 focus:ring-emerald-500"
                />
                {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm"
              >
                Verify &amp; Sign In
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}

          {/* Integration Notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Demo Environment:</strong> Use mock OTP <code>123456</code>. In production,
              this connects to SMS gateways like MSG91 or Twilio via environment variables.
            </p>
          </div>

          {/* Quick Persona Demo Switcher */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 block text-center">
              1-Click Demo Personas
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => loginAsDemo("customer")}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 flex flex-col items-center gap-1 text-slate-700"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>Customer</span>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo("collector")}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200 flex flex-col items-center gap-1 text-slate-700"
              >
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Collector</span>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo("admin")}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-800 border border-slate-200 flex flex-col items-center gap-1 text-slate-700"
              >
                <Shield className="w-4 h-4 text-sky-600" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/signup"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Don&apos;t have an account? Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
