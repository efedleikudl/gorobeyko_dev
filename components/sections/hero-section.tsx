import type { PortfolioContent } from "@/lib/portfolio"

interface HeroSectionProps {
  content: PortfolioContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const { hero, person, about } = content

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
            <a className="primary-action" href="#projects">
              {hero.viewProjects}
              <span aria-hidden="true">↓</span>
            </a>
            <a className="secondary-action" href="#contact">
              {hero.contact}
            </a>
          </div>

          <div className="availability-row">
            <span className="availability">
              <span className="status-dot" aria-hidden="true" />
              {hero.availability}
            </span>
            <span>{person.location}</span>
          </div>
        </div>

        <aside className="hero-aside" aria-label={hero.currentPosition}>
          <div className="hero-aside-section">
            <p className="eyebrow">{hero.currentPosition}</p>
            <p className="current-role">{hero.currentRole.title}</p>
            <p>{hero.currentRole.company}</p>
            <p className="period">{hero.currentRole.period}</p>
          </div>

          <div className="hero-aside-section">
            <p className="eyebrow">{hero.focus}</p>
            <ul className="tag-list" aria-label={hero.focus}>
              {person.focus.map((skill) => (
                <li key={skill}>{skill}</li>
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
