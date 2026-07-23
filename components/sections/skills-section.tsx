import type { PortfolioContent } from "@/lib/portfolio"

interface SkillsSectionProps {
  content: PortfolioContent
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className="content-section" aria-labelledby="skills-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">04</p>
        <h2 id="skills-heading">{content.sectionTitles.skills}</h2>
      </header>

      <ul className="skills-grid">
        {content.skills.map((skill) => (
          <li key={skill.id}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
