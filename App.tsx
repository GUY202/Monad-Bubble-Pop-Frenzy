// Implementing the main App component to manage game state and orchestrate the different components.
import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { Difficulty, Score } from './types';
import { getHighScores, isNewHighScore as checkIsNewHighScore, saveHighScores } from './storage';
import Leaderboard from './components/Leaderboard';

type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER' | 'LEADERBOARD';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [score, setScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [highScores, setHighScores] = useState<Score[]>([]);

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('PLAYING');
  };

  const handleEndGame = (finalScore: number) => {
    setScore(finalScore);
    const newHighScore = checkIsNewHighScore(finalScore);
    setIsNewHighScore(newHighScore);
    
    if (newHighScore) {
        // For simplicity, let's use a prompt. A better UI would be a form.
        const name = prompt("New high score! Enter your name:", "Player");
        const newScores = [...highScores, { name: name || 'Anonymous', score: finalScore, difficulty }];
        saveHighScores(newScores);
        setHighScores(getHighScores()); // refresh scores
    }

    setGameState('GAME_OVER');
  };

  const handleRestart = () => {
    setGameState('PLAYING');
  };

  const handleExit = () => {
    setGameState('MENU');
  };
  
  const handleShowLeaderboard = () => {
    setGameState('LEADERBOARD');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'PLAYING':
        return <Game difficulty={difficulty} onEndGame={handleEndGame} onExit={handleExit} />;
      case 'GAME_OVER':
        return <GameOver score={score} isNewHighScore={isNewHighScore} onRestart={handleRestart} onExit={handleExit} />;
      case 'LEADERBOARD':
        return <Leaderboard onBack={handleExit} />;
      case 'MENU':
      default:
        return <Menu onStartGame={handleStartGame} onShowLeaderboard={handleShowLeaderboard} />;
    }
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative z-10">
        {renderGameState()}
      </div>
    </main>
  );
};

export default App;
