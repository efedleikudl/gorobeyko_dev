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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.reduce<IntersectionObserverEntry | undefined>((current, entry) => {
          if (!entry.isIntersecting) return current
          if (!current || entry.intersectionRatio > current.intersectionRatio) return entry
          return current
        }, undefined)

        if (visible) {
          setActiveSection(visible.target.id as SectionId)
        }
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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
