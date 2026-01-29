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
            Using proven modern technologies to build fast, resilient websites
          </span>
        </span>
      </div>

      <TechShowcase />
    </section>
  )
}
