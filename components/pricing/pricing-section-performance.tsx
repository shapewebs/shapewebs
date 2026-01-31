"use client";

import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PerformanceFeature = {
  category: string;
  rows: Array<{
    label: string;
    tooltip?: string;
    isHeader?: boolean;
    features: Array<{
      plan: "hobby" | "plus" | "business" | "enterprise";
      available: boolean;
      value?: string | number;
      tooltip?: string;
    }>;
  }>;
};

const performanceData: PerformanceFeature[] = [
  {
    category: "Performance",
    rows: [
      {
        label: "Average Load Time",
        tooltip: "Measured time from request to fully loaded page",
        features: [
          { plan: "hobby", available: true, value: "2.5s" },
          { plan: "plus", available: true, value: "1.8s" },
          { plan: "business", available: true, value: "0.9s" },
          { plan: "enterprise", available: true, value: "< 0.5s" },
        ],
      },
      {
        label: "99.99% Uptime",
        tooltip: "Guaranteed server availability percentage",
        features: [
          { plan: "hobby", available: false },
          { plan: "plus", available: true },
          { plan: "business", available: true },
          { plan: "enterprise", available: true },
        ],
      },
    ],
  },
  {
    category: "Security & Compliance",
    rows: [
      {
        label: "SSL/TLS Encryption",
        features: [
          { plan: "hobby", available: true },
          { plan: "plus", available: true },
          { plan: "business", available: true },
          { plan: "enterprise", available: true },
        ],
      },
      {
        label: "GDPR Compliant",
        tooltip: "General Data Protection Regulation compliance",
        features: [
          { plan: "hobby", available: false },
          { plan: "plus", available: true },
          { plan: "business", available: true },
          { plan: "enterprise", available: true },
        ],
      },
    ],
  },
  {
    category: "Scalability",
    rows: [
      {
        label: "Max Monthly Requests",
        features: [
          { plan: "hobby", available: true, value: "100K" },
          { plan: "plus", available: true, value: "1M" },
          { plan: "business", available: true, value: "10M" },
          { plan: "enterprise", available: true, value: "Unlimited" },
        ],
      },
    ],
  },
];

const planNames = {
  hobby: "Hobby",
  plus: "Plus",
  business: "Business",
  enterprise: "Enterprise",
};

export function PricingSectionPerformance() {
  return (
    <TooltipProvider>
      <section className="pricing-performance__container__Q7j3s">
        <div className="pricing-performance__header__P5k8p">
          <h2 className="typography__h2__B9k6p">Performance & Features Comparison</h2>
          <p className="typography__body__L3j7q">
            Detailed breakdown of what each plan includes
          </p>
        </div>

        <div className="pricing-performance__table__Z9k3s" role="table">
          {/* Header Row Group */}
          <div className="pricing-performance__rowgroup-header__M8k5p" role="rowgroup">
            <div className="pricing-performance__row__Q7j3s" role="row">
              <div className="pricing-performance__cell__W7m3k pricing-performance__cell-header__V5j2p" role="columnheader">
                <span className="sr-only">Feature</span>
              </div>
              {(["hobby", "plus", "business", "enterprise"] as const).map((plan) => (
                <div
                  key={`header-${plan}`}
                  className="pricing-performance__cell__W7m3k pricing-performance__cell-header__V5j2p"
                  role="columnheader"
                >
                  <span className="typography__body-bold__S5k8p">{planNames[plan]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Row Group */}
          <div className="pricing-performance__rowgroup__B9k6p" role="rowgroup">
            {performanceData.map((section, sectionIdx) => (
              <div key={`section-${sectionIdx}`}>
                {section.rows.map((row, rowIdx) => (
                  <div
                    key={`row-${sectionIdx}-${rowIdx}`}
                    className="pricing-performance__row__Q7j3s"
                    role="row"
                  >
                    <div
                      className="pricing-performance__cell__W7m3k pricing-performance__cell-label__X9m4s"
                      role="rowheader"
                    >
                      {row.tooltip ? (
                        <Tooltip content={row.tooltip} position="right">
                          <span className="typography__small-bold__T5k8p pricing-performance__label-text__Y7n3s pricing-performance__label-with-tooltip__Z7n3s">
                            {row.label}
                          </span>
                        </Tooltip>
                      ) : (
                        <span className="typography__small-bold__T5k8p pricing-performance__label-text__Y7n3s">
                          {row.label}
                        </span>
                      )}
                    </div>
                    {(["hobby", "plus", "business", "enterprise"] as const).map((plan) => {
                      const feature = row.features.find((f) => f.plan === plan);
                      return (
                        <div
                          key={`cell-${sectionIdx}-${rowIdx}-${plan}`}
                          className="pricing-performance__cell__W7m3k pricing-performance__cell-feature__U7m4s"
                          role="cell"
                        >
                          {feature ? (
                            <>
                              {feature.value ? (
                                <span className="typography__small__Q9j2p">
                                  {feature.value}
                                </span>
                              ) : (
                                <span
                                  className={`pricing-performance__checkmark__A9k5s ${
                                    feature.available
                                      ? "pricing-performance__checkmark-active__B9k6p"
                                      : "pricing-performance__checkmark-inactive__C9k7p"
                                  }`}
                                  aria-label={feature.available ? "Included" : "Not included"}
                                >
                                  {feature.available ? "✓" : "−"}
                                </span>
                              )}
                              {feature.tooltip && (
                                <Tooltip content={feature.tooltip} position="top">
                                  <button
                                    className="pricing-performance__tooltip-trigger__D9k8s"
                                    aria-label="More information"
                                    type="button"
                                  >
                                    ?
                                  </button>
                                </Tooltip>
                              )}
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
