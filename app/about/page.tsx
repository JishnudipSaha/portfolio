"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedSection from "@/components/animated-section"
import { Code, Database, Palette, Server, Smartphone, Globe, BarChart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = [
    { name: "Frontend Development", icon: Code, level: 90, color: "from-purple-500 to-pink-500" },
    { name: "Backend Development", icon: Server, level: 70, color: "from-blue-500 to-cyan-500" },
    { name: "Database Management", icon: Database, level: 80, color: "from-green-500 to-emerald-500" },
    { name: "Data Analysis", icon: BarChart, level: 75, color: "from-orange-500 to-red-500" },
    { name: "Mobile Development", icon: Smartphone, level: 60, color: "from-indigo-500 to-purple-500" },
    { name: "Web Technologies", icon: Globe, level: 80, color: "from-teal-500 to-blue-500" },
  ]

  const technologies = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Pnandas",
    "Matplotlib",
    "Seaborn",
    "Numpy",
    "Java",
    "C++",
    "MongoDB",
    "Git",
    "Figma",
    "Tailwind CSS",
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
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate about creating innovative solutions and pushing the boundaries of technology
            </p>
          </div>
        </AnimatedSection>

        {/* Story Section */}
        <AnimatedSection className="max-w-4xl mx-auto py-16">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
            {/* Profile Picture */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl">
                  <Image
                    src="./placeholder-user.jpg?height=300&width=300" // place for profile pic upload
                    alt="Jishnudip Saha"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    priority
                  />
                </div>
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
                <div className="absolute -inset-4 rounded-full border border-blue-400/20 animate-pulse delay-1000"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              My Story
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Hello! I'm Jishnudip Saha, an enthusiastic undergraduate student at Narula Institute of Technology, currently pursuing a degree in Data Science. 
                From a young age, I’ve been fascinated by how technology can solve real-world problems and enhance lives. 
                This passion drove me to explore a variety of domains—ranging from AI-driven applications to sensor-based hardware projects. 
                My journey began with simple curiosity but quickly evolved into a deep commitment to learning and creating solutions that blend innovation, utility, and social impact.
              </p>
              <p>
                I specialize in building intelligent systems that bridge the gap between hardware and software. 
                Some of my most meaningful projects include a robotic shoe polisher that automatically detects and cleans footwear, 
                a smart EEG-based headband to help individuals with speech impairments communicate, and a mosquito repellent device using automated spraying and UV attraction. 
                I love experimenting with microcontrollers like ESP32, using machine learning, and deploying full-stack applications. 
                I’ve also developed skills in Python, Next.js, embedded systems, and cloud-based platforms—constantly refining my technical toolkit.
              </p>
              <p>
                Beyond coding, I am a collaborative learner and an active participant in tech events, hackathons, and research initiatives. I enjoy contributing to open-source projects, mentoring peers, and pushing boundaries through experimentation. 
                Whether it's working on AI-powered navigation for the visually impaired or exploring the future of health-monitoring wearables, I’m driven by the desire to create meaningful change. 
                My mission is simple: to use technology not just to innovate, but to impact lives—ethically, inclusively, and intelligently.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="w-8 h-8 text-purple-400 mr-4" />
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Technologies Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technologies I Work With
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="tech-tag bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection className="max-w-4xl mx-auto py-16 pb-32">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Bachelor's Degree in Computer Science</h3>
              <p className="text-purple-400 text-lg mb-4">Narula Institute of Technology</p>
              <p className="text-gray-400 mb-6">Expected Graduation: 2027</p>
              <p className="text-gray-300 leading-relaxed">
                Currently pursuing my undergraduate degree with a focus on software development, algorithms, and modern
                web technologies. Maintaining excellent academic performance while actively participating in coding
                competitions and tech communities.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
