export interface SearchPageData {
  id: string
  title: string
  description: string
  path: string
  content: string
  iconType: string
}

export const searchPageData: SearchPageData[] = [
  {
    id: "home",
    title: "Home",
    description: "Shapewebs - Magical Web Solutions",
    path: "/",
    iconType: "home",
    content: "Shapewebs magical web solutions development platform custom solutions business professional mastery programming languages development tools client-side server-side",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Plans and pricing for all sizes",
    path: "/pricing",
    iconType: "pricing",
    content: "pricing plans subscription hobby plus business enterprise monthly yearly CI/CD deployment firewall DDoS mitigation SEO support cold start prevention traffic performance insights analytics conversion custom components ISR caching core web vitals SSO RBAC compliance SOC2 GDPR SLA uptime guarantees",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
    path: "/contact",
    iconType: "message",
    content: "contact get in touch team send message email phone office address hours support inquiry business name company size product interest website app",
  },
  {
    id: "docs",
    title: "Docs",
    description: "Documentation and guides",
    path: "/docs",
    iconType: "docs",
    content: "documentation guides getting started basics tutorials references CSS architecture UI components advanced concepts API integration troubleshooting",
  },
]
