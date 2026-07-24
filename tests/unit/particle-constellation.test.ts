import {
  PolygonMaskInlineArrangement,
  PolygonMaskMoveType,
  PolygonMaskType,
} from "@tsparticles/plugin-polygon-mask"
import { describe, expect, it } from "vitest"

import { createParticleOptions } from "@/components/particle-constellation"

describe("particle constellation", () => {
  it("uses an inline mask that repulses and then constrains particles back to the figure", () => {
    const options = createParticleOptions(false)

    expect(options.interactivity.events.onHover).toEqual({
      enable: true,
      mode: "repulse",
    })
    expect(options.interactivity.events.onClick).toEqual({
      enable: true,
      mode: "repulse",
    })
    expect(options.polygon).toMatchObject({
      enable: true,
      inline: { arrangement: PolygonMaskInlineArrangement.equidistant },
      move: { radius: 42, type: PolygonMaskMoveType.path },
      type: PolygonMaskType.inline,
    })
    expect(options.polygon.data.path.length).toBeGreaterThan(10)
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
