"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail, Code, Award, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedSection from "@/components/animated-section"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { label: "Projects Completed", value: "10+", icon: Code },
    { label: "Achievements", value: "12", icon: Award },
    { label: "Years Experience", value: "3", icon: User },
    { label: "Technologies", value: "6+", icon: Briefcase },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <AnimatedSection className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Jishnudip Saha
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Data Science Student & Passionate Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
              Crafting digital experiences with modern technologies. Turning ideas into reality through code and
              creativity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              asChild
              className="neon-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="neon-button-outline border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/jishnu cv.pdf" download>
                <Download className="mr-2 w-5 h-5" />
                Download CV
              </a>
            </Button>
          </div>

          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com/JishnudipSaha"
              className="social-link text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/jishnudipsaha/"
              className="social-link text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="mailto:jishnudip.saha.2004@gmail.com"
              className="social-link text-gray-400 hover:text-pink-400 transition-colors duration-300"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Journey in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Navigation */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Explore My Portfolio
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/about" className="nav-card group">
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <User className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">About Me</h3>
                <p className="text-gray-400">Learn about my background, skills, and passion for technology.</p>
              </div>
            </Link>

            <Link href="/achievements" className="nav-card group">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Achievements</h3>
                <p className="text-gray-400">Discover my accomplishments and recognition in the field.</p>
              </div>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
