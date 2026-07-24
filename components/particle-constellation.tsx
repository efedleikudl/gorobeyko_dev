"use client"

import type { Engine } from "@tsparticles/engine"
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask"
import Particles, { ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useMemo, useSyncExternalStore } from "react"

import { createParticleOptions } from "@/lib/particle-constellation"

async function initializeParticleEngine(engine: Engine) {
  await loadSlim(engine)
  await loadPolygonMaskPlugin(engine)
}

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function hasReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getServerReducedMotion() {
  return true
}

function subscribeToNarrowViewport(callback: () => void) {
  const mediaQuery = window.matchMedia("(max-width: 48rem)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function hasNarrowViewport() {
  return window.matchMedia("(max-width: 48rem)").matches
}

function getServerNarrowViewport() {
  return false
}

export function ParticleConstellation() {
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    hasReducedMotion,
    getServerReducedMotion,
  )
  const isNarrow = useSyncExternalStore(
    subscribeToNarrowViewport,
    hasNarrowViewport,
    getServerNarrowViewport,
  )
  const options = useMemo(() => createParticleOptions(isNarrow), [isNarrow])

  if (reduceMotion) return null

  return (
    <ParticlesProvider init={initializeParticleEngine}>
      <Particles
        id="portfolio-particles"
        className="particle-constellation"
        options={options}
      />
    </ParticlesProvider>
  )
}
