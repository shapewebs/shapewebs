"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performanceModule.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerformanceRow =
  | {
      kind: "section";
      label: string;
      tooltip: string;
    }
  | {
      kind: "row";
      label: string;
      tooltip: string;
      values: Record<PlanKey, string>;
    };

const planLabels: Record<PlanKey, string> = {
  hobby: "Hobby",
  plus: "Plus",
  business: "Business",
  enterprise: "Enterprise",
};

// Example dataset (edit freely)
const rows: PerformanceRow[] = [
  {
    kind: "section",
    label: "Core features",
    tooltip: "Baseline capabilities included with each plan. This section is used as a header for the rows below.",
  },
  {
    kind: "row",
    label: "Customer requests",
    tooltip: "Includes handling customer requests/changes within the plan scope.",
    values: {
      hobby: "Customer requests",
      plus: "Customer requests",
      business: "Customer requests",
      enterprise: "Customer requests",
    },
  },
  {
    kind: "row",
    label: "Next.js + Vercel deployment",
    tooltip: "Standard deployment pipeline using Next.js and Vercel.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "Basic SEO guidance",
    tooltip: "Foundational SEO improvements: metadata, indexing hygiene, and on-page best practices.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },

  {
    kind: "section",
    label: "Performance",
    tooltip: "Features that influence speed, caching behavior, monitoring, and optimization.",
  },
  {
    kind: "row",
    label: "Cold start prevention",
    tooltip: "Keeps functions warm to reduce latency spikes when a route hasn't been hit recently.",
    values: {
      hobby: "—",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "Traffic & performance insights",
    tooltip: "Visibility into usage patterns and performance hotspots to guide optimizations.",
    values: {
      hobby: "—",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "Performance budgets (Core Web Vitals)",
    tooltip: "Targets/limits for CWV metrics (LCP, INP, CLS) to keep performance within expectations.",
    values: {
      hobby: "—",
      plus: "—",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "Advanced caching & ISR configuration",
    tooltip: "Stronger caching rules + ISR tuning to improve speed while keeping content fresh.",
    values: {
      hobby: "—",
      plus: "—",
      business: "Included",
      enterprise: "Included",
    },
  },

  {
    kind: "section",
    label: "Security & compliance",
    tooltip: "Security posture improvements, access control, and compliance enablement.",
  },
  {
    kind: "row",
    label: "Web Application Firewall (WAF)",
    tooltip: "Blocks common malicious traffic and mitigates typical web threats.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "DDoS mitigation",
    tooltip: "Protection against traffic floods intended to degrade uptime or performance.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "SSO + RBAC",
    tooltip: "Single Sign-On and Role-Based Access Control for enterprise-grade access management.",
    values: {
      hobby: "—",
      plus: "—",
      business: "—",
      enterprise: "Included",
    },
  },
  {
    kind: "row",
    label: "Compliance support (SOC 2, GDPR)",
    tooltip: "Process/documentation support for security and privacy frameworks (as applicable).",
    values: {
      hobby: "—",
      plus: "—",
      business: "—",
      enterprise: "Included",
    },
  },
];

export function PricingSectionPerformance() {
  return (
    <TooltipProvider>
      <section className="pricingPerformance__container__Q7j3s">
        <div className="pricingPerformance__content__K9j6q">
          <h2 className="typography__heading2__B5x9t" style={{ margin: 0, textAlign: "center" }}>
            Performance & Features
          </h2>

          <div className="Spacer-module__root__NM019" style={{ "--height": "16px" } as CSSProperties} />

          <p className="typography__subtitle__R6m2x" style={{ margin: 0, textAlign: "center" }}>
            Compare what’s included across plans — performance, security and operational support.
          </p>

          <div className="Spacer-module__root__NM019" style={{ "--height": "32px" } as CSSProperties} />

          <div className="pricingPerformance__table__L7p3s" role="table" aria-label="Plan comparison table">
            {/* Rowgroup 1: sticky header */}
            <div className="pricingPerformance__rowgroup__A1b2c pricingPerformance__rowgroup--sticky__A1b2c" role="rowgroup">
              <div className="pricingPerformance__row__P5k8p pricingPerformance__row--header__P5k8p" role="row">
                <div className="pricingPerformance__cell__C2d3e pricingPerformance__cell--corner__C2d3e" role="columnheader">
                  <span className="typography__small__Q9j2p">Compare plans</span>
                </div>

                <div className="pricingPerformance__cell__C2d3e" role="columnheader">
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {planLabels.hobby}
                  </span>
                </div>
                <div className="pricingPerformance__cell__C2d3e" role="columnheader">
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {planLabels.plus}
                  </span>
                </div>
                <div className="pricingPerformance__cell__C2d3e" role="columnheader">
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {planLabels.business}
                  </span>
                </div>
                <div className="pricingPerformance__cell__C2d3e" role="columnheader">
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {planLabels.enterprise}
                  </span>
                </div>
              </div>
            </div>

            {/* Rowgroup 2: body */}
            <div className="pricingPerformance__rowgroup__A1b2c" role="rowgroup">
              {rows.map((r, idx) => {
                if (r.kind === "section") {
                  return (
                    <div
                      key={`section-${idx}-${r.label}`}
                      className="pricingPerformance__row__P5k8p pricingPerformance__row--section__P5k8p"
                      role="row"
                    >
                      <div className="pricingPerformance__cell__C2d3e" role="rowheader">
                        <Tooltip content={r.tooltip} position="right">
                          <span className="typography__small__Q9j2p pricingPerformance__labelTooltip__W7m3k">
                            {r.label}
                          </span>
                        </Tooltip>
                      </div>

                      {/* empty cells */}
                      <div className="pricingPerformance__cell__C2d3e" role="cell" />
                      <div className="pricingPerformance__cell__C2d3e" role="cell" />
                      <div className="pricingPerformance__cell__C2d3e" role="cell" />
                      <div className="pricingPerformance__cell__C2d3e" role="cell" />
                    </div>
                  );
                }

                return (
                  <div key={`row-${idx}-${r.label}`} className="pricingPerformance__row__P5k8p" role="row">
                    <div className="pricingPerformance__cell__C2d3e" role="rowheader">
                      <Tooltip content={r.tooltip} position="right">
                        <span className="typography__small__Q9j2p pricingPerformance__labelTooltip__W7m3k">
                          {r.label}
                        </span>
                      </Tooltip>
                    </div>

                    <div className="pricingPerformance__cell__C2d3e" role="cell">
                      <span className="typography__small__Q9j2p">{r.values.hobby}</span>
                    </div>
                    <div className="pricingPerformance__cell__C2d3e" role="cell">
                      <span className="typography__small__Q9j2p">{r.values.plus}</span>
                    </div>
                    <div className="pricingPerformance__cell__C2d3e" role="cell">
                      <span className="typography__small__Q9j2p">{r.values.business}</span>
                    </div>
                    <div className="pricingPerformance__cell__C2d3e" role="cell">
                      <span className="typography__small__Q9j2p">{r.values.enterprise}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
