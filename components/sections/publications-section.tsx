import { linkVariants } from "@heroui/styles/components/link"
import { ArrowUpRight } from "lucide-react"

import type { PortfolioContent } from "@/lib/portfolio"

interface PublicationsSectionProps {
  content: PortfolioContent
}

export function PublicationsSection({ content }: PublicationsSectionProps) {
  const labels = content.publicationLabels
  const link = linkVariants()

  return (
    <section id="publications" className="content-section" aria-labelledby="publications-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">06</p>
        <h2 id="publications-heading">{content.sectionTitles.publications}</h2>
      </header>

      <div className="supporting-grid">
        <div>
          <h3 className="subsection-heading">{labels.heading}</h3>
          <ol className="compact-list">
            {content.publications.map((publication) => (
              <li key={publication.id}>
                <article>
                  <p className="period">{publication.year}</p>
                  <h4>{publication.title}</h4>
                  <p>{publication.authors}</p>
                  <p className="publication-journal">{publication.journal}</p>
                  <p className="publication-links">
                    {"doi" in publication && publication.doi && (
                      <a
                        className={link.base()}
                        href={publication.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {labels.doi}
                        <span className={link.icon()}>
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                        <span className="sr-only"> ({content.ui.externalLink})</span>
                      </a>
                    )}
                    {"pmid" in publication && publication.pmid && `${labels.pmid}: ${publication.pmid}`}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="subsection-heading">{labels.conferencesHeading}</h3>
          <ol className="compact-list">
            {content.conferences.map((conference) => (
              <li key={conference.id}>
                <article>
                  <p className="period">{conference.date}</p>
                  <h4>{conference.name}</h4>
                  <p>{conference.location}</p>
                  {"presentation" in conference && conference.presentation && <p>{conference.presentation}</p>}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
