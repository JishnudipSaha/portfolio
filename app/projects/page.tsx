"use client"

import { useState } from "react"
import { Code, Globe, Database, Coffee, ArrowDownToLine } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    id: 1, title: "Library Management System",
    description: "A collaborative library management system with real-time updates and team features using Java.",
    image: "./library_management_image.jpg",
    technologies: ["Java", "OOP", "File I/O"],
    categories: ["java"],
    github: "https://github.com/JishnudipSaha/Library.Managements-007",
  },
  {
    id: 2, title: "Portfolio Website",
    description: "A responsive portfolio with smooth animations and modern dark-themed design.",
    image: "./placeholder-user.jpg",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    categories: ["web"],
    github: "https://github.com/JishnudipSaha/portfolio",
    live: "https://jishnudip-saha-portfolio-website.vercel.app/",
  },
  {
    id: 3, title: "Movie Recommendation System",
    description: "ML-based system that recommends movies by analyzing content and suggesting similar titles.",
    image: "./movie-recomendation-system.jpg",
    technologies: ["Python", "scikit-learn", "NLTK"],
    categories: ["data"],
    github: "https://github.com/JishnudipSaha/mrs-project-tmdb",
    live: "https://jishnudip-mrs-project-tmdb.streamlit.app/",
  },
  {
    id: 4, title: "Titanic Survival Prediction",
    description: "ML model that predicts passenger survival based on personalized features like age, class, and sex.",
    image: "./titanic-image.jpg",
    technologies: ["Python", "scikit-learn", "Pandas"],
    categories: ["data"],
    github: "https://github.com/JishnudipSaha/CodSoft-project-titanic",
    live: "https://codsoft-project-titanic.streamlit.app/",
  },
  {
    id: 5, title: "SMS Spam Prediction",
    description: "ML system that classifies messages as spam or not spam to enhance communication security.",
    image: "./under_construction_pic.jpg",
    technologies: ["Python", "NLP", "scikit-learn"],
    categories: ["data", "upcoming"],
    github: "https://github.com/JishnudipSaha",
  },
  {
    id: 6, title: "Eye Disease Prediction",
    description: "Deep learning model (CNN) that detects eye diseases from OCT retinal images.",
    image: "./placeholder.jpg",
    technologies: ["Python", "TensorFlow", "CNN"],
    categories: ["data"],
    github: "https://github.com/JishnudipSaha/Eye-Disease-Prediction",
  },
  {
    id: 7, title: "Smart Attendance System",
    description: "AI-powered attendance using face recognition from classroom photos with reports and analytics.",
    image: "./placeholder.jpg",
    technologies: ["Python", "OpenCV", "Flask"],
    categories: ["data"],
    github: "https://github.com/JishnudipSaha/Smart-Attendance-System",
  },
  {
    id: 8, title: "Padma Variety",
    description: "E-commerce sample site with modern design and smooth shopping experience.",
    image: "./placeholder.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    categories: ["web"],
    github: "https://github.com/JishnudipSaha/padma-variety",
    live: "https://padma-variety.vercel.app",
  },
  {
    id: 9, title: "LangChain Demo",
    description: "Demonstration of LLM-powered applications using LangChain framework.",
    image: "./placeholder.jpg",
    technologies: ["Python", "LangChain", "LLM"],
    categories: ["data"],
    github: "https://github.com/JishnudipSaha/LangChain_Demo",
  },
  {
    id: 10, title: "College ERP System",
    description: "Enterprise resource planning system for college management built in Java.",
    image: "./placeholder.jpg",
    technologies: ["Java", "OOP", "SQL"],
    categories: ["java"],
    github: "https://github.com/JishnudipSaha/college-erp",
  },
]

const categories = [
  { id: "all", label: "All", icon: Code },
  { id: "web", label: "Web", icon: Globe },
  { id: "data", label: "Data Science", icon: Database },
  { id: "java", label: "Java", icon: Coffee },
  { id: "upcoming", label: "Upcoming", icon: ArrowDownToLine },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(filter))

  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="px-6 pb-24">
        <SectionWrapper direction="scale">
          <div className="max-w-6xl mx-auto text-center py-16">
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              My Projects
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of my technical skills and creative solutions
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="up">
          <div className="max-w-6xl mx-auto mb-16">
            <GradientText className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Featured Work
            </GradientText>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.filter(p => p.categories.includes("data") && !p.categories.includes("upcoming")).slice(0, 2).map((project, i) => (
                <div key={project.id} style={{ animationDelay: `${i * 0.15}s` }} className="animate-slide-up opacity-0">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="scale">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat, i) => (
                <div key={cat.id} style={{ animationDelay: `${i * 0.07}s` }} className="animate-pop-in opacity-0">
                  <button
                    onClick={() => setFilter(cat.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      filter === cat.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                        : "glass text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <div key={project.id} style={{ animationDelay: `${i * 0.07}s` }} className="animate-slide-up opacity-0">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
