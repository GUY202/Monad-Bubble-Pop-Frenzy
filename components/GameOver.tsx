import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-2 border-cyan-400/50 shadow-[0_0_20px_theme(colors.cyan.400)]">
            <h1 className="text-6xl font-fredoka text-cyan-300 text-glow-title drop-shadow-lg mb-4">Game Over!</h1>
            
            <div className="my-8">
                <p className="text-2xl text-slate-200 font-bold mb-2">Your Score:</p>
                <p className="text-7xl font-fredoka text-fuchsia-400 text-glow-score drop-shadow-md">{score}</p>
            </div>
            
            <button
                onClick={onRestart}
                className="w-full bg-fuchsia-600 text-white text-2xl font-fredoka py-4 rounded-xl shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-fuchsia-700 focus:outline-none focus:ring-4 ring-fuchsia-400 shadow-[0_0_15px_theme(colors.fuchsia.600)] hover:shadow-[0_0_25px_theme(colors.fuchsia.600)]"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameOver;