'use client';

import { useRef, useState } from 'react';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    enableColorShift?: boolean; // New prop to enable color shifting
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
    children, 
    className = '', 
    spotlightColor = 'rgba(212, 175, 55, 0.25)', // Default to primary gold color
    enableColorShift = true // Enable by default
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    // Calculate color based on mouse position
    const getColorFromPosition = (x: number, y: number, width: number, height: number): string => {
        if (!enableColorShift) return spotlightColor;

        // Normalize position to 0-1 range
        const normalizedX = x / width;
        const normalizedY = y / height;

        // Create color transitions based on position
        // Top-left: Gold, Top-right: Blue, Bottom-left: Purple, Bottom-right: Teal
        const gold = { r: 212, g: 175, b: 55 };
        const blue = { r: 90, g: 159, b: 212 };
        const purple = { r: 168, g: 85, b: 247 };
        const teal = { r: 20, g: 184, b: 166 };

        // Interpolate colors based on position
        const topColor = {
            r: gold.r + (blue.r - gold.r) * normalizedX,
            g: gold.g + (blue.g - gold.g) * normalizedX,
            b: gold.b + (blue.b - gold.b) * normalizedX,
        };

        const bottomColor = {
            r: purple.r + (teal.r - purple.r) * normalizedX,
            g: purple.g + (teal.g - purple.g) * normalizedX,
            b: purple.b + (teal.b - purple.b) * normalizedX,
        };

        const finalColor = {
            r: Math.round(topColor.r + (bottomColor.r - topColor.r) * normalizedY),
            g: Math.round(topColor.g + (bottomColor.g - topColor.g) * normalizedY),
            b: Math.round(topColor.b + (bottomColor.b - topColor.b) * normalizedY),
        };

        return `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, 0.35)`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(0.6);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    // Get current color based on position
    const currentColor = divRef.current 
        ? getColorFromPosition(
            position.x, 
            position.y, 
            divRef.current.offsetWidth, 
            divRef.current.offsetHeight
          )
        : spotlightColor;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${currentColor}, transparent 80%)`,
                    transition: 'background 0.1s ease-out, opacity 0.3s ease-in-out'
                }}
            />
            {children}
        </div>
    );
};

export default SpotlightCard;
