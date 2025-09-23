// Implementing utility functions to manage high scores using localStorage.
import { Score } from './types';

const HIGH_SCORES_KEY = 'bubblePopHighScores';

export const getHighScores = (): Score[] => {
  try {
    const scoresJSON = localStorage.getItem(HIGH_SCORES_KEY);
    if (scoresJSON) {
      return JSON.parse(scoresJSON);
    }
  } catch (error) {
    console.error("Failed to parse high scores from localStorage", error);
  }
  return [];
};

export const saveHighScores = (scores: Score[]): void => {
  try {
    // Sort scores descending and keep top 10
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(sortedScores));
  } catch (error) {
    console.error("Failed to save high scores to localStorage", error);
  }
};

export const isNewHighScore = (score: number): boolean => {
    if (score === 0) return false;
    const highScores = getHighScores();
    if (highScores.length < 10) {
        return true;
    }
    return score > highScores[highScores.length - 1].score;
}
