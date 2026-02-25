export interface BlogPost {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
    content?: React.ReactNode;
}

export const blogs: BlogPost[] = [
    {
        title: "Why I build everything from scratch",
        date: "August 24, 2023",
        slug: "building-from-scratch",
        excerpt: "The value of reinventing the wheel when you're trying to learn how wheels work in the first place.",
        content: (
            <>
                <p>
                    Building from scratch is often seen as a waste of time. Why write your own authentication when Auth0 exists? Why build a UI library when Shadcn is right there?
                </p>
                <p>
                    Because when you use abstractions, you learn the abstraction. When you build from scratch, you learn the foundation.
                </p>
            </>
        )
    },
    {
        title: "Understanding LLMs conceptually",
        date: "May 03, 2023",
        slug: "understanding-llms",
        excerpt: "Breaking down the math and logic behind large language models for non-researchers.",
        content: (
            <>
                <p>
                    Large Language Models aren't magic. At their core, they are extremely sophisticated statistical engines playing "guess the next word" in high-dimensional space.
                </p>
                <p>
                    Understanding the transformer architecture—attention mechanisms, embeddings, and positional encoding—is key to grasping why they succeed, and more importantly, why they fail.
                </p>
            </>
        )
    }
];
