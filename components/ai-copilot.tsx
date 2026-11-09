"use client"

import { useState, useRef, useEffect } from "react"
import { 
  X, Send, RotateCcw, ChevronDown, ChevronUp, 
  ExternalLink, Copy, Check, Sparkles,
  CheckCircle2, FileText, Mail, ArrowUpRight,
  Settings, Key, Bot
} from "lucide-react"
import { KnowledgeChunk } from "@/lib/rag/knowledge"
import { playKeyClick, playSuccessChime } from "./sound-effects"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: KnowledgeChunk[]
  modelUsed?: string
  timestamp: string
}

const suggestedPrompts = [
  "👋 What are your strongest skills?",
  "🚀 Tell me about your Movie Recommender",
  "💼 Are you available for internships?",
  "🎓 Where do you study and graduate?",
  "🏆 What certifications do you hold?",
  "📄 Can I see your resume?",
  "📬 How can we get in touch?",
]

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(true)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({})
  
  // LLM Key configuration state
  const [showSettings, setShowSettings] = useState(false)
  const [customKey, setCustomKey] = useState("")
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const [keySaveMessage, setKeySaveMessage] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Hey there! 👋 I'm **Jishnudip Saha**. Welcome to my portfolio!\n\nI built this interactive AI twin so you can chat with me directly in real-time. Feel free to ask me anything about my **machine learning projects**, **technical skills**, my studies at **Narula Institute of Technology**, or **internship opportunities**!\n\nWhat would you like to explore together?",
      timestamp: "Just now",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load custom LLM key from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("jishnu_llm_key")
      if (stored) {
        setSavedKey(stored)
        setCustomKey(stored)
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, [])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, loading, isOpen])

  // Global keyboard shortcuts (Cmd+J / Ctrl+J, Esc) & custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        playKeyClick()
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        setIsOpen(false)
        playKeyClick()
      }
    }

    const handleOpenEvent = () => {
      setIsOpen(true)
      playKeyClick()
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-ai-copilot", handleOpenEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-ai-copilot", handleOpenEvent)
    }
  }, [isOpen])

  const saveApiKey = () => {
    playKeyClick()
    try {
      if (customKey.trim()) {
        localStorage.setItem("jishnu_llm_key", customKey.trim())
        setSavedKey(customKey.trim())
      } else {
        localStorage.removeItem("jishnu_llm_key")
        setSavedKey(null)
      }
      setKeySaveMessage(true)
      setTimeout(() => {
        setKeySaveMessage(false)
        setShowSettings(false)
      }, 1200)
    } catch {
      // Ignore
    }
  }

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input
    if (!textToSend.trim() || loading) return

    playKeyClick()
    const userMsgId = Date.now().toString()
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const userMessage: Message = {
      id: userMsgId,
      role: "user",
      content: textToSend.trim(),
      timestamp: time,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (savedKey) {
        headers["x-llm-key"] = savedKey
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ 
          message: textToSend.trim(),
          apiKey: savedKey || undefined
        }),
      })

      const data = await res.json()

      playSuccessChime()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I received an empty response. Feel free to ask another question!",
        sources: data.sources || [],
        modelUsed: data.modelUsed,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("RAG Query Failed:", err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I had a momentary connection hiccup! You can reach out to me directly at [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com) or ping me on [LinkedIn](https://www.linkedin.com/in/jishnudipsaha/).",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const toggleSource = (msgId: string) => {
    setExpandedSources((prev) => ({ ...prev, [msgId]: !prev[msgId] }))
  }

  const copyAnswer = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    playSuccessChime()
    setTimeout(() => setCopiedId(null), 1500)
  }

  const resetChat = () => {
    playKeyClick()
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content: "Chat refreshed! Hey, I'm Jishnudip. What project, technical topic, or opportunity would you like to explore together?",
        timestamp: "Just now",
      },
    ])
  }

  // Render markdown formatting simply (links, bold, bullet points, headers)
  const renderFormatted = (text: string) => {
    const lines = text.split("\n")
    return (
      <div className="space-y-1.5 leading-relaxed font-sans text-xs">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-1" />

          // Headers
          if (line.startsWith("### ")) {
            return (
              <h4 key={lIdx} className="font-mono font-bold text-sm text-cyan-300 mt-2.5 mb-1 flex items-center gap-1.5">
                {line.replace("### ", "")}
              </h4>
            )
          }

          // Bullet points
          const isBullet = line.startsWith("* ") || line.startsWith("- ")
          const cleanLine = isBullet ? line.slice(2) : line

          // Parse markdown links [text](url) and bold **text**
          const parts = cleanLine.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)

          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith("[") && part.includes("](")) {
              const label = part.slice(1, part.indexOf("]("))
              const url = part.slice(part.indexOf("](") + 2, -1)
              return (
                <a
                  key={pIdx}
                  href={url}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5 mx-0.5"
                >
                  {label}
                  {url.startsWith("http") && <ExternalLink className="w-2.5 h-2.5 inline" />}
                </a>
              )
            }
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="text-white font-semibold">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            return part
          })

          return isBullet ? (
            <div key={lIdx} className="flex items-start gap-1.5 pl-1.5 text-gray-200">
              <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
              <span>{renderedLine}</span>
            </div>
          ) : (
            <p key={lIdx} className="text-gray-300">
              {renderedLine}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {/* ========================================================= */}
      {/* FLOATING RIGHT-SIDE LAUNCHER & TEASER (ALWAYS ON RIGHT)    */}
      {/* ========================================================= */}
      {!isOpen && (
        <div 
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 9999,
          }}
          className="flex flex-col items-end gap-3 select-none pointer-events-auto"
        >
          {/* Irresistible Teaser Speech Bubble */}
          {showTeaser && (
            <div className="max-w-[290px] sm:max-w-[320px] rounded-2xl p-3.5 bg-[#0d0e18]/95 border border-purple-500/40 shadow-2xl shadow-purple-950/60 relative animate-fade-in group hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-xl">
              {/* Dismiss button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTeaser(false)
                }}
                aria-label="Dismiss greeting"
                className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Clickable Card Body */}
              <div
                onClick={() => {
                  playKeyClick()
                  setIsOpen(true)
                }}
                className="cursor-pointer flex items-start gap-3"
              >
                {/* Jishnu Avatar with live indicator */}
                <div className="relative shrink-0 mt-0.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/80 shadow-glow-purple">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Jishnudip Saha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0d0e18] animate-pulse" />
                </div>

                {/* Teaser Content */}
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1">
                      Jishnudip Saha
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug">
                    Hey! Ask me anything about my ML projects, technical stack, or internship availability 👋
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-cyan-400 font-medium">
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Chat with me</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                    <span className="text-gray-500">⌘J</span>
                  </div>
                </div>
              </div>

              {/* Downward pointing speech bubble pip */}
              <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-[#0d0e18] border-r border-b border-purple-500/40 rotate-45" />
            </div>
          )}

          {/* Floating Right-Side Launcher Pill */}
          <button
            onClick={() => {
              playKeyClick()
              setIsOpen(true)
            }}
            aria-label="Chat with Jishnu"
            className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[#0d0e18]/95 border border-purple-500/50 hover:border-cyan-400/90 shadow-2xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-xl"
          >
            {/* Jishnu Avatar */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-400 group-hover:border-cyan-400 transition-colors">
                <img
                  src="/placeholder-user.jpg"
                  alt="Jishnudip Saha"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0d0e18] animate-ping" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0d0e18]" />
            </div>

            {/* Label */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>Chat with Jishnu</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>AI Twin • {savedKey ? "Live LLM" : "RAG Grounded"}</span>
              </span>
            </div>

            {/* Keyboard shortcut */}
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded ml-1">
              ⌘J
            </kbd>
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* EXPANDABLE CHAT WINDOW (FIXED ON RIGHT SIDE WITH PADDING)  */}
      {/* ========================================================= */}
      {isOpen && (
        <div 
          style={{
            position: "fixed",
            bottom: "1.25rem",
            right: "1.25rem",
            zIndex: 99999,
            maxHeight: "calc(100dvh - 2.5rem)",
          }}
          className="w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[430px] h-[610px] flex flex-col rounded-2xl bg-[#080911]/95 border border-purple-500/30 shadow-2xl overflow-hidden backdrop-blur-2xl animate-scale-in"
        >
          {/* Top Bar / Mac OS Style Controls & Model Indicator */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
              </div>
              <span className="text-[11px] font-mono text-gray-400 border-l border-white/10 pl-2 flex items-center gap-1">
                <Bot className="w-3 h-3 text-cyan-400" />
                <span>jishnu.ai</span>
              </span>
            </div>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-1">
              {/* LLM Key Settings toggle */}
              <button
                onClick={() => {
                  playKeyClick()
                  setShowSettings(!showSettings)
                }}
                title="Configure LLM API Key (Gemini / Groq)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono ${
                  savedKey 
                    ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{savedKey ? "LLM Active" : "LLM Key"}</span>
              </button>

              <a
                href="/Jishnudip%20Saha%20CV.pdf"
                download
                title="Download Jishnu's CV (PDF)"
                className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:jishnudip.saha.2004@gmail.com"
                title="Email Jishnudip"
                className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playKeyClick()
                  setIsOpen(false)
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional LLM Settings Drawer */}
          {showSettings && (
            <div className="p-3 bg-[#0f101f] border-b border-purple-500/30 text-xs font-mono space-y-2 shrink-0 animate-fade-in">
              <div className="flex items-center justify-between text-white font-bold">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Key className="w-3.5 h-3.5" />
                  Connect Live LLM (Gemini / Groq)
                </span>
                <span className="text-[10px] text-gray-400 font-normal">Optional</span>
              </div>
              <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
                Paste your free <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Gemini API Key</a> or <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Groq Key</a> to chat with Gemini 2.0 Flash in real-time. Stored securely in your browser.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="AIzaSy... or gsk_..."
                  className="flex-1 bg-black/50 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder-gray-600 font-mono"
                />
                <button
                  onClick={saveApiKey}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-mono text-[11px] font-bold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  {keySaveMessage ? "Saved!" : "Save"}
                </button>
              </div>
            </div>
          )}

          {/* Profile Identity Bar */}
          <div className="px-4 py-3 bg-gradient-to-r from-purple-950/50 via-[#0a0a14] to-cyan-950/40 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 shadow-glow-purple">
                  <img
                    src="/placeholder-user.jpg"
                    alt="Jishnudip Saha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0a14] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-mono font-bold text-white leading-none">
                    Jishnudip Saha
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  B.Tech Data Science &apos;27 • Kolkata, IN
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Internship Ready
            </span>
          </div>

          {/* Messages Scroll Area (Flexible Height) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs min-h-0">
            {messages.map((msg) => {
              const isUser = msg.role === "user"
              const isSourceExpanded = expandedSources[msg.id]

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar Icon */}
                  {!isUser ? (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-purple-400/60 shrink-0 mt-1">
                      <img
                        src="/placeholder-user.jpg"
                        alt="Jishnudip"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center shrink-0 text-[10px] font-mono text-purple-200 mt-1">
                      YOU
                    </div>
                  )}

                  <div className={`max-w-[84%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl p-3.5 ${
                        isUser
                          ? "bg-gradient-to-r from-purple-600/50 to-indigo-600/50 border border-purple-500/30 text-white rounded-tr-none shadow-md"
                          : "bg-white/[0.04] border border-white/10 text-gray-200 rounded-tl-none shadow-md"
                      }`}
                    >
                      {isUser ? (
                        <p className="font-mono text-xs">{msg.content}</p>
                      ) : (
                        <div>{renderFormatted(msg.content)}</div>
                      )}

                      {/* Sources drawer for assistant answers */}
                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-white/5">
                          <button
                            onClick={() => toggleSource(msg.id)}
                            className="flex items-center gap-1 text-[10px] font-mono text-purple-400 hover:text-cyan-300 transition-colors cursor-pointer"
                          >
                            <span>📚 Verified from portfolio knowledge ({msg.sources.length})</span>
                            {isSourceExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>

                          {isSourceExpanded && (
                            <div className="mt-2 space-y-1.5 pl-1 animate-fade-in">
                              {msg.sources.map((s) => (
                                <div
                                  key={s.id}
                                  className="p-2 rounded-lg bg-black/50 border border-white/5 text-[10px] font-mono text-gray-400"
                                >
                                  <div className="text-cyan-300 font-semibold flex items-center justify-between">
                                    <span>{s.title}</span>
                                    {s.link && (
                                      <a
                                        href={s.link}
                                        className="text-purple-400 hover:underline flex items-center gap-0.5"
                                      >
                                        open &rarr;
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-gray-500 text-[9px] mt-0.5 line-clamp-2">
                                    {s.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-gray-500">
                      <span>{msg.timestamp}</span>
                      {!isUser && msg.modelUsed && (
                        <span className="text-[9px] text-cyan-400/80">
                          {msg.modelUsed.includes("gemini")
                            ? "✨ Gemini LLM"
                            : msg.modelUsed.includes("groq")
                            ? "⚡ Groq Llama"
                            : "⚡ RAG"}
                        </span>
                      )}
                      {!isUser && (
                        <button
                          onClick={() => copyAnswer(msg.content, msg.id)}
                          className="hover:text-gray-300 transition-colors cursor-pointer"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-purple-400/60 shrink-0 mt-1">
                  <img
                    src="/placeholder-user.jpg"
                    alt="Jishnudip"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-none p-3 text-xs font-mono text-cyan-400 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Jishnu is thinking &amp; typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips (Horizontally scrollable) */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer disabled:opacity-50 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar (Firmly pinned at bottom of window) */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <div className="relative flex-1 flex items-center bg-white/[0.03] border border-white/10 rounded-xl focus-within:border-cyan-400/60 transition-colors">
              <span className="text-cyan-400 font-mono text-xs pl-3 pr-1 select-none">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Jishnu anything (e.g. skills, projects)..."
                className="w-full bg-transparent text-white font-mono text-xs py-2 pr-3 focus:outline-none placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message to Jishnu"
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 cursor-pointer shadow-glow-cyan shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Subtext info */}
          <div className="px-4 py-1 bg-black/80 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500 shrink-0">
            <span>Press Enter to send</span>
            <span>⌘J or Esc to close</span>
          </div>
        </div>
      )}
    </>
  )
}
