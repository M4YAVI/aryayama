import { Server, Database, Lock, FlaskConical } from "lucide-react"
import { Technology } from "./types"

export const backendTechnologies: Technology[] = [
  { name: "PostgreSQL", icon: Database, description: "An open-source relational database.", mdxPath: "src/mdx/backend/postgresql.mdx" },
  { name: "Drizzle ORM", icon: Database, description: "A lightweight ORM for SQL databases.", mdxPath: "src/mdx/backend/drizzle.mdx" },
  { name: "Supabase", icon: Database, description: "An open-source Firebase alternative.", mdxPath: "src/mdx/backend/supabase.mdx" },
  { name: "Clerk Auth", icon: Lock, description: "Authentication and user management." },
  { name: "Flask", icon: FlaskConical, description: "A micro web framework for Python.", mdxPath: "src/mdx/backend/flask.mdx" },
  { name: "Hono.js", icon: Server, description: "A small, simple, and fast web framework.", mdxPath: "src/mdx/backend/hono.mdx" },
  { name: "Redis", icon: Database, description: "An in-memory data structure store.", mdxPath: "src/mdx/backend/redis.mdx" },
]