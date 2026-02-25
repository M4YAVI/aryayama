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
        tech: ["Python", "FastAPI", "crawl4AI"],
        url: "#",
        github: "https://github.com/M4YAVI/crawlconsole",
        status: "Active"
    },
    {
        name: "PolyWiki",
        description: "AI-driven interactive knowledge explorer that generates structured, category-based wiki content with real-time streaming and deep topic navigation.",
        tech: ["Nextjs", "Typescript", "Openrouter"],
        url: "https://polywiki.netlify.app/",
        github: "https://github.com/M4YAVI/polywiki",
        status: "Active"
    },
    {
        name: "Youtube CLI",
        description: "A browser-based CLI tool that lets users fetch YouTube video transcripts instantly using a simple yt <url> command.",
        tech: ["TypeScript", "Chalk", "Bun"],
        url: "#",
        github: "https://github.com/M4YAVI/youtube-cli",
        status: "Completed"
    }
];
