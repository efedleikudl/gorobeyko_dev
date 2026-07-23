import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { MobileNav } from "@/components/mobile-nav"
import { Navigation } from "@/components/navigation"
import { getPortfolioContent } from "@/lib/portfolio"

describe("navigation", () => {
  it("tracks the active desktop section while keeping real anchors", () => {
    const content = getPortfolioContent("en")
    const intro = document.createElement("section")
    const projects = document.createElement("section")
    let projectTop = 800

    intro.id = "intro"
    projects.id = "projects"
    vi.spyOn(intro, "getBoundingClientRect").mockReturnValue({ top: -500 } as DOMRect)
    vi.spyOn(projects, "getBoundingClientRect").mockImplementation(
      () => ({ top: projectTop }) as DOMRect,
    )
    document.body.append(intro, projects)

    render(<Navigation items={content.navigation} labels={content.ui} currentLocale={content.locale} />)

    const projectLinks = screen.getAllByRole("link", { name: "Projects" })
    expect(projectLinks[0]).toHaveAttribute("href", "#projects")
    expect(projectLinks[0]).not.toHaveAttribute("aria-current")

    projectTop = 100
    act(() => {
      fireEvent.scroll(document)
    })

    expect(projectLinks[0]).toHaveAttribute("aria-current", "location")
    intro.remove()
    projects.remove()
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
