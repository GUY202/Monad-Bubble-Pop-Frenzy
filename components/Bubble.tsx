import React from 'react';
import { Bubble as BubbleProps } from '../types';

interface BubbleComponentProps {
  bubbleData: BubbleProps;
  onPop: (id: number) => void;
  onMiss: (id: number) => void;
}

const PARTICLE_COUNT = 7;

const Bubble: React.FC<BubbleComponentProps> = ({ bubbleData, onPop, onMiss }) => {
    const { id, x, size, color, speed } = bubbleData;

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
        // Only trigger 'onMiss' if the falling animation ends, not a pop animation.
        if (e.animationName === 'fall') {
            onMiss(id);
        }
    };
    
    // useMemo helps to avoid recalculating particles on every render for a given bubble
    const particles = React.useMemo(() => 
        Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (360 / PARTICLE_COUNT) * i + (Math.random() * 20 - 10); // Add randomness to the angle
            const radius = Math.random() * (size / 2) + (size / 4); // Randomize the distance particles travel
            const tx = Math.cos(angle * Math.PI / 180) * radius;
            const ty = Math.sin(angle * Math.PI / 180) * radius;
            return (
                <div 
                    key={i}
                    className="particle"
                    style={{
                        backgroundColor: color,
                        '--tx': `${tx}px`,
                        '--ty': `${ty}px`,
                    } as React.CSSProperties} // Cast to allow CSS custom properties
                />
            );
    }), [color, size]);


    return (
        <div
            id={`bubble-${id}`}
            className="absolute top-0 cursor-pointer rounded-full bubble-fall"
            style={{
                left: `${x}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${speed}s`,
            }}
            onClick={() => onPop(id)}
            onAnimationEnd={handleAnimationEnd}
            aria-label="bubble"
        >
            <div
                className="bubble-visual w-full h-full rounded-full"
                style={{
                    backgroundColor: color,
                    boxShadow: `inset -${size * 0.1}px -${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.3), 0 0 ${size * 0.3}px ${color}`,
                }}
            >
                <div 
                    className="absolute rounded-full w-1/3 h-1/3"
                    style={{
                        top: '15%',
                        left: '15%',
                        background: 'rgba(255,255,255,0.4)',
                        filter: 'blur(3px)',
                    }}
                />
            </div>
            {particles}
        </div>
    );
};

export default React.memo(Bubble);