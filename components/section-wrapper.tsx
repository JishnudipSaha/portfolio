"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur" | "none"
}

const hiddenStyles = {
  up: "opacity-0 translate-y-8",
  down: "opacity-0 -translate-y-8",
  left: "opacity-0 translate-x-8",
  right: "opacity-0 -translate-x-8",
  scale: "opacity-0 scale-[0.96]",
  blur: "opacity-0 blur-xs translate-y-6",
  none: "",
}

const visibleStyles = {
  up: "opacity-100 translate-y-0",
  down: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  blur: "opacity-100 blur-0 translate-y-0",
  none: "",
}

export default function SectionWrapper({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionWrapperProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Quick initial check if element is already in viewport
    const rect = el.getBoundingClientRect()
    if (rect.top <= window.innerHeight + 100 && rect.bottom >= -100) {
      if (delay > 0) {
        const timer = setTimeout(() => setVisible(true), Math.min(delay * 1000, 200))
        return () => clearTimeout(timer)
      } else {
        setVisible(true)
        return
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay * 1000)
          } else {
            setVisible(true)
          }
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px 80px 0px",
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${className} ${
        visible ? visibleStyles[direction] : hiddenStyles[direction]
      }`}
    >
      {children}
    </div>
  )
}
