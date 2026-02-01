"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import "@/styles/pages/pricing/pricing-section-performance.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type PlanKey = "hobby" | "plus" | "business" | "enterprise";

type PerfRow =
  | { type: "category"; label: string; tooltip?: string }
  | {
      type: "feature";
      label: string;
      tooltip: string;
      availability: Record<PlanKey, boolean>;
    };

const planOrder: Array<{ key: PlanKey; name: string }> = [
  { key: "hobby", name: "Hobby" },
  { key: "plus", name: "Plus" },
  { key: "business", name: "Business" },
  { key: "enterprise", name: "Enterprise" },
];

// ✅ highlight THIS column
const highlightedPlanKey: PlanKey = "business";

const FREE = { hobby: true, plus: true, business: true, enterprise: true } as const;
const PRO_ONLY = { hobby: false, plus: false, business: true, enterprise: true } as const;
const ENT_ONLY = { hobby: false, plus: false, business: false, enterprise: true } as const;

// CTA config
const planCtas: Record<
  PlanKey,
  {
    href: string;
    label: string;
    showAltSalesLink?: boolean;
  }
> = {
  hobby: { href: "/get-started", label: "Get Started" },
  plus: { href: "/get-started", label: "Get Started" },
  business: { href: "/get-started", label: "Get Started", showAltSalesLink: true },
  enterprise: { href: "/contact", label: "Talk to sales" },
};

// Lots of rows, relevant to a Vercel-hosted website (Free vs Pro vs Enterprise add-ons)
const rows: PerfRow[] = [
  {
    type: "feature",
    label: "Vercel Delivery Network",
    tooltip: "Global delivery via Vercel’s edge network (fast + secure-by-default).",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Automatic routing",
    tooltip: "Automatic routing for Next.js pages, static assets, and optimized delivery paths.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "HTTPS certificates",
    tooltip: "Automatic HTTPS certificates and renewals.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "TLS/SSL encryption",
    tooltip: "Encrypted transport for requests.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Rewrites",
    tooltip: "URL rewrites for cleaner routes and content mapping.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Redirects",
    tooltip: "Redirect rules for SEO, migrations, and canonical URLs.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Middleware support",
    tooltip: "Next.js Middleware support at the edge for auth, redirects, personalization, etc.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Configurable routing",
    tooltip: "More advanced routing patterns and configuration flexibility.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Traffic load balancing",
    tooltip: "Load balancing to distribute traffic and handle spikes more smoothly.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Multiple regions",
    tooltip: "Choose and run workloads closer to your users (regional compute).",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Private inter-region network",
    tooltip: "Private connectivity between regions for enterprise networking use-cases.",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Automatic region failover",
    tooltip: "Fail over traffic to other regions automatically if something goes down.",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Security",
    tooltip: "Application protection: WAF, rules, rate limiting, and bot mitigation.",
  },

  {
    type: "feature",
    label: "Web Application Firewall",
    tooltip: "Baseline WAF protection to block common malicious traffic patterns.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Custom firewall rules",
    tooltip: "Create custom firewall rules (more flexibility on Pro/Enterprise).",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "IP blocking",
    tooltip: "Block abusive IPs or ranges.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "System bypass rules",
    tooltip: "Bypass rules for trusted services/health checks/internal tools.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Rate limiting",
    tooltip: "Protect endpoints from abuse by limiting request rates.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Bot protection",
    tooltip: "Block/limit automated bot traffic and suspicious behavior.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Automated DDoS mitigation",
    tooltip: "DDoS mitigation protections as traffic scales.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Attack challenge mode",
    tooltip: "Challenge suspicious traffic (e.g., JS challenge / additional verification).",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Optimization",
    tooltip: "How content is cached and optimized close to visitors (CDN, ISR, images).",
  },

  {
    type: "feature",
    label: "Zero-config CDN cache",
    tooltip: "Automatic edge caching for static assets and optimized delivery.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Automated compression",
    tooltip: "Automatic gzip/brotli compression where applicable.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Stale-While-Revalidate",
    tooltip: "Serve cached content while revalidating in the background.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Background revalidation",
    tooltip: "Background refresh patterns to keep content fresh with minimal latency.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Incremental Static Regeneration",
    tooltip: "ISR for dynamic-but-fast pages (regenerate on demand or schedule).",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Image optimization",
    tooltip: "Automatic image transformations and caching.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Edge config (feature flags)",
    tooltip: "Edge configuration store for flags, experiments, runtime config.",
    availability: PRO_ONLY,
  },

  {
    type: "category",
    label: "Compute",
    tooltip: "Dynamic workloads: functions, background tasks, concurrency and scale.",
  },

  {
    type: "feature",
    label: "Serverless functions",
    tooltip: "Run backend logic (API routes / server actions / webhooks).",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Higher function concurrency",
    tooltip: "Better concurrency and scale characteristics suited for production traffic.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "More generous usage limits",
    tooltip: "Higher included quotas and better scaling for production apps.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Sandboxed execution",
    tooltip: "Isolated sandbox execution patterns for higher security use-cases.",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Build & deploy workflow",
    tooltip: "CI/CD, environments, preview deploys, protection and team workflows.",
  },

  {
    type: "feature",
    label: "Automatic CI/CD",
    tooltip: "Push to Git → automatic builds and deploys.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Preview deployments",
    tooltip: "Per-PR preview deploys for fast review and iteration.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Environment variables",
    tooltip: "Config variables per environment (preview/production).",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Custom environments",
    tooltip: "Additional isolated environments beyond the basics (staging, QA, etc.).",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Advanced deployment protection",
    tooltip: "Stronger access control for deploy previews and protected environments.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "SSO-protected previews",
    tooltip: "Protect preview deployments behind SSO (enterprise access patterns).",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Rolling releases",
    tooltip: "Gradual rollout strategies and safer release management.",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Observability",
    tooltip: "Monitor performance, logs, analytics and diagnose issues faster.",
  },

  {
    type: "feature",
    label: "Basic usage dashboard",
    tooltip: "Basic usage visibility and monitoring.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Speed insights",
    tooltip: "Frontend performance events and speed insights for diagnosing bottlenecks.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Web analytics",
    tooltip: "First-party analytics to understand traffic and behavior.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Longer log retention",
    tooltip: "Keep runtime logs longer for audits and debugging.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Session tracing",
    tooltip: "Deeper tracing for debugging complex issues and user journeys.",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Log drains",
    tooltip: "Send logs to external systems (SIEM / data platforms).",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Access & governance",
    tooltip: "Team access controls, auditability, and enterprise identity needs.",
  },

  {
    type: "feature",
    label: "Role-based access control",
    tooltip: "Fine-grained team roles and permissions.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Audit logs",
    tooltip: "Visibility into who changed what, and when.",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "SAML Single Sign-On (SSO)",
    tooltip: "Enterprise SSO (SAML) for centralized identity management.",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Directory sync (SCIM)",
    tooltip: "Automated user provisioning and deprovisioning via SCIM.",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Compliance",
    tooltip: "Security standards support and documentation readiness for larger orgs.",
  },

  {
    type: "feature",
    label: "Compliance support",
    tooltip: "Help aligning with SOC 2 / GDPR expectations (process + platform guidance).",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Custom SLAs",
    tooltip: "Contractual uptime and response commitments (enterprise agreements).",
    availability: ENT_ONLY,
  },

  {
    type: "category",
    label: "Support",
    tooltip: "How quickly and deeply we help you ship and maintain improvements.",
  },

  {
    type: "feature",
    label: "Email support",
    tooltip: "Support via email for questions and issues.",
    availability: FREE,
  },
  {
    type: "feature",
    label: "Priority support",
    tooltip: "Faster response times and higher support priority.",
    availability: PRO_ONLY,
  },
  {
    type: "feature",
    label: "Dedicated onboarding",
    tooltip: "Hands-on onboarding, launch support, and ongoing coordination.",
    availability: ENT_ONLY,
  },
  {
    type: "feature",
    label: "Account manager",
    tooltip: "A dedicated point of contact for planning, escalations, and roadmap alignment.",
    availability: ENT_ONLY,
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

function PlanCtaCell({ planKey }: { planKey: PlanKey }) {
  const cta = planCtas[planKey];
  const isHighlighted = planKey === highlightedPlanKey;

  const kindClass = isHighlighted
    ? "button__kind-primary__R5j2s"
    : "button__kind-secondary__R5j2s";

  return (
    <>
      <a
        href={cta.href}
        className={`button__root__ZxcvB button__size-medium__L9d7h pricing__cta__X1y2z ${kindClass}`}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <span>{cta.label}</span>
      </a>

      {isHighlighted && cta.showAltSalesLink && (
        <p className="typography__small__Q9j2p pricing__alt__P5k8p" style={{ margin: 0 }}>
          or{" "}
          <a href="/contact" className="typography__link__B7s3m">
            Talk to sales
          </a>
        </p>
      )}
    </>
  );
}

export function PricingSectionPerformance() {
  // ✅ default to first column (Hobby)
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>(planOrder[0].key);

  const selectedPlanName = useMemo(() => {
    return planOrder.find((p) => p.key === selectedPlanKey)?.name ?? planOrder[0].name;
  }, [selectedPlanKey]);

  return (
    <TooltipProvider>
      <section className="performance__container__Q7j3s">
        <div className="performance__content__K9j6q">
          <div className="performance__table__L7p3s" role="table" aria-label="Plan comparison">
            {/* Rowgroup 1: sticky header */}
            <div
              className="performance__rowgroup__A1b2c performance__rowgroup--sticky__A1b2c"
              role="rowgroup"
            >
              {/* Desktop header (unchanged) */}
              <div
                className="performance__row__P5k8p performance__row--header__P5k8p hide-tablet"
                role="row"
              >
                {planOrder.map((p) => (
                  <div
                    key={p.key}
                    className="performance__cell__C2d3e performance__cell--header__C2d3e"
                    role="columnheader"
                    data-highlighted={p.key === highlightedPlanKey ? "true" : "false"}
                  >
                    <span className="typography__emphasize__M9J2o bitC1" style={{ margin: 0 }}>
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* ✅ Tablet/phone header (single column + select) */}
<div
  className="performance__row__P5k8p performance__row--header__P5k8p performance__row--single__P5k8p show-tablet"
  role="row"
>
  <div
    className="performance__cell__C2d3e performance__cell--header__C2d3e"
    role="columnheader"
    data-highlighted={selectedPlanKey === highlightedPlanKey ? "true" : "false"}
  >
    <select
      className="performance__select__C2d3e"
      value={selectedPlanKey}
      onChange={(e) => setSelectedPlanKey(e.target.value as PlanKey)}
      aria-label="Select plan"
      style={{ width: "100%" }}
    >
      {planOrder.map((p) => (
        <option key={p.key} value={p.key}>
          {p.name}
        </option>
      ))}
    </select>
  </div>
</div>

            </div>

            {/* Rowgroup 2: body */}
            <div className="performance__rowgroup__A1b2c" role="rowgroup">
              {rows.map((r, idx) => {
                // CATEGORY ROWS
                if (r.type === "category") {
                  return (
                    <div key={`cat-wrap-${idx}-${r.label}`}>
                      {/* Desktop category row (unchanged) */}
                      <div
                        className="performance__row__P5k8p performance__row--category__P5k8p hide-tablet"
                        role="row"
                      >
                        {planOrder.map((p, cellIdx) => {
                          if (cellIdx === 0) {
                            return (
                              <div
                                key={`cat-${idx}-${p.key}-label`}
                                className="performance__cell__C2d3e"
                                role="cell"
                                data-highlighted={p.key === highlightedPlanKey ? "true" : "false"}
                              >
                                <span
                                  className="typography__subtitle__R6m2x bitC1"
                                  style={{ margin: 0, textAlign: "left" }}
                                >
                                  {r.label}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={`cat-${idx}-${p.key}-empty`}
                              className="performance__cell__C2d3e"
                              role="cell"
                              data-highlighted={p.key === highlightedPlanKey ? "true" : "false"}
                            />
                          );
                        })}
                      </div>

                      {/* ✅ Tablet/phone category row (single column) */}
                      <div
                        className="performance__row__P5k8p performance__row--category__P5k8p performance__row--single__P5k8p show-tablet"
                        role="row"
                      >
                        <div
                          className="performance__cell__C2d3e"
                          role="cell"
                          data-highlighted={selectedPlanKey === highlightedPlanKey ? "true" : "false"}
                        >
                          <span
                            className="typography__subtitle__R6m2x bitC1"
                            style={{ margin: 0, textAlign: "left" }}
                          >
                            {r.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // FEATURE ROWS
                return (
                  <div key={`feat-wrap-${idx}-${r.label}`}>
                    {/* Desktop feature row (unchanged) */}
                    <div className="performance__row__P5k8p hide-tablet" role="row">
                      {planOrder.map((p) => (
                        <div
                          key={`${r.label}-${p.key}`}
                          className="performance__cell__C2d3e"
                          role="cell"
                          data-highlighted={p.key === highlightedPlanKey ? "true" : "false"}
                        >
                          <FeatureCell
                            enabled={r.availability[p.key]}
                            label={r.label}
                            tooltip={r.tooltip}
                          />
                        </div>
                      ))}
                    </div>

                    {/* ✅ Tablet/phone feature row (single column based on select) */}
                    <div
                      className="performance__row__P5k8p performance__row--single__P5k8p show-tablet"
                      role="row"
                    >
                      <div
                        className="performance__cell__C2d3e"
                        role="cell"
                        data-highlighted={selectedPlanKey === highlightedPlanKey ? "true" : "false"}
                      >
                        <FeatureCell
                          enabled={r.availability[selectedPlanKey]}
                          label={r.label}
                          tooltip={r.tooltip}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer CTA row */}
            <div>
              {/* Desktop footer (unchanged) */}
              <div
                className="performance__row__P5k8p performance__row--footer__P5k8p hide-tablet"
                role="row"
              >
                {planOrder.map((p) => (
                  <div
                    key={`footer-${p.key}`}
                    className="performance__cell__C2d3e performance__cell--footer__C2d3e"
                    role="cell"
                    data-highlighted={p.key === highlightedPlanKey ? "true" : "false"}
                  >
                    <PlanCtaCell planKey={p.key} />
                  </div>
                ))}
              </div>

              {/* ✅ Tablet/phone footer (single column based on select) */}
              <div
                className="performance__row__P5k8p performance__row--footer__P5k8p performance__row--single__P5k8p show-tablet"
                role="row"
              >
                <div
                  className="performance__cell__C2d3e performance__cell--footer__C2d3e"
                  role="cell"
                  data-highlighted={selectedPlanKey === highlightedPlanKey ? "true" : "false"}
                >
                  <PlanCtaCell planKey={selectedPlanKey} />
                </div>
              </div>
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
