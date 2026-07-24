import { cardVariants } from "@heroui/styles/components/card"
import { chipVariants } from "@heroui/styles/components/chip"
import { linkVariants } from "@heroui/styles/components/link"
import { separatorVariants } from "@heroui/styles/components/separator"
import { ArrowUpRight } from "lucide-react"

import type { PortfolioContent } from "@/lib/portfolio"

interface ProjectsSectionProps {
  content: PortfolioContent
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  const card = cardVariants({ variant: "secondary" })
  const technologyChip = chipVariants({ color: "accent", size: "sm", variant: "soft" })
  const externalLink = linkVariants()
  const separator = separatorVariants({ variant: "secondary" })

  return (
    <section id="projects" className="content-section" aria-labelledby="projects-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">03</p>
        <h2 id="projects-heading">{content.sectionTitles.projects}</h2>
      </header>

      <div className="project-grid">
        {content.projects.map((project, index) => (
          <article className={`${card.base()} project-card`} key={project.id}>
            <header className={`${card.header()} project-card-header`}>
              <p className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className={card.title()}>{project.name}</h3>
                <p className="organization">{project.company}</p>
              </div>
            </header>

            <div className={`${card.content()} project-card-content`}>
              <p className="item-description">{project.description}</p>
              <ul className="achievement-list">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>

            <div className={`${separator} project-card-separator`} role="separator" />

            <footer className={`${card.footer()} project-card-footer`}>
              {"github" in project && project.github && (
                <a
                  className={`${externalLink.base()} external-link`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub, ${project.name} (${content.ui.externalLink})`}
                >
                  GitHub
                  <span className={externalLink.icon()}>
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </a>
              )}

              <ul
                className="project-tech-list"
                aria-label={`${project.name}: ${content.ui.technologies}`}
              >
                {project.technologies.map((technology) => (
                  <li className={technologyChip.base()} key={technology}>
                    <span className={technologyChip.label()}>{technology}</span>
                  </li>
                ))}
              </ul>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
