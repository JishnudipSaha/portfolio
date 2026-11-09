"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Bot, Sparkles, X, Send, RotateCcw, ChevronDown, ChevronUp, 
  ExternalLink, Terminal, Copy, Check, MessageSquare, Zap
} from "lucide-react"
import { KnowledgeChunk } from "@/lib/rag/knowledge"
import { playKeyClick, playSuccessChime } from "./sound-effects"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: KnowledgeChunk[]
  timestamp: string
}

const suggestedPrompts = [
  "What are Jishnu's strongest skills?",
  "Show me his machine learning projects",
  "What certifications does he hold?",
  "Is he available for internships?",
]

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({})

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Hello! I am **Jishnu's AI Assistant**, powered by a local Retrieval-Augmented Generation (RAG) engine. Ask me anything about his technical stack, machine learning projects, education, or availability!",
      timestamp: "Now",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Global Ctrl+J / Cmd+J shortcut to toggle AI copilot & custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
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
  }, [])

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend.trim() }),
      })

      const data = await res.json()

      playSuccessChime()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I received an empty response from the RAG engine.",
        sources: data.sources || [],
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
          content: "Sorry, I had trouble reaching the portfolio knowledge base. Please feel free to email Jishnudip directly at [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com).",
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
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content: "Chat history cleared. What would you like to know about Jishnudip?",
        timestamp: "Now",
      },
    ])
    playKeyClick()
  }

  // Render markdown formatting simply (links, bold, code)
  const renderFormatted = (text: string) => {
    const lines = text.split("\n")
    return (
      <div className="space-y-1.5 leading-relaxed font-sans text-xs">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-1" />

          // Headers
          if (line.startsWith("### ")) {
            return (
              <h4 key={lIdx} className="font-mono font-bold text-sm text-cyan-300 mt-2 mb-1">
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
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
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
            <div key={lIdx} className="flex items-start gap-1.5 pl-2 text-gray-300">
              <span className="text-purple-400 font-bold">•</span>
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
      {/* Floating Toggle Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              playKeyClick()
              setIsOpen(true)
            }}
            aria-label="Ask AI Assistant"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel border border-purple-500/30 hover:border-cyan-400/60 shadow-glass-lg hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 cursor-pointer specular-border"
          >
            <div className="relative">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-black">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                <span>Ask AI Jishnu</span>
                <Sparkles className="w-3 h-3 text-cyan-400" />
              </span>
              <span className="text-[10px] font-mono text-gray-400">RAG Knowledge Copilot</span>
            </div>

            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded ml-1">
              ⌘J
            </kbd>
          </button>
        )}
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] h-[550px] flex flex-col rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden specular-border animate-scale-in">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>rag-copilot // AI Jishnu</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playKeyClick()
                  setIsOpen(false)
                }}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader / Status */}
          <div className="px-4 py-1.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vector Store: 20 Chunks Loaded</span>
            </span>
            <span className="text-purple-400">Contextual RAG</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user"
              const isSourceExpanded = expandedSources[msg.id]

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 ${
                      isUser
                        ? "bg-gradient-to-r from-purple-600/40 to-cyan-600/40 border border-purple-500/30 text-white rounded-br-none"
                        : "glass-card border border-white/10 text-gray-200 rounded-bl-none"
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
                          <span>📚 {msg.sources.length} Retrieved Sources</span>
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
                                className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-gray-400"
                              >
                                <div className="text-cyan-300 font-semibold flex items-center justify-between">
                                  <span>{s.title}</span>
                                  {s.link && (
                                    <a
                                      href={s.link}
                                      className="text-purple-400 hover:underline"
                                    >
                                      view &rarr;
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
                    {!isUser && (
                      <button
                        onClick={() => copyAnswer(msg.content, msg.id)}
                        className="hover:text-gray-300 transition-colors cursor-pointer"
                        title="Copy answer"
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
              )
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 glass-card p-3 rounded-2xl w-fit">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>Retrieving context &amp; generating...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-1.5 bg-black/20 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full glass-pill text-[10px] font-mono text-gray-400 hover:text-white hover:border-purple-500/40 transition-all cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-black/40 border-t border-white/10 flex items-center gap-2"
          >
            <div className="relative flex-1 flex items-center">
              <span className="text-purple-400 font-mono text-xs pl-2.5 pr-1">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, resume..."
                className="w-full bg-transparent text-white font-mono text-xs py-2 pr-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105 transition-all duration-200 disabled:opacity-40 cursor-pointer shadow-glow-cyan"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
