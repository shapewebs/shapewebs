"use client"

import { useState } from "react"
import "@/styles/pages/pricing/pricing.css"
import "@/styles/pages/pricing/plan-info.css"

interface PlanFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  id: number
  name: string
  description: string
  originalPrice: string
  currentPrice: string
  discount: string
  buttonText: string
  isFeatured?: boolean
  features: PlanFeature[]
  includedPlans?: string[]
}

interface TechnicalFeature {
  name: string
  basic: string | boolean
  plus: string | boolean
  pro: string | boolean
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"general" | "technical" | "storage">("general")

  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: "Basic",
      description: "Paid yearly",
      originalPrice: "$199",
      currentPrice: "$129",
      discount: "35% OFF",
      buttonText: "Get Basic Pro",
      features: [
        { text: "1 year access to all the premium component packs and templates", included: true },
        { text: "1 year of updates and new features", included: true },
        { text: "1 year access to new templates and components", included: true },
        { text: "Access to private discord community", included: true },
        { text: "48 hours turnaround time for support", included: true },
        { text: "Copy and paste, no complexity", included: true },
        { text: "Built with Next.js and React", included: true },
        { text: "Styled with Tailwind CSS and Framer Motion", included: true },
        { text: "Available in TypeScript and JavaScript", included: true },
        { text: "Cancel anytime", included: true },
      ],
    },
    {
      id: 2,
      name: "Plus",
      description: "One-time Purchase",
      originalPrice: "$299",
      currentPrice: "$169",
      discount: "43% OFF",
      buttonText: "Get Plus Pro",
      features: [
        { text: "Lifetime access to all the premium component packs", included: true },
        { text: "Lifetime access to all the premium templates", included: true },
        { text: "Lifetime access to updates and new features", included: true },
        { text: "Lifetime access to new templates and components", included: true },
        { text: "Access to private discord community", included: true },
        { text: "Copy and paste, no complexity", included: true },
        { text: "Built with Next.js and React", included: true },
        { text: "Styled with Tailwind CSS and Framer Motion", included: true },
        { text: "Available in TypeScript and JavaScript", included: true },
        { text: "Priority support", included: true },
      ],
      includedPlans: ["Everything in Basic Plan"],
    },
    {
      id: 3,
      name: "Pro",
      description: "One-time Purchase",
      originalPrice: "$1499",
      currentPrice: "$790",
      discount: "47% OFF",
      buttonText: "Get Pro",
      features: [
        { text: "10 team members", included: true },
        { text: "Lifetime access to all the component packs and templates", included: true },
        { text: "Lifetime access to updates and new features", included: true },
        { text: "Lifetime access to new templates and components", included: true },
        { text: "Access to private discord community", included: true },
        { text: "Copy and paste, no complexity", included: true },
        { text: "Built with Next.js and React", included: true },
        { text: "Styled with Tailwind CSS and Framer Motion", included: true },
        { text: "Available in TypeScript and JavaScript", included: true },
        { text: "Priority support", included: true },
      ],
      includedPlans: ["Everything in Basic Plan", "Everything in Plus Plan"],
    },
  ]

  // General features
  const generalFeatures: TechnicalFeature[] = [
    { name: "Maximum team members", basic: "1", plus: "3", pro: "10" },
    { name: "Premium component packs", basic: "Limited", plus: "All", pro: "All" },
    { name: "Premium templates", basic: "Limited", plus: "All", pro: "All" },
    { name: "Access to updates & new features", basic: "1 year", plus: "Lifetime", pro: "Lifetime" },
    { name: "Private discord community", basic: true, plus: true, pro: true },
    { name: "TypeScript & JavaScript availability", basic: true, plus: true, pro: true },
    { name: "Custom branding", basic: false, plus: true, pro: true },
    { name: "Team project sharing", basic: false, plus: true, pro: true },
    { name: "Custom CSS access", basic: false, plus: true, pro: true },
    { name: "Component source code access", basic: false, plus: true, pro: true },
    { name: "Team admin controls", basic: false, plus: false, pro: true },
    { name: "Premium integrations", basic: false, plus: false, pro: true },
  ]

  // Technical features
  const technicalFeatures: TechnicalFeature[] = [
    { name: "API requests per month", basic: "10,000", plus: "50,000", pro: "Unlimited" },
    { name: "Project deployments", basic: "5", plus: "20", pro: "Unlimited" },
    { name: "Concurrent builds", basic: "1", plus: "3", pro: "10" },
    { name: "Build minutes per month", basic: "100 mins", plus: "500 mins", pro: "2000 mins" },
    { name: "Serverless functions", basic: "5", plus: "20", pro: "Unlimited" },
    { name: "Custom domains", basic: "1", plus: "5", pro: "Unlimited" },
    { name: "Environment variables", basic: "10", plus: "25", pro: "100" },
    { name: "Analytics & Insights", basic: "Basic", plus: "Advanced", pro: "Enterprise" },
    { name: "A/B Testing", basic: false, plus: true, pro: true },
    { name: "Preview deployments", basic: false, plus: true, pro: true },
    { name: "Password protection", basic: false, plus: true, pro: true },
    { name: "Webhook integrations", basic: false, plus: false, pro: true },
    { name: "SAML SSO", basic: false, plus: false, pro: true },
    { name: "Dedicated infrastructure", basic: false, plus: false, pro: true },
  ]

  // Storage features
  const storageFeatures: TechnicalFeature[] = [
    { name: "Database storage", basic: "1 GB", plus: "10 GB", pro: "100 GB" },
    { name: "Image storage", basic: "5 GB", plus: "20 GB", pro: "Unlimited" },
    { name: "Asset storage", basic: "10 GB", plus: "50 GB", pro: "500 GB" },
    { name: "Bandwidth per month", basic: "100 GB", plus: "500 GB", pro: "5 TB" },
    { name: "Maximum asset size", basic: "50 MB", plus: "100 MB", pro: "500 MB" },
    { name: "Maximum database size", basic: "1 GB", plus: "5 GB", pro: "25 GB" },
    { name: "Daily backups", basic: false, plus: true, pro: true },
    { name: "Backup retention", basic: "None", plus: "7 days", pro: "30 days" },
    { name: "Manual backups", basic: false, plus: "5", pro: "Unlimited" },
    { name: "Media optimization", basic: false, plus: true, pro: true },
    { name: "CDN delivery", basic: true, plus: true, pro: true },
    { name: "Edge caching", basic: false, plus: true, pro: true },
  ]

  const getActiveFeatures = () => {
    switch (activeTab) {
      case "technical":
        return technicalFeatures
      case "storage":
        return storageFeatures
      case "general":
      default:
        return generalFeatures
    }
  }

  return (
    <div className="plans__container__P7j3s">
      <section className="plans__header__Z8k4q">
        <h1 className="plans__title__L5m8r">Pricing Plans</h1>
        <p className="plans__subtitle__K3n7p">Choose the perfect plan for your needs</p>
      </section>

      <section className="plans__content__B9j6q">
        <div className="plans__grid__Q7p3s">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="plans__card__H5k8q">
              <div className="plans__card-header__P8k4r">
                <h2 className="plans__card-name__B9k6p">{plan.name}</h2>
                <p className="plans__card-description__Z5j8q">{plan.description}</p>
              </div>

              <div className="plans__price-container__L3j7q">
                <div className="plans__price-wrapper__K5j8q">
                  <span className="plans__currency__Q3j7q">$</span>
                  <span className="plans__price-amount__K3n7p">{plan.currentPrice.replace("$", "")}</span>
                </div>
                <div className="plans__price-details__P5j8s">
                  <span className="plans__original-price__H5j8q">{plan.originalPrice}</span>
                  <span className="plans__discount__B9k6p">{plan.discount}</span>
                </div>
              </div>

              <div className="plans__action__K3n7q">
                <button
                  className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
                  style={{ width: "100%" }}
                >
                  {plan.buttonText}
                </button>
              </div>

              <div className="plans__features__H5j8q">
                {plan.features.map((feature, index) => (
                  <div key={index} className="plans__feature-item__L7k3q">
                    <div className="plans__feature-icon__B9j6p">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.00008 10.7799L3.10008 7.8799L2.40008 8.5999L6.00008 12.1999L14.0001 4.1999L13.2801 3.4799L6.00008 10.7799Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="plans__feature-text__Z9k6p">{feature.text}</span>
                  </div>
                ))}
              </div>

              {plan.includedPlans && plan.includedPlans.length > 0 && (
                <div className="plans__included-plans__Q7p3s">
                  <div className="plans__divider__P5k8q">
                    <span className="plans__divider-icon__H5j8q">+</span>
                  </div>

                  {plan.includedPlans.map((includedPlan, index) => (
                    <div key={index} className="plans__included-plan-item__L7k3q">
                      <div className="plans__included-plan-icon__B9j6p">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.00008 10.7799L3.10008 7.8799L2.40008 8.5999L6.00008 12.1999L14.0001 4.1999L13.2801 3.4799L6.00008 10.7799Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="plans__included-plan-text__Z9k6p">{includedPlan}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="plans__footer__H7k3q">
                <p className="plans__footer-text__P5k8q">Questions? Chat with us.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Info Section */}
      <section className="plan-info__container__L7j3s">
        <div className="plan-info__header__Z8k4q">
          <h2 className="plan-info__title__L5m8r">Plan Specifications</h2>
          <p className="plan-info__subtitle__K3n7p">Detailed information about what's included in each plan</p>
        </div>

        <div className="plan-info__tabs__B9j6q">
          <button
            className={`plan-info__tab__Q7p3s ${activeTab === "general" ? "plan-info__tab-active__H5k8q" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General Features
          </button>
          <button
            className={`plan-info__tab__Q7p3s ${activeTab === "technical" ? "plan-info__tab-active__H5k8q" : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            Technical Specs
          </button>
          <button
            className={`plan-info__tab__Q7p3s ${activeTab === "storage" ? "plan-info__tab-active__H5k8q" : ""}`}
            onClick={() => setActiveTab("storage")}
          >
            Storage & Performance
          </button>
        </div>

        <div className="plan-info__content__L3j7q">
          <table className="plan-info__table__K5j8q">
            <thead className="plan-info__table-head__Q3j7q">
              <tr className="plan-info__table-row__B9k6p">
                <th className="plan-info__table-header__P5k8p">Feature</th>
                <th className="plan-info__table-header__P5k8p">Basic</th>
                <th className="plan-info__table-header__P5k8p">Plus</th>
                <th className="plan-info__table-header__P5k8p">Pro</th>
              </tr>
            </thead>
            <tbody>
              {getActiveFeatures().map((feature, index) => (
                <tr key={index} className="plan-info__table-row__B9k6p">
                  <td className="plan-info__table-cell__Z7j3s plan-info__feature-name__L3j7q">{feature.name}</td>
                  <td className="plan-info__table-cell__Z7j3s">
                    <div className="plan-info__feature-value__K5j8q">
                      {typeof feature.basic === "boolean" ? (
                        feature.basic ? (
                          <div className="plan-info__checkmark__Q3j7q">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.00008 10.7799L3.10008 7.8799L2.40008 8.5999L6.00008 12.1999L14.0001 4.1999L13.2801 3.4799L6.00008 10.7799Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ) : (
                          "—"
                        )
                      ) : feature.basic === "Limited" || feature.basic === "Basic" ? (
                        <span className="plan-info__label__P5k8p">{feature.basic}</span>
                      ) : (
                        feature.basic
                      )}
                    </div>
                  </td>
                  <td className="plan-info__table-cell__Z7j3s">
                    <div className="plan-info__feature-value__K5j8q">
                      {typeof feature.plus === "boolean" ? (
                        feature.plus ? (
                          <div className="plan-info__checkmark__Q3j7q">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.00008 10.7799L3.10008 7.8799L2.40008 8.5999L6.00008 12.1999L14.0001 4.1999L13.2801 3.4799L6.00008 10.7799Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ) : (
                          "—"
                        )
                      ) : feature.plus === "Advanced" ? (
                        <span className="plan-info__label__P5k8p">{feature.plus}</span>
                      ) : (
                        feature.plus
                      )}
                    </div>
                  </td>
                  <td className="plan-info__table-cell__Z7j3s">
                    <div className="plan-info__feature-value__K5j8q">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <div className="plan-info__checkmark__Q3j7q">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.00008 10.7799L3.10008 7.8799L2.40008 8.5999L6.00008 12.1999L14.0001 4.1999L13.2801 3.4799L6.00008 10.7799Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ) : (
                          "—"
                        )
                      ) : feature.pro === "Enterprise" || feature.pro === "Unlimited" ? (
                        <span className="plan-info__label__P5k8p">{feature.pro}</span>
                      ) : (
                        feature.pro
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
