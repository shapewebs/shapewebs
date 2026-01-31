"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

/**
 * Pricing FAQ — tailored for a website studio selling website builds + ongoing plans
 * - Click question to expand/collapse
 * - Chevron flips when open
 * - Includes links to pages a typical site would have (docs/library, contact, etc.)
 */

type FAQItem = {
  id: string;
  question: string;
  answer: JSX.Element;
  defaultOpen?: boolean;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{
        color: "currentColor",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 180ms var(--ease-out-quad)",
      }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FAQRow({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq__item__C2d3e" data-open={open ? "true" : "false"}>
      <button
        type="button"
        className="faq__question__P5k8p"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${item.id}`}
      >
        <span className="typography__heading6__H5j9s faq__questionText__H5j9s">
          {item.question}
        </span>

        <span className="faq__chevron__Z3n7q">
          <Chevron open={open} />
        </span>
      </button>

      <div
        id={`faq-panel-${item.id}`}
        className="faq__answer__Q9j2p"
        role="region"
        aria-label={item.question}
        hidden={!open}
      >
        <div className="faq__answerInner__Q9j2p">{item.answer}</div>
      </div>
    </div>
  );
}

export function PricingSectionFAQ() {
  const items: FAQItem[] = useMemo(
    () => [
      {
        id: "which-plan",
        question: "Which plan is right for me?",
        defaultOpen: true,
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <strong>Hobby</strong> is for personal projects and simple sites where you just need a
              fast, secure launch and basic support.
              <br />
              <strong>Plus</strong> is for creators and small teams who want performance insights,
              conversion guidance, and more flexibility for custom sections.
              <br />
              <strong>Business</strong> is best for companies who care about speed, reliability, and
              ongoing optimization—things like prioritized builds, advanced caching/ISR, performance
              budgets, and priority support.
              <br />
              <strong>Enterprise</strong> is for organizations that need compliance, SSO/RBAC, SLAs,
              and dedicated onboarding.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "12px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Not sure? Start with{" "}
              <a className="typography__link__B7s3m" href="/get-started">
                Get started
              </a>{" "}
              and we’ll recommend the best fit.
            </p>
          </>
        ),
      },

      {
        id: "what-included",
        question: "What do I actually get when I buy a website from you?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              You’re buying a website that’s built to ship fast and stay fast: modern stack, solid
              SEO foundation, secure defaults, and a plan that matches how much ongoing support and
              optimization you want.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you want the details, check the{" "}
              <a className="typography__link__B7s3m" href="/docs/website-delivery">
                Website delivery overview
              </a>{" "}
              in our document library.
            </p>
          </>
        ),
      },

      {
        id: "commerce",
        question: "Do you build Shopify sites too?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. If your site is commerce-first, we can build on Shopify and still deliver fast
              pages, strong SEO, and clean content structure. We’ll recommend the best setup based on
              your products, integrations, and growth plans.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See{" "}
              <a className="typography__link__B7s3m" href="/docs/shopify-vs-nextjs">
                Shopify vs Next.js
              </a>{" "}
              for guidance.
            </p>
          </>
        ),
      },

      {
        id: "timeline",
        question: "How long does it take to launch?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Most sites launch in 1–3 weeks depending on content readiness and complexity. If you
              already have copy, images, and brand assets ready, we can move faster.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Here’s what we need from you:{" "}
              <a className="typography__link__B7s3m" href="/docs/launch-checklist">
                Launch checklist
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "custom-work",
        question: "Can you add custom sections or components?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Absolutely. <strong>Plus</strong> includes custom components/sections.{" "}
              <strong>Business</strong> and <strong>Enterprise</strong> are ideal if you need deeper
              performance work, more complex integrations, or ongoing iteration.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Examples + patterns:{" "}
              <a className="typography__link__B7s3m" href="/docs/components">
                Component library
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "domains",
        question: "Do you help with domains and DNS?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—whether you’re buying a new domain, moving an existing one, or just need DNS set up
              correctly. We’ll make sure SSL/HTTPS and redirects are configured properly so you don’t
              lose SEO.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Documentation:{" "}
              <a className="typography__link__B7s3m" href="/docs/domains">
                Domains & DNS
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "seo",
        question: "How do you handle SEO?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Every plan includes a solid SEO baseline (clean structure, meta, indexing, redirects).
              <strong> Plus</strong> adds enhanced SEO + analytics. <strong>Business</strong> adds
              technical SEO improvements and performance budgets focused on Core Web Vitals.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Read:{" "}
              <a className="typography__link__B7s3m" href="/docs/seo">
                SEO playbook
              </a>{" "}
              and{" "}
              <a className="typography__link__B7s3m" href="/docs/core-web-vitals">
                Core Web Vitals guide
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "hosting",
        question: "Where is my site hosted?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Typically on a modern edge platform (often Vercel for Next.js) to keep delivery fast
              globally and deployments reliable. If you’re on Shopify, hosting is handled there for
              commerce—while we optimize everything we can on the theme and storefront.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See:{" "}
              <a className="typography__link__B7s3m" href="/docs/hosting">
                Hosting overview
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "support",
        question: "What support do you offer?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <strong>Hobby</strong> includes email support. <strong>Business</strong> includes
              priority support. <strong>Enterprise</strong> includes dedicated onboarding and a
              dedicated support relationship.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              For support expectations, see{" "}
              <a className="typography__link__B7s3m" href="/docs/support">
                Support policy
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "billing",
        question: "Can you do yearly billing or invoices?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—yearly billing is available on paid plans. For <strong>Enterprise</strong>, we can
              provide custom invoicing and procurement-friendly terms.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you need invoices or vendor setup,{" "}
              <a className="typography__link__B7s3m" href="/contact">
                talk to sales
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "changes",
        question: "Can I change plans later?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yep. Many clients start on <strong>Plus</strong> and move to <strong>Business</strong>{" "}
              once traffic and iteration speed become important. If you need compliance, SSO, SLAs,
              or onboarding, that’s usually when <strong>Enterprise</strong> makes sense.
            </p>
          </>
        ),
      },

      {
        id: "security",
        question: "What about security?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              All sites ship with secure defaults (HTTPS/TLS, baseline WAF, sensible headers). Higher
              tiers focus on stronger governance and enterprise controls like SSO/RBAC and compliance
              support.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Learn more:{" "}
              <a className="typography__link__B7s3m" href="/docs/security">
                Security overview
              </a>
              .
            </p>
          </>
        ),
      },

      {
        id: "contact",
        question: "Still have questions?",
        answer: (
          <>
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you’re unsure about the plan, timeline, or what you need technically, send us a
              message and we’ll point you to the right option.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <a className="typography__link__B7s3m" href="/contact">
                Contact
              </a>{" "}
              or browse the{" "}
              <a className="typography__link__B7s3m" href="/docs">
                document library
              </a>
              .
            </p>
          </>
        ),
      },
    ],
    []
  );

  const [openId, setOpenId] = useState<string | null>(() => {
    const firstOpen = items.find((x) => x.defaultOpen)?.id;
    return firstOpen ?? null;
  });

  return (
    <section className="faq__container__Q7j3s">
      <div className="faq__content__K9j6q">
        <h2 className="typography__heading3__T3m8s" style={{ margin: 0, textAlign: "center" }}>
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <div className="faq__list__L7p3s" role="list">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <FAQRow
                key={item.id}
                item={item}
                open={open}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              />
            );
          })}
        </div>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />
      </div>
    </section>
  );
}
