import type { Locale } from "@/lib/portfolio"

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
] as const

export function LanguageSwitcher({ currentLocale, className = "" }: LanguageSwitcherProps) {
  return (
    <fieldset className={`language-switcher ${className}`.trim()}>
      <legend className="sr-only">Language / Sprache</legend>
      {languages.map(({ code, label, name }) => (
        <a
          key={code}
          href={`../${code}/`}
          hrefLang={code}
          lang={code}
          aria-label={name}
          aria-current={currentLocale === code ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </fieldset>
  )
}
