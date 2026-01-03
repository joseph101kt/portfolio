'use client'

import React, { useEffect, useRef, useState } from 'react'

/* =========================================================
   Canvas Grid
========================================================= */

interface CanvasGridProps {
  rows: number
  cols: number
  size: number
}

const CanvasGrid: React.FC<CanvasGridProps> = ({
  rows,
  cols,
  size,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = cols * size
    canvas.height = rows * size

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(5, 8, 18, 0.9)'

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillRect(
          x * size,
          y * size,
          size - 2,
          size - 2
        )
      }
    }
  }, [rows, cols, size])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10"
    />
  )
}

/* =========================================================
   Responsive Grid
========================================================= */

interface ResponsiveGridProps {
  children?: React.ReactNode
  /** Glow components passed as children */
  glows?: React.ReactNode
}

export const ResponsiveGrid: React.FC<
  ResponsiveGridProps
> = ({ children, glows }) => {
  const [dims, setDims] = useState({
    rows: 16,
    cols: 16,
    size: 50,
  })

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth
      const size =
        width < 640 ? 70 : width < 768 ? 60 : 50

      setDims({
        cols: Math.min(
          Math.ceil(width / size),
          31
        ),
        rows: Math.min(
          Math.ceil(window.innerHeight / size),
          16
        ),
        size,
      })

      setReady(true)
    }

    compute()
    window.addEventListener('resize', compute)
    return () =>
      window.removeEventListener('resize', compute)
  }, [])

return (
<div className="relative w-full h-screen overflow-hidden bg-[#1A2138]">

  {/* 🔥 Glow layer BELOW the grid */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    {glows}
  </div>

  {/* 🧱 Grid canvas */}
  {ready && <CanvasGrid {...dims} />}

  {/* 🧠 UI */}
  <div className="relative z-20">
    {children}
  </div>

</div>
)

}

export default ResponsiveGrid
