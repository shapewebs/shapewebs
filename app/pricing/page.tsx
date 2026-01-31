"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";
type RollDirection = "up" | "down";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  priceMonthly?: string; // shown when cycle === "monthly"
  priceYearly?: string; // shown when cycle === "yearly"

  description: string;
  description2: string;

  billingLabelMonthly?: string;
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
    priceYearly: "$0",
    description: "",
    description2: "",
    billingLabelYearly: "No maintenance price",
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
    priceMonthly: "$12/mo",
    priceYearly: "$10/mo",
    description: "",
    description2: " + additional features",
    billingLabelMonthly: "Billed monthly",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
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
  },
  {
    key: "business",
    name: "Business",
    priceMonthly: "$18/mo",
    priceYearly: "$16/mo",
    description: " + additional features",
    description2: "",
    billingLabelMonthly: "Billed monthly",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Everything in Plus",
      "9–15 pages",
      "Custom components + sections",
      "Integrations (forms, CRM, tracking)",
      "Technical SEO improvements",
    ],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceYearly: "Contact us",
    description: "",
    description2: "",
    billingLabelYearly: "Annual billing only",
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

function PriceRoll({
  value,
  direction,
}: {
  value: string;
  direction: RollDirection;
}) {
  const [prev, setPrev] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value === prevValueRef.current) return;

    // start animation: keep previous value, show new value
    setPrev(prevValueRef.current);
    setAnimating(true);

    const t = window.setTimeout(() => {
      setAnimating(false);
      setPrev(null);
      prevValueRef.current = value;
    }, 320);

    return () => window.clearTimeout(t);
  }, [value]);

  const cls =
    "priceRoll__root" +
    (animating ? ` priceRoll__anim priceRoll__${direction}` : "");

  return (
    <span className={cls} aria-label={value}>
      <span className="priceRoll__slot">
        {/* previous value (animates out) */}
        {prev !== null && (
          <span className="priceRoll__prev" aria-hidden="true">
            {prev}
          </span>
        )}

        {/* current value (animates in) */}
        <span className="priceRoll__curr">{value}</span>
      </span>
    </span>
  );
}

export default function PricingPage() {
  // ✅ One shared state for both Plus + Business toggles
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [rollDir, setRollDir] = useState<RollDirection>("down");

  const toggleBilling = (checkedYearly: boolean) => {
    // checked = yearly
    const next: BillingCycle = checkedYearly ? "yearly" : "monthly";
    // monthly -> yearly should roll DOWN, yearly -> monthly roll UP
    setRollDir(next === "yearly" ? "down" : "up");
    setBillingCycle(next);
  };

  const getPrice = (plan: Plan) => {
    if (!plan.showBillingToggle) return plan.priceYearly ?? "";
    return billingCycle === "yearly" ? plan.priceYearly ?? "" : plan.priceMonthly ?? "";
  };

  const getBillingLabel = (plan: Plan) => {
    if (!plan.showBillingToggle) return plan.billingLabelYearly;
    return billingCycle === "yearly"
      ? plan.billingLabelYearly
      : plan.billingLabelMonthly ?? plan.billingLabelYearly;
  };

  return (
    <section className="pricing__container__Q7j3s">
      {/* Minimal CSS for the rolling price animation */}
      <style jsx global>{`
        .priceRoll__root {
          display: inline-block;
        }
        .priceRoll__slot {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.2em;
          line-height: 1.2em;
          vertical-align: bottom;
        }
        .priceRoll__curr,
        .priceRoll__prev {
          display: block;
          white-space: nowrap;
        }

        /* Default positions (no animation) */
        .priceRoll__curr {
          transform: translateY(0);
          opacity: 1;
        }

        /* During animation we absolutely stack */
        .priceRoll__anim .priceRoll__curr,
        .priceRoll__anim .priceRoll__prev {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }

        /* DOWN: new comes from top, old exits down */
        .priceRoll__down .priceRoll__curr {
          animation: priceRollInDown 320ms ease forwards;
        }
        .priceRoll__down .priceRoll__prev {
          animation: priceRollOutDown 320ms ease forwards;
        }

        @keyframes priceRollInDown {
          from {
            transform: translateY(-110%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes priceRollOutDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(110%);
            opacity: 0;
          }
        }

        /* UP: new comes from bottom, old exits up */
        .priceRoll__up .priceRoll__curr {
          animation: priceRollInUp 320ms ease forwards;
        }
        .priceRoll__up .priceRoll__prev {
          animation: priceRollOutUp 320ms ease forwards;
        }

        @keyframes priceRollInUp {
          from {
            transform: translateY(110%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes priceRollOutUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-110%);
            opacity: 0;
          }
        }
      `}</style>

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
          {plans.map((plan) => (
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
                    {/* ✅ Price changes with billingCycle + rolls up/down */}
                    <PriceRoll value={getPrice(plan)} direction={rollDir} />
                  </span>

                  <span className="typography__body__K4n7p">
                    {/* ✅ description2 stays the same always */}
                    {plan.description2}
                  </span>
                </div>

                {/* Toggle (only on Plus & Business) + billing label */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {plan.showBillingToggle ? (
                    <div className="root__toggle-wrapper__T7g2m">
                      <input
                        className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                        id={`billingToggle-${plan.key}`}
                        type="checkbox"
                        // ✅ one shared state: toggling either affects both
                        checked={billingCycle === "yearly"}
                        onChange={(e) => toggleBilling(e.target.checked)}
                      />
                      <label
                        className="root__toggle-btn__T7g2m"
                        htmlFor={`billingToggle-${plan.key}`}
                      />
                    </div>
                  ) : null}

                  <span className="typography__small__Q9j2p pricing__billing__C2d3e">
                    {getBillingLabel(plan)}
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
          ))}
        </div>
      </div>
    </section>
  );
}
