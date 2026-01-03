'use client'

import React from 'react'
import { CTAButton } from './heroGrid/CTAButton'
import ResponsiveGrid from './heroGrid/ResponsiveGrid'
import { SmoothCursor } from './heroGrid/SmoothCursor'
import { Glow } from './heroGrid/Glow'

/* =========================================================
   Hero Section
========================================================= */

export const HeroSection2: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
<ResponsiveGrid
  glows={
    <>
      {/* Cursor glow */}
      <SmoothCursor />
    </>
  }
>
  {/* CTA */}
  <div
    className="absolute z-20"
    style={{
      left: '50%',
      top: '75%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <CTAButton />
  </div>
</ResponsiveGrid>

    </div>
  )
}

export default HeroSection2
