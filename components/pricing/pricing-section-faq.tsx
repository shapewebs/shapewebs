"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FaqItem = {
  id: string;
  question: string;
  answer: JSX.Element;
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
      focusable="false"
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

export function PricingSectionFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        id: "which-plan",
        question: "Which plan is right for me?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <span className="bitC1">Hobby</span> is for personal projects and simple brochure sites.
              <br />
              <span className="bitC1">Plus</span> is great if you want ongoing insights and iterative improvements.
              <br />
              <span className="bitC1">Business</span> is best for growth-focused sites that need stronger performance,
              prioritized builds, caching/ISR tuning, and priority support.
              <br />
              <span className="bitC1">Enterprise</span> is for teams who need SSO/RBAC, compliance support, SLAs, and
              dedicated onboarding.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you’re not sure, start with{" "}
              <a href="/get-started" className="typography__link__B7s3m">
                Get Started
              </a>{" "}
              and we’ll recommend the best fit.
            </p>
          </div>
        ),
      },
      {
        id: "what-included",
        question: "What’s included when you buy a website from you?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Every plan includes a modern build on Next.js + Vercel (or Shopify for commerce), deployment, and a solid
              baseline for SEO and security. Paid plans add progressively more performance and operational support.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See what each plan includes on{" "}
              <a href="/pricing" className="typography__link__B7s3m">
                Pricing
              </a>{" "}
              or browse our{" "}
              <a href="/docs" className="typography__link__B7s3m">
                Documentation
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "timeline",
        question: "How long does it take to launch?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Most launches happen in days to a couple of weeks depending on content readiness (copy, images, brand
              assets) and complexity (pages, integrations, ecommerce).
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Want a smoother kickoff? Check our{" "}
              <a href="/docs/launch-checklist" className="typography__link__B7s3m">
                launch checklist
              </a>{" "}
              or{" "}
              <a href="/contact" className="typography__link__B7s3m">
                contact us
              </a>{" "}
              with your deadline.
            </p>
          </div>
        ),
      },
      {
        id: "changes",
        question: "Can I request changes after launch?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. Plus and Business are designed for ongoing improvements—new sections, content updates, conversion
              tweaks, and technical SEO upgrades. Enterprise includes deeper coordination and onboarding.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Learn how requests work in{" "}
              <a href="/docs/support" className="typography__link__B7s3m">
                Support & updates
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "hosting",
        question: "Do you handle hosting and deployment?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—your site is deployed on Vercel and configured with HTTPS, caching, and best-practice defaults. For
              commerce, we can deploy alongside Shopify where it fits.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Details:{" "}
              <a href="/docs/hosting" className="typography__link__B7s3m">
                Hosting & infrastructure
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "domains",
        question: "Can you help with domains and email?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Absolutely. We can connect an existing domain or help you purchase one. We’ll also point you to the right
              setup for email (Google Workspace / Microsoft 365, etc.).
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Start here:{" "}
              <a href="/docs/domains" className="typography__link__B7s3m">
                Domains
              </a>{" "}
              and{" "}
              <a href="/docs/email" className="typography__link__B7s3m">
                Email setup
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "invoicing",
        question: "Do you offer custom invoicing or purchase orders?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—custom invoicing is typically available for Enterprise customers (and sometimes Business for larger
              engagements). If you need a PO process, we can accommodate it.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Reach out via{" "}
              <a href="/contact" className="typography__link__B7s3m">
                Contact
              </a>{" "}
              or see{" "}
              <a href="/docs/billing" className="typography__link__B7s3m">
                Billing & invoices
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "security",
        question: "What security do you provide?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Every site ships with HTTPS and baseline protections. Plus adds stronger guidance and analytics, Business
              adds more advanced configuration (caching/ISR and performance tuning) and priority support, and Enterprise
              can include SSO/RBAC, compliance support, and SLAs.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              More details in{" "}
              <a href="/docs/security" className="typography__link__B7s3m">
                Security
              </a>{" "}
              and{" "}
              <a href="/docs/compliance" className="typography__link__B7s3m">
                Compliance
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "support-response",
        question: "How does support work?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Hobby includes email support. Business includes priority support and faster builds with prioritized CI.
              Enterprise adds dedicated onboarding and a dedicated point of contact for escalations and planning.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See{" "}
              <a href="/docs/support" className="typography__link__B7s3m">
                Support
              </a>{" "}
              for response expectations and what to include in a request.
            </p>
          </div>
        ),
      },
      {
        id: "upgrade",
        question: "Can I upgrade later?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—most customers start on Hobby or Plus and upgrade to Business once they want stronger performance work,
              prioritized builds, and tighter operational support. Enterprise is available when you need governance (SSO,
              RBAC) or formal SLAs.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Compare plans on{" "}
              <a href="/pricing" className="typography__link__B7s3m">
                Pricing
              </a>{" "}
              or{" "}
              <a href="/contact" className="typography__link__B7s3m">
                talk to sales
              </a>
              .
            </p>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section className="faq__container__Q7j3s">
      <div className="faq__content__K9j6q">
        <h3 className="typography__heading3__V1c8r" style={{ margin: 0, textAlign: "center" }}>
          Frequently asked questions
        </h3>

        <div className="Spacer-module__root__NM019" style={{ "--height": "20px" } as CSSProperties} />

        <div className="faq__list__L7p3s" role="list">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            const contentId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className="faq__item__H5k8q"
                role="listitem"
                data-open={isOpen ? "true" : "false"}
              >
                <button
                  id={buttonId}
                  type="button"
                  className="faq__trigger__A1b2c"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {item.question}
                  </span>
                  <span className="faq__chevron__Z3n7q">
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq__panel__P5k8p"
                >
                  <div className="faq__panelInner__C2d3e">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="Spacer-module__root__NM019" style={{ "--height": "24px" } as CSSProperties} />

        <p className="typography__small__Q9j2p" style={{ margin: 0, textAlign: "center" }}>
          Still have questions?{" "}
          <a href="/contact" className="typography__link__B7s3m">
            Contact us
          </a>{" "}
          or browse{" "}
          <a href="/docs" className="typography__link__B7s3m">
            documentation
          </a>
          .
        </p>
      </div>
    </section>
  );
}
