import type { MetadataRoute } from "next"

import { localePaths, sharedPortfolio } from "@/lib/portfolio"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL(localePaths.en, sharedPortfolio.siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL(localePaths.de, sharedPortfolio.siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}
