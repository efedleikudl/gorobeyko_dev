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
    expect(localePaths).toEqual({ de: "/", en: "/en/" })
    expect(new Set(Object.values(localePaths)).size).toBe(locales.length)
  })

  it.each(locales)("composes complete %s content from stable IDs", (locale) => {
    const content = getPortfolioContent(locale)

    expect(content.navigation.map(({ id }) => id)).toEqual(sectionIds)
    expect(content.experience.map(({ id }) => id)).toEqual(portfolioIds.roles)
    expect(content.projects.map(({ id }) => id)).toEqual(portfolioIds.projects)
    expect(content.skills.map(({ id }) => id)).toEqual(portfolioIds.skills)
    expect(content.education.map(({ id }) => id)).toEqual(portfolioIds.education)
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
    expect(german.experience[1].company).toBe(english.experience[1].company)
  })

  it("includes the current role without invented supporting claims", () => {
    const role = getPortfolioContent("en").experience[0]

    expect(role).toMatchObject({
      id: "cloudopserve",
      title: "IT Cloud Engineer",
      company: "cloudopserve GmbH",
      period: "11/2025 – present",
      achievements: [],
    })
    expect(role.description).toBeUndefined()
    expect(role.location).toBeUndefined()
  })
})
