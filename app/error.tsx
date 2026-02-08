"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-light">Something went wrong</h2>
        <button
          onClick={reset}
          className="px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
