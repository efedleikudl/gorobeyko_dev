import { buttonVariants } from "@heroui/styles/components/button"
import { separatorVariants } from "@heroui/styles/components/separator"
import { ArrowDown, MapPin } from "lucide-react"

import type { PortfolioContent } from "@/lib/portfolio"

interface HeroSectionProps {
  content: PortfolioContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const { hero, person, about } = content
  const asideSeparator = separatorVariants({ variant: "secondary" })

  return (
    <section id="intro" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div className="hero-primary">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading">
            {person.firstName}
            <br />
            <span>{person.lastName}</span>
          </h1>
          <p className="professional-title">{person.professionalTitle}</p>
          <p className="hero-description">{hero.description}</p>

          <div className="hero-actions">
            <a
              className={`${buttonVariants({ size: "lg", variant: "primary" })} hero-action primary-action`}
              href="#projects"
            >
              {hero.viewProjects}
              <ArrowDown aria-hidden="true" />
            </a>
            <a
              className={`${buttonVariants({ size: "lg", variant: "outline" })} hero-action secondary-action`}
              href="#contact"
            >
              {hero.contact}
            </a>
          </div>

          <div className="availability-row">
            <span className="availability">
              <span className="status-dot" aria-hidden="true" />
              {hero.availability}
            </span>
            <span className="hero-location">
              <MapPin aria-hidden="true" />
              {person.location}
            </span>
          </div>
        </div>

        <aside className="hero-aside" aria-label={hero.currentPosition}>
          <div className="current-position">
            <div className="current-position-heading">
              <p className="eyebrow">{hero.currentPosition}</p>
              <span className="current-position-signal" aria-hidden="true" />
            </div>
            <p className="current-role">{hero.currentRole.title}</p>
            <div className="current-position-meta">
              <p>{hero.currentRole.company}</p>
              <p className="period">{hero.currentRole.period}</p>
            </div>
          </div>

          <div className={asideSeparator} role="separator" />

          <div className="focus-strip">
            <p className="eyebrow">{hero.focus}</p>
            <ul className="focus-list" aria-label={hero.focus}>
              {person.focus.map((skill, index) => (
                <li key={skill}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="about-block">
        <p className="section-number" aria-hidden="true">01</p>
        <div>
          <h2>{about.title}</h2>
          <p>{about.content}</p>
        </div>
      </div>
    </section>
  )
}
