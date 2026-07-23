"use client"

import { useRef, useEffect, useState } from "react"
import { Code, Server, Database, BarChart, Smartphone, Globe, GraduationCap } from "lucide-react"
import CodeRain from "@/components/code-rain"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import TerminalWindow from "@/components/terminal-window"

const skills = [
  { name: "Frontend", icon: Code, level: 90, color: "from-purple-500 to-pink-500", hex: "#a855f7" },
  { name: "Backend", icon: Server, level: 70, color: "from-blue-500 to-cyan-500", hex: "#3b82f6" },
  { name: "Databases", icon: Database, level: 80, color: "from-green-500 to-emerald-500", hex: "#22c55e" },
  { name: "Data Analysis", icon: BarChart, level: 75, color: "from-orange-500 to-red-500", hex: "#f97316" },
  { name: "Mobile", icon: Smartphone, level: 60, color: "from-indigo-500 to-purple-500", hex: "#6366f1" },
  { name: "Web Tech", icon: Globe, level: 80, color: "from-teal-500 to-blue-500", hex: "#14b8a6" },
]

const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
  "Pandas", "NumPy", "Matplotlib", "Seaborn", "Java", "C++",
  "MongoDB", "Git", "Figma", "Tailwind CSS", "LangChain", "TensorFlow",
]

function SkillBar({ name, icon: Icon, level, color, hex, delay }: typeof skills[0] & { delay: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`glass rounded-xl p-5 transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="font-mono text-[10px] text-purple-400/60">{hex}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
            style={{ width: visible ? `${level}%` : "0%" }}
          />
        </div>
        <code className="font-mono text-xs text-gray-500 min-w-[3ch] text-right">{level}%</code>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-24 relative">
      <CodeRain />

      <div className="relative z-10 px-6 pb-24">
        <SectionWrapper direction="scale">
          <div className="max-w-6xl mx-auto text-center py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
              <span className="font-mono text-[10px] text-purple-400/60">$ cat /etc/profile</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              About Me
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-purple-400/50">// </span>
              Passionate about creating innovative solutions and pushing the boundaries of technology
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.15} direction="up">
          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <TerminalWindow className="h-full" />
              </div>
              <div className="md:col-span-2">
                <div className="glass rounded-xl p-6 sm:p-8 gradient-border h-full flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-purple-500/30 mb-4 transition-transform duration-300 hover:scale-105">
                    <img src="./placeholder-user.jpg" alt="Jishnudip Saha" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
                  </div>
                  <code className="text-xs text-purple-400/60 font-mono mb-2">const developer = {`{`}</code>
                  <div className="text-left font-mono text-[11px] text-gray-400 space-y-0.5">
                    <p>  name: <span className="text-purple-300">"Jishnudip Saha"</span>,</p>
                    <p>  title: <span className="text-blue-300">"Data Science Student"</span>,</p>
                    <p>  college: <span className="text-green-300">"Narula Institute of Technology"</span>,</p>
                    <p>  mission: <span className="text-orange-300">"Build intelligent systems"</span>,</p>
                  </div>
                  <code className="text-xs text-purple-400/60 font-mono mt-1">{`}`}</code>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="scale">
          <div className="text-center mb-12">
            <code className="text-[10px] text-purple-400/40 font-mono">// skills.proficiency()</code>
          </div>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Skills &amp; Expertise
          </GradientText>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 mb-24">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="scale">
          <div className="text-center mb-8">
            <code className="text-[10px] text-purple-400/40 font-mono">// import tech from &apos;toolkit&apos;</code>
          </div>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Technologies I Use
          </GradientText>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-24">
            {techStack.map((tech, i) => (
              <span
                key={tech}
                style={{ animationDelay: `${i * 0.04}s` }}
                className="group relative px-4 py-2 text-sm rounded-full glass text-gray-300 border border-white/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-white/[0.06] animate-pop-in opacity-0 font-mono"
              >
                <span className="text-purple-400/40 group-hover:text-purple-400/60 transition-colors">&lt;</span>
                {tech}
                <span className="text-purple-400/40 group-hover:text-purple-400/60 transition-colors"> /&gt;</span>
              </span>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="up">
          <div className="text-center mb-8">
            <code className="text-[10px] text-purple-400/40 font-mono">// education.current.degree</code>
          </div>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Education
          </GradientText>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8 gradient-border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
              <GraduationCap className="w-10 h-10 text-purple-400 mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-bold mb-2">B.Tech in Computer Science (Data Science)</h3>
              <p className="text-purple-400 mb-1 font-mono text-sm">Narula Institute of Technology</p>
              <p className="text-gray-500 text-sm font-mono">
                <span className="text-green-400/60">$</span> Expected 2027
              </p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
