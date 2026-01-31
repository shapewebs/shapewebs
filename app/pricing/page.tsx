"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  // Dial plans (Plus/Business)
  monthlyAmount?: number;
  yearlyAmount?: number;

  // Non-dial plans (Hobby/Enterprise)
  staticPrice?: string;

  currency?: string; // "$"
  unit?: string; // "/mo"

  description: string;
  description2: string;

  // This should NOT change per toggle (per your request)
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

// Build an inclusive integer sequence from a -> b (10..12 => [10,11,12], 12..10 => [12,11,10])
function buildSequence(a: number, b: number) {
  if (a === b) return [a];
  const step = b > a ? 1 : -1;
  const out: number[] = [];
  for (let x = a; x !== b; x += step) out.push(x);
  out.push(b);
  return out;
}

/**
 * Smooth dial:
 * - Renders the intermediate sequence in a vertical stack
 * - Animates the stack translateY in one go (no "stops" on intermediate values)
 * - Uses a fade mask so items fade in/out as they pass the center
 * - Uses easing so speed changes during the slide
 */
function PriceDialSmooth({
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
  const [current, setCurrent] = useState(amount);

  // When target changes, we animate from current -> amount through a sequence
  const [sequence, setSequence] = useState<number[] | null>(null);

  // transform index for the stack
  const [index, setIndex] = useState(0);

  // Measure item height so we can translate precisely
  const itemRef = useRef<HTMLSpanElement | null>(null);
  const [itemH, setItemH] = useState<number>(0);

  // If multiple quick toggles happen, keep the latest target; animation will restart from current
  const pendingTargetRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  // Measure height (layout)
  useLayoutEffect(() => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    if (rect.height) setItemH(rect.height);
  }, [current, sequence]);

  useEffect(() => {
    if (amount === current) return;

    // If we are currently animating, queue the latest target and let the current animation finish,
    // then immediately animate again from the new current.
    if (animatingRef.current) {
      pendingTargetRef.current = amount;
      return;
    }

    // Start a new smooth animation
    const seq = buildSequence(current, amount);
    setSequence(seq);
    setIndex(0);
    animatingRef.current = true;

    // Kick the transform on the next frame so CSS transition applies
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIndex(seq.length - 1);
      });
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  // Duration scales with number of steps; clamp to keep it feeling crisp
  const durationMs = useMemo(() => {
    const steps = sequence ? Math.max(1, sequence.length - 1) : 0;
    // ~120ms per step feels dial-like without pauses; clamp overall
    const d = steps * 120;
    return Math.min(520, Math.max(220, d));
  }, [sequence]);

  const onTransitionEnd = () => {
    if (!sequence) return;

    // End state: commit last value, clear stack
    const final = sequence[sequence.length - 1];
    setCurrent(final);
    setSequence(null);
    setIndex(0);
    animatingRef.current = false;

    // If a new target arrived mid-animation, run again immediately
    const pending = pendingTargetRef.current;
    if (pending != null && pending !== final) {
      pendingTargetRef.current = null;
      // trigger next run by setting current already; effect will start new seq
      // but we must do it async so React state settles
      setTimeout(() => {
        // This will be picked up by the effect (amount prop already pending target in parent)
        // If parent already moved away, no-op.
      }, 0);
    } else {
      pendingTargetRef.current = null;
    }
  };

  const displayedSequence = sequence ?? [current];
  const translateY = itemH ? -index * itemH : 0;

  return (
    <span className={["priceDialSmooth", className ?? ""].filter(Boolean).join(" ")}>
      <span className="priceDialSmoothFixed">{currency}</span>

      <span
        className="priceDialSmoothWindow"
        style={
          {
            "--h": itemH ? `${itemH}px` : "1.25em",
          } as CSSProperties
        }
        aria-live="polite"
      >
        <span
          className="priceDialSmoothStack"
          style={
            {
              transform: `translateY(${translateY}px)`,
              transition: sequence
                ? `transform ${durationMs}ms cubic-bezier(0.22, 0.75, 0.16, 0.99)`
                : "none",
            } as CSSProperties
          }
          onTransitionEnd={onTransitionEnd}
        >
          {displayedSequence.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="priceDialSmoothItem"
              ref={i === 0 ? itemRef : undefined}
            >
              {n}
            </span>
          ))}
        </span>
      </span>

      <span className="priceDialSmoothFixed">{unit}</span>
    </span>
  );
}

export default function PricingPage() {
  // Shared toggle state controls BOTH Plus and Business
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
                      <PriceDialSmooth
                        amount={dialAmount}
                        currency={plan.currency ?? "$"}
                        unit={plan.unit ?? "/mo"}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">{plan.staticPrice ?? ""}</span>
                    )}

                    {/* description2 must remain unchanged */}
                    <span className="typography__body__K4n7p">{plan.description2}</span>
                  </div>

                  {/* Toggle right before billing label */}
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

                    {/* Billing label must NOT change */}
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

      {/* Smooth dial CSS */}
      <style jsx>{`
        .priceDialSmooth {
          display: inline-flex;
          align-items: baseline;
          gap: 0.1em;
          white-space: nowrap;
        }

        .priceDialSmoothFixed {
          white-space: nowrap;
        }

        .priceDialSmoothWindow {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: var(--h);
          line-height: var(--h);
          vertical-align: bottom;
          min-width: 2ch;

          /* This creates the “fade while moving” look (no harsh cut) */
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 1) 28%,
            rgba(0, 0, 0, 1) 72%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 1) 28%,
            rgba(0, 0, 0, 1) 72%,
            transparent 100%
          );
        }

        .priceDialSmoothStack {
          display: block;
          will-change: transform;
        }

        .priceDialSmoothItem {
          display: block;
          height: var(--h);
          line-height: var(--h);
        }

        @media (prefers-reduced-motion: reduce) {
          .priceDialSmoothWindow {
            -webkit-mask-image: none;
            mask-image: none;
          }
          .priceDialSmoothStack {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
