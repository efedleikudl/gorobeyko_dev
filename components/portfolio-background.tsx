"use client"

import dynamic from "next/dynamic"

const loadConstellation = () =>
  import("@/components/particle-constellation").then((module) => module.ParticleConstellation)

// Start fetching the engine chunk when this module runs, so its download
// overlaps hydration instead of starting after the island mounts.
if (typeof window !== "undefined") {
  void loadConstellation()
}

const ParticleConstellation = dynamic(loadConstellation, { ssr: false })

export function PortfolioBackground() {
  return (
    <div className="portfolio-background" aria-hidden="true">
      <ParticleConstellation />
    </div>
  )
}
