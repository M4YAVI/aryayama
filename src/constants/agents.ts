import { Link, Workflow, Book, Code } from "lucide-react"
import { Technology } from "./types"

export const agentTechnologies: Technology[] = [
  { name: "Langchain", icon: Link, description: "A framework for developing applications powered by language models. Currently learning.", mdxPath: "src/mdx/agents/langchain.mdx" },
  { name: "n8n", icon: Workflow, description: "A workflow automation tool. Currently learning.", mdxPath: "src/mdx/agents/n8n.mdx" },
  { name: "Crawl4AI", icon: Book, description: "A web crawling tool for AI applications. Currently learning.", mdxPath: "src/mdx/agents/crawl4ai.mdx" },
  { name: "LlamaIndex", icon: Book, description: "A data framework for LLM applications. Currently learning.", mdxPath: "src/mdx/agents/llamaindex.mdx" },
  { name: "PydanticAI", icon: Code, description: "Data validation and settings management using Python type annotations. Currently learning.", mdxPath: "src/mdx/agents/pydanticai.mdx" },
]