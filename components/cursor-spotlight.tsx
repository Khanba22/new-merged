"use client"

import { useEffect, useState } from "react"

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-0 sm:opacity-100"
      style={{
        background: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.08), transparent 100%)`,
      }}
    />
  )
}

