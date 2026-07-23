import { render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ParticleBackground } from "@/components/particle-background"

const defaultMatchMedia = window.matchMedia
const getContext = vi.mocked(HTMLCanvasElement.prototype.getContext)

afterEach(() => {
  window.matchMedia = defaultMatchMedia
  getContext.mockClear()
})

describe("particle background", () => {
  it("renders as a non-interactive decorative layer", () => {
    const { container } = render(<ParticleBackground />)

    const layer = container.querySelector(".particle-layer")
    const canvas = container.querySelector("canvas")

    expect(layer).toHaveAttribute("aria-hidden", "true")
    expect(canvas).toHaveClass("particle-background")
    expect(canvas).not.toHaveAttribute("tabindex")
  })

  it("does not initialize canvas animation when reduced motion is requested", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(<ParticleBackground />)

    expect(getContext).not.toHaveBeenCalled()
  })
})
