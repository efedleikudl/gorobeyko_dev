"use client"

import type { Translations } from "@/lib/i18n"

interface ExperienceSectionProps {
  t: Translations
  sectionRef: (el: HTMLElement | null) => void
}

export function ExperienceSection({ t, sectionRef }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">{t.experience.title}</h2>
          <div className="text-sm text-muted-foreground font-mono">{t.experience.period}</div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {t.experience.jobs.map((job, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-3">
                <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-500">
                  {job.period}
                </div>
              </div>

              <div className="lg:col-span-9 space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground">{job.company}</div>
                  <div className="text-sm text-muted-foreground">{job.location}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
