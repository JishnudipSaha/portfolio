"use client"

import { useEffect, useState } from "react"

const lines = [
  { text: "jishnu@dev:~$ whoami", delay: 400 },
  { text: "jishnudip", delay: 600 },
  { text: "jishnu@dev:~$ cat /etc/passion", delay: 500 },
  { text: "Building intelligent systems that bridge", delay: 300 },
  { text: "hardware and software — ML, full-stack,", delay: 300 },
  { text: "embedded systems, and beyond.", delay: 400 },
  { text: "jishnu@dev:~$ ./skills --list", delay: 500 },
  { text: "Python  TypeScript  React  Next.js  Node.js", delay: 400 },
  { text: "TensorFlow  LangChain  Java  C++", delay: 200 },
  { text: "jishnu@dev:~$ _", delay: 300 },
]

interface TerminalWindowProps {
  className?: string
}

export default function TerminalWindow({ className = "" }: TerminalWindowProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [typing, setTyping] = useState(false)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    if (visibleLines >= lines.length) return

    const line = lines[visibleLines]
    setTyping(true)
    setCurrentText("")

    const typeTimer = setTimeout(() => {
      let i = 0
      const t = setInterval(() => {
        setCurrentText(line.text.slice(0, i + 1))
        i++
        if (i >= line.text.length) {
          clearInterval(t)
          setTyping(false)
          setTimeout(() => setVisibleLines((v) => v + 1), 200)
        }
      }, 20)
    }, line.delay)

    return () => clearTimeout(typeTimer)
  }, [visibleLines])

  return (
    <div className={`glass rounded-xl overflow-hidden font-mono text-xs ${className}`}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-gray-600 text-[10px] ml-2">terminal — jishnu@dev:~/portfolio</span>
      </div>
      <div className="p-4 sm:p-5 space-y-1 min-h-[200px]">
        {Array.from({ length: visibleLines }).map((_, i) => {
          if (i === visibleLines - 1 && typing) {
            return (
              <p key={i} className="text-purple-300/90 leading-relaxed">
                {currentText}
                <span className={`inline-block w-1.5 h-4 bg-purple-400 ml-0.5 align-middle ${cursor ? "opacity-100" : "opacity-0"}`} />
              </p>
            )
          }
          const isPrompt = lines[i].text.startsWith("jishnu@dev")
          const isOutput = !isPrompt
          const isLast = lines[i].text === "jishnu@dev:~$ _"
          return (
            <p
              key={i}
              className={`leading-relaxed ${
                isLast ? "text-purple-300/90" : isPrompt ? "text-purple-300/90" : "text-gray-400"
              }`}
            >
              {isOutput && !isLast && <span className="text-purple-400/50 mr-2">→</span>}
              {lines[i].text}
            </p>
          )
        })}
        {visibleLines >= lines.length && (
          <p className="text-purple-300/90 leading-relaxed">
            <span className={`inline-block w-1.5 h-4 bg-purple-400 align-middle ${cursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  )
}
