import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Geist, Geist as FontGeist, Geist_Mono as FontGeistMono, Source_Serif_4 as FontSourceSerif4 } from 'next/font/google'
import { UmamiAnalytics } from "@/components/umami-analytics"

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
  title: "Borys Gorobeyko - Portfolio",
  description: "Portfolio of Borys Gorobeyko - Computer Science graduate and developer focused on AI-powered solutions, frontend and backend development.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <UmamiAnalytics />
        {children}
      </body>
    </html>
  )
}
