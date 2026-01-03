'use client'

import React, {
  CSSProperties,
  FC,
  useEffect,
  useMemo,
  useRef,
} from 'react'

/* =========================================================
   Types
========================================================= */

export type GlowAnimationType =
  | 'breathing'
  | 'explosion'
  | 'none'

export interface GlowAnimationConfig {
  type?: GlowAnimationType
  duration?: number
  strength?: number
}

export interface GlowProps {
  /** Position relative to parent in pixels */
  x?: number
  y?: number

  /** OR position as a ratio (0–1) of parent width/height */
  xRatio?: number
  yRatio?: number

  /** Visuals */
  color?: string
  radius?: number
  intensity?: number
  blur?: number

  /** Animation */
  animation?: GlowAnimationConfig

  /** Behavior flags */
  disabled?: boolean
  smallScreenDisable?: boolean

  /** Styling */
  className?: string
  style?: CSSProperties
}


/* =========================================================
   Utils
========================================================= */

const easeInOutSine = (t: number): number =>
  -(Math.cos(Math.PI * t) - 1) / 2

/* =========================================================
   Component
========================================================= */

export const Glow: FC<GlowProps> = ({
  x = 0,
  y = 0,

  color = '#6A6FFF',
  radius = 200,
  intensity = 1,
  blur = 0,

  animation = { type: 'none', duration: 2, strength: 1 },

  disabled = false,
  smallScreenDisable = false,

  className,
  style,
}) => {
  const glowRef = useRef<HTMLDivElement | null>(null)
  const timeRef = useRef<number>(0)

  /* ---------------- Animation Loop ---------------- */

  useEffect(() => {
    if (
      disabled ||
      animation?.type === 'none' ||
      smallScreenDisable
    ) {
      return
    }

    let rafId: number

    const tick = (now: number) => {
      if (!glowRef.current) return

      if (!timeRef.current) timeRef.current = now
      const elapsed = (now - timeRef.current) / 1000

      const duration = animation.duration ?? 2
      const strength = animation.strength ?? 1

      const t = (elapsed % duration) / duration

      let scale = 1

      if (animation.type === 'breathing') {
        scale = 1 + Math.sin(t * Math.PI * 2) * 0.3 * strength
      }

      if (animation.type === 'explosion') {
        scale = 1 + easeInOutSine(t) * 2 * strength
      }

      glowRef.current.style.transform = `
        translate(-50%, -50%)
        scale(${scale})
      `

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [animation, disabled, smallScreenDisable])

  /* ---------------- Static Styles ---------------- */

  const glowStyle: CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: radius * 2,
      height: radius * 2,
      pointerEvents: 'none',
      borderRadius: '50%',
      filter: blur ? `blur(${blur}px)` : undefined,
      background: `radial-gradient(
        circle,
        ${color} ${intensity * 10}%,
        transparent 70%
      )`,
      transform: 'translate(-50%, -50%)',
      willChange: 'transform',
      ...style,
    }),
    [x, y, radius, color, intensity, blur, style]
  )

  return (
    <div
      ref={glowRef}
      className={className}
      style={glowStyle}
    />
  )
}
