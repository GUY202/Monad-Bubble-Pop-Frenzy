import { LeaderboardEntry } from './types';

const LEADERBOARD_KEY = 'bubblePopLeaderboard';
const PERSONAL_BESTS_KEY = 'bubblePopPersonalBests';

// --- LEADERBOARD ---

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const scoresJSON = localStorage.getItem(LEADERBOARD_KEY);
    const scores = scoresJSON ? JSON.parse(scoresJSON) : [];
    return Promise.resolve(scores);
  } catch (error) {
    console.error("Failed to parse leaderboard from localStorage", error);
    return Promise.resolve([]);
  }
};

const saveLeaderboard = (scores: LeaderboardEntry[]): void => {
  try {
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 20);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sortedScores));
  } catch (error) {
    console.error("Failed to save leaderboard to localStorage", error);
  }
};

// --- PERSONAL BESTS ---

const getPersonalBests = (): Record<string, number> => {
    try {
        const personalBestsJSON = localStorage.getItem(PERSONAL_BESTS_KEY);
        return personalBestsJSON ? JSON.parse(personalBestsJSON) : {};
    } catch (error) {
        console.error("Failed to parse personal bests from localStorage", error);
        return {};
    }
}

export const getPersonalBest = async (walletAddress: string): Promise<number> => {
    const personalBests = getPersonalBests();
    return Promise.resolve(personalBests[walletAddress.toLowerCase()] || 0);
}

const savePersonalBest = (walletAddress: string, score: number): void => {
    try {
        const personalBests = getPersonalBests();
        personalBests[walletAddress.toLowerCase()] = score;
        localStorage.setItem(PERSONAL_BESTS_KEY, JSON.stringify(personalBests));
    } catch (error) {
        console.error("Failed to save personal best to localStorage", error);
    }
}


// --- SUBMIT SCORE (Combined Logic) ---

export const submitScore = async (entry: Omit<LeaderboardEntry, 'walletAddress'> & { walletAddress: string }): Promise<boolean> => {
  if (!entry.walletAddress) {
    console.error("Wallet address is required to submit a score.");
    return Promise.resolve(false);
  }

  // Update Leaderboard
  const leaderboard = await getLeaderboard();
  leaderboard.push(entry);
  saveLeaderboard(leaderboard);

  // Check and Update Personal Best
  const personalBests = getPersonalBests();
  const currentBest = personalBests[entry.walletAddress.toLowerCase()] || 0;
  
  if (entry.score > currentBest) {
    savePersonalBest(entry.walletAddress, entry.score);
    return Promise.resolve(true); // New high score
  }

  return Promise.resolve(false); // Not a new high score
};
