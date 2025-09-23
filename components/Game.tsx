import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, Bubble as BubbleType } from '../types';
import { DIFFICULTY_SETTINGS, BUBBLE_COLORS, GAME_DURATION, POP_SOUND_BASE64 } from '../constants';
import Bubble from './Bubble';

interface GameProps {
  difficulty: Difficulty;
  onEndGame: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ difficulty, onEndGame }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [bubbles, setBubbles] = useState<BubbleType[]>([]);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const popSoundRef = useRef<HTMLAudioElement | null>(null);

    const settings = DIFFICULTY_SETTINGS[difficulty];

    useEffect(() => {
        popSoundRef.current = new Audio(POP_SOUND_BASE64);
    }, []);

    const playPopSound = useCallback(() => {
        if (popSoundRef.current) {
            popSoundRef.current.currentTime = 0;
            popSoundRef.current.play().catch(e => console.error("Error playing sound:", e));
        }
    }, []);

    const removeBubble = useCallback((id: number) => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    }, []);

    const popBubble = useCallback((id: number) => {
        playPopSound();
        setScore(prevScore => prevScore + 1);
        
        // Add pop animation class
        const bubbleElement = document.getElementById(`bubble-${id}`);
        if(bubbleElement) {
            bubbleElement.classList.add('bubble-pop');
            // Remove after animation finishes to prevent memory leak
            setTimeout(() => {
                removeBubble(id);
            }, 100);
        } else {
            // Fallback if element not found
            removeBubble(id);
        }

    }, [playPopSound, removeBubble]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.interval, settings.speedRange]);

    return (
        <div className="w-full h-screen max-w-2xl mx-auto flex flex-col">
            <div className="flex justify-between items-center p-4 bg-black/20 rounded-t-2xl text-white font-fredoka text-2xl md:text-3xl z-10">
                <div>Score: <span className="text-amber-300">{score}</span></div>
                <div>Time: <span className="text-amber-300">{timeLeft}</span></div>
            </div>

            <div 
                ref={gameAreaRef}
                className="relative w-full flex-grow bg-gradient-to-b from-yellow-700 via-yellow-800 to-yellow-900 overflow-hidden rounded-b-2xl shadow-inner-lg"
                style={{
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
                    backgroundSize: '40px 40px',
                    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)'
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
