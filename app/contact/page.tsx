"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Sparkles } from "lucide-react"
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
    <main className="min-h-screen bg-black pt-24">
      <div className="px-6 pb-24">
        <SectionWrapper>
          <div className="max-w-6xl mx-auto text-center py-16">
            <GradientText as="h1" className="text-4xl sm:text-6xl font-bold mb-6">
              Get In Touch
            </GradientText>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Let&apos;s collaborate and create something amazing together
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.2}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-6 sm:p-8 gradient-border">
                <h2 className="text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Send a Message
                  </span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Name</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Subject</label>
                    <input
                      name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit" disabled={status === "loading"}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                  {status === "success" && <p className="text-green-400 text-xs text-center">Message sent successfully!</p>}
                  {status === "error" && <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>}
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6 sm:p-8 gradient-border">
                <h2 className="text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Contact Info</span>
                </h2>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <a key={info.label} href={info.href} className="flex items-center gap-4 group transition-all duration-300 hover:-translate-x-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{info.label}</p>
                        <p className="text-sm text-white group-hover:text-purple-400 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 gradient-border">
                <h2 className="text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Social</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all border border-white/5"
                    >
                      <social.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper delay={0.3}>
          <div className="max-w-3xl mx-auto mt-24">
            <div className="glass rounded-3xl p-10 sm:p-14 text-center gradient-border">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-5" />
              <GradientText className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Start a Project?
              </GradientText>
              <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
                I&apos;m always excited to collaborate. Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:jishnudip.saha.2004@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/jishnudipsaha/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 text-purple-300 font-semibold text-sm transition-all duration-300 hover:bg-purple-500/10"
                >
                  <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}
