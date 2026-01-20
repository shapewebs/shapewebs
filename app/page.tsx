"use client"

import { HeroSection } from "@/components/home/hero-section"
import { TechShowcase } from "@/components/home/tech-showcase"
import "@/styles/pages/home/home.css"

export default function HomePage() {
  return (
    <section className="home__container__B8j4p">
      <HeroSection />

      <div className="typography__subtitle__K3n7p">
        <span className="typography__subtitleText__Z5j8q">
          Professional mastery of programming languages and development tools
          <br />
          <span style={{ color: "rgba(var(--color-text-tertiary), 1)" }}>
            for both client-side and server-side
          </span>
        </span>
      </div>

      <TechShowcase />
    </section>
  )
}
