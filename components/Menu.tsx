import React, { useState } from 'react';
import { Difficulty } from '../types';

interface MenuProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY);

    const difficulties = Object.values(Difficulty);

    const difficultyButtonClass = (difficulty: Difficulty) => 
        `w-full px-4 py-3 text-lg font-bold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
        selectedDifficulty === difficulty
            ? 'bg-fuchsia-500 text-white ring-2 ring-fuchsia-300 shadow-[0_0_15px_theme(colors.fuchsia.500)]'
            : 'bg-slate-900/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600'
        }`;
    
    return (
        <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-2 border-cyan-400/50 shadow-[0_0_20px_theme(colors.cyan.400)]">
            <h1 className="text-5xl md:text-6xl font-fredoka text-cyan-300 text-glow-title drop-shadow-lg mb-4">Bubble Pop</h1>
            <h2 className="text-3xl font-fredoka text-fuchsia-400 mb-8">Frenzy</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-200 mb-4">Select Difficulty</h3>
                <div className="grid grid-cols-3 gap-3">
                    {difficulties.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level)}
                            className={difficultyButtonClass(level)}
                            aria-pressed={selectedDifficulty === level}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => onStartGame(selectedDifficulty)}
                className="w-full bg-fuchsia-600 text-white text-2xl font-fredoka py-4 rounded-xl shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-fuchsia-700 focus:outline-none focus:ring-4 ring-fuchsia-400 shadow-[0_0_15px_theme(colors.fuchsia.600)] hover:shadow-[0_0_25px_theme(colors.fuchsia.600)]"
            >
                Start Game
            </button>
        </div>
    );
};

export default Menu;