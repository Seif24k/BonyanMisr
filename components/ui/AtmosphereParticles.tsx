'use client';

import React, { useEffect, useRef } from 'react';

interface AtmosphereParticlesProps {
    particleCount?: number;
    color?: string; // Gold or White
}

type Particle = {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
};

export const AtmosphereParticles: React.FC<AtmosphereParticlesProps> = ({
    particleCount = 40,
    color = '#d4af37' // Default Gold
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

        if (prefersReducedMotion || isCoarsePointer || saveData) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * -0.5 - 0.1,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.5 + 0.1,
        });

        const updateParticle = (particle: Particle) => {
            particle.y += particle.speedY;
            particle.x += particle.speedX;

            if (particle.y < 0) {
                particle.y = canvas.height;
                particle.x = Math.random() * canvas.width;
            }
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
        };

        const drawParticle = (particle: Particle) => {
            ctx.fillStyle = color;
            ctx.globalAlpha = particle.opacity;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                updateParticle(particle);
                drawParticle(particle);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[2] pointer-events-none"
            aria-hidden="true"
        />
    );
};
