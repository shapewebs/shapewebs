"use client"

import "@/styles/pages/contact/contact.css"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyEmail: "",
    name: "",
    phoneCountry: "US",
    phoneNumber: "",
    country: "",
    companySize: "",
    website: "",
    productInterest: "",
    message: "",
    consentMarketing: false,
  })

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "CN", name: "China", flag: "🇨🇳" },
  ]

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"]
  const productInterests = ["Marketing Website", "E-Commerce Store", "Web Application", "Mobile App", "Other"]

  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showPhoneCountryDropdown, setShowPhoneCountryDropdown] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handlePhoneCountrySelect = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneCountry: code,
    }))
    setShowPhoneCountryDropdown(false)
  }

  const handleCountrySelect = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      country: code,
    }))
    setShowCountryDropdown(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const selectedPhoneCountry = countries.find((c) => c.code === formData.phoneCountry)
  const selectedCountry = countries.find((c) => c.code === formData.country)

  return (
    <div className="contact__container__Q7j3s">
      <section className="contact__content__K9j6q">
        <div className="contact__grid__L7p3s">
          <div className="contact__info-container__H5k8q">
            <h1 className="contact__section-title__Q3j7q">Contact sales</h1>

            <div className="contact__info-item__M8k5p">
              <div className="contact__checkmark__N9j6q">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2>Book a meeting</h2>
            </div>

            <div className="contact__info-item__M8k5p">
              <div className="contact__checkmark__N9j6q">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2>Learn which plan is right for your team</h2>
            </div>

            <div className="contact__info-item__M8k5p" style={{ marginBottom: "32px" }}>
              <div className="contact__checkmark__N9j6q">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2>Get onboarding help</h2>
            </div>

            <div className="contact__info-group__P5k8p">
              <p className="contact__info-text__B9k6p">
                <a
                  href="mailto:info@shapewebs.com"
                  className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-medium__L9d7h"
                >
                  info@shapewebs.com
                </a>
              </p>
            </div>

            <div className="contact__info-group__P5k8p">
              <p className="contact__info-text__B9k6p">
                <a
                  href="tel:+4524270082"
                  className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-medium__L9d7h"
                >
                  +45 24 27 00 82
                </a>
              </p>
            </div>
          </div>

          <div className="contact__form-container__H5k8q">
            <form className="contact__form__P5k8p" onSubmit={handleSubmit}>
              {/* Line 1: Company Email */}
              <div className="contact__form-group__Z7j3s">
                <label htmlFor="companyEmail" className="contact__form-label__B9k6p">
                  Company Email
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  className="contact__form-input__L3j7q"
                  placeholder="your@company.com"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Line 2: Name and Phone Number with Country Selector */}
              <div className="contact__form-row__N7k3s">
                <div className="contact__form-group__Z7j3s">
                  <label htmlFor="name" className="contact__form-label__B9k6p">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="contact__form-input__L3j7q"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__form-group__Z7j3s">
                  <label htmlFor="phoneNumber" className="contact__form-label__B9k6p">
                    Phone Number <span className="contact__optional__K5j8q">(optional)</span>
                  </label>
                  <div className="contact__phone-input-wrapper__M8k5p">
                    <div className="contact__phone-country-selector__B9k6p">
                      <button
                        type="button"
                        className="contact__country-selector-button__L7p3s"
                        onClick={() => setShowPhoneCountryDropdown(!showPhoneCountryDropdown)}
                      >
                        <span className="contact__flag__K5j8q">{selectedPhoneCountry?.flag}</span>
                      </button>
                      {showPhoneCountryDropdown && (
                        <div className="contact__country-dropdown__P5k8p">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              className="contact__country-option__Q7j3s"
                              onClick={() => handlePhoneCountrySelect(country.code)}
                            >
                              <span className="contact__flag__K5j8q">{country.flag}</span>
                              <span>{country.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="contact__form-input__L3j7q contact__phone-input__H5k8q"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Line 3: Country */}
              <div className="contact__form-group__Z7j3s">
                <label htmlFor="country" className="contact__form-label__B9k6p">
                  Country
                </label>
                <div className="contact__country-input-wrapper__M8k5p">
                  <button
                    type="button"
                    className="contact__country-select-button__L7p3s"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    <span className="contact__flag__K5j8q">{selectedCountry?.flag}</span>
                    <span className="contact__country-select-text__B9k6p">{selectedCountry?.name || "Select country"}</span>
                  </button>
                  {showCountryDropdown && (
                    <div className="contact__country-dropdown__P5k8p contact__country-dropdown-full__Q7j3s">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="contact__country-option__Q7j3s"
                          onClick={() => handleCountrySelect(country.code)}
                        >
                          <span className="contact__flag__K5j8q">{country.flag}</span>
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Line 4: Company Size and Website */}
              <div className="contact__form-row__N7k3s">
                <div className="contact__form-group__Z7j3s">
                  <label htmlFor="companySize" className="contact__form-label__B9k6p">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    className="contact__form-input__L3j7q"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size} employees
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact__form-group__Z7j3s">
                  <label htmlFor="website" className="contact__form-label__B9k6p">
                    Company Website <span className="contact__optional__K5j8q">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="contact__form-input__L3j7q"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Line 5: Primary Product Interest */}
              <div className="contact__form-group__Z7j3s">
                <label htmlFor="productInterest" className="contact__form-label__B9k6p">
                  Primary Product Interest
                </label>
                <select
                  id="productInterest"
                  name="productInterest"
                  className="contact__form-input__L3j7q"
                  value={formData.productInterest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a website type</option>
                  {productInterests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Line 6: How can we help? */}
              <div className="contact__form-group__Z7j3s">
                <label htmlFor="message" className="contact__form-label__B9k6p">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__form-textarea__K5j8q"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div className="contact__form-consent__R5j2s">
                <div className="contact__consent-content__P5k8p">
                  <div className="contact__toggle-wrapper__L7p3s">
                    <input
                      type="checkbox"
                      id="consentMarketing"
                      name="consentMarketing"
                      className="contact__consent-checkbox__M8k5p"
                      checked={formData.consentMarketing}
                      onChange={handleChange}
                    />
                    <label htmlFor="consentMarketing" className="contact__consent-label__B9k6p">
                      Yes, I agree to receive marketing communications from Shapewebs as described in your{" "}
                      <a href="/privacy-policy" className="contact__link__Z7j3s">
                        Privacy Policy
                      </a>
                      . I can withdraw my consent at any time by clicking the unsubscribe link in the emails.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="contact__form-submit__Q7p3s">
                <button
                  className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
                  type="submit"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Talk to Shapewebs
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
