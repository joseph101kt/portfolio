'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Glow } from './Glow'

interface SmoothCursorProps {
  auraColor?: string
  coreColor?: string

  auraRadius?: number
  auraIntensity?: number

  coreRadius?: number
  coreIntensity?: number

  /** Lerp factor (0–1). Lower = smoother */
  smoothness?: number
}

interface Point {
  x: number
  y: number
}

export const SmoothCursor: React.FC<SmoothCursorProps> = ({
  auraColor = '#6A6FFF',
  coreColor = '#6A6FFF',

  auraRadius = 200,
  auraIntensity = 0.12,

  coreRadius = 70,
  coreIntensity = 0.9,

  smoothness = 0.22,
}) => {
  /* =========================================================
     Internal state (render-safe)
  ========================================================= */

  const [position, setPosition] = useState<Point>({
    x: 0,
    y: 0,
  })

  /* =========================================================
     Refs (math-only, no rendering)
  ========================================================= */

  const target = useRef<Point>({ x: 0, y: 0 })
  const current = useRef<Point>({ x: 0, y: 0 })

  /* =========================================================
     Mouse tracking
  ========================================================= */

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    window.addEventListener('mousemove', onMove, {
      passive: true,
    })

    return () =>
      window.removeEventListener('mousemove', onMove)
  }, [])

  /* =========================================================
     Smooth follow loop
  ========================================================= */

  useEffect(() => {
    let rafId: number

    const tick = () => {
      current.current.x +=
        (target.current.x - current.current.x) *
        smoothness
      current.current.y +=
        (target.current.y - current.current.y) *
        smoothness

      // Push *render-safe* values
      setPosition({
        x: current.current.x,
        y: current.current.y,
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [smoothness])

  /* =========================================================
     Render
  ========================================================= */

  return (
    <>
      {/* 🌫 Aura */}
      <Glow
        x={position.x}
        y={position.y}
        radius={auraRadius}
        color={auraColor}
        intensity={auraIntensity}
        blur={48}
        animation={{
          type: 'breathing',
          duration: 4,
          strength: 0.4,
        }}
      />

      {/* 🎯 Core */}
      <Glow
        x={position.x}
        y={position.y}
        radius={coreRadius}
        color={coreColor}
        intensity={coreIntensity}
        blur={12}
      />
    </>
  )
}
