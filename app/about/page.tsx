"use client"

import { useRef, useEffect, useState } from "react"
import { Code, Server, Database, BarChart, Smartphone, Globe, GraduationCap } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"

const skills = [
  { name: "Frontend", icon: Code, level: 90, color: "from-purple-500 to-pink-500" },
  { name: "Backend", icon: Server, level: 70, color: "from-blue-500 to-cyan-500" },
  { name: "Databases", icon: Database, level: 80, color: "from-green-500 to-emerald-500" },
  { name: "Data Analysis", icon: BarChart, level: 75, color: "from-orange-500 to-red-500" },
  { name: "Mobile", icon: Smartphone, level: 60, color: "from-indigo-500 to-purple-500" },
  { name: "Web Tech", icon: Globe, level: 80, color: "from-teal-500 to-blue-500" },
]

const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
  "Pandas", "NumPy", "Matplotlib", "Seaborn", "Java", "C++",
  "MongoDB", "Git", "Figma", "Tailwind CSS", "LangChain", "TensorFlow",
]

function SkillBar({ name, icon: Icon, level, color, delay }: typeof skills[0] & { delay: number }) {
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
    <div ref={ref} className="glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-purple-400" />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1.5 block">{level}%</span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="px-6 pb-24">
        <SectionWrapper>
          <div className="max-w-6xl mx-auto text-center py-16">
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              About Me
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate about creating innovative solutions and pushing the boundaries of technology
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.15}>
          <div className="max-w-4xl mx-auto mb-24">
            <div className="glass rounded-3xl p-8 md:p-12 gradient-border">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-purple-500/30 transition-transform duration-300 hover:scale-105">
                    <img src="./placeholder-user.jpg" alt="Jishnudip Saha" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
                  </div>
                </div>
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>I&apos;m Jishnudip Saha, an undergraduate student at Narula Institute of Technology, pursuing a degree in Data Science. I&apos;ve been passionate about using technology to solve real-world problems — from AI and embedded systems to full-stack development.</p>
                  <p>My work focuses on building intelligent systems that bridge hardware and software. Notable projects include a robotic shoe polisher, a smart EEG-based headband, and ML models for eye disease prediction.</p>
                  <p>I thrive in team settings — hackathons, research, and open-source. My mission is to create ethical, inclusive technology that solves meaningful challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2}>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Skills & Expertise
          </GradientText>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 mb-24">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2}>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Technologies I Use
          </GradientText>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-24">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-full glass text-gray-300 border border-white/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                {tech}
              </span>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2}>
          <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Education
          </GradientText>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8 gradient-border text-center transition-all duration-300 hover:-translate-y-1">
              <GraduationCap className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">B.Tech in Computer Science (Data Science)</h3>
              <p className="text-purple-400 mb-1">Narula Institute of Technology</p>
              <p className="text-gray-500 text-sm">Expected 2027</p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
