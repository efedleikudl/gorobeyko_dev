import type { PortfolioContent } from "@/lib/portfolio"

export interface CommandItem {
  id: string
  command: string
  label: string
  href: string
  group: "navigation" | "actions"
  external?: boolean
  keywords?: string
}

export function createCommandItems(content: PortfolioContent): CommandItem[] {
  const labels = content.ui.commandPalette
  const alternateLocale = content.locale === "en" ? "de" : "en"
  const alternateLanguage = alternateLocale === "de" ? "Deutsch" : "English"
  const navigationCommands: CommandItem[] = content.navigation.map(({ id, label }) => ({
    id: `navigate-${id}`,
    command: `go ${id}`,
    label,
    href: `#${id}`,
    group: "navigation",
    keywords: id,
  }))
  const socialCommands: CommandItem[] = content.person.socials.map((social) => ({
    id: `social-${social.id}`,
    command: `open ${social.id}`,
    label: social.name,
    href: social.url,
    group: "actions",
    external: true,
    keywords: social.id,
  }))

  return [
    ...navigationCommands,
    {
      id: "email",
      command: "mail borys",
      label: labels.email,
      href: `mailto:${content.person.email}`,
      group: "actions",
      keywords: "email contact",
    },
    ...socialCommands,
    {
      id: "language",
      command: `lang ${alternateLocale}`,
      label: `${labels.switchLanguage}: ${alternateLanguage}`,
      href: `../${alternateLocale}/`,
      group: "actions",
      keywords: `${alternateLocale} ${alternateLanguage}`,
    },
  ]
}

export function filterCommandItems(
  commands: CommandItem[],
  query: string,
  locale: PortfolioContent["locale"],
) {
  const normalizedQuery = query.trim().toLocaleLowerCase(locale)
  if (!normalizedQuery) return commands

  return commands.filter((item) =>
    `${item.command} ${item.label} ${item.keywords ?? ""}`
      .toLocaleLowerCase(locale)
      .includes(normalizedQuery),
  )
}
