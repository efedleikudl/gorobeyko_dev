import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"

import "@/app/globals.css"
import { UmamiAnalytics } from "@/components/umami-analytics"
import { getLocalizedMetadata } from "@/lib/metadata"
import { getPersonStructuredData, serializeStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = getLocalizedMetadata("de")

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111111",
}

export default function GermanRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de" className="dark">
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(getPersonStructuredData("de")),
          }}
        />
        <UmamiAnalytics />
        {children}
      </body>
    </html>
  )
}
