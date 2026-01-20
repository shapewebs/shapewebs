"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <footer className="footer__container__P3j7s">
      <div className="footer__content__Z8k4q">
        <div className="footer__grid__L5p9r">
          <div className="footer__logo-column__B7m3s">
            <Link href="/" className="footer__logo-link__L9k4r">
              <svg
                className="footer__logo__Q9j6p"
                width="20"
                height="20"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
                  fill="currentColor"
                  stroke="none"
                >
                  <path
                    d="M1190 3764 c-307 -47 -552 -163 -761 -362 -196 -186 -322 -405 -391
                  -681 -22 -85 -22 -93 -25 -1255 -4 -1298 -9 -1202 62 -1232 50 -21 1739 -21
                  1788 0 29 11 42 31 94 137 34 68 222 448 418 844 428 863 809 1632 1066 2153
                  104 211 187 387 184 392 -6 9 -2376 12 -2435 4z"
                  />
                  <path
                    d="M3255 1510 c-242 -34 -447 -211 -531 -460 -27 -79 -25 -280 3 -367
                  66 -201 228 -365 426 -429 116 -38 266 -38 382 -1 341 112 531 456 435 791
                  -89 312 -393 510 -715 466z"
                  />
                </g>
              </svg>
            </Link>
          </div>

          <div className="footer__column__B7m3s">
            <h4 className="footer__subheading__H6k2p">Features</h4>
            <ul className="footer__list__Z3n7q">
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/features"
                  className={`footer__link__L9k4r ${isActive("/features") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Plan
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/build"
                  className={`footer__link__L9k4r ${isActive("/build") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Build
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/insights"
                  className={`footer__link__L9k4r ${isActive("/insights") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Insights
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/customer-requests"
                  className={`footer__link__L9k4r ${isActive("/customer-requests") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Customer Requests
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/linear-asks"
                  className={`footer__link__L9k4r ${isActive("/linear-asks") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Linear Asks
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/security"
                  className={`footer__link__L9k4r ${isActive("/security") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Security
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/mobile"
                  className={`footer__link__L9k4r ${isActive("/mobile") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Mobile
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column__B7m3s">
            <h4 className="footer__subheading__H6k2p">Product</h4>
            <ul className="footer__list__Z3n7q">
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/pricing"
                  className={`footer__link__L9k4r ${isActive("/pricing") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Pricing
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/method"
                  className={`footer__link__L9k4r ${isActive("/method") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Method
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/integrations"
                  className={`footer__link__L9k4r ${isActive("/integrations") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Integrations
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/changelog"
                  className={`footer__link__L9k4r ${isActive("/changelog") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Changelog
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/documentation"
                  className={`footer__link__L9k4r ${isActive("/documentation") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Documentation
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/download"
                  className={`footer__link__L9k4r ${isActive("/download") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Download
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/switch"
                  className={`footer__link__L9k4r ${isActive("/switch") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Switch
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column__B7m3s">
            <h4 className="footer__subheading__H6k2p">Company</h4>
            <ul className="footer__list__Z3n7q">
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/about"
                  className={`footer__link__L9k4r ${isActive("/about") ? "footer__link-active__K3n7q" : ""}`}
                >
                  About
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/customers"
                  className={`footer__link__L9k4r ${isActive("/customers") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Customers
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/career"
                  className={`footer__link__L9k4r ${isActive("/career") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Careers
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/blog"
                  className={`footer__link__L9k4r ${isActive("/blog") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Blog
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/readme"
                  className={`footer__link__L9k4r ${isActive("/readme") ? "footer__link-active__K3n7q" : ""}`}
                >
                  README
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/quality"
                  className={`footer__link__L9k4r ${isActive("/quality") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Quality
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/brand"
                  className={`footer__link__L9k4r ${isActive("/brand") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Brand
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column__B7m3s">
            <h4 className="footer__subheading__H6k2p">Resources</h4>
            <ul className="footer__list__Z3n7q">
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/api"
                  className={`footer__link__L9k4r ${isActive("/api") ? "footer__link-active__K3n7q" : ""}`}
                >
                  API
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/status"
                  className={`footer__link__L9k4r ${isActive("/status") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Status
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/startups"
                  className={`footer__link__L9k4r ${isActive("/startups") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Startups
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/report-issue"
                  className={`footer__link__L9k4r ${isActive("/report-issue") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Report issue
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/dpa"
                  className={`footer__link__L9k4r ${isActive("/dpa") ? "footer__link-active__K3n7q" : ""}`}
                >
                  DPA
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/privacy"
                  className={`footer__link__L9k4r ${isActive("/privacy") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Privacy
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/terms"
                  className={`footer__link__L9k4r ${isActive("/terms") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column__B7m3s">
            <h4 className="footer__subheading__H6k2p">Connect</h4>
            <ul className="footer__list__Z3n7q">
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/contact"
                  className={`footer__link__L9k4r ${isActive("/contact") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Contact us
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="/community"
                  className={`footer__link__L9k4r ${isActive("/community") ? "footer__link-active__K3n7q" : ""}`}
                >
                  Community
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="https://twitter.com/shapeweb"
                  className="footer__link__L9k4r"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="https://github.com/shapeweb"
                  className="footer__link__L9k4r"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li className="footer__list-item__P5j8s">
                <Link
                  href="https://youtube.com/shapeweb"
                  className="footer__link__L9k4r"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
