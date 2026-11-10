import React from "react";
import { BookingStatus } from "@/types";

interface BadgeProps {
  status: BookingStatus | string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: BadgeProps) {
  const getStyle = () => {
    switch (status) {
      case "requested":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "collector_assigned":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "on_the_way":
        return "bg-purple-100 text-purple-800 border-purple-300 animate-pulse";
      case "arrived":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "collected":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "completed":
        return "bg-emerald-100 text-emerald-900 border-emerald-400 font-semibold";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "busy":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "offline":
        return "bg-slate-100 text-slate-800 border-slate-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatText = (text: string) => {
    return text
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {formatText(status)}
    </span>
  );
}
