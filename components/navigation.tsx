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
    let animationFrame = 0

    function updateActiveSection() {
      animationFrame = 0
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

    function scheduleUpdate() {
      if (animationFrame !== 0) return
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(scheduleUpdate, {
            rootMargin: "-34% 0px -65%",
            threshold: 0,
          })
        : null

    updateActiveSection()
    sections.forEach((section) => observer?.observe(section))
    document.addEventListener("scroll", scheduleUpdate, { capture: true, passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", scheduleUpdate)
    window.addEventListener("pageshow", scheduleUpdate)

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame)
      }
      observer?.disconnect()
      document.removeEventListener("scroll", scheduleUpdate, true)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", scheduleUpdate)
      window.removeEventListener("pageshow", scheduleUpdate)
    }
  }, [items])

  return (
    <>
      <nav
        className="side-navigation"
        aria-label={labels.sectionNavigation}
        data-active-section={activeSection}
      >
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
