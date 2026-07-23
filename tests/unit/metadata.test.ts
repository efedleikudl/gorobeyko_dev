import { describe, expect, it } from "vitest"

import { getLocalizedMetadata } from "@/lib/metadata"
import { getPersonStructuredData, serializeStructuredData } from "@/lib/structured-data"

describe("localized metadata", () => {
  it("uses locale-specific canonical and alternate paths", () => {
    const german = getLocalizedMetadata("de")
    const english = getLocalizedMetadata("en")

    expect(german.alternates?.canonical).toBe("/")
    expect(english.alternates?.canonical).toBe("/en/")
    expect(german.alternates?.languages).toEqual({
      "de-DE": "/",
      "en-US": "/en/",
      "x-default": "/",
    })
    expect(german.openGraph).toMatchObject({ locale: "de_DE", alternateLocale: ["en_US"] })
    expect(english.openGraph).toMatchObject({ locale: "en_US", alternateLocale: ["de_DE"] })
  })

  it("localizes structured data without duplicating personal facts", () => {
    expect(getPersonStructuredData("de")).toMatchObject({
      name: "Borys Gorobeyko",
      inLanguage: "de",
      url: "https://www.gorobeyko.com/",
    })
    expect(getPersonStructuredData("en")).toMatchObject({
      name: "Borys Gorobeyko",
      inLanguage: "en",
      url: "https://www.gorobeyko.com/en/",
    })
  })

  it("escapes values that could terminate an embedded JSON script", () => {
    const serialized = serializeStructuredData({ unsafe: "</script><script>&\u2028\u2029" })

    expect(serialized).not.toContain("</script>")
    expect(serialized).not.toContain("<script>")
    expect(serialized).not.toContain("&")
    expect(serialized).toContain("\\u003c/script\\u003e")
    expect(serialized).toContain("\\u2028")
    expect(serialized).toContain("\\u2029")
  })
})
