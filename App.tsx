// Fix: Created the main App component to manage game state.
import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import { Difficulty, ScoreEntry } from './types';
import { getHighScores, saveHighScore } from './storage';

type GameState = 'menu' | 'playing' | 'gameOver' | 'leaderboard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [finalScore, setFinalScore] = useState(0);
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(getHighScores());
  }, []);

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const handleEndGame = (score: number) => {
    setFinalScore(score);
    setGameState('gameOver');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleShowLeaderboard = () => {
    setScores(getHighScores());
    setGameState('leaderboard');
  };

  const handleSaveScore = (name: string) => {
    const updatedScores = saveHighScore(name, finalScore);
    setScores(updatedScores);
  };
  
  const renderGameState = () => {
    switch(gameState) {
      case 'playing':
        return <Game difficulty={difficulty} onEndGame={handleEndGame} onExit={handleBackToMenu} />;
      case 'gameOver':
        return <GameOver score={finalScore} onRestart={handleRestart} onBackToMenu={handleBackToMenu} onSaveScore={handleSaveScore} />;
      case 'leaderboard':
        return <Leaderboard scores={scores} onBack={handleBackToMenu} />;
      case 'menu':
      default:
        return <Menu onStartGame={handleStartGame} onShowLeaderboard={handleShowLeaderboard} />;
    }
  };

  return (
    <main className="font-sans bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.1)_0,_transparent_50%)]" />
      <div className="relative z-10">
        {renderGameState()}
      </div>
    </main>
  );
};

export default App;
