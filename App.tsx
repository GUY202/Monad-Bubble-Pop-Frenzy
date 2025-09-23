import React, { useState, useCallback } from 'react';
import { GameState, Difficulty } from './types';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.MENU);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [finalScore, setFinalScore] = useState<number>(0);

    const startGame = useCallback((selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
        setGameState(GameState.PLAYING);
    }, []);

    const endGame = useCallback((score: number) => {
        setFinalScore(score);
        setGameState(GameState.GAME_OVER);
    }, []);

    const restartGame = useCallback(() => {
        setGameState(GameState.MENU);
    }, []);

    const renderContent = () => {
        switch (gameState) {
            case GameState.PLAYING:
                return <Game difficulty={difficulty} onEndGame={endGame} />;
            case GameState.GAME_OVER:
                return <GameOver score={finalScore} onRestart={restartGame} />;
            case GameState.MENU:
            default:
                return <Menu onStartGame={startGame} />;
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
            {renderContent()}
        </main>
    );
};

export default App;
