"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  // For dial plans (Plus/Business)
  monthlyAmount?: number;
  yearlyAmount?: number;

  // For non-dial plans (Hobby/Enterprise)
  staticPrice?: string;

  currency?: string; // e.g. "$"
  unit?: string; // e.g. "/mo"

  description: string;
  description2: string;
  billingLabel: string;

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
    staticPrice: "$0",
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
    monthlyAmount: 12,
    yearlyAmount: 10,
    currency: "$",
    unit: "/mo",
    description: "",
    description2: " + aditional features",
    billingLabel: "Billed yearly",
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
    monthlyAmount: 18,
    yearlyAmount: 16,
    currency: "$",
    unit: "/mo",
    description: "",
    description2: " + aditional features",
    billingLabel: "Billed yearly",
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
    staticPrice: "Contact us",
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

function PriceDial({
  amount,
  currency = "$",
  unit = "/mo",
  className,
}: {
  amount: number;
  currency?: string;
  unit?: string;
  className?: string;
}) {
  const [current, setCurrent] = useState<number>(amount);
  const [next, setNext] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const runningRef = useRef(false);

  useEffect(() => {
    if (amount === current) return;

    // If a new change comes in mid-animation, we just "retarget" from whatever is current now.
    if (runningRef.current) return;

    runningRef.current = true;

    const stepOnce = async () => {
      let from = current;

      // Decide direction based on target vs current
      const dir: "up" | "down" = amount > from ? "down" : "up";
      setDirection(dir);

      while (from !== amount) {
        const to = from + (amount > from ? 1 : -1);

        // Show next value
        setNext(to);

        // Wait for the visual transition
        await new Promise((r) => window.setTimeout(r, 160));

        // Commit
        setCurrent(to);
        setNext(null);

        // Small pause so the tick feels like a dial
        await new Promise((r) => window.setTimeout(r, 40));

        from = to;
      }

      runningRef.current = false;
    };

    stepOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <span className={["priceDial", className ?? ""].filter(Boolean).join(" ")}>
      <span className="priceDialFixed">{currency}</span>

      <span
        className={[
          "priceDialWindow",
          next !== null ? "is-animating" : "",
          next !== null ? `dir-${direction}` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-live="polite"
      >
        <span className="priceDialNum current">{current}</span>
        {next !== null && <span className="priceDialNum next">{next}</span>}
      </span>

      <span className="priceDialFixed">{unit}</span>
    </span>
  );
}

export default function PricingPage() {
  // One shared state controls BOTH Plus and Business.
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const isYearly = billingCycle === "yearly";

  const toggleTo = (next: BillingCycle) => setBillingCycle(next);

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

            const dialAmount =
              showToggle && plan.monthlyAmount != null && plan.yearlyAmount != null
                ? isYearly
                  ? plan.yearlyAmount
                  : plan.monthlyAmount
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

                    {dialAmount !== null ? (
                      <PriceDial
                        amount={dialAmount}
                        currency={plan.currency ?? "$"}
                        unit={plan.unit ?? "/mo"}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">
                        {plan.staticPrice ?? ""}
                      </span>
                    )}

                    {/* stays the same no matter what */}
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
                        <label className="root__toggle-btn__T7g2m" htmlFor={`billingToggle-${plan.key}`} />
                      </div>
                    ) : null}

                    {/* billing label does NOT change */}
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

      {/* Dial animation CSS */}
      <style jsx>{`
        .priceDial {
          display: inline-flex;
          align-items: baseline;
          gap: 0.1em;
        }

        .priceDialFixed {
          white-space: nowrap;
        }

        .priceDialWindow {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.25em;
          line-height: 1.25em;
          vertical-align: bottom;
          min-width: 2ch;
        }

        .priceDialNum {
          position: absolute;
          left: 0;
          top: 0;
          will-change: transform, opacity;
          white-space: nowrap;
        }

        .priceDialNum.current {
          transform: translateY(0%);
          opacity: 1;
        }

        /* DOWN = new comes from above, old exits down */
        .priceDialWindow.is-animating.dir-down .priceDialNum.current {
          animation: dialDownCurrent 160ms ease-in forwards;
        }
        .priceDialWindow.is-animating.dir-down .priceDialNum.next {
          transform: translateY(-110%);
          animation: dialDownNext 160ms ease-in forwards;
        }

        /* UP = new comes from below, old exits up */
        .priceDialWindow.is-animating.dir-up .priceDialNum.current {
          animation: dialUpCurrent 160ms ease-in forwards;
        }
        .priceDialWindow.is-animating.dir-up .priceDialNum.next {
          transform: translateY(110%);
          animation: dialUpNext 160ms ease-in forwards;
        }

        @keyframes dialDownCurrent {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(110%);
            opacity: 0;
          }
        }
        @keyframes dialDownNext {
          from {
            transform: translateY(-110%);
            opacity: 0.6;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes dialUpCurrent {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(-110%);
            opacity: 0;
          }
        }
        @keyframes dialUpNext {
          from {
            transform: translateY(110%);
            opacity: 0.6;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .priceDialWindow {
            overflow: visible;
            height: auto;
          }
          .priceDialNum {
            position: static;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
