"use client"

import { useEffect, useRef } from "react"

const chars = "010101<>/{}[];:=*+#λπΔΣφψ0123456789ABCDEF"

interface Drop {
  x: number
  y: number
  speed: number
  length: number
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let dpr = 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 16
    const cols = Math.floor(window.innerWidth / fontSize)
    const drops: Drop[] = []

    for (let i = 0; i < cols; i++) {
      drops.push({
        x: i * fontSize,
        y: -Math.random() * window.innerHeight,
        speed: 0.5 + Math.random() * 0.7,
        length: 8 + Math.floor(Math.random() * 12),
      })
    }

    const draw = () => {
      // Fade out trailing characters with subtle dark mask
      ctx.fillStyle = "rgba(5, 5, 8, 0.08)"
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = "top"

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        // Skip every other column for cleaner, non-cluttered modern look
        if (i % 2 !== 0 && window.innerWidth < 768) continue

        for (let j = 0; j < drop.length; j++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const yPos = drop.y - j * fontSize
          if (yPos < -fontSize * 2 || yPos > window.innerHeight + fontSize) continue

          const distFromHead = j
          const alpha = Math.max(0.08, 1 - distFromHead / drop.length)

          if (j === 0) {
            // Bright cyber cyan head
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.7})`
          } else if (j < 3) {
            // Violet glow middle
            ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.45})`
          } else {
            // Subtle deep indigo tail
            ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 0.2})`
          }

          ctx.fillText(char, drop.x, yPos)
        }

        drop.y += drop.speed
        if (drop.y - drop.length * fontSize > window.innerHeight) {
          drop.y = -drop.length * fontSize
          drop.speed = 0.5 + Math.random() * 0.7
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-35"
    />
  )
}
