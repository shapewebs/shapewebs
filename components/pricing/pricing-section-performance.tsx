"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerfRow =
  | { type: "category"; label: string; tooltip?: string }
  | {
      type: "row";
      label: string; // feature name (shown in every plan cell)
      tooltip: string;
      availability: Record<PlanKey, boolean>;
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

const rows: PerfRow[] = [
  { type: "category", label: "Security" },

  {
    type: "row",
    label: "Firewall protection",
    tooltip:
      "A Web Application Firewall (WAF) helps block common web attacks and malicious traffic patterns.",
    availability: {
      hobby: true,
      plus: true,
      business: true,
      enterprise: true,
    },
  },
  {
    type: "row",
    label: "DDoS mitigation",
    tooltip:
      "Protection against traffic floods intended to overwhelm your site and knock it offline.",
    availability: {
      hobby: true,
      plus: true,
      business: true,
      enterprise: true,
    },
  },
  {
    type: "row",
    label: "SSO + RBAC",
    tooltip:
      "Single Sign-On and Role-Based Access Control for enterprise user management and permissions.",
    availability: {
      hobby: false,
      plus: false,
      business: false,
      enterprise: true,
    },
  },

  { type: "category", label: "Performance" },

  {
    type: "row",
    label: "Cold start prevention",
    tooltip:
      "Reduces first-load latency caused by serverless cold starts (keep-warm strategies where applicable).",
    availability: {
      hobby: false,
      plus: true,
      business: true,
      enterprise: true,
    },
  },
  {
    type: "row",
    label: "Performance insights",
    tooltip:
      "Visibility into performance trends, bottlenecks, and optimization opportunities.",
    availability: {
      hobby: true,
      plus: true,
      business: true,
      enterprise: true,
    },
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
      style={{ color: "currentcolor" }}
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
      style={{ color: "currentcolor" }}
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

export function PricingSectionPerformance() {
  return (
    <TooltipProvider>
      <section className="performance__container__Q7j3s">
        <div className="performance__content__K9j6q">
          {/* (intentionally no header/subheader here) */}

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "32px" } as CSSProperties}
          />

          <div
            className="performance__table__L7p3s"
            role="table"
            aria-label="Plan performance comparison"
          >
            {/* Rowgroup 1: sticky header (plan titles) */}
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
                    <span
                      className="typography__heading6__H5j9s"
                      style={{ margin: 0 }}
                    >
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
                      className="performance__rowwrap__V2c3d"
                      role="row"
                    >
                      <div className="performance__rowlabel__X1y2z">
                        {r.tooltip ? (
                          <Tooltip content={r.tooltip} position="right">
                            <span className="typography__small__Q9j2p performance__label--tooltip__W7m3k">
                              {r.label}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="typography__small__Q9j2p">
                            {r.label}
                          </span>
                        )}
                      </div>

                      <div
                        className="performance__row__P5k8p performance__row--category__P5k8p"
                      >
                        {planOrder.map((p) => (
                          <div
                            key={`${r.label}-${p.key}`}
                            className="performance__cell__C2d3e"
                            role="cell"
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={`row-${idx}-${r.label}`}
                    className="performance__rowwrap__V2c3d"
                    role="row"
                  >
                    {/* Tooltip “explains the row” – not a column */}
                    <div className="performance__rowlabel__X1y2z">
                      <Tooltip content={r.tooltip} position="right">
                        <span className="typography__small__Q9j2p performance__label--tooltip__W7m3k">
                          {r.label}
                        </span>
                      </Tooltip>
                    </div>

                    {/* 4 columns: the plans */}
                    <div className="performance__row__P5k8p">
                      {planOrder.map((p) => {
                        const has = r.availability[p.key];
                        return (
                          <div
                            key={`${r.label}-${p.key}`}
                            className={`performance__cell__C2d3e performance__cell--feature__C2d3e ${
                              has
                                ? "performance__cell--yes__C2d3e"
                                : "performance__cell--no__C2d3e"
                            }`}
                            role="cell"
                          >
                            <span
                              className="performance__feature__Z3n7q"
                              aria-hidden="true"
                            >
                              {has ? <YesIcon /> : <NoIcon />}
                            </span>

                            <span className="typography__small__Q9j2p">
                              {r.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "32px" } as CSSProperties}
          />
        </div>
      </section>
    </TooltipProvider>
  );
}
