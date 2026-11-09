"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Search, Terminal, Home, User, Briefcase, Award, Mail, 
  Github, Linkedin, Download, Copy, Check, X, Sparkles, Bot
} from "lucide-react"
import { playKeyClick, playSuccessChime } from "./sound-effects"

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: "Navigation" | "Actions" | "Social"
  icon: typeof Home
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const items: CommandItem[] = [
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Back to mission control",
      category: "Navigation",
      icon: Home,
      action: () => { router.push("/"); onClose() },
    },
    {
      id: "nav-about",
      title: "Go to About Me",
      subtitle: "Bio, tech stack, and background",
      category: "Navigation",
      icon: User,
      action: () => { router.push("/about"); onClose() },
    },
    {
      id: "nav-projects",
      title: "Go to Projects",
      subtitle: "Machine learning, web, and software systems",
      category: "Navigation",
      icon: Briefcase,
      action: () => { router.push("/projects"); onClose() },
    },
    {
      id: "nav-achievements",
      title: "Go to Achievements",
      subtitle: "Competitions, certifications & milestones",
      category: "Navigation",
      icon: Award,
      action: () => { router.push("/achievements"); onClose() },
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      subtitle: "Send a message or connect directly",
      category: "Navigation",
      icon: Mail,
      action: () => { router.push("/contact"); onClose() },
    },
    {
      id: "action-ai",
      title: "Chat with Jishnu (AI Twin)",
      subtitle: "Ask me anything about my projects, skills & internships (⌘J)",
      category: "Actions",
      icon: Bot,
      action: () => {
        onClose()
        window.dispatchEvent(new CustomEvent("open-ai-copilot"))
      },
    },
    {
      id: "action-cv",
      title: "Download Resume / CV",
      subtitle: "Download Jishnudip Saha's latest resume (PDF)",
      category: "Actions",
      icon: Download,
      action: () => {
        window.open("/Jishnudip%20Saha%20CV.pdf", "_blank")
        onClose()
      },
    },
    {
      id: "action-copy-email",
      title: "Copy Email Address",
      subtitle: "jishnudip.saha.2004@gmail.com",
      category: "Actions",
      icon: copied ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText("jishnudip.saha.2004@gmail.com")
        setCopied(true)
        playSuccessChime()
        setTimeout(() => {
          setCopied(false)
          onClose()
        }, 800)
      },
    },
    {
      id: "social-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/JishnudipSaha",
      category: "Social",
      icon: Github,
      action: () => {
        window.open("https://github.com/JishnudipSaha", "_blank")
        onClose()
      },
    },
    {
      id: "social-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/jishnudipsaha",
      category: "Social",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/jishnudipsaha/", "_blank")
        onClose()
      },
    },
  ]

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
        playKeyClick()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
        playKeyClick()
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault()
        playSuccessChime()
        filtered[selectedIndex].action()
      } else if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl glass-panel rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-scale-in z-10 specular-border">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="text-[11px] font-mono text-gray-400 ml-2">command-center // quick jump</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-black/30">
          <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              playKeyClick()
            }}
            placeholder="Type a command or jump to page... (e.g. projects, cv)"
            autoFocus
            className="w-full bg-transparent text-sm font-mono text-white placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-gray-500">
              No matching command found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playSuccessChime()
                    item.action()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-purple-600/20 border border-purple-500/30 text-white"
                      : "text-gray-400 hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-purple-500 text-white shadow-glow-purple"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-medium font-mono ${isSelected ? "text-purple-300" : "text-gray-200"}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">{item.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-600 px-2 py-0.5 rounded bg-white/[0.02]">
                    {item.category}
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/[0.01] text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">↑↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">↵</kbd> select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
