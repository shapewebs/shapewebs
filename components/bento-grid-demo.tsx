"use client"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import "@/styles/components/bento-grid-demo.css"

export default function BentoGridDemo() {
  return (
    <BentoGrid className="bento-grid-demo__container">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "bento-grid-demo__item--span-2" : ""}
        />
      ))}
    </BentoGrid>
  )
}

const Skeleton = () => <div className="bento-grid-demo__skeleton"></div>

// Simple SVG icons for different companies
const TradingIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"></path>
    <path d="M7 16l4-6 4 2 4-8"></path>
  </svg>
)

const ShieldIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const CogIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24m-6.36 0L1.5 6.5m15.5 13l-4.24-4.24m-6.36 0L1.5 17.5"></path>
  </svg>
)

const BuildingIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
    <path d="M6 12H4a2 2 0 0 0-2 2v8h4"></path>
    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"></path>
    <path d="M10 6h4"></path>
    <path d="M10 10h4"></path>
    <path d="M10 14h4"></path>
    <path d="M10 18h4"></path>
  </svg>
)

const FlaskIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3h6v7l4 9H5l4-9V3z"></path>
    <path d="M10 9h4"></path>
  </svg>
)

const GlobeIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M2 12h20"></path>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const DiamondIcon = () => (
  <svg className="bento-grid-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3h12l4 6-10 13L2 9l4-6z"></path>
    <path d="M11 3 8 9l4 13 4-13-3-6"></path>
    <path d="M2 9h20"></path>
  </svg>
)

const items = [
  {
    title: "Stratton Oakmont",
    description: "Premium investment banking and securities trading services for high-net-worth individuals.",
    header: <Skeleton />,
    icon: <TradingIcon />,
  },
  {
    title: "Osborn Industries",
    description: "Advanced aerospace technology and defense systems manufacturing for global markets.",
    header: <Skeleton />,
    icon: <ShieldIcon />,
  },
  {
    title: "Stark Enterprises",
    description: "Cutting-edge technology solutions and innovative engineering for the modern world.",
    header: <Skeleton />,
    icon: <CogIcon />,
  },
  {
    title: "Wayne Enterprises",
    description: "Diversified multinational conglomerate with holdings in real estate, technology, and philanthropy.",
    header: <Skeleton />,
    icon: <BuildingIcon />,
  },
  {
    title: "Umbrella Corporation",
    description: "Pharmaceutical research and biotechnology development for healthcare advancement.",
    header: <Skeleton />,
    icon: <FlaskIcon />,
  },
  {
    title: "Globodyne Systems",
    description: "Enterprise software solutions and global consulting services for Fortune 500 companies.",
    header: <Skeleton />,
    icon: <GlobeIcon />,
  },
  {
    title: "Sterling Cooper & Partners",
    description: "Full-service advertising agency specializing in brand strategy and creative campaigns.",
    header: <Skeleton />,
    icon: <DiamondIcon />,
  },
]
