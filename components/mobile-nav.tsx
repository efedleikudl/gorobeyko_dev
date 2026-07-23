"use client"

import { useEffect, useRef, useState } from "react"

import type { PortfolioContent, SectionId } from "@/lib/portfolio"

interface MobileNavProps {
  items: PortfolioContent["navigation"]
  labels: PortfolioContent["ui"]
  activeSection: SectionId
  alternatePath: PortfolioContent["alternatePath"]
}

export function MobileNav({ items, labels, activeSection, alternatePath }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    function handleClose() {
      setIsOpen(false)
      if (restoreFocusRef.current) {
        triggerRef.current?.focus()
      }
    }

    function handleCancel(event: Event) {
      event.preventDefault()
      dialog?.close()
    }

    dialog.addEventListener("close", handleClose)
    dialog.addEventListener("cancel", handleCancel)
    return () => {
      dialog.removeEventListener("close", handleClose)
      dialog.removeEventListener("cancel", handleCancel)
    }
  }, [])

  function openDialog() {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    restoreFocusRef.current = true
    dialog.showModal()
    setIsOpen(true)
  }

  function closeDialog(restoreFocus = true) {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    restoreFocusRef.current = restoreFocus
    dialog.close()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="mobile-menu-trigger"
        aria-label={labels.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-dialog"
        onClick={openDialog}
      >
        <span aria-hidden="true" className="menu-lines">
          <span />
          <span />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation-dialog"
        className="mobile-dialog"
        aria-label={labels.mobileNavigation}
      >
        <div className="mobile-dialog-header">
          <span className="mobile-dialog-title">Borys Gorobeyko</span>
          <button type="button" className="dialog-close" aria-label={labels.closeMenu} onClick={() => closeDialog()}>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label={labels.mobileNavigation}>
          <ol>
            {items.map(({ id, label }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => closeDialog(false)}
                >
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <a className="mobile-language-link" href={alternatePath} hrefLang={alternatePath === "/" ? "de" : "en"}>
          {labels.languageLink}
        </a>
      </dialog>
    </>
  )
}
