import { Code, FileCode, Wrench, GitBranch, Fish } from "lucide-react"
import { Technology } from "./types"

export const otherTechnologies: Technology[] = [
  { name: "Python", icon: Code, description: "A versatile programming language used across various domains.", mdxPath: "src/mdx/other/python.mdx" },
  { name: "TypeScript", icon: FileCode, description: "A typed superset of JavaScript, also used in frontend and backend development.", mdxPath: "src/mdx/other/typescript.mdx" },
  { name: "Rust", icon: Wrench, description: "A systems programming language focusing on performance and safety.", mdxPath: "src/mdx/other/rust.mdx" },
  { name: "Git", icon: GitBranch, description: "A distributed version control system for tracking changes in source code", mdxPath: "src/mdx/other/git.mdx" },
  { name: "Docker", icon: Fish, description: "A platform for developing, shipping, and running applications in containers", mdxPath: "src/mdx/other/docker.mdx" },
]