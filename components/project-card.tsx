import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  live?: string
}

export default function ProjectCard({ title, description, image, technologies, github, live }: ProjectCardProps) {
  return (
    <div className="group transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
      <div className="glass rounded-2xl overflow-hidden h-full transition-all duration-500 hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="relative overflow-hidden h-48">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-4 h-4" />
            </a>
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 transition-all duration-300 group-hover:text-purple-400 group-hover:translate-x-1">{title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 transition-all duration-300 hover:bg-purple-500/20 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
