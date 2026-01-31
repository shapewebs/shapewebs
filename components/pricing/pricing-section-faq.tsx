"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FaqItem = {
  id: string;
  question: string;
  answer: JSX.Element;
};

function ChevronDown({ open }: { open: boolean }) {
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

export function PricingSectionFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        id: "which-plan",
        question: "Which plan is right for my website?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              <span className="bitC1">Hobby</span> is best for personal projects and simple sites.
              <br aria-hidden="true" />
              <span className="bitC1">Plus</span> is for growing sites that need better insights,
              conversion guidance, and enhanced SEO tools.
              <br aria-hidden="true" />
              <span className="bitC1">Business</span> is for production websites where performance,
              caching, CI priority, and priority support matter.
              <br aria-hidden="true" />
              <span className="bitC1">Enterprise</span> is for teams that need advanced security,
              compliance, and SLAs.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you’re unsure, start on{" "}
              <a className="typography__link__B7s3m" href="/get-started">
                Get Started
              </a>{" "}
              and we’ll point you to the best fit.
            </p>
          </div>
        ),
      },
      {
        id: "what-included",
        question: "What’s included in every plan?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Every plan includes a modern website setup and hosting workflow (Next.js + Vercel
              deployment), baseline security, and essentials like routing, HTTPS, and core delivery
              features. Paid plans add performance and growth capabilities like analytics, caching
              strategy, and stronger support.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See the full feature breakdown in our{" "}
              <a className="typography__link__B7s3m" href="/docs">
                documentation
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "billing",
        question: "Do you offer monthly and yearly billing?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes. <span className="bitC1">Plus</span> and <span className="bitC1">Business</span>{" "}
              support a billing toggle so you can choose monthly or get a better rate billed yearly.
              <span className="bitC1"> Enterprise</span> is annual billing only.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Need something custom?{" "}
              <a className="typography__link__B7s3m" href="/contact">
                Talk to sales
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "custom-invoicing",
        question: "Do you offer custom invoicing or POs?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              We can support custom invoicing for <span className="bitC1">Enterprise</span>{" "}
              agreements (and select{" "}
              <span className="bitC1">Business</span> engagements depending on scope). This is
              especially common when you need a PO process or vendor onboarding.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Reach out via{" "}
              <a className="typography__link__B7s3m" href="/contact">
                Contact
              </a>{" "}
              and we’ll help.
            </p>
          </div>
        ),
      },
      {
        id: "performance",
        question: "How do you improve performance on Business?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Business includes performance-focused work like advanced caching + ISR configuration,
              performance budgets tied to Core Web Vitals, and deployment workflow improvements like
              prioritized CI. You also get cold start prevention for snappier real-world response
              times.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Learn more in our docs:{" "}
              <a className="typography__link__B7s3m" href="/docs/performance">
                Performance
              </a>{" "}
              and{" "}
              <a className="typography__link__B7s3m" href="/docs/core-web-vitals">
                Core Web Vitals
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "seo-analytics",
        question: "Do you help with SEO and analytics?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes. <span className="bitC1">Plus</span> adds enhanced SEO + analytics, traffic and
              performance insights, and content structure + conversion guidance.{" "}
              <span className="bitC1">Business</span> builds on that with technical SEO improvements
              and performance budgets (Core Web Vitals).
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Suggested reading:{" "}
              <a className="typography__link__B7s3m" href="/docs/seo">
                SEO guide
              </a>{" "}
              and{" "}
              <a className="typography__link__B7s3m" href="/docs/analytics">
                Analytics
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "security",
        question: "What security is included?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              All plans include baseline protections like HTTPS/TLS and a Web Application Firewall.
              Higher tiers add more controls and governance.{" "}
              <span className="bitC1">Enterprise</span> can include SSO, RBAC, compliance support
              (SOC 2, GDPR), and security-focused SLAs.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              See{" "}
              <a className="typography__link__B7s3m" href="/docs/security">
                Security docs
              </a>{" "}
              and{" "}
              <a className="typography__link__B7s3m" href="/docs/compliance">
                Compliance
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "upgrade-downgrade",
        question: "Can I upgrade or downgrade later?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes. You can start small and upgrade when you need more insights, performance work, or
              support. Downgrades are possible too—just keep in mind some advanced features may no
              longer apply after the switch.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Need help choosing?{" "}
              <a className="typography__link__B7s3m" href="/contact">
                Talk to us
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "commerce",
        question: "Do you build Shopify / e-commerce sites too?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__body__K4n7p" style={{ margin: 0 }}>
              Yes. We can build commerce experiences on Shopify, and still apply the same performance
              and SEO principles—fast pages, clean content structure, and conversion-focused design.
            </p>
            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Check{" "}
              <a className="typography__link__B7s3m" href="/docs/commerce">
                Commerce docs
              </a>{" "}
              or{" "}
              <a className="typography__link__B7s3m" href="/contact">
                contact sales
              </a>{" "}
              for a quote.
            </p>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section className="faq__container__Q7j3s" aria-label="Frequently asked questions">
      <div className="faq__content__K9j6q">
        <h2 className="typography__heading2__B5x9t" style={{ margin: 0 }}>
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "16px" } as CSSProperties}
        />

        <p className="typography__subtitle__R6m2x" style={{ margin: 0 }}>
          Quick answers about plans, performance, SEO, security, and how we ship websites.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <ul className="faq__list__M93j8" role="list">
          {faqs.map((item) => {
            const isOpen = openId === item.id;

            return (
              <li key={item.id} className="faq__item__H5k8q">
                <button
                  type="button"
                  className="faq__trigger__P5k8p"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span className="typography__heading6__H5j9s" style={{ margin: 0 }}>
                    {item.question}
                  </span>

                  <span className="faq__chevron__Z3n7q" aria-hidden="true">
                    <ChevronDown open={isOpen} />
                  </span>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  className="faq__panel__C2d3e"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div className="faq__panelInner__C2d3e">{item.answer}</div>
                </div>
              </li>
            );
          })}
        </ul>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
          Still have questions?{" "}
          <a className="typography__link__B7s3m" href="/contact">
            Contact us
          </a>{" "}
          or browse the{" "}
          <a className="typography__link__B7s3m" href="/docs">
            documentation
          </a>
          .
        </p>
      </div>
    </section>
  );
}
