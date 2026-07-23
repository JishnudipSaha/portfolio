"use client"

import { useState, useEffect, useRef } from "react"
import { Award, Trophy, Medal, Star, Calendar, MapPin, Terminal } from "lucide-react"
import CodeRain from "@/components/code-rain"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"

const achievements = [
  {
    title: "Gold Medal in Java",
    description: "Earned gold medal on Hackerrank for solving complex Java problems within time constraints.",
    date: "2023", location: "Kolkata, India",
    icon: Trophy, color: "from-yellow-500 to-orange-500", category: "Problem Solving",
  },
  {
    title: "AEC Hardware Competition",
    description: "Selected participant in hardware competition showcasing embedded systems and IoT skills.",
    date: "2025", location: "Asansol, West Bengal",
    icon: Star, color: "from-blue-500 to-cyan-500", category: "Competition",
  },
  {
    title: "Data Science Intern — CodSoft",
    description: "Selected as a data science intern, contributing to ML projects and data analysis pipelines.",
    date: "2025", location: "Remote",
    icon: Calendar, color: "from-green-500 to-emerald-500", category: "Internship",
  },
]

const certifications = [
  { title: "Ask Questions to Make Data-Driven Decisions", issuer: "Google", date: "2025", id: "DXSOTTIOFTLS" },
  { title: "Prompt Design in Vertex AI", issuer: "Google Cloud", date: "2023", id: "14806704" },
  { title: "Foundations: Data, Data, Everywhere", issuer: "Google", date: "2023", id: "KKULYPOUAE17" },
  { title: "Build Real World AI with Gemini", issuer: "Google Cloud", date: "2025", id: "14831174" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte Australia — Forage", date: "2025", id: "tSnoZBedSrx5NHkLz" },
  { title: "Data Science Intern", issuer: "CodSoft", date: "2025", id: "CS25RY84986" },
]

const stats = [
  { label: "Competitions", value: 5, icon: Trophy },
  { label: "Certifications", value: 12, icon: Award },
  { label: "Open Source", value: 15, suffix: "+", icon: Star },
  { label: "Projects", value: 10, suffix: "+", icon: Medal },
]

function TypingBar({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          started.current = true
          let i = 0
          const t = setInterval(() => {
            setDisplayed(text.slice(0, i + 1))
            i++
            if (i >= text.length) {
              clearInterval(t)
              setDone(true)
            }
          }, speed)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, speed])

  return (
    <div ref={ref} className="font-mono text-xs text-purple-300/90">
      <span className="text-green-400/60">jishnu@dev:~$</span> echo {displayed}
      {!done && <span className="inline-block w-1.5 h-3 bg-purple-400 ml-0.5 align-middle animate-terminal-blink" />}
    </div>
  )
}

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 relative overflow-hidden">
      <CodeRain />

      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]">
        <div className="w-full h-px bg-purple-500 absolute top-0 animate-scan-line" />
      </div>

      <div className="relative z-10 px-6 pb-24">
        <SectionWrapper direction="scale">
          <div className="max-w-6xl mx-auto text-center py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
              <Terminal className="w-3 h-3 text-purple-400" />
              <span className="font-mono text-[10px] text-purple-400/60">$ cat /etc/achievements</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              Achievements
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-purple-400/50">// </span>
              Milestones and recognition earned through dedication and hard work
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.15} direction="up">
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-8">
              <code className="text-[10px] text-purple-400/40 font-mono">// stats.summary()</code>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, i) => (
                <div key={s.label} style={{ animationDelay: `${i * 0.1}s` }} className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-purple-500/30 animate-scale-in opacity-0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  <s.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={s.value} suffix={s.suffix || ""} duration={2 + i * 0.15} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-mono">
                    <span className="text-purple-400/40">//</span> {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="scale">
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-8">
              <code className="text-[10px] text-purple-400/40 font-mono">// achievements.forEach(log)</code>
            </div>
            <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Major Achievements
            </GradientText>

            <div className="mb-6 p-4 glass rounded-xl">
              <TypingBar text="Journey of milestones and breakthroughs..." speed={25} />
            </div>

            <div className="space-y-6 relative">
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-blue-500/20 to-transparent" />
              {achievements.map((a, i) => (
                <div key={a.title} style={{ animationDelay: `${i * 0.15}s` }} className={`glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06] animate-slide-${i % 2 === 0 ? "right" : "left"} opacity-0`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${a.color} flex items-center justify-center flex-shrink-0 animate-float`}>
                    <a.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[10px] text-green-400/60 mb-2">
                      root@jishnu:~# ./achieve --id={a.title.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold">{a.title}</h3>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{a.description}</p>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r ${a.color} text-white font-mono`}>
                      [{a.category}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="scale">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <code className="text-[10px] text-purple-400/40 font-mono">// certs.verify()</code>
            </div>
            <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Certifications
            </GradientText>
            <div className="mb-6 p-4 glass rounded-xl">
              <TypingBar text="Verifying credentials..." speed={20} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {certifications.map((cert, i) => (
                <div key={cert.id} style={{ animationDelay: `${i * 0.07}s` }} className="glass rounded-xl p-6 gradient-border transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-purple-500/30 animate-slide-up opacity-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[9px] text-purple-400/40 mb-1">cert.{cert.id}</div>
                      <h3 className="font-semibold text-sm mb-1">{cert.title}</h3>
                      <p className="text-purple-400 text-xs mb-1 font-mono">{cert.issuer}</p>
                      <p className="text-gray-500 text-xs font-mono">
                        <span className="text-green-400/60">$</span> Issued {cert.date}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
