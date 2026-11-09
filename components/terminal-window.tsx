"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Terminal, Code2, Copy, Check, Play, RotateCcw, FileCode } from "lucide-react"
import { playKeyClick, playSuccessChime } from "./sound-effects"

type TabType = "terminal" | "developer.ts" | "model.py"

interface CommandHistory {
  command: string
  output: string | React.ReactNode
  timestamp: string
}

interface ScriptSequenceItem {
  command: string
  output: string | React.ReactNode
}

const typingScript: ScriptSequenceItem[] = [
  {
    command: "whoami",
    output: "Jishnudip Saha — Data Science Undergrad & Full-Stack Developer",
  },
  {
    command: "cat /etc/mission",
    output: "Bridging the gap between intelligent neural models and lightning-fast software systems.",
  },
  {
    command: "./skills --core",
    output: "Python | TypeScript | TensorFlow | Scikit-learn | Next.js 16 | Java",
  },
  {
    command: "./check-status",
    output: "🟢 Status: Operational & ready for engineering internships & collaborations.",
  },
]

export default function TerminalWindow({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabType>("terminal")
  const [inputVal, setInputVal] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [copied, setCopied] = useState(false)
  const [cursorBlink, setCursorBlink] = useState(true)

  // Typing animation state
  const [scriptIndex, setScriptIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState("")
  const [isTypingAnimation, setIsTypingAnimation] = useState(false)
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false)

  const terminalRef = useRef<HTMLDivElement>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const quickCommands = ["help", "skills", "projects", "ask ML projects", "contact", "clear"]

  // Cursor blink interval
  useEffect(() => {
    const blink = setInterval(() => setCursorBlink((c) => !c), 530)
    return () => clearInterval(blink)
  }, [])

  // Start animation when terminal scrolls into viewport
  useEffect(() => {
    const el = terminalRef.current
    if (!el || hasStartedAnimation) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedAnimation) {
          setHasStartedAnimation(true)
          setIsTypingAnimation(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStartedAnimation])

  // Typing animation engine
  useEffect(() => {
    if (!isTypingAnimation || !hasStartedAnimation) return

    if (scriptIndex >= typingScript.length) {
      setIsTypingAnimation(false)
      return
    }

    const currentItem = typingScript[scriptIndex]
    const targetCommand = currentItem.command

    // If still typing the command text
    if (typedCommand.length < targetCommand.length) {
      const nextCharIndex = typedCommand.length + 1
      const delay = 35 + Math.floor(Math.random() * 25)

      typingTimeoutRef.current = setTimeout(() => {
        setTypedCommand(targetCommand.slice(0, nextCharIndex))
        playKeyClick()
      }, delay)
    } else {
      // Command finished typing -> pause, then emit output
      typingTimeoutRef.current = setTimeout(() => {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        setHistory((prev) => [
          ...prev,
          {
            command: targetCommand,
            output: currentItem.output,
            timestamp: time,
          },
        ])
        setTypedCommand("")
        setScriptIndex((i) => i + 1)
      }, 400)
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [isTypingAnimation, hasStartedAnimation, scriptIndex, typedCommand])

  // Replay typing animation
  const replayAnimation = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    setHistory([])
    setTypedCommand("")
    setScriptIndex(0)
    setIsTypingAnimation(true)
    setHasStartedAnimation(true)
  }

  // Handle custom interactive commands
  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    if (!cleanCmd) return

    // Stop automated animation if still running
    if (isTypingAnimation) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      setIsTypingAnimation(false)
      setTypedCommand("")
    }

    playKeyClick()
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

    if (cleanCmd === "clear") {
      setHistory([])
      setInputVal("")
      return
    }

    // RAG AI Query via Terminal
    if (cleanCmd.startsWith("ask ") || cleanCmd.startsWith("ai ") || cleanCmd.startsWith("rag ")) {
      const query = cmd.trim().replace(/^(ask|ai|rag)\s+/i, "")
      const loadingEntry: CommandHistory = {
        command: cmd,
        output: <span className="text-cyan-400 animate-pulse">⚡ Jishnu is retrieving context &amp; typing...</span>,
        timestamp: time,
      }
      setHistory((prev) => [...prev, loadingEntry])
      setInputVal("")

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      })
        .then((res) => res.json())
        .then((data) => {
          playSuccessChime()
          setHistory((prev) => [
            ...prev.slice(0, -1),
            {
              command: cmd,
              output: (
                <div className="space-y-1.5">
                  <div className="text-cyan-300 leading-relaxed whitespace-pre-line">{data.answer}</div>
                  {data.sources && data.sources.length > 0 && (
                    <div className="text-[10px] text-gray-500 pt-1">
                      📚 Sources retrieved: {data.sources.map((s: { title: string }) => s.title).join(", ")}
                    </div>
                  )}
                </div>
              ),
              timestamp: time,
            },
          ])
        })
        .catch(() => {
          setHistory((prev) => [
            ...prev.slice(0, -1),
            {
              command: cmd,
              output: "Error querying RAG knowledge base. Please try again.",
              timestamp: time,
            },
          ])
        })
      return
    }

    let output: React.ReactNode = ""

    switch (cleanCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-gray-300">
            <p className="text-purple-300">Available commands:</p>
            <p><span className="text-cyan-400">ask &lt;prompt&gt;</span> - Ask anything directly to Jishnudip&apos;s AI Twin (or use &apos;ai &lt;prompt&gt;&apos;)</p>
            <p><span className="text-cyan-400">skills</span> - List core languages and frameworks</p>
            <p><span className="text-cyan-400">projects</span> - View top highlighted software &amp; ML builds</p>
            <p><span className="text-cyan-400">about</span> - Read background and college info</p>
            <p><span className="text-cyan-400">contact</span> - Get direct email and social handles</p>
            <p><span className="text-cyan-400">sudo hire-me</span> - Unlock secret fast-track message</p>
            <p><span className="text-cyan-400">clear</span> - Clear the terminal output</p>
          </div>
        )
        break
      case "skills":
        output = (
          <div className="space-y-1">
            <p className="text-purple-300">⚡ Technical Stack:</p>
            <p><span className="text-emerald-400">Languages:</span> Python, TypeScript, JavaScript, Java, C++, SQL</p>
            <p><span className="text-cyan-400">AI / ML:</span> TensorFlow, Scikit-learn, PyTorch, Pandas, NumPy, OpenCV, LangChain</p>
            <p><span className="text-blue-400">Web:</span> Next.js 16, React 19, Node.js, Express, Tailwind CSS</p>
          </div>
        )
        break
      case "projects":
        output = (
          <div className="space-y-1">
            <p className="text-purple-300">🚀 Key Projects:</p>
            <p>1. <span className="text-cyan-400">Movie Recommendation System</span> (NLP / Cosine Similarity / Streamlit)</p>
            <p>2. <span className="text-cyan-400">Titanic Survival Prediction</span> (Machine Learning Classification)</p>
            <p>3. <span className="text-cyan-400">Smart Attendance via Face Recognition</span> (OpenCV / Flask)</p>
            <p>4. <span className="text-cyan-400">Library Management Suite</span> (Java / OOP Architecture)</p>
            <p className="text-xs text-gray-400 mt-1">Run <a href="/projects" className="underline text-purple-400">/projects</a> to see all repositories.</p>
          </div>
        )
        break
      case "about":
        output = "🎓 B.Tech in Computer Science (Data Science) @ Narula Institute of Technology (2023 - 2027). Passionate about autonomous agents, machine learning, and high-performance web systems."
        break
      case "contact":
        output = (
          <div>
            <p>📧 Email: <a href="mailto:jishnudip.saha.2004@gmail.com" className="text-purple-300 underline">jishnudip.saha.2004@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/JishnudipSaha" target="_blank" className="text-cyan-300 underline">github.com/JishnudipSaha</a></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/jishnudipsaha/" target="_blank" className="text-blue-300 underline">linkedin.com/in/jishnudipsaha</a></p>
          </div>
        )
        break
      case "sudo hire-me":
      case "hire-me":
      case "hire":
        playSuccessChime()
        output = (
          <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-200">
            🎉 <span className="font-bold">Access Granted:</span> Thank you for considering me! Let&apos;s build something exceptional together. Feel free to reach out directly at jishnudip.saha.2004@gmail.com.
          </div>
        )
        break
      default:
        output = `Command not recognized: "${cleanCmd}". Type "help" for a list of valid commands.`
    }

    setHistory((prev) => [...prev, { command: cmd, output, timestamp: time }])
    setInputVal("")
  }

  const handleCopy = () => {
    let content = ""
    if (activeTab === "terminal") {
      content = history.map((h) => `$ ${h.command}\n${typeof h.output === "string" ? h.output : "[Result]"}`).join("\n\n")
    } else if (activeTab === "developer.ts") {
      content = developerTsCode
    } else {
      content = modelPyCode
    }
    navigator.clipboard.writeText(content)
    setCopied(true)
    playSuccessChime()
    setTimeout(() => setCopied(false), 1500)
  }

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [history])

  return (
    <div
      ref={terminalRef}
      className={`glass-panel rounded-2xl overflow-hidden font-mono border border-white/10 shadow-glass-lg ${className}`}
    >
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        {/* macOS / Linux Buttons & Active Tab Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors" />
          </div>

          {/* IDE Tabs */}
          <div className="flex items-center gap-1 ml-2">
            {[
              { id: "terminal", label: "bash ~ terminal", icon: Terminal },
              { id: "developer.ts", label: "developer.ts", icon: Code2 },
              { id: "model.py", label: "model.py", icon: FileCode },
            ].map((tab) => {
              const active = activeTab === tab.id
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playKeyClick()
                    setActiveTab(tab.id as TabType)
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    active
                      ? "bg-white/10 text-white border border-white/10 shadow-sm"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {activeTab === "terminal" && (
            <button
              onClick={replayAnimation}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] transition-colors border border-white/5 cursor-pointer"
              title="Replay typing animation"
            >
              <RotateCcw className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline text-[10px]">Replay</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>git:main</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] transition-colors border border-white/5 cursor-pointer"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
            <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Tab Content 1: Interactive Terminal */}
      {activeTab === "terminal" && (
        <div className="p-4 sm:p-5 text-xs">
          {/* Quick Command Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-3 border-b border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mr-1">Suggested:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded-md bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 border border-purple-500/20 text-[11px] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Command Logs & Live Typing Sequence */}
          <div ref={logContainerRef} className="space-y-3 min-h-[220px] max-h-[360px] overflow-y-auto pr-1">
            {/* Completed history */}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1 animate-fade-in">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-emerald-400 font-semibold">jishnu@lab</span>
                  <span className="text-purple-400">:</span>
                  <span className="text-cyan-400">~/workspace</span>
                  <span className="text-white">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                  <span className="ml-auto text-[10px] text-gray-600 hidden sm:inline">{item.timestamp}</span>
                </div>
                <div className="pl-4 text-gray-300 leading-relaxed border-l-2 border-purple-500/20">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Currently animating typing line */}
            {isTypingAnimation && typedCommand && (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-emerald-400 font-semibold">jishnu@lab</span>
                <span className="text-purple-400">:</span>
                <span className="text-cyan-400">~/workspace</span>
                <span className="text-white">$</span>
                <span className="text-white font-medium">{typedCommand}</span>
                <span
                  className={`inline-block w-2 h-4 bg-cyan-400 align-middle ${
                    cursorBlink ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}

          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCommand(inputVal)
            }}
            className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5"
          >
            <span className="text-emerald-400 font-semibold">jishnu@lab</span>
            <span className="text-purple-400">:</span>
            <span className="text-cyan-400">~/workspace</span>
            <span className="text-purple-400 font-bold">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={isTypingAnimation ? "running automated boot script..." : "type a command (e.g. 'skills', 'projects', 'help')..."}
                className="w-full bg-transparent text-white focus:outline-none placeholder-gray-600 text-xs font-mono"
              />
              {!inputVal && !isTypingAnimation && (
                <span
                  className={`absolute left-0 w-2 h-4 bg-purple-400 pointer-events-none ${
                    cursorBlink ? "opacity-75" : "opacity-0"
                  }`}
                />
              )}
            </div>
            <button
              type="submit"
              className="px-2 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Play className="w-2.5 h-2.5" />
              <span>Run</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab Content 2: developer.ts */}
      {activeTab === "developer.ts" && (
        <div className="p-4 sm:p-5 text-xs overflow-x-auto max-h-[380px] bg-[#05050a]/60">
          <pre className="leading-relaxed">
            <code>
              <span className="code-comment">// developer.ts — Core Engineer Profile</span>{"\n"}
              <span className="code-keyword">export interface</span> <span className="code-type">Engineer</span> {"{\n"}
              {"  "}name: <span className="code-type">string</span>;{"\n"}
              {"  "}education: <span className="code-type">string</span>;{"\n"}
              {"  "}stack: <span className="code-type">string[]</span>;{"\n"}
              {"  "}isAvailableForHire: <span className="code-type">boolean</span>;{"\n"}
              {"}\n\n"}
              <span className="code-keyword">export const</span> <span className="code-fn">developer</span>: <span className="code-type">Engineer</span> = {"{\n"}
              {"  "}name: <span className="code-string">&quot;Jishnudip Saha&quot;</span>,{"\n"}
              {"  "}education: <span className="code-string">&quot;B.Tech in Computer Science (Data Science)&quot;</span>,{"\n"}
              {"  "}institution: <span className="code-string">&quot;Narula Institute of Technology&quot;</span>,{"\n"}
              {"  "}graduationYear: <span className="code-number">2027</span>,{"\n"}
              {"  "}stack: [
                <span className="code-string">&quot;Python&quot;</span>, 
                <span className="code-string">&quot;TypeScript&quot;</span>, 
                <span className="code-string">&quot;TensorFlow&quot;</span>, 
                <span className="code-string">&quot;Next.js&quot;</span>, 
                <span className="code-string">&quot;Java&quot;</span>
              ],{"\n"}
              {"  "}isAvailableForHire: <span className="code-keyword">true</span>,{"\n"}
              {"  "}focusAreas: [<span className="code-string">&quot;Deep Learning&quot;</span>, <span className="code-string">&quot;Predictive Modeling&quot;</span>, <span className="code-string">&quot;Full-Stack Architecture&quot;</span>],{"\n"}
              {"  "}<span className="code-fn">buildIntelligentSystems</span>: () =&gt; {"{\n"}
              {"    "}<span className="code-keyword">return</span> <span className="code-string">&quot;Transforming complex raw data into production software solutions.&quot;</span>;{"\n"}
              {"  }"}{"\n"}
              {"};"}
            </code>
          </pre>
        </div>
      )}

      {/* Tab Content 3: model.py */}
      {activeTab === "model.py" && (
        <div className="p-4 sm:p-5 text-xs overflow-x-auto max-h-[380px] bg-[#05050a]/60">
          <pre className="leading-relaxed">
            <code>
              <span className="code-comment"># model_pipeline.py — End-to-End Data Science Engine</span>{"\n"}
              <span className="code-keyword">import</span> numpy <span className="code-keyword">as</span> np{"\n"}
              <span className="code-keyword">import</span> pandas <span className="code-keyword">as</span> pd{"\n"}
              <span className="code-keyword">from</span> sklearn.model_selection <span className="code-keyword">import</span> train_test_split{"\n"}
              <span className="code-keyword">from</span> sklearn.ensemble <span className="code-keyword">import</span> RandomForestClassifier{"\n"}
              <span className="code-keyword">from</span> sklearn.metrics <span className="code-keyword">import</span> accuracy_score, classification_report{"\n\n"}
              <span className="code-keyword">class</span> <span className="code-type">PredictiveEngine</span>:{"\n"}
              {"    "}<span className="code-keyword">def</span> <span className="code-fn">__init__</span>(self, model_type=<span className="code-string">&quot;RandomForest&quot;</span>):{"\n"}
              {"        "}self.model = RandomForestClassifier(n_estimators=<span className="code-number">150</span>, random_state=<span className="code-number">42</span>){"\n"}
              {"        "}self.status = <span className="code-string">&quot;Initialized&quot;</span>{"\n\n"}
              {"    "}<span className="code-keyword">def</span> <span className="code-fn">train_and_evaluate</span>(self, X, y):{"\n"}
              {"        "}X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=<span className="code-number">0.2</span>){"\n"}
              {"        "}self.model.fit(X_train, y_train){"\n"}
              {"        "}preds = self.model.predict(X_test){"\n"}
              {"        "}score = accuracy_score(y_test, preds){"\n"}
              {"        "}print(<span className="code-string">f&quot;[+] Model Convergence: accuracy={'{score:.4f}'}&quot;</span>){"\n"}
              {"        "}<span className="code-keyword">return</span> score{"\n\n"}
              <span className="code-comment"># Status: Ready for deployment on cloud endpoints</span>
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

const developerTsCode = `export interface Engineer {
  name: string;
  education: string;
  stack: string[];
  isAvailableForHire: boolean;
}

export const developer: Engineer = {
  name: "Jishnudip Saha",
  education: "B.Tech in Computer Science (Data Science)",
  institution: "Narula Institute of Technology",
  graduationYear: 2027,
  stack: ["Python", "TypeScript", "TensorFlow", "Next.js", "Java"],
  isAvailableForHire: true,
  focusAreas: ["Deep Learning", "Predictive Modeling", "Full-Stack Architecture"],
};`

const modelPyCode = `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

class PredictiveEngine:
    def __init__(self, model_type="RandomForest"):
        self.model = RandomForestClassifier(n_estimators=150, random_state=42)
        
    def train_and_evaluate(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        self.model.fit(X_train, y_train)
        return accuracy_score(y_test, self.model.predict(X_test))`
