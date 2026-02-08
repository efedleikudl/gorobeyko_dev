"use client"

import Link from "next/link"
import type { Translations } from "@/lib/i18n"

interface PublicationsSectionProps {
  t: Translations
  sectionRef: (el: HTMLElement | null) => void
}

export function PublicationsSection({ t, sectionRef }: PublicationsSectionProps) {
  return (
    <section id="publications" ref={sectionRef} className="py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">{t.publications.title}</h2>

        <div className="space-y-8">
          {t.publications.items.map((pub, index) => (
            <article
              key={index}
              className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
            >
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">{pub.year}</div>
                <h3 className="text-lg sm:text-xl font-medium leading-relaxed">{pub.title}</h3>
                <p className="text-sm text-muted-foreground">{pub.authors}</p>
                <p className="text-sm text-muted-foreground italic">{pub.journal}</p>
                {pub.doi && (
                  <Link
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <span>DOI</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                )}
                {pub.pmid && <p className="text-sm text-muted-foreground">PMID: {pub.pmid}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
