"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
          if (totalScroll > 0) {
            const currentProgress = (window.scrollY / totalScroll) * 100
            setProgress(currentProgress)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(168,85,247,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
