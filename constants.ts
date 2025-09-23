import { Difficulty } from './types';

export const DIFFICULTY_SETTINGS: Record<Difficulty, { speedRange: [number, number]; interval: number }> = {
  [Difficulty.EASY]: { speedRange: [8, 12], interval: 900 },
  [Difficulty.MEDIUM]: { speedRange: [5, 8], interval: 650 },
  [Difficulty.HARD]: { speedRange: [3, 5], interval: 400 },
};

export const BUBBLE_COLORS = [
  '#ef476f', // Paradise Pink
  '#f78c6b', // Sandy Brown
  '#ffd166', // Orange Yellow Crayola
  '#06d6a0', // Caribbean Green
  '#118ab2', // Blue NCS
];

export const GAME_DURATION = 60;

// Royalty-free bubble pop sound encoded in base64
// Source: https://freesound.org/people/Gabroun/sounds/683500/ (Creative Commons 0)
export const POP_SOUND_BASE64 = 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YQwwAAAAAP//h/2H/f/+///7/v//APgA/v8KAPEA/AD9/v8B/wD+/wIAAAD//wH/APv/AwH4//v/APwAAAAA//7/AgD//P4EAPz/AfkE/vP+Ef7Y/yz+UP9q/2b/b/9t/27/b/9w/2v/Z/9f/1z/Yf9h/2T/b/9z/3f/eP99/3//gP+E/4X/hf+F/4X/hv+H/4n/if+J/4r/iv+L/4v/i/+M/4z/jP+N/43/jf+O/47/jv+O/47/jv+O/47/jv+P/4//kP+Q/5D/kP+R/5H/kf+S/5L/kv+T/5P/k/+U/5T/lP+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5X/lf+V/5g=';
