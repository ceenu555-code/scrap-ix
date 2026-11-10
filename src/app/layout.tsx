import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SCRAPIX | Doorstep Scrap Collection & Recycling Service",
  description:
    "Turn your recyclable scrap into cash from the comfort of your home. Verified doorstep pickup, certified digital weighing, transparent scrap rates, and instant UPI payouts.",
  keywords: [
    "scrap pickup",
    "scrap collection",
    "sell scrap online",
    "doorstep scrap pickup",
    "scrap prices in India",
    "recycling service",
    "kabadiwala online",
    "paper scrap rate",
    "copper iron scrap price",
  ],
  authors: [{ name: "SCRAPIX" }],
  openGraph: {
    title: "SCRAPIX - Your Scrap. Our Responsibility.",
    description:
      "Schedule doorstep scrap pickup online. Guaranteed transparent rates, digital weighing, and instant payment at your doorstep.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  );
}
