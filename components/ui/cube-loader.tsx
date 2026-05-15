'use client'

import { cn } from "@/lib/utils";
import React from 'react'

export default function CubeLoader() {
  return (
    <div className='perspective-container'>
      {/* 3D Scene Wrapper */}
      <div className='relative w-16 h-16 flex items-center justify-center preserve-3d'>
        {/* THE SPINNING CUBE CONTAINER */}
        <div className='relative w-full h-full preserve-3d animate-cube-spin'>
          {/* Internal Core (The energy source) */}
          <div className='absolute inset-0 m-auto w-6 h-6 bg-[#d4af37] rounded-full blur-md shadow-[0_0_30px_rgba(212,175,55,0.8)] animate-pulse-fast' />

          {/* CUBE FACES */}
          {/* Front */}
          <div className='side-wrapper front'>
            <div className='face bg-[#d4af37]/10 border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' />
          </div>

          {/* Back */}
          <div className='side-wrapper back'>
            <div className='face bg-[#d4af37]/10 border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' />
          </div>

          {/* Right */}
          <div className='side-wrapper right'>
            <div className='face bg-[#003366]/10 border-2 border-[#003366] shadow-[0_0_15px_rgba(0,51,102,0.4)]' />
          </div>

          {/* Left */}
          <div className='side-wrapper left'>
            <div className='face bg-[#003366]/10 border-2 border-[#003366] shadow-[0_0_15px_rgba(0,51,102,0.4)]' />
          </div>

          {/* Top */}
          <div className='side-wrapper top'>
            <div className='face bg-[#b8860b]/10 border-2 border-[#b8860b] shadow-[0_0_15px_rgba(184,134,11,0.4)]' />
          </div>

          {/* Bottom */}
          <div className='side-wrapper bottom'>
            <div className='face bg-[#b8860b]/10 border-2 border-[#b8860b] shadow-[0_0_15px_rgba(184,134,11,0.4)]' />
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        /* 1. Cube Spin 
           Rotates the entire assembly on X and Y axes */
        @keyframes cubeSpin {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        /* 2. Face Breathing 
           Moves the face outward (translateZ) and back.
           Since the parent (.side-wrapper) is already rotated, 
           Z is always "outward" relative to that face.
        */
        @keyframes breathe {
          0%, 100% { 
            transform: translateZ(32px); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateZ(48px); 
            opacity: 0.5; 
            border-color: rgba(212,175,55,0.9); 
          }
        }

        @keyframes pulse-fast {
          0%, 100% { 
            transform: scale(0.8); 
            opacity: 0.5; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1; 
          }
        }

        @keyframes shadow-breathe {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.4; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 0.2; 
          }
        }

        @keyframes glitch {
          0% { 
            clip-path: inset(10% 0 80% 0); 
            transform: translate(-2px, 1px); 
          }
          20% { 
            clip-path: inset(80% 0 5% 0); 
            transform: translate(2px, -1px); 
          }
          40% { 
            clip-path: inset(40% 0 50% 0); 
            transform: translate(-2px, 2px); 
          }
          60% { 
            clip-path: inset(10% 0 60% 0); 
            transform: translate(2px, -2px); 
          }
          80% { 
            clip-path: inset(30% 0 20% 0); 
            transform: translate(1px, 2px); 
          }
          100% { 
            clip-path: inset(10% 0 80% 0); 
            transform: translate(-2px, 1px); 
          }
        }

        .animate-cube-spin {
          animation: cubeSpin 8s linear infinite;
        }

        .animate-pulse-fast {
          animation: pulse-fast 2s ease-in-out infinite;
        }

        .animate-shadow-breathe {
          animation: shadow-breathe 3s ease-in-out infinite;
        }

        .animate-glitch-text {
          animation: glitch 2s infinite linear alternate-reverse;
        }

        /* Positioning the Sides */
        .side-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .face {
          width: 100%;
          height: 100%;
          position: absolute;
          /* The 'breathe' animation is applied here */
          animation: breathe 3s ease-in-out infinite;
          backdrop-filter: blur(2px);
        }

        /* Rotations to form the cube structure */
        .front  { transform: rotateY(0deg); }
        .back   { transform: rotateY(180deg); }
        .right  { transform: rotateY(90deg); }
        .left   { transform: rotateY(-90deg); }
        .top    { transform: rotateX(90deg); }
        .bottom { transform: rotateX(-90deg); }
      `}</style>
    </div>
  )
}
