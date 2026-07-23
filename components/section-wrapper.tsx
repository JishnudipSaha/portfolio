"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionWrapper({ children, className = "", delay = 0 }: SectionWrapperProps) {
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  )
}
