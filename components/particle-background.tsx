"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!canvas || reducedMotion.matches) return

    const context = canvas.getContext("2d")
    if (!context) return
    const drawingContext = context

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const mouse = { x: -1000, y: -1000 }
    let particles: Particle[] = []
    let frame = 0
    let running = false

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(42, Math.max(14, Math.floor((width * height) / 32_000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }))
    }

    function draw() {
      const width = window.innerWidth
      const height = window.innerHeight
      drawingContext.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        particle.x = (particle.x + particle.vx + width) % width
        particle.y = (particle.y + particle.vy + height) % height

        if (finePointer.matches) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.hypot(dx, dy)
          if (distance > 0 && distance < 120) {
            const force = (120 - distance) / 120
            particle.x -= (dx / distance) * force * 0.7
            particle.y -= (dy / distance) * force * 0.7
          }
        }

        drawingContext.beginPath()
        drawingContext.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2)
        drawingContext.fillStyle = "rgba(255, 255, 255, 0.18)"
        drawingContext.fill()

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 105) {
            drawingContext.beginPath()
            drawingContext.moveTo(particle.x, particle.y)
            drawingContext.lineTo(other.x, other.y)
            drawingContext.strokeStyle = `rgba(255, 255, 255, ${0.055 * (1 - distance / 105)})`
            drawingContext.stroke()
          }
        }
      })

      if (running) frame = window.requestAnimationFrame(draw)
    }

    function start() {
      if (running || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(draw)
    }

    function stop() {
      running = false
      window.cancelAnimationFrame(frame)
    }

    function handleVisibility() {
      if (document.hidden) stop()
      else start()
    }

    function handleMouseMove(event: MouseEvent) {
      if (finePointer.matches) {
        mouse.x = event.clientX
        mouse.y = event.clientY
      }
    }

    resize()
    start()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      stop()
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("visibilitychange", handleVisibility)
      particles = []
    }
  }, [])

  return (
    <div aria-hidden="true">
      <canvas ref={canvasRef} className="particle-background" />
    </div>
  )
}
