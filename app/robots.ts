import type { MetadataRoute } from "next"

import { sharedPortfolio } from "@/lib/portfolio"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${sharedPortfolio.siteUrl}/sitemap.xml`,
  }
}
