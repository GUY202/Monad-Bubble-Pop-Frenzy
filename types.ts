export enum GameState {
  MENU,
  PLAYING,
  GAME_OVER,
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Bubble {
  id: number;
  x: number; // percentage from left
  size: number; // in pixels
  color: string;
  speed: number; // animation duration in seconds
}
