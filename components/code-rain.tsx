"use client"

import { useEffect, useRef } from "react"

const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&*%=+#."

interface Drop {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops: Drop[] = []

    for (let i = 0; i < cols; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.7,
        length: 5 + Math.floor(Math.random() * 15),
        opacity: 0.05 + Math.random() * 0.12,
      })
    }

    let animId: number

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px "Courier New", monospace`

      for (const drop of drops) {
        for (let i = 0; i < drop.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const yPos = drop.y - i * fontSize
          if (yPos < -fontSize * drop.length || yPos > canvas.height + fontSize) continue

          const distFromHead = i
          const alpha = Math.max(0, 1 - distFromHead / drop.length) * drop.opacity

          if (i === 0) {
            ctx.fillStyle = `rgba(147, 51, 234, ${alpha * 0.8})`
            ctx.shadowColor = "rgba(147, 51, 234, 0.3)"
            ctx.shadowBlur = 8
          } else if (i < 3) {
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`
            ctx.shadowBlur = 0
          } else {
            ctx.fillStyle = `rgba(147, 51, 234, ${alpha * 0.25})`
            ctx.shadowBlur = 0
          }

          ctx.fillText(char, drop.x, yPos)
        }

        drop.y += drop.speed
        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = -drop.length * fontSize
          drop.speed = 0.3 + Math.random() * 0.7
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
      style={{ opacity: 0.6 }}
    />
  )
}
