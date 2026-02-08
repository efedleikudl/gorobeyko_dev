"use client"

import type { Translations } from "@/lib/i18n"

interface ConferencesSectionProps {
  t: Translations
}

export function ConferencesSection({ t }: ConferencesSectionProps) {
  return (
    <section className="py-20 sm:py-32">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.conferences.title}</h2>

        <div className="space-y-6">
          {t.conferences.items.map((conf, index) => (
            <div
              key={index}
              className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
            >
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="text-lg font-medium">{conf.name}</h3>
                  <div className="text-sm text-muted-foreground font-mono">{conf.date}</div>
                </div>
                <div className="text-sm text-muted-foreground">{conf.location}</div>
                {conf.presentation && (
                  <p className="text-sm text-muted-foreground leading-relaxed pt-2">{conf.presentation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
