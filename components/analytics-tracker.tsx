"use client"

import { useEffect } from "react"

import { identify, track } from "@/lib/analytics"
import type { Locale } from "@/lib/portfolio"

interface AnalyticsTrackerProps {
  locale: Locale
}

const ATTRIBUTION_KEY = "bg:attribution"
const FIRST_SEEN_KEY = "bg:first_seen"
const SCROLL_MILESTONES = [25, 50, 75, 100] as const

export function AnalyticsTracker({ locale }: AnalyticsTrackerProps) {
  useEffect(() => {
    try {
      identifyVisitor(locale)
    } catch {
      // ignore storage errors
    }

    // capture phase; single delegated listener
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest("a")
      if (!anchor) return
      const rawHref = anchor.getAttribute("href")
      if (!rawHref) return
      try {
        classifyAndTrack(anchor, rawHref, locale)
      } catch {
        // ignore
      }
    }
    document.addEventListener("click", onClick, { capture: true })

    const reached = new Set<number>()
    let maxScroll = 0
    let rafId = 0

    const measureScroll = () => {
      rafId = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const percent =
        scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100))
      if (percent > maxScroll) maxScroll = percent
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone)
          track("scroll_depth", { percent: milestone })
        }
      }
      if (reached.size === SCROLL_MILESTONES.length) {
        window.removeEventListener("scroll", onScroll, true)
      }
    }
    const onScroll = () => {
      if (rafId !== 0) return
      rafId = window.requestAnimationFrame(measureScroll)
    }
    window.addEventListener("scroll", onScroll, { capture: true, passive: true })
    measureScroll()

    let engagedMs = 0
    let visibleSince = document.visibilityState === "visible" ? performance.now() : 0
    let exitSent = false

    const accumulate = () => {
      if (visibleSince > 0) {
        engagedMs += performance.now() - visibleSince
        visibleSince = 0
      }
    }
    const sendExit = () => {
      if (exitSent) return
      exitSent = true
      accumulate()
      const lastSection =
        document.querySelector(".side-navigation")?.getAttribute("data-active-section") ?? "intro"
      track("page_exit", {
        seconds: Math.round(engagedMs / 1000),
        maxScroll,
        lastSection,
      })
    }
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        sendExit()
      } else {
        visibleSince = performance.now()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pagehide", sendExit)

    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions)
      window.removeEventListener("scroll", onScroll, true)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pagehide", sendExit)
      if (rafId !== 0) window.cancelAnimationFrame(rafId)
    }
  }, [locale])

  return null
}

function truncate(value: string, max = 200): string {
  return value.length > max ? value.slice(0, max) : value
}

function collectAttribution(params: URLSearchParams, locale: Locale): Record<string, string> {
  const out: Record<string, string> = {}
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
    "gclid",
    "fbclid",
  ]
  for (const key of keys) {
    const value = params.get(key)
    if (value) out[key] = truncate(value)
  }
  const referrer = document.referrer
  if (referrer) {
    try {
      const host = new URL(referrer).hostname
      if (host && host !== window.location.hostname) out.referrer_host = host
    } catch {
      // ignore malformed referrer
    }
  }
  out.landing_path = window.location.pathname
  out.landing_locale = locale
  return out
}

function identifyVisitor(locale: Locale): void {
  const params = new URLSearchParams(window.location.search)

  let firstSeen = window.localStorage.getItem(FIRST_SEEN_KEY)
  const returning = firstSeen !== null
  if (!firstSeen) {
    firstSeen = new Date().toISOString()
    window.localStorage.setItem(FIRST_SEEN_KEY, firstSeen)
  }

  // first-touch, replayed on later loads
  const stored = window.localStorage.getItem(ATTRIBUTION_KEY)
  let attribution: Record<string, string>
  if (stored) {
    attribution = JSON.parse(stored) as Record<string, string>
  } else {
    attribution = collectAttribution(params, locale)
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
  }

  const currentRef = params.get("ref")

  identify({
    ...attribution,
    returning,
    first_seen: firstSeen,
    current_locale: locale,
    ...(currentRef ? { current_ref: truncate(currentRef) } : {}),
  })
}

function outboundKind(host: string): string {
  const h = host.toLowerCase()
  if (h.includes("github.com")) return "github"
  if (h.includes("linkedin.com")) return "linkedin"
  if (h.includes("orcid.org")) return "orcid"
  if (h.includes("doi.org")) return "doi"
  return "other"
}

function classifyAndTrack(anchor: HTMLAnchorElement, rawHref: string, locale: Locale): void {
  const inCommand = anchor.closest("#command-palette-dialog") !== null
  const context = inCommand ? "command" : (anchor.closest("section[id]")?.id ?? "other")

  if (rawHref.startsWith("mailto:")) {
    track("email_click", { address: rawHref.replace(/^mailto:/, ""), context })
    return
  }

  let url: URL
  try {
    url = new URL(rawHref, window.location.href)
  } catch {
    return
  }

  const hasDownload = anchor.hasAttribute("download")
  if (hasDownload || url.pathname.toLowerCase().endsWith(".pdf")) {
    track("file_download", {
      file: url.pathname.split("/").pop() || url.pathname,
      action: hasDownload ? "download" : "view",
    })
    return
  }

  if (url.origin !== window.location.origin) {
    track("outbound_click", {
      url: url.href,
      host: url.hostname,
      kind: outboundKind(url.hostname),
      context,
    })
    return
  }

  const localeMatch = url.pathname.match(/^\/(en|de)\//)
  if (localeMatch && localeMatch[1] !== locale) {
    track("language_switch", {
      to: localeMatch[1],
      from: locale,
      source: inCommand ? "command" : "switcher",
    })
    return
  }

  if (anchor.closest(".hero-actions")) {
    track("cta_click", {
      target: url.hash.replace(/^#/, "") || "intro",
      label: truncate((anchor.textContent ?? "").trim(), 80),
    })
  }
}
