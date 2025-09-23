// Fix: Created storage utility functions for high scores.
import { ScoreEntry } from './types';

const HIGH_SCORES_KEY = 'bubblePopHighScores';
const MAX_SCORES = 10;

export const getHighScores = (): ScoreEntry[] => {
  try {
    const scoresJSON = localStorage.getItem(HIGH_SCORES_KEY);
    if (!scoresJSON) {
      return [];
    }
    return JSON.parse(scoresJSON);
  } catch (error) {
    console.error("Error loading high scores:", error);
    return [];
  }
};

export const saveHighScore = (name: string, score: number): ScoreEntry[] => {
  if (!name || score <= 0) return getHighScores();

  const newScore: ScoreEntry = { name, score };
  const highScores = getHighScores();

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  const updatedScores = highScores.slice(0, MAX_SCORES);
  
  try {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updatedScores));
  } catch (error) {
    console.error("Error saving high score:", error);
  }

  return updatedScores;
};
