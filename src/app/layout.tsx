import './globals.css'
import { Home, Palette, Camera, Sun } from 'lucide-react'
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tools = [
    {
      href: "/rgb-to-hex",
      icon: Palette,
      title: "RGB to HEX Converter",
      iconColor: "text-purple-500"
    },
    {
      href: "/photo-simulator",
      icon: Camera,
      title: "Photo Settings Simulator",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800/50 p-4">
            <div className="mb-8">
              <Link href="/" className="text-white text-xl font-bold">
                OneTinyTool
              </Link>
            </div>
            
            <nav className="space-y-2">
              <Link href="/" className="flex items-center gap-3 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              {tools.map((tool) => (
                <Link 
                  key={tool.href}
                  href={tool.href} 
                  className="flex items-center gap-3 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800"
                >
                  <tool.icon className={`w-5 h-5 ${tool.iconColor}`} />
                  <span>{tool.title}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
