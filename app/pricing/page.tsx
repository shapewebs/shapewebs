"use client";

import "@/styles/pages/pricing/pricing.css";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;
  description: string;
  description2: string;
  monthlyAmount?: number;
  yearlyAmount?: number;
  priceSuffix?: string;
  priceText?: string;
  priceHref?: string;
  billingLabelYearly: string;
  features: string[];
  highlighted?: boolean;
  cta: { label: string; href: string };
  showAltSalesLink?: boolean;
  showBillingToggle?: boolean;
};

const plans: Plan[] = [
  {
    key: "hobby",
    name: "Hobby",
    priceText: "$0",
    description: "",
    description2: "",
    billingLabelYearly: "No maintenance price",
    features: [
      "Next.js + Vercel deployment",
      "Automatic CI/CD",
      "Web Application Firewall",
      "DDoS Mitigation",
      "Basic SEO",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "plus",
    name: "Plus",
    monthlyAmount: 12,
    yearlyAmount: 10,
    priceSuffix: "/mo",
    description: "",
    description2: " + additional features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Cold start prevention",
      "Traffic & performance insights",
      "Content structure + conversion guidance",
      "Enhanced SEO + analytics",
      "Priority support",
      "Custom components + sections",
    ],
    highlighted: true,
    cta: { label: "Get Started", href: "/get-started" },
    showAltSalesLink: true,
  },
  {
    key: "business",
    name: "Business",
    monthlyAmount: 18,
    yearlyAmount: 16,
    priceSuffix: "/mo",
    description: "",
    description2: " + advanced features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Custom components + sections",
      "Faster builds with prioritized CI",
      "Advanced caching & ISR configuration",
      "Technical SEO improvements",
      "Performance budgets (Core Web Vitals)",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceText: "Contact us",
    priceHref: "/contact",
    description: "",
    description2: "",
    billingLabelYearly: "Annual billing only",
    features: [
    "Unlimited pages & components",
    "Advanced security (SSO, RBAC)",
    "Compliance support (SOC 2, GDPR)",
    "Custom SLAs & uptime guarantees",
    "Dedicated support & onboarding",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

function RollingNumber({ value }: { value: number }) {
  const digits = useMemo(() => value.toString().split(""), [value]);

  return (
    <span className="rollNumber" aria-label={value.toString()}>
      {digits.map((d, i) => {
        const n = Number(d);
        return (
          <span key={i} className="rollDigit">
            <span
              className="rollDigitInner"
              style={{ transform: `translateY(-${n * 10}%)` }}
            >
              {Array.from({ length: 10 }, (_, tick) => (
                <span key={tick} className="rollTick">
                  {tick}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

type IconDef = { viewBox: string; path: string };

const faIcons: Record<string, IconDef> = {
  // Hobby
  "Next.js + Vercel deployment": {
    viewBox: "0 0 640 512",
    // cloud upload (solid-ish)
    path:"M192 384L88.5 384C63.6 384 48.3 356.9 61.1 335.5L114 247.3C122.7 232.8 138.3 224 155.2 224L250.2 224C326.3 95.1 439.8 88.6 515.7 99.7C528.5 101.6 538.5 111.6 540.3 124.3C551.4 200.2 544.9 313.7 416 389.8L416 484.8C416 501.7 407.2 517.3 392.7 526L304.5 578.9C283.2 591.7 256 576.3 256 551.5L256 448C256 412.7 227.3 384 192 384L191.9 384zM464 224C464 197.5 442.5 176 416 176C389.5 176 368 197.5 368 224C368 250.5 389.5 272 416 272C442.5 272 464 250.5 464 224z",
  },
  "Automatic CI/CD": {
    viewBox: "0 0 512 512",
    // rotate / sync
    path: "M105.1 202.6c7.7-69.2 66.4-122.6 137.5-122.6 40.8 0 78 17.3 104.3 45.1L320 160h144V16l-50.1 50.1C379.5 29.9 332 8 280.6 8 171.6 8 82.6 88.6 73.2 196.4c-.9 10.6 7 19.6 17.7 20.5 10.6.9 19.6-7 20.5-17.7zM406.9 309.4c-7.7 69.2-66.4 122.6-137.5 122.6-40.8 0-78-17.3-104.3-45.1L192 352H48v144l50.1-50.1C132.5 482.1 180 504 231.4 504c109 0 198-80.6 207.4-188.4.9-10.6-7-19.6-17.7-20.5-10.6-.9-19.6 7-20.5 17.7z",
  },
  "Web Application Firewall": {
    viewBox: "0 0 512 512",
    // shield
    path: "M256 0c-17 0-33.1 4.5-48 10.4L80 64v176c0 135.2 81.2 220.5 160.3 260.9 9.8 5 21.3 5 31.1 0C350.8 460.5 432 375.2 432 240V64l-128-53.6C289.1 4.5 273 0 256 0z",
  },
  "DDoS Mitigation": {
    viewBox: "0 0 640 512",
    // shield bolt
    path: "M256 0c-17 0-33.1 4.5-48 10.4L80 64v176c0 135.2 81.2 220.5 160.3 260.9 9.8 5 21.3 5 31.1 0C350.8 460.5 432 375.2 432 240V64L304 10.4C289.1 4.5 273 0 256 0zm43.5 188.9c6.5 4.7 8.3 13.6 4.2 20.4L277 256l26.7 46.7c4.1 6.8 2.3 15.7-4.2 20.4-6.5 4.7-15.5 3.6-20.6-2.4L224 256l54.9-64.2c5.1-6 14.1-7.1 20.6-2.9zM560 96h-96v48h96c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48h-96v48h96c53 0 96-43 96-96V192c0-53-43-96-96-96z",
  },
  "Basic SEO": {
    viewBox: "0 0 512 512",
    // magnifying glass
    path: "M500.3 443.7 380.6 324c28.4-34.9 45.5-79.4 45.5-128C426.1 87.7 338.4 0 231.1 0S36.1 87.7 36.1 196s87.7 196 195 196c48.6 0 93.1-17.1 128-45.5l119.7 119.7c15.6 15.6 40.9 15.6 56.6 0 15.6-15.6 15.6-40.9-.1-56.6zM231.1 320c-68.4 0-124-55.6-124-124S162.7 72 231.1 72s124 55.6 124 124-55.6 124-124 124z",
  },
  "Email support": {
    viewBox: "0 0 512 512",
    // envelope
    path: "M502.3 190.8 327.4 338c-15.9 13.4-39 13.4-54.9 0L9.7 190.8C3.9 186 0 178.8 0 171V80c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v91c0 7.8-3.9 15-9.7 19.8zM0 215.9l212.2 178.4c26.4 22.2 64.9 22.2 91.2 0L512 215.9V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V215.9z",
  },

  // Plus
  "Cold start prevention": {
    viewBox: "0 0 448 512",
    // thermometer snow-ish (using temperature-low)
    path: "M224 0c-35.3 0-64 28.7-64 64v232.6c-19.1 16.1-32 40.2-32 67.4 0 48.6 39.4 88 88 88s88-39.4 88-88c0-27.2-12.9-51.3-32-67.4V64c0-35.3-28.7-64-64-64zm16 340.7c9.6 5.5 16 15.9 16 27.3 0 17.7-14.3 32-32 32s-32-14.3-32-32c0-11.4 6.4-21.8 16-27.3V96c0-8.8 7.2-16 16-16s16 7.2 16 16v244.7z",
  },
  "Traffic & performance insights": {
    viewBox: "0 0 512 512",
    // chart line
    path: "M496 384h-16V48c0-26.5-21.5-48-48-48s-48 21.5-48 48v336H128V224c0-26.5-21.5-48-48-48s-48 21.5-48 48v160H16c-8.8 0-16 7.2-16 16v32c0 44.2 35.8 80 80 80h352c44.2 0 80-35.8 80-80v-32c0-8.8-7.2-16-16-16z",
  },
  "Content structure + conversion guidance": {
    viewBox: "0 0 512 512",
    // sitemap
    path: "M32 96c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32h64V96c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64h-64c-35.3 0-64-28.7-64-64v-32h-64v32c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V96zm96 224h256c44.2 0 80 35.8 80 80v16h-80v-16c0-8.8-7.2-16-16-16h-80v32c0 35.3-28.7 64-64 64h-32c-35.3 0-64-28.7-64-64v-32H144c-8.8 0-16 7.2-16 16v16H48v-16c0-44.2 35.8-80 80-80z",
  },
  "Enhanced SEO + analytics": {
    viewBox: "0 0 512 512",
    // chart + search (using chart-bar)
    path: "M32 32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V160H320c-17.7 0-32-14.3-32-32V32H32zm352 224v160H320V256h64zm-128 80v80h-64v-80h64zm256-144v224h-64V192h64zM352 32v96h96L352 32z",
  },
  "Priority support": {
    viewBox: "0 0 512 512",
    // headset
    path: "M256 32C132.3 32 32 132.3 32 256v64c0 35.3 28.7 64 64 64h48v-128H96v-16c0-88.4 71.6-160 160-160s160 71.6 160 160v16h-48v128h48c35.3 0 64-28.7 64-64v-64C480 132.3 379.7 32 256 32zm-64 352h128c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32z",
  },
  "Custom components + sections": {
    viewBox: "0 0 512 512",
    // puzzle piece
    path: "M192 0c-17.7 0-32 14.3-32 32v64H96c-35.3 0-64 28.7-64 64v64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32v64c0 35.3 28.7 64 64 64h64v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h64c35.3 0 64-28.7 64-64v-64h-64c-17.7 0-32-14.3-32-32s14.3-32 32-32h64v-64c0-35.3-28.7-64-64-64h-64V32c0-17.7-14.3-32-32-32z",
  },

  // Business
  "Faster builds with prioritized CI": {
    viewBox: "0 0 512 512",
    // gauge / tachometer
    path: "M256 32C132.3 32 32 132.3 32 256c0 44.2 14.1 85 37.9 118.4 7.6 10.6 22.6 13.1 33.2 5.5l28.2-20.2c10.6-7.6 13.1-22.6 5.5-33.2-13.2-18.6-21-41.4-21-66.5 0-61.9 50.1-112 112-112s112 50.1 112 112c0 25.1-7.8 47.9-21 66.5-7.6 10.6-5.1 25.6 5.5 33.2l28.2 20.2c10.6 7.6 25.6 5.1 33.2-5.5C465.9 341 480 300.2 480 256 480 132.3 379.7 32 256 32zm16 120v112c0 8.8-7.2 16-16 16h-88c-8.8 0-16-7.2-16-16s7.2-16 16-16h72V152c0-8.8 7.2-16 16-16s16 7.2 16 16z",
  },
  "Advanced caching & ISR configuration": {
    viewBox: "0 0 512 512",
    // layer group
    path: "M256 0 0 128l256 128 256-128L256 0zm0 320L0 192v128l256 128 256-128V192L256 320zm0 192L0 384v80c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-80L256 512z",
  },
  "Technical SEO improvements": {
    viewBox: "0 0 512 512",
    // code
    path: "M278.6 32h-45.2c-8.5 0-15.7 6.1-17.1 14.5L153 448.9c-1.8 11 6.7 21.1 17.8 21.1h45.2c8.5 0 15.7-6.1 17.1-14.5L296.4 53.1c1.8-11-6.7-21.1-17.8-21.1zM80.3 143.7 8.6 215.4c-11.5 11.5-11.5 30.1 0 41.6l71.7 71.7c4.7 4.7 11 7.3 17.7 7.3H128c17.8 0 26.7-21.5 14.1-34.1L96.2 256l45.9-45.9c12.6-12.6 3.7-34.1-14.1-34.1H98c-6.6 0-13 2.6-17.7 7.7zM431.7 143.7c-4.7-5.1-11.1-7.7-17.7-7.7H384c-17.8 0-26.7 21.5-14.1 34.1L415.8 256l-45.9 45.9c-12.6 12.6-3.7 34.1 14.1 34.1h30c6.6 0 13-2.6 17.7-7.3l71.7-71.7c11.5-11.5 11.5-30.1 0-41.6l-71.7-71.7z",
  },
  "Performance budgets (Core Web Vitals)": {
    viewBox: "0 0 512 512",
    // stopwatch
    path: "M256 48c-114.9 0-208 93.1-208 208s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 368c-88.4 0-160-71.6-160-160S167.6 96 256 96s160 71.6 160 160-71.6 160-160 160zm16-272h-32c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16h-64v-80c0-8.8-7.2-16-16-16zM208 0h96c8.8 0 16 7.2 16 16v32H192V16c0-8.8 7.2-16 16-16z",
  },

  // Enterprise
  "Unlimited pages & components": {
    viewBox: "0 0 640 512",
    // infinity
    path: "M224 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c33.4 0 63.8 12.9 86.5 34l21.5 20.3 21.5-20.3C376.2 140.9 406.6 128 440 128c70.7 0 128 57.3 128 128s-57.3 128-128 128c-33.4 0-63.8-12.9-86.5-34L332 329.7 310.5 350c-22.7 21.1-53.1 34-86.5 34zm0-64c16.7 0 32-6.4 43.3-16.9L288 282.7l-20.7-20.4C256 251.8 240.7 245.3 224 245.3c-35.3 0-64 28.7-64 64s28.7 64 64 64zm216-74.7c-16.7 0-32 6.4-43.3 16.9L376 282.7l20.7 20.4c11.3 10.5 26.6 16.9 43.3 16.9 35.3 0 64-28.7 64-64s-28.7-64-64-64z",
  },
  "Advanced security (SSO, RBAC)": {
    viewBox: "0 0 512 512",
    // user shield
    path: "M256 0c-17 0-33.1 4.5-48 10.4L80 64v176c0 135.2 81.2 220.5 160.3 260.9 9.8 5 21.3 5 31.1 0C350.8 460.5 432 375.2 432 240V64L304 10.4C289.1 4.5 273 0 256 0zm0 240c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zm96 160.9c-29.6 21.1-62.4 36.7-96 46.9-33.6-10.2-66.4-25.8-96-46.9V352c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v48.9z",
  },
  "Compliance support (SOC 2, GDPR)": {
    viewBox: "0 0 384 512",
    // file shield (document + check)
    path: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.3 0-24-10.7-24-24zm-48 248c0 6.4-3.1 12.4-8.3 16l-48 32c-8.1 5.4-19.1 3.2-24.5-4.9s-3.2-19.1 4.9-24.5l39.9-26.6V280c0-9.7 7.9-17.6 17.6-17.6S176 270.3 176 280v104zm80-304h117.5L256 0v80z",
  },
  "Custom SLAs & uptime guarantees": {
    viewBox: "0 0 512 512",
    // handshake / contract feel (using file-signature-ish)
    path: "M256 0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V160L256 0zM96 352h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0-64h224c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm160-128V32l128 128H256z",
  },
  "Dedicated support & onboarding": {
    viewBox: "0 0 640 512",
    // user-tie / people-carry (using users)
    path: "M96 128a96 96 0 1 0 192 0A96 96 0 1 0 96 128zm384 32a80 80 0 1 0-160 0 80 80 0 1 0 160 0zM0 482.3C0 383.8 79.8 304 178.3 304h27.4c31.6 0 62.7 7.8 90.6 22.6-33.5 26.2-55 67-55 112.7V496H64c-35.3 0-64-28.7-64-64v50.3zM640 496v-56.7c0-70.7-57.3-128-128-128h-27.4c-30.3 0-59.2 6.4-85.3 17.9 20.3 25.9 32.6 58.5 32.6 94.1V496h208z",
  },
};

const defaultIcon: IconDef = {
  viewBox: "0 0 512 512",
  // circle check
  path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm124.3 185.7-146 146c-6.2 6.2-16.4 6.2-22.6 0l-70-70c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l58.7 58.7 134.7-134.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z",
};

function FeatureIcon({ label }: { label: string }) {
  const icon = faIcons[label] ?? defaultIcon;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  // “All X features, plus:” text per plan
  const includedFeaturesLabel: Partial<Record<Plan["key"], string>> = {
    plus: "All Hobby features, plus:",
    business: "All Plus features, plus:",
    enterprise: "All Business features, plus:",
  };

  return (
    <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <h1
          className="typography__heading1__T3m8s"
          style={{ margin: 0, textAlign: "center" }}
        >
          Pricing
        </h1>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <p
          className="typography__emphasize__M9J2o"
          style={{ margin: 0, textAlign: "center" }}
        >
          Built on Next.js + Vercel, with Shopify-ready options for commerce.
          <br aria-hidden="true" />
          Upgrade to enable more insights, enhanced security and additional features.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "112px" } as CSSProperties}
        />

        <div className="pricing__grid__L7p3s">
          {plans.map((plan) => {
            const amount =
              plan.showBillingToggle && plan.monthlyAmount && plan.yearlyAmount
                ? isYearly
                  ? plan.yearlyAmount
                  : plan.monthlyAmount
                : null;

            const topLabel = includedFeaturesLabel[plan.key];

            return (
              <article
                key={plan.key}
                className="module__card__H5k8q"
                data-highlighted={plan.highlighted ? "true" : "false"}
              >
                <div className="pricing__card-top__A1b2c">
                  <h4
                    className="typography__heading4__Z7p4s"
                    style={{ margin: 0, paddingInline: 24 }}
                  >
                    {plan.name}
                  </h4>

                  <div
                    className="Spacer-module__root__NM019"
                    style={{ "--height": "12px" } as CSSProperties}
                  />

                  <div className="pricing__price__T7g2m">
                    <span className="typography__body__K4n7p">
                      {plan.description}
                    </span>

                    <span className="typography__body__K4n7p bitC1">
                      {amount != null ? (
                        <>
                          $<RollingNumber value={amount} />
                          {plan.priceSuffix}
                        </>
                      ) : plan.priceHref ? (
                        <a href={plan.priceHref} className="typography__link__B7s3m">
                          {plan.priceText}
                        </a>
                      ) : (
                        plan.priceText
                      )}
                    </span>

                    <span className="typography__body__K4n7p">
                      {plan.description2}
                    </span>
                  </div>

                  <div className="pricing__billing__C2d3e">
                    {plan.showBillingToggle && (
                      <div
                        className="root__toggle-wrapper__T7g2m"
                        style={{ scale: 0.7, margin: "0 2px 0 -6px" }}
                      >
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          checked={isYearly}
                          onChange={(e) => setIsYearly(e.target.checked)}
                        />
                        <label
                          className="root__toggle-btn__T7g2m"
                          htmlFor={`billingToggle-${plan.key}`}
                        />
                      </div>
                    )}

                    <span className="typography__small__Q9j2p">
                      {plan.billingLabelYearly}
                    </span>
                  </div>
                </div>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

                {/* NEW: label above features list */}
                {topLabel && (
                  <p
                    className="typography__small__Q9j2p"
                    style={{ padding: "0 24px 10px" }}
                  >
                    {topLabel}
                  </p>
                )}

                <ul className="pricing__features__M93j8">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing__feature__P5k8p">
                      <span className="pricing__check__Z3n7q" aria-hidden="true">
                        <FeatureIcon label={f} />
                      </span>
                      <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

                <div className="pricing__actions__Q6z2k">
                  <a
                    href={plan.cta.href}
                    className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h pricing__cta__X1y2z"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{plan.cta.label}</span>
                  </a>

                  {plan.showAltSalesLink && (
                    <p className="typography__small__Q9j2p pricing__alt__P5k8p" style={{ margin: 0 }}>
                      or{" "}
                      <a href="/contact" className="typography__link__B7s3m">
                        Talk to sales
                      </a>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <style jsx>{`
          .rollNumber {
            display: inline-flex;
            align-items: baseline;
            transform: translateY(2px);
          }

          .rollDigit {
            position: relative;
            width: 0.62em;
            height: 1em;
            overflow: hidden;
          }

          .rollDigitInner {
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .rollTick {
            display: block;
            height: 1em;
            line-height: 1em;
            text-align: center;
          }
        `}</style>
      </div>
    </section>
  );
}
