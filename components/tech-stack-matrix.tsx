"use client"

import { useState } from "react"
import { 
  Code, Database, Cpu, Globe, Terminal, Layers, 
  Search, Sparkles, Server, Check 
} from "lucide-react"
import { playKeyClick } from "./sound-effects"

interface SkillItem {
  name: string
  category: "languages" | "ai-data" | "web" | "tools"
  level: number
  experience: string
  color: string
  glowColor: string
  tag: string
}

const skillsData: SkillItem[] = [
  // Languages
  { name: "Python", category: "languages", level: 92, experience: "3+ yrs", color: "from-blue-500 to-cyan-400", glowColor: "rgba(59,130,246,0.3)", tag: "Data & ML Core" },
  { name: "TypeScript", category: "languages", level: 85, experience: "2+ yrs", color: "from-blue-600 to-indigo-500", glowColor: "rgba(37,99,235,0.3)", tag: "Type Safe Frontend" },
  { name: "JavaScript", category: "languages", level: 90, experience: "3+ yrs", color: "from-yellow-400 to-amber-500", glowColor: "rgba(245,158,11,0.3)", tag: "Web Standard" },
  { name: "Java", category: "languages", level: 88, experience: "2+ yrs", color: "from-orange-500 to-red-500", glowColor: "rgba(239,68,68,0.3)", tag: "HackerRank Gold" },
  { name: "C++", category: "languages", level: 75, experience: "2 yrs", color: "from-purple-500 to-blue-500", glowColor: "rgba(168,85,247,0.3)", tag: "Systems & DSA" },
  { name: "SQL", category: "languages", level: 82, experience: "2+ yrs", color: "from-emerald-400 to-teal-500", glowColor: "rgba(16,185,129,0.3)", tag: "Relational Queries" },

  // AI & Data Science
  { name: "TensorFlow", category: "ai-data", level: 80, experience: "1.5+ yrs", color: "from-orange-500 to-amber-500", glowColor: "rgba(249,115,22,0.3)", tag: "Deep Learning" },
  { name: "Scikit-Learn", category: "ai-data", level: 88, experience: "2+ yrs", color: "from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,0.3)", tag: "ML Classifiers" },
  { name: "Pandas & NumPy", category: "ai-data", level: 94, experience: "3+ yrs", color: "from-purple-400 to-pink-500", glowColor: "rgba(192,132,252,0.3)", tag: "Data Manipulation" },
  { name: "OpenCV", category: "ai-data", level: 76, experience: "1 yr", color: "from-emerald-500 to-cyan-500", glowColor: "rgba(16,185,129,0.3)", tag: "Computer Vision" },
  { name: "LangChain", category: "ai-data", level: 78, experience: "1 yr", color: "from-violet-500 to-purple-600", glowColor: "rgba(139,92,246,0.3)", tag: "LLM Agents & RAG" },
  { name: "Matplotlib & Seaborn", category: "ai-data", level: 90, experience: "2+ yrs", color: "from-teal-400 to-emerald-500", glowColor: "rgba(20,184,166,0.3)", tag: "Data Visualization" },

  // Web
  { name: "Next.js 16", category: "web", level: 86, experience: "2+ yrs", color: "from-zinc-200 to-zinc-400", glowColor: "rgba(255,255,255,0.2)", tag: "SSR & App Router" },
  { name: "React 19", category: "web", level: 90, experience: "2.5+ yrs", color: "from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,0.3)", tag: "UI Components" },
  { name: "Tailwind CSS", category: "web", level: 95, experience: "3+ yrs", color: "from-cyan-400 to-teal-400", glowColor: "rgba(6,182,212,0.3)", tag: "Modern Styling" },
  { name: "Node.js & Express", category: "web", level: 80, experience: "2 yrs", color: "from-emerald-500 to-green-600", glowColor: "rgba(34,197,94,0.3)", tag: "REST APIs" },
  { name: "Streamlit", category: "web", level: 88, experience: "2 yrs", color: "from-red-500 to-pink-500", glowColor: "rgba(239,68,68,0.3)", tag: "ML Web Deploy" },

  // Tools & DB
  { name: "MongoDB", category: "tools", level: 82, experience: "2 yrs", color: "from-emerald-500 to-teal-500", glowColor: "rgba(16,185,129,0.3)", tag: "NoSQL DB" },
  { name: "Git & GitHub", category: "tools", level: 90, experience: "3+ yrs", color: "from-purple-500 to-pink-500", glowColor: "rgba(168,85,247,0.3)", tag: "Version Control" },
  { name: "Linux / Bash", category: "tools", level: 84, experience: "2+ yrs", color: "from-yellow-500 to-orange-500", glowColor: "rgba(234,179,8,0.3)", tag: "CLI & Scripts" },
  { name: "Figma", category: "tools", level: 75, experience: "1.5 yrs", color: "from-pink-500 to-purple-500", glowColor: "rgba(236,72,153,0.3)", tag: "UI/UX Design" },
]

export default function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "All Stack", icon: Layers },
    { id: "languages", label: "Languages", icon: Code },
    { id: "ai-data", label: "AI & Data Science", icon: Cpu },
    { id: "web", label: "Web Frameworks", icon: Globe },
    { id: "tools", label: "Tools & DBs", icon: Server },
  ]

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = activeCategory === "all" || skill.category === activeCategory
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tag.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel border border-white/5 w-full md:w-auto">
          {categories.map((cat) => {
            const active = activeCategory === cat.id
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playKeyClick()
                  setActiveCategory(cat.id)
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-glow-purple"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tech (e.g. python, react)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl glass text-xs font-mono text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
            style={{
              boxShadow: `0 8px 32px -8px ${skill.glowColor}`,
            }}
          >
            {/* Ambient specular highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                    {skill.experience}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5">{skill.tag}</p>
              </div>

              <span className="text-xs font-mono font-bold text-gray-300">
                {skill.level}%
              </span>
            </div>

            {/* Proficiency Bar with smooth gradient */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700 ease-out`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
