"use client"

import "@/styles/pages/pricing/pricing.css"

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise"
  name: string
  priceYearly: string
  description: string
  description2: string
  features: string[]
  highlighted?: boolean
  cta: { label: string; href: string }
  showAltSalesLink?: boolean
}

const plans: Plan[] = [
  {
    key: "hobby",
    name: "Hobby",
    priceYearly: "Free forever",
    description: "Perfect for a simple, fast marketing site or landing page.",
    description2: "+ aditional usage",
    features: ["Next.js + Vercel deployment", "Performance-focused build", "Basic SEO setup", "1–3 pages", "Email support"],
    cta: { label: "Get Started", href: "/get-started" },
  },
  {
    key: "plus",
    name: "Plus",
    priceYearly: "$10/mo",
    description: "The best balance for growing brands that need more pages and polish.",
    description2: "",
    features: [
      "Everything in Hobby",
      "4–8 pages",
      "Enhanced SEO + analytics",
      "Content structure + conversion guidance",
      "Priority support",
    ],
    highlighted: true,
    cta: { label: "Get Started", href: "/get-started" },
    showAltSalesLink: true, // ✅ adds “or Talk to sales” under the button
  },
  {
    key: "business",
    name: "Business",
    priceYearly: "$5,999",
    description: "For companies that need advanced content, integrations, and scalability.",
    description2: "",
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
    priceYearly: "Custom",
    description: "For Shopify builds, complex requirements, and high-performance commerce.",
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
]

export default function PricingPage() {
  return (
    <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <h1 className="typography__heading1__T3m8s pricing__title__Z5m8r" style={{ margin: 0 }}>
          Pricing
        </h1>
        <div className="Spacer-module__root__NM019" style={{ "--height": "16px" } as React.CSSProperties} />
        <p className="typography__emphasize__M9J2o" style={{ margin: 0 }}>
          Built on Next.js + Vercel, with Shopify-ready options for commerce.
          <br aria-hidden="true"></br>
          Upgrade to enable more insights, enhanced security and additional features.
        </p>

        <div className="Spacer-module__root__NM019" style={{ "--height": "40px" } as React.CSSProperties} />

        <div className="pricing__grid__L7p3s">
          {plans.map((plan) => (
          <article
            className="module__card__H5k8q"
            data-highlighted={plan.highlighted ? "true" : "false"}
          >
              <div className="pricing__card-top__A1b2c">
                <div className="pricing__plan-row__V2c3d">
                  <h4 className="typography__heading4__Z7p4s" style={{ margin: 0 }}>
                    {plan.name}
                  </h4>
                </div>

                <div className="Spacer-module__root__NM019" style={{ "--height": "12px" } as React.CSSProperties} />

                <div className="pricing__price__T7g2m">
                <span className="typography__body__K4n7p" style={{ margin: 0 }}>
                  {plan.description}
                </span>
                  <span className="typography__body__K4n7p bitC1">&nbsp;{plan.priceYearly}&nbsp;</span>
                  <span className="typography__body__K4n7p">
                    {plan.priceYearly !== "Custom" && plan.description2}
                  </span>
                </div>
                  <span className="typography__small__Q9j2p pricing__billing__C2d3e" style={{ margin: 0 }}>
                    {plan.priceYearly === "Custom" ? "Tailored yearly pricing" : "Billed yearly"}
                  </span>
                <div className="Spacer-module__root__NM019" style={{ "--height": "16px" } as React.CSSProperties} />
              </div>

              <div className="Spacer-module__root__NM019" style={{ "--height": "20px" } as React.CSSProperties} />

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

              <div className="Spacer-module__root__NM019" style={{ "--height": "20px" } as React.CSSProperties} />

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
  )
}
