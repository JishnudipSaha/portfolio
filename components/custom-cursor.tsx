"use client"

import { useEffect, useRef, useCallback } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)

  const update = useCallback(() => {
    if (cursorRef.current && dotRef.current) {
      const { x, y } = pos.current
      cursorRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`
      dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(update)
    }
    const onOver = () => cursorRef.current?.classList.add("hovering")
    const onOut = () => cursorRef.current?.classList.remove("hovering")

    document.addEventListener("mousemove", onMove, { passive: true })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [role=button], input, textarea, label")
      els.forEach((el) => {
        el.addEventListener("mouseenter", onOver, { passive: true })
        el.addEventListener("mouseleave", onOut, { passive: true })
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [update])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  )
}
