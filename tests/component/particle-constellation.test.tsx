import { act, render } from "@testing-library/react"
import { StrictMode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

const particleMocks = vi.hoisted(() => ({
  destroy: vi.fn(),
  initializePolygonMask: vi.fn(() => Promise.resolve()),
  initializeSlim: vi.fn(() => Promise.resolve()),
  load: vi.fn<(params: unknown) => Promise<{ destroy: () => void } | undefined>>(),
}))

vi.mock("@tsparticles/engine", () => ({
  tsParticles: { load: particleMocks.load },
}))

vi.mock("@tsparticles/plugin-polygon-mask", () => ({
  loadPolygonMaskPlugin: particleMocks.initializePolygonMask,
  PolygonMaskInlineArrangement: { equidistant: "equidistant" },
  PolygonMaskMoveType: { path: "path" },
  PolygonMaskType: { inline: "inline" },
}))

vi.mock("@tsparticles/slim", () => ({
  loadSlim: particleMocks.initializeSlim,
}))

import { ParticleConstellation } from "@/components/particle-constellation"

describe("particle constellation lifecycle", () => {
  let animationFrames: Map<number, FrameRequestCallback>
  let nextAnimationFrame: number

  beforeEach(() => {
    animationFrames = new Map()
    nextAnimationFrame = 0
    particleMocks.destroy.mockReset()
    particleMocks.load.mockReset()
    particleMocks.load.mockResolvedValue({
      destroy: particleMocks.destroy,
    })
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      nextAnimationFrame += 1
      animationFrames.set(nextAnimationFrame, callback)
      return nextAnimationFrame
    })
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((frame) => {
      animationFrames.delete(frame)
    })
  })

  async function flushAnimationFrame() {
    const callbacks = [...animationFrames.values()]
    animationFrames.clear()

    await act(async () => {
      callbacks.forEach((callback) => callback(performance.now()))
      await Promise.resolve()
      await Promise.resolve()
    })
  }

  it("starts one canvas in Strict Mode and fades it in only after its first paint", async () => {
    const { container, unmount } = render(
      <StrictMode>
        <ParticleConstellation />
      </StrictMode>,
    )

    const constellation = container.querySelector(".particle-constellation")
    expect(constellation).not.toHaveClass("particle-constellation-ready")
    expect(particleMocks.load).not.toHaveBeenCalled()

    await flushAnimationFrame()

    expect(particleMocks.load).toHaveBeenCalledTimes(1)
    expect(constellation).not.toHaveClass("particle-constellation-ready")

    await flushAnimationFrame()
    await flushAnimationFrame()

    expect(constellation).toHaveClass("particle-constellation-ready")

    unmount()
    expect(particleMocks.destroy).toHaveBeenCalledTimes(1)
  })

  it("loads the reduced particle profile on narrow screens", async () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(max-width: 48rem)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { unmount } = render(<ParticleConstellation />)

    await flushAnimationFrame()

    const { options } = particleMocks.load.mock.calls[0][0] as {
      options: {
        particles: { number: { value: number } }
        polygon: { scale: number }
      }
    }

    expect(options.particles.number.value).toBe(118)
    expect(options.polygon.scale).toBe(10)

    unmount()
  })
})
