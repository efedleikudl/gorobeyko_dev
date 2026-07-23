import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { MobileNav } from "@/components/mobile-nav"
import { Navigation } from "@/components/navigation"
import { getPortfolioContent } from "@/lib/portfolio"

describe("navigation", () => {
  it("tracks the active desktop section while keeping real anchors", () => {
    let notify: IntersectionObserverCallback | undefined
    const observe = vi.fn()

    class ControlledIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        notify = callback
      }
      observe = observe
      disconnect = vi.fn()
      unobserve = vi.fn()
      takeRecords = vi.fn(() => [])
      root = null
      rootMargin = "0px"
      thresholds = [0]
    }

    vi.stubGlobal("IntersectionObserver", ControlledIntersectionObserver)
    const content = getPortfolioContent("en")
    const section = document.createElement("section")
    section.id = "projects"
    document.body.append(section)

    render(<Navigation items={content.navigation} labels={content.ui} currentLocale={content.locale} />)

    const projectLinks = screen.getAllByRole("link", { name: "Projects" })
    expect(projectLinks[0]).toHaveAttribute("href", "#projects")

    act(() => {
      notify?.(
        [{ target: section, isIntersecting: true, intersectionRatio: 0.8 } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(projectLinks[0]).toHaveAttribute("aria-current", "location")
    section.remove()
    vi.unstubAllGlobals()
  })

  it("closes the native mobile dialog with Escape and restores trigger focus", async () => {
    const user = userEvent.setup()
    const content = getPortfolioContent("de")
    render(
      <MobileNav
        items={content.navigation}
        labels={content.ui}
        activeSection="intro"
        currentLocale={content.locale}
      />,
    )

    const trigger = screen.getByRole("button", { name: "Menü öffnen" })
    await user.click(trigger)
    const dialog = screen.getByRole("dialog", { name: "Mobile Seitennavigation" })
    expect(dialog).toHaveAttribute("open")
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    fireEvent(dialog, new Event("cancel", { cancelable: true }))
    expect(dialog).not.toHaveAttribute("open")
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })
})
