"use client"

import "@/styles/pages/pricing/pricing.css"
import { useMemo, useState } from "react"

type PlanKey = "hobby" | "plus" | "business" | "enterprise"

export default function PricingPage() {
  const plans = useMemo(
    () => [
      {
        key: "hobby" as const,
        name: "Hobby",
        price: "$1,200",
        blurb: "For simple marketing sites that need great performance and a clean launch.",
        features: ["1–3 pages", "Basic SEO setup", "Vercel deploy + analytics basics", "Launch support"],
        ctaLabel: "Choose Hobby",
        ctaHref: "/contact",
      },
      {
        key: "plus" as const,
        name: "Plus",
        price: "$2,500",
        blurb: "For growing companies that want stronger content structure and conversion polish.",
        features: ["Up to 6 pages", "Enhanced SEO + tracking", "CMS-ready structure", "Performance pass"],
        ctaLabel: "Choose Plus",
        ctaHref: "/contact",
      },
      {
        key: "business" as const,
        name: "Business",
        price: "$4,800",
        blurb: "For serious brands and Shopify stores that need speed, UX, and conversion focus.",
        features: ["Shopify integration", "Custom sections & components", "Conversion + UX polish", "Performance + accessibility pass"],
        ctaLabel: "Choose Business",
        ctaHref: "/contact",
        highlighted: true,
      },
      {
        key: "enterprise" as const,
        name: "Enterprise",
        price: "Custom",
        blurb: "For complex builds, multiple environments, and advanced integrations.",
        features: ["Custom architecture", "Advanced Shopify / integrations", "Staging + production setup", "Priority delivery planning"],
        ctaLabel: "Talk to Sales",
        ctaHref: "/contact",
      },
    ],
    []
  )

  const defaultSelected = plans.find((p) => p.highlighted)?.key ?? ("business" as PlanKey)
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(defaultSelected)

  return (
    <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <header className="pricing__header__P8k4q">
          <h1 className="typography__heading1__T3m8s" style={{ margin: 0 }}>
            Pricing for high-performance websites
          </h1>
          <div className="Spacer-module__root__NM019" style={{ "--height": "12px" } as React.CSSProperties} />
          <p className="typography__subtitle__R6m2x" style={{ margin: 0 }}>
            Yearly plans built with Next.js on Vercel and Shopify where it fits — optimized for speed, SEO, and conversion.
          </p>
        </header>

        <div className="pricing__grid__L7p3s" role="list">
          {plans.map((plan) => {
            const isHighlighted = Boolean(plan.highlighted)
            const isSelected = selectedPlan === plan.key

            return (
              <article
                key={plan.key}
                role="listitem"
                className={[
                  "pricing__card__H5k8q",
                  isHighlighted ? "pricing__card--highlight__R5j2s" : "",
                  isSelected ? "pricing__card--selected__B9k6p" : "",
                ].join(" ")}
                onClick={() => setSelectedPlan(plan.key)}
              >
                <div className="pricing__card-top__T7g2m">
                  <div className="pricing__plan-name-row__M93j8">
                    <h3 className="typography__heading3__V1c8r" style={{ margin: 0 }}>
                      {plan.name}
                    </h3>

                    {isHighlighted ? (
                      <span className="pricing__badge__Z7p4s">Most popular</span>
                    ) : (
                      <span className="pricing__badge--ghost__Z7p4s" aria-hidden="true">
                        &nbsp;
                      </span>
                    )}
                  </div>

                  <div className="Spacer-module__root__NM019" style={{ "--height": "10px" } as React.CSSProperties} />

                  <div className="pricing__price-row__A7k2p">
                    <p className="pricing__price__L3p7q" style={{ margin: 0 }}>
                      {plan.price}
                    </p>
                    <p className="typography__small__Q9j2p pricing__per__Q9j2p" style={{ margin: 0 }}>
                      /year
                    </p>
                  </div>

                  <div className="Spacer-module__root__NM019" style={{ "--height": "10px" } as React.CSSProperties} />

                  <p className="typography__body__K4n7p" style={{ margin: 0 }}>
                    {plan.blurb}
                  </p>
                </div>

                <div className="Spacer-module__root__NM019" style={{ "--height": "18px" } as React.CSSProperties} />

                <ul className="pricing__feature-list__P5k8p">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing__feature__B3n7p">
                      <span className="pricing__check__X9f4j" aria-hidden="true">
                        ✓
                      </span>
                      <span className="typography__small__Q9j2p pricing__feature-text__L7p2q">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="Spacer-module__root__NM019" style={{ "--height": "18px" } as React.CSSProperties} />

                <div className="pricing__cta__Q6z2k">
                  <a
                    href={plan.ctaHref}
                    className={[
                      "button__root__ZxcvB",
                      isHighlighted ? "button__kind-primary__R5j2s" : "button__kind-secondary__R5j2s",
                      "button__size-medium__L9d7h",
                    ].join(" ")}
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={(e) => {
                      // Keep card click from overriding link intent
                      e.stopPropagation()
                    }}
                  >
                    <span>{plan.ctaLabel}</span>
                  </a>

                  <button
                    type="button"
                    className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
                    style={{ marginTop: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPlan(plan.key)
                    }}
                  >
                    Highlight plan
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.0002 -0.0003 16.0005 15.9996">
                      <path
                        d="M 11.778 7.435 C 12.09 7.748 12.09 8.255 11.778 8.568 L 6.978 13.368 C 6.665 13.68 6.158 13.68 5.845 13.368 C 5.533 13.055 5.533 12.548 5.845 12.235 L 10.08 8 L 5.848 3.765 C 5.535 3.453 5.535 2.945 5.848 2.633 C 6.16 2.32 6.668 2.32 6.98 2.633 L 11.78 7.433 L 11.778 7.435 Z"
                        style={{ fill: "currentColor", paintOrder: "fill" }}
                      />
                    </svg>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
