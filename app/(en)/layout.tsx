import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"

import "@/app/globals.css"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { PrivacyBanner } from "@/components/privacy-banner"
import { UmamiAnalytics } from "@/components/umami-analytics"
import { getLocalizedMetadata } from "@/lib/metadata"
import { getPersonStructuredData, serializeStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = getLocalizedMetadata("en")

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0e0c",
}

export default function EnglishRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" data-theme="portfolio">
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(getPersonStructuredData("en")),
          }}
        />
        <UmamiAnalytics />
        <AnalyticsTracker locale="en" />
        {children}
        <PrivacyBanner locale="en" />
      </body>
    </html>
  )
}
