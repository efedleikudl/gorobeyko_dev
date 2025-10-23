import de from "@/locales/de.json"
import en from "@/locales/en.json"

export type Locale = "de" | "en"

const translations = {
  de,
  en,
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.de
}

export const defaultLocale: Locale = "de"
export const locales: Locale[] = ["de", "en"]

// German-speaking countries: Germany, Austria, Switzerland, Liechtenstein, Luxembourg, Belgium
const germanSpeakingRegions = ["de", "at", "ch", "li", "lu", "be"]

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const browserLang = navigator.language.toLowerCase()

  // Check if the browser language starts with 'de' (e.g., 'de', 'de-DE', 'de-AT', 'de-CH')
  if (browserLang.startsWith("de")) {
    return "de"
  }

  // Check if the country code matches German-speaking countries
  const countryCode = browserLang.split("-")[1]?.toLowerCase()
  if (countryCode && germanSpeakingRegions.includes(countryCode)) {
    return "de"
  }

  // All other languages default to English
  return "en"
}
