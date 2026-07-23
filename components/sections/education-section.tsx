import type { PortfolioContent } from "@/lib/portfolio"

interface EducationSectionProps {
  content: PortfolioContent
}

export function EducationSection({ content }: EducationSectionProps) {
  return (
    <section id="education" className="content-section" aria-labelledby="education-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">05</p>
        <h2 id="education-heading">{content.sectionTitles.education}</h2>
      </header>

      <ol className="timeline compact-timeline">
        {content.education.map((item) => (
          <li key={item.id}>
            <article className="timeline-item">
              <p className="period">{item.period}</p>
              <div className="timeline-content">
                <h3>{item.degree}</h3>
                <p className="organization">{item.institution}</p>
                <p className="location">{item.location}</p>
                {"thesis" in item && item.thesis && <p className="item-description">{item.thesis}</p>}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
