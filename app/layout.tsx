import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Geist } from "next/font/google"
import { UmamiAnalytics } from "@/components/umami-analytics"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Borys Gorobeyko - Portfolio",
  description:
    "Portfolio of Borys Gorobeyko - Computer Science graduate and developer focused on AI-powered solutions, frontend and backend development.",
  metadataBase: new URL("https://www.gorobeyko.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Borys Gorobeyko - Portfolio",
    description:
      "Computer Science graduate and developer focused on AI-powered solutions, frontend and backend development.",
    url: "https://www.gorobeyko.com",
    siteName: "Borys Gorobeyko Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Borys Gorobeyko - Portfolio",
    description:
      "Computer Science graduate and developer focused on AI-powered solutions, frontend and backend development.",
  },
  icons: {
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
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Borys Gorobeyko",
  jobTitle: "IT Cloud Engineer",
  url: "https://www.gorobeyko.com",
  sameAs: [
    "https://github.com/efedleikudl",
    "https://linkedin.com/in/borys-gorobeyko-b24ab7279",
    "https://orcid.org/0009-0006-6531-8767",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Coburg University of Applied Sciences",
  },
  knowsAbout: ["Python", "AWS", "MLOps", "LLM", "React", "SQL"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UmamiAnalytics />
        {children}
      </body>
    </html>
  )
}
