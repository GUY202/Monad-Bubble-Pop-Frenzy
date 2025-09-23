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
            ? 'bg-amber-400 text-amber-900 ring-4 ring-amber-500'
            : 'bg-white/70 text-slate-700 hover:bg-white'
        }`;
    
    return (
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-4 border-white/80">
            <h1 className="text-5xl md:text-6xl font-fredoka text-cyan-800 drop-shadow-lg mb-4">Bubble Pop</h1>
            <h2 className="text-3xl font-fredoka text-slate-600 mb-8">Frenzy</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-700 mb-4">Select Difficulty</h3>
                <div className="grid grid-cols-3 gap-3">
                    {difficulties.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level)}
                            className={difficultyButtonClass(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => onStartGame(selectedDifficulty)}
                className="w-full bg-cyan-600 text-white text-2xl font-fredoka py-4 rounded-xl shadow-lg hover:bg-cyan-700 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ring-cyan-400"
            >
                Start Game
            </button>
        </div>
    );
};

export default Menu;
