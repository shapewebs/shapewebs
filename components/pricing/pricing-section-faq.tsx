"use client";

import { useId, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FaqItem = {
  question: string;
  answer: JSX.Element;
};

function ChevronIcon({ flipped }: { flipped: boolean }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      className={[
        "faq__chevron__Q7j3s",
        flipped ? "faq__chevron--open__Q7j3s" : "",
      ].join(" ")}
      style={{ color: "currentColor" }}
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

export function PricingSectionFAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: FaqItem[] = useMemo(
    () => [
      {
        question: "Which plan is right for me?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <strong>Hobby</strong> is perfect if you want a clean, professional website with
              essentials (deployment, security basics, SEO basics).
              <br />
              <strong>Plus</strong> adds insights and conversion guidance so you can improve what’s
              working.
              <br />
              <strong>Business</strong> is for serious growth—faster builds, advanced caching/ISR,
              Core Web Vitals budgets, and priority support.
              <br />
              <strong>Enterprise</strong> is for teams that need compliance, SSO/RBAC, SLAs, and
              dedicated onboarding.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/pricing"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                View pricing
              </a>
              <a
                href="/get-started"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Get started
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "What do you mean by “Next.js + Vercel deployment”?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Your site is built on Next.js and deployed on Vercel’s global network for fast
              delivery, SSL/HTTPS, and modern caching patterns. You don’t need to manage servers.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/hosting"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Hosting docs
              </a>
              <a
                href="/docs/performance"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Performance docs
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "Do you offer custom invoicing?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—custom invoicing is typically available for <strong>Enterprise</strong>. If you
              need PO-based billing or specific payment terms, reach out and we’ll set it up.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/contact"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Talk to sales
              </a>
              <a
                href="/docs/billing"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Billing docs
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "What’s included in SEO, and what changes on Business?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              All plans include solid on-page SEO foundations (metadata, structure, sitemaps where
              relevant). <strong>Business</strong> adds more technical SEO improvements and
              performance budgets (Core Web Vitals) so you can keep pages consistently fast—which
              directly helps rankings and conversions.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/seo"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                SEO docs
              </a>
              <a
                href="/docs/core-web-vitals"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Core Web Vitals
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "Can you migrate my existing website?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. We can migrate from most setups (WordPress, Webflow, Wix, Shopify storefronts,
              custom builds). We’ll preserve URLs where possible, set redirects, and keep SEO in
              mind.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/migrations"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Migration guide
              </a>
              <a
                href="/contact"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Ask about your setup
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "How does support work across plans?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <strong>Hobby</strong> includes email support. <strong>Business</strong> includes
              priority support for faster responses. <strong>Enterprise</strong> adds dedicated
              onboarding and an account manager for ongoing planning.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/support"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Support docs
              </a>
              <a
                href="/contact"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Contact support
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "Do you help with domains and redirects?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. We can point your domain, configure SSL/HTTPS, and set up redirects (especially
              important during migrations). If you already have a domain provider, we’ll give you
              the exact DNS records to add.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/domains"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Domains docs
              </a>
              <a
                href="/docs/redirects"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Redirects docs
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "What if I need something custom (components, sections, integrations)?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Totally normal. <strong>Plus</strong> and up include custom components + sections.
              For deeper integrations (auth, roles, SSO, advanced security), <strong>Enterprise</strong>{" "}
              is usually the best fit.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/docs/components"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Components library
              </a>
              <a
                href="/docs/integrations"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Integrations docs
              </a>
            </div>
          </div>
        ),
      },

      {
        question: "Can I upgrade later?",
        answer: (
          <div className="faq__answerText__K9j6q">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—most customers start with Hobby or Plus and upgrade when they want more insights,
              performance controls, or priority support. We’ll help you move up without breaking
              anything.
            </p>

            <div className="faq__links__A1b2c">
              <a
                href="/pricing"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Compare plans
              </a>
              <a
                href="/contact"
                className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h"
              >
                Get help choosing
              </a>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section className="faq__container__Q7j3s">
      <div className="faq__content__K9j6q">
        <h2
          className="typography__heading3__Z7p4s"
          style={{ margin: 0, textAlign: "center" }}
        >
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "16px" } as CSSProperties}
        />

        <p className="typography__subtitle__R6m2x" style={{ margin: 0, textAlign: "center" }}>
          Quick answers about plans, delivery, migrations, and support.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "40px" } as CSSProperties}
        />

        <div className="faq__list__L7p3s">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `${baseId}-faq-panel-${idx}`;
            const buttonId = `${baseId}-faq-button-${idx}`;

            return (
              <div
                key={`${idx}-${item.question}`}
                className="faq__item__H5k8q"
                data-open={isOpen ? "true" : "false"}
              >
                <button
                  id={buttonId}
                  type="button"
                  className={[
                    "button__root__ZxcvB",
                    "button__kind-ghost__R5j2s",
                    "button__size-large__L9d7h",
                    "faq__trigger__P5k8p",
                  ].join(" ")}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                >
                  <span className="faq__question__C2d3e">{item.question}</span>
                  <ChevronIcon flipped={isOpen} />
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq__panel__A1b2c"
                >
                  <div className="faq__panelInner__A1b2c">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "28px" } as CSSProperties}
        />

        <div className="faq__footer__Q6z2k">
          <a
            href="/docs"
            className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
          >
            Browse documentation
          </a>
          <a
            href="/contact"
            className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
