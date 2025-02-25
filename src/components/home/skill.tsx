"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe, Server, Database, Cpu, Bot, FileCode, Wind, Layout, 
  Lock, FlaskConical, Link, Code, Wrench, Workflow, Book
} from "lucide-react"
import { cn } from "@/lib/utils"
import MDXContent from "@/components/MDXContent"

import { Category } from "@/constants/types"
import { frontendTechnologies } from "@/constants/frontend"
import { backendTechnologies } from "@/constants/backend"
import { deepLearningTechnologies } from "@/constants/deeplearning"
import { agentTechnologies } from "@/constants/agents"
import { otherTechnologies } from "@/constants/other"

const categories: Category[] = [
  {
    name: "Frontend",
    icon: Globe,
    technologies: frontendTechnologies,
  },
  {
    name: "Backend",
    icon: Server,
    technologies: backendTechnologies,
  },
  {
    name: "Deep Learning",
    icon: Cpu,
    technologies: deepLearningTechnologies,
  },
  {
    name: "AI Agents",
    icon: Bot,
    technologies: agentTechnologies,
  },
  {
    name: "Other (Tools)",
    icon: Book,
    technologies: otherTechnologies,
  },
]

// Main component
export default function SkillsShowcase() {
  const [openCategories, setOpenCategories] = React.useState<string[]>([categories[0].name])
  const [selectedTech, setSelectedTech] = React.useState<Category['technologies'][0] | null>(categories[0].technologies[0])

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="bg-black p-4 overflow-auto border-r border-gray-700">
        {categories.map((category) => (
          <div key={category.name}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-800 rounded-md"
              onClick={() => toggleCategory(category.name)}
            >
              <category.icon className="h-5 w-5 mr-2" />
              <span>{category.name}</span>
            </motion.div>
            <AnimatePresence>
              {openCategories.includes(category.name) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-4"
                >
                  {category.technologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "flex items-center cursor-pointer p-2 rounded-md",
                        selectedTech?.name === tech.name && "bg-gray-700"
                      )}
                      onClick={() => setSelectedTech(tech)}
                    >
                      <tech.icon className="h-4 w-4 mr-2" />
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Details Panel */}
      <div className="bg-black p-4 overflow-auto">
        <AnimatePresence mode="wait">
          {selectedTech ? (
            <motion.div
              key={selectedTech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900 p-4 rounded-md border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <selectedTech.icon className="h-8 w-8 mr-2" />
                <h2 className="text-2xl font-bold">{selectedTech.name}</h2>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">{selectedTech.description}</p>
              </div>
              {selectedTech.mdxPath && (
                <div className="mt-6 prose prose-invert max-w-none">
                  <MDXContent mdxPath={selectedTech.mdxPath} />
                </div>
              )}
            </motion.div>
          ) : (
            <p className="text-gray-400">Select a technology to see details.</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}