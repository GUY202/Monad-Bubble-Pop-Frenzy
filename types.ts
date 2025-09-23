// Fix: Populated empty types.ts file with required type definitions.
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

export interface ScoreEntry {
  name: string;
  score: number;
}
