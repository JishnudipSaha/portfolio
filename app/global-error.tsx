"use client"

import { Terminal, RefreshCcw } from "lucide-react"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050508] text-slate-100 flex items-center justify-center min-h-screen px-6">
        <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-mono text-white mb-2">500 // Runtime Exception</h2>
          <p className="text-xs font-mono text-gray-400 mb-6">
            An unexpected error occurred during execution.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>./restart-process</span>
          </button>
        </div>
      </body>
    </html>
  )
}
