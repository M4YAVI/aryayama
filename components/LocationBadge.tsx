'use client';

import React, { useState, useEffect } from 'react';

export default function LocationBadge() {
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
        <div className="mt-4 md:mt-6 group">
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
    );
}
