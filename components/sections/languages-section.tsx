import type { PortfolioContent } from "@/lib/portfolio"

interface LanguagesSectionProps {
  content: PortfolioContent
}

export function LanguagesSection({ content }: LanguagesSectionProps) {
  return (
    <section id="languages" className="content-section languages-section" aria-labelledby="languages-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">07</p>
        <h2 id="languages-heading">{content.sectionTitles.languages}</h2>
      </header>

      <ul className="language-grid">
        {content.languages.map((language) => (
          <li key={language.id}>
            <span>{language.name}</span>
            <strong>{language.level}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
