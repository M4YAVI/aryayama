"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Tech categories
const categories = [
  { id: "languages", name: "LANGUAGES" },
  { id: "frameworks", name: "FRONTEND" },
  { id: "databases", name: "DATABASES" },
  { id: "tools", name: "TOOLS" },
  { id: "platforms", name: "PLATFORMS" },
  { id: "ai", name: "AI & AGENTS" },
]

// Tech stack data
const techStack = {
  languages: [
    { name: "JavaScript", icon: "/icons/js.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "PSQL", icon: "/icons/psql.svg" },
    { name:"NodeJS",icon:"/icons/nodejs.svg"},
    {name:"Rust",icon:"/icons/rust_dark.svg"}
  ],
  frameworks: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/next.svg" },
    { name: "TailwindCSS", icon: "/icons/tailwind.svg" },
    {name:"ReactQuery",icon:"/icons/reactquery.svg"},
    { name: "Flask", icon: "/icons/flask.svg" },
    { name: "Hono.js", icon: "/icons/hono.svg" },
    { name: "shadcn", icon: "/icons/shadcn-ui_dark.svg" },
  ],
  databases: [
    { name: "PostgreSQL", icon: "/icons/psql.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "Neon DB", icon: "/icons/neon.svg" },
    { name: "Supabase", icon: "/icons/supabase.svg" },
    { name: "Drizzle ORM", icon: "/icons/drizzle.svg" },
  ],
  tools: [
    {name:"HuggingFace",icon:"icons/huggingface.svg"},
    {name:"Cloudflare Workers",icon:"icons/cloudflare-workers.svg"},
    { name: "Docker", icon: "/icons/docker.svg" },
    { name: "GitHub", icon: "/icons/github.svg" },
    {name:"Postman",icon:"/icons/postman.svg"},
    {name:"pnpm",icon:"/icons/pnpm_dark.svg"},
    {name:"Notion",icon:"icons/notion.svg"},
    {name:"Obsidian",icon:"icons/obsidian.svg"},
    {name:"Linear",icon:"icons/linear.svg"}
  ],
  platforms: [
    { name: "Vercel", icon: "/icons/vercel.svg" },
    { name: "Netlify", icon: "/icons/netlify.svg" },
    { name: "GitHub", icon: "/icons/github.svg" },
    {name:"Cloudflare", icon:"/icons/cloudflare.svg"}
  ],
  ai: [
    { name: "PyTorch", icon: "/icons/pytorch.png" },
    { name: "LangChain", icon: "/icons/langchain.svg" },
    { name: "ChatGPT", icon: "/icons/chatgpt.svg" },
    { name: "Claude", icon: "/icons/claude-ai.svg" },
    { name: "Perplexity", icon: "/icons/perplexity.svg" },
    { name: "CrewAI", icon: "/icons/crewai.svg" },
  ],
}

// Main tech stack description
const mainTechDescription = [
  { text: "I use", className: "text-gray-400" },
  { text: "Next.js", icon: "/icons/next.svg", className: "text-white" },
  { text: " with", className: "text-gray-400" },
  {text:"Typescript,",icon:"/icons/typescript.svg",className: "text-white"},
  { text: "TailwindCSS", icon: "/icons/tailwind.svg", className: "text-white" },
  { text: "for the Backend I use", className: "text-gray-400" },
  { text: "supabase", icon: "/icons/supabase.svg", className: "text-white" },
  { text: "and", className: "text-gray-400" },
  { text: "NeonDB", icon: "/icons/neon.svg", className: "text-white" },
  { text: "with", className: "text-gray-400" },
  { text: "Drizzle", icon: "/icons/drizzle.svg", className: "text-white" },
  { text: "as an ORM, for database management.", className: "text-gray-400" },
]

const ideDescription = [
  { text: "At last, but not least, I use", className: "text-gray-400" },
  { text: "Cursor", icon: "/icons/cursor.svg", className: "text-white" },
  { text: "IDE for creating awesome projects.", className: "text-gray-400" },
]

export function Tech() {
  const [activeCategory, setActiveCategory] = useState("languages")

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-mono text-white mb-6">My Skills</h1>

      {/* Main tech stack description */}
      <div className="mb-8 flex flex-wrap gap-2 items-center">
        {mainTechDescription.map((item, index) => (
          <span key={index} className={cn("flex items-center gap-1", item.className)}>
            {item.icon && (
              <span className="inline-flex items-center justify-center bg-zinc-900 rounded-md p-1 h-6 w-6">
                <Image src={item.icon || "/placeholder.svg"} alt="" width={16} height={16} unoptimized />
              </span>
            )}
            {item.text}
          </span>
        ))}
      </div>

      {/* IDE description */}
      <div className="mb-12 flex flex-wrap gap-2 items-center">
        {ideDescription.map((item, index) => (
          <span key={index} className={cn("flex items-center gap-1", item.className)}>
            {item.icon && (
              <span className="inline-flex items-center justify-center bg-zinc-900 rounded-md p-1 h-6 w-6">
                <Image src={item.icon || "/placeholder.svg"} alt="" width={16} height={16} unoptimized />
              </span>
            )}
            {item.text}
          </span>
        ))}
        <span className="text-white">❤️</span>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-gray-500 text-sm mb-4">&lt; {category.name} /&gt;</h2>
          <div className="flex flex-wrap gap-3">
            {techStack[category.id as keyof typeof techStack].map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 bg-zinc-900 rounded-full px-3 py-1.5 text-sm">
                <span className="flex items-center justify-center h-5 w-5">
                  <Image src={tech.icon || "/placeholder.svg"} alt="" width={20} height={20} unoptimized />
                </span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

