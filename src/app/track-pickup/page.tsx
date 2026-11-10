"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Scale,
  CreditCard,
  UserCheck,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
} from "lucide-react";
import { getBookings, getBookingById, updateBookingStatus } from "@/lib/storage";
import { Booking, BookingStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const TIMELINE_STEPS: {
  status: BookingStatus;
  title: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    status: "requested",
    title: "Pickup Requested",
    desc: "Your booking is registered in the system.",
    icon: Calendar,
  },
  {
    status: "confirmed",
    title: "Pickup Confirmed",
    desc: "Slot allocated and dispatch team notified.",
    icon: CheckCircle2,
  },
  {
    status: "collector_assigned",
    title: "Collector Assigned",
    desc: "A verified recycling partner is assigned to your run.",
    icon: UserCheck,
  },
  {
    status: "on_the_way",
    title: "Collector On The Way",
    desc: "Partner is en-route to your pickup location.",
    icon: Truck,
  },
  {
    status: "arrived",
    title: "Collector Arrived",
    desc: "Partner has arrived at your address with digital scales.",
    icon: MapPin,
  },
  {
    status: "collected",
    title: "Scrap Collected",
    desc: "Scrap digitally weighed and finalized.",
    icon: Scale,
  },
  {
    status: "completed",
    title: "Payment Completed",
    desc: "Instant payment transferred via UPI/Cash.",
    icon: CreditCard,
  },
];

const STATUS_ORDER: BookingStatus[] = [
  "requested",
  "confirmed",
  "collector_assigned",
  "on_the_way",
  "arrived",
  "collected",
  "completed",
];

function TrackPickupContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const [bookingIdInput, setBookingIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const qId = searchParams.get("bookingId");
    const qPhone = searchParams.get("phone");
    if (qId) {
      setBookingIdInput(qId);
      if (qPhone) setPhoneInput(qPhone);
      handleSearch(qId);
    } else {
      // Default to sample booking
      const defaultB = getBookingById("SM-2026-0001");
      if (defaultB) {
        setCurrentBooking(defaultB);
        setBookingIdInput(defaultB.id);
        setPhoneInput(defaultB.customerPhone);
      }
    }
  }, [searchParams]);

  const handleSearch = (overrideId?: string) => {
    const idToSearch = overrideId || bookingIdInput;
    if (!idToSearch.trim()) {
      showToast("Please enter a Booking ID to search", "error");
      return;
    }

    setSearched(true);
    const found = getBookingById(idToSearch.trim());
    if (found) {
      setCurrentBooking(found);
      showToast("Booking located successfully!", "success");
    } else {
      setCurrentBooking(null);
      showToast("No booking found with this ID", "error");
    }
  };

  const getStepState = (stepStatus: BookingStatus, currentStatus: BookingStatus) => {
    const currentIndex = STATUS_ORDER.indexOf(currentStatus);
    const stepIndex = STATUS_ORDER.indexOf(stepStatus);

    if (currentIndex > stepIndex) return "completed";
    if (currentIndex === stepIndex) return "current";
    return "upcoming";
  };

  const advanceSimulation = () => {
    if (!currentBooking) return;
    const currentIndex = STATUS_ORDER.indexOf(currentBooking.status);
    if (currentIndex < STATUS_ORDER.length - 1) {
      const nextStatus = STATUS_ORDER[currentIndex + 1];
      const updated = updateBookingStatus(currentBooking.id, nextStatus, {
        ...(nextStatus === "collected" ? { actualWeight: 32 } : {}),
        ...(nextStatus === "completed"
          ? { finalPayableAmount: currentBooking.estimatedTotalAmount + 40 }
          : {}),
      });
      if (updated) {
        setCurrentBooking({ ...updated });
        showToast(`Demo Status advanced to: ${nextStatus.replace(/_/g, " ")}`, "info");
      }
    } else {
      showToast("This pickup is already completed!", "info");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Real-Time Pickup Status
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Track Your Scrap Pickup
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Enter your Booking ID and registered mobile number to check the live status of your
            scrap collection and assigned partner.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Booking ID *
              </label>
              <input
                type="text"
                placeholder="e.g. SM-2026-0001"
                value={bookingIdInput}
                onChange={(e) => setBookingIdInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500 uppercase"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Registered Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="9845012345"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => handleSearch()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Track Pickup</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold">Try sample IDs:</span>
            {["SM-2026-0001", "SM-2026-0002", "SM-2026-0003"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setBookingIdInput(id);
                  handleSearch(id);
                }}
                className="font-mono bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2 py-0.5 rounded text-slate-700 border border-slate-200"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {currentBooking ? (
          <div className="space-y-6">
            {/* Booking Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase block">
                    Pickup Order
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="font-mono text-2xl font-black text-slate-900">
                      {currentBooking.id}
                    </h2>
                    <StatusBadge status={currentBooking.status} />
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-slate-400 font-semibold uppercase block">
                    Scheduled Slot
                  </span>
                  <p className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                    {currentBooking.pickupDate} &bull; {currentBooking.pickupTimeSlot}
                  </p>
                </div>
              </div>

              {/* Collector Details Card (if assigned) */}
              {currentBooking.collector ? (
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      {currentBooking.collector.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">
                          {currentBooking.collector.name}
                        </h4>
                        <span className="text-xs bg-white text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                          ★ {currentBooking.collector.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Vehicle: {currentBooking.collector.vehicleNumber}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${currentBooking.collector.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Collector
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Collector assignment in progress. You will receive an SMS and WhatsApp notification once assigned.</span>
                </div>
              )}

              {/* Step Timeline */}
              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-6">
                  Pickup Progress Timeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {TIMELINE_STEPS.map((stepItem, idx) => {
                    const stepState = getStepState(
                      stepItem.status,
                      currentBooking.status
                    );
                    const StepIcon = stepItem.icon;

                    return (
                      <div key={idx} className="relative flex items-start gap-4 group">
                        {/* Icon Indicator */}
                        <div
                          className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                            stepState === "completed"
                              ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                              : stepState === "current"
                              ? "bg-emerald-600 text-white ring-4 ring-emerald-200 animate-pulse"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                        >
                          <StepIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </div>

                        {/* Step Details */}
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm sm:text-base font-bold ${
                                stepState === "completed" || stepState === "current"
                                  ? "text-slate-900"
                                  : "text-slate-400"
                              }`}
                            >
                              {stepItem.title}
                            </h4>
                            {stepState === "current" && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                In Progress
                              </span>
                            )}
                            {stepState === "completed" && (
                              <span className="text-xs text-emerald-600 font-bold">
                                ✓ Done
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {stepItem.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items & Amount Breakdown */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Pickup Location:
                  </span>
                  <p className="text-slate-600">
                    {currentBooking.address.streetAddress}, {currentBooking.address.area},{" "}
                    {currentBooking.address.city}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="font-bold text-slate-700 block mb-1">
                    Financial Summary:
                  </span>
                  <p className="text-slate-600">
                    Est. Amount: <strong>{formatCurrency(currentBooking.estimatedTotalAmount)}</strong>
                  </p>
                  {currentBooking.finalPayableAmount && (
                    <p className="text-emerald-700 font-bold text-sm mt-0.5">
                      Final Paid: {formatCurrency(currentBooking.finalPayableAmount)}
                    </p>
                  )}
                </div>
              </div>

              {/* Live Simulation Control (Testing & Demonstration) */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                    <Sparkles className="w-3 h-3" /> Interactive Status Simulator
                  </span>
                  <p className="text-xs text-slate-300">
                    Test the next step of the lifecycle in real-time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={advanceSimulation}
                  disabled={currentBooking.status === "completed"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Advance Status</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          searched && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Booking Not Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We could not find any active scrap pickup matching the provided booking ID. Please check the ID or schedule a new pickup.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}


export default function TrackPickupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <TrackPickupContent />
    </Suspense>
  );
}
