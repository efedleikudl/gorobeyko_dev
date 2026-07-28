"use client"

import { tsParticles, type Container, type Engine } from "@tsparticles/engine"
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask"
import { loadSlim } from "@tsparticles/slim"
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"

import { createParticleOptions } from "@/lib/particle-constellation"

const PARTICLE_CONTAINER_ID = "portfolio-particles"

async function initializeParticleEngine(engine: Engine) {
  await loadSlim(engine)
  await loadPolygonMaskPlugin(engine)
}

let particleEngineInitialization: Promise<void> | undefined

function getParticleEngineInitialization() {
  particleEngineInitialization ??= initializeParticleEngine(tsParticles).catch((error) => {
    particleEngineInitialization = undefined
    throw error
  })

  return particleEngineInitialization
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

function ParticleCanvas({ options }: { options: ReturnType<typeof createParticleOptions> }) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [readyOptions, setReadyOptions] = useState<typeof options | null>(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const targetElement: HTMLDivElement = element

    let container: Container | undefined
    let cancelled = false
    let loadFrame = 0
    let revealFrame = 0

    async function loadParticles() {
      try {
        await getParticleEngineInitialization()

        if (cancelled) return

        const loadedContainer = await tsParticles.load({
          element: targetElement,
          id: PARTICLE_CONTAINER_ID,
          options,
        })

        if (cancelled) {
          loadedContainer?.destroy()
          return
        }

        container = loadedContainer

        // Container.start() schedules its first draw just before it resolves.
        // Two frames ensure the logo has painted before its opacity changes.
        revealFrame = window.requestAnimationFrame(() => {
          revealFrame = window.requestAnimationFrame(() => {
            if (!cancelled) setReadyOptions(options)
          })
        })
      } catch (error) {
        if (!cancelled) console.error("Unable to load the particle constellation", error)
      }
    }

    // React development mode replays effects once. Deferring the expensive
    // load lets the replay cleanup cancel that first pass before it creates a
    // canvas, preventing the visible load-destroy-load sequence.
    loadFrame = window.requestAnimationFrame(() => void loadParticles())

    return () => {
      cancelled = true
      window.cancelAnimationFrame(loadFrame)
      window.cancelAnimationFrame(revealFrame)
      container?.destroy()
    }
  }, [options])

  return (
    <div
      ref={elementRef}
      id={PARTICLE_CONTAINER_ID}
      className={`particle-constellation${
        readyOptions === options ? " particle-constellation-ready" : ""
      }`}
    />
  )
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

  return <ParticleCanvas options={options} />
}
