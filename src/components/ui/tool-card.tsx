import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface ToolCardProps {
  href: string
  title: string
  description: string
  iconColor: string
}

export function ToolCard({ href, title, description, iconColor }: ToolCardProps) {
  return (
    <Link 
      href={href}
      className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mt-2">{description}</p>
    </Link>
  )
} 