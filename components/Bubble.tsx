import React from 'react';
import { Bubble as BubbleProps } from '../types';

interface BubbleComponentProps {
  bubbleData: BubbleProps;
  onPop: (id: number) => void;
  onMiss: (id: number) => void;
}

const Bubble: React.FC<BubbleComponentProps> = ({ bubbleData, onPop, onMiss }) => {
    const { id, x, size, color, speed } = bubbleData;

    const handleAnimationEnd = () => {
        onMiss(id);
    };

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
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    backgroundColor: color,
                    boxShadow: `inset -${size * 0.1}px -${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.4)`,
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
        </div>
    );
};

export default React.memo(Bubble);
