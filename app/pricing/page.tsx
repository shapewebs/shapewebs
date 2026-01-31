"use client";

import "@/styles/pages/pricing/pricing.css";
import { useEffect, useMemo, useRef, useState } from "react";
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

  // As requested: this text should NOT change when toggling
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

function buildSequence(from: number, to: number) {
  if (from === to) return [from];
  const seq: number[] = [];
  const step = from < to ? 1 : -1;
  for (let v = from; v !== to; v += step) seq.push(v);
  seq.push(to);
  return seq;
}

/**
 * Smooth dial:
 * - Renders a vertical stack of intermediate values.
 * - Animates translateY once from start -> end (no stops).
 * - A mask gradient provides natural top/bottom fading,
 *   and because motion accelerates/decelerates, the fade
 *   feels like it changes speed during the transition.
 */
function SmoothPriceDial({
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
  const [stack, setStack] = useState<number[]>([amount]);
  const [offsetIndex, setOffsetIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const stackRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Duration scales with distance but clamps to a nice range.
  const getDurationMs = (distance: number) => {
    const perStep = 70; // ms per integer "tick" (tuned for dial feel)
    const raw = distance * perStep;
    return Math.max(220, Math.min(520, raw));
  };

  useEffect(() => {
    if (amount === current) return;

    const seq = buildSequence(current, amount);
    const distance = Math.abs(amount - current);
    const duration = getDurationMs(distance);

    setStack(seq);
    setOffsetIndex(0);
    setAnimating(false);

    // Next frame: enable transition and jump to final index.
    // This avoids the browser batching the initial and final transform.
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      setAnimating(true);
      setOffsetIndex(seq.length - 1);

      // When the transition ends, commit and reset stack to single value.
      const el = stackRef.current;
      if (!el) return;

      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "transform") return;
        el.removeEventListener("transitionend", onEnd);

        // commit final state
        setCurrent(amount);
        setStack([amount]);
        setOffsetIndex(0);
        setAnimating(false);
      };

      el.addEventListener("transitionend", onEnd);

      // Set CSS custom prop for duration on the element.
      el.style.setProperty("--dial-duration", `${duration}ms`);
    });

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  // If stack has been reset (single value), keep duration sane.
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    if (stack.length <= 1) el.style.setProperty("--dial-duration", `0ms`);
  }, [stack.length]);

  return (
    <span className={["dialRoot", className ?? ""].filter(Boolean).join(" ")}>
      <span className="dialFixed">{currency}</span>

      <span className="dialWindow" aria-live="polite">
        <span
          ref={stackRef}
          className={["dialStack", animating ? "is-animating" : ""].join(" ")}
          style={
            {
              transform: `translateY(${-offsetIndex * 100}%)`,
            } as CSSProperties
          }
        >
          {stack.map((v, i) => (
            <span key={`${v}-${i}`} className="dialItem">
              {v}
            </span>
          ))}
        </span>
      </span>

      <span className="dialFixed">{unit}</span>
    </span>
  );
}

export default function PricingPage() {
  // One shared state controls BOTH Plus and Business.
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const isYearly = billingCycle === "yearly";

  // Shared toggle handler: toggling one toggles both.
  const setIsYearly = (checked: boolean) => setBillingCycle(checked ? "yearly" : "monthly");

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
                      <SmoothPriceDial
                        amount={dialAmount}
                        currency={plan.currency ?? "$"}
                        unit={plan.unit ?? "/mo"}
                        className="typography__body__K4n7p bitC1"
                      />
                    ) : (
                      <span className="typography__body__K4n7p bitC1">{plan.staticPrice ?? ""}</span>
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
                          onChange={(e) => setIsYearly(e.target.checked)}
                          aria-label="Toggle yearly billing"
                        />
                        <label className="root__toggle-btn__T7g2m" htmlFor={`billingToggle-${plan.key}`} />
                      </div>
                    ) : null}

                    {/* IMPORTANT: label does NOT change on toggle */}
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

      {/* Smooth dial CSS (kept local so you can paste the file anywhere) */}
      <style jsx>{`
        .dialRoot {
          display: inline-flex;
          align-items: baseline;
          gap: 0.08em;
          white-space: nowrap;
        }

        .dialFixed {
          white-space: nowrap;
        }

        .dialWindow {
          position: relative;
          display: inline-block;
          overflow: hidden;

          /* tweak if your typography line-height differs */
          height: 1.25em;
          line-height: 1.25em;

          min-width: 2ch;
          vertical-align: bottom;

          /* This creates the fade at top/bottom; perceived fade speed changes with velocity */
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 1) 26%,
            rgba(0, 0, 0, 1) 74%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 1) 26%,
            rgba(0, 0, 0, 1) 74%,
            transparent 100%
          );
        }

        .dialStack {
          display: block;
          will-change: transform;
          transform: translateY(0%);
        }

        .dialStack.is-animating {
          /* Smooth dial = one continuous motion */
          transition-property: transform;
          transition-duration: var(--dial-duration, 360ms);
          transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); /* fast-in, smooth-out */
        }

        .dialItem {
          display: block;
          height: 1.25em;
          line-height: 1.25em;
        }

        @media (prefers-reduced-motion: reduce) {
          .dialWindow {
            -webkit-mask-image: none;
            mask-image: none;
          }
          .dialStack.is-animating {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
