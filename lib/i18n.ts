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
