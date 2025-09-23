// Creating the game's main menu component with difficulty selection and a leaderboard button.
import React from 'react';
import { Difficulty } from '../types';

interface MenuProps {
  onStartGame: (difficulty: Difficulty) => void;
  onShowLeaderboard: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onShowLeaderboard }) => {
  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] font-fredoka">Bubble Pop</h1>
        <p className="text-lg md:text-xl mb-8 text-slate-300">Select a difficulty to start</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onStartGame(Difficulty.EASY)}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Easy
          </button>
          <button
            onClick={() => onStartGame(Difficulty.MEDIUM)}
            className="bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Medium
          </button>
          <button
            onClick={() => onStartGame(Difficulty.HARD)}
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
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
