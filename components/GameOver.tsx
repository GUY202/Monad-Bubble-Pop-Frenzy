import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
    return (
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-4 border-white/80">
            <h1 className="text-6xl font-fredoka text-cyan-800 drop-shadow-lg mb-4">Game Over!</h1>
            
            <div className="my-8">
                <p className="text-2xl text-slate-700 font-bold mb-2">Your Score:</p>
                <p className="text-7xl font-fredoka text-amber-500 drop-shadow-md">{score}</p>
            </div>
            
            <button
                onClick={onRestart}
                className="w-full bg-cyan-600 text-white text-2xl font-fredoka py-4 rounded-xl shadow-lg hover:bg-cyan-700 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ring-cyan-400"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameOver;
