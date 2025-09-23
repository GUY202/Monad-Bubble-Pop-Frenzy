import { Difficulty } from './types';

export const DIFFICULTY_SETTINGS: Record<Difficulty, { speedRange: [number, number]; interval: number }> = {
  [Difficulty.EASY]: { speedRange: [8, 12], interval: 900 },
  [Difficulty.MEDIUM]: { speedRange: [5, 8], interval: 650 },
  [Difficulty.HARD]: { speedRange: [2, 4], interval: 300 },
};

export const BUBBLE_COLORS = [
  '#c026d3', // fuchsia-700
  '#4f46e5', // indigo-600
  '#0ea5e9', // sky-500
  '#db2777', // pink-600
  '#14b8a6', // teal-500
];

export const GAME_DURATION = 60;
