'use client';

import React from 'react';

export const BlueprintBackground = () => {
    // Grid configuration
    const gridSize = 60; // Size of grid squares

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
            <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Diagonal Cross Bracing (Architectural Trusses) */}
                <path
                    d="M -10 10 L 40 60"
                    stroke="#d4af37" strokeWidth="0.5" // Gold accent line
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.15"
                />
                <path
                    d="M 100 20 L 60 100"
                    stroke="currentColor" strokeWidth="0.5"
                    className="text-gray-400 dark:text-white"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.15"
                />

                {/* Large Geometric Shape (Abstract Building Silhouette) */}
                <rect
                    x="65" y="40" width="30" height="60"
                    stroke="currentColor" strokeWidth="1" fill="none"
                    className="text-gray-400 dark:text-white"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.05"
                />
            </svg>
        </div>
    );
};
