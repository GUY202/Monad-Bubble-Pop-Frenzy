import React, { useEffect } from 'react';
import { Difficulty } from '../types';
import { getPersonalBest } from '../storage';

interface MenuProps {
  onStartGame: (difficulty: Difficulty) => void;
  onShowLeaderboard: () => void;
  nickname: string;
  setNickname: (name: string) => void;
  personalBest: number;
  walletAddress: string | null;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onShowLeaderboard, nickname, setNickname, personalBest }) => {
  
  const isStartDisabled = !nickname.trim();

  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] font-fredoka">Bubble Pop</h1>
        
        <div className="my-6">
            <label htmlFor="nickname" className="text-slate-300 text-lg mb-2 block">Enter Your Nickname</label>
            <input 
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Player123"
                maxLength={15}
                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-lg px-4 py-2 text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <p className="text-sm text-slate-400 mt-2">Your Personal Best: <span className="font-bold text-yellow-400">{personalBest}</span></p>
        </div>

        <p className="text-lg md:text-xl mb-4 text-slate-300">Select a difficulty</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onStartGame(Difficulty.EASY)}
            disabled={isStartDisabled}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Easy
          </button>
          <button
            onClick={() => onStartGame(Difficulty.MEDIUM)}
             disabled={isStartDisabled}
            className="bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Medium
          </button>
          <button
            onClick={() => onStartGame(Difficulty.HARD)}
            disabled={isStartDisabled}
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Hard
          </button>
           <button
            onClick={onShowLeaderboard}
            className="mt-4 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
