"use client"

import { useEffect, useState } from "react"

const codeTokens = [
  "const model = new NeuralNet()",
  "import torch.nn as nn",
  "async/await",
  "git commit -m 'feat: optimize'",
  "O(n log n)",
  "npm run dev",
  "<Component />",
  "λ =>",
  "0x7FFE",
  "Tensor(shape=[32, 128])",
  "SELECT * FROM insights",
  "df.groupby('category')",
  "Next.js 16",
  "TypeScript",
  "cosine_similarity()",
  "useEffect(() => {}, [])",
]

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {codeTokens.map((token, i) => (
        <span
          key={i}
          className="absolute font-mono text-purple-400/[0.04] whitespace-nowrap"
          style={{
            left: `${(i * 6.2) % 95}%`,
            fontSize: `${11 + (i % 4) * 2}px`,
            animation: `float-up ${24 + (i % 8) * 3}s linear ${(i * 2.7) % 18}s infinite`,
          }}
        >
          {token}
        </span>
      ))}
    </div>
  )
}
