"use client";

import "@/styles/pages/pricing/pricing.css";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

// Geist (Vercel-style) outline icons (regular, not solid)
import { Check } from "@geist-ui/icons";

/**
 * Custom Geist SVG icons (inline) — use `currentColor` so they inherit text color.
 * You can add more feature-specific icons here and map them in `getFeatureIcon`.
 */
function FirewallIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      data-testid="geist-icon"
      height={size}
      width={size}
      viewBox="0 0 16 16"
      strokeLinejoin="round"
      style={{ color: "currentColor" }}
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_4628_1900)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.25 0C0.559644 0 0 0.559645 0 1.25V12.25C0 12.9404 0.559644 13.5 1.25 13.5H4.5V12H1.5V9.5H5.25H6V8.75V5.5H15.25H16V4.75V1.25C16 0.559644 15.4404 0 14.75 0H1.25ZM4.5 8H1.5V5.5H4.5V8ZM1.5 4H4.5V1.5H1.5V4ZM6 4V1.5H10V4H6ZM11.5 4H14.5V1.5H11.5V4ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_4628_1900">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <mask id="path-1-inside-1_4628_1900" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.25 0C0.559644 0 0 0.559645 0 1.25V12.25C0 12.9404 0.559644 13.5 1.25 13.5H4.5V12H1.5V9.5H5.25H6V8.75V5.5H15.25H16V4.75V1.25C16 0.559644 15.4404 0 14.75 0H1.25ZM4.5 8H1.5V5.5H4.5V8ZM1.5 4H4.5V1.5H1.5V4ZM6 4V1.5H10V4H6ZM11.5 4H14.5V1.5H11.5V4ZM13.2307 12C13.2 12.815 13.0938 13.6278 12.9124 14.4279C13.8564 13.9717 14.5462 13.0724 14.7118 12H13.2307ZM11.8047 14.7359C11.7044 14.7452 11.6028 14.75 11.5 14.75C11.3972 14.75 11.2956 14.7452 11.1953 14.7359C10.9494 13.839 10.8077 12.9211 10.77 12H12.23C12.1923 12.9211 12.0506 13.839 11.8047 14.7359ZM13.2307 11C13.2 10.185 13.0938 9.37224 12.9124 8.57213C13.8564 9.02834 14.5462 9.92764 14.7118 11H13.2307ZM12.23 11C12.1923 10.0789 12.0506 9.16097 11.8047 8.2641C11.7044 8.25477 11.6028 8.25 11.5 8.25C11.3972 8.25 11.2956 8.25477 11.1953 8.2641C10.9494 9.16097 10.8077 10.0789 10.77 11H12.23ZM9.76925 11C9.80005 10.185 9.90616 9.37224 10.0876 8.57213C9.1436 9.02834 8.45381 9.92764 8.28822 11H9.76925ZM10.0876 14.4279C9.90616 13.6278 9.80005 12.815 9.76925 12H8.28822C8.45381 13.0724 9.1436 13.9717 10.0876 14.4279ZM11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16Z"
          />
        </mask>
      </defs>
    </svg>
  );
}

/**
 * Map a feature string -> icon component.
 * Add more cases as you add more feature-specific icons.
 */
function getFeatureIcon(feature: string) {
  if (feature === "Web Application Firewall") return <FirewallIcon size={16} />;
  return <Check size={16} />;
}

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
          Upgrade to enable more insights, enhanced security and additional
          features.
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
                        <a
                          href={plan.priceHref}
                          className="typography__link__B7s3m"
                        >
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

                {/* Label above features list */}
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
                      {/* Feature-specific Geist icon */}
                      <span className="pricing__check__Z3n7q" aria-hidden="true">
                        {getFeatureIcon(f)}
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
                    <p
                      className="typography__small__Q9j2p pricing__alt__P5k8p"
                      style={{ margin: 0 }}
                    >
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
