"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Sparkles, Terminal } from "lucide-react"
import CodeRain from "@/components/code-rain"
import SectionWrapper from "@/components/section-wrapper"
import GradientText from "@/components/gradient-text"

const contactInfo = [
  { icon: Mail, label: "Email", value: "jishnudip.saha.2004@gmail.com", href: "mailto:jishnudip.saha.2004@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9748612686", href: "tel:+919748612686" },
  { icon: MapPin, label: "Location", value: "Kolkata, West Bengal, India", href: "#" },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/JishnudipSaha" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/jishnudipsaha/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/jishnudip" },
  { icon: Mail, label: "Email", href: "mailto:jishnudip.saha.2004@gmail.com" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const data = new FormData(e.target as HTMLFormElement)
    const res = await fetch("https://formspree.io/f/mvgrvazg", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
    if (res.ok) {
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } else {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <main className="min-h-screen bg-black pt-24 relative">
      <CodeRain />

      <div className="relative z-10 px-6 pb-24">
        <SectionWrapper direction="scale">
          <div className="max-w-6xl mx-auto text-center py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
              <Terminal className="w-3 h-3 text-purple-400" />
              <span className="font-mono text-[10px] text-purple-400/60">$ ./contact --init</span>
            </div>
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              Get In Touch
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-purple-400/50">// </span>
              Let&apos;s collaborate and create something amazing together
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2} direction="none">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <SectionWrapper direction="left" delay={0.3}>
                <div className="glass rounded-2xl overflow-hidden gradient-border">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="text-gray-600 text-[10px] font-mono ml-2">terminal — contact-form</span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-bold mb-6 font-mono">
                      <span className="text-green-400/60">$</span>{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        ./send-message.sh
                      </span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-mono text-[10px] text-purple-400/60 mb-1.5">
                            <span className="text-green-400/60">$</span> name <span className="text-gray-600">--required</span>
                          </label>
                          <input
                            name="name" value={form.name} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:scale-[1.01] font-mono"
                            placeholder="Enter your name..."
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[10px] text-purple-400/60 mb-1.5">
                            <span className="text-green-400/60">$</span> email <span className="text-gray-600">--required</span>
                          </label>
                          <input
                            name="email" type="email" value={form.email} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:scale-[1.01] font-mono"
                            placeholder="Enter your email..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-purple-400/60 mb-1.5">
                          <span className="text-green-400/60">$</span> subject <span className="text-gray-600">--required</span>
                        </label>
                        <input
                          name="subject" value={form.subject} onChange={handleChange} required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:scale-[1.01] font-mono"
                          placeholder="Enter subject..."
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-purple-400/60 mb-1.5">
                          <span className="text-green-400/60">$</span> message <span className="text-gray-600">--required</span>
                        </label>
                        <textarea
                          name="message" value={form.message} onChange={handleChange} required rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all duration-300 focus:scale-[1.01] resize-none font-mono"
                          placeholder="Enter your message..."
                        />
                      </div>
                      <button
                        type="submit" disabled={status === "loading"}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 font-mono"
                      >
                        {status === "loading" ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <><Send className="w-4 h-4" /> ./send-message.sh</>
                        )}
                      </button>
                      {status === "success" && (
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                          <p className="text-green-400 text-xs text-center font-mono">
                            <span className="text-green-400/60">$</span> Message sent successfully!
                          </p>
                        </div>
                      )}
                      {status === "error" && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                          <p className="text-red-400 text-xs text-center font-mono">
                            <span className="text-red-400/60">!</span> Something went wrong. Please try again.
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </SectionWrapper>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <SectionWrapper direction="right" delay={0.4}>
                <div className="glass rounded-2xl overflow-hidden gradient-border">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="text-gray-600 text-[10px] font-mono ml-2">contacts.json</span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-bold mb-6 font-mono">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        contacts.json
                      </span>
                    </h2>
                    <code className="text-[11px] font-mono text-gray-400 block leading-relaxed">
                      <span className="text-purple-400/60">{`{`}</span>
                      {contactInfo.map((info, i) => (
                        <span key={info.label} className="block ml-4">
                          <span className="text-blue-300">"{info.label.toLowerCase()}"</span>:{" "}
                          <span className="text-green-300">"{info.value}"</span>
                          {i < contactInfo.length - 1 ? "," : ""}
                        </span>
                      ))}
                      <span className="text-purple-400/60">{`}`}</span>
                    </code>
                    <div className="mt-6 space-y-4">
                      {contactInfo.map((info) => (
                        <a key={info.label} href={info.href} className="flex items-center gap-4 group transition-all duration-300 hover:-translate-x-1">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                            <info.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 font-mono">{info.label.toLowerCase()}</p>
                            <p className="text-sm text-white group-hover:text-purple-400 transition-colors font-mono">{info.value}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionWrapper>

              <SectionWrapper direction="right" delay={0.55}>
                <div className="glass rounded-2xl p-6 sm:p-8 gradient-border">
                  <h2 className="text-xl font-bold mb-6 font-mono">
                    <span className="text-green-400/60">$</span>{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      connect
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, i) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank" rel="noopener noreferrer"
                        style={{ animationDelay: `${i * 0.08}s` }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 border border-white/5 animate-pop-in opacity-0 font-mono"
                      >
                        <social.icon className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="font-mono text-[9px] text-gray-600">
                      <span className="text-purple-400/40">#</span> Available 24/7 for opportunities
                    </p>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.35} direction="scale">
          <div className="max-w-3xl mx-auto mt-24">
            <div className="glass rounded-3xl p-10 sm:p-14 text-center gradient-border">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-5 animate-float" />
              <GradientText className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Start a Project?
              </GradientText>
              <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto font-mono">
                <span className="text-purple-400/50">// </span>
                I&apos;m always excited to collaborate. Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:jishnudip.saha.2004@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 font-mono"
                >
                  <Mail className="w-4 h-4" /> email me
                </a>
                <a
                  href="https://www.linkedin.com/in/jishnudipsaha/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 text-purple-300 font-semibold text-sm transition-all duration-300 hover:bg-purple-500/10 hover:scale-105 font-mono"
                >
                  <Linkedin className="w-4 h-4" /> connect --platform=linkedin
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
