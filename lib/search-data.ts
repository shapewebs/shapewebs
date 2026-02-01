export interface SearchPageData {
  id: string
  title: string
  description: string
  path: string
  iconType: string
  content: string
}

export const searchablePages: SearchPageData[] = [
  {
    id: "home",
    title: "Home",
    description: "Main landing page and overview",
    path: "/",
    iconType: "home",
    content: "Welcome to Shapewebs. Transform ideas into reality with expert web development. Modern, scalable solutions built with cutting-edge technology. Professional web applications tailored to your business needs.",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "View our pricing plans and features",
    path: "/pricing",
    iconType: "pricing",
    content: "Choose the perfect plan for your needs. Hobby plan includes Next.js Vercel deployment, automatic CI/CD, Web Application Firewall, DDoS Mitigation, Basic SEO, and email support. Plus plan adds cold start prevention, traffic and performance insights, content structure and conversion guidance, enhanced SEO and analytics, priority support, and custom components. Business plan includes faster builds with prioritized CI, advanced caching and ISR configuration, technical SEO improvements, and performance budgets with Core Web Vitals. Enterprise plan offers unlimited pages and components, advanced security with SSO and RBAC, compliance support for SOC 2 and GDPR, custom SLAs and uptime guarantees, and dedicated support with onboarding.",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
    path: "/contact",
    iconType: "message",
    content: "Get in touch with our team. Let's discuss your project. Send us a message and we'll get back to you as soon as possible. Contact us about your web development needs, custom solutions, or any questions you have about our services.",
  },
  {
    id: "docs",
    title: "Documentation",
    description: "Technical guides and documentation",
    path: "/docs",
    iconType: "docs",
    content: "Comprehensive documentation and guides. Learn about our development process, technical stack, and best practices. Explore guides on Next.js, React, TypeScript, and modern web development.",
  },
]
