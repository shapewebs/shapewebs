"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performanceModule.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerfRow =
  | {
      type: "category";
      label: string;
      // tooltip optional for category headers (you can add if you want)
      tooltip?: string;
    }
  | {
      type: "row";
      label: string; // shown in first column (with tooltip)
      tooltip: string;
      values: Record<PlanKey, string>;
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

const rows: PerfRow[] = [
  { type: "category", label: "Core features" },

  {
    type: "row",
    label: "Customer requests",
    tooltip:
      "How many feature/content requests you can submit per month (copy, sections, tweaks, improvements).",
    values: {
      hobby: "Customer requests",
      plus: "Customer requests",
      business: "Customer requests",
      enterprise: "Customer requests",
    },
  },
  {
    type: "row",
    label: "Deployment & hosting setup",
    tooltip:
      "Included setup for Next.js + Vercel (or Shopify for commerce), environment variables, domains, and CI basics.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    type: "row",
    label: "SEO baseline",
    tooltip:
      "Baseline SEO such as metadata, sitemap/robots, indexing sanity checks and essential structured markup.",
    values: {
      hobby: "Basic",
      plus: "Enhanced",
      business: "Advanced",
      enterprise: "Advanced + custom",
    },
  },

  { type: "category", label: "Performance & reliability" },

  {
    type: "row",
    label: "Cold start prevention",
    tooltip:
      "Measures to avoid slow first-loads due to serverless cold starts (keep-warm strategies where applicable).",
    values: {
      hobby: "—",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    type: "row",
    label: "Performance insights",
    tooltip:
      "Visibility into traffic, performance trends, bottlenecks, and optimization opportunities.",
    values: {
      hobby: "Basic",
      plus: "Standard",
      business: "Advanced",
      enterprise: "Advanced + custom",
    },
  },
  {
    type: "row",
    label: "Core Web Vitals budgets",
    tooltip:
      "Set targets/thresholds for performance metrics (LCP/CLS/INP) and guard against regressions.",
    values: {
      hobby: "—",
      plus: "—",
      business: "Included",
      enterprise: "Included",
    },
  },

  { type: "category", label: "Security" },

  {
    type: "row",
    label: "Web Application Firewall (WAF)",
    tooltip:
      "Rules-based protection layer to block common web attacks (e.g. malicious patterns, injection attempts).",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    type: "row",
    label: "DDoS mitigation",
    tooltip:
      "Protection against traffic floods intended to overwhelm your site and knock it offline.",
    values: {
      hobby: "Included",
      plus: "Included",
      business: "Included",
      enterprise: "Included",
    },
  },
  {
    type: "row",
    label: "SSO / RBAC",
    tooltip:
      "Single Sign-On and Role-Based Access Control for enterprise user management and permissions.",
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
      <section className="performance__container__Q7j3s">
        <div className="performance__content__K9j6q">
          <h2 className="typography__heading2__B5x9t" style={{ margin: 0 }}>
            Performance
          </h2>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "16px" } as CSSProperties}
          />

          <p className="typography__subtitle__R6m2x" style={{ margin: 0 }}>
            Compare what’s included across plans — hover any row label to see
            details.
          </p>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "32px" } as CSSProperties}
          />

          <div className="performance__table__L7p3s" role="table" aria-label="Plan performance comparison">
            {/* Rowgroup 1: sticky header */}
            <div className="performance__rowgroup__A1b2c performance__rowgroup--sticky__A1b2c" role="rowgroup">
              <div className="performance__row__P5k8p performance__row--header__P5k8p" role="row">
                {planOrder.map((p) => (
                  <div
                    key={p.key}
                    className="performance__cell__C2d3e performance__cell--header__C2d3e"
                    role="columnheader"
                  >
                    <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rowgroup 2: body rows */}
            <div className="performance__rowgroup__A1b2c" role="rowgroup">
              {rows.map((r, idx) => {
                if (r.type === "category") {
                  return (
                    <div
                      key={`cat-${idx}-${r.label}`}
                      className="performance__row__P5k8p performance__row--category__P5k8p"
                      role="row"
                    >
                      {/* category: only first column filled */}
                      <div className="performance__cell__C2d3e" role="cell">
                        {r.tooltip ? (
                          <Tooltip content={r.tooltip} position="right">
                            <span className="typography__small__Q9j2p performance__label__Q9j2p performance__label--tooltip__W7m3k">
                              {r.label}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="typography__small__Q9j2p performance__label__Q9j2p">
                            {r.label}
                          </span>
                        )}
                      </div>

                      {/* remaining 3 empty cells */}
                      <div className="performance__cell__C2d3e" role="cell" />
                      <div className="performance__cell__C2d3e" role="cell" />
                      <div className="performance__cell__C2d3e" role="cell" />
                    </div>
                  );
                }

                return (
                  <div
                    key={`row-${idx}-${r.label}`}
                    className="performance__row__P5k8p"
                    role="row"
                  >
                    {/* column 1: label with tooltip */}
                    <div className="performance__cell__C2d3e" role="cell">
                      <Tooltip content={r.tooltip} position="right">
                        <span className="typography__small__Q9j2p performance__label__Q9j2p performance__label--tooltip__W7m3k">
                          {r.label}
                        </span>
                      </Tooltip>
                    </div>

                    {/* columns 2-4: values per plan */}
                    {planOrder.map((p) => (
                      <div
                        key={`${r.label}-${p.key}`}
                        className="performance__cell__C2d3e performance__value__C2d3e"
                        role="cell"
                      >
                        <span className="typography__small__Q9j2p">
                          {r.values[p.key]}
                        </span>
                      </div>
                    )).slice(1) /* remove the first one because label is column 1 */}
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
