import { PortfolioPage } from "@/components/portfolio-page"
import { getPortfolioContent } from "@/lib/portfolio"

export default function EnglishPortfolioPage() {
  return <PortfolioPage content={getPortfolioContent("en")} />
}
