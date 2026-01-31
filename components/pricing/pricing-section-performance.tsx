"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerfRow =
  | {
      type: "category";
      label: string;
      tooltip?: string;
    }
  | {
      type: "feature";
      label: string; // text shown inside every cell
      tooltip: string;
      availability: Record<PlanKey, boolean>;
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

// Example data — replace/extend freely
const rows: PerfRow[] = [
  { type: "category", label: "Core features" },

  {
    type: "feature",
    label: "Firewall protection",
    tooltip:
      "Web Application Firewall (WAF): blocks common attack patterns like injection attempts and malicious requests.",
    availability: { hobby: true, plus: true, business: true, enterprise: true },
  },
  {
    type: "feature",
    label: "DDoS mitigation",
    tooltip:
      "Protection against Distributed Denial of Service attacks that try to overwhelm your site with traffic.",
    availability: { hobby: true, plus: true, business: true, enterprise: true },
  },
  {
    type: "feature",
    label: "Cold start prevention",
    tooltip:
      "Keeps serverless functions warm to reduce slow first responses after inactivity.",
    availability: { hobby: false, plus: true, business: true, enterprise: true },
  },

  { type: "category", label: "Performance" },

  {
    type: "feature",
    label: "Performance insights",
    tooltip:
      "Visibility into traffic and performance trends (what’s slow, what’s popular, what to optimize).",
    availability: { hobby: false, plus: true, business: true, enterprise: true },
  },
  {
    type: "feature",
    label: "Core Web Vitals budgets",
    tooltip:
      "Defines thresholds for metrics like LCP/CLS/INP to prevent regressions and keep performance in check.",
    availability: { hobby: false, plus: false, business: true, enterprise: true },
  },

  { type: "category", label: "Enterprise" },

  {
    type: "feature",
    label: "SSO / RBAC",
    tooltip:
      "Single Sign-On and Role-Based Access Control for enterprise-grade authentication and permissions.",
    availability: { hobby: false, plus: false, business: false, enterprise: true },
  },
];

function YesIcon() {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentColor" }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NoIcon() {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentColor" }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM10.5 11.5607L9.96967 11.0303L8 9.06066L6.03033 11.0303L5.5 11.5607L4.43934 10.5L4.96967 9.96967L6.93934 8L4.96967 6.03033L4.43934 5.5L5.5 4.43934L6.03033 4.96967L8 6.93934L9.96967 4.96967L10.5 4.43934L11.5607 5.5L11.0303 6.03033L9.06066 8L11.0303 9.96967L11.5607 10.5L10.5 11.5607Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FeatureCell({
  enabled,
  label,
  tooltip,
}: {
  enabled: boolean;
  label: string;
  tooltip: string;
}) {
  return (
    <Tooltip content={tooltip} position="right">
      <div className="performance__cellInner__C2d3e">
        <span
          className={[
            "performance__icon__Z3n7q",
            enabled ? "performance__icon--yes__Z3n7q" : "performance__icon--no__Z3n7q",
          ].join(" ")}
          aria-hidden="true"
        >
          {enabled ? <YesIcon /> : <NoIcon />}
        </span>

        <span
          className={[
            "typography__small__Q9j2p",
            "performance__text__Q9j2p",
            enabled ? "performance__text--yes__Q9j2p" : "performance__text--no__Q9j2p",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </Tooltip>
  );
}

export function PricingSectionPerformance() {
  return (
    <TooltipProvider>
      <section className="performance__container__Q7j3s">
        <div className="performance__content__K9j6q">
          <div
            className="performance__table__L7p3s"
            role="table"
            aria-label="Plan performance comparison"
          >
            {/* Rowgroup 1: sticky header */}
            <div
              className="performance__rowgroup__A1b2c performance__rowgroup--sticky__A1b2c"
              role="rowgroup"
            >
              <div
                className="performance__row__P5k8p performance__row--header__P5k8p"
                role="row"
              >
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

            {/* Rowgroup 2: body */}
            <div className="performance__rowgroup__A1b2c" role="rowgroup">
              {rows.map((r, idx) => {
                if (r.type === "category") {
                  return (
                    <div
                      key={`cat-${idx}-${r.label}`}
                      className="performance__row__P5k8p performance__row--category__P5k8p"
                      role="row"
                    >
                      <div className="performance__cell__C2d3e" role="cell">
                        {r.tooltip ? (
                          <Tooltip content={r.tooltip} position="right">
                            <span className="typography__small__Q9j2p performance__category__Q9j2p performance__label--tooltip__W7m3k">
                              {r.label}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="typography__small__Q9j2p performance__category__Q9j2p">
                            {r.label}
                          </span>
                        )}
                      </div>

                      <div className="performance__cell__C2d3e" role="cell" />
                      <div className="performance__cell__C2d3e" role="cell" />
                      <div className="performance__cell__C2d3e" role="cell" />
                    </div>
                  );
                }

                return (
                  <div
                    key={`feat-${idx}-${r.label}`}
                    className="performance__row__P5k8p"
                    role="row"
                  >
                    {planOrder.map((p) => (
                      <div
                        key={`${r.label}-${p.key}`}
                        className="performance__cell__C2d3e"
                        role="cell"
                      >
                        <FeatureCell
                          enabled={r.availability[p.key]}
                          label={r.label}
                          tooltip={r.tooltip}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "24px" } as CSSProperties}
          />
        </div>
      </section>
    </TooltipProvider>
  );
}
