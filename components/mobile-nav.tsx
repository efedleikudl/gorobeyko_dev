"use client"

import { Button } from "@heroui/react/button"
import { Drawer } from "@heroui/react/drawer"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { track } from "@/lib/analytics"
import type { Locale, PortfolioContent, SectionId } from "@/lib/portfolio"

interface MobileNavProps {
  items: PortfolioContent["navigation"]
  labels: PortfolioContent["ui"]
  activeSection: SectionId
  currentLocale: Locale
}

export function MobileNav({ items, labels, activeSection, currentLocale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    track("mobile_nav_toggle", { open })
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        className="mobile-menu-trigger"
        variant="outline"
        isIconOnly
        aria-label={labels.openMenu}
      >
        <Menu aria-hidden="true" />
      </Button>

      <Drawer.Backdrop variant="blur" className="mobile-drawer-backdrop">
        <Drawer.Content placement="right" className="mobile-drawer-content">
          <Drawer.Dialog
            className="mobile-drawer-dialog"
            aria-label={labels.mobileNavigation}
          >
            <Drawer.Header className="mobile-drawer-header">
              <span className="mobile-drawer-title">Borys Gorobeyko</span>
              <Button
                slot="close"
                className="mobile-drawer-close"
                variant="outline"
                isIconOnly
                aria-label={labels.closeMenu}
              >
                <X aria-hidden="true" />
              </Button>
            </Drawer.Header>

            <Drawer.Body className="mobile-drawer-body">
              <nav aria-label={labels.mobileNavigation}>
                <ol>
                  {items.map(({ id, label }, index) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={activeSection === id ? "location" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        <span aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Drawer.Body>

            <Drawer.Footer className="mobile-drawer-footer">
              <LanguageSwitcher
                currentLocale={currentLocale}
                className="mobile-language-switcher"
              />
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
