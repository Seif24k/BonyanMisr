'use client';

import { useState, useEffect } from 'react';

export const MouseFollowLight = () => {
    const [mousePosition, setMousePosition] = useState({ x: -9999, y: -9999 });

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!canHover || reduceMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div 
            className="pointer-events-none fixed z-50 hidden h-96 w-96 rounded-full opacity-20 blur-[100px] transition-all duration-200 ease-out motion-reduce:hidden md:block"
            style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4), transparent)',
                left: `${mousePosition.x - 192}px`,
                top: `${mousePosition.y - 192}px`,
            }}
        />
    );
};
