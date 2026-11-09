"use client"

import { useState } from "react"
import { 
  Award, Trophy, Medal, Star, Calendar, MapPin, Terminal, 
  CheckCircle2, Copy, Check, ExternalLink, ShieldCheck, Sparkles 
} from "lucide-react"
import CodeRain from "@/components/code-rain"
import FloatingElements from "@/components/floating-elements"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"
import ScrollToTop from "@/components/scroll-to-top"
import { playKeyClick, playSuccessChime } from "@/components/sound-effects"

const achievements = [
  {
    title: "5-Star Gold Medal in Java",
    description: "Earned the top-tier Gold Medal on HackerRank for solving challenging algorithmic, OOP, and data structure problems under strict runtime constraints.",
    date: "2023",
    location: "Kolkata, India",
    icon: Trophy,
    category: "Competition",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
    tag: "HackerRank Verified",
  },
  {
    title: "AEC Hardware & IoT Competition",
    description: "Selected participant and hardware showcase presenter demonstrating embedded microcontroller systems, sensor data ingestion, and IoT telemetry.",
    date: "2025",
    location: "Asansol, West Bengal",
    icon: Star,
    category: "Hardware",
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(6,182,212,0.3)",
    tag: "IoT & Systems",
  },
  {
    title: "Data Science Internship Fellowship",
    description: "Selected as Data Science Intern at CodSoft, leading statistical data analysis, machine learning model engineering, and Streamlit app deployments.",
    date: "2025",
    location: "Remote",
    icon: Award,
    category: "Internship",
    color: "from-purple-500 to-indigo-500",
    glow: "rgba(168,85,247,0.3)",
    tag: "Applied AI",
  },
]

const certifications = [
  { 
    title: "Build Real World AI with Gemini", 
    issuer: "Google Cloud", 
    date: "2025", 
    id: "14831174",
    skills: ["Gemini 1.5/2.0 API", "Multimodal Reasoning", "Function Calling"] 
  },
  { 
    title: "Prompt Design in Vertex AI", 
    issuer: "Google Cloud", 
    date: "2023", 
    id: "14806704",
    skills: ["Prompt Engineering", "Vertex AI Studio", "Generative AI"] 
  },
  { 
    title: "Ask Questions to Make Data-Driven Decisions", 
    issuer: "Google Career Certificates", 
    date: "2025", 
    id: "DXSOTTIOFTLS",
    skills: ["Data Ethics", "Metric Formulation", "Stakeholder Analysis"] 
  },
  { 
    title: "Foundations: Data, Data, Everywhere", 
    issuer: "Google Career Certificates", 
    date: "2023", 
    id: "KKULYPOUAE17",
    skills: ["Data Life Cycle", "SQL Analysis", "Analytical Thinking"] 
  },
  { 
    title: "Data Analytics Job Simulation", 
    issuer: "Deloitte Australia — Forage", 
    date: "2025", 
    id: "tSnoZBedSrx5NHkLz",
    skills: ["Forensic Data Modeling", "Tableau", "Executive Reporting"] 
  },
  { 
    title: "Data Science Specialization Intern", 
    issuer: "CodSoft", 
    date: "2025", 
    id: "CS25RY84986",
    skills: ["Scikit-learn", "Classification", "Feature Engineering"] 
  },
]

const stats = [
  { label: "Competitions & Contests", value: 5, icon: Trophy },
  { label: "Verified Credentials", value: 12, icon: ShieldCheck },
  { label: "Open Source Commits", value: 450, suffix: "+", icon: Star },
  { label: "Shipped Projects", value: 10, suffix: "+", icon: Medal },
]

export default function AchievementsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyCredId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    playSuccessChime()
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <main className="min-h-screen bg-[#050508] pt-28 pb-20 relative overflow-hidden text-slate-100">
      <FloatingElements />
      <CodeRain />
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed top-1/3 left-10 w-[450px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <SectionWrapper direction="scale">
          <div className="text-center py-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full glass-panel border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>$ cat /credentials/registry.lock</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-black mb-4">
              Achievements &amp; Honors
            </GradientText>
            <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              <span className="text-purple-400">// </span>
              Recognized milestones, competitive programming medals, and verified enterprise certifications.
            </p>
          </div>
        </SectionWrapper>

        {/* Stats Grid */}
        <SectionWrapper delay={0.1} direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s, idx) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="glass-card rounded-2xl p-5 text-center border border-white/10 group hover:border-purple-500/30"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">{s.label}</div>
                </div>
              )
            })}
          </div>
        </SectionWrapper>

        {/* Major Honors Cards */}
        <SectionWrapper delay={0.15} direction="up">
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
                <Trophy className="w-3.5 h-3.5" />
                <span>// HIGHLIGHTS: HONORS</span>
              </div>
              <GradientText as="h2" className="text-2xl sm:text-4xl font-black mb-2" variant="amber">
                Major Recognitions
              </GradientText>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-amber-500/40 relative overflow-hidden flex flex-col justify-between"
                    style={{ boxShadow: `0 8px 30px -8px ${item.glow}` }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-black font-bold shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-mono text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <div className="flex items-center gap-1 text-cyan-400">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                      <span className="text-amber-300 font-semibold">{item.tag}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Certifications Matrix */}
        <SectionWrapper delay={0.2} direction="up">
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>// VERIFIED: INDUSTRY_CREDENTIALS</span>
              </div>
              <GradientText as="h2" className="text-2xl sm:text-4xl font-black mb-2" variant="purple-cyan">
                Professional Certifications
              </GradientText>
              <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Industry-accredited qualifications validated by Google, Google Cloud, and Deloitte.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-purple-500/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {cert.issuer}
                        </span>
                        <h4 className="text-sm font-bold font-mono text-white mt-2 leading-snug">
                          {cert.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 shrink-0">{cert.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded glass-pill text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500 truncate mr-2">ID: {cert.id}</span>
                    <button
                      onClick={() => copyCredId(cert.id)}
                      className="flex items-center gap-1 text-purple-400 hover:text-cyan-300 transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedId === cert.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>

      <ScrollToTop />
    </main>
  )
}
