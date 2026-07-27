declare global {
  interface Window {
    umami?: {
      track: (eventName?: string, eventData?: Record<string, unknown>) => void
      identify: (data: Record<string, unknown>) => void
    }
  }
}

export interface AnalyticsEventData {
  section_view: { section: string; index: number }
  outbound_click: { url: string; host: string; kind: string; context: string }
  email_click: { address: string; context: string }
  file_download: { file: string; action: "view" | "download" }
  cta_click: { target: string; label: string }
  language_switch: { to: string; from: string; source: "switcher" | "command" }
  command_palette_open: { source: "shortcut" | "trigger" }
  command_palette_close: {
    reason: "escape" | "backdrop" | "close_button" | "follow" | "shortcut"
  }
  command_run: { commandId: string; group: string; query: string; queryLength: number }
  mobile_nav_toggle: { open: boolean }
  scroll_depth: { percent: number }
  page_exit: { seconds: number; maxScroll: number; lastSection: string }
}

export type AnalyticsEvent = keyof AnalyticsEventData

const UMAMI_ENABLED = Boolean(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID)

type QueuedCall = () => void

const buffer: QueuedCall[] = []
let poller: ReturnType<typeof setInterval> | null = null
let attempts = 0
const POLL_INTERVAL_MS = 200
const MAX_ATTEMPTS = 50

function umami(): Window["umami"] | undefined {
  return typeof window === "undefined" ? undefined : window.umami
}

function flush(): void {
  while (buffer.length > 0) {
    buffer.shift()?.()
  }
}

function stopPolling(): void {
  if (poller !== null) {
    clearInterval(poller)
    poller = null
  }
}

function startPolling(): void {
  if (poller !== null) return
  attempts = 0
  poller = setInterval(() => {
    attempts += 1
    if (umami()) {
      flush()
      stopPolling()
    } else if (attempts >= MAX_ATTEMPTS) {
      buffer.length = 0
      stopPolling()
    }
  }, POLL_INTERVAL_MS)
}

// window.umami is set only after the async script loads.
function enqueue(call: QueuedCall): void {
  if (typeof window === "undefined") return
  if (umami()) {
    call()
    return
  }
  if (!UMAMI_ENABLED) return
  buffer.push(call)
  startPolling()
}

export function track<E extends AnalyticsEvent>(event: E, data: AnalyticsEventData[E]): void {
  enqueue(() => umami()?.track(event, data as Record<string, unknown>))
}

export function identify(traits: Record<string, string | number | boolean>): void {
  enqueue(() => umami()?.identify(traits))
}
