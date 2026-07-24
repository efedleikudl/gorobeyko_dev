import { buttonVariants } from "@heroui/styles/components/button"
import { cardVariants } from "@heroui/styles/components/card"
import { ArrowUpRight, BadgeCheck, Download } from "lucide-react"

import type { PortfolioContent } from "@/lib/portfolio"

interface CertificatesSectionProps {
  content: PortfolioContent
}

export function CertificatesSection({ content }: CertificatesSectionProps) {
  const card = cardVariants({ variant: "secondary" })
  const labels = content.certificateLabels

  return (
    <section id="certificates" className="content-section" aria-labelledby="certificates-heading">
      <header className="section-heading">
        <p className="section-number" aria-hidden="true">06</p>
        <h2 id="certificates-heading">{content.sectionTitles.certificates}</h2>
      </header>

      <ul className="certificate-grid">
        {content.certificates.map((certificate) => (
          <li key={certificate.id}>
            <article className={`${card.base()} certificate-card`}>
              <header className={`${card.header()} certificate-card-header`}>
                <span className="certificate-mark" aria-hidden="true">
                  <BadgeCheck />
                </span>
                <div>
                  <p className="certificate-issuer">
                    <span className="sr-only">{labels.issuer}: </span>
                    {certificate.issuer}
                  </p>
                  <h3 className={card.title()}>{certificate.name}</h3>
                </div>
              </header>

              <div className={`${card.content()} certificate-card-content`}>
                <dl>
                  <div>
                    <dt>{labels.issued}</dt>
                    <dd>{certificate.issuedLabel}</dd>
                  </div>
                  <div>
                    <dt>{labels.credentialId}</dt>
                    <dd>{certificate.credentialId}</dd>
                  </div>
                </dl>
              </div>

              <footer className={`${card.footer()} certificate-card-footer`}>
                <a
                  className={`${buttonVariants({ size: "md", variant: "primary" })} certificate-view-action`}
                  href={certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.view}
                  <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> ({content.ui.externalLink})</span>
                </a>
                <a
                  className={buttonVariants({ size: "md", variant: "outline" })}
                  href={certificate.href}
                  download
                >
                  {labels.download}
                  <Download aria-hidden="true" />
                </a>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
