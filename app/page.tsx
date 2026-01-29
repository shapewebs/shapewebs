"use client"

import { HomeSectionHero } from "@/components/home/home-section-hero"
import { HomeSectionTools } from "@/components/home/home-section-tools"
import "@/styles/pages/home/home.css"

export default function HomePage() {
  return (
    <HomeSectionHero />
    <HomeSectionTools />
  )
}
