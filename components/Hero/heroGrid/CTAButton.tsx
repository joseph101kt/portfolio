'use client'

import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Glow } from './Glow'

interface CTAButtonProps {
  children?: React.ReactNode
  color?: string
  flashColor?: string
  breathingRadius?: number
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children = 'Explore My Work',
  color = '#6A6FFF',
  flashColor = '#FFF',
  breathingRadius = 120,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [center, setCenter] = useState<{
    x: number
    y: number
  } | null>(null)

  const [explode, setExplode] = useState(false)

  /* ---------------- Measure Button ---------------- */

  useLayoutEffect(() => {
    if (!btnRef.current) return

    const rect =
      btnRef.current.getBoundingClientRect()

    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
  }, [])

  return (
    <>
      {center && (
        <>
          {/* 🔵 Breathing glow */}
          {!explode && (
            <Glow
              x={center.x}
              y={center.y}
              radius={breathingRadius}
              color={color}
              intensity={1.2}
              blur={28}
              animation={{
                type: 'breathing',
                duration: 2.5,
                strength: 1,
              }}
            />
          )}

          {/* 💥 Explosion flash */}
          {explode && (
            <Glow
              x={center.x}
              y={center.y}
              radius={breathingRadius}
              color={flashColor}
              intensity={1}
              blur={40}
              animation={{
                type: 'explosion',
                duration: 0.9,
                strength: 2,
              }}
            />
          )}
        </>
      )}

      <button
        ref={btnRef}
        onClick={() => {
          setExplode(true)
          setTimeout(() => setExplode(false), 900)
        }}
        className="px-8 py-4 bg-gray-900/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 hover:border-gray-600 transition-colors relative z-20"
      >
        {children}
      </button>
    </>
  )
}
