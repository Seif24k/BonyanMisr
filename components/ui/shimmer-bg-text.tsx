'use client'

import React from 'react';

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export default function TextHoverEffect({ text, className = '' }: TextHoverEffectProps) {
  return (
    <div
      className="relative group cursor-pointer select-none inline-block px-2 py-2"
      style={{ perspective: 800 }}
    >
      <span
        className={`text-6xl font-bold tracking-tight text-white
          transition-all duration-700 ease-out
          inline-block leading-normal drop-shadow-2xl ${className}`}
      >
        {text}
      </span>

      {/* Shimmer overlay only */}
      <span
        className={`pointer-events-none absolute inset-0 rounded
          bg-gradient-to-r from-black/0 via-black/20 to-black/0
          dark:from-white/0 dark:via-white/20 dark:to-white/0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          animate-shimmer`}
        style={{
          mixBlendMode: 'overlay',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.2s linear infinite;
        }
      `}</style>
    </div>
  );
}
