// Fix: Created Leaderboard component to display high scores.
import React from 'react';
import { ScoreEntry } from '../types';

interface LeaderboardProps {
  scores: ScoreEntry[];
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores, onBack }) => {
  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white font-fredoka p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Leaderboard</h1>
        <ol className="list-decimal list-inside space-y-3 text-lg md:text-xl">
          {scores.length > 0 ? (
            scores.map((entry, index) => (
              <li key={index} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="font-semibold text-slate-200">{index + 1}. {entry.name}</span>
                <span className="font-bold text-cyan-400">{entry.score}</span>
              </li>
            ))
          ) : (
            <p className="text-center text-slate-400">No scores yet. Be the first!</p>
          )}
        </ol>
        <button
          onClick={onBack}
          className="mt-8 w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg text-lg md:text-xl transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
