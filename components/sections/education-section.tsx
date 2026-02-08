"use client"

import type { Translations } from "@/lib/i18n"

interface EducationSectionProps {
  t: Translations
  sectionRef: (el: HTMLElement | null) => void
}

export function EducationSection({ t, sectionRef }: EducationSectionProps) {
  return (
    <section id="education" ref={sectionRef} className="py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.education.title}</h2>

        <div className="space-y-8">
          {t.education.items.map((item, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-3">
                <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors duration-500">
                  {item.period}
                </div>
              </div>

              <div className="lg:col-span-9 space-y-2">
                <h3 className="text-lg sm:text-xl font-medium">{item.degree}</h3>
                <div className="text-muted-foreground">{item.institution}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
                {item.thesis && <p className="text-sm text-muted-foreground leading-relaxed pt-2">{item.thesis}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
