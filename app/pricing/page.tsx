"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";
type RollDirection = "up" | "down";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  priceMonthly?: string;
  priceYearly: string;

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
    description2: " + aditional features",
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
    description: "",
    description2: " + aditional features",
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

function PriceRoller({
  value,
  direction,
  className,
}: {
  value: string;
  direction: RollDirection;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const [incoming, setIncoming] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<RollDirection>(direction);

  useEffect(() => {
    if (value === display) return;

    setAnimDir(direction);
    setIncoming(value);

    const t = window.setTimeout(() => {
      setDisplay(value);
      setIncoming(null);
    }, 240);

    return () => window.clearTimeout(t);
  }, [value, direction, display]);

  return (
    <span
      className={[
        "priceRoll",
        incoming ? "is-animating" : "",
        incoming ? `dir-${animDir}` : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
    >
      <span className="priceRollItem current">{display}</span>
      {incoming && <span className="priceRollItem next">{incoming}</span>}
    </span>
  );
}

export default function PricingPage() {
  // One shared state controls BOTH Plus and Business.
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [rollDirection, setRollDirection] = useState<RollDirection>("down");

  const toggleTo = (next: BillingCycle) => {
    // monthly -> yearly should roll DOWN (new comes from above)
    // yearly -> monthly should roll UP (new comes from below)
    setRollDirection(next === "yearly" ? "down" : "up");
    setBillingCycle(next);
  };

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
            const showToggle = Boolean(plan.showBillingToggle);

            const priceValue = showToggle
              ? isYearly
                ? plan.priceYearly
                : plan.priceMonthly ?? plan.priceYearly
              : plan.priceYearly;

            const billingLabel = showToggle
              ? isYearly
                ? plan.billingLabelYearly
                : plan.billingLabelMonthly ?? plan.billingLabelYearly
              : plan.billingLabelYearly;

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

                    {showToggle ? (
                      <PriceRoller
                        value={priceValue}
                        direction={rollDirection}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">{priceValue}</span>
                    )}

                    <span className="typography__body__K4n7p">{plan.description2}</span>
                  </div>

                  {/* Toggle goes RIGHT BEFORE the billing label (Plus + Business only) */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {showToggle ? (
                      <div className="root__toggle-wrapper__T7g2m">
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          name={`billingToggle-${plan.key}`}
                          checked={isYearly}
                          onChange={(e) => toggleTo(e.target.checked ? "yearly" : "monthly")}
                          aria-label="Toggle yearly billing"
                        />
                        <label
                          className="root__toggle-btn__T7g2m"
                          htmlFor={`billingToggle-${plan.key}`}
                        />
                      </div>
                    ) : null}

                    <span className="typography__small__Q9j2p pricing__billing__C2d3e">{billingLabel}</span>
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

      {/* Animation CSS (kept local so you can paste this file anywhere) */}
      <style jsx>{`
        .priceRoll {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.25em;
          line-height: 1.25em;
          vertical-align: bottom;
          min-width: 3.5ch;
        }

        .priceRollItem {
          position: absolute;
          left: 0;
          top: 0;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        .priceRollItem.current {
          transform: translateY(0%);
          opacity: 1;
        }

        .priceRollItem.next {
          opacity: 1;
        }

        /* DOWN: old exits down, new enters from above */
        .priceRoll.is-animating.dir-down .priceRollItem.current {
          animation: rollDownCurrent 240ms ease-in forwards;
        }
        .priceRoll.is-animating.dir-down .priceRollItem.next {
          transform: translateY(-110%);
          animation: rollDownNext 240ms ease-in forwards;
        }

        /* UP: old exits up, new enters from below */
        .priceRoll.is-animating.dir-up .priceRollItem.current {
          animation: rollUpCurrent 240ms ease-in forwards;
        }
        .priceRoll.is-animating.dir-up .priceRollItem.next {
          transform: translateY(110%);
          animation: rollUpNext 240ms ease-in forwards;
        }

        @keyframes rollDownCurrent {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(110%);
            opacity: 0;
          }
        }
        @keyframes rollDownNext {
          from {
            transform: translateY(-110%);
            opacity: 0.9;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes rollUpCurrent {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(-110%);
            opacity: 0;
          }
        }
        @keyframes rollUpNext {
          from {
            transform: translateY(110%);
            opacity: 0.9;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .priceRoll.is-animating .priceRollItem.current,
          .priceRoll.is-animating .priceRollItem.next {
            animation: none !important;
          }
          .priceRollItem {
            position: static;
          }
          .priceRoll {
            overflow: visible;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
