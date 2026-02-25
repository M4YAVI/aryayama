import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ShaderBackground from '@/components/ShaderBackground';
import { blogs } from '@/content/blogs';

export default function BlogPage() {
    return (
        <main className="min-h-screen text-white py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            <ShaderBackground />

            <div className="relative z-10 w-full max-w-[960px] mx-auto bg-[#000000] backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden font-[family-name:var(--font-geist-pixel-square)]">
                {/* Header */}
                <div className="p-8 md:p-12 border-b border-white/5 relative bg-gradient-to-b from-white/5 to-transparent">
                    <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-8 group text-sm tracking-[2px] uppercase font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Profile
                    </Link>

                    <h1 className="text-[36px] md:text-[48px] font-bold tracking-[2px] mb-2 text-white uppercase relative">
                        <span className="relative z-10">Neural Log</span>
                        <span className="absolute -inset-1 bg-white/20 blur-2xl z-0 rounded-full opacity-50"></span>
                    </h1>
                    <h2 className="text-[14px] md:text-[18px] font-bold text-white/40 tracking-[2px] uppercase">
                        Thoughts, Research, & Observations
                    </h2>
                </div>

                {/* Posts List */}
                <div className="p-8 md:p-12 space-y-4 relative">
                    {/* Decorative grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col gap-6">
                        {blogs.map((post, i) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.slug}
                                className="group block"
                            >
                                <div className="relative p-6 rounded-lg bg-[#000000] border border-white/[0.05] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] hover:-translate-y-1">
                                    {/* Hover effect gradient */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                                        <h3 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide uppercase group-hover:text-white transition-colors">
                                            {post.title}
                                        </h3>
                                        <span className="text-[12px] font-bold text-white/40 tracking-[2px] whitespace-nowrap">
                                            {post.date}
                                        </span>
                                    </div>

                                    <p className="text-white/60 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed font-bold tracking-[0.5px]">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-6 flex items-center text-yellow-400/70 text-[12px] font-bold tracking-[2px] uppercase group-hover:text-yellow-400 transition-colors">
                                        <span>Read Entry</span>
                                        <span className="ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
