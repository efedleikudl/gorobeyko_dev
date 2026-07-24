import { cardVariants } from "@heroui/styles/components/card"

import type { PortfolioContent } from "@/lib/portfolio"

interface SkillsSectionProps {
  content: PortfolioContent
}

export function SkillsSection({ content }: SkillsSectionProps) {
  const card = cardVariants({ variant: "transparent" })

  return (
    <section id="skills" className="content-section" aria-labelledby="skills-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">04</p>
        <h2 id="skills-heading">{content.sectionTitles.skills}</h2>
      </header>

      <ul className="skills-grid">
        {content.skills.map((skill) => (
          <li className={`${card.base()} skill-card`} key={skill.id}>
            <div className={`${card.header()} skill-card-header`}>
              <h3 className={card.title()}>{skill.name}</h3>
            </div>
            <div className={`${card.content()} skill-card-content`}>
              <p>{skill.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
