"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const isMobileRef = useRef(false)
  const lastSizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Detect mobile device
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768

    // Set canvas size
    const resizeCanvas = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      // On mobile, ignore small height changes (address bar showing/hiding)
      if (isMobileRef.current) {
        const heightDiff = Math.abs(newHeight - lastSizeRef.current.height)
        const widthDiff = Math.abs(newWidth - lastSizeRef.current.width)

        // Only reinitialize if width changed significantly or height changed by more than 100px
        if (widthDiff < 10 && heightDiff < 100 && lastSizeRef.current.width > 0) {
          // Just update canvas size without reinitializing particles
          canvas.width = newWidth
          canvas.height = newHeight
          return
        }
      }

      canvas.width = newWidth
      canvas.height = newHeight
      lastSizeRef.current = { width: newWidth, height: newHeight }
      isMobileRef.current = newWidth < 768
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
        })
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse on desktop
      if (!isMobileRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme color
      const isDark = document.documentElement.classList.contains("dark")
      const particleColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)"
      const lineColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"

      particlesRef.current.forEach((particle, i) => {
        // Gentle drift
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - only on desktop
        if (!isMobileRef.current) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            particle.x -= Math.cos(angle) * force * 2
            particle.y -= Math.sin(angle) * force * 2
          }
        }

        // Return to base position gently (only if not on mobile for smoother drift)
        if (!isMobileRef.current) {
          const returnForce = 0.02
          particle.x += (particle.baseX - particle.x) * returnForce
          particle.y += (particle.baseY - particle.y) * returnForce
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
          particle.baseX = particle.x
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
          particle.baseY = particle.y
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
