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
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AC", name: "Ascension Island" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (Democratic Republic of the)" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea (Democratic People's Republic of)" },
  { code: "KR", name: "Korea (Republic of)" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia (Federated States of)" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SZ", name: "Eswatini" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "VG", name: "Virgin Islands (British)" },
  { code: "VI", name: "Virgin Islands (U.S.)" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" }
]

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"]
  const productInterests = ["Marketing Website", "E-Commerce Store", "Web Application", "Mobile App", "Other"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="contact__container__Q7j3s">
        <div className="contact__content__K9j6q">
            <div className="contact__grid__L7p3s">
                <div className="contact__info-container__H5k8q">
                    <h3 className="typography__heading3__V1c8r" style={{ margin: "0px" }}>Contact sales</h3>
                    <div className="Spacer-module__root__NM019" style={{ '--height' : '32px' }}>
                    </div>
                    <p className="typography__body__K4n7p" style={{ margin: 0 }}>
                        <span className="Text-regular-bitC bitCO"><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="-0.0002 -0.0003 16.0005 15.9996" width="16.0005px" height="15.9996px">
                                <path
                                    d="M 5.605 2.225 C 5.408 1.753 4.893 1.503 4.403 1.635 L 4.265 1.673 C 2.65 2.113 1.27 3.678 1.673 5.583 C 2.6 9.958 6.043 13.4 10.418 14.328 C 12.325 14.733 13.888 13.35 14.328 11.735 L 14.365 11.598 C 14.5 11.105 14.248 10.59 13.778 10.395 L 11.345 9.383 C 10.933 9.21 10.455 9.33 10.17 9.678 L 9.205 10.858 C 7.448 9.985 6.033 8.525 5.22 6.733 L 6.325 5.833 C 6.673 5.55 6.79 5.073 6.62 4.658 L 5.605 2.225 Z"
                                    style={{ fill: "none" , paintOrder: "fill" , stroke: "currentColor" ,
                                    strokeWidth: "1.25px" , }} transform="matrix(1, 0, 0, 1, 0, -1.7763568394002505e-15)" />
                            </svg>
                            Start with a custom demo. </span>
                        <span>Discover the value of a carefully crafted web presence by Shapewebs.</span>
                    </p>
                    <div className="Spacer-module__root__NM019" style={{ '--height' : '24px' }}>
                    </div>
                    <p className="typography__body__K4n7p" style={{ margin: 0 }}>
                        <span className="Text-regular-bitC bitCO"><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="-0.0002 -0.0003 16.0005 15.9996" width="16.0005px" height="15.9996px">
                                <path
                                    d="M 1.6 3.6 C 1.6 2.938 2.138 2.4 2.8 2.4 L 5.2 2.4 C 5.863 2.4 6.4 2.938 6.4 3.6 L 6.4 4 L 9.6 4 L 9.6 3.6 C 9.6 2.938 10.138 2.4 10.8 2.4 L 13.2 2.4 C 13.863 2.4 14.4 2.938 14.4 3.6 L 14.4 6 C 14.4 6.663 13.863 7.2 13.2 7.2 L 10.8 7.2 C 10.138 7.2 9.6 6.663 9.6 6 L 9.6 5.6 L 6.4 5.6 L 6.4 6 C 6.4 6.183 6.358 6.358 6.285 6.513 L 8 8.8 L 10 8.8 C 10.663 8.8 11.2 9.338 11.2 10 L 11.2 12.4 C 11.2 13.063 10.663 13.6 10 13.6 L 7.6 13.6 C 6.938 13.6 6.4 13.063 6.4 12.4 L 6.4 10 C 6.4 9.818 6.443 9.643 6.515 9.488 L 4.8 7.2 L 2.8 7.2 C 2.138 7.2 1.6 6.663 1.6 6 L 1.6 3.6 Z"
                                    style={{ fill: "none" , paintOrder: "fill" , stroke: "currentColor" ,
                                    strokeWidth: "1.25px" , }} transform="matrix(1, 0, 0, 1, 0, -1.7763568394002505e-15)" />
                            </svg>
                            See the process in action. </span>
                        <span>From idea to launch, you can learn about our <a href="/method"
                                className="typography__link__B7s3m">method</a> or talk to sales.</span>
                    </p>
                    <div className="Spacer-module__root__NM019" style={{ '--height' : '48px' }}>
                    </div>
                    <p className="typography__body__K4n7p" style={{ margin: 0 }}>Technical question or issue? </p>
                    <div className="Spacer-module__root__NM019" style={{ '--height' : '16px' }}>
                    </div>
                    <a href="/docs" className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-small__L9d7h" style={{
                      margin: 0,
                      "--button-font-size": "var(--font-size-regular)",
                    }}>Find it in docs</a>
                </div>
                <div className="form__container__H8j3p">
                    <form className="contact__form__P5k8p" onSubmit={handleSubmit}>
                        {/* Line 1: Company Email */}
                        <div className="form__group__K7p2s">
                            <label htmlFor="companyEmail" className="form__label__B9f4k">
                                Company email
                            </label>
                            <input type="email" id="companyEmail" name="companyEmail" className="form__input__Z3n7q"
                                placeholder="tyler@company.com" value={formData.companyEmail} onChange={handleChange}
                                required />
                        </div>

                        {/* Line 2: Name and Phone Number with Country Selector */}
                        <div className="form__group--row__M93j8">
                            <div className="form__group__K7p2s">
                                <label htmlFor="name" className="form__label__B9f4k">
                                    Your name
                                </label>
                                <input type="text" id="name" name="name" className="form__input__Z3n7q"
                                    placeholder="Tyler Durden" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form__group__K7p2s">
                                <label htmlFor="phoneNumber" className="form__label__B9f4k">
                                    Phone number <span className="contact__optional__K5j8q">(optional)</span>
                                </label>
                                <div className="form__inputPhoneNR__H5k8q">
                                    <div className="form__inputPhoneNRFlag__H5k8q">
                                        <select id="phoneCountry" name="phoneCountry"
                                            className="form__inputPhoneNR__select__H5k8q" value={formData.phoneCountry}
                                            onChange={handleChange} title="Select country">
                                            {countries.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.name}
                                            </option>
                                            ))}
                                        </select>
                                        <div aria-hidden="true" className="form__inputPhoneNR__img--wrapper__H5k8q">
                                            <img className="form__inputPhoneNR__img__H5k8q" alt={countries.find((c)=> c.code
                                            === formData.phoneCountry)?.name || "Country"}
                                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${formData.phoneCountry}.svg`}
                                            />
                                        </div>
                                    </div>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" className="form__input__Z3n7q"
                                        placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Line 3: Country */}
                        <div className="form__group__K7p2s">
                            <label htmlFor="country" className="form__label__B9f4k">
                                Country
                            </label>
                            <select id="country" name="country" className={`form__select__P9j2k ${formData.country===""
                                ? "is-placeholder" : "" }`} value={formData.country} onChange={handleChange} required>
                                <option value="" disabled hidden>Select your country</option>
                                {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                                ))}
                            </select>
                        </div>

                        {/* Line 4: Company Size and Website */}
                        <div className="form__group--row__M93j8">
                            <div className="form__group__K7p2s">
                                <label htmlFor="companySize" className="form__label__B9f4k">
                                    Company size
                                </label>
                                <select id="companySize" name="companySize" className={`form__select__P9j2k
                                    ${formData.country==="" ? "is-placeholder" : "" }`} value={formData.companySize}
                                    onChange={handleChange} required>
                                    <option value="" disabled hidden>Select company size</option>
                                    {companySizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size} employees
                                    </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form__group__K7p2s">
                                <label htmlFor="website" className="form__label__B9f4k">
                                    Company website <span className="contact__optional__K5j8q">(optional)</span>
                                </label>
                                <input type="url" id="website" name="website" className="form__input__Z3n7q"
                                    placeholder="https://address.com" value={formData.website} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Line 5: Primary Product Interest */}
                        <div className="form__group__K7p2s">
                            <label htmlFor="productInterest" className="form__label__B9f4k">
                                Primary product interest
                            </label>
                            <select id="productInterest" name="productInterest" className={`form__select__P9j2k
                                ${formData.country==="" ? "is-placeholder" : "" }`} value={formData.productInterest}
                                onChange={handleChange} required>
                                <option value="" disabled hidden>Select a value</option>
                                {productInterests.map((interest) => (
                                <option key={interest} value={interest}>
                                    {interest}
                                </option>
                                ))}
                            </select>
                        </div>

                        {/* Line 6: How can we help? */}
                        <div className="form__group__K7p2s">
                            <label htmlFor="message" className="form__label__B9f4k">
                                How can we help?
                            </label>
                            <textarea id="message" name="message" className="form__textarea__Q6p3f"
                                placeholder="Tell us about your project..." value={formData.message} onChange={handleChange}
                                required></textarea>
                        </div>

                        {/* Consent Checkbox */}
                        <div className="contact__form-consent__R5j2s">
                            <div className="contact__consent-content__P5k8p">
                                <label htmlFor="consentMarketing" className="contact__consent-label__B9k6p">
                                    Yes, I agree to receive marketing communications from Shapewebs as described in your&nbsp;
                                    <a href="/privacy-policy" className="typography__link__B7s3m">
                                        Privacy Policy
                                    </a>
                                    . I can withdraw my consent at any time by clicking the unsubscribe link in the emails.
                                </label>

                                {/* iOS toggle */}
                                <div className="contact__toggle-wrapper__T7g2m">
                                    <input required className="contact__toggle__T7g2m contact__toggle--ios__T7g2m"
                                        id="consentMarketing" name="consentMarketing" type="checkbox"
                                        checked={formData.consentMarketing} onChange={handleChange} />
                                    <label className="contact__toggle-btn__T7g2m" htmlFor="consentMarketing" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="contact__form-submit__Q7p3s">
                            <button className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
                                type="submit" style={{ width: "100%" , justifyContent: "center" }}>
                                Talk to Shapewebs
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
