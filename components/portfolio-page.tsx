import { CommandPalette } from "@/components/command-palette"
import { Navigation } from "@/components/navigation"
import { PortfolioBackground } from "@/components/portfolio-background"
import { Reveal } from "@/components/reveal"
import { CertificatesSection } from "@/components/sections/certificates-section"
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
      <PortfolioBackground />

      <a className="skip-link" href="#main-content">
        {content.ui.skipLink}
      </a>

      <Navigation
        items={content.navigation}
        labels={content.ui}
        currentLocale={content.locale}
      />
      <CommandPalette content={content} />

      <main id="main-content" className="site-main" tabIndex={-1}>
        {/* The hero animates via CSS on load, so it is intentionally not
            wrapped — a scroll reveal would fight the entrance animation. */}
        <HeroSection content={content} />
        <Reveal>
          <ExperienceSection content={content} />
        </Reveal>
        <Reveal>
          <ProjectsSection content={content} />
        </Reveal>
        <Reveal>
          <SkillsSection content={content} />
        </Reveal>
        <Reveal>
          <EducationSection content={content} />
        </Reveal>
        <Reveal>
          <CertificatesSection content={content} />
        </Reveal>
        <Reveal>
          <PublicationsSection content={content} />
        </Reveal>
        <Reveal>
          <LanguagesSection content={content} />
        </Reveal>
        <Reveal>
          <ContactSection content={content} />
        </Reveal>
      </main>
    </div>
  )
}
