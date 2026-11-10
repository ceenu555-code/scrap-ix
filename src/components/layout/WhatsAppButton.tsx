"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  const message = encodeURIComponent(
    "Hello Scrapix! I would like to enquire about doorstep scrap pickup and today\'s scrap rates."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp Support">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-xl shadow-green-900/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        aria-label="Chat with Scrapix on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="text-sm font-bold tracking-wide pr-1 hidden sm:inline">
          Chat on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-200"></span>
        </span>
      </a>
    </aside>
  );
}
