import { describe, expect, it } from "vitest"

import {
  getPortfolioContent,
  localePaths,
  locales,
  portfolioIds,
  sectionIds,
  sharedPortfolio,
} from "@/lib/portfolio"

describe("portfolio content", () => {
  it("defines one static path per supported locale", () => {
    expect(locales).toEqual(["de", "en"])
    expect(localePaths).toEqual({ de: "/de/", en: "/en/" })
    expect(new Set(Object.values(localePaths)).size).toBe(locales.length)
  })

  it.each(locales)("composes complete %s content from stable IDs", (locale) => {
    const content = getPortfolioContent(locale)

    expect(content.navigation.map(({ id }) => id)).toEqual(sectionIds)
    expect(content.experience.map(({ id }) => id)).toEqual(portfolioIds.roles)
    expect(content.projects.map(({ id }) => id)).toEqual(portfolioIds.projects)
    expect(content.skills.map(({ id }) => id)).toEqual(portfolioIds.skills)
    expect(content.education.map(({ id }) => id)).toEqual(portfolioIds.education)
    expect(content.certificates.map(({ id }) => id)).toEqual(portfolioIds.certificates)
    expect(content.publications.map(({ id }) => id)).toEqual(portfolioIds.publications)
    expect(content.conferences.map(({ id }) => id)).toEqual(portfolioIds.conferences)
    expect(content.languages.map(({ id }) => id)).toEqual(portfolioIds.languages)
  })

  it("keeps stable IDs unique within every collection", () => {
    for (const ids of Object.values(portfolioIds)) {
      expect(new Set(ids).size).toBe(ids.length)
    }
    expect(new Set(sectionIds).size).toBe(sectionIds.length)
  })

  it("uses shared facts in both localized compositions", () => {
    const german = getPortfolioContent("de")
    const english = getPortfolioContent("en")

    expect(german.person.email).toBe(sharedPortfolio.person.email)
    expect(english.person.socials).toEqual(sharedPortfolio.person.socials)
    expect(german.projects[0].technologies).toBe(sharedPortfolio.projects["servicenow-anonymizer"].technologies)
    expect(english.publications[0].title).toBe(sharedPortfolio.publications["wound-management-ai"].title)
    expect(english.certificates[0].credentialId).toBe(sharedPortfolio.certificates.lfca.credentialId)
    expect(german.experience[1].company).toBe(english.experience[1].company)
  })

  it("includes the current infrastructure role and DevOps responsibilities", () => {
    const role = getPortfolioContent("en").experience[0]

    expect(role).toMatchObject({
      id: "cloudopserve",
      title: "IT Cloud Engineer",
      company: "cloudopserve GmbH",
      period: "11/2025 – present",
    })
    expect(role.description).toContain("banks and brokerages")
    expect(role.achievements).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Terraform"),
        expect.stringContaining("JS7 JobScheduler"),
      ]),
    )
    expect(role.location).toBeUndefined()
  })

  it("publishes the revised DevOps skill set in both languages", () => {
    const expectedSkillIds = ["terraform", "kubernetes-gitops", "automation", "go"]

    for (const locale of locales) {
      const skills = getPortfolioContent(locale).skills

      expect(skills.map(({ id }) => id)).toEqual(expect.arrayContaining(expectedSkillIds))
      expect(skills.map(({ id }) => id)).not.toEqual(
        expect.arrayContaining(["java", "servicenow", "csharp", "cpp"]),
      )
    }
  })

  it("localizes certificate dates while retaining shared credential facts", () => {
    const german = getPortfolioContent("de").certificates[0]
    const english = getPortfolioContent("en").certificates[0]

    expect(german.issuedLabel).toBe("24. Januar 2026")
    expect(english.issuedLabel).toBe("January 24, 2026")
    expect(german.href).toBe(english.href)
    expect(german.credentialId).toBe(english.credentialId)
  })
})
