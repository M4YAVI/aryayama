import Link from 'next/link';

export default function ProfileLinks() {
    return (
        <div className="space-y-4">
            <p>
                Read my thoughts and ideas on my{" "}
                <Link
                    href="/blog"
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-yellow-400 hover:bg-yellow-300 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#ffffff]"
                >
                    Blog
                </Link>
                .
            </p>

            <p>
                Check out the{" "}
                <Link
                    href="/tools"
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-yellow-400 hover:bg-yellow-300 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#ffffff]"
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
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-yellow-400 hover:bg-yellow-300 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#ffffff]"
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
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-[#ffffff] hover:bg-gray-200 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#fbbf24]"
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
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-[#ffffff] hover:bg-gray-200 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#fbbf24]"
                >
                    X
                </Link>
                {" "}or you can{" "}
                <Link
                    href="mailto:sangeethreddychejerla@gmail.com"
                    className="inline-block px-1.5 font-extrabold text-[#000000] bg-[#ffffff] hover:bg-gray-200 transition-colors -skew-x-3 rounded-sm shadow-[2px_2px_0px_#fbbf24]"
                >
                    email me
                </Link>
                .
            </p>
        </div>
    );
}
