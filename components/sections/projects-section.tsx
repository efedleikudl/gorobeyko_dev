import type { PortfolioContent } from "@/lib/portfolio"

interface ProjectsSectionProps {
  content: PortfolioContent
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section id="projects" className="content-section" aria-labelledby="projects-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">03</p>
        <h2 id="projects-heading">{content.sectionTitles.projects}</h2>
      </header>

      <div className="project-grid">
        {content.projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-heading">
              <p className="project-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3>{project.name}</h3>
                <p className="organization">{project.company}</p>
              </div>
              {"github" in project && project.github && (
                <a
                  className="external-link"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub, ${project.name} (${content.ui.externalLink})`}
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

            <p className="item-description">{project.description}</p>
            <ul className="achievement-list">
              {project.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
            <ul className="tag-list" aria-label={`${project.name}: ${content.ui.technologies}`}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
