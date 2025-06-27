"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && cursorDotRef.current) {
      const { x, y } = positionRef.current
      cursorRef.current.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`
      cursorDotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      animationRef.current = requestAnimationFrame(updateCursorPosition)
    },
    [updateCursorPosition],
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const selectors = [
        "a",
        "button",
        ".neon-button",
        ".neon-button-outline",
        ".social-link",
        ".nav-link",
        ".mobile-nav-link",
        ".project-card",
        ".stat-card",
        ".skill-card",
        ".achievement-card",
        ".certification-card",
        ".nav-card",
        ".filter-tab",
        ".tech-tag",
        ".cursor-hover",
      ].join(", ")

      const elements = document.querySelectorAll(selectors)

      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true })
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true })
      })

      return elements
    }

    // Initial setup
    const elements = addHoverListeners()

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave])

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "cursor-hover" : ""} ${isClicking ? "cursor-click" : ""}`}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isHovering ? "cursor-dot-hover" : ""} ${isClicking ? "cursor-dot-click" : ""}`}
      />
    </>
  )
}
