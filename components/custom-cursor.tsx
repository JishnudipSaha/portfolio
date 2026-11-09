"use client"

import { useEffect, useRef, useCallback } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const smoothPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const isVisible = useRef(false)

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible.current) {
        isVisible.current = true
        smoothPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const render = () => {
      // Lerp smoothing for outer circle
      const factor = 0.22
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * factor
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * factor

      if (cursorRef.current && dotRef.current && isVisible.current) {
        cursorRef.current.style.transform = `translate3d(${smoothPos.current.x - 17}px, ${smoothPos.current.y - 17}px, 0)`
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    const handleMouseEnter = () => {
      cursorRef.current?.classList.add("hovering")
      dotRef.current?.classList.add("hovering")
      isHovered.current = true
    }

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove("hovering")
      dotRef.current?.classList.remove("hovering")
      isHovered.current = false
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(render)

    const attachListeners = () => {
      const targets = document.querySelectorAll("a, button, [role=button], input, textarea, label, [data-interactive]")
      targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter)
        target.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
    </>
  )
}
