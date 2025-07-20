import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jishnudip Saha - Portfolio",
  description: "Undergraduate Student & Passionate Developer - Portfolio showcasing projects, achievements, and skills",
  keywords: "Jishnudip Saha, Portfolio, Developer, Student, Data Science, Programming",
  authors: [{ name: "Jishnudip Saha" }],
  generator: 'Jishnudip Saha'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
