import { MapPin } from "lucide-react"

import type { PortfolioContent } from "@/lib/portfolio"

interface ExperienceSectionProps {
  content: PortfolioContent
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section id="experience" className="content-section" aria-labelledby="experience-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">02</p>
        <h2 id="experience-heading">{content.sectionTitles.experience}</h2>
      </header>

      <ol className="timeline">
        {content.experience.map((job) => (
          <li key={job.id}>
            <article className="timeline-item">
              <p className="period">{job.period}</p>
              <div className="timeline-content">
                <h3>{job.title}</h3>
                <p className="organization">{job.company}</p>
                {job.location && (
                  <p className="location">
                    <MapPin aria-hidden="true" />
                    {job.location}
                  </p>
                )}
                {job.description && <p className="item-description">{job.description}</p>}
                {job.achievements.length > 0 && (
                  <ul className="achievement-list">
                    {job.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
