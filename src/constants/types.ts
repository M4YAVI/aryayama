import { ComponentType } from "react"

export interface Technology {
  name: string
  icon: ComponentType<{ className?: string }>
  description: string
  mdxPath?: string
}

export interface Category {
  name: string
  icon: ComponentType<{ className?: string }>
  technologies: Technology[]
}