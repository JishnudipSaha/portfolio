"use client"

import type React from "react"
import { useState } from "react"
import { 
  Mail, MapPin, Github, Linkedin, Twitter, Send, 
  Sparkles, Terminal, Copy, Check, CheckCircle2, ShieldCheck, 
  MessageSquare, Radio 
} from "lucide-react"
import CodeRain from "@/components/code-rain"
import FloatingElements from "@/components/floating-elements"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"
import ScrollToTop from "@/components/scroll-to-top"
import { playKeyClick, playSuccessChime } from "@/components/sound-effects"

const contactCards = [
  {
    icon: Mail,
    title: "Direct Email",
    value: "jishnudip.saha.2004@gmail.com",
    href: "mailto:jishnudip.saha.2004@gmail.com",
    copyValue: "jishnudip.saha.2004@gmail.com",
    label: "Primary Channel",
  },
  {
    icon: MessageSquare,
    title: "Response Window",
    value: "Within 24 Hours",
    href: "mailto:jishnudip.saha.2004@gmail.com",
    label: "Available for Opportunities",
  },
  {
    icon: MapPin,
    title: "Current Base",
    value: "Kolkata, West Bengal, India",
    href: "#",
    label: "Timezone: UTC+5:30",
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/JishnudipSaha", handle: "@JishnudipSaha" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jishnudipsaha/", handle: "in/jishnudipsaha" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/jishnudip", handle: "@jishnudip" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(title)
    playSuccessChime()
    setTimeout(() => setCopiedItem(null), 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    playKeyClick()

    try {
      const data = new FormData(e.target as HTMLFormElement)
      const res = await fetch("https://formspree.io/f/mvgrvazg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        playSuccessChime()
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }

    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <main className="min-h-screen bg-[#050508] pt-28 pb-20 relative overflow-hidden text-slate-100">
      <FloatingElements />
      <CodeRain />
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed top-1/4 right-10 w-[450px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-10 w-[450px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <SectionWrapper direction="scale">
          <div className="text-center py-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full glass-panel border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>$ ./contact --handshake --secure</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-black mb-4">
              Get In Touch
            </GradientText>
            <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              <span className="text-purple-400">// </span>
              Have an opportunity, collaboration idea, or question? Send a message through the terminal dispatch below.
            </p>
          </div>
        </SectionWrapper>

        {/* Contact Layout */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {/* Left Form: Terminal Form Window */}
          <div className="lg:col-span-3">
            <SectionWrapper direction="left" delay={0.15}>
              <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 specular-border shadow-glass-lg">
                {/* Window Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-gray-400 text-[11px] font-mono ml-2">
                      terminal ~ send-message.sh
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>SSL/TLS ENCRYPTED</span>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-lg font-bold mb-6 font-mono text-white flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <span>./dispatch-payload</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] text-purple-300 mb-1.5">
                          <span className="text-emerald-400 mr-1">$</span>
                          your_name <span className="text-gray-500">--required</span>
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Alex Turing"
                          className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.03] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-purple-300 mb-1.5">
                          <span className="text-emerald-400 mr-1">$</span>
                          your_email <span className="text-gray-500">--required</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="alex@domain.com"
                          className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.03] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-purple-300 mb-1.5">
                        <span className="text-emerald-400 mr-1">$</span>
                        subject <span className="text-gray-500">--context</span>
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="e.g. ML Internship / Project Collaboration"
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.03] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-purple-300 mb-1.5">
                        <span className="text-emerald-400 mr-1">$</span>
                        message_body <span className="text-gray-500">--markdown</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Type your message here..."
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-400/60 focus:bg-white/[0.03] transition-all resize-none"
                      />
                    </div>

                    {status === "success" && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payload transmitted successfully. I will respond to your email promptly!</span>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                        Error transmitting message. Please email directly at jishnudip.saha.2004@gmail.com.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full group inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono font-semibold text-xs shadow-glow-purple transition-all duration-300 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      <span>{status === "loading" ? "Transmitting..." : "Send Payload"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </SectionWrapper>
          </div>

          {/* Right Cards: Direct Channels */}
          <div className="lg:col-span-2 space-y-4">
            <SectionWrapper direction="right" delay={0.2}>
              <div className="space-y-4">
                {contactCards.map((card) => {
                  const Icon = card.icon
                  const isCopied = copiedItem === card.title
                  return (
                    <div
                      key={card.title}
                      className="glass-card rounded-2xl p-5 border border-white/10 hover:border-purple-500/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-semibold text-white">
                              {card.title}
                            </span>
                            <span className="block text-[10px] font-mono text-gray-500">
                              {card.label}
                            </span>
                          </div>
                        </div>

                        {card.copyValue && (
                          <button
                            onClick={() => handleCopy(card.copyValue!, card.title)}
                            className="p-1.5 rounded-lg glass-pill text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy to clipboard"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>

                      <a
                        href={card.href}
                        className="text-xs font-mono text-purple-300 hover:text-cyan-300 transition-colors break-all"
                      >
                        {card.value}
                      </a>
                    </div>
                  )
                })}
              </div>
            </SectionWrapper>

            {/* Social Grid */}
            <SectionWrapper direction="right" delay={0.3}>
              <div className="glass-panel rounded-2xl p-5 border border-white/10">
                <h4 className="text-xs font-mono font-bold text-gray-300 mb-3 uppercase tracking-wider">
                  Social Handshakes
                </h4>
                <div className="space-y-2">
                  {socialLinks.map((s) => {
                    const Icon = s.icon
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playKeyClick()}
                        className="flex items-center justify-between p-2.5 rounded-xl glass-pill text-xs font-mono text-gray-300 hover:text-white hover:border-purple-500/40 transition-all hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-purple-400" />
                          <span>{s.label}</span>
                        </div>
                        <span className="text-[11px] text-gray-500">{s.handle}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </main>
  )
}
