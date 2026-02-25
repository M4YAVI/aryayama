'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // How far down the page we've scrolled
            const currentScrollY = window.scrollY;

            // Total height of the page minus the viewport height
            // (this gives us the total scrollable distance)
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollableHeight > 0) {
                // Calculate percentage
                let percentage = (currentScrollY / scrollableHeight) * 100;
                // Clamp between 0 and 100
                percentage = Math.max(0, Math.min(100, percentage));
                setProgress(percentage);
            }
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial call to set state on mount
        handleScroll();

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Format percentage as 3 digits with leading zeros (e.g. 047%)
    const formattedProgress = Math.round(progress).toString().padStart(3, '0') + '%';

    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-6 mix-blend-difference opacity-70 hover:opacity-100 transition-opacity duration-300">
            {/* The Text Percentage */}
            <span className="text-white text-[12px] font-bold tracking-[2px] font-[family-name:var(--font-geist-pixel-square)]">
                {formattedProgress}
            </span>

            {/* The Vertical Line Container */}
            <div className="w-[2px] h-[100px] bg-white/20 relative rounded-full overflow-hidden">
                {/* The Filled Progress Line */}
                <div
                    className="absolute top-0 left-0 w-full bg-white transition-all duration-100 ease-out"
                    style={{ height: `${progress}%` }}
                />
            </div>

            {/* The "READING" tag rotated */}
            <span
                className="text-white text-[10px] font-bold tracking-[4px] uppercase font-[family-name:var(--font-geist-pixel-square)]"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
                Reading
            </span>
        </div>
    );
}
