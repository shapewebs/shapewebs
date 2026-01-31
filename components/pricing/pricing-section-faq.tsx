"use client";

import type { CSSProperties } from "react";
import "@/styles/pages/pricing/pricing-section-faq.css";
import { TooltipProvider } from "@/components/ui/tooltip";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Which plan is right for me?",
    answer: (
      <>
        <strong>Hobby</strong> is best for personal projects, early ideas, or simple sites.
        <br />
        <br />
        <strong>Plus</strong> is great for freelancers, creators, and small businesses that want
        stronger SEO, analytics insights, and performance guidance.
        <br />
        <br />
        <strong>Business</strong> is designed for companies that rely on their website for growth —
        including performance optimization, advanced caching, and priority support.
        <br />
        <br />
        <strong>Enterprise</strong> is built for larger teams that need custom security, compliance,
        SLAs, and dedicated support.
        <br />
        <br />
        If you’re unsure, you can always{" "}
        <a href="/contact" className="typography__link__B7s3m">
          talk to us
        </a>{" "}
        and we’ll recommend the right setup.
      </>
    ),
  },

  {
    question: "Can you build a fully custom website?",
    answer: (
      <>
        Yes. All plans can include custom design and development — the difference is how advanced
        the infrastructure, performance optimization, and support levels are.
        <br />
        <br />
        For fully custom requirements, integrations, or complex platforms, we usually recommend{" "}
        <strong>Business</strong> or <strong>Enterprise</strong>.
      </>
    ),
  },

  {
    question: "Can I upgrade later?",
    answer: (
      <>
        Absolutely. Most clients start smaller and upgrade as traffic, features, or business needs
        grow.
        <br />
        <br />
        You can upgrade at any time — just{" "}
        <a href="/contact" className="typography__link__B7s3m">
          contact us
        </a>{" "}
        or request changes from your dashboard or support channel.
      </>
    ),
  },

  {
    question: "Do you offer custom invoicing?",
    answer: (
      <>
        Yes — custom invoicing and contract billing is available for{" "}
        <strong>Enterprise</strong> customers.
        <br />
        <br />
        If you need procurement workflows, yearly billing, or multi-project invoicing,{" "}
        <a href="/contact" className="typography__link__B7s3m">
          talk to sales
        </a>
        .
      </>
    ),
  },

  {
    question: "What happens if my site grows a lot?",
    answer: (
      <>
        That’s exactly what our scaling architecture is designed for.
        <br />
        <br />
        As traffic grows, we can:
        <ul className="faq__list__X1y2z">
          <li>Increase performance budgets</li>
          <li>Add caching + ISR strategies</li>
          <li>Optimize builds and deployments</li>
          <li>Add regional performance routing</li>
        </ul>
        If you’re expecting major growth, <strong>Business</strong> is usually the best starting
        point.
      </>
    ),
  },

  {
    question: "Do you handle hosting, security, and maintenance?",
    answer: (
      <>
        Yes — all plans include managed hosting and platform maintenance.
        <br />
        <br />
        Higher plans add:
        <ul className="faq__list__X1y2z">
          <li>Advanced security layers</li>
          <li>Performance monitoring</li>
          <li>Priority infrastructure optimization</li>
          <li>Compliance assistance (Enterprise)</li>
        </ul>
      </>
    ),
  },

  {
    question: "Can you integrate with Shopify, CMS, or other tools?",
    answer: (
      <>
        Yes. We commonly integrate with:
        <ul className="faq__list__X1y2z">
          <li>Shopify</li>
          <li>Headless CMS platforms</li>
          <li>CRMs</li>
          <li>Analytics platforms</li>
          <li>Marketing tools</li>
        </ul>
        If you have a specific stack, we can design around it.
      </>
    ),
  },

  {
    question: "Do you help with SEO and performance optimization?",
    answer: (
      <>
        Yes — especially in <strong>Plus</strong> and above.
        <br />
        <br />
        This includes:
        <ul className="faq__list__X1y2z">
          <li>Technical SEO structure</li>
          <li>Core Web Vitals optimization</li>
          <li>Performance budgets</li>
          <li>Conversion-focused content structure</li>
        </ul>
      </>
    ),
  },

  {
    question: "How do I get started?",
    answer: (
      <>
        The fastest way is to{" "}
        <a href="/get-started" className="typography__link__B7s3m">
          start here
        </a>
        .
        <br />
        <br />
        If you need guidance first, you can also{" "}
        <a href="/contact" className="typography__link__B7s3m">
          contact us
        </a>{" "}
        and we’ll help you choose the right plan and setup.
      </>
    ),
  },
];

export function PricingSectionFAQ() {
  return (
    <TooltipProvider>
      <section className="faq__container__Q7j3s">
        <div className="faq__content__K9j6q">
          <h2
            className="typography__heading2__T3m8s"
            style={{ margin: 0, textAlign: "center" }}
          >
            Frequently asked questions
          </h2>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "64px" } as CSSProperties}
          />

          <div className="faq__grid__L7p3s">
            {faqs.map((faq, i) => (
              <div key={i} className="faq__item__P5k8p">
                <h4 className="typography__heading5__H5j9s faq__question__X1y2z">
                  {faq.question}
                </h4>

                <div className="typography__body__K4n7p faq__answer__X1y2z">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          <div
            className="Spacer-module__root__NM019"
            style={{ "--height": "24px" } as CSSProperties}
          />
        </div>
      </section>
    </TooltipProvider>
  );
}
