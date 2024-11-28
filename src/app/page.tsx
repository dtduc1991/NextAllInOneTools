'use client'

import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)

  // Handle theme toggle
  const toggleTheme = () => {
    const html = document.documentElement
    if (html.className.includes('dark')) {
      html.className = 'light md1-js'
    } else {
      html.className = 'dark md1-js'
    }
    setIsDark(!isDark)
  }

  const tools = [
    {
      href: "/rgb-to-hex",
      title: "RGB to HEX Converter",
      description: "Convert between RGB and HEX color formats",
      iconColor: "text-purple-500"
    },
    {
      href: "/photo-simulator",
      title: "Photo Settings Simulator",
      description: "Adjust and preview photo settings in real-time",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">OneTinyTool</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl">Simple and efficient tools for everyday use</p>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.href}
            href={tool.href}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
