import type React from "react"
import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import ScrollProgress from "@/components/scroll-progress"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jishnudip Saha | Portfolio & Developer Lab",
  description: "Data Science Student & Developer — building intelligent systems, neural models, and high-performance apps with code",
  keywords: "Jishnudip Saha, portfolio, data science, developer, full-stack, AI, ML, software engineer",
  openGraph: {
    title: "Jishnudip Saha | Developer Portfolio",
    description: "Data Science Student & Software Developer",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className="bg-[#050508] text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200"
        suppressHydrationWarning
      >
        <ScrollProgress />
        <Navigation />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
