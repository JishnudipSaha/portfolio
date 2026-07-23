"use client"

import { useEffect, useRef } from "react"

const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&*%=+#."

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

    const fontSize = 15
    const cols = Math.floor(window.innerWidth / fontSize)
    const drops: Drop[] = []

    for (let i = 0; i < cols; i++) {
      drops.push({
        x: i * fontSize,
        y: -Math.random() * window.innerHeight,
        speed: 0.4 + Math.random() * 0.6,
        length: 8 + Math.floor(Math.random() * 12),
      })
    }

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.06)`
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      ctx.font = `bold ${fontSize}px "Courier New", "MS Gothic", monospace`
      ctx.textBaseline = "top"

      for (const drop of drops) {
        for (let i = 0; i < drop.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const yPos = drop.y - i * fontSize
          if (yPos < -fontSize * 3 || yPos > window.innerHeight + fontSize) continue

          const distFromHead = i
          const alpha = Math.max(0.15, 1 - distFromHead / drop.length)

          if (i === 0) {
            ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`
          } else if (i < 3) {
            ctx.fillStyle = `rgba(147, 51, 234, ${alpha * 0.7})`
          } else {
            ctx.fillStyle = `rgba(147, 51, 234, ${alpha * 0.3})`
          }

          ctx.fillText(char, drop.x, yPos)
        }

        drop.y += drop.speed
        if (drop.y - drop.length * fontSize > window.innerHeight) {
          drop.y = -drop.length * fontSize
          drop.speed = 0.4 + Math.random() * 0.6
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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.4 }}
    />
  )
}
