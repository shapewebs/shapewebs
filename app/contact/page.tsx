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
            <p className="typography__body__K4n7p bitC1">
              <svg direction="ltr" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <g fill-rule='nonzero' transform='scale(1,-1) translate(0,-45.740234375)'>
                <path fill="black" stroke="black" fill-opacity="1.0" stroke-width="1.0" d="
                    M 33.6875,3.6953125
                    C 36.501953125,3.6953125 39.080078125,4.5546875 41.25,6.724609375
                    C 41.29296875,6.767578125 41.357421875,6.83203125 41.37890625,6.853515625
                    C 42.66796875,8.142578125 43.26953125,9.5390625 43.26953125,10.806640625
                    C 43.26953125,11.880859375 42.732421875,12.890625 41.63671875,13.62109375
                    L 35.470703125,17.810546875
                    C 34.03125,18.798828125 32.291015625,19.099609375 30.314453125,17.1875
                    L 28.91796875,15.833984375
                    C 28.4453125,15.3828125 27.779296875,15.2109375 27.005859375,15.59765625
                    C 26.146484375,16.02734375 23.697265625,17.810546875 21.376953125,20.087890625
                    C 18.69140625,22.751953125 17.74609375,23.93359375 16.84375,25.759765625
                    C 16.45703125,26.533203125 16.62890625,27.19921875 17.1015625,27.650390625
                    L 18.43359375,29.046875
                    C 20.345703125,31.0234375 20.044921875,32.78515625 19.078125,34.224609375
                    L 14.8671875,40.390625
                    C 14.13671875,41.46484375 13.1484375,41.98046875 12.052734375,42.001953125
                    C 10.78515625,42.044921875 9.3671875,41.37890625 8.099609375,40.111328125
                    C 8.056640625,40.068359375 8.03515625,40.046875 7.970703125,39.982421875
                    C 5.865234375,37.876953125 4.94140625,35.298828125 4.94140625,32.5703125
                    C 4.94140625,26.76953125 9.06640625,19.98046875 15.16796875,13.900390625
                    C 21.205078125,7.884765625 27.908203125,3.6953125 33.6875,3.6953125
                    Z
                    M 33.6875,4.876953125
                    C 28.23046875,4.876953125 21.720703125,8.89453125 15.919921875,14.673828125
                    C 10.09765625,20.49609375 6.14453125,27.0703125 6.14453125,32.548828125
                    C 6.14453125,35.01953125 6.9609375,37.275390625 8.80859375,39.123046875
                    C 8.8515625,39.166015625 8.916015625,39.23046875 8.958984375,39.2734375
                    C 10.033203125,40.34765625 11.0859375,40.841796875 11.9453125,40.841796875
                    C 12.71875,40.841796875 13.341796875,40.43359375 13.900390625,39.638671875
                    L 18.068359375,33.494140625
                    C 18.755859375,32.484375 18.94921875,31.23828125 17.6171875,29.927734375
                    L 16.11328125,28.466796875
                    C 15.232421875,27.5859375 15.146484375,26.25390625 15.640625,25.244140625
                    C 16.263671875,24.0625 18.025390625,21.892578125 20.560546875,19.29296875
                    C 23.1171875,16.671875 25.30859375,15.017578125 26.51171875,14.39453125
                    C 27.521484375,13.87890625 28.853515625,13.96484375 29.712890625,14.8671875
                    L 31.1953125,16.37109375
                    C 32.484375,17.703125 33.73046875,17.48828125 34.76171875,16.80078125
                    L 40.884765625,12.6328125
                    C 41.6796875,12.095703125 42.109375,11.451171875 42.109375,10.677734375
                    C 42.109375,9.796875 41.615234375,8.787109375 40.498046875,7.669921875
                    C 40.455078125,7.626953125 40.412109375,7.60546875 40.369140625,7.541015625
                    C 38.5,5.671875 36.22265625,4.876953125 33.6875,4.876953125
                    Z
                "/>
                </g>
              </svg>
              Reach out to see what Shapewebs can build for your team, and what it can do for your business.
            </p>
            <p className="typography__body__K4n7p">
              <span className="bitCO">Start with a custom demo. </span>
              <span>Discover the value of a carefully crafted web presence by Shapewebs.</span>
            </p>
            <p className="typography__body__K4n7p">
              <span className="bitCO">See the process in action. </span>
              <span>From idea to launch, you can learn about our <a href="/method" className="typography__link__B7s3m">method</a> or talk to sales.</span>
            </p>
          </div>
          <div className="form__container__H8j3p">
            <form className="contact__form__P5k8p" onSubmit={handleSubmit}>
              {/* Line 1: Company Email */}
              <div className="form__group__K7p2s">
                <label htmlFor="companyEmail" className="form__label__B9f4k">
                  Company email
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  className="form__input__Z3n7q"
                  placeholder="tyler@company.com"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Line 2: Name and Phone Number with Country Selector */}
              <div className="form__group--row__M93j8">
                <div className="form__group__K7p2s">
                  <label htmlFor="name" className="form__label__B9f4k">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form__input__Z3n7q"
                    placeholder="Tyler Durden"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form__group__K7p2s">
                  <label htmlFor="phoneNumber" className="form__label__B9f4k">
                    Phone number <span className="contact__optional__K5j8q">(optional)</span>
                  </label>
                  <div className="form__inputPhoneNR__H5k8q">
                    <div className="form__inputPhoneNRFlag__H5k8q">
                      <select
                        id="phoneCountry"
                        name="phoneCountry"
                        className="form__inputPhoneNR__select__H5k8q"
                        value={formData.phoneCountry}
                        onChange={handleChange}
                        title="Select country"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <div aria-hidden="true" className="form__inputPhoneNR__img--wrapper__H5k8q">
                        <img
                          className="form__inputPhoneNR__img__H5k8q"
                          alt={countries.find((c) => c.code === formData.phoneCountry)?.name || "Country"}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${formData.phoneCountry}.svg`}
                        />
                      </div>
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form__input__Z3n7q"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Line 3: Country */}
              <div className="form__group__K7p2s">
                <label htmlFor="country" className="form__label__B9f4k">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className={`form__select__P9j2k ${formData.country === "" ? "is-placeholder" : ""}`}
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
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
                  <select
                    id="companySize"
                    name="companySize"
                    className={`form__select__P9j2k ${formData.country === "" ? "is-placeholder" : ""}`}
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                  >
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
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="form__input__Z3n7q"
                    placeholder="https://address.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Line 5: Primary Product Interest */}
              <div className="form__group__K7p2s">
                <label htmlFor="productInterest" className="form__label__B9f4k">
                  Primary product interest
                </label>
                <select
                  id="productInterest"
                  name="productInterest"
                  className={`form__select__P9j2k ${formData.country === "" ? "is-placeholder" : ""}`}
                  value={formData.productInterest}
                  onChange={handleChange}
                  required
                >
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
                <textarea
                  id="message"
                  name="message"
                  className="form__textarea__Q6p3f"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Consent Checkbox */} 
              <div className="contact__form-consent__R5j2s">
                <div className="contact__consent-content__P5k8p">
                  <label htmlFor="consentMarketing" className="contact__consent-label__B9k6p">
                    Yes, I agree to receive marketing communications from Shapewebs as described in your{" "}
                    <a href="/privacy-policy" className="typography__link__B7s3m">
                      Privacy Policy
                    </a>
                    . I can withdraw my consent at any time by clicking the unsubscribe link in the emails.
                  </label>

                  {/* iOS toggle */}
                  <div className="contact__toggle-wrapper__T7g2m">
                    <input
                      required
                      className="contact__toggle__T7g2m contact__toggle--ios__T7g2m"
                      id="consentMarketing"
                      name="consentMarketing"
                      type="checkbox"
                      checked={formData.consentMarketing}
                      onChange={handleChange}
                    />
                    <label className="contact__toggle-btn__T7g2m" htmlFor="consentMarketing" />
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
      </div>
    </section>
  )
}
