import "@/styles/pages/contact/contact.css"

export default function ContactPage() {
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
                  href="mailto:info@example.com"
                  className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-medium__L9d7h"
                >
                  info@shapewebs.com
                </a>
              </p>
            </div>

            <div className="contact__info-group__P5k8p">
              <p className="contact__info-text__B9k6p">
                <a
                  href="tel:+1234567890"
                  className="button__root__ZxcvB button__kind-tertiary__R5j2s button__size-medium__L9d7h"
                >
                  +45 24 27 00 82
                </a>
              </p>
            </div>
          </div>

          <div className="contact__form-container__H5k8q">
            <form className="contact__form__P5k8p">
              <div className="contact__form-group__Z7j3s">
                <label htmlFor="name" className="contact__form-label__B9k6p">
                  Name
                </label>
                <input type="text" id="name" className="contact__form-input__L3j7q" placeholder="Your name" />
              </div>

              <div className="contact__form-group__Z7j3s">
                <label htmlFor="email" className="contact__form-label__B9k6p">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="contact__form-input__L3j7q"
                  placeholder="Your email address"
                />
              </div>

              <div className="contact__form-group__Z7j3s">
                <label htmlFor="subject" className="contact__form-label__B9k6p">
                  Subject
                </label>
                <input type="text" id="subject" className="contact__form-input__L3j7q" placeholder="Message subject" />
              </div>

              <div className="contact__form-group__Z7j3s">
                <label htmlFor="message" className="contact__form-label__B9k6p">
                  Message
                </label>
                <textarea
                  id="message"
                  className="contact__form-textarea__K5j8q"
                  placeholder="Your message"
                  rows={5}
                ></textarea>
              </div>

              <div className="contact__form-submit__Q7p3s">
                <button
                  className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
                  type="submit"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
