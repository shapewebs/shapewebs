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
  <path
    d="M 162 5.625 L 89.38 174.712 L 0 174.712 L 0 78.091 C 0 29.78 22.345 5.625 67.034 5.625 L 162 5.625 Z"
    fill="currentColor"
    fillRule="nonzero"
    paintOrder="fill"
  />
  <ellipse cx="150" cy="144.518" rx="30" ry="30.194" fill="currentColor" />

  <path
    d="M 425.394 152.209 C 408.377 152.209 395.8 141.944 395.8 125.744 L 395.8 125.517 C 395.8 109.546 407.801 100.306 429.092 99.051 L 453.257 97.567 L 453.257 89.696 C 453.257 79.887 447.093 74.525 435.01 74.525 C 425.145 74.525 418.653 78.176 416.515 84.449 L 416.432 84.793 L 399.254 84.793 L 399.334 84.222 C 401.472 69.62 415.528 59.809 435.831 59.809 C 458.272 59.809 470.931 70.989 470.931 89.696 L 470.931 150.839 L 453.257 150.839 L 453.257 138.178 L 451.859 138.178 C 446.599 147.191 437.228 152.209 425.394 152.209 Z M 413.556 124.946 C 413.556 133.161 420.542 138.064 430.16 138.064 C 443.476 138.064 453.257 129.279 453.257 117.873 L 453.257 110.231 L 431.475 111.601 C 419.146 112.283 413.556 116.733 413.556 124.833 L 413.556 124.946 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 248.328 152.209 C 221.531 152.209 204.35 138.749 202.708 118.673 L 202.625 117.645 L 220.709 117.645 L 220.792 118.559 C 221.776 129.279 233.203 136.241 249.068 136.241 C 264.193 136.241 274.961 128.711 274.961 117.645 L 274.961 117.531 C 274.961 108.405 268.548 102.587 252.848 99.165 L 239.862 96.313 C 215.775 91.294 205.42 80.115 205.42 62.547 C 205.502 42.014 223.257 27.869 248.409 27.869 C 273.564 27.869 290.001 42.127 291.318 60.494 L 291.399 61.635 L 273.564 61.635 L 273.399 60.607 C 271.837 50.913 262.548 43.841 248.164 43.953 C 234.271 43.953 223.998 50.456 223.998 61.635 C 223.998 70.533 230.243 76.237 245.615 79.544 L 258.521 82.397 C 283.428 87.759 293.62 97.797 293.62 115.363 L 293.62 115.479 C 293.62 138.178 275.946 152.209 248.328 152.209 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
    paintOrder="fill markers"
  />

  <path
    d="M 619.524 152.209 C 593.377 152.209 577.6 134.414 577.6 106.123 C 577.6 78.176 593.708 59.582 618.622 59.582 C 643.523 59.582 658.811 77.491 658.811 104.298 L 658.811 110.573 L 595.522 110.573 C 595.853 127.683 605.219 137.607 619.933 137.607 C 631.362 137.607 638.186 132.018 640.319 127.342 L 640.65 126.656 L 657.829 126.656 L 657.658 127.342 C 654.704 139.091 642.372 152.209 619.524 152.209 Z M 618.701 74.184 C 606.53 74.184 597.323 82.511 595.76 97.797 L 641.14 97.797 C 639.748 81.94 630.783 74.184 618.701 74.184 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 827.123 152.209 C 800.989 152.209 785.2 134.414 785.2 106.123 C 785.2 78.176 801.309 59.582 826.22 59.582 C 851.124 59.582 866.409 77.491 866.409 104.298 L 866.409 110.573 L 803.12 110.573 C 803.453 127.683 812.817 137.607 827.534 137.607 C 838.964 137.607 845.785 132.018 847.918 127.342 L 848.249 126.656 L 865.429 126.656 L 865.27 127.342 C 862.304 139.091 849.973 152.209 827.123 152.209 Z M 826.302 74.184 C 814.13 74.184 804.924 82.511 803.372 97.797 L 848.741 97.797 C 847.35 81.94 838.381 74.184 826.302 74.184 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 306.7 152.209 L 306.7 27.984 L 324.538 27.984 L 324.538 76.578 L 325.852 76.578 C 330.207 66.997 338.761 61.293 351.748 61.293 C 371.723 61.293 382.735 73.157 382.735 94.487 L 382.735 152.209 L 364.981 152.209 L 364.981 98.709 C 364.981 83.881 358.817 76.578 345.747 76.578 C 332.673 76.578 324.538 85.477 324.538 99.849 L 324.538 152.209 L 306.7 152.209 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 484 180.5 L 484 61.519 L 501.837 61.519 L 501.837 75.553 L 503.151 75.553 C 508.331 65.742 518.112 59.923 530.607 59.923 C 553.13 59.923 567.595 77.947 567.595 106.009 L 567.595 106.239 C 567.595 134.414 553.291 152.209 530.607 152.209 C 518.359 152.209 507.92 146.279 503.151 136.582 L 501.837 136.582 L 501.837 180.5 L 484 180.5 Z M 525.593 137.039 C 540.471 137.039 549.431 125.287 549.431 106.239 L 549.431 106.009 C 549.431 86.845 540.471 75.209 525.593 75.209 C 510.714 75.209 501.509 86.961 501.509 106.009 L 501.509 106.239 C 501.509 125.287 510.714 137.039 525.593 137.039 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 684.951 152.78 L 660.3 63.46 L 678.21 63.46 L 694.238 132.359 L 695.559 132.359 L 713.973 63.46 L 730.901 63.46 L 749.312 132.359 L 750.714 132.359 L 766.663 63.46 L 784.333 63.46 L 759.761 152.78 L 741.429 152.78 L 722.927 86.159 L 721.535 86.159 L 703.123 152.78 L 684.951 152.78 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 923.111 152.209 C 910.62 152.209 900.832 146.506 895.654 136.696 L 894.341 136.696 L 894.341 150.839 L 876.5 150.839 L 876.5 26.5 L 894.341 26.5 L 894.341 75.666 L 895.654 75.666 C 900.422 66.083 910.859 59.923 923.111 59.923 C 945.8 59.923 960.094 77.833 960.094 106.009 L 960.094 106.239 C 960.094 134.3 945.628 152.209 923.111 152.209 Z M 918.09 137.039 C 932.978 137.039 941.932 125.401 941.932 106.239 L 941.932 106.009 C 941.932 86.961 932.978 75.209 918.09 75.209 C 903.217 75.209 894.01 86.961 894.01 106.009 L 894.01 106.239 C 894.01 125.287 903.217 137.039 918.09 137.039 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
  />

  <path
    d="M 1002.7 152.209 C 981.165 152.209 967.522 142.171 965.8 127.227 L 965.8 127.113 L 983.641 127.113 L 983.722 127.227 C 985.934 133.959 992.435 138.407 1003.03 138.407 C 1014.05 138.407 1021.69 133.387 1021.69 126.087 L 1021.69 125.973 C 1021.69 120.384 1017.5 116.618 1007.14 114.224 L 992.925 110.915 C 976.078 107.037 968.264 99.393 968.264 86.389 L 968.264 86.275 C 968.264 70.759 982.728 59.582 1002.95 59.582 C 1023.34 59.582 1036.41 69.734 1037.97 84.336 L 1020.95 84.336 L 1020.95 84.222 C 1019.23 77.947 1012.9 73.271 1002.87 73.271 C 993.086 73.271 986.026 78.176 986.026 85.247 L 986.026 85.477 C 986.026 91.066 990.132 94.487 1000.16 96.883 L 1014.29 100.079 C 1031.47 104.071 1039.7 111.371 1039.7 124.262 L 1039.7 124.489 C 1039.7 141.031 1023.91 152.209 1002.7 152.209 Z"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={3}
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
