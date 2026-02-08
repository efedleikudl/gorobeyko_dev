"use client"

import type { Translations } from "@/lib/i18n"
import { ProjectSlider } from "@/components/project-slider"

interface ProjectsSectionProps {
  t: Translations
  sectionRef: (el: HTMLElement | null) => void
}

export function ProjectsSection({ t, sectionRef }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.projects.title}</h2>
        <ProjectSlider projects={t.projects.items} />
      </div>
    </section>
  )
}
