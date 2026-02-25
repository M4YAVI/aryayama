import Link from 'next/link';

export default function ProfileLinks() {
    return (
        <div className="space-y-2">
            <p>
                Read my thoughts and ideas on my{" "}
                <Link
                    href="/blog"
                    className="underline underline-offset-4 hover:text-yellow-400 transition-colors"
                >
                    Blog
                </Link>
                .
            </p>

            <p>
                Check out the{" "}
                <Link
                    href="/tools"
                    className="underline underline-offset-4 hover:text-yellow-400 transition-colors"
                >
                    Tools I Build
                </Link>
                .
            </p>

            <p>
                Some music I've been listening to lately —{" "}
                <Link
                    href="https://myhz.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-yellow-400"
                >
                    Music
                </Link>
                .
            </p>

            <p>
                You can check out my code and projects on{" "}
                <Link
                    href="https://github.com/M4YAVI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-yellow-400"
                >
                    GitHub
                </Link>
                .
            </p>

            <p>
                If you want to connect, I'm on{" "}
                <Link
                    href="https://x.com/M4Y4VI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-yellow-400"
                >
                    X
                </Link>
                {" "}or you can{" "}
                <Link
                    href="mailto:sangeethreddychejerla@gmail.com"
                    className="underline underline-offset-4 hover:text-yellow-400"
                >
                    email me
                </Link>
                .
            </p>
        </div>
    );
}
