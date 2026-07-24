"use client"

import dynamic from "next/dynamic"

const ParticleConstellation = dynamic(
  () => import("@/components/particle-constellation").then(
    (module) => module.ParticleConstellation,
  ),
  { ssr: false },
)

export function PortfolioBackground() {
  return (
    <div className="portfolio-background" aria-hidden="true">
      <ParticleConstellation />
    </div>
  )
}
