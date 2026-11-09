"use client"

import { useEffect, useState } from "react"

const roles = [
  "Data Science Undergrad",
  "Full-Stack Web Developer",
  "Machine Learning Builder",
  "Algorithm & Systems Enthusiast",
  "Open Source Contributor",
]

export default function RollingText() {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length)
        setAnimating(false)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center">
      <span className="inline-flex flex-col h-[1.3em] overflow-hidden align-middle">
        <span
          suppressHydrationWarning
          className={`transition-all duration-300 ease-out font-mono font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-300 to-emerald-300 ${
            animating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {roles[index]}
        </span>
      </span>
      <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-terminal-blink align-middle" />
    </span>
  )
}
