"use client"

import BentoGridDemo from "@/components/bento-grid-demo"
import "@/styles/pages/customers/customers.css"

// Helper component for customer logos
const CustomerLogo = ({ initials }: { initials: string }) => (
  <div className="customer-logo__container">
    <span className="customer-logo__initials">{initials}</span>
  </div>
)

// Helper component for testimonial cards
const TestimonialCard = ({ quote, author, company }: { quote: string; author: string; company: string }) => (
  <div className="testimonial-card__root">
    <p className="testimonial-card__quote">{quote}</p>
    <div>
      <p className="testimonial-card__author">{author}</p>
      <p className="testimonial-card__company">{company}</p>
    </div>
  </div>
)

// Helper function to get industry-specific icons (simplified for example)
const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Tech":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="bento-grid-item__icon"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 14l10 5 10-5M2 19l10 5 10-5" />
        </svg>
      )
    case "Finance":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="bento-grid-item__icon"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
      )
    case "Healthcare":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="bento-grid-item__icon"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-4H5V9h4V5h2v4h4v4h-4v4z" />
        </svg>
      )
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="bento-grid-item__icon"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )
  }
}

const items = [
  {
    title: "Acme Corp",
    description: "Leading the future of AI with innovative solutions.",
    header: <CustomerLogo initials="AC" />,
    icon: getIndustryIcon("Tech"),
    className: "",
  },
  {
    title: "Global Finance Inc.",
    description: "Secure and efficient financial services worldwide.",
    header: <CustomerLogo initials="GF" />,
    icon: getIndustryIcon("Finance"),
    className: "bento-grid-item__span-col-2", // col-span-2
  },
  {
    title: "HealthPlus Systems",
    description: "Revolutionizing patient care through technology.",
    header: <CustomerLogo initials="HP" />,
    icon: getIndustryIcon("Healthcare"),
    className: "",
  },
  {
    title: "Innovate Solutions",
    description: "Driving digital transformation for enterprises.",
    header: (
      <TestimonialCard
        quote="ShapeWebs transformed our workflow. Highly recommend!"
        author="Jane Doe"
        company="Innovate Solutions"
      />
    ),
    icon: getIndustryIcon("Tech"),
    className: "bento-grid-item__span-col-2", // col-span-2
  },
  {
    title: "Future Bank",
    description: "Modern banking for a modern world.",
    header: <CustomerLogo initials="FB" />,
    icon: getIndustryIcon("Finance"),
    className: "",
  },
  {
    title: "MediCare Group",
    description: "Advanced medical research and patient support.",
    header: (
      <TestimonialCard
        quote="Exceptional support and powerful tools. A game-changer for us."
        author="John Smith"
        company="MediCare Group"
      />
    ),
    icon: getIndustryIcon("Healthcare"),
    className: "",
  },
]

export default function CustomersPage() {
  return (
    <main className="customers__container">
      <section className="customers__hero">
        <div className="customers__hero-content">
          <h1 className="customers__title">Our Customers</h1>
          <p className="customers__subtitle">
            Trusted by leading companies worldwide to deliver exceptional digital experiences
          </p>
        </div>
      </section>

      <section className="customers__grid-section">
        <BentoGridDemo />
      </section>
    </main>
  )
}
