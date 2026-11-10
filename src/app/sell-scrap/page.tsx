"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getScrapItems, saveBooking } from "@/lib/storage";
import { ScrapItem, ScrapCategoryType, SelectedScrapItem, Booking, TimeSlot } from "@/types";
import { isValidIndianPhone, generateBookingId } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";

import { StepSelectScrap } from "@/components/booking/StepSelectScrap";
import { StepQuantity } from "@/components/booking/StepQuantity";
import { StepAddress } from "@/components/booking/StepAddress";
import { StepSlot } from "@/components/booking/StepSlot";
import { StepReview } from "@/components/booking/StepReview";
import { StepConfirmation } from "@/components/booking/StepConfirmation";

function SellScrapContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [availableItems, setAvailableItems] = useState<ScrapItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
    "item-paper-1": 20,
    "item-cardboard-1": 10,
  });

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    streetAddress: "",
    area: "",
    city: "Bengaluru",
    pincode: "",
    landmark: "",
  });

  const [slot, setSlot] = useState({
    pickupDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    pickupTime: "9 AM – 12 PM" as TimeSlot,
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const items = getScrapItems();
    setAvailableItems(items);

    const preItem = searchParams.get("item");
    if (preItem && items.find((i) => i.id === preItem)) {
      setSelectedItems((prev) => ({
        ...prev,
        [preItem]: prev[preItem] || 15,
      }));
    }
  }, [searchParams]);

  const computedItems: SelectedScrapItem[] = Object.entries(selectedItems)
    .filter(([_, qty]) => qty > 0)
    .map(([itemId, qty]) => {
      const item = availableItems.find((i) => i.id === itemId);
      const rate = item?.price || 0;
      return {
        itemId,
        itemName: item?.name || "Scrap Item",
        category: (item?.categoryId || "other") as ScrapCategoryType,
        unit: item?.unit || "kg",
        approxQuantity: qty,
        ratePerUnit: rate,
        estimatedTotal: item?.isInspectionRequired ? 0 : qty * rate,
        isInspectionRequired: item?.isInspectionRequired,
      };
    });

  const totalEstimatedAmount = computedItems.reduce(
    (sum, i) => sum + i.estimatedTotal,
    0
  );

  const handleQtyChange = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev[itemId]) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: 10 };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (Object.keys(selectedItems).length === 0) {
        errs.items = "Please select at least one scrap item to sell";
      }
    } else if (currentStep === 2) {
      if (computedItems.length === 0) {
        errs.quantities = "Please specify quantities greater than zero";
      }
    } else if (currentStep === 3) {
      if (!address.fullName.trim()) errs.fullName = "Full name is required";
      if (!address.phone.trim()) {
        errs.phone = "Mobile number is required";
      } else if (!isValidIndianPhone(address.phone)) {
        errs.phone = "Enter a valid 10-digit Indian mobile number";
      }
      if (!address.area.trim()) errs.area = "Area / Locality is required";
      if (!address.streetAddress.trim()) errs.streetAddress = "Full street address is required";
      if (!address.city.trim()) errs.city = "City is required";
    } else if (currentStep === 4) {
      if (!slot.pickupDate) errs.pickupDate = "Pickup date is required";
      if (!slot.pickupTime) errs.pickupTime = "Pickup slot is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showToast("Please fill all required details before proceeding", "error");
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmBooking = () => {
    const bookingId = generateBookingId();
    const categories = Array.from(new Set(computedItems.map((i) => i.category)));

    const newBooking: Booking = {
      id: bookingId,
      customerName: address.fullName.trim(),
      customerPhone: address.phone.replace(/\D/g, ""),
      address: {
        fullName: address.fullName.trim(),
        phone: address.phone.replace(/\D/g, ""),
        streetAddress: address.streetAddress.trim(),
        area: address.area.trim(),
        city: address.city.trim(),
        pincode: address.pincode.trim(),
        landmark: address.landmark.trim(),
      },
      pickupDate: slot.pickupDate,
      pickupTimeSlot: slot.pickupTime,
      items: computedItems,
      scrapCategories: categories.map(
        (c) => c.charAt(0).toUpperCase() + c.slice(1)
      ),
      estimatedTotalAmount: totalEstimatedAmount,
      status: "requested",
      notes: slot.notes,
      createdAt: new Date().toISOString(),
      paymentMethod: "UPI / Instant Transfer",
      paymentStatus: "pending",
    };

    saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(6);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    showToast("Booking created successfully! ID: " + bookingId, "success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {step <= 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Step {step} of 5
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {step === 1 && "Select Scrap"}
                {step === 2 && "Enter Quantities"}
                {step === 3 && "Pickup Address"}
                {step === 4 && "Choose Slot"}
                {step === 5 && "Review & Confirm"}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <StepSelectScrap
            availableItems={availableItems}
            selectedItems={selectedItems}
            onToggleItem={handleToggleItem}
            onNext={nextStep}
            error={errors.items}
          />
        )}

        {step === 2 && (
          <StepQuantity
            computedItems={computedItems}
            totalEstimatedAmount={totalEstimatedAmount}
            onQtyChange={handleQtyChange}
            onPrev={prevStep}
            onNext={nextStep}
          />
        )}

        {step === 3 && (
          <StepAddress
            address={address}
            setAddress={setAddress}
            errors={errors}
            onPrev={prevStep}
            onNext={nextStep}
          />
        )}

        {step === 4 && (
          <StepSlot
            slot={slot}
            setSlot={setSlot}
            onPrev={prevStep}
            onNext={nextStep}
          />
        )}

        {step === 5 && (
          <StepReview
            address={address}
            slot={slot}
            computedItems={computedItems}
            totalEstimatedAmount={totalEstimatedAmount}
            onEditStep={(s) => setStep(s)}
            onPrev={prevStep}
            onConfirm={confirmBooking}
          />
        )}

        {step === 6 && confirmedBooking && (
          <StepConfirmation
            booking={confirmedBooking}
            onReset={() => {
              setStep(1);
              setConfirmedBooking(null);
            }}
          />
        )}
      </div>
    </div>
  );
}


export default function SellScrapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <SellScrapContent />
    </Suspense>
  );
}
