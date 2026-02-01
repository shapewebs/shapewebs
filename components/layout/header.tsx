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
        className={`button__root__ZxcvB button__kind-ghost__R5j2s button__size-small__L9d7h header__nav-dropdown-trigger__Z8p4r ${isOpen ? "header__nav-dropdown-active__L7k3q" : ""
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
              viewBox="0 2.8125 1099 174.875"
              height={32}
              style={{ width: "auto", display: "block" }}
            >
              <path
                d="M 162 5.625 L 89.38 174.712 L 0 174.712 L 0 78.091 C 0 29.78 22.345 5.625 67.034 5.625 L 162 5.625 Z"
                style={{
                  fillRule: "nonzero",
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <ellipse
                cx={150}
                cy={144.518}
                rx={30}
                ry={30.194}
                style={{
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 466.794 152.209 C 449.777 152.209 437.2 141.944 437.2 125.744 L 437.2 125.517 C 437.2 109.546 449.201 100.306 470.492 99.051 L 494.657 97.567 L 494.657 89.696 C 494.657 79.887 488.493 74.525 476.41 74.525 C 466.545 74.525 460.053 78.176 457.915 84.449 L 457.832 84.793 L 440.654 84.793 L 440.734 84.222 C 442.872 69.62 456.928 59.809 477.231 59.809 C 499.672 59.809 512.331 70.989 512.331 89.696 L 512.331 150.839 L 494.657 150.839 L 494.657 138.178 L 493.259 138.178 C 487.999 147.191 478.628 152.209 466.794 152.209 Z M 454.956 124.946 C 454.956 133.161 461.942 138.064 471.56 138.064 C 484.876 138.064 494.657 129.279 494.657 117.873 L 494.657 110.231 L 472.875 111.601 C 460.546 112.283 454.956 116.733 454.956 124.833 L 454.956 124.946 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 285.703 152.209 C 258.906 152.209 241.725 138.749 240.083 118.673 L 240 117.645 L 258.084 117.645 L 258.167 118.559 C 259.151 129.279 270.578 136.241 286.443 136.241 C 301.568 136.241 312.336 128.711 312.336 117.645 L 312.336 117.531 C 312.336 108.405 305.923 102.587 290.223 99.165 L 277.237 96.313 C 253.15 91.294 242.795 80.115 242.795 62.547 C 242.877 42.014 260.632 27.869 285.784 27.869 C 310.939 27.869 327.376 42.127 328.693 60.494 L 328.774 61.635 L 310.939 61.635 L 310.774 60.607 C 309.212 50.913 299.923 43.841 285.539 43.953 C 271.646 43.953 261.373 50.456 261.373 61.635 C 261.373 70.533 267.618 76.237 282.99 79.544 L 295.896 82.397 C 320.803 87.759 330.995 97.797 330.995 115.363 L 330.995 115.479 C 330.995 138.178 313.321 152.209 285.703 152.209 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 665.924 152.209 C 639.777 152.209 624 134.414 624 106.123 C 624 78.176 640.108 59.582 665.022 59.582 C 689.923 59.582 705.211 77.491 705.211 104.298 L 705.211 110.573 L 641.922 110.573 C 642.253 127.683 651.619 137.607 666.333 137.607 C 677.762 137.607 684.586 132.018 686.719 127.342 L 687.05 126.656 L 704.229 126.656 L 704.058 127.342 C 701.104 139.091 688.772 152.209 665.924 152.209 Z M 665.101 74.184 C 652.93 74.184 643.723 82.511 642.16 97.797 L 687.54 97.797 C 686.148 81.94 677.183 74.184 665.101 74.184 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 879.523 152.209 C 853.389 152.209 837.6 134.414 837.6 106.123 C 837.6 78.176 853.709 59.582 878.62 59.582 C 903.524 59.582 918.809 77.491 918.809 104.298 L 918.809 110.573 L 855.52 110.573 C 855.853 127.683 865.217 137.607 879.934 137.607 C 891.364 137.607 898.185 132.018 900.318 127.342 L 900.649 126.656 L 917.829 126.656 L 917.67 127.342 C 914.704 139.091 902.373 152.209 879.523 152.209 Z M 878.702 74.184 C 866.53 74.184 857.324 82.511 855.772 97.797 L 901.141 97.797 C 899.75 81.94 890.781 74.184 878.702 74.184 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 347.1 152.209 L 347.1 27.984 L 364.938 27.984 L 364.938 76.578 L 366.252 76.578 C 370.607 66.997 379.161 61.293 392.148 61.293 C 412.123 61.293 423.135 73.157 423.135 94.487 L 423.135 152.209 L 405.381 152.209 L 405.381 98.709 C 405.381 83.881 399.217 76.578 386.147 76.578 C 373.073 76.578 364.938 85.477 364.938 99.849 L 364.938 152.209 L 347.1 152.209 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 528.4 180.5 L 528.4 61.519 L 546.237 61.519 L 546.237 75.553 L 547.551 75.553 C 552.731 65.742 562.512 59.923 575.007 59.923 C 597.53 59.923 611.995 77.947 611.995 106.009 L 611.995 106.239 C 611.995 134.414 597.691 152.209 575.007 152.209 C 562.759 152.209 552.32 146.279 547.551 136.582 L 546.237 136.582 L 546.237 180.5 L 528.4 180.5 Z M 569.993 137.039 C 584.871 137.039 593.831 125.287 593.831 106.239 L 593.831 106.009 C 593.831 86.845 584.871 75.209 569.993 75.209 C 555.114 75.209 545.909 86.961 545.909 106.009 L 545.909 106.239 C 545.909 125.287 555.114 137.039 569.993 137.039 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 734.351 152.78 L 709.7 63.46 L 727.61 63.46 L 743.638 132.359 L 744.959 132.359 L 763.373 63.46 L 780.301 63.46 L 798.712 132.359 L 800.114 132.359 L 816.063 63.46 L 833.733 63.46 L 809.161 152.78 L 790.829 152.78 L 772.327 86.159 L 770.935 86.159 L 752.523 152.78 L 734.351 152.78 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 978.611 152.209 C 966.12 152.209 956.332 146.506 951.154 136.696 L 949.841 136.696 L 949.841 150.839 L 932 150.839 L 932 26.5 L 949.841 26.5 L 949.841 75.666 L 951.154 75.666 C 955.922 66.083 966.359 59.923 978.611 59.923 C 1001.3 59.923 1015.59 77.833 1015.59 106.009 L 1015.59 106.239 C 1015.59 134.3 1001.13 152.209 978.611 152.209 Z M 973.59 137.039 C 988.478 137.039 997.43 125.401 997.43 106.239 L 997.43 106.009 C 997.43 86.961 988.478 75.209 973.59 75.209 C 958.717 75.209 949.51 86.961 949.51 106.009 L 949.51 106.239 C 949.51 125.287 958.717 137.039 973.59 137.039 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
              <path
                d="M 1061.21 152.209 C 1039.67 152.209 1026.02 142.171 1024.3 127.227 L 1024.3 127.113 L 1042.14 127.113 L 1042.23 127.227 C 1044.44 133.959 1050.94 138.407 1061.52 138.407 C 1072.54 138.407 1080.2 133.387 1080.2 126.087 L 1080.2 125.973 C 1080.2 120.384 1076 116.618 1065.64 114.224 L 1051.43 110.915 C 1034.58 107.037 1026.76 99.393 1026.76 86.389 L 1026.76 86.275 C 1026.76 70.759 1041.23 59.582 1061.46 59.582 C 1081.84 59.582 1094.92 69.734 1096.48 84.336 L 1079.46 84.336 L 1079.46 84.222 C 1077.73 77.947 1071.4 73.271 1061.38 73.271 C 1051.59 73.271 1044.52 78.176 1044.52 85.247 L 1044.52 85.477 C 1044.52 91.066 1048.63 94.487 1058.66 96.883 L 1072.78 100.079 C 1089.98 104.071 1098.21 111.371 1098.21 124.262 L 1098.21 124.489 C 1098.21 141.031 1082.41 152.209 1061.21 152.209 Z"
                style={{
                  stroke: "currentColor",
                  strokeWidth: 3,
                  paintOrder: "stroke",
                  fill: "currentColor",
                }}
              />
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
