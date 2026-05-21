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
        className={`gold-service-text text-6xl font-bold tracking-tight
          transition-all duration-700 ease-out
          inline-block leading-normal drop-shadow-2xl ${className}`}
      >
        {text}
      </span>

      {/* Shimmer overlay only */}
      <span
        className={`pointer-events-none absolute inset-0 rounded
          bg-gradient-to-r from-transparent via-[#fff0b8]/30 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          animate-shimmer`}
        style={{
          mixBlendMode: 'screen',
        }}
      />

      <style jsx>{`
        .gold-service-text {
          color: transparent;
          background-image: linear-gradient(to right, #020617, #f5a623, #020617);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          animation: service-title-gold 3s linear infinite;
        }

        :global(.dark) .gold-service-text {
          background-image: linear-gradient(to right, #ffffff, #f5a623, #ffffff);
        }

        @keyframes service-title-gold {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

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
