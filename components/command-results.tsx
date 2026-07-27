import { ArrowUpRight, CornerDownLeft } from "lucide-react"

import type { CommandItem } from "@/lib/command-palette"
import type { PortfolioContent } from "@/lib/portfolio"

interface CommandResultsProps {
  commands: CommandItem[]
  activeIndex: number
  labels: PortfolioContent["ui"]["commandPalette"]
  externalLinkLabel: string
  onActivate: (index: number) => void
  onFollow: (item: CommandItem) => void
}

export function CommandResults({
  commands,
  activeIndex,
  labels,
  externalLinkLabel,
  onActivate,
  onFollow,
}: CommandResultsProps) {
  if (commands.length === 0) {
    return <p className="command-empty">{labels.noResults}</p>
  }

  const groups = [
    { id: "navigation" as const, label: labels.navigation },
    { id: "actions" as const, label: labels.actions },
  ]

  return groups.map((group) => {
    const groupCommands = commands.filter((command) => command.group === group.id)
    if (groupCommands.length === 0) return null

    return (
      <section className="command-group" key={group.id}>
        <h2>{group.label}</h2>
        <ul>
          {groupCommands.map((item) => {
            const itemIndex = commands.indexOf(item)
            return (
              <li key={item.id}>
                <a
                  id={`command-${item.id}`}
                  className={itemIndex === activeIndex ? "is-active" : undefined}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onMouseEnter={() => onActivate(itemIndex)}
                  onClick={() => onFollow(item)}
                >
                  <span>
                    <code>{item.command}</code>
                    <small>{item.label}</small>
                    {item.external && (
                      <span className="sr-only"> ({externalLinkLabel})</span>
                    )}
                  </span>
                  {item.external ? (
                    <ArrowUpRight aria-hidden="true" />
                  ) : (
                    <CornerDownLeft aria-hidden="true" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    )
  })
}
