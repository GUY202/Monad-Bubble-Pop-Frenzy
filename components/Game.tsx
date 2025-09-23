import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, Bubble as BubbleType } from '../types';
import { DIFFICULTY_SETTINGS, BUBBLE_COLORS, GAME_DURATION } from '../constants';
import Bubble from './Bubble';

interface GameProps {
  difficulty: Difficulty;
  onEndGame: (score: number) => void;
  onExit: () => void;
}

const Game: React.FC<GameProps> = ({ difficulty, onEndGame, onExit }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [bubbles, setBubbles] = useState<BubbleType[]>([]);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const settings = DIFFICULTY_SETTINGS[difficulty];

    const removeBubble = useCallback((id: number) => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    }, []);

    const popBubble = useCallback((id: number) => {
        setScore(prevScore => prevScore + 1);
        
        const bubbleElement = document.getElementById(`bubble-${id}`);
        if(bubbleElement) {
            bubbleElement.classList.add('bubble-pop');
            setTimeout(() => {
                removeBubble(id);
            }, 100);
        } else {
            removeBubble(id);
        }

    }, [removeBubble]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onEndGame(score);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onEndGame, score]);

    useEffect(() => {
        const bubbleSpawner = setInterval(() => {
            if (!gameAreaRef.current) return;
            
            const [minSpeed, maxSpeed] = settings.speedRange;
            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            const size = Math.random() * 40 + 40; // 40px to 80px
            
            const newBubble: BubbleType = {
                id: Date.now() + Math.random(),
                x: Math.random() * (100 - (size / gameAreaRef.current.clientWidth) * 100),
                size,
                color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
                speed,
            };
            setBubbles(prev => [...prev, newBubble]);
        }, settings.interval);

        return () => clearInterval(bubbleSpawner);
    }, [settings.interval, settings.speedRange]);

    return (
        <div className="w-full h-screen max-w-2xl mx-auto flex flex-col">
            <div className="grid grid-cols-3 items-center p-4 bg-black/40 rounded-t-2xl text-white font-fredoka text-lg md:text-2xl z-10">
                <div className="text-left">Score: <span className="text-cyan-300 font-bold">{score}</span></div>
                <div className="text-center">Time: <span className="text-cyan-300 font-bold">{timeLeft}</span></div>
                <div className="text-right">
                    <button 
                        onClick={onExit}
                        aria-label="Exit Game"
                        className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg text-base md:text-lg transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
                    >
                        Exit
                    </button>
                </div>
            </div>

            <div 
                ref={gameAreaRef}
                className="relative w-full flex-grow bg-gradient-to-b from-slate-900 to-indigo-900 overflow-hidden rounded-b-2xl"
                style={{
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.7)',
                    backgroundSize: '50px 50px',
                    backgroundImage: 'linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)'
                }}
            >
                {bubbles.map(bubble => (
                    <Bubble key={bubble.id} bubbleData={bubble} onPop={popBubble} onMiss={removeBubble} />
                ))}
            </div>
        </div>
    );
};

export default Game;