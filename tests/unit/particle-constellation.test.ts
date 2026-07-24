import {
  PolygonMaskInlineArrangement,
  PolygonMaskMoveType,
  PolygonMaskType,
} from "@tsparticles/plugin-polygon-mask"
import { describe, expect, it } from "vitest"

import {
  createParticleOptions,
  KUBERNETES_LOGO_PATH,
} from "@/lib/particle-constellation"

describe("particle constellation", () => {
  it("lays particles out along the Kubernetes helm on a 24-unit viewBox", () => {
    const options = createParticleOptions(false)

    expect(options.polygon).toMatchObject({
      enable: true,
      inline: { arrangement: PolygonMaskInlineArrangement.equidistant },
      move: { radius: 12, type: PolygonMaskMoveType.path },
      type: PolygonMaskType.inline,
    })
    expect(options.polygon.data.path).toBe(KUBERNETES_LOGO_PATH)
    expect(options.polygon.data.size).toEqual({ width: 24, height: 24 })
  })

  it("uses a gentle, tightly-scoped repulse so the cursor nudges instead of plows", () => {
    const options = createParticleOptions(false)

    expect(options.interactivity.events.onHover).toEqual({
      enable: true,
      mode: "repulse",
    })
    // A small radius keeps the affected area close to the cursor.
    expect(options.interactivity.modes.repulse.distance).toBeLessThanOrEqual(60)
    // Keep force below the speed cap so the push follows the easing gradient
    // instead of being clamped to a flat, plow-like shove.
    expect(options.interactivity.modes.repulse.factor)
      .toBeLessThanOrEqual(options.interactivity.modes.repulse.maxSpeed)
  })

  it("restores each particle to its exact anchor so the logo reforms (rigid but elastic)", () => {
    const options = createParticleOptions(false)

    expect(options.interactivity.modes.repulse.restore).toMatchObject({
      enable: true,
      follow: true,
    })
    expect(options.interactivity.modes.repulse.restore.speed).toBeGreaterThan(0)
    // A near-still ambient drift lets the figure hold its shape rigidly.
    expect(options.particles.move.speed).toBeLessThanOrEqual(0.1)
  })

  it("reduces particle work and displacement on narrow screens", () => {
    const desktop = createParticleOptions(false)
    const narrow = createParticleOptions(true)

    expect(narrow.particles.number.value).toBeLessThan(desktop.particles.number.value)
    expect(narrow.interactivity.modes.repulse.distance)
      .toBeLessThan(desktop.interactivity.modes.repulse.distance)
    expect(narrow.polygon.scale).toBeLessThan(desktop.polygon.scale)
  })
})
