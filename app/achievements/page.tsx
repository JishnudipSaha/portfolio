"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedSection from "@/components/animated-section"
import { Award, Trophy, Medal, Star, Calendar, MapPin } from "lucide-react"

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const achievements = [
    /*
    Format: 

    {
      id: 1,
      title: "First Place - National Coding Championship",
      description: "Won first place in the national level coding competition with over 5000 participants.",
      date: "2024",
      location: "New Delhi, India",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      category: "Competition",
    },

    */
    {
      id: 1,
      title: "Gold medal in java from hackerrank",
      description: "Completed complex java problems in java with in given amount of time.",
      date: "2023",
      location: "Kolkata, India",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      category: "Problem Solving",
    },
    {
      id: 2,
      title: "AEC hardware competition Participant",
      description: "Selected as a participant in Google Summer of Code, contributing to open-source projects.",
      date: "2025",
      location: "Asansole, West Bengal, India",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      category: "Competition",
    },
  ]

  const certifications = [
    /*
    Format: 

    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-DEV-2024-001",
    },

    */
    {
      title: "Ask Questions to Make Data-Driven Decisions",
      issuer: "Google",
      date: "2025",
      credentialId: "DXSOTTIOFTLS",
    },
    {
      title: "Prompt Design in Vertex Ai",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "14806704",
    },
    {
      title: "Foundations: Data, Data, Everywhere",
      issuer: "Google",
      date: "2023",
      credentialId: "KKULYPOUAE17",
    },
    {
      title: "Build Real World AI Applications with Gemini",
      issuer: "Google Cloud",
      date: "2025",
      credentialId: "14831174",
    },
    {
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Forage",
      date: "2025",
      credentialId: "tSnoZBedSrx5NHkLz",
    },
  ]

  const stats = [
    { label: "Competitions Won", value: "5", icon: Trophy },
    { label: "Certifications", value: "12", icon: Award },
    { label: "Open Source Contributions", value: "50+", icon: Star },
    { label: "Projects Completed", value: "15+", icon: Medal },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      <CustomCursor />
      <Navigation />

      <div className="pt-20 px-4">
        {/* Hero Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Achievements
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Milestones and recognition earned through dedication and hard work
            </p>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Achievements Timeline */}
        <AnimatedSection className="max-w-4xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Major Achievements
          </h2>
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className="achievement-card group">
                <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}
                    >
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold mb-2 md:mb-0">{achievement.title}</h3>
                      <div className="flex flex-col md:items-end text-sm text-gray-400">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {achievement.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {achievement.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">{achievement.description}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${achievement.color} text-white`}
                    >
                      {achievement.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Certifications Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-16 pb-32">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                      <p className="text-purple-400 font-medium mb-2">{cert.issuer}</p>
                      <p className="text-gray-400 text-sm mb-2">Issued: {cert.date}</p>
                      <p className="text-gray-500 text-xs">ID: {cert.credentialId}</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
