import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { getPortfolioContent } from "@/lib/portfolio"

describe("localized portfolio sections", () => {
  it("renders direct hero anchors and the professional title", () => {
    render(<HeroSection content={getPortfolioContent("en")} />)

    expect(screen.getByText("Computer Scientist & AI Specialist")).toBeVisible()
    expect(screen.getByRole("link", { name: /View projects/ })).toHaveAttribute("href", "#projects")
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact")
  })

  it("renders every project at once with safe external links", () => {
    const content = getPortfolioContent("en")
    render(<ProjectsSection content={content} />)

    for (const project of content.projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeVisible()
    }

    const links = screen.getAllByRole("link", { name: /GitHub/ })
    expect(links).toHaveLength(2)
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    })
  })

  it("renders contact details, external profiles, and an ordinary language link", () => {
    render(<ContactSection content={getPortfolioContent("de")} />)

    expect(screen.getByRole("link", { name: "E-Mail an Borys Gorobeyko" })).toHaveAttribute(
      "href",
      "mailto:bgorobejko@gmail.com",
    )
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).getByRole("link", { name: "English" })).toHaveAttribute("href", "../en/")
    expect(within(footer).getByRole("link", { name: "Deutsch" })).toHaveAttribute("href", "../de/")
    expect(within(footer).getByRole("link", { name: "Deutsch" })).toHaveAttribute(
      "aria-current",
      "page",
    )

    for (const link of screen.getAllByRole("link", { name: /opens|öffnet/ })) {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    }
  })
})
