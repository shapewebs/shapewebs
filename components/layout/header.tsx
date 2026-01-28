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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 979.6 180" height="32px" width="unset">
  <path paintOrder="fill" fillRule="nonzero" fill="currentColor" d="M 162 5.625 L 89.38 174.712 L 0 174.712 L 0 78.091 C 0 29.78 22.345 5.625 67.034 5.625 L 162 5.625 Z"/>
  <ellipse fill="currentColor" cx="150" cy="144.518" rx="30" ry="30.194"/>
  <path d="M 405.987 152.209 C 388.97 152.209 376.393 141.944 376.393 125.744 L 376.393 125.517 C 376.393 109.546 388.394 100.306 409.685 99.051 L 433.85 97.567 L 433.85 89.696 C 433.85 79.887 427.686 74.525 415.603 74.525 C 405.738 74.525 399.246 78.176 397.108 84.449 L 397.025 84.793 L 379.847 84.793 L 379.927 84.222 C 382.065 69.62 396.121 59.809 416.424 59.809 C 438.865 59.809 451.524 70.989 451.524 89.696 L 451.524 150.839 L 433.85 150.839 L 433.85 138.178 L 432.452 138.178 C 427.192 147.191 417.821 152.209 405.987 152.209 Z M 394.149 124.946 C 394.149 133.161 401.135 138.064 410.753 138.064 C 424.069 138.064 433.85 129.279 433.85 117.873 L 433.85 110.231 L 412.068 111.601 C 399.739 112.283 394.149 116.733 394.149 124.833 L 394.149 124.946 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 248.328 152.209 C 221.531 152.209 204.35 138.749 202.708 118.673 L 202.625 117.645 L 220.709 117.645 L 220.792 118.559 C 221.776 129.279 233.203 136.241 249.068 136.241 C 264.193 136.241 274.961 128.711 274.961 117.645 L 274.961 117.531 C 274.961 108.405 268.548 102.587 252.848 99.165 L 239.862 96.313 C 215.775 91.294 205.42 80.115 205.42 62.547 C 205.502 42.014 223.257 27.869 248.409 27.869 C 273.564 27.869 290.001 42.127 291.318 60.494 L 291.399 61.635 L 273.564 61.635 L 273.399 60.607 C 271.837 50.913 262.548 43.841 248.164 43.953 C 234.271 43.953 223.998 50.456 223.998 61.635 C 223.998 70.533 230.243 76.237 245.615 79.544 L 258.521 82.397 C 283.428 87.759 293.62 97.797 293.62 115.363 L 293.62 115.479 C 293.62 138.178 275.946 152.209 248.328 152.209 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 583.702 152.209 C 557.555 152.209 541.778 134.414 541.778 106.123 C 541.778 78.176 557.886 59.582 582.8 59.582 C 607.701 59.582 622.989 77.491 622.989 104.298 L 622.989 110.573 L 559.7 110.573 C 560.031 127.683 569.397 137.607 584.111 137.607 C 595.54 137.607 602.364 132.018 604.497 127.342 L 604.828 126.656 L 622.007 126.656 L 621.836 127.342 C 618.882 139.091 606.55 152.209 583.702 152.209 Z M 582.879 74.184 C 570.708 74.184 561.501 82.511 559.938 97.797 L 605.318 97.797 C 603.926 81.94 594.961 74.184 582.879 74.184 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 779.087 152.209 C 752.953 152.209 737.164 134.414 737.164 106.123 C 737.164 78.176 753.273 59.582 778.184 59.582 C 803.088 59.582 818.373 77.491 818.373 104.298 L 818.373 110.573 L 755.084 110.573 C 755.417 127.683 764.781 137.607 779.498 137.607 C 790.928 137.607 797.749 132.018 799.882 127.342 L 800.213 126.656 L 817.393 126.656 L 817.234 127.342 C 814.268 139.091 801.937 152.209 779.087 152.209 Z M 778.266 74.184 C 766.094 74.184 756.888 82.511 755.336 97.797 L 800.705 97.797 C 799.314 81.94 790.345 74.184 778.266 74.184 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 296.987 152.209 L 296.987 27.984 L 314.825 27.984 L 314.825 76.578 L 316.139 76.578 C 320.494 66.997 329.048 61.293 342.035 61.293 C 362.01 61.293 373.022 73.157 373.022 94.487 L 373.022 152.209 L 355.268 152.209 L 355.268 98.709 C 355.268 83.881 349.104 76.578 336.034 76.578 C 322.96 76.578 314.825 85.477 314.825 99.849 L 314.825 152.209 L 296.987 152.209 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 454.853 180.5 L 454.853 61.519 L 472.69 61.519 L 472.69 75.553 L 474.004 75.553 C 479.184 65.742 488.965 59.923 501.46 59.923 C 523.983 59.923 538.448 77.947 538.448 106.009 L 538.448 106.239 C 538.448 134.414 524.144 152.209 501.46 152.209 C 489.212 152.209 478.773 146.279 474.004 136.582 L 472.69 136.582 L 472.69 180.5 L 454.853 180.5 Z M 496.446 137.039 C 511.324 137.039 520.284 125.287 520.284 106.239 L 520.284 106.009 C 520.284 86.845 511.324 75.209 496.446 75.209 C 481.567 75.209 472.362 86.961 472.362 106.009 L 472.362 106.239 C 472.362 125.287 481.567 137.039 496.446 137.039 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 642.962 152.78 L 618.311 63.46 L 636.221 63.46 L 652.249 132.359 L 653.57 132.359 L 671.984 63.46 L 688.912 63.46 L 707.323 132.359 L 708.725 132.359 L 724.674 63.46 L 742.344 63.46 L 717.772 152.78 L 699.44 152.78 L 680.938 86.159 L 679.546 86.159 L 661.134 152.78 L 642.962 152.78 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 868.521 152.209 C 856.03 152.209 846.242 146.506 841.064 136.696 L 839.751 136.696 L 839.751 150.839 L 821.91 150.839 L 821.91 26.5 L 839.751 26.5 L 839.751 75.666 L 841.064 75.666 C 845.832 66.083 856.269 59.923 868.521 59.923 C 891.21 59.923 905.504 77.833 905.504 106.009 L 905.504 106.239 C 905.504 134.3 891.038 152.209 868.521 152.209 Z M 863.5 137.039 C 878.388 137.039 887.342 125.401 887.342 106.239 L 887.342 106.009 C 887.342 86.961 878.388 75.209 863.5 75.209 C 848.627 75.209 839.42 86.961 839.42 106.009 L 839.42 106.239 C 839.42 125.287 848.627 137.039 863.5 137.039 Z" strokeWidth={1} fill="currentColor"/>
  <path d="M 942.578 152.209 C 921.04 152.209 907.397 142.171 905.675 127.227 L 905.675 127.113 L 923.516 127.113 L 923.597 127.227 C 925.809 133.959 932.31 138.407 942.908 138.407 C 953.929 138.407 961.57 133.387 961.57 126.087 L 961.57 125.973 C 961.57 120.384 957.374 116.618 947.016 114.224 L 932.8 110.915 C 915.953 107.037 908.139 99.393 908.139 86.389 L 908.139 86.275 C 908.139 70.759 922.603 59.582 942.829 59.582 C 963.214 59.582 976.288 69.734 977.85 84.336 L 960.828 84.336 L 960.828 84.222 C 959.106 77.947 952.776 73.271 942.749 73.271 C 932.961 73.271 925.901 78.176 925.901 85.247 L 925.901 85.477 C 925.901 91.066 930.007 94.487 940.033 96.883 L 954.168 100.079 C 971.348 104.071 979.572 111.371 979.572 124.262 L 979.572 124.489 C 979.572 141.031 963.785 152.209 942.578 152.209 Z" strokeWidth={1} fill="currentColor"/>
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
