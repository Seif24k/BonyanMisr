'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BlueprintBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Grid configuration
    const gridSize = 60; // Size of grid squares

    // Animation variants for drawing lines
    const drawLine = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 0.15, // Low opacity for subtlety
            transition: {
                pathLength: { delay: i * 0.5, duration: 3, ease: [0.42, 0, 0.58, 1] as any },
                opacity: { delay: i * 0.5, duration: 0.5 }
            }
        })
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Solid Base - Light/Dark Mode */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-slate-950" />

            {/* 2. Static Blueprint Grid - Visible in both modes */}
            <div
                className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px),
                           linear-gradient(to bottom, #475569 1px, transparent 1px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`
                }}
            />

            {/* 3. Animated Architectural Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-40">
                {/* Vertical Structural Lines */}
                <motion.line
                    x1="20%" y1="0" x2="20%" y2="100%"
                    stroke="currentColor" strokeWidth="1"
                    className="text-gray-400 dark:text-white"
                    variants={drawLine} custom={0}
                    initial="hidden" animate="visible"
                />
                <motion.line
                    x1="80%" y1="0" x2="80%" y2="100%"
                    stroke="currentColor" strokeWidth="1"
                    className="text-gray-400 dark:text-white"
                    variants={drawLine} custom={1}
                    initial="hidden" animate="visible"
                />

                {/* Diagonal Cross Bracing (Architectural Trusses) */}
                <motion.path
                    d="M -100,100 L 400,600"
                    stroke="#d4af37" strokeWidth="0.5" // Gold accent line
                    fill="none"
                    variants={drawLine} custom={2}
                    initial="hidden" animate="visible"
                />
                <motion.path
                    d="M 100%,200 L 60%,100%"
                    stroke="currentColor" strokeWidth="0.5"
                    className="text-gray-400 dark:text-white"
                    fill="none"
                    variants={drawLine} custom={3}
                    initial="hidden" animate="visible"
                />

                {/* Large Geometric Shape (Abstract Building Silhouette) */}
                <motion.rect
                    x="65%" y="40%" width="300" height="600"
                    stroke="currentColor" strokeWidth="1" fill="none"
                    className="text-gray-400 dark:text-white"
                    opacity="0.05"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
            </svg>
        </div>
    );
};
