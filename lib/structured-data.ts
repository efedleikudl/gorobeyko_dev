import { getPortfolioContent, sharedPortfolio, type Locale } from "@/lib/portfolio"

export function getPersonStructuredData(locale: Locale) {
  const content = getPortfolioContent(locale)

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.person.fullName,
    jobTitle: content.hero.currentRole.title,
    description: content.metadata.description,
    url: new URL(content.path, sharedPortfolio.siteUrl).toString(),
    email: `mailto:${content.person.email}`,
    sameAs: content.person.socials.map((social) => social.url),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: sharedPortfolio.education["computer-science"].institution,
    },
    knowsAbout: content.person.focus,
    inLanguage: locale,
  }
}

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll("&", "\\u0026")
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029")
}
