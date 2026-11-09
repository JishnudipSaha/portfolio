"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
          if (totalScroll > 0) {
            setScrollProgress((scrollY / totalScroll) * 100)
          }
          setVisible(scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  // Circle circumference for r=18: 2 * PI * 18 ≈ 113.1
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 group p-2 rounded-full glass-panel hover:border-purple-400/50 hover:shadow-glow-purple transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
    >
      <svg className="w-11 h-11 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        {/* Track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-white/10 fill-transparent"
          strokeWidth="2.5"
        />
        {/* Progress */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-purple-400 fill-transparent transition-all duration-100"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="w-4 h-4 text-purple-300 absolute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
    </button>
  )
}
