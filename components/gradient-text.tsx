import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  variant?: "purple-cyan" | "cyber" | "emerald" | "amber"
}

const variants = {
  "purple-cyan": "from-purple-400 via-indigo-300 to-cyan-400",
  cyber: "from-purple-400 via-pink-400 to-cyan-400",
  emerald: "from-cyan-400 via-teal-300 to-emerald-400",
  amber: "from-amber-400 via-orange-400 to-rose-400",
}

export default function GradientText({
  children,
  className = "",
  as: Tag = "h2",
  variant = "cyber",
}: GradientTextProps) {
  return (
    <Tag
      className={`bg-gradient-to-r ${variants[variant]} bg-clip-text text-transparent font-bold tracking-tight ${className}`}
    >
      {children}
    </Tag>
  )
}
