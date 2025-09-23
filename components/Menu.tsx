// Fix: Created Menu component for the game's start screen.
import React from 'react';
import { Difficulty } from '../types';

interface MenuProps {
  onStartGame: (difficulty: Difficulty) => void;
  onShowLeaderboard: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onShowLeaderboard }) => {
  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white font-fredoka p-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
          Bubble Pop
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10">Select a difficulty to start</p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => onStartGame(Difficulty.EASY)}
          className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-xl text-2xl transition-all hover:bg-green-600 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
        >
          Easy
        </button>
        <button
          onClick={() => onStartGame(Difficulty.MEDIUM)}
          className="w-full bg-yellow-500 text-white font-bold py-4 px-4 rounded-xl text-2xl transition-all hover:bg-yellow-600 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
        >
          Medium
        </button>
        <button
          onClick={() => onStartGame(Difficulty.HARD)}
          className="w-full bg-red-500 text-white font-bold py-4 px-4 rounded-xl text-2xl transition-all hover:bg-red-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75"
        >
          Hard
        </button>
        <button
          onClick={onShowLeaderboard}
          className="mt-6 w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-xl text-xl transition-all hover:bg-sky-600 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-opacity-75"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Menu;
