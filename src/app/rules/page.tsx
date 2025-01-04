'use client';

import { useEffect, useState } from 'react';

const rules = [
  "If I don't have to do it, I won't. If I have to do it, I'll make it quick.",
  "If it doesn't meet my standards, it won't get my touch.",
  'Cut the nonsense—let’s keep it real.',
  'Dust off; they’ll probably drop dead from karma soon.',
  'Never Talk About Yourself.',
  'Plan for Every Scenario.',
  'Do Not Depend on Others.',
];

export default function RuleNote() {
  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(rules.length).fill('')
  );
  const [currentRule, setCurrentRule] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentRule >= rules.length) return;

    const rule = rules[currentRule];
    if (currentChar >= rule.length) {
      setTimeout(() => {
        setCurrentRule((prev) => prev + 1);
        setCurrentChar(0);
      }, 1000); // Pause between rules
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => {
        const newText = [...prev];
        newText[currentRule] = rule.substring(0, currentChar + 1);
        return newText;
      });
      setCurrentChar((prev) => prev + 1);
    }, 50); // Speed of typing

    return () => clearTimeout(timer);
  }, [currentRule, currentChar]);

  return (
    <div className="min-h-screen bg-notebook-dark p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-notebook-parchment p-4 sm:p-6 relative overflow-hidden">
        <h1 className="text-4xl sm:text-6xl font-bold text-notebook-red mb-8 text-center tracking-wider font-deathnote">
          RULE NOTE
        </h1>

        <div className="space-y-6">
          {rules.map((_, index) => (
            <div
              key={index}
              className={`transition-opacity duration-300 ${
                displayedText[index] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-3xl sm:text-5xl font-bold text-notebook-red mb-8 tracking-wider font-deathnote">
                <span className="text-notebook-red font-bold">
                  Rule-{index + 1}:
                </span>
                <span className="flex-1">
                  {displayedText[index]}
                  {currentRule === index && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
