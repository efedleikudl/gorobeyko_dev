"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  depth: number
  radius: number
}

interface Pulse {
  x: number
  y: number
  radius: number
  opacity: number
}

const ACCENT = "188, 214, 193"
const FOREGROUND = "242, 242, 239"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasElement = canvasRef.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!canvasElement || reducedMotion.matches) return

    const canvasContext = canvasElement.getContext("2d")
    if (!canvasContext) return
    const canvas = canvasElement
    const context = canvasContext

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const pointer = {
      active: false,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
    }

    let particles: Particle[] = []
    let pulses: Pulse[] = []
    let viewportWidth = 0
    let viewportHeight = 0
    let animationFrame = 0
    let running = false

    function createParticles(width: number, height: number) {
      const count = Math.min(88, Math.max(24, Math.floor((width * height) / 21_000)))

      particles = Array.from({ length: count }, () => {
        const depth = 0.45 + Math.random() * 0.55

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.19 * depth,
          vy: (Math.random() - 0.5) * 0.19 * depth,
          depth,
          radius: 0.7 + Math.random() * 1.15 * depth,
        }
      })
    }

    function resize() {
      const width = window.innerWidth
      const height = window.innerHeight
      const shouldRecreate =
        particles.length === 0 ||
        Math.abs(width - viewportWidth) > 80 ||
        Math.abs(height - viewportHeight) > 120
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      viewportWidth = width
      viewportHeight = height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (shouldRecreate) createParticles(width, height)
    }

    function drawPointerField() {
      if (!pointer.active) return

      pointer.x += (pointer.targetX - pointer.x) * 0.16
      pointer.y += (pointer.targetY - pointer.y) * 0.16

      const glow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        190,
      )
      glow.addColorStop(0, `rgba(${ACCENT}, 0.055)`)
      glow.addColorStop(0.5, `rgba(${ACCENT}, 0.018)`)
      glow.addColorStop(1, `rgba(${ACCENT}, 0)`)
      context.fillStyle = glow
      context.fillRect(pointer.x - 190, pointer.y - 190, 380, 380)
    }

    function moveParticle(particle: Particle) {
      particle.x += particle.vx
      particle.y += particle.vy

      const margin = 8
      if (particle.x < -margin) particle.x = viewportWidth + margin
      if (particle.x > viewportWidth + margin) particle.x = -margin
      if (particle.y < -margin) particle.y = viewportHeight + margin
      if (particle.y > viewportHeight + margin) particle.y = -margin

      if (!pointer.active) return

      const dx = pointer.x - particle.x
      const dy = pointer.y - particle.y
      const distance = Math.hypot(dx, dy)
      const interactionRadius = 155

      if (distance > 0 && distance < interactionRadius) {
        const force = (1 - distance / interactionRadius) ** 2
        particle.x -= (dx / distance) * force * 1.5
        particle.y -= (dy / distance) * force * 1.5
      }
    }

    function drawParticle(particle: Particle) {
      context.beginPath()
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      context.fillStyle = `rgba(${FOREGROUND}, ${0.2 + particle.depth * 0.34})`
      context.fill()
    }

    function drawConnections(particle: Particle, particleIndex: number) {
      const connectionRadius = viewportWidth < 640 ? 105 : 132

      for (let index = particleIndex + 1; index < particles.length; index += 1) {
        const other = particles[index]
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y)

        if (distance < connectionRadius) {
          const opacity =
            (1 - distance / connectionRadius) * 0.13 * Math.min(particle.depth, other.depth)
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(other.x, other.y)
          context.strokeStyle = `rgba(${FOREGROUND}, ${opacity})`
          context.lineWidth = 0.65
          context.stroke()
        }
      }

      if (!pointer.active) return

      const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
      const pointerConnectionRadius = 180
      if (pointerDistance < pointerConnectionRadius) {
        const opacity = (1 - pointerDistance / pointerConnectionRadius) * 0.28 * particle.depth
        context.beginPath()
        context.moveTo(particle.x, particle.y)
        context.lineTo(pointer.x, pointer.y)
        context.strokeStyle = `rgba(${ACCENT}, ${opacity})`
        context.lineWidth = 0.8
        context.stroke()
      }
    }

    function drawPulses() {
      pulses = pulses.filter((pulse) => pulse.opacity > 0.005)

      for (const pulse of pulses) {
        pulse.radius += 1.65
        pulse.opacity *= 0.955
        context.beginPath()
        context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
        context.strokeStyle = `rgba(${ACCENT}, ${pulse.opacity})`
        context.lineWidth = 1
        context.stroke()
      }
    }

    function draw() {
      context.clearRect(0, 0, viewportWidth, viewportHeight)
      drawPointerField()

      particles.forEach((particle, index) => {
        moveParticle(particle)
        drawConnections(particle, index)
        drawParticle(particle)
      })

      drawPulses()
      if (running) animationFrame = window.requestAnimationFrame(draw)
    }

    function start() {
      if (running || document.hidden) return
      running = true
      animationFrame = window.requestAnimationFrame(draw)
    }

    function stop() {
      running = false
      window.cancelAnimationFrame(animationFrame)
    }

    function handleVisibilityChange() {
      if (document.hidden) stop()
      else start()
    }

    function handlePointerMove(event: PointerEvent) {
      if (!finePointer.matches) return
      pointer.active = true
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    function handlePointerDown(event: PointerEvent) {
      if (!finePointer.matches || event.button !== 0) return
      pulses.push({
        x: event.clientX,
        y: event.clientY,
        radius: 8,
        opacity: 0.28,
      })
    }

    resize()
    start()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      stop()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      particles = []
      pulses = []
    }
  }, [])

  return (
    <div className="particle-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="particle-background" />
    </div>
  )
}
