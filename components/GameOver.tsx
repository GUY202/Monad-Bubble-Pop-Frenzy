// Fix: Created GameOver component to show final score and options.
import React, { useState } from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onBackToMenu: () => void;
  onSaveScore: (name: string) => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart, onBackToMenu, onSaveScore }) => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveScore(name.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white font-fredoka p-4">
        <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Game Over</h1>
            <p className="text-xl md:text-2xl mb-4">Your final score is:</p>
            <p className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">{score}</p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={15}
                  className="w-full max-w-xs px-4 py-2 text-lg text-center bg-white/10 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                  aria-label="Enter your name to save score"
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full max-w-xs bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg text-lg transition-all hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Save Score
                </button>
              </form>
            ) : (
              <p className="text-lg text-green-400 mb-6">Score saved!</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={onRestart}
                    className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all hover:bg-green-600"
                >
                    Play Again
                </button>
                <button
                    onClick={onBackToMenu}
                    className="flex-1 bg-pink-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all hover:bg-pink-700"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    </div>
  );
};

export default GameOver;
