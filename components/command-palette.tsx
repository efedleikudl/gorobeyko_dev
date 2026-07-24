"use client"

import { Search, X } from "lucide-react"
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { CommandResults } from "@/components/command-results"
import { createCommandItems, filterCommandItems } from "@/lib/command-palette"
import type { PortfolioContent } from "@/lib/portfolio"

interface CommandPaletteProps {
  content: PortfolioContent
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement &&
    (target.isContentEditable || target.matches("input, textarea, select"))
}

export function CommandPalette({ content }: CommandPaletteProps) {
  const labels = content.ui.commandPalette
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const commands = useMemo(() => createCommandItems(content), [content])
  const filteredCommands = useMemo(
    () => filterCommandItems(commands, query, content.locale),
    [commands, content.locale, query],
  )

  function openPalette() {
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
    setIsOpen(true)
  }

  function dismissPalette() {
    dialogRef.current?.close()
    setIsOpen(false)
    setQuery("")
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  function followCommand() {
    dialogRef.current?.close()
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

  function handleDialogCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    dismissPalette()
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="command-palette-trigger"
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        aria-controls="command-palette-dialog"
        aria-expanded={isOpen}
        onClick={openPalette}
      >
        <span className="command-trigger-prompt" aria-hidden="true">&gt;_</span>
        <span className="command-trigger-label">{labels.trigger}</span>
        <kbd>/</kbd>
      </button>

      <dialog
        ref={dialogRef}
        id="command-palette-dialog"
        className="command-palette-dialog"
        aria-label={labels.label}
        onCancel={handleDialogCancel}
        onClose={() => setIsOpen(false)}
      >
        <div className="command-palette-panel">
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

          <div
            id="command-palette-results"
            className="command-results"
            aria-live="polite"
          >
            <CommandResults
              commands={filteredCommands}
              activeIndex={activeIndex}
              labels={labels}
              externalLinkLabel={content.ui.externalLink}
              onActivate={setActiveIndex}
              onFollow={followCommand}
            />
          </div>

          <footer className="command-palette-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> {labels.move}</span>
            <span><kbd>↵</kbd> {labels.select}</span>
          </footer>
        </div>
      </dialog>
    </>
  )
}
