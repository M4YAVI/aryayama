export interface BlogPost {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
    content?: React.ReactNode;
}

export const blogs: BlogPost[] = [
    {
        title: "The Illusion of Competence",
        date: "October 12, 2023",
        slug: "illusion-of-competence",
        excerpt: "Why feeling like you understand something is not the same as actually understanding it. A deep dive into cognitive biases in learning.",
        content: (
            <>
                <p>
                    There's a dangerous trap in learning that catches almost everyone: the illusion of competence. It's that feeling when you read a concept, nod your head, and think, "Yeah, I totally get that."
                    But if someone asked you to explain it from scratch—or better yet, build it—you'd freeze.
                </p>

                <div className="my-12 p-8 border border-white/10 bg-[#000000] rounded-lg">
                    <code className="text-yellow-400/90 text-sm">
                        // Example check
                        <br />
                        const understanding = await learnDeeply(concept);
                        <br />
                        if (!understanding.firstPrinciples) {'{'}
                        <br />
                        &nbsp;&nbsp;throw new IllusionOfCompetenceError("You just skimmed it.");
                        <br />
                        {'}'}
                    </code>
                </div>

                <p>
                    That's why I build things from scratch. Not because reinventing the wheel is efficient for shipping products. But because reinventing the wheel is the only way to prove you actually know how the wheel works. The struggle of breaking something and fixing it forces the knowledge deep into your brain. You can't fake it when the code doesn't compile.
                </p>
            </>
        )
    },
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
