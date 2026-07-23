"use client"

import { useEffect, useState } from "react"

const elements = [
  "{ }", "< />", "() =>", "npm", "git", ">>", "const", "let",
  "import", "export", "class", "async", "await", "try", "catch",
  "new", "this", "=>", "||", "&&", "/*", "*/", "def", "var",
]

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, i) => (
        <span
          key={i}
          className="absolute text-xs font-mono text-purple-500/10"
          style={{
            left: `${(i * 4.7) % 100}%`,
            fontSize: `${12 + (i % 6) * 2}px`,
            animation: `float-up ${18 + (i % 12) * 2}s linear ${(i * 2.3) % 15}s infinite`,
          }}
        >
          {el}
        </span>
      ))}
    </div>
  )
}
