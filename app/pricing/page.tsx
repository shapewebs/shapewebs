"use client";

import "@/styles/pages/pricing/pricing.css";
import { PricingSectionCardModule } from "@/components/pricing/pricing-section-cardModule";
import { PricingSectionPerformance } from "@/components/pricing/pricing-section-performance";
import { PricingSectionFAQ } from "@/components/pricing/pricing-section-faq";
import { PreFooter } from "@/components/preFooter";

export default function PricingPage() {
  return (
    <>
      <PricingSectionCardModule />
      <PricingSectionPerformance />
      <PricingSectionFAQ />
      <PreFooter />
    </>
  );
}
