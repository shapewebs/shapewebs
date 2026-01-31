"use client";

import "@/styles/pages/pricing/pricing.css";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faEnvelope,
  faWindowMaximize,
  faClock,
  faChartBar,
  faFileLines,
  faLifeRing,
  faObjectGroup,
  faClone,
  faCopy,
  faUser,
  faHandshake,
} from "@fortawesome/free-regular-svg-icons";

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
      "Automatic CI/CD",
      "Web Application Firewall",
      "DDoS Mitigation",
      "Basic SEO",
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
      "Cold start prevention",
      "Traffic & performance insights",
      "Content structure + conversion guidance",
      "Enhanced SEO + analytics",
      "Priority support",
      "Custom components + sections",
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
    description: "",
    description2: " + advanced features",
    billingLabelYearly: "Billed yearly",
    showBillingToggle: true,
    features: [
      "Custom components + sections",
      "Faster builds with prioritized CI",
      "Advanced caching & ISR configuration",
      "Technical SEO improvements",
      "Performance budgets (Core Web Vitals)",
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
      "Unlimited pages & components",
      "Advanced security (SSO, RBAC)",
      "Compliance support (SOC 2, GDPR)",
      "Custom SLAs & uptime guarantees",
      "Dedicated support & onboarding",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

// ✅ Custom SVG icon (transparent where it was white, scales via viewBox, uses currentColor)
function DeploymentIconSvg({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 298.50746 300"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {/* All former white fills are now transparent (fill="none") */}
      <path
        d="M210.94403,43.5584c11.43843,-0.63489 24.49627,1.10317 35.70522,3.30709c8.15672,1.60373 8.91791,9.39123 9.92164,16.25429c3.26306,22.26287 1.98321,45.43377 -6.26866,66.53134c-9.27799,23.71996 -27.16978,42.72966 -48.44216,56.26716c-1.82649,1.16381 -4.625,2.66381 -6.20709,3.9903l-0.15485,0.1306l0.00187,24.76679c0.0056,10.45336 1.47015,20.15299 -6.40112,28.33955c-1.22948,1.3041 -2.59646,2.47015 -4.07799,3.47761c-2.44403,1.68284 -5.78134,3.56343 -8.37817,5.12313l-14.73769,8.85075l-11.74328,7.05597c-2.7028,1.62127 -5.17034,3.16791 -8.02929,4.54291c-9.38638,4.51493 -20.61549,-2.1903 -21.05877,-12.63993c-0.15728,-3.70709 -0.1528,-7.33396 -0.1528,-11.08022l0.01194,-20.21082c0.01101,-6.56716 0.56754,-17.64739 -0.73284,-23.6959c-2.38004,-11.40485 -11.14328,-20.40112 -22.4806,-23.08097c-5.13451,-1.21642 -14.70541,-0.91791 -20.21549,-0.91511l-24.85354,0.00746c-4.08302,0.00037 -9.25299,0.26493 -13.20112,-0.54366c-8.38302,-1.7166 -14.02705,-11.52705 -10.5291,-19.52108c1.28713,-2.94142 3.22257,-5.96866 4.84757,-8.72034l8.07537,-13.53433l7.71549,-12.92425c1.58881,-2.70448 3.41007,-6.05354 5.13825,-8.6209c0.98657,-1.47313 2.11828,-2.84328 3.37854,-4.09011c8.1444,-8.13526 17.67052,-6.64272 28.19011,-6.63881l25.32966,0.00672c8.09664,-13.14011 15.7181,-23.78321 27.29254,-34.24179c20.75373,-18.75261 44.20392,-27.03526 72.05634,-28.19347z"
        fill="currentColor"
      />

      {/* used to be white highlight: now transparent */}
      <path
        d="M212.49067,65.75728c6.875,-0.27799 15.01866,0.63004 21.81903,1.43806c4.70336,28.36082 -1.23507,58.33097 -20.65858,80.09664c-19.33955,21.6722 -47.7653,33.87743 -75.12201,41.72108l-0.92388,-1.82649c-5.6791,-11.72407 -13.51343,-18.55224 -25.03041,-24.39086c1.83787,-6.00597 3.49254,-11.88134 5.62351,-17.7556c12.01362,-33.11642 33.33694,-64.93451 68.81474,-75.36586c8.70896,-2.56045 16.40858,-3.54776 25.47761,-3.91698z"
        fill="none"
      />

      <path
        d="M185.54478,95.0528c10.1847,-1.39403 19.5597,5.76026 20.90485,15.95131c1.34328,10.19104 -5.85821,19.53153 -16.0541,20.82519c-10.12761,1.28489 -19.38918,-5.85485 -20.72369,-15.97519c-1.3347,-10.12034 5.75933,-19.41679 15.87295,-20.80131z"
        fill="currentColor"
      />

      {/* used to be white highlight: now transparent */}
      <path
        d="M172.61698,200.74254c0.09571,-0.00746 0.31474,0.05597 0.42146,0.07836c0.40317,1.1959 0.13116,23.84515 0.13078,26.96642c-9.6916,5.34328 -19.79907,11.72761 -29.44552,17.36567l-0.07183,0.04104l-0.27631,-0.09515c-0.38377,-1.56903 -0.22481,-32.83955 0.03228,-34.26866c3.96437,-1.07463 7.32015,-2.29291 11.18974,-3.52985c6.34347,-2.02985 11.88545,-3.95149 18.0194,-6.55784z"
        fill="none"
      />

      {/* used to be white highlight: now transparent */}
      <path
        d="M73.70392,128.33246l27.19757,0.01119c-1.13787,2.19067 -3.09664,7.83041 -3.93209,10.23041c-2.27369,6.4903 -4.37892,13.03825 -6.31399,19.6375c-2.43619,0.0347 -4.91325,0.01716 -7.35317,0.02276l-27.21586,-0.02743c1.15578,-2.36101 3.3153,-5.59235 4.69646,-8.01978c4.06754,-7.14963 9.08974,-14.63769 12.92108,-21.85466z"
        fill="none"
      />
    </svg>
  );
}

// Regular-only FA mapping (free-regular set)
const featureIconMap: Record<string, IconDefinition> = {
  // Hobby (first one is handled by custom SVG)
  "Automatic CI/CD": faClock,
  "Web Application Firewall": faFileLines,
  "DDoS Mitigation": faCircleCheck,
  "Basic SEO": faFileLines,
  "Email support": faEnvelope,

  // Plus
  "Cold start prevention": faClock,
  "Traffic & performance insights": faChartBar,
  "Content structure + conversion guidance": faObjectGroup,
  "Enhanced SEO + analytics": faChartBar,
  "Priority support": faLifeRing,
  "Custom components + sections": faObjectGroup,

  // Business
  "Faster builds with prioritized CI": faClock,
  "Advanced caching & ISR configuration": faClone,
  "Technical SEO improvements": faFileLines,
  "Performance budgets (Core Web Vitals)": faClock,

  // Enterprise
  "Unlimited pages & components": faCopy,
  "Advanced security (SSO, RBAC)": faUser,
  "Compliance support (SOC 2, GDPR)": faFileLines,
  "Custom SLAs & uptime guarantees": faHandshake,
  "Dedicated support & onboarding": faLifeRing,
};

function FeatureIcon({ label }: { label: string }) {
  // ✅ Use your custom SVG for the first feature
  if (label === "Next.js + Vercel deployment") {
    return (
      <span className="pricing__check__Z3n7q" aria-hidden="true">
        <DeploymentIconSvg size={16} />
      </span>
    );
  }

  // ✅ Regular FA icons for everything else
  const icon = featureIconMap[label] ?? faCircleCheck;

  return (
    <span className="pricing__check__Z3n7q" aria-hidden="true">
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

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
  const [isYearly, setIsYearly] = useState(true);

  const includedFeaturesLabel: Partial<Record<Plan["key"], string>> = {
    plus: "All Hobby features, plus:",
    business: "All Plus features, plus:",
    enterprise: "All Business features, plus:",
  };

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

            const topLabel = includedFeaturesLabel[plan.key];

            return (
              <article
                key={plan.key}
                className="module__card__H5k8q"
                data-highlighted={plan.highlighted ? "true" : "false"}
              >
                <div className="pricing__card-top__A1b2c">
                  <h4
                    className="typography__heading4__Z7p4s"
                    style={{ margin: 0, paddingInline: 24 }}
                  >
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
                        <a href={plan.priceHref} className="typography__link__B7s3m">
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
                      <div
                        className="root__toggle-wrapper__T7g2m"
                        style={{ scale: 0.7, margin: "0 2px 0 -6px" }}
                      >
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

                {topLabel && (
                  <p
                    className="typography__small__Q9j2p"
                    style={{ padding: "0 24px 10px" }}
                  >
                    {topLabel}
                  </p>
                )}

                <ul className="pricing__features__M93j8">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing__feature__P5k8p">
                      <FeatureIcon label={f} />
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
                    <p
                      className="typography__small__Q9j2p pricing__alt__P5k8p"
                      style={{ margin: 0 }}
                    >
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

          /* Keeps both FontAwesome + custom SVG aligned/sized */
          :global(.pricing__check__Z3n7q svg) {
            width: 16px;
            height: 16px;
            display: block;
          }
        `}</style>
      </div>
    </section>
  );
}
