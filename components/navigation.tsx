"use client"

import { useEffect, useState } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNav } from "@/components/mobile-nav"
import type { Locale, PortfolioContent, SectionId } from "@/lib/portfolio"

interface NavigationProps {
  items: PortfolioContent["navigation"]
  labels: PortfolioContent["ui"]
  currentLocale: Locale
}

export function Navigation({ items, labels, currentLocale }: NavigationProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("intro")

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    function updateActiveSection() {
      if (sections.length === 0) return

      const activationLine = window.innerHeight * 0.34
      const pageHeight = document.documentElement.scrollHeight
      const isAtPageEnd =
        window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 2
      let currentSection = sections[0]

      if (isAtPageEnd) {
        currentSection = sections.at(-1) ?? currentSection
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top > activationLine) break
          currentSection = section
        }
      }

      setActiveSection((current) => {
        const next = currentSection.id as SectionId
        return current === next ? current : next
      })
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(updateActiveSection, {
            rootMargin: "-34% 0px -65%",
            threshold: 0,
          })
        : null

    updateActiveSection()
    sections.forEach((section) => observer?.observe(section))
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)
    window.addEventListener("hashchange", updateActiveSection)
    window.addEventListener("pageshow", updateActiveSection)
    document.addEventListener("scroll", updateActiveSection, { capture: true, passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
      window.removeEventListener("hashchange", updateActiveSection)
      window.removeEventListener("pageshow", updateActiveSection)
      document.removeEventListener("scroll", updateActiveSection, true)
    }
  }, [items])

  return (
    <>
      <nav className="side-navigation" aria-label={labels.sectionNavigation}>
        <ol>
          {items.map(({ id, label }, index) => {
            const isActive = activeSection === id
            return (
              <li key={id}>
                <a href={`#${id}`} aria-current={isActive ? "location" : undefined}>
                  <span className="nav-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-marker" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              </li>
            )
          })}
        </ol>
        <LanguageSwitcher currentLocale={currentLocale} className="side-language-switcher" />
      </nav>

      <MobileNav
        items={items}
        labels={labels}
        activeSection={activeSection}
        currentLocale={currentLocale}
      />
    </>
  )
}
