import { Navigation } from "@/components/navigation"
import { ParticleBackground } from "@/components/particle-background"
import { ContactSection } from "@/components/sections/contact-section"
import { EducationSection } from "@/components/sections/education-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { LanguagesSection } from "@/components/sections/languages-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PublicationsSection } from "@/components/sections/publications-section"
import { SkillsSection } from "@/components/sections/skills-section"
import type { PortfolioContent } from "@/lib/portfolio"

interface PortfolioPageProps {
  content: PortfolioContent
}

export function PortfolioPage({ content }: PortfolioPageProps) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {content.ui.skipLink}
      </a>

      <ParticleBackground />
      <Navigation
        items={content.navigation}
        labels={content.ui}
        currentLocale={content.locale}
      />

      <main id="main-content" className="site-main" tabIndex={-1}>
        <HeroSection content={content} />
        <ExperienceSection content={content} />
        <ProjectsSection content={content} />
        <SkillsSection content={content} />
        <EducationSection content={content} />
        <PublicationsSection content={content} />
        <LanguagesSection content={content} />
        <ContactSection content={content} />
      </main>

      <div className="page-fade" aria-hidden="true" />
    </div>
  )
}
