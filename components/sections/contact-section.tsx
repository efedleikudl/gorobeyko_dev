import { LanguageSwitcher } from "@/components/language-switcher"
import type { PortfolioContent } from "@/lib/portfolio"

interface ContactSectionProps {
  content: PortfolioContent
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <p className="section-number" aria-hidden="true">08</p>
        <div className="contact-copy">
          <h2 id="contact-heading">{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <a className="email-link" href={`mailto:${content.contact.email}`} aria-label={content.contact.emailLabel}>
            {content.contact.email} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="social-links">
          <p>{content.contact.elsewhere}</p>
          <ul>
            {content.contact.socials.map((social) => (
              <li key={social.id}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.name} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> ({content.ui.externalLink})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <p>© {content.footer.year} Borys Gorobeyko. {content.footer.rights}.</p>
          <p>{content.footer.builtWith}</p>
        </div>
        <LanguageSwitcher currentLocale={content.locale} className="footer-language-switcher" />
      </footer>
    </>
  )
}
