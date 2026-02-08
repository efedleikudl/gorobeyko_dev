"use client"

import type { Translations } from "@/lib/i18n"

interface LanguagesSectionProps {
  t: Translations
}

export function LanguagesSection({ t }: LanguagesSectionProps) {
  return (
    <section className="py-20 sm:py-32">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.languages.title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.languages.items.map((lang, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="text-foreground">{lang.name}</div>
                <div className="text-sm text-muted-foreground">{lang.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
