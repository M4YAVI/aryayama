import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import ShaderBackground from '@/components/ShaderBackground';
import { tools } from '@/content/tools';

export default function ToolsPage() {
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

                    <h1 className="text-[36px] md:text-[48px] font-bold tracking-[2px] mb-2 text-white uppercase relative inline-block">
                        <span className="absolute -inset-2 bg-yellow-500/20 blur-3xl z-0 rounded-full opacity-40 mix-blend-screen"></span>
                    </h1>
                    <h2 className="text-[14px] md:text-[18px] font-bold text-white/40 tracking-[2px] uppercase">
                        Systems, Tools, & Architectures I've Built
                    </h2>
                </div>

                {/* Tools Grid */}
                <div className="p-8 md:p-12 relative min-h-[400px]">
                    {/* Decorative grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tools.map((tool, i) => (
                            <div
                                key={tool.name}
                                className="group relative p-8 rounded-xl bg-[#000000] border border-white/[0.05] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-1 flex flex-col h-full"
                            >
                                {/* Glowing accent line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide uppercase">
                                        {tool.name}
                                    </h3>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[2px] text-white/60 uppercase">
                                        {tool.status}
                                    </div>
                                </div>

                                <p className="text-white/60 text-[clamp(0.85rem,1.2vw,0.95rem)] leading-relaxed font-bold tracking-[0.5px] flex-grow mb-8">
                                    {tool.description}
                                </p>

                                <div className="mt-auto">
                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {tool.tech.map(t => (
                                            <span key={t} className="text-[11px] font-bold tracking-[1px] text-white/40 uppercase bg-white/[0.02] px-2 py-1 rounded border border-white/[0.03]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                                        <Link href={tool.url} className="inline-flex items-center text-[12px] font-bold tracking-[1px] text-white/50 hover:text-yellow-400 transition-colors uppercase">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Live Demo
                                        </Link>
                                        <Link href={tool.github} className="inline-flex items-center text-[12px] font-bold tracking-[1px] text-white/50 hover:text-white transition-colors uppercase">
                                            <Github className="w-4 h-4 mr-2" />
                                            Source
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
