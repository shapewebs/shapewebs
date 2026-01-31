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
              <span className="bitC1">Hobby</span> is perfect for a simple brochure site or a personal project.
              <br />
              <span className="bitC1">Plus</span> is for teams that want ongoing improvements: traffic insights,
              conversion guidance, and enhanced SEO + analytics.
              <br />
              <span className="bitC1">Business</span> is best when performance actually matters—prioritized builds,
              advanced caching/ISR configuration, Core Web Vitals budgets, and priority support.
              <br />
              <span className="bitC1">Enterprise</span> is for organizations that need governance (SSO/RBAC), compliance
              support, SLAs, and dedicated onboarding.
            </p>
          </div>
        ),
      },
      {
        id: "what-you-build",
        question: "What do you actually deliver in a website project?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              A complete site you can run and iterate on—not a theme dump. We build your pages, components, and content
              structure, ship it on a modern stack, and make sure the basics (SEO, performance, security) are handled
              from day one.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you’re selling products, we can also build on Shopify for commerce and connect it to a custom storefront.
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
              Most sites launch in <span className="bitC1">days to a couple of weeks</span>. The biggest variable is how
              ready your content is (copy, images, brand assets) and whether we’re doing extras like integrations,
              ecommerce setup, or advanced animations.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you want to move faster, follow our{" "}
              <a href="/docs/launch-checklist" className="typography__link__B7s3m">
                launch checklist
              </a>{" "}
              so everything’s ready before we start building.
            </p>
          </div>
        ),
      },
      {
        id: "who-writes",
        question: "Do you write the text and create the content?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              We can work either way. Some clients come with final copy and images, and we focus on structure,
              implementation, and polish. Others want help shaping the message—then we’ll propose section structure and
              rewrite/trim text so it reads clean and converts.
            </p>
          </div>
        ),
      },
      {
        id: "changes-after-launch",
        question: "Can I request changes after launch?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes. Plus and Business are made for ongoing iteration: new sections, content updates, conversion tweaks,
              and technical SEO improvements. Business also includes performance budgets and deeper performance tuning.
            </p>
          </div>
        ),
      },
      {
        id: "hosting-deploy",
        question: "Do you handle hosting, deployment, and updates?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yes—your site is deployed on Vercel and configured with HTTPS, caching, and best-practice defaults. You
              don’t need to “manage servers”.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              If you’re curious how it works, we have a short overview in{" "}
              <a href="/docs/hosting" className="typography__link__B7s3m">
                Hosting & infrastructure
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        id: "performance",
        question: "Will my site be fast (Core Web Vitals)?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              That’s the goal. We build for fast loading by default (clean components, optimized assets, sane
              architecture). On <span className="bitC1">Business</span>, we also add performance budgets and more
              advanced caching/ISR configuration so improvements stay consistent as you add content.
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
              We do the parts that directly affect your site: technical SEO foundations, structure, metadata, and
              performance. Plus and Business also include enhanced SEO + analytics, and Business includes deeper
              technical improvements.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              (We don’t sell “#1 on Google” promises. We focus on making your site easy to crawl, fast, and built for
              conversion.)
            </p>
          </div>
        ),
      },
      {
        id: "domains-email",
        question: "Can you help with domains and email?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Yep. We can connect an existing domain or help you buy one. Email is usually handled through Google
              Workspace or Microsoft 365—we’ll guide the setup so it’s painless.
            </p>
          </div>
        ),
      },
      {
        id: "billing",
        question: "Do you offer custom invoicing or purchase orders?",
        answer: (
          <div className="faq__answer__K4n7p">
            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              For Enterprise (and some larger Business engagements), yes—custom invoicing and PO workflows are possible.
              If you need a vendor form, W-8/W-9, or specific billing terms, just tell us up front.
            </p>

            <div
              className="Spacer-module__root__NM019"
              style={{ "--height": "10px" } as CSSProperties}
            />

            <p className="typography__small__Q9j2p" style={{ margin: 0 }}>
              Best path is{" "}
              <a href="/contact" className="typography__link__B7s3m">
                contacting us
              </a>{" "}
              with what your finance team requires.
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
              Yes—many customers start smaller and upgrade when they want more iteration, better insights, or more
              performance work. We’ll keep the site structure flexible so you’re not boxed in.
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
          Still stuck?{" "}
          <a href="/contact" className="typography__link__B7s3m">
            Contact us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
