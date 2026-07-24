import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { MobileNav } from "@/components/mobile-nav"
import { Navigation } from "@/components/navigation"
import { getPortfolioContent } from "@/lib/portfolio"

describe("navigation", () => {
  it("tracks the active desktop and mobile section while keeping real anchors", async () => {
    const content = getPortfolioContent("en")
    const intro = document.createElement("section")
    const projects = document.createElement("section")
    const contact = document.createElement("section")
    let projectTop = 800

    intro.id = "intro"
    projects.id = "projects"
    contact.id = "contact"
    vi.spyOn(intro, "getBoundingClientRect").mockReturnValue({ top: -500 } as DOMRect)
    vi.spyOn(projects, "getBoundingClientRect").mockImplementation(
      () => ({ top: projectTop }) as DOMRect,
    )
    vi.spyOn(contact, "getBoundingClientRect").mockReturnValue({ top: 5_000 } as DOMRect)
    document.body.append(intro, projects, contact)

    render(<Navigation items={content.navigation} labels={content.ui} currentLocale={content.locale} />)

    const projectLinks = screen.getAllByRole("link", { name: "Projects" })
    expect(projectLinks[0]).toHaveAttribute("href", "#projects")
    expect(projectLinks[0]).not.toHaveAttribute("aria-current")

    projectTop = 100
    act(() => {
      fireEvent.scroll(document)
    })

    await waitFor(() => {
      projectLinks.forEach((link) => {
        expect(link).toHaveAttribute("aria-current", "location")
      })
    })

    const scrollY = vi.spyOn(window, "scrollY", "get").mockReturnValue(1_200)
    const innerHeight = vi.spyOn(window, "innerHeight", "get").mockReturnValue(800)
    const scrollHeight = vi
      .spyOn(document.documentElement, "scrollHeight", "get")
      .mockReturnValue(2_000)
    act(() => {
      fireEvent.scroll(document)
    })

    await waitFor(() => {
      screen.getAllByRole("link", { name: "Contact" }).forEach((link) => {
        expect(link).toHaveAttribute("aria-current", "location")
      })
    })

    scrollY.mockRestore()
    innerHeight.mockRestore()
    scrollHeight.mockRestore()
    intro.remove()
    projects.remove()
    contact.remove()
  })

  it("closes the HeroUI mobile drawer with Escape and restores trigger focus", async () => {
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
    expect(dialog).toBeVisible()
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
    expect(screen.getByRole("button", { name: "Menü schließen" })).toBeVisible()

    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Mobile Seitennavigation" })).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    })
  })
})
