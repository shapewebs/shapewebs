"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchPopup } from "@/components/search-popup"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

// Replace the NavSubmenu component with an updated version that supports sections
function NavSubmenu({ title, items, isOpen, onToggle, onHover, menuIndex }: SubmenuProps) {
  return (
    <div className="header__nav-submenu-wrapper__P3j7q" onMouseEnter={onHover} data-menu-index={menuIndex}>
      <button
        className={`button__root__ZxcvB button__kind-ghost__R5j2s button__size-small__L9d7h header__nav-dropdown-trigger__Z8p4r ${
          isOpen ? "header__nav-dropdown-active__L7k3q" : ""
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
      </button>
    </div>
  )
}

// Update the interface for submenu items to include sections
interface SubmenuProps {
  title: string
  sections: {
    title: string
    items: { label: string; description: string; href: string }[]
  }[]
  isOpen: boolean
  onToggle: () => void
  onHover: () => void
  menuIndex: number
}

export function Header() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [prevSubmenu, setPrevSubmenu] = useState<string | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<"left" | "right" | null>(null)
  const [submenuHeight, setSubmenuHeight] = useState<number>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const submenuRef = useRef<HTMLDivElement | null>(null)
  const submenuContentRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  // First, add a state variable for the search popup at the top of the Header component, after other state declarations
  const [searchOpen, setSearchOpen] = useState(false)

  // Menu indices for determining transition direction
  const menuIndices = {
    product: 0,
    resources: 1,
  }

  // Update the search toggle function to handle animation
  const toggleSearch = () => {
    if (!searchOpen) {
      setSearchOpen(true)
    }
    // When closing, we don't immediately set searchOpen to false
    // The SearchPopup component will handle this with its animation
  }

  // Update the keyboard shortcut handler to properly handle animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault() // Prevent browser's default behavior

        if (searchOpen) {
          // Get the SearchPopup to handle its own closing animation
          // We'll let the SearchPopup call onClose when animation is done
          const closeButton = document.querySelector(".search-popup__close-button__H5j8q") as HTMLButtonElement
          if (closeButton) {
            closeButton.click()
          }
        } else {
          // Just open the popup
          setSearchOpen(true)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  // Update submenu height when content changes
  useEffect(() => {
    if (openSubmenu && submenuContentRef.current) {
      const height = submenuContentRef.current.scrollHeight
      setSubmenuHeight(height)
    } else if (mobileMenuOpen && mobileMenuRef.current) {
      const height = mobileMenuRef.current.scrollHeight
      setSubmenuHeight(height)
    } else {
      setSubmenuHeight(0)
    }
  }, [openSubmenu, mobileMenuOpen])

  const toggleSubmenu = (menu: string) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null)
    } else {
      handleSubmenuChange(menu)
    }
  }

  const handleHover = (menu: string) => {
    if (menu !== openSubmenu) {
      handleSubmenuChange(menu)
    }
  }

  const handleSubmenuChange = (newMenu: string) => {
    if (openSubmenu) {
      setPrevSubmenu(openSubmenu)

      // Determine transition direction based on menu indices
      const prevIndex = menuIndices[openSubmenu as keyof typeof menuIndices]
      const newIndex = menuIndices[newMenu as keyof typeof menuIndices]

      if (prevIndex < newIndex) {
        setTransitionDirection("right") // Moving right
      } else {
        setTransitionDirection("left") // Moving left
      }
    } else {
      setTransitionDirection(null)
    }

    setOpenSubmenu(newMenu)
  }

  // Handle mouse leave from the entire header - close immediately
  const handleHeaderMouseLeave = () => {
    setPrevSubmenu(null)
    setOpenSubmenu(null)
    setTransitionDirection(null)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (openSubmenu) {
      setOpenSubmenu(null)
    }
  }

  // Updated resources menu with new sections
  const resourcesSections = [
    {
      title: "Company",
      items: [
        {
          label: "About",
          description: "Our mission and team",
          href: "/about",
        },
        {
          label: "Career",
          description: "Join our growing team",
          href: "/career",
        },
      ],
    },
    {
      title: "Explore",
      items: [
        {
          label: "Documentation",
          description: "Guides and reference for our platform",
          href: "/docs",
        },
        {
          label: "Templates",
          description: "Ready-to-use website designs",
          href: "/templates",
        },
        {
          label: "Case Studies",
          description: "Success stories from our clients",
          href: "/case-studies",
        },
        {
          label: "Tutorials",
          description: "Step-by-step guides for common tasks",
          href: "/tutorials",
        },
        {
          label: "Webinars",
          description: "Live and recorded training sessions",
          href: "/webinars",
        },
        {
          label: "README",
          description: "The story of Shapewebs",
          href: "/readme",
        },
      ],
    },
  ]

  // Updated product menu with new sections
  const productSections = [
    {
      title: "Core Features",
      items: [
        {
          label: "Plan",
          description: "Project planning and roadmap tools",
          href: "/plan",
        },
        {
          label: "Build",
          description: "Development and deployment solutions",
          href: "/build",
        },
      ],
    },
    {
      title: "More",
      items: [
        {
          label: "Analytics",
          description: "Track and analyze your performance",
          href: "/analytics",
        },
        {
          label: "Integrations",
          description: "Connect with your favorite tools",
          href: "/integrations",
        },
        {
          label: "Security",
          description: "Keep your data safe and secure",
          href: "/security",
        },
        {
          label: "Automation",
          description: "Streamline your workflows",
          href: "/automation",
        },
        {
          label: "Collaboration",
          description: "Work together with your team",
          href: "/collaboration",
        },
        {
          label: "Enterprise",
          description: "Solutions for large organizations",
          href: "/enterprise",
        },
      ],
    },
  ]

  // Update the navItems array to include Customers before Pricing and Contact after Pricing, and remove Get Started
  const navItems = [
    { label: "Docs", href: "/docs", className: "header__nav-item-docs__P8j3s" },
    { label: "Customers", href: "/customers", className: "header__nav-item-customers__L5k8q" },
    { label: "Pricing", href: "/pricing", className: "" },
    { label: "Contact", href: "/contact", className: "header__nav-item-contact__Z7j3s" },
  ]

  // Calculate if any submenu is open
  const isAnySubmenuOpen = openSubmenu !== null

  // Determine which submenu sections to show
  const activeSubmenuSections =
    openSubmenu === "resources" ? resourcesSections : openSubmenu === "product" ? productSections : []

  // Determine transition classes
  const getTransitionClasses = () => {
    if (!transitionDirection) return ""

    return `header__submenu-transition-${transitionDirection}__P8j4r`
  }

  return (
    <TooltipProvider>
      <header
        ref={headerRef}
        className={`header__container__K9p3s ${mobileMenuOpen ? "header__mobile-open__H5k8q" : ""}`}
        onMouseLeave={handleHeaderMouseLeave}
        style={{
          height:
            isAnySubmenuOpen || mobileMenuOpen
              ? `calc(var(--header-height) + ${submenuHeight}px)`
              : "var(--header-height)",
        }}
      >
        <div className="header__content__Z7j2q">
<Link href="/" className="header__logo-link__B5m7s">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 2.8125 1084 174.875"
  height={32}
  style={{ width: "auto", display: "block" }}
>
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 26.5 963.21 154" width="923.846px" height="954.602px">
  <ellipse style="fill: currentColor;" cx="150" cy="144.518" rx="30" ry="30.194" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 451.794 152.209 C 434.777 152.209 422.2 141.944 422.2 125.744 L 422.2 125.517 C 422.2 109.546 434.201 100.306 455.492 99.051 L 479.657 97.567 L 479.657 89.696 C 479.657 79.887 473.493 74.525 461.41 74.525 C 451.545 74.525 445.053 78.176 442.915 84.449 L 442.832 84.793 L 425.654 84.793 L 425.734 84.222 C 427.872 69.62 441.928 59.809 462.231 59.809 C 484.672 59.809 497.331 70.989 497.331 89.696 L 497.331 150.839 L 479.657 150.839 L 479.657 138.178 L 478.259 138.178 C 472.999 147.191 463.628 152.209 451.794 152.209 Z M 439.956 124.946 C 439.956 133.161 446.942 138.064 456.56 138.064 C 469.876 138.064 479.657 129.279 479.657 117.873 L 479.657 110.231 L 457.875 111.601 C 445.546 112.283 439.956 116.733 439.956 124.833 L 439.956 124.946 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 270.703 152.209 C 243.906 152.209 226.725 138.749 225.083 118.673 L 225 117.645 L 243.084 117.645 L 243.167 118.559 C 244.151 129.279 255.578 136.241 271.443 136.241 C 286.568 136.241 297.336 128.711 297.336 117.645 L 297.336 117.531 C 297.336 108.405 290.923 102.587 275.223 99.165 L 262.237 96.313 C 238.15 91.294 227.795 80.115 227.795 62.547 C 227.877 42.014 245.632 27.869 270.784 27.869 C 295.939 27.869 312.376 42.127 313.693 60.494 L 313.774 61.635 L 295.939 61.635 L 295.774 60.607 C 294.212 50.913 284.923 43.841 270.539 43.953 C 256.646 43.953 246.373 50.456 246.373 61.635 C 246.373 70.533 252.618 76.237 267.99 79.544 L 280.896 82.397 C 305.803 87.759 315.995 97.797 315.995 115.363 L 315.995 115.479 C 315.995 138.178 298.321 152.209 270.703 152.209 Z" style="fill: currentColor; paint-order: fill markers; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 650.924 152.209 C 624.777 152.209 609 134.414 609 106.123 C 609 78.176 625.108 59.582 650.022 59.582 C 674.923 59.582 690.211 77.491 690.211 104.298 L 690.211 110.573 L 626.922 110.573 C 627.253 127.683 636.619 137.607 651.333 137.607 C 662.762 137.607 669.586 132.018 671.719 127.342 L 672.05 126.656 L 689.229 126.656 L 689.058 127.342 C 686.104 139.091 673.772 152.209 650.924 152.209 Z M 650.101 74.184 C 637.93 74.184 628.723 82.511 627.16 97.797 L 672.54 97.797 C 671.148 81.94 662.183 74.184 650.101 74.184 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 864.523 152.209 C 838.389 152.209 822.6 134.414 822.6 106.123 C 822.6 78.176 838.709 59.582 863.62 59.582 C 888.524 59.582 903.809 77.491 903.809 104.298 L 903.809 110.573 L 840.52 110.573 C 840.853 127.683 850.217 137.607 864.934 137.607 C 876.364 137.607 883.185 132.018 885.318 127.342 L 885.649 126.656 L 902.829 126.656 L 902.67 127.342 C 899.704 139.091 887.373 152.209 864.523 152.209 Z M 863.702 74.184 C 851.53 74.184 842.324 82.511 840.772 97.797 L 886.141 97.797 C 884.75 81.94 875.781 74.184 863.702 74.184 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 332.1 152.209 L 332.1 27.984 L 349.938 27.984 L 349.938 76.578 L 351.252 76.578 C 355.607 66.997 364.161 61.293 377.148 61.293 C 397.123 61.293 408.135 73.157 408.135 94.487 L 408.135 152.209 L 390.381 152.209 L 390.381 98.709 C 390.381 83.881 384.217 76.578 371.147 76.578 C 358.073 76.578 349.938 85.477 349.938 99.849 L 349.938 152.209 L 332.1 152.209 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 513.4 180.5 L 513.4 61.519 L 531.237 61.519 L 531.237 75.553 L 532.551 75.553 C 537.731 65.742 547.512 59.923 560.007 59.923 C 582.53 59.923 596.995 77.947 596.995 106.009 L 596.995 106.239 C 596.995 134.414 582.691 152.209 560.007 152.209 C 547.759 152.209 537.32 146.279 532.551 136.582 L 531.237 136.582 L 531.237 180.5 L 513.4 180.5 Z M 554.993 137.039 C 569.871 137.039 578.831 125.287 578.831 106.239 L 578.831 106.009 C 578.831 86.845 569.871 75.209 554.993 75.209 C 540.114 75.209 530.909 86.961 530.909 106.009 L 530.909 106.239 C 530.909 125.287 540.114 137.039 554.993 137.039 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 719.351 152.78 L 694.7 63.46 L 712.61 63.46 L 728.638 132.359 L 729.959 132.359 L 748.373 63.46 L 765.301 63.46 L 783.712 132.359 L 785.114 132.359 L 801.063 63.46 L 818.733 63.46 L 794.161 152.78 L 775.829 152.78 L 757.327 86.159 L 755.935 86.159 L 737.523 152.78 L 719.351 152.78 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 963.611 152.209 C 951.12 152.209 941.332 146.506 936.154 136.696 L 934.841 136.696 L 934.841 150.839 L 917 150.839 L 917 26.5 L 934.841 26.5 L 934.841 75.666 L 936.154 75.666 C 940.922 66.083 951.359 59.923 963.611 59.923 C 986.3 59.923 1000.59 77.833 1000.59 106.009 L 1000.59 106.239 C 1000.59 134.3 986.128 152.209 963.611 152.209 Z M 958.59 137.039 C 973.478 137.039 982.432 125.401 982.432 106.239 L 982.432 106.009 C 982.432 86.961 973.478 75.209 958.59 75.209 C 943.717 75.209 934.51 86.961 934.51 106.009 L 934.51 106.239 C 934.51 125.287 943.717 137.039 958.59 137.039 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
  <path d="M 1046.21 152.209 C 1024.67 152.209 1011.02 142.171 1009.3 127.227 L 1009.3 127.113 L 1027.14 127.113 L 1027.23 127.227 C 1029.44 133.959 1035.94 138.407 1046.52 138.407 C 1057.54 138.407 1065.2 133.387 1065.2 126.087 L 1065.2 125.973 C 1065.2 120.384 1061 116.618 1050.64 114.224 L 1036.43 110.915 C 1019.58 107.037 1011.76 99.393 1011.76 86.389 L 1011.76 86.275 C 1011.76 70.759 1026.23 59.582 1046.46 59.582 C 1066.84 59.582 1079.92 69.734 1081.48 84.336 L 1064.46 84.336 L 1064.46 84.222 C 1062.73 77.947 1056.4 73.271 1046.38 73.271 C 1036.59 73.271 1029.52 78.176 1029.52 85.247 L 1029.52 85.477 C 1029.52 91.066 1033.63 94.487 1043.66 96.883 L 1057.78 100.079 C 1074.98 104.071 1083.21 111.371 1083.21 124.262 L 1083.21 124.489 C 1083.21 141.031 1067.41 152.209 1046.21 152.209 Z" style="fill: currentColor; stroke: currentColor; strokeWidth: 3px;" transform="matrix(1, 0, 0, 1 -1.1368683772161603e-13, 0)"/>
</svg>
</svg>
  </Link>

          <nav className="header__nav__H7k2s">
            <ul className="header__nav-list__Z9j4p">
              <li className="header__nav-item__Q5m3r">
                <NavSubmenu
                  title="Product"
                  sections={productSections}
                  isOpen={openSubmenu === "product"}
                  onToggle={() => toggleSubmenu("product")}
                  onHover={() => handleHover("product")}
                  menuIndex={0}
                />
              </li>
              <li className="header__nav-item__Q5m3r">
                <NavSubmenu
                  title="Resources"
                  sections={resourcesSections}
                  isOpen={openSubmenu === "resources"}
                  onToggle={() => toggleSubmenu("resources")}
                  onHover={() => handleHover("resources")}
                  menuIndex={1}
                />
              </li>
              {navItems.map((item) => (
                <li key={item.href} className={`header__nav-item__Q5m3r ${item.className}`}>
                  <Link
                    href={item.href}
                    className="button__root__ZxcvB button__kind-ghost__R5j2s button__size-small__L9d7h"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions__L6j8s">
            <div className="header__theme-toggle__P8k4r">
              <ThemeToggle />
            </div>
            <div className="header__theme-toggle__P8k4r">
              <Tooltip content="Search" position="bottom">
                <button className="header__search-button__P5k8q" onClick={toggleSearch} aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1" />
                    <path
                      d="M10.5 10.5L14 14"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Tooltip>
            </div>

            <Link
              href="/get-started"
              className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-small__L9d7h header__get-started-button__B9k6p"
            >
              Get Started
            </Link>
            <button
              className="header__hamburger__Q7p3s"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
            <div className="header__hamburger__content__Q7p3s">
              <span className="header__hamburger-line__Z9j4p"></span>
              <span className="header__hamburger-line__Z9j4p"></span>
              <span className="header__hamburger-line__Z9j4p"></span>
              </div>
            </button>
          </div>
        </div>

        {isAnySubmenuOpen && (
          <div ref={submenuRef} className={`header__submenu-container__H8p4q ${getTransitionClasses()}`}>
            <div ref={submenuContentRef} className="header__submenu-content__L7j3s">
              {activeSubmenuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="header__submenu-section__K8j4p">
                  <h4 className="header__submenu-section-title__P3k7s">{section.title}</h4>
                  <div className="header__submenu-section-items__L9m2q">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="header__submenu-item__Z9k4r button__kind-ghost__R5j2s"
                      >
                        <div className="header__submenu-item-content__P8j3s">
                          <span className="header__submenu-item-label__L7k4r">{item.label}</span>
                          <span className="header__submenu-item-description__Q9m2p">{item.description}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="header__mobile-menu__L7j3s">
            <div className="header__mobile-menu-content__P5k8q">
              <ul className="header__mobile-nav-list__B9k6p">
                {navItems.map((item) => (
                  <li key={item.href} className="header__mobile-nav-item__Z7j3s">
                    <Link
                      href={item.href}
                      className="header__mobile-nav-link__Q5m3r"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="header__mobile-nav-item__Z7j3s">
                  <Link
                    href="/get-started"
                    className="header__mobile-nav-link__Q5m3r"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>
    </TooltipProvider>
  )
}

// Helper function to detect if user is on Mac
function isMac() {
  return typeof window !== "undefined" && window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
}
