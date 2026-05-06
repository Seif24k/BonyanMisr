'use client';

import { useState, useEffect } from 'react';

export const MouseFollowLight = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div 
            className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-[100px] transition-all duration-200 ease-out z-50"
            style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4), transparent)',
                left: `${mousePosition.x - 192}px`,
                top: `${mousePosition.y - 192}px`,
            }}
        />
    );
};
