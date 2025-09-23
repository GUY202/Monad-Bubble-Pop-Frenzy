import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../storage';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const fetchedScores = await getLeaderboard();
      setScores(fetchedScores);
      setLoading(false);
    };
    fetchScores();
  }, []);
  
  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Leaderboard</h1>
        
        <div className="space-y-3 h-96 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-slate-400 text-lg">Loading scores...</p>
          ) : scores.length > 0 ? (
            scores.map((entry, index) => (
              <div key={index} className="flex justify-between items-center bg-white/10 p-3 rounded-lg text-lg">
                <span className="font-bold text-sky-300 w-8 text-left">#{index + 1}</span>
                <div className="flex-grow text-left ml-4">
                    <p className="font-semibold">{entry.nickname || 'Anonymous'}</p>
                    <p className="text-xs text-slate-400 font-mono">{truncateAddress(entry.walletAddress)}</p>
                </div>
                <span className="font-bold text-yellow-400">{entry.score}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-lg">No high scores yet. Be the first!</p>
          )}
        </div>
        
        <button
          onClick={onBack}
          className="mt-8 bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
