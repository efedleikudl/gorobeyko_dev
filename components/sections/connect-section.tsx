"use client"

import Link from "next/link"
import type { Translations, Locale } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

interface ConnectSectionProps {
  t: Translations
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  sectionRef: (el: HTMLElement | null) => void
}

export function ConnectSection({ t, locale, onLocaleChange, sectionRef }: ConnectSectionProps) {
  return (
    <>
      <section id="connect" ref={sectionRef} className="py-20 sm:py-32 opacity-0">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light">{t.contact.title}</h2>

            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{t.contact.description}</p>

              <div className="space-y-4">
                <Link
                  href={`mailto:${t.contact.email}`}
                  className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span className="text-base sm:text-lg">{t.contact.email}</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="text-sm text-muted-foreground font-mono">{t.contact.elsewhere}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.contact.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                    {social.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 sm:py-16 border-t border-border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Borys Gorobeyko. {t.footer.rights}.</div>
            <div className="text-xs text-muted-foreground">{t.footer.builtWith}</div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
          </div>
        </div>
      </footer>
    </>
  )
}
