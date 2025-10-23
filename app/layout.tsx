import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Geist, Geist as FontGeist, Geist_Mono as FontGeistMono, Source_Serif_4 as FontSourceSerif4 } from 'next/font/google'

// Initialize fonts
const _geist = FontGeist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = FontGeistMono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = FontSourceSerif4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Borys Gorobeyko - Informatiker & KI-Spezialist",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
