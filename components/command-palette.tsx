"use client"

import { ArrowUpRight, CornerDownLeft, Search, X } from "lucide-react"
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import type { PortfolioContent } from "@/lib/portfolio"

interface CommandPaletteProps {
  content: PortfolioContent
}

interface CommandItem {
  id: string
  command: string
  label: string
  href: string
  group: "navigation" | "actions"
  external?: boolean
  keywords?: string
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement &&
    (target.isContentEditable || target.matches("input, textarea, select"))
}

export function CommandPalette({ content }: CommandPaletteProps) {
  const labels = content.ui.commandPalette
  const alternateLocale = content.locale === "en" ? "de" : "en"
  const alternateLanguage = alternateLocale === "de" ? "Deutsch" : "English"
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const commands = useMemo<CommandItem[]>(() => {
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
  }, [
    alternateLanguage,
    alternateLocale,
    content.navigation,
    content.person.email,
    content.person.socials,
    labels.email,
    labels.switchLanguage,
  ])

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(content.locale)
    if (!normalizedQuery) return commands

    return commands.filter((item) =>
      `${item.command} ${item.label} ${item.keywords ?? ""}`
        .toLocaleLowerCase(content.locale)
        .includes(normalizedQuery),
    )
  }, [commands, content.locale, query])

  function openPalette() {
    setIsOpen(true)
  }

  function dismissPalette() {
    setIsOpen(false)
    setQuery("")
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  function followCommand() {
    setIsOpen(false)
    setQuery("")
  }

  function moveActiveCommand(nextIndex: number) {
    setActiveIndex(nextIndex)
    const nextCommand = filteredCommands[nextIndex]

    window.requestAnimationFrame(() => {
      document
        .getElementById(`command-${nextCommand.id}`)
        ?.scrollIntoView?.({ block: "nearest" })
    })
  }

  useEffect(() => {
    function handleGlobalShortcut(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault()
        dismissPalette()
        return
      }

      const togglesPalette = (event.metaKey || event.ctrlKey) &&
        event.key.toLocaleLowerCase() === "k"
      const opensPalette = event.key === "/" && !isEditableTarget(event.target)

      if (!togglesPalette && !opensPalette) return

      event.preventDefault()
      if (isOpen) {
        dismissPalette()
      } else {
        openPalette()
      }
    }

    window.addEventListener("keydown", handleGlobalShortcut)
    return () => window.removeEventListener("keydown", handleGlobalShortcut)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && filteredCommands.length > 0) {
      event.preventDefault()
      moveActiveCommand((activeIndex + 1) % filteredCommands.length)
    } else if (event.key === "ArrowUp" && filteredCommands.length > 0) {
      event.preventDefault()
      moveActiveCommand(
        activeIndex === 0 ? filteredCommands.length - 1 : activeIndex - 1,
      )
    } else if (event.key === "Enter" && filteredCommands[activeIndex]) {
      event.preventDefault()
      document.getElementById(`command-${filteredCommands[activeIndex].id}`)?.click()
    }
  }

  function handlePanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) return

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'input, button, a[href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("disabled"))
    const first = focusable[0]
    const last = focusable.at(-1)

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) dismissPalette()
  }

  const groups = [
    { id: "navigation" as const, label: labels.navigation },
    { id: "actions" as const, label: labels.actions },
  ]

  return (
    <>
      <button
        ref={triggerRef}
        className="command-palette-trigger"
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={openPalette}
      >
        <span className="command-trigger-prompt" aria-hidden="true">&gt;_</span>
        <span className="command-trigger-label">{labels.trigger}</span>
        <kbd>/</kbd>
      </button>

      {isOpen && (
        <div className="command-palette-backdrop" onMouseDown={handleBackdropClick}>
          <div
            ref={panelRef}
            className="command-palette-panel"
            role="dialog"
            aria-modal="true"
            aria-label={labels.label}
            onKeyDown={handlePanelKeyDown}
          >
            <header className="command-palette-header">
              <div className="command-window-title" aria-hidden="true">
                <span className="command-window-mark">&gt;_</span>
                <span>borys@portfolio:~</span>
              </div>
              <button
                className="command-palette-close"
                type="button"
                aria-label={labels.close}
                onClick={dismissPalette}
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="command-search">
              <Search aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder={labels.placeholder}
                aria-label={labels.placeholder}
                aria-controls="command-palette-results"
                aria-activedescendant={
                  filteredCommands[activeIndex]
                    ? `command-${filteredCommands[activeIndex].id}`
                    : undefined
                }
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={handleInputKeyDown}
              />
              <kbd>esc</kbd>
            </div>

            <div id="command-palette-results" className="command-results" aria-live="polite">
              {filteredCommands.length === 0 ? (
                <p className="command-empty">{labels.noResults}</p>
              ) : (
                groups.map((group) => {
                  const groupCommands = filteredCommands.filter(
                    (command) => command.group === group.id,
                  )
                  if (groupCommands.length === 0) return null

                  return (
                    <section className="command-group" key={group.id}>
                      <h2>{group.label}</h2>
                      <ul>
                        {groupCommands.map((item) => {
                          const itemIndex = filteredCommands.indexOf(item)
                          return (
                            <li key={item.id}>
                              <a
                                id={`command-${item.id}`}
                                className={itemIndex === activeIndex ? "is-active" : undefined}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                onMouseEnter={() => setActiveIndex(itemIndex)}
                                onClick={followCommand}
                              >
                                <span>
                                  <code>{item.command}</code>
                                  <small>{item.label}</small>
                                  {item.external && (
                                    <span className="sr-only">
                                      {" "}({content.ui.externalLink})
                                    </span>
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
              )}
            </div>

            <footer className="command-palette-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> {labels.move}</span>
              <span><kbd>↵</kbd> {labels.select}</span>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
