import type { ISourceOptions } from "@tsparticles/engine"
import {
  PolygonMaskInlineArrangement,
  PolygonMaskMoveType,
  PolygonMaskType,
} from "@tsparticles/plugin-polygon-mask"

const clusterPaths = [
  "M260 172 L336 216 L336 304 L260 348 L184 304 L184 216 Z",
  "M260 40 L294 60 L294 100 L260 120 L226 100 L226 60 Z",
  "M405 125 L439 145 L439 185 L405 205 L371 185 L371 145 Z",
  "M405 315 L439 335 L439 375 L405 395 L371 375 L371 335 Z",
  "M260 400 L294 420 L294 460 L260 480 L226 460 L226 420 Z",
  "M115 315 L149 335 L149 375 L115 395 L81 375 L81 335 Z",
  "M115 125 L149 145 L149 185 L115 205 L81 185 L81 145 Z",
  "M260 226 L289 243 L289 277 L260 294 L231 277 L231 243 Z",
  "M260 172 L260 120",
  "M336 216 L371 185",
  "M336 304 L371 335",
  "M260 348 L260 400",
  "M184 304 L149 335",
  "M184 216 L149 185",
  "M260 226 L260 172",
  "M289 243 L336 216",
  "M289 277 L336 304",
  "M260 294 L260 348",
  "M231 277 L184 304",
  "M231 243 L184 216",
] as const

export function createParticleOptions(isNarrow: boolean) {
  return {
    autoPlay: true,
    clear: true,
    detectRetina: true,
    fpsLimit: 45,
    fullScreen: { enable: false },
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: true, mode: "repulse" },
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true, delay: 0.25 },
      },
      modes: {
        repulse: {
          distance: isNarrow ? 68 : 96,
          duration: 0.7,
          easing: "ease-out-quad",
          factor: 72,
          maxSpeed: 8,
          speed: 1.2,
        },
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      color: { value: "#b9f7d0" },
      links: {
        color: "#b9f7d0",
        distance: isNarrow ? 24 : 31,
        enable: true,
        opacity: 0.1,
        width: 0.7,
      },
      move: {
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: isNarrow ? 0.18 : 0.26,
      },
      number: {
        density: { enable: false },
        value: isNarrow ? 78 : 116,
      },
      opacity: {
        value: { min: 0.16, max: 0.46 },
        animation: {
          enable: true,
          speed: 0.35,
          sync: false,
        },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 0.8, max: 1.8 },
      },
    },
    polygon: {
      data: {
        path: [...clusterPaths],
        size: { width: 520, height: 520 },
      },
      draw: {
        enable: false,
        stroke: {
          color: "#b9f7d0",
          opacity: 0.08,
          width: 0.5,
        },
      },
      enable: true,
      inline: {
        arrangement: PolygonMaskInlineArrangement.equidistant,
      },
      move: {
        radius: isNarrow ? 28 : 42,
        type: PolygonMaskMoveType.path,
      },
      position: {
        x: isNarrow ? 78 : 80,
        y: 50,
      },
      scale: isNarrow ? 0.48 : 0.68,
      type: PolygonMaskType.inline,
    },
    smooth: true,
  } satisfies ISourceOptions & { polygon: object }
}
