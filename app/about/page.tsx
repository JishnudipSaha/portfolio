"use client"

import { useRef, useEffect, useState } from "react"
import { 
  Code2, Server, Database, BarChart3, Smartphone, Globe, 
  GraduationCap, Terminal, MapPin, Calendar, Award, Sparkles, 
  CheckCircle2, Laptop, User
} from "lucide-react"
import CodeRain from "@/components/code-rain"
import FloatingElements from "@/components/floating-elements"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import TerminalWindow from "@/components/terminal-window"
import TechStackMatrix from "@/components/tech-stack-matrix"
import ScrollToTop from "@/components/scroll-to-top"

const timelineMilestones = [
  {
    year: "2023 — Present",
    role: "B.Tech in Computer Science (Data Science)",
    organization: "Narula Institute of Technology",
    description: "Specializing in Data Science, Machine Learning, Statistical Analysis, and Distributed Systems. Maintaining strong academic performance and active research participation.",
    badge: "Undergrad",
    color: "from-purple-500 to-indigo-500",
  },
  {
    year: "2025",
    role: "Data Science Intern",
    organization: "CodSoft",
    description: "Built predictive classification pipelines (Titanic Survival, Movie Recommendation, SMS Spam Detection), automated feature engineering, and deployed Streamlit web apps.",
    badge: "Internship",
    color: "from-cyan-500 to-blue-500",
  },
  {
    year: "2023 — 2025",
    role: "Competitive Programming & Problem Solving",
    organization: "HackerRank & LeetCode",
    description: "Earned 5-Star Gold Medal in Java on HackerRank for solving complex data structures and algorithmic challenges within strict execution time constraints.",
    badge: "Gold Medal",
    color: "from-amber-500 to-orange-500",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050508] pt-28 pb-20 relative overflow-hidden text-slate-100">
      <FloatingElements />
      <CodeRain />
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed top-1/3 right-10 w-[450px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <SectionWrapper direction="scale">
          <div className="text-center py-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full glass-panel border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>$ cat /sys/dev/profile.json</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-black mb-4">
              About Jishnudip Saha
            </GradientText>
            <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              <span className="text-purple-400">// </span>
              Undergrad Data Scientist &amp; Developer focused on building neural systems that bridge theory and production reality.
            </p>
          </div>
        </SectionWrapper>

        {/* Profile Card & Developer HUD */}
        <SectionWrapper delay={0.15} direction="up">
          <div className="grid md:grid-cols-5 gap-6 mb-20">
            {/* Left: Terminal Window */}
            <div className="md:col-span-3">
              <TerminalWindow className="h-full" />
            </div>

            {/* Right: Glassmorphic Profile Spec Card */}
            <div className="md:col-span-2">
              <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 h-full flex flex-col justify-between specular-border">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-glow-purple group shrink-0">
                      <img
                        src="/placeholder-user.jpg"
                        alt="Jishnudip Saha"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-mono text-white">Jishnudip Saha</h3>
                      <p className="text-xs text-purple-300 font-mono">Data Science Student</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>Kolkata, India</span>
                      </div>
                    </div>
                  </div>

                  {/* Spec Sheet */}
                  <div className="space-y-2.5 pt-3 border-t border-white/5 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.03]">
                      <span className="text-gray-500">Degree</span>
                      <span className="text-gray-200">B.Tech (CSE - DS)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.03]">
                      <span className="text-gray-500">University</span>
                      <span className="text-purple-300">Narula Institute of Tech</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.03]">
                      <span className="text-gray-500">Class Year</span>
                      <span className="text-emerald-400">2023 &ndash; 2027</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.03]">
                      <span className="text-gray-500">Core Specialty</span>
                      <span className="text-cyan-300">Deep Learning &amp; Web</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Status</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Available for Work
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href="/Jishnudip%20Saha%20CV.pdf"
                    download
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold transition-all hover:scale-[1.02]"
                  >
                    <span>Download Full Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Experience & Academic Timeline */}
        <SectionWrapper delay={0.2} direction="up">
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>// LOG: EXPERIENCE_HISTORY</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-4xl font-black mb-3" variant="purple-cyan">
                Experience &amp; Education
              </GradientText>
              <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Chronological timeline of academic milestones, internships, and engineering practice.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={item.role}
                  className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-purple-500/30 relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-sm`}>
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                          {item.role}
                        </h4>
                        <p className="text-xs font-mono text-cyan-400">{item.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{item.year}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Interactive Tech Toolchain Matrix */}
        <SectionWrapper delay={0.2} direction="up">
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                <Code2 className="w-3.5 h-3.5" />
                <span>// ARSENAL: CAPABILITIES</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-4xl font-black mb-3" variant="emerald">
                Detailed Skill Proficiency
              </GradientText>
              <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Filter and inspect my proficiencies across languages, deep learning, web, and tooling.
              </p>
            </div>

            <TechStackMatrix />
          </div>
        </SectionWrapper>
      </div>

      <ScrollToTop />
    </main>
  )
}
