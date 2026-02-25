import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ShaderBackground from '@/components/ShaderBackground';
import ScrollProgress from '@/components/ScrollProgress';
import { blogs } from '@/content/blogs';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = blogs.find(b => b.slug === slug);

    if (!post) {
        return notFound();
    }

    return (
        <main className="min-h-screen text-white py-20 px-4 flex flex-col items-center relative overflow-hidden">
            <ShaderBackground />
            <ScrollProgress />

            <article className="relative z-10 w-full max-w-[960px] mx-auto bg-[#000000] backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden font-[family-name:var(--font-geist-pixel-square)]">
                <div className="p-8 md:p-16 border-b border-white/5 relative bg-gradient-to-b from-white/5 to-transparent">
                    <Link href="/blog" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 group text-sm tracking-[2px] uppercase font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Log
                    </Link>

                    <div className="flex items-center justify-between mb-8 text-white/40 text-[12px] font-bold tracking-[2px] uppercase w-full">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 mb-[2px]" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 mb-[2px]" />
                            <span>{post.readTime || '5 min read'}</span>
                        </div>
                    </div>

                    <h1 className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold tracking-[1px] mb-8 text-white uppercase relative">
                        <span className="relative z-10">{post.title}</span>
                        <span className="absolute -inset-4 bg-white/10 blur-3xl z-0 rounded-full opacity-50"></span>
                    </h1>
                </div>

                <div className="p-8 md:p-16 relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                    <div className="relative z-10 prose prose-invert prose-p:text-white/70 prose-p:text-[clamp(1rem,1.5vw,1.1rem)] prose-p:leading-[1.8] prose-p:font-bold prose-p:tracking-[0.5px] max-w-none">
                        {post.content || (
                            <p className="text-xl text-white/90 leading-relaxed border-l-2 border-yellow-400 pl-6">
                                Content for this entry is currently missing or corrupted.
                            </p>
                        )}
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[12px] font-bold tracking-[2px] uppercase text-white/40">
                        <span>End of Log</span>
                    </div>
                </div>
            </article>
        </main>
    );
}
