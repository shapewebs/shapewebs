"use client";

import "@/styles/pages/pricing/pricing.css";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Plan = {
  key: "hobby" | "plus" | "business" | "enterprise";
  name: string;

  description: string;
  description2: string;

  monthlyAmount?: number;
  yearlyAmount?: number;
  priceSuffix?: string;

  priceText?: string;
  priceHref?: string;

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
    priceText: "$0",
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
    monthlyAmount: 12,
    yearlyAmount: 10,
    priceSuffix: "/mo",
    description: "",
    description2: " + additional features",
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
    monthlyAmount: 18,
    yearlyAmount: 16,
    priceSuffix: "/mo",
    description: " + additional features",
    description2: "",
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
    priceText: "Contact us",
    priceHref: "/contact",
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

function RollingNumber({ value }: { value: number }) {
  const digits = useMemo(() => value.toString().split(""), [value]);

  return (
    <span className="rollNumber" aria-label={value.toString()}>
      {digits.map((d, i) => {
        const n = Number(d);
        return (
          <span key={i} className="rollDigit">
            <span
              className="rollDigitInner"
              style={{ transform: `translateY(-${n * 10}%)` }}
            >
              {Array.from({ length: 10 }, (_, tick) => (
                <span key={tick} className="rollTick">
                  {tick}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function PricingPage() {
  // One toggle controls both Plus + Business
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="pricing__container__Q7j3s">
      <div className="pricing__content__K9j6q">
        <h1
          className="typography__heading1__T3m8s"
          style={{ margin: 0, textAlign: "center" }}
        >
          Pricing
        </h1>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <p
          className="typography__emphasize__M9J2o"
          style={{ margin: 0, textAlign: "center" }}
        >
          Built on Next.js + Vercel, with Shopify-ready options for commerce.
          <br aria-hidden="true" />
          Upgrade to enable more insights, enhanced security and additional features.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "112px" } as CSSProperties}
        />

        <div className="pricing__grid__L7p3s">
          {plans.map((plan) => {
            const amount =
              plan.showBillingToggle && plan.monthlyAmount && plan.yearlyAmount
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
                  <h4 className="typography__heading4__Z7p4s" style={{ margin: 0, paddingInline: 24px }}>
                    {plan.name}
                  </h4>

                  <div
                    className="Spacer-module__root__NM019"
                    style={{ "--height": "12px" } as CSSProperties}
                  />

                  <div className="pricing__price__T7g2m">
                    <span className="typography__body__K4n7p">
                      {plan.description}
                    </span>

                    <span className="typography__body__K4n7p bitC1">
                      {amount != null ? (
                        <>
                          $<RollingNumber value={amount} />
                          {plan.priceSuffix}
                        </>
                      ) : plan.priceHref ? (
                        <a
                          href={plan.priceHref}
                          className="typography__link__B7s3m"
                        >
                          {plan.priceText}
                        </a>
                      ) : (
                        plan.priceText
                      )}
                    </span>

                    <span className="typography__body__K4n7p">
                      {plan.description2}
                    </span>
                  </div>

                  <div className="pricing__billing__C2d3e">
                    {plan.showBillingToggle && (
                      <div className="root__toggle-wrapper__T7g2m">
                        <input
                          className="root__toggle__T7g2m root__toggle--ios__T7g2m"
                          id={`billingToggle-${plan.key}`}
                          type="checkbox"
                          checked={isYearly}
                          onChange={(e) => setIsYearly(e.target.checked)}
                        />
                        <label
                          className="root__toggle-btn__T7g2m"
                          htmlFor={`billingToggle-${plan.key}`}
                        />
                      </div>
                    )}

                    <span className="typography__small__Q9j2p">
                      {plan.billingLabelYearly}
                    </span>
                  </div>
                </div>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

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
                      <span className="typography__small__Q9j2p pricing__feature-text__Q9j2p">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="Spacer-module__root__NM019"
                  style={{ "--height": "20px" } as CSSProperties}
                />

                <div className="pricing__actions__Q6z2k">
                  <a
                    href={plan.cta.href}
                    className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h pricing__cta__X1y2z"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{plan.cta.label}</span>
                  </a>

                  {plan.showAltSalesLink && (
                    <p className="typography__small__Q9j2p pricing__alt__P5k8p" style={{ margin: 0 }}>
                      or{" "}
                      <a href="/contact" className="typography__link__B7s3m">
                        Talk to sales
                      </a>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <style jsx>{`
          .rollNumber {
            display: inline-flex;
            align-items: baseline;
            transform: translateY(2px);
          }

          .rollDigit {
            position: relative;
            width: 0.62em;
            height: 1em;
            overflow: hidden;
          }

          .rollDigitInner {
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .rollTick {
            display: block;
            height: 1em;
            line-height: 1em;
            text-align: center;
          }
        `}</style>
      </div>
    </section>
  );
}
