import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail, Code, Award, User, Briefcase, Terminal } from "lucide-react"
import FloatingElements from "@/components/floating-elements"
import CodeRain from "@/components/code-rain"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"
import RollingText from "@/components/rolling-text"
import TerminalWindow from "@/components/terminal-window"

const stats = [
  { label: "Projects", value: 10, suffix: "+", icon: Code },
  { label: "Achievements", value: 12, suffix: "", icon: Award },
  { label: "Experience", value: 3, suffix: "+ yrs", icon: User },
  { label: "Technologies", value: 16, suffix: "+", icon: Briefcase },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <FloatingElements />
      <CodeRain />

      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-blue-950/20 parallax-slow" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <SectionWrapper direction="scale">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/20 bg-purple-500/5 animate-glow-pulse">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-xs font-mono tracking-wide">$ ./greet --world</span>
            </div>
          </SectionWrapper>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="typing-animate bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Jishnudip Saha
            </span>
          </h1>

          <SectionWrapper delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 font-mono">
              <span className="text-purple-400/50">&gt; </span>
              <RollingText />
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.35}>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
              Building intelligent systems that bridge hardware and software — from ML models to full-stack applications.
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.5} direction="none">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/jishnu cv.pdf" download
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-purple-500/30 text-purple-300 font-semibold text-sm transition-all duration-300 hover:bg-purple-500/10 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.65} direction="scale">
            <div className="flex justify-center gap-6">
              {[
                { icon: Github, href: "https://github.com/JishnudipSaha", color: "hover:text-purple-400" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/jishnudipsaha/", color: "hover:text-blue-400" },
                { icon: Mail, href: "mailto:jishnudip.saha.2004@gmail.com", color: "hover:text-pink-400" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className={`text-gray-500 ${s.color} transition-all duration-300 hover:-translate-y-1 hover:scale-110 inline-block`}
                >
                  <s.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </SectionWrapper>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <SectionWrapper direction="scale" delay={1}>
            <div className="w-5 h-8 rounded-full border border-purple-500/30 flex justify-center">
              <div className="w-1 h-2.5 rounded-full bg-purple-500/50 mt-2 animate-float" />
            </div>
          </SectionWrapper>
        </div>
      </section>

      <section className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <SectionWrapper direction="scale">
            <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Terminal
            </GradientText>
          </SectionWrapper>
          <TerminalWindow className="max-w-2xl mx-auto" />
        </div>
      </section>

      <section className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <SectionWrapper direction="scale">
            <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
              My Journey in Numbers
            </GradientText>
          </SectionWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <SectionWrapper key={stat.label} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="glass rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-purple-500/30">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-purple-400" />
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2 + i * 0.2} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 pb-32 z-10">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper direction="scale">
            <GradientText className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Explore My Portfolio
            </GradientText>
          </SectionWrapper>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { href: "/about", icon: User, title: "About Me", desc: "Background, skills, and passion for technology", from: "from-purple-600/20" },
              { href: "/achievements", icon: Award, title: "Achievements", desc: "Accomplishments and recognition", from: "from-blue-600/20" },
            ].map((item, i) => (
              <SectionWrapper key={item.href} delay={i * 0.15} direction={i === 0 ? "left" : "right"}>
                <Link href={item.href}>
                  <div className={`glass rounded-2xl p-8 bg-gradient-to-br ${item.from} to-transparent transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06]`}>
                    <item.icon className="w-10 h-10 text-purple-400 mb-4 animate-float" />
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
