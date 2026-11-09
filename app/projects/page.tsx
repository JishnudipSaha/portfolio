"use client"

import { useState } from "react"
import { 
  Code2, Globe, Database, Coffee, ArrowDownToLine, Terminal, 
  Search, Layers, Sparkles, Filter 
} from "lucide-react"
import CodeRain from "@/components/code-rain"
import FloatingElements from "@/components/floating-elements"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import ProjectCard from "@/components/project-card"
import ScrollToTop from "@/components/scroll-to-top"
import { playKeyClick } from "@/components/sound-effects"

const projects = [
  {
    id: 1,
    title: "Movie Recommendation System",
    description: "Content-based movie recommendation system that vectorizes film overviews, genres, and cast metadata using cosine similarity on the TMDB dataset.",
    image: "/movie-recomendation-system.jpg",
    technologies: ["Python", "scikit-learn", "NLTK", "Streamlit"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha/mrs-project-tmdb",
    live: "https://jishnudip-mrs-project-tmdb.streamlit.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Titanic Survival Prediction",
    description: "Machine learning classifier analyzing passenger demographics and ticket classes to predict disaster survival probabilities with model evaluation matrices.",
    image: "/titanic-image.jpg",
    technologies: ["Python", "scikit-learn", "Pandas", "Streamlit"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha/CodSoft-project-titanic",
    live: "https://codsoft-project-titanic.streamlit.app/",
    featured: true,
  },
  {
    id: 3,
    title: "SMS Spam Detection & Filter",
    description: "Natural language processing classifier trained on SMS datasets to detect spam and phishing attempts with high precision and recall.",
    image: "/Spam-image-poster.jpg",
    technologies: ["Python", "NLP", "scikit-learn", "TF-IDF"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha",
    featured: true,
  },
  {
    id: 4,
    title: "Library Management System",
    description: "Collaborative, object-oriented desktop library automation suite written in Java with transactional book issue/return tracking and secure records.",
    image: "/library_management_image.jpg",
    technologies: ["Java", "OOP", "File I/O", "Data Structures"],
    categories: ["java"],
    github: "https://github.com/JishnudipSaha/Library.Managements-007",
    featured: true,
  },
  {
    id: 5,
    title: "Developer Portfolio & Lab",
    description: "High-performance portfolio built with Next.js 16, TypeScript, Tailwind CSS, custom interactive CLI terminal, and frosted glassmorphic UI.",
    image: "/placeholder-user.jpg",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS"],
    categories: ["web"],
    github: "https://github.com/JishnudipSaha/portfolio",
    live: "https://jishnudip-saha-portfolio-website.vercel.app/",
  },
  {
    id: 6,
    title: "Eye Disease Prediction",
    description: "Deep learning convolutional neural network (CNN) model designed to diagnose retinal eye conditions from optical coherence tomography (OCT) imagery.",
    image: "/placeholder.jpg",
    technologies: ["Python", "TensorFlow", "CNN", "Keras"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha/Eye-Disease-Prediction",
  },
  {
    id: 7,
    title: "Smart Attendance System",
    description: "AI-driven classroom attendance software using real-time facial recognition algorithms with OpenCV, automated database updates, and exportable reports.",
    image: "/placeholder.jpg",
    technologies: ["Python", "OpenCV", "Flask", "Computer Vision"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha/Smart-Attendance-System",
  },
  {
    id: 8,
    title: "Padma Variety E-Commerce",
    description: "Modern full-stack e-commerce storefront with responsive product catalog, dynamic cart management, and seamless modern design.",
    image: "/placeholder.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    categories: ["web"],
    github: "https://github.com/JishnudipSaha/padma-variety",
    live: "https://padma-variety.vercel.app",
  },
  {
    id: 9,
    title: "LangChain Autonomous Demo",
    description: "Practical demonstration of autonomous LLM pipelines, prompt chaining, document embeddings, and context-aware agents using LangChain.",
    image: "/placeholder.jpg",
    technologies: ["Python", "LangChain", "LLMs", "RAG"],
    categories: ["data", "ml"],
    github: "https://github.com/JishnudipSaha/LangChain_Demo",
  },
  {
    id: 10,
    title: "College ERP Management System",
    description: "Comprehensive college enterprise resource planning desktop architecture for academic tracking, faculty records, and student administration in Java.",
    image: "/placeholder.jpg",
    technologies: ["Java", "OOP", "SQL", "Database Design"],
    categories: ["java"],
    github: "https://github.com/JishnudipSaha/college-erp",
  },
]

const categories = [
  { id: "all", label: "All Repos", icon: Layers },
  { id: "data", label: "AI & Data Science", icon: Database },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "java", label: "Java & Systems", icon: Coffee },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.categories.includes(filter)
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#050508] pt-28 pb-20 relative overflow-hidden text-slate-100">
      <FloatingElements />
      <CodeRain />
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed top-1/4 left-10 w-[450px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-10 w-[450px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* Page Heading */}
        <SectionWrapper direction="scale">
          <div className="text-center py-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full glass-panel border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>$ git log --oneline --projects</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-black mb-4">
              Engineering Projects
            </GradientText>
            <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              <span className="text-purple-400">// </span>
              Production architectures, machine learning models, and full-stack software systems.
            </p>
          </div>
        </SectionWrapper>

        {/* Filter and Search Bar */}
        <SectionWrapper delay={0.1} direction="up">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 specular-border">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => {
                const active = filter === cat.id
                const Icon = cat.icon
                const count =
                  cat.id === "all"
                    ? projects.length
                    : projects.filter((p) => p.categories.includes(cat.id)).length

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playKeyClick()
                      setFilter(cat.id)
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-glow-purple"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-gray-300">
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, tech (e.g. Python, NLP)..."
                className="w-full pl-9 pr-4 py-2 rounded-xl glass text-xs font-mono text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </SectionWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-16 text-center glass-panel rounded-2xl border border-white/10">
              <p className="font-mono text-sm text-gray-400 mb-2">No projects matched your criteria.</p>
              <button
                onClick={() => {
                  setFilter("all")
                  setSearch("")
                }}
                className="text-xs font-mono text-purple-400 hover:text-purple-300 underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filtered.map((project, idx) => (
              <SectionWrapper key={project.id} delay={idx * 0.08} direction="up">
                <ProjectCard {...project} />
              </SectionWrapper>
            ))
          )}
        </div>
      </div>

      <ScrollToTop />
    </main>
  )
}
