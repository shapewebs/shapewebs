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
      label: string; // shown inside every cell (with icon + value)
      tooltip: string;
      values: Record<PlanKey, string>;
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

// Map Vercel tiers (Hobby/Pro/Enterprise) into your 4 plans
const v = (hobby: string, pro: string, enterprise: string): Record<PlanKey, string> => ({
  hobby,
  plus: hobby, // Plus runs Vercel free (Hobby)
  business: pro, // Business runs Vercel Pro
  enterprise, // Enterprise runs Vercel Enterprise
});

const isEnabledValue = (value: string) => {
  const t = value.trim();
  if (!t) return false;
  if (t === "—") return false;
  return true; // "Custom" counts as enabled
};

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

function CellItem({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string;
  tooltip: string;
}) {
  const enabled = isEnabledValue(value);

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

        <div className="performance__textStack__Q9j2p">
          <span
            className={[
              "typography__small__Q9j2p",
              "performance__label__Q9j2p",
              enabled ? "performance__text--yes__Q9j2p" : "performance__text--no__Q9j2p",
            ].join(" ")}
          >
            {label}
          </span>

          <span
            className={[
              "typography__caption__L3p7q",
              "performance__value__L3p7q",
              enabled ? "performance__text--yes__Q9j2p" : "performance__text--no__Q9j2p",
            ].join(" ")}
          >
            {value}
          </span>
        </div>
      </div>
    </Tooltip>
  );
}

const rows: PerfRow[] = [
  { type: "category", label: "Managed Infrastructure", tooltip: "Core network, routing, and regional capabilities." },

  // Delivery Network
  { type: "category", label: "Vercel Delivery Network", tooltip: "Global delivery, routing, and transfer limits." },

  {
    type: "feature",
    label: "Vercel Network",
    tooltip: "Global application delivery network (PoPs).",
    values: v("Global Points of Presence", "Global Points of Presence", "Global Points of Presence"),
  },
  {
    type: "feature",
    label: "Vercel Regions",
    tooltip: "Regions available for workloads and deployments.",
    values: v("Vercel Regions", "Vercel Regions", "Vercel Regions"),
  },
  {
    type: "feature",
    label: "Automatic Routing",
    tooltip: "Routes requests automatically to optimal locations.",
    values: v("Included", "Included", "Included"),
  },
  {
    type: "feature",
    label: "HTTPS Certificates",
    tooltip: "Automatic HTTPS certificates for secure connections.",
    values: v("Included", "Included", "Included"),
  },
  {
    type: "feature",
    label: "TLS/SSL Encryption",
    tooltip: "Encrypted traffic between clients and your application.",
    values: v("Included", "Included", "Included"),
  },
  {
    type: "feature",
    label: "Traffic Load Balancing",
    tooltip: "Load distribution across regions/instances.",
    values: v("Included", "Included", "Included"),
  },
  {
    type: "feature",
    label: "Private Inter-Region Network",
    tooltip: "Private network between regions (where applicable).",
    values: v("—", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Automatic Region Failover",
    tooltip: "Automatic failover to healthy regions.",
    values: v("—", "Included", "Custom"),
  },

  // Configurable Routing
  { type: "category", label: "Configurable Routing", tooltip: "Reverse proxy, rewrites, redirects, middleware." },

  {
    type: "feature",
    label: "Reverse Proxy",
    tooltip: "Proxy requests to other origins/services.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Rewrites",
    tooltip: "Rewrite URLs without redirecting the browser.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Redirects",
    tooltip: "Redirect users from one URL to another.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Middleware Support",
    tooltip: "Run code at the edge before a request completes.",
    values: v("Included", "Included", "Custom"),
  },

  // Edge Requests
  { type: "category", label: "Edge Requests", tooltip: "Monthly included edge requests & overage behavior." },

  {
    type: "feature",
    label: "Edge Requests included",
    tooltip: "Requests handled on the edge. Includes monthly quota.",
    values: v("1M / month included", "10M / month included (up to $32 in value) then starting at $2 per 1M", "Custom"),
  },

  // Data transfer
  { type: "category", label: "Fast Data Transfer", tooltip: "Included data transfer & overage pricing." },

  {
    type: "feature",
    label: "Fast Data Transfer included",
    tooltip: "Included data transfer for serving your app globally.",
    values: v("100 GB / month included", "1TB / month included (up to $350 in value) then starting at $0.15 per GB", "Custom"),
  },
  {
    type: "feature",
    label: "Regional pricing",
    tooltip: "Pricing varies by region.",
    values: v("Regional pricing", "Regional pricing", "Regional pricing"),
  },

  // Firewall
  { type: "category", label: "Managed Infrastructure", tooltip: "Security controls and managed rulesets." },
  { type: "category", label: "Vercel Firewall", tooltip: "Security features to protect your apps." },

  {
    type: "feature",
    label: "Web Application Firewall",
    tooltip: "Managed WAF protections for common threats.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Custom Firewall Rules",
    tooltip: "Number of custom firewall rules available.",
    values: v("Up to 3", "Up to 40", "Up to 1,000"),
  },
  {
    type: "feature",
    label: "IP Blocking",
    tooltip: "Number of IP block rules available.",
    values: v("Up to 3", "Up to 100", "Up to 1,000"),
  },
  {
    type: "feature",
    label: "System Bypass Rules",
    tooltip: "Bypass system protections for trusted traffic flows.",
    values: v("—", "Up to 25", "Up to 100"),
  },
  {
    type: "feature",
    label: "Rate Limiting",
    tooltip: "Allowed requests included & pricing beyond quota.",
    values: v("1M allowed requests included / month", "Starting at $0.50 per 1M allowed requests", "Custom"),
  },
  {
    type: "feature",
    label: "OWASP Core Ruleset (managed)",
    tooltip: "Managed OWASP CRS rule set support.",
    values: v("—", "—", "Custom"),
  },

  // Bot Management
  { type: "category", label: "Bot Management", tooltip: "DDoS mitigation and bot controls." },

  {
    type: "feature",
    label: "Automated DDoS Mitigation",
    tooltip: "Automatic protections against volumetric attacks.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "AI Bots (managed ruleset)",
    tooltip: "Managed rule set for AI bot traffic.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Bot Protection (managed ruleset)",
    tooltip: "Managed protection against bot traffic patterns.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "BotID",
    tooltip: "Bot identification and deep analysis checks.",
    values: v("Basic checks included", "$1 per 1,000 Deep Analysis checks", "Custom"),
  },
  {
    type: "feature",
    label: "Attack Challenge Mode",
    tooltip: "Challenge suspicious traffic with additional checks.",
    values: v("Included", "Included", "Custom"),
  },

  // Content, caching & optimization
  { type: "category", label: "Managed Infrastructure", tooltip: "Content delivery and cache behavior." },
  { type: "category", label: "Content, Caching & Optimization", tooltip: "Cache and optimize content close to users." },

  {
    type: "feature",
    label: "Zero-config CDN cache",
    tooltip: "Automatic CDN caching where applicable.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Automated Compression",
    tooltip: "Compression for faster transfer.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Background Revalidation",
    tooltip: "Revalidate content in the background.",
    values: v("Included", "Included", "Custom"),
  },
  {
    type: "feature",
    label: "Stale-While-Revalidate",
    tooltip: "Serve cached responses while revalidating.",
    values: v("Included", "Included", "Custom"),
  },

  // ISR
  { type: "category", label: "Incremental Static Regeneration (ISR)", tooltip: "ISR reads/writes quotas and overage." },

  {
    type: "feature",
    label: "ISR Reads",
    tooltip: "Monthly included ISR reads.",
    values: v("1M / month included", "Starting at $0.40 per 1M", "Custom"),
  },
  {
    type: "feature",
    label: "ISR Writes",
    tooltip: "Monthly included ISR writes.",
    values: v("200,000 / month included", "Starting at $4 per 1M", "Custom"),
  },

  // Bulk redirects
  {
    type: "feature",
    label: "Bulk Redirects",
    tooltip: "Bulk redirect limits and pricing.",
    values: v("1K included per project", "$50 per month per 25K redirects", "Custom"),
  },

  // Blob
  { type: "category", label: "Blob", tooltip: "Blob storage quotas and operations." },

  {
    type: "feature",
    label: "Blob Storage Size",
    tooltip: "Monthly included blob storage.",
    values: v("1 GB / month included", "$0.023 per GB", "Custom"),
  },
  {
    type: "feature",
    label: "Blob Simple Operations",
    tooltip: "Monthly included simple blob operations.",
    values: v("10,000 / month included", "$0.40 per 1M", "Custom"),
  },
  {
    type: "feature",
    label: "Blob Advanced Operations",
    tooltip: "Monthly included advanced blob operations.",
    values: v("2,000 / month included", "$5.00 per 1M", "Custom"),
  },
  {
    type: "feature",
    label: "Blob Data Transfer",
    tooltip: "Monthly included blob data transfer.",
    values: v("10 GB / month included", "Starting at $0.05 per GB", "Custom"),
  },

  // Image optimization
  { type: "category", label: "Image Optimization", tooltip: "Image transformation and cache quotas." },

  {
    type: "feature",
    label: "Image Transformations",
    tooltip: "Monthly included transformations.",
    values: v("5,000 / month included", "Starting at $0.05 per 1K", "Custom"),
  },
  {
    type: "feature",
    label: "Image Cache Reads",
    tooltip: "Monthly included reads from image cache.",
    values: v("300,000 / month included", "Starting at $0.40 per 1M", "Custom"),
  },
  {
    type: "feature",
    label: "Image Cache Writes",
    tooltip: "Monthly included writes to image cache.",
    values: v("100,000 / month included", "Starting at $4.00 per 1M", "Custom"),
  },

  // Edge Config
  { type: "category", label: "Edge Config", tooltip: "Edge config reads/writes quotas." },

  {
    type: "feature",
    label: "Edge Config Reads",
    tooltip: "Monthly included reads.",
    values: v("100,000 / month included", "Starting at $3.00 per 1M reads", "Custom"),
  },
  {
    type: "feature",
    label: "Edge Config Writes",
    tooltip: "Monthly included writes.",
    values: v("100 writes / month included", "$5.00 per 500 writes", "Custom"),
  },

  // Compute
  { type: "category", label: "Managed Infrastructure", tooltip: "Compute limits and pricing." },
  { type: "category", label: "Vercel Compute", tooltip: "Functions, sandbox, and workflow." },

  {
    type: "feature",
    label: "Functions: Active CPU",
    tooltip: "Monthly included function active CPU time.",
    values: v("4 hours / month included", "Starting at $0.128 per hour", "Custom"),
  },
  {
    type: "feature",
    label: "Functions: Provisioned Memory",
    tooltip: "Monthly included provisioned memory.",
    values: v("360 GB-hrs / month included", "Starting at $0.0106 per GB-hour", "Custom"),
  },
  {
    type: "feature",
    label: "Functions: Invocations",
    tooltip: "Monthly included function invocations.",
    values: v("1M / month included", "Starting at $0.60 per 1M", "Custom"),
  },

  {
    type: "feature",
    label: "Sandbox: Active CPU",
    tooltip: "Monthly included sandbox active CPU time.",
    values: v("5 hours / month included", "Starting at $0.128 per hour", "Custom"),
  },
  {
    type: "feature",
    label: "Sandbox: Provisioned Memory",
    tooltip: "Monthly included sandbox provisioned memory.",
    values: v("420 GB-hours / month included", "Starting at $0.0212 per GB-hr", "Custom"),
  },
  {
    type: "feature",
    label: "Sandbox: Creation",
    tooltip: "Monthly included sandbox creations.",
    values: v("5,000 / month included", "Starting at $0.60 per 1M", "Custom"),
  },
  {
    type: "feature",
    label: "Sandbox: Network",
    tooltip: "Monthly included sandbox network transfer.",
    values: v("20 GB / month included", "Starting at $0.15 per GB", "Custom"),
  },
  {
    type: "feature",
    label: "Concurrent Sandboxes",
    tooltip: "Max concurrent sandbox instances.",
    values: v("10", "2000", "Custom"),
  },
  {
    type: "feature",
    label: "Sandbox Storage",
    tooltip: "Included sandbox storage size.",
    values: v("15 GB", "Starting at $0.08 per GB-month", "Custom"),
  },

  // Observability
  { type: "category", label: "Managed Infrastructure", tooltip: "Monitoring and logging." },
  { type: "category", label: "Observability", tooltip: "Logs, traces, analytics & add-ons." },

  {
    type: "feature",
    label: "Runtime Logs retention",
    tooltip: "How long logs are retained by default.",
    values: v("1 hour of logs", "1 day of logs (30 days with Observability Plus)", "3 days of logs (30 days with Observability Plus)"),
  },
  {
    type: "feature",
    label: "Session Tracing retention",
    tooltip: "How long traces are retained.",
    values: v("1 hour of traces", "1 day of traces", "3 days of traces"),
  },
  {
    type: "feature",
    label: "Log Drains",
    tooltip: "Export logs to external destinations.",
    values: v("—", "$0.50 per 1 GB", "Custom"),
  },

  // Security & Privacy (subset)
  { type: "category", label: "Security & Privacy", tooltip: "Access controls and deployment protection." },

  {
    type: "feature",
    label: "Role-Based Access Control",
    tooltip: "Control access via roles and permissions.",
    values: v("—", "Team level", "Team & project level"),
  },
  {
    type: "feature",
    label: "SAML Single Sign-On (SSO)",
    tooltip: "SAML SSO support.",
    values: v("—", "$300 / month", "Custom"),
  },

  // Compliance (subset)
  { type: "category", label: "Compliance", tooltip: "Security/compliance standards and add-ons." },

  {
    type: "feature",
    label: "HIPAA BAA",
    tooltip: "HIPAA Business Associate Agreement availability.",
    values: v("—", "$350 / month", "Custom"),
  },
];

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
                  <div key={`feat-${idx}-${r.label}`} className="performance__row__P5k8p" role="row">
                    {planOrder.map((p) => (
                      <div key={`${r.label}-${p.key}`} className="performance__cell__C2d3e" role="cell">
                        <CellItem label={r.label} value={r.values[p.key]} tooltip={r.tooltip} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="Spacer-module__root__NM019" style={{ "--height": "24px" } as CSSProperties} />
        </div>
      </section>
    </TooltipProvider>
  );
}
