"use client"

import Script from "next/script"

export function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js"

  if (!websiteId) {
    return null
  }

  return (
    <Script
      async
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
