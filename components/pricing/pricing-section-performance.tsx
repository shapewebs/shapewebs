"use client";

import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerfRow =
  | { type: "category"; label: string }
  | {
      type: "feature";
      label: string; // same text shown in all 4 plan cells
      details: Record<PlanKey, string>; // tooltip text per plan
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

// Map Vercel plan data -> your 4 plans:
// Hobby + Plus = Vercel Hobby (free)
// Business = Vercel Pro
// Enterprise = Vercel Enterprise
const v = (hobby: string, pro: string, enterprise: string): Record<PlanKey, string> => ({
  hobby,
  plus: hobby,
  business: pro,
  enterprise,
});

const isEnabled = (detail: string) => {
  const d = (detail ?? "").trim();
  return d !== "" && d !== "—" && d.toLowerCase() !== "custom"; // treat "Custom" as enabled (true) for Enterprise rows
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

function FeatureCell({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  const enabled = isEnabled(detail);

  return (
    <Tooltip content={detail || "—"} position="right">
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

/**
 * Rows: visible text is always the feature label.
 * Tooltip shows the plan-specific limits/pricing/etc.
 * Enabled/disabled is derived: "—" => disabled.
 */
const rows: PerfRow[] = [
  { type: "category", label: "Managed Infrastructure" },

  { type: "feature", label: "Vercel Delivery Network", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Vercel Network", details: v("Global Points of Presence", "Global Points of Presence", "Global Points of Presence") },
  { type: "feature", label: "Vercel Regions", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Automatic Routing", details: v("Included", "Included", "Included") },
  { type: "feature", label: "HTTPS Certificates", details: v("Included", "Included", "Included") },
  { type: "feature", label: "TLS/SSL Encryption", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Traffic Load Balancing", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Private Inter-Region Network", details: v("—", "Included", "Included") },
  { type: "feature", label: "Automatic Region Failover", details: v("—", "Included", "Included") },

  { type: "category", label: "Configurable Routing" },

  { type: "feature", label: "Reverse Proxy", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Rewrites", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Redirects", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Middleware Support", details: v("Included", "Included", "Included") },

  { type: "category", label: "Edge & Transfer" },

  {
    type: "feature",
    label: "Edge Requests",
    details: v(
      "1M / month included",
      "10M / month included (up to $32 in value) — then starting at $2 per 1M",
      "Custom"
    ),
  },
  {
    type: "feature",
    label: "Fast Data Transfer",
    details: v(
      "100 GB / month included",
      "1TB / month included (up to $350 in value) — then starting at $0.15 per GB",
      "Custom"
    ),
  },
  { type: "feature", label: "Regional pricing", details: v("Included", "Included", "Custom") },

  { type: "category", label: "Vercel Firewall" },

  { type: "feature", label: "Web Application Firewall", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Custom Firewall Rules", details: v("Up to 3", "Up to 40", "Up to 1,000") },
  { type: "feature", label: "IP Blocking", details: v("Up to 3", "Up to 100", "Up to 1,000") },
  { type: "feature", label: "System Bypass Rules", details: v("—", "Up to 25", "Up to 100") },
  {
    type: "feature",
    label: "Rate Limiting",
    details: v(
      "1M allowed requests included / month",
      "Starting at $0.50 per 1M allowed requests",
      "Custom"
    ),
  },
  { type: "feature", label: "OWASP Core Ruleset (managed)", details: v("—", "—", "Custom") },

  { type: "category", label: "Bot Management" },

  { type: "feature", label: "Automated DDoS Mitigation", details: v("Included", "Included", "Included") },
  { type: "feature", label: "AI Bots (managed ruleset)", details: v("Included", "Included", "Custom") },
  { type: "feature", label: "Bot Protection (managed ruleset)", details: v("Included", "Included", "Custom") },
  {
    type: "feature",
    label: "BotID",
    details: v(
      "Basic checks included",
      "$1 per 1,000 Deep Analysis checks",
      "Custom"
    ),
  },
  { type: "feature", label: "Attack Challenge Mode", details: v("Included", "Included", "Custom") },

  { type: "category", label: "Content, Caching & Optimization" },

  { type: "feature", label: "Zero-config CDN cache", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Automated Compression", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Background Revalidation", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Stale-While-Revalidate", details: v("Included", "Included", "Included") },

  { type: "category", label: "Incremental Static Regeneration (ISR)" },

  { type: "feature", label: "ISR Reads", details: v("1M / month included", "Starting at $0.40 per 1M", "Custom") },
  { type: "feature", label: "ISR Writes", details: v("200,000 / month included", "Starting at $4 per 1M", "Custom") },

  { type: "category", label: "Bulk Redirects" },

  { type: "feature", label: "Bulk Redirects", details: v("1K included per project", "$50 / month per 25K redirects", "Custom") },

  { type: "category", label: "Blob Storage" },

  { type: "feature", label: "Blob Storage Size", details: v("1 GB / month included", "$0.023 per GB", "Custom") },
  { type: "feature", label: "Blob Simple Operations", details: v("10,000 / month included", "$0.40 per 1M", "Custom") },
  { type: "feature", label: "Blob Advanced Operations", details: v("2,000 / month included", "$5.00 per 1M", "Custom") },
  { type: "feature", label: "Blob Data Transfer", details: v("10 GB / month included", "Starting at $0.05 per GB", "Custom") },

  { type: "category", label: "Image Optimization" },

  { type: "feature", label: "Image Transformations", details: v("5,000 / month included", "Starting at $0.05 per 1K", "Custom") },
  { type: "feature", label: "Image Cache Reads", details: v("300,000 / month included", "Starting at $0.40 per 1M", "Custom") },
  { type: "feature", label: "Image Cache Writes", details: v("100,000 / month included", "Starting at $4.00 per 1M", "Custom") },

  { type: "category", label: "Edge Config" },

  { type: "feature", label: "Edge Config Reads", details: v("100,000 / month included", "Starting at $3.00 per 1M reads", "Custom") },
  { type: "feature", label: "Edge Config Writes", details: v("100 writes / month included", "$5.00 per 500 writes", "Custom") },

  { type: "category", label: "Compute" },

  { type: "feature", label: "Functions — Active CPU", details: v("4 hours / month included", "Starting at $0.128 / hour", "Custom") },
  { type: "feature", label: "Functions — Provisioned Memory", details: v("360 GB-hrs / month included", "Starting at $0.0106 per GB-hour", "Custom") },
  { type: "feature", label: "Functions — Invocations", details: v("1M / month included", "Starting at $0.60 per 1M", "Custom") },

  { type: "category", label: "DX Platform — Build & Deploy" },

  { type: "feature", label: "Automatic CI/CD", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Environment Variables", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Build Logs", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Remote Cache", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Monorepo Support", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Webhook Triggers", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Custom Environments", details: v("—", "1 environment", "12 environments") },

  { type: "category", label: "Observability" },

  { type: "feature", label: "Runtime Logs retention", details: v("1 hour of logs", "1 day of logs (30 days w/ Observability Plus)", "3 days of logs (30 days w/ Observability Plus)") },
  { type: "feature", label: "Session Tracing retention", details: v("1 hour of traces", "1 day of traces", "3 days of traces") },
  { type: "feature", label: "Log Drains", details: v("—", "$0.50 per 1 GB", "Custom") },

  { type: "category", label: "Access & Deployment Security" },

  { type: "feature", label: "Multi-Factor Authentication (MFA)", details: v("Included", "Included", "Included") },
  { type: "feature", label: "Role-Based Access Control", details: v("—", "Team level", "Team & project level") },
  { type: "feature", label: "Audit Logs", details: v("—", "—", "Included") },
  { type: "feature", label: "SAML Single Sign-On (SSO)", details: v("—", "$300 / month", "Custom") },
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
                      {/* Only first column has category label (as requested) */}
                      <div className="performance__cell__C2d3e" role="cell">
                        <span className="typography__small__Q9j2p performance__category__Q9j2p">
                          {r.label}
                        </span>
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
                        <FeatureCell label={r.label} detail={r.details[p.key]} />
                      </div>
                    ))}
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
