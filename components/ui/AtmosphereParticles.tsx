'use client';

import React, { useEffect, useRef } from 'react';

interface AtmosphereParticlesProps {
    particleCount?: number;
    color?: string; // Gold or White
}

export const AtmosphereParticles: React.FC<AtmosphereParticlesProps> = ({
    particleCount = 40,
    color = '#d4af37' // Default Gold
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
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

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.5; // Small dust specks
                this.speedY = Math.random() * -0.5 - 0.1; // Float upwards slowly
                this.speedX = Math.random() * 0.4 - 0.2; // Slight horizontal drift
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Reset if off screen
                if (this.y < 0) {
                    this.y = canvas!.height;
                    this.x = Math.random() * canvas!.width;
                }
                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = color; // Use the parsed color
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
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
