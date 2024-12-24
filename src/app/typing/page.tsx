'use client';

import { generateText } from '@/actions/typingAction';
import { useCallback, useEffect, useRef, useState } from 'react';

// Add utility function to check special characters
const isSpecialChar = (char: string) => {
  return /[.,!?]/.test(char);
};

// Initial sentences array
const initialSentences = [
  'The quick brown fox jumps over the lazy dog.',
  'Pack my box with five dozen liquor jugs.',
];
const MIN_ACCURACY_THRESHOLD = 85; // 85% accuracy threshold

export default function Page() {
  // Add new states
  const [sentences, setSentences] = useState(initialSentences);
  const [isFetching, setIsFetching] = useState(false);
  const [lastWpm, setLastWpm] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // State management
  const [userInput, setUserInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [composingText, setComposingText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const currentSentence = sentences[currentSentenceIndex];

  const resetInputStates = () => {
    setUserInput('');
    setComposingText('');
    setIsComposing(false);
    setIsAllSelected(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
    if (wpm > 0) {
      setLastWpm(wpm);
    }
    setStartTime(null);
    setWpm(0);
  };

  const calculateWPM = useCallback((input: string, elapsedSeconds: number) => {
    const wordsTyped = input.length / 5;
    const minutes = elapsedSeconds / 60;
    return Math.round(wordsTyped / minutes);
  }, []);

  const fetchNewSentences = async () => {
    if (isFetching) return;

    try {
      setIsFetching(true);
      setError(null);

      const text1 = await generateText();
      const text2 = await generateText();

      if (text1 && text2) {
        const newSentences = [text1, text2].map((text) =>
          text
            .split(/[.!?]/)
            .filter((sentence) => sentence.trim().length > 0)
            .map((sentence) => sentence.trim() + '.')
        );

        setSentences((prev) => [...prev, ...newSentences.flat()]);
      } else {
        throw new Error('Failed to generate text');
      }
    } catch (error) {
      console.error('Failed to fetch new sentences:', error);
      setError('Failed to fetch new sentences. Using fallback sentences.');

      const fallbackSentences = [
        'The quick brown fox jumps over the lazy dog.',
      ];
      setSentences((prev) => [...prev, ...fallbackSentences]);
    } finally {
      setIsFetching(false);
    }
  };

  const calculateAccuracy = useCallback((input: string, target: string) => {
    if (input.length === 0) return 0;

    let correctChars = 0;
    const inputLength = Math.min(input.length, target.length);

    for (let i = 0; i < inputLength; i++) {
      if (target[i].toLowerCase() === input[i].toLowerCase()) correctChars++;
    }

    return Math.round((correctChars / inputLength) * 100);
  }, []);

  useEffect(() => {
    const checkCompletion = async () => {
      const currentInput = isComposing ? userInput + composingText : userInput;

      if (currentSentenceIndex >= sentences.length - 3 && !isFetching) {
        try {
          await fetchNewSentences();
        } catch (error) {
          console.error('Error fetching new sentences:', error);
        }
      }

      if (
        !isTransitioning &&
        currentInput.length === currentSentence.length &&
        (currentInput === currentSentence ||
          calculateAccuracy(currentInput, currentSentence) >=
            MIN_ACCURACY_THRESHOLD)
      ) {
        setIsTransitioning(true);

        if (currentSentenceIndex < sentences.length - 1) {
          setTimeout(() => {
            resetInputStates();
            setCurrentSentenceIndex((prev) => prev + 1);
            setIsTransitioning(false);
          }, 300);
        }
      }
    };

    checkCompletion();
  }, [
    userInput,
    composingText,
    currentSentence,
    currentSentenceIndex,
    sentences.length,
    isComposing,
    isTransitioning,
    calculateAccuracy,
    isFetching,
  ]);

  useEffect(() => {
    if (!startTime && (userInput.length > 0 || composingText.length > 0)) {
      setStartTime(Date.now());
      setLastWpm(0);
      return;
    }

    if (startTime && (userInput.length > 0 || composingText.length > 0)) {
      const currentInput = userInput + composingText;
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const currentWPM = calculateWPM(currentInput, elapsedSeconds);
      setWpm(currentWPM);
    }
  }, [userInput, composingText, startTime, calculateWPM]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const nativeEvent = e.nativeEvent as InputEvent;

    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const input = e.currentTarget.value;

    if (nativeEvent.isComposing || isComposing) {
      if (!isSpecialChar(input)) {
        setComposingText(input);
      }
      return;
    }

    let newInput = userInput;

    if (composingText) {
      newInput += composingText;
      setComposingText('');
    } else if (input.length === 1) {
      newInput += input;
    }

    if (newInput.length <= currentSentence.length) {
      setUserInput(newInput);
    }

    e.currentTarget.value = '';
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    if (!isTransitioning) {
      setIsComposing(false);

      if (composingText) {
        const newInput = userInput + composingText;
        setUserInput(newInput);
        setComposingText('');
      }

      e.currentTarget.value = '';
    }
  };

  const handleCompositionStart = () => {
    if (!isTransitioning) {
      setIsComposing(true);
      setComposingText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTransitioning) {
      e.preventDefault();
      if (currentSentenceIndex < sentences.length - 1) {
        setIsTransitioning(true);
        if (currentSentenceIndex >= sentences.length - 3) {
          fetchNewSentences();
        }
        setTimeout(() => {
          resetInputStates();
          setCurrentSentenceIndex((prev) => prev + 1);
          setIsTransitioning(false);
        }, 300);
      }
      return;
    }

    if (e.key === 'Backspace') {
      if (!isComposing && userInput.length > 0) {
        e.preventDefault();
        if (isAllSelected) {
          setUserInput('');
          setIsAllSelected(false);
        } else {
          setUserInput((prev) => prev.slice(0, -1));
        }
      }
    } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsAllSelected(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <section data-animate className="flex flex-col gap-8">
        {' '}
        {/* Reduced gap */}
        <h1 className="text-3xl font-bold text-white">Typing Game</h1>
        <div
          className="flex flex-col items-center justify-center p-4 relative gap-2" // Reduced gap
          onClick={() => !isTransitioning && inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            className="opacity-0 absolute"
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={(e) => {
              if (!isTransitioning) {
                setComposingText(e.data || '');
              }
            }}
            onCompositionEnd={handleCompositionEnd}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <div className="text-xl font-mono leading-relaxed text-center w-full max-w-3xl ">
            {' '}
            {/* Adjusted font size and leading, Added max width */}
            {currentSentence.split('').map((char, index) => {
              const isTyped = index < userInput.length;
              const typedChar = userInput[index];
              const isCurrentTyping = index === userInput.length;
              const isComposingHere = isCurrentTyping && isComposing;
              const isSpace = char === ' ';
              const isWrongSpace = isTyped && isSpace && typedChar !== ' ';
              const isTypedSpace = isTyped && !isSpace && typedChar === ' ';

              const isCorrect = (() => {
                if (!isTyped) return true;
                return char.toLowerCase() === typedChar?.toLowerCase();
              })();

              return (
                <span
                  key={index}
                  className={`transition-all ${
                    isTyped
                      ? isCorrect
                        ? 'opacity-100 text-emerald-400'
                        : 'opacity-100 text-pink-400'
                      : isCurrentTyping
                      ? 'opacity-100'
                      : 'opacity-30'
                  } ${isComposingHere ? 'border-b-2' : ''}`}
                >
                  {isComposingHere
                    ? composingText
                    : isTyped
                    ? isWrongSpace || isTypedSpace
                      ? '_'
                      : typedChar
                    : isSpace
                    ? ' '
                    : char}
                </span>
              );
            })}
          </div>

          <div className="text-sm text-gray-400 flex items-center justify-center gap-2 mt-2">
            {' '}
            {/* Centered and added mt for space */}
            <span>
              {currentSentenceIndex + 1} / {sentences.length}
            </span>
            {(wpm > 0 || lastWpm > 0) && (
              <>
                <span className="text-gray-500">•</span>
                <span>{wpm > 0 ? wpm : lastWpm} WPM</span>
              </>
            )}
            {isFetching && (
              <>
                <span className="text-gray-500">•</span>
                <span>Generating...</span>
              </>
            )}
            {error && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-red-400">{error}</span>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
