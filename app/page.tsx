"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { getTranslations, detectBrowserLocale, type Locale } from "@/lib/i18n"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSection } from "@/components/sections/hero-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PublicationsSection } from "@/components/sections/publications-section"
import { ConferencesSection } from "@/components/sections/conferences-section"
import { LanguagesSection } from "@/components/sections/languages-section"
import { ConnectSection } from "@/components/sections/connect-section"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  { ssr: false },
)

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [locale, setLocale] = useState<Locale>(detectBrowserLocale())
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const t = getTranslations(locale)

  // Restore persisted locale and set up dark mode
  useEffect(() => {
    const saved = localStorage.getItem("locale")
    if (saved === "de" || saved === "en") {
      setLocale(saved)
    }
    document.documentElement.classList.add("dark")
  }, [])

  // Persist locale and update html lang attribute
  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem("locale", locale)
  }, [locale])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const navSections = ["intro", "experience", "education", "skills", "projects", "publications", "connect"]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <a href="#intro" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:border-border focus:rounded-lg">
        Skip to content
      </a>

      <ParticleBackground />
      <MobileNav t={t} activeSection={activeSection} navSections={navSections} />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block" aria-label="Section navigation">
        <div className="flex flex-col gap-4">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3"
              aria-label={`Navigate to ${section}`}
            >
              <div
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                }`}
              />
              <span
                className={`text-sm font-mono transition-all duration-500 ${
                  activeSection === section
                    ? "text-foreground"
                    : "text-muted-foreground/40 group-hover:text-muted-foreground/60"
                }`}
              >
                {t.nav[section as keyof typeof t.nav]}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-[1]">
        <HeroSection t={t} sectionRef={(el) => { sectionsRef.current[0] = el }} />
        <ExperienceSection t={t} sectionRef={(el) => { sectionsRef.current[1] = el }} />
        <EducationSection t={t} sectionRef={(el) => { sectionsRef.current[2] = el }} />
        <SkillsSection t={t} sectionRef={(el) => { sectionsRef.current[3] = el }} />
        <ProjectsSection t={t} sectionRef={(el) => { sectionsRef.current[4] = el }} />
        <PublicationsSection t={t} sectionRef={(el) => { sectionsRef.current[5] = el }} />
        <ConferencesSection t={t} />
        <LanguagesSection t={t} />
        <ConnectSection t={t} locale={locale} onLocaleChange={setLocale} sectionRef={(el) => { sectionsRef.current[6] = el }} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
