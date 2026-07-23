import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
}

export default function GradientText({ children, className = "", as: Tag = "h2" }: GradientTextProps) {
  return (
    <Tag className={`bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </Tag>
  )
}
