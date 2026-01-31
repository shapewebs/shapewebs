"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FAQItem = {
  key: string;
  question: string;
  answer: React.ReactNode;
};

function ChevronIcon({ open }: { open: boolean }) {
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

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h faq__link__Q9j2p"
    >
      {children}
    </a>
  );
}

export function PricingSectionFAQ() {
  // none open by default
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set());

  const faqs: FAQItem[] = useMemo(
    () => [
      {
        key: "which-plan",
        question: "Which plan is right for me?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              <strong>Hobby</strong> is great for personal or early-stage projects where you just
              need a clean, fast site and the basics.
              <br aria-hidden="true" />
              <strong>Plus</strong> adds insights and guidance to help you improve performance and
              conversion as you grow.
              <br aria-hidden="true" />
              <strong>Business</strong> is best for real production traffic—priority support,
              advanced caching/ISR configuration, performance budgets, and faster builds.
              <br aria-hidden="true" />
              <strong>Enterprise</strong> is for teams that need SSO/RBAC, compliance support, SLAs,
              and dedicated onboarding.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/get-started">Get started</LinkButton>
              <LinkButton href="/contact">Talk to sales</LinkButton>
              <LinkButton href="/docs/pricing">Read pricing docs</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "what-do-i-get",
        question: "What’s included when you buy a website from you?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Every plan ships with a modern, fast website built on Next.js + Vercel (or Shopify for
              commerce). You get a responsive design, best-practice SEO foundations, and a setup
              that’s easy to extend over time.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/what-you-get">What you get</LinkButton>
              <LinkButton href="/docs/stack">Our stack</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "timeline",
        question: "How long does it take to launch?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Most sites launch in days—not weeks—once we have your content and requirements. Bigger
              projects (commerce, multi-language, complex integrations) take longer. If you’re not
              sure, send your scope and we’ll propose a realistic timeline.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/process">Project process</LinkButton>
              <LinkButton href="/contact">Request a timeline</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "hosting-domain",
        question: "Do you handle hosting and domains?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes—we can set up hosting, connect your domain, configure HTTPS, and ensure everything
              is deployed correctly. If you already have a domain, we’ll connect it. If you need one,
              we’ll help you choose and set it up.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/hosting">Hosting docs</LinkButton>
              <LinkButton href="/docs/domains">Domains guide</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "maintenance",
        question: "Is there ongoing maintenance?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Hobby has no maintenance price. Paid plans include more proactive performance and
              reliability improvements—especially Business and Enterprise. If you want an “updates as
              we go” approach, Business is usually the sweet spot.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/maintenance">Maintenance</LinkButton>
              <LinkButton href="/docs/support">Support options</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "seo",
        question: "Do you do SEO?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              We build solid technical SEO into every site (clean structure, metadata, performance
              fundamentals). Plus and Business add deeper guidance and technical improvements.
              If you need ongoing SEO strategy/content work, we can scope that separately.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/seo">SEO docs</LinkButton>
              <LinkButton href="/docs/analytics">Analytics</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "commerce",
        question: "Can you build an online store?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes. For commerce we typically use Shopify (fast checkout, reliable payments, and a
              great admin). We can also integrate headless commerce patterns if you need more custom
              experiences.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/commerce">Commerce options</LinkButton>
              <LinkButton href="/contact">Discuss your store</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "ownership",
        question: "Do I own the website and code?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes—your website, your content, your code. We build and deploy it in a way that you
              can continue to evolve it later (with us or someone else). We’ll also document key
              parts so it’s easy to maintain.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/hand-off">Hand-off & ownership</LinkButton>
              <LinkButton href="/docs/documentation">Documentation library</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "billing",
        question: "Do you offer monthly vs yearly billing?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Plus and Business can be billed monthly or yearly (yearly is typically a better deal).
              Enterprise is annual billing only and usually includes custom terms and onboarding.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/billing">Billing details</LinkButton>
              <LinkButton href="/contact">Ask about Enterprise</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "support",
        question: "What support do I get?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Hobby includes email support. Business includes priority support (faster response) and
              is best if your site is revenue-critical. Enterprise adds dedicated onboarding and an
              account manager for bigger teams.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/support">Support docs</LinkButton>
              <LinkButton href="/contact">Contact support</LinkButton>
            </div>
          </div>
        ),
      },

      {
        key: "security",
        question: "How do you handle security?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              We ship secure-by-default setups: HTTPS, modern headers, and baseline protections.
              Business/Enterprise add stronger options (advanced caching setup, governance controls,
              SSO/RBAC on Enterprise) depending on your needs.
            </p>

            <div className="faq__links__Q6z2k">
              <LinkButton href="/docs/security">Security overview</LinkButton>
              <LinkButton href="/docs/compliance">Compliance</LinkButton>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section className="faq__container__Q7j3s">
      <div className="faq__content__K9j6q">
        <h2 className="typography__heading2__T3m8s" style={{ margin: 0, textAlign: "center" }}>
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <div className="faq__list__L7p3s" role="list">
          {faqs.map((item) => {
            const open = openKeys.has(item.key);
            const panelId = `faq-panel-${item.key}`;
            const buttonId = `faq-button-${item.key}`;

            return (
              <div key={item.key} className="faq__item__H5k8q" role="listitem">
                <button
                  id={buttonId}
                  type="button"
                  className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-large__L9d7h faq__questionBtn__ZxcvB"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(item.key)}
                >
                  <span className="typography__body__K4n7p faq__questionText__K4n7p">
                    {item.question}
                  </span>

                  <span className="faq__chevWrap__Z3n7q" aria-hidden="true">
                    <ChevronIcon open={open} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={[
                    "faq__panel__A1b2c",
                    open ? "faq__panel--open__A1b2c" : "faq__panel--closed__A1b2c",
                  ].join(" ")}
                >
                  <div className="faq__panelInner__P5k8p">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "32px" } as CSSProperties}
        />

        <div className="faq__footer__Q6z2k">
          <p className="typography__body__K4n7p" style={{ margin: 0 }}>
            Still have questions?
          </p>
          <div className="faq__footerLinks__Q6z2k">
            <a
              href="/contact"
              className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
            >
              Contact us
            </a>
            <a
              href="/docs"
              className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
            >
              Browse docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
