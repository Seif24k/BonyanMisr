'use client';

import React from 'react';

/**
 * Ambient color blobs that create a subtle blue/purple glow effect
 * Similar to the My Unit page background
 */
export const AmbientColors: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
            {/* Blue blob - top left */}
            <div 
                className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
                style={{
                    background: 'radial-gradient(circle, rgba(90, 159, 212, 0.6) 0%, transparent 70%)',
                    top: '-10%',
                    left: '-5%',
                }}
            />
            
            {/* Purple blob - top right */}
            <div 
                className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
                    top: '10%',
                    right: '-5%',
                }}
            />
            
            {/* Blue blob - middle left */}
            <div 
                className="absolute w-[550px] h-[550px] rounded-full opacity-15 blur-[110px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
                    top: '40%',
                    left: '-10%',
                }}
            />
            
            {/* Purple blob - bottom right */}
            <div 
                className="absolute w-[650px] h-[650px] rounded-full opacity-20 blur-[130px]"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
                    bottom: '-15%',
                    right: '-10%',
                }}
            />
            
            {/* Teal accent - middle */}
            <div 
                className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[90px]"
                style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );
};
