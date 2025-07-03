"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedSection from "@/components/animated-section"
import { ExternalLink, Github, Code, Smartphone, Globe, Database, Coffee, ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [

    /*
      fromat:
      {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "web",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      },
      
      */

    
    {
      id: 1,
      title: "Library Management System",
      description: "A collaborative library management system with real-time updates and team features.",
      image: "./library_management_image.jpg?height=300&width=500",
      technologies: ["Java"],
      categories: ["java"],
      github: "https://github.com/JishnudipSaha/Library.Managements-007",
      featured: false,
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A responsive portfolio website with smooth animations and modern design.",
      image: "./placeholder-user.jpg?height=300&width=500",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      categories: ["web"],
      github: "https://github.com/JishnudipSaha/portfolio",
      live: "https://jishnudip-saha-portfolio-website.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      title: "Movie Recommendation System",
      description: "A ML based system that recommends movies by analyzing it and suggesting similar or popular titles.",
      image: "./movie-recomendation-system.jpg?height=300&width=500",
      technologies: ["Python", "scikit-learn", "NLTK"],
      categories: ["data"],
      github: "https://github.com/JishnudipSaha/mrs-project-tmdb",
      live: "https://jishnudip-mrs-project-tmdb.streamlit.app/",
      featured: true,
    },
    {
      id: 4,
      title: "Email/SMS spam prediction",
      description: "A ML based system that classifies weather the email/sms is spam or not.",
      image: "./under_construction_pic.jpg?height=300&width=500",
      technologies: [""],
      categories: ["upcoming", "data"],
      github: "https://github.com",
      live: "",
      featured: true,
    },
  ]

  const categories = [
    { id: "all", label: "All Projects", icon: Code },
    { id: "web", label: "Web Apps", icon: Globe },
    { id: "data", label: "Data Science", icon: Database },
    { id: "java", label: "Java", icon: Coffee },
    { id: "upcoming", label: "Upcoming Projects", icon: ArrowDownToLine },
  ]

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.categories && project.categories.includes(filter))

  const featuredProjects = projects.filter((project) => project.featured)

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
              My Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my technical skills and creative solutions
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        <AnimatedSection className="max-w-7xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div key={project.id} className="project-card group">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "./placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        asChild
                        className="neon-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.live && (
                        <Button
                          asChild
                          variant="outline"
                          className="neon-button-outline border-purple-500 text-purple-400 hover:bg-purple-500/10"
                        >
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection className="max-w-6xl mx-auto py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`filter-tab flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* All Projects Grid */}
        <AnimatedSection className="max-w-7xl mx-auto py-8 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card group">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "./placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-lg transition-colors duration-300 text-sm"
                      >
                        <Github className="w-4 h-4 inline mr-1" />
                        Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-purple-600 hover:bg-purple-500 text-center py-2 rounded-lg transition-colors duration-300 text-sm"
                        >
                          <ExternalLink className="w-4 h-4 inline mr-1" />
                          Live
                        </a>
                      )}
                    </div>
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
