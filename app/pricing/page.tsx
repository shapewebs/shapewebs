"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  // For dial animation, store numeric values for the toggle plans
  priceMonthlyNum?: number;
  priceYearlyNum?: number;

  // Non-toggle plans can still be plain strings
  priceStatic?: string;

  priceSuffix?: string; // e.g. "/mo"
  pricePrefix?: string; // e.g. "$"

  description: string;
  description2: string;

  // Per your request: this should NOT change when toggling
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
    priceStatic: "$0",
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
    priceMonthlyNum: 12,
    priceYearlyNum: 10,
    pricePrefix: "$",
    priceSuffix: "/mo",
    description: "",
    description2: " + aditional features",
    billingLabel: "Billed yearly", // stays the same (your request)
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
    priceMonthlyNum: 18,
    priceYearlyNum: 16,
    pricePrefix: "$",
    priceSuffix: "/mo",
    description: "",
    description2: " + aditional features",
    billingLabel: "Billed yearly", // stays the same (your request)
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
    priceStatic: "Contact us",
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
  value,
  prefix = "$",
  suffix = "/mo",
  className,
  stepMs = 95,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  stepMs?: number;
}) {
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const [current, setCurrent] = useState<number>(value);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [dir, setDir] = useState<"up" | "down">("down");

  const queueRef = useRef<number[]>([]);
  const runningRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Format ONLY the number as the animated part; keep prefix/suffix stable so adjacent text doesn't "change"
  const format = (n: number) => `${prefix}${n}${suffix}`;

  const clearTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const runNext = () => {
    clearTimer();

    const next = queueRef.current.shift();
    if (next === undefined) {
      runningRef.current = false;
      return;
    }

    // determine direction for this step
    setDir(next > current ? "up" : "down");

    // animate current -> next
    setIncoming(next);

    timerRef.current = window.setTimeout(() => {
      setCurrent(next);
      setIncoming(null);
      // schedule next tick
      timerRef.current = window.setTimeout(runNext, stepMs);
    }, 180);
  };

  useEffect(() => {
    // If reduced motion: just jump to new value
    if (prefersReduced) {
      setCurrent(value);
      setIncoming(null);
      queueRef.current = [];
      runningRef.current = false;
      clearTimer();
      return;
    }

    if (value === current) return;

    // Build the full step-by-step sequence: e.g. 12 -> 11 -> 10
    const step = value > current ? 1 : -1;
    const seq: number[] = [];
    for (let n = current + step; step > 0 ? n <= value : n >= value; n += step) {
      seq.push(n);
    }

    // Replace queue with the new target path
    queueRef.current = seq;

    if (!runningRef.current) {
      runningRef.current = true;
      runNext();
    }

    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); // intentionally only respond to target value changes

  return (
    <span
      className={[
        "priceDial",
        incoming !== null ? "is-animating" : "",
        incoming !== null ? `dir-${dir}` : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
    >
      {/* keep prefix/suffix stable by rendering the full string but only swapping number */}
      <span className="priceDialItem current">{format(current)}</span>
      {incoming !== null && <span className="priceDialItem next">{format(incoming)}</span>}
    </span>
  );
}

export default function PricingPage() {
  // One shared toggle state controls BOTH Plus and Business (your requirement)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const isYearly = billingCycle === "yearly";

  const toggleBilling = (checked: boolean) => {
    setBillingCycle(checked ? "yearly" : "monthly");
  };

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

            // For Plus/Business: dial between monthly/yearly numeric prices
            const dialTarget =
              showToggle && plan.priceMonthlyNum != null && plan.priceYearlyNum != null
                ? isYearly
                  ? plan.priceYearlyNum
                  : plan.priceMonthlyNum
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

                    {dialTarget != null ? (
                      <PriceDial
                        value={dialTarget}
                        prefix={plan.pricePrefix ?? "$"}
                        suffix={plan.priceSuffix ?? "/mo"}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">{plan.priceStatic ?? plan.priceYearlyNum}</span>
                    )}

                    {/* description2 does NOT change */}
                    <span className="typography__body__K4n7p">{plan.description2}</span>
                  </div>

                  {/* Toggle RIGHT BEFORE the billing label (Plus + Business only).
                      Billing label text stays constant: "Billed yearly". */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {showToggle ? (
                      <div className="root__toggle-wrapper__T7g2m">
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          name={`billingToggle-${plan.key}`}
                          checked={isYearly}
                          onChange={(e) => toggleBilling(e.target.checked)}
                          aria-label="Toggle yearly pricing"
                        />
                        <label className="root__toggle-btn__T7g2m" htmlFor={`billingToggle-${plan.key}`} />
                      </div>
                    ) : null}

                    <span className="typography__small__Q9j2p pricing__billing__C2d3e">{plan.billingLabel}</span>
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

      {/* Dial animation CSS (local) */}
      <style jsx>{`
        .priceDial {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.25em;
          line-height: 1.25em;
          vertical-align: bottom;
          min-width: 6.5ch;
        }

        .priceDialItem {
          position: absolute;
          left: 0;
          top: 0;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        .priceDialItem.current {
          transform: translateY(0%);
          opacity: 1;
        }

        /* DOWN step: old exits down, new comes from above (like a dial rolling down) */
        .priceDial.is-animating.dir-down .priceDialItem.current {
          animation: dialDownCurrent 180ms ease-out forwards;
        }
        .priceDial.is-animating.dir-down .priceDialItem.next {
          transform: translateY(-90%);
          animation: dialDownNext 180ms ease-out forwards;
        }

        /* UP step: old exits up, new comes from below */
        .priceDial.is-animating.dir-up .priceDialItem.current {
          animation: dialUpCurrent 180ms ease-out forwards;
        }
        .priceDial.is-animating.dir-up .priceDialItem.next {
          transform: translateY(90%);
          animation: dialUpNext 180ms ease-out forwards;
        }

        @keyframes dialDownCurrent {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(90%);
            opacity: 0;
          }
        }
        @keyframes dialDownNext {
          from {
            transform: translateY(-90%);
            opacity: 0.2;
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
            transform: translateY(-90%);
            opacity: 0;
          }
        }
        @keyframes dialUpNext {
          from {
            transform: translateY(90%);
            opacity: 0.2;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .priceDial {
            overflow: visible;
            height: auto;
          }
          .priceDialItem {
            position: static;
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
