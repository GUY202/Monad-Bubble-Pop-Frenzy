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

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  difficulty: Difficulty;
  walletAddress: string;
}
