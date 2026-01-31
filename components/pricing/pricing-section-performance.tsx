"use client";

import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PerformanceFeature = {
  label: string;
  tooltip?: string;
};

type PerformanceRow = {
  category: string;
  categoryTooltip?: string;
  features: {
    hobby?: PerformanceFeature | boolean;
    plus?: PerformanceFeature | boolean;
    business?: PerformanceFeature | boolean;
    enterprise?: PerformanceFeature | boolean;
  };
};

const performanceData: PerformanceRow[] = [
  {
    category: "Page Load Speed",
    categoryTooltip: "How quickly your website loads for visitors",
    features: {
      hobby: { label: "~2.5s", tooltip: "Average page load time" },
      plus: { label: "~1.2s", tooltip: "Optimized with caching and CDN" },
      business: { label: "<0.8s", tooltip: "Premium performance with advanced optimization" },
      enterprise: { label: "<0.5s", tooltip: "Ultra-fast with dedicated infrastructure" },
    },
  },
  {
    category: "Server Response Time",
    categoryTooltip: "Time taken by server to process and respond to requests",
    features: {
      hobby: { label: "~500ms", tooltip: "Standard response time" },
      plus: { label: "~200ms", tooltip: "Optimized server configuration" },
      business: { label: "<100ms", tooltip: "Prioritized server resources" },
      enterprise: { label: "<50ms", tooltip: "Dedicated server resources" },
    },
  },
  {
    category: "Uptime Guarantee",
    categoryTooltip: "Percentage of time your site is reliably available",
    features: {
      hobby: { label: "99.5%", tooltip: "Standard availability" },
      plus: { label: "99.9%", tooltip: "High availability" },
      business: { label: "99.95%", tooltip: "Enterprise-grade reliability" },
      enterprise: { label: "99.99%", tooltip: "Maximum uptime commitment with SLA" },
    },
  },
  {
    category: "CDN Regions",
    categoryTooltip: "Content Delivery Network - distributes your content globally for faster access",
    features: {
      hobby: { label: "15", tooltip: "Global coverage" },
      plus: { label: "35", tooltip: "Extended global reach" },
      business: { label: "50+", tooltip: "Comprehensive worldwide distribution" },
      enterprise: { label: "100+", tooltip: "Maximum global presence" },
    },
  },
  {
    category: "Database Performance",
    features: {
      hobby: false,
      plus: { label: "Read replicas", tooltip: "Distributed read-only database copies for faster queries" },
      business: { label: "Replicas + cache", tooltip: "Multiple replicas with advanced caching layer" },
      enterprise: { label: "Custom config", tooltip: "Fully customized database setup for your needs" },
    },
  },
];

export function PricingSectionPerformance() {
  const plans = ["hobby", "plus", "business", "enterprise"] as const;
  const planNames = {
    hobby: "Hobby",
    plus: "Plus",
    business: "Business",
    enterprise: "Enterprise",
  };

  return (
    <TooltipProvider>
      <section className="pricing__container__Q7j3s">
        <div className="pricing__content__K9j6q">
          <div className="performance__header__Z7j3s">
            <h2 className="typography__heading-2__M8k5p">Performance Metrics</h2>
            <p className="typography__body__L3j7q performance__description__P5k8p">
              Detailed breakdown of performance characteristics across all plans
            </p>
          </div>

          <div className="performance__table__M93j8" role="table" aria-label="Performance comparison">
            {/* Header Row Group */}
            <div role="rowgroup" className="performance__rowgroup__header__Z9k3s">
              <div role="row" className="performance__row__header__P5k8p">
                <div role="columnheader" className="performance__cell__header__category__Q7j3s">
                  <span></span>
                </div>
                {plans.map((plan) => (
                  <div key={plan} role="columnheader" className="performance__cell__header__plan__W7m3k">
                    <span className="typography__small__Q9j2p">{planNames[plan]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body Row Group */}
            <div role="rowgroup" className="performance__rowgroup__body__L7p3s">
              {performanceData.map((row, rowIndex) => (
                <div key={rowIndex} role="row" className="performance__row__body__K5j8q">
                  <div role="rowheader" className="performance__cell__category__B9k6p">
                    {row.categoryTooltip ? (
                      <Tooltip content={row.categoryTooltip} position="right">
                        <span className="typography__small__Q9j2p performance__category-text__Z3n7q">
                          {row.category}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="typography__small__Q9j2p">{row.category}</span>
                    )}
                  </div>

                  {plans.map((plan) => {
                    const feature = row.features[plan];
                    const featureObj = typeof feature === "object" ? feature : null;

                    return (
                      <div key={`${rowIndex}-${plan}`} role="gridcell" className="performance__cell__value__H5k8q">
                        {feature === false ? (
                          <span className="typography__small__Q9j2p performance__not-available__M8k5p">—</span>
                        ) : featureObj?.tooltip ? (
                          <Tooltip content={featureObj.tooltip} position="top">
                            <span className="typography__small__Q9j2p performance__value-with-tooltip__W7m3k">
                              {featureObj.label}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="typography__small__Q9j2p">{featureObj?.label || "—"}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
