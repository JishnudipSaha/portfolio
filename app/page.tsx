"use client"

import Link from "next/link"
import { 
  ArrowRight, Download, Github, Linkedin, Mail, Code2, Award, 
  Terminal, Sparkles, ChevronRight, Cpu, Layers, GitBranch, 
  Activity, ExternalLink, Zap
} from "lucide-react"
import FloatingElements from "@/components/floating-elements"
import CodeRain from "@/components/code-rain"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"
import RollingText from "@/components/rolling-text"
import TerminalWindow from "@/components/terminal-window"
import GitHubActivity from "@/components/github-activity"
import TechStackMatrix from "@/components/tech-stack-matrix"
import ProjectCard from "@/components/project-card"
import ScrollToTop from "@/components/scroll-to-top"
import { playKeyClick } from "@/components/sound-effects"

const stats = [
  { label: "Production Projects", value: 10, suffix: "+", icon: Code2, desc: "Machine Learning, Web, & Systems" },
  { label: "Certifications", value: 12, suffix: "", icon: Award, desc: "Google, Google Cloud, Deloitte" },
  { label: "Years Coding", value: 3, suffix: "+", icon: Zap, desc: "Python, Full-Stack, & AI" },
  { label: "Core Technologies", value: 18, suffix: "+", icon: Cpu, desc: "From PyTorch to Next.js" },
]

const featuredProjects = [
  {
    title: "Movie Recommendation System",
    description: "Machine learning content-based recommendation engine utilizing cosine similarity, TF-IDF vectorization, and TMDB dataset with an interactive Streamlit UI.",
    image: "/movie-recomendation-system.jpg",
    technologies: ["Python", "scikit-learn", "NLP", "Streamlit"],
    github: "https://github.com/JishnudipSaha/mrs-project-tmdb",
    live: "https://jishnudip-mrs-project-tmdb.streamlit.app/",
    featured: true,
  },
  {
    title: "Titanic Survival Predictor",
    description: "End-to-end classification system predicting passenger survival likelihood based on demographic and voyage features with detailed feature importance analysis.",
    image: "/titanic-image.jpg",
    technologies: ["Python", "RandomForest", "Pandas", "Streamlit"],
    github: "https://github.com/JishnudipSaha/CodSoft-project-titanic",
    live: "https://codsoft-project-titanic.streamlit.app/",
    featured: true,
  },
  {
    title: "Library Management System",
    description: "Object-oriented enterprise desktop application built in Java featuring transaction tracking, role-based user management, and safe file I/O operations.",
    image: "/library_management_image.jpg",
    technologies: ["Java", "OOP", "File I/O", "Data Structures"],
    github: "https://github.com/JishnudipSaha/Library.Managements-007",
    featured: true,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050508] relative overflow-hidden text-slate-100">
      {/* Background Ambience Layers */}
      <FloatingElements />
      <CodeRain />
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-10 w-[450px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-28 pb-16 z-10">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Developer Status HUD Badge */}
          <SectionWrapper direction="scale" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-panel border border-white/10 shadow-glass-sm animate-pulse-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span className="text-purple-300 font-mono text-xs tracking-wide">
                SYS_STATUS: <span className="text-emerald-400">AVAILABLE FOR HIRE</span>
              </span>
              <span className="text-gray-600 font-mono text-xs">|</span>
              <span className="text-gray-400 font-mono text-xs hidden sm:inline">
                branch: <span className="text-cyan-400">main</span>
              </span>
            </div>
          </SectionWrapper>

          {/* Primary Name Heading */}
          <SectionWrapper direction="up" delay={0.2}>
            <div className="mb-2">
              <span className="text-xs sm:text-sm font-mono text-purple-400/80 tracking-widest uppercase">
                &lt;Software Engineer &amp; Data Scientist /&gt;
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
              <span className="typing-animate bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Jishnudip Saha
              </span>
            </h1>
          </SectionWrapper>

          {/* Dynamic Rolling Role Subtitle */}
          <SectionWrapper delay={0.3} direction="up">
            <div className="text-lg sm:text-2xl text-gray-300 mb-6 font-mono flex items-center justify-center gap-2">
              <span className="text-purple-400 font-bold">&gt;</span>
              <RollingText />
            </div>
          </SectionWrapper>

          {/* Bio Mission */}
          <SectionWrapper delay={0.4} direction="up">
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Undergraduate at <span className="text-purple-300 font-medium">Narula Institute of Technology</span> building 
              intelligent neural systems, modern predictive applications, and ultra-fast web architectures.
            </p>
          </SectionWrapper>

          {/* Call to Actions */}
          <SectionWrapper delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
              <Link
                href="/projects"
                onClick={() => playKeyClick()}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-mono font-semibold text-xs sm:text-sm shadow-glow-purple hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
              >
                <span>./view-projects.sh</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="/Jishnudip%20Saha%20CV.pdf"
                download
                onClick={() => playKeyClick()}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-purple-400/40 text-purple-200 font-mono font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                <span>download_cv.pdf</span>
              </a>

              <a
                href="#terminal-section"
                onClick={() => playKeyClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl glass-pill text-gray-400 hover:text-white border border-white/5 hover:border-white/20 text-xs font-mono transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch CLI</span>
              </a>
            </div>
          </SectionWrapper>

          {/* Social Links Bar */}
          <SectionWrapper delay={0.6} direction="scale">
            <div className="flex items-center justify-center gap-3">
              {[
                { icon: Github, href: "https://github.com/JishnudipSaha", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/jishnudipsaha/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:jishnudip.saha.2004@gmail.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playKeyClick()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-pill text-xs font-mono text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <s.icon className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </div>
          </SectionWrapper>
        </div>

        {/* Scroll indicator pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <SectionWrapper direction="scale" delay={0.8}>
            <a
              href="#terminal-section"
              className="flex flex-col items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
              <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center p-1 glass">
                <div className="w-1 h-2 rounded-full bg-purple-400 animate-float" />
              </div>
            </a>
          </SectionWrapper>
        </div>
      </section>

      {/* Terminal & Interactive Dev Cockpit */}
      <section id="terminal-section" className="relative py-20 px-6 z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionWrapper direction="up">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>// MODULE: DEVELOPER_COCKPIT</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-5xl font-black mb-3">
                Interactive Command Center
              </GradientText>
              <p className="text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Test my live terminal environment below or inspect production code architecture tabs.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="scale">
            <TerminalWindow />
          </SectionWrapper>
        </div>
      </section>

      {/* GitHub Commit Velocity Heatmap */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <SectionWrapper direction="up">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                <Activity className="w-3.5 h-3.5" />
                <span>// TELEMETRY: COMMIT_STREAM</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-5xl font-black mb-3" variant="purple-cyan">
                Engineering Velocity
              </GradientText>
              <p className="text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Consistent code iteration across machine learning models and web software repositories.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="up">
            <GitHubActivity />
          </SectionWrapper>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>// SHOWCASE: SELECTED_BUILDS</span>
                </div>
                <GradientText as="h2" className="text-3xl sm:text-5xl font-black">
                  Featured Engineering
                </GradientText>
              </div>

              <Link
                href="/projects"
                onClick={() => playKeyClick()}
                className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-cyan-300 transition-colors group"
              >
                <span>Explore all 10+ projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <SectionWrapper key={project.title} delay={idx * 0.15} direction="up">
                <ProjectCard {...project} />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix Overview */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>// ARSENAL: TECH_TOOLCHAIN</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-5xl font-black mb-3" variant="emerald">
                Technical Stack &amp; Tooling
              </GradientText>
              <p className="text-sm font-mono text-gray-400 max-w-xl mx-auto">
                Languages, frameworks, and deep learning libraries I employ to architect intelligent solutions.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="up">
            <TechStackMatrix />
          </SectionWrapper>
        </div>
      </section>

      {/* Journey in Numbers */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>// TELEMETRY: CAREER_METRICS</span>
              </div>
              <GradientText as="h2" className="text-3xl sm:text-5xl font-black mb-3">
                The Journey in Numbers
              </GradientText>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <SectionWrapper key={stat.label} delay={i * 0.1} direction="up">
                <div className="glass-card rounded-2xl p-6 text-center border border-white/10 relative overflow-hidden group">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1">{stat.label}</div>
                  <div className="text-[11px] text-gray-500 font-sans">{stat.desc}</div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="relative py-20 px-6 pb-28 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <SectionWrapper direction="left">
              <Link href="/about" onClick={() => playKeyClick()} className="block group">
                <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-purple-500/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-purple-400">~/profile/bio</span>
                    <ArrowRight className="w-4 h-4 text-purple-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-purple-300 transition-colors">
                    About My Journey &rarr;
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Read about my education at Narula Institute of Technology, research interests, and core competencies.
                  </p>
                </div>
              </Link>
            </SectionWrapper>

            <SectionWrapper direction="right">
              <Link href="/achievements" onClick={() => playKeyClick()} className="block group">
                <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-cyan-500/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-cyan-400">~/records/awards</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    Achievements &amp; Medals &rarr;
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Explore certifications from Google, Google Cloud, Deloitte, and competitive programming achievements.
                  </p>
                </div>
              </Link>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Floating Scroll to Top button */}
      <ScrollToTop />
    </main>
  )
}
