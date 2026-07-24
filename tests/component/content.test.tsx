import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ContactSection } from "@/components/sections/contact-section"
import { PortfolioPage } from "@/components/portfolio-page"
import { CertificatesSection } from "@/components/sections/certificates-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { getPortfolioContent } from "@/lib/portfolio"

describe("localized portfolio sections", () => {
  it("renders direct hero anchors and the professional title", () => {
    render(<HeroSection content={getPortfolioContent("en")} />)

    expect(screen.getByText("Cloud & DevOps Engineer")).toBeVisible()
    expect(screen.getByRole("link", { name: /View projects/ }))
      .toHaveAttribute("href", "#projects")
    expect(screen.getByRole("link", { name: /View projects/ })).toHaveClass("button")
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact")
  })

  it("renders every project with safe external links and HeroUI technology chips", () => {
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
      expect(link).toHaveClass("link")
    })

    const technologies = screen.getByRole("list", {
      name: `${content.projects[0].name}: ${content.ui.technologies}`,
    })
    within(technologies).getAllByRole("listitem").forEach((technology) => {
      expect(technology).toHaveClass("chip")
    })
  })

  it("offers certificate viewing and downloading", () => {
    const content = getPortfolioContent("en")
    render(<CertificatesSection content={content} />)

    expect(
      screen.getByRole("heading", { name: "Linux Foundation Certified IT Associate (LFCA)" }),
    ).toBeVisible()
    expect(screen.getByText("LF-6645sqsb20")).toBeVisible()

    const viewLink = screen.getByRole("link", { name: /View certificate/ })
    expect(viewLink).toHaveAttribute("href", content.certificates[0].href)
    expect(viewLink).toHaveAttribute("target", "_blank")
    expect(viewLink).toHaveAttribute("rel", "noopener noreferrer")
    expect(viewLink).toHaveClass("certificate-view-action")
    expect(viewLink).not.toHaveClass("hero-action", "primary-action")

    const downloadLink = screen.getByRole("link", { name: "Download PDF" })
    expect(downloadLink).toHaveAttribute("href", content.certificates[0].href)
    expect(downloadLink).toHaveAttribute("download")
  })

  it("renders contact details and external profiles without a footer language switcher", () => {
    render(<ContactSection content={getPortfolioContent("de")} />)

    expect(screen.getByRole("link", { name: "E-Mail an Borys Gorobeyko" })).toHaveAttribute(
      "href",
      "mailto:bgorobejko@gmail.com",
    )
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).queryByRole("link", { name: "English" })).not.toBeInTheDocument()
    expect(within(footer).queryByRole("link", { name: "Deutsch" })).not.toBeInTheDocument()

    for (const link of screen.getAllByRole("link", { name: /opens|öffnet/ })) {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    }
  })

  it("renders only the static page background without canvas or injected scroll scripts", () => {
    const { container } = render(<PortfolioPage content={getPortfolioContent("en")} />)

    expect(container.querySelector("canvas")).not.toBeInTheDocument()
    expect(container.querySelector(".particle-layer")).not.toBeInTheDocument()
    expect(container.querySelector(".page-fade")).not.toBeInTheDocument()
    expect(container.querySelector("#portfolio-scroll-spy")).not.toBeInTheDocument()
  })
})
