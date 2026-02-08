"use client"

import type { Translations } from "@/lib/i18n"
import { SkillCard } from "@/components/skill-card"

interface SkillsSectionProps {
  t: Translations
  sectionRef: (el: HTMLElement | null) => void
}

export function SkillsSection({ t, sectionRef }: SkillsSectionProps) {
  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.skills.title}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {t.skills.items.map((skill, index) => (
            <SkillCard key={index} name={skill.name} description={skill.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
