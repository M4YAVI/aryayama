// components/RuleNote.tsx
'use client';

import localFont from 'next/font/local';
import { useEffect, useState } from 'react';

const deathNoteFont = localFont({
  src: [
    {
      path: '../fonts/DeathNote.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});

const rules = [
  "Don’t gotta do it? I won’t. Gotta? It’s quick.",
  "My line’s set. Ain’t budgin’.",
  "Cut the crap. Keep it real.",
  "They get what’s comin’. Simple.",
  "Always ready for the curveball.",
  "You’re your own backup.",
  "Less yappin’, more movin’.",
  "Pain’s just part of it. Deal.",
];

export default function RuleNote() {
  const [text, setText] = useState<string[]>(Array(rules.length).fill(''));
  const [ruleIdx, setRuleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    if (ruleIdx >= rules.length) return;

    const rule = rules[ruleIdx];
    if (charIdx >= rule.length) {
      setTimeout(() => {
        setRuleIdx((prev) => prev + 1);
        setCharIdx(0);
      }, 1000); // Pause before next rule—keeps it tense.
      return;
    }

    const timer = setTimeout(() => {
      setText((prev) => {
        const newText = [...prev];
        newText[ruleIdx] = rule.slice(0, charIdx + 1);
        return newText;
      });
      setCharIdx((prev) => prev + 1);
    }, 80); // Slow enough to feel deliberate.

    return () => clearTimeout(timer);
  }, [ruleIdx, charIdx]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl relative">
        {/* Title */}
        <h1
          className={`${deathNoteFont.className} text-6xl sm:text-7xl text-red-700 font-bold mb-10 text-center tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] transition-all duration-300`}
        >
          RULE NOTE
        </h1>

        {/* Rules */}
        <div className="space-y-6">
          {rules.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all duration-400 ${
                text[idx] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-30px]'
              }`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(-1)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl text-red-600 font-bold drop-shadow-[0_0_5px_rgba(255,0,0,0.3)]">
                  {idx + 1}.
                </span>
                <p
                  className={`${deathNoteFont.className} text-3xl sm:text-4xl text-gray-200 tracking-wide leading-tight transition-all duration-300 ${
                    hovered === idx
                      ? 'text-red-500 scale-105 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]'
                      : ''
                  }`}
                >
                  {text[idx]}
                  {ruleIdx === idx && (
                    <span className="animate-[pulse_0.8s_ease-in-out_infinite] text-red-600 ml-1">
                      |
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Creepy background effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
      </div>
    </div>
  );
}