import "@/styles/pages/about/about.css"

export default function AboutPage() {
  return (
    <div className="about__container__P7j3s">
      <section className="about__header__Z8k4q">
        <h1 className="about__title__L5m8r">About Us</h1>
        <p className="about__subtitle__K3n7p">Learn more about our company and mission</p>
      </section>

      <section className="about__content__B9j6q">
        <div className="about__section__Q7p3s">
          <h2 className="about__section-title__H5k8q">Our Story</h2>
          <p className="about__paragraph__Z3j7q">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
            erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
          <p className="about__paragraph__Z3j7q">
            Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
            rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non
            venenatis nisl tempor.
          </p>
        </div>

        <div className="about__section__Q7p3s">
          <h2 className="about__section-title__H5k8q">Our Mission</h2>
          <p className="about__paragraph__Z3j7q">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
            erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
        </div>

        <div className="about__section__Q7p3s">
          <h2 className="about__section-title__H5k8q">Our Team</h2>
          <div className="about__team-grid__P5j8s">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="about__team-member__L7k3q">
                <div className="about__team-photo__B9j6p">
                  <div className="about__team-photo-placeholder__Z5k8q"></div>
                </div>
                <h3 className="about__team-name__K3n7p">Team Member {i}</h3>
                <p className="about__team-role__Q7p3s">Position Title</p>
                <p className="about__team-bio__H5j8q">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
