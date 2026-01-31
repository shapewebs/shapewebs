"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  // For plans that animate between monthly/yearly:
  priceMonthly?: number;
  priceYearly?: number;

  // For plans that don’t toggle:
  priceText?: string;

  description: string;
  description2: string;
  billingLabel: string;

  features: string[];
  highlighted?: boolean;
  cta: { label: string; href: string };
  showAltSalesLink?: boolean;

  // Show the shared toggle only on these cards:
  showBillingToggle?: boolean;
};

const plans: Plan[] = [
  {
    key: "hobby",
    name: "Hobby",
    priceText: "$0",
    description: "",
    description2: "",
    billingLabel: "No maintenance price",
    features: [
      "Next.js + Vercel deployment",
      "Performance-focused build",
      "Basic SEO setup",
      "1–3 pages",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "plus",
    name: "Plus",
    priceMonthly: 12,
    priceYearly: 10, // ✅ yearly-paid price
    description: "",
    description2: " + aditional features",
    billingLabel: "Billed yearly",
    features: [
      "Everything in Hobby",
      "4–8 pages",
      "Enhanced SEO + analytics",
      "Content structure + conversion guidance",
      "Priority support",
    ],
    highlighted: true,
    cta: { label: "Get Started", href: "/get-started" },
    showAltSalesLink: true,
    showBillingToggle: true,
  },
  {
    key: "business",
    name: "Business",
    priceMonthly: 18,
    priceYearly: 16, // ✅ yearly-paid price
    description: " + aditional features",
    description2: "",
    billingLabel: "Billed yearly",
    features: [
      "Everything in Plus",
      "9–15 pages",
      "Custom components + sections",
      "Integrations (forms, CRM, tracking)",
      "Technical SEO improvements",
    ],
    cta: { label: "Get Started", href: "/get-started" },
    showBillingToggle: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceText: "Contact us",
    description: "",
    description2: "",
    billingLabel: "Annual billing only",
    features: [
      "Shopify + Next.js architecture",
      "Custom storefront experiences",
      "Performance + scalability review",
      "Security + best practices",
      "Dedicated onboarding",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

/**
 * Rolls digits up/down when `value` changes.
 * Assumptions: small changes (no 9→0 wrap). Perfect for 12↔10 and 18↔16.
 */
function RollingNumber({
  value,
  prefix = "$",
  suffix = "/mo",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const prevRef = useRef<number>(value);
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const prev = prevRef.current;
    if (value !== prev) {
      setDirection(value > prev ? "up" : "down");
      prevRef.current = value;
    }
  }, [value]);

  const digits = useMemo(() => String(value).split("").map((d) => Number(d)), [value]);

  return (
    <span className={`rollPrice ${className ?? ""}`} aria-label={`${prefix}${value}${suffix}`}>
      <span className="rollPrefix">{prefix}</span>

      <span className={`rollDigits ${direction}`}>
        {digits.map((digit, idx) => (
          <span className="digitWindow" key={idx}>
            <span
              className="digitStack"
              style={{ transform: `translateY(-${digit * 100}%)` }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span className="digit" key={n}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>

      <span className="rollSuffix">{suffix}</span>

      {/* scoped styles (no color changes) */}
      <style jsx>{`
        .rollPrice {
          display: inline-flex;
          align-items: baseline;
          gap: 0.15em;
          white-space: nowrap;
        }

        .rollPrefix,
        .rollSuffix {
          display: inline-block;
        }

        .rollDigits {
          display: inline-flex;
          align-items: baseline;
        }

        /* Height is driven by current font-size (so it matches your typography class). */
        .digitWindow {
          position: relative;
          display: inline-block;
          height: 1em;
          overflow: hidden;
          width: 0.62em; /* tweak if you want tighter/wider digits */
        }

        .digitStack {
          display: flex;
          flex-direction: column;
          will-change: transform;
          transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* “Roll up” vs “roll down” feel: slightly different easing */
        .rollDigits.up .digitStack {
          transition-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
        }
        .rollDigits.down .digitStack {
          transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .digit {
          height: 1em;
          line-height: 1em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </span>
  );
}

function BillingToggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}) {
  return (
    <div className="root__toggle-wrapper__T7g2m">
      <input
        className="root__toggle__T7g2m root__toggle--ios__T7g2m"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="root__toggle-btn__T7g2m" htmlFor={id} />
    </div>
  );
}

export default function PricingPage() {
  // ✅ One shared state controls BOTH toggles
  // checked=true => yearly (as in previous code)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const isYearly = billingCycle === "yearly";

  return (
    <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <h1 className="typography__heading1__T3m8s" style={{ margin: 0, textAlign: "center" }}>
          Pricing
        </h1>

        <div className="Spacer-module__root__NM019" style={{ "--height": "24px" } as CSSProperties} />

        <p className="typography__emphasize__M9J2o" style={{ margin: 0, textAlign: "center" }}>
          Built on Next.js + Vercel, with Shopify-ready options for commerce.
          <br aria-hidden="true" />
          Upgrade to enable more insights, enhanced security and additional features.
        </p>

        <div className="Spacer-module__root__NM019" style={{ "--height": "112px" } as CSSProperties} />

        <div className="pricing__grid__L7p3s">
          {plans.map((plan) => {
            const showToggle = !!plan.showBillingToggle;

            // Price logic:
            // - Plus/Business: animated number changes with shared toggle
            // - Hobby/Enterprise: static text
            const hasRollingPrice = typeof plan.priceMonthly === "number" && typeof plan.priceYearly === "number";

            const shownNumber = hasRollingPrice
              ? isYearly
                ? plan.priceYearly!
                : plan.priceMonthly!
              : null;

            return (
              <article
                key={plan.key}
                className="module__card__H5k8q"
                data-highlighted={plan.highlighted ? "true" : "false"}
              >
                <div className="pricing__card-top__A1b2c">
                  <div className="pricing__plan-row__V2c3d">
                    <h4 className="typography__heading4__Z7p4s" style={{ margin: 0 }}>
                      {plan.name}
                    </h4>
                  </div>

                  <div className="Spacer-module__root__NM019" style={{ "--height": "12px" } as CSSProperties} />

                  <div className="pricing__price__T7g2m">
                    <span className="typography__body__K4n7p" style={{ margin: 0 }}>
                      {plan.description}
                    </span>

                    <span className="typography__body__K4n7p bitC1">
                      {hasRollingPrice ? (
                        <RollingNumber value={shownNumber!} prefix="$" suffix="/mo" />
                      ) : (
                        plan.priceText
                      )}
                    </span>

                    {/* ✅ description2 remains the same (never changes with toggle) */}
                    <span className="typography__body__K4n7p">{plan.description2}</span>
                  </div>

                  {/* Toggle + billing label row (toggle only for Plus/Business) */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {showToggle && (
                      <BillingToggle
                        id={`billingToggle-shared-${plan.key}`}
                        checked={isYearly}
                        onChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                      />
                    )}

                    <span className="typography__small__Q9j2p pricing__billing__C2d3e">
                      {plan.billingLabel}
                    </span>
                  </div>

                  <div className="Spacer-module__root__NM019" style={{ "--height": "16px" } as CSSProperties} />
                </div>

                <div className="Spacer-module__root__NM019" style={{ "--height": "20px" } as CSSProperties} />

                <ul className="pricing__features__M93j8">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing__feature__P5k8p">
                      <span className="pricing__check__Z3n7q" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path
                            d="M6.6 11.2 3.5 8.2a.8.8 0 0 1 1.1-1.1l2 2 4.5-4.6a.8.8 0 1 1 1.1 1.1l-5.1 5.6a.8.8 0 0 1-1.1 0Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="Spacer-module__root__NM019" style={{ "--height": "20px" } as CSSProperties} />

                <div className="pricing__actions__Q6z2k">
                  <a
                    href={plan.cta.href}
                    className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h pricing__cta__X1y2z"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{plan.cta.label}</span>
                  </a>

                  {plan.showAltSalesLink ? (
                    <p className="typography__small__Q9j2p pricing__alt__P5k8p" style={{ margin: 0 }}>
                      or{" "}
                      <a href="/contact" className="typography__link__B7s3m">
                        Talk to sales
                      </a>
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
