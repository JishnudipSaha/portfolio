"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "scale" | "none"
}

const hiddenStyles = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 translate-x-10",
  right: "opacity-0 -translate-x-10",
  scale: "opacity-0 scale-90",
  none: "",
}

const visibleStyles = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  none: "",
}

export default function SectionWrapper({ children, className = "", delay = 0, direction = "up" }: SectionWrapperProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: "-60px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? visibleStyles[direction] : hiddenStyles[direction]
      }`}
    >
      {children}
    </div>
  )
}
