import Link from "next/link"
import { Terminal, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-6 relative overflow-hidden text-slate-100">
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="relative z-10 glass-panel rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center border border-white/10 shadow-glass-lg specular-border">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-6 shadow-glow-purple">
          <Terminal className="w-6 h-6" />
        </div>

        <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase mb-2 block">
          404: PAGE_NOT_FOUND
        </span>

        <h1 className="text-4xl sm:text-5xl font-black font-mono text-white mb-4">
          Null Pointer Exception
        </h1>

        <p className="text-xs sm:text-sm font-mono text-gray-400 mb-8 leading-relaxed">
          The requested route was not found in the portfolio directory.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-mono text-xs font-semibold shadow-glow-purple hover:scale-105 transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>./return-to-base</span>
        </Link>
      </div>
    </div>
  )
}
