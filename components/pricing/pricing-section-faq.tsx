"use client";

import { useId, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

type FaqItem = {
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
        color: "currentcolor",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 160ms var(--ease-out-quad)",
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
  const sectionId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        question: "Which plan should I choose for a new website?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              If you’re validating an idea or need a simple brochure site,{" "}
              <strong>Hobby</strong> is a great starting point. If you want ongoing insights,
              conversion guidance, and stronger SEO/analytics, go with <strong>Plus</strong>. For
              businesses that care about faster builds, performance budgets, and priority support,
              <strong> Business</strong> is the sweet spot. <strong>Enterprise</strong> is for
              organizations needing advanced security, compliance support, and custom SLAs.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Not sure? Start with{" "}
              <a className="typography__link__B7s3m" href="/get-started">
                Get started
              </a>{" "}
              and we’ll recommend a setup based on your goals.
            </p>
          </>
        ),
      },
      {
        question: "Do you build on Next.js, Vercel, or Shopify?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Yes — we primarily ship sites on <strong>Next.js + Vercel</strong> for performance and
              flexibility. If you’re selling products, we can build on <strong>Shopify</strong> for
              commerce and integrate custom sections and components.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              If you want a quick overview of what we recommend for your case, see{" "}
              <a className="typography__link__B7s3m" href="/docs/architecture">
                Architecture & platform choices
              </a>
              .
            </p>
          </>
        ),
      },
      {
        question: "What’s included in the build and launch process?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Every project includes a clear structure, reusable sections, and a deployment to your
              hosting. Paid plans add more guidance and controls (like conversion feedback, SEO
              improvements, performance budgets, and prioritized CI).
            </p>
            <ul className="faq__bullets__M93j8">
              <li className="typography__small__Q9j2p">
                Page & content structure (navigation, hierarchy, and copy layout)
              </li>
              <li className="typography__small__Q9j2p">
                Responsive UI and reusable components/sections
              </li>
              <li className="typography__small__Q9j2p">
                Deployment setup + handoff (or we manage it for you)
              </li>
            </ul>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              For the full checklist, see{" "}
              <a className="typography__link__B7s3m" href="/docs/delivery">
                Delivery checklist
              </a>
              .
            </p>
          </>
        ),
      },
      {
        question: "Can you migrate my existing site and keep SEO?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Yes. We handle redirects, rewrite rules, and structure improvements so you don’t lose
              traffic. On Business and Enterprise, we’ll also help with technical SEO and performance
              budgets (Core Web Vitals) to protect rankings over time.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              If you already have a URL map or sitemap, send it through{" "}
              <a className="typography__link__B7s3m" href="/contact">
                Contact
              </a>{" "}
              to speed up the plan.
            </p>
          </>
        ),
      },
      {
        question: "Do you offer custom invoicing or contracts?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              We can support custom invoicing and vendor-style paperwork for Enterprise engagements,
              including custom SLAs and uptime guarantees when needed.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Reach out via{" "}
              <a className="typography__link__B7s3m" href="/contact">
                Talk to sales
              </a>{" "}
              and tell us what your procurement team needs.
            </p>
          </>
        ),
      },
      {
        question: "What’s the difference between Plus and Business?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              <strong>Plus</strong> focuses on growth: traffic & performance insights, content
              structure + conversion guidance, enhanced SEO + analytics, and custom components.
              <strong> Business</strong> is for production performance: cold start prevention,
              prioritized CI (faster builds), advanced caching/ISR configuration, technical SEO
              improvements, performance budgets (Core Web Vitals), and priority support.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              If you care about speed under load and faster iterations, choose Business.
            </p>
          </>
        ),
      },
      {
        question: "Can I upgrade later?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Absolutely. Most teams start with Hobby or Plus and move to Business once traffic
              grows or the site becomes mission-critical. We keep the build compatible so upgrades
              are smooth.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              See{" "}
              <a className="typography__link__B7s3m" href="/docs/upgrades">
                Upgrading your plan
              </a>{" "}
              for how it works.
            </p>
          </>
        ),
      },
      {
        question: "Do you provide support after launch?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Yes. Hobby includes email support, while Business adds priority support. Enterprise
              can include dedicated onboarding and an account manager for ongoing improvements and
              escalations.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              For common fixes and guides, check{" "}
              <a className="typography__link__B7s3m" href="/docs">
                Documentation
              </a>
              .
            </p>
          </>
        ),
      },
      {
        question: "Can you connect my domain and email?",
        answer: (
          <>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              Yes — we can connect your domain, set up DNS correctly, and help you route email to
              your provider. If you’re moving domains, we’ll also plan redirects so links keep
              working.
            </p>
            <p className="typography__small__Q9j2p faq__answerText__Q9j2p">
              See{" "}
              <a className="typography__link__B7s3m" href="/docs/domains">
                Domains & DNS
              </a>{" "}
              for the step-by-step.
            </p>
          </>
        ),
      },
    ],
    []
  );

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

        <p className="typography__subtitle__R6m2x" style={{ margin: 0, textAlign: "center" }}>
          Quick answers about plans, delivery, and what happens after launch.
        </p>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "40px" } as CSSProperties}
        />

        <TooltipProvider>
          <div className="faq__list__L7p3s" role="list">
            {faqs.map((item, i) => {
              const open = openIndex === i;
              const contentId = `${sectionId}-faq-${i}`;
              return (
                <div
                  key={`${item.question}-${i}`}
                  className="faq__item__H5k8q"
                  data-open={open ? "true" : "false"}
                  role="listitem"
                >
                  <button
                    type="button"
                    className="faq__trigger__A1b2c"
                    aria-expanded={open}
                    aria-controls={contentId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="typography__emphasize__M9J2o faq__question__M9J2o">
                      {item.question}
                    </span>
                    <span className="faq__chevron__Z3n7q" aria-hidden="true">
                      <ChevronIcon open={open} />
                    </span>
                  </button>

                  <div
                    id={contentId}
                    className="faq__panel__P5k8p"
                    data-open={open ? "true" : "false"}
                    role="region"
                    aria-label={item.question}
                  >
                    <div className="faq__panelInner__C2d3e">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </TooltipProvider>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "28px" } as CSSProperties}
        />

        <p className="typography__small__Q9j2p" style={{ textAlign: "center", margin: 0 }}>
          Still have questions?{" "}
          <a className="typography__link__B7s3m" href="/contact">
            Contact us
          </a>{" "}
          or browse{" "}
          <a className="typography__link__B7s3m" href="/docs">
            Documentation
          </a>
          .
        </p>
      </div>
    </section>
  );
}
