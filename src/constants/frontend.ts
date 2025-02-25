import { Globe, FileCode, Wind, Layout, Book } from "lucide-react"
import { Technology } from "./types"

export const frontendTechnologies: Technology[] = [
  { name: "Next.js", icon: Globe, description: "A React framework for building web applications.", mdxPath: "src/mdx/frontend/nextjs.mdx" },
  { name: "React", icon: Globe, description: "A JavaScript library for building user interfaces.", mdxPath: "src/mdx/frontend/react.mdx" },
  { name: "TypeScript", icon: FileCode, description: "A typed superset of JavaScript.", mdxPath: "src/mdx/frontend/typescript.mdx" },
  { name: "TailwindCSS", icon: Wind, description: "A utility-first CSS framework.", mdxPath: "src/mdx/frontend/tailwind.mdx" },
  { name: "Shadcn UI", icon: Layout, description: "A component library for React.", mdxPath: "src/mdx/frontend/shadcn.mdx" },
  { name: "Framer Motion", icon: Book, description: "A motion library for React." },
]