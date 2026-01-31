"use client";

import "@/styles/pages/pricing/pricing.css";
import { PricingSectionCardModule } from "@/components/pricing/pricing-section-cardModule";
import { PricingSectionPerformane } from "@/components/pricing/pricing-section-performance";

export default function PricingPage() {
  return (
    <>
      <PricingSectionCardModule />
      <PricingSectionPerformance />
    </>
  );
}
