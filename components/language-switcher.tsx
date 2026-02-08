"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const languages = [
    { code: "de" as Locale, label: "DE", fullName: "Deutsch" },
    { code: "en" as Locale, label: "EN", fullName: "English" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)

  const close = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, close])

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 flex items-center gap-2"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg
          className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {currentLanguage?.label}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={close} />
          <div className="absolute right-0 mt-2 w-32 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden" role="listbox" aria-label="Select language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLocaleChange(lang.code)
                  close()
                }}
                role="option"
                aria-selected={currentLocale === lang.code}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-200 ${
                  currentLocale === lang.code ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                {lang.fullName}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
