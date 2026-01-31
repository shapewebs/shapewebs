"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type CategoryRow = {
  type: "category";
  label: string;
  tooltip?: string;
};

type FeatureRow = {
  type: "feature";
  label: string; // shows inside every cell
  tooltip: string; // explains what the feature means
  availability: Record<PlanKey, boolean>;
};

type PerfRow = CategoryRow | FeatureRow;

const plans: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

const rows: PerfRow[] = [
  { type: "category", label: "Core features" },

  {
    type: "feature",
    label: "Firewall protection",
    tooltip:
      "Web Application Firewall (WAF): blocks common web attacks like malicious patterns and injection attempts.",
    availability: { hobby: true, plus: true, business: true, enterprise: true },
  },
  {
    type: "feature",
    label: "DDoS mitigation",
    tooltip:
      "Protection against traffic floods intended to overwhelm your site and knock it offline.",
    availability: { hobby: true, plus: true, business: true, enterprise: true },
  },
  {
    type: "feature",
    label: "Cold start prevention",
    tooltip:
      "Measures to reduce slow first-loads due to serverless cold starts (keep-warm strategies where applicable).",
    availability: { hobby: false, plus: true, business: true, enterprise: true },
  },

  { type: "category", label: "Compliance & access" },

  {
    type: "feature",
    label: "SSO + RBAC",
    tooltip:
      "Single Sign-On and Role-Based Access Control for enterprise user management and permissions.",
    availability: { hobby: false, plus: false, business: false, enterprise: true },
  },
];

function YesIcon({ className }: { className?: string }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      width="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      style={{ color: "currentColor" }}
      className={className}
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

function NoIcon({ className }: { className?: string }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      width="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      style={{ color: "currentColor" }}
      className={className}
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
  text,
  enabled,
}: {
  text: string;
  enabled: boolean;
}) {
  return (
    <div
      className="performance__cell__C2d3e"
      role="cell"
      data-enabled={enabled ? "true" : "false"}
    >
      <span className="performance__cell-inner__X1y2z">
        {enabled ? (
          <YesIcon className="performance__icon--yes__P5k8p" />
        ) : (
          <NoIcon className="performance__icon--no__P5k8p" />
        )}
        <span className="typography__small__Q9j2p performance__text__Q9j2p">
          {text}
        </span>
      </span>
    </div>
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
            aria-label="Plan feature comparison"
          >
            {/* Rowgroup 1: sticky plan titles */}
            <div
              className="performance__rowgroup__A1b2c performance__rowgroup--sticky__A1b2c"
              role="rowgroup"
            >
              <div
                className="performance__row__P5k8p performance__row--header__P5k8p"
                role="row"
              >
                {plans.map((p) => (
                  <div
                    key={p.key}
                    className="performance__cell__C2d3e performance__cell--header__C2d3e"
                    role="columnheader"
                  >
                    <span className="typography__heading6__H5j9s">
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
                        {plans.map((p) => (
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
                    key={`feat-${idx}-${r.label}`}
                    className="performance__rowwrap__V2c3d"
                    role="row"
                  >
                    <div className="performance__rowlabel__X1y2z">
                      <Tooltip content={r.tooltip} position="right">
                        <span className="typography__small__Q9j2p performance__label--tooltip__W7m3k">
                          {r.label}
                        </span>
                      </Tooltip>
                    </div>

                    <div className="performance__row__P5k8p">
                      {plans.map((p) => (
                        <FeatureCell
                          key={`${r.label}-${p.key}`}
                          text={r.label}
                          enabled={r.availability[p.key]}
                        />
                      ))}
                    </div>
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
