import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { MediaBanner } from "@/components/home/MediaBanner";
import { PricePreview } from "@/components/home/PricePreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BusinessSection } from "@/components/home/BusinessSection";
import { GreenHeroSection } from "@/components/home/GreenHeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FAQ_ITEMS } from "@/data/mockData";
import { HelpCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Media Recognitions & Shark Tank Banner */}
      <MediaBanner />

      {/* Popular Rates Highlights */}
      <PricePreview />

      {/* 3-Step Simple Process */}
      <HowItWorks />

      {/* Scrap Categories We Accept */}
      <CategoryGrid />

      {/* Households & Businesses Differentiator */}
      <BusinessSection />

      {/* Green Super Heroes of the Month */}
      <GreenHeroSection />

      {/* Why Choose Scrapix */}
      <WhyChooseUs />

      {/* Environmental Impact Statistics */}
      <ImpactMetrics />

      {/* Loved by Millions of Green Heroes - Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-emerald-300">
              <HelpCircle className="w-3.5 h-3.5" />
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base">
              Everything you need to know about our doorstep scrap collection and recycling
              service in India.
            </p>
          </div>

          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCTA />
    </div>
  );
}