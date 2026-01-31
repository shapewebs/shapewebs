"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";

type FaqItem = {
  id: string;
  question: string;
  answer: JSX.Element;
};

function ChevronDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{
        color: "currentColor",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
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
      className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h faq__link__B7s3m"
    >
      {children}
    </a>
  );
}

export function PricingSectionFaq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        id: "plan-right",
        question: "Which plan is right for me?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              <strong>Hobby</strong> is for testing, personal projects, and simple sites.{" "}
              <strong>Plus</strong> is for serious marketing sites that need better SEO, analytics,
              and custom sections. <strong>Business</strong> is for brands that care about speed,
              stability, and support (performance budgets, caching/ISR config, prioritized builds,
              priority support). <strong>Enterprise</strong> is for larger orgs that need advanced
              security, compliance, and custom SLAs.
            </p>
            <p className="faq__p__K4n7p">
              If you’re unsure, start with <strong>Plus</strong> and move up when traffic or
              requirements grow.{" "}
              <LinkButton href="/pricing">Compare plans</LinkButton>{" "}
              <span className="faq__dot__Q9j2p">·</span>{" "}
              <LinkButton href="/contact">Talk to sales</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "what-you-sell",
        question: "What exactly do you deliver when I buy a website?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              You’re buying a complete website build: structure, pages, components/sections, SEO
              basics, and deployment (Next.js + Vercel for standard sites, or Shopify for commerce).
              Each plan adds depth—insights, performance, security, and support.
            </p>
            <p className="faq__p__K4n7p">
              Want the technical breakdown?{" "}
              <LinkButton href="/docs">Browse the docs</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "timeline",
        question: "How long does it take to launch?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              Most sites can launch in days to a couple weeks depending on content readiness and
              complexity. If you already have copy, images, and a clear sitemap, we move fast. If
              content is missing, we can still build the structure and slot content in as it lands.
            </p>
            <p className="faq__p__K4n7p">
              We usually ship in steps: first a functional draft, then refinement, then launch.
              <LinkButton href="/get-started">Get started</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "hosting",
        question: "Do you handle hosting and deployment?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              Yes. We deploy to Vercel for Next.js sites (fast global delivery, HTTPS, edge caching),
              and to Shopify for commerce. We can also plug into your existing hosting setup if you
              have one, but Vercel/Shopify is what our plans are built around.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/hosting">Hosting & deployment docs</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "domain-email",
        question: "Can you help with domains, DNS, and email?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              Yes. We can connect your domain, configure DNS, and ensure HTTPS works correctly.
              Email is typically handled through your email provider (Google Workspace, Microsoft
              365, etc.), but we’ll make sure your DNS records are set up properly.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/domains">Domains & DNS</LinkButton>{" "}
              <span className="faq__dot__Q9j2p">·</span>{" "}
              <LinkButton href="/docs/email">Email setup</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "seo",
        question: "What SEO do I get in each plan?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              <strong>Hobby</strong> includes basic SEO foundations. <strong>Plus</strong> adds
              enhanced SEO + analytics plus content structure and conversion guidance.{" "}
              <strong>Business</strong> adds technical SEO improvements and performance budgets
              (Core Web Vitals) to help keep the site fast as it grows.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/seo">SEO documentation</LinkButton>{" "}
              <span className="faq__dot__Q9j2p">·</span>{" "}
              <LinkButton href="/docs/analytics">Analytics documentation</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "performance",
        question: "What does “performance budgets” and “cold start prevention” mean?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              <strong>Performance budgets</strong> are guardrails for key metrics (like Core Web
              Vitals) so changes don’t silently slow your site over time.{" "}
              <strong>Cold start prevention</strong> reduces delays that can happen when backend
              functions haven’t been used recently—helping your site feel consistently fast.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/performance">Performance docs</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "support",
        question: "What support is included?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              <strong>Hobby</strong> includes email support. <strong>Business</strong> includes
              priority support, and <strong>Enterprise</strong> includes dedicated onboarding and a
              dedicated support channel.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/support">Support policy</LinkButton>{" "}
              <span className="faq__dot__Q9j2p">·</span>{" "}
              <LinkButton href="/contact">Contact</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "security",
        question: "How do you handle security?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              All sites include HTTPS and baseline protection patterns. Paid plans add more advanced
              controls (WAF rules, rate limiting, and other protections depending on setup).{" "}
              <strong>Enterprise</strong> supports advanced security like SSO/RBAC and compliance
              workflows.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/docs/security">Security docs</LinkButton>{" "}
              <span className="faq__dot__Q9j2p">·</span>{" "}
              <LinkButton href="/docs/compliance">Compliance docs</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "upgrade",
        question: "Can I upgrade later?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              Yep. Start small, then upgrade when you need more insights, performance work, or
              stronger support. Upgrading doesn’t reset your site—you keep the same codebase and we
              add the plan benefits on top.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/pricing">See pricing</LinkButton>
            </p>
          </>
        ),
      },
      {
        id: "enterprise",
        question: "Do you offer custom invoicing or contracts?",
        answer: (
          <>
            <p className="faq__p__K4n7p">
              Yes—typically for <strong>Enterprise</strong>. We can support custom invoicing, SLAs,
              and tailored requirements.
            </p>
            <p className="faq__p__K4n7p">
              <LinkButton href="/contact">Talk to sales</LinkButton>
            </p>
          </>
        ),
      },
    ],
    []
  );

  return (
    <section className="faq__container__Q7j3s" aria-label="Frequently asked questions">
      <div className="faq__content__K9j6q">
        <h2 className="faq__title__T3m8s" style={{ margin: 0, textAlign: "center" }}>
          Frequently asked questions
        </h2>

        <div
          className="Spacer-module__root__NM019"
          style={{ "--height": "24px" } as CSSProperties}
        />

        <div className="faq__list__L7p3s">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const btnId = `faq-button-${item.id}`;

            const measuredHeight =
              (contentRefs.current[item.id]?.scrollHeight ?? 0) + "px";

            return (
              <div key={item.id} className="faq__item__H5k8q">
                <button
                  id={btnId}
                  type="button"
                  className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h faq__questionBtn__X1y2z"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
                >
                  <span className="faq__qText__K4n7p">{item.question}</span>
                  <ChevronDownIcon isOpen={isOpen} />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq__panel__P5k8p"
                  style={
                    {
                      height: isOpen ? measuredHeight : "0px",
                      opacity: isOpen ? 1 : 0,
                    } as CSSProperties
                  }
                >
                  <div
                    ref={(el) => {
                      contentRefs.current[item.id] = el;
                    }}
                    className="faq__panelInner__C2d3e"
                  >
                    {item.answer}
                  </div>
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
