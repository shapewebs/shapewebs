"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FaqItem = {
  q: string;
  a: JSX.Element;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentColor", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      className="faq__chevron__Z3n7q"
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

const faqItems: FaqItem[] = [
  {
    q: "Which plan is right for me?",
    a: (
      <>
        <p className="faq__answerText__Q9j2p">
          <strong>Hobby</strong> is great if you want a simple starter site (personal or early-stage).
          <br />
          <strong>Plus</strong> is for growing sites that need insights, better SEO guidance, and custom
          sections.
          <br />
          <strong>Business</strong> is the best fit for companies that care about speed and conversion:
          prioritized builds, performance budgets, caching/ISR tuning, and priority support.
          <br />
          <strong>Enterprise</strong> is for teams that need advanced security (SSO/RBAC), compliance
          support, custom SLAs, and dedicated onboarding.
        </p>
        <p className="faq__answerText__Q9j2p" style={{ marginTop: 10 }}>
          If you’re unsure, start with{" "}
          <a className="typography__link__B7s3m" href="/get-started">
            Get Started
          </a>{" "}
          and we’ll recommend the best plan for your goals.
        </p>
      </>
    ),
  },
  {
    q: "Do you build on Next.js, Vercel, or Shopify?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Yes. We typically build on <strong>Next.js + Vercel</strong> for content and marketing sites,
        and we use <strong>Shopify</strong> for commerce when you need products, checkout, and
        payments. If you already have a platform, we can work with it and advise on the best approach.
      </p>
    ),
  },
  {
    q: "What’s included in the monthly price?",
    a: (
      <>
        <p className="faq__answerText__Q9j2p">
          Your plan covers your website build + the ongoing features listed in that tier (security,
          performance, SEO enhancements, insights, support level, etc.).
        </p>
        <p className="faq__answerText__Q9j2p" style={{ marginTop: 10 }}>
          Hosting and third-party tools (e.g. paid analytics, paid Shopify apps) may be billed
          separately depending on what you choose.
        </p>
      </>
    ),
  },
  {
    q: "Can I upgrade or downgrade later?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Absolutely. Most customers start on Plus or Business and upgrade as traffic and requirements
        grow. If you want to change tiers,{" "}
        <a className="typography__link__B7s3m" href="/contact">
          contact us
        </a>{" "}
        and we’ll handle the switch and align features/support to the new plan.
      </p>
    ),
  },
  {
    q: "How does billing work (monthly vs yearly)?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Plus and Business can be billed monthly or yearly (yearly gives the lower effective monthly
        price). Enterprise is annual billing only and typically includes custom invoicing options.
      </p>
    ),
  },
  {
    q: "Do you offer custom invoicing?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Yes—custom invoicing is available for Enterprise.{" "}
        <a className="typography__link__B7s3m" href="/contact">
          Talk to sales
        </a>{" "}
        and we’ll set it up.
      </p>
    ),
  },
  {
    q: "What’s the difference between Plus and Business?",
    a: (
      <>
        <p className="faq__answerText__Q9j2p">
          <strong>Plus</strong> focuses on growth: performance/traffic insights, conversion guidance,
          enhanced SEO + analytics, and custom components.
        </p>
        <p className="faq__answerText__Q9j2p" style={{ marginTop: 10 }}>
          <strong>Business</strong> adds the “serious ops” layer: cold start prevention, prioritized CI
          builds, advanced caching/ISR configuration, technical SEO, performance budgets (Core Web
          Vitals), and priority support.
        </p>
      </>
    ),
  },
  {
    q: "Can you migrate my existing website?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Yes. We can migrate from most platforms (WordPress, Webflow, custom builds, older React apps,
        etc.) and preserve SEO-critical pieces like redirects, metadata, and page structure.{" "}
        <a className="typography__link__B7s3m" href="/contact">
          Contact us
        </a>{" "}
        with your current URL and goals.
      </p>
    ),
  },
  {
    q: "How long does it take to launch?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Typical launches range from a few days (small marketing sites) to a few weeks (larger sites,
        migrations, or commerce). Timelines depend on content readiness, number of pages, and review
        cycles. Start here:{" "}
        <a className="typography__link__B7s3m" href="/get-started">
          Get Started
        </a>
        .
      </p>
    ),
  },
  {
    q: "Do you handle maintenance and updates?",
    a: (
      <p className="faq__answerText__Q9j2p">
        Yes—ongoing improvements, performance tuning, and security updates are part of our plans. If
        you want a dedicated maintenance scope,{" "}
        <a className="typography__link__B7s3m" href="/contact">
          reach out
        </a>{" "}
        and we’ll tailor it.
      </p>
    ),
  },
];

export function PricingSectionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className="faq__container__Q7j3s" aria-label="Frequently asked questions">
      <div className="faq__content__K9j6q">
        <h2 className="typography__heading2__T3m8s" style={{ margin: 0, textAlign: "center" }}>
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "20px" } as CSSProperties}
        />

        <div className="faq__list__L7p3s">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `${uid}-faq-panel-${idx}`;
            const buttonId = `${uid}-faq-button-${idx}`;

            return (
              <div key={`${item.q}-${idx}`} className="faq__item__H5k8q">
                <button
                  id={buttonId}
                  type="button"
                  className="faq__question__P5k8p"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                >
                  <span className="faq__questionText__K4n7p">{item.q}</span>
                  <Chevron open={isOpen} />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={[
                    "faq__answer__C2d3e",
                    isOpen ? "faq__answer--open__C2d3e" : "faq__answer--closed__C2d3e",
                  ].join(" ")}
                >
                  <div className="faq__answerInner__A1b2c">{item.a}</div>
                </div>
              </div>
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
