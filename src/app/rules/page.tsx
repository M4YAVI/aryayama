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
  "If I don't have to do it, I won't. If I have to do it, I'll make it quick.",
  'My standards are non-negotiable.',
  "Ditch the fluff; let's keep it real.",
  'They reap what they sow, anyway.',
  'Always expect the unexpected.',
  'Rely on yourself.',
  'Less talking, more doing.',
  'Embrace discomfort.',
];

export default function RuleNote() {
  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(rules.length).fill('')
  );
  const [currentRule, setCurrentRule] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isHovered, setIsHovered] = useState(-1);

  useEffect(() => {
    if (currentRule >= rules.length) return;

    const rule = rules[currentRule];
    if (currentChar >= rule.length) {
      setTimeout(() => {
        setCurrentRule((prev) => prev + 1);
        setCurrentChar(0);
      }, 1200); // Slightly longer pause between rules
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => {
        const newText = [...prev];
        newText[currentRule] = rule.substring(0, currentChar + 1);
        return newText;
      });
      setCurrentChar((prev) => prev + 1);
    }, 75); // Slightly slower typing for dramatic effect

    return () => clearTimeout(timer);
  }, [currentRule, currentChar]);

  return (
    <div className="min-h-screen p-8 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 sm:p-10 relative">
        <h1 className="text-7xl sm:text-8xl font-bold mb-12 text-center tracking-[0.2em] transform hover:scale-105 transition-transform duration-300">
          RULE NOTE
        </h1>
        <div className="space-y-8">
          {rules.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-500 transform ${
                displayedText[index]
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-[-50px] opacity-0'
              }`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(-1)}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl sm:text-3xl font-bold transition-all duration-300">
                  {index + 1}:
                </span>
                <p
                  className={`${
                    deathNoteFont.className
                  } text-4xl sm:text-5xl tracking-wide leading-tight transform transition-all duration-300 ${
                    isHovered === index ? 'scale-105' : ''
                  }`}
                >
                  {displayedText[index]}
                  {currentRule === index && (
                    <span className="animate-pulse ml-1">|</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
