"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Stagger offset in seconds, for sequencing siblings. */
  delay?: number
  className?: string
}

/**
 * Scroll-triggered entrance animation.
 *
 * Uses Motion's `whileInView` so the viewport detection, occlusion handling
 * and cleanup are handled by the library rather than a bespoke
 * IntersectionObserver. `once` keeps it calm — sections settle after the
 * first pass instead of re-animating on every scroll direction change.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  // Respect the OS setting: render statically rather than animating opacity.
  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
