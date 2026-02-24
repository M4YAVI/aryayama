'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MinimalistProfile = () => {
    const [time, setTime] = useState('--:-- -- IST');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
            const istOffset = 5.5 * 60 * 60000;
            const istDate = new Date(utcTime + istOffset);

            let hours = istDate.getHours();
            let minutes: string | number = istDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            setTime(`${hours}:${minutes} ${ampm} IST`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-[960px] mx-auto bg-[#0a0a0a] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] font-[family-name:var(--font-geist-pixel-square)]">
            {/* Banner */}
            <div className="w-full h-[300px] relative">
                <Image fill className="object-cover" src="/bng.png" alt="Banner" sizes="960px" />
            </div>

            {/* Card Body */}
            <div className="px-8 pb-8 md:px-12 md:pb-12 relative">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <Image
                        width={130}
                        height={130}
                        className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full bg-[#1a1a1a] border-4 md:border-[6px] border-[#0a0a0a] -mt-[50px] md:-mt-[65px] z-10 relative object-cover grayscale contrast-110"
                        src="/profile.png"
                        alt="Aryayama"
                    />

                    <div className="mt-4 md:mt-6 group">
                        {/* Interactive Pill Badge */}
                        <div className="inline-flex items-center h-[38px] bg-white/5 px-4 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] cursor-default transition-all duration-400 ease-out hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]">
                            <img className="w-5 h-auto rounded-sm block" src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" />
                            <span className="text-[13px] font-bold tracking-[1px] text-white/95 ml-2.5 uppercase">India</span>

                            {/* Smooth expanding wrapper */}
                            <div className="grid grid-cols-[1fr] md:grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-cols-[1fr]">
                                <div className="inline-flex items-center overflow-hidden whitespace-nowrap min-w-0 opacity-100 md:opacity-0 translate-x-0 md:-translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-100">
                                    <div className="w-1 h-1 bg-white/25 rounded-full mx-3.5"></div>
                                    <span className="text-[13px] font-bold text-white/50 tracking-[1px] tabular-nums">{time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-[28px] md:text-[36px] font-bold tracking-[1px] mb-1 text-white uppercase">Sangeeth Reddy</h1>
                    <h2 className="text-[14px] md:text-[18px] font-bold text-white/50 mb-8 tracking-[2px] uppercase">AI Overseer</h2>
                </div>

                <div className="max-w-[760px]">
                    <div className="text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.6] tracking-[0.5px] text-white/80 font-bold space-y-5">
                        <p>I learned everything by myself. No teacher. No courses. No YouTube. I just read stuff and start building. That's how I learn best.</p>

                        <p>I know Python, TypeScript, Rust, and Go. I use Next.js, React, and PostgreSQL. I like working on everything—frontend, backend, database. I want to understand how the whole thing works, not just one part.</p>

                        <p>Honestly? I think I can build anything now. Not because I'm a genius. But because I know how to figure things out. Google it. Ask AI. Try stuff. Break it. Fix it. That's the whole game.</p>

                        <p>These days I'm really into AI. I read research papers about how LLMs work. The math. The logic. How they actually think. It's hard but super interesting. I want to really understand it, not just use it.</p>

                        <div className="space-y-2">
                            <p>
                                Some music I’ve been listening to lately —{" "}
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
                                If you want to connect, I’m on{" "}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinimalistProfile;
