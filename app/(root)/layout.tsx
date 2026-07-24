import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"

import "@/app/globals.css"
import { getLocalizedMetadata } from "@/lib/metadata"

const englishMetadata = getLocalizedMetadata("en")

export const metadata: Metadata = {
  ...englishMetadata,
  robots: {
    index: false,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0e0c",
}

export default function LanguageRedirectLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" data-theme="portfolio">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
