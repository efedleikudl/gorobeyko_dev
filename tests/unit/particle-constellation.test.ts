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

  it("uses a strong, scoped repulse so even a fast sweep scatters the figure", () => {
    const options = createParticleOptions(false)
    const { repulse } = options.interactivity.modes

    expect(options.interactivity.events.onHover).toEqual({
      enable: true,
      mode: "repulse",
    })
    // Wide enough to catch particles between frames on a fast move, still local.
    expect(repulse.distance).toBeGreaterThan(56)
    expect(repulse.distance).toBeLessThanOrEqual(90)
    // A punchy per-frame throw so brief contact still displaces particles hard,
    // with factor above the cap so the push holds near max across the radius.
    expect(repulse.maxSpeed).toBeGreaterThanOrEqual(6)
    expect(repulse.factor).toBeGreaterThan(repulse.maxSpeed)
  })

  it("restores each particle to its exact anchor so the logo reforms (rigid but elastic)", () => {
    const options = createParticleOptions(false)

    expect(options.interactivity.modes.repulse.restore).toMatchObject({
      enable: true,
      // Pinned target (not following drift) so the outline reforms exactly.
      follow: false,
    })
    expect(options.interactivity.modes.repulse.restore.speed).toBeGreaterThan(0)
    // Zero ambient drift keeps the figure perfectly rigid between interactions.
    expect(options.particles.move.speed).toBe(0)
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
