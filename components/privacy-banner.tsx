"use client"

import { useSyncExternalStore } from "react"

import type { Locale } from "@/lib/portfolio"

interface PrivacyBannerProps {
  locale: Locale
}

const DISMISS_KEY = "bg:privacy_ok"

const copy: Record<Locale, { label: string; text: string; button: string }> = {
  en: {
    label: "Privacy notice",
    text: "Like pretty much every site on the internet, we use cookies.",
    button: "Got it",
  },
  de: {
    label: "Datenschutzhinweis",
    text: "Wie so ziemlich jede Website im Internet verwenden wir Cookies.",
    button: "Alles klar",
  },
}

const listeners = new Set<() => void>()

function subscribe(callback: () => void): () => void {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function isDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1"
  } catch {
    return true
  }
}

// server render: treat as dismissed so nothing is prerendered
function isDismissedServer(): boolean {
  return true
}

function dismiss(): void {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1")
  } catch {
    // ignore
  }
  for (const callback of listeners) callback()
}

export function PrivacyBanner({ locale }: PrivacyBannerProps) {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, isDismissedServer)
  if (dismissed) return null

  const t = copy[locale]

  return (
    <section className="privacy-banner" aria-label={t.label}>
      <div className="privacy-banner-inner">
        <p>{t.text}</p>
        <button type="button" onClick={dismiss}>
          {t.button}
        </button>
      </div>
    </section>
  )
}
