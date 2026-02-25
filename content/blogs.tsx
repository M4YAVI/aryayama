export interface BlogPost {
    title: string;
    date: string;
    readTime?: string;
    slug: string;
    excerpt: string;
    content?: React.ReactNode;
}

export const blogs: BlogPost[] = [

    {
        title: "My Way to Live in Today’s World",
        date: "February 25, 2026",
        readTime: "3 min read",
        slug: "my-way-to-live",
        excerpt: "A deliberate life in a loud world — protecting attention, choosing depth, and reading across history, literature, and science.",
        content: (
            <>
                <div className="space-y-6 text-white leading-relaxed max-w-3xl mx-auto px-6 py-6">

                    <p>
                        The world feels loud now. Everyone is posting, reacting, arguing, proving, branding, and chasing visibility.
                        If you stay quiet, people think something is wrong. If you stay offline, people assume you are behind.
                    </p>

                    <p>
                        I don’t hate modern life. I just don’t want to be consumed by it.
                        Most apps are designed to keep attention, not to improve thought.
                        Most trends reward speed, not depth.
                        Most debates are about winning, not understanding.
                    </p>

                    <p className="font-medium">
                        So I keep one simple rule: use energy where it matters, and don’t waste it where it doesn’t.
                    </p>

                    <p>
                        Energy is limited. Attention is limited.
                        A life can disappear inside constant reaction.
                        I don’t want that kind of life.
                    </p>

                    <h2 className="text-2xl font-semibold pt-8">
                        Protecting Quiet
                    </h2>

                    <p>
                        I used to think my style was a flaw — too quiet, too detached, too unwilling to join noise.
                        Now I think many people are not lazy at all. They are over-stimulated and tired.
                    </p>

                    <p>
                        Too many choices. Too many notifications.
                        Too many opinions arriving before a thought is fully formed.
                        When your mind is always interrupted, even small tasks feel heavy.
                    </p>

                    <p className="font-medium">
                        Quiet is not emptiness. Quiet is working space.
                    </p>

                    <h2 className="text-2xl font-semibold pt-8">
                        What Kind of Life I Want
                    </h2>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Fewer promises and better follow-through</li>
                        <li>Slower thinking and cleaner decisions</li>
                        <li>Relationships based on trust, not performance</li>
                        <li>Work that feels honest, not just visible</li>
                        <li>Time to read, walk, think, and notice small things</li>
                    </ul>

                    <p>
                        I don’t need to optimize every hour.
                        I don’t need to turn every hobby into income.
                        I don’t need to become a better version of myself every week.
                    </p>

                    <h2 className="text-2xl font-semibold pt-8">
                        Why Reading Matters
                    </h2>

                    <h3 className="text-xl font-semibold pt-6">
                        1. History — Perspective Against Panic
                    </h3>

                    <p>
                        History breaks the illusion that everything now is unprecedented.
                        Empires looked permanent until they were not.
                        Economic certainty collapsed many times.
                        Ideas once treated as common sense later became embarrassing.
                    </p>

                    <p className="italic">
                        Without history, we become easy to manipulate.
                        With history, we become harder to rush.
                    </p>

                    <h3 className="text-xl font-semibold pt-6">
                        2. Literature — Empathy Without Performance
                    </h3>

                    <p>
                        Literature gives interior depth.
                        A novel does not shout for instant reaction.
                        It asks you to stay with a person’s mind, even when they are flawed.
                    </p>

                    <p>
                        The more I read literature, the less I expect people to be simple.
                        It improves language, and language improves thought.
                    </p>

                    <h3 className="text-xl font-semibold pt-6">
                        3. Science — Humility and Method
                    </h3>

                    <p>
                        Science is disciplined doubt.
                        It teaches me to separate what I feel, what I assume, and what evidence supports.
                    </p>

                    <p>
                        In a world full of confident nonsense, this is a survival skill.
                        The lesson is simple: be curious, but verify.
                    </p>

                    <h2 className="text-2xl font-semibold pt-8">
                        My Personal Philosophy
                    </h2>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Protect attention</li>
                        <li>Choose depth over speed</li>
                        <li>Read across time, minds, and reality</li>
                        <li>Stay kind, even when staying distant</li>
                        <li>Show up when it truly matters</li>
                    </ul>

                    <p className="pt-4">
                        I’m not trying to be impressive.
                        I’m trying to be awake.
                        In today’s world, that already feels like enough.
                    </p>

                </div>
            </>
        )
    }
];
