'use client';

import Image from 'next/image';
import LocationBadge from '@/components/LocationBadge';
import ProfileLinks from '@/components/ProfileLinks';

const MinimalistProfile = () => {
    return (
        <div className="w-full max-w-[960px] mx-auto bg-[#000000] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] font-[family-name:var(--font-geist-pixel-square)]">
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
                    <LocationBadge />
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

                        <ProfileLinks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinimalistProfile;
