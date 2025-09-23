import React from 'react';

interface GameOverProps {
  score: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  onExit: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, isNewHighScore, onRestart, onExit }) => {
  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Game Over</h1>
        <p className="text-2xl md:text-3xl mb-4">Your Score: <span className="text-yellow-400 font-bold">{score}</span></p>

        {isNewHighScore && (
          <p className="text-2xl md:text-3xl mb-6 font-bold text-sky-400 glow-text">
            New High Score!
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
          <button
            onClick={onRestart}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg md:text-xl transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
