export interface Tool {
    name: string;
    description: string;
    tech: string[];
    url: string;
    github: string;
    status: "Active" | "Completed" | "Beta" | "Archived";
}

export const tools: Tool[] = [
    {
        name: "CrawlConsole",
        description: "A fast, concurrent web scraper and AI integration engine meant for processing massive amounts of unstructured data.",
        tech: ["Rust", "Next.js", "PostgreSQL"],
        url: "#",
        github: "#",
        status: "Active"
    },
    {
        name: "Neural DB Interface",
        description: "Natural language to SQL interface for exploring large relational databases seamlessly without writing queries.",
        tech: ["Python", "React", "OpenAI"],
        url: "#",
        github: "#",
        status: "Completed"
    },
    {
        name: "Minimalist Term",
        description: "A browser-based terminal emulator that mimics vintage computing environments with modern features.",
        tech: ["TypeScript", "WebGL", "WebSockets"],
        url: "#",
        github: "#",
        status: "Beta"
    }
];
