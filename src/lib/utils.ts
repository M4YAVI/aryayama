import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSpecialChar = (char: string) => {
  return /[.,!?]/.test(char);
};

export const calculateAccuracy = (input: string, target: string) => {
  if (input.length === 0) return 0;

  let correctChars = 0;
  const inputLength = Math.min(input.length, target.length);

  for (let i = 0; i < inputLength; i++) {
    const targetChar = target[i];
    const inputChar = input[i];
    if (targetChar.toLowerCase() === inputChar.toLowerCase()) correctChars++;
  }

  return Math.round((correctChars / inputLength) * 100);
};

export const calculateWPM = (input: string, elapsedSeconds: number) => {
  const wordsTyped = input.length / 5; // Assuming average word length of 5
  const minutes = elapsedSeconds / 60;
  return Math.round(wordsTyped / minutes);
};

// Add this function to check if the user is logged in
