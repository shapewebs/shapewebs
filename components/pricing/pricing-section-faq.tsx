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

export function PricingSectionFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        id: "what-you-get",
        question: "What plan is right for me?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you want a simple site that looks great and stays stable, <span className="bitC1">Hobby</span> is fine.
              If you want to continuously improve your site (messaging, structure, conversions),{" "}
              <span className="bitC1">Plus</span> is usually the sweet spot.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If your website is a serious growth channel, choose <span className="bitC1">Business</span>. That’s where
              we focus on performance budgets (Core Web Vitals), advanced caching/ISR configuration, technical SEO, and
              priority support—so improvements ship faster and the site stays fast as you grow.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              <span className="bitC1">Enterprise</span> is for teams that need formal governance (SSO/RBAC), compliance
              support, custom SLAs, and a tighter operating model. If you want help deciding,{" "}
              <a href="/contact" className="typography__link__B7s3m">
                contact us
              </a>{" "}
              and tell us what you’re trying to achieve.
            </p>
          </div>
        ),
      },

      {
        id: "timeline",
        question: "How long does it take from start to launch?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              It depends mostly on content readiness. If you already have your copy, images, and a clear structure, we
              can often launch in days. If content is still being written or approvals take time, it’s usually 1–3 weeks.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              We keep it simple: kickoff → first version → revisions → launch. If you want to prepare properly, the{" "}
              <a href="/docs/launch-checklist" className="typography__link__B7s3m">
                launch checklist
              </a>{" "}
              outlines what we need (and what you’ll want ready).
            </p>
          </div>
        ),
      },

      {
        id: "content-writing",
        question: "Do you write the text and choose images, or do I provide everything?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              You can do either. Many clients provide rough copy and we rewrite it into something web-friendly
              (clearer, shorter, better structured). If you already have polished text, we’ll use it and optimize the
              layout around it.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              For images, we can work with what you have, recommend what’s missing, or use high-quality stock as a
              placeholder until you get a photoshoot done. If you want guidance on what converts, see{" "}
              <a href="/docs/content-guide" className="typography__link__B7s3m">
                Content guide
              </a>
              .
            </p>
          </div>
        ),
      },

      {
        id: "seo",
        question: "Do you do SEO?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—every site ships with clean structure, performance-minded implementation, and baseline SEO. That means
              proper headings, indexable pages, sensible metadata, and a setup that won’t fight search engines.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Business goes further with technical improvements and performance budgets (Core Web Vitals), because speed
              and stability matter for rankings and conversion. If you care about SEO as a growth channel, you’ll get the
              most value from ongoing iteration (content + structure + technical).
            </p>
          </div>
        ),
      },

      {
        id: "performance",
        question: "What do you do to make the website fast?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Performance is not just a “score”—it’s load time, responsiveness, and stability on real devices. We build
              with modern best practices (optimized images, smart loading, caching) and deploy to infrastructure that’s
              designed for speed.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              On Business, we go deeper: performance budgets (Core Web Vitals), more advanced caching/ISR configuration,
              and prioritized CI so improvements ship quickly. If you want the “what and why”, see{" "}
              <a href="/docs/performance" className="typography__link__B7s3m">
                Performance
              </a>
              .
            </p>
          </div>
        ),
      },

      {
        id: "hosting-domain",
        question: "Do you handle hosting, domain, and SSL?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Hosting and SSL (HTTPS) are included in the setup—your site is deployed and protected by default. For the
              domain, we can connect what you already have or help you move it.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you want the step-by-step, check{" "}
              <a href="/docs/domains" className="typography__link__B7s3m">
                Domains
              </a>{" "}
              and{" "}
              <a href="/docs/hosting" className="typography__link__B7s3m">
                Hosting & infrastructure
              </a>
              .
            </p>
          </div>
        ),
      },

      {
        id: "ecommerce",
        question: "Do you build ecommerce websites?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. If you need a solid store with great checkout and admin, Shopify is usually the best foundation. We
              can build a high-performing frontend and connect it to Shopify so you get both speed and a proven commerce
              backend.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you already have Shopify, we can improve the storefront without forcing you to migrate everything. If
              you don’t, we’ll recommend a setup based on your products, catalogue size, and shipping needs.
            </p>
          </div>
        ),
      },

      {
        id: "ownership",
        question: "Do I own the website when it’s done?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—you own the website and the work delivered. If you want, we can also set it up so you control the
              hosting accounts and repos from day one.
            </p>
          </div>
        ),
      },
    ],
    [/* stable */]
  );

  return (
    <section className="faq__container__Q7j3s">
      <div className="faq__content__K9j6q">
        <h2 className="typography__heading2__B5x9t" style={{ margin: 0, textAlign: "center" }}>
          FAQ
        </h2>

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
                  <span className="typography__heading5__J8d3k" style={{ margin: 0 }}>
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

        <div className="Spacer-module__root__NM019" style={{ "--height": "32px" } as CSSProperties} />

        <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
          Prefer a quick chat?{" "}
          <a href="/contact" className="typography__link__B7s3m">
            Contact us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
