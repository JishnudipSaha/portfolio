"use client"

import { useState, useEffect, useMemo } from "react"
import { GitCommit, Flame, CheckCircle2 } from "lucide-react"

// Pure deterministic pseudo-random function without Math.random()
function getCommitCount(w: number, d: number): number {
  const seed = (w * 29 + d * 13 + 7) % 19
  if (seed > 15) return 4
  if (seed > 10) return 3
  if (seed > 6) return 2
  if (seed > 3) return 1
  return 0
}

export default function GitHubActivity() {
  const [hoveredDay, setHoveredDay] = useState<{ dayLabel: string; count: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 26 weeks x 7 days = 182 deterministic data points
  const weeks = useMemo(() => {
    const data = []
    for (let w = 25; w >= 0; w--) {
      const days = []
      for (let d = 0; d < 7; d++) {
        const count = getCommitCount(w, d)
        days.push({
          dayLabel: `Week ${26 - w}, Day ${d + 1}`,
          count,
        })
      }
      data.push(days)
    }
    return data
  }, [])

  const totalCommits = 487

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-white/[0.04] border-white/[0.03]"
    if (count === 1) return "bg-purple-900/50 border-purple-700/40 text-purple-200"
    if (count === 2) return "bg-purple-600/70 border-purple-500/50 text-white"
    if (count <= 3) return "bg-cyan-500/80 border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    return "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
  }

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 specular-border">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-glow-purple">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold font-mono text-white">
                Dev Activity &amp; Commit Velocity
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                active
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Continuous delivery across open source &amp; research repos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-pill text-xs font-mono text-gray-300">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span><strong className="text-white">18-day</strong> streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-pill text-xs font-mono text-purple-300 border border-purple-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span><strong className="text-white">{totalCommits}+</strong> contributions</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[580px]">
          <div className="flex gap-1.5 justify-between">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3.5 h-3.5 rounded-sm border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${getColorClass(
                      day.count
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Days & Months labels */}
          <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-gray-500">
            <span>6 months ago</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.04] border border-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-900/50 border border-purple-700/40" />
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-600/70 border border-purple-500/50" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/80 border border-cyan-400/60" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-300" />
              <span>More</span>
            </div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Hover Status Bar */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="text-gray-400">
          {hoveredDay ? (
            <span>
              <strong className="text-cyan-300">{hoveredDay.count} commits</strong> on {hoveredDay.dayLabel}
            </span>
          ) : (
            <span className="text-gray-500">Hover over any square to inspect commit frequency</span>
          )}
        </div>
        <a
          href="https://github.com/JishnudipSaha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1 transition-colors"
        >
          <span>github.com/JishnudipSaha</span>
          <span className="text-xs">↗</span>
        </a>
      </div>
    </div>
  )
}
