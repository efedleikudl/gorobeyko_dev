import { PortfolioPage } from "@/components/portfolio-page"
import { getPortfolioContent } from "@/lib/portfolio"

export default function GermanPortfolioPage() {
  return <PortfolioPage content={getPortfolioContent("de")} />
}
