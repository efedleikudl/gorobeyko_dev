"use client"

import { useState, useEffect } from "react"
import type { Translations } from "@/lib/i18n"

interface MobileNavProps {
  t: Translations
  activeSection: string
  navSections: string[]
}

export function MobileNav({ t, activeSection, navSections }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-lg border border-border bg-background/80 backdrop-blur-sm hover:border-muted-foreground/50 transition-all duration-300 lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5 text-foreground transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 lg:hidden" aria-label="Mobile navigation">
            {navSections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
                  setIsOpen(false)
                }}
                className={`text-xl font-light transition-colors duration-300 ${
                  activeSection === section ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {t.nav[section as keyof typeof t.nav]}
              </button>
            ))}
          </nav>
        </>
      )}
    </>
  )
}
