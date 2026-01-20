"use client"

import Link from "next/link"

interface NavigationProps {
  pathname: string
}

interface NavItem {
  label: string
  href: string
}

export function Navigation({ pathname }: NavigationProps) {
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Method", href: "/method" },
    { label: "Pricing", href: "/pricing" },
    { label: "Customers", href: "/customers" },
    { label: "Docs", href: "/docs" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/contact" },
    { label: "README", href: "/readme" },
  ]

  return (
    <nav className="navigation__container__H7k2s">
      <ul className="navigation__list__Z9j4p">
        {navItems.map((item) => (
          <li key={item.href} className="navigation__item__Q5m3r">
            <Link
              href={item.href}
              className={`navigation__link__B8p6s ${pathname === item.href ? "navigation__link-active__K3n7q" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
