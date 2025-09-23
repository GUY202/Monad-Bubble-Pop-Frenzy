// Defining the types for the application. This includes `Difficulty` enum for game levels, `Bubble` interface for the bubble objects, and `Score` interface for the leaderboard entries.
export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface Bubble {
  id: number;
  x: number; // percentage from left
  size: number; // in pixels
  color: string;
  speed: number; // animation duration in seconds
}

export interface Score {
  name: string;
  score: number;
  difficulty: Difficulty;
}
