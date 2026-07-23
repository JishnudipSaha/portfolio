import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jishnudip Saha | Portfolio",
  description: "Data Science Student & Developer — building intelligent systems with code",
  keywords: "Jishnudip Saha, portfolio, data science, developer, full-stack, AI, ML",
  openGraph: {
    title: "Jishnudip Saha | Portfolio",
    description: "Data Science Student & Developer",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <Navigation />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
