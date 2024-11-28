'use client'

import { Sun } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">OneTinyTool</h1>
          <p className="text-gray-400 text-xl">Simple and efficient tools for everyday use</p>
        </div>
        <button className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white">
          <Sun className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.href}
            href={tool.href}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
            <p className="text-gray-400 mt-2">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
