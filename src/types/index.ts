// types/goal.ts
export interface Goal {
  id: number;
  goal: string;
  year: number;
  isComplete: boolean;
}
export interface SpeedRecord {
  wpm: number;
  timestamp: number;
  text: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timestamp: number;
}

export interface HighScore {
  wpm: number;
  text: string;
  timestamp: number;
}
export interface UserStats extends TypingStats {
  fastestWPM: number;
  totalTests: number;
  averageWPM: number;
}
