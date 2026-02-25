import React from 'react';

const SurvivalUI = () => {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 xl:px-15 py-10 font-[family-name:var(--font-geist-pixel-square)]">

            {/* Photos */}
            <div className="flex justify-center items-end relative z-20 -mb-[90px]">
                <div className="bg-[#e8e8e8] p-1 pb-1.5 border border-[#999] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_0_5px_rgba(0,0,0,0.2)] w-[28%] max-w-[220px] aspect-[4/5] -mx-[2%] relative transition-transform duration-300 -rotate-[8deg] translate-y-[20px] z-10 hover:scale-[1.08] hover:rotate-0 hover:z-50">
                    <img src="/me.png" className="w-full h-full object-cover grayscale contrast-[1.3] brightness-[0.85] sepia-[0.1]" alt="Photo 1" />
                </div>

                <div className="bg-[#e8e8e8] p-1 pb-1.5 border border-[#999] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_0_5px_rgba(0,0,0,0.2)] w-[28%] max-w-[220px] aspect-[4/5] -mx-[2%] relative transition-transform duration-300 -rotate-[2deg] -translate-y-[10px] scale-[1.05] z-20 hover:scale-[1.08] hover:rotate-0 hover:z-50">
                    <img src="/san.png" className="w-full h-full object-cover grayscale contrast-[1.3] brightness-[0.85] sepia-[0.1]" alt="Photo 2" />
                </div>

                <div className="bg-[#e8e8e8] p-1 pb-1.5 border border-[#999] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_0_5px_rgba(0,0,0,0.2)] w-[28%] max-w-[220px] aspect-[4/5] -mx-[2%] relative transition-transform duration-300 rotate-[6deg] translate-y-[30px] z-0 hover:scale-[1.08] hover:rotate-0 hover:z-50">
                    <img src="/arya.jpg" className="w-full h-full object-cover grayscale contrast-[1.3] brightness-[0.85] sepia-[0.1]" alt="Photo 3" />
                </div>
            </div>

            {/* TEXT */}
            <div className="bg-black border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(0,0,0,0.8)] relative pt-[120px] px-[clamp(20px,5vw,70px)] pb-[clamp(30px,6vw,70px)] rounded-[2px]">

                {/* Noise overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter2\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter2)\'/%3E%3C/svg%3E")' }}></div>

                <div className="text-[#e5e5e5] text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.6] tracking-[0.5px] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] max-w-[900px] mx-auto relative z-10 font-bold">
                    <p className="mb-8 text-justify">
                        I love too many things. History, books, good stories, sports, games... honestly, almost everything this world has to offer. The problem? Not enough time to cover it all. And somehow, my list keeps growing.
                    </p>
                    <p className="mb-8 text-justify">
                        I look lazy. I probably am lazy. I don't like wasting energy on things that don't matter. If I can solve something by just watching and thinking, why would I do more? Most people rush around doing stuff. I prefer to sit back, observe, and figure things out quietly.
                    </p>
                    <p className="mb-8 text-justify">
                        I notice details others miss. I remember random facts from years ago. When I read something or play something or watch something, I'm not just enjoying it. I'm breaking it apart. Understanding how it works. Why it works. What makes it interesting.
                        I don't talk much about what I know. I don't show off. From outside, I look like someone who doesn't care about anything. But inside? There's always something running. Always processing. Always curious.
                    </p>
                    <p className="mb-0 text-justify">
                        So I end up being that person who looks half-asleep but somehow knows weird things about ancient wars, obscure books, game mechanics, and random sports statistics. Still so much more I want to explore. Never enough time. But I keep going anyway.
                    </p>
                </div>

                {/* Corners */}
                <div className="absolute w-[18px] h-[18px] border-[#666] opacity-50 top-2 left-2 border-t-2 border-l-2"></div>
                <div className="absolute w-[18px] h-[18px] border-[#666] opacity-50 top-2 right-2 border-t-2 border-r-2"></div>
                <div className="absolute w-[18px] h-[18px] border-[#666] opacity-50 bottom-2 left-2 border-b-2 border-l-2"></div>
                <div className="absolute w-[18px] h-[18px] border-[#666] opacity-50 bottom-2 right-2 border-b-2 border-r-2"></div>

            </div>

        </div>
    );
};

export default SurvivalUI;
