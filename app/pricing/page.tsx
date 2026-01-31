"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";
type RollDirection = "up" | "down";

type Plan = {
  key: PlanKey;
  name: string;

  // Only Plus/Business use the dial animation
  dial?: {
    monthly: number;
    yearly: number;
    suffix: string; // e.g. "/mo"
  };

  // For non-dial plans
  priceText?: string;

  description: string;
  description2: string;

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
    dial: { monthly: 12, yearly: 10, suffix: "/mo" },
    description: "",
    description2: " + aditional features",
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
    dial: { monthly: 18, yearly: 16, suffix: "/mo" },
    description: "",
    description2: " + aditional features",
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

function formatDialPrice(n: number, suffix: string) {
  return `$${n}${suffix}`;
}

/**
 * DialStepper
 * - When target changes, it animates number-by-number (e.g. 12 -> 11 -> 10)
 * - Each step does a small roll + fade.
 */
function DialStepper({
  value,
  direction,
  className,
}: {
  value: string; // formatted string e.g. "$12/mo"
  direction: RollDirection; // down: new comes from above, old exits down
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const [incoming, setIncoming] = useState<string | null>(null);
  const [dir, setDir] = useState<RollDirection>(direction);

  useEffect(() => {
    if (value === display) return;

    setDir(direction);
    setIncoming(value);

    const t = window.setTimeout(() => {
      setDisplay(value);
      setIncoming(null);
    }, 160);

    return () => window.clearTimeout(t);
  }, [value, direction, display]);

  return (
    <span
      className={[
        "dial",
        incoming ? "is-animating" : "",
        incoming ? `dir-${dir}` : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
    >
      <span className="dialItem current">{display}</span>
      {incoming && <span className="dialItem next">{incoming}</span>}
    </span>
  );
}

function useDialSequence(target: number, stepMs = 170) {
  const [current, setCurrent] = useState(target);
  const prevTargetRef = useRef(target);
  const runningRef = useRef<number | null>(null);

  useEffect(() => {
    const prevTarget = prevTargetRef.current;
    if (target === prevTarget) return;

    // Cancel any in-flight timer chain
    if (runningRef.current) {
      window.clearTimeout(runningRef.current);
      runningRef.current = null;
    }

    const dir: RollDirection = target < prevTarget ? "down" : "up";
    prevTargetRef.current = target;

    const step = () => {
      setCurrent((c) => {
        if (c === target) return c;
        return c + (target > c ? 1 : -1);
      });

      runningRef.current = window.setTimeout(() => {
        // keep stepping until we land on target
        setCurrent((c) => {
          if (c === target) return c;
          return c;
        });
        if (target !== (prev => prev)(target)) {
          // noop safety
        }
        // Read state on next tick by scheduling again:
        // We just schedule again unconditionally, but it will stop when current === target
        // via the guard inside setCurrent update.
        step();
      }, stepMs);
    };

    // Kick off the chain, but only if we need to move.
    runningRef.current = window.setTimeout(step, 0);

    return () => {
      if (runningRef.current) window.clearTimeout(runningRef.current);
      runningRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // Determine direction based on last movement intent (target vs previous target).
  const direction: RollDirection = useMemo(() => {
    const prevTarget = prevTargetRef.current;
    return target < prevTarget ? "down" : "up";
  }, [target]);

  return { current, direction };
}

export default function PricingPage() {
  // Shared toggle: one checkbox controls BOTH Plus & Business
  const [yearly, setYearly] = useState<boolean>(false);

  // Dial targets
  const plusTarget = yearly ? 10 : 12;
  const bizTarget = yearly ? 16 : 18;

  const plusDial = useDialSequence(plusTarget);
  const bizDial = useDialSequence(bizTarget);

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

            // Resolve dial state per plan (Plus/Business only)
            const isPlus = plan.key === "plus";
            const isBusiness = plan.key === "business";

            const dialNumber = isPlus ? plusDial.current : isBusiness ? bizDial.current : null;
            const dialDir = isPlus ? plusDial.direction : isBusiness ? bizDial.direction : "down";

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

                    {/* PRICE */}
                    {plan.dial && dialNumber !== null ? (
                      <DialStepper
                        value={formatDialPrice(dialNumber, plan.dial.suffix)}
                        direction={dialDir}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">{plan.priceText ?? ""}</span>
                    )}

                    {/* description2 stays constant always */}
                    <span className="typography__body__K4n7p">{plan.description2}</span>
                  </div>

                  {/* Toggle (Plus + Business only) + fixed billing label */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {showToggle ? (
                      <div className="root__toggle-wrapper__T7g2m">
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          name={`billingToggle-${plan.key}`}
                          checked={yearly}
                          onChange={(e) => setYearly(e.target.checked)}
                          aria-label="Toggle yearly pricing"
                        />
                        <label className="root__toggle-btn__T7g2m" htmlFor={`billingToggle-${plan.key}`} />
                      </div>
                    ) : null}

                    {/* IMPORTANT: this text never changes */}
                    <span className="typography__small__Q9j2p pricing__billing__C2d3e">
                      {showToggle ? "Billed yearly" : plan.key === "enterprise" ? "Annual billing only" : "No maintenance price"}
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
        .dial {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.25em;
          line-height: 1.25em;
          vertical-align: bottom;
          min-width: 5ch;
        }

        .dialItem {
          position: absolute;
          left: 0;
          top: 0;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        .dialItem.current {
          transform: translateY(0%);
          opacity: 1;
        }

        /* DOWN: old exits down, new enters from above */
        .dial.is-animating.dir-down .dialItem.current {
          animation: dialDownCurrent 160ms ease-in forwards;
        }
        .dial.is-animating.dir-down .dialItem.next {
          transform: translateY(-90%);
          animation: dialDownNext 160ms ease-in forwards;
        }

        /* UP: old exits up, new enters from below */
        .dial.is-animating.dir-up .dialItem.current {
          animation: dialUpCurrent 160ms ease-in forwards;
        }
        .dial.is-animating.dir-up .dialItem.next {
          transform: translateY(90%);
          animation: dialUpNext 160ms ease-in forwards;
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
            opacity: 0;
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
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dial.is-animating .dialItem.current,
          .dial.is-animating .dialItem.next {
            animation: none !important;
          }
          .dialItem {
            position: static;
          }
          .dial {
            overflow: visible;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
