"use client";

import "@/styles/pages/pricing/pricing.css";
import { PricingSectionCardModule } from "@/components/pricing/pricing-section-cardModule";
import { PricingSectionPerformance } from "@/components/pricing/pricing-section-performance";

export default function PricingPage() {
  return (
    <>
      <PricingSectionCardModule />
      <PricingSectionPerformance />
    </>
  )
}
