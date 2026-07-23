import type { Metadata } from "next"

import { getPortfolioContent, localePaths, type Locale, sharedPortfolio } from "@/lib/portfolio"

const icons: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
  other: [
    { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
}

export function getLocalizedMetadata(locale: Locale): Metadata {
  const content = getPortfolioContent(locale)
  const canonical = new URL(localePaths[locale], sharedPortfolio.siteUrl).toString()

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    metadataBase: new URL(sharedPortfolio.siteUrl),
    alternates: {
      canonical: localePaths[locale],
      languages: {
        "de-DE": localePaths.de,
        "en-US": localePaths.en,
        "x-default": localePaths.en,
      },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.ogDescription,
      url: canonical,
      siteName: "Borys Gorobeyko Portfolio",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: content.metadata.title,
      description: content.metadata.ogDescription,
    },
    icons,
  }
}
