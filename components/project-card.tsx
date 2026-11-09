"use client"

import { ExternalLink, Github, FolderGit2, Star, Sparkles } from "lucide-react"
import { playKeyClick } from "./sound-effects"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  live?: string
  featured?: boolean
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  live,
  featured = false,
}: ProjectCardProps) {
  // Format git slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  return (
    <div className="group relative transition-all duration-500 h-full">
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-purple-500/40 hover:shadow-glow-purple">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/5 text-[11px] font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-300 font-semibold truncate max-w-[170px] sm:max-w-none">
              ~/{slug}.git
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {featured && (
              <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                Featured
              </span>
            )}
            <span className="text-[10px] text-gray-500 font-mono">main*</span>
          </div>
        </div>

        {/* Image Preview with Hover Overlay */}
        <div className="relative overflow-hidden h-48 sm:h-52 bg-[#0d0d17]/50">
          <img
            src={image || "/placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Quick Action Floating Bar */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playKeyClick()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 hover:border-purple-400 hover:bg-purple-600/40 text-xs font-mono transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Github className="w-3.5 h-3.5 text-purple-400" />
              <span>Source</span>
            </a>

            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playKeyClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-mono transition-all duration-200 hover:scale-105 shadow-glow-cyan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-mono mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-5 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          <div>
            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg glass-pill text-purple-300 border border-white/5 hover:border-purple-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
