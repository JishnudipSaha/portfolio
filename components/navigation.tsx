"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal, Search, Sparkles } from "lucide-react"
import CommandPalette from "./command-palette"
import { playKeyClick } from "./sound-effects"

const navItems = [
  { href: "/", label: "Home", code: "~/" },
  { href: "/about", label: "About", code: "about/" },
  { href: "/projects", label: "Projects", code: "projects/" },
  { href: "/achievements", label: "Achievements", code: "awards/" },
  { href: "/contact", label: "Contact", code: "contact/" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setCmdOpen((prev) => !prev)
        playKeyClick()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
          scrolled ? "pt-2 pb-2" : "pt-4 pb-2"
        }`}
      >
        <nav
          className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 specular-border ${
            scrolled
              ? "glass-panel bg-black/75 backdrop-blur-2xl border-white/10 shadow-glass-lg py-2 px-4 sm:px-6"
              : "glass bg-black/40 backdrop-blur-xl border-white/5 py-2.5 px-4 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo & Developer Status */}
            <Link
              href="/"
              onClick={() => playKeyClick()}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-glow-purple transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <div className="w-full h-full bg-[#07070f] rounded-[11px] flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 font-mono font-bold text-xs tracking-wider">
                      JS
                    </span>
                  </div>
                </div>
                {/* Active status pulse */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    Jishnudip
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    online
                  </span>
                </div>
                <p className="text-[10px] font-mono text-gray-500">Data Science &amp; Dev</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.02] p-1 rounded-xl border border-white/5">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => playKeyClick()}
                    className={`relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${
                      active
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border border-purple-500/30 shadow-glow-purple"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-purple-400/50 mr-1">$</span>
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right side: Command palette trigger & Mobile menu toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playKeyClick()
                  setCmdOpen(true)
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-gray-400 hover:text-white hover:border-purple-500/40 transition-all duration-200 cursor-pointer"
                title="Open Command Center (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden lg:inline text-gray-400">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-gray-400 bg-white/5 border border-white/10 rounded">
                  <span>⌘</span>K
                </kbd>
              </button>

              <button
                onClick={() => {
                  playKeyClick()
                  setIsOpen(!isOpen)
                }}
                className="md:hidden p-2 rounded-xl glass text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-1 animate-fade-in">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      playKeyClick()
                      setIsOpen(false)
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                      active
                        ? "text-purple-300 bg-purple-500/15 border border-purple-500/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>
                      <span className="text-purple-400/60 mr-2">&gt;</span>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-500">{item.code}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </nav>
      </header>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  )
}
