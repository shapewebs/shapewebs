"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type RowCell = {
  text: string;
  tooltip: string;
};

type PerformanceRow =
  | { kind: "section"; label: string; tooltip: string } // header row (only first column filled)
  | { kind: "row"; label: RowCell; values: Record<PlanKey, RowCell> }; // normal row

const planTitles: Record<PlanKey, string> = {
  hobby: "Hobby",
  plus: "Plus",
  business: "Business",
  enterprise: "Enterprise",
};

const performanceRows: PerformanceRow[] = [
  {
    kind: "section",
    label: "Core features",
    tooltip: "Baseline capabilities included in each plan category below",
  },
  {
    kind: "row",
    label: {
      text: "Customer requests",
      tooltip: "Ability to request changes, additions, or adjustments to your site",
    },
    values: {
      hobby: { text: "Customer requests", tooltip: "Included in Hobby" },
      plus: { text: "Customer requests", tooltip: "Included in Plus" },
      business: { text: "Customer requests", tooltip: "Included in Business" },
      enterprise: { text: "Customer requests", tooltip: "Included in Enterprise" },
    },
  },
  {
    kind: "row",
    label: {
      text: "Support response time",
      tooltip: "Typical time to first response from the team",
    },
    values: {
      hobby: { text: "Email (standard)", tooltip: "Standard email response window" },
      plus: { text: "Priority", tooltip: "Moves ahead in the support queue" },
      business: { text: "Priority+", tooltip: "Faster handling + escalation" },
      enterprise: { text: "Dedicated", tooltip: "Dedicated channel + onboarding support" },
    },
  },

  {
    kind: "section",
    label: "Performance & reliability",
    tooltip: "Speed, uptime, and safeguards that improve user experience",
  },
  {
    kind: "row",
    label: {
      text: "Cold start prevention",
      tooltip: "Avoids slow first loads when serverless functions go idle",
    },
    values: {
      hobby: { text: "—", tooltip: "Not included in Hobby" },
      plus: { text: "Included", tooltip: "Enabled on Plus" },
      business: { text: "Included", tooltip: "Enabled on Business" },
      enterprise: { text: "Included", tooltip: "Enabled on Enterprise" },
    },
  },
  {
    kind: "row",
    label: {
      text: "Caching / ISR configuration",
      tooltip:
        "Incremental Static Regeneration (ISR) enables pages to update without full rebuilds",
    },
    values: {
      hobby: { text: "Basic", tooltip: "Standard caching defaults" },
      plus: { text: "Improved", tooltip: "Better caching guidance and tuning" },
      business: { text: "Advanced", tooltip: "Advanced caching + ISR setup" },
      enterprise: { text: "Advanced+", tooltip: "Advanced + custom strategy" },
    },
  },

  {
    kind: "section",
    label: "Security",
    tooltip: "Protection layers that help prevent attacks and reduce risk",
  },
  {
    kind: "row",
    label: {
      text: "Web Application Firewall (WAF)",
      tooltip: "Filters malicious traffic and blocks common web attacks",
    },
    values: {
      hobby: { text: "Included", tooltip: "Enabled on Hobby" },
      plus: { text: "Included", tooltip: "Enabled on Plus" },
      business: { text: "Included", tooltip: "Enabled on Business" },
      enterprise: { text: "Included", tooltip: "Enabled on Enterprise" },
    },
  },
  {
    kind: "row",
    label: {
      text: "DDoS mitigation",
      tooltip: "Protection against traffic floods designed to overwhelm your site",
    },
    values: {
      hobby: { text: "Included", tooltip: "Enabled on Hobby" },
      plus: { text: "Included", tooltip: "Enabled on Plus" },
      business: { text: "Included", tooltip: "Enabled on Business" },
      enterprise: { text: "Included", tooltip: "Enabled on Enterprise" },
    },
  },
  {
    kind: "row",
    label: {
      text: "SSO / RBAC",
      tooltip:
        "Single Sign-On (SSO) for authentication + Role-Based Access Control (RBAC) for permissions",
    },
    values: {
      hobby: { text: "—", tooltip: "Not included in Hobby" },
      plus: { text: "—", tooltip: "Not included in Plus" },
      business: { text: "—", tooltip: "Not included in Business" },
      enterprise: { text: "Included", tooltip: "Available in Enterprise" },
    },
  },
];

function CellWithTooltip({
  text,
  tooltip,
  className,
}: {
  text: string;
  tooltip: string;
  className?: string;
}) {
  return (
    <Tooltip content={tooltip} position="right">
      <span className={className}>{text}</span>
    </Tooltip>
  );
}

export function PricingSectionPerformance() {
  const columns = useMemo(() => ["label", "hobby", "plus", "business", "enterprise"] as const, []);

  return (
    <TooltipProvider>
      <div
        className="performanceGrid__table__Q7j3s"
        role="table"
        style={{ gridTemplateColumns: "1fr" } as CSSProperties}
      >
        {/* ROW GROUP 1: Sticky header with plan titles */}
        <div className="performanceGrid__headGroup__K9j6q" role="rowgroup">
          <div className="performanceGrid__headRow__L7p3s" role="row">
            <div className="performanceGrid__rowInner__A1b2c">
              <div className="performanceGrid__cell__P5k8p performanceGrid__cell--headLabel__P5k8p" role="columnheader">
                <span className="typography__small__Q9j2p">Performance</span>
              </div>

              {(
                ["hobby", "plus", "business", "enterprise"] as const
              ).map((k) => (
                <div
                  key={k}
                  className="performanceGrid__cell__P5k8p performanceGrid__cell--head__P5k8p"
                  role="columnheader"
                >
                  <span className="typography__heading5__J8d3k">{planTitles[k]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW GROUP 2: Body rows */}
        <div className="performanceGrid__bodyGroup__K9j6q" role="rowgroup">
          {performanceRows.map((row, idx) => {
            if (row.kind === "section") {
              return (
                <div key={`section-${idx}`} className="performanceGrid__row__M93j8" role="row">
                  <div className="performanceGrid__rowInner__A1b2c">
                    <div
                      className="performanceGrid__cell__P5k8p performanceGrid__cell--section__P5k8p"
                      role="cell"
                    >
                      <CellWithTooltip
                        text={row.label}
                        tooltip={row.tooltip}
                        className="typography__heading6__H5j9s performanceGrid__sectionText__W7m3k"
                      />
                    </div>

                    {/* empty cells to keep 5-column layout */}
                    <div className="performanceGrid__cell__P5k8p performanceGrid__cell--empty__P5k8p" role="cell" />
                    <div className="performanceGrid__cell__P5k8p performanceGrid__cell--empty__P5k8p" role="cell" />
                    <div className="performanceGrid__cell__P5k8p performanceGrid__cell--empty__P5k8p" role="cell" />
                    <div className="performanceGrid__cell__P5k8p performanceGrid__cell--empty__P5k8p" role="cell" />
                  </div>
                </div>
              );
            }

            return (
              <div key={`row-${idx}`} className="performanceGrid__row__M93j8" role="row">
                <div className="performanceGrid__rowInner__A1b2c">
                  <div className="performanceGrid__cell__P5k8p performanceGrid__cell--label__P5k8p" role="rowheader">
                    <CellWithTooltip
                      text={row.label.text}
                      tooltip={row.label.tooltip}
                      className="typography__small__Q9j2p performanceGrid__labelText__Q9j2p"
                    />
                  </div>

                  {(["hobby", "plus", "business", "enterprise"] as const).map((k) => (
                    <div
                      key={`${idx}-${k}`}
                      className="performanceGrid__cell__P5k8p performanceGrid__cell--value__P5k8p"
                      role="cell"
                    >
                      <CellWithTooltip
                        text={row.values[k].text}
                        tooltip={row.values[k].tooltip}
                        className="typography__small__Q9j2p performanceGrid__valueText__Q9j2p"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
