import de from "@/locales/de.json"
import en from "@/locales/en.json"

export type Locale = "de" | "en"
export type Translations = typeof en

const translations: Record<Locale, Translations> = {
  de,
  en,
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.de
}

export const defaultLocale: Locale = "de"
export const locales: Locale[] = ["de", "en"]

const germanSpeakingRegions = ["de", "at", "ch", "li", "lu", "be"]

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const browserLang = navigator.language.toLowerCase()

  if (browserLang.startsWith("de")) {
    return "de"
  }

  const countryCode = browserLang.split("-")[1]?.toLowerCase()
  if (countryCode && germanSpeakingRegions.includes(countryCode)) {
    return "de"
  }

  return "en"
}
