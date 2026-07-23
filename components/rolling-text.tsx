"use client"

import { useEffect, useState } from "react"

const roles = [
  "Data Science Student",
  "Full-Stack Developer",
  "ML Engineer",
  "Open Source Enthusiast",
  "Problem Solver",
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
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex flex-col h-[1.2em] overflow-hidden">
      <span
        className={`transition-all duration-400 ${
          animating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {roles[index]}
      </span>
    </span>
  )
}
